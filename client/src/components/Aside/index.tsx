// Client Side
'use client'

// Imports
import { usePathname } from 'next/navigation'

// Imported Components
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useState } from 'react'

// Functional Component
export default function Aside() {
  // Variables
  const path = usePathname()

  const [isMobile,] = useState(useMediaQuery('(max-width: 768px)')) 

  // Functions
  function logout() {
    document.cookie = "token = "
    window.location.reload()
  }

  // Rendering
  return (
    <aside className="h-screen w-max md:pr-24 md:w-[30rem] overflow-hidden static bg-neutral-700 px-4 md:px-6 pb-8 z-40 flex flex-col">
      <ul className="flex flex-col gap-2 mt-28 md:mt-32">
        {/* Item */}
        <Link href="/dashboard">
          <li
            className={`flex cursor-pointer m-button items-center gap-5 rounded-md p-2 md:px-4 md:py-4 text-base font-light text-white  duration-300 ${
              path === '/dashboard' ? 'bg-primary hover:bg-primary/80' : 'bg-transparent'
            }`}
          >
            <Image
              className='md:w-6'
              src="/menu/home.svg"
              alt="Go to resume"
              width={30}
              height={30}
              />
                <span>Dashboard</span>
          </li>
        </Link>
        {/* Item */}
        <Link href="/analytics">
          <li
            className={`flex cursor-pointer m-button items-center gap-5 rounded-md p-2 md:px-4 md:py-4 text-base font-light text-white  duration-300 ${
              path === '/analytics' ? 'bg-primary hover:bg-primary/80' : 'bg-transparent'
            }`}
          >
            <Image
              className='md:w-6'
              src="/menu/analytics.svg"
              alt="Go to analytics"
              width={30}
              height={30}
              />
                <span>Analytics</span>
          </li>
        </Link>
        {/* Item */}
        <Link href="/wallet">
          
          <li
            className={`flex cursor-pointer m-button items-center gap-5 rounded-md p-2 md:px-4 md:py-4 text-base font-light text-white  duration-300 ${
              path === '/wallet' ? 'bg-primary hover:bg-primary/80' : 'bg-transparent'
            }`}
          >
            <Image
              className='md:w-6'
              src="/menu/wallet.svg"
              alt="Go to wallet"
              width={30}
              height={30}
              />
                <span>Wallet</span>
          </li>
        </Link>
        {/* Item */}
        <Link href="/account">
          
          <li
            className={`flex cursor-pointer m-button items-center gap-5 rounded-md p-2 md:px-4 md:py-4 text-base font-light text-white  duration-300 ${
              path === '/account' ? 'bg-primary hover:bg-primary/80' : 'bg-transparent'
            }`}
          >
            <Image
              className='md:w-6'
              src="/menu/account.svg"
              alt="Go to account"
              width={30}
              height={30}
              />
                <span>Account</span>
          </li>
        </Link>
        {/* Item */}
        <Link href="/settings">
          
          <li
            className={`flex cursor-pointer m-button items-center gap-5 rounded-md p-2 md:px-4 md:py-4 text-base font-light text-white  duration-300 ${
              path === '/settings' ? 'bg-primary hover:bg-primary/80' : 'bg-transparent'
            }`}
          >
            <Image
              className='md:w-6'
              src="/menu/settings.svg"
              alt="Go to settings"
              width={30}
              height={30}
              />
                <span>Settings</span>
          </li>
        </Link>
      </ul>
      <Button dark className='mb-0 mt-auto w-max' onClick={() => logout()} text='Logout' alt='Logout' icon='/logout.svg' icon_h={14} icon_w={14} />
    </aside>
  )
}
