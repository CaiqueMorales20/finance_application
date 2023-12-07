'use client'

import { useMediaQuery } from "@/hooks/useMediaQuery"
import Image from "next/image"

// Types
type IButton = {
  text: string
  onClick: () => void
  dark?: boolean
  className?: string
  icon?: string
  icon_w?: number
  icon_h?: number
  alt: string
}

// Functional Component
export default function Button({text, onClick, className, icon, alt, icon_h, icon_w, dark}: IButton) {
  // Variables
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Rendering
  return (
    <button title={alt} onClick={onClick} className={`px-2 py-2 md:px-8 md:py-3  m-button duration-300 text-white font-semibold text-sm rounded-md flex items-center gap-4 ${className} ${dark ? "bg-primary/60 hover:bg-primary/30" : "bg-primary hover:bg-primary/80"}`}>
      <p>{text}</p>
      {icon && <Image src={icon} alt={alt} width={icon_w} height={icon_h} />}
    </button>
  );
}