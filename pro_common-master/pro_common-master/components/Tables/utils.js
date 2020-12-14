/**
 * @param {object} config
 * @param {string} key 对应 key
 * */
export const findColumn = (config, key) => {
  const columns = config.columns
  for (let i = columns.length; i--;) {
    if (columns[i].key == key) return columns[i]
  }
  // 开发时期用
  console.log('！findColumn,请填写有效的Key')
}

/**
 * @param {object} config vm中配置对象
 * @param {string} key 对应 key
 * */
export const findOperationBtn = (config, key) => {
  const items = config.operationBtns.items
  for (let i = items.length; i--;) {
    if (items[i].key == key) return items[i]
  }
  // 开发时期用
  console.log('！findOperationBtn,请填写有效的Key')
}
