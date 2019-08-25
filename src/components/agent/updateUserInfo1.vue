<template>
  <!-- 添加新增控件 -->
  <div class="updateUserInfo">
    <div class="head clear">
      <el-page-header @back="goBack" content="">
    </el-page-header>
    </div>
    <div class="content">
      <div class="selBox">
        <el-form ref="form" :model="form" label-position="top" class="form" :inline="true">
          <el-form-item label="电话">
            <el-input size="small" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="网站">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="公司资产">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="员工人数">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="上级公司">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" size="small" class="date">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="银行名称">
            <el-input type="text" size="small"></el-input>
          </el-form-item>
          <el-form-item label="银行地址">
            <el-input type="text" size="small"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input type="text" size="small"></el-input>
          </el-form-item>
          <el-form-item label="银行识别码">
            <el-input type="text" size="small"></el-input>
          </el-form-item>
          <el-form-item label="注册地址" class="address">
            <el-select v-model="value4" size="small" filterable placeholder="省">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value5" size="small" filterable placeholder="市">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value6" size="small" filterable placeholder="区">
              <el-option
                v-for="item in options6"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input size="small" placeholder="详细地址"></el-input>
          </el-form-item>
          <el-form-item label="办公地址" class="address">
            <el-select v-model="value4" size="small" filterable placeholder="省">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value4" size="small" filterable placeholder="市">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value4" size="small" filterable placeholder="区">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input size="small" placeholder="详细地址"></el-input>
          </el-form-item>
          <el-form-item class="txt" label="优势价值">
              <el-input type="textarea" size="small" v-model="value" readonly rows='4'> </el-input>
            </el-form-item>
            <el-form-item  class="txt" label="优势介绍">
              <el-input type="textarea" size="small" readonly rows='4'></el-input>
            </el-form-item>
            <el-form-item class="txt" label="业务介绍">
              <el-input type="textarea" size="small" readonly rows='4'></el-input>
            </el-form-item>
        </el-form>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane label="开票信息" name="fff">
            <div class="tabBox">
              <el-table :data="tableData3" style="width: 100%" height="300">
                <el-table-column prop="t31" label="购货单位" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t31" label="收货地址" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t32" label="收货手机号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t33" show-overflow-tooltip label="纳税人登记号">
                </el-table-column>
                <el-table-column prop="t33" show-overflow-tooltip label="币种">
                </el-table-column>
                <el-table-column prop="t4" label="" show-overflow-tooltip>
                  <template slot="header">
                    <el-button type="primary" size="small">新增</el-button>
                  </template>
                  <template >
                    <el-button type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="联系人" name="first">
            <div class="tabBox">
              <el-table :data="tableData2" style="width: 100%" height="300">
                <el-table-column prop="t22" label="姓名" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t24" label="电话" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t25" label="邮箱" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t21" label="部门" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t23" label="职位" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t26" label="是否关键决策人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t26" label="股权占比" show-overflow-tooltip>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="附件" name="fourth">
            <div class="tabBox">
              <el-table :data="tableData5" style="width: 100%" height="300">
                <el-table-column prop="" label="附件类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-select size="small">
                      <el-option value="营业执照" label='营业执照'></el-option>
                      <el-option value="银行开户证明" label='银行开户证明'></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="t31" label="附件" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t32" label="上传时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t33" show-overflow-tooltip label="上传人">
                </el-table-column>
                <el-table-column prop="t4" label="" show-overflow-tooltip>
                  <template slot="header">
                    <el-button type="primary" size="small">新增</el-button>
                  </template>
                  <template >
                    <el-button type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
          
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="sub">
        <el-button type="primary" size="small" plain>保存</el-button>
        <el-button type="primary" size="small" plain>提交</el-button>
        <el-button type="primary" size="small" plain>取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
export default {
  name: "updateUserInfo",
  data() {
    return {
      tableData5:[
        {}
      ],
      options1: [
        {
          value: "选项1",
          label: "Mass Market"
        },
        {
          value: "选项2",
          label: "Account Market"
        }
      ],
      value1: "",

      options2: [
        {
          value: "选项1",
          label: "销售A"
        },
        {
          value: "选项2",
          label: "销售B"
        }
      ],
      value2: "",

      options3: [
        {
          value: "选项1",
          label: "阿米巴A"
        },
        {
          value: "选项2",
          label: "阿米巴B"
        }
      ],
      value3: "",

      options4: [
        {
          value: "选项1",
          label: "上海"
        },
        {
          value: "选项2",
          label: "北京"
        }
      ],
      value4: "",
      options5: [
        {
          value: "选项1",
          label: "上海"
        },
        {
          value: "选项2",
          label: "北京"
        }
      ],
      value5: "",
      options6: [
        {
          value: "选项1",
          label: "静安"
        },
        {
          value: "选项2",
          label: "王府井"
        }
      ],
      value6: "",

      form: {},
      activeName: "first",
      tableData: [{}],
      tableData1: [{}],
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    goBack(){
      window.history.go(-1)
    },
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

.updateUserInfo {
  height: 100%;
  overflow-y: auto;
  padding: 0 20px ;
  .head {
      padding:10px ;
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
        .txt{
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
            margin-top: 4px;
            width: 200px;
          }
        }
        .address {
          display: block;
          width: 900px;
          .el-select,
          .el-input {
            width: 200px;
            margin-right: 10px;
          }
        }
      }
    }

    .tab {
      background: #fff;
      padding: 20px;
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