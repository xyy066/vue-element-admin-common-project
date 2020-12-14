/**
 * 记录本次 浏览器 会话 的 相关参数
 * */

const SessionFinKey = 'Fnt-Adm-SessionFin'

/**
 * 浏览器 session 完成打开 flag,, 用在 login 页面中 做错误显示判断
 * null: session刚打开,, '1': 非刚打开
 * */
export const getSessionFin = () => window.sessionStorage.getItem(SessionFinKey)
export const setSessionFin = num => window.sessionStorage.setItem(SessionFinKey, num)
