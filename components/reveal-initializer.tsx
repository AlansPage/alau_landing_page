"use client"

import { useEffect } from "react"

import { useReveal } from "@/hooks/use-reveal"

export function RevealInitializer() {
  useReveal("[data-reveal]")

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const setAttr = () => {
      document.documentElement.setAttribute(
        "data-reduce-motion",
        media.matches ? "true" : "false"
      )
    }
    setAttr()
    media.addEventListener("change", setAttr)
    return () => media.removeEventListener("change", setAttr)
  }, [])

  return null
}
