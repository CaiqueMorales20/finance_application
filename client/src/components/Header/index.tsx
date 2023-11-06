import Image from "next/image";

// Functional Component
export default function Header() {
  // Rendering
  return (
    <header className='bg-neutral-700'>
      {/* <nav className="w-[90vw] mx-auto h-24 flex items-center justify-between">
        <h1 className='text-primary-300 font-bold text-xl'>Finance</h1>
        <div className="flex gap-4 items-center">
          <Image className="cursor-pointer" src="/profile-icon.svg" alt="Open profile" width={20} height={30} />
          <Image className="cursor-pointer" src="/logout-icon.svg" alt="Logout" width={20} height={30} />
        </div>
      </nav> */}
    </header>
  );
}