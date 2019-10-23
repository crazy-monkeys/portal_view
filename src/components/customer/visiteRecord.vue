<template>
  <div class="visiteRecord">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >客户管理</el-breadcrumb-item>
          <el-breadcrumb-item>拜访记录上传</el-breadcrumb-item>
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
              <!-- <el-form-item label="客户名称">
                <el-input  placeholder="请输入" v-model="form.customerName"></el-input>
              </el-form-item> -->
              <el-form-item label="客户编号">
                <el-input  placeholder="请输入" v-model="form.customerCode"></el-input>
              </el-form-item>
              <el-form-item label="项目名称">
                <el-input  placeholder="请输入" v-model="form.projectName"></el-input>
              </el-form-item>
              <el-form-item label="拜访目的">
                <el-input  placeholder="请输入" v-model="form.visitPurpose"></el-input>
              </el-form-item>
              <el-form-item label="拜访日期" class="date">
                <Daterange @data='watchCreatTime' :resetDataCreate='resetData' />
              </el-form-item>
              <el-form-item label=" ">
                <el-button  type='primary' plain @click="search">查询</el-button>
                <el-button   type='primary' plain @click="reset"> 重置</el-button>
              </el-form-item>
            </el-form>

          </div>
          <div class="box">
            <div class="tab">
              <el-table :data="tableData" border style="width: 100%" height="100%">
                <!-- <el-table-column prop="errorMessage" width='100' label="错误信息" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="visitDate" width='100' label="拜访日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerLocation" width='100' label="客户所在地" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerCode" width='100' label="客户编号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerName" width='100' label="客户名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="visitNumber" width='100'  label="拜访次数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="visitPurpose" width='100'  label="拜访目的" show-overflow-tooltip></el-table-column>
                <el-table-column prop="projectName" width='100'  label="项目名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="projectStatus" width='100'  label="项目状态" show-overflow-tooltip></el-table-column>
                <el-table-column prop="projectDepartment" width='200'  label="项目所属展锐事业部" show-overflow-tooltip></el-table-column>
                <el-table-column prop="talkContent" width='180'  label="会议内容简述" show-overflow-tooltip></el-table-column>
                <el-table-column prop="followPlan" width='180'  label="后续行动计划" show-overflow-tooltip></el-table-column>
                <el-table-column prop="claimDescription" width='180'  label="述求描述" show-overflow-tooltip></el-table-column>
                <el-table-column prop="participantsZr" width='180'  label="参与人员:展锐" show-overflow-tooltip></el-table-column>
                <el-table-column prop="participantsCt" width='180'  label="参与人员:客户" show-overflow-tooltip></el-table-column>
                <el-table-column prop="participantsDl" width="180" label="参与人员:代理" show-overflow-tooltip></el-table-column>
                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
              <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 20,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
              </el-pagination>
            </div>
            </div>
            
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传" name="second">
          <div class="box">
            <div class="btns clear">
              <el-button   size='small' type='primary' @click="download">下载模版</el-button>
              <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :headers='headers'
                    name="files"
                    accept=".xlsx,.xls"
                    :auto-upload="true"
                    :show-file-list="false"
                    :on-success="suc"
                    >
                    <el-button size="small"  type="primary">上传</el-button>
                  </el-upload>
              <el-button   size='small' type='primary' @click="sub" :disabled="uploadSuc">提交</el-button>
            </div>
            <div class="tab">
              <el-table :data="uploadData" border style="width: 100%" height="100%">
                <!-- <el-table-column prop="errorMessage" width='100' label="错误信息" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="visitDate" width='100' label="拜访日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerLocation" width='100' label="客户所在地" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerCode" width='100' label="客户编号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerName" width='100' label="客户名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="visitNumber" width='100'  label="拜访次数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="visitPurpose" width='100'  label="拜访目的" show-overflow-tooltip></el-table-column>
                <el-table-column prop="projectName" width='100'  label="项目名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="projectStatus" width='100'  label="项目状态" show-overflow-tooltip></el-table-column>
                <el-table-column prop="projectDepartment" width='200'  label="项目所属展锐事业部" show-overflow-tooltip></el-table-column>
                <el-table-column prop="talkContent" width='180'  label="会议内容简述" show-overflow-tooltip></el-table-column>
                <el-table-column prop="followPlan" width='180'  label="后续行动计划" show-overflow-tooltip></el-table-column>
                <el-table-column prop="claimDescription" width='180'  label="述求描述" show-overflow-tooltip></el-table-column>
                <el-table-column prop="participantsZr" width='180'  label="参与人员:展锐" show-overflow-tooltip></el-table-column>
                <el-table-column prop="participantsCt" width='180'  label="参与人员:客户" show-overflow-tooltip></el-table-column>
                <el-table-column prop="participantsDl" width="180" label="参与人员:代理" show-overflow-tooltip></el-table-column>
                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {getList,download,submit} from '@/api/customer/visiteRecord.js'
  import Daterange from "../com/date";
  import {serverUrl} from '../../axios/request'

  export default {
    name: 'visiteRecord',
    components:{
      Daterange
    },
    data() {
      return {
        uploadSuc:true,
        activeName:'first',
        url:serverUrl + '/customer/visitRecord/upload',
        headers:{
          "Authorization": sessionStorage.getItem("data"),
        },
        dialogVisible:false,
        resetData:false,
        //表格数据
        tableData: [
         
        ],
        uploadData:[],
        form: {
          projectName:'',
          visitPurpose:'',
          customerName:'',
          createStartDate:'',
          createEndDate:'',
        },
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        //总量
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
      handleClick(){},
      suc(val){
        // console.log(val)
        if(val.code!=1){
          this.$message.error(val.msg)
        }else{
          this.$message.success('上传成功')
          this.uploadSuc = false;
          this.uploadData = val.data
        }
      },
      async sub(){
        const data ={
          ids:this.uploadData.map(item=>{
            return item.id
          })
        }
        const res = await submit(data);
        // console.log('提交结果',res);
        if(res){
          this.$message.success('提交成功');
          this.activeName = 'first'
        }
      },
      download() {
          this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/customer/visitRecord/download",
            responseType: ["arraybuffer",'application/json;charset=UTF-8'],
            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          })
            .then(res => {
              if(res.data.msg){
                this.$message.error(res.data.msg)
              }else{
              // console.log(res.data);
              const blob = new Blob([res.data], {
                type: "application/vnd.ms-excel"
              });
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.download = "模版.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
              }
            })
            .catch(err => {
              // console.log(err);
              alert("网络异常");
            });
      },
      search(){
        this.currentPage =1
        this.getList()
      },
      reset(){
        this.form = {
          projectName:'',
          visitPurpose:'',
          customerCode:'',
          createStartDate:'',
          createEndDate:'',
        }
        this.resetData = true
        this.search()
      },
      watchCreatTime(data){
        // console.log(data)
        this.form.createStartDate = data.startTime
        this.form.createEndDate = data.endTime
        this.resetData = false
      },
      async getList(){
        var data ={
          pageIndex	:this.currentPage,
          pageSize	:this.pageSize,
          customerCode	:this.form.customerCode,
          projectName	:this.form.projectName,
          visitPurpose	:this.form.visitPurpose,
          visitStartDate	:this.form.createStartDate,
          visitEndDate	:this.form.createEndDate,
        }
        const res = await getList(data);
        // console.log('摆放记录列表',res)
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      change(){
        this.dialogVisible = !this.dialogVisible
      },
      q(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1
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
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;

.visiteRecord{
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