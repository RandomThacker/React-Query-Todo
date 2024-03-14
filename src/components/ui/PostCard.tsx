import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

function PostCard() {
  return (
    <div>
      <Card className="shadow-xl border">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Link href="task/1">
            <p>View</p>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PostCard;
