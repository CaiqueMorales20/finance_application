import Image from 'next/image'
import { Entry } from './types'
import { toReal } from '@/utils/toReal'

// Functional Component
export default function Entry({ title, value, type, category }: Entry) {
  // Rendering
  return (
    <div className="flex w-full max-w-[25rem] justify-between gap-2 rounded-[10px] bg-neutral-700/60 px-4 py-8 md:gap-3 md:px-6 md:py-10 md:pb-14 ">
      <div className="flex items-start gap-4">
        <Image
          className="w-[40px] md:w-[45px]"
          src={
            type === 'income'
              ? '/dashboard/income.svg'
              : '/dashboard/outcome.svg'
          }
          alt="Income icon"
          width={45}
          height={45}
        />
        <div>
          <h2 className="text-sm font-medium text-white md:text-base">
            {title}
          </h2>
          {category.map((item, index) => (
            <p className="font-medium text-neutral-400" key={index}>
              {item.name}
            </p>
          ))}
        </div>
      </div>
      <h3 className="text-sm font-light text-white md:text-base">
        R${toReal(value)}
      </h3>
    </div>
  )
}
