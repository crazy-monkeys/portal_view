<template>
  <div class="agentRate">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>代理商费率管理</el-breadcrumb-item>
          <el-breadcrumb-item>代理商费率查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>

          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>

        </div>
        <el-form ref="form" :model="form" size="small" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="客户分类">
            <el-select v-model="form.customerType" clearable>
              <el-option v-for="item in customerTypes" :key="item.value" :label='item.label' :value='item.value'> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品类型" >
             <el-input v-model="form.productType" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="产品层次一"  >
             <el-input v-model="form.productLevelOne" clearable>
            
            </el-input>
          </el-form-item>
          <el-form-item label="产品层次二"  >
             <el-input v-model="form.productLevelTwo" clearable>
              
            </el-input>
          </el-form-item>
          <el-form-item label="产品层次三"  >
             <el-input v-model="form.productLevelThree" clearable>
             
            </el-input>
          </el-form-item>
          <el-form-item label="有效开始日期"  class="date" >
            <Daterange @data='watchTime' :resetDataReg='resetData' />
          </el-form-item>
          <el-form-item :label="' '">
            <el-button size='small' type='primary' plain @click="search">查询</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns">
          <el-button size="small" type="primary" @click="defend">维护</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column prop="customerType" width='150' label="客户分类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="insideCustomer" width='150' label="客户名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productLevelOne" width='150' label="产品层次一" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productLevelTwo" width="150" label="产品层次二" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productLevelThree" width="150" label="产品层次三" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productType" width="150" label="Product Type" show-overflow-tooltip></el-table-column>
            <el-table-column prop="basicAgencyRate" width="150" label="基准代理费率(%)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="floatAgencyRate" width="150" label="浮动代理费率(%)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="validStartDate" width="150" label="有效开始日期" show-overflow-tooltip></el-table-column>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
           <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[25,50,100]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
  import Daterange from "../com/date";
  import {getList} from "@/api/agentrate/query.js";
  export default {
    name: 'agentRate',
    components:{
      Daterange
    },
    data() {
      return {
        customerTypes:[
          {
            label:'Account Market',
            value:'Account Market',
          },
          {
            label:'Mass Market',
            value:'Mass Market',
          }
        ],
        resetData:true,
        form: {
          "customerType":'',
          "productLevelOne":'',
          "productLevelTwo":'',
          "productLevelThree":'',
          "productType":'',
          "startTime":'',
          "endTime":'',
        },
        dialogVisible: false,
        tableData: [],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 25,
        total: 0,
      }
    },
    
    created() {
      this.getList()
    },
    methods: {
      reset(){
        this.form = {
          "customerType":'',
          "productLevelOne":'',
          "productLevelTwo":'',
          "productLevelThree":'',
          "productType":'',
          "startTime":'',
          "endTime":'',
        }
        this.resetData = true
        this.getList()
      },
      search(){
        this.getList()
      },
      watchTime(data){
        // console.log(data)
        this.form.startTime = data.startTime
        this.form.endTime = data.endTime
        this.resetData = false
      },
      async getList(){
        var data ={
          "pageIndex":this.currentPage,
          "pageSize":this.pageSize,
          "customerType":this.form.customerType, //产品型号
          "productLevelOne":this.form.productLevelOne,
          "productLevelTwo":this.form.productLevelTwo,
          "productLevelThree":this.form.productLevelThree, //类型
          "productType":this.form.productType, //子类型
          "startTime":this.form.startTime,  //平台
          "endTime":this.form.endTime, //sap物料号
        }
        const res = await getList(data);
        // console.log('代理费率列表',res)
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
     
      defend(){
        this.$router.push({
          name:'agentRateDefend'
        })
      },
      change() {
        this.dialogVisible = !this.dialogVisible
      },
      q(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1
      },
      
      // 分页
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList()

      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
.agentRate{
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