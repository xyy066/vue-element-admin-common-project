import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (!value || !(value instanceof Array) || !value.length) {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
  const storeUser = store.state.user
  const roles = storeUser && storeUser.roles
  return roles.some(role => value.includes(role))
}
