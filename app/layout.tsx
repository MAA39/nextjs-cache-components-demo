import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js 16 Cache Components Demo',
  description: 'PPR (Partial Pre-rendering) のデモアプリ',
}

/**
 * アプリケーション全体のルートレイアウト。
 * 
 * ここでは runtime data（cookies, headers など）を使わないため、
 * この部分は PPR の「静的シェル」に含めることができる。
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <header style={{ borderBottom: '1px solid #ddd', padding: '1rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
            Next.js 16 Cache Components Demo
          </h1>
        </header>

        <main style={{ padding: '2rem' }}>
          {children}
        </main>

        <footer style={{ borderTop: '1px solid #ddd', padding: '1rem', fontSize: '0.875rem', color: '#666' }}>
          © 2025 PPR Demo
        </footer>
      </body>
    </html>
  )
}
