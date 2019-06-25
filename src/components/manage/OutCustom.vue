<template>
  <div class="outCustom">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>外部客户导入</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>  外部客户导入</h1>
    </div>
    <div class="box">
      <div class="btns">
        <el-button @click="add" > <i class="el-icon-plus" style="margin-right:10px;font-weight:bold"></i>批量导入客户</el-button>
        
        <el-input
          v-model="selStr"
          class="sel"
          placeholder="在当前位置搜索外客名称"
          @keyup.enter.native="search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
        </el-input>
        <div class="selTime">
          <span></span> 
          <el-date-picker
            @change='changeSelTime'
            prefix-icon='el-icon-date'
            v-model="selTime"
            type="datetimerange"
            format='yyyy-MM-dd HH:mm:ss'
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator='-'
            start-placeholder="创建开始时间"
            end-placeholder="创建结束时间"
            >
          </el-date-picker>
        </div>
        
      </div>
      <div class="tab">
        <el-table :data="tableData" style="width: 100%" height="700" @row-click='rowClick'>
          <el-table-column type="index" label="编号" :index="q" width="100"></el-table-column>
          <el-table-column prop="recordId" label="ID" v-if="false"></el-table-column>
          <el-table-column prop="shopInfoId" label="shopId" v-if="false"></el-table-column>
          <el-table-column prop="templateId" label="templateId" v-if="false"></el-table-column>
          <el-table-column prop="externalCustomerName" label="外部客户名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="importNum" label="导入人数" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{formatDate(new Date(tableData[scope.$index].createTime))}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
            <el-dropdown trigger="click" @command='a'>
              <span class="el-dropdown-link">
                生成快照<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='{name:"生成手机快照",value:"SMS"}' >生成手机快照</el-dropdown-item>
                <el-dropdown-item :command='{name:"生成邮箱快照",value:"EDM"}' disabled>生成邮箱快照</el-dropdown-item>
                <el-dropdown-item :command='{name:"生成淘宝ID快照",value:"TB"}' disabled>生成淘宝ID快照</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
              <el-button @click.native.prevent="edit(scope.$index, tableData)" type="text" :disabled="tableData[scope.$index].type ==0 " :class="tableData[scope.$index].type ==0?'dis':''">追加</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" :disabled="tableData[scope.$index].type ==0 " :class="tableData[scope.$index].type ==0 ?'dis':''">删除</el-button>
              <el-button @click.native.prevent="addTag(scope.$index, tableData)" type="text" :disabled="tableData[scope.$index].type ==0 " :class="tableData[scope.$index].type ==0 ?'dis':''">添加标签</el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt width="140" height="140">
            </div>
            <p :style="{'marginTop': '23px'}">未查询到外部客户</p>
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


<!-- 导入外部客户 -->
    <el-dialog
      title='导入外部客户'
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="qx"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" label-width="80px" :model="form" ref='form' :rules='rules'>
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  需先创建模版,可根据需要设置要上传的属性,将做为excel模版列头。若数量超十万建议分多个文件分批上传</p>
        <el-form-item label="外部客户名称" prop='name'>
          <el-input v-model='form.name' maxlength='10'></el-input>
        </el-form-item>
        <el-form-item label="" prop="" >
              <p>请按照模版录入信息
                <el-button type="text" @click="createModel">创建模板</el-button>
              </p>
              <el-upload
                :multiple="false"
                class="upload-demo"
                ref="upload1"
                :action="''"
                :http-request="httpReq1"
                :on-remove="handleRemove"
                :on-exceed="handleOver"
                :file-list="fileList"
                :on-change="changeFile"
                :limit="1"
                name="myfiles"
                :with-credentials="true"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary" >选泽文件</el-button>
              </el-upload>
        </el-form-item>
           
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="qx">取消</el-button>
        <el-button  type="primary" @click="submitForm('form',1)" >提交</el-button>
      </span>
    </el-dialog>

<!-- 追加外部客户 -->
    <el-dialog
      title='追加外部客户'
      :visible.sync="appendDialogVisible"
      width="20%"
      :before-close="qx"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" label-width="80px" :model="form" ref='form' :rules='rules'>
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  若数量超十万建议分多个文件分批上传</p>
        <p>外部客户名称 : {{form.externalCustomerName}}</p>
        <el-form-item label="" prop="" >
              <p>请按照模版录入信息
                <el-button type="text" @click="modelDownload(form.templateId)">下载模板</el-button>
              </p>
              <el-upload
                :multiple="false"
                class="upload-demo"
                ref="upload2"
                :action="''"
                :http-request="httpReq2"
                :on-remove="handleRemove"
                :on-exceed="handleOver"
                :file-list="fileList"
                :on-change="changeFile"
                :limit="1"
                name="myfiles"
                :with-credentials="true"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary" >选泽文件</el-button>
              </el-upload>
            </el-form-item>
           
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="qx">取消</el-button>
        <el-button  type="primary" @click="submitForm('form',2)" >提交</el-button>
      </span>
    </el-dialog>
