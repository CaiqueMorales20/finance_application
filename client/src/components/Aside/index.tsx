// Client Side
'use client'

// Imports
import { usePathname } from 'next/navigation'

// Imported Components
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'
import { useState } from 'react'

// Functional Component
export default function Aside() {
  // Variables
  const path = usePathname()
  const [openedSidebar, setOpenedSidebar] = useState(false)

  // Functions
  function logout() {
    document.cookie = 'token = '
    window.location.reload()
  }

  // Rendering
  return (
    <aside className="fixed z-40 flex h-screen w-max flex-col overflow-hidden bg-neutral-700 px-4 pb-8 md:w-[20vw] md:px-6">
      <ul className="mt-28 flex flex-col gap-2 md:mt-32">
        {/* Item */}
        <Link href="/dashboard">
          <li
            className={`m-button duration-250 flex cursor-pointer items-center gap-5 rounded-md p-3 text-base font-light text-white md:px-4  md:py-4 ${
              path === '/dashboard'
                ? 'bg-primary hover:bg-primary/80'
                : 'bg-transparent'
            }`}
          >
            <Image
              className="w-5 max-w-max md:w-6"
              src="/menu/home.svg"
              alt="Go to resume"
              width={25}
              height={25}
            />
            <span>Dashboard</span>
          </li>
        </Link>
        {/* Item */}
        <Link href="/analytics">
          <li
            className={`m-button duration-250 flex cursor-pointer items-center gap-5 rounded-md p-3 text-base font-light text-white md:px-4  md:py-4 ${
              path === '/analytics'
                ? 'bg-primary hover:bg-primary/80'
                : 'bg-transparent'
            }`}
          >
            <Image
              className="w-5 max-w-max md:w-6"
              src="/menu/analytics.svg"
              alt="Go to analytics"
              width={25}
              height={25}
            />
            <span>Analytics</span>
          </li>
        </Link>
        {/* Item */}
        <Link href="/wallet">
          <li
            className={`m-button duration-250 flex cursor-pointer items-center gap-5 rounded-md p-3 text-base font-light text-white md:px-4  md:py-4 ${
              path === '/wallet'
                ? 'bg-primary hover:bg-primary/80'
                : 'bg-transparent'
            }`}
          >
            <Image
              className="w-5 max-w-max md:w-6"
              src="/menu/wallet.svg"
              alt="Go to wallet"
              width={25}
              height={25}
            />
            <span>Wallet</span>
          </li>
        </Link>
        {/* Item */}
        <Link href="/account">
          <li
            className={`m-button duration-250 flex cursor-pointer items-center gap-5 rounded-md p-3 text-base font-light text-white md:px-4  md:py-4 ${
              path === '/account'
                ? 'bg-primary hover:bg-primary/80'
                : 'bg-transparent'
            }`}
          >
            <Image
              className="w-5 max-w-max md:w-6"
              src="/menu/account.svg"
              alt="Go to account"
              width={25}
              height={25}
            />
            <span>Account</span>
          </li>
        </Link>
        {/* Item */}
        <Link href="/settings">
          <li
            className={`m-button duration-250 flex cursor-pointer items-center gap-5 rounded-md p-3 text-base font-light text-white md:px-4  md:py-4 ${
              path === '/settings'
                ? 'bg-primary hover:bg-primary/80'
                : 'bg-transparent'
            }`}
          >
            <Image
              className="w-5 max-w-max md:w-6"
              src="/menu/settings.svg"
              alt="Go to settings"
              width={25}
              height={25}
            />
            <span>Settings</span>
          </li>
        </Link>
      </ul>
      <span
        className="hidden cursor-pointer text-white md:block"
        onClick={() => {
          setOpenedSidebar(!openedSidebar)
        }}
      >
        open
      </span>
      <Button
        dark
        className={`mb-0 mt-auto h-max  justify-center ${
          openedSidebar ? 'px-auto w-max' : ' px-auto w-max'
        }`}
        onClick={() => logout()}
        text={openedSidebar ? 'Logout' : 'Logout'}
        alt="Logout"
        icon="/logout.svg"
        iconH={14}
        iconW={14}
      />
    </aside>
  )
}
