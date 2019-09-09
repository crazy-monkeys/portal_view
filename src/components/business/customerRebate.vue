<template>
  <div class="customerRebate">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >商务管理</el-breadcrumb-item>
          <el-breadcrumb-item>客户Rebate</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="代理商">
            <el-input size='small' v-model="form.dealerName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户">
            <el-input size='small' v-model="form.customerName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" size="small"> 
              <el-option label="客户已确认" value='1'></el-option> 
              <el-option label="客户未确认" value='2'></el-option> 
            </el-select>
          </el-form-item>
          <el-form-item label=' '>
            <el-button size='small' type='primary' @click="search" plain>查询</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns">
          <el-button type="primary" size="small" @click="send" :disabled="multipleSelection.length==0">发送确认函</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" border height="100%" @row-click='rowClick' @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="" width="150" label="释放金额" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.money" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="agencyName" width="150" label="代理商" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerShortName" width="150" label="客户简称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerType" width="150" label="客户类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="salesName" width="150" label="销售名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="amebaHeader" width="150" label="阿米巴队长" show-overflow-tooltip></el-table-column>
            <el-table-column prop="amebaDepartment" width="150" label="阿米巴部门" show-overflow-tooltip></el-table-column>
            <el-table-column prop="shipmentCompany" width="150" label="出货公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="accountYearMonth" width="150" label="核算年月" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orderMonth" width="150" label="订单年月" show-overflow-tooltip></el-table-column>
            <el-table-column prop="shipmentYearMonth" width="150" label="出货年月" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bu" width="150" label="BU" show-overflow-tooltip></el-table-column>
            <el-table-column prop="pdt" width="150" label="PDT" show-overflow-tooltip></el-table-column>
            <el-table-column prop="product" width="150" label="产品型号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qty" width="150" label="数量" show-overflow-tooltip></el-table-column>
            <el-table-column prop="salesPrice" width="150" label="Sales Price" show-overflow-tooltip></el-table-column>
            <el-table-column prop="poPrice" width="150" label="Old Price" show-overflow-tooltip></el-table-column>
            <el-table-column prop="actualPrice" width="150" label="Actual Price" show-overflow-tooltip></el-table-column>
            <el-table-column prop="platform" width="150" label="平台" show-overflow-tooltip></el-table-column>
            <el-table-column prop="rebateAmount"  width="150" label="Rebate金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="releaseAmount" width="150" label="已释放金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="surplusRebateAmount" width="150" label="剩余可释放金额" show-overflow-tooltip></el-table-column>
            <el-table-column label="状态" width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.status==1 ?'客户未确认':'客户已确认' }}
              </template>
            </el-table-column>
            <el-table-column  label="操作" width="160" fixed="right">
              <template slot-scope="scope">
                <!-- <el-button type='text' @click="send(scope.row.id)">发送确认函</el-button> -->
                <el-button type='text' @click="mx(scope.row.id)">明细</el-button>
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
      title="发送确认函"
      :visible.sync="sendVis"
      width="400px"
      :before-close="cancel">
        <el-form ref="sendForm" :model="sendForm" :rules='rules' class="sendForm" label-width="auto" label-position='top' >
          <el-form-item label="执行方">
            <el-select v-model="sendForm.executor" size="small"> 
              <el-option v-for="item in executors" :key='item.id' :value="item.custName" :label="item.custName"> </el-option> 
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="释放金额">
            <el-input size='small' v-model="sendForm.surplusRebateAmount" placeholder="请输入"></el-input>
          </el-form-item> -->
          <el-form-item label="执行方式">
            <el-select v-model="sendForm.executeStyle" size="small"> 
              <el-option label="方式1" value='1'></el-option> 
              <el-option label="方式2" value='2'></el-option> 
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
  </div>
</template>

<script>
import {getList,send,getAll,detail} from '@/api/business/rebate.js'
  export default {
    name: 'customerRebate',
    data() {
      return {
        success:false,
        multipleSelection:[],
        rules:{},
        sendForm:{
          executor:'',
          surplusRebateAmount:'',
          executeStyle:'',
          remark:'',
        },
        executors:[],
        form: {
          dealerName:'',
          customerName:'',
          status:'',
        },
        dialogVisible: false,
        sendVis: false,
        tableData: [],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        //总数
        total: 0,
      }
    },
    computed: {
    },
    created() {
      this.getList()
      this.getAll()
    },
    watch: {
    },
    methods: {
       handleSelectionChange(val) {
        this.multipleSelection = val;
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
        this.$formTest.resetForm(this.$refs['sendForm'])
      },
      rowClick(row){
        this.rowData = row
      },
      async getAll(){
        const res = await getAll();
        console.log('所有执行方',res);
        if(res){
          this.executors = res.data.data;
        }
      },
      send(){
         var re= /^0\.\d+$|^[1-9]+(\.\d+)?$/
         var sucArr =  this.multipleSelection.filter(item=>{
           if(re.test(item.money)){
             return item
           }
         })
         if(sucArr.length==this.multipleSelection.length){
          this.success = true
          this.sendVis = true
         }else{
          this.success = false
          this.$message.error('请输入正确的有效金额')
         }
      },
      async commit(){
        const data ={
          rebates:this.multipleSelection.map(item=>{return {id:item.id,releaseAmount:item.money}}),
          executor:this.sendForm.executor,
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
        }
        const res = await getList(data);
        console.log('客户rebate列表',res);
        if(res){
          this.tableData = res.data.data.list.map(item=>{
            return {money:'',...item}
          })
          this.total = res.data.data.total
        }
      },
      mx(id){
        this.$router.push({
          name:'rebateDetail',
          query:{
            id:id
          }
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
        }
        this.search()
      },
      change() {
        this.dialogVisible = !this.dialogVisible
      },
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

 .customerRebate{
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