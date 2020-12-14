<template>
<el-card class="comp__card-simple">
  <TitleBar slot="header" :title="title" />
  <!-- 卡片内容 -->
  <slot name="default"></slot>
</el-card>
</template>

<script>
import TitleBar from "@pro_common/components/Title/TitleBar.vue"

export default {
  name: "CardSimple",
  props: {
    title: { type: String, default: '' }
  },
  components: {
    TitleBar
  }
}
</script>

<style lang="scss" scoped>
.comp__card-simple {
  &.el-card {
    border-radius: 0;
  }
  /deep/.el-card__header {
    padding: 0;
    border-bottom: 0;
  }
  /deep/.el-card__body {
    padding: 15px;
  }
}
</style>
