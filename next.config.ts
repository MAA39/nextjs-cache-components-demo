import type { NextConfig } from 'next'

/**
 * Next.js 16 の Cache Components（PPR を実装した仕組み）を有効化する設定。
 * 
 * cacheComponents: true にすることで:
 * - すべてのルートが「動的」がデフォルトになる
 * - Suspense の外側（静的な部分）が「部分的にプリレンダリング」される（PPR）
 * - use cache でキャッシュ対象を細かく指定できる
 */
const nextConfig: NextConfig = {
  cacheComponents: true,
}

export default nextConfig
