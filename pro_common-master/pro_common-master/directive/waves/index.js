/**
 * 水波纹按钮
 * index.js 使用 Vue.use(waves) 进行全局安装指令
 * 若要局部安装 用  waves.js 配合
 * directives: { waves },
 * 使用
 * */
import Vue from 'vue'
import waves from './waves'

const install = function(Vue) {
  Vue.directive('waves', waves)
}

if (window.Vue) {
  window.waves = waves
  Vue.use(install); // eslint-disable-line
}

waves.install = install
export default waves
