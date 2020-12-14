<!--
table 的 头部 搜索栏 filter
可在 父组件 通过 ref
(！在 FilterBar组件 created 之后)再调用
 this.$_setObj(key, val) 动态修改 obj
-->
<template>
<div class="comp__filter-bar">
  <div v-for="item in config" :key="item.valueKey" :class="item.className">
    <!-- input -->
    <span v-if="item.label" class="label">{{ item.label || '' }}</span>
    <el-input v-if="item.type == 'input'" v-model="obj[item.valueKey]" :placeholder="item.opt.placeholder||''"
              :disabled="item.opt.disabled || false"
              class="cell" :style="{ width: (item.opt.width || 200) + 'px' }" />
    <!-- select -->
    <el-select v-else-if="item.type == 'select'" v-model="obj[item.valueKey]"
               class="cell" :style="{ width: (item.opt.width || 200) + 'px' }"
               :placeholder="item.opt.placeholder||''" @change="selectChange(item, obj[item.valueKey])">
      <el-option v-for="option in item.opt.options" :key="option.value"
                 :label="option.label" :value="option.value" />
    </el-select>
    <!-- 日期选择  -->
    <el-date-picker v-else-if="item.type == 'datePicker'"
                    class="cell"
                    v-model="obj[item.valueKey]" :type="item.opt.type"
                    :placeholder="item.opt.placeholder||''"
                    :editable="Boolean(item.opt.editable)"
                    :range-separator="item.opt.rangeSeparator" :start-placeholder="item.opt.startPlaceholder" :end-placeholder="item.opt.endPlaceholder"
                    :format="item.opt.format || null"
                    :style="{ width: (item.opt.width || 200) + 'px', marginRight: '15px' }" />
  </div>
  <!-- 查询按钮 -->
  <el-button class="search-btn" type="primary" @click="clickSearch">查询</el-button>
  <!-- 重置按钮 -->
  <el-button @click="reset">重置</el-button>
</div>
</template>

<script>
/**
 * @clickSearch(obj): 查询事件
 * @selectChange(key, val) 选择栏 change事件
 * @reset(): 重置搜索事件
 * */
export default {
  name: "FilterBar",
  props: {
    config: { type: Array, default: () => [] }
  },
  data() {
    return {
      obj: {} // 点搜索时，传给 父组件处理
    }
  },
  methods: {
    $_clickSearch() {
      this.clickSearch()
    },
    clickSearch() {
      this.$emit('clickSearch', this.obj)
    },
    reset() { this.emit('reset') },
    $_clearObj() { // 清空 obj
      const obj = this.obj
      this.config.forEach(c => {
        const valType = typeof c.initVal
        const key = c.valueKey
        if (valType == 'string') { // 字符串
          obj[key] = ''
          return
        }
        if (valType == 'number') { // 数字
          obj[key] = c.initVal !== undefined ? c.initVal : 0
          return
        }
        // 默认为 字符串
        obj[key] = ''
      })
    },
    // 设置 obj 的 val
    $_setObj(key, val) { this.obj[key] = val },
    selectChange(item, val) {
      if (!item.opt || !item.opt.emitChange) return
      this.$emit('selectChange', item.valueKey, val)
    }
  },
  created() {
    // 生成阶段 根据 传入配置 生成 obj里的key
    const vm = this
    vm.config.forEach(item => {
      vm.$set(vm.obj, item.valueKey, item.initVal)
    })
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/colors.scss";

.comp__filter-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .cell {
    margin-right: 15px;
    margin-bottom: 20px;
  }
  .search-btn {
    margin-bottom: 20px;
  }
  .label {
    color: $dark-less;
    font-size: 14px;
    line-height: 30px;
    margin-left: 8px;
    margin-right: 8px;
  }
}
</style>
