import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    console.log(
  "INTERCEPTOR",
  error.response?.status,
  originalRequest.url
);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token") &&
  !originalRequest.url.includes("/auth/me")
    ) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          console.log(
  "TRYING REFRESH"
);
          isRefreshing = true;

          await api.post("/auth/refresh-token");
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.log(
  "REFRESH FAILED"
);
        console.log("SESSION EXPIRED EVENT FIRED");

        window.dispatchEvent(new Event("session-expired"));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
