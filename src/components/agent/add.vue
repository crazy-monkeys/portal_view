<template>
  <!-- 添加新增控件 -->
  <div class="add">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home/agent/index">代理商管理</el-breadcrumb-item>
        <el-breadcrumb-item >代理商引入</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="selBox">
        <el-form ref="form" :model="form" class="form" label-position='top' :inline='true'>
          <el-form-item label="代理商名称">
            <el-input size='small' placeholder="" :readonly="true" v-model='v1'></el-input>
          </el-form-item>
          <el-form-item label="英文名">
            <el-input size='small' placeholder="" :readonly="true" v-model='v3'></el-input>
          </el-form-item>
          <el-form-item label="代理商简称">
            <el-input size='small' placeholder="" :readonly="true" v-model='v4'></el-input>
          </el-form-item>
          <el-form-item label="关联公司">
            <el-input size='small' placeholder="" :readonly="true" v-model='v5'></el-input>
          </el-form-item>
          <el-form-item label="注册日期">
            <el-input size='small' placeholder="" :readonly="true" v-model='v6'></el-input>
          </el-form-item>
          <el-form-item label="注册地址">
            <el-input size='small' placeholder="" :readonly="true" v-model='v7'></el-input>
          </el-form-item>
          <el-form-item label="办公地址">
            <el-input size='small' placeholder="" :readonly="true" v-model='v8'></el-input>
          </el-form-item>
          <el-form-item label="公司资产">
            <el-input size='small' placeholder="" :readonly="true" v-model='v9'></el-input>
          </el-form-item>
          <el-form-item label="公司总机">
            <el-input size='small' placeholder="" :readonly="true" v-model='v10'></el-input>
          </el-form-item>
          <el-form-item label="传真">
            <el-input size='small' placeholder="" :readonly="true" v-model='v11'></el-input>
          </el-form-item>
          <el-form-item label="公司人数">
            <el-input size='small' placeholder="" :readonly="true" v-model='v12'></el-input>
          </el-form-item>
          <el-form-item label="委托代表人">
            <el-input size='small' placeholder="" :readonly="true" v-model='v12'></el-input>
          </el-form-item>
          <el-form-item label="业务介绍">
            <el-input type='textarea' v-model='form.txt' :rows="2" placeholder="" resize='none' :readonly="true"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="主要开户行信息" name="first">
            <div class="tabBox">
              <el-table :data="tableData" style="width: 100%" height="300">
                <el-table-column prop="" label="ID" v-if="false">
                </el-table-column>
                <el-table-column prop="t1" label="银行名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t2" label="银行地址" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t3" label="账号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t4" label="银行识别码" show-overflow-tooltip>
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
          <el-tab-pane label="股权结构" name="second">
            <div class="tabBox">
              <el-table :data="tableData1" style="width: 100%" height="300">
                <el-table-column prop="t11" label="股东" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t12" label="占比" show-overflow-tooltip>
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
          <el-tab-pane label="管理层及主要联系人" name="third">
            <div class="tabBox">
              <el-table :data="tableData2" style="width: 100%" height="300">
                <el-table-column prop="t21" label="部门" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t22" label="姓名" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t23" label="职位" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t24" label="电话号码" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t25" label="电子邮件" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t26" label="资质备" show-overflow-tooltip>
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
          <el-tab-pane label="优势" name="good">
            <div class="tabBox">
               <el-checkbox v-model="checked">资金</el-checkbox>
               <el-checkbox v-model="checked">仓储物流</el-checkbox>
               <el-checkbox v-model="checked">研发</el-checkbox>
               <el-checkbox v-model="checked">客户关系</el-checkbox>
               <el-checkbox v-model="checked">客户开发</el-checkbox>
               <el-checkbox v-model="checked">商务支持</el-checkbox>
               <el-checkbox v-model="checked">信息支持</el-checkbox>
               <el-checkbox v-model="checked">原厂配合</el-checkbox>
               <el-checkbox v-model="checked">周边器件支持</el-checkbox>
               <el-checkbox v-model="checked">CRM系统对接能力</el-checkbox>
            </div>
          </el-tab-pane>
          <el-tab-pane label="附件信息" name="fourth">
            <div class="tabBox">
              <el-table :data="tableData3" style="width: 100%" height="300">
                <el-table-column prop="h1" label="文件类型" show-overflow-tooltip>
                  
                </el-table-column>
                <el-table-column prop="" label="" >
                  <template slot-scope="scope">
                    <el-upload
                      class="upload-demo"
                      action=''
                      >
                      <el-button size="mini" type="">上传文件</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column prop="h3" label="文件名" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="h4" label="文件说明" show-overflow-tooltip>
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
        form: {
          txt: ''
        },
        checked:true,
        activeName: 'first',
        tableData: [
          {
            t1: '中国建设银行',
            t2: '上海市静安区XXXXXXX',
            t3: 'test0000001',
            t4: 'xxxxxxx'
          }
        ],
        tableData1: [
          {
            t11: '股东A',
            t12: '10%'
          }, {
            t11: '股东B',
            t12: '20%'
          }
        ],
        tableData2: [
          {
            t21: '财务部',
            t22: '测试',
            t23: '财务',
            t24: '15200000000',
            t25: 'test@qq.com',
            t26: 'test'
          }, {
            t21: '人事部',
            t22: '测试',
            t23: '财务',
            t24: '15200000000',
            t25: 'test@qq.com',
            t26: 'test'
          }
        ],
        tableData3: [
          {
            'h1': '营业执照',
            'h2': '',
            'h3': '营业执照.pdf',
            'h4':''
          },
          {
            'h1': '注册证明',
            'h2': '',
            'h3': '',
            'h4':''
          },
          {
            'h1': '税务登记证',
            'h2': '',
            'h3': '',
            'h4':''
          },
          {
            'h1': '银行证明',
            'h2': '',
            'h3': '',
            'h4':''
          },
          {
            'h1': '财务报表',
            'h2': '',
            'h3': '',
            'h4':''
          },
          {
            h1: '代理资格证明',
            h2: '',
            h3: '',
            h4:''
          },
          {
            h1: '风险评估',
            h2: '',
            h3: '',
            h4:''
          },
          {
            h1: '管理合规调查',
            h2: '',
            h3: '',
            h4:''
          },
          {
            h1: '主营业务',
            h2: '',
            h3: '',
            h4:''
          }
        ],
        tableData4: [
          {
            t41: '测试客户A',
            t42: '上海市静安区XXXXXXX',
            t43: '测试',
            t44: '20190101测试拜访记录'
          }, {
            t41: '测试客户B',
            t42: '上海市静安区XXXXXXX',
            t43: '测试',
            t44: '20190101测试拜访记录'
          },
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
            text-align: center
          }

        }
      }
    }
  }
</style>