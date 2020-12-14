/**
 * 组装 json -> aaa=123&bbb=321
 * 对象 {aaa: 123, bbb: 'ccc'} 转 param   aaa=123&bbb=ccc
 * */
function obj2Param(json) {
  if (!json) return ''
  return Object.keys(json).reduce((tmp, key) => {
    if (json[key] == undefined) return tmp
    tmp.push(encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
    return tmp
  }, []).join('&')
}

export default obj2Param
