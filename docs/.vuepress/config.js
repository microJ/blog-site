const themeConfig = require('./config/theme/')
const path = require('path')

const autometa_options = {
  site: {
    name: '叫我小J',
  },
  canonical_base: 'https://blog.expect2.cyou',
}

module.exports = {
  title: '叫我小J',
  description: 'Record good times.',
  dest: 'public',
  head: [
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
    ],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  theme: 'reco',
  themeConfig,
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    [
      'sitemap',
      {
        hostname: 'https://blog.expect2.cyou',
        // 排除无实际内容的页面
        exclude: ['/404.html'],
      },
    ],
    ['autometa', autometa_options],
    '@vuepress/medium-zoom',
    'flowchart',
    [
      '@vuepress-reco/vuepress-plugin-rss',
      {
        site_url: 'https://blog.expect2.cyou',
      },
    ],
    'vuepress-plugin-baidu-autopush',
  ],
  chainWebpack: config => {
    config.resolve.alias.set('@images', path.resolve(__dirname, '../views/assets/images'))
  },
}
