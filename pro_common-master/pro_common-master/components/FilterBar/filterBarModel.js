/**
 * 配置项说明
 * 勿在代码中引用
 * */
export const reqParam = ''

export const config = [ // 列表
  { // 输入框
    /**
     * 元素类型
     * 'input': 输入框  'select'
     * */
    type: 'input',
    initVal: '', // 初始值 可为任意 '', 0, ...
    /**
     * value的key 如 reqParam.aaa填 'aaa' // 现只支持 1级，
     * 不能设置多级 如 reqParam.aaa.bbb.ccc 不支持
     * */
    valueKey: '', // *必填
    label: '', // label 文字
    className: '', // 活动ClassName
    opt: { // *必填 配置项 若无配置项，也应 写成 opt: {}
      placeholder: '',
      width: '', // 宽度 默认200
      disabled: false // 默认false
    }
  },
  { // select
    type: 'select',
    // ... 其余跟input相似
    opt: { // *必填 配置项
      placeholder: '',
      width: '', // 宽度 默认200
      options: [ // 选项s
        { label: '显示名称', value: '值' }
      ],
      emitChange: false // 是否 触发 change事件Flag 默认 false
    }
  },
  { // 日期选择框
    type: 'datePicker',
    opt: { // *必填 配置项
      width: '200', // 宽度
      placeholder: '',
      type: '', // 类型 'date' 以「日」为基本单位，基础的日期选择控件
      readonly: false, // boolean 是否只读
      editable: false, // 是否可输入 element中默认可输入，，，将其改成默认false
      format: '' // 格式
    }
  }
]
