import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://nemoryai.com/sitemap.xml',
    host: 'https://nemoryai.com',
  }
}
