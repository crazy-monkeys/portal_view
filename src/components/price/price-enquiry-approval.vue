<template>
  <div class="price-enquiry-approval">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >价格管理</el-breadcrumb-item>
          <el-breadcrumb-item>询价审批</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="申请人">
            <el-input size='small'  v-model="form.proposer" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="审批状态">
            <el-select v-model="form.approvalStatus" size="small" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' @click="search" plain>查询</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns">
              <el-button class="add" size='small' type='primary'  :disabled="multipleSelection.length==0" @click='add1(1)' >通过</el-button>
              <el-button class="add" size='small' type='primary'  :disabled="multipleSelection.length==0" @click='add1(2)' >驳回</el-button>

        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width='' label=" " >
            </el-table-column>
            <el-table-column type="index" width='100' label="序号" :index='q'>
            </el-table-column>
            <el-table-column prop="proposer"  width='100' show-overflow-tooltip label="申请人">
            </el-table-column>
            <el-table-column prop=""  width='100' label="审批状态" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.approvalStatus=='pass'?'通过':scope.row.approvalStatus=='reject'? '驳回':'待审批'}}
              </template>
            </el-table-column>
            <el-table-column prop="applyRemark"  width='100' label="审批说明" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" width='80' show-overflow-tooltip label="状态">
            </el-table-column>
            <el-table-column prop="bu" width='80' show-overflow-tooltip label="BU">
            </el-table-column>
            <el-table-column prop="pdt" width='80' label="PDT" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="productType" width='150' label="Product Type" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="platform" width='100' show-overflow-tooltip label="平台">
            </el-table-column>
            <el-table-column prop="productModel" width='150' label="产品型号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column show-overflow-tooltip width='150' prop="catalogPrice" label="目录价格">
            </el-table-column>
             <el-table-column show-overflow-tooltip width='150' prop="inCustomer" label="内部客户">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="effectTime" width='150' label="生效时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="deadTime" width='150' label="失效时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="modifyTime" width='150' label="更新时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="remark" width='150' label="备注">
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
        :title="title"
        :visible.sync="dialogCreate"
        width="400px"
        :before-close="cancel"
        >
        <el-form ref="form1" :rules='rules' :model="form1" size="small" class="form" label-width="auto" label-position='top'  >
          <el-form-item :label="label" prop="approvalRemark">
            <el-input size='small' v-model="form1.approvalRemark" rows='4' resize="none" type="textarea" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel" size="small" type="primary" plain>取 消</el-button>
            <el-button type="primary" @click="submitForm('form1')" size="small">确 定</el-button>
          </span>
    </el-dialog>
   
  </div>
</template>

<script>
  import {getList,approve} from "@/api/price/priceApproval.js";
export default {
  name: "priceEnquiryApproval",
  data() {
    return {
      form1:{
        approvalRemark:'',
        approvalStatus:'',
      },
      title:'',
      label:'',
      form: {
        proposer:'',
        approvalStatus:'pending',
      },
      options: [
        {
          value: "pending",
          label: "待审批"
        },
        {
          value: "pass",
          label: "通过"
        },
        {
          value: "reject",
          label: "驳回"
        },
      ],
      dialogVisible: false,
      dialogCreate: false,
      tableData: [],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 10,
      total: 0,
      multipleSelection:[],
      rules:{
        approvalRemark: [{ required: true, trigger: "change" ,message:'请输入审批信息'}],
      },
    };
  },
  computed: {
  },
  created() {
    this.getList()
  },
  watch: {},
  methods: {
    handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    cancel(){
      this.dialogCreate=false
      this.form1 = {
        approvalRemark :'',
        approvalStatus :'',
      }
      this.resetForm('form1')
    },
    submitForm(formName){
      this.$formTest.submitForm(this.$refs[formName],this.commit)
    },
    resetForm(formName){
      this.$formTest.resetForm(this.$refs[formName])
    },
    search(){
        this.currentPage = 1
        this.getList()
      },
    reset(){
      this.currentPage=1
      this.pageSize=10
      this.form = {
        approvalStatus:'pending',
        proposer:''
      }
      this.resetData = true
      this.getList()
    },
    async commit(){
      const data ={
        applyIds:this.multipleSelection.map(item=>item.id),
        approvalRemark:this.form1.approvalRemark,
        approvalStatus:this.form1.approvalStatus,
      }
      const res = await approve(data);
      console.log('审批结果',res);
      if(res){
        this.cancel()
        this.getList()
      }
    },
    async getList(){
      const data ={
        pageIndex:this.currentPage,
        pageSize:this.pageSize,
        proposer:this.form.proposer,
        approvalStatus:this.form.approvalStatus
      } 
      const res = await getList(data);
      console.log('审批列表',res);
      if(res){
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      }
    },
    add1(type) {
      this.dialogCreate = true
      if(type==1){
        this.form1.approvalStatus ='pass'
        this.title = '审批'
        this.label = '审批信息'
      }else{
        this.form1.approvalStatus ='reject'
        this.title = '驳回'
        this.label = '驳回信息'
      }
    },
    change() {
      this.dialogVisible = !this.dialogVisible;
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.price-enquiry-approval{
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
        .inp{
          width: 100%;
        }
        .last{
          width: 100%;
        }
        .sub{
          width: 100%;
          display: flex;
          justify-content: center;
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
