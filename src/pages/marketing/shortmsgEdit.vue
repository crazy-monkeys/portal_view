<template>

    <!-- 添加新增控件 -->
    <div class="addAct" >
      <div class="head clear">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
          <el-breadcrumb-item>客户营销</el-breadcrumb-item>
          <el-breadcrumb-item>定制短信</el-breadcrumb-item>
          <el-breadcrumb-item v-if="!this.ruleForm.marketingActivityId">新建营销活动</el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.ruleForm.marketingActivityId">编辑营销活动</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>
          <i class="el-icon-back" @click="back"></i>
          <span v-if="!this.ruleForm.marketingActivityId">新建营销活动</span>
          <span v-if="this.ruleForm.marketingActivityId">编辑营销活动</span>
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
              <el-input v-model="ruleForm.shop" :disabled="true" class="name">
                <!-- <el-option v-for='item in shopList' :key='item.shop_info_id'  :label="item.shop_name" :value="item.shop_info_id"></el-option> -->
              </el-input>
            </el-form-item>
            <el-form-item label="主题名称" prop="theme">
              <el-select v-model="ruleForm.theme" @change="selTheme" :disabled="bj" >
                <el-option
                  v-for="item in themeList"
                  :key="item.themeId"
                  :label="item.themeName"
                  :value="item.themeId"
                ></el-option>
              </el-select>
              <!-- <el-button class="creatTheme" @click="create">创建主题</el-button> -->
            </el-form-item>
            <el-form-item label="活动名称" prop="actName">
              <el-input v-model="ruleForm.actName" class="actName" :disabled="bj"></el-input>
            </el-form-item>
          </div>

          <div class="mb">
            <h2>短信模板</h2>
            <p class="danger">
              <i class="el-icon-warning" style="color: #3366FF"></i> 请先上传短信模版, 否则无法预览短信内容
            </p>
            <el-form-item label="上传短信模板" prop="mb" :show-message="suc">
              <p>请按照模版录入信息
                <a href="static/custom.xlsx" download='' style="color:#3366FF;margin:0 20px">下载模板</a> 
                <!-- <el-button type="text" @click="download">下载模板</el-button> -->
                <span style="color:red">#先下载模版, 根据模版规范填写模版内容</span>
              </p>
              <!-- http://10.11.107.90:8080/crm-branch/custMarketing/uploadFile -->
              <el-upload
                :multiple="false"
                class="upload-demo"
                ref="upload"
                :action="''"
                :http-request="httpReq1"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-exceed="handleOver"
                :file-list="fileList"
                :on-change="changeFile"
                :limit="1"
                name="myfiles"
                :with-credentials="true"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选泽文件</el-button>
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  type="success"
                  @click="submitUpload"
                >上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="执行时间" :prop="ruleForm.radio2 ==1 ?'time1' : 'radio2'">
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
            <el-form-item label="短信签名" prop="sign">
              <el-select v-model="ruleForm.sign">
                <el-option
                  v-for="item in signList"
                  :key="item.noticeRegisterId"
                  :label="item.channelDesc"
                  :value="item.noticeRegisterId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="插入动态信息" prop="actMsg">
              <el-checkbox-group v-model="checkboxGroup" size="small" @change="itemChange">
                <el-checkbox
                  v-for="(item,index) in group"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                  border
                  @change="checkChange"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <p class="danger">
              <i class="el-icon-warning" style="color: #3366FF"></i> 请勿随意修改动态标签内容, 否则可能会造成短信数据有误!
            </p>
            <el-form-item label="短信内容" prop="textarea" >
            
                <div style="float:left;position:relative">
                <p>
                  <el-input
                    id='text'
                    ref="text"
                    class="textarea"
                    type="textarea"
                    rows="10"
                    v-model="ruleForm.textarea"
                    :maxlength="300-ruleForm.signName.length-7" 
                    >  
                  </el-input>
                </p>
                <span class="shop">
                    【{{ruleForm.signName}}】
                  </span>
                  <span class="td">
                    退订回TD
                  </span>
                <p>预估当前发送{{sendCount}}条短信<span>{{num}}/300</span></p>
                <p><el-button @click="cs" >测试</el-button></p>
              </div>
              <div style="float:left;margin-left:20px">
                <img src="../../assets/img/phone.png" style="width:225px" alt>
                <div class="msgBox">
                  <div class="msg">
                    <span :contenteditable="false">【{{ruleForm.signName}}】</span>
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

    <!-- 添加主题控件 -->
    <el-dialog
      title="添加主题"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false"
    >
      <el-form :label-position="labelPosition" ref="themeForm" :rules='rules1' label-width="80px" :model="themeForm">
        <p class="danger">
          <i class="el-icon-warning" style="color: #3366FF"></i> 同一店铺下的主题名称不能重复
        </p>

        <el-form-item label="店铺" prop='shop' >
          <el-select v-model="themeForm.shop" :disabled="true">
            <el-option
              v-for="item in shopList"
              :key="item.shop_info_id"
              :label="item.shop_name"
              :value="item.shop_info_id"
            ></el-option>
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
    <!-- 测试短信控件 -->
    <el-dialog
      title="测试短信"
      :visible.sync="csdialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false"
    >
      <el-form :label-position="labelPosition" label-width="80px" :model="themeForm">
        <p class="danger">
          <i class="el-icon-warning" style="color: #3366FF"></i> 短信发出后，偶尔会有出现延时的情况，请稍等10分钟，如10分钟仍未收到，请联系系统管理员！
        </p>
        <el-form-item label prop="hand">
          <el-input
            type="textarea"
            rows="10"
            v-model="content"
            style="vertical-align:top"
            maxlength="300"
            placeholder="请输入手机号码，若需要发送多个号码，则使用“,”隔开"
                        @keyup.native="changeCon"
            @keydown.native="changeCon"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx">取消</el-button>
        <el-button
          type="primary"
          @click="send(shopList[0].shop_info_id,content,ruleForm.textarea,ruleForm.sign)"
        >发送</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
