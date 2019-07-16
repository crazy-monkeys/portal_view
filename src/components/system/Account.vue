<template>
  <div class="user">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>

          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>

          <!-- <div class="line"></div> -->
        </div>
        <!-- <transition-group enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"> -->
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible3'>
          <el-form-item label="客户名称">
            <el-input size='small' v-model="form.realName" placeholder="请输入"></el-input>
          </el-form-item>
          <!-- <el-form-item label="角色">
            <el-input size='small' v-model="form.loginName"  placeholder="请输入"></el-input>
          </el-form-item> -->
          <el-form-item label="角色">
            <el-select v-model="form.role" size='small' filterable placeholder="请选择">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-select v-model="form.userType" size='small' filterable placeholder="请选择">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开通日期" class="date">
            <el-date-picker size='small' v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain @click="search">搜索</el-button>
            <el-button  size='small' type='primary' plain @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- </transition-group> -->

      </div>
      <div class="box">
        <!-- <div class="btns clear">
        
        </div> -->
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column type="index"  label="编号" :index='q' width="60">
            </el-table-column>
            <el-table-column prop="realName" show-overflow-tooltip label="客户名称">
            </el-table-column>
            <el-table-column prop="realName" show-overflow-tooltip label="客户简称">
            </el-table-column>
            <el-table-column prop="loginName" label="登录名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" label="用户类型" show-overflow-tooltip>
              <template slot-scope="scope">
              <span>
                {{tableData[scope.$index].userType=='1' ?'代理商' :tableData[scope.$index].userType=='2' ?'直供客户':'销售客户'}}
              </span>
            </template>  
            </el-table-column>
            <el-table-column prop="" show-overflow-tooltip label="角色">
              <template slot-scope="scope">
              <span v-for="role in tableData[scope.$index].roles" :key="role.roleName">
                {{role.roleName}}
              </span>
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="email" label="邮箱">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="regTime" label="注册时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="状态">
              <template slot-scope="scope">
              <span v-for="role in tableData[scope.$index].roles" :key="role.roleName">
                {{tableData[scope.$index].userStatus=='0' ?'冻结' :tableData[scope.$index].userStatus=='1' ?'正常':'失效'}}
              </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click="authorize">授权</el-button>
                <!-- <el-button size="small" type="primary">维护</el-button> -->
                <el-button size="small" type="text" @click="freeze">冻结</el-button>
              </template>
            </el-table-column>
            <div slot="empty">
              <p>未查询到客户信息</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 100]" :page-size="10" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
      </div>
    </div>
    <el-dialog title="授权" :visible.sync="dialogVisible" width="400px">
      <el-select v-model="role" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size='small'>授 权</el-button>
      </span>
    </el-dialog>
    <el-dialog title="类型变更" :visible.sync="dialogVisible1" width="30%">
      <el-select v-model="value" size='small' filterable placeholder="请选择" class="changeType">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false" size='small'>取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false" size='small'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
export default {
  name: "Theme",
  data() {
    return {
      form:{
        realName:'',
        loginName:'',
        date:[],
        userType:'',
        role:''
      },
      role:'',
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
      value2: "",

      options1: [
        {
          value: 1,
          label: "代理商"
        },
        {
          value: 2,
          label: "直供客户"
        },
        {
          value: 3,
          label: "销售客户"
        }
      ],
      value1: "",
      txt: "",
      options: [
        {
          value: 1,
          label: "系统管理员"
        },
        {
          value: 2,
          label: "首代"
        }
      ],
      value: "",
      dialogVisible: false,
      dialogVisible3: false,
      dialogVisible1: false,
      tableData: [
        {}
      ],
      tableData1: [{}],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 10,
      total: 0
    };
  },
  created(){
    // this.getList()
  },
  methods: {
    freeze(){
      this.$confirm('确定要冻结该用户吗？', '删除', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => { 
          this.$message({
            type: 'success',
            message: '冻结成功'
          })
        })
        .catch(action => {
          this.$message({
            type: 'fail',
            message: '已取消操作'
          })
        });
    },
    authorize(){
      this.dialogVisible = true
    },
    search(){
      // this.getList()
    },
    reset(){
      this.clearForm()
      // this.getList()
    },
    clearForm(){
      this.form.date=[];
      this.form.userType='';
      this.form.role='';
      this.form.realName='';
      this.form.loginName='';
    },
    getList(){
      var data = {
        regStartTime :this.form.date.length==0 ? '' : this.form.data[0],	
        endStartTime:this.form.date.length==0 ? '' :this.form.data[1],
        realName:this.form.realName,
        loginName:this.form.loginName,
        userType:this.form.userType,
        pageNum:this.currentPage,
        pageSize:this.pageSize,
      }
       this.$http({
              method : 'post',
              url :  process.env.API_ROOT+ '/user/list',
              data:data,
              headers:{
                Authorization:sessionStorage.getItem('data')
              }
            }) .then(res => {
                console.log("用户列表", res);
                if (res.data.code===1) {
                   this.tableData = res.data.data.list
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
    change() {
      this.dialogVisible3 = !this.dialogVisible3;
    },
    changeType() {
      this.dialogVisible1 = true;
    },
    open() {
      this.$confirm("确定要释放吗?", "释放", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "释放成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "fail",
            message: "已取消操作"
          });
        });
    },
    remove() {
      this.dialogVisible = true;
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    //点击新增营销活动
    add() {
      this.$router.push({
        name: "AddSell"
      });
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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