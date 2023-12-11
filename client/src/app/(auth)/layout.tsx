// Imports
import type { Metadata } from 'next'

// Style
import '../globals.css'

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
  return <>{children}</>
}