export default {
  name: "ShortmsgEdit",
  data() {
    return {
      uploadFile:'',
      htmlMarketingContent:'',
      suc: false,
      tags: [],
      msgContent: "",
      relationId: "",
      group: [],
      checkboxGroup: [],

      id: "",
      toggle: 0,
      //子流程
      children: [],
      // 测试短信内容
      content: "",
      photo: "",
      sign: "",
      theme: "",
      sendCost: "",
      payMoney: "",
      roi: "",
      reoprtTableData: [],
      report: {
        roiTime: [],
        actName: "",
        theme: "",
        roiTime: [],
        id: "",
        createTime: ""
      },
      rep: false,
      //短信内容
      sms: "",
      //指定只能选择当前时间之后的时间
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          return (
            time.getTime() < new Date(this.report.createTime).getTime() - 8.64e7
          );
        }
      },
      date: "",
      //搜索框需要参数
      actName: "",
      // photo:'',
      // 短信字数
      //数据的个数
      total: 0,
      //列表页搜索框数据
      value3: "",
      bj: true,
      //表单数据
      ruleForm: {
        shop: "",
        theme: "",
        actName: "",
        sign: "",
        mb: "",
        radio2: 0,
        textarea: "",
        roiTime: [],
        time1: "",
        time2: [],
        marketingActivityId: "",
        themeName:'',
        signName:''
      },
      rules1: {
        theme: [
          { required: true, message: '请选择主题', trigger: 'change' },
          { min: 1, max: 20, message: '主题名称不可超过20个字符', trigger: 'change'  }
        ],
        shop: [
          { required: true, message: '请选择店铺', trigger: 'change' }
        ]
      },
      //表单验证
      rules: {
        theme: [
          { required: true, message: '请选择主题', trigger: 'blur' },
        ],
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
          { required: true, message: "请填写短信内容", trigger: "blur" }
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
          { required: true, trigger: "blur" ,validator: (rule, value, callback) => {
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
        radio2: [{ required: true,message: " ", trigger: "change" }]
      },
      look: false,
      //新建控件显示否
      none: "true",
      //下拉菜单选择
      select: "活动名称",
      //列表页的时间选择
      value4: "",
      themeForm: {
        shop: "",
        theme: ""
      },
      //在上边提示
      labelPosition: "top",
      // 查看流程 显示否
      childdialogVisible: false,
      //添加主题狂 显示否
      dialogVisible: false,
      //测试短信框 显示否
      csdialogVisible: false,
      //短信内容 显示否
      smsdialogVisible: false,
      //营销活动列表数据
      tableData: [],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 10,
      //店铺列表
      shopList: [],
      //主题列表
      themeList: [],
      //签名列表
      signList: [],
      //禁用
      fob: false,
      fileList: [],
      file: {},
      sendCount:0,
    };
  },
  created() {
    this.getShopList();
    this.getMore(this.$route.params.id)
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    },
    shopName(){
      return this.$store.state.shopId.shopName
    },
    num:{
      get: function () {
        return this.ruleForm.signName.length+7+this.ruleForm.textarea.length
      },
      set: function () {
      }
    }
  },
  watch: {
    shopId:{
      handler:function(n,o){
        if(n!=o){
          this.getShopList();
              this.ruleForm.theme = ''
              this.ruleForm.sign = ''
              this.ruleForm.photo = ''
              this.ruleForm.signName  = ''
              this.ruleForm.textarea  = ''
        }
      }
    },
    
    "ruleForm.textarea": {
      handler: function(n, o) {
        // console.log(n)
        if(n!=o){
          //计算字数
          // this.num = this.ruleForm.textarea.length;
          if(this.num>300){
            this.ruleForm.textarea = this.ruleForm.textarea.substring(0,300)
          }
          if(this.num>300){
            this.ruleForm.textarea = this.ruleForm.textarea.substring(0,300)
          }
          if(this.num==0){
            this.sendCount = 0
          }
          if(this.num>0 && this.num<68){
            this.sendCount = 1
          }
          if(this.num>67 && this.num<135){
            this.sendCount = 2
          }
          if(this.num>134 && this.num<202){
            this.sendCount = 3
          }
          if(this.num>201 && this.num<269){
            this.sendCount = 4
          }
          if(this.num>268){
            this.sendCount = 5
          }
          //所有的标签集合便利
          this.group.forEach((item,index)=>{
            // 如果 找到 就添加
            if(this.ruleForm.textarea.indexOf('<'+item.name+'>') !=-1){
              if(this.checkboxGroup.indexOf(item.name)==-1){
                this.checkboxGroup.push(item.name)
              }
              console.log(1)
              console.log(this.checkboxGroup)
            }
            else{ //如果没找到
               if(this.checkboxGroup.indexOf(item.name)!=-1){
                this.checkboxGroup.splice(this.checkboxGroup.indexOf(item.name),1)
              }
            }
          })
        }
      }
    },
    'ruleForm.radio2':{
      handler:function(n,o){
        if(n!=o){
          if(n==0){
            this.ruleForm.time1 = ''
            if(this.ruleForm.roiTime){
              if(new Date().getTime() > new Date(this.ruleForm.roiTime[0]).getTime()){
                this.$message({
                  type:'error',
                  message:'roi开始时间早于活动开始时间'
                })
                console.log('radio2')
              }else{
              }
            }
              
          }
        }
      }
    },
    'ruleForm.radio3':{
      handler:function(n,o){
        if(n!=o){
          if(n==0){
            this.ruleForm.time2 = []
          }
        }
      }
    },
  },
  methods: {
    changeCon(){
      console.log(111111)

      this.content = this.content.replace(/[^\r\n0-9\,]/g,'').replace(/(\,\,)/g,',');
    },
    httpReq1(val) {
      this.fileList = [val.file];
      var _file = val.file;
      var formData = new FormData();
      formData.append("myfiles", _file);
      this.$http
        .post("" + process.env.API_ROOT + "/custMarketing/uploadFile", formData)
        .then(res => {
          console.log("_RequestUploads_", res);
          if (res.data.code == 1) {
            this.group = res.data.data.dynamicLabel;
            this.relationId = res.data.data.uploadFileInfo.relationId;
            this.suc = false;
            this.uploadFile = res.data.data
            this.$message({
              type: "success",
              message: "上传成功"
            });
          } else {
            this.group = [];
            this.relationId = "";
            this.fileList = [];
            this.suc = true;

            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.fileList = [];
          this.suc = true;
          this.relationId = "";
          this.group = [];
          alert("系统异常");
        });
    },
    submitForm(formName) {
      if (!this.suc) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.submit();
          } else {
            console.log("error submit!!");
         
            return false;
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "你还没有上传模板"
        });
      }
    },
    submitForm1(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.commit()
          } else {            console.log("error submit!!");
            return false;
          }
        });
    },
    resetForm(formName) {
      if(this.$refs[formName]){
      if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
      }else{
        this.$nextTick(()=>{
          this.$refs[formName].resetFields();
        })
      }
      }
      this.none = true
    },
    resetForm1(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      } else {
        this.$nextTick(() => {
          this.$refs[formName].resetFields();
        });
      }
    },
    del(val) {
      console.log("没删除之前", this.$refs.text.innerHTML);
      if (val.keyCode == 8) {
        // console.log(val);
        // console.log("删除后", this.$refs.text.innerHTML);
      }
    },
    // div input事件


    insertAtCursor(myField, myValue) {
        //  console.log(myField)
      //IE 浏览器
      if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
      // FireFox、Chrome等
      }else {
        
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        this.ruleForm.textarea =this.ruleForm.textarea.substring(0, startPos) + myValue + this.ruleForm.textarea.substring(endPos, this.ruleForm.textarea.length);
        // myField.focus();
        setTimeout(() => {
          myField.selectionStart = startPos + myValue.length;
          myField.selectionEnd = startPos + myValue.length;
        },0)
        

      }

    },

    //多选框change事件
    checkChange(onoff, e) {
      console.log(onoff);
      if (onoff) {
        var text = document.getElementById('text')
        text.focus()
        this.insertAtCursor(text,'<'+e.target.defaultValue +'>');
        
      } else {
        console.log(e.target.defaultValue)
        this.ruleForm.textarea = this.ruleForm.textarea.replace('<'+e.target.defaultValue+'>','')
      }
    },
    itemChange(val) {
      this.tags = val;
      console.log(this.tags);
    },
    changeFile(file, fileList) {
      // console.log(file)
      this.fileList = fileList;
      this.file = file;
      // console.log(this.file)
    },
    download() {
      var data = [["手机号"], ["姓名"], ["地址"],["身份证"]];
      var blob = new Blob([data], {
        type: "application/vnd.ms-excel;charset=UTF-8;"
      });
      let aTag = document.createElement("a");
      // let blob = new Blob(['手机号'],['姓名'],['地址'],{type:'text/plain'});　　// 这个content是下载的文件内容，自己修改
      aTag.download = "短信模板.xlsx"; // 下载的文件名
      aTag.href = URL.createObjectURL(blob);
      aTag.click();
      URL.revokeObjectURL(blob);
    },
    uploadOk(response, file, fileList) {
      console.log(response);
      // if (response.code == 1) {
      //   this.group = response.data.dynamicLabel;
      //   this.relationId = response.data.uploadFileInfo.relationId;
      //   this.suc = false;
      // } else {
      //   this.$message({
      //     type: "error",
      //     message: response.msg
      //   });
      //   this.suc = false;
      //   console.log(this.fileList);
      //   this.fileList = [];
      //   console.log(this.fileList);
      // }
    },
    submitUpload() {
      console.log(this.fileList);
      if (this.fileList.length == 0) {
        this.$message({
          type: "error",
          message: "请选择模板"
        });
      } else {
      this.$refs.upload.submit();
      }
    },
    handleOver(file, fileList) {
      console.log(file, fileList);
      this.$message({
        type: "error",
        message: "只能选择一个模板"
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList;
      this.group = [];
      this.relationId = "";
      this.$refs.text.innerHTML=''
      this.ruleForm.textarea = ''
      this.checkboxGroup=[];
    },
    handlePreview(file) {
      // console.log(file);
    },
    // 忽略并发送
    ignore(activityId) {
      this.$http
        .post("" + process.env.API_ROOT + "/marketing/sendAgain", {
          activityId: activityId
        })
        .then(res => {
          console.log("忽略并发送", res);
          if (res.data.code == 1) {
            this.childdialogVisible = false;

            this.$message({
              type: "success",
              message: "发送成功"
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    // 重试
    retry(activityId) {
      this.toggle = 1;
      this.fob = true;
      this.$http
        .post("" + process.env.API_ROOT + "/marketing/reTry", {
          activityId: activityId
        })
        .then(res => {
          console.log("重试", res);
          if (res.data.code == 1) {
            this.csdialogVisible = false;
            this.content = "";

            this.$message({
              type: "success",
              message: "重新获取成功"
            });
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //发送测试短信
    send(shopInfoId, mobiles, content, noticeRegisterId) {
      this.$http
        .post("" + process.env.API_ROOT + "/notice/sms/send/test", {
          shopInfoId: shopInfoId,
          mobiles: mobiles,
          content: content,
          noticeRegisterId: noticeRegisterId
        })
        .then(res => {
          console.log("测试短信", res);
          if (res.data.code == 1) {
            this.csdialogVisible = false;
            this.content = "";
            this.$message({
              type: "success",
              message: "发送成功"
            });
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    q(index){
     return this.pageSize * (this.currentPage-1) + index +1
    },
    //查看按钮
    check(index, rows) {
      this.look = true;
      this.none = false;
      this.getMore(rows[index].marketingActivityId);
    },
    //编辑按钮
    edit(index, rows) {
      this.checkboxGroup = [];
      this.none = false;
      this.bj = true;
      this.getMore(rows[index].marketingActivityId);
      this.suc = false;
    },
    rowClick(row, event, column) {
      console.log(row);
      this.id = row.marketingActivityId;
    },
    // 清空表单
    clear() {
      // this.ruleForm.shop='',
      (this.ruleForm.theme = ""),
        (this.ruleForm.actName = ""),
        (this.ruleForm.sign = ""),
        (this.ruleForm.mb = ""),
        (this.ruleForm.radio2 = 0),
        (this.ruleForm.textarea = ""),
        (this.ruleForm.roiTime = []),
        (this.ruleForm.time1 = ""),
        (this.ruleForm.time2 = []);
    },
    // 启用按钮
    start(activityId,time) {
      if(new Date(time).getTime() > new Date().getTime()){
      this.$confirm("请确认该活动是否要进行短信发送", "启用", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$http({
            method: "get",
            url:
              "" +
              process.env.API_ROOT +
              "/marketing/activity/recovery" +
              "?activityId=" +
              activityId
          })
            .then(res => {
              console.log("启用", res);
              if (res.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "启用成功"
                });
                this.getList(
                  this.currentPage,
                  this.pageSize,
                  this.shopId
                );
              }
            })
            .catch(error => {
              console.log(error);
              alert("登入失败");
            });
        })
        .catch(action => {
          this.$message({
            type: "fail",
            message: "已取消操作"
          });
        });
         }else{
        this.$message({
          type:'error',
          message:'该活动执行时间已超出当前时间！'
        })
      }
    },
    //禁用按钮
    stop(activityId) {
      this.$confirm("请确认活动是否取消短信发送", "禁用", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$http({
            method: "get",
            url:
              "" +
              process.env.API_ROOT +
              "/marketing/activity/cancel" +
              "?activityId=" +
              activityId
          })
            .then(res => {
              console.log("禁用", res);
              if (res.data.code === 1) {
                this.getList(
                  this.currentPage,
                  this.pageSize,
                  this.shopId
                );
                this.$message({
                  type: "success",
                  message: "禁用成功"
                });
              }
            })
            .catch(error => {
              console.log(error);
              alert("登入失败");
            });
        })
        .catch(action => {
          this.$message({
            type: "fail",
            message: "已取消操作"
          });
        });
    },

    // 选择主题
    selTheme() {
      console.log(this.ruleForm.theme);
    },
    //选择店铺
    selShop() {
      console.log(this.ruleForm.shop);
    },
    //获取主题列表
    getTheme(shopid) {
      this.$http({
        method: "get",
        url:
          "" + process.env.API_ROOT + "/marketing/themes?shopInfoId=" + shopid
      })
        .then(res => {
          console.log("主题列表", res);
          if (res.data.code == 1) {
            this.themeList = res.data.data.list;
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    secTheme() {
      console.log(this.themeList);
      this.themeList.forEach(item => {
        if (item.themeName == this.ruleForm.theme) {
          this.theme = item.themeId;
        }
      });
    },

    secSign() {
      this.signList.forEach(item => {
        if (item.channelDesc == this.ruleForm.sign) {
          this.sign = item.noticeRegisterId;
        }
      });
    },
    //新增营销活动
    submit() {


      if((this.ruleForm.radio2 ==1 &&  new Date(this.ruleForm.time1).getTime() > new Date().getTime()) || this.ruleForm.radio2 ==0){

      this.$http
        .post(
          "" +
            process.env.API_ROOT +
            "/custMarketing/addCustomMarketingActivity",
          {
            marketingActivityId: this.ruleForm.marketingActivityId,
            shopInfoId: this.shopId,
            themeId:  this.ruleForm.theme,
            noticeRegisterId: this.ruleForm.sign,
            activityName: this.ruleForm.actName,
            activityDesc: "",
            executorType: this.ruleForm.radio2,
            executorTime: this.ruleForm.radio2 == 1 ? this.ruleForm.time1 : "",
            roiBeginTime: this.ruleForm.roiTime[0],
            roiEndTime: this.ruleForm.roiTime[1],
            marketingContent: this.ruleForm.textarea,
            relationId: this.relationId,
            htmlMarketingContent :this.htmlMarketingContent ? this.htmlMarketingContent :'',
            uploadFile : JSON.stringify(this.uploadFile)
          }
        )
        .then(res => {
          console.log("定制短信的新增营销活动", res);
          if (res.data.code == 1) {
            if(this.ruleForm.marketingActivityId){
              this.$message({
                type:'success',
                message:'编辑成功'
              })
            }else{
              this.$message({
                type:'success',
                message:'新增成功'
              })
            }
            this.back();
            this.getList(
              this.currentPage,
              this.pageSize,
              this.shopId
            );
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
      }else{
        // this.$message({
        //   type:'error',
        //   message:'定时执行时间早于当前时间，请修改定时执行时间'
        // })
      }

    },
    //搜索事件
    search() {
      this.getList(
        this.currentPage,
        this.pageSize,
        this.shopId
      );
    },
    //时间选择 事件
    selTime() {
      this.value4 = this.value4 ? this.value4 : [];
      console.log(this.value4);
    },
    change() {
      console.log(this.ruleForm.time2);
      console.log(this.ruleForm.time1);
    },
    //roi时间选择事件
    selRuleFormTime() {
      console.log(this.ruleForm.roiTime);
    },
    //短信营销结果报告获取
    getReport(activityId) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/marketing/notice/report" +
          "?activityId=" +
          activityId
      })
        .then(res => {
          console.log("报告", res);
          if (res.data.code == 1) {
            this.reoprtTableData.push(res.data.data);
            this.sendCost = res.data.data.sendCost;
            this.payMoney = res.data.data.payMoney;
            this.roi = res.data.data.roi;
            var b1 = document.documentElement.getElementsByTagName("b")[0];
            var b2 = document.documentElement.getElementsByTagName("b")[1];
            if (this.payMoney != 0) {
              b1.style.width = "500px";
              b2.style.width = 500 / this.sendCost / this.payMoney + "px";
            } else {
              b1.style.width = "0px";
              if (this.sendCost != 0) {
                b2.style.width = "20px";
              } else {
                b2.style.width = "0px";
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //获取子流程
    getChildren(activityId) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/marketing/activity/childrenBusiness" +
          "?activityId=" +
          activityId
      })
        .then(res => {
          console.log("子流程", res);
          if (res.data.code == 1) {
            this.children = res.data.data;
            this.fob = false;
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //ROI时间修改&重新计算
    getTime() {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/marketing/notice/report/recalculation" +
          "?activityId=" +
          this.report.id +
          "&startTimeStr=" +
          this.report.roiTime[0] +
          "&endTimeStr=" +
          this.report.roiTime[1]
      })
        .then(res => {
          console.log("roi时间", res);
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
          if (res.data.code == 20001) {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
          if (res.data.code == 20106) {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
          if (res.data.code == 20109) {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
          if (res.data.code == 20108) {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
          if (res.data.code == 20107) {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
          if (res.data.code == -1) {
            this.$message({
              type: "fail",
              message: res.data.msg
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //查询短信营销详情  事件
    getMore(marketingActivityId) {
      console.log(this.$refs.text);
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/marketing/selectMarketingDetail" +
          "?marketingActivityId=" +
          marketingActivityId
      })
        .then(res => {
          console.log("详情", res);
          if (res.data.code == 1) {
            //id
            this.ruleForm.marketingActivityId = res.data.data[0].marketing_activity_id;
            //店铺
            this.ruleForm.shop = this.shopName;
            //主题
            this.ruleForm.theme = res.data.data[0].theme_id;
            this.ruleForm.themeName = res.data.data[0].theme_name;

            //活动
            this.ruleForm.actName = res.data.data[0].activity_name;
            //短信
            this.ruleForm.textarea = res.data.data[0].marketing_content;
            //签名
            this.ruleForm.sign = res.data.data[0].notice_register_id;
            this.ruleForm.signName = res.data.data[0].channel_desc;
            //是否定时
            this.ruleForm.radio2 = res.data.data[0].executor_type;
            //定时的时间
            this.ruleForm.time1 = res.data.data[0].executor_time;
            //roi时间
            this.ruleForm.roiTime.push(res.data.data[0].roi_begin_time);
            this.ruleForm.roiTime.push(res.data.data[0].roi_end_time);
            this.num = this.ruleForm.textarea.length;
            // this.secTheme();
            // this.secSign();
            this.uploadFile = JSON.parse(res.data.data[0].upload_file)
            
            console.log(this.uploadFile)
            this.group = this.uploadFile.dynamicLabel;
            this.relationId = this.uploadFile.uploadFileInfo.relationId;
            this.fileList = [{name:this.uploadFile.uploadFileInfo.uploadFileName}]
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },

    //获取短信签名列表
    getSignatures(shopInfoId) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/marketing/sms/signatures?" +
          "shopInfoId=" +
          shopInfoId
      })
        .then(res => {
          console.log("签名列表", res);
          this.signList = res.data.data;
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },

    //获取用户店铺列表
    getShopList() {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/getCurentUserShopList"
      })
        .then(res => {
          console.log("店铺列表", res);
          if (res.data.code == 1) {
            this.shopList = res.data.data;
            this.ruleForm.shop = res.data.data[0].shop_name;
            this.getList(
              this.currentPage,
              this.pageSize,
              this.shopId
            );
            //获取主题
            this.getTheme(this.shopId);
            // this.ruleForm.theme=''
            //获取快照
            this.getSignatures(this.shopId);
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //获取营销活动列表

    getList(currentPage, pageSize, shopid) {
      var data = {
        pageIndex: currentPage,
        pageSize: pageSize,
        startTime: this.value4 ? this.value4[0] : "",
        endTime: this.value4 ? this.value4[1] : "",
        activityName: this.actName,
        shopName: "",
        shopInfoId: shopid
      };

      this.$http
        .get(
          "" +
            process.env.API_ROOT +
            "/marketing/custom/activities?" +
            this.toQueryString(data)
        )
        .then(res => {
          console.log("营销活动列表", res);
          if (res.data.code == 1) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    qx() {
      this.csdialogVisible = false;
      this.content = "";
    },
    // 点击弹出测试短信框
    cs() {
      this.csdialogVisible = true;
    },
    handleSelect(item) {
      console.log(item);
    },
    //提示1
    renderHeader1(h, { column }) {
      // h即为cerateElement的简写，具体可看vue官方文档
      return h("span", {}, [h("span", column.label), h("eg1")]);
    },
    // 提示2
    renderHeader2(h, { column }) {
      // h即为cerateElement的简写，具体可看vue官方文档
      return h("span", {}, [h("span", column.label), h("eg2")]);
    },


    //创建主题按钮
    create() {
      this.dialogVisible = true;
      this.themeForm.shop=this.shopId;
      this.themeForm.theme = ''
    },
    // 点击返回按钮
    back() {
      this.clear();
      this.$router.push({
        name:'shortmsg',
      })
    },
    back1() {

      this.resetForm1("themeForm");
      this.dialogVisible=false
    },
    //点击新增营销活动
    add() {
      this.none = false;
      this.fileList = [];
      this.checkboxGroup = [];
      this.ruleForm.marketingActivityId = ''
    },
    // 创建主题和测试短信关闭
    close() {
      this.dialogVisible = false;
      this.csdialogVisible = false;
      this.smsdialogVisible = false;
      this.childdialogVisible = false;
    },
    // 添加主题 的提交
    commit() {
      this.$http
        .post("" + process.env.API_ROOT + "/marketing/themes", {
          shopInfoId: this.themeForm.shop,
          themeName: this.themeForm.theme
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: "新增主题成功"
            });
            this.getTheme(this.shopId);
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
        this.back1()
      this.dialogVisible = false;
      this.csdialogVisible = false;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList(
        this.currentPage,
        this.pageSize,
        this.shopId
      );
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList(
        this.currentPage,
        this.pageSize,
        this.shopId
      );
    },
    // 选择全部，活动或者快照名称
    a(command) {
      this.select = command.name;
      console.log(this.select);
    },
    //搜索的输入框输入事件
    c() {
      // if(this.select=='全部名称'){
      //   this.actName = this.value3;
      // }
      if (this.select == "活动名称") {
        this.actName = this.value3;
      }
    },
    // 更多的选项
    b(command) {
      if (command.name == "禁用") {
        this.stop(command.id);
      }
      if (command.name == "启用") {
        this.start(command.id,command.time);
      }
      if (command.name == "详细报告") {
        this.getReport(command.id);
        this.none = false;
        this.rep = true;
        this.report.theme = command.theme;
        this.report.actName = command.actName;
        this.report.roiTime[0] = command.roiBeginTime;
        this.report.roiTime[1] = command.roiEndTime;
        this.report.id = command.id;
        this.report.createTime = command.createTime;
        this.date = command.createTime;
        console.log(this.report.createTime);
        console.log(new Date(this.report.createTime).getTime());
        // console.log(Date.now())
      }
      if (command.name == "短信内容") {
        this.smsdialogVisible = true;
        this.sms = command.sms;
        console.log(command.sms);
      }
      if (command.name == "查看流程") {
        this.getChildren(command.id);
        this.childdialogVisible = true;
      }
    },

    //把对象转成query值
    cleanArray(actual) {
      var newArray = [];
      for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
          newArray.push(actual[i]);
        }
      }
      return newArray;
    },
    toQueryString(obj) {
      if (!obj) return "";
      return this.cleanArray(
        Object.keys(obj).map(key => {
          if (obj[key] === undefined) return "";
          return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
        })
      ).join("&");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
  .shop {
    position: absolute;
    top: -4px;
    left: 10px;
  }
  .td {
    position: absolute;
    bottom: 80px;
    right: 10px;
  }
  #text {
    text-indent: 130px;
    height:400px;
    width:450px;
    top:0;
    font-family: zt2;
    left:0;
    line-height: 30px;
    padding:0 10px;
    color: #333;
    box-sizing:border-box;
  }
     
 
  .el-tag {
    text-indent: 0;
  }
  .el-textarea__inner {
    width: 450px;
    height: 400px;
    background: transparent;
    text-indent:130px;
    line-height: 26px
  }
  .el-dialog {
    .el-textarea__inner {
      width: 100%;
      height: 100%;
      background: transparent;
      text-indent: 0;
    }
    .line {
      height: 40px;
      line-height: 40px;
      span {
        float: right;
      }
      .fail {
        color: red;
      }
      .suc {
        color: green;
      }
      .beg {
        color: #3366ff;
      }
      .act {
        color: #ccc;
      }
    }
  }
  .danger {
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }
  .sms {
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    line-height: 22px;
  }

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
      margin-right: 20px;
      margin-left: 50px;
    }
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
       .msgBox{
        height:350px;
        background:#fff;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
        position:relative;
        width:225px;
        margin-top: -15px;
        overflow-y:auto;
        .msg{
      background:#ccc;
      width:180px;
      margin: 0  10px 10px 10px;
      font-size: 10px;
      color: #666666;
      line-height:20px;
      min-height: 20px;
      position:absolute;
      overflow-y: auto;
      top:20px;
      left:10px;
      border-radius:  5px  5px  5px 0;
      padding:5px 5px 5px 5px;
      word-break:break-all;
    }
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
  
  
</style>
