<!--
  导航面包屑 组件
-->
<template>
<el-breadcrumb class="app-breadcrumb" separator="/">
  <transition-group name="breadcrumb">
    <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
      <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">
        {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </transition-group>
</el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      // 原逻辑为  有name 才会显示 导航面包屑
      // let matched = this.$route.matched.filter(item => item.name)
      // 现改为 所有均显示
      let matched = this.$route.matched
      const last = matched[matched.length - 1]
      // 面包屑 导航设置 默认添加 dashboard 为首页
      // 当第一页不是 首页时 默认添加首页
      if (last && (!last.name || last.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase())) {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      const toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) return this.$router.push(redirect)
      this.$router.push(this.pathCompile(path))
    }
  },
  created() {
    this.getBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
