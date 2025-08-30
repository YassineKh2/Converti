import { Archive, File, FileText, ImageIcon, Music, Video } from "lucide-react";

export const getFileIcon = (category: string) => {
  switch (category) {
    case "image":
      return <ImageIcon className="h-8 w-8 text-blue-500" />;
    case "video":
      return <Video className="h-8 w-8 text-purple-500" />;
    case "audio":
      return <Music className="h-8 w-8 text-green-500" />;
    case "document":
      return <FileText className="h-8 w-8 text-orange-500" />;
    case "archive":
      return <Archive className="h-8 w-8 text-yellow-500" />;
    default:
      return <File className="h-8 w-8 text-gray-500" />;
  }
};
