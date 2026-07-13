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

    if (
  error.response?.status === 401 &&
  !originalRequest?._retry &&
  !originalRequest?.url?.includes("/auth/refresh-token") &&
  !originalRequest?.url?.includes("/auth/login") &&
  !originalRequest?.url?.includes("/auth/register")
) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          await api.post("/auth/refresh-token");

          isRefreshing = false;
        }

        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

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

