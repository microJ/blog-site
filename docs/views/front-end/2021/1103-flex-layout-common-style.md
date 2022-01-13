---
title: 优雅高效的使用 Flex 布局
date: 2021-11-03
categories:
  - Front-End
tags:
  - Flex
  - Less.js
---

让 Flex 使用优雅且高效

<!-- more -->

---

## 描述

如今最便利的布局方式便是 Flex 了，使用简单且[兼容性 OK](https://caniuse.com/flexbox)。

我们可以按照**人在空间中的方向感知**进行规则命名： `flex-{排布类型}-{水平对齐类型}-{上下对齐类型}`

这套规则的好处就是：

1. 面向使用者友好，不需要特别了解 Flex 背后的细节
2. 直观可维护

排布类型（方向）：

- row

  在水平方向上排布成行

- col

  在垂直方向上排布成列

水平对齐类型：

- left
- center
- right
- between
- around
- evenly

垂直对齐类型：

- top
- middle
- bottom
- between
- around
- evenly

当然 `between`、`around`、`evenly` 三个属性只能设置在**排布方向**（主轴）上。

组合成以下布局：

排布成行 row:

- flex-row-left-top
- flex-row-left-middle
- flex-row-left-bottom
- flex-row-center-top
- flex-row-center-middle
- flex-row-center-bottom
- flex-row-right-top
- flex-row-right-middle
- flex-row-right-bottom
- flex-row-between-top
- flex-row-between-middle
- flex-row-between-bottom
- flex-row-around-top
- flex-row-around-middle
- flex-row-around-bottom
- flex-row-evenly-top
- flex-row-evenly-middle
- flex-row-evenly-bottom

排布成列 col:

- flex-col-left-top
- flex-col-left-middle
- flex-col-left-bottom
- flex-col-left-between
- flex-col-left-around
- flex-col-left-evenly
- flex-col-center-top
- flex-col-center-middle
- flex-col-center-bottom
- flex-col-center-between
- flex-col-center-around
- flex-col-center-evenly
- flex-col-right-top
- flex-col-right-middle
- flex-col-right-bottom
- flex-col-right-between
- flex-col-right-around
- flex-col-right-evenly

其中为了方便可以将:

1. `flex-row-center-middle`、`flex-col-center-middle` 简写成 `flex-center`
2. `flex-row-left-middle` 简写成 `flex-row-`
3. `flex-col-center-top` 简写成 `flex-col-`
