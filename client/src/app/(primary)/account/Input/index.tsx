// Functional Component
export default function Input({ id, value, onChange, placeholder }: IInput) {
  // Rendering
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-white md:text-base">{placeholder}</label>
      <input
        value={value}
        onChange={onChange}
        className="w-max rounded-md bg-transparent py-1 text-sm text-neutral-400 duration-300 focus:bg-white focus:px-2 focus:text-neutral-700 md:text-base"
        type="text"
        name={id}
        id={id}
      />
    </div>
  )
}
