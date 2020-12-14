/**
 * 表单的 service
 * */
import ServiceError from "@pro_common/error/ServiceError";

export const formValidate = Form => {
  return new Promise((resolve, reject) => {
    Form.validate(valid => {
      if (valid) return resolve()
      reject(new ServiceError('[表单验证失败]', {Form}))
    })
  })
}
