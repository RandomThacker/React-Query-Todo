import PostCard from "@/components/ui/PostCard"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import Link from "next/link"
export default function Home() {
  return (
    <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mx-10">
     <PostCard/>
     <PostCard/>
     <PostCard/>
     <PostCard/>
     <PostCard/>
     <PostCard/>
     <Link href="/create">
     <Button variant="outline" className="bg-black text-white rounded-xl fixed bottom-10 right-10 h-20" >
     <PlusIcon className="h-7 w-7 mr-2" />
      <h1 className="text-xl">Add a new Task</h1>
    </Button>
    </Link>
    </div>
  )
}
