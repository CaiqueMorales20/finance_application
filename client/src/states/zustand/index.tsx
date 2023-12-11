'use client'

import { useEffect } from 'react'
import { updateUserInfo } from './services/updateUserInfo'
import { updateCategories } from './services/updateCategories'
import { updateEntries } from './services/updateEntries'

// Functional Component
export default function Zustand() {
  useEffect(() => {
    updateUserInfo()
    updateCategories()
    updateEntries()
  }, [])

  // Rendering
  return <></>
}

async function redirect() {
  await updateUserInfo()
  await updateCategories()
  await updateEntries()
  window.location.href = '/dashboard'
}

export { redirect }
