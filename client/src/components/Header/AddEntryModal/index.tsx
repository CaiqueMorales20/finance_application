'use client'

import Button from '@/components/Button'
import Select from '@/components/Select'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '@/states/zustand/store'
import { createEntry } from '@/fetch/createEntry'

// Types
type IAddEntryModal = {
  onRequestClose: () => void
  opened: boolean
}

const types = ['income', 'outcome']

// Functional Component
export default function AddEntryModal({
  opened,
  onRequestClose,
}: IAddEntryModal) {
  // Variables
  const { categories } = useStore()
  const [title, setTitle] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  // Fetch
  async function addEntry() {
    const categoryNumberArr = [parseInt(category)]
    const valueNumber = parseInt(value)

    try {
      await createEntry({
        title,
        value: valueNumber,
        type,
        category: categoryNumberArr,
      })
      onRequestClose()
    } catch (err) {
      console.log(err)
    }
  }

  // Functions
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onRequestClose)

  useEffect(() => {
    document.body.classList.toggle('modal-opened')
  }, [opened])

  const handleValue = (e: React.FormEvent<HTMLInputElement>) => {
    const parsedValue: string = e.currentTarget.value.replace(/\D/g, '')
    setValue(parsedValue)
  }

  return (
    <div
      ref={modalRef}
      className={`modal fixed inset-0 m-auto flex h-max w-[30rem] flex-col items-center rounded-md bg-white px-10 py-10 ${
        opened && 'modal-opened'
      }`}
    >
      <h1 className="mb-6 text-center text-base font-semibold text-neutral-700 md:text-xl">
        Add an income or outcome action
      </h1>
      <div className="mb-10 flex w-full flex-col gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          className="rounded-md border-2 border-solid border-neutral-700/20 px-4 py-2 text-sm md:text-base"
          type="text"
          name="title"
          id="title"
          placeholder="Title"
        />
        <input
          value={value}
          onChange={handleValue}
          className="input-number rounded-md border-2 border-solid border-neutral-700/20 px-4 py-2 text-sm md:text-base"
          type="number"
          name="value"
          id="value"
          placeholder="Value"
        />
        <Select
          type="type"
          setValue={(e) => setType(e.toString())}
          placeholder="Select a type"
          options={types}
        />
        <Select
          type="category"
          setValue={(e) => setCategory(e.toString())}
          placeholder="Select a category"
          options={categories}
        />
      </div>
      <Button
        className="text-true"
        text="Add entry"
        alt="Add entry"
        onClick={() => {
          addEntry()
          onRequestClose()
          alert('Enviado')
        }}
      />
    </div>
  )
}
