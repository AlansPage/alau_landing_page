"use client"

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"

import { getI18n } from "@/lib/i18n"
import { useLanguage } from "@/components/language-provider"

type MagnifierContextValue = {
  enabled: boolean
  toggle: () => void
}

const MagnifierContext = createContext<MagnifierContextValue | null>(null)

type LensState = {
  visible: boolean
  text: string
  x: number
  y: number
}

const SNIPPET_MIN = 80
const SNIPPET_MAX = 140
const LENS_OFFSET = 18

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function expandToWordBoundaries(text: string, start: number, end: number) {
  const isBoundary = (ch: string) => ch === " " || ch === "\n" || ch === "\t"
  let s = start
  let e = end
  while (s > 0 && !isBoundary(text[s - 1])) s -= 1
  while (e < text.length && !isBoundary(text[e])) e += 1
  return { start: s, end: e }
}

function extractSnippet(text: string, offset: number) {
  const safeText = text.replace(/\s+/g, " ").trim()
  if (!safeText) return ""
  const clampedOffset = clamp(offset, 0, safeText.length)
  let start = Math.max(0, clampedOffset - Math.floor(SNIPPET_MIN / 2))
  let end = Math.min(safeText.length, start + SNIPPET_MAX)
  if (end - start < SNIPPET_MIN) {
    start = Math.max(0, end - SNIPPET_MIN)
  }
  const bounds = expandToWordBoundaries(safeText, start, end)
  return safeText.slice(bounds.start, bounds.end)
}

function getCaretResult(x: number, y: number) {
  if (typeof document.caretPositionFromPoint === "function") {
    const pos = document.caretPositionFromPoint(x, y)
    if (pos && pos.offsetNode && pos.offsetNode.nodeType === Node.TEXT_NODE) {
      return { node: pos.offsetNode as Text, offset: pos.offset }
    }
  }
  const rangeFromPoint = (document as Document & {
    caretRangeFromPoint?: (x: number, y: number) => Range | null
  }).caretRangeFromPoint
  if (typeof rangeFromPoint === "function") {
    const range = rangeFromPoint(x, y)
    if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
      return { node: range.startContainer as Text, offset: range.startOffset }
    }
  }
  return null
}

function getPointerLensPosition(x: number, y: number, lensWidth: number, lensHeight: number) {
  const padding = 12
  const maxX = window.innerWidth - lensWidth - padding
  const maxY = window.innerHeight - lensHeight - padding
  let nextX = x + LENS_OFFSET
  let nextY = y + LENS_OFFSET
  if (nextX > maxX) nextX = x - lensWidth - LENS_OFFSET
  if (nextY > maxY) nextY = y - lensHeight - LENS_OFFSET
  nextX = clamp(nextX, padding, maxX)
  nextY = clamp(nextY, padding, maxY)
  return { x: nextX, y: nextY }
}

export function MagnifierProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage()
  const [enabled, setEnabled] = useState(false)
  const [lens, setLens] = useState<LensState>({ visible: false, text: "", x: 0, y: 0 })
  const [hintVisible, setHintVisible] = useState(false)
  const hintTimeoutRef = useRef<number | null>(null)
  const lensRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled) {
      setLens((prev) => ({ ...prev, visible: false }))
      setHintVisible(false)
      if (hintTimeoutRef.current) {
        window.clearTimeout(hintTimeoutRef.current)
        hintTimeoutRef.current = null
      }
      return
    }
    setHintVisible(true)
    hintTimeoutRef.current = window.setTimeout(() => {
      setHintVisible(false)
      hintTimeoutRef.current = null
    }, 2000)
  }, [enabled])

  useEffect(() => {
    if (!enabled) return
    const handler = (event: PointerEvent) => {
      const { clientX, clientY } = event
      const caret = getCaretResult(clientX, clientY)
      if (!caret) {
        setLens((prev) => ({ ...prev, visible: false }))
        return
      }
      const text = caret.node.textContent ?? ""
      const snippet = extractSnippet(text, caret.offset)
      if (!snippet) {
        setLens((prev) => ({ ...prev, visible: false }))
        return
      }
      const lensRect = lensRef.current?.getBoundingClientRect()
      const lensWidth = lensRect?.width ?? 320
      const lensHeight = lensRect?.height ?? 120
      const pos = getPointerLensPosition(clientX, clientY, lensWidth, lensHeight)
      setLens({ visible: true, text: snippet, x: pos.x, y: pos.y })
    }

    window.addEventListener("pointermove", handler)
    return () => {
      window.removeEventListener("pointermove", handler)
    }
  }, [enabled])

  const toggle = () => setEnabled((prev) => !prev)

  const value = useMemo<MagnifierContextValue>(
    () => ({
      enabled,
      toggle,
    }),
    [enabled]
  )

  return (
    <MagnifierContext.Provider value={value}>
      {children}
      <div
        className={`magnifier-hint ${hintVisible ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        {getI18n(lang).header.magnifierHint}
      </div>
      <div
        ref={lensRef}
        className={`magnifier-lens ${lens.visible ? "is-visible" : ""}`}
        style={{ transform: `translate3d(${lens.x}px, ${lens.y}px, 0)` }}
        aria-hidden="true"
      >
        {lens.text}
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
