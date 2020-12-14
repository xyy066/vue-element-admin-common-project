<!--
文档:
https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/pagination.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F
-->
<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scrollTo'

export default {
  name: 'CompPagination',
  props: {
    // 总条数
    total: { required: true, type: Number },
    page: { type: Number, default: 1 },
    limit: { type: Number, default: 20 },
    pageSizes: { type: Array, default() { return [10, 20, 30, 50] } },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: { type: Boolean, default: true },
    autoScroll: { type: Boolean, default: true },
    hidden: { type: Boolean, default: false }
  },
  computed: {
    currentPage: {
      get() { return this.page },
      set(val) { // 详见 vue文档 .sync 修饰符 https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
