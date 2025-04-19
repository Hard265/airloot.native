import { makeObservable, observable } from "mobx";

export interface File {
    id: string;
    name: string;
    size: number;
}

export interface Dir {
    id: string;
    name: string;
    folders: Omit<Dir, "folders" | "files">[];
    files: File[];
}

class FileStore {
    dirs: { [K: string]: Dir } = {};
    files: { [K: string]: File } = {};
    constructor() {
        this.dirs["1"] = {
            id: "1",
            name: "lib",
            folders: [{ id: "8", name: "www" }],
            files: [{ id: "9", name: "msfconsole", size: 30293892 }],
        };
        this.dirs["2"] = { id: "2", name: "src", folders: [], files: [] };
        this.dirs["3"] = { id: "3", name: "assets", folders: [], files: [] };
        this.dirs["."] = {
            id: ".",
            name: ".",
            folders: [
                { id: "1", name: "bin" },
                { id: "2", name: "src" },
                { id: "3", name: "assets" },
            ],
            files: [],
        };
        makeObservable(this, {
            dirs: observable,
            files: observable,
        });
    }
    getFiles(list?: string[]) {
        if (list) {
            const filteredFiles: File[] = [];
            list.forEach((item) => {
                if (this.files[item]) {
                    filteredFiles.push(this.files[item]!);
                }
            });
            return filteredFiles;
        }
        return Object.values(this.files);
    }
    getDirs() {
        return this.dirs;
    }
    addFile(path: string, file: File) {
        this.files[path] = file;
    }
    removeFile(path: string) {
        delete this.files[path];
    }
    addDir(path: string, dir: Dir) {
        this.dirs[path] = dir;
    }
    removeDir(path: string) {
        delete this.dirs[path];
    }
    clearFiles() {
        this.files = {};
    }
    clearDirs() {
        this.dirs = {};
    }
    clearAll() {
        this.clearFiles();
        this.clearDirs();
    }
}

export default new FileStore();