<!-- 创建模板 -->
    <el-dialog
      title='创建模板'
      :visible.sync="modelDialogVisible"
      width="20%"
      class="model"
      :before-close="close"
      :close-on-click-modal="false"
      >
      <ul >
        <li v-for="(model,index) in models" :key="index">{{model.name}}</li>
      </ul>
              

      <el-form :label-position="labelPosition" label-width="80px" :model="modelForm" ref='modelForm' >
        
        <div v-for="(item,index) in modelForm.valueArr"  :key="index">

          <el-form-item   :prop=" 'valueArr.' + index + '.value' "  :rules="rules.value" v-if="modelForm.valueArr.length !=0">

              <el-input v-model="item.value" class="proName" placeholder="请输入模板字段" ></el-input>


              <i class="el-icon-delete plus" @click="delValue(index)"  ></i>

          </el-form-item>

        </div>
           
      </el-form>

      <span slot="footer" class="dialog-footer">
        <!-- <i class="el-icon-plus plus" @click="addValue" ></i> -->
        <el-button type="" @click="addValue" style="float:left">添加</el-button>

        <el-button type="" @click="close">返回</el-button>
        <el-button type="primary" @click="submitForm('modelForm',0)">生成模板</el-button>
      </span>
    </el-dialog>
<!--导入成功详情 -->
    <el-dialog
      title='导入外部客户'
      :visible.sync="sucDialogVisible"
      width="20%"
      :before-close="qx"
      :close-on-click-modal="false">
      <p >已成功导入  <span  style="color: #3366FF;">{{num}}</span> 人， 失败  <span style="color: #3366FF;">0</span> 人</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="qx">完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'

