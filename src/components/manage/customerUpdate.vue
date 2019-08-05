<template>
  <!-- 添加新增控件 -->
  <div class="editsell">
    <div class="head clear">
      <el-page-header @back="back" content="客户信息修改">
    </el-page-header>
    </div>
    <div class="content">
      <div class="selBox">
        <el-form ref="form" :model="form" label-position="top" class="form" :inline="true">
          <el-form-item label="客户名称">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-select v-model="value1" size="small" filterable placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否License客户">
            <el-select v-model="value" size="small"  placeholder="请选择">
              <el-option  label="是" value="1"></el-option>
              <el-option  label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="value" size="small"  placeholder="请选择">
              <el-option  label="中国客户" value="1"></el-option>
              <el-option  label="亚太客户" value="2"></el-option>
              <el-option  label="北美客户" value="3"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="销售">
            <el-select v-model="value2" size="small" filterable placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="阿米巴">
            <el-select v-model="value3" size="small" filterable placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="公司资产">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="员工人数">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="传真">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="公司网站">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="母公司">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="公司总机">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" size="small" class="date">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
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
          <el-form-item label="业务介绍" class="txt">
            <el-input type="textarea" v-model="form.txt" :rows="2" placeholder resize="none"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane label="开票信息" name='ccc'>
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
                <el-table-column prop="t33" show-overflow-tooltip label="银行识别码">
                </el-table-column>
                <el-table-column prop="t33" show-overflow-tooltip label="银行名称">
                </el-table-column>
                <el-table-column prop="t33" show-overflow-tooltip label="银行地址">
                </el-table-column>
                <el-table-column prop="t33" show-overflow-tooltip label="银行账号">
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
          <el-tab-pane label="联系人" name='aa'>
            <div class="tabBox">
              <el-table :data="tableData3" style="width: 100%" height="300">
                <el-table-column prop="t31" label="联系人类型" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t31" label="姓名" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t32" label="部门" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t33" show-overflow-tooltip label="职位">
                </el-table-column>
                <el-table-column prop="t33" show-overflow-tooltip label="联系方式">
                </el-table-column>
                <el-table-column prop="t33" show-overflow-tooltip label="邮箱">
                </el-table-column>
                <el-table-column prop="t33" show-overflow-tooltip label="是否关键决策人">
                </el-table-column>
                <el-table-column prop="t33" show-overflow-tooltip label="股东占比">
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
          <el-tab-pane label="客户层次结构" name="first">
            <div class="tabBox">
              <el-table :data="tableData1" style="width: 100%" height="300">
                <el-table-column prop="t11" label="名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t11" label="地址" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t11" label="主要联系人" show-overflow-tooltip>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="销售团队" name="third">
            <div class="tabBox">
              <el-table :data="tableData2" style="width: 100%" height="300">
                <el-table-column prop="t21" label="角色类型" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t21" label="名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="手机号" show-overflow-tooltip>
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
          <el-tab-pane label="关系" name="zzz">
            <div class="tabBox">
              <el-table :data="tableData2" style="width: 100%" height="300">
                <el-table-column prop="t21" label="名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="关系类型" show-overflow-tooltip>
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
          <el-tab-pane label="销售数据" name="a">
            <div class="tabBox">
              <el-table :data="tableData2" style="width: 100%" height="300">
                <el-table-column prop="t21" label="销售组织" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="分销渠道" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="产品组" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="货币" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="装运条件" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="交货工厂" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="最大部分交货" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="内部客户" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="账户分配组" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="客户组" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="税分类" show-overflow-tooltip>
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
        <el-button type="primary" size="small" plain>取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
export default {
  name: "black",
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

.editsell {
  height: 100%;
  overflow-y: auto;
  padding: 0 20px ;
  .head {
      padding:10px 20px;

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