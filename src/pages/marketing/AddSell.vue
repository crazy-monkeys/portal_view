<template>
  <!-- 添加新增控件 -->
  <div class="addAct">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>客户营销</el-breadcrumb-item>
        <el-breadcrumb-item>短信营销</el-breadcrumb-item>
        <el-breadcrumb-item>新建营销活动</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>
        <i class="el-icon-back" @click="back"></i>
        <span >新建营销活动</span>
      </h1>
    </div>
    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <div class="baseMsg">
          <h2>基本信息</h2>
          <el-form-item label="店铺名称" prop="shop">
            <el-input v-model="ruleForm.shop" :disabled="true" class="name"></el-input>
          </el-form-item>
          <el-form-item label="主题名称" prop="theme">
            <el-select v-model="ruleForm.theme"  :disabled="bj ">
              <el-option
                v-for="item in themeList"
                :key="item.themeId"
                :label="item.themeName"
                :value="item.themeId"
              ></el-option>
            </el-select>
            <el-button class="creatTheme" @click="create">创建主题</el-button>
          </el-form-item>
          <el-form-item label="活动名称" prop="actName">
            <el-input v-model="ruleForm.actName" class="actName" :disabled="bj"></el-input>
          </el-form-item>
        </div>
        <div class="kz">
          <h2>选择快照</h2>
          <el-form-item label="人群名称" prop="photo">
            <el-select v-model="ruleForm.photo"  :disabled="bj || kz">
              <el-option
                v-for="item in photoList"
                :key="item.snapshotId"
                :label="item.snapshotName"
                :value="item.snapshotId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="mb">
          <h2>短信模板</h2>
          <el-form-item label="执行时间" :prop="ruleForm.radio2 == 1 ?'time1' : 'radio2'">
            <el-radio-group v-model="ruleForm.radio2">
              <el-radio :label="0">即刻执行</el-radio>
              <el-radio :label="1">定时执行</el-radio>
            </el-radio-group>
            <el-date-picker
              @change="change"
              prefix-icon="el-icon-date"
              v-model="ruleForm.time1"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-if="ruleForm.radio2 != 0"
              :picker-options="pickerOptions0"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="ROI统计时间段" prop="roiTime">
            <el-date-picker
              :picker-options="pickerOptions0"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="selRuleFormTime"
              v-model="ruleForm.roiTime"
              prefix-icon="el-icon-date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="排除已购人群" :prop="ruleForm.radio3==1 ?'time2' :'time'">
            <el-radio-group v-model="ruleForm.radio3">
              <el-radio :label="0">不排除</el-radio>
              <el-radio :label="1">排除, 设置排除已购时间</el-radio>
            </el-radio-group>
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="change"
              v-model="ruleForm.time2"
              prefix-icon="el-icon-date"
              type="datetimerange"
              range-separator="至"
              v-if="ruleForm.radio3 != 0"
              placeholder="选择日期时间"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="排除黑名单" prop="hmd">
            <el-radio-group v-model="ruleForm.radio4">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="短信签名" prop="sign">
            <el-select v-model="ruleForm.sign" @change="changeSign">
              <el-option
                v-for="item in signList"
                :key="item.noticeRegisterId"
                :label="item.channelDesc"
                :value="item.noticeRegisterId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="短信内容" prop="textarea">
            <div style="float:left">
              <p>
                <!-- <label style="margin-right:-200px;line-height: 56px;height:12px;display: block;">【CRM官方测试店】退订回TD</label> -->
                <el-input
                  class="textarea"
                  type="textarea"
                  rows="10"
                  v-model="ruleForm.textarea"
                  :maxlength="300-sign.length-7"
                ></el-input>
              </p>
              <span class="shop">【{{sign}}】</span>
              <span class="td">退订回TD</span>
              <p>
                预估当前发送{{sendCount}}条短信
                <span>{{num}}/300</span>
              </p>
              <p>
                <el-button @click="cs">测试</el-button>
              </p>
            </div>
            <div style="float:left;margin-left:20px">
              <img src="../../assets/img/phone.png" style="width:225px;position:relative;" alt>
              <div class="msgBox">
                <div class="msg">
                  <span :contenteditable="false">【{{sign}}】</span>
                  {{ruleForm.textarea}}
                  <span :contenteditable="false">退订回TD</span>
                </div>
              </div>
            </div>
          </el-form-item>
        </div>
        <el-form-item class="sub">
          <el-button @click="back">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
        </el-form-item>
      </el-form>
    </div>

  <!-- 测试短信控件 -->
    <el-dialog
      title="测试短信"
      :visible.sync="csdialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" label-width="80px" :model="themeForm">
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  短信发出后，偶尔会有出现延时的情况，请稍等10分钟，如10分钟仍未收到，请联系系统管理员！</p>
        <el-form-item label="" prop="hand">
          <el-input
            type="textarea"
            rows="10"
            v-model="content"
            style="vertical-align:top"
            maxlength="200" 
            placeholder='请输入手机号码，若需要发送多个号码，则使用“,”隔开'
            @keyup.native ='changeCon'
            @keydown.native ='changeCon'
            >  
          </el-input>
        </el-form-item>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx">取消</el-button>
        <el-button type="primary" @click="send(shopId,content,ruleForm.textarea,ruleForm.sign)">发送</el-button>
      </span>
    </el-dialog>
  <!-- 添加主题 -->
    <el-dialog
      title="添加主题"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" :rules='rules1' ref='themeForm' label-width="80px" :model="themeForm">
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  同一店铺下的主题名称不能重复</p>

        <el-form-item label="店铺" prop='shop'>
           <el-select v-model="themeForm.shop" :disabled='true'>
             
            <el-option v-for='item in shopList' :key='item.shop_info_id'  :label="item.shop_name" :value="item.shop_info_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主题名称" prop='theme'>
          <el-input v-model="themeForm.theme"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="back1">取消</el-button>
        <el-button type="primary" @click="submitForm1('themeForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
