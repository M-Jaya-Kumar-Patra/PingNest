# PingNest

<p align="center">
  <strong>Developer Observability Platform</strong>
</p>

<p align="center">
  API Monitoring • Uptime Monitoring • Incident Management • Real-Time Analytics
</p>

<p align="center">
  Monitor APIs, collect telemetry, track uptime, and manage incidents from a single dashboard.
</p>

---

## Overview

PingNest is a full-stack observability platform that helps developers monitor application performance, API reliability, uptime, and incidents from a unified dashboard.

With a single middleware, PingNest automatically captures telemetry data, tracks response times, analyzes failures, monitors uptime, and provides real-time insights into your services.

No custom logging infrastructure required.

---

## Architecture

```text
Application
      │
      ▼
 PingNest SDK
      │
      ▼
 Telemetry API
      │
      ▼
   MongoDB
      │
      ▼
 Real-Time Dashboard
      │
      ▼
 Monitoring & Incidents
```

---

## Features

### API Observability

- Request Monitoring
- Response Time Tracking
- Status Code Analytics
- Error Analytics
- Endpoint Insights

### Uptime Monitoring

- HTTP Endpoint Monitoring
- Configurable Check Intervals
- Availability Tracking
- Response Time Monitoring
- Consecutive Failure Detection

### Incident Management

- Automatic Incident Creation
- Incident Resolution Tracking
- Downtime Measurement
- Reliability Reporting
- Severity Classification

### Real-Time Dashboard

- Live Telemetry Streaming
- Project Analytics
- Health Metrics
- Service Monitoring
- Real-Time Updates

### Developer Experience

- Plug-and-Play Express Middleware
- Lightweight SDK
- Zero Configuration Setup
- Non-Blocking Telemetry Collection
- Simple API Key Integration

---

## Dashboard Preview

### Analytics Dashboard

Track request volume, success rates, response times, and endpoint performance.

### Uptime Monitoring

Monitor service availability with configurable health checks and uptime analytics.

### Incident Management

Automatically detect outages and track incident lifecycles.

---

## Installation

```bash
npm install pingnest
```

---

## Quick Start

### Import PingNest

```js
import pingNest from "pingnest";
```

### Add Middleware

```js
import express from "express";
import pingNest from "pingnest";

const app = express();

app.use(
  pingNest({
    apiKey: "pn_live_xxxxxxxxx",
    service: "auth-service",
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.listen(3000);
```

---

## Getting Started

### Step 1

Visit the PingNest Dashboard:

https://ping-nest.vercel.app

### Step 2

Create a new project.

### Step 3

Copy your API Key.

### Step 4

Add the middleware to your Express application.

### Step 5

Start sending requests.

Telemetry data will automatically appear in your dashboard.

---

## Configuration

### Basic Configuration

```js
app.use(
  pingNest({
    apiKey: "YOUR_API_KEY",
    service: "user-service",
  })
);
```

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
      "/favicon.ico",
    ],
  })
);
```

---

## Configuration Options

| Option         | Type       | Required | Description                 |
| -------------- | ---------- | -------- | --------------------------- |
| apiKey         | string     | Yes      | Project API Key             |
| service        | string     | Yes      | Service Name                |
| endpoint       | string     | No       | Custom Ingestion Endpoint   |
| ignoreRoutes   | string[]   | No       | Routes To Ignore            |

---

## Telemetry Captured

PingNest automatically collects telemetry for every request.

### Example Payload

```json
{
  "route": "/users",
  "method": "GET",
  "statusCode": 200,
  "responseTime": 142,
  "service": "user-service",
  "timestamp": "2026-07-18T10:00:00Z"
}
```

### Metrics Captured

- Route
- HTTP Method
- Status Code
- Response Time
- Service Name
- Timestamp

---

## Ignoring Routes

Certain endpoints may not need monitoring.

```js
app.use(
  pingNest({
    apiKey: "YOUR_API_KEY",

    service: "auth-service",

    ignoreRoutes: [
      "/health",
      "/metrics",
      "/favicon.ico",
    ],
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

    service: "backend-api",
  })
);

app.get("/users", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(5000);
```

---

## Uptime Monitoring

PingNest can monitor public HTTP endpoints and continuously track service availability.

### Features

- Uptime Percentage
- Availability Tracking
- Response Time Monitoring
- Health Checks
- Failure Detection
- Downtime Tracking

### Monitor Information

Each monitor stores:

- URL
- HTTP Method
- Monitoring Interval
- Last Response Time
- Current Status
- Consecutive Failures

---

## Incident Management

PingNest automatically creates incidents when a monitor experiences repeated failures.

### Incident Features

- Automatic Detection
- Severity Classification
- Resolution Tracking
- Downtime Measurement
- Monitor Association

### Incident Lifecycle

```text
Monitor Failure
       │
       ▼
Repeated Failures
       │
       ▼
Incident Created
       │
       ▼
Service Recovery
       │
       ▼
Incident Resolved
```

---

## Dashboard Features

The PingNest Dashboard provides:

### Analytics

- Total Requests
- Success Rate
- Error Rate
- Average Response Time
- Endpoint Analytics

### Monitoring

- Uptime Monitoring
- Response Time Trends
- Monitor Health Metrics
- Failure Tracking

### Incidents

- Active Incidents
- Resolved Incidents
- Downtime Analytics
- Reliability Reporting

### Realtime

- Live Telemetry
- Live Monitoring Updates
- Live Incident Updates

---

## Performance

PingNest is designed to be lightweight.

### Benefits

- Non-Blocking Telemetry Collection
- Minimal Runtime Overhead
- Asynchronous Processing
- Optimized For Production Workloads

Telemetry reporting runs asynchronously and does not block incoming requests.

---

## Requirements

### SDK

- Node.js 18+
- Express.js 4+

### Dashboard

- Modern Browser
- Internet Connection

---

## Documentation

Official Dashboard:

https://ping-nest.vercel.app

GitHub Repository:

https://github.com/M-Jaya-Kumar-Patra/PingNest

---

## Contributing

Contributions, issues, and feature requests are welcome.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

## License

MIT License

Copyright (c) 2026 M Jaya Kumar Patra

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to deal in the Software without restriction.

---

## Author

**M. Jaya Kumar Patra**

GitHub:
https://github.com/M-Jaya-Kumar-Patra

Built with ❤️ for developers who care about reliability.