import clientCookies from "js-cookie";
import Button from "@/components/Button";
import Input from "@/components/Input";
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

  async function addCategory() {
    let token = clientCookies.get("token");
    try {
      const response = await fetch(`http://localhost:3333/category`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name,
          }),
        });
        if (response.ok) {
          console.log('Student updated successfully');
          onRequestClose()
        } else {
          const errorMessage = await response.text();
          console.error('Error updating student:', errorMessage);
        }
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
        <Button className="mt-6" onClick={addCategory} text="Add +" alt="Add category" />
      </div>
    </div>
  );
}