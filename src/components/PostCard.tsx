import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { deleteTask, fetchTask, fetchTasks } from "@/api/tasks";
import { SkeletonCard } from "./SkeletonCard";


interface InputProps {
  taskId : string,
  task: string,
  taskDescp: string
}

const PostCard: FC<InputProps>=({ taskId, task, taskDescp })=> {
  // console.log(task, taskDescp, taskId);
  const queryClient = useQueryClient();


  const {
    data: tasks,
  } = useQuery({
    queryKey: ["todos",taskId],
    queryFn: ()=>fetchTask(taskId),
  });
  // console.log(tasks);

  const deletePostMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: ['todos']})
    }
  })

  const handleDelete =()=>{
    console.log(taskId);
    deletePostMutation.mutate(taskId)
    
  }

  return (
    <div>
       {/* <Link href={`/task/${taskId}`}> */}
      <Card className="shadow-xl border cursor-pointer">
        <CardHeader>
          <CardTitle>{task}</CardTitle>
          <CardDescription>{taskDescp}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{taskDescp}</p>
        </CardContent>
        <Link href={`/edit/${taskId}`} className="p-2 pb-12">
        <Button>Edit</Button>
      </Link>

      <Button variant="destructive" onClick={handleDelete}>Delete</Button>
      </Card>
      {/* </Link> */}
    </div>
  );
}

export default PostCard;
