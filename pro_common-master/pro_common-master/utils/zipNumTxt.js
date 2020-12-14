/**
 * 缩略显示 数字
 * 如 100,000 显示 -> 100K
 * @param {string|number} numStr 要格式化的num
 * @param {array} rules 格式化规则数组 rules 应从 大到小 排列 -> 如 [`百万`, `千`]
 * @param {string} rules[].tail 缩略后的 字
 * @param {number} rules[].maxUnit 最大位数，超过此位数的数字 将被 缩略
 * @param {number} rules[].zipUnit 缩略位数 如 10K -> 缩略位 3
 * */
function zipIntTxt(numStr, rules) {
  const num = parseInt(numStr)
  if (isNaN(num)) return numStr // 非法字符
  for (let i = 0, l = rules.length; i < l; i++) {
    const rule = rules[i]
    const min = Math.pow(10, rule.maxUnit) // 如 超过5位数要缩略 则为 100000
    // 超过指定位数
    if (num >= min) return (Math.floor(num / Math.pow(10, rule.zipUnit)) + rule.tail)
  }
  return numStr
}

export default zipIntTxt
