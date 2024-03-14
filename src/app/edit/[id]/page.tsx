"use client";
import { fetchTask } from "@/api/tasks";
import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import { FormInputPost } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";

function EditTask() {

  const {id} = useParams()
  // console.log(id);
  // console.log(7);
  
  
  const {
    isPending,
    isError,
    data: tasks,
    
    error,
  } = useQuery({
    queryKey: ["todos",id],
    queryFn: ()=>fetchTask(id),
  });
  // console.log(tasks);

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
    // console.log(data);
  };
  return (
    <div>
        <BackButton/>
      <h1 className="text-2xl my-4 font-bold text-center">Edit Task</h1>
      <FormPost submit={handleEditTask} isEditing/>
    </div>
  );
} 

export default EditTask;
