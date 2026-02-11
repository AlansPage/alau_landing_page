import {
  MessageCircle,
  ClipboardList,
  MonitorPlay,
  Briefcase,
} from "lucide-react"

const steps = [
  {
    number: 1,
    text: "Пройди тест в Telegram.",
    icon: MessageCircle,
  },
  {
    number: 2,
    text: "Получи план обучения.",
    icon: ClipboardList,
  },
  {
    number: 3,
    text: "Учись онлайн.",
    icon: MonitorPlay,
  },
  {
    number: 4,
    text: "Подай уверенно на работу.",
    icon: Briefcase,
  },
] as const

export function HowItWorksSection() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="how-it-works-heading"
          className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
        >
          {"Как это работает?"}
        </h2>

        {/* Soft surface panel for steps (adds detail without adding sections) */}
        <div className="mt-14 rounded-[2.5rem] bg-surface/70 p-6 sm:p-8 lg:p-10">

        {/* Desktop: horizontal steps row */}
        <div className="hidden md:block" aria-label="Шаги">
          <ol className="relative grid grid-cols-4 gap-10">
            {/* Connecting line behind step badges */}
            <div
              className="pointer-events-none absolute left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] top-[28px] h-px bg-border"
              aria-hidden="true"
            />
            {steps.map((step) => (
              <li
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                {/* Big rounded badge */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-card shadow-lg shadow-primary/10">
                  <span className="text-lg font-extrabold text-primary">
                    {step.number}
                  </span>
                </div>

                {/* Step card */}
                <div className="mt-5 w-full rounded-3xl border border-border/50 bg-card px-6 pb-6 pt-7 shadow-sm shadow-background/30">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8">
                    <step.icon
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-4 text-base font-semibold leading-relaxed text-foreground lg:text-lg">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="mt-10 md:hidden" aria-label="Шаги">
          <ol className="relative ml-2 border-l-2 border-border/60 pl-10">
            {steps.map((step) => (
              <li key={step.number} className="relative pb-12 last:pb-0">
                {/* Badge on the line */}
                <div
                  className="absolute -left-[calc(2.5rem+1px)] flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 bg-card shadow-md shadow-primary/10"
                  aria-hidden="true"
                >
                  <span className="text-base font-extrabold text-primary">
                    {step.number}
                  </span>
                </div>
                <div className="pt-1">
                  <div className="rounded-3xl border border-border/50 bg-card px-6 py-5 shadow-sm shadow-background/30">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8">
                      <step.icon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      {step.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        </div>
      </div>
    </section>
  )
}
