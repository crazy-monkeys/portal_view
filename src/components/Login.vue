<template>
<div class="login">
<!-- <button v-print="'#app'">打印</button> -->
      <el-form status-icon class="login-box">
        <div class="login-box-login">
          <h1>
          LOGO</h1>
          <el-form-item  label-width="100" label="">
            <el-input
              type="text"
              prefix-icon="el-icon-user"
              v-model="loginName"
              autocomplete="true"
              :autofocus="true"
            ></el-input>
          </el-form-item>
          <el-form-item label-width="100" label="">
            <el-input
              type="password"
              prefix-icon="el-icon-lock"
              v-model="loginPwd"
              autocomplete="off"
              @keyup.enter.native="sub"
            ></el-input>
            <span class="forget" @click="forget">忘记密码？</span>
          </el-form-item>
          <el-form-item label-width="100" label="">
            <el-input
              type="text"
              prefix-icon="el-icon-key"
              v-model="verifyCode"
              autocomplete="off"
              @keyup.enter.native="sub"
            ></el-input>
            <img class="yzm" :src="baseUrl+'/verifyCode?timestamp='+newtime" alt="验证码图片" @click="clickImg">
          </el-form-item>
        </div>
        <el-form-item class="loginBtns">
          <el-button class="sub"  @click="sub">登 录 </el-button>
          <span class="dd">
            <!-- <a :href="url + '/ad/index'">Click here</a>  -->
            <el-button @click="dd" type="text">Click here</el-button>
            for domain account login
          </span>
        </el-form-item>
      </el-form>
      <!-- <div class="logo">
      <img src="../../static/bg.jpg" alt="">
      </div> -->
      <!-- <div class="txt">
使用中有任何技术问题，请发送邮件到 <a  href="mailto:ITServiceDesk@unisoc.com">ITServiceDesk@unisoc.com</a> ，我们会尽快回复。
      </div> -->
      <!-- 找回密码 -->
    <el-dialog
      :show-close='false'
      :close-on-click-modal="false"
      title="找回密码申请"
      :close-on-press-escape='false'
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose">
      <p>请输入您的用户名<el-input v-model="value" :disabled="doing" size="small"></el-input></p>
        <p v-if="doing"> 正在处理,请稍候...</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small" :disabled="doing">返回登陆</el-button>
        <el-button type="primary" size="small" @click="pwd" :disabled="doing">提交申请</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      newtime:new Date().getTime(),
      baseUrl:process.env.API_ROOT,
      verifyCode:"",
      loginName: "",
      loginPwd: "",
      url:process.env.API_ROOT,
       dialogVisible : false,
       doing:false,
      value:'',
    };
  },
  created() {},

  methods: {
    clickImg(){
      this.newtime = new Date().getTime()
    },
     handleClose(){
       this.dialogVisible = false
       this.value= ''
      },
    // sub1(params){
    //     loginServer.getTestData(params).then(res =>{
    //             //处理数据
    //     }).catch(err =>{
    //             //提示错误
    //     })
    // },
    pwd(){
          if(this.value.length!=0){
          this.doing = true;
             this.$http.post(''+process.env.API_ROOT+'/user/forgetPwd/sendEmail/'+this.value).then((res)=>{
              // console.log('修改密码申请',res)
              if(res.data.code==1){
                this.$message({
                  type:'success',
                  message:'修改密码申请提交成功,请查收邮件'
                })
                this.dialogVisible = false;
                this.value = ''
              }else{
                this.$message({
                  type:'error',
                  message:res.data.msg
                })
              }
                this.doing = false;
          }).catch((err)=>{
            // console.log(err);
            alert('网络异常')
          })
          }else{
            this.$message({
                  type:'error',
                  message:'用户名不能为空'
                })
          }

      },
    dd(){
      this.$http({
              method : 'get',
              url :  process.env.API_ROOT+ '/ad/index',
              // data:data
            }) .then(res => {
                // console.log("登陆信息", res);
                if (res.data.code===1) {
                    this.$store.commit('getMenu',res.data.data.permissions);
                    this.$store.commit('getLoginInfo',res.data.data.user);
                    var ses = window.sessionStorage;
                    var authorization=res.headers['authorization'];
                    ses.setItem("data", authorization);
                    ses.setItem("vuexData", JSON.stringify(res));
                    this.$router.push("/home/tb");
                }else{
                  this.$message({
                    type:'error',
                    message:res.data.msg
                  })
                }

              })
              .catch(error => {

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    this.$message({
                      type:'error',
                      message:error.response.data.msg
                    })
                  } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    // // console.log('Error', error.message);
                  }
              });
    },
    sub() {
        var data ={
          'loginName':this.loginName,
          'loginPwd':this.loginPwd,
          'verifyCode':this.verifyCode,
          'timestamp':this.newtime
        }
        if (!this.loginName) {
          this.$message({
            type: "error",
            message: "请输入用户名"
          });
        } else {
          if (!this.loginPwd) {
            this.$message({
              type: "error",
              message: "请输入密码"
            });
          } else {
            if(!this.verifyCode){
              this.$message({
                type: "error",
                message: "请输入验证码"
              });
            }else{
              this.$http({
              method : 'post',
              url :  process.env.API_ROOT+ '/user/login',
              data:data,
              withCredentials:true
            }) .then(res => {
                // console.log("登陆信息", res);
                if (res.data.code===1) {
                    this.$store.commit('getMenu',res.data.data.permissions);
                    this.$store.commit('getLoginInfo',res.data.data.user);
                    var ses = window.sessionStorage;
                    var authorization=res.headers['authorization'];
                    ses.setItem("data", authorization);
                    ses.setItem("vuexData", JSON.stringify(res));
                    this.$router.push("/home/tb");
                }else{
                  this.$message({
                    type:'error',
                    message:res.data.msg
                  })
                  this.newtime = new Date().getTime()
                }
              })
              .catch(error => {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  // console.log(error.response.data);
                  // console.log(11111111)
                  console.log(error)
                  this.$message({
                    type:'error',
                    message:error.response.data.msg
                  })
                  this.newtime = new Date().getTime()

                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  // console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  // console.log('Error', error.message);
                }
            });
            }

          }
        }
      },
    forget(){
       this.dialogVisible = true
        // console.log('找回密码')
      },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
