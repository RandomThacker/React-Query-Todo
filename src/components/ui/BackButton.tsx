"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const BackButton = () => {
  const router = useRouter()
  return (
  <Button className="btn" onClick={()=>router.back()} variant="secondary">Back</Button>
  )
};

export default BackButton;
