export const getConversionOptions = (category: string, currentType: string): string[] => {
    const options: Record<string, string[]> = {
        image: ["JPG", "PNG", "WebP", "GIF", "SVG", "BMP", "TIFF", "ICO"],
        video: ["MP3","MP4", "AVI", "MOV", "WMV", "FLV", "MKV", "WebM", "M4V"],
        audio: ["MP3", "WAV", "FLAC", "AAC", "OGG", "M4A", "WMA"],
        document: ["PDF", "DOCX", "TXT", "RTF", "ODT", "HTML", "EPUB"],
        archive: ["ZIP", "RAR", "7Z", "TAR", "GZ", "BZ2"],
        other: ["TXT", "JSON", "CSV", "XML"],
    }

    const availableOptions = options[category] || options.other
    const currentExt = currentType.split("/")[1]?.toUpperCase()
    return availableOptions.filter((option) => option !== currentExt)
}
