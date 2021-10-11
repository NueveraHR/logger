import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as winston from "winston";
import { LoggerLevel } from ".";
import { LoggerOptions } from "./logger.interface";

@Injectable()
export class LoggerService {
  private loggerFileName: string;
  private winstonLoggerInstance: any;

  constructor({
    logDirPath,
    level = LoggerLevel.debug,
    isProd,
  }: LoggerOptions) {
    if (isProd) {
      this.loggerFileName = new Date().getTime() + ".log";
    } else {
      this.loggerFileName = "nuevera.log";
    }

    const defaultFormat = [
      winston.format.errors({ stack: true }), // <-- use errors format
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.prettyPrint(),
      winston.format.printf(({ level, message, timestamp }) => {
        return `[${level.toUpperCase()}] ${timestamp} :: ${message}`;
      }),
    ];

    this.winstonLoggerInstance = winston.createLogger({
      transports: [
        new winston.transports.File({
          level,
          format: winston.format.combine(...defaultFormat),
          filename: path.join(logDirPath, this.loggerFileName),
        }),
        new winston.transports.Console({
          level,
          format: winston.format.combine(
            winston.format.colorize({ message: true, level: false }),
            ...defaultFormat
          ),
        }),
      ],
    });
  }

  debug(message) {
    this.winstonLoggerInstance.debug(`${message}`);
  }

  error(message) {
    this.winstonLoggerInstance.error(`${message}`);
  }

  info(message) {
    this.winstonLoggerInstance.info(`${message}`);
  }

  http(message) {
    this.winstonLoggerInstance.http(`${message}`);
  }

  silly(message) {
    this.winstonLoggerInstance.silly(`${message}`);
  }

  verbose(message) {
    this.winstonLoggerInstance.verbose(`${message}`);
  }

  warn(message) {
    this.winstonLoggerInstance.warn(`${message}`);
  }
}
