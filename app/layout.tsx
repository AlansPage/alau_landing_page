import React from "react"
import type { Metadata, Viewport } from 'next'

import './globals.css'
import { LanguageProvider } from "@/components/language-provider"
import { MagnifierProvider } from "@/components/magnifier-provider"

export const metadata: Metadata = {
  title: 'ALAU — Твой потенциал ярче, чем ты думаешь',
  description:
    'Платформа для обучения и работы, где тебя понимают. Доступно для людей с инвалидностью.',
}

export const viewport: Viewport = {
  themeColor: '#1f7aff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className="min-h-screen font-sans antialiased">
        <LanguageProvider>
          <MagnifierProvider>{children}</MagnifierProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
