<template>
  <div class="page-title title-bar">
    <span class="page-title-content">
      <i class="el-icon-back" @click="back" v-if="showBack"></i>
      <span class="page-title-line" v-if="showBack"></span>
      <span class="page-title-text">{{title}}</span>
    </span>
    <slot name="extend"></slot>
  </div>
</template>
<script>
export default {
  name: 'PageTitle',
  data () {
    return {
      currentBtnList: this.btnList,
      currentBtnGroupList: this.btnGroupList
    };
  },
  props: {
    title: {
      type: String,
      require: true
    },
    backPath: {
      type: String,
      require: true
    },
    showBack: {
      type: Boolean,
      require: false,
      default: true
    },
    validate: {
      type: Boolean,
      require: true
    },
    confirmInfo: {
      type: String,
      require: false
    },
    btnActive: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  methods: {
    back () {
      if (!this.backPath) {
        this.$router.go(-1)
      }
      if (this.validate) {
        this.$confirm(this.confirmInfo, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$router.push({path: this.backPath})
        }).catch(() => {})
      } else {
        this.$router.push({path: this.backPath})
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import '../../styles/variable';
.title-bar{
  height: 32px;
  line-height: 32px;
  .page-title-content{
    float: left;
  }
  .btn-list{
    float: right;
    padding-right: 24px;
    .el-button{
      min-width: 90px;
    }
  }
}
.page-title {
  margin-left: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.page-title .page-title-content {
  display: flex;
  align-items: center;
}

.page-title i {
  color: $grey;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  margin: 5px;
}

.page-title .page-title-text {
  font-size: $xLarge;
  color: $grey-deep;
  font-weight: 600;
}

.page-title .page-title-line {
  border-left: 1px solid $grey-5;
  display: inline-block;
  height: 18px;
  margin: 1px 16px 0;
}

.btn-group-single{
  min-width: 60px !important;
  width: 74px !important;
  border-radius: 0;
  /deep/ .iconfont{
    font-size: 12px;
  }
  /deep/ i{
    margin-right: 8px;
    margin-left: -4px;
  }
}
.icon-rotate{
  /deep/ i{
    display: inline-block;
    transform: rotate(90deg);
  }
}
</style>
