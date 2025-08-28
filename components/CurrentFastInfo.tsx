import { Timepiece } from "@/components/Timepiece"
import { StartFastInfo } from "@/components/StartFastInfo"

type CurrentFastInfoProps = {
  elapsedTime: number
  startTime: Date | null
}

export function CurrentFastInfo({
  elapsedTime,
  startTime,
}: CurrentFastInfoProps) {
  return (
    <div
      className={`flex ${
        startTime ? "justify-between" : "justify-center"
      } items-start w-full md:text-lg font-medium tabular-nums italic`}
    >
      {startTime && <StartFastInfo startTime={startTime?.toString()} />}
      {startTime ? (
        <Timepiece elapsedTime={elapsedTime} />
      ) : (
        <Timepiece
          elapsedTime={0}
          className='font-mono text-xl md:text-8xl font-extrabold text-primary'
        />
      )}
    </div>
  )
}
