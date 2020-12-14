<template>
<div class="navbar">
  <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
  <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
  <div class="right-menu">
    <screenfull id="screenfull" class="right-menu-item hover-effect" />
<!--      <lang-select class="right-menu-item hover-effect" />-->
    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
      <div class="avatar-wrapper">
        <div class="user-avatar">{{ username }}</div>
<!--          <i class="el-icon-caret-bottom" />-->
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</div>
</template>

<script>
import store from '@/store/index'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import { user_logout } from "@/store/actions"
import { APP_TOGGLE_SIDEBAR } from '@/store/mutation-types'

export default {
  computed: {
    sidebar() { return store.state.app.sidebar },
    username() { return store.state.user.name }
  },
  methods: {
    toggleSideBar() {
      store.commit(APP_TOGGLE_SIDEBAR)
    },
    async logout() {
      await store.dispatch(user_logout)
      this.$router.push(`/login`)
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  }
}
</script>

<style lang="scss" scoped>
@import "~@pro_common/styles/colors.scss";
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .avatar-container {
      margin-right: 10px;
      .avatar-wrapper {
        margin-top: 16px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          min-width: 40px;
          font-size: 16px;
          line-height: 20px;
          color: $dark-less;
        }
        .el-icon-caret-bottom {
          position: relative;
          top: -1px;
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
