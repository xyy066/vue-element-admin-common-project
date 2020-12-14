import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import tagsView from './modules/tagsView'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app, // 应用层参数 ，， 现包括 边栏状态，语言设置
    tagsView, // 快捷导航栏 visitedViews : 用户访问过的页面 cachedViews : 实际 keep-alive 的路由。
    user,
    permission
  }
})

export default store
