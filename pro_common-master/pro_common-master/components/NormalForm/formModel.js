
/**
 * 表单配置项
 * */
export const formConfig = {
  /**
   * *必填 依附模式 'page':依附页面,  'dialog':依附于Dialog弹框上
   * 1. 'page' 负载在 页面上， 通过 created() {} -> 回调中 执行 init 函数
   * 2. 'dialog' 负载在 Dialog 弹窗上，通过监听 props.active -> true -> 执行init函数
   * */
  attach: '',
  mode: 'add', // 'add'添加模式，  'edit'编辑模式
  editReqParam: {}, // 编辑时请求参数
  /**
   * *必填
   * @func 编辑模式获取原始表单数据
   * @return {object} 返回 表单 对象 供初始化使用
   * */
  async getEditData(editReqParam) {},
  inline: false, // 行内form
  labelWidth: '100px',
  labelPosition: 'right', // 表单域标签的位置
  items: [ // 表单项配置
    { // 输入框类型
      /**
       * 类型: 'input':输入框
       * */
      type: 'input',
      elType: 'text', // 原生 input的 type 不填默认 text
      initVal: '', // *必填 初始化值
      prop: '', // *必填 对应 model 的 key { a: '', b: 123 } -> 'a',  'b'
      label: 'label',
      disabled: false,
      readonly: false,
      hidden: false, // 隐藏该项
      /**
       * *必填 前端表单验证项, 如
       * [
       *    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
       *    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
       * ]
       * */
      rules: [],
      placeholder: '',
      itemClass: '', // 整个item的className
      rightClass: '', // 右边(input等)的className
      /**
       * 编辑模式下的特例，，， 会做全量 替换
       * 如： 普通时, placeholder: '123'
       * 编辑时，设置 editSpecial: { placeholder: '321' }
       * */
      editSpecial: {}
    },
    { // 下拉框
      type: 'select',
      rules: [],
      items: [
        { label: 'label', value: '' }
      ],
      // togglePrefix 二值如启/停 时 icon 显示
      togglePrefix: {
        /** 是否为 active 状态 */
        active: val => console.log(val)
      }
    },
    { // 单选框
      type: 'radio',
      rules: [],
      items: [
        { label: 'label', value: '' }
      ]
    },
    { // 多选框
      type: 'checkbox',
      rules: [], // 规则s
      items: [ // 里面的cell
        { label: 'label', value: '' }
      ]
    },
    { // 文本框
      type: 'textarea',
      rules: [],
      autosize: { minRows: 2, maxRows: 6 } // 自适应行数
    },
    { // 时间段选择器
      type: 'dateTimePicker',
      rules: [],
      pickerOptions: {}
    }
  ]
}

/**
 * 表单验证的cell
 * */
export const rule = {
  /**
   * 当需要自定义验证时使用
   * @param {object} model 表单的 model
   * @param {object} Form 表单的el-form 实例
   * @param {object} val 验证项的 val
   * @param {function} cb 验证回调， cb(): 验证通过,, cb(new Error('请再次输入密码')): 附带Error 验证失败
   * */
  validatorHandler(model, Form, val, cb) {}
}
