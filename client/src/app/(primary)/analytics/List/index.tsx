'use client'

import { useStore } from '@/states/zustand/store'
import Entry from '../Entry'

// Functional Component
export default function List() {
  const entries = useStore().entries
  // Rendering
  return (
    <div className="flex flex-col gap-4">
      {entries.map((entry, index) => (
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
