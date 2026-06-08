require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { loadPolicy } = require("./policies/policy-loader");
const { requestContextMiddleware } = require("./middleware/request-context.middleware");
const { metricsMiddleware } = require("./middleware/metrics.middleware");
const { mitigationMiddleware } = require("./middleware/mitigation.middleware");
const { createReverseProxy } = require("./proxy/reverse-proxy");
const { getMetricsSnapshot } = require("../analyzer/traffic-metrics");
const { getWindowSnapshot } = require("../analyzer/request-window-store");

const app = express();

const PORT = process.env.GATEWAY_PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/__shield/health", (req, res) => {
  const policy = loadPolicy();

  res.json({
    service: "availabilityshield-gateway",
    status: "ok",
    protectedTarget: policy.protectedTarget,
    timestamp: new Date().toISOString()
  });
});

app.get("/__shield/metrics", (req, res) => {
  res.json({
    metrics: getMetricsSnapshot(),
    windows: getWindowSnapshot()
  });
});

app.use(requestContextMiddleware);
app.use(metricsMiddleware);
app.use(mitigationMiddleware);
app.use(createReverseProxy());

app.listen(PORT, () => {
  const policy = loadPolicy();

  console.log(`AvailabilityShield Gateway running on http://localhost:${PORT}`);
  console.log(`Protected target: ${policy.protectedTarget}`);
});
