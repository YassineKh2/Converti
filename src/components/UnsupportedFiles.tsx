import { AlertTriangle, Info, RefreshCw, X } from "lucide-react";

import { UploadedFile } from "@/type/UploadedFile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UnsupportedFilesScreen({
  unsupportedFiles,
  onRemoveFile,
  onRetry,
}: {
  unsupportedFiles: UploadedFile[];
  onRemoveFile: (fileId: string) => void;
  onRetry: () => void;
}) {
  if (unsupportedFiles.length === 0) return null;

  return (
    <Card className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200 border-2">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <CardTitle className="text-red-900">
              Unsupported Files Detected
            </CardTitle>
            <CardDescription className="text-red-700">
              {unsupportedFiles.length} file
              {unsupportedFiles.length !== 1 ? "s" : ""} cannot be converted
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white/70 rounded-lg p-3 border border-red-200">
          <div className="space-y-2">
            {unsupportedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2 bg-white rounded border"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {file.type || "Unknown file type"} • {file.size}
                    </p>
                  </div>
                </div>
                <Button
                  className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveFile(file.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Supported file types:</p>
              <p className="text-xs leading-relaxed">
                <strong>Images:</strong> JPG, PNG, GIF, WebP, SVG, BMP, TIFF
                <br />
                <strong>Videos:</strong> MP4, AVI, MOV, WMV, FLV, MKV, WebM
                <br />
                <strong>Audio:</strong> MP3, WAV, FLAC, AAC, OGG, M4A, WMA
                <br />
                <strong>Documents:</strong> PDF, DOCX, TXT, RTF, HTML, EPUB
                <br />
                <strong>Archives:</strong> ZIP, RAR, 7Z, TAR
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-red-200">
          <p className="text-sm text-red-700">
            Remove unsupported files to continue with conversion
          </p>
          <Button
            className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
            size="sm"
            variant="outline"
            onClick={onRetry}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
