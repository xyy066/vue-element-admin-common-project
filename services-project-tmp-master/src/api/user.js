import request from './request'

// 登录
export const login = data => request({ url: '/api/auth/login', method: 'post', data })
// 登出
export const logout = () => request({ url: '/api/auth/logout', method: 'post' })
// 获取菜单 POST /api/auth/getMenu
export const authGetMenu = () => request({ url: '/api/auth/getMenu', method: 'post' })
