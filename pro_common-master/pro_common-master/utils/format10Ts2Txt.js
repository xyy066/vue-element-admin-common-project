/**
 * 转换 10位的 ts(精确到s) 到 txt
 * @param {number} tenTs 10位的时间戳
 * @param {string} format 格式
 * */
import parseTime from "@pro_common/utils/parseTime";

function format10Ts2Txt(tenTs, format) {
  if (!tenTs) return '-'
  return parseTime(new Date(tenTs * 1000), format)
}

export default format10Ts2Txt
