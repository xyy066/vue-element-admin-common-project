<template>
<el-button v-show="!hidden" @click="clickHandler" :type="type" :size="config.size || 'small'">{{ word }}</el-button>
</template>

<script>
/**
 * @clickHandler(clickName, row)
 * */
export default {
  name: "OperationBtn",
  props: {
    row: { type: Object, default: () => ({}) },
    config: { // 按钮的配置项
      type: Object,
      default: () => ({
        type: '',
        word: '请填写',
        size: 'small'
      })
    },
    hidden: { type: Boolean, default: false }
  },
  computed: {
    type() {
      const config = this.config
      if (config.type) return config.type
      if (config.typeRender) return config.typeRender(this.row)
      return ''
    },
    word() {
      const config = this.config
      if (config.word) return config.word
      if (config.wordRender) return config.wordRender(this.row)
      return '请填写'
    },
    clickName() {
      const config = this.config
      if (config.clickName) return config.clickName
      if (config.clickNameRender) return config.clickNameRender(this.row)
      return ''
    }
  },
  methods: {
    clickHandler() {
      this.$emit('clickHandler', this.clickName, this.row)
    }
  }
}
</script>

<style scoped>

</style>
