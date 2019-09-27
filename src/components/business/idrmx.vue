<template>
  <!-- 添加新增控件 -->
  <div class="idrmx">
    <div class="head clear">
      <el-page-header @back="back" content="明细"></el-page-header>
    </div>
    <div class="content">
      <div class="selBox">
        <el-form ref="form" disabled :model="form" label-position="top" class="form" :inline="true">
          <el-form-item label="发货方编码">
            <el-input size="small" v-model="form.shipperCode"></el-input>
          </el-form-item>
          <el-form-item label="公司">
            <el-input size="small" v-model="form.company"></el-input>
          </el-form-item>
          <el-form-item label="申请时间" class="date">
            <el-date-picker size="small" v-model="form.applyTime" type="date"></el-date-picker>
          </el-form-item>
          <el-form-item label="币种">
            <el-select v-model="form.currency" size="small" filterable placeholder>
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="CR金额" v-if="type==2">
            <el-input size="small" v-model="form.crAmount"></el-input>
          </el-form-item>

          <el-form-item label="内部客户名称">
            <el-input size="small" v-model="form.inCustomerName"></el-input>
          </el-form-item>
          <el-form-item label="外部客户名称">
            <el-input size="small" v-model="form.outCustomerName"></el-input>
          </el-form-item>
          <el-form-item label="原因" class="txt">
            <el-input type="textarea" v-model="form.reson" :rows="2" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="备注" class="txt">
            <el-input type="textarea" v-model="form.remark" :rows="2" resize="none"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="单据信息" name="first">
            <div class="tabBox">
              <el-table
                :data="type==1 ? form.iList :type==2?  form.dList : form.rList"
                border
                style="width: 100%"
                height="500"
              >
                <div v-if="type==1">
                  <el-table-column  prop='remark'  show-overflow-tooltip label="备注" width="200"></el-table-column>

                  <el-table-column  prop='customerName'  label="客户" show-overflow-tooltip width="200"></el-table-column>
                  <el-table-column  prop='adjustDate'  show-overflow-tooltip label="调价时间" width="200"></el-table-column>
                  <el-table-column  prop='receiveGoodsDate'  show-overflow-tooltip label="收货时间" width="200"></el-table-column>
                  <el-table-column  prop='bu'  label="BU" show-overflow-tooltip width="200"></el-table-column>
                  <el-table-column  prop='pdt'  label="PDT" show-overflow-tooltip width="200"></el-table-column>
                  <el-table-column  prop='productType'  label="产品类型" show-overflow-tooltip width="200"></el-table-column>
                  <el-table-column  prop='platform'  show-overflow-tooltip label="平台" width="200"></el-table-column>
                  <el-table-column  prop='productModel'  show-overflow-tooltip label="产品型号" width="200"></el-table-column>
                  <el-table-column  prop='num'  show-overflow-tooltip label="库存数量" width="200"></el-table-column>
                  <el-table-column  prop='price'  show-overflow-tooltip label="库存价格" width="200"></el-table-column>
                  <el-table-column  prop='currency'  show-overflow-tooltip label="币种" width="200"></el-table-column>
                  <el-table-column  prop='newPrice'  show-overflow-tooltip label="新价格" width="200"></el-table-column>
                  <el-table-column  prop='insuranceAmount'  show-overflow-tooltip label="保价金额" width="200"></el-table-column>
                  <el-table-column  prop='modifyDate'  show-overflow-tooltip label="调整时间" width="200"></el-table-column>
                </div>

                <div v-if="type==2">
                  <el-table-column prop='remark' show-overflow-tooltip label="备注" width="200"></el-table-column>

                  <el-table-column
                    prop='customerName'
                    label="客户"
                    show-overflow-tooltip
                    width="200"
                  ></el-table-column>
                  <el-table-column prop='bu' label="BU" show-overflow-tooltip width="200"></el-table-column>
                  <el-table-column prop='pdt' label="PDT" show-overflow-tooltip width="200"></el-table-column>
                  <el-table-column prop='productType' label="产品类型" show-overflow-tooltip width="200"></el-table-column>
                  <el-table-column prop='platfom' show-overflow-tooltip label="平台" width="200"></el-table-column>
                  <el-table-column prop='productModel' show-overflow-tooltip label="产品型号" width="200"></el-table-column>
                  <el-table-column prop='shipmentDate' show-overflow-tooltip label="出货时间" width="200"></el-table-column>
                  <el-table-column prop='num' show-overflow-tooltip label="数量" width="200"></el-table-column>
                  <el-table-column prop='customerPrice' show-overflow-tooltip label="客户提货单价" width="200"></el-table-column>
                  <el-table-column prop='agentPrice' show-overflow-tooltip label="代理提货单价" width="200"></el-table-column>
                  <el-table-column prop='differenceAmount' show-overflow-tooltip label="差价金额" width="200"></el-table-column>
                </div>

                <div v-if="type==3">
                  <el-table-column prop="remark" show-overflow-tooltip label="备注" width="200"></el-table-column>

                  <el-table-column prop="type" show-overflow-tooltip label="类型" width="200"></el-table-column>
                  <el-table-column prop="orderNumber" show-overflow-tooltip label="订单号" width="200"></el-table-column>
                  <el-table-column
                    prop="takeGoodsDate"
                    show-overflow-tooltip
                    label="提货日期"
                    width="200"
                  ></el-table-column>
                  <el-table-column prop="productLine" show-overflow-tooltip label="产品线" width="200"></el-table-column>
                  <el-table-column prop="bu" show-overflow-tooltip label="BU" width="200"></el-table-column>
                  <el-table-column prop="pdt" show-overflow-tooltip label="PDT" width="200"></el-table-column>
                  <el-table-column prop="platform" show-overflow-tooltip label="平台" width="200"></el-table-column>
                  <el-table-column
                    prop="productModel"
                    show-overflow-tooltip
                    label="产品型号"
                    width="200"
                  ></el-table-column>
                  <el-table-column prop="num" show-overflow-tooltip label="数量" width="200"></el-table-column>
                  <el-table-column prop="currency" show-overflow-tooltip label="币种" width="200"></el-table-column>
                  <el-table-column prop="price" show-overflow-tooltip label="价格" width="200"></el-table-column>
                  <el-table-column prop="amount" show-overflow-tooltip label="金额" width="200"></el-table-column>
                  <el-table-column
                    prop="replacementDate"
                    show-overflow-tooltip
                    label="换货日期"
                    width="200"
                  ></el-table-column>
                </div>

                <div slot="empty">无数据</div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="附件" name="fourth">
            <div class="tabBox">
              <el-table :data="form.files" border style="width: 100%" height="500">
                <el-table-column  label="附件名" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <a :href="scope.row.filePath" :download="scope.row.filePath"> {{scope.row.fileName}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" label="上传时间" show-overflow-tooltip></el-table-column>
                <div slot="empty">无数据</div>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
import { detail } from "@/api/business/idr.js";

export default {
  name: "idrmx",
  data() {
    return {
      activeName: "first",

      value11: "",
      value12: "",
      value13: "",
      value14: "",
      value15: "",
      tableData3: [],
      options1: [
        {
          value: "1",
          label: "USD"
        },
        {
          value: "2",
          label: "CNY"
        }
      ],
      options10: [
        {
          value: "1",
          label: "3001"
        },
        {
          value: "2",
          label: "7100"
        }
      ],

      form: {},
      activeName: "first"
    };
  },
  watch: {},
  computed: {
    queryId() {
      return this.$route.query.id;
    },
    type() {
      return this.$route.query.type;
    }
  },
  created() {
    this.detail();
  },
  methods: {
    async detail() {
      const data = {
        id: this.queryId
      };
      const res = await detail(data);
      // console.log("详情", res);
      if (res) {
        this.form = res.data.data;
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 点击返回按钮
    back() {
      window.history.back();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;

.idrmx {
  height: 100%;
  overflow-y: auto;
  padding: 0 20px;
  .head {
    padding: 10px 20px;
  }

  .content {
    height: 100%;
    // background: pink;
    // padding: 0 30px 20px;

    .selBox {
      padding: 0 20px 10px 20px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      background: #fff;
      .form {
        width: 100%;
        min-width: 900px;
        max-width: 1300px;

        .el-form-item {
          margin-bottom: 0;
          width: 200px;
          .el-select {
            width: 200px;
          }
          .el-form-item__label {
            height: 30px;
          }
        }
        .all {
          width: 100%;
        }
        .txt {
          width: 100%;
        }
        // .el-form-item:last-child {
        //   /* width:100%; */
        //   .el-textarea__inner {
        //     width: 414px;
        //     margin-top: 2px;
        //   }
        // }
        .date {
          width: 200px;
          .el-date-editor {
            width: 200px;
          }
        }
      }
    }

    .tab {
      background: #fff;
      padding: 20px;
      .btns {
        padding: 10px 0;
      }
      .block {
        background: #fff;
        padding: 10px;

        .el-pagination {
          width: 100%;
          text-align: center;
        }
      }
    }

    .sub {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
    }
  }
}
</style>