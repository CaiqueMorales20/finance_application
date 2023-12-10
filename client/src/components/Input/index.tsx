import { IInput } from './types'

// Functional Component
export default function Input({ id, onChange, value, placeholder }: IInput) {
  // Rendering
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-white md:text-base">{placeholder}</label>
      <input
        onChange={onChange}
        value={value}
        className="rounded-md border-2 border-solid border-neutral-700/20 px-4 py-2 text-sm md:text-base"
        type="text"
        name={id}
        id={id}
        placeholder={placeholder}
      />
    </div>
  )
}
