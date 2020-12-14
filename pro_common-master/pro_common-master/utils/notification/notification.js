import { Notification } from 'element-ui'

/**
 * 错误通知 队列 用于 控制 显示 req数量
 * */
const reqErrorQueue = {
  // 最多同时显示4个 (每次 调用 errorNotification 时先执行的 清洗, 在 推入新通知,故 -1)
  max: (4 - 1),
  _queue: [], // 内部队列
  push(item) { this._queue.push(item) },
  flush() { // 清理 多出来的 notification
    const moreNum = this._queue.length - this.max // 多出个数
    if (moreNum <= 0) return
    for (let i = moreNum; i--;) { // 从后往前删
      const instance = this._queue.splice(i, 1)[0]
      if (instance && instance.close) instance.close()
    }
  },
  pop(instance) {
    for (let i = 0, l = this._queue.length; i < l; i++) {
      if (this._queue[i]._uid === instance._uid) {
        this._queue.splice(i, 1)
        break
      }
    }
  }
}

/**
 * req的成功通知
 * */
export const reqSuccessNotification = message => {
  Notification({ title: '操作成功', message, type: 'success', duration: 2000 })
}

/**
 * req的失败通知
 * */
export const reqErrorNotification = message => {
  reqErrorQueue.flush() // 清洗多出max 通知
  const instance = Notification.error({
    title: '请求异常', message, duration: 3000,
    onClose() {
      reqErrorQueue.pop(instance)
    }
  })
  reqErrorQueue.push(instance)
}
