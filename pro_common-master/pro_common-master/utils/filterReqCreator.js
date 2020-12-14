/**
 * 制造 搜索栏 对应的 filter
 * 若 为 初始空值，， 则 req中 不带对应字段
 * @param {object} emptyObj 搜索栏 对象， 空值时对象
 * @param {object} reqObj 请求对象
 * @return temp 返回 reqObj 中有改变值的字段对象
 * 如: empty={aaa: '', bbb: null}
 * --> reqObj={aaa: '', bbb: 1}
 * --> 返回 temp === {bbb: 1}
 * */
function filterReqCreator(emptyObj, reqObj) {
  const temp = {}
  Object.keys(emptyObj).forEach(key => {
    if (reqObj[key] === emptyObj[key]) return
    temp[key] = reqObj[key]
  })
  return temp
}

export default filterReqCreator
