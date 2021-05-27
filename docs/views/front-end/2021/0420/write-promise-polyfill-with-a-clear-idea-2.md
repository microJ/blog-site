---
title: 思路明确手写 Promise (二)：编写核心部分的 polyfill
date: 2021-04-20
categories:
  - Front-End
tags:
  - Promise
  - Promise 源码
  - 手写 Promise
---

基于 [上一篇](./write-promise-polyfill-with-a-clear-idea-1.html) 的分析梳理，我们能很容易写出核心部分的 polyfill。
包括：

1. `new Promise((resolve, reject) => {})`
2. `.then(onFulfilled, onRejected)`
3. `.catch(onRejected)`

<!-- more -->

---

## 编写 Promise 核心写法的 polyfill

### Promise 构造函数

根据 [已知](./write-promise-polyfill-with-a-clear-idea-1.html#tag1) ，很容易写出如下代码：

```js
const PENDING = 0
const FULFILLED = 1
const REJECTED = 2

class MyPromise {
  promiseState = PENDING
  /**
   * 需要传递给下一个 promise 的值
   * 赋值时机：
   * new Promise((resolve, reject) => {}) 调用 resolve/reject 时设置的值
   */
  promiseResult = undefined

  constructor(executor) {
    const resolve = result => {
      this.promiseResult = result
      this.promiseState = FULFILLED
    }
    const reject = result => {
      this.promiseResult = result
      this.promiseState = REJECTED
    }

    executor(resolve, reject)
  }

  then() {
    //
  }

  catch() {
    //
  }
}
```

### 处理外部函数的安全时的异常

声明异常处理函数：

```js
function rejectWhenAbnormal(runner, reject) {
  try {
    runner()
  } catch (err) {
    reject()
  }
}
```

并使用：

```js
class MyPromise {
  promiseState = PENDING

  constructor(executor) {
    // ...

    rejectWhenAbnormal(() => {
      executor(resolve, reject)
    }, reject)
  }

  // ...
}
```

此时，`new MyPromise((resolve, reject) => {})` 就已经支持了。

### .then 方法

根据 [已知](./write-promise-polyfill-with-a-clear-idea-1.html#tag2) ，很容易写出如下代码：

`.catch` 就是 `.then` 的一个变形：

```js
class MyPromise {
  // ...

  then(onFulfilled, onRejected) {
    //
  }

  catch(onRejected) {
    return this.then(() => {}, onRejected)
  }
}
```

来看 `.then` 方法：

1. 返回新的 `promise`

```js
class MyPromise {
  // ...

  then(onFulfilled, onRejected) {
    return new MyPromise(() => {})
  }
}
```

2. `.then` 在每一次调用的时候都会接收 `onFulfilled`/`onRejected`，将其保存起来，在当前 promise 状态变更时调用，并接收上个 promise 传过来的值；处理运行时异常

```js
class MyPromise {
  // ...
  /**
   * { handleFulfilled, handleRejected }
   * .then() 时候注册
   * promiseState 变更的时候执行
   */
  stateChangeHandlers = []

  then(onFulfilled, onRejected) {
    let nextResolve, nextReject
    const nextPromise = new MyPromise((resolve, reject) => {
      nextResolve = resolve
      nextReject = reject
    })

    // 改变 nextPromise 的状态并向其传递值
    const handleFulfilled = () => {
      rejectWhenAbnormal(() => {
        const promiseResult = onFulfilled()
        nextResolve(promiseResult)
      }, nextReject)
    }

    const handleRejected = () => {
      rejectWhenAbnormal(() => {
        const promiseResult = onRejected()
        nextResolve(promiseResult)
      }, nextReject)
    }

    // 根据状态提前处理对 nextPromise 的状态变更
    if (this.promiseState === PENDING) {
      this.stateChangeHandlers.push({ handleFulfilled, handleRejected })
    } else if (this.promiseState === FULFILLED) {
      handleFulfilled()
    } else {
      handleRejected()
    }

    return nextPromise
  }
}
```

3. 状态变更时，执行注册的 `stateChangeHandlers`

```js
const nextTick = setTimeout

class MyPromise {
  // ...

  _promiseState = PENDING
  get promiseState() {
    return this._promiseState
  }
  set promiseState(state) {
    if (this._promiseState !== PENDING) {
      return
    }
    this.promiseState = state

    this.stateChangeHandlers.forEach(handler => {
      if (state === FULFILLED) {
        nextTick(handler.handleFulfilled)
      } else {
        nextTick(handler.handleRejected)
      }
    })
  }
}
```

3. 向后面的 `promise` 传递值；如果传递的值是 `promise`，则使用这个 `promise` 的状态

```js
//
```

### .catch 方法

```js
class MyPromise {
  // ...

  then(onFulfilled, onRejected) {
    //
  }

  catch(onRejected) {
    return this.then(() => {}, onRejected)
  }
}
```
