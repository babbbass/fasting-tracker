import { create } from "zustand"
import { GOAL_DURATION } from "@/lib/constants"

interface GoalState {
  goalDuration: number
  setGoalDuration: (goalDuration: number) => void
}

export const useGoalStore = create<GoalState>((set) => ({
  goalDuration: GOAL_DURATION,
  setGoalDuration: (goalDuration) => set({ goalDuration }),
}))
