import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/menu', '/banquets'].map((path, i) => ({ url: `${siteUrl}${path}`, changeFrequency: 'weekly' as const, priority: i === 0 ? 1 : 0.8 }))
}
