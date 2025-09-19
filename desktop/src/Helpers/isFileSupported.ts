export const isFileSupported = (type: string): boolean => {

  if (
      type.startsWith("image/") ||
      type.startsWith("video/") ||
      type.startsWith("audio/") ||
      type.includes("document") ||
      type.includes("text")
  )
    return true;


  return type.includes("zip") || type.includes("rar") || type.includes("7z");



};
