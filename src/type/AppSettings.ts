export interface AppSettings {
  saveLocation: "ask" | "askOnce" | "original" | "custom";
  customSaveLocation: string;
  notifications: boolean;
  namingConvention: "original" | "prefix" | "suffix" | "both";
  namingPrefix: string;
  namingSuffix: string;
  progressDetail: "minimal" | "standard" | "detailed";
  autoOpenFolder: boolean;
  confirmBeforeConvert: boolean;
  showArchive: boolean;
}
