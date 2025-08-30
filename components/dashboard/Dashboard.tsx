"use client"

import { useMemo } from "react"
import { useHistoryStore } from "@/lib/historyStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LayoutDashboard,
  TrendingUp,
  Award,
  Repeat,
  Hourglass,
  Flame,
  Trophy,
} from "lucide-react"
import { formatDuration } from "@/lib/utils"
import { StatCard } from "./StatCard"
import { GraphicConsistency } from "./GraphicConsistency"

export function Dashboard() {
  const { history } = useHistoryStore()

  const stats = useMemo(() => {
    if (history.length === 0) {
      return {
        totalFasts: 0,
        longestFast: 0,
        averageFast: 0,
        totalHoursFasted: 0,
        currentStreak: 0,
        longestStreak: 0,
        consistency: Array(7).fill(false),
      }
    }

    const totalFasts = history.length
    const longestFast = Math.max(...history.map((r) => r.duration))
    const totalDuration = history.reduce((acc, r) => acc + r.duration, 0)
    const averageFast = totalDuration / totalFasts
    const totalHoursFasted = totalDuration / 3600

    let currentStreak = 0
    let longestStreak = 0
    if (history.length > 0) {
      const sortedHistory = [...history].sort(
        (a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
      )

      currentStreak = 1
      longestStreak = 1

      for (let i = 0; i < sortedHistory.length - 1; i++) {
        const currentFastEnd = new Date(sortedHistory[i].endTime)
        const previousFastEnd = new Date(sortedHistory[i + 1].endTime)

        const diffTime = currentFastEnd.getTime() - previousFastEnd.getTime()
        const diffDays = diffTime / (1000 * 3600 * 24)

        if (diffDays <= 1.5) {
          // Allows for some flexibility (e.g., fasting ending in the morning vs. in the evening).
          currentStreak++
        } else {
          longestStreak = Math.max(longestStreak, currentStreak)
          currentStreak = 1 // Reset the current streak
        }
      }
      longestStreak = Math.max(longestStreak, currentStreak)

      // Check if the last fasting session was more than 2 days ago
      const lastFastDate = new Date(sortedHistory[0].endTime)
      const today = new Date()
      if ((today.getTime() - lastFastDate.getTime()) / (1000 * 3600 * 24) > 2) {
        currentStreak = 0
      }
    }

    const today = new Date()
    const last7Days = Array(7)
      .fill(0)
      .map((_, i) => {
        const d = new Date()
        d.setDate(today.getDate() - (6 - i))
        return d.toDateString()
      })

    const consistency = last7Days.map((day) =>
      history.some((record) => new Date(record.endTime).toDateString() === day)
    )
    console.log("average", averageFast)
    return {
      totalFasts,
      longestFast,
      averageFast,
      totalHoursFasted: parseFloat(totalHoursFasted.toFixed(1)),
      currentStreak,
      longestStreak,
      consistency,
    }
  }, [history])

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center text-xl'>
          <LayoutDashboard className='mr-2 h-5 w-5' />
          Tableau de Bord
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <StatCard
            icon={TrendingUp}
            title='Jeûnes Complets'
            value={stats.totalFasts}
          />
          <StatCard
            icon={Flame}
            title='Série en cours'
            value={stats.currentStreak}
            unit='jours'
          />
          <StatCard
            icon={Trophy}
            title='Meilleure série'
            value={stats.longestStreak}
            unit='jours'
          />
          <StatCard
            icon={Award}
            title='Jeûne le plus long'
            value={formatDuration(stats.longestFast)}
          />
          <StatCard
            icon={Repeat}
            title='Durée moyenne'
            value={formatDuration(stats.averageFast)}
          />
          <StatCard
            icon={Hourglass}
            title='Heures jeûnées'
            value={stats.totalHoursFasted}
            unit='heures'
          />
        </div>

        {/* Consistency Graphic */}
        <GraphicConsistency stats={stats} />
      </CardContent>
    </Card>
  )
}
