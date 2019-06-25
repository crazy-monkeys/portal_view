<template>
  <div class="bread-bar">
    <el-breadcrumb :separator="separator">
      <el-breadcrumb-item v-for="(item, index) in data" :key="index">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'breadBar',
  props: {
    data: {
      type: Array,
      required: true,
      default: []
    },
    separator: {
      type: String,
      required: false,
      default: '/'
    }
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/variable.scss';
/deep/.bread-bar {
 .el-breadcrumb {
    font-size: $small;
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        color: $grey-light;
      }
      .el-breadcrumb__separator {
        color: $grey-light;
      }
    }
  }
}
</style>
