import winston, { Logger } from "winston";

export function GetLogger(filename: string): Logger {
  const { combine, timestamp, json } = winston.format;

  if (!combine || !timestamp || !json) return;

  return winston.createLogger({
    level: "silly",
    format: combine(timestamp(), json()),
    transports: [new winston.transports.File({ filename })],
    exceptionHandlers: [new winston.transports.File({ filename })],
    rejectionHandlers: [new winston.transports.File({ filename })],
  });
}
