---
title: 思路明确手写 Promise (一)：分析 Promise 核心写法
date: 2021-04-20
categories:
  - Front-End
tags:
  - Promise
  - Promise 源码
  - 手写 Promise
---

Promise 的核心其实就在于几点：

1. 创建实例 romise:

   `var p = new Promise(executor)`

2. promise 的状态变化时，触发 then/catch 注册的回调函数:

   `p.then(onFulfilled, onRejected)`

   `p.catch(onRejected)`

3. 函数运行时的异常处理:

   `try{ .. } catch(err){ onRejected(err) }`

4. 回调函数的异步执行

结合 [promise 机制图](https://mdn.mozillademos.org/files/8633/promises.png)，手写一个 Promise 也是不难的。

<!-- more -->

---

整体篇节：[一](./write-promise-polyfill-with-a-clear-idea-1.html)、[二](./write-promise-polyfill-with-a-clear-idea-2.html)、[三](./write-promise-polyfill-with-a-clear-idea-3.html)、[四](./write-promise-polyfill-with-a-clear-idea-4.html)

源码：https://github.com/microJ/toy-promise

## 分析 Promise 核心写法

### 创建 Promise

```js
var p = new Promise(executor)
function executor(resolve, reject) {
  resolve(result)
  // reject()
}
```

<div id="tag1"></div>

已知：

1. Promise 是构造函数，接收一个执行函数
2. new Promise 后，返回一个 promise 实例，拥有 .then/.catch 方法
3. 执行函数接受 resolve/reject 函数用来改变返回的 promise 状态，并传递值
4. 如果执行函数运行时抛出异常，则变更 promise 状态为 rejected

### then/catch

```js
var p = Promise.resolve()

var p1 = p.then(
  res => {
    return value
  },
  err => {
    return value
  }
)

var p2 = p1.catch(err => {
  // 捕获前面 promise 链中没有被catch的错误
  return value
})

// 一般情况下我们都是链式写法
p.then(..).catch(..)

var p3 = Promise.resolve()
var p4 = Promise.resolve().then(() => p3)
console.log(p3 === p4) // false
```

<div id="tag2"></div>

已知：

1. 实例 promise 上有 then / catch 方法

2. `.then() / .catch()` 方法执行后**始终返回一个新的 promise**

3. `.then(onFulfilled) / catch(onRejected)` 接收的回调函数会在当前 promise 状态发生变更时进行调用

4. `.then(onFulfilled) / catch(onRejected)` 中 `onFulfilled / onRejected` 在被调用时时：

   1. 通过 `return value` 的方式，把 .then() 返回的 promise 状态变更为 `fulfilled`，并将 `value` 传递给返回的 promise，并有其 onFulfilled 接收

      如果 value 是个 promise，则 `.then() / .catch()` 返回的 promise 的状态变更跟随 value 的状态变更

   2. 如果函数内部抛出异常，就将异常信息传给返回的 promise，并由其 onRejected 接收

## 总结

基于以上已知内容，实现的核心在于：

1. 创建实例 promise
2. promise 的状态变化时，触发 then/catch 注册的回调函数，并传递结果
3. 函数运行时的异常处理
4. 回调函数的异步执行

---

参考资料：

1. https://promisesaplus.com/
2. https://github.com/microJ/toy-promise
