"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CurrentFastInfo } from "@/components/CurrentFastInfo"
import { SaveFastingDialog } from "./SaveFastingDialog"
import { StartButton } from "@/components/StartButton"
import { StopButton } from "./StopButton"
import { useGoalStore } from "@/lib/stores/goalStore"
import { CircularProgress } from "@/components/CircularProgress"
import { cn } from "@/lib/utils"

export function Counter() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const { goalDuration } = useGoalStore()

  useEffect(() => {
    const activeFastStart = localStorage.getItem("activeFastStartTime")
    if (activeFastStart) {
      const startTimeDate = new Date(activeFastStart)
      setStartTime(startTimeDate)
      setIsActive(true)
      setElapsedTime(
        Math.floor((new Date().getTime() - startTimeDate.getTime()) / 1000)
      )
    }
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
  }, [isActive, startTime])

  const goalDurationInSeconds = goalDuration * 3600

  return (
    <>
      <Card className='text-center'>
        <CardHeader>
          <CardTitle
            key={isActive ? "active-title" : "inactive-title"}
            className={cn(
              "flex items-center justify-center gap-3 text-2xl md:text-3xl font-extrabold tracking-tight",
              "animate-in fade-in duration-500"
            )}
          >
            {isActive ? (
              <>
                <span className='relative flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                </span>
                <span className='bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>
                  Jeûne en cours
                </span>
              </>
            ) : (
              <span>Prêt à jeûner ?</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <CurrentFastInfo elapsedTime={elapsedTime} startTime={startTime} />
          {isActive ? (
            <>
              <CircularProgress
                elapsedTime={elapsedTime}
                goalDuration={goalDurationInSeconds}
                size={250}
                strokeWidth={20}
              />

              <StopButton setIsConfirmOpen={setIsConfirmOpen} />
            </>
          ) : (
            <StartButton
              setElapsedTime={setElapsedTime}
              setIsActive={setIsActive}
              setStartTime={setStartTime}
            />
          )}
        </CardContent>
      </Card>
      <SaveFastingDialog
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        setIsActive={setIsActive}
        setElapsedTime={setElapsedTime}
        setStartTime={setStartTime}
        startTime={startTime}
      />
    </>
  )
}
