<template>
  <div class="login">
    <div class="top">
        <!-- <h1><img src="../../static/logostr.png" alt=""> </h1> -->
    </div>
    <div class="bottom"></div>
    <el-form  class="form"   label-position='right' label-width='100px'>
        <h1><img src="../../static/logostr.png" alt=""> </h1>
        <el-form-item  label="">
          <i class="el-icon-s-custom"></i> <el-input type="text" v-model="loginMsg" placeholder="登录名" autocomplete="true" :autofocus="true"></el-input>
        </el-form-item>
        <el-form-item  label="">
            <i class="el-icon-lock"></i> <el-input type="password" v-model="loginPass" placeholder="密码" autocomplete="off" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <div  class="sub">
          <el-button type='primary' size='small'  class="forget">忘记密码</el-button>
          <el-button type='primary' size='large'   @click="login">登录</el-button>
        </div>
    </el-form>
  </div>
</template>

<script>
  //引入加密
  import CryptoJS from 'crypto-js'

  export default {
    name: 'login',
    data() {
      return {
        doing: false,
        value: '',
        dialogVisible: false,
        loginMsg: '',
        loginPass: '',
      }
    },
    created() {
    },
    methods: {
      login() {
        this.$router.push({
          name: 'Sell'
        })
      },
      forget() { }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  $sc:12;
  .login {
    position: relative;
    height: 100%;
    .top{
      height: 50%;
      background:#800080;
      img{
        width: 300px;
      }
    }
    .bottom{
      height: 50%;
      background:#fff;
    }
    .form{
      border-radius: 10px;
      border: #800080 1px solid;
      position: fixed;
      top: 0;
      left: 0;
      right:0;
      bottom:0;
      margin: auto;
      height: 310px;
      width: 500px;
      padding:20px;
      float: right;
      /* height: 100%; */
      background:#fff;
      h1{
        /* justify-content: center;
        margin:30px 0;
        display: flex;
        align-items: center; */
        margin-bottom:30px;
        img{
          width:  200px;
          margin-right:20px;
        }
        span{
          color: #800080;
          display: inline-block;
          height: 30px;
          line-height: 30px;
        }
      }
      .loginBtn{
        width: 80px;
        height: 80px;
        position: absolute;
        right: 0;
        top:50%;
        margin-top: -40px;
        margin-right: -40px;
        i{
          font-size:24px;
        }
      }
      .sub{
        display: flex;
        justify-content: center;        
      }
      .el-form-item{
        position: relative;
        text-align: center;
        .el-form-item__label{
          color: #800080;
        }
        .el-form-item__content{
          width: 300px;
          margin: 0 auto;
          i{
            position: absolute;
            left:-50px;
            color:#800080;
            font-size:24px;
            display: inline-block;
            height: 40px;
            line-height:40px;
          }
        }
      }
    }
    .logo{
      overflow: hidden;
      height: 100%;
      img{
        height: 300px;
        width:300px;
      }
    }
  }
</style>