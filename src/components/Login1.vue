<template>
  <div class="login clear">
    <div class="loginBg">
      <img src="../../static/logoimg.jpg" alt="">
      <p class="msg">紫光展锐有限公司 (“紫光展锐”）致力于智能手机、功能型手机及其他消费电子产品的手机芯片平台开发，产品支持2G、3G及4G无线通讯标准。基于高集成度、高效能的芯片，搭配客户化的软件及参考方案，紫光展锐可提供完整的交钥匙平台方案，帮助客户实现更快的设计周期，并有效降低开发成本。</p>
       <p class="txt">
使用中有任何技术问题，请发送邮件到 <a  href="mailto:ITServiceDesk@unisoc.com">ITServiceDesk@unisoc.com</a> ，我们会尽快回复。
      </p>
    </div>
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
          <el-button type='primary' size='small'  plain class="forget">忘记密码</el-button>
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
  border-radius: 10/$sc+rem;
  padding: 20/$sc+rem;
  border: #920784 1/$sc+rem solid;
// background: url("../../static/login4.jpg") center no-repeat;
//   background-size: cover;  
  width: 1000/$sc+rem;
  // min-width: 720/$sc+rem;
  overflow-x: hidden;
  height: 400/$sc+rem;
  // background:red;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin:auto;
  .loginBg{
    display: flex;
    justify-content: center;
    height: 100%;
    margin-right:240/$sc+rem;
    flex-direction: column;
    overflow: hidden;
      width: 700/$sc+rem;
    img{
      width:100%;
      
    }
    .txt{
      text-align: center;
      padding: 10/$sc+rem;
    }
    .msg{
      padding: 10/$sc+rem;
    }
    a{
      color: #920784;
      font-weight: bold;
      font-style: italic;
    }
  }
  .loginBox {
    display: flex;
    align-items: center;
    position: absolute;
    right:20/$sc+rem;
    top: 0;
    height: 100%;
    background: red;
    border-radius: 10/$sc+rem;
    // border: #920784 1/$sc+rem solid;
      width: 240/$sc+rem;
    // padding: 20/$sc+rem;
    background: #fff;
    .form {
    // border: #920784 1/$sc+rem solid;
      padding: 20/$sc+rem;
      // background: red;
      border-radius: 10/$sc+rem;
      // float: right;
      // height: 100%;
      width: 100%;
      /* height: 100%; */
      h1 {
        text-align: center;
        /* justify-content: center;
          margin:30/$sc+rem 0;
          display: flex;
          align-items: center; */
        img {
          width: 100%;
        }
        span {
          color: #920784;
          display: inline-block;
          height: 30/$sc+rem;
          line-height: 30/$sc+rem;
        }
      }
      .sub {
        display: flex;
        justify-content: center;
        text-align: center;
        .el-button {
          width: 80/$sc+rem;
        }
      }
      .el-form-item {
        position: relative;
        margin-bottom: 20/$sc+rem;
        .el-form-item__label {
          color: #920784;
        }
        .el-form-item__content {
          width: 100%;
          margin-bottom: 0;
          .el-input {
            width: calc(100% - 40/$sc+rem);
          }
          i {
            color: #920784;
            font-size: 24/$sc+rem;
            height: 40/$sc+rem;
            line-height: 40/$sc+rem;
          }
        }
      }
    }
  }
}
</style>