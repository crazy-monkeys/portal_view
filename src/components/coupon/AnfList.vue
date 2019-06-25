<template>
  <div>
    <div class="page-content">
      <div class="filter-bar">
        <div class="filter-area" />
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
            <label>活动名称</label>
            <el-input size="small" v-model="filter.name" />
          </el-col>
          <el-col :span="6">
            <label>活动状态</label>
            <el-select v-model="filter.status" placeholder="请选择" size="small">
              <el-option
                v-for="item in filterPanel.statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="6" :offset="6">
            <div class="button-group">
              <el-button plain @click.stop="resetFilter" size="small">重置</el-button>
              <el-button type="primary" plain @click.stop="search" size="small">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="page-block">
      <el-table :data="data" row-class-name="custom-table-row">
        <el-table-column label="码券类型" align="center">
          <template slot-scope="scope">
            <span class="coupon-type">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动名称" prop="" />
        <el-table-column label="活动详情" prop="" />
        <el-table-column label="品牌优惠券详情">
          <template slot-scope="scope">
            <div class="inline-row">
              <div v-if="scope.row.romid">
                <p>ROMID: {{ scope.row.romid }}</p>
                <p>COMPID: {{ scope.row.compid }}</p>
              </div>
              <div v-else>--</div>
              <el-button class="hide-button" type="text" size="small" @click="openCouponSettingDialog(scope)">设置</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="活动状态" prop="" />
        <el-table-column label="现有码券数量" prop="" align="right"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="enablePromo(scope)">启用</el-button>
            <el-button type="text" size="small" @click="servePromo(scope)">投放</el-button>
            <el-dropdown size="small" @command="e => { moreAction(e, scope) }">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="disablePromo">禁用</el-dropdown-item>
                <el-dropdown-item command="delPromo">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-bar">
        <custom-pagination :page="pagination.page" :size="pagination.size" :total="pagination.total"  @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>
      </div>
    </div>
    <custom-dialog title="设置品牌优惠券" :visible="couponSettingDialog.visible" @confirm="updateCouponSetting" @close="closeCouponSettingDialog">
      <template slot="content">
        <div class="tips">
          <i class="unex unex-icon-info-new" />
          <span>请根据中央优惠券系统RPMID与COMPID的数据填写，若数据不一直会导致优惠券发放错误</span>
        </div>
        <div class="inline-form">
          <label class="label">活动名称</label>
          {{ couponSettingDialog.currentCoupon.name }}
        </div>
        <div class="inline-form">
          <label class="label">活动详情</label>
          {{ couponSettingDialog.currentCoupon.description }}
        </div>
        <el-form ref="couponSettingForm" class="coupon-setting-form" :model="couponSettingDialog.form" :rules="couponSettingDialog.rules" label-position="top">
          <el-form-item label="RPMID" prop="rpmid" required>
            <el-input size="small" v-model="couponSettingDialog.form.rpmid" />
          </el-form-item>
          <el-form-item label="COMPID" prop="compid" required>
            <el-input size="small" v-model="couponSettingDialog.form.compid" />
          </el-form-item>
          <el-form-item label="最低补充数量" prop="number" required>
            <el-input type="number" size="small" v-model="couponSettingDialog.form.number" />
          </el-form-item>
        </el-form>
      </template>
    </custom-dialog>
    <custom-dialog width="500px" :visible="couponRulesDialog.visible" title="设置补充规则" @confirm="updateCouponRules" @close="closeCouponRulesDialog" >
      <template slot="content">
        <div class="tips">
          <i class="unex unex-icon-info-new" />
          <span>优惠券补充张数按「中央优惠券系统」的最低补充数量增减</span>
        </div>
        <el-form ref="couponRulesForm" :rules="couponRulesDialog.rules" :model="couponRulesDialog.form" label-position="top" class="coupon-setting-form margin-block">
          <el-form-item label="补充方式" prop="publishType" required>
            <el-radio-group v-model="couponRulesDialog.form.publishType">
               <el-radio label="CYCLE">循环补充</el-radio>
               <el-radio label="SINGLE">单次补充</el-radio>
            </el-radio-group>
            <div class="inline-form" v-if="couponRulesDialog.form.publishType === 'CYCLE'">
              少于
              <el-input class="inline-input" min="0" type="number" size="small" v-model="couponRulesDialog.form.minLimit"/>张券，补充
              <el-input-number  class="inline-input" :min="1" size="small" v-model="couponRulesDialog.form.number" />张券
            </div>
            <div class="inline-form" v-else>
              单次补充<el-input-number :min="1" class="inline-input" size="small" v-model="couponRulesDialog.form.number" />张券
            </div>
          </el-form-item>
          <el-form-item label="发放时间" prop="publisthateType" required>
            <el-radio-group v-model="couponRulesDialog.form.publisthateType">
              <el-radio label="IMMEDIATE">即时发放</el-radio>
              <el-radio label="RESERV">定时发放</el-radio>
            </el-radio-group>
            <div class="inlin-form" v-if="couponRulesDialog.form.publisthateType === 'RESERV'">
              <el-date-picker
                size="small"
                v-model="couponRulesDialog.form.publishDateRange"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" />
            </div>
          </el-form-item>
        </el-form>
      </template>
    </custom-dialog>
  </div>
