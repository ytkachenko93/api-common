'use strict';
import winstonLoggerWrapper from './WinstonLoggerWrapper';

export default class Logger {
  private logger;

  constructor(options) {
    this.logger = winstonLoggerWrapper(options || {});
  }

  public silly(message) {
    this.log('silly', message);
  }

  public debug(message) {
    this.log('debug', message);
  }

  public verbose(message) {
    this.log('verbose', message);
  }

  public info(message) {
    this.log('info', message);
  }

  public warning(message) {
    this.log('warn', message);
  }

  public error(message) {
    this.log('error', message);
  }

  private sanitizeMessage(message) {
    if (typeof message === 'object') {
      return message;
    }

    return { message: message };
  }

  private log(level, message) {
    message = this.sanitizeMessage(message);
    message.loggingLevel = level.toUpperCase();
    this.logger.log(level, message);
  }
}
