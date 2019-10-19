<template>
  <div class="customerApprove">
    <div class="sellBox"> 
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >客户管理</el-breadcrumb-item>
          <el-breadcrumb-item to=''>报备审批</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="客户名称">
            <el-input size='small' placeholder="请输入" v-model="form.customerName"></el-input>
          </el-form-item>
          <el-form-item label="客户内部编号">
            <el-input size='small' placeholder="请输入" v-model="form.customerInCode"></el-input>
          </el-form-item>
          <el-form-item label="客户外部编号">
            <el-input size='small' placeholder="请输入" v-model="form.customerOutCode"></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-select v-model="form.businessType" size="small" filterable placeholder="请选择">
              <el-option v-for="item in businessTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报备日期" class="date">
            <Daterange @data='watchCreatTime' :resetDataCreate='resetData' />
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain @click="search">搜索</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <!-- <div class="btns">
          <el-button type='primary' class="add" size='mini' @click="report">报备</el-button>
          <el-button type='primary' class="add" size='mini' @click="upload">拜访记录上传</el-button>
        </div> -->
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" @row-click='rowClick'>
            <el-table-column type="index" width='80' label="编号" :index='q'>
            </el-table-column>
            <el-table-column prop="custName" width="150" show-overflow-tooltip label="客户名称" >
            </el-table-column>
            <el-table-column prop="custInCode" width="150" label="客户内部编号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="custOutCode" width="150" label="客户外部编号" show-overflow-tooltip>
            </el-table-column>
           <el-table-column prop="businessType" width="150" label="客户类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="reportDealerName" width="150" label="报备代理商" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="reportSalesName" width="150" label="报备销售" show-overflow-tooltip>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="createTime" width="180" label="报备日期" sortable> 
            </el-table-column>
            <el-table-column  prop="" width='160' label="操作" fixed='right'>
              <template slot-scope="scope">
                <el-button type='text'  @click='mx(scope.row.id)'>明细</el-button>
                <el-button type='text'  @click='add(1)'>审批</el-button>
                <el-button type='text'  @click='add(2)'>驳回</el-button>
              </template>
            </el-table-column>
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
    </div>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible1"
        width="400px"
        top="10vh"
        >
        <el-form ref="form1" :model="form1" :rules='rules' size="small" class="form1" label-width="auto" label-position='top'  >
          <el-form-item :label="rowData.reportDealerName ? '销售':'代理商'" v-if="title=='审批'" :prop='(title=="审批"&&rowData.reportSalesName)?"":"value"'>
            <el-select v-model="form1.value" placeholder="请选择" > 
              <el-option
                v-for='item in rowData.reportDealerName ? salers  : delears '
                :key='rowData.reportDealerName ? item.userNo : item.id '
                :label='rowData.reportDealerName ? item.userName : item.custName'
                :value='rowData.reportDealerName ? item.userNo : item.id'
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="label" :prop="title=='审批'?'':'msg'">
            <el-input size='small' v-model="form1.msg" rows='4' resize="none" type="textarea" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="close" size="small" type="primary" plain>取 消</el-button>
            <el-button type="primary" @click="submitForm('form1',title=='审批'?1:2)" size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
import Daterange from "../com/date";
import {getList,approve,ret,getEmployeeIds,getDealers} from "@/api/customer/query.js";

