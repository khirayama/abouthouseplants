## 方針とTODO

### マーケティング

- SEO
  - コンテンツ
    - title / description / keywordsを設定
    - keywordsは3つ
    - ライティング前にkeywordsを先に設定し、それを軸に書く
  - 構造化データ
    - json+ldを使用し、microdataは使用しない
    - json+ldでは、breadcrumbをサポートする
  - サイトマップとrobots.tx
    - xml形式を使用
    - lastmodは必須
    - robots.txtにSitemapフィールド必須
    - 更新時はpingを送信する

- Refs
  - [構造化データに関するガイドラインに準拠する  |  Google 検索デベロッパー ガイド  |  Google Developers](https://developers.google.com/search/docs/guides/sd-policies)
  - [サイトマップの作成と送信 - Search Console ヘルプ](https://support.google.com/webmasters/answer/183668)

- TODO
  - [ ] title / description / keywordsを設定し直す
  - [ ] json+ldを追加
  - [ ] sitemapにlastmodを追加
  - [ ] robots.txtを作成
  - [ ] robots.txtにSitemapフィールドを含む
  - [ ] googleへのpingをgithub actionsに追加
  - [ ] json+ldでサポートする内容を精査する
  - [x] パンくず追加
  - [x] 日付の追加
  - [x] sitemap作成
  - [x] GAとSearch console連携
  - [x] GA埋め込み

### クリエイティブ

- TODO
  - [ ] favicon作成
  - [ ] thumnailの作成
  - [ ] 画像の縦横比固定
  - [ ] アクセシビリティの修正
  - [x] Markdownのスタイル
  - [x] Markdownにanchorリンク
  - [x] `materials` ディレクトリ作成
  - [x] `assets` utilsを作成

### エンジニアリング

- AMP
  - nextjsによるAMPサポートをできる限り利用する
  - typescriptを推奨
  - styled-jsxを利用
  - buildの複雑化は避ける
  - 可能な限りリーズナブルなアプローチを選ぶ

- TODO
  - [ ] thumnailフィールドを追加
  - [x] resource.findをリデザイン
  - [x] notesからmemosに変更
  - [x] assetsのpathを自動で回すように
  - [x] exportのpathを自動で回すように
