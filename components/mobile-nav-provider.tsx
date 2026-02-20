"use client"

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react"

type MobileNavContextValue = {
  menuOpen: boolean
  toggleMenu: () => void
  closeMenu: () => void
}

const MobileNavContext = createContext<MobileNavContextValue | null>(null)

export function useMobileNav() {
  const ctx = useContext(MobileNavContext)
  if (!ctx) {
    throw new Error("useMobileNav must be used within a MobileNavProvider")
  }
  return ctx
}

export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  return (
    <MobileNavContext.Provider value={{ menuOpen, toggleMenu, closeMenu }}>
      {children}
    </MobileNavContext.Provider>
  )
}
