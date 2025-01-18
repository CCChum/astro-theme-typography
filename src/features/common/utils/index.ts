import type { Post, PostFrontmatter } from '@/types'
import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import MarkdownIt from 'markdown-it'

const parser = new MarkdownIt()

export async function getPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts')
  
  // Filter out draft posts in production
  if (import.meta.env.PROD) {
    return posts.filter(post => !post.data.draft)
  }
  return posts
}

export async function getPostsByCategory(category: string): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getPosts()
  return posts.filter(post => post.data.categories?.includes(category))
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function getPostDescription(post: CollectionEntry<'posts'>): string {
  if (post.data.description) {
    return post.data.description
  }
  const content = parser.render(post.body)
  const text = content.replace(/<[^>]*>/g, '')
  return text.slice(0, 200) + (text.length > 200 ? '...' : '')
}

export function getPathFromCategory(
  category: string,
  category_map: { name: string; path: string }[]
): string {
  const mappingPath = category_map.find(l => l.name === category)
  return mappingPath ? mappingPath.path : category
}
