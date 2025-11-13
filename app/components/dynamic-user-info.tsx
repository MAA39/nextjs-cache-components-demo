import { cookies } from 'next/headers'

/**
 * 動的なユーザー情報コンポーネント。
 * 
 * 【PPR のポイント】
 * - cookies() を使って「ログインユーザー情報」を取得している
 * - これは runtime data なので、PPR の「静的シェル」には含められない
 * - Suspense で囲むことで、この部分だけ後からストリーミングされる
 * 
 * 【重要】
 * - このコンポーネントに 'use cache' を付けてはいけない
 * - ユーザーごとに結果が違うので、キャッシュすると第三者に漏洩する危険がある
 */
export async function DynamicUserInfo() {
  // 🔐 runtime data: cookies からセッション情報を取得
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('demo-session')?.value

  // シミュレーション: データ取得に少し時間がかかる
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // セッションがない場合
  if (!sessionCookie) {
    return (
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '1rem',
        backgroundColor: '#fff3cd'
      }}>
        <p style={{ margin: 0 }}>
          ⚠️ ログインしていません。
          <br />
          <small style={{ color: '#666' }}>
            （実際のアプリでは認証フローに誘導します）
          </small>
        </p>
      </div>
    )
  }

  // ダミー: セッションから取得したユーザー情報
  const user = {
    id: sessionCookie,
    name: 'まさかずさん',
    email: 'masakazu@example.com',
    loginAt: new Date().toLocaleString('ja-JP'),
  }

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '1rem',
      backgroundColor: '#d4edda'
    }}>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
        ✅ ログイン中
      </h3>
      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        margin: 0,
        fontSize: '0.875rem',
        lineHeight: 1.6
      }}>
        <li><strong>名前:</strong> {user.name}</li>
        <li><strong>メール:</strong> {user.email}</li>
        <li><strong>セッションID:</strong> {user.id}</li>
        <li><strong>表示時刻:</strong> {user.loginAt}</li>
      </ul>
    </div>
  )
}

/**
 * Suspense の fallback 用 Skeleton コンポーネント。
 * 
 * PPR では、動的部分がロード中の間、この Skeleton が表示される。
 */
export function UserInfoSkeleton() {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '1rem',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ 
        height: '1rem', 
        width: '50%', 
        backgroundColor: '#dee2e6', 
        borderRadius: '4px',
        marginBottom: '0.5rem'
      }} />
      <div style={{ 
        height: '0.75rem', 
        width: '80%', 
        backgroundColor: '#dee2e6', 
        borderRadius: '4px',
        marginBottom: '0.5rem'
      }} />
      <div style={{ 
        height: '0.75rem', 
        width: '70%', 
        backgroundColor: '#dee2e6', 
        borderRadius: '4px'
      }} />
    </div>
  )
}
