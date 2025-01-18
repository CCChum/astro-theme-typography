import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import { themeConfig } from '@/config'
import type { Post } from '@/types'
import type { LANGUAGES } from '@/i18n'

export async function getPosts(includeDrafts = false): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts')
  return posts
    .filter(post => includeDrafts || !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}

export async function getPostsByCategory(category: string): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getPosts()
  return filterPostsByCategory(posts, category)
}

export function filterPostsByCategory(posts: Post[], category: string): Post[] {
  return posts.filter(post => post.data.categories?.includes(category))
}

export function getCategories(posts: Post[]): string[] {
  const categories = new Set<string>()
  posts.forEach((post) => {
    post.data.categories?.forEach((category) => {
      categories.add(category)
    })
  })
  return Array.from(categories)
}

export function getTags(posts: Post[]): string[] {
  const tags = new Set<string>()
  posts.forEach(post => {
    post.data.tags?.forEach(tag => {
      tags.add(tag)
    })
  })
  return Array.from(tags).sort()
}

export function getPathFromCategory(category: string, categoryMap: Record<string, string>) {
  return categoryMap[category] || category
}

export function formatDate(date: Date, format = 'YYYY-MM-DD'): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
}

export function getPostDescription(post: Post): string {
  return post.data.description || post.body.slice(0, 200)
}

export function getReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) {
    return text
  }
  return text.slice(0, length) + '...'
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function getPostUrl(post: CollectionEntry<'posts'>) {
  return `/posts/${post.slug}/`
}

export function getCategoryUrl(category: string) {
  return `/categories/${category}/`
}

export function getPageUrl(page: number): string {
  return page === 1 ? '/' : `/page/${page}/`
}

export function groupPostsByYear(posts: Post[]): Record<number, Post[]> {
  return posts.reduce((acc: Record<number, Post[]>, post) => {
    const year = post.data.pubDate.getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {})
}
