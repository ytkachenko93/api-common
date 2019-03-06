import Logger from './Logger';
import LogFormatter from './LogMessageFormatter';

let loggerInstance = null;

export function getLogger(loggerOptions) {
  if (loggerInstance) {
    return loggerInstance;
  }

  loggerInstance = new Logger(loggerOptions);
  return loggerInstance;
}

export const Formatter = LogFormatter;
