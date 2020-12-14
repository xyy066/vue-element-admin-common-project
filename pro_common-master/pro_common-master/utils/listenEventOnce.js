/**
 * 监听一次 元素事件 后 解绑
 * */

function listenEventOnce(el, eventStr, handler) {
  const eventHandler = () => {
    el.removeEventListener(eventStr, eventHandler)
    handler()
  }
  el.addEventListener(eventStr, eventHandler)
}

export default listenEventOnce
