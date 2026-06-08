const { sleep } = require("../../shared/sleep");

async function applyDecision(req, res, next) {
  const context = req.shieldContext;

  res.setHeader("x-availabilityshield-decision", context.decision);
  res.setHeader("x-availabilityshield-severity", context.severity);
  res.setHeader("x-availabilityshield-reason", encodeURIComponent(context.reason || ""));

  if (context.decision === "allow") {
    return next();
  }

  if (context.decision === "delay") {
    await sleep(context.delayMs || 0);
    return next();
  }

  if (context.decision === "queue") {
    await sleep(context.delayMs || 0);
    return next();
  }

  if (context.decision === "limit") {
    return res.status(429).json({
      error: "Rate limited",
      decision: context.decision,
      severity: context.severity,
      reason: context.reason,
      requestId: context.requestId,
      timestamp: new Date().toISOString()
    });
  }

  if (context.decision === "drop") {
    return res.status(503).json({
      error: "Request dropped by AvailabilityShield",
      decision: context.decision,
      severity: context.severity,
      reason: context.reason,
      requestId: context.requestId,
      timestamp: new Date().toISOString()
    });
  }

  return next();
}

module.exports = {
  applyDecision
};
