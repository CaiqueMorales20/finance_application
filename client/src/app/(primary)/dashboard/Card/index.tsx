'use client'

import { useStore } from '@/states/zustand/store'
import Image from 'next/image'
import { ICard } from './types'

// Functional Component
export default function Card({ type }: ICard) {
  const { userInfo } = useStore()

  // Rendering
  return (
    <div className="flex w-full max-w-[20rem] items-center gap-4 rounded-[10px] bg-neutral-700 px-4 py-8 md:gap-6 md:px-6 md:py-10 ">
      <Image
        className="w-[40px] md:w-[45px]"
        src={
          type === 'income' ? '/dashboard/income.svg' : '/dashboard/outcome.svg'
        }
        alt="Income icon"
        width={45}
        height={45}
      />
      <div>
        <h2 className="text-sm text-neutral-400 md:text-base">Total {type}</h2>
        <p className="text-base font-semibold text-white md:text-xl">
          R$ {type === 'income' ? userInfo.totalIncome : userInfo.totalOutcome}
        </p>
      </div>
    </div>
  )
}
