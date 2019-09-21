<template>
  <div class="orderList">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/order/list'>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="订单号">
                <el-input size='small' placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="下单人">
                <el-input size='small' placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单状态">
                <el-select v-model="value" size="small" filterable placeholder="专货订单">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下单日期" class="date">
                <el-date-picker size='small' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                  v-model="d1">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交货日期" class="date">
                <el-date-picker size='small' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                  v-model="d1">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label=" ">
                <el-button size='small' type='primary' plain>查询</el-button>
                <el-button @click='dialogVisible = true' size='small' type='primary' plain>重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="700">
            <el-table-column prop="" width='20' show-overflow-tooltip label="">
            </el-table-column>
            <el-table-column prop="1" show-overflow-tooltip label="订单号">
            </el-table-column>
            <el-table-column prop="1" show-overflow-tooltip label="状态">
            </el-table-column>
            <el-table-column prop="2" label="下单人" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="3" label="总金额" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="4" show-overflow-tooltip label="开户银行">
            </el-table-column>
            <el-table-column prop="5" label="付款方式" show-overflow-tooltip>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="6" label="发票种类">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="7" label="委托代表人">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="8" label="业务联系人">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="9" label="电话">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="10" label="传真">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="11" label="swiftcode">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="12" label="下单日期">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="13" label="交货日期">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="操作" fixed='right'>
              <template slot-scope='scope'>
                <el-button type='text' size='small' @click='detail(scope.row.id)'>明细</el-button>
              </template>
            </el-table-column>
            <div slot="empty">

              <p>无数据</p>
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
    <el-dialog title="订单详情" :visible.sync="dialogVisible1" width="60%">
      <div class="tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="订单信息" name="first">
            <div class="tabBox">
              <el-table :data="tableData" style="width: 100%" height="300">
                <el-table-column prop="" label="ID" v-if="false">
                </el-table-column>
                <el-table-column prop="t1" label="客户属性" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t2" label="订单类型" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t3" label="规格型号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t4" label="单位" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t5" label="单位（USD）" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t6" label="数量" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t7" label="交货日期" show-overflow-tooltip>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="出货信息" >
            <div class="tabBox">
            </div>
          </el-tab-pane>
          <el-tab-pane label="发票">
            <div class="tabBox">
            </div>
          </el-tab-pane>
      </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {queryList} from '@/api/order/list.js'

export default {
  name: "orderList",
  data() {
    return {
      form: {},
      d1: [],
      activeName:"first",
      options: [
        {
          value: "选项1",
          label: "正常"
        },
        {
          value: "选项2",
          label: "退货"
        }
      ],
      value: "",
      dialogVisible: false,
      dialogVisible1: false,
      tableData: [
      ],
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
    this.getList()
  },
  watch: {},
  methods: {
    async getList(){
      const data ={
        pageSize:this.pageSize,
        pageIndex:this.currentPage,
      }
      const res = await queryList(data);
      if(res){
        this.tableData = res.data.data.list
      }
    },
    handleClick(){},
    change() {
      this.dialogVisible = !this.dialogVisible;
    },
    detail() {
      this.dialogVisible1 = true;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.orderList{
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
    // .el-tabs{
    //   height: 100%;
    //   position: relative;
    //   box-sizing: border-box;
    //   padding-top: 50px;
    //   .el-tabs__header{
    //     position: absolute;
    //     top: 0;
    //     width: 100%;
    //     .el-tabs__nav-wrap {
    //       padding:0 20px;
    //     }
    //   }
    //   .el-tabs__content{
    //     height: 100%;
    //     .el-tab-pane{
    //       height: 100%;
    //       display: flex;
    //       flex-direction: column;
    //     }
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
              width: 100%;
              margin-bottom: 0;
              .el-select{
                width: 100%;
              }
            }
            .date {
              width: 100%;
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
            .upload-demo{
              display: inline-block;
            }
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
  //   }
  // }
}
</style>