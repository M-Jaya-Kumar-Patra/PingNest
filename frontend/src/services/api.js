import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api/v1",

  timeout: 10000,

  withCredentials: true,
});

let refreshPromise = null;
let sessionExpiredDispatched = false;

const notifySessionExpired = () => {
  if (typeof window === "undefined" || sessionExpiredDispatched) {
    return;
  }

  sessionExpiredDispatched = true;
  window.dispatchEvent(new Event("session-expired"));
};

export const resetSessionExpiredNotice = () => {
  sessionExpiredDispatched = false;
};

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = api
      .post("/auth/refresh-token", null, {
        skipAuthRefresh: true,
        skipSessionExpired: true,
      })
      .then((response) => {
        resetSessionExpiredNotice();
        return response;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

export const getApiErrorMessage = (
  error,
  fallback = "Something went wrong",
) => {
  if (!error?.response) {
    return "Unable to connect to server";
  }

  return error.response?.data?.message || fallback;
};

export const isSessionExpiredError = (error) => {
  if (error?.response?.status !== 401) {
    return false;
  }

  const message = error.response?.data?.message || "";

  return (
    message.toLowerCase().includes("session expired") ||
    message.toLowerCase().includes("unauthorized") ||
    message.toLowerCase().includes("access token")
  );
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh &&
      !originalRequest.url?.includes("/auth/refresh-token") &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/register")
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();

        return api(originalRequest);
      } catch (refreshError) {
        if (!originalRequest.skipSessionExpired) {
          notifySessionExpired();
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
