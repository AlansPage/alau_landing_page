import type { CSSProperties } from "react"

type SparkleStarProps = {
  points?: 4 | 6
  size?: number
  color?: string
  className?: string
  style?: CSSProperties
}

function FourPointed({ color }: { color: string }) {
  return (
    <>
      {/* Thin diamond arms — vertical */}
      <line x1="8" y1="0.5" x2="8" y2="15.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Horizontal */}
      <line x1="0.5" y1="8" x2="15.5" y2="8" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="8" cy="8" r="1.5" fill={color} />
    </>
  )
}

function SixPointed({ color }: { color: string }) {
  // 6 radiating lines at 60° intervals, slightly uneven lengths
  const rays = [
    { angle: -90, len: 7.2 },
    { angle: -30, len: 6.5 },
    { angle: 30, len: 7 },
    { angle: 90, len: 7.4 },
    { angle: 150, len: 6.8 },
    { angle: 210, len: 7.1 },
  ]
  return (
    <>
      {rays.map((ray, i) => {
        const rad = (ray.angle * Math.PI) / 180
        return (
          <line
            key={i}
            x1={8 + Math.cos(rad) * 1.2}
            y1={8 + Math.sin(rad) * 1.2}
            x2={8 + Math.cos(rad) * ray.len}
            y2={8 + Math.sin(rad) * ray.len}
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        )
      })}
      <circle cx="8" cy="8" r="1.3" fill={color} />
    </>
  )
}

export function SparkleStar({
  points = 4,
  size = 16,
  color = "hsl(280 60% 65%)",
  className,
  style,
}: SparkleStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {points === 4 ? (
        <FourPointed color={color} />
      ) : (
        <SixPointed color={color} />
      )}
    </svg>
  )
}
