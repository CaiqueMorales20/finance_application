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
      <List />
    </main>
  )
}
