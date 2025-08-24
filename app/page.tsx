"use client"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Hourglass, Play, StopCircle } from "lucide-react"
type FastingRecord = {
  startTime: string
  endTime: string
  duration: number
}
export default function HomePage() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [history, setHistory] = useState<FastingRecord[]>([])

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem("fastingHistory")
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory))
      }

      const activeFastStart = localStorage.getItem("activeFastStartTime")
      if (activeFastStart) {
        const startTimeDate = new Date(activeFastStart)
        setStartTime(startTimeDate)
        setIsActive(true)
        setElapsedTime(
          Math.floor((new Date().getTime() - startTimeDate.getTime()) / 1000)
        )
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error)
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
  // ---- Event handlers ----
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
    const endTime = new Date()
    const duration = Math.floor(
      (endTime.getTime() - startTime.getTime()) / 1000
    )

    const newRecord: FastingRecord = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration,
    }

    const updatedHistory = [newRecord, ...history]
    setHistory(updatedHistory)
    localStorage.setItem("fastingHistory", JSON.stringify(updatedHistory))

    // clean current fasting
    localStorage.removeItem("activeFastStartTime")
    setStartTime(null)
  }, [startTime, history])

  const formatDuration = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0")
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0")
    const seconds = (totalSeconds % 60).toString().padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
  }
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  return (
    <main className='container mx-auto p-4 md:p-8 flex flex-col items-center'>
      <div className='w-full max-w-2xl space-y-8'>
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
              <Button size='lg' className='w-full' onClick={handleStart}>
                <Play className='mr-2 h-5 w-5' /> Démarrer le jeûne
              </Button>
            ) : (
              <Button
                variant='destructive'
                size='lg'
                className='w-full'
                onClick={handleStop}
              >
                <StopCircle className='mr-2 h-5 w-5' /> Arrêter et enregistrer
              </Button>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Hourglass className='mr-2 h-5 w-5' />
              Historique des jeûnes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Début</TableHead>
                    <TableHead>Fin</TableHead>
                    <TableHead className='text-right'>Durée</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((record) => (
                    <TableRow key={record.startTime}>
                      <TableCell>{formatDate(record.startTime)}</TableCell>
                      <TableCell>{formatDate(record.endTime)}</TableCell>
                      <TableCell className='text-right font-medium'>
                        {formatDuration(record.duration)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className='text-center text-muted-foreground py-4'>
                Aucun jeûne enregistré pour le moment.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
