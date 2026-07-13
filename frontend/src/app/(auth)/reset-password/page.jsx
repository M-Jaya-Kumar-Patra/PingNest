"use client";

import { useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import PasswordInput from "@/components/ui/PasswordInput";

import { resetPassword } from "@/services/auth.service";

import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      setLoading(true);

      await resetPassword({
        email,
        otp,
        password,
      });

      toast.success("Password reset successfully");

      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border">
        <h1 className="text-3xl font-bold mb-2">Reset Password</h1>

        <p className="text-gray-500 mb-6">
          Enter the OTP and your new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength={6}
            className="
            w-full
            border
            rounded-lg
            p-3
            text-center
            tracking-widest
            "
          />

          <PasswordInput
            label="New Password"
            registration={{
              value: password,
              onChange: (e) => setPassword(e.target.value),
            }}
          />

          <PasswordInput
            label="Confirm Password"
            registration={{
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
            }}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