export default {
  name: "customerApprove",
  components:{
    Daterange
  },
  data() {
    return {
      salers:[
        
      ],
      delears:[
        
      ],
      rules: {
        value: [{ required: true, trigger: "blur" ,message:'请选择'}],
        msg: [{ required: true, trigger: "blur" ,message:'请输入'}],
      },
      rowData:{},
      resetData:false,
      form:{
        businessType:'',
        customerName:'',
        customerInCode:'',
        customerOutCode:'',
        reportStartDate:'',
        reportEndDate:'',
      },
      form1:{
        value:'',
        msg:'',
      },
      title:'',
      label:'',
      dialogVisible1:false,
      businessTypes: [
        {
          value:"A03",
          label: "Mass Market"
        },
        {
          value: "A01",
          label: "Account Market"
        }
      ],
      value: "",
      dialogVisible: false,
      tableData: [
      ],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 10,
      total:0,

    };
  },
  computed: {
    userType() {
      if(this.$store.state.loginUser.loginInfo.userType=='agent'){
        return '代理商'
      }else if(
        this.$store.state.loginUser.loginInfo.userType=='subAgent'
      ){
        return '子代理商'
      }else{
        return '内部客户'
      }
    }
  },
  created() {
    this.getList()
    this.getEmployeeIds()
    this.getDealers()
  },
  watch: {},
  methods: {
    async getEmployeeIds(){
      const res = await getEmployeeIds();
      // console.log('销售列表',res)
      if(res){
       this.salers = res.data.data
      }
    },
    async getDealers(){
      const res = await getDealers();
      // console.log('代理商列表',res)
      if(res){
       this.delears = res.data.data
      }
    },
    rowClick(row){
      this.rowData = row
    },
    submitForm(formName,type){
      this.$formTest.submitForm(this.$refs[formName],type==1 ?this.sure : this.ret)
    },
    resetForm(formName){
      this.$formTest.resetForm(this.$refs[formName])
    },
    close(){
      this.resetForm('form1')
      this.form1={
        value:'',
        msg:'',
      }
      this.dialogVisible1 = false
    },
    watchCreatTime(data){
      // console.log(data)
      this.form.reportStartDate = data.startTime
      this.form.reportEndDate = data.endTime
      this.resetData = false
    },
    search(){
      this.currentPage = 1
      this.getList()
    },
    reset(){
      this.form = {
        businessType:'',
        customerName:'',
        customerInCode:'',
        customerOutCode:'',
        reportStartDate:'',
        reportEndDate:'',
      }
      this.resetData = true
      this.search()
    },
    async getList(){
      var data ={
        pageIndex:this.currentPage,
        pageSize:this.pageSize,
        customerName:this.form.customerName,
        customerInCode:this.form.customerInCode,
        customerOutCode:this.form.customerOutCode,
        // isLicense:form.isLicense,
        businessType:this.form.businessType,
        reportStartDate:this.form.reportStartDate,
        reportEndDate:this.form.reportEndDate,
        customerStatus:2,
        queryType:2,
      }
      const res = await getList(data);
      // console.log('报备审批列表',res)
      if(res){
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      }
    },
    mx(id){
      this.$router.push({
        name:'customerAdd',
        query:{
          id:id
        }
      })
    },
    del(){
      this.$confirm('是否删除该条报备信息', '删除', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(() => { 
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(action => {
          this.$message({
            type: 'fail',
            message: '已取消操作'
          })
        });
    },
    upload(){
      this.dialogVisible1 = true
    },
    report(){
      this.$router.push({
        name:'black'
      })
    },

    change() {
      this.dialogVisible = !this.dialogVisible;
    },
    
    async ret() {
      var data ={
        custId:this.rowData.id,
        // dealerId:this.userType.indexOf('代理商')==-1?this.form1.value :'',
        // salesId:this.userType.indexOf('代理商')!=-1?this.form1.value :'',
        approvalRemark:this.form1.msg,
        approvalType:0
      }
      const res = await ret(data);
      // console.log('驳回结果',res);
      if(res){
        this.$message.success('已驳回')
        this.close()
        this.dialogVisible1 = false
        this.getList()
      }
    },
    async sure() {
      var data ={
        custId:this.rowData.id,
        dealerId:'',
        salesId:'',
        approvalRemark:this.form1.msg,
        approvalType:1
      }
      if(this.rowData.reportDealerName){
        data.salesId = this.form1.value
      }else{
        data.dealerId= this.form1.value
      }
      const res = await approve(data);
      // console.log('审批结果',res);
      if(res){
        this.$message.success('审批通过')
        this.close()
        this.dialogVisible1 = false
        this.getList()
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    add(type) {
      this.dialogVisible1 = true
      if(type==1){
        this.title = '审批'
        this.label = '审批信息'
      }else{
        this.title = '驳回'
        this.label = '驳回信息'
      }
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.customerApprove{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;
  .el-dialog{
    .form1 {
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
          padding: 10px 0;
          width: 100%;
          .el-pagination {
            padding: 0;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>