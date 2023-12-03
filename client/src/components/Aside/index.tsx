// Client Side
'use client'

// Imports
import { usePathname } from 'next/navigation'

// Imported Components
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'

// Functional Component
export default function Aside() {
  // Variables
  const path = usePathname()

  // Functions
  function logout() {
    document.cookie = "token = "
    window.location.reload()
  }

  // Rendering
  return (
    <aside className="h-screen w-[30rem] static bg-neutral-700 px-6 pb-8 z-40 flex flex-col">
      <header className="flex h-32 items-center ">
        <a href="/">
          <Image src="/logo.svg" alt="Finance Logo" width={146} height={29} />
        </a>
      </header>
      <ul className="flex flex-col gap-2">
        {/* Item */}
        <Link href="/dashboard">
          <li
            className={`flex cursor-pointer items-center gap-5 rounded-md px-4 py-4 text-base font-light text-white  duration-300 ${
              path === '/dashboard' ? 'bg-primary hover:bg-primary/80' : 'bg-transparent'
            }`}
          >
            <Image
              src="/menu/home.svg"
              alt="Go to resume"
              width={20}
              height={20}
            />
            Dashboard
          </li>
        </Link>
        {/* Item */}
        <Link href="/analytics">
          <li
            className={`flex cursor-pointer items-center gap-5 rounded-md px-4 py-4 text-base font-light text-white  duration-300 ${
              path === '/analytics' ? 'bg-primary hover:bg-primary/80' : 'bg-transparent'
            }`}
          >
            <Image
              src="/menu/analytics.svg"
              alt="Go to analytics"
              width={20}
              height={20}
            />
            Analytics
          </li>
        </Link>
        {/* Item */}
        <Link href="/wallet">
          <li
            className={`flex cursor-pointer items-center gap-5 rounded-md px-4 py-4 text-base font-light text-white  duration-300 ${
              path === '/wallet' ? 'bg-primary hover:bg-primary/80' : 'bg-transparent'
            }`}
          >
            <Image
              src="/menu/wallet.svg"
              alt="Go to wallet"
              width={20}
              height={20}
            />
            Wallet
          </li>
        </Link>
        {/* Item */}
        <Link href="/account">
          <li
            className={`flex cursor-pointer items-center gap-5 rounded-md px-4 py-4 text-base font-light text-white  duration-300 ${
              path === '/account' ? 'bg-primary hover:bg-primary/80' : 'bg-transparent'
            }`}
          >
            <Image
              src="/menu/account.svg"
              alt="Go to account"
              width={20}
              height={20}
            />
            Account
          </li>
        </Link>
        {/* Item */}
        <Link href="/settings">
          <li
            className={`flex cursor-pointer items-center gap-5 rounded-md px-4 py-4 text-base font-light text-white  duration-300 ${
              path === '/settings' ? 'bg-primary hover:bg-primary/80' : 'bg-transparent'
            }`}
          >
            <Image
              src="/menu/settings.svg"
              alt="Go to settings"
              width={20}
              height={20}
            />
            Settings
          </li>
        </Link>
      </ul>
      <Button dark className='mb-0 mt-auto w-max' onClick={() => logout()} text='Logout' alt='Logout' icon='/logout.svg' icon_h={14} icon_w={14} />
    </aside>
  )
}
