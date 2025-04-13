import { useContext } from "react";
import { FileOptionsContext } from "../providers/FileOptionsProvider";

export default function useFileOptions() {
    const ctx = useContext(FileOptionsContext);
    return ctx;
}
