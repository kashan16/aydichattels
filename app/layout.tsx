// FIX: import globals.css — without this Tailwind utility classes (bg-[…],
// pt-28, flex, etc.) are never injected into the page, making every section
// appear unstyled and the background fall through to the browser default (dark).
import '@/app/globals.css'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Aydi Chattels by Jashifa — Artisan Home Goods',
  description:
    'Curated beddings, home décor, candles, and crockery for homes that value warmth, craft, and character.',
  keywords: ['home decor', 'beddings', 'candles', 'crockery', 'artisan', 'handcrafted'],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — Cormorant Garamond (display) + Jost (body) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}