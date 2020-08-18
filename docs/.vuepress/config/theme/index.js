const themeReco = require('./themeReco.js')
const nav = require('../nav/')
const sidebar = require('../sidebar/')

module.exports = Object.assign({}, themeReco, {
  nav,
  sidebar,
  logo: '/logo.png',
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  // 自动形成侧边导航
  sidebar: 'auto',
  authorAvatar: "/logo.png",
  valineConfig: {
    appId: '7pWKyFjLwVXJAIcndpUY6ep3-gzGzoHsz',// your appId
    appKey: 'hpI8Qqyp9AL0L6QKU7EYlHjm', // your appKey
    placeholder: '我那么多期盼，那么多遗憾，你知道吗~~',
    avatar: 'monsterid',
    meta: ['nick', 'mail'],
    requiredFields: ['nick', 'mail'],
    recordIP: true,
    enableQQ: true
  }
})