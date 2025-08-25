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

type SaveFastingDialogType = {
  isConfirmOpen: boolean
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleDiscard: () => void
  handleSaveAndStop: () => void
}
export function SaveFastingDialog({
  isConfirmOpen,
  setIsConfirmOpen,
  handleDiscard,
  handleSaveAndStop,
}: SaveFastingDialogType) {
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
