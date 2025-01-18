import type { ThemeConfig } from '@/types'
import en from '@/i18n/en.json'
import zh from '@/i18n/zh.json'

export const themeConfig: ThemeConfig = {
  site: {
    title: 'Typography',
    description: 'A minimalist blog theme for Astro',
    author: 'John Doe',
    website: 'https://astro-theme-typography.netlify.app',
    copyright: ' 2023 Astro Theme Typography. All rights reserved.',
    subtitle: 'A clean and elegant blog theme',
    lang: 'en',
    ogLocale: 'en_US',
    themeColor: '#ffffff',
    pageSize: 5,
    categoryMap: {
      tech: 'Technology',
      life: 'Life',
      dev: 'Development'
    }
  },
  appearance: {
    theme: 'system',
    font: 'sans',
    accentColor: '#06b6d4',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    locale: 'en'
  },
  admin: {
    enabled: true,
    title: 'Admin Dashboard',
    description: 'Manage your blog content',
    email: process.env.ADMIN_EMAIL
  },
  comment: {
    provider: 'giscus',
    giscus: {
      repo: process.env.GISCUS_REPO || '',
      repoId: process.env.GISCUS_REPO_ID || '',
      category: process.env.GISCUS_CATEGORY || '',
      categoryId: process.env.GISCUS_CATEGORY_ID || '',
      mapping: 'pathname',
      reactionsEnabled: true,
      emitMetadata: false,
      inputPosition: 'top',
      lang: 'en',
      loading: 'lazy'
    },
    disqus: {
      shortname: process.env.DISQUS_SHORTNAME || ''
    },
    twikoo: {
      envId: process.env.TWIKOO_ENV_ID || '',
      region: process.env.TWIKOO_REGION,
      lang: 'en'
    }
  },
  latex: {
    enabled: false
  },
  analytics: {
    google: {
      id: 'G-XXXXXXXXXX' // Replace with your Google Analytics ID
    }
  },
  i18n: {
    en,
    zh
  }
}

export { themeConfig as config }
