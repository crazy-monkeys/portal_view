<template>
  <div class="approveProList">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>提货单审批</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!selDia' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='selDia' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='selDia'>
          <el-row :gutter="20">
              <el-form-item label="订单号">
                <el-input size='small' v-model="form.salesOrderId" clearable placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="申请人">
                <el-select v-model="form.createUserId" clearable size="small" filterable placeholder="请选择">
                  <el-option v-for="item in list" :key="item.id" :label="item.custName" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="审批状态">
                <el-select v-model="form.approvalStatus" clearable size="small" filterable placeholder="请选择">
                  <el-option   label="待审批" :value="0">
                  </el-option>
                  <el-option   label="已通过" :value="1">
                  </el-option>
                  <el-option   label="已驳回" :value="2">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="申请时间" class="date">
                <Daterange @data='watchTime' :resetDataReg='resetData' />
              </el-form-item>
              <el-form-item label=" ">
                <el-button size='small' type='primary' plain @click="search">查询</el-button>
                <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
              </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="700" @row-click='rowClick'>
            <el-table-column prop="" label="申请人" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                {{to(scope.row.createUserId)}}
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="申请时间" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="approvalType" label="申请类型" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="sapOrderNo" label="订单号" show-overflow-tooltip  width="150" >
            </el-table-column>
            
            
            <el-table-column prop="soldTo" label="售达方" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                {{to(scope.row.soldTo)}}
              </template>
            </el-table-column>
            <el-table-column prop="sendTo" label="送达方" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                {{to(scope.row.sendTo)}}
              </template>
            </el-table-column>
            <el-table-column prop="deliverDate" label="提货日期" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="shippingPoint" label="下单公司" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="approvalUser" label="审批人" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="approvalStatus" label="审批状态" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                <span v-if="scope.row.approvalStatus==0">待审批</span>
                <span v-if="scope.row.approvalStatus==1">已通过</span>
                <span v-if="scope.row.approvalStatus==2">已驳回</span>
              </template>
            </el-table-column>
            <el-table-column prop="approvalDate" label="审批时间" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="approvalRemark" label="审批意见" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column width="100" label="操作" fixed='right'>
              <template slot-scope='scope'>
                <el-button type='text' size='small' @click='getDetail(scope.row.deliverOrderId)'>明细</el-button>
                <el-button type='text' size='small' @click='getApprove(scope.row.createUserId)' :disabled="scope.row.approvalStatus==0 ? false:true">审批</el-button>
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
    <el-dialog title="提货单明细" :visible.sync="dialogVisible1" width="600px">
      <div class="tab">
        <div class="tabBox">
          <el-table :data="deliveryOrderLine" style="width: 100%" border height="100%">
            <el-table-column prop="deliveryQuantity"  label="提货数量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sapSalesOrderLineNo"  label="订单行号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="productId"  label="物料号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="product" width="150"  label="产品型号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="bu" label="BU" width="150"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="pdt" width="150" label="PDT" show-overflow-tooltip>
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
        top="10vh"
        >
        <el-form ref="form1" :model="form1" size="small" class="form" label-width="auto" label-position='top'  >
          <el-form-item label="授信额度初始值" >
            <el-input size='small' v-model="credit.credit"  resize="none"  disabled></el-input>
            
          </el-form-item>
          <el-form-item label="授信额度剩余值" >
            <el-input size='small'  v-model="credit.creditUSE"    resize="none"  disabled></el-input>
            
          </el-form-item>
          <el-form-item label="授信额度可用值" >
            <el-input size='small' v-model="credit.creditUnUSE"   resize="none"  disabled></el-input>
            
          </el-form-item>
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
import {approve,approveProList,getCreditInfo,approvePro} from '@/api/order/approve.js'
import {getProApprovalDetail} from '@/api/order/list.js'
import Daterange from "../com/date";
import {getShip,getDealerList} from '@/api/system/param.js'
export default {
  name: "approveProList",
  components:{
    Daterange
  },
  data() {
    return {
      deliveryOrderLine:[],
      credit:{},
      tos:[],
      list:[],
      resetData:true,
      rowData:{},
      dialogVisible5:false,
      form: {
        salesOrderId:"",
        createUserId:"",
        createStartDate:"",
        createEndDate:"",
        approvalStatus:0
      },
      form1: {
        reason:'',
      },
      activeName:"first",
      selDia: false,
      dialogVisible1: false,
      tableData: [],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 50,
      total: 0,
    };
  },
  computed: {
  },
  created() {
    this.getList()
    this.getDealerList()
    // this.getShip()
  },
  watch: {},
  methods: {
     async getShip(){
      const res = await getShip();
      // //console.log('tos',res)
      if(res){
        this.tos = res.data.data
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
        salesOrderId:"",
        createUserId:"",
        createStartDate:"",
        createEndDate:"",
        approvalStatus:0
      }
      this.resetData = true
      this.getList()
    },
    watchTime(data){
      // //console.log(data)
      this.form.createStartDate = data.startTime
      this.form.createEndDate = data.endTime
      this.resetData = false
    },
    rowClick(row){
      this.rowData = row
    },
    submitForm(formName,type){
      this.$formTest.submitForm(this.$refs[formName],type==1 ? this.approvePass : this.approvalReject)
    },
    handleClick(){},
    async getList(){
      const data ={
        pageSize:this.pageSize,
        pageIndex:this.currentPage,
        salesOrderNo:this.form.salesOrderId,
        createUserId:this.form.createUserId,
        approvalStatus:this.form.approvalStatus,
        createStartDate:this.form.createStartDate,
        createEndDate:this.form.createEndDate,
        queryType:1
      }
      const res = await approveProList(data);
      // //console.log('提货单审批列表',res)
      if(res){
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      }
    },
    getDetail(id) {
      // //console.log(id)
      this.getProApprovalDetail(id)
      this.dialogVisible1 = true;
    },
    async getProApprovalDetail(id){
      const data ={
        id:id
      }
      const res = await getProApprovalDetail(data);
      if(res){
        this.deliveryOrderLine = res.data.data.deliveryOrderLine
      }
    },
    async approvalReject(approvalStatus){
      if(this.form1.reason.length==0){
        this.$message.error('请填写驳回信息')
      }else{
      const data ={
        deliveryOrderApprovalId:this.rowData.deliverOrderId,
        sapDeliveryOrderNo:this.rowData.sapOrderNo,
        remark:this.form1.reason,
        approvalStatus:2,
      }
      const res = await approvePro(data);
      if(res){
        this.$message.success('审批成功')
        this.dialogVisible5 = false
        this.getList()
      }
      }
    },
    async approvePass(approvalStatus){
      const data ={
        deliveryOrderApprovalId:this.rowData.deliverOrderId,
        sapDeliveryOrderNo:this.rowData.sapOrderNo,
        remark:this.form1.reason,
        approvalStatus:1,
      }
      // //console.log(data)
      const res = await approvePro(data);
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
      this.selDia = !this.selDia;
    },
    getDetail(id) {
      this.dialogVisible1 = true;
      this.getProApprovalDetail(id)
    },
    // 分页
    handleSizeChange(val) {
      // //console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // //console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;

.approveProList{
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