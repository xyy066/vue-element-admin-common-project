const path = require('path')
const {proCommonPath} = require('../common_config/absolute_paths')

module.exports = {
  resolve: {
    alias: {
      /** 本目录 */
      '@': path.resolve(__dirname, './src'),
      '@pro_common': proCommonPath
    }
  }
}
