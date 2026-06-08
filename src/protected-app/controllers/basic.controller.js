function getBasic(req, res) {
  res.json({
    endpoint: "/api/basic",
    type: "basic",
    message: "Basic endpoint is available",
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  getBasic
};
