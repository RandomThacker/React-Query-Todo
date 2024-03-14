"use client";
import { updateTask, fetchTask } from "@/api/tasks";
import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import { FormInputPost } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';


function EditTask() {
  const queryClient = useQueryClient();
  const {id} = useParams()
  const { push } = useRouter();
  
  const {
    isPending,
    isError,
    data: task,
    
    error,
  } = useQuery({
    queryKey: ["todos",id],
    queryFn: ()=>fetchTask(id),
  });
  // console.log(tasks);

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['todos']})
      console.log("redirecting to new page");
      // push('/');
    }
  })

  if (isPending) {
    return (
      <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mx-10">
        Loading
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }



  const handleEditTask: SubmitHandler<FormInputPost> = (data) => {
    updateTaskMutation.mutate({id, ...data})
    console.log(data);
  };
  return (
    <div>
        <BackButton/>
      <h1 className="text-2xl my-4 font-bold text-center">Edit Task</h1>
      <FormPost submit={handleEditTask} isEditing initialValue={task}/>
    </div>
  );
} 

export default EditTask;
