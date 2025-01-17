import type { Language, Messages } from '@/types'

const messages: Record<Language, Messages> = {
  en: {
    'site.title': 'Astro Theme Typography',
    'site.description': 'A clean and minimal blog theme for Astro',
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'post.readingTime': 'min read',
    'pagination.prev': 'Previous',
    'pagination.next': 'Next',
    'pagination.page': 'Page',
    'pagination.of': 'of',
    'meta.categories': 'Categories',
    'meta.tags': 'Tags',
    'meta.previous': 'Previous Post',
    'meta.next': 'Next Post',
    'categories.title': 'Categories',
    'categories.description': 'Browse posts by category',
    'categories.count': '{count} posts'
  },
  zh: {
    'site.title': 'Astro 主题排版',
    'site.description': '一个简洁的 Astro 博客主题',
    'nav.home': '首页',
    'nav.blog': '博客',
    'nav.about': '关于',
    'post.readingTime': '分钟阅读',
    'pagination.prev': '上一页',
    'pagination.next': '下一页',
    'pagination.page': '页',
    'pagination.of': '/',
    'meta.categories': '分类',
    'meta.tags': '标签',
    'meta.previous': '上一篇',
    'meta.next': '下一篇',
    'categories.title': '分类',
    'categories.description': '按分类浏览文章',
    'categories.count': '{count} 篇文章'
  },
  ja: {
    'site.title': 'Astro テーマ タイポグラフィ',
    'site.description': 'クリーンでミニマルな Astro ブログテーマ',
    'nav.home': 'ホーム',
    'nav.blog': 'ブログ',
    'nav.about': '概要',
    'post.readingTime': '分読む',
    'pagination.prev': '前へ',
    'pagination.next': '次へ',
    'pagination.page': 'ページ',
    'pagination.of': '/',
    'meta.categories': 'カテゴリー',
    'meta.tags': 'タグ',
    'meta.previous': '前の記事',
    'meta.next': '次の記事',
    'categories.title': 'カテゴリー',
    'categories.description': 'カテゴリーで記事を閲覧',
    'categories.count': '{count} 件の記事'
  }
}

export const defaultLanguage: Language = 'en'

export function useTranslations(locale: Language = 'en') {
  function t(key: keyof Messages, params?: Record<string, string | number>): string {
    const msg = messages[locale][key] || messages[defaultLanguage][key] || String(key)
    if (!params) return msg
    return Object.entries(params).reduce(
      (acc, [k, v]) => acc.replace(new RegExp(`{${k}}`, 'g'), String(v)),
      msg
    )
  }
  
  return { t }
}

export { messages }
