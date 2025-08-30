export function StatCard({
  icon: Icon,
  title,
  value,
  unit,
}: {
  icon: React.ElementType
  title: string
  value: string | number
  unit?: string
}) {
  return (
    <div className='bg-muted/50 p-4 rounded-lg'>
      <div className='flex items-center text-muted-foreground mb-2'>
        <Icon className='h-4 w-4 mr-2' />
        <span className='text-sm font-medium'>{title}</span>
      </div>
      <p className='text-2xl font-bold text-foreground'>
        {value}{" "}
        <span className='text-sm font-medium text-muted-foreground'>
          {unit}
        </span>
      </p>
    </div>
  )
}
