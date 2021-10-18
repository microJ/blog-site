---
title: WinXP 微信防撤回
date: 2021-10-10
categories:
  - Tech
tags:
  - 微信
  - WinXP
---

仅用于研究。

<!-- more -->

---

win10 系统可以直接使用 [RevokeMsgPatcher](https://github.com/huiyadanli/RevokeMsgPatcher)

## 工具准备

1. 安装工具 [WinHex](https://www.jb51.net/softs/205687.html)

## 找特征码

1. 确定微信版本
2. 打开 [代码](https://github.dev/huiyadanli/RevokeMsgPatcher/blob/c503984745f209e3fe9d16172528a72a8688f4f4/RevokeMsgPatcher.Assistant/JsonData.cs)，找到 Wechat() 方法。
   根据 StartVersion 和 EndVersion 确定特征码。

以微信版本 `3.3.6.15` 为例，对应的特征码为 `0085C07432B93F3F95118A`，替换码为 `0085C0EB32B93F3F95118A`

## 进行替换

1. 完全退出微信
1. 使用 WinHex 打开微信安装目录下的 WeChatWin.dll
1. 点击菜单栏--搜索--替换 16 进制数值--弹出替换窗口，用替换码替换掉特征码
1. 点击菜单栏--文件--保存--是

所有工作就完成了。

## Mac 用户

可以使用 [WeChatTweak](https://github.com/Sunnyyoung/WeChatTweak-macOS)

_可惜了这个 MacOS 项目：https://github.com/MustangYM/WeChatExtension-ForMac/issues_

---

参考资料：

1. https://www.52pojie.cn/forum.php?mod=viewthread&tid=1352301
2. https://github.com/huiyadanli/RevokeMsgPatcher
