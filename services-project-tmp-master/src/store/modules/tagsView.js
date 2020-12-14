import {
  TAGS_VIEW_DEL_OTHERS_VISITED_VIEWS,
  TAGS_VIEW_DEL_OTHERS_CACHED_VIEWS,
  TAGS_VIEW_DEL_ALL_VISITED_VIEWS,
  TAGS_VIEW_DEL_ALL_CACHED_VIEWS,
  TAGS_VIEW_UPDATE_VISITED_VIEW,
  TAGS_VIEW_ADD_CACHED_VIEW,
  TAGS_VIEW_ADD_VISITED_VIEW,
  TAGS_VIEW_DEL_CACHED_VIEW,
  TAGS_VIEW_DEL_VISITED_VIEW, TAGS_VIEW_DEL_ALL_VISITED_VIEWS_EXCE_FIX
} from '../mutation-types'

const state = {
  visitedViews: [], // 访问的路由
  cachedViews: [] // 缓存路由
}

const mutations = {
  [TAGS_VIEW_ADD_VISITED_VIEW](state, view) { // 添加 visitedView
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  [TAGS_VIEW_ADD_CACHED_VIEW](state, view) { // 添加 缓存view列表 在keep-alive中使用
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  [TAGS_VIEW_DEL_VISITED_VIEW](state, view) { // 删除选中的 visitedView
    for (let i = 0, l = state.visitedViews.length; i < l; i++) {
      const v = state.visitedViews[i]
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  [TAGS_VIEW_DEL_CACHED_VIEW](state, view) { // 删除 cachedView
    for (let i = 0, l = state.cachedViews.length; i < l; i++) {
      const item = state.cachedViews[i]
      if (item === view.name) {
        state.cachedViews.splice(i, 1)
        break
      }
    }
  },
  [TAGS_VIEW_DEL_OTHERS_VISITED_VIEWS](state, view) { // 删除 其他 visitedView
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  [TAGS_VIEW_DEL_OTHERS_CACHED_VIEWS](state, view) { // 删除 其他 cacheViews
    for (let i = 0, l = state.cachedViews.length; i < l; i++) {
      if (state.cachedViews[i] === view.name) {
        state.cachedViews = state.cachedViews[i]
        break
      }
    }
  },
  [TAGS_VIEW_DEL_ALL_VISITED_VIEWS_EXCE_FIX](state) { // 删除 所有 visitedViews (affix的 tags除外)
    // keep affix tags
    state.visitedViews = state.visitedViews.filter(tag => tag.meta.affix)
  },
  // 删除 所有 缓存views
  [TAGS_VIEW_DEL_ALL_CACHED_VIEWS](state) { state.cachedViews = [] },
  // 清空 visitedViews
  [TAGS_VIEW_DEL_ALL_VISITED_VIEWS](state) { state.visitedViews = [] },
  [TAGS_VIEW_UPDATE_VISITED_VIEW](state, view) {
    for (let i = 0, l = state.visitedViews.length; i < l; i++) {
      const v = state.visitedViews[i]
      if (v.path === view.path) {
        state.visitedViews[i] = Object.assign(v, view)
        break
      }
    }
  }
}

export default {
  state,
  mutations
}
