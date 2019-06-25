<template>
  <div class="page-container">
    <page-title title="新建天猫优惠券">
      <template slot="extend">
        <p class="title-tips">
          <i class="unex unex-icon-info-new" />
          配置请与天猫后台配置保持一致，否则不能正确分析会员权益
        </p>
      </template>
    </page-title>
    <el-form :model="form" :rules="rules" ref="form" label-position="top" class="custom-form">
      <div class="page-block">
        <div class="header">
          <h4>基本信息</h4>
        </div>
        <div class="section">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="优惠券名称" prop="couponName" required>
                <el-input v-model.trim="form.couponName" maxlength="10" size="small" :disabled="disbleEdit"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用日期" prop="date" required>
                <el-date-picker
                  size="small"
                  v-model="form.date"
                  type="datetimerange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="微信端是否显示" prop="wxIfShow" required>
            <el-radio-group v-model="form.wxIfShow">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="退货是否返还" prop="isReturn" required>
            <el-radio-group v-model="form.isReturn">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
      <div class="page-block">
        <div class="header">
          <h4>优惠券设置</h4>
        </div>
        <div class="section">
          <el-form-item label="金额设置" prop="couponCondition" required>
            满<el-input class="inline-input" size="small" :min="0" v-model.number="form.couponCondition" type="number" :disabled="disbleEdit"/>元，减<el-input class="inline-input" size="small" v-model.number="form.couponPrice" :min="0" type="number" :disabled="disbleEdit"/> 元
          </el-form-item>
          <el-form-item label="发行量" prop="couponCirculation" required>
            <el-input class="inline-input" size="small" :min="1" v-model.number="form.couponCirculation" type="number"/> 张
          </el-form-item>
          <el-form-item label="每人限额" prop="couponLimit" required>
            <el-select class="inline-input" v-model="form.couponLimit" placeholder="请选择" size="small">
              <el-option
                v-for="n in 5"
                :key="n"
                :label="n"
                :value="n" />
              </el-select>
          </el-form-item>
          <el-form-item label="所需兑换积分" prop="couponPoint" required>
            <el-input class="inline-input" size="small" :min="0" v-model.number="form.couponPoint" type="number" />分
          </el-form-item>
        </div>
      </div>
      <div class="page-block">
        <div class="header">
          <h4>淘口令</h4>
        </div>
        <div class="section">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="活动口令" prop="couponTmallWord" required>
                <el-input type="textarea" rows="4" v-model="form.couponTmallWord" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <div class="float-footer">
      <div class="button-group">
        <el-button plain size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import breadBar from '@/components/common/breadBar'
import pageTitle from '@/components/common/pageTitle'
import { modifyTmallCoupon, getMerchant, getTmallCouponDetail } from '@/api/coupon'
import moment from 'moment'
export default {
  components: { breadBar, pageTitle },
  data () {
    return {
      id: this.$route.params.id,
      shopId: this.$store.state.shopId.shopId,
      merchantId: '',
      form: {
        couponName: '',
        date: '',
        validTime: '',
        invalidTime: '',
        wxIfShow: 1,
        couponCondition: '',
        couponPrice: '',
        couponCirculation: '',
        couponLimit: 1,
        couponTmallWord: '',
        couponPoint: '',
        isReturn: 1
      },
      rules: {
        couponName: [
          { required: true, message: '请填写优惠券名称', trigger: ['change', 'blur'] },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择使用日期', trigger: ['change', 'blur'] }
        ],
        wxIfShow: [
          { required: true, message: '选择是否在微信端显示', trigger: ['change', 'blur'] }
        ],
        isReturn: [
          { required: true, message: '选择是否退换货', trigger: ['change', 'blur'] }
        ],
        couponPoint: [
          { required: true, message: '请填写优惠券积分', trigger: ['change', 'blur'] }
        ],
        couponCondition: [
          { required: true, message: '请设置金额', trigger: ['change', 'blur']  },
          { validator: this.validAmount, trigger: ['change', 'blur'] }
        ],
        couponCirculation: [
          { required: true, message: '请设置发行量', trigger: ['change', 'blur']  }
        ],
        couponLimit: [
          { required: true, message: '请设置每人限领数量', trigger: ['change', 'blur']  }
        ],
        couponTmallWord: [
          { required: true, message: '请填写淘口令', trigger: ['change', 'blur']  }
        ]
      }
    }
  },
  computed: {
    disbleEdit () {
      return !!this.id
    }
  },
  created () {
    this.getMerchant()
    if (this.id) {
      this.getCouponDetail(this.id)
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    async getMerchant () {
      const result = await getMerchant({
        shopId: this.shopId
      })
      this.merchantId = result[0].api_merchant_id
    },
    async getCouponDetail (id) {
      const result = await getTmallCouponDetail({
        tmallCouponId: id
      })
      this.form = {
        ...this.form,
        ...result,
        date: [moment(result.validTime), moment(result.invalidTime)]
      }
      this.$refs.form.resetFields()
    },
    submit () {
      const { date } = this.form
      this.$refs.form.validate().then(result => {
        modifyTmallCoupon({
          ...this.form,
          apiMerchantId: this.merchantId,
          validTime: date && moment(date[0]).format('YYYY-MM-DD HH:mm:ss'),
          invalidTime: date && moment(date[1]).format('YYYY-MM-DD HH:mm:ss'),
        }).then(result => {
          if (result.code === 1) {
            this.$message({
              type: 'success',
              message: `天猫优惠券${this.id ? '修改' : '创建' }成功`
            })
            return this.$router.push({ name: 'couponList' })
          }
          return  this.$message({
              type: 'error',
              message: result.msg
            })
        })
      })
    },
    validAmount (rule, value, callback) {
      if (!value || !this.form.couponPrice) {
         return callback(new Error('请设置金额'))
      }
      callback()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/variable';
/deep/ .title-tips {
  color: $grey;
  .unex {
    color: $blue;
    margin: 0 10px 0 14px;
  }
}
/deep/ .custom-form {
  &.el-form--label-top {
    .el-form-item__label {
      padding: 0;
    }
  }
  .el-radio-group {
    margin: 0;
  }
  .inline-input {
    width: 120px;
    margin: 0 10px;
  }
  .el-date-editor {
    width: 100%;
  }
}
</style>
