import { FolderOptionsContext } from "@/providers/FolderOptionsProvider";
import { useContext } from "react";

export default function useFolder() {
    const ctx = useContext(FolderOptionsContext);
    return ctx;
}
