---
title: Mac 系统中 Python 运行版本的切换和管理
date: 2020-08-18
sidebar: "auto"
categories:
  - Tech
tags:
  - Mac
  - Python
  - Version Control
---

## 问题描述

Mac 系统自带 Python 2，使用 `python -V` 可以查看当前运行版本。笔者尝试使用 `brew install python` 发现升级到 Python 3

## 解决方案

最后使用以下方法解决问题：

1. `brew install pyenv`

安装 `pyenv` 库，类似 `nvm` 的 Python 版本管理工具

2. `pyenv install 3.8.5`

3. `pyenv global 3.8.5`

设置 Python 3.8.5 版本为系统默认版本

4. 将 `pyenv` 控制命令设置启动

如果使用 `zsh`：
`echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n eval "$(pyenv init -)"\nfi' >> ~/.zshrc`

否则：
`echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n eval "$(pyenv init -)"\nfi' >> ~/.bash_profile`

5. 重启 Terminal 后生效。
   `wich python` 和 `python -V` 查看配置结果。

```bash
$ which python
/Users/j/.pyenv/shims/python

$ python -V
Python 3.8.5
```

## 总结

类似 `nvm` 管理 `Node.js` 版本。`pyenv` 对 `Python` 版本进行精准管理。

<br>

参考文章：

1. [python-3-default-mac](https://opensource.com/article/19/5/python-3-default-mac)
