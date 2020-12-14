/**
 * 配置项  __genTemp: 为生成时配置项， 可删除
 * 要将 modules.export 改为 对应 的 export const 等
 * */

/**
 * TODO 实际开发中 删除
 * */
const __genTemp = {
  wrapClass: "system-setting__msg", // 包裹 class
  componentName: "SystemSettingMsg", // 组件 name
  /**
   * 日期选择器 DateDurationPicker
   * null: 不适用
   * Array: ['timeStar', 'timeEnd'] // 开始和结束日期 的 key
   * */
  // DateDurationPicker: null,
  DateDurationPicker: ['timeStar', 'timeEnd'],
  /**
   * 右侧功能按钮条
   * */
  RightBtnsBar: [{ type: 'primary', clickName: "add", word: "新增" }],
  /**
   * 新增/编辑弹窗
   * */
  ConfirmDialog: {
    // 是否有 表单内嵌
    hasForm: true
  }
}

/**
 * 搜索栏配置项
 * */
const TYPES = [
  { label: "用户消息", value: "1" },
  { label: "用户存提款消息(系统)", value: "2" },
  { label: "用户活动消息(系统)", value: "3" },
]
// 搜索栏配置
const filterBarConfig  = [
  {
    type: "select", initVal: '-1', valueKey: "type",
    opt: { width: '200', options: [{ label: '全部类型', value: '-1' }, ...TYPES] }
  },
  { // 收件人 id
    type: 'input', initVal: '', valueKey: 'sendObjId',
    opt: { placeholder: "请输入收件人id", width: '130' }
  }
]

const tableConfig = {
  selection: { width: 55 },
  columns: [
    { label: 'ID', key: 'id', width: '100' },
    { label: '标题', key: 'title', width: '180' },
    { label: '内容', key: 'remarks' },
    { label: '收件人', key: 'sendObjId', width: '120' },
    { label: '发件日期', key: 'createdTxt', width: '140' },
    {
      label: '状态', key: 'statusTxt', width: '80',
      className(row) {
        return row.status == '0' ? 'unread' : ''
      }
    },
    { label: "asdasd", key: 'aaasds', type: "switchBtn" }
  ],
  operationBtns: {
    label: '操作', width: '240',
    items: [
      { key: 'del', word: '删除', type: 'danger', clickName: 'del' }
    ]
  }
}

const formConfig = {
  attach: 'dialog', mode: 'add', editReqParam: {},
  async getEditData(editParam) { // 编辑时, 初始化数据
    return {
      id: editParam.id,
    }
  },
  items: [
    { // 公告标题
      type: 'input', initVal: '', valueKey: 'title',
      opt: { width: '120', placeholder: '公告标题' }
    }
  ]
}

module.exports = {
  __genTemp,
  filterBarConfig: filterBarConfig || null,
  tableConfig,
  formConfig
}

