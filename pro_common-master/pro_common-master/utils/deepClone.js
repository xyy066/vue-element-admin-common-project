/**
 * 深复制
 */
function deepClone(source) {
  const hash = [] // 收集子变量，，避免循环引用 导致 死循环
  function run(source) {
    if (source === null) return source
    if (source === undefined) return source
    if (typeof source == 'function') return source
    if (typeof source == 'object') {
      // 判断特殊 类型
      if (source instanceof Date) return source
      // 为 引用类型 && 之前已经有对应引用
      if (hash.some(item => item === source)) return source
      hash.push(source)
      // 之前无引用
      if (Array.isArray(source)) { // 数组
        return source.map(item => run(item))
      }
      if (source instanceof Date) { // Date类型
        return source
      }
      // 对象
      return Object.keys(source).reduce((temp, key) => {
        temp[key] = run(source[key])
        return temp
      }, {})
    }
    // 普通类型
    return source
  }
  return run(source)
  // return run(source)
}

export default deepClone
