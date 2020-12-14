import str2NumStr from '@pro_common/utils/str2NumStr.js'

describe('@pro_common/utils/str2NumStr', () => {
  it(`空字符串返回 ""`, () => {
    expect(str2NumStr('')).toBe('')
  })
  it(`非法字符返回""`, () => {
    expect(str2NumStr('123asd')).toBe('')
  })
  it(`整数返回 整数`, () => {
    expect(str2NumStr('123')).toBe('123')
  })
  it(`小数默认向下取整两位`, () => {
    expect(str2NumStr('123.12999')).toBe('123.12')
  })
  it(`小数取整 带 精确小数位`, () => {
    expect(str2NumStr('123.333999', 3)).toBe('123.333')
  })
  it(`precision 为 0 返回整数 `, () => {
    expect(str2NumStr('123.333', 0)).toBe('123')
  })
})
