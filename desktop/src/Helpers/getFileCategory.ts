// TODO make supported file verification stricter and merge this function with isFileSupported
export const getFileCategory = (type: string): string => {
  if (type.startsWith("image/")) return "image";
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  if (
    type.includes("document") ||
    type.includes("text")
  )
    return "document";
  if (type.includes("zip") || type.includes("rar") || type.includes("7z")|| type.includes("bz2")|| type.includes("tar"))
    return "archive";

  return "other";
};
