import { FolderOptionsContext } from "@/providers/FolderOptionsProvider";
import { useContext } from "react";

export default function useDirOptions() {
    const ctx = useContext(FolderOptionsContext);
    if (!ctx)
        throw new Error("useDirOptions hook use outside FolderOptionsProvider");

    return ctx;
}
