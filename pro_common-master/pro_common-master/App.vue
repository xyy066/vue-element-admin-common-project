<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
/*#app {*/
/*  position: relative;*/
/*}*/
.el-date-editor .el-range-separator{
    width: 10%;
}
/** element-UI 样式改写 */
.el-dialog {
  margin-bottom: 30px;
}
</style>
