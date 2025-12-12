import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    const API = process.env.NEXT_PUBLIC_API_URL
    if (process.env.NODE_ENV === 'development') {
      return {
        beforeFiles: [
          {
            source: '/api/:path*',
            destination: `${API}/:path*`,
          },
        ],
        afterFiles: [],
        fallback: [],
      }
    }
    return { beforeFiles: [], afterFiles: [], fallback: [] }
  },
}

export default nextConfig
