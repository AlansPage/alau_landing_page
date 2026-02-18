"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"

import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

type MagnifierContextValue = {
  enabled: boolean
  toggle: () => void
  setToggleButtonEl: (el: HTMLButtonElement | null) => void
}

const MagnifierContext = createContext<MagnifierContextValue | null>(null)

function isTouchOnlyDevice() {
  if (typeof window === "undefined") return false
  return !window.matchMedia("(any-pointer: fine)").matches
}

export function MagnifierProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage()
  const [enabled, setEnabledState] = useState(false)
  const [touchUnsupported, setTouchUnsupported] = useState(false)
  const [hintVisible, setHintVisible] = useState(false)
  const hintTimeoutRef = useRef<number | null>(null)
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null)
  const lensRef = useRef<HTMLDivElement | null>(null)
  const lensContentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setTouchUnsupported(isTouchOnlyDevice())
  }, [])

  useEffect(() => {
    if (hintTimeoutRef.current) {
      window.clearTimeout(hintTimeoutRef.current)
      hintTimeoutRef.current = null
    }
    if (!enabled) {
      setHintVisible(false)
      return
    }
    setHintVisible(true)
    hintTimeoutRef.current = window.setTimeout(() => {
      setHintVisible(false)
      hintTimeoutRef.current = null
    }, 2000)
  }, [enabled])

  const toggle = useCallback(() => {
    setEnabledState((prev) => {
      const next = !prev
      if (next && touchUnsupported) {
        setHintVisible(true)
        if (hintTimeoutRef.current) window.clearTimeout(hintTimeoutRef.current)
        hintTimeoutRef.current = window.setTimeout(() => {
          setHintVisible(false)
          hintTimeoutRef.current = null
        }, 2000)
        return prev
      }
      return next
    })
  }, [touchUnsupported])

  const setToggleButtonEl = (el: HTMLButtonElement | null) => {
    toggleButtonRef.current = el
  }
  useEffect(() => {
    const lens = lensRef.current
    const content = lensContentRef.current
    if (!lens || !content) return

    if (!enabled || touchUnsupported) {
      lens.style.setProperty("--lens-visible", "0")
      document.documentElement.classList.remove("lens-mode")
      return
    }

    document.documentElement.classList.add("lens-mode")
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const scale = 1.4
    const radius = 90
    const edgePad = 8
    const keyboardStep = 18
    let raf = 0
    let alive = true
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { x: pointer.x, y: pointer.y }
    let activeEl: HTMLElement | null = null

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
    const targetSelector =
      "main h1, main h2, main h3, main p, main li, main a, footer h2, footer p, footer address, footer a"
    const getTargetAtPoint = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y)
      return el?.closest(targetSelector) as HTMLElement | null
    }

    const parseRgb = (color: string) => {
      const match = color.match(/rgba?\(([^)]+)\)/i)
      if (!match) return null
      const parts = match[1].split(",").map((v) => Number.parseFloat(v.trim()))
      if (parts.length < 3) return null
      return { r: parts[0], g: parts[1], b: parts[2] }
    }
    const luminance = (r: number, g: number, b: number) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

    const hideLens = () => {
      activeEl = null
      lens.style.setProperty("--lens-visible", "0")
    }

    const syncFromTarget = (target: HTMLElement) => {
      const text = (target.innerText || target.textContent || "").replace(/\s+/g, " ").trim()
      if (!text) {
        hideLens()
        return false
      }
      const style = window.getComputedStyle(target)
      content.textContent = text
      content.style.fontFamily = style.fontFamily
      content.style.fontWeight = style.fontWeight
      content.style.fontSize = style.fontSize
      content.style.letterSpacing = style.letterSpacing
      content.style.lineHeight = style.lineHeight
      content.style.textTransform = style.textTransform
      content.style.fontStyle = style.fontStyle
      content.style.textDecoration = style.textDecoration
      content.style.whiteSpace = "pre-wrap"
      content.style.wordBreak = "break-word"

      const rgb = parseRgb(style.color)
      const isLight = rgb ? luminance(rgb.r, rgb.g, rgb.b) > 0.72 : false
      content.style.color = style.color
      content.style.webkitTextFillColor = "currentColor"
      if (isLight) {
        lens.style.background = "hsl(var(--foreground) / 0.96)"
        lens.style.borderColor = "hsl(var(--background) / 0.45)"
        content.style.textShadow = "0 1px 3px rgba(0, 0, 0, 0.45)"
      } else {
        lens.style.background = "hsl(var(--background))"
        lens.style.borderColor = "hsl(var(--primary) / 0.65)"
        content.style.textShadow = "none"
      }
      activeEl = target
      return true
    }

    const positionLens = (clientX: number, clientY: number) => {
      if (!activeEl) return
      const rect = activeEl.getBoundingClientRect()
      const localX = clientX - rect.left
      const localY = clientY - rect.top
      content.style.width = `${Math.ceil(Math.max(rect.width, 140))}px`
      content.style.minHeight = `${Math.ceil(Math.max(rect.height, 24))}px`
      content.style.transform = `translate(${radius - localX * scale}px, ${radius - localY * scale}px) scale(${scale})`
      content.style.transformOrigin = "0 0"
      lens.style.setProperty("--lens-visible", "1")
    }

    const render = () => {
      if (!alive) return
      if (reduceMotion) {
        current.x = pointer.x
        current.y = pointer.y
      } else {
        current.x += (pointer.x - current.x) * 0.24
        current.y += (pointer.y - current.y) * 0.24
      }
      lens.style.setProperty("--lens-left", `${current.x - radius}px`)
      lens.style.setProperty("--lens-top", `${current.y - radius}px`)
      raf = window.requestAnimationFrame(render)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        hideLens()
        return
      }
      pointer.x = clamp(event.clientX, radius + edgePad, window.innerWidth - radius - edgePad)
      pointer.y = clamp(event.clientY, radius + edgePad, window.innerHeight - radius - edgePad)
      const target = getTargetAtPoint(event.clientX, event.clientY)
      if (!target) {
        hideLens()
        return
      }
      if (activeEl !== target) {
        const ok = syncFromTarget(target)
        if (!ok) return
      }
      positionLens(event.clientX, event.clientY)
    }

    const onPointerLeave = () => hideLens()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEnabledState(false)
        toggleButtonRef.current?.focus()
        return
      }
      if (
        event.key !== "ArrowUp" &&
        event.key !== "ArrowDown" &&
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowRight"
      ) {
        return
      }
      event.preventDefault()
      if (!activeEl) {
        const fallback = document.querySelector("main h1, main h2, main p") as HTMLElement | null
        if (!fallback || !syncFromTarget(fallback)) return
        const rect = fallback.getBoundingClientRect()
        pointer.x = clamp(rect.left + rect.width / 2, radius + edgePad, window.innerWidth - radius - edgePad)
        pointer.y = clamp(rect.top + rect.height / 2, radius + edgePad, window.innerHeight - radius - edgePad)
      }
      if (event.key === "ArrowUp") pointer.y = clamp(pointer.y - keyboardStep, radius + edgePad, window.innerHeight - radius - edgePad)
      if (event.key === "ArrowDown") pointer.y = clamp(pointer.y + keyboardStep, radius + edgePad, window.innerHeight - radius - edgePad)
      if (event.key === "ArrowLeft") pointer.x = clamp(pointer.x - keyboardStep, radius + edgePad, window.innerWidth - radius - edgePad)
      if (event.key === "ArrowRight") pointer.x = clamp(pointer.x + keyboardStep, radius + edgePad, window.innerWidth - radius - edgePad)
      positionLens(pointer.x, pointer.y)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerleave", onPointerLeave)
    window.addEventListener("pointercancel", onPointerLeave)
    window.addEventListener("keydown", onKeyDown)
    raf = window.requestAnimationFrame(render)

    return () => {
      alive = false
      window.cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
      window.removeEventListener("pointercancel", onPointerLeave)
      window.removeEventListener("keydown", onKeyDown)
      document.documentElement.classList.remove("lens-mode")
      lens.style.setProperty("--lens-visible", "0")
    }
  }, [enabled, touchUnsupported])

  const value = useMemo<MagnifierContextValue>(
    () => ({
      enabled,
      toggle,
      setToggleButtonEl,
    }),
    [enabled, toggle]
  )

  return (
    <MagnifierContext.Provider value={value}>
      {children}
      <div className={`magnifier-hint ${hintVisible ? "is-visible" : ""}`} aria-hidden="true">
        {touchUnsupported && !enabled
          ? "Magnifier works with mouse only"
          : getI18n(lang).header.magnifierHint}
      </div>
      <div ref={lensRef} className="magnifier-lens" aria-hidden="true">
        <div ref={lensContentRef} className="magnifier-lens-content" />
      </div>
    </MagnifierContext.Provider>
  )
}

export function useMagnifier() {
  const ctx = useContext(MagnifierContext)
  if (!ctx) {
    throw new Error("useMagnifier must be used within MagnifierProvider")
  }
  return ctx
}
