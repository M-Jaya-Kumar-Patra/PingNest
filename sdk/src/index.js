import DEFAULT_CONFIG from "./config.js";
import { reportTelemetry } from "./reporter.js";

const pingNest = (options) => {
  const config = {
    ...DEFAULT_CONFIG,
    ...options,
  };

  if (!config.apiKey) {
    throw new Error("PingNest apiKey is required");
  }

  if (!config.service) {
    throw new Error("PingNest service is required");
  }

  return (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      const responseTime = Date.now() - start;

      const shouldIgnore = config.ignoreRoutes.some((route) =>
        req.originalUrl.startsWith(route),
      );

      if (shouldIgnore) {
        return;
      }
      reportTelemetry(
        {
          apiKey: config.apiKey,
          service: config.service,
          route: req.originalUrl,
          method: req.method,
          statusCode: res.statusCode,
          responseTime,
        },
        config.endpoint,
      );
    });

    next();
  };
};

export default pingNest;
