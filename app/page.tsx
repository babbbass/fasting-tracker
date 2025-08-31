import { History } from "@/components/History"
import { Counter } from "@/components/Counter"
import { Goal } from "@/components/Goal"
import { Dashboard } from "@/components/dashboard/Dashboard"
import { ThemeToggle } from "@/components/ThemeToggle"
import { InstallPwa } from "@/components/pwa/InstallPwa"

export default function HomePage() {
  return (
    <main className='container mx-auto p-4 md:p-8 flex flex-col items-center'>
      <div className='w-full max-w-2xl space-y-8'>
        <ThemeToggle />
        <Goal />
        <Counter />
        <Dashboard />
        <History />
        <InstallPwa />
      </div>
    </main>
  )
}
