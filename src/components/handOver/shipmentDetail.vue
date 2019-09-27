<template>
  <div class="shipmentDetail">
    <div class="sellBox">
      <div class="head clear">
          <el-page-header @back="back" content="交付数据查询明细"></el-page-header>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" size="small" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="客户">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="子类">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="平台">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="出货类型">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="订单月份">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item :label="' '">
            <el-button size='small' type='primary' plain>查询</el-button>
            <el-button @click='dialogVisible = true' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">
          
          <el-table :data="tableData" border height="100%" style="width:100%">
<div v-if='type=="deliver"'>

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
            </div>
<div v-if='type=="receive"'>
                  <el-table-column prop="productModel" width='150' label="产品型号" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="inventoryCategory" width='150' label="库存类别" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="inventoryUnitPrice" width='150' label="库存单价" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="warehouse" width='150' label="仓储地" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="deliveryTime" width='150' label="提货时间" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="invoiceNumber" width='150' label="提货发票号" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="deliveryNum" width='150' label="提货数量" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="deliveryCompany" width='150' label="发货公司" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="purchaseNumber" width='150' label="采购单号" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="remark" width='150' label="备注" show-overflow-tooltip></el-table-column>
                  </div>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
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
  import {getMore} from "@/api/handover/detail";
  export default {
    name: 'shipmentDetail',
    components:{
      Daterange
    },
    data() {
      return {
        form: {},
        value: '',
        dialogVisible: false,
        tableData: [
        ],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        total: 0,
      }
    },
    computed: {
      queryId(){
        return this.$route.query.id
      },
      type(){
        return this.$route.query.type
      }
    },
    created() {
      this.getMore()
    },
    watch: {
    },
    methods: {
      back() {
      window.history.back();
    },
      async getMore(){
        var data ={
          
          id:this.queryId,
        }
        var param ={
          type:this.type,
          pageNum:this.currentPage,
          pageSize:this.pageSize,
        }
        const res = await getMore(data,param);
        // console.log('详情',res)
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      mx(){
        this.$router.push({
          name:'shipmentDetail'
        })
      },
      change() {
        this.dialogVisible = !this.dialogVisible
      },
      sure() {
        this.dialogVisible = false
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => { });
      },
      q(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1
      },
      add() {
        this.$router.push(
          {
            name: 'AddSell'
          }
        )
      },
      // 分页
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getMore()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getMore()
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
.shipmentDetail{
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