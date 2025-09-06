import { Archive, File, FileText, ImageIcon, Music, Video } from "lucide-react";

export const getFileIcon = (category: string) => {
  switch (category) {
    case "image":
      return <ImageIcon className="h-8 w-8" />;
    case "video":
      return <Video className="h-8 w-8" />;
    case "audio":
      return <Music className="h-8 w-8" />;
    case "document":
      return <FileText className="h-8 w-8" />;
    case "archive":
      return <Archive className="h-8 w-8" />;
    default:
      return <File className="h-8 w-8" />;
  }
};
