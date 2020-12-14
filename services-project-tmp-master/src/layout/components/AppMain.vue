<template>
<section class="app-main">
  <transition name="fade-transform" mode="out-in">
    <!-- 移除keep-alive -->
    <keep-alive :include="cachedViews" :max="6">
      <router-view :key="key" />
    </keep-alive>
  </transition>
</section>
</template>

<script>
import store from '@/store/index'

export default {
  name: 'AppMain',
  computed: {
    cachedViews() { return store.state.tagsView.cachedViews },
    key() { return this.$route.fullPath }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

