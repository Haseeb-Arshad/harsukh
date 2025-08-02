export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/apartments',
          '/location',
          '/investment',
          '/contact',
          '/about',
          '/blog',
          '/explore',
          '/developer',
          '/sitemap.xml'
        ],
        disallow: [
          '/private/',
          '/api/',
          '/admin/',
          '/*.json$',
          '/internal/'
        ]
      }
    ],
    sitemap: 'https://theharsukh.com/sitemap.xml',
    host: 'https://theharsukh.com'
  }
}