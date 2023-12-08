'use client'

import clientCookies from "js-cookie";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useEffect, useRef, useState } from "react";
import fetchToken from "@/utils/fecthToken";
import { JwtPayload } from "jsonwebtoken";
import { updateUserInfo } from "@/states/zustand/services/updateUserInfo";
import { useStore } from "@/states/zustand/store";
import { createEntry } from "@/fetch/createEntry";

// Types
type IAddEntryModal = {
  onRequestClose: () => void
  opened: boolean
}

const types = [
  'income',
  'outcome'
]

// Functional Component
export default function AddEntryModal({opened, onRequestClose}: IAddEntryModal) {
  // Variables
  const {categories} = useStore()
  const [title, setTitle] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  
  // Fetch
  async function addEntry() {
    const categoryNumberArr = [parseInt(category)]
    const valueNumber = parseInt(value)

    try {
      await createEntry({title, value: valueNumber, type, category: categoryNumberArr})
      onRequestClose()
    } catch(err) {
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
    <div ref={modalRef} className={`bg-white flex flex-col items-center fixed inset-0 m-auto h-max rounded-md w-[30rem] py-10 modal px-10 ${opened && 'modal-opened'}`}>
      <h1 className="text-neutral-700 font-semibold text-base md:text-xl text-center mb-6">Add an income or outcome action</h1>
      <div className="flex flex-col gap-4 w-full mb-10">
        <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} className="border-neutral-700/20 text-sm md:text-base border-solid border-2 rounded-md py-2 px-4" type="text" name="title" id="title" placeholder="Title" />
        <input value={value} onChange={handleValue} className="border-neutral-700/20 text-sm md:text-base border-solid border-2 rounded-md py-2 px-4 input-number" type="number" name="value" id="value" placeholder="Value" />
        <Select type="type" setValue={(e) => setType(e.toString())} placeholder='Select a type' options={types} />
        <Select type="category" setValue={(e) => setCategory(e.toString())} placeholder='Select a category' options={categories} />
      </div>
      <Button className="text-true" text="Add entry" alt="Add entry" onClick={() => {
        addEntry()
        onRequestClose()
        alert('Enviado')
      }} />
      
    </div>
  );
}