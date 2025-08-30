import { History } from "@/components/History"
import { Counter } from "@/components/Counter"
import { Goal } from "@/components/Goal"
import { Dashboard } from "@/components/dashboard/Dashboard"

export default function HomePage() {
  return (
    <main className='container mx-auto p-4 md:p-8 flex flex-col items-center'>
      <div className='w-full max-w-2xl space-y-8'>
        <Goal />
        <Counter />
        <Dashboard />
        <History />
      </div>
    </main>
  )
}
