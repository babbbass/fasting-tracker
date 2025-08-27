import React from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

type InputDurationType = {
  goalHours: string
  setGoalHours: React.Dispatch<React.SetStateAction<string>>
}
export function InputDuration({ goalHours, setGoalHours }: InputDurationType) {
  return (
    <div className='flex justify-center gap-4 py-2'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <Label htmlFor='goal-hours' className='text-right w-full font-medium'>
          Objectif ( en heures )
        </Label>
        <Input
          id='goal-hours'
          type='number'
          placeholder='ex: 16'
          value={goalHours}
          onChange={(e) => setGoalHours(e.target.value)}
          className='col-span-3 h-14'
        />
      </div>
    </div>
  )
}
