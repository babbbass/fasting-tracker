import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

type GraphicConsistencyType = {
  stats: {
    consistency: boolean[]
  }
}

export function GraphicConsistency({ stats }: GraphicConsistencyType) {
  return (
    <div>
      <h3 className='text-sm font-medium text-muted-foreground mb-2 flex items-center'>
        <CheckCircle2 className='h-4 w-4 mr-2' />
        Constance (7 derniers jours)
      </h3>
      <TooltipProvider>
        <div className='flex justify-between gap-1 md:gap-2'>
          {stats.consistency.map((completed, i) => {
            const d = new Date()
            d.setDate(new Date().getDate() - (6 - i))
            const dayString = d.toLocaleDateString("fr-FR", {
              weekday: "short",
              day: "numeric",
            })
            return (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "h-10 w-full rounded-md",
                      completed ? "bg-primary" : "bg-muted/60"
                    )}
                  ></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {dayString}: {completed ? "Jeûne complété" : "Aucun jeûne"}
                  </p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </div>
  )
}
