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
import { motion } from "framer-motion";

interface InputProps {
  taskId: string;
  todoName: string;
  reference: any;
}

const PostCard: FC<InputProps> = ({ taskId, todoName, reference }) => {
  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    queryKey: ["todos", taskId],
    queryFn: () => fetchTask(taskId),
  });
  // console.log(todos);

  const deletePostMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  

  const handleDelete = () => {
    // console.log(taskId);
    deletePostMutation.mutate(taskId);
  };

  return (
    <motion.div drag dragConstraints={reference}>
      <Card className="shadow-xl border cursor-pointer z-50 bg-zinc-900/90 border-none text-zinc-100 w-[250px] h-[200px] flex flex-col justify-between">
        {/* <Link href={`/task/${taskId}`}> */}
          <CardHeader>
            <CardTitle>{todoName}</CardTitle>
          </CardHeader>
          <div className="flex item-center align-middle justify-center">
            <Link
              href={`/edit/${taskId}`}
              className="bg-green-500 h-full w-[100%] flex align-middle justify-center items-center py-2 rounded-bl-lg"
            >
              <h1>Edit</h1>
            </Link>
            <div className="bg-purple-700 h-[100%] w-[100%]  flex align-middle justify-center items-center py-2 rounded-br-lg">
              <h1 onClick={handleDelete}>Delete</h1>
            </div>
          </div>
        {/* </Link> */}
      </Card>
    </motion.div>
  );
};

export default PostCard;
