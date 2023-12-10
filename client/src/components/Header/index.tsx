// Client Side
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '../Button'
import AddEntryModal from './AddEntryModal'
import { useStore } from '@/states/zustand/store'

// Functional Component
export default function Header() {
  // Variables
  const [addingEntry, setAddingEntry] = useState<boolean>(false)
  const { userInfo } = useStore()

  // Rendering
  return (
    <>
      {/* Header */}
      <header className="fixed left-0 top-0 z-40 flex w-screen gap-[26px] bg-neutral-700 px-6">
        <div className="hidden h-24 items-center md:flex md:w-[30rem]">
          <a href="/">
            <Image src="/logo.svg" alt="Finance Logo" width={146} height={29} />
          </a>
        </div>
        <nav className="mr-[5vw] flex h-20 w-full items-center justify-between md:h-24">
          <p className="text-sm font-semibold tracking-wide text-primary-300 md:text-xl">
            Welcome back, {userInfo.name}👋
          </p>
          <Button
            alt="Add entry"
            text="Add entry"
            onClick={() => setAddingEntry(true)}
            icon="/add.svg"
            iconH={12}
            iconW={12}
          />
        </nav>
      </header>
      {/* Modal */}
      <AddEntryModal
        opened={addingEntry}
        onRequestClose={() => setAddingEntry(false)}
      />
    </>
  )
}
