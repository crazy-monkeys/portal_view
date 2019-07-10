<template>
  <div class="permission">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item to='/home/account/settings'>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box clear">
      <div class="l-box">
        <div class="l-t-box">
          <el-button type='primary' size='small' @click="dialogVisible=true">新建</el-button>
        </div>
        <div class="l-b-box">
          <div class="tab">
            <el-table :data="roles"  highlight-current-row ref='tab'>
              <el-table-column prop='id' label="ID" v-if="false" width="80">
              </el-table-column>
              <el-table-column label="" width="30">
              </el-table-column>
              <el-table-column prop="roleName" label="角色名称">
              </el-table-column>
              <el-table-column prop="roleDesc" label="职责描述" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small">
                    修改角色信息
                  </el-button>
                </template>
              </el-table-column>
              <div slot="empty">

                <p>无角色信息</p>
              </div>
            </el-table>
          </div>
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
          <div class="btn">
            <el-button type='primary'> 修改权限配置</el-button>
          </div>
        </div>
      </div> -->
    </div>



    <el-dialog :title="edit? '修改角色' :'新建角色'" top='20vh' :visible.sync="dialogVisible" width="30%" :before-close="close"
      :close-on-click-modal="false">
      <el-form label-position="top" label-width="auto" :model="roleForm" :rules='rules' size="small" ref='roleForm' class="roleForm">
        <el-form-item label="角色名称" prop='name'>
          <el-input v-model="roleForm.name" maxlength='10' :disabled='edit'></el-input>
        </el-form-item>
        <el-form-item label="职责描述" prop='desc'>
          <el-input type='textarea' v-model="roleForm.desc" maxlength='50'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">取消</el-button>
        <el-button type="primary" @click='submit("roleForm")' size="small">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";

