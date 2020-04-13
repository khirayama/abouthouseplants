## 方針とTODO

### マーケティング

- SEO
  - コンテンツ
    - title / heading を適切に設定し、SEOに貢献する
    - description / keywordsはSEO向けではなく、ユーザ向けに設定する
    - keywordsは3~5に納め、コンテンツはそれに合わせることでフォーカスを絞る
    - keywordsが3~5を超える場合は、記事の分割を検討する
    - ライティング前にkeywordsを先に設定し、それを軸に書く
    - サイト内表示用の値とSEO用の値は別に定義し、同一ファイル内の重複表現を許す
  - 構造化データ
    - json+ldを使用し、microdataは使用しない
    - json+ldでは、breadcrumbをサポートする
    - json+ldでは、articleをサポートする
    - json+ldでは、howtoをサポートする
  - サイトマップとrobots.tx
    - xml形式を使用
    - lastmodは必須
    - robots.txtにSitemapフィールド必須
    - 更新時はpingを送信する(GitHub Actionsで実行する)
- SNS
  - Facebook、Twitter、Instagramをサポートする
  - 適切なOGP画像を利用する

- Refs
  - [構造化データに関するガイドラインに準拠する  |  Google 検索デベロッパー ガイド  |  Google Developers](https://developers.google.com/search/docs/guides/sd-policies)
  - [構造化データ マークアップ支援ツール](https://www.google.com/webmasters/markup-helper/u/0/)
  - [構造化データ テストツール](https://search.google.com/structured-data/testing-tool/u/0/?hl=ja)
  - [パンくずリスト  |  Google 検索デベロッパー ガイド  |  Google Developers](https://developers.google.com/search/docs/data-types/breadcrumb?hl=ja)
  - [ハウツー  |  Google 検索デベロッパー ガイド  |  Google Developers](https://developers.google.com/search/docs/data-types/how-to?hl=ja)
  - [サイトマップの作成と送信 - Search Console ヘルプ](https://support.google.com/webmasters/answer/183668)

- TODO
  - [ ] introductionの内容をブラッシュアップ
  - [ ] json+ldでHowToとArticleのサポート
  - [x] description / keywordsを設定し直す
  - [x] title / headingの見直し
  - [x] json+ldでサポートする内容を精査する
  - [x] json+ldでbreadcrumbを追加
  - [x] robots.txtを作成
  - [x] robots.txtにSitemapフィールドを含む
  - [x] sitemapにlastmodを追加
  - [x] パンくず追加
  - [x] 日付の追加
  - [x] sitemap作成
  - [x] GAとSearch console連携
  - [x] GA埋め込み

### クリエイティブ

- TODO
  - [ ] thumnailの作成
  - [ ] 画像の縦横比固定
  - [ ] アクセシビリティの修正
  - [x] ロゴ / favicon作成
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
- SEO
  - sitemap.xmlとrobots.txtの自動生成は `_document` で行う

- TODO
  - [x] googleへのpingをgithub actionsに追加
  - [x] thumnailフィールドを追加
  - [x] sitemap.xmlを `_document` で生成する
  - [x] resource.findをリデザイン
  - [x] notesからmemosに変更
  - [x] assetsのpathを自動で回すように
  - [x] exportのpathを自動で回すように
