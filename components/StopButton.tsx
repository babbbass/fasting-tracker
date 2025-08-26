"use client"
import { Button } from "@/components/ui/button"
import { StopCircle } from "lucide-react"

type StopButtonProps = {
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export function StopButton({ setIsConfirmOpen }: StopButtonProps) {
  return (
    <Button
      variant='destructive'
      size='lg'
      className='w-full cursor-pointer'
      onClick={() => setIsConfirmOpen(true)}
    >
      <StopCircle className='mr-2 h-5 w-5' /> Arrêter et enregistrer
    </Button>
  )
}
