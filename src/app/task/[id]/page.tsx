"use client"
import BackButton from "@/components/BackButton"
import ButtonAction from "@/components/ButtonAction"

const TaskDetails = () => {
  return (
    <div className="mb-8">
        <BackButton/>
      <h2 className="text-2xl font-bold my-4">Task  Details</h2>
      <p className="text-slate-700">Task 1 Details</p>
      <ButtonAction/>
    </div>
  )
}

export default TaskDetails
