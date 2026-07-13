"use client";

import { useState, useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { verifyEmail, resendOtp } from "@/services/auth.service";

import Button from "@/components/ui/Button";

import {
  ShieldCheck,
  Mail,
  Loader2,
  RefreshCw,
} from "lucide-react";


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
    bg-slate-950
    relative
    overflow-hidden

    flex
    items-center
    justify-center

    px-4
    py-8
    "
  >
    {/* Background Glow */}

    <div
      className="
      absolute
      top-0
      left-1/2
      -translate-x-1/2

      h-[500px]
      w-[500px]

      rounded-full

      bg-orange-500/10

      blur-[120px]
      "
    />

    <div
      className="
      relative
      z-10

      w-full
      max-w-md
      "
    >
      <div
        className="
        rounded-3xl

        border
        border-slate-800

        bg-slate-900/80
        backdrop-blur-xl

        shadow-2xl

        overflow-hidden
        "
      >
        {/* Header */}

        <div className="p-8">
          <div
            className="
            flex
            justify-center
            mb-6
            "
          >
            <div
              className="
              h-16
              w-16

              rounded-2xl

              bg-orange-500/10
              border
              border-orange-500/20

              flex
              items-center
              justify-center
              "
            >
              <ShieldCheck
                size={30}
                className="text-orange-400"
              />
            </div>
          </div>

          <h1
            className="
            text-3xl
            font-bold

            text-center
            text-white
            "
          >
            Verify Email
          </h1>

          <p
            className="
            text-center
            text-slate-400
            mt-3
            "
          >
            Enter the verification code
            sent to
          </p>

          <div
            className="
            mt-4

            flex
            items-center
            justify-center
            gap-2

            text-orange-400
            text-sm
            "
          >
            <Mail size={16} />

            <span className="break-all">
              {email}
            </span>
          </div>
        </div>

        {/* Form */}

        <div className="px-8 pb-8">
          {error && (
            <div
              className="
              mb-5

              rounded-xl

              border
              border-red-500/20

              bg-red-500/10

              px-4
              py-3

              text-sm
              text-red-400
              "
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleVerify}
            className="space-y-5"
          >
            <input
              type="text"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
              maxLength={6}
              placeholder="000000"
              className="
              w-full

              rounded-2xl

              border
              border-slate-700

              bg-slate-950

              px-4
              py-4

              text-center

              text-3xl
              font-semibold

              tracking-[10px]

              text-white

              outline-none

              transition-all

              focus:border-orange-500
              focus:ring-2
              focus:ring-orange-500/20
              "
            />

            <Button
              type="submit"
              disabled={
                loading ||
                otp.length !== 6
              }
              className="
              w-full
              h-12
              "
            >
              {loading ? (
                <div
                  className="
                  flex
                  items-center
                  gap-2
                  "
                >
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Verifying...
                </div>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>

          {/* Resend */}

          <div
            className="
            mt-6
            text-center
            "
          >
            {countdown > 0 ? (
              <div
                className="
                inline-flex
                items-center
                gap-2

                rounded-full

                bg-slate-800

                px-4
                py-2

                text-sm
                text-slate-400
                "
              >
                Resend OTP in
                <span className="text-orange-400">
                  {countdown}s
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={
                  resendLoading
                }
                className="
                inline-flex
                items-center
                gap-2

                text-orange-400

                hover:text-orange-300

                transition-colors
                "
              >
                {resendLoading ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw
                      size={16}
                    />
                    Resend OTP
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
