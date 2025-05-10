import type { File } from "@/stores/fileStore";
import api from "./api";
import { entries } from "lodash";
import { AxiosProgressEvent } from "axios";

export async function retrieveFile(id: string): Promise<File> {
    return (await api.get(`/files/${id}/`)).data;
}

export async function retrieveFiles(id: string | null): Promise<File[]> {
    if (!id) return (await api.get(`/files/`)).data;
    return (await api.get(`/folders/${id}/files/`)).data.results;
}

export async function createFile(
    data: Pick<File, "name" | "folder" | "file">[],
    onUploadProgress: ((e: AxiosProgressEvent) => void)[],
): Promise<File[]> {
    if (data.length !== onUploadProgress.length) {
        throw new Error(
            "data and onUploadProgress arrays must have the same length",
        );
    }

    const uploadPromises = data.map((item, index) => {
        const form = new FormData();
        entries(item).forEach(([name, value]) => {
            form.append(name, value || "");
        });
        return api.post(`/files/`, form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: onUploadProgress[index],
        });
    });

    const results = await Promise.all(uploadPromises);
    return results.map((result) => result.data);
}
