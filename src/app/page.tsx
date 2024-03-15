"use client";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useRef } from "react";
 
const Home = () => {

  const ref = useRef(null)
  
  const {
    isPending,
    isError,
    data: todos,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTasks,
  });
  console.log(todos);

  if (isPending) {
    return (
      <div className="bg-zinc-800">
      <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mx-10">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="bg-zinc-800 h-screen w-[100%] " ref={ref}>
    <div  className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mx-10 z-[9999] absolute" style={{zIndex:"100"}} >
    
     {todos.map((task: {
       _id: string; todoName: string; taskId: string 
}) => (
        <PostCard
        key={task._id}
        todoName={task.todoName} 
        taskId={task._id} 
      
          reference = {ref}
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
    <h1 className="text-zinc-900 text-[13vw] font-semibold absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-0" style={{zIndex:"0"}}>Todos</h1>

    </div>
  );
};

export default Home;
