<template>
  <div class="deliverConfirm">
    <!-- 修改密码页面 -->
    <el-form :model="form"  :rules="rules" ref="form" label-width="100px" class="form" label-position="left">
      <el-form-item label="备注" prop="">
        <el-input v-model="form.newPwd"  type='textarea' :rows="2" resize="none"></el-input>
      </el-form-item>
      <div class="subBtn">
        <el-button @click="sub(-1)" >不同意</el-button>
        <el-button type="primary" @click="sub(1)" >同意</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {sure} from '@/api/handover/index.js'
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
    detailIds(){
      return this.$route.query.detailIds
    },
    loginName(){
      return this.$route.query.loginName
    }
  },
  methods:{
    close(){
    },
    async sure(data){
      const res = await sure(data);
      if(res){
        this.form.newPwd = ''
        this.$message.success('操作成功')
      }
    },
    sub(type){
      var data = {
        confirmMsg:this.form.newPwd,
        confirmStatus:type,
        detailIds:this.detailIds,
      }
      this.sure(data)
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
