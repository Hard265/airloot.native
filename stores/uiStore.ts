import BottomSheet from "@gorhom/bottom-sheet";
import {
    action,
    computed,
    makeObservable,
    observable,
    ObservableSet,
} from "mobx";
import { createRef } from "react";
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

    contextMenuRef = createRef<BottomSheet>();
    contextMenu: {
        targetId: string;
        type: TargetType;
    } | null = null;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            sorting: observable,
            selectedCount: computed,
            switchSort: action,
            toggleSelection: action,
            clearSelection: action,
            setContextMenuTarget: action,
            clearContextMenuTarget: action,
        });
        this.rootStore = rootStore;
    }

    switchSort() {
        this.sorting = this.sorting === SORT.ASC ? SORT.DESC : SORT.ASC;
    }

    get selectedCount() {
        return this.selectedIds.size;
    }
    toggleSelection(id: string) {
        if (this.selectedIds.has(id)) this.selectedIds.delete(id);
        else this.selectedIds.add(id);
    }
    clearSelection() {
        this.selectedIds.clear();
    }

    setContextMenuTarget(id: string, type: TargetType) {
        this.contextMenuRef.current?.expand();
        this.contextMenu = { targetId: id, type };
    }

    clearContextMenuTarget() {
        this.contextMenuRef.current?.close();
        this.contextMenu = null;
    }
}
