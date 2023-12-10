import { isAuth } from '@/middlewares/auth'
import { redirect } from 'next/navigation'
import Card from './Card'

// Functional Component
export default async function Dashboard() {
  // Variables
  const auth = isAuth()

  if (!auth) {
    redirect('/')
  }

  // Rendering
  return (
    <main className="container flex flex-col gap-9">
      <section className="flex flex-col items-center gap-7 md:flex-row">
        <Card type="income" />
        <Card type="outcome" />
      </section>
    </main>
  )
}
