import {
    action,
    computed,
    makeObservable,
    observable,
    ObservableSet,
} from "mobx";
import type { RootStore } from "./rootStore";
import { Dir } from "./dirStore";

export enum SORT {
    ASC = "asc",
    DESC = "desc",
}

export enum TargetType {
    FILE = "file",
    FOLDER = "folder",
}

export class UiStore {
    rootStore: RootStore;

    sorting: SORT = SORT.ASC;
    selectedIds: Set<string> = new ObservableSet();
    selectionMode: boolean = false;

    dirOptionsContext: string | null = null;
    fileOptionsContext: string | null = null;

    renaming: string | null = null;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            sorting: observable,
            selectedIds: observable,
            selectedCount: computed,
            selectionMode: observable,
            switchSort: action,
            toggleSelection: action,
            clearSelection: action,
            dirOptionsContext: observable,
            fileOptionsContext: observable,
            currentDirContext: computed,
            currentFileContext: computed,
            renaming: observable,
            setRenameId: action,
            setDirOptionsContext: action,
            setFileOptionsContext: action,
            turnSelectionMode: action,
        });
        this.rootStore = rootStore;
    }

    switchSort() {
        this.sorting = this.sorting === SORT.ASC ? SORT.DESC : SORT.ASC;
    }

    get selectedCount() {
        return this.selectedIds.size;
    }

    turnSelectionMode(mode: boolean) {
        if (!mode) this.clearSelection();
        this.selectionMode = mode;
    }

    toggleSelection(id: string) {
        if (this.selectedIds.has(id)) this.selectedIds.delete(id);
        else this.selectedIds.add(id);
    }

    clearSelection() {
        this.selectedIds.clear();
    }

    setRenameId(id: string | null) {
        this.renaming = id;
    }

    get currentDirContext() {
        if (this.dirOptionsContext)
            return this.rootStore.dirStore.dirs.get(this.dirOptionsContext);
        return;
    }

    get currentFileContext() {
        if (this.fileOptionsContext)
            return this.rootStore.fileStore.files.get(this.fileOptionsContext);
        return;
    }

    setDirOptionsContext(id: string | null) {
        this.dirOptionsContext = id;
    }

    setFileOptionsContext(id: string | null) {
        this.fileOptionsContext = id;
    }
}
