import Vue from 'vue'
import { isString, isArray } from '@pro_common/utils/validate'
import { needErrorLog } from '@/settings'
import ServiceError from "@pro_common/error/ServiceError";

// you can set in settings.js
// errorLog:'production' | ['production','development']

function checkNeed() {
  const env = process.env.NODE_ENV
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}

if (checkNeed()) {
  Vue.config.errorHandler = function(err, vm, info) {
  // Don't ask me why I use Vue.nextTick, it just a hack.
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      // 业务型错误
      if (ServiceError.isInstance(err)) {
        console.log('********[业务型错误]********')
        console.log(`err.message: ${err.message}`)
        console.log(`err.detail: `)
        console.log(err.detail)
        return
      }
      // 自行设计
      console.log('********[error]********')
      console.log('********[err]********')
      console.log(err)
      console.log('********[vm]********')
      console.log(vm)
      console.log('********[info]********')
      console.log(info)
      console.log('********[trace]********')
      console.trace(err)
      console.log('********[error end]********')
      console.log('\n\n\n\n')
    })
  }
}
