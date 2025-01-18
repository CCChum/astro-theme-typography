export function formatDate(date: Date, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export function formatDateTime(date: Date, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date)
}

export function formatRelativeTime(date: Date, locale: string = 'en'): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) {
    return rtf.format(-years, 'year')
  } else if (months > 0) {
    return rtf.format(-months, 'month')
  } else if (days > 0) {
    return rtf.format(-days, 'day')
  } else if (hours > 0) {
    return rtf.format(-hours, 'hour')
  } else if (minutes > 0) {
    return rtf.format(-minutes, 'minute')
  } else {
    return rtf.format(-seconds, 'second')
  }
}

export function sortPostsByDate<T extends { data: { pubDate: Date } }>(posts: T[]): T[] {
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}

export function groupPostsByYear<T extends { data: { pubDate: Date } }>(posts: T[]): Map<number, T[]> {
  const grouped = new Map<number, T[]>()
  
  for (const post of posts) {
    const year = post.data.pubDate.getFullYear()
    if (!grouped.has(year)) {
      grouped.set(year, [])
    }
    grouped.get(year)?.push(post)
  }
  
  return grouped
}
