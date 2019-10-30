<template>
  <div class="accountAdd">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增账户</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>新增账户</h1>
      
    </div>
    <div class="box clear">
      <el-form label-position="top" autoComplete="new-password" label-width="auto" :model="baseForm" :rules='rules'   ref='baseForm' class="baseForm">
      <div class="l-box">
        <div class="l-t-box">
          
            <h2>基本信息</h2>
            <el-form-item label="账户" prop='account'>
              <el-input v-model="baseForm.account" maxlength='10'></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop='name'>
              <el-input v-model="baseForm.name" maxlength='10'></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop='phone'>
              <el-input v-model="baseForm.phone" maxlength='11'></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop='email'>
              <el-input v-model="baseForm.email" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop='pwd'>
              <!-- <el-input v-model="baseForm.pwd1" autocomplete="off" type='password' ref='input1' style="display:none"  trigger-on-focus='false' ></el-input> -->
              <el-input v-model="baseForm.pwd" autocomplete="new-password"   :type='type'  ref='input1' @focus="resetType" trigger-on-focus='false' ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop='rePwd'>
              <!-- <el-input v-model="baseForm.rePwd1" autocomplete="off" type='password' style="display:none" ref='input1'  trigger-on-focus='false' ></el-input> -->
              <el-input v-model="baseForm.rePwd" autocomplete="new-password" :type='type'    ref='input2' @focus="resetType"  trigger-on-focus='false' ></el-input>
            </el-form-item>
        </div>
        <div class="l-b-box">
          <h2>角色信息</h2>
          <el-form-item label="" prop='checkedRoles'>
            <el-checkbox-group  v-model="baseForm.checkedRoles">
              <el-checkbox v-for="role in roles" :label="role.roleId" :key="role.roleId">{{role.roleName}}</el-checkbox>  
            </el-checkbox-group>
          </el-form-item>

        </div>
      </div>
      <div class="r-box">
        <div class="r-t-box">
          <h2>用户组信息</h2>
          <p><el-input prefix-icon="el-icon-search" placeholder="输入关键字进行过滤"  v-model="selStr"></el-input></p>
          <div class="groupBox">
            <el-form-item label="" prop='groups'>
              <el-tree
                @check-change='a'
                :data="groups"
                show-checkbox
                node-key="userGroupId"
                :props="defaultProps"
                :filter-node-method="filterNode"
                :default-checked-keys="defaultCheckedKeys"
                ref="tree"
                >
              </el-tree>
            </el-form-item>

          </div>
        </div>
        
      </div>
      
      <div class="sub">
        <el-button plain @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm('baseForm')">提交</el-button>
      </div>
          </el-form>

    </div>
    
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";

