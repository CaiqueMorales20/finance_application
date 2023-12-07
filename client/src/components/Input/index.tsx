// Functional Component
export default function Input({id, onChange, value, placeholder}: IInput) {
  // Rendering
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm md:text-base text-white">{placeholder}</label>
      <input onChange={onChange} value={value} className="text-sm md:text-base border-neutral-700/20 border-solid border-2 rounded-md py-2 px-4" type="text" name={id} id={id} placeholder={placeholder} />
    </div>
  );
}