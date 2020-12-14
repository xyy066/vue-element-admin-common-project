<template>
<div class="login-container">
  <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
    <div class="title-container">
      <h3 class="title">水果到家后台登录</h3>
    </div>
    <el-form-item prop="username">
      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <el-input tabindex="1" ref="username" v-model="loginForm.username"
        placeholder="账号" name="username" type="text" auto-complete="on" />
    </el-form-item>
    <el-tooltip v-model="capsTooltip" content="大写锁定已打开" placement="right" manual>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input tabindex="2" :key="passwordType" ref="password" v-model="loginForm.password"
                  :type="passwordType" placeholder="密码" name="password" auto-complete="on"
                  @keyup.native="checkCapslock" @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
    </el-tooltip>
     <el-form-item prop="yzm">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input tabindex="3" ref="yzm" v-model="loginForm.yzm"
          placeholder="请输入谷歌验证码" name="yzm" type="text" maxlength="6" auto-complete="on" />
    </el-form-item>
    <el-button tabindex="4" :loading="loading" type="primary"
               style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
  </el-form>
</div>
</template>

<script>
import { user_login } from "@/store/actions"
import {reqErrorNotification} from "@pro_common/utils/notification/notification";
import {getError, removeError} from "@/storage/auth";

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        yzm: ''
      },
      loginRules: {
        username: [{ required: true, message: '请填写账号' }],
        password: [{ required: true, message: '请填写密码' }],
        yzm: [{ required: true, message: '请填写谷歌验证码' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        this.capsTooltip = shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z');
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      console.log(this.loginForm)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch(user_login, this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /** 释放 store 中的错误 */
    releaseStoreError() {
      const errorObj = getError()
      if (!errorObj) return
      // 释放 错误显示
      reqErrorNotification(errorObj.msg)
      removeError()
    }
  },
  mounted() {
    this.releaseStoreError() // 释放 store 中的 错误
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    } else if (this.loginForm.yzm === '') {
      this.$refs.yzm.focus()
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
