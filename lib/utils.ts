import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FASTING_HISTORY } from "./constants"
import { FastingRecordType } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDuration = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0")
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0")
  const seconds = (totalSeconds % 60).toString().padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function deleteRecordByStartTime(startTimeToDelete: string) {
  const storageKey = FASTING_HISTORY

  const historyString = localStorage.getItem(storageKey)

  if (!historyString) {
    console.error(`No data found for the key: ${storageKey}`)
    return
  }

  try {
    const historyArray = JSON.parse(historyString)

    const updatedHistoryArray = historyArray.filter(
      (record: FastingRecordType) => record.startTime !== startTimeToDelete
    )

    if (historyArray.length === updatedHistoryArray.length) {
      console.warn(
        `No record with the startTime "${startTimeToDelete}" was found.`
      )
      return
    }

    localStorage.setItem(storageKey, JSON.stringify(updatedHistoryArray))

    console.log(
      `Record with startTime "${startTimeToDelete}" was successfully deleted.`
    )
  } catch (error) {
    console.error("Error during analyse or update of localStorage :", error)
  }
}
