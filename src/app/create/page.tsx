"use client"
import FormPost from "@/components/ui/FormPost";
import { FormInputPost } from "@/types";
import React from "react";
import { SubmitHandler } from "react-hook-form";

function CreatePage() {
  const handleCreateTask: SubmitHandler<FormInputPost> = (data) => {
    console.log(data);
    
  };
  return (
    <div>
      <h1 className="text-2xl my-4 font-bold text-center">Add new task</h1>
      <FormPost submit={handleCreateTask} />
    </div>
  );
}

export default CreatePage;
