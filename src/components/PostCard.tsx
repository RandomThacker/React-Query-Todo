import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FC, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, fetchTask, fetchTasks } from "@/api/tasks";
import { motion } from "framer-motion";

interface InputProps {
  taskId: string;
  todoName: string;
  reference: any;
}

const PostCard: FC<InputProps> = ({ taskId, todoName, reference }) => {
  const queryClient = useQueryClient();
  const [deleteBtn, setDeleteBtn] = useState(false);

  const { data: todos } = useQuery({
    queryKey: ["todos", taskId],
    queryFn: () => fetchTask(taskId),
  });

  const deletePostMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = () => {
    setDeleteBtn(true);
    deletePostMutation.mutate(taskId);
  };

  return (
    <motion.div
      drag
      dragConstraints={reference}
      animate={{ opacity: deleteBtn?0:1,  scale:deleteBtn? 10: 1, y: deleteBtn? -50 : 0 }}
      transition={{type:"tween", duration:1.5}}
      initial={{ scale: 1, y: 200 }}
    >
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
