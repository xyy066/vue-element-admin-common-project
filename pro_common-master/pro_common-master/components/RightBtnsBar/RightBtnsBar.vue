<!--
右侧按钮s
常用于 表格的 上方按钮组
-->
<template>
<div class="comp__right-btns-bar">
  <el-button v-for="item in config" :type="item.type"
             :key="item.clickName"
             @click="handleClick(item.clickName)">
    {{ item.word }}
  </el-button>
</div>
</template>

<script>
/**
 * config {array}
 * config[].type
 * config[].clickName 点击标记语
 * config[].word 显示文字
 * */

/**
 * events:
 *    @clickBtn(clickName): 点击按钮事件
 * */
export default {
  name: "RightBtnsBar",
  props: {
    config: { type: Array, default() { return [] }
    }
  },
  methods: {
    handleClick(clickName) {
      this.$emit('clickBtn', clickName)
    }
  }
}
</script>

<style scoped>
.comp__right-btns-bar {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
