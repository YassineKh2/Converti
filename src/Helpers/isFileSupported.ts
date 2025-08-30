export const isFileSupported = (type: string): boolean => {
  const supportedTypes = [
    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/bmp",
    "image/tiff",
    // Videos
    "video/mp4",
    "video/avi",
    "video/mov",
    "video/wmv",
    "video/flv",
    "video/mkv",
    "video/webm",
    // Audio
    "audio/mp3",
    "audio/wav",
    "audio/flac",
    "audio/aac",
    "audio/ogg",
    "audio/m4a",
    "audio/wma",
    "audio/mpeg",
    // Documents
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "text/rtf",
    "text/html",
    "application/epub+zip",
    // Archives
    "application/zip",
    "application/x-rar-compressed",
    "application/x-7z-compressed",
    "application/x-tar",
  ];

  return (
    supportedTypes.includes(type) ||
    type.startsWith("image/") ||
    type.startsWith("video/") ||
    type.startsWith("audio/")
  );
};
