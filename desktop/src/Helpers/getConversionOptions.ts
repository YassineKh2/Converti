export const getConversionOptions = (
  category: string,
  currentType: string,
): string[] => {
  const options: Record<string, string[]> = {
    image: [
      "JPG",
      "JPEG",
      "PNG",
      "WebP",
      "GIF",
      "AVIF",
      "SVG",
      "BMP",
      "TIFF",
      "ICO",
    ],
    video: ["MP3", "MP4", "AVI", "MOV", "WMV", "FLV", "MKV", "WebM", "M4V"],
    audio: ["MP3", "WAV", "FLAC", "AAC", "OGG", "M4A", "WMA"],
    document: ["PDF", "DOCX", "TXT", "RTF", "ODT", "HTML", "EPUB"],
    archive: ["ZIP", "RAR", "7Z", "TAR", "GZ", "BZ2"],
    other: [],
  };
  const availableOptions = options[category] || options.other;
  const currentExt = currentType.split("/")[1]?.toUpperCase();

  return availableOptions.filter((option) => option !== currentExt);
};

export const getDefaultFormat = (category: string): string => {
  const defaults: Record<string, string> = {
    image: "JPG",
    video: "MP4",
    audio: "MP3",
    document: "PDF",
    archive: "ZIP",
    other: "",
  };

  return defaults[category] || "TXT";
};

export const getArchiveOptions = (): string[] => {
  return ["ZIP", "RAR", "7Z", "GZ"];
};
