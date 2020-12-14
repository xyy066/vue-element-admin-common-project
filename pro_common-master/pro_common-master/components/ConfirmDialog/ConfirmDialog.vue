<!--
  带取消
-->
<template>
  <el-dialog
    :class="{hidden: !hasShow}"
    :modal="modalComputed"
    :close-on-click-modal="false"
    :title="title"
    :visible="visible"
    @update:visible="updateVisibleHandler"
    :width="width">
<!--    <slot name="default"></slot>-->
    <slot />
    <span slot="footer" class="dialog-footer">
      <el-button v-show="!hiddenCancelBtn" @click="cancelHandler">{{ cancelWord }}</el-button>
      <el-button v-show="!hiddenSubmitBtn" type="primary" @click="submitHandler">{{ submitWord }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
/**
 * @update:visible(val) 组成 .sync 绑定式
 * @cancelHandler(closeCb) 取消事件
 *    closeCb {function} 关闭弹窗回调， 对应 本组件的 methods:closeDialog
 * @submitHandler(closeCb) 提交事件
 *    closeCb {function} 关闭弹窗回调， 对应 本组件的 methods:closeDialog
 *
 * <slot /> content插槽
 * */
export default {
  name: "ConfirmDialog",
  props: {
    title: { type: String, default: '提示' },
    visible: { type: Boolean, default: false },
    width: { type: String, default: '50%' },
    modal: { type: Boolean, default: true },
    cancelWord: { type: String, default: '关 闭' }, // 取消按钮
    submitWord: { type: String, default: '保 存' }, // 确认按钮
    hiddenCancelBtn: { type: Boolean, default: false }, // 隐藏 取消按钮 flag
    hiddenSubmitBtn: { type: Boolean, default: false } // 隐藏 确认按钮 flag
  },
  data() {
    return {
      hasShow: false,
      visibleChangeCount: 0 // visible参数 变化次数 -> 用在 watch:
    }
  },
  computed: {
    modalComputed() {
      // 当 hack初始化 未完成时，禁用modal
      if (!this.hasShow) return false
      return this.modal
    }
  },
  watch: {
    visible(val) {
      ++this.visibleChangeCount
      if (this.hasShow) return // 已处理 hasShow 参数
      if (!val && this.visibleChangeCount > 1) {
        setTimeout(() => {
          this.hasShow = true
        }, 400)
      }
    }
  },
  methods: {
    updateVisibleHandler(val) {
      this.$emit('update:visible', val)
    },
    cancelHandler() {
      this.$emit('cancelHandler', this.closeDialog)
    },
    submitHandler() {
      this.$emit('submitHandler', this.closeDialog)
    },
    closeDialog() { // 传递 update:visible 给数据源，，进行关闭
      this.$emit('update:visible', false)
    }
  },
  created() {
    this.$emit('update:visible', true)
    this.$nextTick(() => {
      this.$emit('update:visible', false)
    })
  }
}
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
