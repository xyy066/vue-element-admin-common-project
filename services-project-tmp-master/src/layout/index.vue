<template>
<div :class="classObj" class="app-wrapper">
  <Sidebar class="sidebar-container" />
  <div :class="{hasTagsView:needTagsView}" class="main-container">
    <div :class="{'fixed-header':fixedHeader}">
      <Navbar />
      <TagsView v-if="needTagsView" />
    </div>
    <app-main />
  </div>
</div>
</template>

<script>
import store from '@/store/index'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import AppMain from './components/AppMain.vue'
import TagsView from './components/TagsView/TagsView.vue'
import { fixedHeader, needTagsView } from '@/settings'

export default {
  name: 'Layout',
  data() {
    return {
      fixedHeader: fixedHeader, // 固定头部
      needTagsView: needTagsView // tags 用于跳转 浏览记录页面
    }
  },
  computed: {
    sidebar() { return store.state.app.sidebar },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened
      }
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  }
}
</script>

<style lang="scss" scoped>
@import "~@pro_common/styles/mixin";
@import "~@pro_common/styles/variables";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}
</style>
