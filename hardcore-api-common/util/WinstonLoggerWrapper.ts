import winston from 'winston';

export default function winstonLoggerWrapper(options) {
  const transports = [];

  if (options.fileOptions) {
    if (!options.fileOptions.logFileFullPath) {
      options.fileOptions.logFileFullPath = '/var/log/node_apps.log';
    }
  }

  if (options.consoleOptions) {
    if (!('json' in options.consoleOptions)) {
      options.consoleOptions.json = true;
    }
    if (!('colorize' in options.consoleOptions)) {
      options.consoleOptions.colorize = true;
    }

    transports.push(new winston.transports.Console(options.consoleOptions));
  }

  return winston.createLogger({ transports });
}
