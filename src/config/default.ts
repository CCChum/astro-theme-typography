import type { ThemeConfig } from '@/types'

export const themeConfig: ThemeConfig = {
  site: {
    title: 'Astro Theme Typography',
    description: 'A clean and minimal blog theme for Astro'
  },
  subtitle: 'A clean and minimal blog theme for Astro',
  author: 'Your Name',
  website: 'https://example.com',
  pageSize: 5,
  language: 'en',
  socialLinks: [
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'GitHub', href: 'https://github.com' }
  ],
  navLinks: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' }
  ],
  categoryMap: [
    { name: 'Technology', value: 'tech' },
    { name: 'Programming', value: 'programming' }
  ],
  footer: ['Made with ❤️ using Astro'],
  appearance: {
    theme: 'system',
    fontFamily: 'sans-serif',
    locale: 'en',
    colorsLight: {
      primary: '#000000',
      background: '#ffffff'
    },
    colorsDark: {
      primary: '#ffffff',
      background: '#000000'
    },
    fonts: {
      header: 'system-ui',
      ui: 'system-ui'
    }
  },
  analytics: {
    googleAnalyticsId: '',
    umamiAnalyticsId: ''
  },
  comment: {
    giscus: {
      repo: 'username/repo',
      repoId: '',
      category: 'General',
      categoryId: '',
      mapping: 'pathname',
      reactionsEnabled: true,
      emitMetadata: false,
      inputPosition: 'bottom',
      lang: 'en'
    }
  }
}
