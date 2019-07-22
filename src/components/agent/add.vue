<template>
  <!-- 添加新增控件 -->
  <div class="add">
    <div class="head clear">
     <el-page-header @back="goBack" content="">
    </el-page-header>
    </div>
    
    <div class="content">
      <div class="selBox">
        <el-form ref="form" :model="form" class="form" label-position='top' :inline='true'>
          <el-collapse v-model="activeName1" @change="handleChange">
            <el-collapse-item name="1" >
              <template slot="title">
                <h3 style="padding:10px 0;color:purple">基本信息</h3>
              </template>
              <el-form-item label="编码">
              <el-input type="text" size="small"></el-input>
              </el-form-item>
              <el-form-item label="名称">
              <el-input type="text" size="small"></el-input>
              </el-form-item>
              <el-form-item label="简称">
                <el-input type="text" size="small"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input type="text" size="small"></el-input>
              </el-form-item>
              <el-form-item label="E-mail">
                <el-input type="text" size="small"></el-input>
              </el-form-item>
              <el-form-item label="网站">
                <el-input type="text" size="small"></el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item name='2'>
              <template slot="title">
                <h3 style="padding:10px 0;color:purple">背景信息</h3>
              </template>
              <el-form-item label="公司资产">
              <el-input type="text" size="small"></el-input>
              </el-form-item>
              <el-form-item label="注册日期">
                <el-input type="text" size="small"></el-input>
              </el-form-item>
              <el-form-item label="公司人数">
                <el-input type="text" size="small"></el-input>
              </el-form-item>
              <el-form-item label="上级公司">
                <el-input type="text" size="small"></el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template slot="title">
                <h3 style="padding:10px 0;color:purple">开户行信息</h3>
              </template>
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
            </el-collapse-item>
            <el-collapse-item name="4">
              <template slot="title">
                <h3 style="padding:10px 0;color:purple">授信额度信息</h3>
              </template>
               <el-form-item label="授信额度初始值">
              <el-input type="text" size="small"></el-input>
            </el-form-item>
            <el-form-item label="授信额度占用值">
              <el-input type="text" size="small"></el-input>
            </el-form-item>
            <el-form-item label="授信额度剩余值">
              <el-input type="text" size="small"></el-input>
            </el-form-item>
            </el-collapse-item>
            <el-collapse-item name="5">
              <template slot="title">
                <h3 style="padding:10px 0;color:purple">介绍</h3>
              </template>
               <el-form-item class="txt" label="优势价值">
              <el-input type="textarea" size="small" v-model="value" readonly rows='4'> </el-input>
            </el-form-item>
            <el-form-item  class="txt" label="优势介绍">
              <el-input type="textarea" size="small" readonly rows='4'></el-input>
            </el-form-item>
            <el-form-item class="txt" label="业务介绍">
              <el-input type="textarea" size="small" readonly rows='4'></el-input>
            </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="关系" name="first">
            <div class="tabBox">
               <el-table :data="tableData2" style="width: 100%" height="300">
                <el-table-column prop="t22" label="名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t24" label="关系类型" show-overflow-tooltip>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="联系人" name="third">
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
          <el-tab-pane label="开票信息" name="second">
            <div class="tabBox">
               <el-table :data="tableData2" style="width: 100%" height="300">
                <el-table-column prop="t22" label="购货单位" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t24" label="收货地址" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t25" label="收获手机" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t21" label="纳税人登记号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="t23" label="币种" show-overflow-tooltip>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="附件" name="fourth">
            <div class="tabBox">
              <el-table :data="tableData3" style="width: 100%" height="300">
                <el-table-column prop="" label="附件类型" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="" label="附件信息" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="" label="上传时间" show-overflow-tooltip>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
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
  export default {
    name: "AddSell",
    data() {
      return {
        activeName1:['1','2','3','4','5'],
        value:'',
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
        
        ],
        tableData2: [
       
        ],
        tableData3: [
        ],
        tableData4: [
         
        ],
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    },
    methods: {
      handleChange(val){
        console.log(val)
      },
      goBack(){
        window.history.go(-1)
      },
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
    overflow-y: auto;
    height: 100%;
    .head {
      padding:10px 40px;
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
          width: 100%;
          
          .el-form-item {
            margin-bottom: 0;
            width: 200px;

            .el-form-item__label {
              height: 30px;
            }
          }
          .txt{
            width: 100%;
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