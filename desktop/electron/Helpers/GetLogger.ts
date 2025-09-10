import winston, { Logger } from "winston";

export function GetLogger(filename: string) {
  const { simple } = winston.format;

  return winston.createLogger({
    level: "silly",
    format: simple ? simple() : undefined,
    transports: [new winston.transports.File({ filename })],
    exceptionHandlers: [new winston.transports.File({ filename })],
    rejectionHandlers: [new winston.transports.File({ filename })],
  });
}
