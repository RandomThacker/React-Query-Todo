"use client";
import { createTask } from "@/api/tasks";
import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import { FormInputPost } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

function CreatePage() {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleCreateTask: SubmitHandler<FormInputPost> = async (data) => {
    try {
      const newTask = { id: uuidv4(), ...data }; 
      await createTaskMutation.mutateAsync(newTask);
 
      push("/");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="h-screen bg-zinc-800 overflow-hidden">
      <div className="mt-10 mx-10">
      <BackButton/>
      </div>
      <div className="bg-zinc-100 shadow-lg w-[550px] py-16 rounded-lg block mx-auto my-20">
        <h1 className="text-2xl my-4 font-bold text-center">Add a new task</h1>
        <FormPost submit={handleCreateTask} isEditing={false} />
      </div>
    </div>
  );
}

export default CreatePage;
