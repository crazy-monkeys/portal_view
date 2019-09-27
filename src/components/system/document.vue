<template>
  <div class="document">
    <div class="sellBox">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home/account/settings">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>文档管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible3' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible3' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible3'>
          <el-form-item label="文件名">
            <el-input size='small' v-model="form.fileName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="文件版本">
            <el-input v-model="form.version" size='small'  placeholder="请选择">
            </el-input>
          </el-form-item>
          <el-form-item label="文件类型">
            <el-select v-model="form.fileType" size='small' filterable placeholder="请选择">
              <el-option v-for="item in fileTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain @click="search">搜索</el-button>
            <el-button  size='small' type='primary' plain @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    <div class="box">
      <div class="tab">
        <el-table :data="tableData" style="width: 100%" height="700" @row-click='rowClick'>
          <el-table-column type="index" label="编号" v-if="false" width="80">
          </el-table-column>
          <el-table-column label="" width="30" v-if="false">
          </el-table-column>
          <el-table-column prop="1" label="原文件名" >
          </el-table-column>
          <el-table-column prop="6" label="显示文件名" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="2" show-overflow-tooltip label="版本">
          </el-table-column>
          <el-table-column prop="3" show-overflow-tooltip label="类型">
          </el-table-column>
          <el-table-column prop="4" show-overflow-tooltip label="创建时间">
          </el-table-column>
          <el-table-column prop="5" show-overflow-tooltip label="状态">
          </el-table-column>
          <el-table-column  show-overflow-tooltip label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="publish">
                发布
              </el-button>
              <el-button type="text" size="small" @click="revoke">
                撤销
              </el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <p>无账户信息</p>
          </div>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[15,30,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    
    <el-dialog title="发布" top="5vh" :visible.sync="dialogVisible" width="50%">

      <el-form ref="form" :model="form" class="form" label-position='top' :inline='true'>
          <el-form-item label="标题">
            <el-input size='small' placeholder="" :readonly="true" v-model='v2'></el-input>
          </el-form-item>
          <el-form-item label="文件类型">
            <el-select v-model="value" size="small" filterable placeholder="稽核报告">
            </el-select>
          </el-form-item>
        </el-form>
         <div class="div-round">
          角色
            <el-input size='small' placeholder="" class="input150"></el-input>
          用户名
            <el-input size='small' placeholder="" class="input150"></el-input>
         </div>
         <br/>
          <el-table :data="tableData" style="width: 100%" height="300">
            <el-table-column prop="" label="ID" v-if="false">
            </el-table-column>
            <el-table-column prop="t1" label="授权" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t2" label="用户名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t3" label="角色" show-overflow-tooltip>
            </el-table-column>
            <div slot="empty">
              无数据
            </div>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel" size='small'>取 消</el-button>
            <el-button type="primary" @click="submitForm('roleForm')" size='small'>发 布</el-button>
          </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
  import formTest from "../../assets/js/formTest";
  import formatDate from "../../assets/js/formatDate";

  export default {
    name: 'document',
    data() {
      return {
        fileTypes:[],
        form:{
          fileType:'',
          fileName:'',
          version:''
        },
        rowData: {},
        defaultProps: {
          children: 'children',
          label: 'userGroupName'
        },
        dialogVisible: false,
        dialogVisible3: false,
        tableData: [
          {
            "1":"最新公告.txt",
            "2":"1.0",
            "3":"文档",
            "4":"2019-06-01",
            "5":"已发布",
            "6":"最新公告"
          },
          {
            "1":"最新公告.txt",
            "2":"1.0",
            "3":"文档",
            "4":"2019-06-01",
            "5":"已发布",
            "6":"最新公告"
          },
          {
            "1":"最新公告.txt",
            "2":"1.0",
            "3":"文档",
            "4":"2019-06-01",
            "5":"已发布",
            "6":"最新公告"
          }
        ],
        currentPage: 1,
        pageSize: 15,
        total: 0,
      }
    },
    created() {
    },
    watch: {
     
    },
    methods: {
      revoke(){
        this.$confirm('确定要撤回发布吗？', '撤销', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          })
            .then(() => {
              this.$message({
                type: 'success',
                message: '撤销成功'
              })
            })
            .catch(action => {
              this.$message({
                type: 'fail',
                message: '已取消操作'
              })
            });
      },
      cancel(){
        this.dialogVisible = false
      },
      publish(){
        this.dialogVisible = true
      },
      change(){
        this.dialogVisible3 =!this.dialogVisible3
      },
      reset(){},
      rowClick(row) {
        // console.log(row)
        this.rowData = row
      },
      filterNode(value, data) {
        // console.log(value, data)
        if (!value) return true;
        return data.userGroupName.indexOf(value) !== -1;
      },
      a() {
        // console.log(this.$refs.tree.getCheckedKeys())
        this.form.groups = this.$refs.tree.getCheckedKeys()
      },
      add0(m) { return m < 10 ? '0' + m : m },
      format(shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        if (!shijianchuo) {
          return ''
        } else {
          var time = new Date(shijianchuo);
          var y = time.getFullYear();
          var m = time.getMonth() + 1;
          var d = time.getDate();
          var h = time.getHours();
          var mm = time.getMinutes();
          var s = time.getSeconds();
          return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
        }

      },
      //获取角色列表
      getRoles() {
        var data = {
          pageIndex: 1,
          pageSize: 10000
        }
        this.$http.get('' + process.env.API_ROOT + '/system/permission/roleInfo?' + this.toQueryString(data)
        )
          .then((res) => {
            // console.log('角色列表', res)
            if (res.data.code == 1) {
              this.roles = res.data.data.list
            } else {

            }
          }).catch((err) => {
            // console.log(err);
            alert('网络异常')
          })
      },
      //切换tab
      handleClick(tab, event) {
        // // console.log(tab, event);
      },
      //启用禁用
      changeStatus(index, rows, type) {
        var formData = new FormData()
        formData.append(
          'userId', rows[index].userId
        )
        if (rows[index].status == 3) {
          formData.append(
            'status', 1
          )
        } else {
          formData.append(
            'status', 3
          )
        }

        // var data ={
        //   userId:rows[index].userId,
        //   status:rows[index].status
        // }
        this.$confirm('确定要' + (rows[index].status == 3 ? '启用 ' : '禁用 ') + rows[index].loginName + ' 吗？', (rows[index].status == 3 ? '启用' : '禁用'), {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$http.post('' + process.env.API_ROOT + '/system/loginUser/updateUserStatus', formData
            ).then((res) => {
              // console.log('改变状态结果', res)
              if (res.data.code == 1) {
                this.getAccountList()
              } else {

              }
            }).catch((err) => {
              // console.log(err);
              alert('网络异常')
            })
          })
          .catch(action => {
            // this.$message({
            //   type: 'fail',
            //   message: '已取消操作'
            // })
          });
      },
      //修改表单提交
      submitForm(formName) {
        // this.$refs[formName].validate(valid => {
        //   if (valid) {
        //     this.commit()
        //     // this.$refs[formName].clearValidate();
        //   } else {
        //     // console.log("error submit!!");
        //     return false;
        //   }
        // });
        this.dialogVisible = false
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
      //搜索功能
      search() {
        this.dialogVisible = true;
      },
      //清空表单数据
      clearForm() {
        //电话号码
        this.form.phone = ''
        //姓名
        this.form.name = ''
        //邮箱
        this.form.email = ''
        this.form.checkedRoles = []
        //旧密码
        this.form.oldPwd = ''
        //新密码
        this.form.newPwd = ''
        //确认密码
        this.form.rePwd = ''
        //用户组
        this.form.groups = []
      },
      //修改按钮
      mod(index, rows) {
        this.activeName = '1'
        this.getRoles()
        this.getGroup()
        this.getMore(index, rows)
        this.dialogVisible = true
      },
      //获取账户详情
      getMore(index, rows) {
        this.$http.get('' + process.env.API_ROOT + '/system/loginUser/getUserInfo?userId=' + rows[index].userId
        ).then((res) => {
          // console.log('账户详情', res)
          if (res.data.code == 1) {
            //角色
            this.form.checkedRoles = res.data.data.roles.length != 0 ? res.data.data.roles.map((item) => { return item.roleId }) : []
            //姓名
            this.form.name = res.data.data.user.realName ? res.data.data.user.realName : ''
            //邮箱
            this.form.email = res.data.data.user.email ? res.data.data.user.email : ''
            //手机号
            this.form.phone = res.data.data.user.phone ? res.data.data.user.phone : ''
            //用户组

            this.form.groups = res.data.data.userGroupIds.length != 0 ? res.data.data.userGroupIds : []

            // this.form.oldPwd= res.data.data.email
            this.loginName = res.data.data.user.loginName ? res.data.data.user.loginName : ''

            // console.log(this.form.checkedRoles)
          } else {

          }
        }).catch((err) => {
          // console.log(err);
          alert('网络异常')
        })
      },
      //获取用户组列表
      getGroup() {

        this.$http.get('' + process.env.API_ROOT + '/system/userGroup/getAllUserGroup'
        )
          .then((res) => {
            // console.log('用户组列表', res)
            if (res.data.code == 1) {
              this.groups = res.data.data
            } else {

            }
          }).catch((err) => {
            // console.log(err);
            alert('网络异常')
          })
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
      //获取账户列表
      getAccountList() {
        var data = {
          loginName: this.accountName,
          phone: this.phone,
          realName: this.realName,
        }
        this.$http({
          method: 'post',
          url: '' + process.env.API_ROOT + '/system/loginUser/userInfo?pageIndex=' + this.currentPage + '&pageSize=' + this.pageSize,
          data: data
        }).then(res => {
          // console.log("账户列表", res);
          if (res.data.code == 1) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          } else {
            this.tableData = []
            this.total = 0
          }
        })
          .catch(error => {
            // console.log(error);
            alert("登入失败");
          });
      },
      //显示创建店铺框
      add() {
        this.$router.push(
          {
            name: 'accountAdd'
          }
        )
      },
      close() {
        this.dialogVisible = false;
        this.clearForm()
      },
      updatePwd() {
        var data = {
          oldLoginPwd: this.form.oldPwd,
          newLoginPwd: this.form.newPwd,
          userId: this.rowData.userId
        }

        return this.$http.post('' + process.env.API_ROOT + '/system/loginUser/updatePwd', data)
        // ).then((res)=>{
        //     // console.log('修改密码结果',res)
        //     if(res.data.code ==1){
        //       this.resetForm('form')
        //     }else{
        //       this.$message({
        //         type:'error',
        //         message:res.data.msg
        //       })
        //     }
        // }).catch((err)=>{
        //   // console.log(err);
        //   alert('网络异常')
        // })
      },
      updateMsg() {
        var data = {
          loginName: this.loginName,
          realName: this.form.name,
          phone: this.form.phone,
          email: this.form.email,
          userId: this.rowData.userId,
          roleIds: this.form.checkedRoles.join(','),
          userGroupIds: this.form.groups.join(','),
        }

        return this.$http.post('' + process.env.API_ROOT + '/system/loginUser/updateInfo', data)
        // ).then((res)=>{
        //     // console.log('修改结果',res)
        //     if(res.data.code ==1){
        //       // this.dialogVisible = false
        //       this.resetForm('form')
        //       this.getAccountList()
        //     }else{
        //       this.$message({
        //         type:'error',
        //         message:res.data.msg
        //       })  
        //     }
        // }).catch((err)=>{
        //   // console.log(err);
        //   alert('网络异常')
        // })
      },
      commit() {
        // console.log(this)
        if (this.form.oldPwd) {
          this.$http.all([this.updatePwd(), this.updateMsg()])
            .then(this.$http.spread((msgRes, pwdRes) => {
              // 上面两个请求都完成后，才执行这个回调方法
              // console.log(msgRes)
              // console.log(pwdRes)
              if (msgRes.data.code == 1 && pwdRes.data.code == 1) {
                this.clearForm()
                this.resetForm('form')
                this.getAccountList()
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.dialogVisible = false
              } else if (msgRes.data.code == 1 && pwdRes.data.code != 1) {
                this.$message({
                  type: 'error',
                  message: pwdRes.data.msg
                })
              } else if (msgRes.data.code != 1 && pwdRes.data.code == 1) {
                this.$message({
                  type: 'error',
                  message: msgRes.data.msg
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '修改失败'
                })
              }
            })).catch((err) => {
              // console.log(err);
              alert('网络异常')
            });
        } else {
          this.$http.all([this.updateMsg()])
            .then(this.$http.spread((msgRes) => {
              // 上面两个请求都完成后，才执行这个回调方法
              // console.log(msgRes)
              if (msgRes.data.code == 1) {
                this.clearForm()
                this.resetForm('form')
                this.getAccountList()
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.dialogVisible = false
              } else {
                this.$message({
                  type: 'error',
                  message: msgRes.data.msg
                })
              }
            })).catch((err) => {
              // console.log(err);
              alert('网络异常')
            });
        }
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getAccountList()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getAccountList()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.document{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;

  .el-dialog{
    .form {
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          .el-select{
            width: 100%;
          }
        }
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