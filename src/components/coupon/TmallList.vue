<template>
  <div>
    <div class="page-content">
      <div class="filter-bar">
        <div class="filter-area">
          <el-button size="small" class="create-button" type="primary" @click.stop="createCoupon">
            <i class="unex unex-icon-add"></i>
            新建
          </el-button>
        </div>
        <div class="action-area">
          <el-button size="small" class="filter-panel-button" @click.stop="toggleFilterPanel">
            <i class="unex unex-icon-filter" />筛选
            <i v-if="filterPanel.isOpen" class="unex unex-icon-up" />
            <i v-else class="unex unex-icon-down" />
          </el-button>
        </div>
      </div>
      <div class="filter-panel" v-if="filterPanel.isOpen">
        <el-row :gutter="24">
          <el-col :span="6">
            <label>规则时间</label>
            <el-date-picker
                size="small"
                v-model="filter.dateRange"
                type="datetimerange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"/>
          </el-col>
          <el-col :span="6">
            <label>执行状态</label>
            <el-select v-model="filter.status" placeholder="请选择" size="small">
              <el-option
                v-for="item in filterPanel.statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <label>规则名称</label>
            <el-input v-model="filter.name" size="small"/>
          </el-col>
          <el-col :span="6" >
            <div class="button-group">
              <el-button plain @click.stop="resetFilter" size="small">重置</el-button>
              <el-button type="primary" plain @click.stop="search" size="small">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="page-block">
      <el-table :data="data">
        <el-table-column label="优惠券名称" prop="couponName" align="left" min-width="180"/>
        <el-table-column label="金额" prop="couponPrice" align="right" width="90"/>
        <el-table-column label="使用门槛" prop="couponCondition" align="right" width="130"/>
        <el-table-column label="生效日期" prop="validTime" align="left" min-width="180"/>
        <el-table-column label="失效日期" prop="invalidTime" align="left" min-width="180"/>
        <el-table-column label="状态"  align="left" width="120">
          <template slot-scope="scope">
            {{ scope.row.couponStatus | status(filterPanel.statusOptions) }}
          </template>
        </el-table-column>
        <el-table-column label="微信端是否显示" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.wxIfShow ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope)">修改</el-button>
            <el-button type="text" size="small" @click="openDataDialog(scope)">数据</el-button>
            <el-button type="text" size="small" @click="del(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-bar">
        <custom-pagination :page="pagination.page" :size="pagination.size" :total="pagination.total"  @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>
      </div>
    </div>
    <customDialog width="900px" :buttonText="['取消', '确定']" :visible="dataDialog.visible" :title="`${dataDialog.currentCoupon.couponName}的数据`" @confirm="closeDataDialog" @close="closeDataDialog">
      <template slot="content">
        <el-table :data="dataDialog.data" class="border-table">
          <el-table-column label="日期" prop="" align="left" />
          <el-table-column label="领取数" prop="" align="right" width="80"/>
          <el-table-column label="已使用" prop="" align="right" width="180"/>
          <el-table-column label="销售额（￥）" prop="" align="right" width="200"/>
          <el-table-column label="剩余可领取数量" prop="" align="right" width="200"/>
        </el-table>
        <div class="pagination-bar">
          <custom-pagination :page="dataDialog.pagination.page" :size="dataDialog.pagination.size" :total="dataDialog.pagination.total"  @handleSizeChange="handleDataDialogSizeChange" @handleCurrentChange="handleDataDialogCurrentChange"/>
        </div>
      </template>
    </customDialog>
  </div>
</template>
<script>
import moment from 'moment'
import customPagination from '@/components/common/customPagination'
import customDialog from '@/components/common/customDialog'
import { getTmallCoupons, getMerchant, delTmallCoupon, getCouponData } from '@/api/coupon'
export default {
  components: { customPagination, customDialog },
  data () {
    return {
      shopId: this.$store.state.shopId.shopId,
      merchantId: 0,
      data: [{
        id: 1,
        title: '测试'
      }],
      filterPanel: {
        isOpen: true,
        statusOptions: [
          { label: '不限', value: "-1" },
          { label: '领取中', value: "0" },
          { label: '未开始', value: "1" },
          { label: '已结束', value: "2" },
        ]
      },
      filter: {
        dateRange: '',
        status: '-1',
        name: ''
      },
      pagination: {
        page: 1,
        total: 0,
        size: 10
      },
      dataDialog: {
        visible: false,
        currentCoupon: {
          couponName: ''
        },
        data: [],
        pagination: {
          page: 1,
          total: 0,
          size: 10
        },
      }
    }
  },
  filters: {
    status (val = '', options) {
      const result = options.find(item => item.value === val.toString())
      return result && result.label || val
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getMerchant () {
      const result = await getMerchant({
        shopId: this.shopId
      })
      this.merchantId = result[0].api_merchant_id
    },
    async getTmallCoupons () {
      const { name, status, dateRange } = this.filter
      const result = await getTmallCoupons({
        apiMerchantId: this.merchantId,
        pageIndex: this.pagination.page,
        pageSize:  this.pagination.size,
        couponName: name,
        couponStatus: status,
        useStartTime: dateRange && moment(dateRange[0]).format('YYYY-MM-DD') || '',
        useEndTime: dateRange && moment(dateRange[1]).format('YYYY-MM-DD') || ''
      })
      this.data = result.list
      this.pagination.total = result.total
    },
    async getData () {
      await this.getMerchant()
      await this.getTmallCoupons()
    },
    del (scope) {
      this.$confirm('若删除将影响到会员在微博会员中心领取该券，请确认是否需要删除', '删除', {
        distinguishCancelAndClose: true,
        confirmButtonClass: 'error-button',
        confirmButtonText: '确定删除'
      }).then(_ => {
        delTmallCoupon({
          apiMerchantId: this.merchantId,
          tmallCouponId: scope.row.couponConfigId
        }).then(result => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getTmallCoupons()
        })
      })
    },
    edit (scope) {
      this.$router.push({
        name: 'editTmallCoupon',
        params: {
          id: scope.row.couponConfigId
        }
      })
    },
    toggleFilterPanel () {
      this.filterPanel.isOpen = !this.filterPanel.isOpen
    },
    resetFilter () {
      this.filter = {
        dateRange: '',
        status: '',
        name: ''
      }
    },
    search () {
      this.getData()
    },
    createCoupon () {
      this.$router.push({ name: 'createTmallCoupon' })
    },
    async getCouponData () {
      const { page, size } = this.dataDialog.pagination
      const result = await getCouponData({
        pageIndex: page,
        pageSize: size,
        tmallCouponId: this.dataDialog.currentCoupon.couponConfigId
      })
      this.dataDialog.data = result.list
    },
    openDataDialog (scope) {
      this.dataDialog.visible = true
      this.dataDialog.currentCoupon = scope.row
      this.getCouponData()
    },
    closeDataDialog () {
      this.dataDialog.visible = false
    },
    handleSizeChange (val) {
      this.pagination.size = val
      this.getTmallCoupons()
    },
    handleCurrentChange (val) {
      this.pagination.page = val
      this.getTmallCoupons()
    },
    handleDataDialogSizeChange (val) {
      this.dataDialog.pagination.size = val
      this.getCouponData()
    },
    handleDataDialogCurrentChange (val) {
      this.dataDialog.pagination.page = val
      this.getCouponData()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/variable';
.border-table {
  border-left: 1px solid $grey-4;
  border-right: 1px solid $grey-4;
}
</style>
