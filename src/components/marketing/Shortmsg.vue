<template>
  <div class="shortMsg">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/home/sell">客户管理</el-breadcrumb-item>
          <el-breadcrumb-item >拜访记录上传</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>拜访记录上传</h1>
        
      </div>
      <div class="box">
        <div class="btns clear">
          <!-- 新建按钮 -->
          <el-button @click="add" class="add" size='small' type='primary'>新建</el-button>

          <el-button class="sec" @click="search" plain size='small' type='primary'>搜索</el-button>

          <!-- 下拉列表 选择活动  -->
          <div class="drop">
            <!-- <el-dropdown trigger="click" @command='a'> -->
            <span class="el-dropdown-link">{{select}}</span>
            <!-- <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='{name:"全部名称",value:"1"}'>全部名称</el-dropdown-item>
                <el-dropdown-item :command='{name:"活动名称",value:"2"}'>活动名称</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>-->
            <el-input v-model="value3" class="sel" @change="c"></el-input>
          </div>
          <!-- 日期选择 -->
          <el-date-picker
            v-model="value4"
            prefix-icon="el-icon-fire"
            @change="selTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="700" @row-click="rowClick">
            <el-table-column type="index" :index='q' width='100' label="编号"></el-table-column>

            <el-table-column prop="themeName" show-overflow-tooltip label="主题名称"></el-table-column>
            <el-table-column prop="activityName" label="活动名称" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column
              prop="snapshotName"
              label="人群名称"
              show-overflow-tooltip
              :render-header="renderHeader1"
              >
            </el-table-column>
            -->
            <el-table-column prop="createTime" show-overflow-tooltip label="发送时间"></el-table-column>
            <el-table-column
              prop="requestNum"
              label="发送人数"
              show-overflow-tooltip
              :render-header="renderHeader2"
            ></el-table-column>
            <el-table-column show-overflow-tooltip prop="sendPartitionNum" label="发送总量"></el-table-column>
            <el-table-column show-overflow-tooltip prop="successPartitionNum" label="成功发送总量"></el-table-column>
            <el-table-column show-overflow-tooltip prop="executeStatus" label="发送状态" width="80">
              <template slot-scope="scope">
                <span v-if="tableData[scope.$index].executeStatus==-1">禁用</span>
                <span v-if="tableData[scope.$index].executeStatus==0">未开始</span>
                <span v-if="tableData[scope.$index].executeStatus==1">执行中</span>
                <span v-if="tableData[scope.$index].executeStatus==2">执行完成</span>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="roi"
              show-overflow-tooltip
              label="ROI"
              >
            </el-table-column>-->
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="edit(scope.$index, tableData)"
                  type="text"
                  v-if="tableData[scope.$index].executeStatus == 0 || tableData[scope.$index].executeStatus == -1"
                >编辑</el-button>
                <el-button
                  @click.native.prevent="check(scope.$index, tableData)"
                  type="text"
                  v-if="tableData[scope.$index].executeStatus != 0 && tableData[scope.$index].executeStatus != -1"
                >查看</el-button>
                <!-- <el-button
                  @click.native.prevent="check(scope.$index, tableData)"
                  type="text"
                  >
                  查看
                </el-button>-->
                <el-dropdown trigger="click" @command="b">
                  <span class="el-dropdown-link">
                    更多
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      :command="{name:'启用',id:tableData[scope.$index].marketingActivityId,time:tableData[scope.$index].createTime}"
                      v-if="tableData[scope.$index].executeStatus == -1"
                    >启用</el-dropdown-item>
                    <el-dropdown-item
                      v-if="tableData[scope.$index].executeStatus == 0"
                      :command="{name:'禁用',id:tableData[scope.$index].marketingActivityId}"
                    >禁用</el-dropdown-item>
                    <!-- <el-dropdown-item :command="{name:'查看流程',id:tableData[scope.$index].marketingActivityId}">查看流程</el-dropdown-item> -->
                    <el-dropdown-item
                      :command="{name:'短信内容',id:tableData[scope.$index].marketingActivityId,sms:tableData[scope.$index].marketingContent+ ' 退订回TD'}"
                    >短信内容</el-dropdown-item>
                    <el-dropdown-item
                      v-if="tableData[scope.$index].executeStatus == 2"
                      :command="{name:'详细报告',id:tableData[scope.$index].marketingActivityId,theme:tableData[scope.$index].themeName,actName:tableData[scope.$index].activityName,roiBeginTime:tableData[scope.$index].roiBeginTime,roiEndTime:tableData[scope.$index].roiEndTime,createTime:tableData[scope.$index].createTime}"
                    >详细报告</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
            <div slot="empty">
              <div>
                <img src="../../assets/img/none.png" alt width='140' height="140">
              </div>
              <p >未查询到上传记录</p>
            </div>
          </el-table>
        </div>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 100]"
            :page-size="10"
            layout="sizes,total, jumper, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    <!-- 短信内容控件 -->
    <el-dialog
      title="短信内容"
      :visible.sync="smsdialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false"
    >
      <p class="sms">{{sms}}</p>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="smsdialogVisible = false">取消</el-button> -->
        <el-button type="primary" @click="smsdialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
