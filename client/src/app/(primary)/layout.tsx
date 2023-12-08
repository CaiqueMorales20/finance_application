// Imports
import type { Metadata } from 'next'

// Imported Components
import Aside from '@/components/Aside'

// Style
import '../globals.css'
import Header from '@/components/Header'
import Zustand from '@/states/zustand'

// SEO
export const metadata: Metadata = {
  title: 'Finance Application: Your Personal Finance Manager',
  description:
    'With Finance Application, you can effortlessly track your finances. Record your expenses, set financial goals, and visualize your spending in a clear and intuitive way. Keep your budget in check and achieve your financial objectives with Finance Application',
}

// Functional Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Rendering
  return (
    <>
      <Zustand />
      <Aside />
      <Header />
      {children}
    </>
  )
}
