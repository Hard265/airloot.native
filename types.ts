import { Dir } from "@/stores/dirStore";
import { File } from "@/stores/fileStore";

export type FileSystemEntity = File | Dir;

export interface FolderOptionsContextType {
    openBottomSheet: (item: FileSystemEntity) => void;
    closeBottomSheet: () => void;
    selectedItem: FileSystemEntity | null;
    isBottomSheetVisible: boolean;
}
