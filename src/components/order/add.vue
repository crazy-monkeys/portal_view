<template>
  <!-- 添加新增控件 -->
  <div class="orderAdd">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/home/order/list">订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单申请</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <div class="selBox">
          <el-form ref="form" :model="form" class="form" label-position='top' :inline='true'>
            <el-row :gutter="22">
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="订单类型">
                  <el-select v-model="value1" size="small"  placeholder="公司A">
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="销售组织">
                  <el-select v-model="value1" size="small" filterable placeholder="出口发票">
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="分销渠道">
                  <el-input size='small'  placeholder="" disabled v-model='v3'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="产品组">
                  <el-input size='small' placeholder="" disabled v-model='v4'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="销售部门">
                  <el-input size='small' placeholder="" disabled v-model='v5'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="销售组">
                  <el-input size='small' placeholder=""  v-model='v6'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="售达方">
                  <el-select v-model="value1" size="small" filterable placeholder="出口发票">
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="送达方">
                  <el-select v-model="value1" size="small" filterable placeholder="出口发票">
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="采购订单编号">
                  <el-input size='small' placeholder=""  v-model='v9'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="采购订单下达日期">
                  <el-input size='small' placeholder=""  v-model='v10'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
              
                <el-form-item label="付款条件">
                  <el-select v-model="value1" size="small" filterable placeholder="出口发票">
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="国际贸易条款一">
                  <el-select v-model="value1" size="small" filterable placeholder="出口发票">
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="国际贸易条款二">
                  <el-select v-model="value1" size="small" filterable placeholder="出口发票">
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="客户组一">
                  <el-select v-model="value1" size="small" filterable placeholder="出口发票">
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="客户组二">
                  <el-select v-model="value1" size="small" filterable placeholder="出口发票">
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="交货日期">
                  <el-select v-model="value1" size="small" filterable placeholder="出口发票">
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="btns">
          <el-button type='primary' class="add" size='small' >下载模版</el-button>
          <el-button type='primary' class="add" size='small'>上传</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" show-summary style="width: 100%" height="300">
            <el-table-column prop="" label="ID" v-if="false">
            </el-table-column>
            <el-table-column prop="t1" label="物料号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t2" label="单价" show-overflow-tooltip>
                <!-- <el-select v-model="value" size="small" filterable placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->
            </el-table-column>
            <el-table-column prop="t3" label="单位" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t4" label="数量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t5" label="价格" show-overflow-tooltip>
            </el-table-column>
            <div slot="empty">
              无数据
            </div>
          </el-table>
        </div>
        <div class="lines">
             <!-- □ 出口发票    □增值税普通发票     □增值税专业发票（13%）
                        发票传递：   ■ 随货        □ 甲方办公地或   
                                                         -->
          <div>
            <p>一、包装与标识要求：</p>
            <p class="two">1、乙方必须提供适合产品运输和存储要求的有效包装。</p>
            <p class="two">2、以乙方的标准包装为准，除非甲方有特殊要求。</p>
          </div>
          <div>
            <p>二、包装费用和运费由乙方承担。</p>
          </div> 
          <div>
            <p class="one">三、乙方按订单金额提供：
              <!-- <el-form-item > -->
                <el-radio-group v-model="checkList" size="mini">
                  <el-radio label="出口发票"></el-radio>
                  <el-radio label="增值税普通发票"></el-radio>
                  <el-radio label="增值税专业发票（13%）"></el-radio>
                </el-radio-group>
              <!-- </el-form-item> -->
            </p>
            <p class="two">发票传递： 
              <!-- <el-form-item > -->
                <el-radio-group v-model="checkList">
                  <el-radio label="随货"></el-radio>
                  <el-radio label="甲方办公地或">甲方办公地或<el-input v-model="value1" size="small" style="border:none;border-bottom:1px solid #000"></el-input></el-radio>
                </el-radio-group>
              <!-- </el-form-item>   -->
               </p>
          </div> 
          <div>
            <p>四、任何情况下，乙方因本订单产生的赔偿责任不应超过本订单项下甲方支付给乙方的总货款数。</p>
          </div>
          <div>
            <p>五、<span>不可抗力：在履行本订单时，如果任何一方由于不可抗力的原因，包括但不限于战争行为、火灾、风暴、水灾、台风及其他恶劣的天气状况、地震、政府或类似干预，以及其他不可预见、不可避免并不可克服的任何原因导致其不能履行本订单项下的义务，该方就由此造成的任何履行延误或履行不能对另一方不负任何责任。</span></p>
          </div>                                            
          <div>
            <p>六、本订单项下的货物买卖不应被解释为授予甲方任何的相关知识产权。</p>
          </div> 
          <div>
            <p>七、因本订单引起的任何争议应提交上海国际经济贸易仲裁委员会仲裁解决。</p>
          </div> 
          <div>
            <p>八、本订单为不可撤销订单。本订单传真件有效。</p>
          </div> 
        </div>
        <div class="sub">
          <el-button type="primary" size="small"  @click="sub">提交</el-button>
          <el-button type="primary" size="small" plain @click="cancel">取消</el-button>
        </div>
      </div>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
