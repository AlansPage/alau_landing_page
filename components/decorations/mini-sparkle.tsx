import type { CSSProperties } from "react"

type MiniSparkleProps = {
  size?: number
  color?: string
  className?: string
  style?: CSSProperties
}

export function MiniSparkle({
  size = 8,
  color = "hsl(280 60% 65%)",
  className,
  style,
}: MiniSparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* 4 short crossing lines through center — tiny twinkle */}
      <line x1="4" y1="0.5" x2="4" y2="7.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="0.5" y1="4" x2="7.5" y2="4" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="1.5" y1="1.5" x2="6.5" y2="6.5" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="6.5" y1="1.5" x2="1.5" y2="6.5" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  )
}
