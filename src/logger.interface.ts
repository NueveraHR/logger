export interface LoggerOptions {
  logDirPath?: string;
  level?: LoggerLevel;
  isProd?: boolean;
}

export enum LoggerLevel {
  error = "error",
  warn = "warn",
  info = "info",
  http = "http",
  verbose = "verbose",
  debug = "debug",
  silly = "silly",
}
