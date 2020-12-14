import { MessageBox } from 'element-ui'

/**
 * @param {object} opt string:内容  obj:配置项
 * @return {Promise<string>} promise<action: string> 返回动作 'confirm' 'cancel'
 * */
export const simpleAlert = opt => {
  let message = ''
  let option = {}
  if (typeof opt == 'string') {
    message = opt
  } else { // 对象类型
    message = opt.message
    option = opt
  }
  return new Promise(resolve => {
    MessageBox.alert(message, '温馨提示', {
      callback(action) { resolve(action) },
      ...option
    })
  })
}
