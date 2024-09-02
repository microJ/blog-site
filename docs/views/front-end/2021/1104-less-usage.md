---
title: Less 编程思想之快速创建 flex 通用样式
date: 2021-11-04
categories:
  - Front-End
tags:
  - Flex
  - Less
---

Less 就该这么用

<!-- more -->

> _本文以 class 样式为例，id 样式同理_

---

先看下一些 Less 基础语法。

## 数据

几个共性：

**1. 数据可覆盖**

同层级内后定义的可以覆盖前面定义的

**2. 惰性求值**

声明和访问的先后顺序没有要求

**3. 作用域**

数据会依次查找上层作用域

### 变量

**声明：**

`@x: xx;`

**使用：**

`@x`

**声明：**

```less
@colorRed: red;
@border: 1px solid #ccc;
.colorVars() {
  @colorYellow: yellow;
}
@var: {
  color: purple;
  @size: 12px;
};

.css1 {
  color: @colorRed;
}
.css2 {
  color: .colorVars[ @colorYellow];
}
.css3 {
  border: @border;
}
.css4 {
  color: @var[color];
  fontsize: @var[ @size];
}
```

输出：

```css
.css1 {
  color: red;
}
.css2 {
  color: yellow;
}
.css3 {
  border: 1px solid #ccc;
}
.css4 {
  color: purple;
  fontsize: 12px;
}
```

**向选择器中插值：**

```less
@selector: title;
.@{selector} {
  font-size: 16px;
}
```

```css
.title {
  font-size: 16px;
}
```

### 函数：

```less
.basicFont (@size: 12px) {
  color: black;
  font-size: @size;
}

.css3 {
  .basicFont();
}
```

输出：

```css
.css3 {
  color: black;
  font-size: 12px;
}
```

### 选择器列表

```less
.base {
  font-size: 12px;
}
.p:extend(.base) {
  color: red;
}
```

输出：

```css
.base,
.p {
  font-size: 12px;
}
.p {
  color: red;
}
```

## 条件

### when (condition) { result }

用于选择器，类似于 JS 的 `if(){}`：

```less
@var: true;
.css when (@var = true) {
  color: red;
}
.css1 when (false) {
  color: yellow;
}
& when (true) {
  .css2 {
    color: yellow;
  }
}
```

输出：

```css
.css {
  color: red;
}
.css2 {
  color: yellow;
}
```

其中 condition 可以为复杂表达式:

- when (condition1) and (condition2) and ... { result }
  实现 `与` 逻辑

- when (condition1) , (condition2) , ... { result }
  实现 `或` 逻辑

- when not conditions { result }
  实现 `非` 逻辑

```less
// 与
.css1 when (true) and (true) and (true) {
  color: red;
}

// 或
.css2 when (false), (false), (true) {
  color: yellow;
}

// 非
.css3 when not (true) and (true) {
  color: green;
}
.css4 when not (false) and (true) {
  color: purple;
}
```

输出：

```css
.css1 {
  color: red;
}
.css2 {
  color: yellow;
}
.css4 {
  color: purple;
}
```

### if(condition, resultOfTrue, resultOfNotTrue)

```less
@color1: if(true, yellow, green);
@color2: if(false, yellow, green);
@color3: if(1, yellow, green);

.css1 {
  color: @color1;
}
.css2 {
  color: @color2;
}
.css3 {
  color: @color3;
}
```

输出：

```css
.css1 {
  color: yellow;
}
.css2 {
  color: green;
}
.css3 {
  color: green;
}
```

### 需要注意

1. when / if 语句中的条件表达式，其返回值一定要是布尔值。因为此处**不会**像 JS 一样发生隐式类型转换

2. when 用于选择器；if 用于赋值。

## 循环

```less
```

```css
```
