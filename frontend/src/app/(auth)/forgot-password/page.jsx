"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Mail,
  ShieldAlert,
  Loader2,
  ArrowRight,
} from "lucide-react";

import Button from "@/components/ui/Button";

import {
  forgotPassword,
} from "@/services/auth.service";

import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await forgotPassword({
        email,
      });

      toast.success(
        "OTP sent successfully"
      );

      router.push(
        `/reset-password?email=${email}`
      );
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to send OTP"
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
                <ShieldAlert
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
              Forgot Password
            </h1>

            <p
              className="
              text-center
              text-slate-400
              mt-3
              "
            >
              Enter your email address
              and we'll send a
              verification code.
            </p>
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
                  Email Address
                </label>

                <div className="relative">
                  <Mail
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
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    placeholder="you@example.com"
                    required
                    className="
                    w-full

                    rounded-xl

                    border
                    border-slate-700

                    bg-slate-950

                    pl-12
                    pr-4
                    py-3

                    text-white
                    placeholder:text-slate-500

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
                      className="
                      animate-spin
                      "
                    />
                    Sending OTP...
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
                    Send OTP
                    <ArrowRight
                      size={18}
                    />
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
              We'll send a secure
              verification code to
              your registered email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}