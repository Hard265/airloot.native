import { DirStore } from "./dirStore";
import { FileStore } from "./fileStore";
import { UiStore } from "./uiStore";

export class RootStore {
    uiStore: UiStore;
    fileStore: FileStore;
    dirStore: DirStore;

    constructor() {
        this.uiStore = new UiStore(this);
        this.fileStore = new FileStore(this);
        this.dirStore = new DirStore(this);
    }
}

export default new RootStore();
