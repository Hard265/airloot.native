import { DirStore } from "./dirStore";
import { FileStore } from "./fileStore";
import { UiStore } from "./uiStore";
import { UserStore } from "./userStore";

export class RootStore {
    uiStore: UiStore;
    fileStore: FileStore;
    dirStore: DirStore;
    userStore: UserStore;

    constructor() {
        this.uiStore = new UiStore(this);
        this.fileStore = new FileStore(this);
        this.dirStore = new DirStore(this);
        this.userStore = new UserStore(this);
    }
}

export default new RootStore();
