<template>
  <div class="approveRecord">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >库存管理</el-breadcrumb-item>
          <el-breadcrumb-item>转移转换审批</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible3' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible3' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible3'>
          <el-form-item label="申请类型">
            <el-select v-model="form.applyType" size="small" filterable placeholder="请选择">
              <el-option
                v-for="item in applyTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批状态" >
            <el-select v-model="form.approvalStatus" size="small" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in approvalStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请人">
            <el-input size='small' v-model="form.createUserName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain @click="search">搜索</el-button>
            <el-button  size='small' type='primary' plain @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" @row-click="rowClick">
            <el-table-column prop="" show-overflow-tooltip label="审批状态" width="100" fixed="right"> 
              <template slot-scope="scope">
                <span v-if="scope.row.approvalStatus===0">待审批</span>
                <span v-if="scope.row.approvalStatus===1">通过</span>
                <span v-if="scope.row.approvalStatus===-1">驳回</span>
              </template>
            </el-table-column>
            <el-table-column prop="createUserName" show-overflow-tooltip label="申请人" width="150">
            </el-table-column>
            <el-table-column prop="yearMonth" show-overflow-tooltip label="年月" width="150">
            </el-table-column>
            <el-table-column prop="agencyShortName" label="代理简称" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="transferIntoCustomer" label="转入客户" show-overflow-tooltip width="150" v-if='form.applyType=="transfer"'>
              <template slot-scope="scope">
                {{to(scope.row.transferIntoCustomer)}}
              </template>
            </el-table-column>
            <el-table-column prop="transferOutCustomer" label="转出客户" show-overflow-tooltip width="150" v-if='form.applyType=="transfer"'>
              <template slot-scope="scope">
                {{to(scope.row.transferOutCustomer)}}
              </template>
            </el-table-column>
            <el-table-column prop="custCode" label="客户" show-overflow-tooltip width="150" v-if='form.applyType!="transfer"'>
              <template slot-scope="scope">
                {{to(scope.row.custCode)}}
              </template>
            </el-table-column>
            <el-table-column prop="productLine" label="BU" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="subProductLine" label="PDT" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="class2" label="Product Type" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="class3" label="Platform" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="product" label="产品型号" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="customerType" label="客户属性" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="inventoryType" label="库存类别" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="inventoryPrice" label="库存单价" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="company" label="发货公司" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="salesOrg" label="销售组织" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="monthlyInitQty" label="期初库存数量" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="agencyPickUpDate" label="代理提货时间" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="salesQty" label="出货数量" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="monthlyEndQty" label="期末库存数量" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="monthlyEndInventoryPeriod" label="期末库存周期" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="inventoryTotalAmount" label="金额" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="createTime" label="申请时间" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column label="操作" width="60" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click="approve" :disabled="scope.row.approvalStatus!==0">审批</el-button>
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
    <el-dialog title="审批" :visible.sync="dialogVisible" width="400px">
      <div>请确认通过或者驳回</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="doapprove(-1)" size='small'>驳 回</el-button>
        <el-button type="primary" @click="doapprove(1)" size='small'>通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Daterange from "../com/date";
import { inventorySummary,getApplyList,approveOk,getCustList } from '@/api/stock/query.js'
import {   getRolesAll } from '@/api/system/role.js'
export default {
  name: "approveRecord",
  components:{
    Daterange
  },
  data() {
    return {
      applyTypes:[
        {
          value:'transfer',
          label:'转移'
        },
        {
          value:'conversion',
          label:'转换'
        },
      ],
      approvalStatus:[
        {
          value:0,
          label:'待审批',
        },
        {
          value:1,
          label:'通过',
        },
        {
          value:-1,
          label:'驳回',
        }
      ],
      rowData:{},
      roleForm:{
        role:''
      },
      form:{
        approvalStatus:0,
        applyType:'transfer',
        createUserName:'',
      },
      //验证规则
      rules:{
        role: [
          { required: true, trigger: 'blur',message:'角色不能为空'}
        ]
      },
      //角色列表
      roles: [],
      //授权框
      dialogVisible: false,
      //搜索框
      dialogVisible3: false,
      //用户列表
      tableData:[],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 50,
      total: 0,
      customerList:[],
    };
  },
  created(){
    this.getList();
    this.dogetCustList()
  },
  computed:{},
  methods: {
    async dogetCustList(){
       const res = await getCustList()
       if(res){
          this.customerList = res.data.data
       }
    },
    approve(){
      this.dialogVisible = true
    },
    doapprove(type){
      var data ={
        approvalStatus:type,
        applyType:this.rowData.applyType,
        id:this.rowData.id,
      }
      approveOk(data).then(res=>{
        if(res.data.code==1){
          this.$message.success('操作成功')
          this.dialogVisible = false
          this.getList()
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    to(id){
        return  this.customerList.filter(item=>{return item.outCode == id})[0] ? this.customerList.filter(item=>{return item.outCode == id})[0].custName  :''
    },
    rowClick(row){
      this.rowData = row
    },
    submitForm(formName) {
      this.$formTest.submitForm(this.$refs[formName],this.authorizeSure)
    },
    resetForm(formName) {
      this.$formTest.resetForm(this.$refs[formName]) 
    },
    async authorizeSure(){
      var data = {
        loginName :this.rowData.loginName,
        roleCode :this.roleForm.role,
      };
      const res = await saveUserRole(data)
      // //console.log('授权结果',res)
      if(res){
        this.cancel()
        this.getList()
      }
      
    },
    cancel(){
      this.dialogVisible = false;
      this.resetForm('roleForm')
    },
    authorize(){
      this.dialogVisible = true
    },
    
    search(){
        this.currentPage = 1

      this.getList()
    },
    reset(){
      this.clearForm()
      this.getList()
    },
    clearForm(){
      this.form={
        approvalStatus:0,
        applyType:'transfer',
        createUserName:'',
      }
    },
    async getList(){
      var data ={
        applyType:this.form.applyType,
      }
      if(this.form.applyType=='transfer'){
        data.transfer={
          pageSize:this.pageSize,
          pageIndex:this.currentPage,
          approvalStatus:this.form.approvalStatus,
          createUserName:this.form.createUserName
        }
      }else{
        data.conversion={
          pageSize:this.pageSize,
          pageIndex:this.currentPage,
          approvalStatus:this.form.approvalStatus,
          createUserName:this.form.createUserName
        }
      }
      const res = await getApplyList(data);
      if(res){
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      }
    },
    change() {
      this.dialogVisible3 = !this.dialogVisible3;
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    // 分页
    handleSizeChange(val) {
      // //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      // this.getList()
    },
    handleCurrentChange(val) {
      // //console.log(`当前页: ${val}`);
      this.currentPage = val;
      // this.getList()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.approveRecord{
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