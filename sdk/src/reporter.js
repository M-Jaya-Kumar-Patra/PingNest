import axios from "axios";

export const reportTelemetry = async (payload, endpoint) => {
  console.log("Sending telemetry:", payload);

  try {
    await axios.post(endpoint, payload);
  } catch (error) {
    console.log("Telemetry failed:", error.response?.data);
  }
};
