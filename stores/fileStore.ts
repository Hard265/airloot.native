import { makeObservable, observable, runInAction } from "mobx";
import type { RootStore } from "./rootStore";
import { defaultTo, filter } from "lodash";
import { retrieveFiles } from "@/services/fileAPI";

export interface File {
    id: string;
    name: string;
    size: number;
    folder: string | null;
    created_at: string;
}

export class FileStore {
    rootStore: RootStore;

    files: Map<string, File> = new Map();

    constructor(rootStore: RootStore) {
        makeObservable(this, { files: observable });
        this.rootStore = rootStore;
    }

    get list() {
        return Array.from(this.files.values());
    }

    currentFiles() {
        return filter(this.list, {
            folder: defaultTo(this.rootStore.dirStore.current, null),
        });
    }

    async retrieveFiles(id: string | null) {
        const files = await retrieveFiles(id);
        runInAction(() => {
            for (const file of files) {
                this.files.set(file.id, file);
            }
        });
    }
}
