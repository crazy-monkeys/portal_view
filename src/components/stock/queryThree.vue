<template>
  <div class="stockQuery">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >库存管理</el-breadcrumb-item>
          <el-breadcrumb-item>客户专货库存查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!searchBlockVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='searchBlockVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='searchBlockVisible'>
          <el-form-item label="客户">
            <el-select size="small" v-model="form.sCustomerIncode" clearable placeholder="请选择">
              <el-option v-for="(item, index) in customerList" :key="index" v-bind="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理商">
            <el-select size="small" v-model="form.sAgencyIncode" clearable placeholder="请选择">
              <el-option v-for="(item, index) in dealerList" :key="index" v-bind="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain @click="search">搜索</el-button>
            <el-button  size='small' type='primary' plain @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns">
          <!-- <el-button type='primary' class="add" size='small' @click="move" :disabled="dis">转移</el-button>
          <el-button type='primary' class="add" size='small' @click="exchange" :disabled="dis">转换</el-button> -->
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" @row-click="rowClick" @selection-change="handleSelectionChange"> 
            <el-table-column type="selection" show-overflow-tooltip label="" width="60">
            </el-table-column>
            <el-table-column
              v-for="(item, index) in tableHeader"
              :key="index"
              v-bind="item"
              show-overflow-tooltip>
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
  </div>
</template>

<script>
import { getCustList, getDealerList, getStackDealer } from '@/api/stock/query.js'

export default {
  name: "stockQueryThree",
  
  data() {
    return {
      rowData:{},
      form:{
        sCustomerIncode:'',
        sAgencyIncode:'',
      },
      //验证规则
      rules:{
        transferOutCustomer: [
          { required: true, trigger: ['blur','change'],message:'转出客户不能为空'}
        ],
        transferIntoCustomer: [
          { required: true, trigger: ['blur','change'],message:'转入客户不能为空'}
        ],
      },
      fixedHeader: [
        {
          prop: 'company',
          label: '出货公司',
        },
        {
          prop: 'agency_short_name',
          label: '代理简称',
        },
        {
          prop: 'customer_short_name',
          label: '客户简称',
          width: 140,
        },
        {
          prop: 'customer_type',
          label: '客户类别',
          width: 120,
        },
        {
          prop: 'sales',
          label: '销售',
          width: 140,
        },
        {
          prop: 'ameba_header',
          label: '队长',
          width: 140,
        },
        {
          prop: 'ameba_name',
          label: '战队',
          width: 140,
        },
        {
          prop: 'DepCName',
          label: '代表处',
          width: 140,
        },
        {
          prop: 'product_line',
          label: 'BU',
          width: 200,
        },
        {
          prop: 'sub_product_line',
          label: 'PDT',
        },
        {
          prop: 'Class2',
          label: 'Product Type',
          width: 140,
        },
        {
          prop: 'Class3',
          label: '平台',
          width: 140,
        },
        {
          prop: 'product',
          label: '产品型号',
          width: 140,
        },
        {
          prop: 'po_price',
          label: 'PO PRICE',
          width: 140,
        },
        {
          prop: 'total_qty',
          label: '客户专货库存总数（K）',
          width: 180,
        },
        {
          prop: 'total_amount',
          label: '客户专货库存总金额（$K）',
          width: 200,
        },
        {
          prop: 'lt30qty',
          label: '小于30天库存数量',
          width: 140,
        },
        {
          prop: 'lt30amount',
          label: '小于30天库存金额',
          width: 140,
        },
        {
          prop: 'lt60qty',
          label: '30-60天库存数量',
          width: 140,
        },
        {
          prop: 'lt60amount',
          label: '30-60天库存金额',
          width: 140,
        },
        {
          prop: 'lt90qty',
          label: '60-90天库存数量',
          width: 140,
        },
        {
          prop: 'lt90amount',
          label: '60-90天库存金额',
          width: 140,
        },
        {
          prop: 'gt90qty',
          label: '大于90天库存数量',
          width: 140,
        },
        {
          prop: 'gt90amount',
          label: '大于90 天库存金额',
          width: 140,
        },
      ],
      increData: [],
      //搜索框
      searchBlockVisible: false,
      //数据列表
      tableDataTotal:[],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 50,
      total: 0,
      multipleSelection:[],
      customerList: [],
      dealerList: [],
    };
  },
  created(){
    this.getList();
    this.getCustList()
    this.getDealerList()
  },
  computed:{
    tableHeader() {
      const headers = [...this.fixedHeader];
      headers.splice(14, 0, ...this.increData);
      return headers;
    },
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
  },
  methods: {
    async getCustList() {
      const { data } = await getCustList();
      if (data.code === 1) {
        this.customerList = data.data.map(i => ({ label: i.custName, value: i.outCode }));
      }
    },
    async getDealerList() {
      const { data } = await getDealerList();
      if (data.code === 1) {
        this.dealerList = data.data.map(i => ({ label: i.custName, value: i.outCode }));
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    rowClick(row){
      // //console.log(row)
      this.rowData = row
      // this.moveForm.role = this.rowData.role.roleCode
    },
    resetForm(formName) {
      this.$formTest.resetForm(this.$refs[formName]) 
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
        sCustomerIncode:'',
        sAgencyIncode:'',
      }
    },
    async getList(){
      const { data } = await getStackDealer(this.form);
      if (data.code === 1) {
        this.increData = data.data.header.map(i => ({ prop: i, label: i }))
        const body = JSON.parse(JSON.parse(data.data.body));
        this.tableDataTotal = body;
        this.this.total = body.length;
      }
    },
    change() {
      this.searchBlockVisible = !this.searchBlockVisible;
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