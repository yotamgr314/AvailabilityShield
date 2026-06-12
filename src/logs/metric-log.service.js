const path = require("path");
const { appendJsonLine, readLastJsonLines } = require("./log-writer");

const METRIC_LOG_PATH = path.resolve(__dirname, "../../logs/metrics/metrics.jsonl");

function writeMetricSnapshot(snapshot) {
  appendJsonLine(METRIC_LOG_PATH, {
    type: "metric_snapshot",
    snapshot,
    timestamp: new Date().toISOString()
  });
}

function getRecentMetricSnapshots(limit = 20) {
  return readLastJsonLines(METRIC_LOG_PATH, limit);
}

module.exports = {
  writeMetricSnapshot,
  getRecentMetricSnapshots
};
