import {
    action,
    computed,
    makeObservable,
    observable,
    ObservableSet,
} from "mobx";
import type { RootStore } from "./rootStore";

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

    options: {
        type: "folder" | "file";
        id: string;
    } | null = null;
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
            options: observable,
            getOptions: computed,
            renaming: observable,
            setRenameId: action,
            setOptions: action,
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

    get getOptions() {
        if (!this.options) return null;
        switch (this.options.type) {
            case "folder":
                return (
                    this.rootStore.dirStore.dirs.get(this.options.id) || null
                );
            default:
                return (
                    this.rootStore.fileStore.files.get(this.options.id) || null
                );
        }
    }

    setOptions(type: "file" | "folder", id: string) {
        this.options = {
            id,
            type,
        };
    }

    clearOptions(id: string | null) {
        this.options = null;
    }
}
