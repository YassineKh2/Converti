import { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Play,
  Zap,
} from "lucide-react";

import { UploadedFile } from "@/type/UploadedFile";
import { AppSettings } from "@/type/AppSettings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export function ProgressBar({
  files,
  settings,
  onConvertAll,
  isConverting,
}: {
  files: UploadedFile[];
  settings: AppSettings;
  onConvertAll: () => void;
  isConverting: boolean;
}) {
  const [showLogs, setShowLogs] = useState(
    settings.progressDetail === "detailed",
  );

  const filesToConvert = files.filter((file) => file.selectedFormat);
  const completedFiles = files.filter((file) => file.status === "completed");
  const errorFiles = files.filter((file) => file.status === "error");
  const convertingFiles = files.filter((file) => file.isConverting);

  const overallProgress =
    filesToConvert.length > 0
      ? (completedFiles.length / filesToConvert.length) * 100
      : 0;

  const getStatusIcon = (status: UploadedFile["Status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "converting":
        return <Play className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  if (filesToConvert.length === 0) return null;

  return (
    <Card className="mb-6 bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Download className="h-5 w-5 text-white" />
              </div>
              {isConverting && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">Conversion Progress</CardTitle>
              <CardDescription>
                {completedFiles.length} of {filesToConvert.length} files
                converted
                {errorFiles.length > 0 && ` • ${errorFiles.length} errors`}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Overall Progress</span>
            <span className="text-gray-600">
              {Math.round(overallProgress)}%
            </span>
          </div>
          <Progress className="h-2" value={overallProgress} />
        </div>

        {settings.progressDetail !== "minimal" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">
                File Conversion Status
              </h4>
              <Button
                className="h-6 text-xs"
                size="sm"
                variant="ghost"
                onClick={() => setShowLogs(!showLogs)}
              >
                {showLogs ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Hide Logs
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Show Logs
                  </>
                )}
              </Button>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2 bg-white/50 rounded-lg p-3 border">
              {filesToConvert.map((file) => (
                <div key={file.id} className="space-y-2">
                  <div className="flex items-center gap-3 p-2 rounded-md bg-white/70 border">
                    {getStatusIcon(file.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge className="text-xs" variant="outline">
                            → {file.selectedFormat}
                          </Badge>
                          {file.isConverting && (
                            <span className="text-xs text-blue-600">
                              {file.progress}%
                            </span>
                          )}
                        </div>
                      </div>
                      {file.isConverting && (
                        <Progress className="h-1 mt-1" value={file.progress} />
                      )}
                    </div>
                  </div>

                  {showLogs && file.Logs?.length > 0 && (
                    <div className="ml-7 p-2 bg-gray-50 rounded text-xs font-mono space-y-1 border-l-2 border-gray-300">
                      {file.Logs?.map((log, index) => (
                        <div key={index} className="text-gray-600">
                          {log}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">
              {completedFiles.length}
            </div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">
              {convertingFiles.length}
            </div>
            <div className="text-xs text-gray-500">Converting</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-red-600">
              {errorFiles.length}
            </div>
            <div className="text-xs text-gray-500">Errors</div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <Button
            className="w-full bg-secondary hover:bg-chart-4"
            disabled={isConverting || filesToConvert.length === 0}
            size="lg"
            onClick={onConvertAll}
          >
            <Zap className="h-4 w-4 mr-2" />
            {isConverting ? (
              <div className="flex items-center gap-5">
                <div>Converting Files</div>
                <Spinner variant="circle" />
              </div>
            ) : (
              `Convert All Files (${filesToConvert.length})`
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
