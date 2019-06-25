<template>
  <div class="custom-pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="sizes"
      :page-size="size"
      :layout="layout"
      :total="total"
      :pager-count="5"/>
  </div>
</template>
<script>
export default {
  name: 'customPagination',
  props: {
    page: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: false,
      default: 0
    },
    size: {
      type: Number,
      required: false,
      default: 20
    },
    sizes: {
      type: Array,
      required: false,
      default: () => [10, 20, 40]
    },
    layout: {
      type: String,
      required: false,
      default: 'sizes, total, jumper, prev, pager, next, slot'
    }
  },
  data () {
    return {}
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.custom-pagination {
  .el-pagination {
    display: flex;
    font-size: 14px;
    padding: 0;
    justify-content: stretch;
    align-items: center;
    span:not([class*=suffix]), button {
      height: 32px;
      line-height: 32px;
    }
    .el-input--mini .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
    .el-pagination__editor {
      .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
    }
    .el-pagination__sizes {
      flex-grow: 3;
    }
  }
}

</style>
