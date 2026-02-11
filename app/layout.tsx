import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { TextScaleProvider } from '@/components/text-scale-provider'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

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
    <html lang="ru" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <TextScaleProvider>{children}</TextScaleProvider>
      </body>
    </html>
  )
}
