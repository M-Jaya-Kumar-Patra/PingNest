"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {Loader2} from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { registerUser } from "@/services/auth.service";
import PasswordInput from "@/components/ui/PasswordInput";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [authError, setAuthError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password =
    watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      setAuthError("");

      const {
        confirmPassword,
        ...payload
      } = data;

      await registerUser(payload);

      toast.success(
        "Email sent"
      );

      router.push(
  `/verify-email?email=${payload.email}`
);

    } catch (error) {

      setAuthError(
        error.response?.data?.message ||
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
            Create Account
          </h1>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            Start monitoring your APIs
            with PingNest.
          </p>
        </div>

        {authError && (
          <div
            className="
            mb-4
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-600
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
          <Input
            label="Name"
            type="text"
            disabled={loading}
            autoFocus
            {...register(
              "name",
              {
                required:
                  "Name is required",
                onChange: () =>
                  setAuthError(""),
              }
            )}
            error={
              errors.name?.message
            }
          />

          <Input
            label="Email"
            type="email"
            disabled={loading}
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
            error={
              errors.email?.message
            }
          />

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
    errors.confirmPassword
      ?.message
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
              "Register"
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="
            text-black
            font-medium
            hover:underline
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}