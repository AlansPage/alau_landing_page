import Image from "next/image"

import { cn } from "@/lib/utils"

type LogoVariant = "wordmark" | "mark"

const LOGO_SOURCES: Record<LogoVariant, { src: string; width: number; height: number }> = {
  wordmark: {
    src: "/brand/alau-wordmark.png",
    width: 220,
    height: 84,
  },
  mark: {
    src: "/brand/alau-mark.png",
    width: 128,
    height: 128,
  },
}

export function Logo({
  variant = "wordmark",
  className,
  priority = false,
  decorative = false,
  alt = "ALAU",
}: {
  variant?: LogoVariant
  className?: string
  priority?: boolean
  /** If true, the image is treated as decorative (empty alt). */
  decorative?: boolean
  alt?: string
}) {
  const { src, width, height } = LOGO_SOURCES[variant]

  return (
    <Image
      src={src}
      width={width}
      height={height}
      priority={priority}
      alt={decorative ? "" : alt}
      aria-hidden={decorative ? true : undefined}
      className={cn("select-none", className)}
    />
  )
}
