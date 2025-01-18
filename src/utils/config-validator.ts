import type { ThemeConfig } from '@/types'

interface ValidationError {
  field: string
  message: string
}

export class ConfigValidator {
  private errors: ValidationError[] = []

  validate(config: ThemeConfig): boolean {
    this.errors = []

    // Validate site config
    this.validateRequired(config.site, 'title', 'string')
    this.validateRequired(config.site, 'description', 'string')
    this.validateRequired(config.site, 'author', 'string')

    // Validate appearance config
    this.validateRequired(config.appearance, 'theme', 'string')
    this.validateRequired(config.appearance, 'font', 'string')
    this.validateRequired(config.appearance, 'accentColor', 'string')

    // Validate admin config
    if (config.admin.enabled) {
      this.validateRequired(config.admin, 'username', 'string')
      this.validateRequired(config.admin, 'password', 'string')
    }

    // Validate comment config
    if (config.comment) {
      this.validateRequired(config.comment, 'provider', 'string')

      if (config.comment.giscus) {
        this.validateRequired(config.comment.giscus, 'repo', 'string')
        this.validateRequired(config.comment.giscus, 'repoId', 'string')
        this.validateRequired(config.comment.giscus, 'category', 'string')
        this.validateRequired(config.comment.giscus, 'categoryId', 'string')
        this.validateRequired(config.comment.giscus, 'mapping', 'string')
        this.validateRequired(config.comment.giscus, 'reactionsEnabled', 'boolean')
        this.validateRequired(config.comment.giscus, 'emitMetadata', 'boolean')
        this.validateRequired(config.comment.giscus, 'inputPosition', 'string')
        this.validateRequired(config.comment.giscus, 'lang', 'string')
        this.validateRequired(config.comment.giscus, 'loading', 'string')
      }

      if (config.comment.disqus) {
        this.validateRequired(config.comment.disqus, 'shortname', 'string')
      }

      if (config.comment.twikoo) {
        this.validateRequired(config.comment.twikoo, 'envId', 'string')
      }
    }

    // Validate latex config
    if (config.latex) {
      this.validateRequired(config.latex, 'enabled', 'boolean')
    }

    return this.errors.length === 0
  }

  getErrors(): ValidationError[] {
    return this.errors
  }

  private validateRequired(obj: any, field: string, type: string) {
    if (!obj || obj[field] === undefined || obj[field] === null) {
      this.errors.push({
        field,
        message: `${field} is required`
      })
    } else if (typeof obj[field] !== type) {
      this.errors.push({
        field,
        message: `${field} must be a ${type}`
      })
    }
  }
}
