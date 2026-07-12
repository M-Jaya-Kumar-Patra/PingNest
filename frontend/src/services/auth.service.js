import api from "./api";

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const getCurrentUser = ({ silent = false } = {}) =>
  api.get("/auth/me", {
    skipSessionExpired: silent,
  });
    
export const logoutUser = () =>
  api.post("/auth/logout", null, {
    skipAuthRefresh: true,
    skipSessionExpired: true,
  });
