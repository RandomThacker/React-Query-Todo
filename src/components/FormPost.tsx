"use client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInputPost } from "@/types";
import { FC } from "react";

import { fetchTasks } from "../api/tasks";

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing: boolean;
}

const FormPost: FC<FormPostProps> = ({ submit, isEditing }) => {
  const { register, handleSubmit } = useForm<FormInputPost>();
  // fetch list
  const { isPending, isError, data: tasks, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTasks,
  });
  // console.log(tasks);
  

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-5 mt-10"
    >
      <Input
        {...register("task", { required: true })}
        type="text"
        placeholder="Task"
        className="max-w-md w-full"
      />
      <Textarea
        {...register("taskDesc", { required: true })}
        placeholder="Task Details"
        className="max-w-md w-full"
      />
      <Button
        type="submit"
        variant="outline"
        className="bg-black text-white w-full max-w-md"
      >
        {isEditing ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default FormPost;
