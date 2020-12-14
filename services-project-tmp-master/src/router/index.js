import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1 默认false
 * alwaysShow: true               当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 *
 * redirect: 'noredirect'         当设置 noredirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题 而且要跟组件名一致
 * meta : {
    redNumber: 100 (* 06_21新增)   当有此字段时,则显示对应 小红点数
    roles: ['admin','editor']    设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  当在声明路由是 添加了 Affix 属性，则当前tag会被固定在 tags-view中（不可被删除）。
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/example/list'  可以指定 路由 active 时， sideBar 的对应选项发亮 如： 综合实例->创建文章->文章列表->编辑文章
  }
 */

/**
 * constantRoutes
 * 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。
 * 所有权限都通过
 */
export const constantRoutes = [
  { // 重定向页面
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index'),
        meta: { noCache: true }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { noCache: true }
  },
  { // 404页面
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true,
    meta: { noCache: true }
  },
  { // 401权限页
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true,
    meta: { noCache: true }
  },
  { // 首页
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
