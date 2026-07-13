# PingNest

<p align="center">
  <strong>Plug-and-Play API Monitoring for Express Applications</strong>
</p>

<p align="center">
  Monitor requests, response times, status codes, and API health in real time with a single middleware.
</p>

---

## Overview

PingNest is a developer observability platform that helps you monitor your APIs without building custom logging or analytics solutions.

Simply install the PingNest SDK, add one middleware, and start collecting telemetry data in your PingNest dashboard.

---

## Features

- Request Monitoring
- Response Time Tracking
- Status Code Analytics
- Real-Time Telemetry Collection
- Plug-and-Play Express Middleware
- Centralized Dashboard
- Zero Configuration Setup
- Lightweight and Non-Blocking

---

## Installation

```bash
npm install pingnest
```

---

## Quick Start

### 1. Import PingNest

```js
import pingNest from "pingnest";
```

---

### 2. Add Middleware

```js
import express from "express";
import pingNest from "pingnest";

const app = express();

app.use(
  pingNest({
    apiKey: "YOUR_API_KEY",
    service: "user-service"
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World"
  });
});

app.listen(3000);
```

---

### 3. View Metrics

Login to the PingNest Dashboard:

https://ping-nest.vercel.app

Create a project and copy your API key.

Once requests start hitting your server, telemetry data will automatically appear in your dashboard.

---

## Configuration

### Basic Configuration

```js
app.use(
  pingNest({
    apiKey: "YOUR_API_KEY",
    service: "user-service"
  })
);
```

---

### Advanced Configuration

```js
app.use(
  pingNest({
    apiKey: "YOUR_API_KEY",
    service: "user-service",

    endpoint:
      "https://your-custom-endpoint.com",

    ignoreRoutes: [
      "/health",
      "/favicon.ico"
    ]
  })
);
```

---

## Options

| Option | Type | Required | Description |
|----------|----------|----------|----------|
| apiKey | string | Yes | Project API Key |
| service | string | Yes | Service Name |
| endpoint | string | No | Custom ingestion endpoint |
| ignoreRoutes | string[] | No | Routes to ignore |

---

## Telemetry Captured

For every request PingNest collects:

```json
{
  "route": "/users",
  "method": "GET",
  "statusCode": 200,
  "responseTime": 125,
  "service": "user-service"
}
```

---

## Ignoring Routes

Some endpoints should not be monitored.

Example:

```js
app.use(
  pingNest({
    apiKey: "YOUR_API_KEY",
    service: "user-service",

    ignoreRoutes: [
      "/health",
      "/metrics"
    ]
  })
);
```

---

## Example Project

```js
import express from "express";
import pingNest from "pingnest";

const app = express();

app.use(
  pingNest({
    apiKey: "pn_live_xxxxxxxxx",
    service: "backend-api"
  })
);

app.get("/users", (req, res) => {
  res.json({
    success: true
  });
});

app.listen(5000);
```

---

## Dashboard Features

The PingNest Dashboard provides:

- Total Requests
- Success Rate
- Error Rate
- Average Response Time
- API Health Score
- Project Analytics
- Real-Time Monitoring

---

## Performance

PingNest is designed to be lightweight.

Telemetry reporting runs asynchronously and does not block incoming requests.

---

## Requirements

- Node.js 18+
- Express.js 4+

---

## Roadmap

### Current

- API Monitoring
- Request Analytics
- Health Score Tracking

### Upcoming

- Error Tracking
- Alerts & Notifications
- Uptime Monitoring
- Multi-Service Monitoring
- Slack Integration
- Email Alerts

---

## Documentation

Official Dashboard:

https://ping-nest.vercel.app

Source Code:

https://github.com/M-Jaya-Kumar-Patra/PingNest

---

## Contributing

Contributions, issues, and feature requests are welcome.

Feel free to open an issue or submit a pull request.

---

## License

MIT License

Copyright (c) 2026 M Jaya Kumar Patra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...

---

## Author

**M Jaya Kumar Patra**

GitHub:
https://github.com/M-Jaya-Kumar-Patra

Built with ❤️ for developers.