import { MapPin } from "lucide-react"
import { LINKS } from "@/lib/site-config"

export function NavigatorSection() {
  return (
    <section
      aria-labelledby="navigator-heading"
      className="px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden flex flex-col items-center gap-10 rounded-[2rem] border border-border/50 bg-card px-8 py-14 shadow-xl shadow-background/50 md:flex-row md:items-center md:justify-between md:px-16 md:py-16">
          {/* Decorative map-ish illustration (purely decorative) */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block" aria-hidden="true">
            <svg viewBox="0 0 520 320" className="h-full w-full">
              <defs>
                <linearGradient id="navg" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="hsl(212 100% 47% / 0.18)" />
                  <stop offset="1" stopColor="hsl(200 100% 44% / 0.06)" />
                </linearGradient>
              </defs>
              <rect width="520" height="320" fill="url(#navg)" />
              <path d="M40 240 C 160 120, 260 340, 380 180 S 520 120, 560 40" fill="none" stroke="hsl(200 100% 44% / 0.22)" strokeWidth="10" strokeLinecap="round" />
              <path d="M30 190 C 170 80, 270 260, 410 120 S 520 70, 560 10" fill="none" stroke="hsl(212 100% 47% / 0.22)" strokeWidth="6" strokeLinecap="round" />
              <circle cx="180" cy="150" r="10" fill="hsl(212 100% 47% / 0.55)" />
              <circle cx="320" cy="170" r="8" fill="hsl(200 100% 44% / 0.45)" />
              <circle cx="410" cy="120" r="7" fill="hsl(212 100% 47% / 0.35)" />
            </svg>
          </div>
          {/* Left: text content */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
              <MapPin
                className="h-7 w-7 text-accent"
                aria-hidden="true"
              />
            </div>
            <h2
              id="navigator-heading"
              className="mt-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              {"Навигатор"}
            </h2>
            <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              {"Ищете вакансии, пособия или центры помощи?"}
            </p>
          </div>

          {/* Right: CTA button */}
          <a
            href={LINKS.knowledgeBase}
            className="inline-flex min-h-[56px] shrink-0 items-center gap-3 rounded-2xl border-2 border-accent/60 bg-accent/10 px-8 py-4 text-base font-semibold text-accent transition-all hover:bg-accent/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:text-lg"
            aria-label="Смотреть карту доступности — навигатор ресурсов"
          >
            <MapPin className="h-5 w-5" aria-hidden="true" />
            {"Смотреть карту доступности"}
          </a>
        </div>
      </div>
    </section>
  )
}
