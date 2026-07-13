"use client";

import { useState, useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { verifyEmail, resendOtp } from "@/services/auth.service";

import Button from "@/components/ui/Button";

export default function VerifyEmailPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [countdown, setCountdown] = useState(60);

  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      await verifyEmail({
        email,
        otp,
      });

      toast.success("Email verified successfully");

      router.push("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend =
  async () => {

    try {

      setResendLoading(
        true
      );

      await resendOtp(
        email
      );

      toast.success(
        "OTP sent"
      );

      setCountdown(60);

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to resend OTP"
      );

    } finally {

      setResendLoading(
        false
      );

    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      px-4
      "
    >
      <div
        className="
        bg-white
        border
        rounded-2xl
        p-8
        w-full
        max-w-md
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-2
          "
        >
          Verify Email
        </h1>

        <p
          className="
          text-gray-500
          mb-6
          "
        >
          Enter the OTP sent to
          <br />
          <span className="font-medium">{email}</span>
        </p>

        {error && (
          <div
            className="
            mb-4
            bg-red-50
            border
            border-red-200
            text-red-600
            p-3
            rounded-lg
            text-sm
            "
          >
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
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
            text-2xl
            tracking-widest
            "
          />

          <Button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </Button>


          <div className="text-center mt-4">

  {countdown > 0 ? (

    <p
      className="
      text-sm
      text-gray-500
      "
    >
      Resend OTP in{" "}
      {countdown}s
    </p>

  ) : (

    <button
      type="button"
      onClick={
        handleResend
      }
      disabled={
        resendLoading
      }
      className="
      text-sm
      font-medium
      underline
      "
    >
      {resendLoading
        ? "Sending..."
        : "Resend OTP"}
    </button>

  )}

</div>
        </form>
      </div>
    </div>
  );
}
