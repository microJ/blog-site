---
title: setTimeout 最小执行间隔是 1ms 还是 4ms
date: 2021-10-19
categories:
  - Front-End
tags:
  - setTimeout
---

setTimeout 最小执行间隔是 1ms 或者 4ms

<!-- more -->

---

## 正文

先看下在 chrome 中的执行效果：

```js
var time = performance.now()
setTimeout(() => {
  console.log((performance.now() - time).toFixed() + 'ms')
  setTimeout(() => {
    console.log((performance.now() - time).toFixed() + 'ms')
    setTimeout(() => {
      console.log((performance.now() - time).toFixed() + 'ms')
      setTimeout(() => {
        console.log((performance.now() - time).toFixed() + 'ms')
        setTimeout(() => {
          console.log((performance.now() - time).toFixed() + 'ms')
          setTimeout(() => {
            console.log((performance.now() - time).toFixed() + 'ms')
          })
        })
      })
    })
  })
})

// 打印结果
//  1ms
//  3ms
//  4ms
//  6ms
//  10ms
//  14ms
```

可以看出，在 setTimeout 嵌套时，前 4 层的执行间隔在 1ms 或者 2ms，第五层以及之后执行间隔在 4ms 或者 5ms。

直接看 [whatwg 规范](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout) 中有关 setTimeout 的规定：

1. 如果设置的 timeout 小于 0，则设置为 0

2. 如果嵌套的层级超过了 5 层，并且 timeout 小于 4ms，则设置 timeout 为 4ms。

   _Chrome、Firefox 是第 5 层开始，Safari 是第 6 层开始，不过这不重要_

在实际浏览器实现时，没有超过嵌套层级的时候，chrome 等浏览器的最低延时是 1ms。非嵌套时亦是如此。

结论：

1. 所以在真正执行的时候，你并不能明确的确定 setTimeout(fn ,0) 的间隔具体是 1ms 还是 4ms。

2. 从执行间隔可以看到 setTimeout 的回调并非每次都是符合预期的

---

参考资料：

1. https://juejin.cn/post/6846687590616137742
