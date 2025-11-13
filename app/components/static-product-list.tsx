/**
 * 静的な商品リストコンポーネント。
 * 
 * 【PPR のポイント】
 * - このコンポーネントは runtime data（cookies, headers など）を使わない
 * - 誰が見ても同じ内容なので「静的シェル」として PPR される
 * - use cache を明示的に付けることで、キャッシュ対象であることを明確化できる
 */

interface Product {
  id: number
  name: string
  price: number
}

/**
 * 商品データを取得する関数（静的データ）。
 * 
 * 実際のアプリでは CMS や DB から取得するが、
 * ここでは「公開データ」として固定値を返す想定。
 */
async function getProducts(): Promise<Product[]> {
  'use cache' // ← この関数の結果をキャッシュして PPR に含める

  // シミュレーション: 少し遅延を入れる
  await new Promise((resolve) => setTimeout(resolve, 100))

  return [
    { id: 1, name: 'Next.js 入門書', price: 3000 },
    { id: 2, name: 'React ハンドブック', price: 2500 },
    { id: 3, name: 'TypeScript 完全ガイド', price: 3500 },
  ]
}

/**
 * 商品リストを表示するコンポーネント。
 */
export async function StaticProductList() {
  const products = await getProducts()

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '1rem' 
    }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem 0',
              borderBottom: '1px solid #eee',
            }}
          >
            <span>{product.name}</span>
            <span style={{ fontWeight: 'bold' }}>¥{product.price.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
