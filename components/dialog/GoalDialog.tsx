import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InputDuration } from "@/components/InputDuration"
import { useState } from "react"
import { useGoalStore } from "@/lib/stores/goalStore"

type GoalDialogType = {
  isConfirmOpen: boolean
  setIsConfirmOpen: (value: boolean) => void
  handleConfirmation: (hours: number) => void
}
export function GoalDialog({
  isConfirmOpen,
  setIsConfirmOpen,
}: GoalDialogType) {
  const [goalHours, setGoalHours] = useState<string>("")
  const { setGoalDuration } = useGoalStore()

  const onConfirmClick = () => {
    const hours = parseInt(goalHours, 10)

    if (!isNaN(hours) && hours > 0) {
      setGoalDuration(hours)
      setIsConfirmOpen(false)
      setGoalHours("")
    } else {
      console.error("Veuillez entrer un nombre d'heures valide.")
    }
  }
  return (
    <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Quel sera la durée de la session de jeûne ?</DialogTitle>
        </DialogHeader>
        {/* --- Duration --- */}
        <InputDuration goalHours={goalHours} setGoalHours={setGoalHours} />
        <DialogFooter className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          <Button
            variant='destructive'
            onClick={() => setIsConfirmOpen(false)}
            className='cursor-pointer'
          >
            Annuler
          </Button>
          <Button onClick={onConfirmClick} className='cursor-pointer'>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
