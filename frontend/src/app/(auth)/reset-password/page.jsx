"use client";

import { useState } from "react";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import {
  ShieldCheck,
  KeyRound,
  Loader2,
  Lock,
} from "lucide-react";

import Button from "@/components/ui/Button";
import PasswordInput from "@/components/ui/PasswordInput";

import {
  resetPassword,
} from "@/services/auth.service";

import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const email =
    searchParams.get("email");

  const [otp, setOtp] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      password !== confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );

      return;
    }

    try {
      setLoading(true);

      await resetPassword({
        email,
        otp,
        password,
      });

      toast.success(
        "Password reset successfully"
      );

      router.push("/login");
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message || "Reset failed"
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
      {/* Glow */}

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
                  className="
                  text-orange-400
                  "
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
              Reset Password
            </h1>

            <p
              className="
              text-center
              text-slate-400
              mt-3
              "
            >
              Create a new password
              for your PingNest account.
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

          {/* Form */}

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

              <PasswordInput
                label="New Password"
                registration={{
                  value: password,
                  onChange: (e) =>
                    setPassword(
                      e.target.value
                    ),
                }}
              />

              <PasswordInput
                label="Confirm Password"
                registration={{
                  value:
                    confirmPassword,
                  onChange: (e) =>
                    setConfirmPassword(
                      e.target.value
                    ),
                }}
              />

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
                      className="
                      animate-spin
                      "
                    />

                    Resetting...
                  </div>
                ) : (
                  <div
                    className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    "
                  >
                    <Lock size={18} />
                    Reset Password
                  </div>
                )}
              </Button>
            </form>

            <p
              className="
              mt-6

              text-center

              text-xs
              text-slate-500
              "
            >
              Choose a strong password
              to keep your monitoring
              workspace secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}