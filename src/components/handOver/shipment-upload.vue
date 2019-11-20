<template>
  <div class="shipmentUpload">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>交付管理</el-breadcrumb-item>
          <el-breadcrumb-item>出货数据上传</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="查询" name="first">
          <div class="sels clear">
            <div class="lineBox">
              <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
              <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
            </div>
            <el-form ref="form" :model="form" size="small" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
              <el-form-item label="客户">
                <el-input size='small' placeholder="请输入" v-model='form.customerFullName'></el-input>
              </el-form-item>
              <el-form-item label="出货类型">
                <el-input size='small' placeholder="请输入" v-model='form.deliveryType'></el-input>
              </el-form-item>
              <el-form-item label="订单号">
                <el-input size='small' placeholder="请输入" v-model='form.customerOrderNumber'></el-input>
              </el-form-item>
              <el-form-item label="订单月份">
                <el-input size='small' placeholder="请输入" v-model='form.orderMonth'></el-input>
              </el-form-item>
              <el-form-item label="上传时间"  class="date">
                <Daterange  @data='watchTime1' :resetDataReg='resetData1' />
              </el-form-item>
              <el-form-item label="出货日期"  class="date">
                <Daterange @data='watchTime2' :resetDataReg='resetData2' />
              </el-form-item>
              <el-form-item label="产品型号">
                <el-input size='small' placeholder="请输入" v-model='form.productModel'></el-input>
              </el-form-item>
              <el-form-item :label="' '">
                <el-button size='small' type='primary' plain @click="search">查询</el-button>
                <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="box">
            <div class="btns clear">
              <el-button class="add"  size='small' type='primary' @click="deleteRows" :disabled="multipleSelection.length==0">批量删除</el-button>
              <el-button class="add" style="margin-left:0"  size='small' type='primary'  @click="mods" :disabled="multipleSelection.length==0">批量修改</el-button>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url2"
                :data='da'
                :headers='headers'
                name="excel"
                accept=".xlsx,.xls"
                :auto-upload="true"
                :show-file-list="false"
                :on-success="suc2"
                >
                <el-button size="small"  type="primary">上传修改文件</el-button>
              </el-upload>
            </div>
            <div class="tab">
              <el-table :data="queryList" border style="width: 100%" height="100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"  show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="uploadTime" width='150' label="上传时间" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="customerExternalNumber" width='100' label="客户外部号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerFullName" width='250' label="客户全称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sales" width='100' label="销售" show-overflow-tooltip></el-table-column>
                <el-table-column prop="categoryTow" width='150' label="类别二(子类)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="categoryThree" width='150' label="类别三(平台)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productModel" width='150' label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="deliveryDate" width='150' label="出货日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="deliverNumber" width='150' label="数量" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salePrice" width='150' label="Sale Price" show-overflow-tooltip></el-table-column>
                <el-table-column prop="poPrice" width='150' label="Po Price" show-overflow-tooltip></el-table-column>
                <el-table-column prop="margin" width='150' label="Margin" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salesOrganization" width='150' label="销售组织" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerOrderNumber" width='150' label="客户订单号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="deliveryType" width='150' label="出货类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="orderMonth" width='150' label="订单月份" show-overflow-tooltip></el-table-column>
                <el-table-column prop="deliveryCompany" width='150' label="发货公司" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remark" width='150'  label="备注"  show-overflow-tooltip></el-table-column>
                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
              <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[20,50,100]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
              </el-pagination>
            </div>
            </div>
            
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传" name="second">
          <div class="box">
            <div class="btns clear">
              <el-button class="add" @click='download' size='small' type='primary' > 下载模版</el-button>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url"
                :data='da'
                :headers='headers'
                name="excel"
                accept=".xlsx,.xls"
                :auto-upload="true"
                :show-file-list="false"
                :on-success="suc"
                >
                <el-button size="small"  type="primary">上传</el-button>
              </el-upload>
              <el-button class="add"  size='small' type='primary' :disabled="isError1" @click="downloadError">下载错误数据</el-button>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url1"
                :data='da1'
                :headers='headers'
                name="excel"
                accept=".xlsx,.xls"
                :auto-upload="true"
                :show-file-list="false"
                :on-success="suc1"
                >
                <el-button size="small"  type="primary" >上传错误数据</el-button>
              </el-upload>
              <el-button class="add" @click='sub' size='small' type='primary' :disabled="isError2">提交</el-button>

            </div>
            <div class="tab">
              <el-table :data="tableData" border style="width: 100%" height="100%">
                  <el-table-column prop="errorMsg" width='150' label="错误信息" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="customerExternalNumber" width='150' label="客户外部号" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="customerFullName" width='200' label="客户全称" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="sales" width='100' label="销售" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="categoryOne" width='150' label="类别一(类型)" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="categoryTow" width='150' label="类别二(子类)" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="categoryThree" width='150' label="类别三(平台)" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="productModel" width='150' label="产品型号" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="deliveryDate" width='150' label="出货日期" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="deliverNumber" width='150' label="数量" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="salePrice" width='150' label="Sale Price" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="poPrice" width='150' label="Po Price" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="margin" width='150' label="Margin" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="currency" width='150' label="币种" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="customerOrderNumber" width='150' label="客户订单号" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="deliveryType" width='150' label="出货类型" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="orderMonth" width='150' label="订单月份" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="deliveryCompany" width='150' label="发货公司" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="remark" width='150'  label="备注"  show-overflow-tooltip></el-table-column>
                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="驳回记录" name="third">
          <div class="box">
            <div class="tab">
              <el-table :data="rejectData" border style="width: 100%" height="100%">
                <el-table-column prop="remark" width='' label="驳回原因" show-overflow-tooltip></el-table-column>
                <el-table-column prop="uploadTimeStr" width='200' label="上传日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="approvalTimeStr" width='200' label="驳回日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='80' fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="downloadReject(scope.row)">下载</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
              <div class="block">
              <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1"
                :page-sizes="[50, 100,150]" :page-size="pageSize1" layout="sizes,total, jumper, prev, pager, next" :total="total1">
              </el-pagination>
            </div>
            </div>
            
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  import Daterange from '../com/date'
  import {download,sub,upload,downloadError,getReject,getList,del} from '@/api/handover/upload.js'
  import {serverUrl} from '../../axios/request'
  export default {
    name: 'shipmentUpload',
    components:{
      Daterange
    },
    data() {
      return {
        multipleSelection:[],
        resetData1:true,
        resetData2:true,
        fileName:'',
        recordId:'',
        isError1:true,
        isError2:true,
        url:serverUrl + '/handover/template',
        url2:serverUrl + '/handover/detail/update/upload',
        url1:serverUrl+'/handover/error/retry',
        headers:{
          "Authorization": sessionStorage.getItem("data"),
        },
        da1:{
        },
        form: {
          orderMonth:'',
          productType:'',
          //上传时间
          uploadStartTime:'',  
          uploadEndTime:'',
          //
          handoverStartTime:'',  
          handoverEndTime:'',
          //客户
          customerFullName:'',  
          //产品型号
          productModel:'', 
          //出货类型 
          deliveryType:'',
          //订单月份
          orderMonth:'',  
          //订单号
          customerOrderNumber:'',
          warehouse:'',  
          deliveryCompany:''
        },
        total: 0,
        dialogVisible: false,
        tableData:[],
        rejectData:[],
        queryList:[],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 20,
        currentPage1: 1,
        //每页的容量
        pageSize1: 10,
        total1:0,
        activeName:'first'
      }
    },
    computed: {
      type(){
        return this.$route.query.type
      },
      da(){
        return {
          type : 'deliver'
        }
      },
      dealerId(){
        return this.$store.state.loginUser.loginInfo.id
      }
    },
    created() {
      this.getList()
    },
    watch: {
      type:{
        handler:function(n,o){
          this.activeName = 'first'
          this.getList()
        }
      },
      activeName:{
        handler:function(n,o){
          if(n=='first'){
            this.getList()
          }else if(n=='second'){

          }else{
            this.getReject()
          }
        }
      }
    },
    methods: {
      
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      mods(){

        var ids = this.multipleSelection.map(item=>{
            return item.id
          }).join(',')

          this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/handover/detail/update/download?ids="+ids+'&type=deliver',
            responseType: "arraybuffer",

            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          })
            .then(res => {
              if(res.headers['content-type'].includes('application/json')){
                var  data = new Blob([res.data], {
                  type: "application/vnd.ms-excel"
                });
                var reader = new FileReader();
                reader.readAsText(data, 'utf-8');
                var that = this
                reader.onload = function () {
                  //console.log(reader.result)
                  data = JSON.parse(reader.result);
                  //console.log(data)
                  that.$message.error(data.msg)
                }
              }else{
              // //console.log(res.data);
              const blob = new Blob([res.data], {
                type: "application/vnd.ms-excel"
              });
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.download = "数据列表.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
              }
            })
            .catch(err => {
              // //console.log(err);
              alert("网络异常");
            });
      },
      async del(){
        const data ={
          ids:this.multipleSelection.map(item=>{
            return item.id
          }).join(','),
          type:'deliver'
        }
        const res = await del(data);
        // //console.log('删除结果',res)
        if(res){
          this.$message.success('删除成功')
          this.getList()
        }
      },
      deleteRows(){
       this.$confirm('确定要删除吗', '删除', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
                this.del()
            })
            .catch(action => {
              
            });
      },
      search(){
        this.currentPage = 1
        this.getList()
      },
      watchTime1(data){
        this.form.uploadStartTime = data.startTime 
        this.form.uploadEndTime = data.endTime 
        this.resetData1=false
      },
      watchTime2(data){
        this.form.handoverStartTime = data.startTime 
        this.form.handoverEndTime = data.endTime 
        this.resetData2=false
      },
      reset(){
        this.form={
          orderMonth:'',
          //上传时间
          uploadStartTime:'',  
          uploadEndTime:'',
          //
          handoverStartTime:'',  
          handoverEndTime:'',
          //客户
          customerFullName:'',  
          //产品型号
          productModel:'', 
          //出货类型 
          deliveryType:'',
          //订单月份
          orderMonth:'',  
          //订单号
          customerOrderNumber:'',
          warehouse:'',  
          deliveryCompany:''
        }
        this.resetData1=true
        this.resetData2=true
        this.search()
      },
      async getReject(){
        var data = {
          dealerId:this.dealerId,
          type: 'deliver' ,
          pageSize:this.pageSize1,
          pageNum:this.currentPage1,
        }
        const res = await getReject(data)
        // //console.log('驳回记录',res)
        if(res){
          this.rejectData=res.data.data.list
          this.total1 = res.data.data.total
        }
      },
      async getList(){
        var data = {
          dealerId:this.dealerId,
          type:'deliver',
          pageSize:this.pageSize,
          pageNum:this.currentPage,
          uploadStartTime:this.form.uploadStartTime,  
          uploadEndTime:this.form.uploadEndTime,
          handoverStartTime:this.form.handoverStartTime,  
          handoverEndTime:this.form.handoverEndTime,
          customerFullName:this.form.customerFullName,  
          productModel:this.form.productModel,  
          deliveryType:this.form.deliveryType,
          orderMonth:this.form.orderMonth,  
          customerOrderNumber:this.form.customerOrderNumber,
          warehouse:this.form.warehouse,  
          deliveryCompany:this.form.deliveryCompany
        }
        const res = await getList(data)
        // //console.log('上传查询部分列表',res)
        if(res){
          this.queryList=res.data.data.list
          this.total = res.data.data.total
        }
      },
      downloadReject(row){
        this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/handover/dealer/reject/download?recordId="+row.id+'&type=deliver',
            responseType: "arraybuffer",

            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          })
            .then(res => {
              if(res.headers['content-type'].includes('application/json')){
                var  data = new Blob([res.data], {
                  type: "application/vnd.ms-excel"
                });
                var reader = new FileReader();
                reader.readAsText(data, 'utf-8');
                var that = this
                reader.onload = function () {
                  //console.log(reader.result)
                  data = JSON.parse(reader.result);
                  //console.log(data)
                  that.$message.error(data.msg)
                }
              }else{
              // //console.log(res.data);
              const blob = new Blob([res.data], {
                type: "application/vnd.ms-excel"
              });
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.download = "rejectData.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
              }
            })
            .catch(err => {
              // //console.log(err);
              alert("网络异常");
            });
      },
      downloadError(){
        this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/handover/error?type=deliver"+"&fileName=" + this.fileName,
            responseType: "arraybuffer",

            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          })
            .then(res => {
             if(res.headers['content-type'].includes('application/json')){
                var  data = new Blob([res.data], {
                  type: "application/vnd.ms-excel"
                });
                var reader = new FileReader();
                reader.readAsText(data, 'utf-8');
                var that = this
                reader.onload = function () {
                  //console.log(reader.result)
                  data = JSON.parse(reader.result);
                  //console.log(data)
                  that.$message.error(data.msg)
                }
              }else{
              // //console.log(res.data);
              const blob = new Blob([res.data], {
                type: "application/vnd.ms-excel"
              });
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.download = "errorData.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
              }
            })
            .catch(err => {
              // //console.log(err);
              alert("网络异常");
            });
      },
      suc2(val){
        // //console.log(val)
        if(val.code!=1){
          this.$message.error(val.msg)
        }else{
          this.$message.success('上传成功')
        }
      },
      suc(val){
        if(val.code!=1){
          this.$message.error(val.msg)
        }else{
          this.recordId = val.data.recordId
          if(val.data.isError){
            this.$message.error(val.data.msg)
            this.fileName = val.data.errorFileName
            this.da1={
              type:'deliver' ,
              recordId:val.data.recordId,
              fileName:val.data.fileName,
            }
          }else{
            this.isError2 = false
            this.$message.success('上传成功')
          }
          this.tableData =val.data.deliverDetails
        }
      },
      suc1(val){
        if(val.code!=1){
          this.$message.error(val.msg)
        }else{
          this.recordId = val.data.recordId
          if(val.data.isError){
            this.$message.error(val.data.msg)
            this.fileName = val.data.errorFileName
            this.da1={
              type:'deliver' ,
              recordId:val.data.recordId,
              fileName:val.data.fileName,
            }
          }else{
            this.isError2 = false
            this.$message.success('上传成功')
          }
          this.tableData =val.data.deliverDetails
        }
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      async upload(val){
        var param = new FormData()
        param.append('excel',val.file)
        param.append('type','deliver' )
        const res = await upload(data);
        if(res){

        }
      },
      async sub(){
        var param= new FormData()
        param.append('recordId' ,this.recordId)
        param.append('type' ,'deliver' )
        const res = await sub(param);
        this.recordId = res.data.recordId
        if(res.data.isError){
          this.$message.error(res.data.msg)
          this.fileName = res.data.errorFileName
          this.da1={
            type:'receive',
            recordId:res.data.recordId,
            fileName:res.data.fileName,
          }
        }else{
          this.isError2 = true
          this.$message.success('提交成功')
          this.tableData = []
        }
      },
      download() {
          this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/handover/template?type=deliver",
            responseType: "arraybuffer",

            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          })
            .then(res => {
              if(res.headers['content-type'].includes('application/json')){
                var  data = new Blob([res.data], {
                  type: "application/vnd.ms-excel"
                });
                var reader = new FileReader();
                reader.readAsText(data, 'utf-8');
                var that = this
                reader.onload = function () {
                  //console.log(reader.result)
                  data = JSON.parse(reader.result);
                  //console.log(data)
                  that.$message.error(data.msg)
                }
              }else{
              // //console.log(res.data);
              const blob = new Blob([res.data], {
                type: "application/vnd.ms-excel"
              });
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.download = "deliver_template.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
              }
            })
            .catch(err => {
              // //console.log(err);
              alert("网络异常");
            });
      },
     
      handleClick(a,b){
        if(a.name=='third'){
          this.getReject()
        }
      },
      change() {
        this.dialogVisible = !this.dialogVisible
      },
      // 分页
      handleSizeChange(val) {
        // //console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        // //console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList()
      },
      handleSizeChange1(val) {
        // //console.log(`每页 ${val} 条`);
        this.pageSize1 = val;
        this.getReject()
      },
      handleCurrentChange1(val) {
        // //console.log(`当前页: ${val}`);
        this.currentPage1 = val;
        this.getReject()

      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
.shipmentUpload{
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
    position: relative;
    padding-top: 34px;
    box-sizing: border-box;
    .head{
      padding: 10px 20px;
      position: absolute;
      top: 0;
      // background: red;
    }
    .el-tabs{
      height: 100%;
      position: relative;
      box-sizing: border-box;
      padding-top: 50px;
      .el-tabs__header{
        position: absolute;
        top: 0;
        width: 100%;
        .el-tabs__nav-wrap {
          padding:0 20px;
        }
      }
      .el-tabs__content{
        height: 100%;
        .el-tab-pane{
          height: 100%;
          display: flex;
          flex-direction: column;
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
            .upload-demo{
              display: inline-block;
            }
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
  }
}
</style>