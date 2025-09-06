export const isFileSupported = (type: string): boolean => {
  const supportedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/bmp",
    "image/tiff",
    "image/vnd.microsoft.icon",
    "video/mp4",
    "video/avi",
    "video/mov",
    "video/x-ms-wmv",
    "video/x-flv",
    "video/x-matroska",
    "video/webm",
    "video/x-m4v",
    "audio/mpeg",
    "audio/wav",
    "audio/flac",
    "audio/aac",
    "audio/ogg",
    "audio/mp4",
    "audio/x-ms-wma",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "rar",
    "text/plain",
    "text/rtf",
    "text/html",
    "application/epub+zip",
    "application/vnd.oasis.opendocument.text",
    "application/zip",
    "application/x-rar-compressed",
    "application/x-7z-compressed",
    "application/x-tar",
    "application/x-zip-compressed",
    "7z",
    "rar",
  ];

  return (
    supportedTypes.includes(type) ||
    type.startsWith("image/") ||
    type.startsWith("video/") ||
    type.startsWith("audio/")
  );
};
