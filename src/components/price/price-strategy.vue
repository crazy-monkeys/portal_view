<template>
  <div class="price-strategy">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>价格管理</el-breadcrumb-item>
          <el-breadcrumb-item>产品价格策略</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if="!dialogVisible" @click="change">展开</i>
          <i class="el-icon-arrow-up" v-if="dialogVisible" @click="change">收起</i>
        </div>
        <el-form
          ref="form"
          :model="form"
          class="form"
          label-width="auto"
          label-position="top"
          :inline="true"
          v-show="dialogVisible"
        >
          <el-form-item label="BU">
            <el-input size="small" v-model="form.bu" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="PDT">
            <el-input size="small" v-model="form.pdt" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产品类型">
            <el-input size="small" v-model="form.productType" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input size="small" v-model="form.productModel" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="生效时间" class="date">
            <Daterange @data="watchTime" :resetDataReg="resetData" />
          </el-form-item>
          <el-form-item label=" ">
            <el-button size="small" type="primary" @click="search" plain>搜索</el-button>
            <el-button @click="reset" size="small" type="primary" plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">

        <el-table :data="tableData" border style="width: 100%" height="100%">
          <el-table-column type="index" width="100" label="序号" :index="q"></el-table-column>
          <el-table-column prop="status" width="80" show-overflow-tooltip label="状态"></el-table-column>
          <el-table-column prop="bu" width="80" show-overflow-tooltip label="BU"></el-table-column>
          <el-table-column prop="pdt" width="80" label="PDT" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="productType"
            width="150"
            label="Product Type"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="platform" width="100" show-overflow-tooltip label="平台"></el-table-column>
          <el-table-column prop="productModel" width="150" label="产品型号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="upperNumber" width="150" label="数量上限" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lowerNumber" width="150" label="数量下限" show-overflow-tooltip></el-table-column>
          	
          <el-table-column show-overflow-tooltip prop="catalogPrice" width="150" label="目录价格"></el-table-column>

          <el-table-column show-overflow-tooltip prop="permissionPrice" width="150" label="权限价格"></el-table-column>
          <el-table-column show-overflow-tooltip prop="bottomLinePrice" width="150" label="底线价格"></el-table-column>
          <el-table-column show-overflow-tooltip prop="standardCost" width="150" label="标准成本"></el-table-column>
          <el-table-column show-overflow-tooltip prop="depreciationCost" width="150" label="减值成本"></el-table-column>
          			
          <el-table-column show-overflow-tooltip prop="inCustomer" width="150" label="内部客户"></el-table-column>
          <el-table-column show-overflow-tooltip prop="deadTime" width="150" label="失效时间"></el-table-column>
          <el-table-column show-overflow-tooltip prop="effectTime" width="150" label="生效时间"></el-table-column>
          <el-table-column show-overflow-tooltip prop="modifyTime" width="150" label="更新时间"></el-table-column>
          <el-table-column show-overflow-tooltip prop="remark" width="150" label="备注"></el-table-column>
          <div slot="empty">
            <p>无数据</p>
          </div>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 20,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import Daterange from "../com/date";
import { getList } from "@/api/price/priceStrategy.js";
export default {
  name: "priceStrategy",
  components: {
    Daterange
  },
  data() {
    return {
      resetData: false,
      form: {
        bu: "",
        pdt: "",
        productModel: "",
        productType: "",
        relationProductModel: "",
        status: "",
        priceProposer: "",
        effectBeginTime: "",
        effectEndTime: ""
      },
      dialogVisible: false,
      tableData: [],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    search() {
      this.currentPage = 1;
      this.getList();
    },
    watchTime(data) {
      console.log(data);
      this.form.effectBeginTime = data.startTime;
      this.form.effectEndTime = data.endTime;
      this.resetData = false;
    },
    async getList() {
      const data = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        status: this.form.status,
        bu: this.form.bu,
        pdt: this.form.pdt,
        productType: this.form.productType,
        productModel: this.form.productModel,
        effectBeginTime: this.form.effectBeginTime,
        effectEndTime: this.form.effectEndTime
      };
      const res = await getList(data);
      console.log("产品价格策略列表", res);
      if (res) {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      }
    },
    create() {},
    reset() {
      this.currentPage=1
        this.pageSize=10
      this.form = {
        bu: "",
        pdt: "",
        productModel: "",
        relationProductModel: "",
        status: "",
        priceProposer: "",
        effectBeginTime: "",
        effectEndTime: ""
      };
      this.resetData = true;
      this.getList();
    },
    change() {
      this.dialogVisible = !this.dialogVisible;
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    add() {
      this.$router.push({
        name: "Addprice-query"
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.price-strategy {
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;
  .el-dialog {
    .form {
      .el-form-item__label {
        height: 30px;
      }
      .el-form-item {
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .sellBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    .head {
      padding: 10px 20px;
      // background: red;
    }
    .sels {
      // margin: 20px 0;
      padding: 10px 20px;
      background: #fff;
      margin-bottom: 10px;
      .lineBox {
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
        .el-select {
          width: 100%;
        }
      }
      .date {
        width: 414px;
      }
    }
    .box {
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      background: #fff;
      .btns {
        padding: 10px 20px;
        // background: pink;
      }
      .tab {
        padding-bottom: 52px;
        box-sizing: border-box;
        height: 100%;
        // background: orange;
        display: flex;
        flex-direction: column;
        position: relative;
        .el-table {
          height: 100%;
          position: relative;
        }
        .block {
          position: absolute;
          bottom: 0;
          padding: 10px 0;
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