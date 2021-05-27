---
title: 思路明确手写 Promise (四)：我们应该知道的事情
date: 2021-04-20
categories:
  - Front-End
tags:
  - Promise
  - Promise 源码
  - 手写 Promise
---

基于手写 Promise plyfill 我们要知道些什么呢？

<!-- more -->

---

## 没有银弹

api 进行了完整模拟。microtask 兼容性问题。

polyfill 在运行时可能缺少真正的 microtask 支持

## 是谁在进行异步？异步的触发时机
