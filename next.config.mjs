
/** @type {import('next').NextConfig} */
const nextConfig = {

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Powered-By', value: '' },  // Remove X-Powered-By
          { key: 'Server', value: '' },  // Remove server version
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' }, // Security header for HTTPS
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },

    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      formats: ['image/webp'],
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.theharsukh.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://res.cloudinary.com https://cdn.theharsukh.com; connect-src 'self' https://res.cloudinary.com https://cdn.theharsukh.com",
      minimumCacheTTL: 180,
      domains: ['res.cloudinary.com', 'aiwa-city-rems.s3.amazonaws.com', 'cdn.theharsukh.com'],

    },
    reactStrictMode: true,
    compress: true,
    swcMinify: true,

  }
    export default nextConfig;
    