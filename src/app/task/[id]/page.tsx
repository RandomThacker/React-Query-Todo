"use client"
import BackButton from "@/components/BackButton"
import ButtonAction from "@/components/ButtonAction"

import { useQuery } from "@tanstack/react-query";
import { fetchTask } from "../../../api/tasks";
import { useParams } from 'next/navigation'

const TaskDetails = () => {
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
  
  return (
    <div className="mb-8">
        <BackButton/>
      <h2 className="text-2xl font-bold my-4">{tasks.task}</h2>
      <p className="text-slate-700">{tasks.taskDesc}</p>
      <ButtonAction/>
    </div>
  )
}

export default TaskDetails
