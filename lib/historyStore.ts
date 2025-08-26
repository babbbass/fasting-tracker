import { create } from "zustand"
import { FastingRecordType } from "@/lib/types"

interface HistoryState {
  history: FastingRecordType[]
  setHistory: (history: FastingRecordType[]) => void
  addFastingRecord: (newFastingRecord: FastingRecordType) => void
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  setHistory: (history) => set({ history }),
  addFastingRecord: (newFastingRecord) =>
    set((state) => ({ history: [newFastingRecord, ...state.history] })),
}))
