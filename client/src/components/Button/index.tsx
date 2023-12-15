'use client'

import Image from 'next/image'

// Types
type IButton = {
  text: string
  onClick: () => void
  dark?: boolean
  className?: string
  icon?: string
  iconW?: number
  iconH?: number
  alt: string
}

// Functional Component
export default function Button({
  text,
  onClick,
  className,
  icon,
  alt,
  iconH,
  iconW,
  dark,
}: IButton) {
  // Rendering
  return (
    <button
      title={alt}
      onClick={onClick}
      className={`m-button flex h-10 items-center gap-4 rounded-md px-2 py-2 text-xs font-semibold text-white duration-300 md:px-8 md:py-3 md:text-sm ${className} ${
        dark
          ? 'bg-primary/60 hover:bg-primary/30'
          : 'bg-primary hover:bg-primary/80'
      }`}
    >
      {text && <p>{text}</p>}
      {icon && <Image src={icon} alt={alt} width={iconW} height={iconH} />}
    </button>
  )
}
