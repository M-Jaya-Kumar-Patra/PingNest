# PingNest SDK

Plug-and-play API monitoring for Express applications.

## Installation

```bash
npm install pingnest-sdk
```

## Usage

```js
import express from "express";
import pingNest from "pingnest-sdk";

const app = express();

app.use(
  pingNest({
    apiKey: "YOUR_API_KEY",
    service: "my-service",
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(3000);
```

## Options

| Option | Required | Description |
|----------|----------|----------|
| apiKey | Yes | Project API Key |
| service | Yes | Service Name |
| endpoint | No | Custom ingestion endpoint |
| ignoreRoutes | No | Routes to ignore |

## License

MIT