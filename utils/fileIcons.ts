import { MaterialCommunityIcons } from "@expo/vector-icons";

const fileIconMap: Record<
    string,
    keyof typeof MaterialCommunityIcons.glyphMap
> = {
    pdf: "file-pdf-box",
    doc: "file-word-box",
    docx: "file-word-box",
    xls: "file-excel-box",
    xlsx: "file-excel-box",
    ppt: "file-powerpoint-box",
    pptx: "file-powerpoint-box",
    txt: "file-document-outline",
    jpg: "file-image",
    jpeg: "file-image",
    png: "file-image",
    gif: "file-image",
    mp3: "file-music",
    wav: "file-music",
    mp4: "file-video",
    avi: "file-video",
    zip: "folder-zip",
    rar: "folder-zip",
    csv: "file-delimited",
    json: "code-json",
    html: "language-html5",
    css: "language-css3",
    js: "language-javascript",
    ts: "language-typescript",
    default: "file",
};

export function getFileIcon<T extends typeof MaterialCommunityIcons>(
    extension: string,
): keyof T["glyphMap"] {
    return fileIconMap[extension.toLowerCase()] || fileIconMap.default;
}

export function extractFileExtension(filename: string): string {
    const parts = filename.split(".");
    return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}
