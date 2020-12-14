<template>
<div class="comp__date-duration-picker">
  <div class="picker-wrap" :style="{width: durationWrapWidth+'px'}">
    <slot name="front"></slot>
    <el-date-picker @change="pickerChange"
      v-model="date" type="daterange" range-separator="至"
      start-placeholder="开始日期" end-placeholder="结束日期" />
  </div>
  <div class="btns">
    <el-button :type="mode == 'today' ? 'primary' : ''" round @click="selectDate('today')">今日</el-button>
    <el-button :type="mode == 'yesterday' ? 'primary' : ''" round @click="selectDate('yesterday')">昨日</el-button>
    <el-button :type="mode == 'thisWeek' ? 'primary' : ''" round @click="selectDate('thisWeek')">本周</el-button>
    <el-button :type="mode == 'lastWeek' ? 'primary' : ''" round @click="selectDate('lastWeek')">上周</el-button>
    <el-button :type="mode == 'thisMonth' ? 'primary' : ''" round @click="selectDate('thisMonth')">本月</el-button>
    <el-button :type="mode == 'lastMonth' ? 'primary' : ''" round @click="selectDate('lastMonth')">上月</el-button>
  </div>
</div>
</template>

<script>
import deepClone from "@pro_common/utils/deepClone";
import getYMDDay from "@pro_common/utils/getYMDDay";

/**
 * events
 * @dateChange(date): date 更新事件
 *    {array} date <array<Date>>
 * */
export default {
  name: "CompDateDurationPicker",
  props: {
    durationWrapWidth: { type: String, default: '370' }
  },
  data() {
    return {
      date: [],
      mode: ''
    }
  },
  methods: {
    $_getDate() {
      return deepClone(this.date)
    },
    $_setMode(mode) { // 设置 mode
      this.selectDate(mode)
    },
    selectDate(description) {
      this.mode = description
      const now = new Date()
      const oneDayTs = 24 * 60 * 60 * 1000
      let hasHandled = false // 已有处理 对应的 description
      if (description == 'today') {
        const { y, m, d } = getYMDDay(now)
        this.date = [new Date(y, m, d, 0, 0, 0), new Date(y, m, d, 23, 59, 59)]
        hasHandled = true
      } else if (description == 'yesterday') {
        const { y, m, d } = getYMDDay(new Date(now.getTime() - oneDayTs))
        this.date = [new Date(y, m, d, 0, 0, 0), new Date(y, m, d, 23, 59, 59)]
        hasHandled = true
      } else if (description == 'thisWeek') {
        const {day} = getYMDDay(now)
        const passDay = day == 0 ? 6 : day - 1 // 已经过去的日期
        const {y: y1, m: m1, d: d1} = getYMDDay(new Date(now.getTime() - passDay * oneDayTs))
        this.date = [new Date(y1, m1, d1, 0, 0, 0), now]
        hasHandled = true
      } else if (description == 'lastWeek') {
        const {day} = getYMDDay(now)
        const nowTs = now.getTime()
        const lastSundayDay = day == 0 ? 7 : day // 上一个星期天 隔 现在 日期数
        const {y, m, d} = getYMDDay(new Date(nowTs - lastSundayDay * oneDayTs))
        // 上周 星期天 最后一秒 Date
        const lastWeekSundayLast = new Date(y, m, d, 23, 59, 59)
        this.date = [
          new Date(lastWeekSundayLast.getTime() - 7 * oneDayTs),
          lastWeekSundayLast
        ]
        hasHandled = true
      } else if (description == 'thisMonth') { // 本月
        const {y, m} = getYMDDay(now)
        this.date = [new Date(y, m, 1, 0, 0, 0), now]
        hasHandled = true
      } else if (description == 'lastMonth') { // 上月
        /** 用本月的第一天 0,0,0 作为end */
        const {y, m} = getYMDDay(now)
        this.date = [
          new Date((m == 0 ? (y - 1) : y), (m == 0 ? 11 : (m - 1)), 1, 0, 0, 0),
          new Date(y, m, 1, 0, 0, 0)
        ]
        hasHandled = true
      }
      if (hasHandled) { // 有处理过
        this.$emit('dateChange', deepClone(this.date))
      }
    },
    $_pickerChange(e) {
      const { y: y0, m: m0, d: d0 } = getYMDDay(e[0])
      const { y: y1, m: m1, d: d1 } = getYMDDay(e[1])
      this.pickerChange([
        new Date(y0, m0, d0, 0, 0, 0),
        new Date(y1, m1, d1, 0, 0, 0)
      ])
    },
    pickerChange(e) {
      this.mode = ''
      this.date = e
      if (e == null) return this.$emit('dateChange', e)
      // [beginDate, endDate] 需要 处理
      this.$emit('dateChange', [
        // endDate 取 当天的 23:59:59
        e[0], new Date(e[1].getTime() + ((24 * 60 * 60 - 1) * 1000))
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
.comp__date-duration-picker {
  display: flex;
  flex-wrap: wrap;
  .picker-wrap {
    display: flex;
    align-items: center;
    width: 370px;
    padding-bottom: 20px;
  }
  .btns {
    width: 500px;
    padding-bottom: 20px;
  }
}
</style>