export default {
  name: "shortmsg",
  data() {
    return {
      sms:'',
      id: "",
      actName: "",
      //数据的个数
      total: 0,
      //列表页搜索框数据
      value3: "",
      select: "搜索条件",
      //列表页的时间选择
      value4: "",
      //短信内容 显示否
      smsdialogVisible: false,
      //营销活动列表数据
      tableData: [],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 10,
      //店铺列表
      shopList: [],
      fob: false,
      fileList: [],
      file: {},
      sendCount:0,
    };
  },
  created() {
            this.getList(
              this.currentPage,
              this.pageSize,
              this.shopId
            );
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    },
  },
  watch: {
    shopId:{
      handler:function(n,o){
        if(n!=o){
            this.getList(this.currentPage,this.pageSize,this.shopId)
        }
      }
    },
    "ruleForm.textarea": {
      handler: function(n, o) {
        // console.log(n)
        if(n!=o){
          //计算字数
          this.num = this.ruleForm.textarea.length;
          if(this.num>300){
            this.ruleForm.textarea = this.ruleForm.textarea.substring(0,300)
          }
          if(this.num>300){
            this.ruleForm.textarea = this.ruleForm.textarea.substring(0,300)
          }
          if(this.num==0){
            this.sendCount = 0
          }
          if(this.num>0 && this.num<68){
            this.sendCount = 1
          }
          if(this.num>67 && this.num<135){
            this.sendCount = 2
          }
          if(this.num>134 && this.num<202){
            this.sendCount = 3
          }
          if(this.num>201 && this.num<269){
            this.sendCount = 4
          }
          if(this.num>268){
            this.sendCount = 5
          }
          //所有的标签集合便利
          this.group.forEach((item,index)=>{
            // 如果 找到 就添加
            if(this.ruleForm.textarea.indexOf('<'+item.name+'>') !=-1){
              if(this.checkboxGroup.indexOf(item.name)==-1){
                this.checkboxGroup.push(item.name)
              }
              console.log(1)
              console.log(this.checkboxGroup)
            }
            else{ //如果没找到
               if(this.checkboxGroup.indexOf(item.name)!=-1){
                this.checkboxGroup.splice(this.checkboxGroup.indexOf(item.name),1)
              }
            }
          })
        }
      }
    },
    'ruleForm.radio2':{
      handler:function(n,o){
        if(n!=o){
          if(n==0){
            this.ruleForm.time1 = ''
            if(this.ruleForm.roiTime){
              if(new Date().getTime() > new Date(this.ruleForm.roiTime[0]).getTime()){
                this.$message({
                  type:'error',
                  message:'roi开始时间早于活动开始时间'
                })
                console.log('radio2')
              }else{
              }
            }
              
          }
        }
      }
    },
    'ruleForm.radio3':{
      handler:function(n,o){
        if(n!=o){
          if(n==0){
            this.ruleForm.time2 = []
          }
        }
      }
    },
    
  },
  methods: {
        // 创建主题和测试短信关闭
    close() {
      this.smsdialogVisible = false;
    },
    selTime() {
      this.value4 = this.value4 ? this.value4 : [];
      console.log(this.value4);
    },
    q(index){
     return this.pageSize * (this.currentPage-1) + index +1
    },
    //查看按钮
    check(index, rows) {
      this.$router.push(
        {
          name:'ShortmsgDetails',
          params:{id:rows[index].marketingActivityId}
        }
      )
    },
    //编辑按钮
    edit(index, rows) {
      this.$router.push(
        {
          name:'ShortmsgEdit',
          params:{id:rows[index].marketingActivityId}
        }
      )
   
    },
    rowClick(row, event, column) {
      console.log(row);
      this.id = row.marketingActivityId;
    },

    // 启用按钮
    start(activityId,time) {
      if(new Date(time).getTime() > new Date().getTime()){
      this.$confirm("请确认该活动是否要进行短信发送", "启用", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$http({
            method: "get",
            url:
              "" +
              process.env.API_ROOT +
              "/marketing/activity/recovery" +
              "?activityId=" +
              activityId
          })
            .then(res => {
              console.log("启用", res);
              if (res.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "启用成功"
                });
                this.getList(
                  this.currentPage,
                  this.pageSize,
                  this.shopId
                );
              }
            })
            .catch(error => {
              console.log(error);
              alert("登入失败");
            });
        })
        .catch(action => {
          this.$message({
            type: "fail",
            message: "已取消操作"
          });
        });
         }else{
        this.$message({
          type:'error',
          message:'该活动执行时间已超出当前时间！'
        })
      }
    },
    //禁用按钮
    stop(activityId) {
      this.$confirm("请确认活动是否取消短信发送", "禁用", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$http({
            method: "get",
            url:
              "" +
              process.env.API_ROOT +
              "/marketing/activity/cancel" +
              "?activityId=" +
              activityId
          })
            .then(res => {
              console.log("禁用", res);
              if (res.data.code === 1) {
                this.getList(
                  this.currentPage,
                  this.pageSize,
                  this.shopId
                );
                this.$message({
                  type: "success",
                  message: "禁用成功"
                });
              }
            })
            .catch(error => {
              console.log(error);
              alert("登入失败");
            });
        })
        .catch(action => {
          this.$message({
            type: "fail",
            message: "已取消操作"
          });
        });
    },
    //搜索事件
    search() {
      this.getList(
        this.currentPage,
        this.pageSize,
        this.shopId
      );
    },
    getList(currentPage, pageSize, shopid) {
      var data = {
        pageIndex: currentPage,
        pageSize: pageSize,
        startTime: this.value4 ? this.value4[0] : "",
        endTime: this.value4 ? this.value4[1] : "",
        activityName: this.actName,
        shopName: "",
        shopInfoId: shopid
      };

      this.$http
        .get(
          "" +
            process.env.API_ROOT +
            "/marketing/custom/activities?" +
            this.toQueryString(data)
        )
        .then(res => {
          console.log("营销活动列表", res);
          if (res.data.code == 1) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },


    //提示1
    renderHeader1(h, { column }) {
      // h即为cerateElement的简写，具体可看vue官方文档
      return h("span", {}, [h("span", column.label), h("eg1")]);
    },
    // 提示2
    renderHeader2(h, { column }) {
      // h即为cerateElement的简写，具体可看vue官方文档
      return h("span", {}, [h("span", column.label), h("eg2")]);
    },

    //点击新增营销活动
    add() {
      this.$router.push(
        {
          name:'ShortmsgAdd'
        }
      )
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList(
        this.currentPage,
        this.pageSize,
        this.shopId
      );
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList(
        this.currentPage,
        this.pageSize,
        this.shopId
      );
    },
    //搜索的输入框输入事件
    c() {
      // if(this.select=='全部名称'){
      //   this.actName = this.value3;
      // }
      if (this.select == "活动名称") {
        this.actName = this.value3;
      }
    },
    // 更多的选项
    b(command) {
      if (command.name == "禁用") {
        this.stop(command.id);
      }
      if (command.name == "启用") {
        this.start(command.id,command.time);
      }
      if (command.name == "详细报告") {
        this.$router.push({
          name:'ShortmsgReport',
          params:{
            id:command.id
          }
        })
        // console.log(Date.now())
      }
      if (command.name == "短信内容") {
        this.smsdialogVisible = true;
        this.sms = command.sms;
        console.log(command.sms);
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.shortMsg {
  .empty{
    p{
      margin-top: 23px;
    }
  }
  .shop {
    position: absolute;
    top: -4px;
    left: 10px;
  }
  .td {
    position: absolute;
    bottom: 80px;
    right: 10px;
  }
  #text {
    text-indent: 130px;
    height:400px;
    width:450px;
    top:0;
    left:0;
    line-height: 30px;
    padding:0 10px;
    color: #333;
    box-sizing:border-box;
  }
     
 
  .el-tag {
    text-indent: 0;
  }
  .el-textarea__inner {
    width: 450px;
    height: 400px;
    background: transparent;
    text-indent:130px;
    line-height: 26px
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
        color: red;
      }
      .suc {
        color: green;
      }
      .beg {
        color: #3366ff;
      }
      .act {
        color: #ccc;
      }
    }
  }
  .danger {
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }
  .sms {
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    line-height: 22px;
  }
  .report {
    .btns {
      padding: 0 20px;
      height: 48px;
      margin: 0 20px;
      line-height: 48px;
      background: #fff;
      padding: 0 20px;
      span {
        margin: 0 20px;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
      }
      .el-date-editor {
        float: right;
        margin-top: 4px;
        margin-right: 20px;
      }
      .el-button {
        float: right;
        margin-top: 4px;
        span {
          color: #3366ff;
        }
      }
    }
    .tab {
      margin: 0 20px 20px 20px;
      background: #ffffff;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
      border-radius: 2px;

      position: relative;
    }
    .roi {
      height: 152px;
      background: #fff;
      margin: 0 20px 20px 20px;
      padding: 0 20px;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
      div {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #3366ff;
        letter-spacing: 0;
        line-height: 50px;
        .el-progress {
          display: inline-block;
          width: 50%;
          margin-right: 20px;
          line-height: 50px;
          .el-progress-bar__outer {
            border-radius: 0;
            background: none;
          }
          .el-progress-bar__inner {
            border-radius: 0;
          }
        }
        span {
          width: 100px;
          display: inline-block;
          font-size: 12px;
          color: #aaa;
          line-height: 40px;
          letter-spacing: 1px;
        }
        b {
          display: inline-block;
          height: 20px;
          background: #3366ff;
          // width: 50%;
          margin-right: 20px;
        }
      }
      div:first-child {
        font-size: 14px;
        color: #333333;
        line-height: 50px;
        span {
          font-size: 16px;
          color: #333333;
          letter-spacing: 0.5px;
          line-height: 16px;
        }
      }
    }
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
        padding: 0 20px;
      }
      i {
        font-weight: bold;
        margin-right: 20px;
        cursor: pointer;
      }
    }

    .el-breadcrumb {
      line-height: 30px;
      margin-right: 20px;
      margin-left: 50px;
    }
  }
  .form {
    h2 {
      font-size: 16px;
      color: #333333;
      letter-spacing: 0.5px;
      line-height: 16px;
      font-weight: bold;
      padding: 20px 0;
    }
    .baseMsg {
      margin: 0 20px;
      background: #fff;
      padding: 0 30px 5px;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
      .el-select {
        width: 50%;
      }
      .name {
        width: 50%;
      }
      .actName {
        width: 50%;
      }
      .creatTheme {
        border: 1px solid #3366ff;
        border-radius: 2px;
        color: #3366ff;
      }
    }
    .kz {
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
      margin: 10px 20px;
      background: #fff;
      padding: 0 30px 2px;
      .el-select {
        width: 50%;
      }
    }
    .mb {
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
      margin: 10px 20px;
      background: #fff;
      padding: 0 30px 2px;
      .el-select {
        width: 50%;
      }
       .msgBox{
        height:350px;
        background:#fff;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
        position:relative;
        width:225px;
        margin-top: -15px;
        overflow-y:auto;
        .msg{
      background:#ccc;
      width:180px;
      margin: 0  10px 10px 10px;
      font-size: 10px;
      color: #666666;
      line-height:20px;
      min-height: 20px;
      position:absolute;
      overflow-y: auto;
      top:20px;
      left:10px;
      border-radius:  5px  5px  5px 0;
      padding:5px 5px 5px 5px;
      word-break:break-all;
    }
       }
    }
    .sub {
      .el-form-item__content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .box {
    margin: 0 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    position: relative;

    .btns {
      .add {
        margin: 12px 0 12px 20px;
      }
      .drop {
        float: right;
        width: 286px;
        height: 32px;
        line-height: 30px;
        margin: 12px 0 12px 20px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        .el-dropdown-link {
          display: inline-block;
          height: 30px;
          border-right: 1px solid #ccc;

          padding: 0 10px;
          line-height: 30px;
        }
        .sel {
          width: 180px;
          .el-input__inner {
            border: none;
            height: 28px;
          }
        }
        .el-dropdown {
          float: left;

          .el-dropdown-menu__item {
            width: 100px;
          }
        }
      }
      .el-date-editor {
        float: right;
        margin: 12px 0 12px 20px;
        height: 32px;
        line-height: 32px;
        border-radius: 0;
        .el-range-separator {
          line-height: 32px;
          height: 32px;
        }
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
            // width:100px;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
            .el-dropdown {
              font-size: 12px;
              color: #3366ff;
              letter-spacing: 0;
              line-height: 18px;
            }
            .el-button {
              font-size: 12px;
              color: #3366ff;
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
      .el-pagination{
        width: 100%;
        text-align: center
      }
      
    }
      
  }
  .bottom{
      text-align: center;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
      line-height: 16px;
    }
  .look {
     
      .head{
        height: 72px;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        padding: 0 30px;
        color: #333333;
        letter-spacing: 0.5px;
        line-height: 72px;
           
    h1{
        opacity: 0.87;
        font-size: 18px;
        color: #000;
        letter-spacing: 0;
        line-height: 36px;
        height: 42px;
        font-weight: bold;
        padding: 0 ;
        span{
          border-left: 1px solid #ccc;
          padding: 0 20px
        }
        i{
          font-weight: bold;
          margin-right: 20px;
          cursor: pointer;
        }
      }
      
    .el-breadcrumb{
      line-height: 30px;
      margin-left: 0px;
      margin-right: 20px
    }
      }
    .box {
      padding-bottom: 30px;
      h2 {
        font-size: 14px;
        color: #333333;
        font-size: 14px;
        height: 50px;
        line-height: 50px;
      }
      background: #ffffff;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);

      .baseMsg {
        border-bottom: 1px solid #ccc;
        margin: 0 30px;
        color: #333333;
        padding-bottom: 20px;
        letter-spacing: 0.5px;
        div {
          height: 30px;
          line-height: 30px;
          span {
            font-size: 12px;
            color: #999999;
            line-height: 12px;
            margin-right: 20px;
          }
        }
      }
      .condition {
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
        margin: 0 30px;
        color: #333333;
        letter-spacing: 0.5px;
        div {
          height: 30px;
          line-height: 30px;
          span {
            font-size: 12px;
            color: #999999;
            line-height: 12px;
            margin-right: 20px;
          }
        }
      }
      .mb {
        border-bottom: 1px solid #ccc;
        margin: 0 30px;
        padding-bottom: 20px;
        color: #333333;
        letter-spacing: 0.5px;
        div {
          height: 30px;
          line-height: 30px;
          span {
            font-size: 12px;
            color: #999999;
            line-height: 12px;
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
