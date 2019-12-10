<template>
  <div class="approve">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售单审批</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="申请人">
            <el-select v-model="form.dealerId" size="small" filterable placeholder="请选择">
              <el-option v-for="item in list" :key="item.id" :label="item.custName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="下单类型">
            <el-select v-model="form.underOrderType" size="small" filterable placeholder="请选择">
              <el-option value="ZFD" label="交货免费"></el-option>
                <el-option value="ZOR" label="标准订单"></el-option>
                <el-option value="ZORT" label="标准订单（ZORT）"></el-option>
                <el-option value="ZRET" label="退货"></el-option>
                <el-option value="nKB" label="客户库存补货"></el-option>
                <el-option value="KE" label="客户库存出货"></el-option>
                <el-option value="ZKE" label="标准客户库存出货"></el-option>
                <el-option value="ZKB" label="标准客户库存补货"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单类型">
            <el-select v-model="form.orderType" size="small" filterable placeholder="请选择">
                <el-option value="A01" label="客户专货订单"></el-option>
                <el-option value="A02" label="Buffer订单"></el-option>
                <el-option value="A03" label="新产品订单"></el-option>
                <el-option value="A04" label="样品订单"></el-option>
                <el-option value="A05" label="Last Buy订单"></el-option>
                <el-option value="A06" label="分销商专货订单"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批状态">
            <el-select v-model="form.approvalStatus" size="small" filterable placeholder="请选择">
              <el-option value="0" label="待审批"></el-option>
                <el-option value="1" label="已通过"></el-option>
                <el-option value="2" label="已驳回"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下单日期" class="date">
            <Daterange @data='watchTime' :resetDataReg='resetData' />
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain @click="search">查询</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" border height="100%" @row-click='rowClick'>
            <el-table-column prop="purchaseNo" label="采购订单编号" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="appalyType" label="申请类型" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                <span v-if="scope.row.appalyType==1">订单创建</span>
                <span v-if="scope.row.appalyType==2">订单修改</span>
                <span v-if="scope.row.appalyType==3">订单取消</span>
                <span v-if="scope.row.appalyType==4">变更交期</span>
              </template>
            </el-table-column>
            <el-table-column prop="underOrderType" label=" 下单类型" show-overflow-tooltip  width="150" >
              <template slot-scope='scope'>
                <span v-if="scope.row.underOrderType=='ZFD'" >交货免费</span>
                <span v-if="scope.row.underOrderType=='ZOR'" >标准订单</span>
                <span v-if="scope.row.underOrderType=='ZORT'" >标准订单（ZORT）</span>
                <span v-if="scope.row.underOrderType=='ZRET'" >退货</span>
                <span v-if="scope.row.underOrderType=='nKB'" >客户库存补货</span>
                <span v-if="scope.row.underOrderType=='KE'" >客户库存出货</span>
                <span v-if="scope.row.underOrderType=='ZKE'" >标准客户库存出货</span>
                <span v-if="scope.row.underOrderType=='ZKB'" >标准客户库存补货</span>
              </template>
            </el-table-column>
            <el-table-column prop=" orderType" label=" 订单类型" show-overflow-tooltip  width="150" >
              <template slot-scope='scope'>
                <span v-if="scope.row.orderType=='A01'" >客户专货订单</span>
                <span v-if="scope.row.orderType=='A02'" >Buffer订单</span>
                <span v-if="scope.row.orderType=='A03'" >新产品订单</span>
                <span v-if="scope.row.orderType=='A04'" >样品订单</span>
                <span v-if="scope.row.orderType=='A05'" >Last Buy订单</span>
                <span v-if="scope.row.orderType=='A06'" >分销商专货订单</span>
              </template>
            </el-table-column>
            <el-table-column prop="grossValue" label="含税总金额" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="netValue" label="不含税总金额" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="rSapCurrency" label="订单货币" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="salesOrg" label="销售组织" show-overflow-tooltip  width="200" >
              <template slot-scope="scope">
                {{sale(scope.row.salesOrg)}}
              </template>
            </el-table-column>
            <el-table-column prop="soldTo" label="售达方" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                {{to(scope.row.soldTo)}}
              </template>
            </el-table-column>
            <el-table-column prop="sendTo" label="送达方" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                {{to(scope.row.soldTo)}}
              </template>
            </el-table-column>
            <el-table-column prop="purchaseDate" label="采购订单下达日期" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="paymentTerms" label="付款条件" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="incoterms1" label="国际贸易条款1" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="incoterms2" label="国际贸易条款2" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="customerAttr" label="客户属性" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                <span v-if="scope.row.customerAttr=='B1'">Account Market</span>
                <span v-if="scope.row.customerAttr=='B2'">Mass Market</span>
              </template>
            </el-table-column>
            <el-table-column prop="isAgreed" label="是否同意条款" show-overflow-tooltip  width="150" >
              <template slot-scope='scope'>
                <span v-if="scope.row.isAgreed==0" >否</span>
                <span v-if="scope.row.isAgreed==1" >是</span>
              </template>
            </el-table-column>
            <el-table-column prop="refSapOrderId" label="原单号" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="orderReason" label="退货原因" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="approver" label="审批人" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="approvalStatus" label="审批状态" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                <span v-if="scope.row.approvalStatus==0">待审批</span>
                <span v-if="scope.row.approvalStatus==1">已通过</span>
                <span v-if="scope.row.approvalStatus==2">已驳回</span>
              </template>
            </el-table-column>
            <el-table-column prop="approvalTime" label="审批时间" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="approvalOpinions" label="审批意见" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column width="100" label="操作" fixed='right'>
              <template slot-scope='scope'>
                <el-button type='text' size='small' @click='check(scope.row)'>明细</el-button>
                <el-button type='text' size='small' @click='getApprove(scope.row.dealerId)' :disabled="scope.row.approvalStatus==0 ? false:true">审批</el-button>
              </template>
            </el-table-column>
            <div slot="empty">

              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[50, 100,150]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>

      </div>
    </div>
    <el-dialog title="订单行信息" :visible.sync="dialogVisible1" width="1000px">
      <div class="tab">
        <div class="tabBox">
          <el-table :data="rowData.jsonLines" style="width: 100%" border height="100%">
            <el-table-column prop="num"  label="数量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="productId"  label="物料号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="platform"  label="平台" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="rPrice"  label="含税金额" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="rNetPrice"  label="不含税金额" show-overflow-tooltip>
            </el-table-column>
            
            <el-table-column prop="expectedDeliveryMonth" width="150" label="期望交货月份" show-overflow-tooltip>
            </el-table-column>

            <div slot="empty">
              无数据
            </div>
          </el-table>
        </div>
      </div>
    </el-dialog>


    <el-dialog
        title="审批"
        :visible.sync="dialogVisible5"
        width="400px"
        custom-class='jobBox'
        top="10vh"
        >
        <el-form ref="form1" :model="form1" :rules='rules' size="small" class="form" label-width="auto" label-position='top'  >
          <el-form-item label="授信额度初始值" >
            <el-input size='small' v-model="credit.credit"  resize="none"  disabled></el-input>

          </el-form-item>
          <el-form-item label="授信额度占用值" >
            <el-input size='small'  v-model="credit.creditUSE"    resize="none"  disabled></el-input>

          </el-form-item>
          <el-form-item label="授信额度可用值" >
            <el-input size='small' v-model="credit.creditUnUSE"   resize="none"  disabled></el-input>

          </el-form-item>

          <el-form-item label="需求交货日期" >
            <el-date-picker
            style="width:100%"
              v-model="form1.expectedDeliveryDate"
              type="date"
              size="small"
              value-format="yyyyMMdd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="审批信息">
            <el-input size='small' v-model="form1.reason" rows='4' resize="none" type="textarea" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('form1',2)" size="small" plain>驳 回</el-button>
            <el-button @click="submitForm('form1',1)" size="small" type="primary" >通 过</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
