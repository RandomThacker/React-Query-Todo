"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInputPost } from "@/types";
import { FC } from "react";

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
}

const FormPost: FC<FormPostProps> = ({ submit }) => {
  const { register, handleSubmit } = useForm<FormInputPost>();

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-5 mt-10"
    >
      <Input
        {...register("task",{ required: true})}
        type="text"
        placeholder="Task"
        className="max-w-md w-full"
      />
      <Textarea
        {...register("taskDesc",{ required: true})}
        placeholder="Task Details"
        className="max-w-md w-full"
      />
      <Button type="submit" variant="outline" className="bg-black text-white w-full max-w-md">
        Add
      </Button>
    </form>
  );
};

export default FormPost;
