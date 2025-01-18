import en from './locales/en.json'
import zh from './locales/zh.json'

export const languages = ['en', 'zh'] as const
export type Language = typeof languages[number]

export type Messages = typeof en

export const messages = {
  en,
  zh
}

export function useTranslations(lang: Language = 'en') {
  return {
    t: (key: keyof Messages) => {
      return messages[lang][key] || messages['en'][key]
    }
  }
}

export function formatDate(date: Date, lang: Language = 'en') {
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US').format(date)
}
