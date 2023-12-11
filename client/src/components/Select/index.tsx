import Image from 'next/image'
import { useState } from 'react'
import AddCategoryModal from './AddCategoryModal'
import { ICategory } from './types'

type ISelect = {
  types?: string[]
  categories?: ICategory[]
  placeholder: string
  setValue: (e: number | string) => void
  type: 'type' | 'category'
}

// Functional Component
export default function Select({
  categories,
  types,
  placeholder,
  setValue,
  type,
}: ISelect) {
  // Variables
  const [selectOpened, setSelectOpened] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>(placeholder)
  const [addingCategory, setAddingCategory] = useState<boolean>(false)

  // Rendering
  return (
    <div>
      <div className="relative">
        <button
          onClick={() => setSelectOpened(!selectOpened)}
          className={`relative z-20 flex w-full  cursor-pointer rounded-md border-2 border-solid border-neutral-700/20 bg-white px-4 py-2 text-sm md:text-base ${
            selectedOption === placeholder
              ? 'text-neutral-400'
              : 'text-neutral-700'
          }`}
        >
          {selectedOption}
        </button>
        <Image
          className="absolute right-4 top-1/2 z-30 -translate-y-1/2"
          src="/components/select/arrow-down.svg"
          alt="Open options"
          width={15}
          height={8}
        />
      </div>
      <ul
        className={`-mt-1 grid rounded-md rounded-t-none border-2 border-t-0 border-solid border-neutral-700/20 duration-300 ${
          selectOpened ? 'grid-rows-[1fr]' : ' grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          {type === 'category' && categories
            ? categories.map((option: ICategory, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setValue(option.id)
                    setSelectedOption(option.name)
                    setSelectOpened(false)
                  }}
                  className=" cursor-pointer px-4 py-2 text-sm duration-300 first-of-type:pt-4 hover:bg-neutral-400/30 md:text-base"
                >
                  {option.name}
                </li>
              ))
            : type === 'type' && types
              ? types.map((option: string, index: number) => (
                  <li
                    key={index}
                    onClick={() => {
                      setValue(option)
                      setSelectedOption(option)
                      setSelectOpened(false)
                    }}
                    className="cursor-pointer px-4 py-2 text-sm duration-300 first-of-type:pt-4 hover:bg-neutral-400/30 md:text-base"
                  >
                    {option}
                  </li>
                ))
              : null}
          {type === 'category' && (
            <li
              onClick={() => setAddingCategory(true)}
              className="cursor-pointer px-4 py-2 text-sm text-neutral-400/90 duration-300 first-of-type:pt-4 hover:bg-neutral-400/30 md:text-base"
            >
              Add a category +
            </li>
          )}
        </div>
      </ul>
      <AddCategoryModal
        opened={addingCategory}
        onRequestClose={() => setAddingCategory(false)}
      />
    </div>
  )
}
