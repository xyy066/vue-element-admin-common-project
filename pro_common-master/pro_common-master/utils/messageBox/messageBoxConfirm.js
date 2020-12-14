import { MessageBox } from 'element-ui'

/**
 * @param {object} opt string: 内容， obj:配置项
 * @return {Promise<string>} promise<action: string> 返回动作 'confirm' 'cancel'
 * */
export const simpleConfirm = opt => {
  let message = ''
  let title = '温馨提示'
  let option = {}
  if (typeof opt == 'string') {
    message = opt
  } else {
    message = opt.message
    option = opt
    if (option.title) title = option.title
  }
  return new Promise(resolve => {
    MessageBox.confirm(message, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      callback(action) { resolve(action) },
      ...option
    })
  })
}
