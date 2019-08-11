<template>
  <div class="shipmentQuery">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >交付管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{type==1 ?  '出货数据查询' :'收货数据查询'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>

          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>

        </div>
        <el-form ref="form" :model="form" size="small" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="代理商">
            <el-input size='small' placeholder="请输入" v-model="form.dealerName"></el-input>
          </el-form-item>
          <el-form-item label="上传日期"  class="date">
            <Daterange @data='watchTime' :resetDataReg='resetData' />
          </el-form-item>
          <el-form-item label="类型" >
            <el-select v-model="form.status">
              <el-option v-for="item in options" :key="item.value" :value="item.value" :label='item.label'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="' '">
            <el-button size='small' type='primary' plain @click="search">查询</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" @row-click='rowClick'>
            <el-table-column prop="type" width='150' label="类型" >
              <template slot-scope='scope'>
                {{scope.row.type==1 ? '出货':'收货'}}
              </template>
            </el-table-column>
            <el-table-column prop="dealerName" width='' label="代理商" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="0" width='' label="出货日期"></el-table-column> -->
            <el-table-column prop="uploadTimeStr" width="150" label="上传日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="statusDesc" width="150" label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column  label="操作" fixed="right" width="100" show-overflow-tooltip>
              <template slot-scope='scope' >
                <el-button type="text" @click="mx(scope.row)">明细</el-button>
                <el-button type="text" @click="bz" >确认</el-button>
              </template>
            </el-table-column>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
           <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10,20,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
       
      </div>
    </div>
    <el-dialog
  title="确认"
  :visible.sync="dialogVisible3"
  width="400px"
  >
  <el-form ref="form" :model="form3" size="small" class="form" label-width="auto" label-position='top'>
    <el-form-item label="确认信息" >
      <el-input size='small' type="textarea" row='4' v-model="form3.msg" placeholder="请输入"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button size='small' type='primary' @click='pass(1)'  plain>通过</el-button>
    <el-button @click='ret(3)' size='small' type='primary' >驳回</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
  import Daterange from "../com/date";
  import {download,sub,upload,downloadError,operat} from '@/api/handover/upload.js'
  import {getList} from '@/api/handover/index.js'
  import {serverUrl} from '../../axios/request'
  export default {
    name: 'shipmentQuery',
    components:{
      Daterange
    },
    data() {
      return {
        rowData:{},
        options:[
          {label:'待确认',value:-1},
          {label:'初始化',value:0},
          {label:'已确认',value:1},
          {label:'已提交',value:2},
          {label:'已驳回',value:3},
        ],
        resetData:true,
        form3:{
          msg:''
        },
        dialogVisible3:false,
        form: {
          dealerName:'',
          status:'',
          uploadStartTime:'',
          uploadEndTime:'',
        },
        value: '',
        dialogVisible: false,
        tableData: [
        ],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        total: 0,
      }
    },
    computed: {
      type(){
        return this.$route.query.type
      }
    },
    created() {
      this.getList()
    },
    watch: {
      type:{
        handler:function(n,o){
          this.getList()
        }
      }
    },
    methods: {
      rowClick(row){
        console.log(row)
        this.rowData = row
      },
      reset(){
        this.form = {
          dealerName:'',
          status:'',
          uploadStartTime:'',
          uploadEndTime:'',
        }
        this.resetData = true
        this.getList()
      },
      search(){
        this.currentPage=1
        this.getList()
      },
      watchTime(data){
        console.log(data)
        this.form.uploadStartTime = data.startTime
        this.form.uploadEndTime = data.endTime
        this.resetData = false
      },
      async operat(type){
        var data ={
          id:this.rowData.id
        }
        var param={
          type:type==1?'deliver':'receive',
          remark:this.form3.msg,
          status:type,
        }
        const res = await operat(data,param)
        console.log('确认结果',res);
        if(res){
          this.$message.success(type==1?'确认成功':'驳回成功')
          this.dialogVisible3= false
          this.form.msg = ''
          this.getList()
        }
      },
      ret(type){
        this.operat(type)
      },
      pass(type){
        this.operat(type)
      },
      bz(){
        this.dialogVisible3= true
      },
      async getList(){
        var data ={
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          dealerName:this.form.dealerName,
          status:this.form.status,
          uploadStartTime:this.form.uploadStartTime,
          uploadEndTime:this.form.uploadEndTime,
        }
        const res = await getList(data)
        console.log('出货数据列表',res);
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      mx(row){
        this.$router.push({
          name:'shipmentDetail',
          query:{
            id:row.id,
            type:row.type==1? 'deliver':'receive'
          }
        })
      },
      change() {
        this.dialogVisible = !this.dialogVisible
      },
      sure() {
        this.dialogVisible = false
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => { });
      },
      q(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1
      },
      add() {
        this.$router.push(
          {
            name: 'AddSell'
          }
        )
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
.shipmentQuery{
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