<template>
  <div class="account">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home/account/settings">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="btns">
          &nbsp;
          标题：<el-input size='small' v-model="accountName"></el-input>
          类型：
            <el-select v-model="value" size="small" filterable placeholder="稽核报告">
            </el-select>
          发布日期：
            <el-date-picker size='small' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              v-model="d1">
            </el-date-picker>
        <el-button  type="primary" size="small" plain @click="search">查询</el-button>
        <el-button  size="small" plain @click="search">发布</el-button>
      </div>
      <div class="tab">
        <el-table :data="tableData" style="width: 100%" height="700" @row-click='rowClick'>
          <el-table-column type="index" label="编号" v-if="false" width="80">
          </el-table-column>
          <el-table-column label="" width="30" v-if="false">
          </el-table-column>
          <el-table-column prop="1" label="标题" >
          </el-table-column>
          <el-table-column prop="6" label="类型" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="2" show-overflow-tooltip label="创建时间">
          </el-table-column>
          <el-table-column prop="3" show-overflow-tooltip label="发布时间">
          </el-table-column>
          <el-table-column prop="4" show-overflow-tooltip label="修改时间">
          </el-table-column>
          <el-table-column prop="4" show-overflow-tooltip label="发布人">
          </el-table-column>
          <el-table-column prop="5" show-overflow-tooltip label="状态">
          </el-table-column>
          <el-table-column label="操作" width="300" fixed='right'>
            <template slot-scope="scope">
              <el-button size='mini'>修改</el-button>
              <el-button size='mini'>撤销</el-button>
              <el-button size='mini'>预览</el-button>
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
    
    <el-dialog title="公告发布" :visible.sync="dialogVisible" width="50%" center="true">

      <el-form ref="form" :model="form" class="form" :inline='true'>
          <el-form-item label="标题">
            <el-input size='small' placeholder="" :readonly="true" v-model='v2'></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="value" size="small" filterable placeholder="维护公告">
            </el-select>
          </el-form-item>
          <el-form-item label="">
             <el-checkbox v-model="checked">置顶</el-checkbox>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type='textarea' :rows="2" :cols="60" width="200" placeholder="" resize='none'></el-input>
            <el-upload
                      class="upload-demo"
                      action=''
                      >
                      <el-button size="mini" type="">上传文件</el-button>
                    </el-upload>
          </el-form-item>
          
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">预览</el-button>
          <el-button @click="dialogVisible = false" size="small">保存</el-button>
          <el-button type="primary" @click="dialogVisible = false" size="small">发布</el-button>
          <el-button @click="dialogVisible = false" size="small">取消</el-button>
        </span>
      
    </el-dialog>
  </div>
</template>

