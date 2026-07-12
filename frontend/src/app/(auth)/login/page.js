"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useAuth from "@/hooks/useAuth";
import { loginUser } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const { refreshUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data);

      await refreshUser();

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
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
    "
    >
      <div
        className="
        w-full
        max-w-md
        bg-white
        p-8
        rounded-xl
        shadow
      "
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-6
        "
        >
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
