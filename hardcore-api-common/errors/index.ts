import errorsLib from 'errors';
import logFormatter from '../util/LogMessageFormatter';

export function formatHttpError(err) {
  const httpError = {
    status: err.status || err.statusCode || 500,
    message: err.message || 'Internal Server Error'
  };

  if (errorsLib.find(err.name)) {
    const mappedError = errorsLib.mapError(err);
    if (mappedError) {
      httpError.status = mappedError.status;
      httpError.message = mappedError.message;
    }
  }

  return httpError;
}

export function formatLogMessage(req, res, err, appName, reporter) {
  const formattedLogMessage = logFormatter.buildLogMessage(
    req,
    res,
    err,
    appName,
    reporter
  );
  return formattedLogMessage;
}

export const errors = errorsLib;
