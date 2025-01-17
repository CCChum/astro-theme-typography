import type { ThemeConfig } from '@/types'
import { ConfigValidator } from './config-validator'

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
    const defaultColors = {
      primary: '#000000',
      background: '#ffffff'
    }

    const merged: ThemeConfig = {
      ...baseConfig,
      ...overrides,
      site: {
        title: overrides.site?.title || baseConfig.site.title,
        description: overrides.site?.description || baseConfig.site.description
      },
      appearance: {
        theme: overrides.appearance?.theme || baseConfig.appearance?.theme || 'system',
        fontFamily: overrides.appearance?.fontFamily || baseConfig.appearance?.fontFamily || 'system-ui',
        locale: overrides.appearance?.locale || baseConfig.appearance?.locale || baseConfig.language,
        colorsLight: {
          ...defaultColors,
          ...baseConfig.appearance?.colorsLight,
          ...overrides.appearance?.colorsLight
        },
        colorsDark: {
          ...defaultColors,
          ...baseConfig.appearance?.colorsDark,
          ...overrides.appearance?.colorsDark
        },
        fonts: {
          header: overrides.appearance?.fonts?.header || baseConfig.appearance?.fonts?.header || 'system-ui',
          ui: overrides.appearance?.fonts?.ui || baseConfig.appearance?.fonts?.ui || 'system-ui'
        }
      }
    }

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
