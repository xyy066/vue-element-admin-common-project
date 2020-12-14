<template>
<div class="comp__page-title">
  {{ title }}
</div>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    title: { type: String, default: '' }
  }
}
</script>

<style lang="scss" scoped>
@import "~@pro_common/styles/colors.scss";

.comp__page-title {
  border-bottom: 1px solid $gray;
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-size: 26px;
  line-height: 36px;
  color: $dark;
}
</style>
