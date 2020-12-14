import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import '@pro_common/styles/element-variables.scss'

import '@pro_common/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

// import i18n from './lang' // Internationalization // 不使用 i18n
import '@pro_common/icons' // icon
import './permission/permission' // permission control
import './log/errorLog'
import {getSessionFin, setSessionFin} from "@/storage/session"; // error log

Vue.use(Element, {
  /**
   * 几个选择 default medium small mini
   * */
  size: 'medium' // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  render: h => h(App)
})

// sessionStorage.AppBegin 为 null 则为 初次打开浏览器 , 在 request token 失效 错误判断 中 有用到
if (!getSessionFin()) window.setTimeout(() => setSessionFin('1'), 3000)
