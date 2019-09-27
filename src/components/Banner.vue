<template>
  <div class="banner">
    <div class="zd" @click="zd" v-if="!statu">
      <i class="el-icon-s-fold"></i>
    </div>
    <div class="zk" v-if="statu" @click="zk">
      <i class="el-icon-s-unfold"></i>
    </div>
    <el-dropdown class="drop" trigger="click" @command="a">
      <span class="el-dropdown-link">
        <p>{{loginName}}</p>
        <p>{{userType}}</p>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="1" v-if="userType=='代理商' || userType=='子代理商'">基本信息</el-dropdown-item>
        <el-dropdown-item :command="5" v-if="userType=='代理商'">修改基本信息</el-dropdown-item>
        <!-- <el-dropdown-item :command="4">子账号管理</el-dropdown-item> -->
        <el-dropdown-item v-if="userType!='内部客户'" :command="2" >修改密码</el-dropdown-item>
        <el-dropdown-item :command="3">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="ts" @click="ts">
      <el-tooltip class="item" effect="light" content="公告" placement="top-start">
        <i class="el-icon-chat-round"></i>
      </el-tooltip>
    </div>
    <div class="help" @click="help">
      <el-tooltip class="item" effect="light" content="文档" placement="top-start">
        <i class="el-icon-document"></i>
      </el-tooltip>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible1"
      width="400px"
      :close-on-click-modal="false"
      :show-close='false'
      >
      <el-form :model="form"  :rules="rules" ref="form" label-width="100px" class="form" label-position="left" size="small">
        <!-- <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>   密码需包含大小写字母、数字以及特殊字符且长度大于8</p> -->
        <el-form-item label="旧密码：" prop="oldPwd">
          <el-input v-model="form.oldPwd" class="" type='password' :show-password='true' @paste.native.capture.prevent="handlePaste"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPwd">
          <el-input v-model="form.newPwd" class="" type='password' :show-password='true' @paste.native.capture.prevent="handlePaste"></el-input>
        </el-form-item>
        <el-form-item label="确认密码："  prop="rePwd">
          <el-input v-model="form.rePwd" type='password' class="" :show-password='true' @paste.native.capture.prevent="handlePaste"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="close" >取消</el-button>
          <el-button type="primary" @click="submitForm('form')" >确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Bus from "../module/bus.js";
