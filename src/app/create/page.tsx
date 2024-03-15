// src/app/create/page.tsx
"use client"
import { createTask } from "@/api/tasks";
import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import { FormInputPost } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/router'; // Import useRouter from 'next/router'
import { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { PropsWithChildren } from "react"; // Import PropsWithChildren from 'react'

interface CreatePageProps {
  onCloseDialog: () => void;
}

const CreatePage: React.FC<PropsWithChildren<CreatePageProps>> = ({ onCloseDialog }) => {
  const router = useRouter(); // Use useRouter from 'next/router' instead of 'next/navigation'
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      onCloseDialog(); // Close the dialog here
    }
  });

  const handleCreateTask: SubmitHandler<FormInputPost> = async (data) => {
    try {
      const newTask = { id: uuidv4(), ...data };
      await createTaskMutation.mutateAsync(newTask);
      router.push('/'); // Use router.push to navigate to the home page
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      {/* <BackButton/> */}
      <h1 className="text-2xl my-4 font-bold text-center">Add New Task</h1>
      <FormPost submit={handleCreateTask} isEditing={false}/>
    </div>
  );
}

export default CreatePage;
