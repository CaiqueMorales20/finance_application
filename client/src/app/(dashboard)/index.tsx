import Image from "next/image";

// Functional Component
export default function Dashboard() {
  // Rendering
  return (
    <main className="container flex flex-col gap-9">
      <header>
        <h1 className="text-primary-300 font-semibold text-2xl tracking-wide">Welcome back, Nicolli 👋</h1>
        <p className="text-neutral-400">Here&#8217;s what&#8217;s happening with your money today.</p>
      </header>
      <section className="flex gap-7 items-center">
        {/* Income */}
        <div className="px-6 py-10 pr-[123px] rounded-[10px] bg-neutral-700 flex gap-6 items-center">
          <Image src="/dashboard/income.svg" alt="Income icon" width={45} height={45} />
          <div>
            <h2 className="text-neutral-400 text-base">Total Income</h2>
            <p className="text-white text-xl font-semibold">R$ 2500</p>
          </div>
        </div>
        {/* Outcome */}
        <div className="px-6 py-10 pr-[123px] rounded-[10px] bg-neutral-700 flex gap-6 items-center">
          <Image src="/dashboard/outcome.svg" alt="Outcome icon" width={45} height={45} />
          <div>
            <h2 className="text-neutral-400 text-base">Total Outcome</h2>
            <p className="text-white text-xl font-semibold">R$ 2000</p>
          </div>
        </div>
      </section>
    </main>
  );
}