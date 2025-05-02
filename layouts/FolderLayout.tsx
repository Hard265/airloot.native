import FolderOptionsProvider from "@/providers/FolderOptionsProvider";
import { PropsWithChildren } from "react";

export default function FolderLayout({ children }: PropsWithChildren) {
    return (
        <>
            <FolderOptionsProvider>{children}</FolderOptionsProvider>
        </>
    );
}
