const themeConfig = require("./config/theme/");

module.exports = {
  title: "叫我小J",
  description: "Record good times.",
  dest: "public",
  head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      }
    ],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  theme: "reco",
  themeConfig,
  markdown: {
    lineNumbers: true
  },
  plugins: [
    "@vuepress/medium-zoom",
    "flowchart",
    [
      "@vuepress-reco/vuepress-plugin-rss",
      {
        site_url: "https://blog.expect2.cyou"
      }
    ]
  ]
};
