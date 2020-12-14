<template>
<div id="tags-view-container" class="tags-view-container">
  <scroll-pane ref="scrollPane" class="tags-view-wrapper">
    <router-link
      v-for="tag in visitedViews"
      ref="tag"
      :key="tag.path"
      :class="isActive(tag)?'active':''"
      :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      tag="span"
      class="tags-view-item"
      @click.middle.native="closeSelectedTag(tag)"
      @contextmenu.prevent.native="openMenu(tag,$event)"
    >
      {{ tag.title }}
      <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
    </router-link>
  </scroll-pane>
  <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
    <li @click="refreshSelectedTag(selectedTag)">刷新</li>
    <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)"
        @click="closeSelectedTag(selectedTag)">关闭</li>
    <li @click="closeOthersTags">关闭其它</li>
    <li @click="closeAllTags(selectedTag)">关闭所有</li>
  </ul>
</div>
</template>

<script>
import store from '@/store/index'
import ScrollPane from './ScrollPane'
import path from 'path'
import {
  TAGS_VIEW_ADD_CACHED_VIEW,
  TAGS_VIEW_ADD_VISITED_VIEW,
  TAGS_VIEW_DEL_ALL_CACHED_VIEWS,
  TAGS_VIEW_DEL_ALL_VISITED_VIEWS_EXCE_FIX,
  TAGS_VIEW_DEL_CACHED_VIEW,
  TAGS_VIEW_DEL_OTHERS_CACHED_VIEWS,
  TAGS_VIEW_DEL_OTHERS_VISITED_VIEWS,
  TAGS_VIEW_DEL_VISITED_VIEW,
  TAGS_VIEW_UPDATE_VISITED_VIEW
} from "@/store/mutation-types"

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() { return store.state.tagsView.visitedViews },
    routes() { return store.state.permission.routes }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    filterAffixTags(routes, basePath = '/') {
      return routes.reduce((tags, route) => {
        if (route.meta && route.meta.affix) { // 有 meta affix 固定属性
          const tempPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tempPath,
            path: tempPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) { // 有子路由
          const tagsChildren = this.filterAffixTags(route.children, route.path)
          if (tagsChildren.length) tags = tags.concat(tagsChildren)
        }
        return tags
      }, [])
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      affixTags.forEach(tag => {
        if (!tag.name) return // Must have tag name
        store.commit(TAGS_VIEW_ADD_VISITED_VIEW, tag)
      })
    },
    addTags() {
      const { name } = this.$route
      if (!name) return
      store.commit(TAGS_VIEW_ADD_VISITED_VIEW, this.$route)
      store.commit(TAGS_VIEW_ADD_CACHED_VIEW, this.$route)
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (let i = 0, l = tags.length; i < l; i++) {
          const tag = tags[i]
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              store.commit(TAGS_VIEW_UPDATE_VISITED_VIEW, this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      store.commit(TAGS_VIEW_DEL_CACHED_VIEW, view)
      const { fullPath } = view
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    },
    async closeSelectedTag(view) {
      store.commit(TAGS_VIEW_DEL_VISITED_VIEW, view)
      store.commit(TAGS_VIEW_DEL_CACHED_VIEW, view)
      if (!this.isActive(view)) return
      // 当前页 为 删除页
      this.toLastView(store.state.tagsView.visitedViews, view)
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      store.commit(TAGS_VIEW_DEL_OTHERS_VISITED_VIEWS, this.selectedTag)
      store.commit(TAGS_VIEW_DEL_OTHERS_CACHED_VIEWS, this.selectedTag)
      this.moveToCurrentTag()
    },
    closeAllTags(view) {
      store.commit(TAGS_VIEW_DEL_ALL_VISITED_VIEWS_EXCE_FIX)
      store.commit(TAGS_VIEW_DEL_ALL_CACHED_VIEWS)
      // 判断 当前页 是否 为 affix, 是则不用跳转
      if (this.affixTags.some(tag => tag.path === view.path)) return
      const visitedViews = store.state.tagsView.visitedViews
      this.toLastView(visitedViews, view)
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      // 有最后一页
      if (latestView) { return this.$router.push(latestView) }
      // 无最后一页
      // now the default is to redirect to the home page if there is no tags-view,
      // you can adjust it according to your needs.
      // 非首页
      if (view.name !== 'Dashboard') return this.$router.push('/')
      // 首页 to reload home page
      this.$router.replace({ path: '/redirect' + view.fullPath })
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
