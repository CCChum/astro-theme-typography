# タイポグラフィー

<p align='center'>
  <img src='./public/typograph-og.jpg' alt='Typography' width='600'/>
</p>

<h6 align='center'>
<a href="https://astro-theme-typography.vercel.app/">ライブデモ</a>
</h6>
<h5 align='center'>
<b>このプロジェクトは <a href="https://github.com/sumimakito/hexo-theme-typography">hexo-theme-Typography</a> の書き直しです</b>
</h5>
<p align='center'>
<a href="./README.md">English</a> | <a href="./README.zh-CN.md">简体中文</a> | <b>日本語</b> | <a href="./README.ru.md">Русский</a>
</p>

## このプロジェクトについて

このプロジェクトは、[oesx](https://github.com/oesx)による[astro-theme-typography](https://github.com/oesx/astro-theme-typography)の改良・最適化版です。以下の機能を追加しました：

- セキュアな管理ダッシュボード
- WebAuthn（パスキー）サポート
- 強化された投稿管理
- より良いユーザーエクスペリエンス

## 特徴

- **Astro**、**TypeScript**、**UnoCSS**で構築
- **高速**。[Pagespeed](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop)スコア100%
- **タイポグラフィ**。中国の一般的な印刷規範から派生し、ウェブサイト訪問者により良い読書体験を提供することを目指しています
- **レスポンシブ**。すべての画面サイズで適切に動作
- **アクセシブル**。よく考えられたセマンティックでアクセシブルなコンテンツ
- **SEOフレンドリー**。より良いソーシャルシェアリング体験のためのOpen GraphとTwitterCardsサポート
- 検索エンジン用の**サイトマップ**と**RSSフィード**
- WebAuthn（パスキー）サポートによる**セキュアな管理ダッシュボード**
  - ダッシュボードから直接投稿の作成と編集
  - 管理者認証情報の管理
  - パスキーと従来のユーザー名/パスワード認証の両方をサポート
- 多言語サポート
- Disqus、Giscus、Twikooをコメントサービスとしてサポート
- ダークモードサポート

## デモ

> PRを提出してあなたのブログデモを追加してください。

## はじめに

Typographyは、最小限で、レスポンシブで、SEOフレンドリーなAstroブログテーマです。このガイドは新しいプロジェクトの開始を支援します。

### クイックスタート

右上のForkボタンをクリックしてリポジトリをアカウントにフォークし、下のボタンをクリックして、フォークしたリポジトリを選択し、Importボタンをクリックすると、プロジェクト設定ページに移動します。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

または、[Astro](https://docs.astro.build/guides/deploy/)のドキュメントを参照して、お好みのプラットフォームにデプロイすることもできます。

### 投稿の追加

`src/content/posts`に新しいマークダウンファイルを作成してコンテンツを追加できます。ファイルにはフロントマターにメタデータが必要です：

```md
---
title: タイトル
pubDate: 2021-08-01
categories: ["記事"]
description: "説明"
---
```

または、ターミナルで以下のコマンドを使用して新しい投稿を作成できます：

```bash
pnpm new-post
```

## テーマの更新

自分のフォークしたプロジェクトで[`Sync Fork`](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)を実行するだけです（変更を破棄しないでください、そうしないと自分の変更が失われます）。

## カスタマイズ

Typographyは高度にカスタマイズ可能です。デフォルトの設定ファイルは[src/.config/default.ts](src/.config/default.ts)にあり、必要に応じて[src/.config/user.ts](src/.config/user.ts)でデフォルト設定を上書きできます。

### WebAuthn（パスキー）設定

Typographyは安全な認証のためにWebAuthn（パスキー）をサポートしています。WebAuthnを設定するには、`.env`ファイルに以下の環境変数を追加してください：

```env
WEBAUTHN_RP_ID=your-domain.com
WEBAUTHN_RP_NAME=Your Site Name
WEBAUTHN_ORIGIN=https://your-domain.com
```

これらの変数はWebAuthn Relying Partyの設定に使用されます：

- `WEBAUTHN_RP_ID`: サイトのドメイン名（例：'blog.example.com'）
- `WEBAUTHN_RP_NAME`: WebAuthnダイアログに表示されるサイト名
- `WEBAUTHN_ORIGIN`: サイトの完全なオリジン（例：'https://blog.example.com'）

開発時には以下のデフォルト値を使用できます：

```env
WEBAUTHN_RP_ID=localhost
WEBAUTHN_RP_NAME=Typography Blog
WEBAUTHN_ORIGIN=http://localhost:3000
```

注意：WebAuthnは本番環境ではHTTPSが必要です。WebAuthnを有効にする前に、サイトがHTTPS経由で提供されていることを確認してください。

新しいパスキーを登録するには：

1. サイトの`/auth/register`にアクセス
2. ブラウザのプロンプトに従って新しいパスキーを作成
3. パスキーは安全に保存され、今後のログインに使用できます

パスキーでログインするには：

1. サイトの`/auth/login`にアクセス
2. "パスキーを使用"をクリック
3. ブラウザのプロンプトに従って認証

セキュリティを強化するために、以下のオプションの環境変数も設定することを検討してください：

```env
AUTH_SECRET=your-auth-secret # セッション管理に必要
GITHUB_ID=your-github-oauth-id # オプション：GitHub OAuthログインを有効化
GITHUB_SECRET=your-github-oauth-secret
```

### セキュリティに関する考慮事項

本番環境にデプロイする際は：

1. 必ずHTTPSを使用
2. 強力なAUTH_SECRETを設定
3. 適切なCORS設定を行う
4. 環境変数を安全に保管
5. 認証データを定期的にバックアップ
6. 不審な認証試行を監視

### ソーシャルリンク

Typographyには設定ファイルのsocialオプションを介してサイトにソーシャルメディアアカウントへのリンクを追加する機能が組み込まれています：

```ts
socials: [
  {
    name: 'github',
    href: 'https://github.com/oesx/astro-theme-typography'
  }
]
```

`name`は[Material Design Icons](https://pictogrammers.com/library/mdi/)のアイコン名で、自動的にアイコンとして生成されます。

> 変更を確認するには開発サーバーを再起動する必要があることに注意してください。

### ナビゲーションリンク

デフォルトのナビゲーションは`投稿`、`アーカイブ`、`カテゴリー`、`概要`です。設定ファイルで追加できます：

```ts
{
  navs: [
    {
      name: 'カテゴリー',
      href: '/categories'
    }
  ]
}
```

そして`src/pages`に対応するページを追加します。詳細は[Astro Pages](https://docs.astro.build/en/core-concepts/astro-pages/)を参照してください。

### ダークモード

Typographyはダークモードをサポートしています。設定ファイルで変更できます：

```ts
themeStyle: 'dark' // 'light' | 'dark' | 'system'
```

### 国際化（i18n）

Typographyは多言語サイトのサポートを組み込みで提供します。デフォルトの言語は`en-us`で、設定ファイルで変更できます：

```ts
locale: 'ja-jp'
```

現在、Typographyは以下の言語をサポートしています：

- `en-us`
- `zh-cn`
- `zh-tw`
- `ja-jp`
- `it-it`

[src/i18n.ts](src/i18n.ts)でサポートされているすべての言語を確認でき、必要に応じて追加できます。

### コメント

Typographyは複数のコメントサービスをサポートしており、現在[Disqus](https://disqus.com/)、[Giscus](https://giscus.app/)、[Twikoo](https://twikoo.js.org/)をサポートしています。

対応するコメントサービスを設定ファイルに設定を追加することで有効にできます。複数のコメントサービスを設定した場合、最初のサービスのみが表示されます。

#### Disqus

設定ファイルに以下の設定を追加してDisqusを有効にできます：

```ts
comments: {
  disqus: {
    shortname: 'your-disqus-shortname'
  }
}
```

#### Giscus

[Giscus Webコンポーネント](https://github.com/giscus/giscus-component?tab=readme-ov-file#using-the-web-component)の実装に基づいています。

プロパティ名は[giscusウェブサイト](<(https://giscus.app/)>)に表示されているdata-属性と同じですが、data-プレフィックスとダッシュを削除してキャメルケースで記述されています。

設定ファイルに以下の設定を追加してGiscusを有効にできます：

```ts
{
  comments: {
    giscus: {
      repo: 'oesx/astro-theme-typography'
      repoId: 'R_kgDOKy9HOQ'
      category: 'General'
      categoryId: 'DIC_kwDOKy9HOc4CegmW'
      mapping: 'title'
      strict: '0'
      reactionsEnabled: '1'
      emitMetadata: '1'
      inputPosition: 'top'
      theme: 'light'
      lang: 'ja'
      loading: 'lazy'
    }
  }
}
```

#### Twikoo

設定ファイルに以下の設定を追加してTwikooを有効にできます：

```ts
{
  comments: {
    twikoo: {
      envId: 'your-env-id'
    }
  }
}
```

## Pagespeedスコア

[![Pagespeed Score](https://github.com/moeyua/astro-theme-typography/assets/45156493/2272f576-d6ff-49ef-a294-5c2acf365907)](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop)

## TODO

- [ ] ...
