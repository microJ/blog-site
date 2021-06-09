---
title: 思路明确手写 Promise (三)：编写其它方法
date: 2021-04-20
categories:
  - Front-End
tags:
  - Promise
  - Promise 源码
  - 手写 Promise
---

编写 Promise 其它方法。

- `.prototype.finally()`
- `.resolve()`
- `.reject()`
- `.all()`
- `.allSettled()`
- `.any()`
- `.race()`

<!-- more -->

---

## .prototype.finally

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

```js
class MyPromise {
  // ..

  finally(onFinally) {
    return this.then(
      () => {
        onFinally()
      },
      () => {
        onFinally()
      }
    )
  }
}
```

## 静态方法

### Promise.resolve()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

```js
class MyPromise {
  // ..

  static resolve(val) {
    return new MyPromise((resolve, reject) => {
      if (isPromise(val)) {
        handleNextResolveOrNextRejectWithResultPromise(val, resolve, reject)
      } else {
        resolve(val)
      }
    })
  }
}
```

### Promise.reject()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

```js
class MyPromise {
  // ..

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      if (isPromise(reason)) {
        handleNextResolveOrNextRejectWithResultPromise(reason, resolve, reject)
      } else {
        reject(reason)
      }
    })
  }
}
```

### Promise.all()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

```js
class MyPromise {
  // ..

  static all(promiseList) {
    return new MyPromise((resolve, reject) => {
      const result = []
      let resolvedCount = 0

      const tryResolveAll = () => {
        if (resolvedCount === promiseList.length) {
          resolve(result)
        }
      }

      promiseList.forEach((p, i) => {
        if (isPromise(p)) {
          handleNextResolveOrNextRejectWithResultPromise(
            p,
            val => {
              resolvedCount++
              result[i] = val
              tryResolveAll()
            },
            reject
          )
        } else {
          resolvedCount++
          result[i] = p
          tryResolveAll()
        }
      })
    })
  }
}
```

### Promise.allSettled()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

```js
class MyPromise {
  // ..

  static allSettled(promiseList) {
    return new MyPromise(resolve => {
      const result = []
      let resolvedCount = 0

      const tryResolveAll = () => {
        if (resolvedCount === promiseList.length) {
          resolve(result)
        }
      }

      promiseList.forEach((p, i) => {
        if (isPromise(p)) {
          handleNextResolveOrNextRejectWithResultPromise(
            p,
            val => {
              resolvedCount++
              result[i] = {
                status: 'fulfilled',
                value: val,
              }
              tryResolveAll()
            },
            reason => {
              resolvedCount++
              result[i] = {
                status: 'rejected',
                reason: reason,
              }
              tryResolveAll()
            }
          )
        } else {
          resolvedCount++
          result[i] = {
            status: 'fulfilled',
            value: p,
          }
          tryResolveAll()
        }
      })
    })
  }
}
```

### Promise.any()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

```js
class MyPromise {
  // ..

  static any(promiseList) {
    return new MyPromise((resolve, reject) => {
      let settled = false
      let reasonList = []
      let rejectedCount = 0

      const tryResolveAny = val => {
        if (!settled) {
          resolve(val)
          settled = true
        }
      }

      const tryRejectAny = () => {
        if (!settled && rejectedCount === promiseList.length) {
          reject(new AggregateError(reasonList, 'All Promises rejected'))
          settled = true
        }
      }

      promiseList.some((p, i) => {
        if (isPromise(p)) {
          handleNextResolveOrNextRejectWithResultPromise(
            p,
            val => {
              tryResolveAny(val)
            },
            reason => {
              rejectedCount++
              reasonList[i] = reason
              tryRejectAny()
            }
          )
          if (p.promiseState === FULFILLED) {
            return true
          }
        } else {
          tryResolveAny(p)
          return true
        }
      })
    })
  }
}
```

### Promise.race()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

```js
class MyPromise {
  // ..

  static race(promiseList) {
    return new MyPromise((resolve, reject) => {
      let done = false
      const tryResolveRace = value => {
        if (!done) {
          resolve(value)
          done = true
        }
      }
      const tryRejectRace = reason => {
        if (!done) {
          reject(reason)
          done = true
        }
      }
      promiseList.some(p => {
        if (isPromise(p)) {
          handleNextResolveOrNextRejectWithResultPromise(p, tryResolveRace, tryRejectRace)
          if (p.promiseState !== PENDING) {
            return true
          }
        } else {
          resolve(p)
          return true
        }
      })
    })
  }
}
```
