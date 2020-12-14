// 今日，昨日，本周，上周，本月，上月

var now = new Date(); // 当前日期
var nowDayOfWeek = now.getDay(); // 今天本周的第几天
var nowDay = now.getDate(); // 当前日
var yes = new Date(); // 昨日
yes.setDate(now.getDate() - 1)
var lastDay = yes.getDate();
var nowMonth = now.getMonth(); // 当前月
var nowYear = now.getYear(); // 当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //
var lastMonthDate = new Date(); // 上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastMonth = lastMonthDate.getMonth();

// 格局化日期：yyyy-MM-dd
export function formatDate(date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();
  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return (myyear + "-" + mymonth + "-" + myweekday);
}
// 获得某月的天数
export function getMonthDays(myMonth) {
  var monthStartDate = new Date(nowYear, myMonth, 1);
  var monthEndDate = new Date(nowYear, myMonth + 1, 1);
  return (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
}

// 获得本日的开端时间
export function getTodayStartDate() {
  return new Date(nowYear, nowMonth, nowDay, 0, 0, 0);
}

// 获得本日的结束时间
export function getTodayEndDate() {
  return new Date(nowYear, nowMonth, nowDay, 23, 59, 59);
}

// 获得昨日的开端时间
export function getYestodayStartDate() {
  return new Date(nowYear, nowMonth, lastDay, 0, 0, 0);
}

// 获得昨日的结束时间
export function getYestodayEndDate() {
  return new Date(nowYear, nowMonth, lastDay, 23, 59, 59);
}
// 获得本周的开端日期
export function getWeekStartDate() {
  console.log(nowDay,nowDayOfWeek)
  return new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1, 0, 0, 0);
}

// 获得本周的停止日期
export function getWeekEndDate() {
  return new Date(nowYear, nowMonth, nowDay, 23, 59, 59);
}

// 获得上周的开始日期
export function getLastWeekStartDate() {
  return new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6, 0, 0, 0);
}
// 获得上周的结束日期
export function getLastWeekEndDate() {
  return new Date(nowYear, nowMonth, nowDay - nowDayOfWeek, 23, 59, 59);
}

// 获得本月的开端日期
export function getMonthStartDate() {
  return new Date(nowYear, nowMonth, 1, 0, 0, 0);
}

// 获得本月的停止日期
export function getMonthEndDate() {
  return new Date(nowYear, nowMonth, getMonthDays(nowMonth), 23, 59, 59);
}

// 获得上月开端时候
export function getLastMonthStartDate() {
  return new Date(nowYear, lastMonth, 1, 0, 0, 0);
}

// 获得上月停止时候
export function getLastMonthEndDate() {
  return new Date(nowYear, lastMonth, getMonthDays(lastMonth), 23, 59, 59);
}

