<template>
  <div class="user">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible3' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible3' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible3'>
          <el-form-item label="客户名称">
            <el-input size='small' v-model="form.customerName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-input v-model="form.roleName" size='small'  placeholder="请选择">
            </el-input>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-select v-model="form.userType" size='small' clearable filterable placeholder="请选择">
              <el-option v-for="item in userTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开通日期" class="date">
            <Daterange @data='watchTime' :resetDataReg='resetData' />
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain @click="search">搜索</el-button>
            <el-button  size='small' type='primary' plain @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" @row-click="rowClick">
            <el-table-column type="index"  label="编号" :index='q' width="60">
            </el-table-column>
            <el-table-column prop="customerName" show-overflow-tooltip label="客户名称" width="150">
            </el-table-column>
            <!-- <el-table-column prop="customerName" show-overflow-tooltip label="客户简称" width="150">
            </el-table-column> -->
            <el-table-column prop="loginName" label="登录名" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="" label="用户类型" show-overflow-tooltip width="150">
              <template slot-scope="scope">
              <span>
                {{tableData[scope.$index].userType=='agent' ?'代理商' :tableData[scope.$index].userType=='subAgent' ?'子代理商':'内部客户'}}
              </span>
            </template>  
            </el-table-column>
            <el-table-column prop="role.roleName" show-overflow-tooltip label="角色" width="150">
             
            </el-table-column>
            <el-table-column prop="role.roleCode" show-overflow-tooltip v-if="false" label="角色" width="150">
            
            </el-table-column>
            
            <el-table-column prop="mobile" label="手机号" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="email" label="邮箱" width="150">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="regTime" label="注册时间" width="180">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="状态" width="150">
              <template slot-scope="scope">
              <span >
                {{tableData[scope.$index].userStatus==0 ?'冻结' :tableData[scope.$index].userStatus==1 ?'正常':'失效'}}
              </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click="authorize">授权</el-button>
                <el-button v-if="tableData[scope.$index].userStatus==1 " size="small" type="text" :disabled="userId==scope.row.id" @click="getFreeze(scope.row.loginName)">冻结</el-button>
                <el-button v-if="tableData[scope.$index].userStatus==0 " size="small" type="text" :disabled="userId==scope.row.id" @click="getAct(scope.row.loginName)">激活</el-button>
              </template>
            </el-table-column>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 20,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
      </div>
    </div>
    <el-dialog title="授权" :visible.sync="dialogVisible" width="400px">
      <el-form :model="roleForm" :rules='rules' ref='roleForm'>
        <el-form-item label="角色设置" prop="role">
          <el-select v-model="roleForm.role" size="small" filterable placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.roleCode"
              :label="item.roleName"
              :value="item.roleCode">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size='small'>取 消</el-button>
        <el-button type="primary" @click="submitForm('roleForm')" size='small'>授 权</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Daterange from "../com/date";
