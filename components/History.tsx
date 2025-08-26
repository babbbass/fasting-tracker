"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Hourglass, Trash } from "lucide-react"
import { formatDate, formatDuration } from "@/lib/utils"
import { useHistoryStore } from "@/lib/historyStore"
import { DeleteFastingDialog } from "./DeleteFastingDialog"
import { useState, useCallback } from "react"
import { deleteRecordByStartTime } from "@/lib/utils"

export function History() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [startTimeFastingToDelete, setStartTimeFastingToDelete] = useState("")
  const { history } = useHistoryStore()

  const handleCancel = useCallback(() => {
    setIsConfirmOpen(false)
  }, [])

  const handleDelete = useCallback((id: string) => {
    deleteRecordByStartTime(id)
    setIsConfirmOpen(false)
  }, [])

  return (
    <>
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
                    <TableCell className='text-right font-medium '>
                      <div className='flex justify-end'>
                        <Trash
                          className='h-3 w-3 text-red-600 cursor-pointer'
                          onClick={() => {
                            setStartTimeFastingToDelete(record.startTime)
                            setIsConfirmOpen(true)
                          }}
                        />
                      </div>
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
      <DeleteFastingDialog
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        startTimeFastingToDelete={startTimeFastingToDelete}
      />
    </>
  )
}
