"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

const STORAGE_KEY = "alau:textScale"

const SCALE_LEVELS = [1, 1.15, 1.3] as const
type ScaleLevel = (typeof SCALE_LEVELS)[number]

type TextScaleContextValue = {
  scale: ScaleLevel
  setScale: (value: ScaleLevel) => void
  cycleScale: () => void
}

const TextScaleContext = createContext<TextScaleContextValue | null>(null)

function applyScaleToDocument(scale: ScaleLevel) {
  // This variable is used in app/globals.css to scale the root font size.
  document.documentElement.style.setProperty("--font-scale", String(scale))
  document.documentElement.setAttribute("data-font-scale", String(scale))
}

export function TextScaleProvider({
  children,
  defaultScale = 1,
}: {
  children: React.ReactNode
  defaultScale?: ScaleLevel
}) {
  const [scale, setScaleState] = useState<ScaleLevel>(defaultScale)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = Number(stored)
        const matched = SCALE_LEVELS.find((v) => v === parsed)
        if (matched) {
          setScaleState(matched)
          applyScaleToDocument(matched)
          return
        }
      }
    } catch {
      // ignore storage errors
    }
    applyScaleToDocument(defaultScale)
  }, [defaultScale])

  const setScale = (value: ScaleLevel) => {
    setScaleState(value)
    applyScaleToDocument(value)
    try {
      window.localStorage.setItem(STORAGE_KEY, String(value))
    } catch {
      // ignore storage errors
    }
  }

  const cycleScale = () => {
    const idx = SCALE_LEVELS.indexOf(scale)
    const next = SCALE_LEVELS[(idx + 1) % SCALE_LEVELS.length]
    setScale(next)
  }

  const value = useMemo<TextScaleContextValue>(
    () => ({
      scale,
      setScale,
      cycleScale,
    }),
    [scale]
  )

  return <TextScaleContext.Provider value={value}>{children}</TextScaleContext.Provider>
}

export function useTextScale() {
  const ctx = useContext(TextScaleContext)
  if (!ctx) {
    throw new Error("useTextScale must be used within TextScaleProvider")
  }
  return ctx
}
