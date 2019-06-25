<template>
    <!-- 添加新增控件 -->
    <div class="addAct">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/home/sell">代理商管理</el-breadcrumb-item>
          <el-breadcrumb-item to="/home/sell/sellIndex">代理商引入</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>
         代理商引入
        </h1>
      </div>
      <div class="content">
        <div class="selBox">
          <el-form ref="form" :model="form" label-width="80px" :inline='true'>
            <el-form-item label="活动名称">
              <el-input size='small'></el-input>
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input size='small'></el-input>
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input size='small'></el-input>
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input size='small'></el-input>
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input size='small'></el-input>
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input size='small'></el-input>
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input size='small'></el-input>
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input size='small'></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tab">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="主要开户行信息" name="first">
              <div class="tabBox">
                <el-table :data="tableData" style="width: 100%" height="700">
                  <el-table-column type="index" label="编号" width="150">
                  </el-table-column>
                  <el-table-column prop="themeId" label="ID" v-if="false">
                  </el-table-column>
                  <el-table-column prop="themeName" label="主题名称" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="createTimeStr" show-overflow-tooltip label="创建时间">
                  </el-table-column>
                  <div slot="empty">
                    <div>
                      <img src="../../assets/img/none.png" alt="" width="140" height="140" />
                    </div>
                    <p>未查询到明细</p>
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
                <el-table :data="tableData" style="width: 100%" height="700">
                  <el-table-column type="index" label="编号" width="150">
                  </el-table-column>
                  <el-table-column prop="themeId" label="ID" v-if="false">
                  </el-table-column>
                  <el-table-column prop="themeName" label="主题名称" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="createTimeStr" show-overflow-tooltip label="创建时间">
                  </el-table-column>
                  <div slot="empty">
                    <div>
                      <img src="../../assets/img/none.png" alt="" width="140" height="140" />
                    </div>
                    <p>未查询到明细</p>
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
                <el-table :data="tableData" style="width: 100%" height="700">
                  <el-table-column type="index" label="编号" width="150">
                  </el-table-column>
                  <el-table-column prop="themeId" label="ID" v-if="false">
                  </el-table-column>
                  <el-table-column prop="themeName" label="主题名称" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="createTimeStr" show-overflow-tooltip label="创建时间">
                  </el-table-column>
                  <div slot="empty">
                    <div>
                      <img src="../../assets/img/none.png" alt="" width="140" height="140" />
                    </div>
                    <p>未查询到明细</p>
                  </div>
                </el-table>
                <div class="block">
                  <el-pagination :current-page="currentPage" :page-sizes="[10, 100]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next"
                    :total="total">
                  </el-pagination>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="附件" name="fourth">
                <div class="tab">
                    <el-table :data="tableData" style="width: 100%" height="700" @row-click='rowClick'>
                      <el-table-column prop="" width='30' show-overflow-tooltip label="">
                      </el-table-column>
                      <el-table-column prop="" label="文件类型" show-overflow-tooltip>
                          <template scope-slot='scope'>
                              <el-select v-model="value" placeholder="请选择" size='small'>
                                  <el-option
                                    v-for="item in types"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                          </template>  
                      </el-table-column>
                      <el-table-column prop="" label="文件名" show-overflow-tooltip>
                          <template scope-slot='scope'>
                              <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                          </template>  
                      </el-table-column>
                      <el-table-column prop="" label="备注" show-overflow-tooltip>
                          
                      </el-table-column>
                      <el-table-column show-overflow-tooltip prop="" label="操作">
                        <template scope-slot='scope'>
                          <el-button type='text' size='small'>
                            删除
                          </el-button>
                        </template>  
                      </el-table-column>
                      <div slot="empty">
                        <div>
                          <img src="../../assets/img/none.png" alt="" width="140" height="140" />
                        </div>
                        <p>未查询到客户信息</p>
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
          activeName: 'first',
          tableData: [
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