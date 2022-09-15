import { createLogger, format, transports } from "winston";
import * as path from "path";
import Transport from "winston-transport";
import * as onFinished from "on-finished";
import { Request, Response } from "express";
import {TransformableInfo} from "logform";

export const Severity = {
  ERROR: "error",
  WARN: "warn",
  INFO: "info"
};

export interface OrganisationUnit {
  customer: string;
  businessUnit?: string;
}

export interface LogMessage {
  ou: OrganisationUnit,
  message: String
}

const redBeeSimpleLogFormat = ({message, level}: TransformableInfo) => {
  const now = new Date();
  return `[${now.toISOString()}]: ${level.toUpperCase()}  ${message}`;
};

const redBeeLogFormat = ({message, level}: TransformableInfo, ou: OrganisationUnit, appName: String) => {
  const now = new Date();
  const cu = ou?.customer || "";
  const bu = ou?.businessUnit || "";
  return `[${now.toISOString()}] [${cu}] [${bu}] [${appName}]: ${level.toUpperCase()}  ${message}`;
}

let simpleFormatLogger;

export function setupLogger(logDir: string, logToConsole = false, appName = "") {
  const enabledTransports: Transport[] = [
    new transports.File({
      filename: path.join(logDir, "/emp.log")
    })
  ];
  if (logToConsole) {
    enabledTransports.push(new transports.Console());
  }
  if (appName.length === 0) {
    simpleFormatLogger = createLogger({
      format: format.printf(redBeeSimpleLogFormat),
      transports: enabledTransports
    });
  } else {
    simpleFormatLogger = createLogger({
      format: format.printf((info) => redBeeLogFormat(info, info.ou, appName)),
      transports: enabledTransports
    });
  }
}

export const logger = {
  info: (args:String|LogMessage) => isString(args) ? simpleFormatLogger.info(args) : simpleFormatLogger.log({...args, level: "info"}),
  warn: (args:String|LogMessage) => isString(args) ? simpleFormatLogger.warn(args) : simpleFormatLogger.log({...args, level: "warn"}),
  error: (args:String|LogMessage) => isString(args) ? simpleFormatLogger.error(args) : simpleFormatLogger.log({...args, level: "error"}),

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

const isString = obj => typeof obj === 'string' || obj instanceof String;
