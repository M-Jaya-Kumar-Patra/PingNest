"use client";

import { useState } from "react";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import {
  KeyRound,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import Button from "@/components/ui/Button";

import {
  verifyResetOtp,
} from "@/services/auth.service";

import toast from "react-hot-toast";

export default function VerifyResetOtpPage() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const email =
    searchParams.get("email");

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await verifyResetOtp({
        email,
        otp,
      });

      toast.success(
        "OTP verified successfully"
      );

      router.push(
        `/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`
      );
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
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
              Verify OTP
            </h1>

            <p
              className="
              text-center
              text-slate-400
              mt-3
              "
            >
              Enter the reset code sent
              to your email.
            </p>

            {email && (
              <p
                className="
                text-center
                text-orange-400
                text-sm
                mt-4
                break-all
                "
              >
                {email}
              </p>
            )}
          </div>

          <div className="px-8 pb-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  className="
                  block
                  text-sm
                  font-medium
                  text-white
                  mb-2
                  "
                >
                  OTP Code
                </label>

                <div className="relative">
                  <KeyRound
                    size={18}
                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    "
                  />

                  <input
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value
                      )
                    }
                    maxLength={6}
                    required
                    placeholder="000000"
                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-950
                    pl-12
                    pr-4
                    py-3
                    text-center
                    tracking-[6px]
                    text-white
                    outline-none
                    transition-all
                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-500/20
                    "
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
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
                  "Verify OTP"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
