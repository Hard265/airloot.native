import { retrieveFiles } from "@/services/fileAPI";
import { defaultTo, filter, orderBy } from "lodash";
import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import type { RootStore } from "./rootStore";

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
        makeObservable(this, {
            files: observable,
            list: computed,
            currentFiles: computed,
            retrieveFiles: action,
        });
        this.rootStore = rootStore;
    }

    get list() {
        return Array.from(this.files.values());
    }

    get currentFiles(): File[] {
        return orderBy(
            filter(this.list, {
                folder: defaultTo(this.rootStore.dirStore.current, null),
            }),
            ({ name }) => name,
            this.rootStore.uiStore.sorting,
        );
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
