<template>
  <div class="deliver">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >交付管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售出货数据查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" size="small" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="出货时间" class="date" >
            <Daterange @data='watchHandoverTime'  :resetDataReg='resetHandoverData' />
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input size='small' v-model="form.customerFullName"  placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input size='small' v-model="form.productModel" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="订单月份">
            <el-input size='small' v-model="form.orderMonth" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户订单号">
            <el-input size='small' v-model="form.customerOrderNumber" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="发货公司">
            <el-input size='small' v-model="form.deliveryCompany" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item :label="' '">
            <el-button size='small' @click="search" type='primary' plain>查询</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">
          <div  style="height:100%">
            <el-table :data="tableData" border height="100%" style="width:100%">
              <el-table-column prop="customerExternalNumber" width='150' label="客户外部号" show-overflow-tooltip></el-table-column>
              <el-table-column prop="customerFullName" width='150' label="客户全称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="sales" width='150' label="销售" show-overflow-tooltip></el-table-column>
              <el-table-column prop="categoryOne" width='150' label="类别一(类型)" show-overflow-tooltip></el-table-column>
              <el-table-column prop="categoryTow" width='150' label="类别二(子类)" show-overflow-tooltip></el-table-column>
              <el-table-column prop="categoryThree" width='150' label="类别三(平台)" show-overflow-tooltip></el-table-column>
              <el-table-column prop="productModel" width='150' label="产品型号" show-overflow-tooltip></el-table-column>
              <el-table-column prop="deliveryDate" width='150' label="出货日期" show-overflow-tooltip></el-table-column>
              <el-table-column prop="deliverNumber" width='150' label="数量" show-overflow-tooltip></el-table-column>
              <el-table-column prop="salePrice" width='150' label="Sale Price" show-overflow-tooltip></el-table-column>
              <el-table-column prop="poPrice" width='150' label="Po Price" show-overflow-tooltip></el-table-column>
              <el-table-column prop="margin" width='150' label="Margin" show-overflow-tooltip></el-table-column>
              <el-table-column prop="currency" width='150' label="币种" show-overflow-tooltip></el-table-column>
              <el-table-column prop="customerOrderNumber" width='150' label="客户订单号" show-overflow-tooltip></el-table-column>
              <el-table-column prop="deliveryType" width='150' label="出货类型" show-overflow-tooltip></el-table-column>
              <el-table-column prop="orderMonth" width='150' label="订单月份" show-overflow-tooltip></el-table-column>
              <el-table-column prop="deliveryCompany" width='150' label="发货公司" show-overflow-tooltip></el-table-column>
              <el-table-column prop="remark" width='150' label="备注"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="confirmMsg" width='150' label="客户备注"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="confirmStatus" width='150' label="确认状态"  show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.confirmStatus==-1">不同意</span>
                  <span v-if="scope.confirmStatus==1">同意</span>
                  <span v-if="scope.confirmStatus!=1 &&scope.confirmStatus!=-1">未确认</span>
                </template>
              </el-table-column>
              <div slot="empty">
                <p>无数据</p>
              </div>
            </el-table>
          </div>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
              :page-sizes="[10, 100]" :page-size="10" layout="sizes,total, jumper, prev, pager, next" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Daterange from "../com/date";
  import {getList} from "@/api/handover/deliver";
  export default {
    name: 'deliver',
    components:{
      Daterange
    },
    data() {
      const form = {
        // 上传时间
        uploadStartTime  :'',
        uploadEndTime  :'',
        // 出货时间 
        handoverStartTime  :'',
        handoverEndTime  :'',
        // 客户名称 
        customerFullName:'',
        // 产品型号 
        productModel:'',
        // 订单月份  
        orderMonth:'',
        // 客户订单号  
        customerOrderNumber:'',
        // 发货公司  
        deliveryCompany:'',
      }
      return {
        resetHandoverData:true,
        form: form,
        dialogVisible: false,
        tableData: [],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 50,
        total: 0,
      }
    },
    computed: {
    },
    created() {
      this.getList()
    },
    watch: {
    },
    methods: {
      watchHandoverTime(data){
        this.form.handoverStartTime = data.startTime
        this.form.handoverEndTime = data.endTime
        this.resetHandoverData = false
      },
      search(){
        this.currentPage = 1
        this.getList()
      },
      reset(){
        this.form = {
        // 上传时间
        uploadStartTime  :'',
        uploadEndTime  :'',
        // 出货时间 
        handoverStartTime  :'',
        handoverEndTime  :'',
        // 客户名称 
        customerFullName:'',
        // 产品型号 
        productModel:'',
        // 订单月份  
        orderMonth:'',
        // 客户订单号  
        customerOrderNumber:'',
        // 发货公司  
        deliveryCompany:'',
      }
        this.currentPage = 1
        this.resetHandoverData = true
        this.getList()
      },
      async getList(){
        var data ={
          pageSize:this.pageSize,
          pageIndex:this.currentPage,
          ...this.form
        }
        const res = await getList(data);
        console.log('列表',res)
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      change() {
        this.dialogVisible = !this.dialogVisible
      },
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList()
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
.deliver{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;
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