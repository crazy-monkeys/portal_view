<template>
  <div class="announce">
    <div class="sellBox">

    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item >系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible1' @click='change'> 展开</i>

          <i class="el-icon-arrow-up" v-if='dialogVisible1' @click='change'> 收起</i>
        </div>
        <el-form ref="selForm" :model="selForm" class="selForm" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible1'>
          <el-form-item label="标题">
            <el-input size='small' v-model="selForm.title" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select size='small' v-model="selForm.typeId" clearable placeholder="请输入">
              <el-option 
              v-for="item in types" 
              :key='item.pValue'
              :label='item.zhName'
              :value='item.pValue'
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布日期" class="date" v-model="selForm.startTime">
            <Daterange @data='watchTime' :resetData='resetData' />
          </el-form-item>
          <el-form-item :label="' '">
            <el-button size='small' type='primary' @click="search" plain>搜索</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tab">
        <div class="btns clear">
          <el-button class="add" @click='add' size='small' type='primary'>新建</el-button>
        </div>
        <el-table :data="list" border style="width: 100%" height="700" @row-click='rowClick' >
          <el-table-column type="index" label="编号" v-if="false" width="80" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="id" prop="id" width="30" v-if="false">
          </el-table-column>
          <el-table-column prop="title" label="标题" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="zhName" label="类型"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="createTimeStr" show-overflow-tooltip label="创建时间">
          </el-table-column>
          <el-table-column prop="createTimeStr" show-overflow-tooltip label="发布时间">
          </el-table-column>
          <el-table-column prop="createUserName" show-overflow-tooltip label="发布人">
          </el-table-column>
          <el-table-column prop="status" show-overflow-tooltip label="状态">
            <template slot-scope='scope'>
              {{scope.row.status==1?'已发布' : scope.row.status==0?'未发布' :scope.row.status==-1?'已撤销':''}}
            </template>
          </el-table-column>
          <el-table-column prop="status" show-overflow-tooltip label="操作" fixed="right" width="80">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="del(list[scope.$index].id)">撤销</el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <p>无数据</p>
          </div>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10,30,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    
    <el-dialog title="公告发布" :visible.sync="dialogVisible" width="50%" :center="true">

      <el-form ref="form" label-position="top" :rules="rules" :model="form" class="form" :inline='true'>
          <el-form-item label="标题" prop='title'>
            <el-input size='small' v-model="form.title" placeholder=""  ></el-input>
          </el-form-item>
          <el-form-item label="类型" prop='type'>
            <el-select  size="small" v-model="form.type" filterable >
              <el-option
                v-for="item in types"
                :key="item.pValue"
                :label="item.zhName"
                :value="item.pValue">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="附件" prop="fileList">
            <el-upload class="upload-demo" accept=".pdf" name='files' :before-upload='beforeUpload' :on-success='uploadSuccess' :action='serverUrl+"/announcement/file"' :headers="{'Authorization': data}" :file-list="fileList">
              <el-button size="mini" type="" >上传文件</el-button>
            </el-upload>
          </el-form-item>
          
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="improve" size="small">发布</el-button>
          <el-button type="primary" @click="quit" size="small">取消</el-button>
        </span>
      
    </el-dialog>
  </div>
    </div>

</template>

