import type { Session } from '@auth/core/types'
import type { User } from '@auth/core'
import type { AdapterUser } from '@auth/core/adapters'
import type { AstroGlobal } from 'astro'
import type { CollectionEntry } from 'astro:content'

// 扩展 HTML 属性类型以支持 Tailwind/UnoCSS 类
declare module 'astro' {
  interface HTMLAttributes {
    class?: string | null | undefined
    translate?: '' | 'yes' | 'no' | null | undefined
    flex?: boolean
    lg?: boolean
  }
}

// Language and i18n types
export type Language = 'en' | 'zh' | 'ja'

// Messages type for i18n
export interface Messages {
  'site.title': string
  'site.description': string
  'nav.home': string
  'nav.blog': string
  'nav.about': string
  'post.readingTime': string
  'pagination.prev': string
  'pagination.next': string
  'pagination.page': string
  'pagination.of': string
  'meta.categories': string
  'meta.tags': string
  'meta.previous': string
  'meta.next': string
  'categories.title': string
  'categories.description': string
  'categories.count': string
  [key: string]: string // Allow string indexing
}

// Auth types
export interface CustomUser extends Omit<AdapterUser, 'email'> {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role?: 'admin' | 'user'
}

export interface CustomSession extends Session {
  user?: CustomUser
}

// Theme config types
export interface ThemeConfig {
  subtitle: string
  author: string
  website: string
  pageSize: number
  language?: Language
  site: {
    title: string
    description: string
  }
  socialLinks: Array<{
    name: string
    href: string
  }>
  navLinks: Array<{
    name: string
    href: string
  }>
  categoryMap: Array<{
    name: string
    value: string
  }>
  footer: string[]
  appearance?: {
    theme?: 'light' | 'dark' | 'system'
    fontFamily?: string
    locale?: Language
    colorsLight?: {
      primary: string
      background: string
    }
    colorsDark?: {
      primary: string
      background: string
    }
    fonts?: {
      header: string
      ui: string
    }
  }
  analytics?: AnalyticsConfig
  comment?: CommentConfig
}

// Analytics config
export interface AnalyticsConfig {
  googleAnalyticsId?: string
  umamiAnalyticsId?: string
  google?: {
    id: string
  }
  baidu?: {
    id: string
  }
}

// Comment system config
export interface CommentConfig {
  disqus?: {
    shortname: string
  }
  giscus?: {
    repo: string
    repoId: string
    category: string
    categoryId: string
    mapping: string
    reactionsEnabled: boolean
    emitMetadata: boolean
    inputPosition: string
    lang: string
  }
  utterances?: {
    repo: string
  }
  twikoo?: {
    envId: string
    region?: string
  }
}

// Post metadata
export interface PostMeta {
  id?: string
  title: string
  description?: string
  publishDate: Date
  updatedDate?: Date
  draft?: boolean
  categories?: string[]
  tags?: string[]
  author?: string
  pin?: boolean
  slug?: string
  collection?: string
  body?: string
  data?: CollectionEntry<'posts'>['data']
}

// Props interfaces for layouts
export interface LayoutProps {
  config: ThemeConfig
  title?: string
  description?: string
}

export interface AdminLayoutProps extends LayoutProps {
  requireAuth?: boolean
}

export interface PostLayoutProps extends LayoutProps {
  post: PostMeta
}

// i18n helper type
export interface I18nFunctions {
  t: (key: keyof Messages) => string
  translate: (key: keyof Messages, lang: Language) => string
}

export interface I18n {
  t: (key: keyof Messages, params?: Record<string, string | number>) => string
  locale: Language
  messages: Record<Language, Messages>
}

// Pagination types
export interface PaginationLink {
  url: string
  text?: string
  srLabel?: string
}

export interface Pagination {
  currentPage: number
  lastPage: number
  url: {
    current: string
    prev?: string
    next?: string
  }
}

export interface PaginationProps {
  page: {
    currentPage: number
    size: number
    total: number
    lastPage: number
    url: {
      prev?: string
      next?: string
    }
  }
  locale?: Language
}

// Post
export interface Post {
  id: string
  slug: string
  body: string
  collection: string
  data: PostMeta
}

export interface PostEntry extends CollectionEntry<'posts'> {
  data: PostMeta
}

export interface PostData {
  post: PostEntry
  prev?: PostEntry
  next?: PostEntry
}

// Re-export CategoryMap type
export interface CategoryMap {
  name: string
  value: string
}

declare module 'astro' {
  interface Locals {
    t: (key: keyof Messages) => string
  }
}
