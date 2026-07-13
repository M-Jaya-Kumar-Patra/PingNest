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
  Terminal,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";

import { registerUser } from "@/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setAuthError("");

      const { confirmPassword, ...payload } = data;

      await registerUser(payload);

      router.push("/login");
    } catch (error) {
      setAuthError(
        error?.response?.data?.message ||
          "Registration failed"
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
        {/* Desktop Branding Section */}
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
            Observe Every Request.
            <br />
            Debug Faster.
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
            Plug-and-play monitoring for Express
            applications. Track requests, response times,
            failures, and service health in real time.
          </p>

          <div
            className="
            mt-10
            rounded-2xl
            border
            border-slate-800
            bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/30
            overflow-hidden
            "
          >
            <div
              className="
              px-4
              py-3
              border-b
              border-slate-800
              flex
              items-center
              gap-2
              text-slate-400
              text-sm
              "
            >
              <Terminal size={16} />
              Quick Setup
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
            <Feature text="Real-Time Request Monitoring" />
            <Feature text="Response Time Analytics" />
            <Feature text="Error Tracking & Insights" />
            <Feature text="API Health Score Monitoring" />
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-center">
          <div
            className="
            w-full
            max-w-md
            rounded-2xl
            sm:rounded-3xl
            border
            border-slate-800
            bg-gradient-to-b from-slate-900 to-slate-950
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
                    Create your workspace
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
                Create Account
              </h2>

              <p className="mt-2 text-slate-400 text-sm">
                Start monitoring your APIs in minutes.
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
                <Input
                  label="Full Name"
                  type="text"
                  disabled={loading}
                  autoFocus
                  {...register("name", {
                    required: "Name is required",
                    onChange: () =>
                      setAuthError(""),
                  })}
                  error={errors.name?.message}
                />

                <Input
                  label="Email Address"
                  type="email"
                  disabled={loading}
                  {...register("email", {
                    required: "Email is required",

                    pattern: {
                      value:
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message:
                        "Enter a valid email address",
                    },

                    onChange: () =>
                      setAuthError(""),
                  })}
                  error={errors.email?.message}
                />

                <PasswordInput
                  label="Password"
                  disabled={loading}
                  error={errors.password?.message}
                  registration={register(
                    "password",
                    {
                      required:
                        "Password is required",

                      minLength: {
                        value: 6,
                        message:
                          "Password must be at least 6 characters",
                      },

                      onChange: () =>
                        setAuthError(""),
                    }
                  )}
                />

                <PasswordInput
                  label="Confirm Password"
                  disabled={loading}
                  error={
                    errors.confirmPassword?.message
                  }
                  registration={register(
                    "confirmPassword",
                    {
                      required:
                        "Please confirm your password",

                      validate: (value) =>
                        value === password ||
                        "Passwords do not match",

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
                  "
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Workspace
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Mobile Product Section */}
            <div
              className="
              lg:hidden
              border-t
              border-slate-800
              p-5
              space-y-5
              "
            >
              <div>
                <p className="text-white font-medium mb-3">
                  Quick Setup
                </p>

                <div
                  className="
                  rounded-xl
                  bg-black
                  border
                  border-slate-800
                  p-4
                  overflow-x-auto
                  "
                >
                  <code className="text-orange-400 text-sm whitespace-nowrap">
                    npm install pingnest
                  </code>
                </div>
              </div>

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
              Already have an account?{" "}
              <Link
                href="/login"
                className="
                text-orange-400
                font-medium
                hover:text-orange-300
                transition-colors
                "
              >
                Sign In
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

      <span className="text-slate-300 text-sm">
        {text}
      </span>
    </div>
  );
}