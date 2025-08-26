import { create } from "zustand"
import { FastingRecordType } from "@/lib/types"

interface HistoryState {
  history: FastingRecordType[]
  addFastingRecord: (newFastingRecord: FastingRecordType) => void
}
const history = localStorage.getItem("fastingHistory")

export const useHistoryStore = create<HistoryState>((set) => ({
  history: history ? JSON.parse(history) : [],
  addFastingRecord: (newFastingRecord) =>
    set((state) => ({ history: [newFastingRecord, ...state.history] })),
}))
