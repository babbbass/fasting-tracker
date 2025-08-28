"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CurrentFastInfo } from "@/components/CurrentFastInfo"
import { SaveFastingDialog } from "./SaveFastingDialog"
import { StartButton } from "@/components/StartButton"
import { StopButton } from "./StopButton"
import { GOAL_DURATION } from "@/lib/constants"
import { CircularProgress } from "@/components/CircularProgress"

export function Counter() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)

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

  const progressPercentage = GOAL_DURATION
    ? Math.min(300, (elapsedTime / (GOAL_DURATION * 3600)) * 100)
    : 0

  const isGoalReached = elapsedTime >= GOAL_DURATION * 3600
  return (
    <>
      <Card className='text-center'>
        <CardHeader>
          <CardTitle className='text-2xl md:text-3xl font-bold tracking-tight'>
            {isActive ? "Jeûne en cours" : "Prêt à jeûner ?"}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <CurrentFastInfo elapsedTime={elapsedTime} startTime={startTime} />
          {isActive ? (
            <>
              <CircularProgress
                progress={progressPercentage}
                size={250}
                strokeWidth={20}
              >
                <span
                  className={`text-center font-mono text-5xl font-extrabold tabular-nums transition-colors ${
                    isGoalReached ? "text-green-500" : "text-primary"
                  }`}
                >
                  {progressPercentage.toFixed(0)}%
                </span>
              </CircularProgress>
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
