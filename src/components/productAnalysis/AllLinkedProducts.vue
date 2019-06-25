<template>
  <div class="page-content">
    <div class="filter-bar">
      <div class="filter-area">
        <el-button class="export-button" type="text" @click.stop="back">
          <i class="unex unex-icon-single-left" />
          后退
        </el-button>
      </div>
      <div class="action-area">
        <el-button class="export-button" type="text" @click.stop="exportAllLinkedProducts">
          <i class="unex unex-icon-export" />
          导出
        </el-button>
      </div>
    </div>
    <el-table :data="data">
      <el-table-column label="排名" prop="" align="left" />
      <el-table-column label="商品名称" prop="" align="left" />
      <el-table-column label="商品SKU" prop="" align="left" />
      <el-table-column label="下单人数" prop="" align="right" />
      <el-table-column label="销量" prop="" align="right" />
      <el-table-column label="销售额" prop="" align="center" />
      <el-table-column label="关联商品名称" prop="" align="left" />
      <el-table-column label="关联商品SKU" prop="" align="left" />
      <el-table-column label="关联下单人数" prop="" align="right" />
      <el-table-column label="关联销量" prop="" align="right" />
      <el-table-column label="关联销售额" prop="" align="right" />
      <el-table-column label="客户关联度" prop="" align="right" />
      <el-table-column label="销量关联度" prop="" align="right" />
      <el-table-column label="销售额关联度" prop="" align="right" />
    </el-table>
    <div class="page-footer">
      <custom-pagination :page="pagination.page" :total="pagination.total" :size="pagination.size" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import customPagination from '@/components/common/customPagination'
import { getAllLinkedProducts, exportAllLinkedProducts } from '@/api/productAnalysis'
import moment from 'moment'
export default {
  components: { customPagination },
  props: {
    filter: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      shopId: this.$store.state.shopId.shopId,
      data: [],
      pagination: {
        page: 1,
        total: 0,
        size: 20
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const { topNum, tradeStatus, dateRange, customerType, snapshot, priceRange, salesRange } = this.filter
      const result = await getAllLinkedProducts({
        shopId: this.shopId,
        topNum: topNum,
        tradeStatus: tradeStatus,
        snapShootId: snapshot,
        customerType: customerType,
        startTime: dateRange && moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: dateRange && moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
        totalMinPrice: priceRange[0],
        totalMaxPrice: priceRange[1],
        minPrice: salesRange[0],
        maxPrice: salesRange[1],
        topSkuCodes: '',
        pageIndex: this.pagination.page,
        pageSize: this.pagination.size
      })
      this.data = result.list
    },
    async exportAllLinkedProducts () {
      const { topNum, tradeStatus, dateRange, customerType, snapshot, priceRange, salesRange } = this.filter
      const result = await exportAllLinkedProducts({
        shopIds: this.shopId,
        topNum: topNum,
        tradeStatus: tradeStatus,
        snapShootId: snapshot,
        customerType: customerType,
        startTime: dateRange && moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: dateRange && moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
        totalMinPrice: priceRange[0],
        totalMaxPrice: priceRange[1],
        minPrice: salesRange[0],
        maxPrice: salesRange[1],
        topSkuCodes: '',
      })
    },
    back () {
      this.$emit('back')
    },
    handleSizeChange (val) {
      this.pagination.size = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.pagination.page = val
      this.getData()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
