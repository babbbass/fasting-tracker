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
import { deleteRecordByStartTime } from "@/lib/utils"
import { useHistoryStore } from "@/lib/historyStore"

type DeleteFastingDialogType = {
  isConfirmOpen: boolean
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>
  startTimeFastingToDelete: string
}
export function DeleteFastingDialog({
  isConfirmOpen,
  setIsConfirmOpen,
  startTimeFastingToDelete,
}: DeleteFastingDialogType) {
  const { deleteFastingRecord } = useHistoryStore()

  const handleDelete = useCallback((id: string) => {
    deleteFastingRecord(id)
    deleteRecordByStartTime(id)
    setIsConfirmOpen(false)
  }, [])

  const handleCancel = useCallback(() => {
    setIsConfirmOpen(false)
  }, [])
  return (
    <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Terminer la session de jeûne ?</DialogTitle>
          <DialogDescription>
            {`Confirmer la suppression de la session de jeûne ?`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          <Button
            variant='destructive'
            onClick={handleCancel}
            className='cursor-pointer'
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Annuler
          </Button>
          <Button
            onClick={() => handleDelete(startTimeFastingToDelete)}
            className='cursor-pointer'
          >
            <Save className='mr-2 h-4 w-4' />
            Supprimer le jeûne
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