export default {
  name: 'accountAdd',
  data () {
    return {
      defaultCheckedKeys:[],
      type:'',
      rules: {
        account: [
          { required: true, trigger: "change", validator: formTest.account  }
        ],
        name: [
          { required: true, trigger: "change", validator: formTest.name}
        ],
        phone: [
          { required: true, trigger: "change" , validator: formTest.phoneTest}
        ],
        email: [
          { required: true, trigger: "change",  validator: formTest.emailTest }
        ],
        pwd: [
          { required: true, trigger: "change",  validator: formTest.pwd }
        ],
        rePwd: [
          { required: true, trigger: "change",  validator: (rule,value,callback)=>{
            if(!value){
                callback(new Error('确认密码不能为空'))
                
              }
            setTimeout(() => {
              
              if(value==this.baseForm.pwd){
                callback()
              }else{
                callback(new Error('2次输入的密码不一致'))
              }
            }, 500)
          }}
        ],
        checkedRoles: [
          { required: true, trigger: "change",  validator: (rule,value,callback)=>{
            setTimeout(() => {
              if(value.length==0){
                callback(new Error('请选择角色'))
              }else{
                callback()
              }
            }, 500)
          }}
        ],
        groups: [
          { required: true, trigger: "change",  validator: (rule,value,callback)=>{
            setTimeout(() => {
              if(value.length==0){
                callback(new Error('请选择用户组'))
              }else{
                callback()
              }
            }, 500)
          }}
        ],
      },
      selStr:'',
      defaultProps:{
        children: 'children',
        label: 'userGroupName'
      },
      //用户组列表
      groups:[],
      //角色列表
      roles:[],
      //选中的角色
      checkedRoles:[],
      baseForm:{
        account:'',
        name:'',
        phone:'',
        email:'',
        pwd:'',
        rePwd:'',
        pwd1:'',
        repwd1:'',
        checkedRoles:[],
        groups:[],
      }
    }
  },
  created(){
    this.getRoles()
    this.getGroup()
    
    
  },
  watch: {
    selStr(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted(){
     
  },
  methods:{
    a(){
      // //console.log(this.$refs.tree.getCheckedKeys())
      this.baseForm.groups = this.$refs.tree.getCheckedKeys()
    },
    //更新基本信息
    addBase(){ 
      var data ={
        loginName:this.baseForm.account,
        loginPwd:this.baseForm.pwd,
        realName:this.baseForm.name,
        phone:this.baseForm.phone,
        email:this.baseForm.email,
        roleIds:this.baseForm.checkedRoles.join(','),
        userGroupIds:this.baseForm.groups.join(',')
      }
      this.$http.post(''+process.env.API_ROOT+'/system/loginUser/saveUser',data
      )
      .then((res)=>{
            // //console.log('新增结果',res)
            if(res.data.code ==1){
              this.$router.push(
                {
                  name:'account'
                }
              )
            }else{
            }
        }).catch((err)=>{
          // //console.log(err);
          alert('网络异常')
        })
    },
    //更新用户组
    addGroup(){ 
      var data ={
        loginName:this.baseForm.account,
        loginPwd:this.baseForm.pwd,
        realName:this.baseForm.name,
        phone:this.baseForm.phone,
        email:this.baseForm.email,
      }
      this.$http.post(''+process.env.API_ROOT+'/system/loginUser/saveUser',data
      )
      .then((res)=>{
            // //console.log('新增结果',res)
            if(res.data.code ==1){
            }else{
            }
        }).catch((err)=>{
          // //console.log(err);
          alert('网络异常')
        })
    },
    //更新角色
    addRole(){ 
      var data ={
        loginName:this.baseForm.account,
        loginPwd:this.baseForm.pwd,
        realName:this.baseForm.name,
        phone:this.baseForm.phone,
        email:this.baseForm.email,
      }
      this.$http.post(''+process.env.API_ROOT+'/system/loginUser/saveUser',data
      )
      .then((res)=>{
            // //console.log('新增结果',res)
            if(res.data.code ==1){
            }else{
            }
        }).catch((err)=>{
          // //console.log(err);
          alert('网络异常')
        })
    },
    resetType(e){
      // //console.log(e)
      // //console.log(this.$refs)
      // //console.log(this.$refs['input1'])
      this.type='password'
      // this.$refs['input1'].type='password'
      // this.$refs['input2'].type='password'
    },
    close(){
      this.$router.push(
        {
          name:'account'
        }
      )
    },
    sub(){},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addBase()
          // this.$refs[formName].clearValidate();
        } else {
          // //console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      if (this.$refs[formName]) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        } else {
          this.$nextTick(() => {
            this.$refs[formName].resetFields();
          });
        }
      }
    },
    filterNode(value, data) {
      // //console.log(value,data)
      if (!value) return true;
      return data.userGroupName.indexOf(value) !== -1;
    },
    //获取角色列表
    getRoles(){ 
      
      this.$http.get(''+process.env.API_ROOT+'/system/permission/roleInfo?pageIndex=1&pageSize=100000'
      )
      .then((res)=>{
            // //console.log('角色列表',res)
            if(res.data.code ==1){
              this.roles = res.data.data.list
            }else{

            }
        }).catch((err)=>{
          // //console.log(err);
          alert('网络异常')
        })
    },
    //获取用户组列表
    getGroup(){ 
      
      this.$http.get(''+process.env.API_ROOT+'/system/userGroup/getAllUserGroup'
      )
      .then((res)=>{
            // //console.log('用户组列表',res)
            if(res.data.code ==1){
              this.groups = res.data.data
            }else{

            }
        }).catch((err)=>{
          // //console.log(err);
          alert('网络异常')
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;
.accountAdd{
  .n{
    display: none;
  }
  height: calc(100% - 216px);
  .head{
    background: #FAFAFA;
    h1{
        opacity: 0.87;
        font-family: 'zt2';
        font-size: 18px;
        color: #000;
        letter-spacing: 0;
        line-height: 36px;
        height: 42px;
        font-weight: bold;
        padding: 0 50px;
        // float: left;
      }
    .el-breadcrumb{
      // float: right;
      margin-left: 50px;
      line-height: 30px;
      margin-right: 20px
    }
  }
  
  .box{
    height: 100%;
    position: relative;
    padding: 0 20px 20px 20px;
    background: #FAFAFA;
    // box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
    border-radius: 2px;
    .el-form{
      height: 100%;
    .sub{
      float: left;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FAFAFA;
      .el-button{
        margin: 20px;
      }
    }
    h2{
      height: 60px;
      line-height: 60px;
    }
    
    .l-box{
      width: 55%;
      height: 100%;
      background: #FAFAFA;
      float: left;
      box-sizing: border-box;
      .l-t-box,.l-b-box{
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
        padding:0 30px;
        .el-input{
          width: 90%;
        }
      }
      .l-t-box{
        margin-bottom: 20px;
        padding-bottom: 10px;
        height: 70%;
        overflow: auto;
        .el-form{
          .el-form-item__label{
            padding: 0;
            height: 20px;
            line-height: 20px;
          }
        }
      }
      .l-b-box{
        height: 30%;
        overflow: auto;
        .el-checkbox{
          margin: 5px;
        }
      }
    }
    .r-box{
      height: 100%;
      width: 45%;
      box-sizing: border-box;
      background: #FAFAFA;
      float: left;
      .r-t-box{
        height: 100%;
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.05); 
        padding: 0  30px 20px;
        margin-left:  20px;
        .groupBox{
          border: 1px solid #ccc;
          margin-top: 30px;
          height: calc(100% - 200px);
          overflow: auto;
          padding: 20px;
          .el-tree{
            .el-tree-node__content{
              margin: 5px;
            }
          }
        }
      }
    }
    }

  }
  
 
}
</style>
