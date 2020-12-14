/**
 * 修改 文件后缀
 * */
const through = require("through2")
const Vinyl = require("vinyl")

const changeExt = (ext, newExt) => {
  return through.obj(function (file, encoding, cb) {
    this.push(new Vinyl({
      cwd: file.cwd,
      base: file.base,
      path: file.path.replace(RegExp(("." + ext + "$")), ('.' + newExt)),
      contents: file.contents
    }))
    cb()
  })
}

// 将 空行去掉
const trimEmptyLine = () => {
  return through.obj(function (file, encoding, cb) {
    this.push(new Vinyl({
      cwd: file.cwd,
      base: file.base,
      path: file.path,
      contents: Buffer.from(file.contents.toString().split(/[\r\n]+/g).filter(i => !/^\s+$/.test(i)).join('\r\n'), encoding)
    }))
    cb()
  })
}

module.exports = {
  changeExt,
  trimEmptyLine
}