</template>
<script>
import customPagination from '@/components/common/customPagination'
import customDialog from '@/components/common/customDialog'
export default {
  components: { customPagination, customDialog },
  data () {
    return {
      data: [{
        id: 1,
        type: '天猫券',
        romid: 'XXX',
        compid: 'XXX',
        rule1: '',
        rule2: '',
        name: '4月优惠券',
        description: '积分兑券 高级会员 满100减50 全场可用'
      }],
      filter: {
        name: '',
        status: ''
      },
      filterPanel: {
        isOpen: true,
        statusOptions: [
          { label: '不限', value: '' }
        ]
      },
      pagination: {
        page: 1,
        total: 0,
        size: 10
      },
      couponSettingDialog: {
        visible: false,
        rules: {
          rpmid: [
            { required: true, message: '请填写RPMID', trigger: ['change', 'blur'] }
          ],
          compid: [
            { required: true, message: '请填写COMPID', trigger: ['change', 'blur'] }
          ],
          number: [
            { required: true, message: '请填写最低补充量', trigger: ['change', 'blur'] }
          ],
        },
        form: {
          prmid: '',
          compid: '',
          number: ''
        },
        currentCoupon: {}
      },
      couponRulesDialog: {
        visible: false,
        form: {
          publishType: 'CYCLE',
          minLimit: null,
          number: 1,
          publisthateType: 'IMMEDIATE',
          publishDateRange: ''
        },
        rules: {
          publishType: [
            { validator: this.validCouponPublishType, trigger: ['change', 'blur'] }
          ],
          publisthateType: [
            { validator: this.validCouponPublishDate, trigger: ['change', 'blur'] }
          ]
        }
      }
    }
  },
  methods: {
    getData() {
      // TODO
    },
    toggleFilterPanel () {
      this.filterPanel.isOpen = !this.filterPanel.isOpen
    },
    search () {
      this.getData()
    },
    resetFilter () {
      this.filter.name = ''
      this.filter.status = ''
    },
    handleSizeChange (val) {
      this.pagination.size = val
    },
    handleCurrentChange (val) {
      this.pagination.page = val
    },
    openCouponSettingDialog (scope) {
      this.couponSettingDialog.currentCoupon = scope.row
      this.couponSettingDialog.visible = true
    },
    closeCouponSettingDialog () {
      this.couponSettingDialog.currentCoupon = {}
      this.couponSettingDialog.visible = false
    },
    updateCouponSetting () {
      this.$refs.couponSettingForm.validate().then(result => {})
    },
    openCouponRulesDialog (scope) {
      this.couponRulesDialog.currentCoupon = scope.row
      this.couponRulesDialog.visible = true
    },
    closeCouponRulesDialog () {
      this.couponRulesDialog.visible = false
    },
    updateCouponRules () {
      this.$refs.couponRulesForm.validate().then(result => {})
    },
    moreAction (e, scope) {
      if(this[e]) {
        this[e](scope)
      }
    },
    enablePromo (scope) {
      // TODO
    },
    servePromo (scope) {
      // TODO
    },
    disablePromo (scope) {
      // TODO
    },
    delPromo (scope) {
      // TODO
    },
    validCouponPublishType (rule, value, callback) {
      const { minLimit, number } = this.couponRulesDialog.form
      if (value === 'CYCLE' && (!minLimit || !number)) {
        return callback(new Error('请设置循环补充条件'))
      }
      if (value === 'SINGLE' && !number) {
        return callback(new Error('请设置单次补充券数量'))
      }
      return callback()
    },
    validCouponPublishDate (rule, value, callback) {
      const { publishDateRange } = this.couponRulesDialog.form
      if(value === 'RESERV' && (!publishDateRange || !publishDateRange.length)) {
        return callback(new Error('请设置发放时间'))
      }
      return callback()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/variable';
.coupon-type {
  display: inline-block;
  width: 52px;
  height: 20px;
  line-height: 20px;
  font-size: $small;
  text-align: center;
  color: $blue;
  border: 1px solid $blue;
  border-radius: 10px;
}
.el-dropdown-link {
  color: $blue;
  font-size: $small;
  font-weight: 600;
}
.inline-row {
  min-height: 32px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
/deep/ .tips {
  display: flex;
  align-content: center;
  background: rgba($blue-2, .3);
  padding: 8px;
  color: $grey;
  .unex {
    color: $blue;
    margin-right: 8px;
    line-height: 1.2;
  }
}
/deep/ .coupon-setting-form {
  .el-form-item__label {
    padding: 0;
    line-height: 32px;
  }
  .el-form-item {
    margin-bottom: 16px;
  }
}
.inline-form {
  line-height: 32px;
  display: flex;
  align-content: center;
  color: $grey-deep;
  font-size: $small;
  margin: 16px 0;
  .label {
    display: inline-block;
    margin-right: 16px;
    color: $grey;
  }
}
.inline-input {
  max-width: 160px;
  margin: 0 8px;
}
.margin-block {
  margin-top: 30px;
}
/deep/ .custom-table-row  {
  .hide-button {
    display: none;
  }
  &:hover {
    .hide-button {
      display: block;
    }
  }
}
</style>
