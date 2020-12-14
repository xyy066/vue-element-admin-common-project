const {proCommonPath} = require('../common_config/absolute_paths')
const path = require('path')
module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transformIgnorePatterns: [
    'node_modules/(?!(babel-jest|jest-vue-preprocessor)/)'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: { // jest 的 路径配置
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@pro_common/(.*)$': path.join(proCommonPath, '/$1')
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: ['src/utils/**/*.{js,vue}', '!src/utils/auth.js', '!src/utils/request.js', 'src/components/**/*.{js,vue}'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  // 'collectCoverage': true,
  'coverageReporters': [
    'lcov',
    'text-summary'
  ],
  testURL: 'http://localhost/'
}
