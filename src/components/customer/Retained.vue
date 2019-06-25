<template>
  <div class="page-container">
    <div class="page-header">
      <bread-bar :data="breadList" />
      <h2 class="title">老客留存</h2>
    </div>
    <div class="page-content">
      <div class="filter-bar">
        <div class="filter-area">
          <label>统计时间段：</label>
          <el-select v-model="filter.year" placeholder="请选择" size="small">
            <el-option
              v-for="(item, index) in yearFilter"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-radio-group size="small"  v-model="filter.type">
            <el-radio-button label="lastYearList">上一年交易人数</el-radio-button>
            <el-radio-button label="allHistoryList">历史交易人数</el-radio-button>
          </el-radio-group>
          <el-button type="primary" size="small" plain @click.stop="search" class="search-button">搜索</el-button>
        </div>
        <div class="action-area">
          <el-button type="text"  class="export-button" @click.stop="exportList">
            <i class="unex unex-icon-export"></i>
            导出
          </el-button>
        </div>
      </div>
      <el-table :data="data">
        <el-table-column prop="orderYear" label="统计时间" align="center"/>
        <el-table-column prop="lastTradeNum" label="上一年交易人数" align="right"/>
        <el-table-column prop="currentTradeNum" label="当年交易人数" align="right"/>
        <el-table-column prop="currentRetainedNum" label="本年留存人数" align="right"/>
        <el-table-column prop="currentRetainedRatio" label="本年留存率" align="right"/>
        <el-table-column prop="orderNum" label="本年留存订单量" align="right"/>
        <el-table-column prop="totalActual" label="本年留存订单总金额" align="right"/>
        <el-table-column prop="totalActual" label="本年留存客单价" align="right"/>
      </el-table>
    </div>
  </div>
</template>
<script>
import breadBar from '@/components/common/breadBar'
import customPagination from '@/components/common/customPagination'
import { getRetainedList, exportRetainedList } from '@/api/customer'
export default {
  components: { breadBar, customPagination },
  data () {
    return {
      shopId: this.$store.state.shopId.shopId,
      breadList: ['客户洞察', '客户分析', '老客留存'],
      yearFilter: [new Date().getFullYear()],
      filter: {
        year: new Date().getFullYear(),
        type: 'lastYearList'
      },
      data: []
    }
  },
  computed: {},
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const result = await getRetainedList({
        shopId: this.shopId,
        orderYearStr: this.filter.year
      })
      this.yearFilter = result.yearArray
      this.data = result[this.filter.type]
      console.log(this.data)
    },
    search () {
      this.getData()
    },
    async exportList () {
      await exportRetainedList({
        shopId: this.shopId,
        orderYearStr: this.filter.year,
        isAllHistory: this.filter.type === 'allHistoryList' ? 1 : 0
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/variable.scss';
/deep/ .filter-bar {
  .el-select {
    .el-input__inner {
      width: 100px;
    }
    .el-input__icon {
      line-height: 32px;
    }
  }
}
</style>