import Daterange from "../com/date";
import {approve,approveList,getCreditInfo} from '@/api/order/approve.js'
import {getDealerList} from '@/api/system/param.js'
import {getCode} from '@/api/business/idr.js'

export default {
  name: "approve",
  components:{
    Daterange
  },
  data() {
    return {
      rules:{
        expectedDeliveryDate:[{required:true,triggle:'change',message:'请输入需求交货日期'}]
      },
      credit:{},
      list:[],
      resetData:true,
      rowData:{},
      dialogVisible5:false,
      form: {
        orderType:'',
        underOrderType:'',
        approvalStatus:'',
        dealerId:'',
      },
      form1: {
        reason:'',
        expectedDeliveryDate:''
      },
      dialogVisible: false,
      dialogVisible1: false,
      tableData: [],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 50,
      total: 0,
      salesOrgIds:[],
    };
  },
  created() {
    this.getList()
    this.getDealerList()
    this.getCode()
  },
  methods: {
    check(row){
      this.$router.push(
        {
          name:'orderAdd',
          query:{
            id:row.id,
            type:row.approvalStatus,
            check:true,
            apply:true
          }
        }
      )
    },
    sale(id){
        return  this.salesOrgIds.filter(item=>{return item.groupCode == id})[0] ? this.salesOrgIds.filter(item=>{return item.groupCode == id})[0].groupName  :''
    },
    async getCode(){
      const res = await getCode();
      // //console.log('发货方编码',res)
      if(res){
        this.salesOrgIds = res.data.data
      }
    },
    to(id){
        return  this.list.filter(item=>{return item.id == id})[0] ? this.list.filter(item=>{return item.id == id})[0].custName  :''
    },
    search(){
      this.currentPage =1
      this.getList()
    },
    async getDealerList(){
      const res = await getDealerList();
      // //console.log('list',res)
      if(res){
        this.list = res.data.data
      }
    },
    reset(){
      this.form = {
        orderType:'',
        underOrderType:'',
        approvalStatus:'',
        dealerId:'',
      }
      this.resetData = true
      this.getList()
    },
    watchTime(data){
      // //console.log(data)
      this.form.createBeginTime = data.startTime
      this.form.createEndTime = data.endTime
      this.resetData = false
    },
    rowClick(row){
      this.rowData = row
    },
    submitForm(formName,type){
      this.$formTest.submitForm(this.$refs[formName],type==1 ? this.approvePass : this.approvalReject)
    },
    async getList(){
      const data ={
        pageSize:this.pageSize,
        pageIndex:this.currentPage,
        orderType:this.form.orderType,
        underOrderType:this.form.underOrderType,
        approvalStatus:this.form.approvalStatus,
        dealerId:this.form.dealerId,
        createBeginTime:this.form.createBeginTime,
        createEndTime:this.form.createEndTime,
      }
      const res = await approveList(data);
      if(res){
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      }
    },
    getDetail(id) {
      this.dialogVisible1 = true;
    },
    async approvalReject(approvalStatus){
      if(this.form1.reason.length!=0){
        const data ={
          applyId:this.rowData.id,
          reason:this.form1.reason,
          expectedDeliveryDate:this.form1.expectedDeliveryDate,
          approvalStatus:2,
        }
        const res = await approve(data);
        if(res){
          this.$message.success('审批成功')
          this.dialogVisible5 = false
          this.getList()
        }
      }else{
        this.$message.error('请填写驳回原因')
      }
    },
    async approvePass(approvalStatus){
      const data ={
        applyId:this.rowData.id,
        reason:this.form1.reason,
        expectedDeliveryDate:this.form1.expectedDeliveryDate,
        approvalStatus:1,
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
        this.credit = res.data.data
        this.dialogVisible5 = true
      }
    },
    getApprove(id){
      this.getCreditInfo(id)
    },
    change() {
      this.dialogVisible = !this.dialogVisible;
    },
    // 分页
    handleSizeChange(val) {
      // //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList()
    },
    handleCurrentChange(val) {
      // //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList()
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
