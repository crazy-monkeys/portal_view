<template>
  <div class="saleShipment">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>交付管理</el-breadcrumb-item>
          <el-breadcrumb-item>出货</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
          <div class="sels clear">
            <div class="lineBox">
              <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
              <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
            </div>
            <el-form ref="form" :model="form" size="small" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
              
             
           
             
             
             
             
              <el-form-item label="客户">
                <el-input size='small' placeholder="请输入" v-model='form.customerFullName'></el-input>
              </el-form-item>
              <el-form-item label="出货类型">
                <el-input size='small' placeholder="请输入" v-model='form.deliveryType'></el-input>
              </el-form-item>
              <el-form-item label="订单号">
                <el-input size='small' placeholder="请输入" v-model='form.customerOrderNumber'></el-input>
              </el-form-item>
              <el-form-item label="订单月份">
                <el-input size='small' placeholder="请输入" v-model='form.orderMonth'></el-input>
              </el-form-item>
              <el-form-item label="上传时间"  class="date">
                <Daterange  @data='watchTime1' :resetDataReg='resetData1' />
              </el-form-item>
              <el-form-item label="出货日期"  class="date">
                <Daterange @data='watchTime2' :resetDataReg='resetData2' />
              </el-form-item>
              <el-form-item label="产品型号">
                <el-input size='small' placeholder="请输入" v-model='form.productModel'></el-input>
              </el-form-item>
              <el-form-item :label="' '">
                <el-button size='small' type='primary' plain @click="search">查询</el-button>
                <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="box">
            <div class="tab">
              <el-table :data="queryList" border style="width: 100%" height="100%" >
                <!-- <el-table-column prop="uploadTime" width='150' label="上传时间" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="customerExternalNumber" width='100' label="客户外部号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerFullName" width='250' label="客户全称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sales" width='100' label="销售" show-overflow-tooltip></el-table-column>
                <el-table-column prop="categoryTow" width='150' label="类别二(子类)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="categoryThree" width='150' label="类别三(平台)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productModel" width='150' label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="deliveryDate" width='150' label="出货日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="deliverNumber" width='150' label="数量" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salePrice" width='150' label="Sale Price" show-overflow-tooltip></el-table-column>
                <el-table-column prop="poPrice" width='150' label="Po Price" show-overflow-tooltip></el-table-column>
                <el-table-column prop="margin" width='150' label="Margin" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salesOrganization" width='150' label="销售组织" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerOrderNumber" width='150' label="客户订单号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="deliveryType" width='150' label="出货类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="orderMonth" width='150' label="订单月份" show-overflow-tooltip></el-table-column>
                <el-table-column prop="deliveryCompany" width='150' label="发货公司" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remark" width='150'  label="备注"  show-overflow-tooltip></el-table-column>
                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
              <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[20,50,100]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
              </el-pagination>
            </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
  import Daterange from '../com/date'
  import {getList} from '@/api/handover/query.js'
  import {serverUrl} from '../../axios/request'
  export default {
    name: 'saleShipment',
    components:{
      Daterange
    },
    data() {
      return {
        dialogVisible:false,
        resetData1:true,
        resetData2:true,
        form: {
          orderMonth:'',
          productType:'',
          //上传时间
          uploadStartTime:'',  
          uploadEndTime:'',
          //
          handoverStartTime:'',  
          handoverEndTime:'',
          //客户
          customerFullName:'',  
          //产品型号
          productModel:'', 
          //出货类型 
          deliveryType:'',
          //订单月份
          orderMonth:'',  
          //订单号
          customerOrderNumber:'',
          warehouse:'',  
          deliveryCompany:''
        },
        total: 0,
        queryList:[],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 20,
      }
    },
    computed: {
      dealerId(){
        return this.$store.state.loginUser.loginInfo.id
      }
    },
    created() {
      this.getList()
    },
    watch: {
    },
    methods: {
      watchTime1(data){
        this.form.uploadStartTime = data.startTime 
        this.form.uploadEndTime = data.endTime 
        this.resetData1=false
      },
      watchTime2(data){
        this.form.handoverStartTime = data.startTime 
        this.form.handoverEndTime = data.endTime 
        this.resetData2=false
      },
      reset(){
        this.form={
          orderMonth:'',
          //上传时间
          uploadStartTime:'',  
          uploadEndTime:'',
          //
          handoverStartTime:'',  
          handoverEndTime:'',
          //客户
          customerFullName:'',  
          //产品型号
          productModel:'', 
          //出货类型 
          deliveryType:'',
          //订单月份
          orderMonth:'',  
          //订单号
          customerOrderNumber:'',
          warehouse:'',  
          deliveryCompany:''
        }
        this.resetData1=true
        this.resetData2=true
        this.search()
      },
      search(){
        this.currentPage = 1
        this.getList()
      },
      async getList(){
        var data = {
          dealerId:this.dealerId,
          type: 'deliver',
          pageSize:this.pageSize,
          pageNum:this.currentPage,
          uploadStartTime:this.form.uploadStartTime,  
          uploadEndTime:this.form.uploadEndTime,
          handoverStartTime:this.form.handoverStartTime,  
          handoverEndTime:this.form.handoverEndTime,
          customerFullName:this.form.customerFullName,  
          productModel:this.form.productModel,  
          deliveryType:this.form.deliveryType,
          orderMonth:this.form.orderMonth,  
          customerOrderNumber:this.form.customerOrderNumber,
          warehouse:this.form.warehouse,  
          deliveryCompany:this.form.deliveryCompany
        }
        const res = await getList(data)
        // //console.log('上传查询部分列表',res)
        if(res){
          this.queryList=res.data.data.list
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
.saleShipment{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;
  .sellBox{
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 34px;
    box-sizing: border-box;
    .head{
      padding: 10px 20px;
      position: absolute;
      top: 0;
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
            .upload-demo{
              display: inline-block;
            }
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