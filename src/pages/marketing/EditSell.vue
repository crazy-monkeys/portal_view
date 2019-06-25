<template>
  <!-- 添加新增控件 -->
  <div class="addAct">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>客户营销</el-breadcrumb-item>
        <el-breadcrumb-item>短信营销</el-breadcrumb-item>
        <el-breadcrumb-item>编辑营销活动</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>
        <i class="el-icon-back" @click="back"></i>
        <span>编辑营销活动</span>
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
            <el-select v-model="ruleForm.theme" @change="selTheme" :disabled="bj">
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
        <div class="kz">
          <h2>选择快照</h2>
          <el-form-item label="人群名称" prop="photo">
            <el-select v-model="ruleForm.photo" @change="selPhoto" :disabled="bj">
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
                  :maxlength="300-ruleForm.signName.length-7"
                ></el-input>
              </p>
              <span class="shop">【{{ruleForm.signName}}】</span>
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
            maxlength="200"
            placeholder="请输入手机号码，若需要发送多个号码，则使用“,”隔开"
            @keyup.native="changeCon"
            @keydown.native="changeCon"
          ></el-input>
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
      :close-on-click-modal="false"
    >
      <el-form
        :label-position="labelPosition"
        :rules="rules1"
        ref="themeForm"
        label-width="80px"
        :model="themeForm"
      >
        <p class="danger">
          <i class="el-icon-warning" style="color: #3366FF"></i> 同一店铺下的主题名称不能重复
        </p>

        <el-form-item label="店铺" prop="shop">
          <el-select v-model="themeForm.shop" :disabled="true">
            <el-option
              v-for="item in shopList"
              :key="item.shop_info_id"
              :label="item.shop_name"
              :value="item.shop_info_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主题名称" prop="theme">
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
      ok: 0,
      childrenBtn: true,
      look: false,
      id: "",
      toggle: 0,
      //子流程
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
          return time.getTime() < new Date().getTime() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
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
      photo: "",
      // 短信字数
      //数据的个数
      total: 0,
      //列表页搜索框数据
      value3: "",
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
        marketingActivityId: "",
        signName: ""
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
        radio2: [{ required: true, message: " ", trigger: "change" }],

        photo: [{ required: true, message: "请选择快照", trigger: "change" }],
        theme: [{ required: true, message: "请选择主题", trigger: "blur" }],
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
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value) {
                // console.log('time1',new Date(value[0]).getTime(),new Date(value[1]).getTime())
                if (value.length == 0) {
                  callback(new Error("请选择roi时间段!"));
                } else {
                  if (this.ruleForm.time1) {
                    if (
                      new Date(value[0]).getTime() <
                      new Date(this.ruleForm.time1).getTime()
                    ) {
                      callback(new Error("roi开始时间要晚于定时执行时间"));
                    } else {
                      if (
                        new Date(value[0]).getTime() ==
                        new Date(value[1]).getTime()
                      ) {
                        callback(new Error("roi结束时间要晚于roi开始时间"));
                      } else {
                        callback();
                      }
                    }
                  } else {
                    if (new Date(value[0]).getTime() < new Date().getTime()) {
                      callback(new Error("roi开始时间要晚于当前时间"));
                    } else {
                      if (
                        new Date(value[0]).getTime() ==
                        new Date(value[1]).getTime()
                      ) {
                        callback(new Error("roi结束时间要晚于roi开始时间"));
                      } else {
                        callback();
                      }
                    }
                  }
                }
              } else {
                callback(new Error("请选择roi时间段!"));
              }
            }
          }
        ],
        time1: [
          { required: true, trigger: "blur", validator: formTest.time11Test }
        ],
        time2: [
          { required: true, message: "请选择排除已购时间段", trigger: "blur" }
        ],
        time: [{ message: "", trigger: "blur" }]
      },
      //新建控件显示否
      none: "true",
      //下拉菜单选择
      select: "全部名称",
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
      //快照列表
      photoList: [],
      //编辑禁用
      bj: true,
      //查看禁用
      // ck:false,
      fob: false,
      sendCount: 0
    };
  },
  computed: {
    shopId() {
      return this.$store.state.shopId.shopId;
    },
    shopName() {
      return this.$store.state.shopId.shopName;
    },
    num: {
      get: function() {
        return (
          this.ruleForm.signName.length + 7 + this.ruleForm.textarea.length
        );
      },
      set: function() {}
    }
  },
  created() {
    this.getShopList();
    this.getMore(this.$route.params.id);
    //获取主题
    // this.getTheme(this.shopId);
    //获取快照
    // this.getSignatures(this.shopId);
    console.log(this.shopId);
    // 获取签名
    this.getSnapshots(this.shopId);

    console.log(this.$refs);
  },
  watch: {
    shopId: {
      handler: function(n, o) {
        if (n != o) {
          //获取主题
          this.getTheme(this.shopId);
          //获取快照
          this.getSignatures(this.shopId);
          console.log(this.shopId);
          // 获取签名
          this.getSnapshots(this.shopId);
          this.ruleForm.theme = "";
          this.ruleForm.sign = "";
          this.ruleForm.photo = "";
          this.ruleForm.signName = "";
          this.ruleForm.textarea = "";
        }
      }
    },
    "ruleForm.textarea": {
      handler: function(n, o) {
        console.log(n.length);
        if (n != o) {
          //计算字数
          // this.num = this.ruleForm.textarea.length;
          console.log(this.num);
          if (this.num > 300) {
            this.ruleForm.textarea = this.ruleForm.textarea.substring(0, 300);
          }
          if (this.num == 0) {
            this.sendCount = 0;
          }
          if (this.num > 0 && this.num < 68) {
            this.sendCount = 1;
          }
          if (this.num > 67 && this.num < 135) {
            this.sendCount = 2;
          }
          if (this.num > 134 && this.num < 202) {
            this.sendCount = 3;
          }
          if (this.num > 201 && this.num < 269) {
            this.sendCount = 4;
          }
          if (this.num > 268) {
            this.sendCount = 5;
          }
        }
      }
    },
    ok: {
      handler: function(n, o) {
        console.log(n, o);
      }
    },
    "ruleForm.radio2": {
      handler: function(n, o) {
        if (n != o) {
          if (n == 0) {
            this.ruleForm.time1 = "";
            if (this.ruleForm.roiTime) {
              if (
                new Date().getTime() >
                new Date(this.ruleForm.roiTime[0]).getTime()
              ) {
                this.$message({
                  type: "error",
                  message: "roi开始时间早于活动开始时间"
                });
                console.log("radio2");
                this.ok = 0;
              } else {
                this.ok = 1;
              }
            }
          }
        }
      }
    },
    "ruleForm.radio3": {
      handler: function(n, o) {
        if (n != o) {
          if (n == 0) {
            this.ruleForm.time2 = [];
          }
        }
      }
    },
    "ruleForm.time1": {
      handler: function(n, o) {
        if (n != o) {
          if (this.ruleForm.roiTime) {
            if (
              new Date(this.ruleForm.time1).getTime() >
              new Date(this.ruleForm.roiTime[0]).getTime()
            ) {
              console.log("time1");
              this.ok = 0;
              console.log(this.ok);
              this.$message({
                type: "error",
                message: "roi开始时间早于活动开始时间"
              });
            } else {
              this.ok = 1;
            }

            if (
              new Date(this.ruleForm.roiTime[0]).getTime() ==
              new Date(this.ruleForm.roiTime[1]).getTime()
            ) {
              this.ok = 3;
              this.$message({
                type: "error",
                message: "roi开始时间须晚于roi结束时间"
              });
            } else {
              this.ok = 1;
            }
          }

          if (this.ruleForm.radio2 == 1) {
            if (new Date(n).getTime() < new Date().getTime()) {
              this.$message({
                type: "error",
                message: "定时执行时间要晚于当前时间"
              });
              this.ok = 2;
            }
          }
        }
      }
    },
    "ruleForm.roiTime": {
      handler: function(n, o) {
        if (n != o) {
          if (this.ruleForm.time1) {
            if (
              new Date(this.ruleForm.time1).getTime() >
              new Date(this.ruleForm.roiTime[0]).getTime()
            ) {
              this.$message({
                type: "error",
                message: "roi开始时间早于活动开始时间"
              });
              console.log("roi");
              this.ok = 0;
            } else {
              this.ok = 1;
            }

            if (this.ruleForm.roiTime) {
              if (
                new Date(this.ruleForm.roiTime[0]).getTime() ==
                new Date(this.ruleForm.roiTime[1]).getTime()
              ) {
                this.ok = 3;
                this.$message({
                  type: "error",
                  message: "roi开始时间须晚于roi结束时间"
                });
              } else {
                this.ok = 1;
              }
            }
          } else {
            if (
              new Date().getTime() >
              new Date(this.ruleForm.roiTime[0]).getTime()
            ) {
              this.$message({
                type: "error",
                message: "roi开始时间早于活动开始时间"
              });
              this.ok = 0;
            } else {
              this.ok = 1;
            }
            if (this.ruleForm.roiTime) {
              if (
                new Date(this.ruleForm.roiTime[0]).getTime() ==
                new Date(this.ruleForm.roiTime[1]).getTime()
              ) {
                this.ok = 3;
                this.$message({
                  type: "error",
                  message: "roi开始时间须晚于roi结束时间"
                });
              } else {
                this.ok = 1;
              }
            }
          }

          console.log(this.ok);
        }
      },
      deep: true
    }
  },
  methods: {
    changeCon() {
      console.log(111111);

      this.content = this.content
        .replace(/[^\r\n0-9\,]/g, "")
        .replace(/(\,\,)/g, ",");
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
            this.ruleForm.shop = this.shopName;
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
    changeSign(val) {
      this.signList.forEach(item => {
        if (item.noticeRegisterId == val) {
          this.ruleForm.signName = item.channelDesc;
        }
      });
      this.ruleForm.textarea = "";
    },
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.ok == 1) {
          this.submit();
        } else {
          console.log("error submit!!");
          if (this.ok == 0) {
            this.$message({
              type: "error",
              message: "roi开始时间早于活动开始时间"
            });
          }
          if (this.ok == 2) {
            this.$message({
              type: "error",
              message: "定时执行时间要晚于当前时间"
            });
          }
          if (this.ok == 3) {
            this.$message({
              type: "error",
              message: "roi结束时间必须晚于roi开始时间"
            });
          }
          return false;
        }
      });
    },

    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.commit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      if (this.$refs[formName]) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        } else {
          this.$nextTick(() => {
            this.$refs[formName].resetFields();
          });
        }
      }
      this.none = true;
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
    qx() {
      this.csdialogVisible = false;
      this.content = "";
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
    // 清空表单
    clear() {
      // this.ruleForm.shop='',
      (this.ruleForm.theme = ""),
        (this.ruleForm.actName = ""),
        (this.ruleForm.sign = ""),
        (this.ruleForm.photo = ""),
        (this.ruleForm.mb = ""),
        (this.ruleForm.radio2 = 0),
        (this.ruleForm.radio3 = 0),
        (this.ruleForm.radio4 = 1),
        (this.ruleForm.textarea = ""),
        (this.ruleForm.roiTime = []),
        (this.ruleForm.time1 = ""),
        (this.ruleForm.time2 = []);
    },
    //选择快照
    selPhoto() {
      console.log(this.ruleForm.photo);
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
    //新增营销活动
    submit() {
      if (
        (this.ruleForm.radio2 == 1 &&
          new Date(this.ruleForm.time1).getTime() > new Date().getTime()) ||
        this.ruleForm.radio2 == 0
      ) {
        this.$http
          .post("" + process.env.API_ROOT + "/marketing/addMarketingActivity", {
            marketingActivityId: this.id ? this.id : "",
            shopInfoId: this.shopId,
            themeId: this.theme ? this.theme : this.ruleForm.theme,
            snapshotId: this.photo ? this.photo : this.ruleForm.photo,
            noticeRegisterId: this.ruleForm.sign,
            activityName: this.ruleForm.actName,
            activityDesc: "",
            executorType: this.ruleForm.radio2,
            executorTime: this.ruleForm.radio2 == 1 ? this.ruleForm.time1 : "",
            roiBeginTime: this.ruleForm.roiTime[0],
            roiEndTime: this.ruleForm.roiTime[1],
            purchaseType: this.ruleForm.radio3,
            purchaseStartTime:
              this.ruleForm.radio3 == 1 ? this.ruleForm.time2[0] : "",
            purchaseEndTime:
              this.ruleForm.radio3 == 1 ? this.ruleForm.time2[1] : "",
            marketingContent: this.ruleForm.textarea,
            blackListType: this.ruleForm.radio4
          })
          .then(res => {
            console.log("新增营销活动", res);
            if (res.data.code == 1) {
              this.back();
              if (this.id) {
                this.$message({
                  type: "success",
                  message: "编辑成功"
                });
              } else {
                this.$message({
                  type: "success",
                  message: "新增成功"
                });
              }
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
          .catch(error => {
            console.log(error);
            alert("获取失败");
          });
      } else {
        this.$message({
          type: "error",
          message: "定时执行时间早于当前时间，请修改定时执行时间"
        });
      }
    },
    change() {
      console.log(this.ruleForm.time2);
      console.log(this.ruleForm.time1);
    },
    //roi时间选择事件
    selRuleFormTime() {
      console.log(this.ruleForm.roiTime);
    },
    //查询短信营销详情  事件
    getMore(marketingActivityId) {
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
          console.log("详情", res.data.data[0]);
          if (res.data.code == 1) {
            this.id = res.data.data[0].marketing_activity_id;
            this.ruleForm.shop = this.shopName;
            //主题
            this.ruleForm.theme = res.data.data[0].theme_id;
            this.ruleForm.themeName = res.data.data[0].theme_name;
            //活动
            this.ruleForm.actName = res.data.data[0].activity_name;
            //快照
            this.ruleForm.photo = res.data.data[0].snapshot_name;
            this.photo = res.data.data[0].snapshot_id;
            //短信
            this.ruleForm.textarea = res.data.data[0].marketing_content.replace(
              " 退订回TD",
              ""
            );
            //签名
            this.ruleForm.sign = res.data.data[0].notice_register_id;
            this.ruleForm.signName = res.data.data[0].channel_desc;
            //是否定时
            this.ruleForm.radio2 = res.data.data[0].executor_type;
            //定时的时间
            this.ruleForm.time1 = res.data.data[0].executor_type
              ? res.data.data[0].executor_time
              : "即刻执行";
            //是否排除黑名单
            this.ruleForm.radio4 = res.data.data[0].black_list_type ? 1 : 0;
            //是否排除已购
            this.ruleForm.radio3 = res.data.data[0].purchase_type ? 1 : 0;
            //已购时间
            this.ruleForm.time2[0] = res.data.data[0].purchase_start_time;
            this.ruleForm.time2[1] = res.data.data[0].purchase_end_time;

            //roi时间
            this.ruleForm.roiTime.push(res.data.data[0].roi_begin_time);
            this.ruleForm.roiTime.push(res.data.data[0].roi_end_time);
            // this.num = this.ruleForm.textarea.length;
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
    //获取快照信息列表
    getSnapshots(id) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/snapshot" +
          "?isPage=0&snapshotType=SMS&shopInfoId=" +
          id
      })
        .then(res => {
          console.log("快照列表", res);
          if (res.data.code == 1) {
            this.photoList = res.data.data.list;
            console.log(this.photoList);
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    // 点击弹出测试短信框
    cs() {
      this.csdialogVisible = true;
    },

    //创建主题按钮
    create() {
      this.dialogVisible = true;
      this.themeForm.shop = this.shopId;
      this.themeForm.theme = "";
    },
    // 点击返回按钮
    back() {
      this.ok = 0;
      this.suc = true;
      this.fileList = [];
      this.tags = [];
      this.group = [];
      this.relationId = "";
      this.resetForm("ruleForm");
      this.$router.push({
        name: "Sell"
      });
      this.clear();
      this.look = false;
      this.none = true;
      this.rep = false;
      this.reoprtTableData = [];
      // this.ck = false
      this.report.roiTime = [];
      (this.theme = ""), (this.photo = ""), (this.sign = "");
    },
    back1() {
      this.resetForm1("themeForm");
      this.dialogVisible = false;
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
              type: "fail",
              message: "新增主题失败"
            });
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
      this.back1();
      this.dialogVisible = false;
      this.csdialogVisible = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
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
  .el-textarea__inner {
    color: #000;
    font-family: "zt2";
  }
  // .textarea {
  //   .el-textarea__inner {
  //     // text-indent: 130px;
  //     height: 400px;
  //     width: 450px;
  //     top: 0;
  //     font-family: zt2;
  //     left: 0;
  //     line-height: 30px;
  //     padding: 0 10px;
  //     color: #333;
  //     box-sizing: border-box;
  //   }
  // }
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
