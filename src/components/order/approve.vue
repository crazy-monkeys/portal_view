<template>
  <div class="approve">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单审批</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="sels clear">
        <!-- <el-button @click='change'  size='small' type='primary' plain>{{!dialogVisible ? '展开筛选条件' :'收起筛选条件'}}
          </el-button> -->
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>

          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>

          <!-- <div class="line"></div> -->
        </div>
        <!-- <transition-group enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"> -->
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="订单号">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="下单人">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <!-- <el-form-item label="订单状态">
            <el-select v-model="value" size="small" filterable placeholder="专货订单">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请类型">
            <el-select v-model="value" size="small" filterable placeholder="">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="下单日期" class="date">
            <el-date-picker size='small' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              v-model="d1">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="交货日期" class="date">
            <el-date-picker size='small' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              v-model="d1">
            </el-date-picker>
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain>查询</el-button>
            <el-button @click='dialogVisible = true' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
        <!-- </transition-group> -->

      </div>

      <!-- </transition-group> -->
      <div class="box">
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="700" @row-click='rowClick'>
            <el-table-column width="150" label="订单号" prop='purchaseOrderNo' show-overflow-tooltip> 
            </el-table-column>
            <el-table-column width="150" label="SO号" prop='1' show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="150" label="审批信息" prop='rejectReason' show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="150" label="状态" prop='' show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.approvalStatus==0">待审批</span>
                <span v-if="scope.row.approvalStatus==1">已通过</span>
                <span v-if="scope.row.approvalStatus==2">已驳回</span>
              </template>
            </el-table-column>
            <el-table-column width="150" label="下单类型" prop='' show-overflow-tooltip>
              <template slot-scope='scope'>
                <span v-if="scope.row.underOrderType=='A01'" >客户专货订单</span>
                <span v-if="scope.row.underOrderType=='A02'" >Buffer订单</span>
                <span v-if="scope.row.underOrderType=='A03'" >新产品订单</span>
                <span v-if="scope.row.underOrderType=='A04'" >样品订单</span>
                <span v-if="scope.row.underOrderType=='A05'" >Last Buy订单</span>
                <span v-if="scope.row.underOrderType=='A06'" >分销商专货订单</span>
              </template>
            </el-table-column>
            <el-table-column width="150" label="下单日期" prop='purchaseOrderDate' show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="150" label="客户属性" prop='customerAttribute' show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.customerAttribute=='B1'" >Account Market</span>
                <span v-if="scope.row.customerAttribute=='B2'" >Mass Market</span>
              </template>
            </el-table-column>
            <el-table-column width="150" label="订单类型" prop='' show-overflow-tooltip>
              <template slot-scope='scope'>
                <span v-if="scope.row.orderType=='ZFD'" >交货免费</span>
                <span v-if="scope.row.orderType=='ZOR'" >标准订单</span>
                <span v-if="scope.row.orderType=='ZORT'" >标准订单（ZORT）</span>
                <span v-if="scope.row.orderType=='ZRET'" >退货</span>
                <span v-if="scope.row.orderType=='nKB'" >客户库存补货</span>
                <span v-if="scope.row.orderType=='KE'" >客户库存出货</span>
                <span v-if="scope.row.orderType=='ZKE'" >标准客户库存出货</span>
                <span v-if="scope.row.orderType=='ZKB'" >标准客户库存补货</span>
              </template>
            </el-table-column>
            <el-table-column width="150" label="规格型号" prop='7' show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="150" label="单位" prop='7' show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="150" label="单价" prop='7' show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="150" label="数量" prop='7' show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="150" label="总金额" prop='7' show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="150" label="已交付数量" prop='7' show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="150" label="未交付数量" prop='7' show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="150" label="本次提货数量" prop='7' show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="150" label="本次提货日期" prop='deliveryDate' show-overflow-tooltip>
              
            </el-table-column>
            <el-table-column width="150" label="备注" prop='7' show-overflow-tooltip>
            </el-table-column>

            
            <el-table-column  prop="" width="120" label="操作" fixed='right'>
              <template slot-scope='scope'>
                <el-button type='text' size='small' @click='getDetail(scope.row.id)'>明细</el-button>
                <el-button type='text' size='small' :disabled="scope.row.approvalStatus ? true:false" @click='getApprove(scope.row.id)'>审批</el-button>
              </template>
            </el-table-column>
            <div slot="empty">

              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 20,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
        
      </div>
    </div>
    <el-dialog title="订单详情" :visible.sync="dialogVisible1" width="60%">
      <div class="tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- <el-tab-pane label="订单信息" name="first">
            <div class="tabBox">
              <el-table :data="tableData" style="width: 100%" height="300">
                <el-table-column prop="" label="ID" v-if="false">
                </el-table-column>
                <el-table-column prop="t1" label="客户属性" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t2" label="订单类型" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t3" label="规格型号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t4" label="单位" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t5" label="单位（USD）" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t6" label="数量" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t7" label="交货日期" show-overflow-tooltip>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane> -->
          <el-tab-pane label="出货信息"  name="first">
            <div class="tabBox">
            </div>
          </el-tab-pane>
          <el-tab-pane label="发票">
            <div class="tabBox">
            </div>
          </el-tab-pane>
      </el-tabs>
      </div>
    </el-dialog>


    <el-dialog
        title="审批"
        :visible.sync="dialogVisible5"
        width="400px"
        top="10vh"
        >
        <el-form ref="form1" :model="form1" size="small" class="form" label-width="auto" label-position='top'  >
          <el-form-item label="授信额度初始值" >
            <el-input size='small'  resize="none"  disabled></el-input>
            
          </el-form-item>
          <el-form-item label="授信额度剩余值" >
            <el-input size='small'  resize="none"  disabled></el-input>
            
          </el-form-item>
          <el-form-item label="授信额度可用值" >
            <el-input size='small'  resize="none"  disabled></el-input>
            
          </el-form-item>
          <!-- <el-form-item label="SAP订单类型" >
            <el-select v-model="value" size="small" filterable placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
          </el-form-item> -->
          <el-form-item label="审批信息">
            <el-input size='small' v-model="form1.reason" rows='4' resize="none" type="textarea" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('form',2)" size="small" plain>驳 回</el-button>
            <el-button @click="submitForm('form',1)" size="small" type="primary" >通 过</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";

