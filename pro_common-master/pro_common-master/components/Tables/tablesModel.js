/**
 * 配置项说明
 * */
/**
 * 选择框配置
 * */
export const selection = {
  fixed: false, // 固定列 接受  'left', 'right', true, false
  width: 55, // 当有 width 这个 key 时，展示选择框栏在 第一栏
  minWidth: '60' // 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
}
/**
 * 表格列表 column 配置项
 * */
export const columns = [ // 数组
  { // 每列配置项
    key: '', // *为list数据映射时必填 对应 table data 的 key 如: [{ name: '123123' }] -> key: 'name'
    label: '姓名', // *必填 列显示名称
    width: '180', // *必填 列宽度 default:'180'   '':占满剩余宽度
    minWidth: '180', // 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
    align: 'center', // 默认 'center'
    /**
     * column 类型
     * 默认'word': 文本显示
     * 'switchBtn': 切换按钮
     * 'null': 空， 当 选择框时 对应 el-table-column的 type="selection"等情况
     * */
    type: 'word',
    fixed: false, // 固定列 接受  'left', 'right', true, false
    className(row, parentData) { // 列的className
      console.log(row, parentData)
      return 'className'
    }
  },
  { // 根据 wordFilter函数 显示 str
    type: 'wordFilter',
    wordFilter(row) { // row 字段值
      return row
    }
  },
  { // switchBtn
    type: 'switchBtn',
    key: '',
    switchBtnConfig: {
      activeWord: '', // 激活文字
      disabledWord: '',
      activeVal: '', // 激活val
      disabledVal: '', // 禁用状态val
      disabled(row) { // 禁用按钮
        console.log(row)
        return false // false 为不禁用，默认
      }
    }
  },
  { // link 跳转文字
    type: 'link',
    key: '',
    theme: '', // '': 使用原生 border-bottom  'elButton':使用
    /** action 为 function 或 string */
    action(row, router) { // 点击跳转处理
    }
  },
  { // 原始 html
    type: 'html',
    key: ''
  }
]
export const operationBtns = {
  label: '操作', // 显示
  width: '240',
  align: 'center',
  justifyContent: 'space-around', // 默认 'space-around'
  fixed: false, // 固定列 接受  'left', 'right', true, false
  items: [
    {
      key: '', // * 非必填 用于 @pro_common/components/Tables/utils.js .findOperationBtn() 函数 寻找 对应的 按钮配置项
      word: '', // 显示名称
      type: '', // 默认 '':普通按钮 'primary':蓝色 'success':绿色 'danger':红色 'warning':黄色
      size: 'small', // 按钮size 默认 'small'
      clickName: '', // 点击时， Table 会 emit('operationBtnsClick', clickName) 给 业务层 进行操作
      typeRender: row => { return row.aaa }, // 根据row 来渲染 type
      wordRender: row => { return row.aaa }, // 根据row 来渲染 word
      clickNameRender: row => { return row.aaa }, // 根据row 来渲染 clickName
      hidden(row) {
        console.log(row)
        return false // 隐藏按钮flag 默认false
      }
    }
  ]
}

/**
 * sum信息function
 * */
export function summaryMethod(param) {
  const { columns, data } = param
  console.log(columns, data) // columns列信息, data:数据list
  const sums = []
  console.log(sums)
  return sums
}

/**
 * 总项
 * */
export const tableConfig = {
  selection, // 配置选择框是否显示
  columns, // 配置普通显示项
  operationBtns, // 配置 最右 操作按钮项
  summaryMethod // sum信息function
}
