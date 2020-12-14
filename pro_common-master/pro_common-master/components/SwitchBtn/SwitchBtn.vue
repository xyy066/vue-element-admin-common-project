<template>
<div class="pro-comp__switch-btn-wrap" :style="{borderRadius: ((height / 2 + borderSize) + 'px')}">
  <div class="pro-comp__switch-btn" :class="{disabled: !active}"
       :style="[wrapStaticStyle, wrapStatusStyle]" @click="toggle">
    <!-- 激活时文字 -->
    <div class="active-word word" :style="wordStaticStyle">{{ activeWord }}</div>
    <div class="disabled-word word" :style="wordStaticStyle">{{ disabledWord }}</div>
    <div class="round" :style="[{height: height+'px', width: height+'px'}, roundStatusStyle]"></div>
  </div>
  <!-- 禁止点击蒙层 蒙层 -->
  <div v-show="disabled" class="disabled-mask"></div>
</div>

</template>

<script>
/**
 * events:
 *    @toggle(toggleVal) 切换事件
 *    toggleVal:切换的val
 * */
export default {
  name: "SwitchBtn",
  props: {
    value: { type: [Number, String, Boolean], default: true },
    // toggle模式， true:通过$emit事件给父组件处理,  false:通过`update:value`修改值
    toggleEventMode: { type: Boolean, default: true },
    activeVal: { type: [Number, String, Boolean], default: true },
    disabledVal: { type: [Number, String, Boolean], default: false },
    /** 高度 */
    width: { type: [Number, String], default: 70 },
    height: { type: [Number, String], default: 24 },
    borderSize: { type: [Number, String], default: 3 },
    fontSize: { type: [Number, String], default: 15 },
    activeBgColor: { type: String, default: '#1890ff' },
    disabledBgColor: { type: String, default: '#afafaf' },
    activeWord: { type: String, default: '启用' },
    disabledWord: { type: String, default: '停用' },
    // 禁止 toggle按钮flag
    disabled: { type: Boolean, default: false }
  },
  computed: {
    active() { // 根据 val 改变
      return this.value === this.activeVal
    },
    wrapStaticStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        borderSize: this.borderSize + 'px',
        borderRadius: (this.height / 2 + this.borderSize) + 'px'
      }
    },
    wrapStatusStyle() { // 根据 active 动态调整的状态
      const bgColor = this.active ? this.activeBgColor : this.disabledBgColor
      return { borderColor: bgColor, backgroundColor: bgColor }
    },
    wordStaticStyle() {
      return {
        width: (this.width - this.height - 2 * this.borderSize) + 'px',
        height: this.height + 'px',
        lineHeight: this.height + 'px',
        fontSize: this.fontSize + 'px'
      }
    },
    roundStatusStyle() {
      const t = this.active ? 0 : (this.width - this.height)
      return { transform: `translateX(${t}px)` }
    }
  },
  methods: {
    toggle() {
      if (this.disabled) return // 禁止模式,不触发事件
      const toggleVal = this.active ? this.disabledVal : this.activeVal
      if (this.toggleEventMode) { // 上浮模式
        this.$emit('toggle', toggleVal)
      } else { // 直接改值
        this.$emit('update:value', toggleVal)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@pro_common/styles/colors.scss";
$whiteColor: #fbfbfb;
.pro-comp__switch-btn-wrap {
  display: inline-block;
  position: relative;
  overflow: hidden;
  .disabled-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: not-allowed;
    background-color: $disabled-mask;
  }
}
.pro-comp__switch-btn {
  position: relative;
  box-sizing: content-box;
  border-style: solid;
  cursor: pointer;
  transition: background-color 0.3s, border-color, 0.3s;
  &.disabled {
    .active-word {
      opacity: 0;
    }
    .disabled-word {
      opacity: 1;
    }
  }
  .word {
    position: absolute;
    top: 0;
    cursor: pointer;
    color: $whiteColor;
    font-weight: 500;
    transition: opacity 0.2s;
  }
  .active-word {
    right: 4px;
    opacity: 1;
  }
  .disabled-word {
    left: 4px;
    opacity: 0;
    text-align: right;
  }
  .round {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    background-color: $whiteColor;
    cursor: pointer;
    transition: transform 0.3s;
  }
}
</style>
