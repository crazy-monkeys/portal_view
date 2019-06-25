<template>
  <div class="page-container">
    <div class="page-header">
      <bread-bar :data="breadList"/>
      <h2 class="title">商品关联销售(新)</h2>
    </div>
    <el-collapse-transition v-if="targetPage === 'relation'">
      <div class="page-content">
        <div class="filter-bar">
          <div class="filter-area">
            <el-radio-group v-model="filter.topNum" size="small" @change="handleTopNumberChange">
              <el-radio-button v-for="(item, index) in filter.topProductSelector" :label="item.value" :key="index">
                {{ item.label }}
                <el-tooltip v-if="item.value === 'all'" content="点击导出Excel到本地" placement="top">
                  <i class="unex unex-icon-help"></i>
                </el-tooltip>
              </el-radio-button>
            </el-radio-group>
          </div>
          <div class="action-area">
            <el-button type="text" size="small"  class="export-button" @click.stop="exportList">
              <i class="unex unex-icon-export"></i>
              导出
            </el-button>
            <el-button size="small" :class="['filter-panel-button']" @click.stop="toggleFilterPanel">
              <i class="unex unex-icon-filter" />筛选
              <i v-if="filterPanel.isOpen" class="unex unex-icon-up" />
              <i v-else class="unex unex-icon-down" />
            </el-button>
          </div>
        </div>
        <div class="filter-panel" v-if="filterPanel.isOpen">
          <el-row :gutter="24">
            <el-col :span="6">
              <label>时间</label>
              <el-date-picker
                size="small"
                v-model="filter.dateRange"
                type="datetimerange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']" />
            </el-col>
            <el-col :span="6">
              <label>订单状态</label>
              <el-select v-model="filter.tradeStatus" placeholder="请选择" size="small">
                <el-option
                  v-for="item in filter.statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="6">
              <label>客户类型</label>
              <el-select v-model="filter.customerType" placeholder="请选择" size="small">
                <el-option
                  v-for="item in filter.customerTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="6">
              <label>快照人群</label>
              <el-select v-model="filter.snapshot" placeholder="请选择" size="small">
                <el-option
                  v-for="item in filter.snapshotOptions"
                  :key="item.snapshotId"
                  :label="item.snapshotName"
                  :value="item.snapshotId" />
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="6">
              <label>原价</label>
              <div class="inline-form">
                <el-input v-model.number="filter.priceRange[0]" size="small"/>
                <span>至</span>
                <el-input v-model.number="filter.priceRange[1]" size="small"/>
              </div>
            </el-col>
            <el-col :span="6">
              <label>销售全额</label>
              <div class="inline-form">
                <el-input v-model.number="filter.salesRange[0]" size="small"/>
                <span>至</span>
                <el-input v-model.number="filter.salesRange[1]" size="small"/>
              </div>
            </el-col>
            <el-col :span="6" :offset="6">
              <div class="button-group">
                <el-button plain @click.stop="resetFilter" size="small">重置</el-button>
                <el-button type="primary" plain @click.stop="search" size="small">搜索</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-table :data="data">
          <el-table-column label="排名" prop="" align="left" />
          <el-table-column label="商品名称" prop="" align="left" />
          <el-table-column label="商品SKU" prop="" align="left" />
          <el-table-column label="原价" prop="" align="center" />
          <el-table-column label="销售均价" prop="" align="right" />
          <el-table-column label="折扣率" prop="" align="center" />
          <el-table-column label="销量" prop="" align="right" />
          <el-table-column label="销售额" prop="" align="center" />
          <el-table-column label="订单总量" prop="" align="right" />
          <el-table-column label="订单金额" prop="" align="right" />
          <el-table-column label="下单人数" prop="" align="right" />
          <el-table-column label="操作" align="right" >
            <template slot-scope="scope">
              <el-button type="text" @click.stop="openLinkedProductDialog(scope)">查看关联商品</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-footer">
          <el-button type="primary" plain @click.stop="openAllProductList" size="small">商品关联列表</el-button>
        </div>
      </div>
    </el-collapse-transition>
    <el-collapse-transition v-if="targetPage === 'linkedAllProducts'">
      <all-linked-products @back="openRelationPage" :filter="filter"/>
    </el-collapse-transition>
    <el-dialog title="关联商品销售明细" width="900px" :visible="linkedProductDialog.visible" @close="closeLinkedProductDiaoog">
      <el-table :data="linkedProduct">
        <el-table-column label="排名" align="left" >
          <template slot-scope="scope">
            {{ scope.row.index * 1 + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="关联商品名称" prop="skuName" align="left" />
        <el-table-column label="关联商品SKU" prop="skuCode" align="left" />
        <el-table-column label="关联下单人数" prop="" align="right" />
        <el-table-column label="关联销量" prop="" align="right" />
        <el-table-column label="关联销售额" prop="" align="right" />
        <el-table-column label="客户关联度" prop="" align="right" />
        <el-table-column label="销量关联度" prop="" align="right" />
        <el-table-column label="销售额关联度" prop="" align="right" />
      </el-table>
      <div class="pagination-bar">
        <custom-pagination :page="linkedProductDialog.pagination.page" :total="linkedProductDialog.pagination.total" :size="linkedProductDialog.pagination.size" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>
      </div>
      <template slot="footer">
        <div class="dialog-footer">
          <div class="extend-area">
            <el-button type="text" class="export-button" @class="exportLinkedProduct">
              <i class="unex unex-icon-export" />
              导出
            </el-button>
          </div>
          <div class="action-area">
            <el-button type="text" @click="closeLinkedProductDiaoog">取消</el-button>
            <el-button type="primary" @click="closeLinkedProductDiaoog">确定</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import breadBar from '@/components/common/breadBar'
import customPagination from '@/components/common/customPagination'
import AllLinkedProducts from './AllLinkedProducts'
import { getProducts, exportPorducts, getLinkedProducts, exportLinkedProducts } from '@/api/productAnalysis'
import { getSnapshot } from '@/api/snapshot'
import moment from 'moment'
export default {
  name: 'productRelation',
  components: { breadBar, customPagination, AllLinkedProducts },
  data () {
    return {
      shopId: this.$store.state.shopId.shopId,
      breadList: ['客户洞察', '商品分析', '商品关联销售(新)'],
      targetPage: 'relation',
      filter: {
        topProductSelector: [
          {label: 'top10', value: '10'},
          {label: 'top20', value: '20'},
          {label: 'top30', value: '30'},
          {label: 'top50', value: '50'},
          {label: '全部商品', value: '0'},
        ],
        statusOptions: [
          { label: '全部订单', value: '' },
          { label: '成功订单', value: 'FINISHED' }
        ],
        customerTypeOptions: [
          { label: '全部客户', value: '-1' },
          { label: '新客户', value: '1' },
          { label: '老客户', value: '0' }
        ],
        snapshotOptions: [],
        topNum: '10',
        tradeStatus: '',
        dateRange: '',
        customerType: '-1',
        priceRange: ['', ''],
        salesRange: ['', ''],
        snapshot: ''
      },
      filterPanel: {
        isOpen: true
      },
      linkedProductDialog: {
        visible: false,
        currentSku: {},
        pagination: {
          page: 1,
          total: 0,
          size: 20
        }
      },
      data: [{id: 1}],
      linkedProduct: []
    }
  },
  mounted () {
    this.getSnapshot()
    this.getData()
  },
  methods: {
    async getSnapshot () {
      const result = await getSnapshot({
        shopInfoId: this.shopId
      })
      this.filter.snapshotOptions = result.list
    },
    async getData () {
      const { topNum, tradeStatus, dateRange, customerType, snapshot, priceRange, salesRange } = this.filter
      const result = await getProducts({
        shopId: this.shopId,
        customerType: customerType,
        topNum: topNum,
        tradeStatus: tradeStatus,
        snapShootId: snapshot,
        startTime: dateRange && moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: dateRange && moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
        totalMinPrice: priceRange[0],
        totalMaxPrice: priceRange[1],
        minPrice: salesRange[0],
        maxPrice: salesRange[1]
      })
      this.data = result.list
    },
    toggleFilterPanel () {
      this.filterPanel.isOpen = !this.filterPanel.isOpen
    },
    resetFilter () {
      this.filter = {
        ...this.filter,
        tradeStatus: '',
        dateRange: '',
        customerType: '-1',
        snapshot: '',
        priceRange: ['', ''],
        salesRange: ['', '']
      }
    },
    async exportList () {
      const { topNum, tradeStatus, dateRange, customerType, snapshot, priceRange, salesRange } = this.filter
      const result = await exportPorducts({
        shopIds: this.shopId,
        customerType: customerType,
        topNum: topNum,
        tradeStatus: tradeStatus,
        snapShootId: snapshot,
        startTime: dateRange && moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: dateRange && moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
        totalMinPrice: priceRange[0],
        totalMaxPrice: priceRange[1],
        minPrice: salesRange[0],
        maxPrice: salesRange[1]
      })
    },
    search () {
      this.getData()
    },
    handleTopNumberChange () {
      this.getData()
    },
    async getLinkedProducts () {
      const { tradeStatus, dateRange, customerType } = this.filter
      const result = await getLinkedProducts({
        customerType: customerType,
        tradeStatus: tradeStatus,
        startTime: dateRange && moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: dateRange && moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
        topSkuCodeArr: this.linkedProductDialog.currentSku.skuCode,
        pageIndex: this.linkedProductDialog.pagination.page,
        pageSize: this.linkedProductDialog.pagination.size
      })
      this.linkedProduct = result.list
    },
    async exportLinkedProduct () {
      const { tradeStatus, dateRange, customerType } = this.filter
      const result = await exportLinkedProducts({
        customerType: customerType,
        tradeStatus: tradeStatus,
        startTime: dateRange && moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: dateRange && moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
        topSkuCodeArr: this.linkedProductDialog.currentSku.skuCode
      })
    },
    openLinkedProductDialog (scope) {
      this.linkedProductDialog.visible = true
      this.linkedProductDialog.currentSku = scope.row
      this.getLinkedProducts()
    },
    closeLinkedProductDiaoog () {
      this.linkedProductDialog.visible = false
    },
    openAllProductList () {
      this.targetPage = 'linkedAllProducts'
    },
    openRelationPage () {
      this.targetPage = 'relation'
    },
    handleSizeChange (val) {
      this.linkedProductDialog.pagination.size = val
      this.getLinkedProducts()
    },
    handleCurrentChange (val) {
      this.linkedProductDialog.pagination.page = val
      this.getLinkedProducts()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/variable.scss';
/deep/ .el-dialog {
  .el-dialog__header {
    border-bottom: 1px solid $grey-4;
    padding: 15px 20px;
    .el-dialog__title {
      font-size: $normal;
    }
  }
}

/deep/ .dialog-footer {
  display: flex;
  justify-content: space-between;
  .el-button--text {
    color: $grey;
  }
  .el-button {
    position: relative;
    height: 32px;
    padding: 0;
  }
  .el-button--primary {
    width: 80px;
  }
  .el-button--text {
    padding-left: 20px;
  }
}
</style>
