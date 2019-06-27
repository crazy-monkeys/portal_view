<template>
<div class="login">
<!-- <button v-print="'#app'">打印</button> -->
      <el-form status-icon class="login-box">
        <div class="login-box-login">
          <h1><img src="../../static/logostr.png" alt=""> </h1>
          <el-form-item  label-width="100" label="">
            <el-input
              type="text"
              prefix-icon="el-icon-user"
              v-model="loginMsg"
              autocomplete="true"
              :autofocus="true"
            ></el-input>
          </el-form-item>
          <el-form-item label-width="100" label="">
            <el-input
              type="password"
              prefix-icon="el-icon-lock"
              v-model="loginPass"
              autocomplete="off"
              @keyup.enter.native="login"
            ></el-input>
            <span class="forget" @click="forget">忘记密码？</span>
          </el-form-item>
        </div>
        <el-form-item class="loginBtns">
          <el-button  @click="login">登 录 </el-button>
        </el-form-item>
      </el-form>
      <!-- <div class="logo">
      <img src="../../static/bg.jpg" alt="">
      </div> -->
  </div>
</template>

<script>
//引入加密
import CryptoJS from "crypto-js";

export default {
  name: "login",
  data() {
    return {
      doing: false,
      value: "",
      dialogVisible: false,
      loginMsg: "",
      loginPass: ""
    };
  },
  created() {},
  methods: {
    login() {
      this.$router.push({
        name: "Sell"
      });
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
  border-bottom: 1 / $sc + rem solid #fff;
  border-radius: 0;
  color: #fff;
}

.login .login-box .el-button {
  border: none;
  font-size: 16 / $sc + rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 14 / $sc + rem;
  background: rgba(172, 7, 142, 0.5);
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
  .el-input__prefix {
    color: #fff;
    i {
      font-size: 20 / $sc + rem;
    }
  }
  background: url("../../static/bg.jpg") center no-repeat;
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
    position: absolute;
    height: 500/$sc+rem;
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
        color: #fff;
      }
      .forget:hover {
        color: #fff;
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
