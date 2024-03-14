import PostCard from "@/components/ui/PostCard"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mx-10">
     <PostCard/>
     <PostCard/>
     <PostCard/>
     <PostCard/>
     <PostCard/>
     <PostCard/>
    </div>
  )
}
