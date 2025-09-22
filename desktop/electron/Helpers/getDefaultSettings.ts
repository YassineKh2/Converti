import {AppSettings, InternalAppSettings} from "@/type/AppSettings";

export const defaultSettings: AppSettings = {
  saveLocation: "askOnce",
  customSaveLocation: "",
  notifications: true,
  namingConvention: "original",
  namingPrefix: "converted_",
  namingSuffix: "_converted",
  namingConventionArchive: "original",
  namingArchive: "myArchive",
  removeTimestamp: false,
  progressDetail: "standard",
  autoOpenFolder: true,
  confirmBeforeConvert: false,
  showArchive: true,
  clearFiles:true
};

export const appSettings:InternalAppSettings  = {
  firstLunch : true
}