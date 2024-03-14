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


interface InputProps {
  taskId : string,
  task: string,
  taskDescp: string
}

const PostCard: FC<InputProps>=({ taskId, task, taskDescp })=> {
  console.log(task, taskDescp, taskId);
  
  return (
    <div>
       <Link href={`/task/${taskId}`}>
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

      <Button variant="destructive">Delete</Button>
      </Card>
      </Link>
    </div>
  );
}

export default PostCard;
