// import { Notification } from 'element-ui'
/**
 * 列表 业务层
 * */

import {simpleAlert} from "@pro_common/utils/messageBox/messageBoxAlert";
import {simpleConfirm} from "@pro_common/utils/messageBox/messageBoxConfirm";
import {reqSuccessNotification} from "@pro_common/utils/notification/notification";

/**
 * 批量操作
 * @param {object} vm 上下文
 * @param {object} selection 选中数组
 * @param {string} getListKey getList 函数的 key
 * @param {object} api 请求api
 * @param {object=} reqParam 请求参数
 * @param {string=} pendingKey 等待Key
 * @param {string} emptyMsg 选择为空提示语
 * @param {string} confirmWord 确认语
 * @param {string} successMsg 成功提示语
 * */
export const batchOperate = async ({
  vm, selection, getListKey, api, reqParam,
  pendingKey, emptyMsg, confirmWord, successMsg
}) => {
  if (!selection.length) return simpleAlert(emptyMsg)
  // 确认弹窗
  const res = await simpleConfirm(confirmWord)
  if (res != 'confirm') return
  // 确认删除
  if (pendingKey && vm[pendingKey]) return // 请求中
  try {
    if (pendingKey) vm[pendingKey] = true
    await api(reqParam)
    reqSuccessNotification(successMsg)
    vm[getListKey]()
  } catch (e) {
    console.log(e)
    if (pendingKey) vm[pendingKey] = false
  }
}
