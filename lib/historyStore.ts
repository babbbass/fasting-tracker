import { create } from "zustand"
import { FastingRecordType } from "@/lib/types"

interface HistoryState {
  history: FastingRecordType[]
  addFastingRecord: (newFastingRecord: FastingRecordType) => void
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  addFastingRecord: (newFastingRecord) =>
    set((state) => ({ history: [newFastingRecord, ...state.history] })),
}))
