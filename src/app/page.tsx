"use client";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { fetchData, fetchTasks } from "../api/tasks";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Home = () => {
  const ref = useRef(null);

  const {
    isPending,
    isError,
    data: todos,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTasks,
  });

  const { data } = useQuery({
    queryKey: ["check"],
    queryFn: fetchData,
  });
  let checkData = data?.data?.code;

  let content = null;

  if (isPending) {
    content = (
      <div className="bg-zinc-800 w-[100vw] h-screen">
        <div className="w-[100%] h-screen flex align-middle item-center justify-center gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  } else if (checkData && checkData === 404) {
    content = <h1 className="text-zinc-800">No Data Found!</h1>;
  } else if (isError) {
    content = <span>Error: {error.message}</span>;
  } else if (checkData) {
    content = todos.map((task: { _id: string; todoName: string; taskId: string }) => (
      <PostCard
        key={task._id}
        todoName={task.todoName}
        taskId={task._id}
        reference={ref}
      />
    ));
  }

  return (
    <div className="bg-zinc-800 h-screen w-[100%] relative" ref={ref}>
      <h1
        className="text-zinc-900 text-[13vw] font-semibold absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[0] select-none pointer-events-none"
        style={{ zIndex: "0" }}
      >
        Todos
      </h1>
      <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mx-10 z-[10]">
        {content}
      </div>

      <Link href="/create">
        <Button
          variant="outline"
          className="bg-black text-white rounded-xl fixed bottom-10 right-10 h-20"
        >
          <PlusIcon className="h-7 w-7 mr-2" />
          <h1 className="text-xl">Add a new Task</h1>
        </Button>
      </Link>

      <Dialog>
        <DialogTrigger asChild>
        <Button
            variant="outline"
            className="rounded-full py-7 bg-[#ffcd10] fixed top-10 right-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-lightbulb"
            >
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
              <path d="M9 18h6" />
              <path d="M10 22h4" />
            </svg>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Fun Tip</DialogTitle>
            <DialogDescription>
              You can hold and drag the todo cards.
              <br /> Play with them and have fun :D
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
