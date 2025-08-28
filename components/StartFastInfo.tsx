import { formatDate } from "@/lib/utils"

export function StartFastInfo({ startTime }: { startTime: string }) {
  // console.log(startTime)
  const date = formatDate(startTime)
  const day = date.split(" ")[0]
  const hour = date.split(" ")[1]
  return (
    <div className='flex flex-col justify-center'>
      <span>Débuté</span>
      <span>{hour}</span>
      <span>{day}</span>
    </div>
  )
}
