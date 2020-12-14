/**
 * 生成 list 模板
 * */
const gulp = require("gulp")
const ejs = require("gulp-ejs")
const conf = require("./configs.js")
const through = require('through2')
const { changeExt, trimEmptyLine } = require("../utils")

function genList() {
    return gulp.src('src/genList/template/List.ejs')
      .pipe(ejs(conf))
      .pipe(changeExt('ejs', 'vue'))
      .pipe(trimEmptyLine())
      .pipe(through.obj(function(file, encoding, cb) {
        this.push(file)
        cb()
      }))
      .pipe(gulp.dest("dist_list"))
}

module.exports = genList


