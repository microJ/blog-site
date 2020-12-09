---
title: 关于 MBP 存储空间不足需要减少虚拟机占用空间进而安装 Windows Thin PC 这件事
date: 2020-12-04
categories:
  - Tech
  - Article
  - Design
  - Wisper
  - Other
tags:
  - Windows Thin PC
  - Macbook Pro
  - Parallels Desktop
  - Virtualization
  - 虚拟机
  - 存储空间不足
---

## MBP 256G

害，再次建议，买 Mac 开发用的时候，建议配置直接一步到位。（256 的硬盘现在只剩 30G 了 😣）
虚拟机、docker、node_modules、学习资料 以肉眼可见的速度吃掉你的存储空间，就像你的手机电量一点点消失最终见红一样恐怖。

事已至此，肯定要清理些占用空间的大头。于是我打开了 `存储空间 - 管理 - 检查文件` 查看大型文件，惊了

<img src="~@images/2020/1204-1.jpg" alt="win10 虚拟机空间占用" class="half-width-image" >

win10 我基本没安装什么东西就 20G+，麻叶，可怕。那一刻，我脑海里第一个想法就是优化空间占用。

## 压缩虚拟机空间

按照以前 Windows 上使用 VMware 的经验，在设置里可以动态配置分给虚拟机的磁盘空间大小。然而 Mac 的 Parallels Desktop 并不支持动态配置磁盘空间大小，而是用多少就是多少。
这条路行不通了。

然后在控制中心发现可以对镜像存档，存档完，占用空间缩小到一半 12.46G。之后使用的时候把镜像取消存档就可以正常运行。不过因为文件太大，所以这个过程慢的一批。

## 🚀 Windows Thin PC

转而一想，换成 Win7 可能体积就好了。在网上还搜到了微软出的 Windows Thin PC 这个基于 Win7 x86 的更小体积的系统。
安装+激活教程：

https://bitmingw.com/2017/04/24/windows-thin-pc-download-install-activate/

安装完系统后，占用空间在 3G 多一点。开心的一批 😏

由于我需要 IE11，所以需要将系统自带的 IE8 升级。花了几个小时研究和尝试了各种办法后，最终使用集成补丁工具成功安装 IE11 🎉

网友中文介绍帖子：

https://www.itsk.com/thread-402107-1-1.html

集成补丁工具官方原贴：

http://forum.oszone.net/thread-257198.html

自己又安装了 .NET 4.0，此时系统体积为 6.33G，可以接受。存档后体积为 2.43G，存档过程耗时 2m 30s，测试了 12306bypsss 可以正常运行 🚀🚀🚀

最后一步按照教程激活了系统。

整体流程如下：

1. 安装 Windows Thin PC

<a href="https://bitmingw.com/2017/04/24/windows-thin-pc-download-install-activate/">https://bitmingw.com/2017/04/24/windows-thin-pc-download-install-activate/</a>

2. 安装集成补丁（IE11）

<a href="https://www.itsk.com/thread-402107-1-1.html">https://www.itsk.com/thread-402107-1-1.html</a>

3. 激活系统

<a href="https://bitmingw.com/2017/04/24/windows-thin-pc-download-install-activate/">https://bitmingw.com/2017/04/24/windows-thin-pc-download-install-activate/</a>

下面是存档后的空间占用对比：

<img src="~@images/2020/1204-2.png" alt="空间占用对比" class="half-width-image" >

把 win10 虚拟机删掉后，相比于原来就可以清理出 20G 的空间了，美滋滋
