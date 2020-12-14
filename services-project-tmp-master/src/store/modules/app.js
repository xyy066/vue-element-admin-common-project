import Cookies from 'js-cookie'
import {
  APP_TOGGLE_SIDEBAR,
  APP_CLOSE_SIDEBAR
} from '../mutation-types'

const state = {
  sidebar: { //  边栏
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
  }
}

const mutations = {
  [APP_TOGGLE_SIDEBAR]: state => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  [APP_CLOSE_SIDEBAR]: (state) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
  }
}

export default {
  state,
  mutations
}
