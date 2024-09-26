
/** @type {import('next').NextConfig} */
const nextConfig = {
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
    

  }
    export default nextConfig;