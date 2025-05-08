import { action, makeObservable, observable, runInAction } from "mobx";
import { fetchUser, updateUser } from "@/services/userAPI";
import type { RootStore } from "./rootStore";

export interface User {
    id: string;
    email: string;
}

export class UserStore {
    rootStore: RootStore;
    user: User | null = null;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            user: observable,
            fetchUser: action,
            updateUser: action,
        });
        this.rootStore = rootStore;
    }

    async fetchUser() {
        const userData = await fetchUser();
        runInAction(() => {
            this.user = userData;
        });
    }

    async updateUser(data: Partial<User>) {
        const updatedUser = await updateUser(data);
        runInAction(() => {
            this.user = updatedUser;
        });
    }
}
