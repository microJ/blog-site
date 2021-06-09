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

基于手写 Promise polyfill 我们要知道些什么呢？

<!-- more -->

---

## 为什么要手写 Promise

不是为了写一个 polyfill 来用，而是为了了解 Promise 内部机理获得成长。

毕竟现在（2021 年 06 月 09 日），在 [微软亲自宣布 IE 生命周期终结](https://blogs.windows.com/windowsexperience/2021/05/19/the-future-of-internet-explorer-on-windows-10-is-in-microsoft-edge/) 和 [Vue3 宣布不兼容 IE](https://github.com/vuejs/rfcs/discussions/296) 之后，再搞搞 IE 就没有什么意义了。

## 没有银弹

我们的确是对 `Promise` 和其 `API` 进行了完整模拟。

但是由于 `microtask` 的兼容性问题，在低版本的 IE (<=10>) 上依旧不是真正的 `microtask`。

所以 polyfill 在运行时可能缺少真正的 `microtask` 支持。但是现在谁还管 IE 呢 🤣

## 是哪里异步了？

Promise 状态在变化的那一刻，会将 `then()/catch()` 接收的回调函数放入 `microtask` 等待执行。

而 `microtask` 是微任务，执行时机由 `Event Loop` 模型决定。

也就是说，在目前的所有 `Promise` API 中，除了 `then(onFulfilled)`/`then(onRejected)`/`finally(onFinally)` 之外的所有执行都是同步的。

## 异步的流程控制

通过 `Promise` 的机制，我们很容易就可以写出 [取消(cancellation)、中断(break)、暂停(pause)与恢复(resume)的 promise 代码](https://blog.expect2.cyou/views/front-end/2021/0415/promise-process-control-cancellation-break-pause-and-resume.html)
