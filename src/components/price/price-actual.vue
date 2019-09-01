<template>
  <div class="price-actual">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/price/actual'>价格管理</el-breadcrumb-item>
          <el-breadcrumb-item>实际价格查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="BU">
            <el-input size='small' v-model="form.bu" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="PDT">
            <el-input size='small' v-model="form.pdt" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input size='small' v-model="form.productModel" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="关联产品">
            <el-input size='small' v-model="form.relationProductModel" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="生效时间" class="date">
            <Daterange @data='watchTime' :resetDataReg='resetData' />
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' @click="search" plain>搜索</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns">
          <el-button class="add" size='small' type='primary' @click='add' :disabled="multipleSelection.length==0 ? true: false" >生成报价单</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width='60' >
            </el-table-column>
            <el-table-column type="index" width='80' label="序号" :index='q'>
            </el-table-column>
            <el-table-column prop="status" width='80' show-overflow-tooltip label="状态">
            </el-table-column>
            <el-table-column prop="inCustomerCode" width='80' show-overflow-tooltip label="内部客户号">
            </el-table-column>
            <el-table-column prop="inCustomer" width='80' show-overflow-tooltip label="内部客户">
            </el-table-column>
            <el-table-column prop="outCustomerCode" width='80' show-overflow-tooltip label="外部客户号">
            </el-table-column>
            <el-table-column prop="outCustomer" width='80' show-overflow-tooltip label="外部客户">
            </el-table-column>
            <el-table-column prop="bu" width='100' show-overflow-tooltip label="BU">
            </el-table-column>
            <el-table-column prop="pdt" width='100' label="PDT" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="productModel" width='150' label="产品型号" show-overflow-tooltip>
            </el-table-column>
             <el-table-column show-overflow-tooltip prop="actualPrice"  width='150' label="实际价格">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="upperNumber"  width='150' label="数量上限">
            </el-table-column>


            <el-table-column show-overflow-tooltip prop="lowerNumber"  width='150' label="数量下限">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="settlementType" width='150'  label="结算类型">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="effectTime" width='150'  label="生效时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="deadTime" width='150'  label="失效时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="relationOutCustomerCode" width='150'  label="关联外部客户号">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="relationOutCustomer" width='150'  label="关联外部客户">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="relationProductModel" width='150'  label="关联产品型号">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="implementWay" width='150'  label="执行方式">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="priceProposer" width='150'  label="价格申请人">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="shipmentType" width='150'  label="出货类型">
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
     <el-dialog
      title="请选择询价方"
      :visible.sync="dialogVisible1"
      width="400px"
      :before-close="cancel">
      <el-form ref="form1" :model="form1" :rules="rules" class="form" label-width="auto" label-position='top' >
          <el-form-item label="询价方" prop="inquirer">
            <el-select  size='small' v-model='form1.inquirer' placeholder="请选择询价方">
              <el-option v-for="item in options" :key="item.name" :label="item.name" :value='item.name+","+item.type'></el-option>
            </el-select>
          </el-form-item>
          
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" plain @click="cancel">取 消</el-button>
        <el-button size="small"  type="primary" @click="submitForm('form1')">确 定</el-button>
      </span>
    </el-dialog>
    <Tem ref='print' :table='multipleSelection' :queryPrice='queryPrice' :type='type'></Tem>

  </div>
</template>

<script>
  import Daterange from "../com/date";
  import Tem from "./com/tem";
  import {getList} from "@/api/price/priceActual.js";
  export default {
    name: 'priceActual',
    components:{
      Daterange,Tem
    },
    data() {
      return {
        rules:{
          inquirer:[
            {required:true,triggle:'change',message:'请选择询价方'}
          ]
        },
        options:[
          {
            name:'代理商1',
            type:'agent',
          },
          {
            name:'代理商2',
            type:'agent',
          },
          {
            name:'客户',
            type:'customer',
          }
        ],
        form1:{
          inquirer:''
        },
        type:'',
        queryPrice:'',
        multipleSelection:[],
        resetData:false,
        form: {
          bu:'',
          pdt:'',
          productModel:'',
          relationProductModel:'',
          status:'',
          platform:'',
          priceProposer:'',
          effectBeginTime:'',
          effectEndTime:'',
        },
        dialogVisible: false,
        dialogVisible1: false,
        tableData: [],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        total: 0,
      }
    },
    created() {
      this.getList()
    },
    methods: {
      cancel(){
        this.dialogVisible1 = false
        this.form1 = {
          inquirer:''
        }
        this.resetForm('form1');
      },
      submitForm(formName){
        this.$formTest.submitForm(this.$refs[formName],this.sub)
      },
      resetForm(formName){
        this.$formTest.resetForm(this.$refs[formName])
      },
      sub(){
        var arr = this.multipleSelection.map(item=>{return item.settlementType})
        console.log(arr)
        var filter =  arr.filter(item=>{
          if(item == arr[0]){
            return true
          }
        })
        console.log(filter)
        if(filter.length == arr.length){
          this.type=filter[0]
          console.log(this.type)
          this.queryPrice = this.form1.inquirer.split(',')[0]
          console.log(this.queryPrice)

          this.$nextTick(()=>{
            this.$print(this.$refs.print)
          })
        }else{
          this.$message.error('只能生成同一结算类型的报价单')
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      search(){
        this.currentPage = 1
        this.getList()
      },
      watchTime(data){
        console.log(data)
        this.form.effectBeginTime = data.startTime
        this.form.effectEndTime = data.endTime
        this.resetData = false
      },
      async getList(){
        const data ={
           pageIndex:this.currentPage,
           pageSize:this.pageSize,
           status:this.form.status,
           priceProposer:this.form.priceProposer,
           relationProductModel:this.form.relationProductModel,
           bu:this.form.bu,
           pdt:this.form.pdt,
           productType:this.form.productType,
           platform:this.form.platform,
           productModel:this.form.productModel,
           effectBeginTime:this.form.effectBeginTime,
           effectEndTime:this.form.effectEndTime
        } 
        const res = await getList(data);
        console.log('实际价格查询列表',res);
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      create(){},
      reset(){
        this.currentPage=1
        this.pageSize=10
        this.form = {
          bu:'',
          pdt:'',
          productModel:'',
          relationProductModel:'',
          status:'',
          priceProposer:'',
          effectBeginTime:'',
          effectEndTime:'',
        }
        this.resetData = true
        this.getList()
      },
      change() {
        this.dialogVisible = !this.dialogVisible
      },
      q(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1
      },
      add() {
        this.dialogVisible1 = true
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getList()

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList()
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
.price-actual{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;
  .el-dialog{
    .form {
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          .el-select{
            width: 100%;
          }
        }
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
