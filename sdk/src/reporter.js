import axios from "axios";

export const reportTelemetry = async (payload, endpoint) => {
  try {
    await axios.post(endpoint, payload, {
      timeout: 5000,
    });
  } catch (error) {
    console.error("[PingNest]", error.message);
  }
};
