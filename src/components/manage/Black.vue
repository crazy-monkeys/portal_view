<template>
  <!-- 添加新增控件 -->
  <div class="addAct">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home/sell">客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>客户报备</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="selBox">
        <el-form ref="form" :model="form" label-width="80px" :inline='true'>
          <el-form-item label="客户号">
            <el-input size='small' :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="中文名">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="英文名">
            <el-input size='small'></el-input>
          </el-form-item>
         <el-form-item label="客户类型" >
              <el-select v-model="value1" size="small" filterable placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item label="销售" >
              <el-select v-model="value2" size="small" filterable placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item label="阿米巴" >
              <el-select v-model="value3" size="small" filterable placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item label="公司资产">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="员工人数">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="注册时间" size='small'>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="传真">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="母公司">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="公司总机">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="注册地址">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="办公地址">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="业务介绍" >
            <el-input type='textarea' v-model='form.txt' :rows="2" placeholder="" resize='none'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="主要开户行信息" name="first">
            <div class="tabBox">
              <el-table :data="tableData1" style="width: 100%">
                <el-table-column type="index" label="编号" width="150">
                </el-table-column>
                <el-table-column prop="" label="ID" v-if="false">
                </el-table-column>
                <el-table-column prop="" label="主题名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="" show-overflow-tooltip label="创建时间">
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header" slot-scope="scope">
                    <el-button size='small' type='primary'>新增</el-button>
                  </template>
                  <template slot-scope="scope">
                      <el-button size='small' type='text'>删除</el-button>
                      
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
              <div class="block">
                <el-pagination :current-page="currentPage" :page-sizes="[10, 100]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next"
                  :total="total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="股权结构" name="second">
            <div class="tabBox">
              <el-table :data="tableData" style="width: 100%" >
                <el-table-column type="index" label="编号" width="150">
                </el-table-column>
                <el-table-column prop="themeId" label="ID" v-if="false">
                </el-table-column>
                <el-table-column prop="themeName" label="主题名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createTimeStr" show-overflow-tooltip label="创建时间">
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header" slot-scope="scope">
                    <el-button size='small' type='primary'>新增</el-button>
                  </template>
                  <template slot-scope="scope">
                      <el-button size='small' type='text'>删除</el-button>
                      
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
              <div class="block">
                <el-pagination :current-page="currentPage" :page-sizes="[10, 100]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next"
                  :total="total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="管理层及主要联系人" name="third">
            <div class="tabBox">
              <el-table :data="tableData" style="width: 100%" >
                <el-table-column type="index" label="编号" width="150">
                </el-table-column>
                <el-table-column prop="themeId" label="ID" v-if="false">
                </el-table-column>
                <el-table-column prop="themeName" label="主题名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createTimeStr" show-overflow-tooltip label="创建时间">
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header" slot-scope="scope">
                    <el-button size='small' type='primary'>新增</el-button>
                  </template>
                  <template slot-scope="scope">
                      <el-button size='small' type='text'>删除</el-button>
                      
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
              <div class="block">
                <el-pagination :current-page="currentPage" :page-sizes="[10, 100]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next"
                  :total="total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="业务往来信息" name="fourth">
            <div class="tabBox">
              <el-table :data="tableData" style="width: 100%" >
                <el-table-column type="index" label="编号" width="150">
                </el-table-column>
                <el-table-column prop="themeId" label="" v-if="false">
                </el-table-column>
                <el-table-column prop="themeName" label="" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createTimeStr" show-overflow-tooltip label="">
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header" slot-scope="scope">
                    <el-button size='small' type='primary'>新增</el-button>
                  </template>
                  <template slot-scope="scope">
                      <el-button size='small' type='text'>删除</el-button>
                      
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
              <div class="block">
                <el-pagination :current-page="currentPage" :page-sizes="[10, 100]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next"
                  :total="total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="sub">
        <el-button type='primary' size='small'>保存</el-button>
        <el-button type='primary' size='small' plain>提交</el-button>
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
        options1: [{
          value: '选项1',
          label: 'Mass Market'
        }, {
          value: '选项2',
          label: 'Account Market'
        }],
        value1: '',

        options2: [{
          value: '选项1',
          label: '销售A'
        }, {
          value: '选项2',
          label: '销售B'
        }],
        value2: '',

        options3: [{
          value: '选项1',
          label: '阿米巴A'
        }, {
          value: '选项2',
          label: '阿米巴B'
        }],
        value3: '',

        form: {},
        activeName: 'first',
        tableData: [
          {}
        ],
        tableData1: [
          {}
        ],
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      changeCon() { },
      changeSign(val) { },
      // 表单验证
      submitForm(formName) { },
      submitForm1(formName) { },
      resetForm(formName) { },
      resetForm1(formName) { },
      qx() { },
      //发送测试短信
      send(shopInfoId, mobiles, content, noticeRegisterId) { },
      // 清空表单
      clear() { },
      //获取主题列表
      getTheme(shopid) { },
      //新增营销活动
      submit() { },
      change() { },
      //roi时间选择事件
      selRuleFormTime() { },
      //获取短信签名列表
      getSignatures(shopInfoId) { },
      getSnapshots(id) { },

      //获取用户店铺列表
      getShopList() { },

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

  .addAct {
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

        .el-form--inline .el-form-item {
          margin-bottom: 0;
          width: 200px;
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
            text-align: center
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