export default {
  name: "permission",
  data() {
    return {
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
      tableData: [],
      defaultCheckedKeys: [],
      type: "",
      rules: {
        name: [
          { required: true, trigger: "change", validator: formTest.roleName }
        ]
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
              resourceName: "添加测试API",
              resourceType: 2,
              resourceOrder: 210,
              children: []
            },
            {
              resourceId: 9066,
              parentId: 233,
              resourceName: "添加测试按钮",
              resourceType: 3,
              resourceOrder: 211,
              children: []
            },
            {
              resourceId: 9065,
              parentId: 233,
              resourceName: "添加测试API",
              resourceType: 2,
              resourceOrder: 212,
              children: []
            },
            {
              resourceId: 9064,
              parentId: 233,
              resourceName: "添加测试菜单",
              resourceType: 1,
              resourceOrder: 213,
              children: []
            },
            {
              resourceId: 234,
              parentId: 233,
              resourceName: "自定义属性",
              resourceType: 1,
              resourceOrder: 309,
              children: [
                {
                  resourceId: 235,
                  parentId: 234,
                  resourceName: "自定义属性列表",
                  resourceType: 3,
                  resourceOrder: 316,
                  children: []
                },
                {
                  resourceId: 236,
                  parentId: 234,
                  resourceName: "新增自定义属性",
                  resourceType: 3,
                  resourceOrder: 317,
                  children: []
                },
                {
                  resourceId: 237,
                  parentId: 234,
                  resourceName: "新增自定义属性",
                  resourceType: 3,
                  resourceOrder: 318,
                  children: []
                },
                {
                  resourceId: 238,
                  parentId: 234,
                  resourceName: "修改自定义属性状态",
                  resourceType: 3,
                  resourceOrder: 319,
                  children: []
                },
                {
                  resourceId: 239,
                  parentId: 234,
                  resourceName: "删除自定义属性状态",
                  resourceType: 3,
                  resourceOrder: 320,
                  children: []
                },
                {
                  resourceId: 240,
                  parentId: 234,
                  resourceName: "获取单挑自定义属性",
                  resourceType: 3,
                  resourceOrder: 321,
                  children: []
                },
                {
                  resourceId: 241,
                  parentId: 234,
                  resourceName: "获取已启用自定义属性",
                  resourceType: 3,
                  resourceOrder: 322,
                  children: []
                }
              ]
            }
          ]
        }
      ],

      //角色列表
      roles: [],
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
     //修改表单提交
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addRole()
        } else {
          console.log("error submit!!");
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
    //把对象转成query值
    cleanArray(actual) {
      var newArray = [];
        for (let i = 0; i < actual.length; i++) {
          if (actual[i]) {
            newArray.push(actual[i]);
          }
        }
      return newArray;
    },
    toQueryString(obj) {
      if (!obj) return "";
        return this.cleanArray(
        Object.keys(obj).map(key => {
          if (obj[key] === undefined) return "";
            return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
          })
        ).join("&");
    },
    close(){
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
    getRoles(){
      var data = {
        // roleName :this.loginName,	
        pageNum:this.currentPage,
        pageSize:this.pageSize,
      }
       this.$http({
              method : 'get',
              url :  process.env.API_ROOT+ '/permission/roleInfo?'+ this.toQueryString(data),
              headers:{
                Authorization:sessionStorage.getItem('data')
              }
            }) .then(res => {
                console.log("角色列表", res);
                if (res.data.code===1) {
                   this.roles = res.data.data.list
                   this.total = res.data.data.total
                }else{
                  this.$message({
                    type:'error',
                    message:res.data.msg
                  })
                }
              
              })
              .catch(error => {
                console.log(error);
                alert("登入失败");
              });
    },
    addRole(){
      var data = {
        roleName:this.roleForm.name,
        roleDesc:this.roleForm.desc,
      }
       this.$http({
              method : 'post',
              url :  process.env.API_ROOT+ '/permission/saveRole',
              data:data,
              headers:{
                Authorization:sessionStorage.getItem('data')
              }
            }) .then(res => {
                console.log("新增角色", res);
                if (res.data.code===1) {
                  this.getRoles()
                  this.close()
                }else{
                  this.$message({
                    type:'error',
                    message:res.data.msg
                  })
                }
              })
              .catch(error => {
                console.log(error);
                alert("网络异常");
              });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;

.permission {
  .n {
    display: none;
  }


  .head {
    background: #fafafa;

    h1 {
      opacity: 0.87;
      font-family: "zt2";
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 36px;
      height: 42px;
      font-weight: bold;
      padding: 0 50px;
      // float: left;
    }

    .el-breadcrumb {
      // float: right;
      margin-left: 50px;
      line-height: 30px;
      margin-right: 20px;
    }
  }

  .box {
    height: calc(100% - 72px);
    position: relative;
    padding: 0 20px 20px 20px;
    background: #fafafa;
    // box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
    border-radius: 2px;

    h2 {
      height: 60px;
      line-height: 60px;
    }

    .l-box {
      width: 55%;
      overflow: auto;
      height: 100%;
      background: #fff;
      float: left;
      box-sizing: border-box;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);

      .l-t-box,
      .l-b-box {
        background: #ffffff;
      }

      .l-t-box {
        height: 56px;
        line-height: 56px;
        padding: 0 30px;
      }

      .l-b-box {
        padding-bottom: 20px;
        .block {
          padding: 10px;
          .el-pagination {
            width: 100%;
            text-align: center;
          }
        }
      }
    }

    .r-box {
      height: 100%;
      width: 45%;
      box-sizing: border-box;
      background: #fafafa;
      float: left;

      .r-t-box {
        height: 100%;
        background: #ffffff;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
        padding: 0 30px;
        margin-left: 20px;

        .groupBox {
          border: 1px solid #ccc;
          margin-top: 30px;
          height: calc(100% - 200px);
          overflow: auto;
          padding: 20px;

          .el-tree {
            .el-tree-node__content {
              margin: 5px;
            }
          }
        }

        .btn {
          text-align: center;

          .el-button {
            margin: 15px auto;
          }
        }
      }
    }
  }
}
</style>