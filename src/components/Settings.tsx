import { useEffect, useState } from "react";
import { Bell, Cog, FileType, FolderArchive, FolderOpen } from "lucide-react";
import { toast } from "sonner";

import { AppSettings } from "@/type/AppSettings";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { defaultSettings } from "@/Helpers/getDefaultSettings";

export function Settings({
  settings,
  onSettingsChange,
}: {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}) {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const SaveSettings = async (settings) => {
    return await window.ipcRenderer.invoke("settings", settings);
  };
  const handleSave = () => {
    onSettingsChange(localSettings);
    SaveSettings(localSettings).then((response) => {
      if (response.success) toast.success("Settings Saved");
      else toast.error("Something wrong happened !");
    });
  };

  const handleReset = () => {
    setLocalSettings(defaultSettings);
  };

  async function GetFolderPath() {
    const path = await window.ipcRenderer.invoke("getFolderPath");

    if (!path) {
      toast.error("Something wrong happened !");

      return;
    }

    setLocalSettings((prev) => {
      return { ...prev, saveLocation: "custom", customSaveLocation: path };
    });
  }

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Cog className="h-5 w-5" />
          Application Settings
        </DialogTitle>
        <DialogDescription>
          Customize the file conversion application to suit your preferences.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Save Location Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Default Save Location
            </CardTitle>
            <CardDescription>
              Choose how the application handles the save location for converted
              files.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              className="space-y-4"
              value={localSettings.saveLocation}
              onValueChange={(
                value: "ask" | "askOnce" | "original" | "custom",
              ) => setLocalSettings({ ...localSettings, saveLocation: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="ask" value="ask" />
                <Label className="" htmlFor="ask">
                  <div className="font-medium">
                    Ask Every Time
                    <div className="text-sm text-gray-500">
                      Select save location for each conversion
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="askOnce" value="askOnce" />
                <Label className="" htmlFor="askOnce">
                  <div className="font-medium">
                    Ask Once
                    <div className="text-sm text-gray-500">
                      Select save location once for multiple conversions
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="original" value="original" />
                <Label htmlFor="original">
                  <div className="font-medium">
                    Save to File Location
                    <div className="text-sm text-gray-500">
                      Save converted files in the same directory as originals
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="custom" value="custom" />
                <Label className="flex-1" htmlFor="custom">
                  <div className="font-medium">
                    Set Default Location
                    <div className="text-sm text-gray-500">
                      Specify a default save location for all conversions
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {localSettings.saveLocation === "custom" && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="customLocation">Default Save Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="customLocation"
                    placeholder="/path/to/converted/files"
                    value={localSettings.customSaveLocation}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        customSaveLocation: e.target.value,
                      })
                    }
                  />
                  <Button size="sm" variant="outline" onClick={GetFolderPath}>
                    Browse
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileType className="h-5 w-5" />
              File Naming Convention
            </CardTitle>
            <CardDescription>
              Choose how converted files should be named.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 flex justify-between items-baseline">
              <Label htmlFor="namingConvention">Naming Convention</Label>
              <Select
                value={localSettings.namingConvention}
                onValueChange={(
                  value: "original" | "prefix" | "suffix" | "both",
                ) =>
                  setLocalSettings({
                    ...localSettings,
                    namingConvention: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">Keep Original Name</SelectItem>
                  <SelectItem value="prefix">Add Prefix</SelectItem>
                  <SelectItem value="suffix">Add Suffix</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(localSettings.namingConvention === "prefix" ||
              localSettings.namingConvention === "both") && (
              <div className="space-y-2">
                <Label htmlFor="prefix">Prefix</Label>
                <Input
                  id="prefix"
                  placeholder="converted_"
                  value={localSettings.namingPrefix}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      namingPrefix: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-gray-500">
                  Example: {localSettings.namingPrefix}document.pdf
                </p>
              </div>
            )}

            {(localSettings.namingConvention === "suffix" ||
              localSettings.namingConvention === "both") && (
              <div className="space-y-2">
                <Label htmlFor="suffix">Suffix</Label>
                <Input
                  id="suffix"
                  placeholder="_converted"
                  value={localSettings.namingSuffix}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      namingSuffix: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-gray-500">
                  Example: document{localSettings.namingSuffix}.pdf
                </p>
              </div>
            )}
            {localSettings.namingConvention === "both" && (
              <p className="text-xs text-gray-500 font-bold">
                Final Name Example : {localSettings.namingPrefix}document
                {localSettings.namingSuffix}.pdf
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FolderArchive className="h-5 w-5" />
              Conversion Settings
            </CardTitle>
            <CardDescription>
              Configure how the application behaves while converting files
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="archive">Enable Archive</Label>
                <Label
                  className="text-sm text-gray-500 font-normal"
                  htmlFor="archive"
                >
                  Show the option to archive uploaded files
                </Label>
              </div>
              <Switch
                checked={localSettings.showArchive}
                id="archive"
                onCheckedChange={(checked) =>
                  setLocalSettings({
                    ...localSettings,
                    showArchive: checked,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications & Progress
            </CardTitle>
            <CardDescription>
              Configure how the application provides feedback during
              conversions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <Label
                  className="text-sm text-gray-500 font-normal"
                  htmlFor="notifications"
                >
                  Show notifications when conversions complete
                </Label>
              </div>
              <Switch
                checked={localSettings.notifications}
                id="notifications"
                onCheckedChange={(checked) =>
                  setLocalSettings({
                    ...localSettings,
                    notifications: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoOpenFolder">Auto-open Output Folder</Label>
                <Label
                  className="text-sm text-gray-500 font-normal"
                  htmlFor="autoOpenFolder"
                >
                  Automatically open the folder containing converted files
                </Label>
              </div>
              <Switch
                checked={localSettings.autoOpenFolder}
                id="autoOpenFolder"
                onCheckedChange={(checked) =>
                  setLocalSettings({
                    ...localSettings,
                    autoOpenFolder: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="confirmBeforeConvert">
                  Confirm Before Convert
                </Label>
                <Label
                  className="text-sm text-gray-500 font-normal"
                  htmlFor="confirmBeforeConvert"
                >
                  Show confirmation dialog before starting conversions
                </Label>
              </div>
              <Switch
                checked={localSettings.confirmBeforeConvert}
                id="confirmBeforeConvert"
                onCheckedChange={(checked) =>
                  setLocalSettings({
                    ...localSettings,
                    confirmBeforeConvert: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="progressDetail">Progress Detail Level</Label>
                <div className="text-sm text-gray-500">
                  {localSettings.progressDetail === "minimal" &&
                    "Minimal - Basic progress only"}
                  {localSettings.progressDetail === "standard" &&
                    "Standard - Progress with file names"}
                  {localSettings.progressDetail === "detailed" &&
                    "Detailed - Full conversion information"}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div />
                <Select
                  value={localSettings.progressDetail}
                  onValueChange={(value: "minimal" | "standard" | "detailed") =>
                    setLocalSettings({
                      ...localSettings,
                      progressDetail: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={handleReset}>
          Reset to Defaults
        </Button>
        <div className="flex gap-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button onClick={handleSave}>Save Settings</Button>
          </DialogTrigger>
        </div>
      </div>
    </DialogContent>
  );
}
