/**
 * 错误静默处理
 * */
import requestFactory from "@/api/requestFactory";

const service = requestFactory(
  false,
  true
)

export default service
