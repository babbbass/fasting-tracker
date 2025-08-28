import { formatDuration } from "@/lib/utils"
import { GOAL_DURATION } from "@/lib/constants"

export function Timepiece({
  elapsedTime,
  className,
}: {
  elapsedTime: number
  className?: string
}) {
  return (
    <div className={className}>
      {elapsedTime < GOAL_DURATION * 3600 ? (
        <div className='flex flex-col gap-2'>
          <span
            className={`${
              className
                ? "hidden"
                : "text-sm font-semibold uppercase tracking-wider text-muted-foreground"
            }`}
          >
            restant
          </span>
          {formatDuration(GOAL_DURATION * 3600 - elapsedTime)}
        </div>
      ) : (
        <span className='text-green-600'>
          {formatDuration(elapsedTime - GOAL_DURATION * 3600)}{" "}
        </span>
      )}
    </div>
  )
}
