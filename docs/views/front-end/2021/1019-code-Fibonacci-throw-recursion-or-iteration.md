---
title: 循环比递归更适合实现斐波那契数列
date: 2021-10-19
categories:
  - Front-End
tags:
  - Fibonacci
  - 斐波那契
  - 递归
  - 尾递归
  - 循环
---

递归和循环可以互换。大部分场景推荐使用循环代替递归。

<!-- more -->

斐波那契数列：
| 索引 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | ... |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 值 | 0 | 1 | 1 | 2 | 3 | 5| 8 | 13 | ... |

---

## 递归

```js
function fibSimple(n) {
  return n <= 1 ? n : fibSimple(n - 1) + fibSimple(n - 2)
}
```

上述递归算法很符合直觉，但是很耗时。

```js
/**
 * 斐波那契 - 尾递归
 * 从左向右累加
 * @param n {number} 倒序计数，作为终止条件
 * @param prevResult {number} 上一位结果
 * @param result {number} 当前结果
 */
function fibTail(n, prev = 0, result = 1) {
  return n <= 1 ? result : fibTail(n - 1, result, prev + result)
}
```

改写为上面的尾递归写法。并且通过（continuation-pass style）优化函数调用次数。
尾递归优化（proper tail calls）目前只有 Safari 支持。所以再其他浏览器上还是会有有爆栈的问题。

## 循环

众所周知：

1. 递归可能会爆栈

2. 非尾递归开销大

3. [V8 默认不支持尾递归优化](https://node.green/#ES2015-optimisation-proper-tail-calls--tail-call-optimisation-)

那么我们尝试下用循环来实现：

```js
/**
 * 循环 - while
 * @param n 计数，从0开始
 */
function fibLoop(n) {
  if (n <= 1) return n

  let prev = 0
  let result = 1
  while (n-- > 1) {
    ;[prev, result] = [result, prev + result]
  }
  return result
}
```

把递归变成循环，就解决了爆栈的问题。

## 蹦床函数

除了循环写法，使用蹦床函数可以更直观解决递归写法爆栈的问题。

```js
function trampoline(fn) {
  return (...args) => {
    let result = fn(...args)
    while (typeof result === 'function') {
      result = result()
    }
    return result
  }
}

var fib = trampoline(function _fib(n, prevResult = 0, result = 1) {
  return n <= 0 ? 0 : n === 1 ? result : () => _fib(n - 1, result, result + prevResult)
})
```

以上写法的本质就是每次 `_fib` 函数运行会返回一个新的函数，由 `trampoline` 函数继续调用。这样每次 `_fib` 函数的调用都会出栈。

### 异步蹦床

如果是异步函数的递归，会爆栈吗？答案是不会。

```js
async function fibAsync(n) {
  return n <= 1 ? n : (await fibAsync(n - 1)) + (await fibAsync(n - 2))
}
```

`fibAsync` 的返回值是一个 `pending promise`，函数出栈。所以不会爆栈。

当然，蹦床函数也可以很容易处理异步函数递归：

```js
function betterTrampoline(fn) {
  return async (...args) => {
    let result = fn(...args)

    while (result) {
      if (typeof result.then === 'function') {
        result = await result
      } else if (typeof result === 'function') {
        result = result()
      } else {
        break
      }
    }

    return result
  }
}

var fibAsync = betterTrampoline(function fib(n, prev = 0, result = 1) {
  return n <= 0 ? 0 : n === 1 ? result : async () => fib(n - 1, result, result + prev)
})
```

---

参考资料：

1. https://marmelab.com/blog/2018/02/12/understanding-recursion.html
