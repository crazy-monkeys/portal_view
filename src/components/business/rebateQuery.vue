<template>
  <div class="rebateQuery">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >商务管理</el-breadcrumb-item>
          <el-breadcrumb-item>Rebate查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <!-- <el-form-item label="代理商">
            <el-input size='small' clearable v-model="form.dealerName" placeholder="请输入"></el-input>
          </el-form-item> -->
          <el-form-item label="客户">
            <el-input size='small' clearable v-model="form.customerName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="执行方">
            <el-input size='small' clearable v-model="form.executor" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="执行方式">
            <el-select v-model="form.executeStyle" clearable size="small">
              <el-option label="抵扣代理商AR" value='1'></el-option>
              <el-option label="返货" value='2'></el-option>
              <el-option label="返款" value='3'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="通知日期" class="date">
            <Daterange @data='watchTime' :resetDataCreate='resetData' />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" clearable size="small">
              <el-option label="结算中" value='1'></el-option>
              <el-option label="客户未确认" value='2'></el-option>
              <el-option label="客户已确认" value='3'></el-option>
              <el-option label="执行完毕" value='4'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=' '>
            <el-button size='small' type='primary' @click="search" plain>查询</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" border height="100%" @row-click='rowClick'>
            <el-table-column prop="customerShortName" width="150" label="客户简称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="salesName" width="150" label="销售名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="amebaHeader" width="150" label="阿米巴队长" show-overflow-tooltip></el-table-column>
            <el-table-column prop="amebaDepartment" width="150" label="阿米巴部门" show-overflow-tooltip></el-table-column>
            <el-table-column prop="shipmentCompany" width="150" label="出货公司" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.shipmentCompany==7100 ||scope.row.shipmentCompany==3000">
                  {{"SPRD-"+scope.row.shipmentCompany }}
                </span>
                <span v-if="scope.row.shipmentCompany==4800 ">
                  {{"RDA-"+scope.row.shipmentCompany }}
                </span>
                <span v-if="scope.row.shipmentCompany!=7100 && scope.row.shipmentCompany!=3000 && scope.row.shipmentCompany!=4800">
                  {{scope.row.shipmentCompany }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="rebateAmount" width="150" label="释放金额($/K)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="executor" width="150" label="执行方" show-overflow-tooltip></el-table-column>
            <el-table-column prop="executeStyle" width="150" label="执行方式" show-overflow-tooltip>
              <template slot-scope="scope">
                      <span v-if="scope.row.executeStyle==1">抵扣代理商AR</span>
                      <span v-if="scope.row.executeStyle==2">返货</span>
                      <span v-if="scope.row.executeStyle==3">返款</span>
                    </template>
            </el-table-column>
            <el-table-column prop="noticeDate" width="150" label="通知日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="remark" width="150" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" width="150" label="状态" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">结算中</span>
                <span v-if="scope.row.status==2">客户未确认</span>
                <span v-if="scope.row.status==3">客户已确认</span>
                <span v-if="scope.row.status==4">执行完毕</span>
              </template>
            </el-table-column>
            <el-table-column prop="dlExecuteDate" width="150" label="代理执行日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dlFileId" width="150" label="代理商上传文件" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button v-if="scope.row.dlFileId" size="small" type="text" @click="downloadFile(scope.row.dlFileId)">点击下载</el-button>
                <span  v-if="!scope.row.dlFileId">无文件</span>
              </template>
            </el-table-column>
            <el-table-column prop="zrExecuteDate" width="150" label="展锐执行日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zrFileId" width="150" label="展锐上传文件" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button v-if="scope.row.zrFileId" size="small" type="text" @click="downloadFile(scope.row.zrFileId)">点击下载</el-button>
                  <span  v-if="!scope.row.zrFileId">无文件</span>
                </template>
            </el-table-column>
            <el-table-column  label="操作" width="80" fixed="right">
              <template slot-scope="scope" >
                <el-upload v-if="scope.row.status==2" style='display:inline-block' :data='rowdata' class="upload-demo" :headers="{'Authorization':auth}" :show-file-list="false" ref='upload' name='file'  :on-success='uploadSuccess' :action='serverUrl+"/business/rebate/upload"' >
                  <el-button size="small"  type="text" >上传</el-button>
                </el-upload>
                <el-button type='text' v-if="scope.row.status==3"  @click='showUploadZrFile(scope.row)'>上传</el-button>
              </template>
            </el-table-column>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[50,100,500]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="发送确认函"
      :visible.sync="sendVis"
      width="400px"
      :before-close="cancel">
        <el-form ref="sendForm" :model="sendForm" :rules='rules' class="sendForm" label-width="auto" label-position='top' >
          <el-form-item label="执行方">
            <el-select v-model="sendForm.executor" size="small">
              <el-option label="客户已确认" value='1'></el-option>
              <el-option label="客户未确认" value='2'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="释放金额">
            <el-input size='small' v-model="sendForm.surplusRebateAmount" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="执行方式">
            <el-select v-model="sendForm.executeStyle" size="small">
              <el-option label="客户已确认" value='1'></el-option>
              <el-option label="客户未确认" value='2'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input size='small' type="textarea" v-model="sendForm.remark" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" plain @click="cancel">取 消</el-button>
            <el-button size="small" type="primary" @click="submitForm('sendForm')">确 定</el-button>
          </span>
    </el-dialog>
    <el-dialog
        title="展锐上传文件"
        :visible.sync="dialogVisibleZrFileUpload"
        width="400px"
        top="10vh"
        :before-close="cancel"
        >
        <el-form ref="uploadZrFileForm" class="form1" label-width="auto" label-position='top' :inline='true' >
              <el-form-item label="执行日期" >
                <el-date-picker size="small" v-model="zrExecuteDate" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="文件">
                <el-upload class="upload-demo" :before-upload="beforeUpload" ref='zrFileUpload' name='file' :auto-upload="false" :action='serverUrl+"/business/rebate/upload"'>
                  <el-button size="mini" type="" >上传文件</el-button>
                </el-upload>
              </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel" size="small" type="primary" plain>取 消</el-button>
            <el-button type="primary" @click="submitUploadZrFileForm('uploadZrFileForm')"  size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
import Daterange from "../com/date";

import {serverUrl} from "@/axios/request.js";
import {queryList,send,downloadFiles} from '@/api/business/rebate.js'
  export default {
    name: 'rebateQuery',
    components:{
      Daterange
    },
    data() {
      return {
        rowData:{},
        rowdata:{},
      resetData:false,
      dialogVisibleZrFileUpload:false,
      zrExecuteDate:'',
      auth:sessionStorage.getItem('data'),
        serverUrl:serverUrl,
        rules:{},
        sendForm:{
          executor:'',
          surplusRebateAmount:'',
          executeStyle:'',
          remark:'',
        },
        form: {
          dealerName:'',
          customerName:'',
          status:'',
          executor:'',
          executeStyle:'',
          noticeBeginDate:'',
          noticeEndDate:''
        },
        dialogVisible: false,
        sendVis: false,
        tableData: [],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 50,
        //总数
        total: 0,
      }
    },
    computed: {
    },
    created() {
      this.getList()
    },
    watch: {
    },
    methods: {
      downloadFile(id){
        this.downloadFiles(id)
      },
      async downloadFiles(id){
        const data ={
          id:id
        }
        const res = await downloadFiles(data);
        //console.log('下载结果',res)
        if(res){
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          // a.download = "代理商费率模版.xlsx";
          a.href = res.data.data;
          a.download = res.data.data;
          a.click();
          document.body.removeChild(a);
        }
      },
      watchTime(data){
        // //console.log(data)
        this.form.noticeBeginDate= data.startTime
        this.form.noticeEndDate = data.endTime
        this.resetData = false
      },
      uploadSuccess(res, file, fileList){
        // //console.log(res)
        if(res.code==1){
          this.search()
          this.$message({
            type:'success',
            message:'上传成功'
          })
        }else{
          this.$message({
            type:'error',
            message:res.msg
          })
        }
      },
      submitForm(formName){
        this.$formTest.submitForm(this.$refs[formName],this.commit)
      },
      cancel(){
        this.sendVis = false
        this.sendForm ={
          executor:'',
          surplusRebateAmount:'',
          executeStyle:'',
          remark:'',
        }
        this.$formTest.resetForm(this.$refs['uploadZrFileForm'])
        this.dialogVisibleZrFileUpload= false
      },
      rowClick(row){
        this.rowData = row
        this.rowdata.noticeDate = row.noticeDate
        this.rowdata.shipmentCompany = row.shipmentCompany
        this.rowdata.customerShortName = row.customerShortName
        this.rowdata.salesName = row.salesName ?  row.salesName:''
        this.rowdata.amebaHeader = row.amebaHeader
        this.rowdata.amebaDepartment = row.amebaDepartment
        this.rowdata.executor = row.executor
      },
      send(){
        this.sendVis = true
      },
      async commit(){
        const data ={
          id:this.rowData.id,
          executor:this.sendForm.executor,
          surplusRebateAmount:this.sendForm.surplusRebateAmount,
          executeStyle:this.sendForm.executeStyle,
          remark:this.sendForm.remark,
        }
        const res = await send(data);
        if(res){
          this.$message.success('发送成功')
          this.cancel()
          this.getList()
        }
      },
      async getList(){
        const data ={
          //代理名称
          dealerName:this.form.dealerName,
        //客户名称
          customerName:this.form.customerName,
        //状态
          status:this.form.status,
           executor:this.form.executor,
          executeStyle:this.form.executeStyle,
          noticeBeginDate:this.form.noticeBeginDate,
          noticeEndDate:this.form.noticeEndDate,
        }
        const res = await queryList(data);
        // //console.log('rebate查询列表',res);
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      mx(){
        this.$router.push({
          name:'rebateDetail'
        })
      },
      search(){
        this.currentPage =1
        this.getList()
      },
      reset(){
        this.form={
          dealerName:'',
        //客户名称
          customerName:'',
        //状态
          status:'',
           executor:'',
          executeStyle:'',
        }
        this.resetData = true
        this.search()
      },
      change() {
        this.dialogVisible = !this.dialogVisible
      },
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
      showUploadZrFile(){
            this.dialogVisibleZrFileUpload = true
      },
      sure3(){
        this.$refs.zrFileUpload.submit();
      },
      submitUploadZrFileForm(formName){
            this.$formTest.submitForm(this.$refs[formName],this.sure3)
      },
      beforeUpload(file){
            let data = new FormData()
            data.append('file', file)
            data.append('zrExecuteDate',this.zrExecuteDate)
            data.append('noticeDate', this.rowdata.noticeDate)
            data.append('shipmentCompany', this.rowdata.shipmentCompany)
            data.append('customerShortName', this.rowdata.customerShortName)
            data.append('salesName', this.rowdata.salesName)
            data.append('amebaHeader', this.rowdata.amebaHeader)
            data.append('amebaDepartment', this.rowdata.amebaDepartment)
            data.append('executor', this.rowdata.executor)

            this.$http({
              method: 'post',
              url: this.serverUrl+"/business/rebate/upload",
              headers:{'Authorization': this.auth},
              timeout: 20000,
              data: data
            }).then(res=>{
              if(res.data.code == 1){
                this.$message.success('上传成功')
                this.cancel()
                this.getList()
              }else{
                this.$message.error(res.data.msg)
              }
            }).catch(err=>{
              // //console.log(err)
            })
            return false
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;

 .rebateQuery{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;
  .el-dialog{
    .el-dialog__body{
      padding-top: 0
    }
    .sendForm {
      .el-form-item__label{
        line-height: 30px;
      }
        .el-form-item {
          .el-select{
            width: 100%;
          }
        }
    }
    .form1 {
            .el-form-item__label {
              height: 30px;
            }
            .el-form-item {
              width: 100%;
              .el-input{
                width: 100%;
              }
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
