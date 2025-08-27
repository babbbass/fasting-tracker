import { useState } from "react"
import { Button } from "./ui/button"
import { Goal as GoalIcon } from "lucide-react"
import { GoalDialog } from "./dialog/GoalDialog"

export function GoalButton() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  return (
    <>
      <Button
        className='cursor-pointer p-2 text-lg'
        onClick={() => setIsConfirmOpen(true)}
      >
        <GoalIcon className='h-10 w-10' />
        Goal
      </Button>
      <GoalDialog
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        handleConfirmation={() => {}}
      />
    </>
  )
}
