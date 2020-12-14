/**
 * @type {boolean} true | false
 * @description Whether need tagsView
 */
export const needTagsView = true

/**
 * @type {boolean} true | false
 * @description Whether fix the header
 */
export const fixedHeader = true // 固定 头部 导航栏 Flag

/**
 * @type {boolean} true | false
 * @description Whether show the logo in sidebar
 */
export const showSidebarLogo = true // 显示 边栏logo

/**
 * @type {string | array} 'production' | ['production', 'development']
 * @description Need show err logs component.
 * The default is only used in the production env
 * If you want to also use it in dev, you can pass ['production', 'development']
 */
export const needErrorLog = ['production', 'development']

