// src/app/create/page.tsx
"use client"
import React from "react"; // Import React
import { createTask } from "@/api/tasks";
import FormPost from "@/components/FormPost";
import { FormInputPost } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/router';
import { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

interface CreatePageProps {
  onCloseDialog: () => void;
}

const CreatePage: React.FC<CreatePageProps> = ({ onCloseDialog }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      onCloseDialog();
    } 
  });

  const handleCreateTask: SubmitHandler<FormInputPost> = async (data) => {
    try {
      const newTask = { id: uuidv4(), ...data };
      await createTaskMutation.mutateAsync(newTask);
      router.push('/');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl my-4 font-bold text-center">Add New Task</h1>
      <FormPost submit={handleCreateTask} isEditing={false}/>
    </div>
  );
}

export default CreatePage;
