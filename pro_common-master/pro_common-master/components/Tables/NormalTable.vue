<!--
普通表格样式
文字
-->
<template>
<div v-loading="pending" class="comp__normal-table">
  <el-table :data="list" :border="true" :size="size" style="width: 100%"
            :show-summary="Boolean(config.summaryMethod)"
            :summary-method="config.summaryMethod"
            @selection-change="selectionChange">
    <!-- 选择框 -->
    <el-table-column v-if="config.selection && config.selection.width" type="selection"
                     :fixed="config.selection.fixed" :min-width="config.selection.minWidth"
                     :width="config.selection.width" align="center" />
    <!-- 基本类型项 -->
    <el-table-column v-for="item in config.columns" :key="item.key" :fixed="item.fixed"
                     :label="item.label" :width="item.width" :min-width="item.minWidth || 0" :align="item.align||'center'">
      <template slot-scope="scope">
        <!-- 文本类型 -->
        <template v-if="(item.type == 'word' || !item.type)">
          <span :class="item.className ? item.className(scope.row, parentData) : ''">{{ scope.row[item.key] }}</span>
        </template>
        <template v-else-if="item.type == 'wordFilter'">
          {{ item.wordFilter(scope.row) }}
        </template>
        <!-- switchBtn -->
        <div v-else-if="item.type == 'switchBtn'" style="display: flex;justify-content: center">
          <SwitchBtn :value="scope.row[item.key]" :disabled="item.switchBtnConfig.disabled ? item.switchBtnConfig.disabled(scope.row) : false"
                     :activeVal="item.switchBtnConfig.activeVal" :disabledVal="item.switchBtnConfig.disabledVal"
                     :activeWord="item.switchBtnConfig.activeWord" :disabledWord="item.switchBtnConfig.disabledWord"
                     @toggle="switchToggle(item.key, scope.row)" />
        </div>
        <!-- link -->
        <div v-else-if="item.type == 'link'" :type="item.type || 'primary'"
             class="link-wrap" @click="linkClick(item.action, scope.row)">
          <div v-if="!item.theme" class="link">{{ scope.row[item.key] }}</div>
          <el-button style="min-width: 100%;" v-else-if="item.theme == 'elButton'" type="text">{{ scope.row[item.key] }}</el-button>
        </div>
        <!--原生 html -->
        <div v-else-if="item.type == 'html'">
          <span v-html="scope.row[item.key]"></span>
        </div>
      </template>
    </el-table-column>
    <!-- 操作按钮组 -->
    <el-table-column v-if="config.operationBtns && config.operationBtns.width"
                     :fixed="config.operationBtns.fixed"
                     :label="config.operationBtns.label" :width="config.operationBtns.width"
                     :align="config.operationBtns.align||'center'">
      <template slot-scope="scope">
        <div style="display: flex;justify-content: space-around" :style="{justifyContent: config.operationBtns.justifyContent || 'space-around'}">
          <OperationBtn v-for="(btnConfig, btnIndex) in config.operationBtns.items" :key="btnIndex"
                        :config="btnConfig" :row="scope.row"
                        :hidden="btnConfig.hidden ? btnConfig.hidden(scope.row) : false"
                        @clickHandler="operationBtnsClick" />
        </div>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import SwitchBtn from '@pro_common/components/SwitchBtn/SwitchBtn.vue'
import OperationBtn from './components/OperationBtn.vue'

/**
 * @operationBtnsClick(clickName, row) // 操作按钮点击事件
 * clickName: {string} 对应 clickName
 * @selectionChange(selection) // 选择框 index 改变事件
 * selection: {array} 选中的选择框列表
 * @switchToggle(key, row) key:对应键值 row:此行数据
 * @update:selection 用作 selection.sync 组合
 * @linkClick(action, row) type=='link'，连接文字 点击时触发
 *    action: 'String', row: 此行数据
 * */
export default {
  name: "NormalTable",
  props: {
    // 表数据
    list: { type: Array, default: () => [] },
    config: {
      type: Object,
      default: () => ({
        selection: {},
        columns: [],
        operationBtns: {},
        summaryMethod: null
      })
    },
    // 父级传来的 data  在 columns[].className 中使用
    parentData: { type: null, default: null },
    pending: { type: Boolean, default: false },
    selection: { type: Array, default: () => [] },
    size: { type: String, default: 'medium' }
  },
  methods: {
    operationBtnsClick(clickName, row) {
      this.$emit('operationBtnsClick', clickName, row)
    },
    selectionChange(selection) {
      this.$emit('selectionChange', selection)
      this.$emit('update:selection', selection)
    },
    switchToggle(key, row) {
      this.$emit('switchToggle', key, row)
    },
    linkClick(action, row) {
      if (typeof action == 'function') {
        return action(row, this.$router)
      } else { // action 为 文字
        this.$emit('linkClick', action, row)
      }
    }
  },
  components: {
    SwitchBtn,
    OperationBtn
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/element-variables";
.comp__normal-table {
  .link-wrap {
    display: inline-block;
    padding: 5px 6px;
    cursor: pointer;
    box-sizing: border-box;
    width: 100%;
    .link {
      display: inline-block;
      padding: 0 1px;
      font-size: 14px;
      line-height: 20px;
      color: $--color-primary;
      border-bottom: 1px solid $--color-primary;
    }
  }
}
</style>
