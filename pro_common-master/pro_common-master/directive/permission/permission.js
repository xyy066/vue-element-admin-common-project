/**
 * 配合 store.user.roles 进行 元素级别的 权限校验
 * 用法   directives: { permission },
 * v-permission="['admin','editor']" // admin 与 editor 之外的角色 均移除 el
 * */
import store from '@/store'

export default {
  inserted(el, binding) {
    const { value } = binding
    const storeUser = store.state.user
    const roles = storeUser && storeUser.roles

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