<script>
  import {getList ,detail,addAndEdit,improve,cancel,upload} from "@/api/system/announce.js";
  import {getType} from "@/api/system/param.js";
  import {serverUrl} from "@/axios/request.js";
  import Daterange from "../com/date";
  
  export default {
    name: 'announce',
    components:{
      Daterange
    },
    data() {
      return {
        data:sessionStorage.getItem('data'),
        rules: {
          title: [
            { required: true, trigger: 'blur',message:'标题不能为空'}
          ],
          type: [
            { required: true, trigger: 'blur',message:'类型不能为空'}
          ],
          fileList: [
            { required: true, trigger: 'blur',message:'附件不能为空'}
          ],
        },
        resetData:false,
        serverUrl: serverUrl,
        form:{
          title:'',
          type:'',

        },
        time:'',
        types:[
         
        ],
        selForm:{
          title:'',
          startTime:'',
          endTime:'',
          typeId:'',
        },
        fileList:[],
        rowData: {},
        dialogVisible: false,
        dialogVisible1: false,
        list: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
      }
    },
    created() {
      this.getList()
      this.getType()
    },
    watch:{
      fileList:{
        handler:function(n,o){
          // console.log(n)
        }
      }
    },
    methods: {
      beforeUpload(val){
        // console.log(val)
        if(val.type=='application/pdf'){
          return true
        }else{
          this.$message.error('请上传pdf文件')
          return false
        }
      },
      async getType(){
        var data ={
          model:1,
          func:1,
        }
        const res = await getType(data);
        // console.log('公告类型',res)
        if(res){
          this.types = res.data.data
        }
      },
      watchTime(data){
      // console.log(data)
      this.selForm.startTime = data.startTime
      this.selForm.endTime = data.endTime
      this.resetData = false
    },
    del(id){
      this.$confirm('是否确认操作', '撤销', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(() => { 
         this.cancel(id)
        })
        .catch(action => {
        });
    },
      async cancel(id){
        var data ={
          id:id
        }
        // console.log(data)
        const res = await cancel(data)
        // console.log('撤销结果',res)
        if(res){
          this.getList()
        }
      },
      uploadSuccess(res, file, fileList){
        // console.log(res,file,fileList)
        if(res){
          this.fileList = res.data.map(item=>{
            return {
              name:item.fileName,
              url:item.fileStoragePath,
              id:item.id,
            }
          })
        }
      },
      // async upload(){
      //   // var data ={
      //   //   files:files
      //   // }
      //   const res = await upload(data)
        
      //   // console.log('上传文件',res)
      //   if(res){
      //     this.fileList=res.data.data
      //     // console.log(this.fileList)
      //   }
      // },
      search(){
        this.currentPage =1
        this.getList()
      },
      reset(){
        this.resetData = true
        this.selForm.title = ''
        this.selForm.typeId = ''
        this.selForm.startTime = ''
        this.selForm.endTime = ''
        // this.time={}
        this.getList()
      },
      async improve(){
        var data ={
          title:this.form.title,
          typeId:this.form.type,
          fileList:this.fileList.map(item=>{
            return {
              fileName:item.name,
              fileStoragePath:item.url,
              id:item.id
            }
          })
        }
        const res = await addAndEdit(data)
        // console.log('新增或编辑结果',res)
        if(res){
          this.resetForm('form')
          this.clearForm()
          this.getList()
          this.dialogVisible = false
        }
      },
      quit(){
        this.resetForm('form')
        this.clearForm()
        this.dialogVisible = false
      },
      clearForm(){
        this.form ={
          title:'',
          type:''
        }
        this.fileList = []
      },
      //展开搜索框
      change() {
        this.dialogVisible1 = !this.dialogVisible1;
      },
      rowClick(row) {
        // console.log(row)
        this.rowData = row
        // console.log(row.id)
      },
      //获取角色列表
      async getList() {
        var data = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          title: this.selForm.title,
          releaseStartTime: this.selForm.startTime,
          releaseEndTime: this.selForm.endTime,
          typeId: this.selForm.typeId,
        }
        const res = await getList(data)
        // console.log('公告列表',res)
        if(res){
          this.list = res.data.data.list
          this.total = res.data.data.total
        }
      },
      //修改表单提交
      submitForm(formName) {
        this.$formTest.submitForm(this.$refs[formName],this.improve)  
      },
      //重置表单
      resetForm(formName) {
        this.$formTest.resetForm(this.$refs[formName])  
      },
      //新建框
      add() {
        this.dialogVisible = true;
      },
      // 分页
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList()
      }
    }
  }
</script>

<style lang='scss'>
  $sc:12;
.announce{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;

  .el-dialog{
    .el-form-item{
      width: 100%;
      .el-select{
        width: 100%;
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
    .selForm{
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
    .form {
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          width: 100%;
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
      // background: #fff;
      .btns{
        padding: 10px 20px;
        // background: pink;
      }
      .tab{
        padding-bottom: 52px;
        box-sizing: border-box;
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        position: relative;
        .el-table{
          height: 100%;
          position: relative;
          td{
            height: 10%;
          }
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