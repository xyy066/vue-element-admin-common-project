## 登录&&权限控制
  * routes 分为两部分
    0. main.js -> router.js -> 加载 初始 constantRoutes路由
        <br />
       constantRoutes // 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。
       <br />     
       asyncRoutes 为其他需要权限控制的路由，，会在 main.js -> permission.js 中动态添加
    1. main.js -> lang.js -> i18n 国际化
    2. main.js -> icons.js -> SvgIcon 组件初始化
    3. main.js -> permission.js 权限初始化
    <br />
        拦截 router -> 无token -> 跳转 login页
        -> 登录 -> store.user.login:dispatch()
        -> store&&Cookie存储->token -> 继续权限验证
        -> 无roles -> store.user.getInfo:dispatch()
        -> 得到roles -> 动态路由 根据 权限渲染 -> accessRoutes
        -> 跳转对应页面
    4. main.js -> utils/errorLog 错误日志 初始化
    5. main.js -> filters 全局 filter注入
    6. == main.js -> ../mock Mock模拟，，!!项目开发前 应删掉所有 mock ==
       <br />
       == 删除 main.js -> mockXHR -> ==
       <br />
       == 删除 ./mock 文件夹 -> ==
       <br />
       == vue.config.js 删除 devServer.proxy && devServer.after ==


## 样式穿透写法
深度作用选择器
如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符：
```vue
  <style scoped>
  .a >>> .b { /* ... */ }
  </style>
```
上述代码将会编译成：
```vue
.a[data-v-f3f3eg9] .b { /* ... */ }
```
有些像 Sass 之类的预处理器无法正确解析 >>>。
这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作。
[vue文档](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B7%E7%94%A8%E6%9C%AC%E5%9C%B0%E5%92%8C%E5%85%A8%E5%B1%80%E6%A0%B7%E5%BC%8F) < br />
示例：src/views/authManage/Aaa.vue

## 特定约定
* 组件中以 `$_` 开头的方法， 如：`vm.methods.$_xxx`，指明此方法会由父组件通过`parent.$ref.compName.$_xxx`来调用

## 开发列表类页面示例
src/views/systemSetting/Msg/Msg.vue

## 运行脚本
* #### 本项目
  * dev: 开发
  * build:prod 打包
