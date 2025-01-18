import type { Language, Messages } from './types/i18n'
import { languages } from './types/i18n'

const en: Messages = {
  nav: {
    home: 'Home',
    posts: 'Posts',
    categories: 'Categories',
    archive: 'Archive',
    about: 'About',
    search: 'Search'
  },
  theme: {
    toggle: 'Toggle theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System'
  },
  footer: {
    powered: 'Powered by',
    theme: 'Theme'
  },
  post: {
    prev: 'Previous',
    next: 'Next',
    toc: 'Table of Contents',
    readingTime: 'min read',
    words: 'words'
  },
  search: {
    placeholder: 'Search posts...',
    noResults: 'No results found',
    searching: 'Searching...'
  },
  admin: {
    login: 'Login',
    logout: 'Logout',
    posts: 'Posts',
    settings: 'Settings'
  }
}

const zh: Messages = {
  nav: {
    home: '首页',
    posts: '文章',
    categories: '分类',
    archive: '归档',
    about: '关于',
    search: '搜索'
  },
  theme: {
    toggle: '切换主题',
    light: '浅色',
    dark: '深色',
    system: '跟随系统'
  },
  footer: {
    powered: '由',
    theme: '主题'
  },
  post: {
    prev: '上一篇',
    next: '下一篇',
    toc: '目录',
    readingTime: '分钟阅读',
    words: '字'
  },
  search: {
    placeholder: '搜索文章...',
    noResults: '未找到结果',
    searching: '搜索中...'
  },
  admin: {
    login: '登录',
    logout: '退出',
    posts: '文章',
    settings: '设置'
  }
}

const messages: Record<Language, Messages> = {
  en,
  zh
}

type Join<K, P> = K extends string | number ?
  P extends string | number ?
    `${K}${'' extends P ? '' : '.'}${P}`
    : never : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

export type NestedKeyOf<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
  { [K in keyof T]: K extends string | number ?
      T[K] extends object ?
        | `${K}`
        | Join<K, NestedKeyOf<T[K], Prev[D]>>
      : `${K}`
    : never
  }[keyof T] : '';

export function useTranslations(language: Language = 'en') {
  return {
    t: (key: NestedKeyOf<Messages>) => {
      const keys = key.split('.')
      let value: any = messages[language]
      for (const k of keys) {
        value = value[k]
      }
      return value
    }
  }
}
