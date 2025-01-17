import type { ThemeConfig, Language } from '@/types'

type ValidationError = {
  field: string
  message: string
}

export class ConfigValidator {
  private errors: ValidationError[] = []

  validate(config: Partial<ThemeConfig>): config is ThemeConfig {
    this.errors = []

    // Required fields
    this.validateRequired(config, 'site', 'object')
    this.validateRequired(config.site, 'title', 'string')
    this.validateRequired(config.site, 'description', 'string')
    this.validateRequired(config, 'subtitle', 'string')
    this.validateRequired(config, 'author', 'string')
    this.validateRequired(config, 'website', 'string')
    this.validateRequired(config, 'pageSize', 'number')

    // Arrays
    this.validateArray(config, 'socialLinks', ['name', 'href'])
    this.validateArray(config, 'navLinks', ['name', 'href'])
    this.validateArray(config, 'categoryMap', ['name', 'value'])
    this.validateArray(config, 'footer', undefined)

    // Optional fields with specific types
    this.validateOptional(config, 'language', this.isValidLanguage)
    this.validateOptionalObject(config, 'appearance', {
      theme: (v): v is 'light' | 'dark' | 'system' => ['light', 'dark', 'system'].includes(v as string),
      fontFamily: (v): v is string => typeof v === 'string',
      locale: this.isValidLanguage
    })

    // Analytics config
    if (config.analytics) {
      this.validateOptional(config.analytics, 'googleAnalyticsId', (v): v is string => typeof v === 'string')
      this.validateOptional(config.analytics, 'umamiAnalyticsId', (v): v is string => typeof v === 'string')
    }

    // Comment system config
    if (config.comment) {
      const { comment } = config
      if (comment.disqus) {
        this.validateRequired(comment.disqus, 'shortname', 'string')
      }
      if (comment.giscus) {
        this.validateRequired(comment.giscus, 'repo', 'string')
        this.validateRequired(comment.giscus, 'repoId', 'string')
        this.validateRequired(comment.giscus, 'category', 'string')
        this.validateRequired(comment.giscus, 'categoryId', 'string')
      }
      if (comment.utterances) {
        this.validateRequired(comment.utterances, 'repo', 'string')
      }
      if (comment.twikoo) {
        this.validateRequired(comment.twikoo, 'envId', 'string')
      }
    }

    return this.errors.length === 0
  }

  getErrors(): ValidationError[] {
    return this.errors
  }

  private validateRequired(obj: any, field: string, type: string) {
    if (!obj || typeof obj[field] !== type) {
      this.errors.push({
        field,
        message: `Required field '${field}' must be of type '${type}'`
      })
    }
  }

  private validateArray(obj: any, field: string, requiredFields?: string[]) {
    if (!obj || !Array.isArray(obj[field])) {
      this.errors.push({
        field,
        message: `Field '${field}' must be an array`
      })
      return
    }

    if (requiredFields) {
      obj[field].forEach((item: any, index: number) => {
        requiredFields.forEach(reqField => {
          if (!item[reqField]) {
            this.errors.push({
              field: `${field}[${index}].${reqField}`,
              message: `Required field '${reqField}' missing in ${field}[${index}]`
            })
          }
        })
      })
    }
  }

  private validateOptional<T>(obj: any, field: string, validator: (value: any) => value is T) {
    if (obj[field] !== undefined && !validator(obj[field])) {
      this.errors.push({
        field,
        message: `Invalid value for optional field '${field}'`
      })
    }
  }

  private validateOptionalObject<T extends Record<string, any>>(
    obj: any,
    field: string,
    validators: Record<keyof T, (value: any) => boolean>
  ) {
    if (obj[field]) {
      Object.entries(validators).forEach(([key, validator]) => {
        if (obj[field][key] !== undefined && !validator(obj[field][key])) {
          this.errors.push({
            field: `${field}.${key}`,
            message: `Invalid value for field '${field}.${key}'`
          })
        }
      })
    }
  }

  private isValidLanguage = (lang: any): lang is Language => {
    return typeof lang === 'string' && ['en', 'zh', 'ja'].includes(lang)
  }
}