export default {
  name: "outCustom",
  data() {
    return {
      num:0,
      modelForm:{
        valueArr: [

        ],
      },
      fileList:[],
      rules:{
        name: [
          { required: true,  trigger: 'blur' ,validator:formTest.name2Test}
        ],
        value: [
          { required: true, trigger: 'change',validator:(rule, value, callback) => {
              var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\? ]{1,10}$/;
                if(!value){
                  // callback(new Error('模板字段不能为空'))
                      callback()

                }else{
                  if(value.length>10){
                    callback(new Error('模板字段最长不能超过10个字'))
                  }else{
                    if(!reg.test(value)){
                      callback(new Error('模板字段不能包含特殊字符'))
                    }else{
                      callback()
                    }
                  }
                }
            }, 
          }
        ]
      },
      selTime:'',
      models:[
        {
          name:'手机号码',
        },
        {
          name:'邮箱',
        },
        {
          name:'淘宝ID',
        },
      ],

      //屏蔽类型列表
      labelPosition: "top",
      form: {
        name: "",
        recordId:'',
        externalCustomerName:'',
        templateId:''
      },
      recordId:'',
      type:'',
      //搜索条件
      selStr: "",
      dialogVisible: false,
      sucDialogVisible: false,
      modelDialogVisible: false,
      appendDialogVisible:false,
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
      ]
    };
  },
  created() {
    this.getShopList();
  },
  computed:{
    id: {
      get: function () {
        return this.$store.state.id.id
      },
      set: function () {
      }
    },
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
  },
  methods: {
    rowClick(row, column, event){
      console.log(row)
      this.recordId  = row.recordId
    },
    product(type,recordId,shopId) {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/external/customer/snapshot?recordId="+recordId +'&snapshotType='+type +'&shopInfoId='+shopId
      })
        .then(res => {
          console.log("生成快照结果", res);
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: "生成快照成功"
            });
            this.$router.push(
              {
                name:'photo'
              }
            )
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //状态吗判断
    code(code) {
      switch (code) {
        case 36000:
          this.$message({
            type: "error",
            message: "参数对象不能为空"
          });
          break;
        case 36001:
          this.$message({
            type: "error",
            message: "必填参数值不能为空"
          });
          break;
        case 36002:
          this.$message({
            type: "error",
            message: "请选择需要添加的标签的数据"
          });
          break;
        case 36003:
          this.$message({
            type: "error",
            message: "请输入合法参数"
          });
          break;
        case 36004:
          this.$message({
            type: "error",
            message: "店铺信息不存在"
          });
          break;
        case 36005:
          this.$message({
            type: "error",
            message: "Excel数据为空，请重新输入"
          });
          break;
        case 36006:
          this.$message({
            type: "error",
            message: "数据格式不匹配，请重新输入"
          });
          break;
        case 36007:
          this.$message({
            type: "error",
            message: "请勿提交重复模版字段"
          });
          break;
      }
    },
    formatDate(now) {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return year + "-" + (month>10? month : '0'+month) + "-" +(date>10? date : '0'+date)  + " " +(hour>10? hour : '0'+hour)  + ":" + (minute>10? minute : '0'+minute)  ;
    },
    //模板创建
    productModel(){
      // 
      this.$http
        .post("" + process.env.API_ROOT + "/external/customer/excel/template",{
          'mobile':'手机号码',
          'email':'邮箱',
          'aliwant':'淘宝ID',
          'extendOne':this.modelForm.valueArr[0] ? this.modelForm.valueArr[0].value :'',
          'extendTwo':this.modelForm.valueArr[1] ? this.modelForm.valueArr[1].value :'',
          'extendThree':this.modelForm.valueArr[2] ? this.modelForm.valueArr[2].value :'',
        })
        .then(res => {
          console.log("创建结果", res);
          if (res.data.code == 1) {

            this.$store.commit('getId',res.data.data);
            console.log(this.id)
            this.modelDownload(res.data.data)
            this.close()
          } else {
            this.code(res.data.code)
          }
        })
        .catch(error => {
          console.log(error);
          // alert("系统异常");
            this.close()
        });
    },
    //模板下载
    modelDownload(id){
      this.$http
        .get("" + process.env.API_ROOT + "/external/customer/excel/template?templateId="+id)
        .then(res => {
         if(res.data.code){
           this.$message({
             type:'error',
             message:res.data.msg
           })
         }else{
           location.href=''+process.env.API_ROOT + "/external/customer/excel/template?templateId="+id
         }
        })
        .catch(err => {
          console.log(err);
          alert("网络异常");
        });
    },
        //删除属性值
    delValue(index) {
      this.modelForm.valueArr.splice(index, 1);
    },
    addValue() {
      if (this.modelForm.valueArr.length < 3) {
        let obj = {
          value: ""
        };
        this.modelForm.valueArr.push(obj);
      } else {
        this.$message({
          type: "error",
          message: "模板字段最多可以添加至3个"
        });
      }
    },
    createModel(){
      this.modelDialogVisible = true;
      this.modelForm.valueArr=[
       
      ]
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
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    // 
    httpReq1(val) {
      var _file = val.file;
      var formData = new FormData();
      formData.append("excel", _file);
      formData.append("shopInfoId", this.shopId);
      formData.append("externalCustomerName", this.form.name);
      if(this.id){
        formData.append("templateId", this.id);
        this.$http
        .post("" + process.env.API_ROOT + "/external/customer/file/import",formData)
        .then(res => {
          console.log("上传结果", res);
          if (res.data.code == 1) {
            this.fileList = [val.file];
            this.dialogVisible = false;
            this.sucDialogVisible = true
            this.$message({
              type: "success",
              message: "上传成功"
            });
            this.num = res.data.data;
            this.getBlack(
              this.currentPage,this.pageSize,this.shopId
            )
          } else {
            
            this.$message({
              type: "error",
              message: res.data.msg
            });
            if(res.data.code==36008){
              
            }else{
              this.fileList =[]
            }
            this.code(res.data.code)
          }
        })
        .catch(error => {
          console.log(error);
          this.fileList = [];
          alert("系统异常");
        });
      }
      else{
        this.$message.error('请先创建模板')
      }
    },
    httpReq2(val) {
      var _file = val.file;
      var formData = new FormData();
      formData.append("excel", _file);
      formData.append("recordId", this.form.recordId);
        this.$http
        .post("" + process.env.API_ROOT + "/external/customer/append",formData)
        .then(res => {
          console.log("追加结果", res);
          if (res.data.code == 1) {
            this.fileList = [val.file];
            this.appendDialogVisible = false;
            this.sucDialogVisible = true
            this.$message({
              type: "success",
              message: "追加成功"
            });
            this.num = res.data.data;
            this.getBlack(
              this.currentPage,this.pageSize,this.shopId
            )
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
            this.fileList =[]

            this.code(res.data.code)
          }
        })
        .catch(error => {
          console.log(error);
          this.fileList = [];
          alert("系统异常");
        });
    },
    a(command){
      this.type = command.value
      console.log(this.type)
      this.product(this.type,this.recordId,this.shopId)
    },
    changeSelTime(val){
      console.log(val)
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
    submitUpload(type) {
      // console.log(this.fileList);
      if(!this.id){
        this.$message({
          type: "error",
          message: "请先创建模板"
        });
      }else{
          if (this.fileList.length == 0) {
            this.$message({
              type: "error",
              message: "请选择模板"
            });
          } else {
            if(type==1){
              this.$refs.upload1.submit(); 

            }else{
              this.$refs.upload2.submit(); 

            }
          }
      }
    },
    submitForm(formName,type) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if(type==0){
              this.productModel()

            }else{
              this.submitUpload(type)

            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
    },
    search() {
      this.getBlack(
        this.currentPage,
        this.pageSize,
        this.shopId
      );
    },
    qx() {
        this.resetForm('form')
        this.fileList=[]
        this.dialogVisible = false;
        this.sucDialogVisible = false;
        this.appendDialogVisible = false;
        this.clear();
    },
    close(){
        this.modelDialogVisible=false
   
        this.resetForm('modelForm')
        this.modelForm.valueArr = [
         
        ]
    },
    clear() {
      this.form.name = "";
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
            this.getBlack(
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
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    //获取外壳列表
    getBlack(pageIndex, pageSize, shopid) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/external/customer?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize +
          "&shopInfoId=" +
          shopid +
          "&externalCustomerName=" +
          this.selStr + 
          '&startTime=' + (this.selTime? this.selTime[0] :'') +
          '&endTime=' +( this.selTime? this.selTime[1] :'') 
      })
        .then(res => {
          console.log("外壳列表", res);
          if (res.data.code == 1) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          }else{
            this.tableData = [];
            this.total = 0;
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },

    //显示创建自定义框
    add() {
      this.dialogVisible = true;
    },
    //查看分组
    check(index,rows){

    },
    //禁用启用
    edit(index,rows){
      this.appendDialogVisible=true
      this.form.externalCustomerName = rows[index].externalCustomerName
      this.form.templateId = rows[index].templateId
      this.form.recordId = rows[index].recordId
    },



    //删除
    deleteRow(index, rows) {
      this.$confirm("确定要删除该外部客户吗?", "删除", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$http
            .get(
              "" + process.env.API_ROOT + "/external/customer/del?recordId="+rows[index].recordId,
            )
            .then(res => {
              console.log(res);
              if (res.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "删除外客成功"
                });
                this.getBlack(
                  this.currentPage,
                  this.pageSize,
                  this.shopId
                );
              } else {
            
              }
            })
            .catch(err => {
              console.log(err);
              alert("网络异常");
            });
        })
        .catch(action => {
          // this.$message({
          //   type: "fail",
          //   message: "已取消操作"
          // });
        });
    },
    addTag(index, rows) {
      this.$router.push(
        {
          name:'tag',
          params:{id:rows[index].recordId,templateId:rows[index].templateId,name:rows[index].externalCustomerName}
         }
      )
    },
    

    commit() {
        this.$http
          .post("" + process.env.API_ROOT + "/external/customer/file/import", {
            catalogName: this.form.name ,
            shopInfoId: this.shopId,
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: "导入外部客户成功"
              });
              this.getBlack(
                this.currentPage,
                this.pageSize,
                this.shopId
              );
              this.qx();
            } else {
              this.code(res.data.code)
            }
            // this.qx();
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
.outCustom {

  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #000
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background: #3366ff;
    border-color:#3366ff
  }
  .el-dialog__body{
    padding: 30px 20px 0 20px
  }
  .valueBox{
    margin-bottom: 20px;
  }
  .proName {
    width: 60%;
  }
  .plus {
    font-size: 20px;
    margin-left: 20px;
  }
  .model{
    ul{
      li{
        margin: 0 0 20px 20px;
        list-style: disc;
      }
    }
  }
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
      .selTime {
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
          display: inline-block;
          height: 32px;
        }
        .el-date-editor .el-range-separator{
          line-height: 20px;
        }
      }
      
      .el-button {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        background: #3366ff;
        border-radius: 0px;
        height: 32px;
        border: none;
        margin: 12px 0 12px 20px;
        span{
          display: block;
          height: 14px;
          line-height: 14px;
          padding: 0;
          margin-top: -2px;
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
                .el-dropdown-link{
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  color: #3366FF;
                  letter-spacing: 0;
                  line-height: 12px;
                  margin-right: 10px;
              }
          .el-button {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #3366ff;
            letter-spacing: 0;
            line-height: 12px;
          }
          .dis{
opacity: 0.35;
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
