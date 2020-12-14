/**
 * 存放用户资料
 * token: 登录态
 * roles: []用户角色数组 如 ['admin', 'editor']
 * */
import { login, logout } from '@/api/user'
import {getToken, setToken, removeToken, getUsername, setUsername} from '@/storage/auth'
import { resetRouter } from '@/router'
import {
  USER_SET_TOKEN,
  USER_SET_ROLES,
  USER_SET_NAME, TAGS_VIEW_DEL_ALL_VISITED_VIEWS, TAGS_VIEW_DEL_ALL_CACHED_VIEWS
} from '../mutation-types'
import { user_login, user_logout, user_resetToken } from '../actions'

const state = {
  token: getToken(),
  name: getUsername(), // 用户名称
  /**
   * 用此字段 判断 是否已经 获取 菜单树,
   * 当 其值为 ['xxx']  roles.length > 0 时， 判断为 已获取权限树
   * */
  roles: []
}

const mutations = {
  [USER_SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [USER_SET_ROLES]: (state, roles) => {
    state.roles = roles
  },
  [USER_SET_NAME](state, name) { state.name = name }
}

const actions = {
  // user login
  [user_login]({ commit }, userInfo) {
    const { username, password, yzm} = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, code: yzm })
        .then(response => {
          const { data } = response
          commit(USER_SET_NAME, data.username) // 回填用户名
          commit(USER_SET_TOKEN, data.token) // 回填token
          setToken(data.token)
          setUsername(data.username)
          resolve()
        })
        .catch(error => reject(error))
    })
  },

  // user logout
  [user_logout]({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit(USER_SET_TOKEN, '')
        commit(USER_SET_ROLES, [])
        commit(TAGS_VIEW_DEL_ALL_VISITED_VIEWS, null, { root: true })
        commit(TAGS_VIEW_DEL_ALL_CACHED_VIEWS, null, { root: true })
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  [user_resetToken]({ commit }) {
    return new Promise(resolve => {
      commit(USER_SET_TOKEN, '')
      commit(USER_SET_ROLES, [])
      commit(TAGS_VIEW_DEL_ALL_VISITED_VIEWS, null, { root: true })
      commit(TAGS_VIEW_DEL_ALL_CACHED_VIEWS, null, { root: true })
      removeToken()
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions
}
