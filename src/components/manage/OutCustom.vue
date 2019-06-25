<template>
  <div class="theme">
    <div>
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单填报</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>订单填报</h1>
      </div>
      <div class="sels clear">
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true'>
          <el-form-item label="活动名称">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input size='small'></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input size='small'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns clear">
          <el-button @click="add" class="add" size='small' type='primary'>新建</el-button>
          <el-button @click="add" class="add" size='small' type='primary'>修改</el-button>
          <el-button @click="add" class="add" size='small' type='primary'>删除</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="700" @row-click='rowClick'>
            <el-table-column prop="" width='30' show-overflow-tooltip label="">
            </el-table-column>
            <el-table-column type="index" width='100' label="编号" :index='q'>
            </el-table-column>
            <el-table-column prop="" show-overflow-tooltip label="客户属性">
            </el-table-column>
            <el-table-column prop="" label="订单类型" show-overflow-tooltip>
                <template scope-slot='scope'>
                    <el-select v-model="value" placeholder="请选择" size='small'>
                        <el-option
                          v-for="item in types"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                </template>  
            </el-table-column>
            <el-table-column prop="" label="规格型号" show-overflow-tooltip>
                <template scope-slot='scope'>
                    <el-select v-model="value" placeholder="请选择" size='small'>
                        <el-option
                          v-for="item in types"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                </template>  
            </el-table-column>
            <el-table-column prop="" show-overflow-tooltip label="单位">
            </el-table-column>
            <el-table-column prop="" label="单价（USD）" show-overflow-tooltip>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="数量">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="交货日期">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="操作">
              <template scope-slot='scope'>
                <el-button type='text' size='small'>
                  删除
                </el-button>
              </template>  
            </el-table-column>
            <div slot="empty">
              <div>
                <img src="../../assets/img/none.png" alt="" width="140" height="140" />
              </div>
              <p>未查询到客户信息</p>
            </div>
          </el-table>
        </div>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 100]" :page-size="10" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  export default {
    name: 'Theme',
    data() {

      return {
        types:[
          {
            value:'1',
            label:'类型1'
          },
          {
            value:'2',
            label:'类型2'
          },
          {
            value:'3',
            label:'类型3'
          }
        ],
        ok: 0,
        childrenBtn: true,
        look: false,
        id: '',
        toggle: 0,
        //子流程
        children: [],
        // 测试短信内容
        content: '',
        photo: '',
        sign: '',
        theme: '',
        sendCost: '',
        payMoney: '',
        roi: '',
        reoprtTableData: [
        ],
        report: {
          roiTime: [],
          actName: '',
          theme: '',
          roiTime: [],
          id: '',
          createTime: ''
        },
        rep: false,
        //短信内容
        sms: '',
        //指定只能选择当前时间之后的时间
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < (new Date()).getTime() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的 
          },
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() < new Date(this.report.createTime).getTime() - 8.64e7
          }
        },
        date: '',
        //搜索框需要参数
        actName: '',
        photo: '',
        // 短信字数
        num: 0,
        //数据的个数
        total: 0,
        //列表页搜索框数据
        value3: '',
        form: {},
        //表单数据
        ruleForm: {
          shop: '',
          theme: '',
          actName: '',
          sign: '',
          photo: '',
          mb: '',
          radio2: 0,
          radio3: 0,
          radio4: 1,
          textarea: '',
          roiTime: [],
          time1: '',
          time2: [],
          marketingActivityId: ''
        },
        rules1: {
          theme: [
            { required: true, message: '请选择主题', trigger: 'change' },
            { min: 1, max: 20, message: '主题名称不可超过20个字符', trigger: 'change' }
          ],
          shop: [
            { required: true, message: '请选择店铺', trigger: 'change' }
          ]
        },
        //表单验证
        rules: {
          photo: [
            { required: true, message: '请选择快照', trigger: 'change' }
          ],
          theme: [
            { required: true, message: '请选择主题', trigger: 'blur' },
          ],
          actName: [
            { type: 'string', required: true, message: '请填写活动名称', trigger: 'blur' },
            { min: 1, max: 20, message: '活动名称不可超过20个字符', trigger: 'blur' }
          ],
          sign: [
            { required: true, message: '请选择短信签名', trigger: 'change' }
          ],
          mb: [
            { message: '请至少选择一个模板', trigger: 'blur' }
          ],
          textarea: [
            { required: true, message: '请填写短信内容', trigger: 'change' }
          ],
          roiTime: [
            {
              required: true, trigger: 'blur', validator: (rule, value, callback) => {
                if (value) {
                  // console.log('time1',new Date(value[0]).getTime(),new Date(value[1]).getTime())
                  if (value.length == 0) {
                    callback(new Error('请选择roi时间段!'))
                  } else {

                    if (this.ruleForm.time1) {
                      if (new Date(value[0]).getTime() < new Date(this.ruleForm.time1).getTime()) {
                        callback(new Error('roi开始时间要晚于定时执行时间'))
                      } else {
                        if (new Date(value[0]).getTime() == new Date(value[1]).getTime()) {
                          callback(new Error('roi结束时间要晚于roi开始时间'))
                        } else {
                          callback()
                        }
                      }
                    } else {
                      if (new Date(value[0]).getTime() < new Date().getTime()) {
                        callback(new Error('roi开始时间要晚于当前时间'))
                      } else {
                        if (new Date(value[0]).getTime() == new Date(value[1]).getTime()) {
                          callback(new Error('roi结束时间要晚于roi开始时间'))
                        } else {
                          callback()
                        }
                      }
                    }
                  }
                } else {
                  callback(new Error('请选择roi时间段!'))
                }
              }
            }
          ],
          time1: [
            {
              required: true, trigger: 'blur', validator: (rule, value, callback) => {
                if (value) {
                  // console.log('time1',new Date(value[0]).getTime(),new Date(value[1]).getTime())
                  if (value.length == 0) {
                    callback(new Error('请选择执行时间段!'))
                  } else {
                    if (new Date(value).getTime() < new Date().getTime()) {
                      callback(new Error('执行开始时间要晚于当前时间'))
                    } else {
                      if (this.ruleForm.roiTime.length != 0) {
                        if (new Date(value).getTime() < new Date().getTime(this.ruleForm.roiTime[0])) {
                          callback(new Error('执行开始时间要早于roi开始时间'))
                        } else {
                          callback()
                        }
                      } else {
                        callback()
                      }
                    }
                  }
                } else {
                  callback(new Error('请选择执行时间段!'))
                }
              }
            }
          ],
          time2: [
            { required: true, message: '请选择排除已购时间段', trigger: 'blur' }
          ],
          time: [
            { message: '', trigger: 'blur' }
          ]
        },
        //新建控件显示否
        none: 'true',
        //下拉菜单选择
        select: '全部名称',
        //列表页的时间选择
        value4: '',
        themeForm: {
          shop: '',
          theme: '',
        },
        //在上边提示
        labelPosition: 'top',
        // 查看流程 显示否
        childdialogVisible: false,
        //添加主题狂 显示否
        dialogVisible: false,
        //测试短信框 显示否
        csdialogVisible: false,
        //短信内容 显示否
        smsdialogVisible: false,
        //营销活动列表数据
        tableData: [
          {}
        ],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        //店铺列表
        shopList: [],
        //主题列表
        themeList: [],
        //签名列表
        signList: [],
        //快照列表
        photoList: [],
        //编辑禁用
        bj: false,
        //查看禁用
        // ck:false,
        fob: false,
        sendCount: 0,
      }
    },
    computed: {
      shopId() {
        return this.$store.state.shopId.shopId
      }
    },
    created() {
      console.log(this.shopId)
      // this.getShopList()
      // this.getList(this.currentPage,this.pageSize,this.shopId)

      console.log(this.$refs)
    },
    watch: {
      shopId: {
        handler: function (n, o) {
          if (n != o) {
            this.getList(this.currentPage, this.pageSize, this.shopId)
          }
        }
      },
      children: {
        handler: function (n, o) {
          var num = 0
          n.forEach(item => {
            if (item.executionStatus != 1) {
              num++
            }
          })
          if (num != 0) {
            this.childrenBtn = true
          } else {
            this.childrenBtn = false
          }
        },
        deep: true

      },
    },
    methods: {
      q(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1
      },
      // 忽略并发送
      ignore(activityId) {
        this.$http.post('' + process.env.API_ROOT + '/marketing/sendAgain', {
          "activityId": activityId
        }
        ).then(res => {
          console.log("忽略并发送", res);
          if (res.data.code == 1) {
            this.childdialogVisible = false

            this.$message({
              type: 'success',
              message: '发送成功'
            })
          }

        })
          .catch(error => {
            console.log(error);
            alert("登入失败");
          });
      },

      // 重试
      retry(activityId) {
        this.toggle = 1;
        this.fob = true;
        this.$http.post(
          '' + process.env.API_ROOT + '/marketing/reTry',
          {
            "activityId": activityId,

          }
        ).then(res => {
          console.log("重试", res);
          if (res.data.code == 1) {
            this.csdialogVisible = false
            this.getChildren(activityId)
            this.content = ''
            this.toggle = 0;

            this.$message({
              type: 'success',
              message: '重新获取成功'
            })
          } else {
            this.toggle = 0;
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
          .catch(error => {
            console.log(error);
            alert("登入失败");
          });
      },

      //查看按钮
      check(index, rows) {
        this.look = true;
        this.$router.push({
          name: 'Details',
          params: {
            id: rows[index].marketingActivityId
          }
        })
        this.none = false;
        // this.ck = true;
        // this.getMore(rows[index].marketingActivityId)
      },
      //编辑按钮
      edit(index, rows) {
        this.none = false;
        this.bj = true;
        this.$router.push({
          name: 'EditSell',
          params: {
            id: rows[index].marketingActivityId
          }
        })
        // this.getMore(rows[index].marketingActivityId)
        this.photo = ''

      },
      rowClick(row, event, column) {
        console.log(row)
        this.id = row.marketingActivityId
      },
      // 启用按钮
      start(activityId, time) {
        if (new Date(time).getTime() > new Date().getTime()) {
          this.$confirm('请确认该活动是否要进行短信发送', '启用', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          })
            .then(() => {
              this.$http({
                method: 'get',
                url: '' + process.env.API_ROOT + '/marketing/activity/recovery' + '?activityId=' + activityId,
              }).then(res => {
                console.log("启用", res);
                if (res.data.code == 1) {
                  this.$message({
                    type: 'success',
                    message: '启用成功'
                  })
                  this.getList(this.currentPage, this.pageSize, this.shopId);
                }
              })
                .catch(error => {
                  console.log(error);
                  alert("登入失败");
                });
            })
            .catch(action => {
              this.$message({
                type: 'fail',
                message: '已取消操作'
              })
            });
        } else {
          this.$message({
            type: 'error',
            message: '该活动执行时间已超出当前时间！'
          })
        }

      },
      //禁用按钮
      stop(activityId) {
        this.$confirm('请确认活动是否取消短信发送', '禁用', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$http({
              method: 'get',
              url: '' + process.env.API_ROOT + '/marketing/activity/cancel' + '?activityId=' + activityId,
            }).then(res => {
              console.log("禁用", res);
              if (res.data.code === 1) {
                this.getList(this.currentPage, this.pageSize, this.shopId);
                this.$message({
                  type: 'success',
                  message: '禁用成功'
                })
              }
            })
              .catch(error => {
                console.log(error);
                alert("登入失败");
              });
          })
          .catch(action => {
            this.$message({
              type: 'fail',
              message: '已取消操作'
            })
          });
      },



      //搜索事件
      search() {
        this.getList(this.currentPage, this.pageSize, this.shopId)
      },
      //时间选择 事件
      selTime() {
        this.value4 = this.value4 ? this.value4 : []
        console.log(this.value4)
      },

      //获取子流程
      getChildren(activityId) {
        this.$http({
          method: 'get',
          url: '' + process.env.API_ROOT + '/marketing/activity/childrenBusiness' + '?activityId=' + activityId
        }).then(res => {
          console.log("子流程", res);
          if (res.data.code == 1) {
            this.children = res.data.data
            this.fob = false;
          }
        })
          .catch(error => {
            console.log(error);
            alert("登入失败");
          });
      },




      //获取用户店铺列表
      getShopList() {
        this.$http({
          method: 'get',
          url: '' + process.env.API_ROOT + '/getCurentUserShopList',
        }).then(res => {
          console.log("店铺列表", res);
          if (res.data.code == 1) {
            this.shopList = res.data.data;
            this.ruleForm.shop = res.data.data[0].shop_name

          }
        })
          .catch(error => {
            console.log(error);
            alert("登入失败");
          });
      },
      //获取营销活动列表

      getList(currentPage, pageSize, shopid) {
        var data = {
          "pageIndex": currentPage,
          "pageSize": pageSize,
          "startTime": this.value4 ? this.value4[0] : '',
          "endTime": this.value4 ? this.value4[1] : '',
          "activityName": this.actName,
          "shopName": '',
          "snapshotName": this.photo,
          'shopInfoId': shopid
        };


        this.$http.get('' + process.env.API_ROOT + '/marketing/batch/activities?' + this.toQueryString(data)).then((res) => {
          console.log('营销活动列表', res)
          if (res.data.code == 1) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          }

        }).catch((err) => {
          console.log(err);

          alert('网络异常')
        })
      },


      //提示1
      renderHeader1(h, { column }) { // h即为cerateElement的简写，具体可看vue官方文档
        return h(
          'span', {
          },
          [
            h('span', column.label),
            h('eg1')
          ]
        );
      },
      // 提示2
      renderHeader2(h, { column }) { // h即为cerateElement的简写，具体可看vue官方文档
        return h(
          'span', {
          },
          [
            h('span', column.label),
            h('eg2')
          ]
        );
      },


      // 点击返回按钮
      back() {
        this.ok = 0;
        this.suc = true;
        this.fileList = []
        this.tags = []
        this.group = []
        this.relationId = ''
        this.resetForm('ruleForm')
        this.clear()
        this.look = false;
        this.none = true
        this.rep = false
        this.reoprtTableData = [];
        this.bj = false
        // this.ck = false
        this.report.roiTime = [];
        this.theme = '',
          this.photo = '',
          this.sign = ''
      },

      //点击新增营销活动
      add() {
        this.$router.push(
          {
            name: 'AddSell'
          }
        )
        this.none = false
        this.id = ''
        this.photo = ''
      },
      // 创建主题和测试短信关闭
      close() {
        this.dialogVisible = false;
        this.csdialogVisible = false;
        this.smsdialogVisible = false;
        this.childdialogVisible = false;
      },


      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getList(this.currentPage, this.pageSize, this.shopId)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList(this.currentPage, this.pageSize, this.shopId)
      },
      // 选择全部，活动或者快照名称
      a(command) {
        this.select = command.name
        console.log(this.select)
        if (this.select == '全部名称') {
          this.photo = this.value3;
          this.actName = this.value3;
        }
        if (this.select == '人群名称') {
          this.photo = this.value3;
          this.actName = '';
        }
        if (this.select == '活动名称') {
          console.log(3)
          this.actName = this.value3;
          this.photo = '';
        }
      },
      //搜索的输入框输入事件
      c() {
        if (this.select == '全部名称') {
          this.photo = this.value3;
          this.actName = this.value3;
        }
        if (this.select == '人群名称') {
          this.photo = this.value3;
          this.actName = '';
        }
        if (this.select == '活动名称') {
          console.log(3)
          this.actName = this.value3;
          this.photo = '';
        }
      },
      // 更多的选项
      b(command) {
        if (command.name == '禁用') {
          this.stop(command.id)
        }
        if (command.name == '启用') {
          this.start(command.id, command.time)
        }
        if (command.name == '详细报告') {
          this.$router.push({
            name: 'Report',
            params: {
              id: command.id,
            }
          })
          // this.getReport(command.id)
          this.none = false;
          this.rep = true;
          this.report.theme = command.theme;
          this.report.actName = command.actName;
          this.report.roiTime[0] = command.roiBeginTime
          this.report.roiTime[1] = command.roiEndTime
          this.report.id = command.id
          this.report.createTime = command.createTime
          this.date = command.createTime
          console.log(this.report.createTime)
          console.log(new Date(this.report.createTime).getTime())
          // console.log(Date.now())
        }
        if (command.name == '短信内容') {
          this.smsdialogVisible = true;
          this.sms = command.sms
          console.log(command.sms)
        }
        if (command.name == '查看流程') {
          this.getChildren(command.id)
          this.childdialogVisible = true;
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;

  .theme {
    .empty {
      p {
        margin-top: 23px;
      }
    }

    .el-dialog {
      .el-textarea__inner {
        width: 100%;
        height: 100%;
        background: transparent;
        text-indent: 0;
      }

      .line {
        height: 40px;
        line-height: 40px;

        span {
          float: right;
        }

        .fail {
          color: red
        }

        .suc {
          color: green
        }

        .beg {
          color: #3366FF
        }

        .act {
          color: #ccc
        }
      }
    }

    .sms {
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      line-height: 22px;
    }

    .head {
      h1 {
        opacity: 0.87;
        font-size: 18px;
        color: #000;
        letter-spacing: 0;
        line-height: 42px;
        height: 42px;
        font-weight: bold;
        padding: 0 50px;

        span {
          border-left: 1px solid #ccc;
          padding: 0 20px
        }

        i {
          font-weight: bold;
          margin-right: 20px;
          cursor: pointer;
        }
      }

      .el-breadcrumb {
        line-height: 30px;
        margin-left: 50px;
        margin-right: 20px;
        font-size: 14px;
      }
    }

    .sels {
      background: #fff;
      padding: 10px 30px;
      margin: 0 20px 10px 20px;

      .form {
        .el-form-item__label {
          height: 30px;
        }

        .el-form-item {
          margin-bottom: 0;
        }
      }

      .drop {
        width: 286px;
        height: 32px;
        line-height: 30px;
        margin: 12px 0 12px 20px;
        border: 1px solid #ccc;
        box-sizing: border-box;

        .sel {
          width: 180px;

          .el-input__inner {
            border: none;
            height: 28px;
            ;
          }
        }

        .el-dropdown {

          border-right: 1px solid #ccc;
          padding: 0 10px;

          span {
            font-size: 14px
          }

          .el-dropdown-menu__item {
            width: 100px
          }
        }

      }

      .el-date-editor {
        margin: 12px 0 12px 20px;
        height: 32px;
        line-height: 32px;
        border-radius: 0;

        .el-range-separator {
          line-height: 32px;
          height: 32px;
        }

      }


    }

    .box {
      margin: 0 20px 20px 20px;
      background: #FFFFFF;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
      border-radius: 2px;
      position: relative;



      .btns {

        .add {
          margin: 12px 0 12px 30px;
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
              // width:100px;
              font-size: 12px;
              color: #333333;
              letter-spacing: 0;
              line-height: 18px;

              .el-dropdown {
                font-size: 12px;
                color: #3366FF;
                letter-spacing: 0;
                line-height: 18px;
              }

              .el-button {
                font-size: 12px;
                color: #3366FF;
                letter-spacing: 0;
                line-height: 12px;
              }
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
          text-align: center
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
  }
</style>