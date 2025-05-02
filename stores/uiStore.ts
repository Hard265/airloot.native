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

    dirOptionsContext: string | null = null;
	fileOptionsContext: string | null = null;

    constructor(rootStore: RootStore) {
        makeObservable(this, {
            sorting: observable,
            selectedCount: computed,
            switchSort: action,
            toggleSelection: action,
            clearSelection: action,
			dirOptionsContext: observable,
		    fileOptionsContext: observable,
			setDirOptionsContext: action,
			setFileOptionsContext: action,
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

    setDirOptionsContext(id: string | null) {
		this.dirOptionsContext = id;
	}
	setFileOptionsContext(id: string | null) {
		this.fileOptionsContext = id;
	}
}
