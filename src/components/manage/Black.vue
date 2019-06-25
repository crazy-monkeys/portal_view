<template>
  <div class="black">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>黑名单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>黑名单管理</h1>
    </div>
    <div class="box">
      <div class="btns">
        <el-button @click="add">
          <i class="el-icon-plus"></i> 创建黑名单
        </el-button>
        <el-button @click="uploadAdd">
          <i class="el-icon-upload2"></i> 批量上传黑名单
        </el-button>
        <el-button @click="passAdd">
          <i class="el-icon-upload2"></i>导入通道商黑名单
        </el-button>
        <el-input v-model="selPhone" class="sel" placeholder="请输入手机号码" @keyup.enter.native="search">
          <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
        </el-input>
        <el-input v-model="selEmail" class="sel" placeholder="请输入邮箱" @keyup.enter.native="search">
          <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
        </el-input>
      </div>
      <div class="tab">
        <el-table :data="tableData" style="width: 100%" height="700">
          <el-table-column type="index" label="编号" :index="q" width="100"></el-table-column>
          <el-table-column prop="blackListId" label="ID" v-if="false"></el-table-column>
          <el-table-column prop="mobile" label="手机号码" show-overflow-tooltip></el-table-column>
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
          <el-table-column prop label="屏蔽渠道" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{tableData[scope.$index].marketingChannel=='s,w' ? '全部' :tableData[scope.$index].marketingChannel=='s' ? 'SMS' :'EDM'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="屏蔽日期" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{formatDate(new Date(tableData[scope.$index].createTime))}}</span>
            </template>
          </el-table-column>
          <el-table-column prop label="来源" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="tableData[scope.$index].sourceType=='file'">人工上传</span>
              <span v-if="tableData[scope.$index].sourceType=='page'">人工上传</span>
              <span v-if="tableData[scope.$index].sourceType=='channel'">通道商导入</span>
              <span v-if='!tableData[scope.$index].sourceType'>未知</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text">删除</el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt width="140" height="140">
            </div>
            <p :style="{'marginTop': '23px'}">未查询到黑名单</p>
          </div>
        </el-table>
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
    </div>
    <div class="bottom">按住 [shift] 键，可横向滚动表格哦</div>

    <!-- 创建黑名单控件 -->
    <el-dialog
      title="创建黑名单"
      :visible.sync="dialogVisible"
      width="20%"
      :before-close="qx"
      :close-on-click-modal="false"
    >
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="blackForm"
        ref="blackForm"
        :rules="rules"
      >
        <el-form-item label="屏蔽渠道" prop="arr">
          <el-select v-model="blackForm.arr">
            <el-option v-for="item in arr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" v-if="phoneDialogVisible" prop="phone">
          <el-input v-model="blackForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" v-if="emailDialogVisible" prop="email">
          <el-input v-model="blackForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx">取消</el-button>
        <el-button type="primary" @click="submitForm('blackForm',0)">提交</el-button>
      </span>
    </el-dialog>

    <!-- //通道导入 -->
    <el-dialog
      title="导入通道商黑名单"
      :visible.sync="passDialogVisible"
      width="20%"
      :before-close="qx"
      :close-on-click-modal="false"
    >
      <P v-if="passOk==0">确定要导入所有通道商黑名单吗？</P>
      <div v-if="passOk==2">
        <p style="text-align:center">导入中...</p>
      </div>
      <p v-if="passOk==1">
        已成功导入
        <span style="color: #3366FF;">{{successNum}}</span> 人
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="passOk==0" @click="qx">取消</el-button>
        <el-button v-if="passOk==0" type="primary" @click="pass">导入</el-button>
        <el-button v-if="passOk==1" type="primary" @click="qx">完成</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="上传详情"
      :visible.sync="sucDialogVisible"
      width="20%"
      :before-close="qx"
      :close-on-click-modal="false"
    >
      <p v-if="uploadNum || uploadNum===0">
        已成功上传
        <span style="color: #3366FF;">{{uploadNum}}</span> 人， 失败
        <span style="color: #3366FF;">{{totalNum - uploadNum}}</span> 人
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="qx">完成</el-button>
      </span>
    </el-dialog>
    <!-- //批量上传 -->
    <el-dialog
      title="批量上传黑名单"
      :visible.sync="uploadDialogVisible"
      width="20%"
      :before-close="qx"
      :close-on-click-modal="false"
    >
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="blackForm"
        ref="blackForm"
        :rules="rules"
      >
        <p class="danger">
          <i class="el-icon-warning" style="color: #3366FF"></i> 若数量超10万建议分多个文件分批上传
        </p>

        <el-form-item label="屏蔽渠道" prop="arr">
          <el-select v-model="blackForm.arr">
            <el-option v-for="item in arr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label prop>
          <p>
            请按照模版录入信息
            <a
              href="static/blackList.xlsx"
              download
              style="color:#3366FF;margin:0 20px"
            >下载模板</a>
            <!-- <el-button type="text" @click="download">下载模板</el-button> -->
            <!-- <span style="color:red">#先下载模版, 根据模版规范填写模版内容</span> -->
          </p>
          <!-- http://10.11.107.90:8080/crm-branch/custMarketing/uploadFile -->
          <el-upload
            :multiple="false"
            class="upload-demo"
            ref="upload"
            :action="''"
            :http-request="httpReq1"
            :on-remove="handleRemove"
            :on-progress="handleprogress"
            :on-exceed="handleOver"
            :file-list="fileList"
            :on-change="changeFile"
            :limit="1"
            name="myfiles"
            :with-credentials="true"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选泽文件</el-button>
            <!-- <el-button
                  style="margin-left: 10px;"
                  size="small"
                  type="success"
                  @click="submitUpload"
            >上传</el-button>-->
          </el-upload>
          <el-progress :percentage="per" v-if="per!=0"></el-progress>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx">取消</el-button>
        <el-button type="primary" @click="submitForm('blackForm',1)" :disabled="dis">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";

