<template>
  <div class="stockQuery">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >库存管理</el-breadcrumb-item>
          <el-breadcrumb-item>代理库存明细查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible3' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible3' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible3'>
          <el-form-item label="年月">
            <el-input size='small' v-model="form.sYearMonth" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="代理简称">
            <el-input size='small' v-model="form.sAgencyShortName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="BU">
            <el-input size='small' v-model="form.sBU" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="PDT">
            <el-input size='small' v-model="form.sPDT" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="Product Type">
            <el-input size='small' v-model="form.sProductType" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="Platform">
            <el-input size='small' v-model="form.sPlatform" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input size='small' v-model="form.sProduct" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户属性">
            <el-input size='small' v-model="form.sCustomerType" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="库存类别">
            <el-input size='small' v-model="form.sInventoryType" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="发货公司">
            <el-input size='small' v-model="form.sCompany" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="期末库存周期">
            <el-input size='small' v-model="form.sMonthEndInventoryPeriod" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain @click="search">搜索</el-button>
            <el-button  size='small' type='primary' plain @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns">
          <el-button type='primary' class="add" size='small' @click="move" :disabled="dis">转移</el-button>
          <el-button type='primary' class="add" size='small' @click="exchange" :disabled="dis">转换</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" @row-click="rowClick" @selection-change="handleSelectionChange"> 
            <el-table-column type="selection" show-overflow-tooltip label="" width="60">
            </el-table-column>
            <el-table-column prop="year_month" show-overflow-tooltip label="年月" width="150">
            </el-table-column>
            <el-table-column prop="agency_short_name" label="代理简称" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="product_line" label="BU" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="sub_product_line" label="PDT" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="class2" label="Product Type" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="class3" label="Platform" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="product" label="产品型号" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="customer_type" label="客户属性" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="inventory_type" label="库存类别" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="inventory_price" label="库存单价" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="company" label="发货公司" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="sales_org" label="销售组织" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="monthly_init_qty" label="期初库存数量" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="agency_pick_up_date" label="代理提货时间" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="sales_qty" label="出货数量" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="monthly_end_qty" label="期末库存数量" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="monthly_end_inventory_period" label="期末库存周期" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="inventory_total_amount" label="金额" show-overflow-tooltip width="150">
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
    <el-dialog title="转移" :visible.sync="moveDia"  width="400px" :before-close='cancel'>
      <el-form :model="moveForm" :rules='rules' ref='moveForm' size="small" label-position='top'>
        <el-form-item label="年月" prop="transferYearMonth">
          <el-date-picker
            v-model="moveForm.transferYearMonth"
            type="month"
            size="small"
            placeholder="选择日期"
            value-format="yyyyMM">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="转入客户" prop="transferIntoCustomer">
          <el-select v-model="moveForm.transferIntoCustomer" size="small" filterable placeholder="请选择">
            <el-option
              v-for="item in customerList"
              :key="item.outCode"
              :label="item.custName"
              :value="item.outCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转出客户" prop="transferOutCustomer">
          <el-select v-model="moveForm.transferOutCustomer " size="small" filterable placeholder="请选择">
            <el-option
              v-for="item in customerList"
              :key="item.outCode"
              :label="item.custName"
              :value="item.outCode  ">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size='small'>取 消</el-button>
        <el-button type="primary" @click="submitForm('moveForm')" size='small'>确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="转换" :visible.sync="exchangeDia"  width="400px" :before-close='cancel'>
      <el-form :model="exchangeForm" :rules='rules' ref='exchangeForm' size="small" label-position='top'>
        <el-form-item label="年月" prop="conversionYearMonth">
          <el-date-picker
            v-model="exchangeForm.conversionYearMonth"
            type="month"
            size="small"
            placeholder="选择日期"
            value-format="yyyyMM">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="客户属性" prop="conversionCustomerType">
          <el-select v-model="exchangeForm.conversionCustomerType" size="small" filterable placeholder="请选择">
            <el-option
              v-for="item in customerTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存类别" prop="conversionInventoryType">
          <el-select v-model="exchangeForm.conversionInventoryType" size="small" filterable placeholder="请选择">
            <el-option
              v-for="item in inventoryTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size='small'>取 消</el-button>
        <el-button type="primary" @click="submitForm('exchangeForm')" size='small'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { inventoryDetail,inventoryConversion,inventoryTransfer,getCustList } from '@/api/stock/query.js'