import {approve,approveList,detail,getCreditInfo} from '@/api/order/approve.js'


// /order/approval / list 审批列表
//     /
//     detail { id }
// 详情
//     /
//     approval 审批 { orderId: xx, rejectReason: xx, approvalStatus: 1. 通过 2. 驳回 }
export default {
  name: "approve",
  data() {
    return {
      rowData:{},
      dialogVisible5:false,
      form: {},
      form1: {
        reason:'',
      },
      d1: [],
      activeName:"first",
      options: [
        {
          value: "选项1",
          label: "正常"
        },
        {
          value: "选项2",
          label: "退货"
        }
      ],
      options1: [
        {
          value: "选项1",
          label: "申请单"
        },
        {
          value: "选项2",
          label: "取消单"
        },
        {
          value: "选项2",
          label: "延期单"
        }
      ],
      dialogVisible: false,
      dialogVisible1: false,
      tableData: [
      ],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 10,
      total: 0,
    };
  },
  computed: {
  },
  created() {
    this.getList()
  },
  watch: {},
  methods: {
    rowClick(row){
      this.rowData = row
    },
    submitForm(formName,type){
      this.$formTest.submitForm(this.$refs[formName],this.approve(type))
    },
    handleClick(){},
    async getList(){
      const data ={
        pageSize:this.pageSize,
        pageIndex:this.currentPage,
      }
      const res = await approveList(data);
      if(res){
        this.tableData = res.data.data.list
      }
    },

    async detail(id){
      const data ={
        id:id
      }
      const res = await detail(data);
      if(res){
        
      }
    },
    async approve(approvalStatus){
      const data ={
        orderId:this.rowData.id,
        reason:this.form1.reason,
        approvalStatus:approvalStatus,
      }
      const res = await approve(data);
      if(res){
        this.$message.success('审批成功')
        this.dialogVisible5 = false
        this.getList()
      }
    },
    async getCreditInfo(id){
      const data ={
        id:id
      }
      const res = await getCreditInfo(data);
      if(res){
        
      }
    },
    getApprove(id){
      this.dialogVisible5 = true
      this.getCreditInfo(id)
    },
    change() {
      this.dialogVisible = !this.dialogVisible;
    },
    getDetail(id) {
      this.dialogVisible1 = true;
      this.detail(id)
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;

.approve{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;

  .el-dialog{
    .el-select{
      width: 100%;
    }
  }
  .sellBox{
    height: 100%;
    display: flex;
    flex-direction: column;
    .head{
      padding: 10px 20px;
      // background: red;
    }
    .sels{
      // margin: 20px 0;
      padding:10px 20px;
      background: #fff;
      margin-bottom: 10px;
      .lineBox{
        color: #b161bf;
      }
    }
    .form {
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          width: 200px;
          margin-bottom: 0;
          .el-select{
            width: 100%;
          }
        }
        .date {
          width: 414px;
          .el-date-editor{
            width: 100%
          }
        }
    }
    .box{
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      background: #fff;
      .btns{
        padding: 10px 20px;
        // background: pink;
      }
      .tab{
        padding-bottom: 52px;
        box-sizing: border-box;
        height: 100%;
        // background: orange;
        display: flex;
        flex-direction: column;
        position: relative;
        .el-table{
          height: 100%;
          position: relative;
        }
        .block{
          position: absolute;
          bottom:0;
          padding:  10px 0 ;
          width: 100%;
          .el-pagination {
            width: 100%;
            padding: 0;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>