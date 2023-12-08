'use client'

import { useStore } from "@/states/zustand/store";
import Image from "next/image";


// Functional Component
export default function Card({type}: ICard) {
  const { userInfo } = useStore()

  // Rendering
  return (
    <div className="flex items-center gap-4 md:gap-6 rounded-[10px] w-full max-w-[20rem] bg-neutral-700 px-4 md:px-6 py-8 md:py-10 ">
    <Image
    className="w-[40px] md:w-[45px]"
      src={type === 'income' ? "/dashboard/income.svg" : "/dashboard/outcome.svg"}
      alt="Income icon"
      width={45}
      height={45}
    />
    <div>
      <h2 className="text-sm md:text-base text-neutral-400">Total {type}</h2>
      <p className="text-base md:text-xl font-semibold text-white">R$ {type === 'income' ? userInfo.totalIncome : userInfo.totalOutcome}</p>
    </div>
  </div>
  );
}