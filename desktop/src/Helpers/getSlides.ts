import {Slide} from "@/type/Slide";

export const slides: Slide[] = [
    {
        id: 1,
        title: "Welcome to Converti!",
        subtitle: "Your professional file conversion companion",
        description: "Transform any file format with ease. Converti makes file conversion simple, fast, and reliable.",
        features: ["Drag & drop interface", "Multiple file support", "All Locally and Privately"],
        media: "",
        hasWelcomeAnimation: true,
    },
    {
        id: 2,
        title: "Drag & Drop Files",
        subtitle: "Upload made simple",
        description:
            "Simply drag your files into the upload area or click to browse. Converti supports images, videos, audio, documents, and archives.",
        features: ["Instant file recognition", "Batch upload support", "Format validation"],
        media: "drag and drop.gif",
        hasWelcomeAnimation: false,
    },
    {
        id: 3,
        title: "Choose Your Formats",
        subtitle: "Flexible conversion options",
        description:
            "Select individual formats for each file or set global formats for bulk conversion. Mix and match as needed.",
        features: ["Individual file control", "Global format settings", "Smart format suggestions"],
        media: "select format.gif",
        hasWelcomeAnimation: false,
    },
    {
        id: 4,
        title: "Track Progress",
        subtitle: "Real-time conversion monitoring",
        description: "Watch your files convert in real-time with detailed progress tracking and conversion logs.",
        features: ["Live progress bars", "Detailed conversion logs", "Error handling"],
        media: "progressbar.gif",
        hasWelcomeAnimation: false,
    },
    {
        id: 5,
        title: "Archive & Organize",
        subtitle: "Bundle files together",
        description:
            "Combine multiple files into archives or organize your converted files with custom naming conventions.",
        features: ["Multiple archive formats", "Custom file naming", "Batch organization"],
        media: "archive.gif",
        hasWelcomeAnimation: false,
    },
    {
        id: 6,
        title: "Customize Settings",
        subtitle: "Tailor your experience",
        description: "Configure save locations, naming conventions, notifications, and more to match your workflow.",
        features: ["Flexible save options", "Custom naming rules", "Notification preferences"],
        media: "settings.gif",
        hasWelcomeAnimation: false,
    },
]