"use client";
import FormPost from "@/components/ui/FormPost";
import { FormInputPost } from "@/types";
import React from "react";
import { SubmitHandler } from "react-hook-form";

function EditTask() {
  const handleEditTask: SubmitHandler<FormInputPost> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1 className="text-2xl my-4 font-bold text-center">Edit Task</h1>
      <FormPost submit={handleEditTask} isEditing/>
    </div>
  );
} 

export default EditTask;
