import { isAuth } from '@/middlewares/auth';
import Image from 'next/image'
import { redirect } from 'next/navigation'

// Functional Component
export default async function Dashboard() {
  // Variables
  const auth = isAuth()

  if (!auth) {
    redirect('/')
  }

  // Rendering
  return (
    <main className="container flex flex-col gap-9">
      <section className="flex items-center gap-7">
        {/* Income */}
        <div className="flex items-center gap-6 rounded-[10px] bg-neutral-700 px-6 py-10 pr-[123px]">
          <Image
            src="/dashboard/income.svg"
            alt="Income icon"
            width={45}
            height={45}
          />
          <div>
            <h2 className="text-base text-neutral-400">Total Income</h2>
            <p className="text-xl font-semibold text-white">R$ 0</p>
          </div>
        </div>
        {/* Outcome */}
        <div className="flex items-center gap-6 rounded-[10px] bg-neutral-700 px-6 py-10 pr-[123px]">
          <Image
            src="/dashboard/outcome.svg"
            alt="Outcome icon"
            width={45}
            height={45}
          />
          <div>
            <h2 className="text-base text-neutral-400">Total Outcome</h2>
            <p className="text-xl font-semibold text-white">R$ 0</p>
          </div>
        </div>
      </section>
    </main>
  )
}