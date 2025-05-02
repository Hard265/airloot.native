import { File } from "@/stores/fileStore";
import api from "./api";

export async function retrieveFile(id: string): Promise<File> {
    return (await api.get(`/files/${id}/`)).data;
}

export async function retrieveFiles(id: string | null): Promise<File[]> {
    if (!id) return (await api.get(`/files/`)).data;
    return (await api.get(`/folders/${id}/files/`)).data.results;
}

export async function createFile(data: {
    name: string;
    parent_folder: string;
}) {
    return (await api.post(`/files/`, data)).data;
}
