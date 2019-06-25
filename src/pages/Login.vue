<template>
<div class="login">

      <el-form status-icon class="login-box">
        <div class="login-box-login">
      <h1><img src="../assets/img/logo.png" alt=""><span>欢迎使用 SHOPCAT</span> </h1>
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
          <el-button  @click="login">登 录 →</el-button>
        </el-form-item>
      </el-form>
      <div class="logo">
      <img src="../assets/img/loginBg.png" alt="">
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
    background: #262A39;
    border-bottom:1px solid rgba(255,255,255,0.5);
    border-radius: 0;
    color: #fff
}

.login .login-box .el-button{
    border:none;
    font-family: zt3;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 14px;
    background: #3366FF ;
    width: 280px;
    height: 48px;
}

.login .login-box .el-form-item__label{
    opacity: 0.5;
    font-family: zt2;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0.32px;
    line-height: 16px;
}
.login{
  width:100%;
  height: 100%;
  // overflow: hidden;
  margin: 0 auto;
  .logo{
    overflow: hidden;
    height: 100%;
    text-align: center;
    img{
      height: 100%;
    }
  }

  .login-box{
    float: right;
    box-sizing: border-box;
    overflow: hidden;
    width:400px;
    padding: 0 60px;
    background: #262A39;
    height: 100%;
  .login-box-login{
    margin-top: 160px;
    h1{
      margin-bottom: 50px;
      font-family: zt2;
      font-size: 22px;
      color: #FFFFFF;
      letter-spacing: 0.64px;
      line-height: 36px;
      height: 36px;
      span{
        position: relative;
        top: -10px
      }
    img{
      width:36px;
      height: 36px;
      // background: red;
      margin-right: 20px;
    }

    }
    .forget{
      font-size: 14px;
      position: absolute;
      right:0;
      top:10px;
      cursor: pointer;
      color: rgba(255,255,255,0.5);
    }
    .forget:hover{
      color: #FFFFFF
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
