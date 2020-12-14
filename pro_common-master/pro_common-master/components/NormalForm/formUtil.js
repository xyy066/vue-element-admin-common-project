import ServiceError from "@pro_common/error/ServiceError";

/**
 * 找到 对应 formItem 的config
 * @param {object} vm
 * @param { string } formConfigKey
 * @param { string } prop 对应 configItem 中 prop
 * */
export const findItemConfig = (vm, formConfigKey, prop) => {
  for (let i = 0, l = vm[formConfigKey].items.length; i < l; i++) {
    if (vm[formConfigKey].items[i].prop == prop) return vm[formConfigKey].items[i]
  }
  throw new ServiceError('调用 @pro_common/components/NormalForm/formUtil.js 找不到对应 prop: ' + prop)
}
