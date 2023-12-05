// Functional Component
export default function Input({id, value, onChange, placeholder}: IInput) {
  // Rendering
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white">{placeholder}</label>
      <input value={value} onChange={onChange} className="w-max text-neutral-400 focus:text-neutral-700 bg-transparent focus:bg-white rounded-md py-1 focus:px-2 duration-300" type="text" name={id} id={id} placeholder={placeholder} />
    </div>
  );
}