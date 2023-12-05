import Image from "next/image";

// Functional Component
export default async function Card({type}: ICard) {
  // Rendering
  return (
    <div className="flex items-center gap-6 rounded-[10px] bg-neutral-700 px-6 py-10 pr-[123px]">
    <Image
      src={type === 'income' ? "/dashboard/income.svg" : "/dashboard/outcome.svg"}
      alt="Income icon"
      width={45}
      height={45}
    />
    <div>
      <h2 className="text-base text-neutral-400">Total {type === 'income' ? "income" : "outcome"}</h2>
      <p className="text-xl font-semibold text-white">R$ 0</p>
    </div>
  </div>
  );
}