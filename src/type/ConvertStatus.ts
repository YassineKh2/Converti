export interface ConvertStatus {
  status: "pending" | "converting" | "completed" | "error";
  Logs: string[];
  progress: number;
}
