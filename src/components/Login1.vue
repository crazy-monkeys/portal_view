<template>
  <div class="login">
    <div class="top">
    </div>
    <div class="bottom"></div>
    <div class="loginBox">
      <el-form  class="form"   label-position='top' >
        <h1><img src="../../static/logostr.png" alt=""> </h1>
        <el-form-item  label="">
          <i class="el-icon-s-custom"></i> <el-input type="text" v-model="loginMsg" placeholder="登录名" :autofocus="true"></el-input>
        </el-form-item>
        <el-form-item  label="">
            <i class="el-icon-lock"></i> <el-input type="password" v-model="loginPass" placeholder="密码" autocomplete="off" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <div  class="sub">
          <el-button type='primary' size='small'  class="forget">忘记密码</el-button>
          <el-button type='primary' size='small'   @click="login">登录</el-button>
        </div>
    </el-form>
    </div>
    
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
<style lang="scss">
$sc: 12;
.login {
  overflow: hidden;
  width: 100%;
  // min-width: 720px;
  position: relative;
  overflow-x: hidden;
  height: 100%;
  .top {
    height: 50%;
    background: #920784;
    img {
      width: 100%;
    }
  }
  .bottom {
    height: 50%;
    background: #fff;
  }
  .loginBox {
    border-radius: 10px;
    border: #920784 1px solid;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 50%;
    width: 60%;
    padding: 20px;
    /* height: 100%; */
    background: #fff;
    .form {
      // background: red;
      border-radius: 10px;
      float: right;
      // height: 100%;
      width: 40%;
      /* height: 100%; */
      h1 {
        text-align: center;
        /* justify-content: center;
          margin:30px 0;
          display: flex;
          align-items: center; */
        img {
          width: 100%;
        }
        span {
          color: #920784;
          display: inline-block;
          height: 30px;
          line-height: 30px;
        }
      }
      .sub {
        display: flex;
        justify-content: center;
        text-align: center;
        .el-button {
          width: 80px;
        }
      }
      .el-form-item {
        position: relative;
        margin-bottom: 20px;
        .el-form-item__label {
          color: #920784;
        }
        .el-form-item__content {
          width: 100%;
          margin-bottom: 0;
          .el-input {
            width: calc(100% - 40px);
          }
          i {
            color: #920784;
            font-size: 24px;
            height: 40px;
            line-height: 40px;
          }
        }
      }
    }
  }
}
</style>