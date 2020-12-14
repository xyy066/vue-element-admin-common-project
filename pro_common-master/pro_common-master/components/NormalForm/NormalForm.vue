<template>
<el-form class="comp__normal-form" ref="form" v-loading="loading" :model="model" :inline="config.inline"
         :labelWidth="config.labelWidth || '100px'"
         :labelPosition="config.labelPosition">
  <el-form-item :ref="item.prop" v-for="item in formItemsConfig" :key="item.prop"
                :class="item.itemClass" v-show="!item.hidden"
                :prop="item.prop" :label="item.label" :rules="item.rules">
    <el-input v-if="item.type=='input'" v-model="model[item.prop]" :type="item.elType || 'text'"
              :placeholder="item.placeholder || ''" :disabled="item.disabled"
              :readonly="item.readonly" :class="item.rightClass"/>
    <!-- select -->
    <el-select v-else-if="item.type=='select'" v-model="model[item.prop]"
               :placeholder="item.placeholder" :class="item.rightClass">
      <!-- togglePrefix 二值如启/停 时 icon 显示 -->
      <div v-if="item.togglePrefix" class="select-prefix" slot="prefix"
         :class="[[undefined, null, ''].indexOf(model[item.prop]) > -1 ? '' : item.togglePrefix.active(model[item.prop]) ? 'green' : 'gray']"></div>
      <el-option v-for="option in item.items" :key="option.value"
        :label="option.label" :value="option.value" />
    </el-select>
    <!-- 单选框 -->
    <el-radio-group v-else-if="item.type=='radio'" v-model="model[item.prop]" :class="item.rightClass">
      <el-radio v-for="radioItem in item.items" :key="radioItem.value"
                :label="radioItem.value">{{ radioItem.label }}</el-radio>
    </el-radio-group>
    <!-- 多选框 -->
    <el-checkbox-group v-else-if="item.type=='checkbox'" v-model="model[item.prop]"
                       :class="item.rightClass">
      <el-checkbox v-for="checkItem in item.items" :label="checkItem.value" :key="checkItem.value">
        {{ checkItem.label }}
      </el-checkbox>
    </el-checkbox-group>
    <!-- textarea -->
    <el-input v-else-if="item.type=='textarea'" v-model="model[item.prop]" type="textarea"
              :placeholder="item.placeholder" :autosize="item.autosize" />
    <!-- dateTimePicker -->
    <el-date-picker v-else-if="item.type=='dateTimePicker'" v-model="model[item.prop]"
        :pickerOptions="item.pickerOptions || {}"
        type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
  </el-form-item>
</el-form>
</template>

<script>
import deepClone from "@pro_common/utils/deepClone"
import ServiceError from "@pro_common/error/ServiceError";

/**
 * 此组件有 两种 init 方式
 * 1. attach == 'dialog' 负载在 Dialog 弹窗上， 监听 props.active -> true -> 执行init函数
 * 2. attach == 'page' 负载在 页面上， 通过 created() {} -> 回调中 执行 init 函数
 * */
export default {
  name: "NormalForm",
  props: {
    // 列表配置项
    config: {
      type: Object,
      default: () => ({
        attach: 'page', // 负载模式
        inline: false, // 行内样式
        labelWidth: '100px',
        labelPosition: 'right',
        mode: 'add',
        items: []
      })
    },
    // 当 attach == 'dialog'时， 指定 激活表单 监听器
    active: { type: Boolean, default: false }
  },
  data() {
    return {
      loading: false,
      model: {}, // model 通过 props.config 来生成
      addFormItemsConfig: [], // 存储 添加模式时的 formItems配置项
      editFormItemsConfig: [] // 用来存储 编辑模式时 formItems配置项
    }
  },
  computed: {
    formItemsConfig() {
      if (this.config.mode == 'add') {
        if (this.addFormItemsConfig.length) return this.addFormItemsConfig
        return this.config.items
      }
      return this.editFormItemsConfig
    }
  },
  watch: {
    active(val) {
      if (this.config.attach != 'dialog') return
      // 关闭,清空表单
      if (!val) return this.clear()
      // 激活时，初始化
      this.init()
    }
  },
  methods: {
    async init() { // 初始化
      const vm = this
      const config = vm.config
      const Form = vm.$refs.form
      // 初始化 formItems配置项
      if (config.mode == 'add') { // 添加模式
        // 初始化 添加 配置项
        config.items.forEach(item => {
          const initVal = typeof item.initVal == 'function' ? item.initVal() : item.initVal
          vm.$set(vm.model, item.prop, initVal)
          this.$nextTick(() => Form.clearValidate(item.prop))
        })
        return
      }
      // 编辑模式
      vm.loading = true
      try {
        const res = await config.getEditData(config.editReqParam)
        Object.keys(res).forEach(key => {
          vm.$set(vm.model, key, res[key])
          // 清除表单验证结果
          this.$nextTick(() => Form.clearValidate(key))
        })
      } catch (e) {
        console.log(e)
      } finally {
        vm.loading = false
      }
    },
    /**
     * $_ 开头的方法 指明 由父组件调用
     * */
    async $_submit() { // 表单提交
      const vm = this
      try {
        await vm.$refs.form.validate()
      } catch (e) {
        console.log(e)
        throw new ServiceError(`[表单验证失败] in NormalForm.methods.submit`)
      }
      // 前端验证通过
      return {
        model: deepClone(vm.model),
        mode: vm.config.mode
      }
    },
    clear() { // 清空 model 中属性，，以在下次 Dialog.show 时 再次初始化
      const vm = this
      const keys = Object.keys(vm.model)
      keys.forEach(key => vm.$delete(vm.model, key))
      vm.$refs.form.clearValidate(keys)
    },
    /** 生成 组件本地的 configs */
    $_makeLocalConfig() {
      const vm = this
      /** rules 中的 validatorHandler 转化器 */
      const rulesValidatorTran = rules => {
        if (!rules) return
        rules.forEach(rule => {
          if (!rule.validatorHandler) return
          // role中有使用 validator 转化函数
          rule.validator = (rule, value, cb) => {
            rule.validatorHandler(vm.model, vm.$refs.form, value, cb)
          }
        })
      }
      /**
       * 根据 item中的 validator 生成 addFormItemsConfig
       * */
      vm.addFormItemsConfig = vm.config.items.map(item => {
        const temp = deepClone(item)
        /** 转化 rule中的 validatorHandler */
        rulesValidatorTran(temp.rules)
        if (!temp.editSpecial) return temp
        rulesValidatorTran(temp.editSpecial.rules)
        return temp
      })
      /** 初始化 edit模式 formItems配置项 */
      vm.editFormItemsConfig = vm.addFormItemsConfig.map(item => {
        const temp = deepClone(item)
        // 编辑模式, 将 editSpecial做全量替换
        Object.assign(temp, temp.editSpecial || {})
        return temp
      })
    }
  },
  created() {
    this.$_makeLocalConfig()
    if (this.config.attach == 'page') this.init()
  }
}
</script>

<style lang="scss" scoped>
@import "~@pro_common/styles/colors.scss";
.opacity0 {
  opacity: 0;
}
.comp__normal-form {
  $prefixSize: 14px;
  /deep/ .select-prefix {
    display: inline-block;
    width: $prefixSize;
    height: $prefixSize;
    border-radius: 50%;
    position: relative;
    top: 2px;
    left: 2px;
  }
  /deep/ .select-prefix.green {
    background-color: $green;
  }
  /deep/ .select-prefix.gray {
    background-color: $level-4-word;
  }
}
</style>
