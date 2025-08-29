import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function AppSkeleton() {
  return (
    <div className='container mx-auto p-4 md:p-8 flex flex-col items-center'>
      <div className='w-full max-w-2xl space-y-8 animate-pulse'>
        <Card>
          <CardHeader className='items-center gap-2'>
            <Skeleton className='h-8 w-48 rounded-md' />
            <Skeleton className='h-4 w-64 rounded-md' />
          </CardHeader>
          <CardContent className='space-y-6 flex flex-col items-center'>
            <Skeleton className='h-[250px] w-[250px] rounded-full' />
            <Skeleton className='h-12 w-full max-w-sm rounded-lg' />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className='h-7 w-56 rounded-md' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between items-center gap-4'>
              <Skeleton className='h-5 w-1/3 rounded-md' />
              <Skeleton className='h-5 w-1/3 rounded-md' />
              <Skeleton className='h-5 w-1/4 rounded-md' />
            </div>
            <div className='flex justify-between items-center gap-4'>
              <Skeleton className='h-5 w-1/3 rounded-md' />
              <Skeleton className='h-5 w-1/3 rounded-md' />
              <Skeleton className='h-5 w-1/4 rounded-md' />
            </div>
            <div className='flex justify-between items-center gap-4'>
              <Skeleton className='h-5 w-1/3 rounded-md' />
              <Skeleton className='h-5 w-1/3 rounded-md' />
              <Skeleton className='h-5 w-1/4 rounded-md' />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
