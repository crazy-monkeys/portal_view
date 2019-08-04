<template>
  <div class="permission">
    <div class="sellBox">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item >系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box clear">
        <div class="btns">
          <el-button type='primary' size='small' @click="add">新建</el-button>
        </div>
        <div class="tab">
          <el-table :data="roles"  highlight-current-row ref='tab' @row-click='rowClick' height="100%">
            <el-table-column prop='id' label="ID" v-if="false" width="80">
            </el-table-column>
            <el-table-column prop="roleCode" label="角色编码" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="200">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="200">
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="mod(roles[scope.$index].roleCode)">
                  修改
                </el-button>
                <el-button type="text" size="small" @click="permissionSet(roles[scope.$index].roleCode)">
                  权限配置
                </el-button>
              </template>
            </el-table-column>
            <div slot="empty">

              <p>无角色信息</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 30,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
        
    </div>
    
    <el-dialog :title="edit? '修改角色' :'新建角色'"  :visible.sync="dialogVisible" width="400px" :before-close="close"
      :close-on-click-modal="false" >
      <el-form label-position="top" label-width="auto" :model="roleForm" :rules='rules' size="small" ref='roleForm' class="roleForm">
        <el-form-item label="角色编码" prop='code'>
          <el-input  v-model="roleForm.code" maxlength='50'></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop='name'>
          <el-input v-model="roleForm.name" maxlength='10' ></el-input>
        </el-form-item>
        
       
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">取消</el-button>
        <el-button type="primary" @click='submitForm("roleForm",1)' size="small">提交</el-button>
      </span>
    </el-dialog>

    <el-dialog title="权限配置"  :visible.sync="dialogVisible1" width="400px" :before-close="close"
      :close-on-click-modal="false">
      <el-form label-position="top" label-width="auto" :model="form" :rules='rules' size="small" ref='form' class="form">
        <el-form-item label="角色权限" prop=''>
          <el-tree :data="resource" @check-change="checkChange" show-checkbox node-key="id" :props="defaultProps" :filter-node-method="filterNode"
              :default-checked-keys="form.resource" ref="tree" >
            </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">取消</el-button>
        <el-button type="primary" @click='submitForm("form",2)' size="small">提交</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import { getRoles,updateRole,saveRole,findRole,findRoleResource,modRolePermission} from '@/api/system/role.js'
import { getResource} from '@/api/system/resource.js'

export default {
  name: "permission",
  data() {
    return {
      rowData: {},
      edit: false,
      roleForm: {
        name: "",
        code: "",
      },
      dialogVisible: false,
      dialogVisible1: false,
      defaultCheckedKeys: [],
      rules: {
        name: [
          { required: true, trigger: 'blur',message:'角色名称不能为空'}
        ],
        code: [
          { required: true, trigger: 'blur',message:'角色编码不能为空'}
        ],
      },
      defaultProps: {
        children: "children",
        label: "resourceName"
      },
      //资源
      resource: [],
      //角色列表
      roles: [],
      form: {
        resource:[]
      },
      pageSize:10,
      currentPage:1,
      total:0,
      addArr:[],
      reArr:[],
    };
  },
  created(){
    this.getRoles()
    this.getResource()
  },
  computed:{
   
  },
  methods: {
    
    checkChange(val){
      console.log(val)
      this.form.resource =  this.$refs['tree'].getCheckedKeys().filter(item=>{return item})
      console.log(this.form.resource)
      this.addArr = this.form.resource.filter(item=>{
           return this.defaultCheckedKeys.indexOf(item)==-1
      })
      this.reArr= this.defaultCheckedKeys.filter(item=>{
           return this.form.resource.indexOf(item)==-1
      })
      console.log(this.addArr,this.reArr)
    },
     rowClick(row){
      this.rowData = row
    },
    filterNode(){},
    permissionSet(id){
      // this.getResource()
      this.findRoleResource(id)
      this.dialogVisible1 = true
    },
    mod(id){
      this.findRole(id)
      this.edit = true
      this.dialogVisible = true;
    },
    //获取角色详情
    async findRole(id){
      var data ={
        id : id
      }
      const res = await findRole(data);
      console.log('角色详情',res);
      if(res){
        this.roleForm.name = res.data.data.roleName
        this.roleForm.code = res.data.data.roleCode
      }
    },

    //获取角色权限
    async findRoleResource(id){
      var data ={
        id : id
      }
      const res = await findRoleResource(data);
      console.log('角色拥有的权限',res);
      if(res){
        this.defaultCheckedKeys = res.data.data
        this.form.resource = res.data.data
        console.log(this.form.resource)
      }
    },
    //获取所有权限
    async getResource(){
      const res = await getResource();
      console.log('所有资源',res);
      if(res){
        this.resource = [res.data.data]
      }
    },
    add(){
      this.edit = false
      this.dialogVisible = true;
    },
    close(){
      this.dialogVisible1 = false;
      this.dialogVisible = false;
      this.resetForm('roleForm')
      this.resetForm('form')
      if(this.$refs['tree']){
      this.$refs['tree'].setCheckedKeys([])

      }
    },
     // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getRoles()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getRoles()
    },
    //表单验证
    resetForm(formName) {
      this.$formTest.resetForm(this.$refs[formName]) 
    },
    submitForm(formName,type) {
      if(type==1){
      this.$formTest.submitForm(this.$refs[formName],this.edit ? this.updateRole: this.saveRole)

      }else{
      this.$formTest.submitForm(this.$refs[formName],this.setPermission)

      }
    },
    //修改角色权限
    async setPermission(){
      var data ={
        roleCode:this.rowData.roleCode,
        addPermissionIds:this.addArr,
        rmPermissionIds:this.reArr,
      }
      const res = await modRolePermission(data);
      console.log('修改角色权限结果',res)
      if(res){
        this.form.resource =[]
        this.$refs['tree'].setCheckedKeys([])
        this.resetForm('form')
        this.getRoles()
        this.dialogVisible1 = false;
      }
    },
    
    //获取角色列表
    async getRoles(){
      var data = {
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        roleName:''
      }
      const res = await getRoles(data);
      console.log('角色列表',res)
      if(res){
        this.roles = res.data.data.list
        this.total = res.data.data.total
      }
    },
    //新增角色列表
    async saveRole(){
      var data = {
        roleName:this.roleForm.name,
        roleCode:this.roleForm.code,
      }
      const res = await saveRole(data);
      console.log('新增结果',res)
      if(res){
        this.getRoles();
        this.close()
      }
    },
    //编辑角色列表
    async updateRole(){
      var data = {
        id:this.rowData.id,
        roleName:this.roleForm.name,
        roleCode:this.roleForm.code,
      }
      const res = await updateRole(data);
      console.log('新增结果',res)
      if(res){
        this.getRoles();
        this.close()
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.permission{
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
          // width: 200px;
          margin-bottom: 0;
          .el-select{
            width: 100%;
          }
        }
        .date {
          width: 414px;
          .el-date-editor {
            width: 414px;
          }
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