# Typography

<p align='center'>
  <img src='./public/typograph-og.jpg' alt='Typography' width='600'/>
</p>

<h6 align='center'>
<a href="https://astro-theme-typography.vercel.app/">Live Demo</a>
</h6>
<h5 align='center'>
<b>This work is rewrite from <a href="https://github.com/sumimakito/hexo-theme-typography">hexo-theme-Typography</a></b>
</h5>
<p align='center'>
<b>English</b> | <a href="./README.zh-CN.md">简体中文</a> | <a href="./README.ja.md">日本語</a> | <a href="./README.ru.md">Русский</a>
</p>

## About This Project

This project is an improved and optimized version of [astro-theme-typography](https://github.com/oesx/astro-theme-typography) by [oesx](https://github.com/oesx). We have added the following features:

- Secure admin dashboard
- WebAuthn (Passkey) support
- Enhanced post management
- Better user experience

## Features

- Build with **Astro**, **TypeScript** and **UnoCSS**
- **Fast**. 100% [Pagespeed Score](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop).
- **Typography** Derived from prevalent Chinese typographic norms and aims to provide an enhanced reading experience for website visitors.
- **Responsive**. Responsive and works well on all screen sizes.
- **Accessible**. A well thought out semantic and accessible content.
- **SEO friendly**.Open Graph and Twitter Cards support for a better social sharing experience.
- **Sitemap** and **RSS feed** for search engines.
- **Secure Admin Dashboard** with WebAuthn (Passkey) support for enhanced security
  - Create and edit posts directly from the dashboard
  - Manage admin credentials
  - Support both Passkey and traditional username/password authentication
- i18n support.
- Support Disqus, Giscus, Twikoo as comment service.
- Dark mode support.

## Demo

> Submit a PR to add your blog Demo.

## Getting Started

Typography is a minimal, responsive and SEO-friendly Astro blog theme. This guide will help you get started with a new project.

### Quick Start

You can fork the repository to your account by clicking the Fork button in the upper right corner, click the button below, select the repository you just forked, click the Import button, and you will be taken to the project configuration page.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

Or you can refer to the [Astro](https://docs.astro.build/guides/deploy/) documentation to deploy to your favorite platform.

### Add post

You can add content by creating a new markdown file in `src/content/posts`. The file need metadata in the frontmatter, like this:

```md
---
title: title
pubDate: 2021-08-01
categories: ["article"]
description: "description"
---
```

Or, you can use the following command in your terminal to create a new post:

```bash
pnpm new-post
```

## Updating the theme

You can simply [`Sync Fork`](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) on your own forked project (do not click Discard Changes, otherwise you will lose your own changes).

## Customization

Typography is highly customizable. The default configuration file is [src/.config/default.ts](src/.config/default.ts), you can override the default configuration in [src/.config/user.ts](src/.config/user.ts) as needed.

### Social links

Typography has built-in support for adding links to your social media accounts to the site via the social option in the config file:

```ts
socials: [
  {
    name: 'github',
    href: 'https://github.com/oesx/astro-theme-typography'
  }
]
```

The `name` is the icon name in [Material Design Icons](https://pictogrammers.com/library/mdi/),
which will be automatically generated as the icon.

> Note that you need to restart the development server to see the changes.

### Navigation links

By default, the navigation are `Posts`, `Archive`, `Categories` and `About`. You can add more in the config file:

```ts
{
  navs: [
    {
      name: 'Categories',
      href: '/categories'
    }
  ]
}
```

And then add the corresponding page in `src/pages`, see more in [Astro Pages](https://docs.astro.build/en/core-concepts/astro-pages/)

### Dark mode

Typography supports dark mode. You can change it in the config file:

```ts
themeStyle: 'dark' // 'light' | 'dark' | 'system'
```

### Internationalization (i18n)

Typography provides built-in support for multilingual sites. By default, the language is `en-us`, you can change it in the config file:

```ts
locale: 'zh-cn'
```

For now, Typography supports below languages:

- `en-us`
- `zh-cn`
- `zh-tw`
- `ja-jp`
- `it-it`

You can see all supported languages in [src/i18n.ts](src/i18n.ts), and add more if you need.

### Comment

Typography supports multiple comment services, currently supports [Disqus](https://disqus.com/), [Giscus](https://giscus.app/) and [Twikoo](https://twikoo.js.org/).

Enable the corresponding comment service by adding the configuration to the config file, when you fill in multiple comment services, only the first service will be displayed.

#### Disqus

You can enable Disqus by adding the following configuration to the config file:

```ts
comments: {
  disqus: {
    shortname: 'your-disqus-shortname'
  }
}
```

#### Giscus

Based on the [Giscus web component](https://github.com/giscus/giscus-component?tab=readme-ov-file#using-the-web-component) implementation.

The prop names are the same as the data- attributes shown on the [giscus website](<(https://giscus.app/)>), but written in camelCase with the data- prefix and dashes removed.

You can enable Giscus by adding the following configuration to the config file:

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
      lang: 'zh-CN'
      loading: 'lazy'
    }
  }
}
```

#### Twikoo

You can enable Twikoo by adding the following configuration to the config file:

```ts
{
  comments: {
    twikoo: {
      envId: 'your-env-id'
    }
  }
}
```

## WebAuthn (Passkey) Configuration

Typography supports WebAuthn (Passkey) for secure authentication. To configure WebAuthn, add the following environment variables to your `.env` file:

```env
WEBAUTHN_RP_ID=your-domain.com
WEBAUTHN_RP_NAME=Your Site Name
WEBAUTHN_ORIGIN=https://your-domain.com
```

These variables are used to configure the WebAuthn Relying Party:

- `WEBAUTHN_RP_ID`: The domain name of your site (e.g., 'blog.example.com')
- `WEBAUTHN_RP_NAME`: The name of your site that will be shown in the WebAuthn dialog
- `WEBAUTHN_ORIGIN`: The full origin of your site (e.g., 'https://blog.example.com')

For development, you can use these default values:

```env
WEBAUTHN_RP_ID=localhost
WEBAUTHN_RP_NAME=Typography Blog
WEBAUTHN_ORIGIN=http://localhost:3000
```

Note: WebAuthn requires HTTPS in production. Make sure your site is served over HTTPS before enabling WebAuthn.

To register a new passkey:

1. Visit `/auth/register` on your site
2. Follow the browser's prompts to create a new passkey
3. Your passkey will be stored securely and can be used for future logins

To login with a passkey:

1. Visit `/auth/login` on your site
2. Click "Use Passkey"
3. Follow the browser's prompts to authenticate

For enhanced security, consider also configuring these optional environment variables:

```env
AUTH_SECRET=your-auth-secret # Required for session management
GITHUB_ID=your-github-oauth-id # Optional: Enable GitHub OAuth login
GITHUB_SECRET=your-github-oauth-secret
```

### Security Considerations

When deploying to production:

1. Always use HTTPS
2. Set a strong AUTH_SECRET
3. Configure proper CORS settings
4. Keep your environment variables secure
5. Regularly backup your authenticator data
6. Monitor authentication attempts for suspicious activity

## Pagespeed Score

[![Pagespeed Score](https://github.com/moeyua/astro-theme-typography/assets/45156493/2272f576-d6ff-49ef-a294-5c2acf365907)](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop)

## TODO

- [ ] ...
