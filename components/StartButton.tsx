import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

type StartButtonProps = {
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  setStartTime: React.Dispatch<React.SetStateAction<Date | null>>
}
export function StartButton({
  setElapsedTime,
  setIsActive,
  setStartTime,
}: StartButtonProps) {
  const handleStart = useCallback(() => {
    const now = new Date()
    setStartTime(now)
    setIsActive(true)
    setElapsedTime(0)
    localStorage.setItem("activeFastStartTime", now.toISOString())
  }, [setElapsedTime, setIsActive, setStartTime])

  return (
    <Button size='lg' className='w-full cursor-pointer' onClick={handleStart}>
      <Play className='mr-2 h-5 w-5' /> Démarrer le jeûne
    </Button>
  )
}
