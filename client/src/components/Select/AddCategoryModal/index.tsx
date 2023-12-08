import Button from "@/components/Button";
import Input from "@/components/Input";
import { createCategory } from "@/fetch/createCategory";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useRef, useState } from "react";

type IAddCategoryModal = {
  onRequestClose: () => void
  opened: boolean
}

// Functional Component
export default function AddCategoryModal({opened, onRequestClose}: IAddCategoryModal) {
  // Variables
  const [name, setName] = useState<string>('')

  // Functions
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onRequestClose)

  async function handleCategory() {
    try {
      await createCategory(name)
      onRequestClose()
    } catch(err) {
      console.log(err)
    }
  }

  // Rendering
  return (
    <div className={`w-screen h-screen bg-black/60 inset-0 fixed  ${opened ? 'z-[52]' : 'hidden'}`}>
      <div ref={modalRef} className={`bg-white shadow-xl flex flex-col items-center fixed inset-0 m-auto h-max rounded-md w-[20rem] py-10 modal px-10 ${opened && 'modal-opened'}`}>
        <h1 className="text-neutral-700 font-semibold text-xl text-center mb-2">Add an category</h1>
        <Input id="name" onChange={(e) => setName(e.currentTarget.value)} value={name} placeholder="Name" />
        <Button className="mt-6" onClick={handleCategory} text="Add +" alt="Add category" />
      </div>
    </div>
  );
}