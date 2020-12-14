/**
 * 获取 年 月 日 星期x
 * @return {object} { y, m, d, day }
 * */
function getYMDDay(date) {
  const y = date.getFullYear() // 年份
  const m = date.getMonth() // m (月份  会少1 如5月 -> 4)
  const d = date.getDate() // 日份
  const day = date.getDay() // 星期x 星期天为 0, 星期一为 1, 星期六为 6
  return { y, m, d, day }
}

export default getYMDDay
