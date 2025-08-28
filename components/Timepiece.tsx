import { formatDuration } from "@/lib/utils"
import { GOAL_DURATION } from "@/lib/constants"

export function Timepiece({ elapsedTime }: { elapsedTime: number }) {
  return (
    <div className='font-mono text-6xl md:text-8xl font-extrabold text-primary tabular-nums'>
      {elapsedTime < GOAL_DURATION * 3600 ? (
        formatDuration(GOAL_DURATION * 3600 - elapsedTime)
      ) : (
        <span className='text-green-600'>
          {formatDuration(elapsedTime - GOAL_DURATION * 3600)}{" "}
        </span>
      )}
    </div>
  )
}
