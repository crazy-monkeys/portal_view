<template>
  <div class="pwd">
    <!-- 修改密码页面 -->
    <el-form :model="form"  :rules="rules" ref="form" label-width="100px" class="form" label-position="left">
      <el-form-item label="新密码：" prop="">
        <el-input v-model="form.newPwd" class="" type='password' :show-password='true'></el-input>
      </el-form-item>
      <el-form-item label="确认密码："  prop="">
        <el-input v-model="form.rePwd" type='password' class="" :show-password='true'></el-input>
      </el-form-item>
      <div class="subBtn">
        <el-button @click="close" >取消</el-button>
        <el-button type="primary" @click="sub" >确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Pwd",
  data() {
    return {
      rules:{},
      form:{
        newPwd:'',
        rePwd:''
      }
    }
  },
  created(){
    console.log(this.sid)
    console.log(this.userId)
  },
  computed:{
    sid(){
      return this.$route.query.sid
    },
    userId(){
      return this.$route.query.userId*1
    }
  },
  methods:{
    close(){
      this.$router.push('/')
    },
    sub(){
      var data = {
        userId:this.userId,
        newPwd:this.form.newPwd,
        sid:this.sid
      }
      if(this.form.newPwd.length==0){
        this.$message({
          type:'error',
          message:'新密码不能为空'
        })
      }else{ 
        if(this.form.rePwd.length==0){
          this.$message({
            type:'error',
            message:'请确认新密码'
          })
          
        }else{
          if(this.form.newPwd!=this.form.rePwd){
            this.$message({
              type:'error',
              message:'请确认两次输入的密码是否一致'
            })
          }else{
            this.$http.post("" + process.env.API_ROOT + "/login/resetPwd",data)
            .then(res => {
              console.log("修改密码结果", res);
              if (res.data.code == 1) {
                  this.$message({
                    type:'success',
                    message:'修改密码成功'
                  })
                  this.form.newPwd = '';
                  this.form.rePwd = '';
                  this.$router.push('/')
              } else {
                  this.$message({
                    type:'error',
                    message:res.data.msg
                  })
              }
            })
            .catch(error => {
              console.log(error);
              this.fileList = [];
              alert("系统异常");
            });
          }
        }
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.pwd {
  width: 100%;
  height: 100%;
  .form{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 500px;
    // height: 70%;
    height: 200px;
    margin:  auto;
    // background: red;
    border: 1px solid #ccc;
    padding: 20px;
    .subBtn{
      display: flex;
      justify-content: center;
      align-items: center;
      
    }
  }
  
}
</style>
