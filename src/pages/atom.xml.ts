import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import type { APIRoute } from 'astro'
import { themeConfig } from '@/config/default'

export const get: APIRoute = async () => {
  const posts = await getCollection('posts', ({ data }) => {
    return !data.draft
  })

  posts.sort((a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) => {
    return b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  })

  return rss({
    title: themeConfig.site.title,
    description: themeConfig.site.description,
    site: themeConfig.site.website,
    items: posts.map((post: CollectionEntry<'posts'>) => ({
      link: `/posts/${post.slug}`,
      title: post.data.title,
      description: post.data.description || '',
      pubDate: post.data.pubDate,
    })),
  })
}
