'use strict'
const path = require('path')
const {proCommonPath} = require('../common_config/absolute_paths')

/** 项目名称 */
const name = '水果到家管理后台' // page title
const proName = process.env.PRO_NAME || 'agent'
console.log('/***************************************')
console.log(`*********正在打包 [${name}]**********`)
console.log('***************************************/')

/** entry */
const entry = { // 当 内嵌项目时，， 可通过 proName 区分多套项目
  agent: './src/main.js'
  // sales: './src_sales/main.js'
}

const resolve = dir => path.join(__dirname, dir)

const port = 8384 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    disableHostCheck: true, // 不检验 访问域名 是否为 localhost
    overlay: {
      warnings: false,
      errors: true
    },
    /**
     * 跨域
     * 1. 可配置 proxy (本质为 开启一个 nodejs 服务器， 来转发请求)
     * 2. 配置 一个 nginx 服务 进行请求转发
     * */
    proxy: {
      // change /xxx-api/login => /login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://10.15.12.137:8087`, // 测试机 环境
        target: `http://localhost:8087`, // mock阶段 对接
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
    // after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name,
    resolve: { alias: { '@pro_common': proCommonPath, '@': resolve('src') } }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO_VUE_ELEMENT_ADMIN: need test
    config.plugins.delete('prefetch') // TODO_VUE_ELEMENT_ADMIN: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(path.join(proCommonPath, '/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.join(proCommonPath, '/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-module-eval-source-map')
        /** 可改为 'cheap-source-map' 等模式。区别见文档 */
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
    config.entry('app').clear().add(entry[proName])
  }
}
