<template>
  <div class="children">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>子账号管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="box">
        <div class="btns">
          <el-button type="primary" size="small" @click="add">新建</el-button>
        </div>
        <div class="tab">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            height="100%"
            @row-click="rowClick"
          >
            <el-table-column prop="customerName" show-overflow-tooltip label="客户名称"></el-table-column>
            <el-table-column prop="loginName" label="登录名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="role.roleName" label="角色" show-overflow-tooltip></el-table-column>
            <el-table-column prop="email" show-overflow-tooltip label="邮箱"></el-table-column>
            <el-table-column prop="regTime" label="开通时间" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click="mod(scope.row)">修改</el-button>
              </template>
            </el-table-column>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[50, 100,150]"
              :page-size="pageSize"
              layout="sizes,total, jumper, prev, pager, next"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :title="edit?'编辑':'新建'" :visible.sync="dialogVisible" width="400px" :close-on-click-modal='false' :before-close="cancel">
      <el-form :model="form" :rules="rules" ref="form" size="small">
        <el-form-item label="客户名称" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="form.loginName" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item label="角色设置" prop="role">
          <el-select v-model="form.role" size="small" filterable placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.roleCode"
              :label="item.roleName"
              :value="item.roleCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" size="small">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Daterange from "../com/date";
import { getUserList, saveUserRole } from "@/api/system/user.js";
import {
  getList,
  subAgentAdd,
  subAgentMod,
  roleList
} from "@/api/system/children.js";
import { getRolesAll } from "@/api/system/role.js";
export default {
  name: "children",
  components: {
    Daterange
  },
  data() {
    return {
      edit: false,
      resetData: false,
      time: {},
      rowData: {},
      form: {
        userName: "",
        role: "",
        loginName: "",
        email: ""
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
      rules: {
        role: [{ required: true, trigger: "blur", message: "角色不能为空" }],
        loginName: [
          { required: true, trigger: "blur", message: "登录名不能为空" }
        ],
        userName: [
          { required: true, trigger: "blur", message: "客户名称不能为空" }
        ],
        email: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("邮箱不能为空"));
              }
              var reg = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
              setTimeout(() => {
                if (!reg.test(value)) {
                  callback(new Error("请输入正确的邮箱"));
                } else {
                  callback();
                }
              }, 1000);
            }
          }
        ]
      },
      //客户类型选项
      userTypes: [
        {
          value: "agent",
          label: "代理商"
        },
        {
          value: "subAgent",
          label: "子代理商"
        },
        {
          value: "internal",
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
      pageSize: 50,
      total: 0
    };
  },
  created() {
    this.getList();
    this.getRolesAll();
  },
  methods: {
    add() {
      this.edit = false;
      this.dialogVisible = true;
    },
    watchTime(data) {
      // //console.log(data);
      this.time = data;
      this.resetData = false;
    },
    rowClick(row) {
      // //console.log(row);
      this.rowData = row;
      // //console.log(this.rowData.role.roleCode);
    },
    submitForm(formName) {
      this.$formTest.submitForm(
        this.$refs[formName],
        this.edit ? this.subAgentMod : this.subAgentAdd
      );
    },
    resetForm(formName) {
      this.$formTest.resetForm(this.$refs[formName]);
    },
    async subAgentAdd() {
      var data = {
        customerName: this.form.userName,
        loginName: this.form.loginName,
        mail: this.form.email,
        roleCode: this.form.role
      };
      const res = await subAgentAdd(data);
      // //console.log("新增结果", res);
      if (res) {
        this.cancel();
        this.getList();
      }
    },
    async subAgentMod() {
      var data = {
        customerName: this.form.userName,
        loginName: this.form.loginName,
        mail: this.form.email,
        roleCode: this.form.role
      };
      const res = await subAgentMod(data);
      // //console.log("编辑结果", res);
      if (res) {
        this.cancel();
        this.getList();
      }
    },
    clear(){
      this.form = {
        userName: "",
        role: "",
        loginName: "",
        email: ""
      }
    },
    cancel() {
      this.clear()
      this.dialogVisible = false;
      this.resetForm("form");
    },
    mod(row) {
      this.form.loginName = row.loginName;
      this.form.userName = row.customerName;
      this.form.role = row.role.roleCode;
      this.form.email = row.email;
      this.edit = true;
      this.dialogVisible = true;
    },
    async getRolesAll() {
      const res = await roleList();
      // //console.log("角色列表", res);
      if (res) {
        this.roles = res.data.data;
      }
    },
    search() {
      this.getList();
    },
    reset() {
      this.resetData = true;
      this.time = {};
      this.clearForm();
      this.getList();
    },
    clearForm() {
      this.form.userType = "";
      this.form.roleName = "";
      this.form.loginName = "";
    },
    async getList() {
      var data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      var params = {
        regStartTime: this.time.startTime,
        regEndTime: this.time.endTime,
        customerName: this.form.customerName,
        roleName: this.form.roleName,
        userType: this.form.userType
      };
      const res = await getList(data, params);
      // //console.log("子账号列表", res);
      if (res) {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
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
      // //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      // //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.children {
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;

  .el-dialog {
    .el-select {
      width: 100%;
    }
  }
  .sellBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    .head {
      padding: 10px 20px;
      // background: red;
    }
    .sels {
      // margin: 20px 0;
      padding: 10px 20px;
      background: #fff;
      margin-bottom: 10px;
      .lineBox {
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
        .el-select {
          width: 100%;
        }
      }
      .date {
        width: 414px;
      }
    }
    .box {
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      background: #fff;
      .btns {
        padding: 10px 20px;
        // background: pink;
      }
      .tab {
        padding-bottom: 52px;
        box-sizing: border-box;
        height: 100%;
        // background: orange;
        display: flex;
        flex-direction: column;
        position: relative;
        .el-table {
          height: 100%;
          position: relative;
        }
        .block {
          position: absolute;
          bottom: 0;
          padding: 10px 0;
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