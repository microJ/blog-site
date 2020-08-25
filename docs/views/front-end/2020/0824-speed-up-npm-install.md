---
title: 一个文件配置解决 NPM/Yarn 依赖安装失败和速度慢的问题
date: 2020-08-24
categories:
  - Front-End
tags:
  - npm
  - npm install
  - yarn
  - yarn install
  - cypress
  - nrm
  - .npmrc
---

## 我有一个小问题

以下两个问题就很常见了呀：

1. 使用 npm 或者 yarn 的源安装依赖包好慢。比如要 5 分钟。可每次发布都绕不开这 5 分钟。。
2. 发现某个安装包安装时间巨长，还总是失败，比如 `sass`、`cypress`

## 关于 NPM/Yarn 安装依赖

当执行 `npm install cypress` 的时候：

1. npm 是去 [npm 依赖仓库](https://registry.npmjs.org/) 查找依赖并安装的。如果你的电脑访问这个仓库地址很慢，那么安装速度就会很慢
2. 此时依赖包 `cypress` 还需要从其官网下载一个 `.app` 文件作为客户端执行。这个下载过程依旧很慢，甚至是失败

为什么慢和失败，就是**因为科学原因，你的机器访问目标路径下载时速度慢，甚至是无法访问**

## 解决方案

使用 `.npmrc` 配置文件指定依赖包、依赖文件的下载路径，将其指向国内的网址，速度就能大幅提高。

在项目根目录创建 `.npmrc` 文件，内容如下，可以覆盖绝大部分安装场景了：

```sh
# 在服务端执行时可能需要最高权限执行
unsafe-perm=true
# 指定依赖的安装源
registry=https://registry.npm.taobao.org/
# 指定 node.js 的安装源，某些依赖包可能需要下载 node.js
disturl=https://npm.taobao.org/mirrors/node/

# 一些依赖包内部需要下载的依赖文件，以下变量会被相关依赖包读取到并使用
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver/
operadriver_cdnurl=https://npm.taobao.org/mirrors/operadriver/
selenium_cdnurl=https://npm.taobao.org/mirrors/selenium/
node_inspector_cdnurl=https://npm.taobao.org/mirrors/node-inspector/
fsevents_binary_host_mirror=http://npm.taobao.org/mirrors/fsevents/
puppeteer_download_host=https://npm.taobao.org/mirrors/
sentrycli_cdnurl=https://npm.taobao.org/mirrors/sentry-cli/
sharp_binary_host=https://npm.taobao.org/mirrors/sharp/
sharp_libvips_binary_host=https://npm.taobao.org/mirrors/sharp-libvips/
sqlite3_binary_site=https://npm.taobao.org/mirrors/sqlite3/
python_mirror=https://npm.taobao.org/mirrors/python/
```

`NPM` 和 `yarn` 都能识别 `.npmrc` 文件。完美解决上述问题。

## 其他

如果只是解决安装源的问题。推荐使用 `nrm`

1. 安装

`npm install nrm --global --registry=https://registry.npm.taobao.org/`

2. 查看当前 `nrm` 都有哪些源

`nrm ls`

除了查看预置的安装源，你还可以使用 `nrm add <registry> <url>` 自定义安装源，比如公司私有 npm

3. 使用 `taobao` 源

`nrm use taobao`

这样系统全局的安装源就被指定为淘宝源了，以后新项目中即使没有 `.npmrc` 指定安装源也可以愉快的从淘宝源安装依赖包了。但是某些依赖包的依赖文件下载问题还是需要 `.npmrc` 来解决鸭 🤣

参考文章：

1. [聊聊 NPM 镜像那些险象环生的坑](https://juejin.im/post/6844904192247595022)
