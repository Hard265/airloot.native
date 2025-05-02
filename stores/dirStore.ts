import { deleteDir, retrieveDir, retrieveSubdirs } from "@/services/dirAPI";
import { defaultTo, filter, orderBy } from "lodash";
import {
    action,
    computed,
    makeObservable,
    observable,
    ObservableMap,
    runInAction,
} from "mobx";
import type { RootStore } from "./rootStore";

export interface Dir {
    id: string;
    name: string;
    parent_folder: string | null;
    created_at: string;
}

export class DirStore {
    rootStore: RootStore;

    dirs: Map<string, Dir> = new ObservableMap();
    current: string | null = null;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            dirs: observable,
            current: observable,
            list: computed,
            currentDir: computed,
            currentSubdirs: computed,
            navigateTo: action,
            retrive: action,
        });
        this.rootStore = rootStore;
    }
    get list() {
        return Array.from(this.dirs.values());
    }

    get currentDir(): Dir | undefined {
        if (this.current) return this.dirs.get(this.current);
    }

    get currentSubdirs() {
        return orderBy(
            filter(this.list, {
                parent_folder: defaultTo(this.current, null),
            }),
            ({ name }) => name,
            this.rootStore.uiStore.sorting,
        );
    }

    async retrive(id: string) {
        const dir = await retrieveDir(id);
        runInAction(() => {
            this.dirs.set(dir.id, dir);
        });
    }

    async delete(id: string) {
        await deleteDir(id);
        runInAction(() => {
            this.dirs.delete(id);
        });
    }

    async navigateTo(id: string | null) {
        this.current = id;
        const [dirs] = await Promise.all([
            await retrieveSubdirs(id),
            id ? await this.retrive(id) : undefined,
        ]);
        runInAction(() => {
            for (const dir of dirs) {
                this.dirs.set(dir.id, dir);
            }
        });
        await this.rootStore.fileStore.retrieveFiles(id);
    }
}
