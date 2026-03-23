import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                // Picsum placeholder images — remove once real product photos are added
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            // Add your real image CDN here when ready, e.g.:
            // { protocol: 'https', hostname: 'cdn.yourstore.com' },
        ],
    },
}

export default nextConfig