export default {
  name: "black",
  data() {
    return {
      rules: {
        arr: [{ required: true, message: "请选择屏蔽渠道", trigger: "change" }],
        phone: [
          { required: true, trigger: "blur", validator: formTest.phoneTest }
        ],
        email: [
          { required: true, trigger: "blur", validator: formTest.emailTest }
        ]
      },
      per: 0,
      dis: false,
      passOk: 0,
      uploadNum: "",
      totalNum: "",
      successNum: "",
      failNum: "",
      //屏蔽类型列表
      arr: [
        { name: "全部", id: 1 },
        { name: "SMS", id: 2 },
        { name: "EDM", id: 3 }
      ],
      labelPosition: "top",
      blackForm: {
        phone: "",
        email: "",
        arr: ""
      },
      //搜索条件
      selPhone: "",
      selEmail: "",
      selStr: "",
      sucDialogVisible: false,
      passDialogVisible: false,

      dialogVisible: false,
      phoneDialogVisible: false,
      emailDialogVisible: false,
      uploadDialogVisible: false,
      tableData: [],
      //默认页
      currentPage: 1,
      //默认数量
      pageSize: 10,
      //默认总页数
      total: 0,
      //用户店铺列表
      shopList: [
        {
          shop_info_id: ""
        }
      ],
      fileList: []
    };
  },
  created() {
    // this.getShopList();
               this.getBlack(
              this.currentPage,
              this.pageSize,
              this.shopId
            );
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    }
  },
  watch: {
      shopId:{
        handler:function(n,o){
          if(n!=o){
            console.log(1111111111111)
              this.getBlack(this.currentPage,this.pageSize,this.shopId);
          }
        }
      },
    "blackForm.arr": {
      handler: function(n, o) {
        console.log(n, o);
        if (n !== o) {
          if (n == 1) {
            this.phoneDialogVisible = true;
            this.emailDialogVisible = true;
          } else if (n == 2) {
            this.emailDialogVisible = false;
            this.blackForm.email = "";
            this.phoneDialogVisible = true;
          } else {
            this.emailDialogVisible = true;
            this.blackForm.phone = "";

            this.phoneDialogVisible = false;
          }
        }
      }
    }
  },
  methods: {
    formatDate(now) {
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      return (
        year +
        "-" +
        (month >= 10 ? month : "0" + month) +
        "-" +
        (date >= 10 ? date : "0" + date) +
        " " +
        (hour >= 10 ? hour : "0" + hour) +
        ":" +
        (minute >= 10 ? minute : "0" + minute)
      );
    },
    submitForm(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (type == 0) {
            this.commit();
          }
          if (type == 1) {
            this.submitUpload();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitUpload() {
      console.log(this.fileList);
      if (this.fileList.length == 0) {
        this.$message({
          type: "error",
          message: "请选择模板"
        });
      } else {
        this.dis = true;
        this.$message({
          type: "info",
          message: "正在上传,请稍候"
        });
        this.$refs.upload.submit();
      }
    },
    changeFile(file, fileList) {
      // console.log(file)
      this.fileList = fileList;
      this.file = file;
      // console.log(this.file)
    },
    handleOver(file, fileList) {
      console.log(file, fileList);
      this.$message({
        type: "error",
        message: "只能选择一个模板"
      });
    },
    handleprogress(event, file, fileList) {
      console.log(event, file);
      this.per = file.progress;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.uploadNum = "";
    },
    httpReq1(val) {
      console.log(val);
      var _file = val.file;
      var formData = new FormData();
      formData.append("excel", _file);
      formData.append("shopInfoId", this.shopId);
      if (this.blackForm.arr) {
        formData.append(
          "channelType",
          this.blackForm.arr == 1
            ? "all"
            : this.blackForm.arr == 2
            ? "sms"
            : "edm"
        );
      }
      this.$http
        .post("" + process.env.API_ROOT + "/blacklists/file/import", formData, {
          progress: function(event) {
            val.file.percent = (event.loaded / event.total) * 100;
            val.file.onProgress(val.file);
          }
        })
        .then(res => {
          console.log("上传结果", res);
          if (res.data.code == 1) {
            this.fileList = [val.file];
            this.uploadNum = res.data.data.successNum;
            this.totalNum = res.data.data.totalNum;
            this.uploadDialogVisible = false;
            this.sucDialogVisible = true;
            this.dis = false;
            this.$message({
              type: "success",
              message: "上传成功"
            });
            this.getBlack(
              this.currentPage,
              this.pageSize,
              this.shopId
            );
          } else {
            this.fileList = [];
            this.dis = false;
            this.code(res.data.code);
          }
        })
        .catch(error => {
          console.log(error);
          this.dis = false;
          this.fileList = [];
          alert("系统异常");
        });
    },

    search() {
      this.getBlack(1, this.pageSize, this.shopId);
      this.currentPage = 1;
    },
    resetForm(formName) {
      if(this.$refs[formName]){
      if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
      }else{
        this.$nextTick(()=>{
          this.$refs[formName].resetFields();
        })
      }
      }
    },
    qx() {
      this.resetForm("blackForm");
      this.fileList = [];

      this.dialogVisible = false;
      this.emailDialogVisible = false;
      this.phoneDialogVisible = false;
      this.passDialogVisible = false;
      this.uploadDialogVisible = false;
      this.sucDialogVisible = false;
      this.uploadNum = "";
      this.passOk = 0;

      this.clear();
    },
    clear() {
      this.blackForm.phone = "";
      this.blackForm.email = "";
      this.blackForm.arr = "";
    },
    //获取用户店铺列表
    getShopList() {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/getCurentUserShopList"
      })
        .then(res => {
          console.log("res", res);
          if (res.data.code == 1) {
            this.shopList = res.data.data;
 
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    //获取黑名单列表
    getBlack(pageIndex, pageSize, shopid) {
      console.log(shopid)
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/blacklists?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize +
          "&shopInfoId=" +
          shopid +
          "&mobile=" +
          this.selPhone +
          "&email=" +
          this.selEmail
      })
        .then(res => {
          // console.log("黑名单列表", res.data.data.list);
          if (res.data.code == 1) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          }else{
            this.tableData=[];
            this.total =0
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    uploadAdd() {
      this.uploadDialogVisible = true;
    },
    passAdd() {
      this.passDialogVisible = true;
    },
    //显示创建主题框
    add() {
      this.dialogVisible = true;
      this.emailDialogVisible = false;
      this.phoneDialogVisible = false;
    },
    deleteRow(index, rows) {
      this.$confirm("确定要删除该黑名单吗?", "删除", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$http
            .post("" + process.env.API_ROOT + "/blacklists/del", {
              blacklistId: rows[index].blackListId
            })
            .then(res => {
              console.log(res);
              if (res.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "删除黑名单成功"
                });
                this.getBlack(
                  this.currentPage,
                  this.pageSize,
                  this.shopId
                );
              } else {
                this.code(res.data.code);
              }
            })
            .catch(err => {
              console.log(err);
              alert("网络异常");
            });
        })
        .catch(action => {
          this.$message({
            type: "fail",
            message: "已取消操作"
          });
        });
    },
    code(code) {
      switch (code) {
        case 35000:
          this.$message({
            type: "error",
            message: "参数对象不能为空"
          });
          break;
        case 35001:
          this.$message({
            type: "error",
            message: "店铺信息不能为空"
          });
          break;
        case 35002:
          this.$message({
            type: "error",
            message: "手机号码不能为空"
          });
          break;
        case 35003:
          this.$message({
            type: "error",
            message: "邮箱地址不能为空"
          });
          break;
        case 35004:
          this.$message({
            type: "error",
            message: "请输入正确的手机号码"
          });
          break;
        case 35005:
          this.$message({
            type: "error",
            message: "请输入正确的邮箱地址"
          });
          break;
        case 35006:
          this.$message({
            type: "error",
            message: "请输入需要删除的黑名单ID"
          });
          break;
        case 35007:
          this.$message({
            type: "error",
            message: "未找到对应黑名单记录"
          });
          break;
        case 35008:
          this.$message({
            type: "error",
            message: "已经存在黑名单记录"
          });
          break;
        case 35009:
          this.$message({
            type: "error",
            message: "请输入合法参数"
          });
          break;
        case 90001:
          this.$message({
            type: "error",
            message: "请上传.xls或.xlsx类型文档"
          });
          break;
        case 90002:
          this.$message({
            type: "error",
            message: "请选择需要上传的文件"
          });
          break;
        case 90003:
          this.$message({
            type: "error",
            message: "请输入模版头部名称"
          });
          break;
      }
    },
    pass() {
      this.passOk = 2;
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/blacklists/channel/import?shopInfoId=" +
          this.shopId
      })
        .then(res => {
          console.log("通道导入", res);
          if (res.data.code == 1) {
            this.successNum = res.data.data;
            this.passOk = 1;
            this.getBlack(
              this.currentPage,
              this.pageSize,
              this.shopId
            );
            
          } else {
            this.code(res.data.code);
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    commit() {
      this.$http
        .post("" + process.env.API_ROOT + "/blacklists", {
          mobile: this.blackForm.phone,
          email: this.blackForm.email,
          channelType:
            this.blackForm.arr == 1
              ? "all"
              : this.blackForm.arr == 2
              ? "sms"
              : "edm",
          shopInfoId: this.shopId
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: "新增黑名单成功"
            });
            this.getBlack(
              this.currentPage,
              this.pageSize,
              this.shopId
            );
            this.qx();
          } else {
            this.code(res.data.code);
          }
          this.qx();
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });

      this.dialogVisible = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getBlack(
        this.currentPage,
        this.pageSize,
        this.shopId
      );
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getBlack(
        this.currentPage,
        this.pageSize,
        this.shopId
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.black {
  .head {
    h1 {
      opacity: 0.87;
      font-family: PingFangSC-Medium;
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
    position: relative;
    margin: 0 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    .btns {
      .el-icon-plus,
      .el-icon-upload2 {
        margin-right: 10px;
        font-weight: bold;
      }
      .sel {
        width: 200px;
        float: right;
        line-height: 32px;
        height: 32px;
        margin: 12px 40px 0 0;
        .el-input__inner {
          border-radius: 0;
          height: 32px;
          line-height: 32px;
        }
        .el-input__icon {
          line-height: 32px;
        }
      }
      .el-button {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        background: #3366ff;
        border-radius: 2px;
        height: 32px;
        // line-height: 10px;
        padding: 0 20px;
        border: none;
        margin: 12px 0 12px 20px;
        span {
          line-height: 32px;
        }
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
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
          }
          .el-button {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #3366ff;
            letter-spacing: 0;
            line-height: 12px;
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
  .bottom {
    text-align: center;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    line-height: 16px;
  }
  .danger {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }
}
</style>
