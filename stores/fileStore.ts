import { createFile, retrieveFiles } from "@/services/fileAPI";
import { defaultTo, filter, orderBy, uniqueId } from "lodash";
import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import type { RootStore } from "./rootStore";
import { AxiosProgressEvent } from "axios";

export interface File {
    id: string;
    name: string;
    size: number;
    folder: string | null;
    file: any;
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
            upload: action,
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

    async upload(data: Pick<File, "name" | "file" | "folder">[]) {
        const onUploadProgress = data.map((file) => {
            const sid = uniqueId();
            return (e: AxiosProgressEvent) => {
                this.rootStore.uiStore.updateUploadsPool(sid, e);
                if (e.progress && e.progress >= 1) {
                    this.rootStore.uiStore.destroyProgress(sid);
                }
            };
        });
        const files = await createFile(data, onUploadProgress);
        console.log(files);

        for (const file of files) {
            runInAction(() => {
                this.files.set(file.id, file);
            });
        }
    }
}
