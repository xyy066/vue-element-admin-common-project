/**
 * FilterBar 组件的 工具函数集
 * */

/**
 * 查找 FilterBar 对应 input等 的配置项
 * 将 filterBarConfig 的下标解耦，，防止 移动config 导致 下标访问不正确
 * @param {object} filterBarConfig 配置项
 * @param {string} valueKey 对应valueKey
 * */
export const findConfig = (filterBarConfig, valueKey) => {
  for (let i = 0, l = filterBarConfig.length; i < l; i++) {
    if (filterBarConfig[i].valueKey == valueKey) return filterBarConfig[i]
  }
}
