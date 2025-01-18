import type { Session } from '@auth/core/types'
import type { AdapterUser } from '@auth/core/adapters'
import type { AstroGlobal } from 'astro'
import type { CollectionEntry } from 'astro:content'
import type { Language, Messages } from './i18n'

// Language type
// export type Language = 'en' | 'zh'

// Theme config types
export interface SiteConfig {
  title: string
  description: string
  author: string
  pageSize?: number
  website?: string
  categoryMap?: Record<string, string>
  language?: Language
  keywords?: string[]
  copyright?: string
}

export interface AppearanceConfig {
  theme: 'system' | 'light' | 'dark'
  font: 'sans' | 'serif'
  accentColor: string
  fontFamily?: string
  locale?: string
}

export interface AdminConfig {
  enabled?: boolean
  email?: string
  github?: string
  username?: string
  password?: string
}

export interface GiscusConfig {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping: string
  reactionsEnabled: boolean
  emitMetadata: boolean
  inputPosition: string
  lang: string
  loading: string
}

export interface DisqusConfig {
  shortname: string
}

export interface TwikooConfig {
  envId: string
  region?: string
  lang?: string
}

export interface CommentConfig {
  provider: 'giscus' | 'disqus' | 'twikoo'
  giscus?: GiscusConfig
  disqus?: DisqusConfig
  twikoo?: TwikooConfig
}

export interface LatexConfig {
  enabled: boolean
}

export interface ThemeConfig {
  site: SiteConfig
  appearance: AppearanceConfig
  admin: AdminConfig
  comment?: CommentConfig
  latex?: LatexConfig
  language?: string
}

// Post types
export interface PostData {
  title: string
  pubDate: Date
  draft: boolean
  description?: string
  image?: string
  author?: string
  avatar?: string
  updatedDate?: Date
  categories?: string[]
  tags?: string[]
  readingTime?: number
  enclosure?: {
    url: string
    type: string
    length: number
  }
}

export type Post = CollectionEntry<'posts'> & {
  data: PostData
}

// Auth types
export interface Locals {
  language: Language
  session?: Session & {
    user?: {
      role?: 'admin' | 'user'
    }
  }
  t: (key: keyof Messages) => string
  auth?: {
    validate: () => Promise<Session | null>
  }
}

// Astro types
declare module 'astro' {
  interface Locals {
    language: Language
    session?: Session & {
      user?: {
        role?: 'admin' | 'user'
      }
    }
    t: (key: keyof Messages) => string
    auth?: {
      validate: () => Promise<Session | null>
    }
  }
}

export interface PaginationProps {
  length: number
  currentPage: number
  maxPage: number
  size: number
  url: {
    current: string
    prev: string | undefined
    next: string | undefined
  }
}

export interface PageProps {
  posts: Post[]
  pagination: PaginationProps
}

export interface LayoutPostProps {
  post: Post
  prev?: Post | null
  next?: Post | null
}

export interface AdminLayoutProps {
  title: string
  description?: string
  config?: ThemeConfig
  requireAuth?: boolean
}
