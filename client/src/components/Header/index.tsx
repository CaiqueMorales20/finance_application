// Client Side
'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import AddEntryModal from "./AddEntryModal";
import fetchToken from "@/utils/fecthToken";
import { JwtPayload } from "jsonwebtoken";
import { useMediaQuery } from "@/hooks/useMediaQuery";
 

// Functional Component
export default function Header() {
  // Variables
  const [addingEntry, setAddingEntry] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [isMobile,] = useState(useMediaQuery('(max-width: 768px)')) 

  useEffect(() => {
    async function fetchData() {
      try {
        const decodedToken = await fetchToken();
        const { name: decodedName } = decodedToken as JwtPayload;
        setName(decodedName);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }

    fetchData();
    
  }, []);
  

  // Rendering
  return (
    <>
      {/* Header */}
      <header className='bg-neutral-700 fixed top-0 right-0 px-6 w-screen z-40 flex gap-[26px]'>
         <div className="hidden md:flex md:w-[30rem] items-center h-24">
          <a href="/">
            <Image src="/logo.svg" alt="Finance Logo" width={146} height={29} />
          </a>
        </div>
        <nav className="mr-[5vw] h-20 md:h-24 flex items-center justify-between w-full">
          <p className="text-sm md:text-xl font-semibold tracking-wide text-primary-300">
            Welcome back, {name}👋
          </p>
          <Button alt="Add entry" text="Add entry" onClick={() => setAddingEntry(true)} icon="/add.svg" icon_h={12} icon_w={12} />
        </nav>
      </header>
      {/* Modal */}
      <AddEntryModal opened={addingEntry} onRequestClose={() => setAddingEntry(false)} />
    </>
  );
}