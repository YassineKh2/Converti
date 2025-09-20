export const isFileSupported = (type: string): boolean => {

    // TODO make supported file verification stricter and merge this function with getFileCategory
    return (
        type.startsWith("image/") ||
        type.startsWith("video/") ||
        type.startsWith("audio/") ||
        type.includes("document") ||
        type.includes("text")     ||
        type.includes("zip")      ||
        type.includes("tar")      ||
        type.includes("rar")      ||
        type.includes("bz2")      ||
        type.includes("7z")
    )

};
