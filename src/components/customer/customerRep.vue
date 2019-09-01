<template>
  <div class="customerRep">
    <div class="sellBox"> 
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >客户管理</el-breadcrumb-item>
          <el-breadcrumb-item >客户报备</el-breadcrumb-item>
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
        <div class="btns">
          <el-button type='primary' class="add" size='mini' @click="report">报备</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column type="index" width='100' label="编号" :index='q'>
            </el-table-column>
            <el-table-column prop="approveStatus" width="150" show-overflow-tooltip label="审批状态">
              <template slot-scope="scope">
                {{scope.row.approveStatus==2?'审批中':scope.row.custType==3?'审批通过 ':'审批驳回'}}
              </template>
            </el-table-column>
            <el-table-column prop="custName" width="150" label="客户名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="custInCode" width="150" label="客户内部编号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="custOutCode" width="150" label="客户外部编号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="businessType" width="150" label="客户类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="reportDealerName" width="150" label="负责代理商" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="reportSalesName" width="150" label="负责销售" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="approveUser" width="150" label="审批人" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="approveRemark" width="150" label="审批意见" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="approveTime" width="150" label="审批时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" width='180' label="操作" fixed='right'>
              <template slot-scope='scope'>
                <el-button type='text'  @click='add(scope.row)'>明细</el-button>
                <el-button type='text'  @click='del(scope.row)'>删除</el-button>
              </template>
            </el-table-column>
            <div slot="empty">
              <p>未查询到客户信息</p>
            </div>
          </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
              :page-sizes="[10, 30,50]" :page-size="10" layout="sizes,total, jumper, prev, pager, next" :total="total">
            </el-pagination>
          </div>
        </div> 
        
      </div>  
    </div>
    <el-dialog
        title="搜索"
        :visible.sync="dialogVisible2"
        width="300px"
        top="10vh"
        >
        当前客户不存在，是否进行报备
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2= false" size="small" type="primary" plain>取 消</el-button>
            <el-button type="primary" @click="sure1"  size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
import Daterange from "../com/date";
import {getList,del} from "@/api/customer/query.js";

export default {
  components:{
    Daterange
  },
  name: "customerRep",
  data() {
    return {
      dialogVisible2:false,
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
        customerStatus:1,
        queryType:3,
      }
      const res = await getList(data);
      console.log('客户列表',res)
      if(res){
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      }
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
    search(){
      this,currentPage = 1
      this.getList(this.form)
    },
    sure1(){
      this.dialogVisible2 = false;
      this.$router.push({
        name:'black'
      })
    },
    async delCus (row){
      var data = {
        id:row.id
      }
      const res = await del(data)
      console.log('删除结果',res)
      if(res){
        this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList(this.form)
      }
    },
    del(row){
      this.$confirm('是否删除该条报备信息', '删除', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(() => { 
          this.delCus(row)
        })
        .catch(action => {
          // this.$message({
          //   type: 'fail',
          //   message: '已取消操作'
          // })
        });
    },
    
    check(value,rule,callback){
      console.log(value,rule,callback)
      if(!value){
        return '请输入客户名'
      }else{
        return true
      }
    },
    report(row){
      this.$prompt('请输入报备客户名', '报备检查', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator:this.check,
        }).then(({ value }) => {
          this.$router.push({
            name:'rep',
            query:{
              name:value
            }
          })
        }).catch(() => {
            
        });
      
    },

    change() {
      this.dialogVisible = !this.dialogVisible;
    },
    
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    add(row) {
      this.$router.push({
        name: "customerAdd",
        query:{
          id:row.id
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.customerRep{
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