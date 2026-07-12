"use client";

import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function CreateProjectForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (data) => {
    await onSubmit(data);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <Input
        label="Project Name"
        {...register("name", {
          required: true,
        })}
      />

      <Input label="Description" {...register("description")} />

      <Button type="submit" className="w-full">
        Create Project
      </Button>
    </form>
  );
}
