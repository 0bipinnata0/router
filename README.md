# 路由的三种实现方式(副作用)

1. pathname (location.pathname)
2. hash (location.hash)
3. storage (localstorage)

## 状态的初始化

## 状态的改变(发布订阅)

-> 抽象层
BrowserRouter, HashRouter, MemoryRouter 负责副作用的 update

Routes
收集 Route 子路由
监听当前 route 切换 ui

### 树状结构解析

1. 校验
   1.1 过滤非 Route
   1.2 过滤无权限用户
