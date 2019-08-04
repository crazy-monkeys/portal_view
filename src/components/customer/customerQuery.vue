<template>
  <div class="sellIndex">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>客户管理</el-breadcrumb-item>
          <el-breadcrumb-item>客户查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="客户名称">
            <el-input size='small' placeholder="请输入" v-model="form.customerName"></el-input>
          </el-form-item>
          <el-form-item label="客户内部编号">
            <el-input size='small' placeholder="请输入" v-model="form.customerInCode"></el-input>
          </el-form-item>
          <el-form-item label="客户外部编号" >
            <el-input size='small' placeholder="请输入" v-model="form.customerOutCode"></el-input>
          </el-form-item>
          <el-form-item label="是否License客户">
            <el-select v-model="form.isLicense" size="small"  placeholder="请选择">
              <el-option  label="是" value="1"></el-option>
              <el-option  label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-select v-model="form.businessType" size="small"  placeholder="请选择">
              <el-option v-for="item in businessTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报备日期" class="date">
            <Daterange @data='watchRepTime' :resetDataReg='resetData1' />
          </el-form-item>
          <el-form-item label="创建日期" class="date">
            <Daterange @data='watchCreatTime' :resetDataCreate='resetData' />
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' @click="search" type='primary' plain>搜索</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">
          <el-table :data="tableData"  style="width:100%" border height="100%">
            <el-table-column type="index" width='80' label="编号" :index='q'   >
            </el-table-column>
            <el-table-column prop="custName" width="150" show-overflow-tooltip label="客户名称" >
            </el-table-column>
            <el-table-column prop="custInCode" width="150" label="客户内部编号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="custOutCode" width="150" label="客户外部编号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" width="150" show-overflow-tooltip label="License客户" >
              <template slot-scope="scope">
                {{scope.row.isLicense==1?'是':'否'}}
              </template>
            </el-table-column>
            <el-table-column prop="" width="150"  label="客户类型" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.businessType==1?'massMarket':'accountMarket'}}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="createTime" width="180" label="报备日期" sortable> 
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="registerTimeStr" width="180" label="创建日期" sortable>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="操作" fixed='right' width="120">
              <template slot-scope="scope">
                <el-button type='text'  @click='add(scope.row.id)'>明细</el-button>
                <el-button type='text'  @click='mod'>修改</el-button>
              </template>
            </el-table-column>
            <div slot="empty">

              <p>未查询到客户信息</p>
            </div>
          </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
              :page-sizes="[10, 30,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
            </el-pagination>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import Daterange from "../com/date";
import {getList} from "@/api/customer/query.js";
export default {
  name: "SellIndex",
  components:{
    Daterange
  },
  data() {
    return {
      resetData:false,
      resetData1:false,
      form: {
        businessType:'',
        customerName:'',
        customerOutCode:'',
        customerInCode:'',
        isLicense:'',
        reportStartDate:'',
        reportEndDate:'',
        createStartDate:'',
        createEndDate:'',
      },
      time:[],
      businessTypes: [
        {
          value: 1,
          label: "Mass Market"
        },
        {
          value: 2,
          label: "Account Market"
        }
      ],
      dialogVisible: false,
      tableData: [],
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
    this.getList(this.form)
  },
  watch: {},
  methods: {
    reset(){
      this.form = {
        businessType:'',
        customerName:'',
        customerInCode:'',
        customerOutCode:'',
        isLicense:'',
        reportStartDate:'',
        reportEndDate:'',
        createStartDate:'',
        createEndDate:'',
      }
      this.resetData = true
      this.resetData1 = true
      this.getList(this.form)
    },
    search(){
      this.getList(this.form)
    },
    watchCreatTime(data){
      console.log(data)
      this.form.createStartDate = data.startTime
      this.form.createEndDate = data.endTime
      this.resetData = false
    },
    watchRepTime(data){
      console.log(data)
      this.form.reportStartDate = data.startTime
      this.form.reportEndDate = data.endTime
      this.resetData1 = false
    },
    async getList(form){
      var data ={
        pageIndex:this.currentPage,
        pageSize:this.pageSize,
        customerName:form.customerName,
        customerInCode:form.customerInCode,
        customerOutCode:form.customerOutCode,
        isLicense:form.isLicense,
        businessType:form.businessType,
        reportStartDate:form.reportStartDate,
        reportEndDate:form.reportEndDate,
        createStartDate:form.createStartDate,
        createEndDate:form.createEndDate,
        customerStatus:3,
      }
      const res = await getList(data);
      console.log('客户列表',res)
      if(res){
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      }
    },
    mod(){
      this.$router.push(
        {name:'customerUpdate'}
      )
    },
    change() {
      this.dialogVisible = !this.dialogVisible;
    },
    sure() {
      this.dialogVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    add(id) {
      this.$router.push({
        name: "customerAdd",
        query:{
          id:id
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList(this.form)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList(this.form)
    }
  }
};
</script>

<style lang='scss'>
$sc: 12;
.sellIndex{
  box-sizing: border-box;
  padding: 0 20px 20px;
  height: 100%;
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
          box-sizing: border-box;
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
          padding: 10px 0;
          width: 100%;
          .el-pagination {
          padding: 0;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>