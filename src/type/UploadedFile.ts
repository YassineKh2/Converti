import { ReactNode } from "react";

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: string;
  type: string;
  category: string;
  selectedFormat: string;
  isConverting: boolean;
  conversionStatus?: string;
  conversionLogs?: string[];
  conversionProgress?: number;
  path: string;
}
export interface FileGroup {
  category: string;
  files: UploadedFile[];
  defaultFormat: string;
  globalFormat: string;
  icon: ReactNode;
  color: string;
}