export default {
  name: "orderAdd",
  data() {
    return {
      checkList:'',
      lines:[
        {
          index:'一、',
          txt:'包装与标识要求：',
          list:[
            {
              index:'1、',
              txt:'乙方必须提供适合产品运输和存储要求的有效包装。'
            },
            {
              index:'2、',
              txt:'以乙方的标准包装为准，除非甲方有特殊要求。'
            }
          ]
        },
        {
          index:'二、',
          txt:'包装费用和运费由乙方承担。',
          list:[]
        },
        {
          index:'三、',
          txt:'乙方按订单金额提供：',
          list:[
          ]
        },
        {
          index:'四、',
          txt:'任何情况下，乙方因本订单产生的赔偿责任不应超过本订单项下甲方支付给乙方的总货款数。',
          list:[
          ]
        },
        {
          index:'五、',
          txt:'不可抗力：在履行本订单时，如果任何一方由于不可抗力的原因，包括但不限于战争行为、火灾、风暴、水灾、台风及其他恶劣的天气状况、地震、政府或类似干预，以及其他不可预见、不可避免并不可克服的任何原因导致其不能履行本订单项下的义务，该方就由此造成的任何履行延误或履行不能对另一方不负任何责任。',
          list:[
          ]
        },
        {
          index:'六、',
          txt:'本订单项下的货物买卖不应被解释为授予甲方任何的相关知识产权。',
          list:[
          ]
        },
        {
          index:'七、',
          txt:'因本订单引起的任何争议应提交上海国际经济贸易仲裁委员会仲裁解决。',
          list:[
          ]
        },
        {
          index:'八、',
          txt:'本订单为不可撤销订单。本订单传真件有效。',
          list:[
          ]
        },
      ],
     options: [
        {
          value: "选项1",
          label: "转货订单"
        },
        {
          value: "选项2",
          label: "Buffer 订单"
        }
      ],
      value: "", 
      value1:"",

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
    sub(){},
    cancel(){},
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

.orderAdd {
  height: 100%;
  overflow-y: auto;
  padding: 0 20px 20px 20px ;
  .head {
      padding:10px 20px;

  }

  .content {
    // height: 100%;
    // background: pink;
    // padding: 0 30px 20px;
    .btns{
        padding: 10px 20px;
        // background: pink;
        background: #fff;
        margin-bottom: 10px;
      }
    .selBox {
      padding: 0 20px 10px 20px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      background: #fff;
      .form {
        width: 100%;
        // min-width: 900px;
        // max-width: 1300px;
        .el-col{
        .el-form-item {
          // width: 200px;
          width: 100%;
          margin-bottom: 0;
          .el-select {
            width: 100%;
            .el-input{
              width: 100%;
            }
            
          }
          .el-input{
            width: 100%;
          }
          .el-form-item__label {
            height: 30px;
          }
          
        }
        }
        .txt{
          width: 100%;
        }
        .date {
          .el-form-item__content {
            line-height: 40px;
          }
          width:100%;
          // width: 200px;
          .el-date-editor {
            width: 100%;
            // width: 200px;
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
    .lines{
      background: #fff;
      margin-top: 10px;
      padding: 20px;
      .el-radio-group{
        display: inline-block;
        .el-checkbox__label{
          font-size: 12px;
        }
      }
      .el-input__inner{
        border:none;
        border-radius: 0;
        box-sizing: border-box;
      }
      &>div{
        .two{
          text-indent: 24px;
          margin-left: 0px;
        }
        .one{
          text-indent: 0px;
          margin-left: 0px;
        }
        &>p{
          line-height: 32px;
          text-indent: -24px;
          margin-left: 24px;
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