export interface AppSettings {
  saveLocation: "ask" | "askOnce" | "original" | "custom";
  customSaveLocation: string;
  notifications: boolean;
  namingConvention: "original" | "prefix" | "suffix" | "both";
  namingPrefix: string;
  namingSuffix: string;
  namingConventionArchive: "original" | "ask" | "custom";
  namingArchive: string;
  removeTimestamp: boolean;
  progressDetail: "minimal" | "standard" | "detailed";
  autoOpenFolder: boolean;
  confirmBeforeConvert: boolean;
  showArchive: boolean;
  clearFiles: boolean;
}
export interface InternalAppSettings {
  firstLunch : boolean
}