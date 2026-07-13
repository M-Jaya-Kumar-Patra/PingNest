import api from "./api";

export const loginUser = (data) => api.post("/auth/login", data);

export const registerUser = (data) => api.post("/auth/register", data);

export const getCurrentUser = () => api.get("/auth/me");

export const logoutUser = () => api.post("/auth/logout");

export const verifyEmail = (data) => {
  return api.post("/auth/verify-email", data);
};

export const resendOtp = (email) =>
  api.post("/auth/resend-verification-otp", {
    email,
  });

export const forgotPassword = (data) => 
  api.post("/auth/forgot-password", data);

export const resetPassword = (data) => 
  api.post("/auth/reset-password", data);


export const changePassword =
  (data) =>
    api.patch(
      "/auth/change-password",
      data
    );

export const deleteAccount =
  (data) =>
    api.delete(
      "/auth/delete-account",
      {
        data,
      }
    );