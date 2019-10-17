<template>
  <div class="deliverConfirm">
    <!-- 修改密码页面 -->
    <el-form :model="form"  :rules="rules" ref="form" label-width="100px" class="form" label-position="left">
      <el-form-item label="备注" prop="">
        <el-input v-model="form.newPwd"  type='textarea' :rows="2" resize="none"></el-input>
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
  name: "deliverConfirm",
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
  },
  computed:{
    sid(){
      return this.$route.query.sid
    },
    loginName(){
      return this.$route.query.loginName
    }
  },
  methods:{
    close(){
      this.$router.push('/')
    },
    sub(){
      var data = {
        confirmMsg:this.form.newPwd,
      }
      this.$http.post("" + process.env.API_ROOT + "/handover/deliver/data/confirm")
      .then(res => {
        // console.log("修改密码结果", res);
        if (res.data.code == 1) {
            this.form.newPwd = '';
        } else {
          this.$message({
            type:'error',
            message:res.data.msg
          })
        }
      })
      .catch(error => {
        console.log(error)
        alert("系统异常");
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.deliverConfirm {
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
    height: 120px;
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
