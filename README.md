# Next.js 16 Cache Components / PPR Demo

Next.js 16 の **Cache Components** と **PPR (Partial Pre-rendering)** のデモリポジトリです。

## 📌 このプロジェクトについて

Next.js 16 で導入された Cache Components の仕組みを実際に動かして確認するためのデモアプリです。

### 主な特徴

- ✅ **PPR (Partial Pre-rendering) を有効化**
  - `next.config.ts` で `cacheComponents: true` を設定
- ✅ **静的部分と動的部分の分離**
  - 商品リスト: `use cache` でキャッシュ → PPR される静的シェル
  - ユーザー情報: `cookies()` を使った runtime data → Suspense でストリーミング
- ✅ **Suspense による段階的レンダリング**
  - ページを開くと静的シェル + Skeleton が即座に表示され、動的データは後から流れ込む

## 🚀 セットアップ

### 1. リポジトリのクローン

\`\`\`bash
git clone https://github.com/MAA39/nextjs-cache-components-demo.git
cd nextjs-cache-components-demo
\`\`\`

### 2. 依存関係のインストール

\`\`\`bash
pnpm install
\`\`\`

### 3. 開発サーバーの起動

\`\`\`bash
pnpm dev
\`\`\`

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 📂 ファイル構成

\`\`\`
nextjs-cache-components-demo/
├── app/
│   ├── components/
│   │   ├── static-product-list.tsx   # 静的な商品リスト（PPR 対象）
│   │   └── dynamic-user-info.tsx     # 動的なユーザー情報（Suspense）
│   ├── layout.tsx                    # ルートレイアウト
│   └── page.tsx                      # トップページ
├── next.config.ts                    # cacheComponents: true を設定
├── package.json
├── tsconfig.json
└── README.md
\`\`\`

## 🔍 PPR の動作確認方法

### 1. 静的シェルの確認

ページを開いた瞬間、以下が即座に表示されます:

- ヘッダー
- 商品リスト（静的データ）
- ユーザー情報の Skeleton（読み込み中UI）

### 2. 動的データのストリーミング

約1秒後、ユーザー情報の Skeleton が実際のユーザーデータに置き換わります。

### 3. cookies を使った runtime data の確認

ブラウザの開発者ツールで `demo-session` という Cookie を手動で設定すると、
ユーザー情報セクションの表示内容が変わります:

\`\`\`
Cookie 名: demo-session
Cookie 値: user_12345
\`\`\`

設定後、ページをリロードすると「ログイン中」の表示に切り替わります。

## 📖 コードの解説

### `app/components/static-product-list.tsx`

- `use cache` を使って商品データをキャッシュ
- runtime data を使わないので PPR の静的シェルに含まれる
- 誰が見ても同じ内容なので、共有キャッシュに入れても安全

### `app/components/dynamic-user-info.tsx`

- `cookies()` を使って runtime data（セッション情報）を取得
- ユーザーごとに結果が変わるので、PPR 対象外
- `Suspense` で囲むことで、静的シェルとは分離してストリーミングされる

### `app/page.tsx`

- 静的部分（商品リスト）と動的部分（ユーザー情報）を組み合わせ
- `Suspense` の `fallback` で Skeleton UI を指定

## 🧪 検証ポイント

- [ ] ページを開いた瞬間、商品リストが即座に表示されるか？
- [ ] ユーザー情報は Skeleton → 実データの順で表示されるか？
- [ ] Cookie の有無でユーザー情報の表示が変わるか？
- [ ] ネットワークタブで静的シェルとストリーミングの分離を確認できるか？

## 📚 参考資料

- [Next.js 公式ドキュメント: Cache Components](https://nextjs.org/docs/app/getting-started/cache-components)
- [PPR (Partial Pre-rendering) について](https://nextjs.org/docs/app/getting-started/cache-components#how-it-works)

## 📝 ライセンス

MIT
