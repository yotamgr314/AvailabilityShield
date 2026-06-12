const path = require("path");
const { appendJsonLine, readLastJsonLines } = require("./log-writer");

const SECURITY_EVENT_LOG_PATH = path.resolve(__dirname, "../../logs/events/security-events.jsonl");

function writeSecurityEvent(context) {
  appendJsonLine(SECURITY_EVENT_LOG_PATH, {
    type: "security_event",
    requestId: context.requestId,
    ip: context.ip,
    method: context.method,
    endpoint: context.endpoint,
    originalUrl: context.originalUrl,
    decision: context.decision,
    severity: context.severity,
    reason: context.reason,
    delayMs: context.delayMs || 0,
    queueWaitMs: context.queueWaitMs || 0,
    windowStats: context.windowStats || null,
    timestamp: new Date().toISOString()
  });
}

function getRecentSecurityEvents(limit = 50) {
  return readLastJsonLines(SECURITY_EVENT_LOG_PATH, limit);
}

module.exports = {
  writeSecurityEvent,
  getRecentSecurityEvents
};
