"use client"
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { fetchData, fetchTasks } from "../api/tasks";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import CreatePage from "./create/page";

const Home = () => {
  const ref = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const {
    isPending,
    isError,
    data: todos,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTasks,
  });

  const {
    data,
  } = useQuery({
    queryKey: ["check"],
    queryFn: fetchData,
  });

  let checkData = data?.data?.code
  console.log("fetch data",checkData)
 
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

  // if(checkData && checkData === 404){
  //   return(
  //     <h1>hello world</h1>
  //   )
  // }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

 

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="bg-zinc-800 h-screen w-[100%] relative" ref={ref}>
      <h1
        className="text-zinc-900 text-[13vw] font-semibold absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[0] select-none pointer-events-none"
        style={{ zIndex: "0" }}
      >
        Todos
      </h1>
      {/* Dialog */}
      <Dialog open={isDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-white text-silver rounded-xl fixed bottom-10 right-10 py-10 px-7"
            onClick={handleOpenDialog} // Open dialog on button click
          >
            <h1 className="text-xl">Add a<br /> new Task</h1>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <CreatePage onCloseDialog={handleCloseDialog} />
        </DialogContent>
      </Dialog>
      
      {/* Cards */}
      <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mx-10 z-[10]">
        {
        (checkData && checkData == 404) ?  (
          <span>No todos available.</span>
        ):(
          todos.map(
            (task: { _id: string; todoName: string; taskId: string }) => (
              <PostCard
                key={task._id}
                todoName={task.todoName}
                taskId={task._id}
                reference={ref}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Home;
