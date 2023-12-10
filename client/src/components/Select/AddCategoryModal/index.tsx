import Button from '@/components/Button'
import Input from '@/components/Input'
import { createCategory } from '@/fetch/createCategory'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useRef, useState } from 'react'

type IAddCategoryModal = {
  onRequestClose: () => void
  opened: boolean
}

// Functional Component
export default function AddCategoryModal({
  opened,
  onRequestClose,
}: IAddCategoryModal) {
  // Variables
  const [name, setName] = useState<string>('')

  // Functions
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onRequestClose)

  async function handleCategory() {
    try {
      await createCategory(name)
      onRequestClose()
    } catch (err) {
      console.log(err)
    }
  }

  // Rendering
  return (
    <div
      className={`fixed inset-0 h-screen w-screen bg-black/60  ${
        opened ? 'z-[52]' : 'hidden'
      }`}
    >
      <div
        ref={modalRef}
        className={`modal fixed inset-0 m-auto flex h-max w-[20rem] flex-col items-center rounded-md bg-white px-10 py-10 shadow-xl ${
          opened && 'modal-opened'
        }`}
      >
        <h1 className="mb-2 text-center text-xl font-semibold text-neutral-700">
          Add an category
        </h1>
        <Input
          id="name"
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
          placeholder="Name"
        />
        <Button
          className="mt-6"
          onClick={handleCategory}
          text="Add +"
          alt="Add category"
        />
      </div>
    </div>
  )
}
