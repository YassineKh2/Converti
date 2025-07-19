export function SanitizeFileName(name: string): string {
    return name.replace(/[:\\/*?"<>|]/g, "_");
}
