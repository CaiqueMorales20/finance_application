import Button from "@/components/Button";
import Select from "@/components/Select";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useEffect, useRef, useState } from "react";

// Types
type IAddEntryModal = {
  onRequestClose: () => void
  opened: boolean
}

const types = [
  'income',
  'outcome'
]

const categories = [
  'ifood',
  'uber',
  'friends',
  'work',
  'cloth'
]

// Functional Component
export default function AddEntryModal({opened, onRequestClose}: IAddEntryModal) {
  // Variables
  const [title, setTitle] = useState<string>('')
  const [value, setValue] = useState<number>(0)
  const [type, setType] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onRequestClose)

  // Functions
  useEffect(() => {
    document.body.classList.toggle('modal-opened')
  }, [opened])

  const handleValue = (e: React.FormEvent<HTMLInputElement>) => {
    const parsedValue: number = parseInt(e.currentTarget.value.replace(/\D/g, ''))
    setValue(parsedValue)
  }

  // Rendering
  return (
    <div ref={modalRef} className={`bg-white flex flex-col items-center fixed inset-0 m-auto h-max rounded-md w-[30rem] py-10 modal px-10 ${opened && 'modal-opened'}`}>
      <h1 className="text-neutral-700 font-semibold text-xl text-center mb-6">Add an income or outcome action</h1>
      <div className="flex flex-col gap-4 w-full mb-10">
        <input onChange={(e) => setTitle(e.currentTarget.value)} className="border-neutral-700/20 border-solid border-2 rounded-md py-2 px-4" type="text" name="title" id="title" placeholder="Title" />
        <input className="border-neutral-700/20 border-solid border-2 rounded-md py-2 px-4 input-number" type="number" name="title" id="title" placeholder="Value" />
        <Select setValue={(e) => setType(e)} placeholder='Select a type'  options={types} />
        <Select setValue={(e) => setCategory(e)} placeholder='Select a category' options={categories} />
      </div>
      <Button  text="Add entry" alt="Add entry" onClick={() => {
        onRequestClose()
        alert('Enviado')
      }} />
    </div>
  );
}