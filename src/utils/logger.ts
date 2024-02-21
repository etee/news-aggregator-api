import winston, { createLogger, transports } from "winston";
const { combine, timestamp, printf } = winston.format;

const dateFormat = "YYYY-MM-DD hh:mm:ss.SSS A";
const errorLogsFileName = "logs/errorLogs.log";
const warningLogsFileName = "logs/warningLogs.log";

const myFormat = printf((info) => {
  return `[${info.timestamp}] ${info.level}: ${info.message} `;
});

const logger: winston.Logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      level: "error",
      filename: errorLogsFileName,
    }),
    new transports.File({
      level: "warn",
      filename: warningLogsFileName,
    }),
  ],
  format: combine(timestamp({ format: dateFormat }), myFormat),
});

export default logger;
