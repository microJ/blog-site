module.exports = [
  { text: 'Home', link: '/', icon: 'reco-home' },
  { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
  { text: 'About Me', 
    icon: 'reco-message',
    items: [
      { text: 'Info', link: '/views/personal-info/', icon: 'reco-blog' },
      { text: 'NPM', link: 'https://www.npmjs.com/~microj', icon: 'reco-npm' },
      { text: 'GitHub', link: 'https://github.com/microJ', icon: 'reco-github' },
    ]
  }
]