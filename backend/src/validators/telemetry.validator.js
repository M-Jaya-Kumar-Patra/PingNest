import { z } from "zod";

export const telemetrySchema =
  z.object({
    apiKey: z.string(),

    route: z.string(),

    method: z.string(),

    service: z.string(),

    statusCode: z.number(),

    responseTime: z.number(),
  });