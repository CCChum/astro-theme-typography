import type { ThemeConfig } from './src/types'

export const themeConfig: ThemeConfig = {
  site: {
    title: 'Astro Typography',
    subtitle: 'A clean and minimal blog theme',
    description: 'A clean and minimal blog theme for Astro',
    author: 'Your Name',
    website: 'https://astro-theme-typography.vercel.app/',
    pageSize: 5,
    socialLinks: [
      {
        name: 'github',
        href: 'https://github.com/username',
      },
    ],
    navLinks: [
      { name: 'Home', href: '/' },
      { name: 'Archive', href: '/archive' },
      { name: 'Categories', href: '/categories' },
    ],
    categoryMap: [
      { name: 'Category 1', path: 'category-1' },
    ],
    footer: [
      ' 2024 Your Name',
      'Powered by Astro',
    ],
  },
  appearance: {
    theme: 'light',
    locale: 'en',
    fontFamily: "'Noto Serif SC', serif",
    colorsLight: {
      primary: '#2e405b',
      background: '#ffffff',
    },
    colorsDark: {
      primary: '#FFFFFF',
      background: '#232222',
    },
    fonts: {
      header: '"HiraMinProN-W6","Source Han Serif CN","Source Han Serif SC","Source Han Serif TC",serif',
      ui: '"Source Sans Pro","Roboto","Helvetica","Helvetica Neue","Source Han Sans SC","Source Han Sans TC","PingFang SC","PingFang HK","PingFang TC",sans-serif',
    },
  },
  rss: {
    fullText: true,
  },
  comment: {
    disqus: {
      shortname: 'your-disqus-shortname',
    },
  },
  analytics: {
    googleAnalyticsId: 'G-M3DFWL32FM',
    umamiAnalyticsId: '',
  },
  latex: {
    katex: false,
  },
  admin: {
    username: 'admin',
    password: 'admin123',
  },
}
