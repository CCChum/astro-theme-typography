import type { ThemeConfig } from '../src/types'
import { themeConfig as defaultConfig } from '../src/config/default'
import { ConfigManager } from '../src/utils/config'

// Get singleton instance
const configManager = ConfigManager.getInstance()

// Load and validate config
export const themeConfig = configManager.mergeConfig(defaultConfig, {
  site: {
    title: 'My Blog',
    description: 'A personal blog built with Astro'
  },
  subtitle: 'Thoughts, stories and ideas',
  author: 'John Doe',
  website: 'https://example.com',
  pageSize: 10,
  language: 'en',
  socialLinks: [
    { name: 'Twitter', href: 'https://twitter.com/johndoe' },
    { name: 'GitHub', href: 'https://github.com/johndoe' }
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
    fontFamily: 'system-ui',
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
      repo: '',
      repoId: '',
      category: '',
      categoryId: '',
      mapping: 'pathname',
      reactionsEnabled: true,
      emitMetadata: false,
      inputPosition: 'bottom',
      lang: 'en'
    }
  }
} as Partial<ThemeConfig>)

// Export config manager for advanced usage
export { configManager }
