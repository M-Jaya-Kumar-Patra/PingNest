"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {Loader2} from "lucide-react";

import Button from "@/components/ui/Button";

import useAuth from "@/hooks/useAuth";
import { loginUser } from "@/services/auth.service";
import PasswordInput from "@/components/ui/PasswordInput";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const { refreshUser } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [authError, setAuthError] =
    useState("");

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

      toast.success(
        "Login successful"
      );

      router.push("/dashboard");

    } catch (error) {

      setAuthError(
        error.response?.data?.message ||
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
      flex
      items-center
      justify-center
      bg-gray-50
      px-4
      "
    >
      <div
        className="
        w-full
        max-w-md
        bg-white
        p-8
        rounded-2xl
        shadow-sm
        border
        "
      >
        <div className="mb-8">
          <h1
            className="
            text-3xl
            font-bold
            "
          >
            Welcome Back
          </h1>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            Login to your PingNest account.
          </p>
        </div>

        {authError && (
          <div
            className="
            mb-4
            px-4
            py-3
            rounded-lg
            border
            border-red-200
            bg-red-50
            text-red-600
            text-sm
            "
          >
            {authError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <div>
            <label
              className="
              block
              text-sm
              font-medium
              mb-2
              "
            >
              Email
            </label>

            <input
              type="email"
              autoFocus
              disabled={loading}
              className="
              w-full
              border
              rounded-lg
              p-3
              outline-none
              focus:ring-2
              focus:ring-black
              "
              {...register(
                "email",
                {
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
                }
              )}
            />

            {errors.email && (
              <p
                className="
                text-sm
                text-red-500
                mt-1
                "
              >
                {
                  errors.email
                    .message
                }
              </p>
            )}
          </div>

          <PasswordInput
  label="Password"
  disabled={loading}
  error={
    errors.password?.message
  }
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

<div
  className="
  flex
  justify-end
  "
>
  <Link
    href="/forgot-password"
    className="
    text-sm
    text-gray-600
    hover:text-black
    hover:underline
    "
  >
    Forgot Password?
  </Link>
</div>


          <Button
            type="submit"
            disabled={loading}
            className="
            w-full
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <p
          className="
          mt-6
          text-center
          text-sm
          text-gray-500
          "
        >
          Don't have an account?{" "}
          <Link
            href="/register"
            className="
            text-black
            font-medium
            hover:underline
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}