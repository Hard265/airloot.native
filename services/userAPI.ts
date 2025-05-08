import api from "./api";
import { User } from "@/stores/userStore";

export async function fetchUser(): Promise<User> {
    return (await api.get("/user/")).data;
}

export async function updateUser(data: Partial<User>): Promise<User> {
    return (await api.put("/user/", data)).data;
}
