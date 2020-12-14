/**
 * asyncRoutes
 * 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面。
 * the routes that need to be dynamically loaded based on user roles
 */
import Layout from '@/layout'

/**
 * 需要 getMenu 后 比对的 routes
 * !!注意 这些路由 都需要 path 为 全路径
 * 与 serverRes[].path 做 全量对比
 * */
// needAuthRoutes
export const needAuthRoutes = {
  /**
   * 开发示例
   * */
  '/devMgr': {
    path: '/devMgr',
    redirect: '/devMgr/cardExample',
    component: Layout,
    meta: { title: '开发示例', icon: 'documentation', noCache: true, affix: false }
  },
  '/devMgr/cardExample': {
    path: '/devMgr/cardExample',
    name: 'DevMgrCardExample',
    component: () => import('@/views/devMgr/CardExample/CardExample.vue'),
    meta: { title: '卡片示例', noCache: true, affix: false }
  }
}

/**
 * 编辑 新增 其他 页面 不在菜单中的 页面，做成 白名单
 * key: parent路径
 * value: []object -> 对应parent 的白名单节点
 * */
export const addEditWhiteList = {
  // '/systemSetting': [ // 可按照此格式添加
  //   {
  //     path: '/systemSetting/msgAdd',
  //     component: () => import('@/views/systemSetting/Msg/AddEdit.vue'),
  //     hidden: true,
  //     meta: { title: '新增消息', noCache: true, affix: false }
  //   }
  // ],
}

/**
 * 404等 最后插入页面
 * */

export const finalErrorRoutes = [
  /**
   * 错误日志&& 404写在最后
   * */
  { // 错误日志 导航
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    children: [
      {
        path: 'log',
        component: () => import('@/views/errorLog/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug', noCache: true }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    meta: { noCache: true }
  }
]
