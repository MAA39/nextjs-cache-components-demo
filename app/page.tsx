import { Suspense } from 'react'
import { DynamicUserInfo, UserInfoSkeleton } from './components/dynamic-user-info'
import { StaticProductList } from './components/static-product-list'

/**
 * トップページ。
 * 
 * PPR (Partial Pre-rendering) のデモとして:
 * - 静的な商品リスト部分 → PPR される（事前レンダリング）
 * - 動的なユーザー情報部分 → Suspense で囲んで後からストリーミング
 * 
 * この構成により、ページを開いた瞬間に「静的シェル」が表示され、
 * ユーザー固有データは後から流れ込む。
 */
export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 静的部分: PPR される */}
      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          📦 商品一覧（静的データ - PPR対象）
        </h2>
        <StaticProductList />
      </section>

      {/* 動的部分: Suspense で囲んで後から取得 */}
      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          👤 ユーザー情報（動的データ - Suspense + Streaming）
        </h2>
        <Suspense fallback={<UserInfoSkeleton />}>
          <DynamicUserInfo />
        </Suspense>
      </section>

      {/* 説明セクション（静的） */}
      <section style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '8px' 
      }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
          💡 このページの構造
        </h3>
        <ul style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
          <li>商品一覧は「静的データ」なので PPR され、即座に表示される</li>
          <li>ユーザー情報は「cookies() を使った動的データ」なので Suspense 内で後から取得される</li>
          <li>ページを開くと、静的部分 + Skeleton が先に見え、その後ユーザー情報が流れ込む</li>
        </ul>
      </section>
    </div>
  )
}
