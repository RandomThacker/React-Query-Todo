import Link from "next/link";
import { Button } from "@/components/ui/button";

const ButtonAction = () => {
  return (
    <div>
      <Link href="/edit/id" className="mr-2">
        <Button>Edit</Button>
      </Link>

      <Button variant="destructive">Delete</Button>
    </div>
  );
};

export default ButtonAction;
