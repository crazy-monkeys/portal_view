<template>
  <!-- 添加新增控件 -->
  <div class="add">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home/order/list">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单填报</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="selBox">
        <el-form ref="form" :model="form" class="form" label-position='top' :inline='true'>
          <el-form-item label="甲方单位（章）">
            <el-select v-model="value" size="small" filterable placeholder="公司A">
            </el-select>
          </el-form-item>
          <el-form-item label="授权委托代表人">
            <el-input size='small' placeholder="" :readonly="true" v-model='v2'></el-input>
          </el-form-item>
          <el-form-item label="业务联系人">
            <el-input size='small' placeholder="" :readonly="true" v-model='v3'></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input size='small' placeholder="" :readonly="true" v-model='v4'></el-input>
          </el-form-item>
          <el-form-item label="传真">
            <el-input size='small' placeholder="" :readonly="true" v-model='v5'></el-input>
          </el-form-item>
          <el-form-item label="SwiftCode">
            <el-input size='small' placeholder="" :readonly="true" v-model='v6'></el-input>
          </el-form-item>
          <el-form-item label="开户银行">
            <el-input size='small' placeholder="" :readonly="true" v-model='v7'></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input size='small' placeholder="" :readonly="true" v-model='v8'></el-input>
          </el-form-item>
          <el-form-item label="开票地址">
            <el-input size='small' placeholder="" :readonly="true" v-model='v9'></el-input>
          </el-form-item>
          <el-form-item label="付款方式">
            <el-input size='small' placeholder="" :readonly="true" v-model='v10'></el-input>
          </el-form-item>
          <el-form-item label="交货地址">
            <el-input size='small' placeholder="" :readonly="true" v-model='v11'></el-input>
          </el-form-item>
          <el-form-item label="发票种类">
            <el-select v-model="value" size="small" filterable placeholder="出口发票">
            </el-select>
          </el-form-item>
          <el-form-item label="发票传递">
            <el-radio-group v-model='radio'>
              <el-radio label="1">随货</el-radio>
              <el-radio label='2'>办公地址或  <el-input size='small' placeholder="" v-model='v11'></el-input></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
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
                  <template slot-scope="scope">
                    <el-upload
                      class="upload-demo"
                      action=''
                      >
                      <el-select v-model="value" size="small" filterable placeholder="专货订单">
                      </el-select>
                    </el-upload>
                  </template>
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
              <!-- <div class="block">
                <el-pagination :current-page="currentPage" :page-sizes="[10, 100]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next"
                  :total="total">
                </el-pagination>
              </div> -->
            </div>
          </el-tab-pane>
          
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
export default {
  name: "AddSell",
  data() {
    return {
      radio: "1",
      form: {
        txt: ""
      },
      activeName: "first",
      tableData: [
        {
          t1: "中国建设银行",
          t3: "AF",
          t4: "AF-001",
          t5: "87",
          t6: "100",
          t7: "2019-06-23"
        }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeCon() {},
    changeSign(val) {},
    // 表单验证
    submitForm(formName) {},
    submitForm1(formName) {},
    resetForm(formName) {},
    resetForm1(formName) {},
    qx() {},
    //发送测试短信
    send(shopInfoId, mobiles, content, noticeRegisterId) {},
    // 清空表单
    clear() {},
    //获取主题列表
    getTheme(shopid) {},
    //新增营销活动
    submit() {},
    change() {},
    //roi时间选择事件
    selRuleFormTime() {},
    //获取短信签名列表
    getSignatures(shopInfoId) {},
    getSnapshots(id) {},

    //获取用户店铺列表
    getShopList() {},

    // 点击弹出测试短信框
    cs() {
      this.csdialogVisible = true;
    },
    handleSelect(item) {
      console.log(item);
    },
    //创建主题按钮
    create() {
      this.dialogVisible = true;
    },
    // 点击返回按钮
    back() {
      window.history.back();
    },
    back1() {
      this.dialogVisible = false;
    },

    // 创建主题和测试短信关闭
    close() {
      this.dialogVisible = false;
      this.csdialogVisible = false;
    },
    // 添加主题 的提交
    commit() {
      this.dialogVisible = false;
      this.csdialogVisible = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;

.add {
  .head {
    h1 {
      opacity: 0.87;
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 42px;
      height: 42px;
      font-weight: bold;
      padding: 0 50px;

      span {
        border-left: 1px solid #ccc;
        padding: 0 20px;
      }

      i {
        font-weight: bold;
        margin-right: 20px;
        cursor: pointer;
      }
    }

    .el-breadcrumb {
      line-height: 30px;
      margin-left: 50px;
      margin-right: 20px;
    }
  }

  .content {
    height: 100%;
    // background: pink;
    padding: 0 30px 20px;

    .selBox {
      padding: 0 20px 10px 20px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      background: #fff;

      .form {
        max-width: 1300px;

        .el-form-item {
          margin-bottom: 0;
          width: 200px;

          .el-form-item__label {
            height: 30px;
          }
        }

        .el-form-item:last-child {
          width: 100%;

          .el-textarea__inner {
            width: 414px;
            margin-top: 2px;
          }
        }
      }
    }

    .tab {
      background: #fff;
      padding: 20px;

      .block {
        background: #fff;
        bottom: 26px;
        padding: 10px;

        .el-pagination {
          width: 100%;
          text-align: center;
        }
      }
    }
  }
}
</style>