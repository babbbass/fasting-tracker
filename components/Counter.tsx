"use client"
import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, StopCircle } from "lucide-react"
import { formatDuration } from "@/lib/utils"
import { SaveFastingDialog } from "./SaveFastingDialog"
// import { FastingRecordType } from "@/lib/types"

export function Counter() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  // START AND STOP
  const handleStart = useCallback(() => {
    const now = new Date()
    setStartTime(now)
    setIsActive(true)
    setElapsedTime(0)
    localStorage.setItem("activeFastStartTime", now.toISOString())
  }, [])

  const handleStop = useCallback(() => {
    if (!startTime) return

    setIsActive(false)
    //const endTime = new Date()
    // const duration = Math.floor(
    //   (endTime.getTime() - startTime.getTime()) / 1000
    // )

    // const newRecord: FastingRecordType = {
    //   startTime: startTime.toISOString(),
    //   endTime: endTime.toISOString(),
    //   duration,
    // }

    // const updatedHistory = [newRecord, ...history]
    // setHistory(updatedHistory)
    // localStorage.setItem("fastingHistory", JSON.stringify(updatedHistory))

    // clean current fasting
    localStorage.removeItem("activeFastStartTime")
    setStartTime(null)
    setIsConfirmOpen(false)
  }, [startTime])

  const handleDiscard = useCallback(() => {
    setIsActive(false)
    localStorage.removeItem("activeFastStartTime")
    setStartTime(null)
    setElapsedTime(0)
    setIsConfirmOpen(false)
  }, [])

  useEffect(() => {
    //   try {
    // const storedHistory = localStorage.getItem("fastingHistory")
    // if (storedHistory) {
    //   setHistory(JSON.parse(storedHistory))
    // }

    const activeFastStart = localStorage.getItem("activeFastStartTime")
    if (activeFastStart) {
      const startTimeDate = new Date(activeFastStart)
      setStartTime(startTimeDate)
      setIsActive(true)
      setElapsedTime(
        Math.floor((new Date().getTime() - startTimeDate.getTime()) / 1000)
      )
    }
    //   } catch (error) {
    //     console.error("Failed to access localStorage:", error)
    //   }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && startTime) {
      interval = setInterval(() => {
        setElapsedTime(
          Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
        )
      }, 1000)
    } else if (!isActive && elapsedTime !== 0) {
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, startTime, elapsedTime])

  return (
    <>
      <Card className='text-center'>
        <CardHeader>
          <CardTitle className='text-2xl md:text-3xl font-bold tracking-tight'>
            {isActive ? "Jeûne en cours" : "Prêt à jeûner ?"}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='font-mono text-6xl md:text-8xl font-extrabold text-primary tabular-nums'>
            {formatDuration(elapsedTime)}
          </div>
          {!isActive ? (
            <Button
              size='lg'
              className='w-full cursor-pointer'
              onClick={handleStart}
            >
              <Play className='mr-2 h-5 w-5' /> Démarrer le jeûne
            </Button>
          ) : (
            <Button
              variant='destructive'
              size='lg'
              className='w-full cursor-pointer'
              //onClick={handleStop}
              onClick={() => setIsConfirmOpen(true)}
            >
              <StopCircle className='mr-2 h-5 w-5' /> Arrêter et enregistrer
            </Button>
          )}
        </CardContent>
      </Card>
      <SaveFastingDialog
        handleDiscard={handleDiscard}
        handleSaveAndStop={handleStop}
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
      />
    </>
  )
}
