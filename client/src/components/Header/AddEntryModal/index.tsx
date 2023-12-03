import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useEffect, useRef } from "react";

// Types
type IAddEntryModal = {
  onRequestClose: () => void
  opened: boolean
}

// Functional Component
export default function AddEntryModal({opened, onRequestClose}: IAddEntryModal) {
  // Variables
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onRequestClose)

  useEffect(() => {
    document.body.classList.toggle('modal-opened')
  }, [opened])

  // Rendering
  return (
    <div>
      <div ref={modalRef} className={`bg-white fixed inset-0 m-auto h-max rounded-md w-[30rem] py-10 modal ${opened && 'modal-opened'}`}>
        Info
      </div>
    </div>
  );
}