$sc: 12;
.login .login-box .el-form-item {
  margin-bottom: 22 / $sc + rem;
}

.login .login-box .el-form-item__content {
  border: none;
  width: 280 / $sc + rem;
  height: 48 / $sc + rem;
  outline: none;
  line-height: 48 / $sc + rem;
}
.login .login-box .el-input__inner {
  border: none;
  background: transparent;
  border-bottom: 1 / $sc + rem solid rgb(146,7,132);
  border-radius: 0;
  color: rgb(146,7,132);
}

.login .login-box .sub {
  border: none;
  font-size: 16 / $sc + rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 14 / $sc + rem;
  background: rgb(146, 7, 132);
  width: 280 / $sc + rem;
  height: 48 / $sc + rem;
}

.login .login-box .el-form-item__label {
  font-size: 14 / $sc + rem;
  color: #fff;
  line-height: 16 / $sc + rem;
  font-weight: bold;
}
.login {
  .txt{
    a{
      color: rgb(146,7,132);
      font-weight: bold;
      font-style: italic
    }
    font-size: 16/$sc+rem;
    color: #000;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom:20/$sc+rem;
  }
  .el-input__prefix {
    color: rgb(146,7,132);
    i {
      font-size: 20 / $sc + rem;
    }
  }
  background: linear-gradient(top , #b7a2dd, #7148bc);/*渐变从左上角到右下角*/
        background: -ms-linear-gradient(top , #b7a2dd,#7148bc );
        background: -webkit-linear-gradient(top , #b7a2dd, #7148bc);
        background: -moz-linear-gradient(top , #b7a2dd, #7148bc);
  background: url("../assets/img/login6.jpg") center no-repeat;
  background-size: cover;

  width: 100%;
  height: 100%;
  // overflow: hidden;
  // margin: 0 auto;
  .logo {
    position: relative;
    overflow: hidden;
    // margin-right: 280 / $sc + rem;
    height: 100%;
    text-align: center;
    background: #fff;
    img {
      position: absolute;
      height: 100%;
      // width: 500 / $sc + rem;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }

  .login-box {
    background: rgba(255,255,255,0.8);
    position: absolute;
    height: 500 / $sc + rem;
    // width: 500 / $sc + rem;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    // float: right;
    box-sizing: border-box;
    overflow: hidden;
    width: 400 / $sc + rem;
    padding: 60 / $sc + rem;
    // background: #fff;

    .login-box-login {
      h1 {
        width: 100%;
        text-align: center;
        // margin-bottom: 50 / $sc + rem;
        font-size: 22 / $sc + rem;
        color: #920784;
        // letter-spacing: 0.64 / $sc + rem;
        // line-height: 36 / $sc + rem;
        // height: 36 / $sc + rem;
        // span {
        //   position: relative;
        //   top: -10 / $sc + rem;
        // }
        img {
          width: 240 / $sc + rem;
          // height: 36 / $sc + rem;
          // background: red;
          margin-bottom: 20 / $sc + rem;
        }
      }
      .forget {
        font-size: 14 / $sc + rem;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        color: rgba(146,7,132,1);
      }
      .yzm{
        position: absolute;
        right: 0;
        top: 10 / $sc + rem;
        cursor: pointer;
        color: rgba(146,7,132,1);
      }
      .forget:hover {
        color: rgba(146,7,132,0.5);
      }
    }
    .loginBtns {
      .dd{
          padding-top: 20/$sc+rem;
          display: inline-block;
          width: 100%;
          text-align: center;
          .el-button{
            font-size: 16/$sc+rem;
            font-weight: bold;
            color: rgba(146,7,132,1)
          }
      }
      .sub {
        border-radius: 2 / $sc + rem;
        span {
          font-family: zt3;
          font-size: 16 / $sc + rem;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          line-height: 14 / $sc + rem;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
