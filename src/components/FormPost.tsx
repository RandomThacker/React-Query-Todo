"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { FC } from "react";
import { FormInputPost } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>; // Pass submit handler from parent component
  isEditing: boolean;
  initialValue?: FormInputPost;
}

const FormPost: FC<FormPostProps> = ({ submit, isEditing, initialValue }) => {
  const { register, handleSubmit } = useForm<FormInputPost>({
    defaultValues: initialValue,
  });

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-5 mt-10"
    >
      <Input
        {...register("todoName", { required: true })}
        type="text"
        placeholder="Task"
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
