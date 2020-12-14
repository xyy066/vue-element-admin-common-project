/**
 * 将字符串 转化为 数字型字符串
 * 如: 'asd' -> ''     '12asd3' -> ''  '12'->'12' '12.33423434' -> '12.33'
 * */

/**
 * @param {string} str
 * @param {number=} precision 精度，小数位
 * */
function str2NumStr(str, precision = 2) {
  if (!str) return '' // 空字符串
  let t = Number(str)
  if (isNaN(t)) return '' // 非法数字
  /** 为数字 */
  // 为整数
  if (!/\.\d+/.test(str)) return t.toString()
  // 为小数 向下取整 比精确度 要 多一位，，让 float 转 int 的 失准位在 precision+1位
  const base = Math.pow(10, precision) * 10
  t = Math.floor(t * base / 10) * 10 / base // 将最后一位小数位 变为 0
  return t.toString()
}

export default str2NumStr