<script>
  import formTest from "../../assets/js/formTest";
  import formatDate from "../../assets/js/formatDate";

  export default {
    name: 'account',
    data() {
      return {
        rowData: {},
        defaultProps: {
          children: 'children',
          label: 'userGroupName'
        },
        dialogVisible: false,
        tableData: [
          {
            "1":"最新公告",
            "2":"2019-01-01",
            "3":"2019-01-01",
            "4":"2019-06-01",
            "5":"已发布",
            "6":"公告"
          },
          {
            "1":"最新公告.txt",
            "2":"2019-01-01",
            "3":"2019-01-01",
            "4":"2019-06-01",
            "5":"已发布",
            "6":"最新公告"
          },
          {
            "1":"最新公告.txt",
            "2":"2019-01-01",
            "3":"2019-01-01",
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
      'form.checkedRoles': {
        handler: function (n, o) {
          console.log(n)
        },
        deep: true
      }
    },
    methods: {
      rowClick(row) {
        console.log(row)
        this.rowData = row
      },
      filterNode(value, data) {
        console.log(value, data)
        if (!value) return true;
        return data.userGroupName.indexOf(value) !== -1;
      },
      a() {
        console.log(this.$refs.tree.getCheckedKeys())
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
            console.log('角色列表', res)
            if (res.data.code == 1) {
              this.roles = res.data.data.list
            } else {

            }
          }).catch((err) => {
            console.log(err);
            alert('网络异常')
          })
      },
      //切换tab
      handleClick(tab, event) {
        // console.log(tab, event);
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
              console.log('改变状态结果', res)
              if (res.data.code == 1) {
                this.getAccountList()
              } else {

              }
            }).catch((err) => {
              console.log(err);
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
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.commit()
            // this.$refs[formName].clearValidate();
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
          console.log('账户详情', res)
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

            console.log(this.form.checkedRoles)
          } else {

          }
        }).catch((err) => {
          console.log(err);
          alert('网络异常')
        })
      },
      //获取用户组列表
      getGroup() {

        this.$http.get('' + process.env.API_ROOT + '/system/userGroup/getAllUserGroup'
        )
          .then((res) => {
            console.log('用户组列表', res)
            if (res.data.code == 1) {
              this.groups = res.data.data
            } else {

            }
          }).catch((err) => {
            console.log(err);
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
          console.log("账户列表", res);
          if (res.data.code == 1) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          } else {
            this.tableData = []
            this.total = 0
          }
        })
          .catch(error => {
            console.log(error);
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
        //     console.log('修改密码结果',res)
        //     if(res.data.code ==1){
        //       this.resetForm('form')
        //     }else{
        //       this.$message({
        //         type:'error',
        //         message:res.data.msg
        //       })
        //     }
        // }).catch((err)=>{
        //   console.log(err);
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
        //     console.log('修改结果',res)
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
        //   console.log(err);
        //   alert('网络异常')
        // })
      },
      commit() {
        console.log(this)
        if (this.form.oldPwd) {
          this.$http.all([this.updatePwd(), this.updateMsg()])
            .then(this.$http.spread((msgRes, pwdRes) => {
              // 上面两个请求都完成后，才执行这个回调方法
              console.log(msgRes)
              console.log(pwdRes)
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
              console.log(err);
              alert('网络异常')
            });
        } else {
          this.$http.all([this.updateMsg()])
            .then(this.$http.spread((msgRes) => {
              // 上面两个请求都完成后，才执行这个回调方法
              console.log(msgRes)
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
              console.log(err);
              alert('网络异常')
            });
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getAccountList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getAccountList()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
  .input150{
    width: 150px;
  }
  .div-round{
    birder:1px solid #ccc;
  }
  .account {
    .dis {
      span {
        color: #ccc
      }
    }

    .el-tabs--card>.el-tabs__header {
      border: none;
      display: flex;
      justify-content: center;

      .el-tabs__item {
        width: 125px;
        text-align: center;
        border: 1px solid #E4E7ED;
        border-right: none;
        border-top: none;

      }

      .el-tabs__item:first-child {
        border-left: none;
      }

      .el-tabs__item.is-active {
        border: 1px solid #3366FF
      }
    }

    .el-tabs__content {
      .el-tab-pane {
        padding: 30px;

        .el-checkbox {
          margin: 10px;
        }
      }
    }

    .el-dialog {
      .el-form-item {
        margin-bottom: 20px
      }

      .el-form--label-top .el-form-item__label {
        padding-bottom: 0
      }
    }

    .head {
      h1 {
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

      .el-breadcrumb {
        // float: right;
        margin-left: 50px;
        line-height: 30px;
        margin-right: 20px
      }
    }

    .box {
      position: relative;
      margin: 0 20px 20px 20px;
      background: #FFFFFF;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
      border-radius: 2px;

      .btns {
        p {
          float: right;
        }

        .el-input {
          width: 150px;
          margin: 12px 20px 12px 0;
        }

        .add {

          margin: 12px 0 12px 20px;
        }

        .sec {

          margin: 12px 0 12px 20px;
          float: right;

          margin-right: 20px;
        }
      }

      .tab {
        .el-table {
          td {
            height: 64px;
            line-height: 64px;

            .cell {
              // overflow: hidden;
              // text-overflow:ellipsis;
              // display: -webkit-box;
              // -webkit-line-clamp: 2;
              // -webkit-box-orient: vertical;
              // width:200px;
              font-family: 'zt1';
              font-size: 12px;
              color: #333333;
              letter-spacing: 0;
              line-height: 18px;

            }

           
          }
        }
      }

      .block {
        // position: absolute;
        bottom: 26px;
        padding: 10px;

        .el-pagination {
          width: 100%;
          text-align: center;
        }
      }

    }

    .groupBox {
      border: 1px solid #ccc;
      max-height: 400px;
      overflow: auto;
      padding: 20px;

      .el-tree {
        .el-tree-node__content {
          margin: 5px;
        }
      }
    }

    .bottom {
      text-align: center;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
      line-height: 16px;
    }

    .danger {
      font-family: 'zt1';
      font-size: 14px;
      color: #666666;
      letter-spacing: 0;
      line-height: 16px;
      height: 32px;
    }
  }
</style>