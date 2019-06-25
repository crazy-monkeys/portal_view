<template>
  <div class="page-container">
    <div class="page-header">
      <bread-bar :data="breadList" />
      <h2 class="title">新客复购</h2>
    </div>
    <div class="page-content">
      <div class="filter-bar">
        <div class="filter-area">
          <el-select v-model="filter.dateFormat" placeholder="请选择" size="small">
            <el-option
              v-for="item in filter.formatOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            class="date-range"
            v-model="filter.dateRange"
            type="daterange"
            size="small"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button size="small" @click.stop="search" type="primary" plain class="search-button">搜索</el-button>
        </div>
        <div class="action-area">
          <el-button type="text"  class="export-button" @click.stop="exportList">
            <i class="unex unex-icon-export"></i>
            导出
          </el-button>
        </div>
      </div>
      <el-table :data="data">
        <el-table-column prop="orderDate" label="统计时间" align="center"/>
        <el-table-column prop="totalNum" label="新客人数" align="right"/>
        <el-table-column prop="rePurchaseNum" label="新客复购人数" align="right"/>
        <el-table-column prop="rePurchaseRatio" label="新客复购率" align="right"/>
        <el-table-column prop="orderNum" label="新客订单总量" align="right"/>
        <el-table-column prop="totalActual" label="新客订单总金额" align="right"/>
        <el-table-column prop="avgPrice" label="新客客单价" align="right"/>
      </el-table>
    </div>
  </div>
</template>
<script>
import breadBar from '@/components/common/breadBar'
import customPagination from '@/components/common/customPagination'
import { getRepurchaseList, exportRepurchaseList } from '@/api/customer'
import moment from 'moment'
export default {
  name: 'repurchase',
  components: { breadBar, customPagination },
  data () {
    return {
      shopId: this.$store.state.shopId.shopId,
      breadList: ['客户洞察', '客户分析', '新客复购'],
      data: [],
      filter: {
        formatOptions: [
          { label: '按月统计', value: 'YYYY-MM' },
          { label: '按年统计', value: 'YYYY' }
        ],
        dateFormat: 'YYYY-MM',
        dateRange: [new Date(), new Date()]
      }
    }
  },
  computed: {
    isYear () {
      return this.filter.dateFormat === 'YYYY'
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const { dateFormat, dateRange } = this.filter
      const result = await getRepurchaseList({
        shopId: this.shopId,
        dateFormat: dateFormat,
        startTime: moment(dateRange[0]).format(dateFormat),
        endTime: moment(dateRange[1]).format(dateFormat)
      })
      this.data = result
    },
    search () {
      this.getData()
    },
    async exportList () {
      const { dateFormat, dateRange } = this.filter
      const result = await exportRepurchaseList({
        shopId: this.shopId,
        dateFormat: dateFormat,
        startTime: moment(dateRange[0]).format(dateFormat),
        endTime: moment(dateRange[1]).format(dateFormat)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .filter-bar {
  .el-select {
    .el-input__inner {
      width: 100px;
    }
    .el-input__icon {
      line-height: 32px;
    }
  }
  .date-range {
    position: relative;
    left: -1px;
    margin-right: 16px;
    width: 280px;
  }
}
</style>

