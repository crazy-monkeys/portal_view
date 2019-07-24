<template>
  <div class="permission">
    <div class="sellBox">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item to='/home/account/settings'>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box clear">
        <div class="btns">
          <el-button type='primary' size='small' @click="add">新建</el-button>
        </div>
        <div class="tab">
          <el-table :data="roles"  highlight-current-row ref='tab'>
            <el-table-column prop='id' label="ID" v-if="false" width="80">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="200">
            </el-table-column>
            <el-table-column prop="roleName" label="父级角色" width="200">
            </el-table-column>
            <el-table-column prop="roleDesc" label="职责描述" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="mod">
                  修改
                </el-button>
                <el-button type="text" size="small" @click="permissionSet">
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
            :page-sizes="[10, 100]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
        
    </div>
      <!-- <div class="r-box">
        <div class="r-t-box">
          <h2>权限配置</h2>
          <div class="groupBox">
            <el-tree :data="groups" show-checkbox node-key="resourceId" :props="defaultProps" :filter-node-method="filterNode"
              :default-checked-keys="form.groups" ref="tree" :check-strictly='true'>
            </el-tree>
          </div>
        </div>
      </div> -->
    <el-dialog :title="edit? '修改角色' :'新建角色'"  :visible.sync="dialogVisible" width="400px" :before-close="close"
      :close-on-click-modal="false" >
      <el-form label-position="top" label-width="auto" :model="roleForm" :rules='rules' size="small" ref='roleForm' class="roleForm">
        <el-form-item label="角色名称" prop='name'>
          <el-input v-model="roleForm.name" maxlength='10' :disabled='edit'></el-input>
        </el-form-item>
         <el-form-item label="父级角色" prop=''>
            <el-select v-model="form.role" size='small' filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="职责描述" prop='desc'>
          <el-input type='textarea' v-model="roleForm.desc" maxlength='50'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">取消</el-button>
        <el-button type="primary" @click='submitForm("roleForm")' size="small">提交</el-button>
      </span>
    </el-dialog>

    <el-dialog title="权限配置"  :visible.sync="dialogVisible1" width="400px" :before-close="close"
      :close-on-click-modal="false">
      <el-form label-position="top" label-width="auto" :model="roleForm" :rules='rules' size="small" ref='roleForm' class="roleForm">
        <el-form-item label="角色权限" prop=''>
          <el-tree :data="groups" show-checkbox node-key="resourceId" :props="defaultProps" :filter-node-method="filterNode"
              :default-checked-keys="form.groups" ref="tree" :check-strictly='true'>
            </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">取消</el-button>
        <el-button type="primary" @click='close' size="small">提交</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import { getRoles,saveRole} from '@/api/system/role.js'

export default {
  name: "permission",
  data() {
    return {
      options:[
        {
          label:'父级角色1',
          value:1
        },
        {
          label:'父级角色2',
          value:2
        },
        {
          label:'父级角色3',
          value:3
        },
      ],
      rowData: {},
      delArr: [],
      addArr: [],
      selectGroup: [],
      edit: false,
      roleForm: {
        name: "",
        desc: ""
      },
      dialogVisible: false,
      dialogVisible1: false,
      tableData: [],
      defaultCheckedKeys: [],
      type: "",
      rules: {
        
      },
      selStr: "",
      defaultProps: {
        children: "children",
        label: "resourceName"
      },
      //用户组列表
      groups: [
        {
          resourceId: 233,
          parentId: 0,
          resourceName: "客户管理",
          resourceType: 1,
          resourceOrder: 208,
          children: [
            {
              resourceId: 9067,
              parentId: 233,
              resourceName: "客户查询",
              resourceType: 2,
              resourceOrder: 210,
              children: []
            },
            {
              resourceId: 9066,
              parentId: 233,
              resourceName: "客户报备",
              resourceType: 3,
              resourceOrder: 211,
              children: []
            },
            {
              resourceId: 9065,
              parentId: 233,
              resourceName: "报备审批",
              resourceType: 2,
              resourceOrder: 212,
              children: []
            },
          ]
        },
        {
          resourceId: 233,
          parentId: 0,
          resourceName: "预测管理",
          resourceType: 1,
          resourceOrder: 208,
          children: [
            {
              resourceId: 9067,
              parentId: 233,
              resourceName: "销售预测查询",
              resourceType: 2,
              resourceOrder: 210,
              children: []
            },
            {
              resourceId: 9066,
              parentId: 233,
              resourceName: "销售预测上传",
              resourceType: 3,
              resourceOrder: 211,
              children: []
            },
            {
              resourceId: 9065,
              parentId: 233,
              resourceName: "销售预测审批",
              resourceType: 2,
              resourceOrder: 212,
              children: []
            },
          ]
        }
      ],

      //角色列表
      roles: [{}],
      roleId: "",
      form: {
        name: "",
        desc: "",
        groups: []
      },
      pageSize:10,
      currentPage:1,
      total:0,
    };
  },
  created(){
    this.getRoles()
  },
  computed:{
    loginName() {
      return this.$store.state.loginUser.loginInfo.loginName;
    },
  },
  methods: {
    
    filterNode(){},
    permissionSet(){
      this.dialogVisible1 = true
    },
    mod(){
      this.edit = true
      this.dialogVisible = true;
    },
    add(){
      this.edit = false
      this.dialogVisible = true;
    },
    close(){
      this.dialogVisible1 = false;
      this.dialogVisible = false;
      this.resetForm('roleForm')
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
    submitForm(formName) {
      this.$formTest.submitForm(this.$refs[formName],this.saveRole)
    },
    resetForm(formName) {
      this.$formTest.resetForm(this.$refs[formName]) 
    },
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
    async saveRole(){
      var data = {
        roleName:this.roleForm.name,
        roleDesc:this.roleForm.desc,
      }
      const res = await saveRole(data);
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
          width: 200px;
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