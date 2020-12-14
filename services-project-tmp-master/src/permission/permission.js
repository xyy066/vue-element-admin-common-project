import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/storage/auth' // get token from cookie
import { permission_getAccessRoutes, user_resetToken } from "@/store/actions"
import {
  USER_SET_ROLES
} from '../store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 路由白名单， 用于指定 没有token 也能浏览的页面
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

/**
 * 路由拦截
 * 做权限判断
 * */
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // determine whether the user has logged in
  const hasToken = store.state.user.token || getToken()
  if (!hasToken) { // 无token
    // 路由 在 token 白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      NProgress.done()
      return next()
    }
    // 其他需要 token的路由 -> 重定向到 login页
    next(`/login`)
    NProgress.done()
    return
  }
  // 有token
  if (to.path === '/login') { // 在登录页, 重定向到 首页
    next({ path: '/' })
    NProgress.done()
    return
  }
  // 检测权限
  // determine whether the user has obtained his permission roles through getInfo
  const roles = store.state.user.roles
  if (roles && roles.length > 0) return next()
  // 获取roles并动态加载路由
  try {
    // 现在用 roles 是否为空列表 来 判断 是否已经获取菜单树
    const roles = ['admin'];
    store.commit(USER_SET_ROLES, roles)
    // generate accessible routes map based on roles
    // 动态添加路由
    const accessedRoutes = await store.dispatch(permission_getAccessRoutes, roles)
    router.addRoutes(accessedRoutes)

    // hack method to ensure that addRoutes is complete
    // set the replace: true, so the navigation will not leave a history record
    next({ ...to, replace: true })
  } catch (error) {
    // 若 token 不存在，， 则为 已被其他地方清除调了登录态，， 则 此处 无需再去处理 跳转
    if (!getToken()) {
      NProgress.done()
      return next()
    }
    console.log(error)
    // remove token and go to login page to re-login
    await store.dispatch(user_resetToken)
    Message.error(error || '服务器响应错误，请重新登录')
    next(`/login`)
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
