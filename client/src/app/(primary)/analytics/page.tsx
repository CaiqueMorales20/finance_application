import { isAuth } from '@/middlewares/auth'
import { redirect } from 'next/navigation'

import List from './List'

// Functional Component
export default function Analytics() {
  // Variables
  const auth = isAuth()

  if (!auth) {
    redirect('/')
  }

  // Rendering
  return (
    <main className="container">
      <h1 className="mb-5 text-2xl font-bold text-white">Last Entries</h1>
      <List />
    </main>
  )
}
