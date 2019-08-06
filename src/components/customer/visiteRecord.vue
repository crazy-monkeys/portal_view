<template>
  <div class="visiteRecord">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to=''>客户管理</el-breadcrumb-item>
          <el-breadcrumb-item>拜访记录上传</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
       
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>

          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>

        </div>
        <el-form ref="form" :model="form" size="small" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="客户名称">
            <el-input  placeholder="请输入" v-model="form.customerName"></el-input>
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
        <div class="btns clear">
          <el-button   size='small' type='primary' @click="download">下载模版</el-button>
          <el-button   size='small' type='primary'>上传</el-button>
          <!-- <el-button   size='small' type='primary'>新建</el-button> -->
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%">
             <!--<el-table-column   label="" width="60">
              <template slot="header" >
                <el-dropdown :hide-on-click='false' placement='bottom-start' trigger="click">
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                        全选</el-checkbox>
                        </el-dropdown-item>
                    <el-dropdown-item divided>批量删除</el-dropdown-item>
                    <el-dropdown-item>批量验证</el-dropdown-item>
                    <el-dropdown-item >批量保存</el-dropdown-item>
                    <el-dropdown-item >批量提交</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
              <template >
                 <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                        全选</el-checkbox>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city"></el-checkbox>
                </el-checkbox-group> 
                <el-checkbox></el-checkbox>
              </template>
                
            </el-table-column>-->
            <el-table-column prop="errorMessage" width='100' label="错误信息" show-overflow-tooltip></el-table-column>
            <el-table-column prop="visitDate" width='100' label="拜访日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerLocation" width='100' label="客户所在地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="2" width='100' label="客户名称" show-overflow-tooltip></el-table-column>
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
              <p>未查询到客户信息</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 100]" :page-size="10" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  import {getList,download} from '@/api/customer/visiteRecord.js'
import Daterange from "../com/date";

  export default {
    name: 'visiteRecord',
    components:{
      Daterange
    },
    data() {
      return {
        status:'',
        dialogVisible:false,
        cities:['上海','北京','杭州'],
        checkAll: false,
        checkedCities: [
        ],
        conditions: [
        ],
        resetData:false,
        isIndeterminate: false,
        //表格数据
        tableData: [
         
        ],
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
      download() {
          this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/customer/visitRecord/download",
            responseType: "arraybuffer",
            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          })
            .then(res => {
              console.log(res.data);
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
            })
            .catch(err => {
              console.log(err);
              alert("网络异常");
            });
      },
      search(){
        this.getList()
      },
      reset(){
        this.form = {
          projectName:'',
          visitPurpose:'',
          customerName:'',
          createStartDate:'',
          createEndDate:'',
        }
        this.resetData = true
        this.getList()
      },
      watchCreatTime(data){
        console.log(data)
        this.form.createStartDate = data.startTime
        this.form.createEndDate = data.endTime
        this.resetData = false
      },
      async getList(){
        var data ={
          pageIndex	:this.currentPage,
          pageSize	:this.pageSize,
          customerCode	:this.form.customerName,
          projectName	:this.form.projectName,
          visitPurpose	:this.form.visitPurpose,
          visitStartDate	:this.form.createStartDate,
          visitEndDate	:this.form.createEndDate,
        }
        const res = await getList(data);
        console.log('摆放记录列表',res)
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      change(){
        this.dialogVisible = !this.dialogVisible
      },
      handleCheckAllChange(val) {
        console.log(val)
        this.checkedCities = val ? this.cities : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log(value)
        console.log(this.checkedCities)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      q(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
          .el-dropdown{
            padding: 0;
            .el-icon--right{
              margin: 0;
            }
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