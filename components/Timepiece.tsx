import { formatDuration } from "@/lib/utils"
import { useGoalStore } from "@/lib/stores/goalStore"

export function Timepiece({
  elapsedTime,
  className,
}: {
  elapsedTime: number
  className?: string
}) {
  const { goalDuration } = useGoalStore()
  const goalDurationInSeconds = goalDuration * 3600
  return (
    <div className={className}>
      {elapsedTime < goalDurationInSeconds ? (
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
          {formatDuration(goalDurationInSeconds - elapsedTime)}
        </div>
      ) : (
        <span className='text-green-600'>
          {formatDuration(elapsedTime - goalDurationInSeconds)}{" "}
        </span>
      )}
    </div>
  )
}
