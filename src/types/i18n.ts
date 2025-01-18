export interface Messages {
  nav: {
    home: string
    posts: string
    categories: string
    archive: string
    about: string
    search: string
  }
  theme: {
    toggle: string
    light: string
    dark: string
    system: string
  }
  footer: {
    powered: string
    theme: string
  }
  post: {
    prev: string
    next: string
    toc: string
    readingTime: string
    words: string
  }
  search: {
    placeholder: string
    noResults: string
    searching: string
  }
  admin: {
    login: string
    logout: string
    posts: string
    settings: string
  }
}

export const languages = ['en', 'zh'] as const
export type Language = typeof languages[number]
