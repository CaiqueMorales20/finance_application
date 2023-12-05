import Image from "next/image";
import { useState } from "react";

type ISelect = {
  options: string[]
  placeholder: string
  setValue: (e: string) => void
}

// Functional Component
export default function Select({options, placeholder, setValue}: ISelect) {
  // Variables
  const [selectOpened, setSelectOpened] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>(placeholder)

  // Rendering
  return (
    <div>
      <div className="relative">
        <button onClick={() => setSelectOpened(!selectOpened)} className={`flex bg-white  relative z-20 border-neutral-700/20 border-solid border-2 rounded-md py-2 px-4 cursor-pointer w-full ${selectedOption === placeholder ? 'text-neutral-400' : 'text-neutral-700'}`}>{selectedOption}</button>
        <Image className="absolute right-4 top-1/2 -translate-y-1/2 z-30" src="/components/select/arrow-down.svg" alt="Open options" width={15} height={8} />
      </div>
      <ul className={`grid border-t-0 rounded-t-none duration-300 -mt-1 border-neutral-700/20 border-solid border-2 rounded-md ${selectOpened ? 'grid-rows-[1fr]' : ' grid-rows-[0fr]'}`} >
        <div className="overflow-hidden">
          {options.map((option: string, index: number) => (
            <li 
              key={index}
              onClick={() => {
                setValue(option)
                setSelectedOption(option)
                setSelectOpened(false)
              }} 
              className="cursor-pointer hover:bg-neutral-400/30 duration-300 first-of-type:pt-4 py-2 px-4">{option}</li>
          ))}
          <li className="cursor-pointer hover:bg-neutral-400/30 text-neutral-400/90 duration-300 first-of-type:pt-4 py-2 px-4">
            Add a category +
          </li>
        </div>
      </ul>
    </div>
  );
}