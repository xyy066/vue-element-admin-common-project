const gulp = require("gulp")
const genList = require("./src/genList/genList")

// 生成 列表页
gulp.task("genList", () => genList())
