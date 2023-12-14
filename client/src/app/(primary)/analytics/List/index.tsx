'use client'

import { useStore } from '@/states/zustand/store'
import Entry from '../Entry'

// Functional Component
export default function List() {
  const { entries } = useStore()
  const reversed = [...entries].reverse()

  // Rendering
  return (
    <div className="flex flex-col gap-4">
      {reversed.map((entry, index) => (
        <Entry
          title={entry.title}
          value={entry.value}
          type={entry.type}
          category={entry.category}
          key={index}
        />
      ))}
    </div>
  )
}
