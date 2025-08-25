import { Historic } from "@/components/Historic"
import { Counter } from "@/components/Counter"

export default function HomePage() {
  return (
    <main className='container mx-auto p-4 md:p-8 flex flex-col items-center'>
      <div className='w-full max-w-2xl space-y-8'>
        <Counter />
        <Historic />
      </div>
    </main>
  )
}
