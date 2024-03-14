"use client"
import { createTask } from "@/api/tasks";
import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import { FormInputPost } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

function CreatePage() {
  const { push } = useRouter();

const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['posts']})
      // console.log("redirecting to new page");
    }
  })

  const handleCreateTask: SubmitHandler<FormInputPost> = (data) => {
    createTaskMutation.mutate({
      id:uuidv4(),
      ...data
    })
    // console.log(data);
    push('/');
  };
  return (
    <div>
      <BackButton/>
      <h1 className="text-2xl my-4 font-bold text-center">Add New Task</h1>
      <FormPost submit={handleCreateTask} isEditing={false}/>
    </div>
  );
}

export default CreatePage;
