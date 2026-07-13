import express from "express";

import pingNest from "../src/index.js";

const app = express();

app.use(
  pingNest({
    apiKey: "pn_live_961bdbca3d078adc6cd35b21830e3c5a55566c167887e233",
    service: "test-service",



    endpoint:
      "https://pingnest-m2jh.onrender.com/api/v1/telemetry/ingest",
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Hello PingNest",
  });
});

app.get("/users", (req, res) => {
  setTimeout(() => {
    res.json({
      users: [],
    });
  }, 100);
});

app.listen(3001, () => {
  console.log(
    "Test app running on port 3001"
  );
});