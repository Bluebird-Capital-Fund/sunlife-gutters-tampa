/**
 * Blog index: fetch all posts + pagination helpers (static /blog/ and /blog/page/N/).
 */

import { asStr } from './sanity-strings.js'
import { heroBackgroundFor } from './hero-backgrounds.js'

export const BLOG_POSTS_PER_PAGE = 9

const LIST_QUERY = `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
  "slug": slug.current,
  headline,
  lead,
  publishedAt,
  "metaTitle": meta.title,
  "metaDescription": meta.description,
  "thumb": coalesce(
    contentSections[imageSrc != null][0].imageSrc,
    layoutBackgrounds.hero.imageSrc
  ),
  "thumbAlt": coalesce(
    contentSections[imageSrc != null][0].imageAlt,
    layoutBackgrounds.hero.location,
    headline
  )
}`

export async function fetchAllBlogPosts(sanity) {
  try {
    const rows = await sanity.fetch(LIST_QUERY)
    if (!Array.isArray(rows)) return []
    return rows.map((post) => {
      const slug = asStr(post?.slug)
      const thumb = asStr(post?.thumb) || heroBackgroundFor(`blog-${slug}`)
      const thumbAlt = asStr(post?.thumbAlt) || asStr(post?.headline) || 'Article'
      return { ...post, thumb, thumbAlt }
    })
  } catch (err) {
    console.warn('[blog-list] Failed to fetch blog posts.', err)
    return []
  }
}

export function getBlogPagination(totalItems, perPage = BLOG_POSTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(Math.max(0, totalItems) / perPage))
  return { totalPages, perPage }
}

export function sliceBlogPage(allPosts, page, perPage = BLOG_POSTS_PER_PAGE) {
  const p = Math.max(1, Math.floor(page) || 1)
  const start = (p - 1) * perPage
  return allPosts.slice(start, start + perPage)
}

export function excerpt(text, maxLen = 160) {
  const t = String(text || '').replace(/\s+/g, ' ').trim()
  if (t.length <= maxLen) return t
  return `${t.slice(0, maxLen - 1).trim()}…`
}

export function formatBlogDate(iso, locale = 'en-US') {
  if (!iso || typeof iso !== 'string') return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const loc = locale === 'es' || locale === 'es-US' ? 'es-US' : 'en-US'
  return d.toLocaleDateString(loc, { year: 'numeric', month: 'long', day: 'numeric' })
}
