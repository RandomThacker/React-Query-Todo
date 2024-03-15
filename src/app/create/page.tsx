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
      // console.log("redirecting to new page");
    },
  });

  const handleCreateTask: SubmitHandler<FormInputPost> = async (data) => {
    try {
      // let newData = data.todoName
      const newTask = { id: uuidv4(), ...data }; // Assuming data contains task details
      await createTaskMutation.mutateAsync(newTask);
      // console.log(newData);
      // console.log(data);

      push("/");
    } catch (error) {
      console.error("Error creating task:", error);
      // Handle error as needed, e.g., show error message to the user
    }
  };

  return (
    <div className="h-screen bg-zinc-800">
      <BackButton />
      <div className="bg-zinc-100 shadow-lg w-[550px] py-16 rounded-lg block m-auto">
        <h1 className="text-2xl my-4 font-bold text-center">Add a new task</h1>
        <FormPost submit={handleCreateTask} isEditing={false} />
      </div>
    </div>
  );
}

export default CreatePage;
