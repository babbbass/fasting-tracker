import { create } from "zustand"
import { GOAL_DURATION } from "@/lib/constants"

interface GoalState {
  goalDuration: number
  setGoalDuration: (goalDuration: number) => void
  hydrate: () => void
  _hasHydrated: boolean
}

export const useGoalStore = create<GoalState>((set) => ({
  goalDuration: GOAL_DURATION,
  _hasHydrated: false,
  setGoalDuration: (newGoalDuration) => {
    try {
      localStorage.setItem("goalDuration", newGoalDuration.toString())
    } catch (error) {
      console.error("Failed to set goal duration:", error)
    }
    set({ goalDuration: newGoalDuration })
  },
  hydrate: () => {
    try {
      const savedGoalDuration = localStorage.getItem("goalDuration")
      if (savedGoalDuration) {
        set({ goalDuration: parseInt(savedGoalDuration) })
      }
    } catch (error) {
      console.error("Failed to hydrate goal duration:", error)
    }

    set({ _hasHydrated: true })
  },
}))
