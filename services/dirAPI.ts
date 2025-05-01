import type { Dir } from "@/stores/dirStore";
import api from "./api";

export async function retrieveDir(id: string): Promise<Dir> {
    return (await api.get(`/folders/${id}/`)).data;
}

export async function retrieveSubdirs(id: string | null): Promise<Dir[]> {
    if (!id) return (await api.get(`/folders/`)).data.results;
    return (await api.get(`/folders/${id}/subfolders/`)).data.results;
}

export async function createDir(data: { name: string; parent_folder: string }) {
    return (await api.post(`/folders/`, data)).data;
}
