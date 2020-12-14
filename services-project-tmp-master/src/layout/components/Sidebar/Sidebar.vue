<template>
<div :class="{'has-logo':showLogo}">
  <logo v-if="showLogo" :collapse="isCollapse" />
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu" :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false" mode="vertical">
      <sidebar-item v-for="route in permissionRoutes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</div>
</template>

<script>
import store from '@/store/index'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@pro_common/styles/variables.scss'
import { showSidebarLogo } from '@/settings'

export default {
  data() {
    return {
      showLogo: showSidebarLogo,
      vmHasDestroyed: false // 组件 销毁Flag
    }
  },
  computed: {
    sidebar() { return store.state.app.sidebar },
    permissionRoutes() { return store.state.permission.routes },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      return meta.activeMenu || path
    },
    variables() { return variables },
    isCollapse() { return !this.sidebar.opened }
  },
  components: {
    SidebarItem,
    Logo
  }
}
</script>
