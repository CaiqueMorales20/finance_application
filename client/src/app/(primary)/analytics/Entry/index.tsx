import { Entry } from './types'

// Functional Component
export default function Entry({ title, value, type, category }: Entry) {
  // Rendering
  return (
    <div className="flex w-full max-w-[20rem] flex-col gap-2 rounded-[10px] bg-neutral-700 px-4 py-8 md:gap-3 md:px-6 md:py-10 ">
      <h2 className="text-sm text-neutral-400 md:text-base">{title}</h2>
      <h3 className="text-sm text-white md:text-base">{value}</h3>
      {category.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))}
      <p className="text-sm text-neutral-400 md:text-base">{type}</p>
    </div>
  )
}
