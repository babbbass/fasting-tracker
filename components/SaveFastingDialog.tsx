import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Save, Trash2 } from "lucide-react"
import { useCallback } from "react"
import { FASTING_HISTORY } from "@/lib/constants"
import { FastingRecordType } from "@/lib/types"
import { useHistoryStore } from "@/lib/historyStore"
type SaveFastingDialogType = {
  isConfirmOpen: boolean
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>
  setStartTime: React.Dispatch<React.SetStateAction<Date | null>>
  startTime: Date | null
}

export function SaveFastingDialog({
  isConfirmOpen,
  setIsConfirmOpen,
  setIsActive,
  setElapsedTime,
  setStartTime,
  startTime,
}: SaveFastingDialogType) {
  const { history, addFastingRecord } = useHistoryStore()

  // STOP
  const handleSaveAndStop = useCallback(() => {
    if (!startTime) return

    setIsActive(false)
    const endTime = new Date()
    const duration = Math.floor(
      (endTime.getTime() - startTime.getTime()) / 1000
    )

    const newRecord: FastingRecordType = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration,
    }

    addFastingRecord(newRecord)
    localStorage.setItem(
      FASTING_HISTORY,
      history.length > 0
        ? JSON.stringify([newRecord, ...history])
        : JSON.stringify([newRecord])
    )

    // clean current fasting
    localStorage.removeItem("activeFastStartTime")
    setStartTime(null)
    setElapsedTime(0)
    setIsConfirmOpen(false)
  }, [
    setElapsedTime,
    setIsConfirmOpen,
    setIsActive,
    setStartTime,
    addFastingRecord,
    history,
    startTime,
  ])

  const handleDiscard = useCallback(() => {
    setIsActive(false)
    localStorage.removeItem("activeFastStartTime")
    setStartTime(null)
    setElapsedTime(0)
    setIsConfirmOpen(false)
  }, [setElapsedTime, setIsConfirmOpen, setIsActive, setStartTime])
  return (
    <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Terminer la session de jeûne ?</DialogTitle>
          <DialogDescription>
            {`Vous pouvez enregistrer cette session dans votre historique ou
            simplement l'annuler.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          <Button
            variant='destructive'
            onClick={handleDiscard}
            className='cursor-pointer'
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Annuler et supprimer
          </Button>
          <Button onClick={handleSaveAndStop} className='cursor-pointer'>
            <Save className='mr-2 h-4 w-4' />
            Enregistrer la session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
