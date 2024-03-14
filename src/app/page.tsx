"use client";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";
import { SkeletonCard } from "@/components/SkeletonCard";
 
const Home = () => {
  const {
    isPending,
    isError,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTasks,
  });
  console.log(tasks);

  if (isPending) {
    return (
      <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mx-10">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mx-10">
     {tasks.map((task: {
       id: string; task: string; taskDesc: string;  taskId: string 
}) => (
        <PostCard
          key={task.id}
          taskId={task.id}
          task={task.task} // This line was causing the error
          taskDescp={task.taskDesc}
        />
      ))}

      <Link href="/create">
        <Button 
          variant="outline"
          className="bg-black text-white rounded-xl fixed bottom-10 right-10 h-20"
        >
          <PlusIcon className="h-7 w-7 mr-2" />
          <h1 className="text-xl">Add a new Task</h1>
        </Button>
      </Link>
    </div>
  );
};

export default Home;
