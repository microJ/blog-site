---
title: document.querySelector 报错的问题
date: 2020-08-25
categories:
  - Front-End
tags:
  - querySelector
---

## 可爱的问题

今天遇到一个问题，挺可爱的，打开这个文章 [一个文件配置解决 NPM/Yarn 依赖安装失败和速度慢的问题](/views/front-end/2020/0824-speed-up-npm-install.html)，控制台报错了：
`DOMException: Failed to execute 'querySelector' on 'Document': '#5f447c564bdcde0006a8ffd6' is not a valid selector.`

![wrong image](~@images/2020/0825-1.png)

## 解决方案

我一眼就看出来你不是。。不是以字母开头，使用 `document.getElementById('idValue')` 或者 `document.querySelector("[id='idValue']")` 就可以顺利解决问题

CSS 规定 ID 选择器，[必须是 `#` 接标识符](https://www.w3.org/TR/CSS22/selector.html#id-selectors)，而[标识符的规则必须是非数字开头](https://www.w3.org/TR/CSS22/syndata.html#value-def-identifier)。

## 延伸思考

### 为什么 HTML 中可以存在

HTML5 中 [允许数字作为起始字符](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute)：

> There are no other restrictions on what form an ID can take; in particular, IDs can consist of just digits, start with a digit, start with an underscore, consist of just punctuation, etc.

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/id) 对此也有描述

> 使用除 ASCII 字母、数字、\_、- 和 . 以外的字符可能会造成兼容性问题，因为 HTML 4 中不允许使用它们。虽然这个限制在 HTML5 中被解除了，但为兼容性考虑 ID 应该以字母开头。

而且，非字母开头会给开发造成困扰：

1. 如果想设置 `id='1'` 的样式

只能 `[id='1'] { /** CSS here */ }` 这样去写 CSS

2. 如果想获取元素 `id='1'` 的 DOM

`document.querySelector('#1')` 会报错 ，需要使用 `document.getElementById('1')` 或者 `document.querySelector("[id='1']")` 获取到元素

## 结论：

综合来看，推荐大家还是按照 [CSS 标识符的规范](https://www.w3.org/TR/CSS22/syndata.html#value-def-identifier) 去书写选择器鸭。但是如果是公共库，在获取元素的时候还是使用兼容性写法吧。

CSS 标识符的规范：

> In CSS, identifiers (including element names, classes, and IDs in selectors) can contain only the characters [a-zA-Z0-9] and ISO 10646 characters U+0080 and higher, plus the hyphen (-) and the underscore (\_); they cannot start with a digit, two hyphens, or a hyphen followed by a digit. Identifiers can also contain escaped characters and any ISO 10646 character as a numeric code (see next item). For instance, the identifier "B&W?" may be written as "B\&W\?" or "B\26 W\3F".

<br>参考链接：

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/id

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors

https://www.w3.org/TR/CSS22/
