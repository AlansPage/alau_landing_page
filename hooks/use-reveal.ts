import { useEffect } from "react"

export function useReveal(elementsSelector: string) {
  useEffect(() => {
    if (typeof window === "undefined") return
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
      { threshold: 0.2 }
    )

    const elements = Array.from(document.querySelectorAll(elementsSelector))
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [elementsSelector])
}
