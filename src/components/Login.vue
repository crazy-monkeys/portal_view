<template>
<div class="login">
<!-- <button v-print="'#app'">打印</button> -->
      <el-form status-icon class="login-box">
        <div class="login-box-login">
          <h1><img src="../assets/img/logostr.png" alt=""> </h1>
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
        </div>
        <el-form-item class="loginBtns">
          <el-button  @click="sub">登 录 </el-button>
        </el-form-item>
      </el-form>
      <!-- <div class="logo">
      <img src="../../static/bg.jpg" alt="">
      </div> -->
      <div class="txt">
使用中有任何技术问题，请发送邮件到 <a  href="mailto:ITServiceDesk@unisoc.com">ITServiceDesk@unisoc.com</a> ，我们会尽快回复。
      </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      loginName: "",
      loginPwd: "",
    };
  },
  created() {},
  methods: {
    sub() {
        var data ={
          'loginName':this.loginName,
          'password':this.loginPwd
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
            this.$http({
              method : 'post',
              url : 'https://result.eolinker.com/zClHbPQ1b2ab5ed3ffb38c435e1c4f71e0b2b62da68e2f7?uri=/user/login',
              data:data
            }) .then(res => {
                console.log("登陆信息", res);
                if (res.data.code===1) {
                    this.$store.commit('getMenu',res.data.data);
                    // this.$store.commit('getLoginInfo',res.data.data.basic_info);
                    // this.getShopList()
                    // console.log(this.shopId)
                    var ses = window.sessionStorage;
                    var d = JSON.stringify(res.data);
                    ses.setItem("data", d);
                    this.$router.push("/home/tb");
                }
                // if (res.data.code===10001) {
                //    this.$message({
                //      type:'error',
                //      message :res.data.msg
                //    })
                // }
                // if (res.data.code===10002) {
                //    this.$message({
                //      type:'error',
                //      message :res.data.msg
                //    })
                // }
                // if (res.data.code===10003) {
                //    this.$message({
                //      type:'error',
                //      message :res.data.msg
                //    })
                // }
                // if (res.data.code===10004) {
                //    this.$message({
                //      type:'error',
                //      message :res.data.msg
                //    })
                // }
                // if (res.data.code===10005) {
                //    this.$message({
                //      type:'error',
                //      message :res.data.msg
                //    })
                // }
              })
              .catch(error => {
                console.log(error);
                alert("登入失败");
              });
          }
        }
      },   
    forget() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
$sc: 12;
.login .login-box .el-form-item {
  margin-bottom: 50 / $sc + rem;
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

.login .login-box .el-button {
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
      .forget:hover {
        color: rgba(146,7,132,0.5);
      }
    }
    .loginBtns {
      .el-button {
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
