---
title: 设置 Private DNS
date: 2020-09-05
categories:
  - Tech
tags:
  - DNS
  - DNS 污染
  - Private DNS
  - DoT
---

## DNS 污染

简单来说，你发现一个可正常访问的域名，在某个地方的 wifi 就不能访问了。那这基本上就是 DNS 的问题了。

常见的解决方案就是使用公开可信赖的 `公共 DNS`。常见的公共 DNS 服务的 IP 地址有 `8.8.8.8`、`114.114.114.114`、`223.5.5.5` 等

设置方法可以参考：https://www.alidns.com/setup/

## Private DNS

`Private DNS` 是安卓 9+手机[提供的功能](https://android-developers.googleblog.com/2018/04/dns-over-tls-support-in-android-p.html)，通过支持 DoT(DNS over TLS)，使 DNS 查询过程是加密的，这样保证了安全性和隐私性

主机名这里选择 `1dot1dot1dot1.cloudflare-dns.com`，支持 DoT(DNS over TLS)

配置方法可以查看 https://blog.cloudflare.com/enable-private-dns-with-1-1-1-1-on-android-9-pie/
