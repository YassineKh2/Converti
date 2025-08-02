export interface AppSettings {
  saveLocation: "ask" | "original" | "custom";
  customSaveLocation: string;
  notifications: boolean;
  namingConvention: "original" | "prefix" | "suffix";
  namingPrefix: string;
  namingSuffix: string;
  progressDetail: "minimal" | "standard" | "detailed";
  autoOpenFolder: boolean;
  confirmBeforeConvert: boolean;
}
