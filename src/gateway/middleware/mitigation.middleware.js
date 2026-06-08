const { loadPolicy, getEndpointPolicy } = require("../policies/policy-loader");
const { getMetricsSnapshot } = require("../../analyzer/traffic-metrics");
const { recordRequestInWindow } = require("../../analyzer/request-window-store");
const { decideMitigation } = require("../engine/rule-engine");
const { applyDecision } = require("../engine/decision-actions");

async function mitigationMiddleware(req, res, next) {
  const context = req.shieldContext;

  if (!context) {
    return next();
  }

  const policy = loadPolicy();
  const endpointPolicy = getEndpointPolicy(context.endpoint);
  const windowStats = recordRequestInWindow(context, policy);
  const metricsSnapshot = getMetricsSnapshot();

  const decision = decideMitigation({
    context,
    endpointPolicy,
    windowStats,
    metricsSnapshot,
    policy
  });

  context.decision = decision.decision;
  context.severity = decision.severity;
  context.reason = decision.reason;
  context.delayMs = decision.delayMs || 0;
  context.windowStats = windowStats;

  console.log(
    `[AvailabilityShield] DECISION ${context.decision.toUpperCase()} severity=${context.severity} endpoint=${context.endpoint} ip=${context.ip} reason="${context.reason}"`
  );

  return applyDecision(req, res, next);
}

module.exports = {
  mitigationMiddleware
};
