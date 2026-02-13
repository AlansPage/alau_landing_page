import type { CSSProperties } from "react"

type Pose = "dancing" | "reaching" | "holding" | "sitting"

type StarFigureProps = {
  pose?: Pose
  size?: number
  className?: string
  style?: CSSProperties
}

/* Starburst rays at the figure's chest — multicolored, hand-drawn feel */
function Starburst({ cx, cy }: { cx: number; cy: number }) {
  const colors = [
    "hsl(220 70% 60%)",
    "hsl(195 100% 55%)",
    "hsl(280 60% 65%)",
    "hsl(35 90% 60%)",
    "hsl(340 70% 65%)",
    "hsl(220 70% 60%)",
    "hsl(195 100% 55%)",
    "hsl(280 60% 65%)",
    "hsl(35 90% 60%)",
    "hsl(340 70% 65%)",
  ]

  // 10 rays, unevenly spaced and slightly varied in length for hand-drawn feel
  const rays = [
    { angle: -85, len: 9.5 },
    { angle: -48, len: 7 },
    { angle: -15, len: 10 },
    { angle: 22, len: 7.5 },
    { angle: 55, len: 9 },
    { angle: 92, len: 8 },
    { angle: 128, len: 10.5 },
    { angle: 160, len: 7 },
    { angle: 198, len: 9 },
    { angle: 240, len: 8.5 },
  ]

  return (
    <g>
      <circle cx={cx} cy={cy} r="2" fill="hsl(0 0% 100%)" opacity="0.9" />
      {rays.map((ray, i) => {
        const rad = (ray.angle * Math.PI) / 180
        const x2 = cx + Math.cos(rad) * ray.len
        const y2 = cy + Math.sin(rad) * ray.len
        return (
          <line
            key={i}
            x1={cx + Math.cos(rad) * 2.5}
            y1={cy + Math.sin(rad) * 2.5}
            x2={x2}
            y2={y2}
            stroke={colors[i]}
            strokeWidth={1.3 + (i % 3) * 0.3}
            strokeLinecap="round"
          />
        )
      })}
    </g>
  )
}

const BLUE = "hsl(220 70% 60%)"

/* Each pose is a set of hand-drawn-feeling SVG paths in ~80×120 viewBox */
function DancingPose() {
  return (
    <>
      {/* Head */}
      <circle cx="40" cy="18" r="7" fill="none" stroke={BLUE} strokeWidth="2.2" />
      {/* Body — slight S-curve */}
      <path d="M40 25 C 39 40, 42 55, 38 68" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
      {/* Left arm — raised up */}
      <path d="M39 36 C 28 28, 18 24, 14 18" fill="none" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" />
      {/* Right arm — out to side */}
      <path d="M41 38 C 52 32, 60 35, 67 30" fill="none" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" />
      {/* Left leg — kicked out */}
      <path d="M38 68 C 32 80, 24 92, 18 105" fill="none" stroke={BLUE} strokeWidth="2.3" strokeLinecap="round" />
      {/* Right leg — planted */}
      <path d="M38 68 C 44 82, 50 94, 55 108" fill="none" stroke={BLUE} strokeWidth="2.3" strokeLinecap="round" />
      <Starburst cx={40} cy={46} />
    </>
  )
}

function ReachingPose() {
  return (
    <>
      <circle cx="40" cy="16" r="7" fill="none" stroke={BLUE} strokeWidth="2.2" />
      {/* Body — leaning slightly right */}
      <path d="M40 23 C 42 38, 43 52, 41 66" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
      {/* Both arms reaching up-right */}
      <path d="M41 34 C 50 22, 58 14, 68 8" fill="none" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M42 38 C 52 30, 60 26, 72 22" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
      {/* Left leg — back */}
      <path d="M41 66 C 34 78, 28 90, 22 104" fill="none" stroke={BLUE} strokeWidth="2.3" strokeLinecap="round" />
      {/* Right leg — forward */}
      <path d="M41 66 C 46 80, 52 92, 56 106" fill="none" stroke={BLUE} strokeWidth="2.3" strokeLinecap="round" />
      <Starburst cx={42} cy={44} />
    </>
  )
}

function HoldingPose() {
  return (
    <>
      <circle cx="40" cy="18" r="7" fill="none" stroke={BLUE} strokeWidth="2.2" />
      {/* Body — upright */}
      <path d="M40 25 C 40 40, 39 54, 40 68" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms curved inward — cradling */}
      <path d="M40 35 C 30 38, 24 44, 28 52" fill="none" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M40 35 C 50 38, 56 44, 52 52" fill="none" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" />
      {/* Legs — slight stance */}
      <path d="M40 68 C 36 80, 30 92, 26 106" fill="none" stroke={BLUE} strokeWidth="2.3" strokeLinecap="round" />
      <path d="M40 68 C 44 80, 50 92, 54 106" fill="none" stroke={BLUE} strokeWidth="2.3" strokeLinecap="round" />
      <Starburst cx={40} cy={45} />
    </>
  )
}

function SittingPose() {
  return (
    <>
      <circle cx="38" cy="16" r="7" fill="none" stroke={BLUE} strokeWidth="2.2" />
      {/* Body — shorter, seated */}
      <path d="M38 23 C 39 36, 38 48, 38 58" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
      {/* Left arm — resting on knee */}
      <path d="M38 34 C 28 38, 22 46, 20 54" fill="none" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" />
      {/* Right arm — waving up */}
      <path d="M38 36 C 48 28, 56 22, 64 16" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
      {/* Legs — folded/seated */}
      <path d="M38 58 C 30 64, 22 68, 16 74" fill="none" stroke={BLUE} strokeWidth="2.3" strokeLinecap="round" />
      <path d="M38 58 C 46 62, 54 64, 60 60" fill="none" stroke={BLUE} strokeWidth="2.3" strokeLinecap="round" />
      {/* Ground hint */}
      <path d="M10 78 C 30 76, 55 76, 72 78" fill="none" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <Starburst cx={38} cy={43} />
    </>
  )
}

const poses: Record<Pose, () => React.JSX.Element> = {
  dancing: DancingPose,
  reaching: ReachingPose,
  holding: HoldingPose,
  sitting: SittingPose,
}

export function StarFigure({
  pose = "dancing",
  size = 80,
  className,
  style,
}: StarFigureProps) {
  const PoseComponent = poses[pose]
  const aspect = 120 / 80 // viewBox height / width
  return (
    <svg
      width={size}
      height={size * aspect}
      viewBox="0 0 80 120"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <PoseComponent />
    </svg>
  )
}
