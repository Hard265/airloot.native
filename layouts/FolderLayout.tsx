import FolderOptionsProvider from "@/providers/FolderOptionsProvider";
import { PlusOptionsProvider } from "@/providers/PlusOptionsProvider";
import { PropsWithChildren } from "react";

export default function FolderLayout({ children }: PropsWithChildren) {
    return (
        <FolderOptionsProvider>
            <PlusOptionsProvider>{children}</PlusOptionsProvider>
        </FolderOptionsProvider>
    );
}
