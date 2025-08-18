import { AppSettings } from "@/type/AppSettings";

export const defaultSettings: AppSettings = {
  saveLocation: "original",
  customSaveLocation: "",
  notifications: true,
  namingConvention: "original",
  namingPrefix: "converted_",
  namingSuffix: "_converted",
  progressDetail: "standard",
  autoOpenFolder: false,
  confirmBeforeConvert: false,
};
