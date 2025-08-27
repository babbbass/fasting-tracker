"use client"
import React from "react"
import { useGoalStore } from "@/lib/stores/goalStore"
import { GoalButton } from "./GoalButton"

export function Goal() {
  const { goalDuration } = useGoalStore()
  return (
    <section className='flex flex-col items-center justify-center gap-2 font-bold  p-2'>
      <div className='text-2xl md:text-4xl'>{goalDuration} heures</div>
      <div className='flex justify-center items-center gap-2 text-black text-xl md:text-2xl'>
        <GoalButton />
      </div>
    </section>
  )
}
