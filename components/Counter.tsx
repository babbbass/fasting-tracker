"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDuration } from "@/lib/utils"
import { SaveFastingDialog } from "./SaveFastingDialog"
import { StartButton } from "@/components/StartButton"
import { StopButton } from "./StopButton"
import { GOAL_DURATION } from "@/lib/constants"

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
            {elapsedTime < GOAL_DURATION * 3600 ? (
              formatDuration(GOAL_DURATION * 3600 - elapsedTime)
            ) : (
              <span className='text-green-600'>
                {formatDuration(elapsedTime - GOAL_DURATION * 3600)}{" "}
              </span>
            )}
          </div>
          {!isActive ? (
            <StartButton
              setElapsedTime={setElapsedTime}
              setIsActive={setIsActive}
              setStartTime={setStartTime}
            />
          ) : (
            <StopButton setIsConfirmOpen={setIsConfirmOpen} />
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