export default {
  name: "AddSell",
  data() {
    return {
      kz:false,
      id: "",
      // 测试短信内容
      content: "",
      sign: "",
      theme: "",
      //指定只能选择当前时间之后的时间
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      //表单数据
      ruleForm: {
        shop: "",
        theme: "",
        actName: "",
        sign: "",
        photo: "",
        mb: "",
        radio2: 0,
        radio3: 0,
        radio4: 1,
        textarea: "",
        roiTime: [],
        time1: "",
        time2: [],
        marketingActivityId: ""
      },
      rules1: {
        theme: [
          { required: true, message: "请选择主题", trigger: "change" },
          {
            min: 1,
            max: 20,
            message: "主题名称不可超过20个字符",
            trigger: "change"
          }
        ],
        shop: [{ required: true, message: "请选择店铺", trigger: "change" }]
      },
      //表单验证
      rules: {
        photo: [{ required: true, message: "请选择快照", trigger: "change" }],
        theme: [{ required: true, message: "请选择主题", trigger: "change" }],
        actName: [
          {
            type: "string",
            required: true,
            message: "请填写活动名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "活动名称不可超过20个字符",
            trigger: "blur"
          }
        ],
        sign: [
          { required: true, message: "请选择短信签名", trigger: "change" }
        ],
        mb: [{ message: "请至少选择一个模板", trigger: "blur" }],
        textarea: [
          { required: true, message: "请填写短信内容", trigger: "change" }
        ],
        roiTime: [
          { required: true,  trigger: "blur",validator:(rule, value, callback) => {
            if(value){
              // console.log('time1',new Date(value[0]).getTime(),new Date(value[1]).getTime())
              if (value.length==0 ) {
                callback(new Error('请选择roi时间段!'))
              }else{

                if(this.ruleForm.time1){
                  if(new Date(value[0]).getTime() < new Date(this.ruleForm.time1).getTime() ){
                  callback(new Error('roi开始时间要晚于定时执行时间'))
                  }else{
                    if(new Date(value[0]).getTime() == new Date(value[1]).getTime()){
                      callback(new Error('roi结束时间要晚于roi开始时间'))
                    }else{
                      callback()
                    }
                  }
                }else{
                  if(new Date(value[0]).getTime() < new Date().getTime() ){
                  callback(new Error('roi开始时间要晚于当前时间'))
                  }else{
                    if(new Date(value[0]).getTime() == new Date(value[1]).getTime()){
                      callback(new Error('roi结束时间要晚于roi开始时间'))
                    }else{
                      callback()
                    }
                  }
                }
              }}else{
                callback(new Error('请选择roi时间段!'))
              }
            }
          }
        ],
        time1: [
          { required: true, trigger: "change" ,validator: (rule, value, callback) => {
            if(value){
              // console.log('time1',new Date(value[0]).getTime(),new Date(value[1]).getTime())
              if (value.length==0 ) {
                callback(new Error('请选择执行时间段!'))
              }else{
                if(new Date(value).getTime() < new Date().getTime() ){
                  callback(new Error('执行开始时间要晚于当前时间'))
                }else{
                  if(this.ruleForm.roiTime.length!=0){
                    if(new Date(value).getTime() < new Date().getTime(this.ruleForm.roiTime[0])){
                      callback(new Error('执行开始时间要早于roi开始时间'))
                    }else{
                      callback()
                    }
                  }else{
                      callback()
                  }
                }
              }
            }else{
              callback(new Error('请选择执行时间段!'))
            }
          }
          }
        ],
        time2: [
          { required: true, message: "请选择排除已购时间段", trigger: "blur" }
        ],
        time: [{ message: "", trigger: "change" }],
        radio2: [{ required: true,message: " ", trigger: "change" }]
      },
      themeForm: {
        shop: "",
        theme: ""
      },
      //在上边提示
      labelPosition: "top",
      //添加主题狂 显示否
      dialogVisible: false,
      //测试短信框 显示否
      csdialogVisible: false,
      //店铺列表
      shopList: [],
      //主题列表
      themeList: [],
      //签名列表
      signList: [],
      //快照列表
      photoList: [],
      //编辑禁用
      bj: false,
      sendCount: 0
    };
  },
  computed: {
  },
  created() {

  },
  watch: {
    
  },
  methods: {
    changeCon(){

    },
    changeSign(val){
     
    },
    // 表单验证
    submitForm(formName) {
      
    },
    submitForm1(formName) {
      
    },
    resetForm(formName) {
      
    },
    resetForm1(formName) {
      
    },
    qx() {
     
    },
    //发送测试短信
    send(shopInfoId, mobiles, content, noticeRegisterId) {
      
    },
    // 清空表单
    clear() {
     
    },
    //获取主题列表
    getTheme(shopid) {
      
    },
    //新增营销活动
    submit() {
      
    },
    change() {
      
    },
    //roi时间选择事件
    selRuleFormTime() {
    },
    //获取短信签名列表
    getSignatures(shopInfoId) {
      
    },
    getSnapshots(id) {
      
    },
    
    //获取用户店铺列表
    getShopList() {
    
    },

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
      
      window.history.back()
      
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
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.addAct{
      .head{
    
    h1{
        opacity: 0.87;
        font-size: 18px;
        color: #000;
        letter-spacing: 0;
        line-height: 42px;
        height: 42px;
        font-weight: bold;
        padding: 0 50px;
        span{
          border-left: 1px solid #ccc;
          padding: 0 20px
        }
        i{
          font-weight: bold;
          margin-right: 20px;
          cursor: pointer;
        }
      }
      
    .el-breadcrumb{
      line-height: 30px;
      margin-left: 50px;
      margin-right: 20px
    }
  }
.el-textarea__inner {
  color: #000;
}
.textarea {
  .el-textarea__inner {
    text-indent: 130px;
    height: 400px;
    width: 450px;
    top: 0;
    left: 0;
    line-height: 30px;
    padding: 0 10px;
    color: #333;
    box-sizing: border-box;
  }
}
.shop {
  position: absolute;
  top: -4px;
  left: 10px;
}
.td {
  position: absolute;
  bottom: 80px;
  left: 360px;
}
.msgBox {
  height: 350px;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  width: 225px;
  margin-top: -15px;
  overflow-y: auto;
  .msg {
    background: #ccc;
    width: 180px;
    margin: 0 10px 10px 10px;
    font-size: 10px;
    color: #666666;
    line-height: 20px;
    min-height: 20px;
    position: absolute;
    overflow-y: auto;
    top: 20px;
    left: 10px;
    border-radius: 5px 5px 5px 0;
    padding: 5px 5px 5px 5px;
    word-break: break-all;
  }
}

.el-textarea__inner {
  width: 450px;
  height: 400px;
  padding: 8px;
  background: transparent;
  text-indent: 130px;
}

.form {

  h2 {
    font-size: 16px;
    color: #333333;
    letter-spacing: 0.5px;
    line-height: 16px;
    font-weight: bold;
    padding: 20px 0;
  }
  .baseMsg {
    margin: 0 20px;
    background: #fff;
    padding: 0 30px 5px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
    .el-select {
      width: 50%;
    }
    .name {
      width: 50%;
    }
    .actName {
      width: 50%;
    }
    .creatTheme {
      border: 1px solid #3366ff;
      border-radius: 2px;
      color: #3366ff;
    }
  }
  .kz {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
    margin: 10px 20px;
    background: #fff;
    padding: 0 30px 2px;
    .el-select {
      width: 50%;
    }
  }
  .mb {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
    margin: 10px 20px;
    background: #fff;
    padding: 0 30px 2px;
    .el-select {
      width: 50%;
    }
  }
  .sub {
    .el-form-item__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
}
</style>