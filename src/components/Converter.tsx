import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Cog,
  Globe,
  Package,
  RotateCcw,
  Settings as SettingsIcon,
  Trash2,
  Upload,
  User,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileGroup,
  UploadedFile as UploadedFileType,
} from "@/type/UploadedFile";
import { getFileCategory } from "@/Helpers/getFileCategory";
import { formatFileSize } from "@/Helpers/formatFileSize";
import {
  getArchiveOptions,
  getConversionOptions,
  getDefaultFormat,
} from "@/Helpers/getConversionOptions";
import { getFileIcon } from "@/Helpers/getFileIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "@/components/Settings";
import { AppSettings } from "@/type/AppSettings";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { getCategoryColor } from "@/Helpers/getCategoryColor";
import { ProgressBar } from "@/components/ProgressBar";
import { ConvertStatus } from "@/type/ConvertStatus";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UnsupportedFilesScreen } from "@/components/UnsupportedFiles";
import { Footer } from "@/components/Footer";
import { isFileSupported } from "@/Helpers/isFileSupported";

export default function FileConverter() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileType[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({} as AppSettings);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [isConverting, setIsConverting] = useState(false);
  const [archiveName, setArchiveName] = useState("myArchive");
  const [globalFormats, setGlobalFormats] = useState<Record<string, string>>(
    {},
  );
  const [selectedArchiveFormat, setSelectedArchiveFormat] =
    useState<string>("");
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    action: "",
    functionRef: (files?: UploadedFileType[]) => {},
  });
  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  useEffect(() => {
    const getSettings = async () => {
      return await window.ipcRenderer.invoke("settings");
    };

    getSettings().then((settings: AppSettings) => setSettings(settings));
  }, []);

  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newFiles: UploadedFileType[] = fileArray.map((file) => {
      let FileType = file.type;

      if (file.name.includes("7z")) FileType = "7z";
      if (file.name.includes("rar")) FileType = "rar";
      if (file.name.includes("rtf")) FileType = "document | rtf";
      if (file.name.includes("epub")) FileType = "document | epub";

      const category = getFileCategory(FileType);

      return {
        id: Math.random().toString(36).slice(2, 9),
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: FileType,
        category: category,
        selectedFormat: "",
        isConverting: false,
        path: "",
      };
    });

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      processFiles(files);
    }
  }, []);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      processFiles(files);
    }
    e.target.value = "";
  };

  const fileGroups: FileGroup[] = useMemo(() => {
    const groups: Record<string, UploadedFileType[]> = {};

    uploadedFiles.forEach((file) => {
      if (!groups[file.category]) {
        groups[file.category] = [];
      }
      groups[file.category].push(file);
    });

    return Object.entries(groups).map(([category, files]) => ({
      category,
      files,
      defaultFormat: getDefaultFormat(category),
      globalFormat: globalFormats[category] || "",
      icon: getFileIcon(category),
      color: getCategoryColor(category),
    }));
  }, [uploadedFiles, globalFormats]);

  const setGlobalFormat = (category: string, format: string) => {
    setGlobalFormats((prev) => ({
      ...prev,
      [category]: format,
    }));

    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.category === category ? { ...file, selectedFormat: format } : file,
      ),
    );
  };

  const removeGlobalFormat = (category: string) => {
    setGlobalFormats((prev) => {
      const newFormats = { ...prev };

      delete newFormats[category];

      return newFormats;
    });
  };

  const updateFileFormat = (fileId: string, format: string) => {
    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, selectedFormat: format } : file,
      ),
    );
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const convertFile = async (fileId: string) => {
    const uploadedFile = uploadedFiles.find((f) => f.id === fileId);

    if (!uploadedFile) return;

    setUploadedFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, isConverting: true } : f)),
    );

    toast.info("Hold tight , your conversion has started !");

    // showFilePath is showing as undefined
    //@ts-ignore
    const path = await window.ipcRenderer.showFilePath(uploadedFile.file);
    const { name } = uploadedFile;

    uploadedFile.path = await window.ipcRenderer.invoke("saveFile", {
      path,
      name,
    });

    uploadedFile.order = 1;
    const nbFiles = 1;

    const result: ConvertStatus = await window.ipcRenderer.invoke("convert", {
      uploadedFile,
      nbFiles,
    });

    uploadedFile.isConverting = false;
    uploadedFile.Logs = result.Logs;
    uploadedFile.status = result.status;
    uploadedFile.progress = result.progress;

    setUploadedFiles((prev) =>
      prev.map((file) => {
        if (file.id === uploadedFile.id) return uploadedFile;

        return file;
      }),
    );

    if (uploadedFile.status === "error") {
      const resultString = uploadedFile.Logs?.join("");

      toast.error(`Conversion failed ! : ${resultString}`);

      return;
    }

    if (!settings.notifications) return;
    if (settings.confirmBeforeConvert) {
      setConfirmModal({
        show: false,
        action: "",
        functionRef: null,
      });
    }

    toast.success(
      `${uploadedFile.name} converted to ${uploadedFile.selectedFormat} format!`,
    );
  };

  const globalConvertGroup = async (category: string) => {
    const globalFormat = globalFormats[category];

    if (!globalFormat) return;

    const supportedFiles = uploadedFiles.filter((file) =>
      isFileSupported(file.type),
    );

    const groupFiles = supportedFiles.filter(
      (file) => file.category === category,
    );

    if (groupFiles.length === 0) return;

    let updatedFiles: UploadedFileType[] = [];
    let SuccessfulConverts: number = 0;
    let OutPath = "";

    setUploadedFiles((prev) =>
      prev.map((file) => {
        if (file.category === category) {
          file.selectedFormat = globalFormat;

          return { ...file, isConverting: true, selectedFormat: globalFormat };
        }

        return file;
      }),
    );

    uploadedFiles.map((file) => {
      if (file.category === category) {
        file.selectedFormat = globalFormat;
        file = { ...file, isConverting: true, selectedFormat: globalFormat };
        updatedFiles.push(file);
      }
    });

    const nbFiles = updatedFiles.length;

    toast.info("Hold tight , your conversion has started !");

    for (const uploadedFile of updatedFiles) {
      //@ts-ignore
      const path = await window.ipcRenderer.showFilePath(uploadedFile.file);

      const { name } = uploadedFile;

      uploadedFile.path = await window.ipcRenderer.invoke("saveFile", {
        path,
        name,
      });

      uploadedFile.OutPath = OutPath;

      uploadedFile.order = updatedFiles.indexOf(uploadedFile) + 1;

      const result: ConvertStatus = await window.ipcRenderer.invoke("convert", {
        uploadedFile,
        nbFiles,
        SuccessfulConverts,
      });

      uploadedFile.isConverting = false;
      uploadedFile.Logs = result.Logs;
      uploadedFile.status = result.status;
      uploadedFile.progress = result.progress;
      if (result.path) OutPath = result.path;

      if (uploadedFile.status === "error") {
        const resultString = uploadedFile.Logs?.join("");

        toast.error(`Conversion failed ! : ${resultString}`);
      } else SuccessfulConverts++;

      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === uploadedFile.id) return uploadedFile;

          return file;
        }),
      );
    }

    if (!settings.notifications) return;
    if (SuccessfulConverts === 0) return;
    if (settings.confirmBeforeConvert) {
      setConfirmModal({
        show: false,
        action: "",
        functionRef: null,
      });
    }

    toast.success(
      `Successfully converted ${SuccessfulConverts} ${category} files to ${globalFormat} format!`,
    );
  };

  const convertAllFiles = async () => {
    const supportedFiles = uploadedFiles.filter((file) =>
      isFileSupported(file.type),
    );

    const updatedFiles = supportedFiles.map((file) => {
      const globalFormat = globalFormats[file.category];

      if (globalFormat && !file.selectedFormat) {
        return { ...file, selectedFormat: globalFormat };
      }

      return file;
    });

    const filesToConvert = updatedFiles.filter(
      (file) => file.selectedFormat && !file.isConverting,
    );

    if (filesToConvert.length === 0) {
      toast.warning("Please select formats for the files you want to convert.");

      return;
    }

    setUploadedFiles(
      updatedFiles.map((file) =>
        file.selectedFormat ? { ...file, isConverting: true } : file,
      ),
    );

    toast.info("Hold tight , your conversion has started !");

    setIsConverting(true);
    let SuccessfulConverts: number = 0;
    let OutPath = "";
    const nbFiles = filesToConvert.length;

    for (const uploadedFile of filesToConvert) {
      //@ts-ignore
      const path = await window.ipcRenderer.showFilePath(uploadedFile.file);

      const { name } = uploadedFile;

      uploadedFile.path = await window.ipcRenderer.invoke("saveFile", {
        path,
        name,
      });
      uploadedFile.OutPath = OutPath;

      uploadedFile.order = filesToConvert.indexOf(uploadedFile) + 1;

      const result: ConvertStatus = await window.ipcRenderer.invoke("convert", {
        uploadedFile,
        nbFiles,
        SuccessfulConverts,
      });

      uploadedFile.isConverting = false;
      uploadedFile.Logs = result.Logs;
      uploadedFile.status = result.status;
      uploadedFile.progress = result.progress;
      if (result.path) OutPath = result.path;

      if (uploadedFile.status === "error") {
        const resultString = uploadedFile.Logs?.join("");

        toast.error(`Conversion failed ! : ${resultString}`);
      } else SuccessfulConverts++;

      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === uploadedFile.id) return uploadedFile;

          return file;
        }),
      );
    }

    setIsConverting(false);

    if (!settings.notifications) return;
    if (SuccessfulConverts === 0) return;
    if (settings.confirmBeforeConvert) {
      setConfirmModal({
        show: false,
        action: "",
        functionRef: null,
      });
    }

    toast.success(`Successfully converted ${SuccessfulConverts} files!`);
  };

  const archiveAllFiles = async () => {
    if (!selectedArchiveFormat) return;

    setUploadedFiles((prev) =>
      prev.map((file) => ({
        ...file,
        isConverting: true,
      })),
    );

    const updatedFiles = uploadedFiles.map((file) => {
      return { ...file, selectedArchiveFormat: selectedArchiveFormat };
    });

    setIsConverting(true);
    let SuccessfulArchives: number = 0;
    let OutPath = "";
    const nbFiles = uploadedFiles.length;
    let ArchiveName = "";

    switch (settings.namingConventionArchive) {
      case "original":
        ArchiveName = updatedFiles[0].name;
        break;
      case "ask":
        ArchiveName = archiveName;
        break;
      case "custom":
        ArchiveName = settings.namingArchive;
        break;
    }

    if (!settings.removeTimestamp) {
      const currentDate = new Date().toISOString();

      ArchiveName = ArchiveName + "-" + currentDate;
    }

    for (const uploadedFile of updatedFiles) {
      //@ts-ignore
      const path = await window.ipcRenderer.showFilePath(uploadedFile.file);

      const { name } = uploadedFile;

      uploadedFile.path = await window.ipcRenderer.invoke("saveFile", {
        path,
        name,
      });

      uploadedFile.OutPath = OutPath;
      uploadedFile.order = updatedFiles.indexOf(uploadedFile) + 1;

      const result: ConvertStatus = await window.ipcRenderer.invoke("archive", {
        uploadedFile,
        nbFiles,
        SuccessfulArchives,
        ArchiveName,
      });

      uploadedFile.isConverting = false;
      uploadedFile.Logs = result.Logs;
      uploadedFile.status = result.status;
      uploadedFile.progress = result.progress;
      if (result.path) OutPath = result.path;

      if (uploadedFile.status === "error") {
        const resultString = uploadedFile.Logs?.join("");

        toast.error(`Conversion failed ! : ${resultString}`);
      } else SuccessfulArchives++;
    }

    setUploadedFiles((prev) =>
      prev.map((file) => ({ ...file, isConverting: false })),
    );
    setIsConverting(false);

    if (!settings.notifications) return;
    if (SuccessfulArchives === 0) return;
    if (settings.confirmBeforeConvert) {
      setConfirmModal({
        show: false,
        action: "",
        functionRef: null,
      });
    }

    toast.success(
      `Successfully archived ${SuccessfulArchives} files into ${selectedArchiveFormat} format!`,
    );
  };

  const clearAllFiles = () => {
    setUploadedFiles([]);
    setGlobalFormats({});
    setSelectedArchiveFormat("");
  };

  const toggleGroupExpansion = (category: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }

      return newSet;
    });
  };

  const selectedFilesCount = useMemo(() => {
    return uploadedFiles.filter((file) => {
      const globalFormat = globalFormats[file.category];

      return file.selectedFormat || globalFormat;
    }).length;
  }, [uploadedFiles, globalFormats]);

  const convertingFilesCount = uploadedFiles.filter(
    (file) => file.isConverting,
  ).length;

  const hasMultipleFiles = uploadedFiles.length > 1;
  const totalFileCount = uploadedFiles.length;

  const unsupportedFiles = uploadedFiles.filter(
    (file) => !isFileSupported(file.type),
  );

  const shouldShowIndividualMode = (group: FileGroup) => {
    return group.files.length === 1 || !group.globalFormat;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <div className="flex items-end justify-center gap-4 mb-4">
            <h1 className="text-5xl font-bold text-gray-900">Converti</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="h-10 w-10 bg-transparent border-none shadow-none"
                  size="icon"
                  variant="outline"
                >
                  <Cog className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <Settings settings={settings} onSettingsChange={setSettings} />
            </Dialog>
          </div>
          <p className="text-gray-600">
            Global format selection, individual conversion, or archive multiple
            files
          </p>
        </div>

        <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors mb-6">
          <CardContent className="p-8">
            <div
              className={`text-center ${isDragOver ? "bg-secondary/10 border-ring" : ""} rounded-lg p-6 transition-colors`}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Drop multiple files here or click to browse
              </h3>
              <p className="text-gray-500 mb-4">
                Convert files individually, set global formats, or archive them
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button asChild className="bg-secondary hover:bg-chart-4">
                  <label className="cursor-pointer" htmlFor="file-upload">
                    Choose Files
                    <input
                      multiple
                      className="hidden"
                      id="file-upload"
                      type="file"
                      onChange={handleFileSelect}
                    />
                  </label>
                </Button>
                {uploadedFiles.length > 0 && (
                  <Button variant="outline" onClick={clearAllFiles}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {fileGroups.length > 0 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      Uploaded Files ({uploadedFiles.length})
                    </CardTitle>
                    <CardDescription>
                      {fileGroups.length} file type
                      {fileGroups.length !== 1 ? "s" : ""} detected
                      {selectedFilesCount > 0 &&
                        ` • ${selectedFilesCount} files ready for conversion`}
                      {convertingFilesCount > 0 &&
                        ` • ${convertingFilesCount} converting...`}
                      {selectedArchiveFormat &&
                        ` • Archive format: ${selectedArchiveFormat}`}
                      {unsupportedFiles.length > 0 &&
                        ` • ${unsupportedFiles.length} unsupported`}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
            {hasMultipleFiles && settings.showArchive && (
              <Card className="mb-6 bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200 border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                      <div className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-slate-800">
                          Archive All Files
                        </CardTitle>
                        <CardDescription className="text-slate-600">
                          Combine all {totalFileCount} files into a single
                          archive
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2 block">
                        Choose archive format:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {getArchiveOptions().map((format) => (
                          <Button
                            key={format}
                            className="h-8 text-xs hover:bg-slate-700"
                            disabled={convertingFilesCount > 0}
                            size="sm"
                            variant={
                              selectedArchiveFormat === format
                                ? "default"
                                : "outline"
                            }
                            onClick={() => {
                              setSelectedArchiveFormat(format);
                            }}
                          >
                            {format}
                          </Button>
                        ))}
                      </div>
                    </div>
                    {selectedArchiveFormat && (
                      <div className="flex flex-col gap-2 justify-between pt-2 border-t border-purple-200">
                        {settings.namingConventionArchive === "ask" && (
                          <div className="space-y-2">
                            <Label className="text-slate-800" htmlFor="prefix">
                              Set a name for your archive
                            </Label>
                            <Input
                              className="bg-white focus-visible:border-slate-500 focus-visible:ring-slate-500"
                              id="prefix"
                              placeholder="myArchive"
                              value={archiveName}
                              onChange={(e) => setArchiveName(e.target.value)}
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between w-full">
                          <p className="text-sm text-slate-800">
                            Archive as: files.
                            {selectedArchiveFormat.toLowerCase()}
                          </p>
                          <Button
                            className="h-8 text-xs bg-slate-600 text-white hover:bg-slate-700"
                            disabled={
                              convertingFilesCount > 0 ||
                              (settings.namingConventionArchive === "ask" &&
                                archiveName === "")
                            }
                            onClick={() => {
                              if (!settings.confirmBeforeConvert) {
                                archiveAllFiles();
                              } else {
                                setConfirmModal({
                                  show: true,
                                  action: "archiving",
                                  functionRef: archiveAllFiles,
                                });
                              }
                            }}
                          >
                            <Package className="h-4 w-4 mr-2" />
                            Archive All Files
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            {fileGroups.map((group) => {
              const isExpanded = expandedGroups.has(group.category);
              const convertingInGroup = group.files.filter(
                (f) => f.isConverting,
              ).length;
              const conversionOptions = getConversionOptions(
                group.category,
                "",
              );
              const hasGlobalFormat = group.globalFormat !== "";
              const isSingleFile = group.files.length === 1;
              const showIndividualMode = shouldShowIndividualMode(group);

              if (group.category === "other") return <></>;

              return (
                <Card
                  key={group.category}
                  className={`${group.color[0] + " " + group.color[1]} border-2`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 ">
                        <div className={group.color[2]}>{group.icon}</div>
                        <div>
                          <CardTitle className="capitalize flex items-center gap-2">
                            {group.category} Files ({group.files.length})
                            {convertingInGroup > 0 && (
                              <Badge
                                className={"text-xs " + group.color[4]}
                                variant="secondary"
                              >
                                {convertingInGroup} converting...
                              </Badge>
                            )}
                            {hasGlobalFormat && (
                              <Badge
                                className={
                                  "border-none text-xs text-black " +
                                  group.color[0]
                                }
                              >
                                <Globe className="h-3 w-3 mr-1" />
                                Global: {group.globalFormat}
                              </Badge>
                            )}
                            {isSingleFile && (
                              <Badge className="text-xs" variant="outline">
                                Single File
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription>
                            {isSingleFile
                              ? "Single file - choose format below"
                              : hasGlobalFormat
                                ? `All files will convert to ${group.globalFormat}`
                                : "Set a global format for bulk conversion"}
                          </CardDescription>
                        </div>
                      </div>
                      {!isSingleFile && (
                        <Button
                          className={group.color[3]}
                          size="icon"
                          variant="outline"
                          onClick={() => toggleGroupExpansion(group.category)}
                        >
                          <SettingsIcon className={"h-4 w-4"} />
                        </Button>
                      )}
                    </div>

                    {!isSingleFile && (
                      <div className="mt-4 ">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Globe className="h-4 w-4" />
                            Global Format Selection:
                            {hasGlobalFormat && (
                              <Button
                                className={
                                  "ml-auto h-6 text-xs " + group.color[3]
                                }
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  removeGlobalFormat(group.category)
                                }
                              >
                                <RotateCcw className="h-3 w-3 mr-1" />
                                Remove Global
                              </Button>
                            )}
                          </div>

                          {!hasGlobalFormat ? (
                            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
                              {conversionOptions.map((format) => (
                                <Button
                                  key={format}
                                  className={"h-8 text-xs " + group.color[3]}
                                  disabled={convertingInGroup > 0}
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    setGlobalFormat(group.category, format)
                                  }
                                >
                                  {format}
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <div className="flex justify-between items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Badge
                                  className={
                                    group.color[4] + " " + group.color[5]
                                  }
                                >
                                  Selected: {group.globalFormat}
                                </Badge>
                              </div>
                              <Button
                                className={
                                  group.color[4] + " " + group.color[5]
                                }
                                disabled={convertingInGroup > 0}
                                onClick={() => {
                                  if (!settings.confirmBeforeConvert) {
                                    globalConvertGroup(group.category);
                                  } else {
                                    setConfirmModal({
                                      show: true,
                                      action: "converting",
                                      functionRef: () =>
                                        globalConvertGroup(group.category),
                                    });
                                  }
                                }}
                              >
                                <Zap className="h-4 w-4 mr-2" />
                                Convert All to {group.globalFormat} (
                                {group.files.length})
                                {convertingInGroup > 0 && (
                                  <Spinner variant="circle" />
                                )}
                              </Button>
                            </div>
                          )}

                          {hasGlobalFormat && (
                            <p className="text-xs text-gray-600">
                              This will override any individual format
                              selections for this file type.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardHeader>

                  <Collapsible
                    open={isSingleFile || isExpanded}
                    onOpenChange={() => toggleGroupExpansion(group.category)}
                  >
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        {!isSingleFile && <Separator className="mb-4" />}
                        <div className="space-y-4">
                          {!isSingleFile && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                              <User className="h-4 w-4" />
                              Individual file conversion options:
                              {hasGlobalFormat && (
                                <Badge className="text-xs" variant="outline">
                                  Overridden by global format
                                </Badge>
                              )}
                            </div>
                          )}

                          {group.files.map((uploadedFile) => {
                            const effectiveFormat = hasGlobalFormat
                              ? group.globalFormat
                              : uploadedFile.selectedFormat;
                            const isOverridden =
                              hasGlobalFormat &&
                              uploadedFile.selectedFormat !==
                                group.globalFormat;

                            return (
                              <Card
                                key={uploadedFile.id}
                                className="bg-white/50"
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className={"flex items-center gap-3 "}>
                                      {getFileIcon(uploadedFile.category, "sm")}
                                      <div>
                                        <h4 className="font-medium text-gray-900 text-sm">
                                          {uploadedFile.name}
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                          {uploadedFile.size}
                                          {effectiveFormat && (
                                            <span className="ml-2">
                                              → {effectiveFormat}
                                              {isOverridden && (
                                                <Badge
                                                  className="ml-1 text-xs"
                                                  variant="outline"
                                                >
                                                  Global
                                                </Badge>
                                              )}
                                            </span>
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <Button
                                      className="h-6 w-6"
                                      disabled={uploadedFile.isConverting}
                                      size="icon"
                                      variant="ghost"
                                      onClick={() =>
                                        removeFile(uploadedFile.id)
                                      }
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>

                                  <div className="space-y-3">
                                    <div
                                      className={
                                        hasGlobalFormat && !isSingleFile
                                          ? "opacity-50"
                                          : ""
                                      }
                                    >
                                      <label className="text-xs font-medium text-gray-700 mb-2 block">
                                        {isSingleFile
                                          ? "Choose format:"
                                          : `Individual format ${hasGlobalFormat ? "(overridden)" : ""}:`}
                                      </label>
                                      <div
                                        className={`grid gap-2 ${
                                          isSingleFile
                                            ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
                                            : "grid-cols-3 md:grid-cols-6 lg:grid-cols-8"
                                        }`}
                                      >
                                        {conversionOptions.map((format) => (
                                          <Button
                                            key={format}
                                            className={
                                              (isSingleFile
                                                ? " h-10 text-sm px-4 "
                                                : " h-6 text-xs px-2 ") +
                                              group.color[3] +
                                              " " +
                                              (uploadedFile.selectedFormat ===
                                                format && group.color[4])
                                            }
                                            disabled={
                                              uploadedFile.isConverting ||
                                              (hasGlobalFormat && !isSingleFile)
                                            }
                                            size={
                                              isSingleFile ? "default" : "sm"
                                            }
                                            variant={
                                              uploadedFile.selectedFormat ===
                                              format
                                                ? "default"
                                                : "outline"
                                            }
                                            onClick={() =>
                                              updateFileFormat(
                                                uploadedFile.id,
                                                format,
                                              )
                                            }
                                          >
                                            {format}
                                          </Button>
                                        ))}
                                      </div>
                                    </div>

                                    {effectiveFormat &&
                                      (isSingleFile || !hasGlobalFormat) && (
                                        <div className="flex items-center justify-between pt-2 border-t">
                                          <p className="text-xs text-gray-600">
                                            Convert to {effectiveFormat}
                                          </p>
                                          <Button
                                            className={
                                              (isSingleFile
                                                ? "h-8 text-sm "
                                                : "h-6 text-xs ") +
                                              group.color[5]
                                            }
                                            disabled={uploadedFile.isConverting}
                                            size={
                                              isSingleFile ? "default" : "sm"
                                            }
                                            onClick={() => {
                                              if (
                                                !settings.confirmBeforeConvert
                                              ) {
                                                convertFile(uploadedFile.id);
                                              } else {
                                                setConfirmModal({
                                                  show: true,
                                                  action: "converting",
                                                  functionRef: () =>
                                                    convertFile(
                                                      uploadedFile.id,
                                                    ),
                                                });
                                              }
                                            }}
                                          >
                                            {uploadedFile.isConverting ? (
                                              <div className="flex items-center gap-2">
                                                <div>Converting</div>
                                                <Spinner variant="circle" />
                                              </div>
                                            ) : (
                                              "Convert"
                                            )}
                                          </Button>
                                        </div>
                                      )}
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })}
            <UnsupportedFilesScreen
              unsupportedFiles={unsupportedFiles}
              onRemoveFile={removeFile}
              onRetry={() => window.location.reload()}
            />

            <ProgressBar
              files={uploadedFiles}
              isConverting={isConverting}
              settings={settings}
              onConvertAll={() => {
                if (!settings.confirmBeforeConvert) {
                  convertAllFiles();
                } else {
                  setConfirmModal({
                    show: true,
                    action: "converting",
                    functionRef: convertAllFiles,
                  });
                }
              }}
            />

            <Dialog
              open={confirmModal.show}
              onOpenChange={() => {
                setConfirmModal({
                  show: false,
                  action: "",
                  functionRef: null,
                });
              }}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Conversion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to proceed with {confirmModal.action}{" "}
                    these files?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between items-center gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setConfirmModal({
                        show: false,
                        action: "",
                        functionRef: null,
                      });
                    }}
                  >
                    No, Don&#39;t{" "}
                    {confirmModal.action === "converting"
                      ? "Convert"
                      : "Archive"}
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      confirmModal.functionRef();
                      setConfirmModal({
                        show: false,
                        action: "",
                        functionRef: null,
                      });
                    }}
                  >
                    Yes,{" "}
                    {confirmModal.action === "converting"
                      ? "Convert"
                      : "Archive"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
