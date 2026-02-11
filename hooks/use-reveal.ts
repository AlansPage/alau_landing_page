import { useEffect } from "react"

export function useReveal(elementsSelector: string) {
  useEffect(() => {
    if (typeof window === "undefined") return
    document.documentElement.setAttribute("data-reveal-ready", "true")

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) {
      document.querySelectorAll(elementsSelector).forEach((el) => {
        el.classList.add("is-visible")
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    )

    const elements = Array.from(document.querySelectorAll(elementsSelector))
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add("is-visible")
      }
    })
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [elementsSelector])
}
