import type { ThemeConfig } from '@/types'

export const themeConfig: ThemeConfig = {
  site: {
    title: 'Typography',
    description: 'A clean and minimal Astro blog theme',
    author: 'John Doe',
    pageSize: 5,
    website: 'https://example.com',
    categoryMap: {
      tech: 'Technology',
      life: 'Life',
      dev: 'Development'
    }
  },
  appearance: {
    theme: 'system',
    font: 'sans',
    accentColor: '#0070F3',
    fontFamily: 'system-ui',
    locale: 'en'
  },
  admin: {
    enabled: true,
    username: 'admin',
    password: 'admin',
    email: 'admin@example.com',
    github: 'https://github.com'
  },
  comment: {
    provider: 'giscus',
    giscus: {
      repo: 'owner/repo',
      repoId: 'repo-id',
      category: 'Comments',
      categoryId: 'category-id',
      mapping: 'pathname',
      reactionsEnabled: true,
      emitMetadata: true,
      inputPosition: 'bottom',
      lang: 'en',
      loading: 'lazy'
    }
  },
  latex: {
    enabled: true
  }
}
