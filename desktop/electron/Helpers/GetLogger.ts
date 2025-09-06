import winston, { Logger } from "winston";

export function GetLogger(filename: string): Logger {
  const { simple } = winston.format;

  if (!simple) return;

  return winston.createLogger({
    level: "silly",
    format: simple(),
    transports: [new winston.transports.File({ filename })],
    exceptionHandlers: [new winston.transports.File({ filename })],
    rejectionHandlers: [new winston.transports.File({ filename })],
  });
}
