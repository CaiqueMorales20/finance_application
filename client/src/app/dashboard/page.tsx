import { isAuth } from '@/middlewares/auth';
import Image from 'next/image'
import { redirect } from 'next/navigation'
import Card from './Card';

// Functional Component
export default async function Dashboard() {
  // Variables
  const auth = isAuth()

  if (!auth) {
    redirect('/')
  }

  // Functions
  

  // Rendering
  return (
    <main className="container flex flex-col gap-9">
      <section className="flex items-center gap-7">
        <Card type='income' />
        <Card type='outcome' />
      </section>
    </main>
  )
}