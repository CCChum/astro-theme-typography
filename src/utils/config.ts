import type { ThemeConfig } from '@/types'

const defaultConfig: ThemeConfig = {
  site: {
    title: 'Typography',
    description: 'A minimalist blog theme for Astro',
    author: 'John Doe',
    pageSize: 5,
    website: 'https://astro-theme-typography.netlify.app',
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
    locale: 'en'
  },
  admin: {
    enabled: true,
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
  }
}

export class ConfigManager {
  private static instance: ConfigManager
  private config!: ThemeConfig
  private validator: ConfigValidator

  private constructor() {
    this.validator = new ConfigValidator()
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  loadConfig(config: ThemeConfig): ThemeConfig {
    if (!this.validator.validate(config)) {
      const errors = this.validator.getErrors()
      console.error('Invalid configuration:', errors)
      throw new Error(`Invalid configuration: ${errors.map(e => `${e.field}: ${e.message}`).join(', ')}`)
    }
    this.config = config
    return this.config
  }

  mergeConfig(baseConfig: ThemeConfig, overrides: Partial<ThemeConfig>): ThemeConfig {
    const merged: ThemeConfig = mergeConfig(overrides)
    return this.loadConfig(merged)
  }

  getConfig(): ThemeConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.config
  }

  updateConfig(updates: Partial<ThemeConfig>): ThemeConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded')
    }
    return this.mergeConfig(this.config, updates)
  }
}

function mergeConfig(overrides: Partial<ThemeConfig>): ThemeConfig {
  return {
    site: {
      ...defaultConfig.site,
      ...overrides.site
    },
    appearance: {
      ...defaultConfig.appearance,
      ...overrides.appearance
    },
    admin: {
      ...defaultConfig.admin,
      ...overrides.admin
    },
    comment: {
      provider: overrides.comment?.provider || defaultConfig.comment?.provider || 'giscus',
      giscus: {
        ...defaultConfig.comment?.giscus,
        ...overrides.comment?.giscus
      },
      disqus: {
        ...defaultConfig.comment?.disqus,
        ...overrides.comment?.disqus
      },
      twikoo: {
        ...defaultConfig.comment?.twikoo,
        ...overrides.comment?.twikoo
      }
    },
    latex: {
      enabled: overrides.latex?.enabled ?? defaultConfig.latex?.enabled ?? false
    }
  }
}
