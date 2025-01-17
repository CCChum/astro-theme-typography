# Типография

<p align='center'>
  <img src='./public/typograph-og.jpg' alt='Typography' width='600'/>
</p>

<h6 align='center'>
<a href="https://astro-theme-typography.vercel.app/">Живое демо</a>
</h6>
<h5 align='center'>
<b>Этот проект является переписанной версией <a href="https://github.com/sumimakito/hexo-theme-typography">hexo-theme-Typography</a></b>
</h5>
<p align='center'>
<a href="./README.md">English</a> | <a href="./README.zh-CN.md">简体中文</a> | <a href="./README.ja.md">日本語</a> | <b>Русский</b>
</p>

## О проекте

Этот проект является улучшенной и оптимизированной версией [astro-theme-typography](https://github.com/oesx/astro-theme-typography) от [oesx](https://github.com/oesx). Мы добавили следующие функции:

- Безопасная панель администратора
- Поддержка WebAuthn (Passkey)
- Улучшенное управление постами
- Улучшенный пользовательский опыт

## Особенности

- Построен с использованием **Astro**, **TypeScript** и **UnoCSS**
- **Быстрый**. 100% оценка [Pagespeed](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop)
- **Типография**. Основана на распространенных китайских типографских нормах и направлена на улучшение читательского опыта
- **Адаптивный**. Хорошо работает на всех размерах экранов
- **Доступный**. Хорошо продуманный семантический и доступный контент
- **SEO-дружелюбный**. Поддержка Open Graph и Twitter Cards для лучшего социального обмена
- **Карта сайта** и **RSS-канал** для поисковых систем
- **Безопасная панель администратора** с поддержкой WebAuthn (Passkey)
  - Создание и редактирование постов прямо из панели
  - Управление учетными данными администратора
  - Поддержка как Passkey, так и традиционной аутентификации
- Поддержка i18n
- Поддержка комментариев Disqus, Giscus, Twikoo
- Поддержка темной темы

## Демо

> Отправьте PR, чтобы добавить демо вашего блога.

## Начало работы

Typography - это минималистичная, адаптивная и SEO-дружелюбная тема блога для Astro. Это руководство поможет вам начать новый проект.

### Быстрый старт

Вы можете форкнуть репозиторий на свой аккаунт, нажав кнопку Fork в правом верхнем углу, нажать кнопку ниже, выбрать только что форкнутый репозиторий, нажать кнопку Import, и вы перейдете на страницу настройки проекта.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

Или вы можете обратиться к документации [Astro](https://docs.astro.build/guides/deploy/) для развертывания на вашей любимой платформе.

### Добавление поста

Вы можете добавлять контент, создавая новый markdown файл в `src/content/posts`. Файл должен содержать метаданные в frontmatter:

```md
---
title: заголовок
pubDate: 2021-08-01
categories: ["статья"]
description: "описание"
---
```

Или вы можете использовать следующую команду в терминале для создания нового поста:

```bash
pnpm new-post
```

## Обновление темы

Вы можете просто выполнить [`Sync Fork`](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) в вашем форкнутом проекте (не нажимайте Discard Changes, иначе вы потеряете свои изменения).

## Настройка

Typography легко настраивается. Файл конфигурации по умолчанию находится в [src/.config/default.ts](src/.config/default.ts), вы можете переопределить конфигурацию по умолчанию в [src/.config/user.ts](src/.config/user.ts) по необходимости.

### Настройка WebAuthn (Passkey)

Typography поддерживает WebAuthn (Passkey) для безопасной аутентификации. Для настройки WebAuthn добавьте следующие переменные окружения в ваш файл `.env`:

```env
WEBAUTHN_RP_ID=your-domain.com
WEBAUTHN_RP_NAME=Your Site Name
WEBAUTHN_ORIGIN=https://your-domain.com
```

Эти переменные используются для настройки Relying Party WebAuthn:

- `WEBAUTHN_RP_ID`: Доменное имя вашего сайта (например, 'blog.example.com')
- `WEBAUTHN_RP_NAME`: Имя вашего сайта, которое будет показано в диалоге WebAuthn
- `WEBAUTHN_ORIGIN`: Полный origin вашего сайта (например, 'https://blog.example.com')

Для разработки вы можете использовать эти значения по умолчанию:

```env
WEBAUTHN_RP_ID=localhost
WEBAUTHN_RP_NAME=Typography Blog
WEBAUTHN_ORIGIN=http://localhost:3000
```

Примечание: WebAuthn требует HTTPS в продакшене. Убедитесь, что ваш сайт обслуживается через HTTPS перед включением WebAuthn.

Для регистрации нового passkey:

1. Посетите `/auth/register` на вашем сайте
2. Следуйте подсказкам браузера для создания нового passkey
3. Ваш passkey будет безопасно сохранен и может использоваться для будущих входов

Для входа с помощью passkey:

1. Посетите `/auth/login` на вашем сайте
2. Нажмите "Использовать Passkey"
3. Следуйте подсказкам браузера для аутентификации

Для повышения безопасности рассмотрите также настройку этих дополнительных переменных окружения:

```env
AUTH_SECRET=your-auth-secret # Требуется для управления сессиями
GITHUB_ID=your-github-oauth-id # Опционально: Включить вход через GitHub OAuth
GITHUB_SECRET=your-github-oauth-secret
```

### Соображения безопасности

При развертывании в продакшен:

1. Всегда используйте HTTPS
2. Установите сильный AUTH_SECRET
3. Настройте правильные параметры CORS
4. Держите ваши переменные окружения в безопасности
5. Регулярно делайте резервные копии данных аутентификатора
6. Отслеживайте подозрительные попытки аутентификации

### Социальные ссылки

Typography имеет встроенную поддержку для добавления ссылок на ваши социальные сети через опцию social в файле конфигурации:

```ts
socials: [
  {
    name: 'github',
    href: 'https://github.com/oesx/astro-theme-typography'
  }
]
```

`name` - это имя иконки в [Material Design Icons](https://pictogrammers.com/library/mdi/), которое будет автоматически сгенерировано как иконка.

> Обратите внимание, что вам нужно перезапустить сервер разработки, чтобы увидеть изменения.

### Навигационные ссылки

По умолчанию навигация включает `Посты`, `Архив`, `Категории` и `О сайте`. Вы можете добавить больше в файле конфигурации:

```ts
{
  navs: [
    {
      name: 'Категории',
      href: '/categories'
    }
  ]
}
```

И затем добавить соответствующую страницу в `src/pages`, подробнее в [Astro Pages](https://docs.astro.build/en/core-concepts/astro-pages/)

### Темная тема

Typography поддерживает темную тему. Вы можете изменить ее в файле конфигурации:

```ts
themeStyle: 'dark' // 'light' | 'dark' | 'system'
```

### Интернационализация (i18n)

Typography предоставляет встроенную поддержку многоязычных сайтов. По умолчанию язык `en-us`, вы можете изменить его в файле конфигурации:

```ts
locale: 'ru'
```

На данный момент Typography поддерживает следующие языки:

- `en-us`
- `zh-cn`
- `zh-tw`
- `ja-jp`
- `it-it`

Вы можете увидеть все поддерживаемые языки в [src/i18n.ts](src/i18n.ts) и добавить больше при необходимости.

### Комментарии

Typography поддерживает несколько сервисов комментариев, в настоящее время поддерживает [Disqus](https://disqus.com/), [Giscus](https://giscus.app/) и [Twikoo](https://twikoo.js.org/).

Включите соответствующий сервис комментариев, добавив конфигурацию в файл конфигурации, при заполнении нескольких сервисов комментариев будет отображаться только первый сервис.

#### Disqus

Вы можете включить Disqus, добавив следующую конфигурацию в файл конфигурации:

```ts
comments: {
  disqus: {
    shortname: 'your-disqus-shortname'
  }
}
```

#### Giscus

Реализовано на основе [веб-компонента Giscus](https://github.com/giscus/giscus-component?tab=readme-ov-file#using-the-web-component).

Имена свойств такие же, как data-атрибуты, показанные на [сайте giscus](<(https://giscus.app/)>), но написаны в camelCase с удаленным префиксом data- и дефисами.

Вы можете включить Giscus, добавив следующую конфигурацию в файл конфигурации:

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
      lang: 'ru'
      loading: 'lazy'
    }
  }
}
```

#### Twikoo

Вы можете включить Twikoo, добавив следующую конфигурацию в файл конфигурации:

```ts
{
  comments: {
    twikoo: {
      envId: 'your-env-id'
    }
  }
}
```

## Оценка Pagespeed

[![Pagespeed Score](https://github.com/moeyua/astro-theme-typography/assets/45156493/2272f576-d6ff-49ef-a294-5c2acf365907)](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop)

## TODO

- [ ] ...
