"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

import type { Language } from "@/lib/i18n"

const STORAGE_KEY = "alau:lang"

type LanguageContextValue = {
  lang: Language
  setLang: (value: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function applyLangToDocument(lang: Language) {
  document.documentElement.lang = lang
  document.documentElement.setAttribute("data-lang", lang)
}

export function LanguageProvider({
  children,
  defaultLang = "ru",
}: {
  children: React.ReactNode
  defaultLang?: Language
}) {
  const [lang, setLangState] = useState<Language>(defaultLang)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "ru" || stored === "kk") {
        setLangState(stored)
        applyLangToDocument(stored)
        return
      }
    } catch {
      // ignore storage errors
    }
    applyLangToDocument(defaultLang)
  }, [defaultLang])

  const setLang = (value: Language) => {
    setLangState(value)
    applyLangToDocument(value)
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // ignore storage errors
    }
  }

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return ctx
}
