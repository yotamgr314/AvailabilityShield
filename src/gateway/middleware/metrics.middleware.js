const {
  recordRequestStart,
  recordRequestEnd
} = require("../../analyzer/traffic-metrics");

function metricsMiddleware(req, res, next) {
  if (!req.shieldContext) {
    return next();
  }

  recordRequestStart(req.shieldContext);

  res.on("finish", () => {
    recordRequestEnd(req.shieldContext, {
      statusCode: res.statusCode
    });
  });

  next();
}

module.exports = {
  metricsMiddleware
};
