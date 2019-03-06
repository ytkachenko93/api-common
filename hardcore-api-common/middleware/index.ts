import { getLogger, Formatter } from '../util';
import * as Errors from '../errors';

export function init(appName, options, loggerOptions) {
  options = options || {};

  const logger = getLogger(loggerOptions);
  const application = appName;

  function logError(error, req, res) {
    const msg = Formatter.buildErrorLogMessage(
      req,
      res,
      error,
      appName,
      'ErrorLoggingMiddleware'
    );
    logger.error(msg);
  }

  return {
    RequestResponseMiddleware: async (ctx, next) => {
      const { req, res } = ctx;

      res.on('finish', async () => {
        const whiteList = ['/healthcheck' /*, add more here */];

        if (whiteList.includes(req.originalUrl)) {
          return await next();
        }

        const message = Formatter.buildRequestResponseLogMessage(req, res);
        (message as any).reporter = 'RequestResponseMiddleware';
        (message as any).application = application;

        logger.info(message);
      });

      await next();
    },

    LoggerMiddleware: async (ctx, next) => {
      ctx.req.logger = logger;
      await next();
    },

    ErrorLoggingMiddleware: async (error, ctx, next) => {
      const { req, res } = ctx;

      if (error) {
        // log error
        logError(error, req, res);

        // format error for http response
        const httpError = Errors.formatHttpError(error);

        if (options.includeStackTraceInErrorResponses) {
          (httpError as any).stack = error.stack;
        }

        // return error
        ctx.status = httpError.status;
        ctx.body = httpError;

        return;
      }

      // no error was specified, return generic 500 error
      ctx.status = 500;
      ctx.body = { message: 'Internal Server Error' };

      return;
    }
  };
}
