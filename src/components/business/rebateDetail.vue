<template>
  <div class="rebateDetail">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>商务管理</el-breadcrumb-item>
          <el-breadcrumb-item>客户Rebate</el-breadcrumb-item>
          <el-breadcrumb-item>明细</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="核算明细" name="first">
          <div class="box">
            <div class="tab">
              <el-table :data="form.salesDetails" border style="width: 100%" height="100%">
                <el-table-column prop="agencyShortName" width='150' label="代理简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="agencyName" width='150' label="代理全称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerShortName" width='150' label="客户简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerCode" width='150' label="客户外部号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerType" width='150' label="客户类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="amebaHeader" width='150' label="阿米巴队长" show-overflow-tooltip></el-table-column>
                <el-table-column prop="amebaDepartment" width='150' label="阿米巴部门" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bu" width='150' label="BU" show-overflow-tooltip></el-table-column>
                <el-table-column prop="product" width='150' label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="shipmentType" width='150' label="出货类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="qty" width='150' label="数量" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salesPrice" width='150' label="Sale Price($)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="poPrice" width='150' label="Po Price($)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="actualPrice" width='150' label="Actual Price($)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="rebateAmount" width='150' label="Rebate Amount($)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="accountYearMonth" width='150' label="核算年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="shipmentYearMonth" width='150' label="出货年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="shipmentDate" width='150' label="出货日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="orderMonth" width='150' label="订单年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salesReportId" width='150'  label="出货序号"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="priceStrategyNumber" width='150'  label="价格策略序号"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="shipmentCompany" width='150'  label="出货公司"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="rebateType" width='150'  label="Rebate 计算类型"  show-overflow-tooltip></el-table-column>
                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
              <!-- <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                  :page-sizes="[10, 20,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
                </el-pagination>
              </div> -->
            </div>
            
          </div>
        </el-tab-pane>
        <el-tab-pane label="策略" name="second">
          <div class="box">
            <div class="tab">
              <el-table :data="form.priceRoles" border style="width: 100%" height="100%">
                <el-table-column prop="customerCode" width='150' label="客户外部号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerName" width='150' label="客户全称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerIncode" width='150' label="客户内部号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerShortName" width='150' label="客户简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="product" width='150' label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="startDate" width='150' label="有效期开始" show-overflow-tooltip></el-table-column>
                <el-table-column prop="endDate" width='150' label="有效期结束" show-overflow-tooltip></el-table-column>
                <el-table-column prop="price" width='150' label="实际价格($)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salesLimitLower" width='150' label="销售下限($)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salesLimitUpper" width='150' label="销售上限($)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="calculateType" width='150' label="核算类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="rebateExcuteMode" width='150' label="Rebate 执行方式" show-overflow-tooltip></el-table-column>
                <el-table-column prop="priceProposer" width='150'  label="价格申请人"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="shipmentType" width='150'  label="出货类型"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="relatedCustomerCode" width='150'  label="关联公司外部编号"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="relatedCustomerName" width='150'  label="关联公司全称"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="relatedProduct" width='150'  label="关联产品"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="priceStrategyNumber" width='150'  label="价格策略序号"  show-overflow-tooltip></el-table-column>
                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
              <!-- <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                  :page-sizes="[10, 20,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
                </el-pagination>
              </div> -->
            </div>
            
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
   
  </div>
</template>

<script>
import {detail} from '@/api/business/rebate.js'
  export default {
    name: 'rebateDetail',
    data() {
      return {
        form: {
          priceRoles:[],
          salesDetails:[],
        },
        tableData: [
        ],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        total: 0,
        activeName:'first'
      }
    },
    computed: {
      id() {
        return this.$route.query.id
      }
    },
    created() {
      this.getMore()
    },
    watch: {
    },
    methods: {
      async getMore(){
        const data ={
          id:this.id
        }
        const res =await detail(data);
        // console.log('明细',res);
        if(res){
          this.form = res.data.data
        }
      },
      handleClick(){},
      // 分页
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      
    }
  }
</script>

<style lang='scss'>
  $sc:12;
.rebateDetail{
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
    position: relative;
    padding-top: 34px;
    box-sizing: border-box;
    .head{
      padding: 10px 20px;
      position: absolute;
      top: 0;
      // background: red;
    }
    .el-tabs{
      height: 100%;
      position: relative;
      box-sizing: border-box;
      padding-top: 50px;
      .el-tabs__header{
        position: absolute;
        top: 0;
        width: 100%;
        .el-tabs__nav-wrap {
          padding:0 20px;
        }
      }
      .el-tabs__content{
        height: 100%;
        .el-tab-pane{
          height: 100%;
          display: flex;
          flex-direction: column;
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
            // padding-bottom: 52px;
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
  }
}
</style>