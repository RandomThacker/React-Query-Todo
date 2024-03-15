"use client"
import { createTask } from "@/api/tasks";
import FormPost from "@/components/FormPost";
import { FormInputPost } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import React, { PropsWithChildren } from "react";

interface CreatePageProps {
  onCloseDialog: () => any;
}

const CreatePage: React.FC<PropsWithChildren<CreatePageProps>> = ({ onCloseDialog }) => {
  const { push } = useRouter();
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
      push('/');
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
