import { createLogger, format, transports } from "winston";
import * as path from "path";
import Transport from "winston-transport";
import * as onFinished from "on-finished";
import { Request, Response } from "express";

export const Severity = {
  ERROR: "error",
  WARN: "warn",
  INFO: "info"
};

const redBeeSimpleLogFormat = format.printf(({ message, level }) => {
  const now = new Date();
  return `[${now.toISOString()}]: ${level.toUpperCase()}  ${message}`;
});

let simpleFormatLogger;
export function setupLogger(logDir: string, logToConsole = false) {
  const enabledTransports: Transport[] = [
    new transports.File({
      filename: path.join(logDir, "/emp.log")
    })
  ];
  if (logToConsole) {
    enabledTransports.push(new transports.Console());
  }
  simpleFormatLogger = createLogger({
    format: redBeeSimpleLogFormat,
    transports: enabledTransports
  });
}

export const logger = {
  info: (...args) => simpleFormatLogger.info(args),
  warn: (...args) => simpleFormatLogger.warn(args),
  error: (...args) => simpleFormatLogger.error(args),

  loggerMiddleware: (req: Request, res: Response, next, immediate = false) => {
    function log() {
      if (res.statusCode >= 400) {
        const statusCodeString = res.statusCode.toString();
        const accessMessage = `${req.method} ${req.path} HTTP/${req.httpVersion} ${statusCodeString}`;
        if (statusCodeString.startsWith("5")) {
          logger.logAccess({
            severity: Severity.ERROR,
            message: accessMessage
          });
        } else if (statusCodeString.startsWith("4") && statusCodeString !== "404") {
          logger.logAccess({
            severity: Severity.WARN,
            message: accessMessage
          });
        } else {
          logger.logAccess({
            severity: Severity.INFO,
            message: accessMessage
          });
        }
      }
    }
    if (immediate) {
      log();
    } else {
      onFinished(res, log);
    }
    next();
  },

  logAccess: ({ severity, message }) => {
    switch (severity) {
      case Severity.ERROR:
        simpleFormatLogger.error({ message });
        break;
      case Severity.WARN:
        simpleFormatLogger.warn({ message });
        break;
      default:
        simpleFormatLogger.info({ message });
        break;
    }
  }
};
