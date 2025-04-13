import { ReactNode } from "react";
import UploadOptions from "../partials/UploadOptions";
import FileOptionsProvider from "../providers/FileOptionsProvider";

interface HomeLayoutProps {
    children: ReactNode;
}

export default function HomeLayout(props: HomeLayoutProps) {
    return (
        <FileOptionsProvider>
            {props.children}
            <UploadOptions />
        </FileOptionsProvider>
    );
}
