/**
 * permission_getAccessRoutes 在 src/permission/permission.js 中有使用
 * state.routes 在 src/layout/components/TagsView/index.vue 中有使用
 * */
import {constantRoutes} from '@/router'
import {PER_SET_HAS_HANDLE_ROUTES, PERMISSION_SET_ROUTES} from "../mutation-types"
import { permission_getAccessRoutes } from '../actions'
import { authGetMenu } from '@/api/user'
import {addEditWhiteList, finalErrorRoutes, needAuthRoutes} from "@/router/asyncRoutes"
import deepClone from "@pro_common/utils/deepClone";

/**
 * 根据后台返回 路由数组 创建 授权路由arr
 * @param {array} leftServerList 剩余的后台返回路由数组
 * @param {object} needAuthRoutes 前端维护的 authRoutes Map
 * @param {object=} insertedMap <string, object> key: path, value 前端对应路由副本
 * @param {array=} result 生成的 路由数组
 * */
function createAuthRoutes(leftServerList, needAuthRoutes, insertedMap = {}, result = []) {
  const thisRoundHandleIdxs = [] // 本次执行 已处理的 leftServerList下标，，用于最后 推出
  leftServerList.forEach((item, index) => {
    const path = item.path
    const itemId = item.id
    // 找到前端对应路由
    const frontRoute = needAuthRoutes[path]
    if (!frontRoute) return
    // 有前端路由
    const frontRouteCopy = deepClone(frontRoute)
    if (frontRouteCopy.meta) {
      frontRouteCopy.meta.id = itemId // 记录路由id到 meta
    }
    const itemParentId = item.parentId
    if (itemParentId == 0) { // 第一层
      insertedMap[itemId] = frontRouteCopy // 记录插入地址
      result.push(frontRouteCopy)
      thisRoundHandleIdxs.push(index)
      return
    }
    // 非首层
    const parentNode = insertedMap[itemParentId] // 其父id 在result 中 地址
    if (parentNode) { // 其父id 已插入
      if (!parentNode.children) parentNode.children = []
      insertedMap[itemId] = frontRouteCopy
      parentNode.children.push(frontRouteCopy)
      thisRoundHandleIdxs.push(index)
    }
    // 其父Id 不在 已处理结果中
  })
  if (!thisRoundHandleIdxs.length) {
    console.log(`*****以下server返回节点，无对应 parentId*****`)
    console.log(leftServerList)
    return result
  }
  for (let i = thisRoundHandleIdxs.length; i--;) { // [1,2,3, 7, ...]
    leftServerList.splice(thisRoundHandleIdxs[i], 1)
  }
  if (leftServerList.length) { // 依然有 server路由未处理
    return createAuthRoutes(leftServerList, needAuthRoutes, insertedMap, result)
  }
  // 处理完毕
  return result
}

/**
 * 处理 不在 server 菜单数据库中 的编辑，新增页面
 * @param {array} hasAuthRoutes server菜单 处理后 的路由树
 * @param {object} addEditWhiteList  编辑 新增 页面 不在菜单中的 页面，做成 白名单
 * @return {boolean} 返回一个boolean值 null:找不到 object:找到的节点
 * */
function solveAddEditWhiteList(hasAuthRoutes, addEditWhiteList) {
  const maxLevelCount = 1 // 现在先写死， 只遍历 第一层，， 后面为 多层结构时， 再处理
  function findParentRoute(routes, parentPath, level = 0) { // 根据 parentPath 找到 相应节点
    if (++level > maxLevelCount) return null // 层级超过 最大层级
    for (let i = 0, l = routes.length; i < l; i++) {
      const item = routes[i]
      if (item.path && item.path == parentPath) return item // 断言
      if (item.children) { // 继续遍历
        const result = findParentRoute(item.children, parentPath, level)
        if (result) return result // 断言
      }
    }
    return null // 没有找到节点
  }
  Object.keys(addEditWhiteList).forEach(parentPath => {
    const route = findParentRoute(hasAuthRoutes, parentPath)
    if (!route) return
    // 有对应节点
    if (!route.children) route.children = []
    route.children = route.children.concat(deepClone(addEditWhiteList[parentPath]))
  })
}

const state = {
  routes: [], // 全部路由 无权限路由 + 权限路由
  hasHandleRoutes: false // 已经请求 getMenu 并 处理菜单完毕Flag
}

const mutations = {
  [PERMISSION_SET_ROUTES](state, routes) {
    state.routes = routes
  },
  [PER_SET_HAS_HANDLE_ROUTES](state, bool) {
    state.hasHandleRoutes = bool
  }
}

const actions = {
  // 生成路由
  async [permission_getAccessRoutes]({ commit }) {
    const { data: serverList } = await authGetMenu()
    /** 获取菜单后 链接 编辑修改等页面的白名单 */
    // 过滤 有权限路由
    const hasAuthRoutes = createAuthRoutes(serverList, needAuthRoutes)
    // 添加 编辑新增 等不在菜单上，但要做 路由的 页面
    solveAddEditWhiteList(hasAuthRoutes, addEditWhiteList)
    // 处理完之后的路由 不包括 白名单路由 如： 404 401 首页等，，， 包括 finalErrorRoutes
    const doneRoutes = hasAuthRoutes.concat(finalErrorRoutes)
    // 记录 总路由
    commit(PERMISSION_SET_ROUTES, constantRoutes.concat(doneRoutes))
    // 标记 已完成
    commit(PER_SET_HAS_HANDLE_ROUTES, true)
    return doneRoutes
  }
}

export default {
  state,
  mutations,
  actions
}
