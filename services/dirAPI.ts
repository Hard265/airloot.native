import type { Dir } from "@/stores/dirStore";
import api from "./api";

export async function retrieveDir(id: string): Promise<Dir> {
    return (await api.get(`/folders/${id}/`)).data;
}
export async function deleteDir(id: string): Promise<Dir> {
    return (await api.delete(`/folders/${id}/`)).data;
}

export async function retrieveSubdirs(id: string | null): Promise<Dir[]> {
    if (!id) return (await api.get(`/folders/?page_size=100`)).data.results;
    return (await api.get(`/folders/${id}/subfolders/?page_size=100`)).data
        .results;
}

export async function createDir(
    data: Pick<Dir, "name" | "parent_folder">,
): Promise<Dir> {
    return (await api.post(`/folders/`, data)).data;
}

export async function updateDir(
    id: string,
    data: Partial<Omit<Dir, "id">>,
): Promise<Dir> {
    return (await api.put(`/folders/${id}/`, data)).data;
}
