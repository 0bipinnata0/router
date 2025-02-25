[![npm package][npm-badge]][npm] [![build][build-badge]][build]


[npm-badge]: https://img.shields.io/npm/v/@0bipinnata0/router.svg
[npm]: https://www.npmjs.org/package/@0bipinnata0/router

# React Router 实现

## 路由的三种实现方式

本项目实现了三种不同的路由方式，每种方式都有其特定的使用场景：

1. BrowserRouter (location.pathname)
   - 使用 HTML5 History API
   - 通过监听 popstate 事件实现路由状态同步
   - 使用 history.pushState 更新 URL
   - 适合需要干净URL的现代Web应用

2. HashRouter (location.hash)
   - 基于 URL hash 实现路由
   - 通过修改 location.hash 触发路由变化
   - 兼容性好，适合不支持 History API 的旧浏览器

3. MemoryRouter (localStorage)
   - 使用 localStorage 存储路由状态
   - 完全基于内存的路由实现
   - 适合非浏览器环境或需要持久化路由状态的场景

## 核心实现原理

### 状态管理

1. 状态初始化
   - BrowserRouter: 使用 location.pathname
   - HashRouter: 使用 location.hash
   - MemoryRouter: 使用 localStorage 存储的路径

2. 状态变更机制
   - 采用发布订阅模式
   - 通过 routeEmit 统一管理路由事件
   - 各路由组件监听状态变化并更新UI

### 组件体系

1. 路由容器组件
   - BrowserRouter/HashRouter/MemoryRouter
   - 负责路由状态的初始化和更新
   - 提供路由上下文

2. Routes 组件
   - 收集和管理 Route 子组件
   - 监听路由变化并更新UI
   - 实现路由匹配和渲染

3. Route 组件
   - 定义路由路径和对应组件
   - 支持嵌套路由
   - 支持路由参数

4. Link 组件
   - 提供声明式的路由导航
   - 触发路由状态更新

5. Outlet 组件
   - 渲染子路由内容
   - 实现路由嵌套

### 路由匹配逻辑

1. 路由校验
   - 过滤非 Route 组件
   - 支持权限控制

2. 路径匹配
   - 支持精确匹配和模式匹配
   - 处理路由参数
   - 支持通配符路由（404页面）

## 使用示例

```jsx
<Router>
  <Link to="/">主页</Link>
  <Link to="/login">登录</Link>
  
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />}>
      <Route path="course" element={<Course />}>
        <Route path=":id" element={<Detail />} />
      </Route>
    </Route>
  </Routes>
</Router>
```

## API 参考

- BrowserRouter: 基于 History API 的路由实现
- HashRouter: 基于 URL hash 的路由实现
- MemoryRouter: 基于 localStorage 的路由实现
- Link: 路由导航组件
- Route: 路由配置组件
- Routes: 路由容器组件
- Outlet: 子路由渲染组件
- useParams: 获取路由参数 Hook
- useNavigate: 编程式导航 Hook

[npm-badge]: https://img.shields.io/npm/v/your-package-name.svg
[npm]: https://www.npmjs.org/package/your-package-name
[build-badge]: https://github.com/your-username/your-repo/actions/workflows/ci.yml/badge.svg
[build]: https://github.com/your-username/your-repo/actions/workflows/ci.yml
