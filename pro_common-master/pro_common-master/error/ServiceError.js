/**
 * 业务逻辑错误
 * */
class ServiceError extends Error {
  /**
   * @param {String=} message 错误消息
   * @param {object=} detail 详情
   * */
  constructor(message, detail) {
    super(message)
    /**
     * 在方法里 error instanceof ServiceError 出现 ServiceError未定义问题
     * 暂此实现
     * */
    this.isServiceError = true
    this.message = message;
    this.detail = detail;
  }
  static isInstance(error) {
    if (!error) return false
    return error.isServiceError
  }
}

export default ServiceError
