import { defineMiddleware } from 'astro/middleware'
import type { Session } from '@auth/core'
import { languages, type Language, useTranslations } from './i18n'

declare module 'astro' {
  interface Locals {
    language: Language
    session?: Session
    t: ReturnType<typeof useTranslations>['t']
    auth?: {
      validate: () => Promise<Session | null>
    }
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  // Get language from URL or cookie
  const lang = context.url.pathname.split('/')[1]
  const language = languages.includes(lang as any) ? lang : 'en'

  // Set up i18n
  context.locals.language = language as any
  context.locals.t = useTranslations(language as any).t

  // Set up auth
  const session = await context.locals.auth?.validate()
  context.locals.session = session

  // Check admin access
  const isAdmin = context.locals.session?.user?.role === 'admin'
  if (context.url.pathname.startsWith('/admin') && !isAdmin) {
    return context.redirect('/login')
  }

  return next()
})
