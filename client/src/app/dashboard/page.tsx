import Image from 'next/image'
import { redirect } from 'next/navigation'

// Functional Component
export default function Dashboard() {
  // Variables
  const auth = false

  if(!auth) {
    redirect('/')
  }

  // Rendering
  return (
    <main className="container flex flex-col gap-9">
      <header>
        <h1 className="text-2xl font-semibold tracking-wide text-primary-300">
          Welcome back, Nicolli 👋
        </h1>
        <p className="text-neutral-400">
          Here&#8217;s what&#8217;s happening with your money today.
        </p>
      </header>
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
            <p className="text-xl font-semibold text-white">R$ 2500</p>
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
            <p className="text-xl font-semibold text-white">R$ 2000</p>
          </div>
        </div>
      </section>
    </main>
  )
}
