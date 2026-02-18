import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})
import { LanguageProvider } from "@/components/language-provider"
import { MagnifierProvider } from "@/components/magnifier-provider"

export const metadata: Metadata = {
  title: 'ALAU — Твой потенциал ярче, чем ты думаешь',
  description:
    'Платформа для обучения и работы, где тебя понимают. Доступно для людей с инвалидностью.',
  openGraph: {
    title: 'ALAU — Твой потенциал ярче, чем ты думаешь',
    description:
      'Платформа для обучения и работы, где тебя понимают. Доступно для людей с инвалидностью.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ALAU',
    images: [{ url: '/brand/alau-wordmark.png', width: 640, height: 160 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALAU — Твой потенциал ярче, чем ты думаешь',
    description:
      'Платформа для обучения и работы, где тебя понимают. Доступно для людей с инвалидностью.',
  },
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
      <body className="font-sans antialiased">
        <div className="relative isolate min-h-screen overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/sparkles.jpg')] bg-cover bg-center bg-no-repeat mix-blend-screen opacity-[0.14] md:opacity-[0.18]"
            style={{
              WebkitMaskImage:
                "radial-gradient(130% 105% at 50% 24%, transparent 0%, rgba(0,0,0,0.10) 26%, black 56%, black 100%)",
              maskImage:
                "radial-gradient(130% 105% at 50% 24%, transparent 0%, rgba(0,0,0,0.10) 26%, black 56%, black 100%)",
            }}
          />
          <div className="relative z-10">
            <LanguageProvider>
              <MagnifierProvider>{children}</MagnifierProvider>
            </LanguageProvider>
          </div>
        </div>
      </body>
    </html>
  )
}
