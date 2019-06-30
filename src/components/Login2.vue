<template>
<div class="login">

      <el-form status-icon class="login-box">
        <div class="login-box-login">
      <h1><img src="../../static/logostr.png" alt=""></h1>
          <el-form-item  label-width="100" label="登录名">
            <el-input
              type="text"
              v-model="loginMsg"
              autocomplete="true"
              :autofocus="true"
            ></el-input>
          </el-form-item>
          <el-form-item label-width="100" label="密码">
            <el-input
              type="password"
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
        <p class="txt">
使用中有任何技术问题，请发送邮件到 <a  href="mailto:ITServiceDesk@unisoc.com">ITServiceDesk@unisoc.com</a> ，我们会尽快回复。
      </p>
      </el-form>
      <div class="logo">
      <!-- <img src="../../static/login8.jpg" alt=""> -->
    </div>
    
  </div>
</template>

<script>
//引入加密
import CryptoJS from 'crypto-js'
export default {
  name: 'login',
  data () {
    return{
      doing:false,
      value:'',
      dialogVisible:false,
      loginMsg:'',
      loginPass:'',
    }
  },
  created(){
  },
  methods: {
      login() {
        this.$router.push({
          name:'Sell'
        })
      },
      forget(){}
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
$sc:12;
.login .login-box .el-form-item{
    margin-bottom: 50px
}
.login .login-box .el-form-item__content{
    border: none;
    width: 280px;
    height: 48px;
    outline: none;
    line-height: 48px;
}
.login .login-box .el-input__inner{
    border: none;
    background: #fff;
    border-bottom:1px solid purple;
    border-radius: 0;
    color: purple
}
.login .login-box .el-button{
    border:none;
    font-family: zt3;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 14px;
    background: purple ;
    width: 280px;
    height: 48px;
}
.login .login-box .el-form-item__label{
    // opacity: 0.5;
    font-size: 14px;
    color: purple;
    letter-spacing: 0.32px;
    line-height: 16px;
}
.login{
  width:100%;
  height: 100%;
  // overflow: hidden;
  margin: 0 auto;
  .logo{
    background: url('../../static/login8.jpg') no-repeat;
    background-size: cover; 
    position: relative;
    overflow: hidden;
    margin-right: 280px;
    height: 100%;
    text-align: center;
    // background: #41589b;
    img{
      position: absolute;
      /* height: 100%; */
      width:100%;
      left:0;
      top:0;
       right:0; 
       bottom:0; 
      margin:auto;
    }
  }
  .login-box{
    float: right;
    box-sizing: border-box;
    overflow: hidden;
    width:400px;
    padding: 0 60px;
    background: #fff;
    height: 100%;
    .txt{
      // position: absolute;
      // bottom: 20px;
      color: #000;
      text-align: center;
      // width: 280px;
      
      a{
        font-weight: bold;
        font-style: italic;
        color: purple;
      }
    }
  .login-box-login{
    margin-top: 140px;
    h1{
      margin-bottom: 50px;
      font-size: 22px;
      color: #FFFFFF;
      letter-spacing: 0.64px;
    img{
      width:280px;
      // height: 240px;
      // background: red;
      // margin-bottom: 20px;
      
    }
    }
    .forget{
      font-size: 14px;
      position: absolute;
      right:0;
      top:10px;
      cursor: pointer;
      color: purple;
    }
    .forget:hover{
      color: purple
    }
  }
  .loginBtns{
  .el-button{
    border-radius: 2px;
    span{
        font-family: zt3;
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        line-height: 14px;
        font-weight: bold
    }
  }
}
  }
}
</style>