import moment from 'moment';

export default class Formatter {
  static buildRequestResponseLogMessage(req, res) {
    return {
      when: moment().format(),
      environment: process.env.NODE_ENV || 'development',
      method: req.method,
      route: req.url,
      reqHeader: req.headers,
      responseTime: '???',
      httpStatus: res.status
    };
  }

  static buildErrorLogMessage(req, res, err, applicationName, reporter) {
    const msg = {
      when: moment().format(),
      environment: process.env.NODE_ENV || 'development',
      applicationName: applicationName,
      method: req.method,
      route: req.url,
      reqHeader: req.headers,
      payload: req.body,
      reporter: reporter,
      error: null
    };

    if (err) {
      msg.error = {
        code: err.code || err.statusCode,
        explanation: err.explanation,
        message: err.message,
        name: err.name,
        stack: err.stack,
        status: err.status
      };
    }

    return msg;
  }

  static buildLogMessage(req, res, errObj, applicationName, reporter) {
    return {
      when: moment().format(),
      environment: process.env.NODE_ENV || 'development',
      applicationName: applicationName,
      method: req.method,
      route: req.url,
      reqHeader: req.headers,
      payload: req.body,
      pid: process.pid,
      reporter: reporter,
      error: errObj
    };
  }
}
