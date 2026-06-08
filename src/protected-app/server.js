require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const healthRoutes = require("./routes/health.routes");
const basicRoutes = require("./routes/basic.routes");
const heavyRoutes = require("./routes/heavy.routes");

const app = express();

const PORT = process.env.PROTECTED_APP_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(healthRoutes);
app.use(basicRoutes);
app.use(heavyRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    path: req.path,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Protected Web App running on http://localhost:${PORT}`);
});