export default {
  name: "Banner",
  data() {
    return {
      dialogVisible2:false,
      tableData: [
        {},
        {},
        {},
        {},
      ],
      userId: "",
      shopId: "",
      form: {
        oldPwd: "",
        newPwd: "",
        rePwd: ""
      },
      rules: {
        count: [{ required: false, trigger: "blur" }],
        email: [{ required: false, trigger: "blur" }],
        phone: [{ required: false, trigger: "blur" }],
        // 密码正则
        // ^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$
        oldPwd: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              // var reg = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$/;
              if (!value) {
                callback(new Error("旧密码不能为空"));
              } else {
                // if (!reg.test(value)) {
                //   callback(
                //     new Error("密码必须包含大小写字母、数字以及特殊字符")
                //   );
                // } else {
                  callback();
                // }
              }
            }
          }
        ],
        newPwd: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              // var reg = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$/;
              if (!value) {
                callback(new Error("新密码不能为空"));
              } else {
                // if (!reg.test(value)) {
                //   callback(
                //     new Error("密码必须包含大小写字母、数字以及特殊字符")
                //   );
                // } else {
                  callback();
                // }
              }
            }
          }
        ],
        rePwd: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              var reg = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$/;
              if (!value) {
                callback(new Error("确认密码不能为空"));
              } else {
                // if(!reg.test(value)){
                //   callback(new Error('请输入正确的密码格式'))
                // }else{
                if (value != this.form.newPwd) {
                  callback(new Error("请重新输入与修改密码保持一致"));
                } else {
                  callback();
                }
                // }
              }
            }
          }
        ]
      },
      value: "",
      value4: "",
      value5: "",
      value6: "",
      options4: [],
      options5: [],
      options6: [],
      dialogVisible: false,
      dialogVisible1: false,
      isCollapse: true,
      statu: false,
      toggle: false,
      shopList: [
        {
          shop_name: ""
        }
      ]
    };
  },
  computed: {
    loginName() {
      return this.$store.state.loginUser.loginInfo.loginName;
      // return 'admin';
    },
    userType() {
      if(this.$store.state.loginUser.loginInfo.userType=='agent'){
        return '代理商'
      }else if(
        this.$store.state.loginUser.loginInfo.userType=='subAgent'
      ){
        return '子代理商'
      }else{
        return '内部客户'
      }
    }
  },
  created() {},
  methods: {
    addChild(){
      this.dialogVisible2 = true
    },
    a(command) {
      // console.log(command);
      if (command == 3) {
        this.quit();
      }
      if (command == 4) {
        this.dialogVisible1 = true
      }
      if (command == 1) {
        this.$router.push('/home/agent/add');
      }
      if (command == 2) {
        this.dialogVisible1 = true
      }
      if (command == 5) {
        this.$router.push('/home/agent/updateUserInfo');
      }
    },

    handlePaste() {},
    submitForm(formName) {
      this.$formTest.submitForm(this.$refs[formName],this.sub)
    },
    resetForm(formName) {
      this.$formTest.resetForm(this.$refs[formName],this.sub)
    },
    close() {
      this.dialogVisible1 = false;
      this.form = {
        oldPwd:'',
        newPwd:'',
        rePwd:'',
      }
      this.resetForm('form')
      
    },
    sub() {
      this.$http({
        method: "post",
        url: process.env.API_ROOT + "/user/modifyPwd?loginName=" + this.loginName+'&newPwd='+this.form.newPwd +'&oldPwd='+this.form.oldPwd,
        headers: {
          authorization: sessionStorage.getItem("data")
        }
      })
        .then(res => {
          // console.log("修改密码结果", res);
          if(res.data.code==1){
            this.$message.success('密码修改成功，请重新登陆')
            sessionStorage.removeItem("data");
            this.$router.push("/login");
            this.resetForm('form')
          }else{
            this.$message.error(res.data.msg)
          }
        })
        .catch(error => {
          // console.log(error);
          alert("系统异常");
        });
    },
    handleClose() {
      this.dialogVisible = false;
      this.dialogVisible1 = false;
    },
    chooseShop(val) {},
    changeSuc() {
      this.dialogVisible = false;
    },
    changePwd() {
      this.dialogVisible1 = true;
    },
    modPwd() {},
    zd() {
      this.statu = !this.statu;
      Bus.$emit("data", this.statu);
    },
    zk() {
      this.statu = !this.statu;
      Bus.$emit("data", this.statu);
    },
    fnToggle(e) {
      this.toggle = !this.toggle;
      // // console.log(e);
    },
    quit() {
      this.$http({
        method: "post",
        url: process.env.API_ROOT + "/logout",
        headers: {
          authorization: sessionStorage.getItem("data")
        }
      })
        .then(res => {
          // console.log("退出登陆", res);
          sessionStorage.removeItem("data");
          this.$router.push("/login");
        })
        .catch(error => {
          // console.log(error);
          alert("系统异常");
        });
    },
    tb() {
      this.$router.push("/home/tb");
    },
    ts() {
      this.$router.push({
        name:'announcelist'
      });
    },
    help() {
      this.$router.push("/home/tb");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;

.banner {
  position: absolute;
  top: 0;
  width: 100%;
  // z-index: 111111;
  min-width: 500px;
  color: #fff;
  height: 56px;
  background: #b161bf;
  .el-dialog {
    .form {
      .el-form-item {
        .el-form-item__label {
          height: 30px;
        }
      }
      .address {
        width: 100%;
        .el-select {
          width: 100px;
        }
        .el-input {
          width: 200px;
          margin-right: 20px;
        }
      }
      .sub {
        margin: 10px 0 0 0;
        width: 100%;
        text-align: center;
      }
    }
  }
  .danger {
    margin-bottom: 20px;
  }

  .zd {
    height: 100%;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url("../assets/img/zd.png") center no-repeat; */
    cursor: pointer;
    float: left;

    i {
      font-size: 22px;
    }
  }

  .zk {
    height: 100%;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url("../assets/img/zk.png") center no-repeat; */
    cursor: pointer;
    float: left;

    i {
      font-size: 22px;
    }
  }

  .tbbtn {
    height: 100%;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url("../assets/img/tb.png") center no-repeat; */
    cursor: pointer;
    border-right: 1px solid #e8e8e8;
    float: left;
  }

  .help {
    height: 100%;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url("../assets/img/help.png") center no-repeat; */
    cursor: pointer;
    float: right;

    i {
      font-size: 22px;
    }
  }

  .ts {
    height: 100%;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url("../assets/img/ts.png") center no-repeat; */
    cursor: pointer;
    float: right;
    border-right: 1px solid #e8e8e8;
    position: relative;

    i {
      font-size: 22px;
    }

    div {
      height: 18px;
      width: 18px;
      background: #b161bf;
      border-radius: 9px;
      position: absolute;
      top: 8px;
      left: 34px;
      text-align: center;
      line-height: 18px;
      color: #fff;
    }
  }
  .drop {
    text-align: center;
    height: 100%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    float: right;
    p {
      width: 100px;
    }
  }
  .shopName {
    position: relative;
    width: 120px;
    height: 40px;
    font-size: 14px;
    color: #fff;
    letter-spacing: 0;
    float: right;
    padding: 12px;
    cursor: pointer;

    .more {
      position: absolute;
      width: 200px;
      top: 56px;
      left: 0;
      background: #ffffff;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
      z-index: 300;

      .quit {
        border-top: 1px solid #e8e8e8;
      }

      div {
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        opacity: 0.87;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;

        span {
          width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          float: left;
        }

        i {
          margin-left: 10px;
          font-style: normal;
          border: 1px solid #3366ff;
          display: inline-block;
          font-size: 12px;
          color: #3366ff;
          letter-spacing: 0;
          line-height: 18px;
          padding: 0 5px;
        }
      }
    }

    .top {
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 20px;
    }

    .down {
      text-align: center;
      font-size: 12px;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .proName {
    border-left: 1px solid #fff;
    height: 100%;
    width: 56px;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0;
    float: right;
    background: #b161bf;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>