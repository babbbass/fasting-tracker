import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
