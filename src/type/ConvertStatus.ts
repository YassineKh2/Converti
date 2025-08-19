export interface ConvertStatus {
  status: "pending" | "converting" | "completed" | "error";
  Logs: string[];
  path?: string;
  progress: number;
}