import { getUserList ,saveUserRole,freeze} from '@/api/system/user.js'
import {   getRolesAll } from '@/api/system/role.js'
export default {
  name: "user",
  components:{
    Daterange
  },
  data() {
    return {
      resetData:false,
     time:{},
      rowData:{},
      roleForm:{
        role:''
      },
      form:{
        customerName:'',
        roleName:'',
        startTime:'',
        endTime:'',
        userType:'',
        role:''
      },
      options2: [
        {
          value: 1,
          label: "系统管理员"
        },
        {
          value: 2,
          label: "首代"
        }
      ],
      //验证规则
      rules:{
        role: [
          { required: true, trigger: 'blur',message:'角色不能为空'}
        ]
      },
      //客户类型选项
      userTypes: [
        {
          value: 'agent',
          label: "代理商"
        },
        {
          value: 'subAgent',
          label: "子代理商"
        },
        {
          value: 'internal',
          label: "内部客户"
        }
      ],
      //角色列表
      roles: [],
      //授权框
      dialogVisible: false,
      //搜索框
      dialogVisible3: false,
      //用户列表
      tableData: [],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 10,
      total: 0
    };
  },
  created(){
    this.getList();
    this.getRolesAll();
  },
  computed:{
    userId(){
      return this.$store.state.loginUser.loginInfo.id
    }
  },
  methods: {
    getFreeze(name){
      this.$confirm('确定冻结此账号吗？', '冻结', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      .then(() => {
          this.freeze(name)
      })
      .catch(action => {
        
      });
    },
    getAct(name){
      this.$confirm('确定激活此账号吗？', '激活', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      .then(() => {
          this.act(name)
      })
      .catch(action => {
        
      });
    },
    async freeze(name){
      const data ={
        name:name,
        userStatus:0
      }
      const res = await freeze(data);
      console.log('冻结结果',res);
      if(res){
        this.$message.success('操作成功');
        this.getList()
      }
    },
    async act(name){
      const data ={
        name:name,
        userStatus:1
      }
      const res = await freeze(data);
      console.log('激活结果',res);
      if(res){
        this.$message.success('操作成功');
        this.getList()
      }
    },
    watchTime(data){
      // console.log(data)
      this.time = data
      this.resetData = false
    },
    rowClick(row){
      // console.log(row)
      this.rowData = row
      this.roleForm.role = this.rowData.role.roleCode
    },
    submitForm(formName) {
      this.$formTest.submitForm(this.$refs[formName],this.authorizeSure)
    },
    resetForm(formName) {
      this.$formTest.resetForm(this.$refs[formName]) 
    },
    async authorizeSure(){
      var data = {
        loginName :this.rowData.loginName,
        roleCode :this.roleForm.role,
      };
      const res = await saveUserRole(data)
      // console.log('授权结果',res)
      if(res){
        this.cancel()
        this.getList()
      }
      
    },
    cancel(){
      this.dialogVisible = false;
      this.resetForm('roleForm')
    },
    authorize(){
      this.dialogVisible = true
    },
    async getRolesAll(){
      const res = await getRolesAll();
      // console.log('角色列表',res)
      if(res){
        this.roles = res.data.data
      }
    },
    search(){
      this.getList()
    },
    reset(){
      this.resetData = true
      this.time={}
      this.clearForm()
      this.getList()
    },
    clearForm(){
      this.form.userType='';
      this.form.roleName='';
      this.form.loginName='';
      this.form.customerName='';
    },
    async getList(){
      var data ={
        pageNum:this.currentPage,
        pageSize:this.pageSize,
      }
      var params = {
        regStartTime :this.time.startTime,	
        regEndTime:this.time.endTime,
        customerName:this.form.customerName,
        roleName:this.form.roleName,
        userType:this.form.userType,
      }
      const res = await getUserList(data,params);
      // console.log('用户列表',res)
      if(res){
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      }
    },
    change() {
      this.dialogVisible3 = !this.dialogVisible3;
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.user{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;

  .el-dialog{
    .el-select{
      width: 100%;
    }
  }
  .sellBox{
    height: 100%;
    display: flex;
    flex-direction: column;
    .head{
      padding: 10px 20px;
      // background: red;
    }
    .sels{
      // margin: 20px 0;
      padding:10px 20px;
      background: #fff;
      margin-bottom: 10px;
      .lineBox{
        color: #b161bf;
      }
    }
    .form {
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          width: 200px;
          margin-bottom: 0;
          .el-select{
            width: 100%;
          }
        }
        .date {
          width: 414px;
        }
    }
    .box{
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      background: #fff;
      .btns{
        padding: 10px 20px;
        // background: pink;
      }
      .tab{
        padding-bottom: 52px;
        box-sizing: border-box;
        height: 100%;
        // background: orange;
        display: flex;
        flex-direction: column;
        position: relative;
        .el-table{
          height: 100%;
          position: relative;
        }
        .block{
          position: absolute;
          bottom:0;
          padding:  10px 0 ;
          width: 100%;
          .el-pagination {
            width: 100%;
            padding: 0;
            text-align: center;
          }
        }
      }
    }
  }
}

</style>