import {   getRolesAll } from '@/api/system/role.js'
export default {
  name: "stockQueryTwo",
  
  data() {
    return {
      rowData:{},
      moveForm:{
        transferOutCustomer:'',
        transferIntoCustomer:'',
        transferYearMonth:''
      },
      exchangeForm:{
        conversionYearMonth:'',
        conversionCustomerType:'',
        conversionInventoryType:'',
      },
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
      inventoryTypes:[
        {
          label:'客户专货',
          value:'客户专货'
        },
        {
          label:'分销商专货',
          value:'分销商专货'
        },
        {
          label:'Buffer',
          value:'Buffer'
        },
        {
          label:'样品',
          value:'样品'
        },
        {
          label:'Last buy',
          value:'Last buy'
        }
      ],
      form:{
        sYearMonth	:'',
        sAgencyShortName		:'',
        sBU		:'',
        sPDT		:'',
        sProductType		:'',
        sPlatform		:'',
        sProduct		:'',
        sCustomerType		:'',
        sInventoryType		:'',
        sCompany		:'',
        sMonthEndInventoryPeriod		:'',
        
      },
      //验证规则
      rules:{
        transferOutCustomer: [
          { required: true, trigger: ['blur','change'],message:'转出客户不能为空'}
        ],
        transferIntoCustomer: [
          { required: true, trigger: ['blur','change'],message:'转入客户不能为空'}
        ],
        transferYearMonth: [
          { required: true, trigger: ['blur','change'],message:'年月不能为空'}
        ],
        conversionYearMonth: [
          { required: true, trigger: ['blur','change'],message:'年月不能为空'}
        ],
        conversionCustomerType: [
          { required: true, trigger: ['blur','change'],message:'客户属性不能为空'}
        ],
        conversionInventoryType: [
          { required: true, trigger: ['blur','change'],message:'库存类别不能为空'}
        ]
      },
      //角色列表
      customerList: [],
      //转移框
      moveDia: false,
      //转换框
      exchangeDia: false,
      //搜索框
      dialogVisible3: false,
      //用户列表
      tableDataTotal:[],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 50,
      total: 0,
      multipleSelection:[]
    };
  },
  created(){
    this.getList();
    this.dogetCustList()
  },
  computed:{
    tableData:{
      get: function() {
        var arr = this.tableDataTotal.filter((item,index)=>{
          if(index>=(this.currentPage-1)*this.pageSize && index<=(this.pageSize)*this.currentPage){
            return  item
          }
        })
        return arr
      },
      set: function() {
      }
    },
    dis(){
      if(this.multipleSelection.length==0){
       return true
      }else{
        var len = this.multipleSelection.filter(item=>{
          return item.sales_org == 3000
        }).length
        if(len==this.multipleSelection.length || len==0){
          return false
        }else{
          return true
        }
      }
    }
  },
  methods: {
    dogetCustList(){
      getCustList().then(res=>{
        if(res.data.code==1){
          this.customerList = res.data.data
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    exchange(){
      this.exchangeDia = true
    },
    move(){
      this.moveDia = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    rowClick(row){
      // //console.log(row)
      this.rowData = row
      // this.moveForm.role = this.rowData.role.roleCode
    },
    submitForm(formName) {
      this.$formTest.submitForm(this.$refs[formName],formName=='moveForm' ?  this.domove : this.doexchange)
    },
    resetForm(formName) {
      this.$formTest.resetForm(this.$refs[formName]) 
    },
    domove(){
      var data =this.multipleSelection.map(item=>{
        return {...item,...this.moveForm}
      })
      inventoryTransfer(data).then(res=>{
        if(res.data.code==1){
          this.$message.success('转移成功')
          // this.getList()
          this.cancel()

        }
      }).catch(err=>{
        console.log(err)
      })
    },
    doexchange(){
      var data =this.multipleSelection.map(item=>{
        return {...item,...this.exchangeForm}
      })
      inventoryConversion(data).then(res=>{
        if(res.data.code==1){
          this.$message.success('转换成功')
          // this.getList()
          this.cancel()
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    cancel(){
      this.moveDia = false;
      this.exchangeDia = false;
      this.resetForm('moveForm')
      this.resetForm('exchangeForm')
    },
    search(){
      this.getList()
    },
    reset(){
      this.clearForm()
      this.getList()
    },
    clearForm(){
      this.form={
        sYearMonth	:'',
        sAgencyShortName		:'',
        sBU		:'',
        sPDT		:'',
        sProductType		:'',
        sPlatform		:'',
        sProduct		:'',
        sCustomerType		:'',
        sInventoryType		:'',
        sCompany		:'',
        sMonthEndInventoryPeriod		:'',
      }
    },
    async getList(){
      var data =this.form
      const res = await inventoryDetail(data);
      if(res){
        this.tableDataTotal = res.data.data
        this.total = res.data.data.length
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
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.stockQuery{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;

  .el-dialog{
    .el-select{
      width: 100%;
    }
    .el-date-editor{
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