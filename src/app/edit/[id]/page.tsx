"use client"
import { updateTask, fetchTask, deleteTask } from "@/api/tasks";
import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import { FormInputPost } from "@/types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';


function EditTask() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { push } = useRouter();

  const { data: taskData, isLoading, isError, error } = useQuery({
    queryKey: ["todos",id],
    queryFn: ()=>fetchTask(id),
  });
  
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['todos']})
      push('/');
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleEditTask: SubmitHandler<FormInputPost> = async (data) => {
    const updatedTask = { _id: uuidv4(), ...data };  
    deletePostMutation.mutate(id)
    updateTaskMutation.mutate(updatedTask);
  };

  if (isLoading) {
    return (
      <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mx-10">
        Loading...
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="h-screen bg-zinc-800">
       <div className="mt-10 mx-10">
      <BackButton/>
      </div>
      <div className="bg-zinc-100 shadow-lg w-[550px] py-16 rounded-lg block mx-auto my-20">
      <h1 className="text-2xl my-4 font-bold text-center">Edit Task</h1>
      <FormPost submit={handleEditTask} isEditing initialValue={taskData} />
      </div>
    </div>
  );
}

export default EditTask;
