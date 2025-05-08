import { FolderOptionsContext } from "@/providers/FolderOptionsProvider";
import { useContext } from "react";

export default function useFolderOptions() {
    const ctx = useContext(FolderOptionsContext);
    if (!ctx)
        throw new Error("useDirOptions hook use outside FolderOptionsProvider");

    return ctx;
}
