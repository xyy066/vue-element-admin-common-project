<template>
<div class="dashboard-editor-container">
  admin dashboard
  <PageTitle title="adasdasdasd" />
</div>
</template>

<script>
import PageTitle from '@pro_common/components/PageTitle/PageTitle.vue'
export default {
  name: 'DashboardAdmin',
  components: {
    PageTitle
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px 20px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
