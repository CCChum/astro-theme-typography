import type { MiddlewareHandler } from 'astro'
import type { Language, Messages } from '@/types'
import { defineMiddleware } from 'astro:middleware'
import { useTranslations, defaultLanguage } from '@/i18n'

// Define strict types for translation function
type TranslationParams = Record<string, string | number>

// Extend Astro's Locals interface
declare module 'astro' {
  interface Locals {
    language: Language
    t: (key: keyof Messages) => string
  }
}

// Language utilities
const isValidLanguage = (lang: string | undefined): lang is Language => {
  return lang === 'en' || lang === 'zh' || lang === 'ja'
}

const getLanguageFromPathname = (pathname: string): Language | undefined => {
  const lang = pathname.split('/')[1]
  return isValidLanguage(lang) ? lang : undefined
}

export const onRequest = defineMiddleware(async ({ locals, url }, next) => {
  try {
    // Determine language from URL or default
    const urlLang = getLanguageFromPathname(url.pathname)
    const language = urlLang || defaultLanguage
    locals.language = language

    // Set up translation function with type safety
    const { t } = useTranslations(language)
    ;(locals as any).t = (key: keyof Messages) => t(key)

    const response = await next()

    // Add language info to response headers
    response.headers.set('Content-Language', locals.language)
    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
})
