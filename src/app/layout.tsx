// Imports
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

// Style
import './globals.css'

// Fonts

const roboto = Roboto({subsets: ['latin'],weight: ['100', '300', '400', '500', '700', '900'],})

// SEO
export const metadata: Metadata = {
  title: 'Finance Application: Your Personal Finance Manager',
  description: 'With Finance Application, you can effortlessly track your finances. Record your expenses, set financial goals, and visualize your spending in a clear and intuitive way. Keep your budget in check and achieve your financial objectives with Finance Application',
}

// Functional Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
