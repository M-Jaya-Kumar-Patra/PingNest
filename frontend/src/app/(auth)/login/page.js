"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Activity,
  Loader2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Button from "@/components/ui/Button";
import PasswordInput from "@/components/ui/PasswordInput";

import useAuth from "@/hooks/useAuth";
import { loginUser } from "@/services/auth.service";

import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const { refreshUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      setAuthError("");

      await loginUser(data);

      await refreshUser();

      toast.success("Login successful");

      router.push("/dashboard");
    } catch (error) {
      setAuthError(
        error?.response?.data?.message ||
          "Invalid email or password"
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
      sm:px-6
      lg:px-8
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
        h-[300px]
        w-[300px]
        sm:h-[500px]
        sm:w-[500px]
        rounded-full
        bg-orange-500/10
        blur-[120px]
        "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        h-[250px]
        w-[250px]
        sm:h-[400px]
        sm:w-[400px]
        rounded-full
        bg-amber-500/10
        blur-[120px]
        "
      />

      <div
        className="
        relative
        z-10
        w-full
        max-w-6xl
        grid
        lg:grid-cols-2
        gap-10
        lg:gap-16
        items-center
        "
      >
        {/* LEFT SIDE */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-3 mb-10">
            <div
              className="
              h-12
              w-12
              rounded-xl
              border
              border-orange-500/20
              bg-orange-500/10
              flex
              items-center
              justify-center
              "
            >
              <Activity
                size={24}
                className="text-orange-400"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                PingNest
              </h1>

              <p className="text-sm text-slate-400">
                API Monitoring Platform
              </p>
            </div>
          </div>

          <h2
            className="
            text-4xl
            xl:text-5xl
            font-bold
            text-white
            leading-tight
            "
          >
            Monitor Every Request.
            <br />
            Detect Issues Early.
            <br />
            Ship With Confidence.
          </h2>

          <p
            className="
            mt-6
            text-lg
            text-slate-400
            max-w-lg
            "
          >
            Track requests, latency,
            failures, and health scores
            from a centralized observability
            platform built for developers.
          </p>

          <div
            className="
            mt-8
            rounded-2xl
            border
            border-slate-800
            bg-black/40
            overflow-hidden
            "
          >
            <div
              className="
              px-4
              py-3
              border-b
              border-slate-800
              text-xs
              text-slate-500
              "
            >
              QUICK START
            </div>

            <pre
              className="
              p-5
              text-sm
              text-orange-400
              overflow-x-auto
              "
            >
{`npm install pingnest

app.use(
  pingNest({
    apiKey: "YOUR_API_KEY",
    service: "user-service"
  })
)`}
            </pre>
          </div>

          <div className="mt-8 space-y-4">
            <Feature text="Real-Time Monitoring" />
            <Feature text="Response Time Analytics" />
            <Feature text="Error Tracking" />
            <Feature text="Health Score Insights" />
          </div>
        </div>

        {/* LOGIN CARD */}
        <div className="flex justify-center">
          <div
            className="
            w-full
            max-w-md
            rounded-2xl
            sm:rounded-3xl
            border
            border-slate-800
            bg-gradient-to-b
            from-slate-900
            to-slate-950
            backdrop-blur-xl
            shadow-2xl
            overflow-hidden
            "
          >
            {/* Header */}
            <div className="p-5 sm:p-6 lg:p-7">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
                  h-10
                  w-10
                  rounded-lg
                  border
                  border-orange-500/20
                  bg-orange-500/10
                  flex
                  items-center
                  justify-center
                  "
                >
                  <Activity
                    size={20}
                    className="text-orange-400"
                  />
                </div>

                <div>
                  <h1 className="text-white font-bold">
                    PingNest
                  </h1>

                  <p className="text-xs text-slate-400">
                    Developer Observability
                  </p>
                </div>
              </div>

              <h2
                className="
                text-2xl
                sm:text-3xl
                font-bold
                text-white
                "
              >
                Welcome Back
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Login to access your
                monitoring dashboard.
              </p>
            </div>

            {/* Form */}
            <div className="px-5 sm:px-6 lg:px-7 pb-6">
              {authError && (
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
                  {authError}
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label
                    className="
                    block
                    text-sm
                    font-medium
                    text-white
                    "
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    autoFocus
                    disabled={loading}
                    placeholder="you@example.com"
                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900
                    px-4
                    py-3
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-all
                    duration-200
                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-500/20
                    "
                    {...register("email", {
                      required:
                        "Email is required",

                      pattern: {
                        value:
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message:
                          "Enter a valid email address",
                      },

                      onChange: () =>
                        setAuthError(""),
                    })}
                  />

                  {errors.email && (
                    <p className="text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <PasswordInput
                  label="Password"
                  disabled={loading}
                  error={errors.password?.message}
                  registration={register(
                    "password",
                    {
                      required:
                        "Password is required",

                      onChange: () =>
                        setAuthError(""),
                    }
                  )}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="
                  w-full
                  h-12
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:shadow-lg
                  hover:shadow-orange-500/20
                  transition-all
                  duration-300
                  "
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Mobile Features */}
            <div
              className="
              lg:hidden
              border-t
              border-slate-800
              p-5
              "
            >
              <div className="space-y-3">
                <Feature text="Request Monitoring" />
                <Feature text="Response Analytics" />
                <Feature text="Error Tracking" />
                <Feature text="Health Score Tracking" />
              </div>
            </div>

            {/* Footer */}
            <div
              className="
              border-t
              border-slate-800
              px-5
              sm:px-6
              lg:px-7
              py-5
              text-center
              text-sm
              text-slate-400
              "
            >
              Don't have an account?{" "}
              <Link
                href="/register"
                className="
                text-orange-400
                font-medium
                hover:text-orange-300
                transition-colors
                "
              >
                Create Workspace
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2
        size={18}
        className="text-orange-400 shrink-0"
      />

      <span className="text-sm text-slate-300">
        {text}
      </span>
    </div>
  );
}