import api from "@/services/api";
import { makeObservable, observable, runInAction } from "mobx";

class UserStore {
    lodaing: boolean = false;
    id: string | null = null;
    email: string | null = null;

    constructor() {
        makeObservable(this, {
            id: observable,
            email: observable,
        });
        this.setup();
    }

    async setup() {
        runInAction(() => {
            this.lodaing = true;
        });
        try {
            const { data = {} } = await api.get("/user/");
            this.setUser(data.id, data.email);
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.lodaing = false;
            });
        }
    }

    setUser(id: string, email: string) {
        this.id = id;
        this.email = email;
    }

    clear() {
        this.id = null;
        this.email = null;
    }
}

const userStore = new UserStore();
export default userStore;
