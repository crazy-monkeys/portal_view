<template>
  <div class="productQuery">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>产品查询</el-breadcrumb-item>
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
          <el-form-item label="产品型号">
            <el-input size='small' v-model="form.product" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="BU">
            <el-input size='small' v-model="form.bu" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="PDT">
            <el-input size='small' v-model="form.pdt" placeholder="请输入"></el-input>
          </el-form-item>
           
           <el-form-item label="Product Type">
            <el-input size='small' v-model="form.subCategory" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="平台">
            <el-input size='small' v-model="form.platform" placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="SAP 物料号" >
            <el-input size='small' v-model="form.sapMid" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="子物料号" >
            <el-input size='small' v-model="form.subMid" placeholder="请输入"></el-input>
          </el-form-item>
          <!-- <el-form-item label="BU Head" class="date">
            <Daterange />
          </el-form-item> -->
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain @click="search">查询</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
        <!-- </transition-group> -->

      </div>

      <!-- </transition-group> -->
      <div class="box">
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table size='small' :data="props.row.subProducts" border style="width: 100%" height="100%">
                  <el-table-column label="子料号" prop='subMid' show-overflow-tooltip> 
                  </el-table-column>
                  <el-table-column label="数量" prop='subNumber' show-overflow-tooltip>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="产品型号" width="150" prop='product' show-overflow-tooltip> 
            </el-table-column>
            <el-table-column label="BU" width="150" prop='bu' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="PDT" width="150" prop='pdt' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="Product Type" width="150" prop='subCategory' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="平台" width="150" prop='platform' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="最小包装数" width="150" prop='mpq' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="SAP 物料号"  width="150" prop='sapMid' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="生命周期"  width="150" prop='lifeCycle' show-overflow-tooltip>
            </el-table-column>
         
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[25,50, 100]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  import Daterange from "../com/date";
  import formTest from '../../assets/js/formTest'
  import {getList} from '@/api/product/query.js'
  export default {
    components:{
      Daterange
    },
    name: 'productQuery',
    data() {
      return {
        form: {
            "product":'', //产品型号
            "bu":'', //产品型号
            "pdt":'', //产品型号
            "category":'', //产品型号
            "subCategory":'', //产品型号
            "platform":'', //产品型号
            "sapMid":'', //产品型号
            "subMid":'', //产品型号
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
    watch: {
    },
    methods: {
      reset(){
        this.form={
            "product":'', //产品型号
            "bu":'', //产品型号
            "pdt":'', //产品型号
            "category":'', //产品型号
            "subCategory":'', //产品型号
            "platform":'', //产品型号
            "sapMid":'', //产品型号
            "subMid":'', //产品型号
        }
        this.getList()
      },
      search(){
        this.getList()
      },
      async getList(){
        var data ={
           "pageIndex":this.currentPage,
            "pageSize":this.pageSize,
            "product":this.form.product, //产品型号
            "bu":this.form.bu,
            "pdt":this.form.pdt,
            "category":this.form.category, //类型
            "subCategory":this.form.subCategory, //子类型
            "platform":this.form.platform,  //平台
            "sapMid":this.form.sapMid, //sap物料号
            "subMid":this.form.subMid  //子物料号
        }
        const res = await getList(data);
        // //console.log('产品查询列表',res)
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      change(){
        this.dialogVisible = !this.dialogVisible
      },
      q(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1
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
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
.productQuery{
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