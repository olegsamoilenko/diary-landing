// app/manifest.ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nemory',
    short_name: 'Nemory',
    description:
      'Private AI journal and diary app for self-reflection, mood tracking, habits, goals, and personal growth.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#F8F5EF',
    theme_color: '#67BED8',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
