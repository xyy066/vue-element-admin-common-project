/**
 * 将 token 存储在 cookie
 * */
import Cookies from 'js-cookie'

const TokenKey = 'Fnt-Adm-Token' // token 键名
const UsernameKey = 'Fnt-Adm-Username' // 用户名 键名
const ErrorKey = 'Fnt-Adm-Error' // 暂存储到 cookie 中的error对象, 经过了 JSON.stringfy

/** token */
export function getToken() { return Cookies.get(TokenKey) }
export function setToken(token) { return Cookies.set(TokenKey, token) }
export function removeToken() { return Cookies.remove(TokenKey) }
/** Username */
export function getUsername() { return Cookies.get(UsernameKey) }
export function setUsername(username) { return Cookies.set(UsernameKey, username) }
/** Error */
export function getError() {
  const temp = Cookies.get(ErrorKey)
  if (temp === undefined || temp === null) return temp
  return JSON.parse(temp) // 有字符串，，解析
}
export function setError(errorObj) { return Cookies.set(ErrorKey, JSON.stringify(errorObj)) }
export function removeError() { return Cookies.remove(ErrorKey) }
