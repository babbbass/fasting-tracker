"use client"
import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Hourglass } from "lucide-react"
import { formatDate, formatDuration } from "@/lib/utils"
import { FastingRecordType } from "@/lib/types"

export function Historic() {
  const [history, setHistory] = useState<FastingRecordType[]>([])
  const [isActive, setIsActive] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0)

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
  return (
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
  )
}
