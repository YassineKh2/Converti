import { ReactNode } from "react";

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: string;
  type: string;
  category: string;
  selectedFormat: string;
  selectedArchiveFormat?: string;
  isConverting: boolean;
  status?: "pending" | "converting" | "completed" | "error";
  Logs?: string[];
  progress?: number;
  path: string;
  order?: number;
  OutPath?: string;
}
export interface FileGroup {
  category: string;
  files: UploadedFile[];
  defaultFormat: string;
  globalFormat: string;
  icon: ReactNode;
  color: string[];
}
