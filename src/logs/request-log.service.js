const path = require("path");
const { appendJsonLine, readLastJsonLines } = require("./log-writer");

const REQUEST_LOG_PATH = path.resolve(__dirname, "../../logs/requests/requests.jsonl");

function writeRequestLog(context, result) {
  appendJsonLine(REQUEST_LOG_PATH, {
    type: "request",
    requestId: context.requestId,
    ip: context.ip,
    method: context.method,
    endpoint: context.endpoint,
    originalUrl: context.originalUrl,
    statusCode: result.statusCode,
    durationMs: result.durationMs,
    decision: context.decision,
    severity: context.severity,
    reason: context.reason,
    delayMs: context.delayMs || 0,
    queueWaitMs: context.queueWaitMs || 0,
    windowStats: context.windowStats || null,
    timestamp: new Date().toISOString()
  });
}

function getRecentRequestLogs(limit = 50) {
  return readLastJsonLines(REQUEST_LOG_PATH, limit);
}

module.exports = {
  writeRequestLog,
  getRecentRequestLogs
};
