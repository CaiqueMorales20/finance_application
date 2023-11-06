// Client Side
'use client'

// Imports
import {usePathname} from 'next/navigation'

// Imported Components
import Image from "next/image";
import Link from 'next/link';


// Functional Component
export default function Aside() {
  // Variables
  const path = usePathname()

  // Rendering
  return (
    <aside className="bg-neutral-700 w-[25rem] max-w-[50vw] h-screen px-6 pb-8">
      <header className="h-32 flex items-center ">
        <a href='/'>
          <Image src="/logo.svg" alt='Finance Logo' width={160} height={40} />
        </a>
      </header>
      <ul className="flex flex-col gap-2">
        {/* Item */}
        <Link href="/">
          <li className={`text-white text-base font-light flex gap-5 items-center rounded-md py-4 px-4 duration-300 cursor-pointer ${path === '/' ? 'bg-primary font-semibold' : 'bg-transparent'}`}>
            <Image src="/menu/home.svg" alt="Go to resume" width={25} height={25} />
            Dashboard
          </li>
        </Link>
        {/* Item */}
        <Link href="/analytics">
          <li className={`text-white text-base font-light flex gap-5 items-center rounded-md py-4 px-4 duration-300 cursor-pointer ${path === '/analytics' ? 'bg-primary font-semibold' : 'bg-transparent'}`}>
            <Image src="/menu/analytics.svg" alt="Go to analytics" width={25} height={25} />
            Analytics
          </li>
        </Link>
        {/* Item */}
        <Link href="/wallet">
          <li className={`text-white text-base font-light flex gap-5 items-center rounded-md py-4 px-4 duration-300 cursor-pointer ${path === '/wallet' ? 'bg-primary font-semibold' : 'bg-transparent'}`}>
            <Image src="/menu/wallet.svg" alt="Go to wallet" width={25} height={25} />
            Wallet
          </li>
        </Link>
        {/* Item */}
        <Link href="/account">
          <li className={`text-white text-base font-light flex gap-5 items-center rounded-md py-4 px-4 duration-300 cursor-pointer ${path === '/account' ? 'bg-primary font-semibold' : 'bg-transparent'}`}>
            <Image src="/menu/account.svg" alt="Go to account" width={25} height={25} />
            Account
          </li>
        </Link>
        {/* Item */}
        <Link href="/settings">
          <li className={`text-white text-base font-light flex gap-5 items-center rounded-md py-4 px-4 duration-300 cursor-pointer ${path === '/settings' ? 'bg-primary font-semibold' : 'bg-transparent'}`}>
            <Image src="/menu/settings.svg" alt="Go to settings" width={25} height={25} />
            Settings
          </li>
        </Link>
      </ul>
    </aside>
  );
}