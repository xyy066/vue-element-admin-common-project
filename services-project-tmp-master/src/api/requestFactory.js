/**
 * 请求对象 制造工厂
 * 请求 拦截 添加 token
 * 响应拦截 添加 权限 && 错误处理
 * */
import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
import router from '@/router/index'
import { user_resetToken } from '@/store/actions'
import {reqErrorNotification} from "@pro_common/utils/notification/notification";
import {setError, getError} from "@/storage/auth";
import {FOUR_01001} from "@/enums/errorObj";
import ServiceError from "@pro_common/error/ServiceError";
import {getSessionFin} from "@/storage/session";
/**
 * @param {string|boolean} baseURL 为 false 时， 使用默认的 baseURL
 * @param {boolean} errSilence 错误信息 静默处理  默认false
 * */
function requestFactory(baseURL, errSilence = false) {
  let finalBaseURL = process.env.VUE_APP_BASE_API
  if (baseURL !== false) finalBaseURL = baseURL // baseURL不为 false 则使用 baseURL
  // create an axios instance
  const service = axios.create({
    baseURL: finalBaseURL, // api 的 base_url
    // baseURL: '', // api 的 base_url
    withCredentials: true, // 跨域请求时发送 cookies
    timeout: 60000 // request timeout x ms--
  })
  // request interceptor
  service.interceptors.request.use(
    config => {
      // Do something before request is sent
      const token = store.state.user.token
      if (token) {
        config.headers['Authorization'] = token
      }
      return config
    },
    error => {
      // Do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )
  // response interceptor
  service.interceptors.response.use(
    /**
     * If you want to get information such as headers or status
     * Please return  response => response
     */
    /**
     * @param {Object} response 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 XMLHttpRequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    /**
     * @param {object} response
     * */
    response => {
      const res = response.data
      const code = res.code
      // 成功
      if (code == 200) return res
      // 人工上下分时， 负数 确认
      if (code == 700) return res
      // 401无权限
      if (code == 401) {
        router.replace('/401')
        return Promise.reject(new ServiceError(
          res.msg || '请求失败', res
        ))
      }
      // 错误静默处理 直接抛出错误, 不在处理
      if (errSilence) {
        return Promise.reject(new ServiceError(
          res.msg || '请求失败', res
        ))
      }
      // 响应 非法code (非错误静默处理 再notification)
      reqErrorNotification(res.msg || '请求返回失败，请稍后再试')
      // 非权限问题
      if (code !== 50008 && code !== 50012 && code !== 50014) {
        return Promise.reject(new ServiceError(
          res.msg || '请求失败', res
        ))
      }
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // 请自行在引入 MessageBox
      // import { Message, MessageBox } from 'element-ui'
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch(user_resetToken).then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    },
    error => {
      const response = error.response
      if (errSilence) {
        return Promise.reject(new ServiceError(
          '请求失败', response
        ))
      }
      if (!response) { // 返回对象不存在
        reqErrorNotification('请求返回失败，请稍后再试')
        return Promise.reject(error)
      }
      const res = response.data
      /** 401 要在 此处处理 */
      if (res.code == 401) {
        if (res.data == 'invalid') { // token过期
          if (getError() && getError().code == FOUR_01001.code) {
            // 已存有 401的 错误信息 则不再多次 启用 lcation.reload
            return Promise.reject(error)
          }
          // 非 初次打开页面 -> 才 存储 错误信息 到cookie
          if (getSessionFin()) setError(FOUR_01001)
          store.dispatch(user_resetToken).then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        } else { // 其他为 无权限 跳401 页面
          router.replace('/401')
        }
        return Promise.reject(error)
      }
      console.log('err' + error) // for debug
      reqErrorNotification(error.msg || '请求返回失败，请稍后再试')
      return Promise.reject(error)
    }
  )
  return service
}

export default requestFactory
