<template>
  <div class="price-enquiry">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >价格管理</el-breadcrumb-item>
          <el-breadcrumb-item>询价</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="产品型号">
            <el-input size='small'  v-model="form.productModel" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="内部客户">
            <el-input size='small' v-model="form.inCustomer" placeholder="请输入"></el-input>
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
          <el-button class="add" size='small' type='primary' @click='create' >新建</el-button>
        </div>
        <div class="tab"  >
          <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column type="index" width='100' label="序号" :index='q'>
            </el-table-column>
            <el-table-column prop="applyTime"  width='100' show-overflow-tooltip label="申请时间">
            </el-table-column>
            <el-table-column prop="applyRemark"  width='100' show-overflow-tooltip label="申请说明">
            </el-table-column>
            <el-table-column prop=""  width='100' label="审批状态" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.approvalStatus=='pass'?'通过':scope.row.approvalStatus=='reject'? '驳回':'待审批'}}
              </template>
            </el-table-column>
            <el-table-column prop="approvalRemark"  width='100' label="审批意见" show-overflow-tooltip>
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
            <el-table-column width="150" label="操作" fixed='right'>
              <template slot-scope='scope'>
                <el-button type='text'  size='small' @click="add">生成报价单</el-button>
                <el-button type='text' size='small' @click='del(scope.row.id)'>删除</el-button>
              </template>
            </el-table-column>
            <div slot="empty">

              <p>无数据</p>
            </div>
          </el-table>
        <!-- 2 -->

          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 20,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
      </div>
    </div>
    <el-dialog title="新建询价单" :visible.sync="dialogCreate" width="400px" :before-close="cancel">
      <div class="sels clear">
        <el-form ref="addForm" :model="addForm" class="form" :rules='rules' label-width="auto" label-position='top' :inline='true'>
          <el-form-item label="产品型号" prop="productModel"  class="inp">
            <el-input size="small" v-model="addForm.productModel" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="内部客户"  prop="inCustomer" class="inp">
            <el-input size="small" v-model="addForm.inCustomer" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="申请说明" prop="applyRemark" class="last">
             <el-input type='textarea' v-model='addForm.applyRemark' :rows="2" placeholder="" resize='none'></el-input>
          </el-form-item>
          <el-form-item label=" " class="sub">
            <el-button class="add" size='small' type='primary' @click='submitForm("addForm")'>提交</el-button>
            <el-button class="add" size='small' type='primary' plain @click='cancel'>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <Tem ref='print' ></Tem>
  </div>
</template>

<script>
  import {getList,addEnquiry,delEnquiry} from "@/api/price/priceEnquiry.js";
  import Tem from "./com/tem";

  export default {
    name: 'priceEnquiry',
    components:{
      Tem
    },
  data() {
    return {
      rules:{
        productModel: [{ required: true, trigger: "change" ,message:'请输入产品型号'}],
      },
      addForm:{
        applyRemark:'',
        productModel:'',
        inCustomer:'',
      },
      form: {
        approvalStatus:'',
        productModel:'',
        inCustomer:'',
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

    };
  },
  created() {
      this.getList()

  },
  methods: {
    async delEnquiry(id){
      const data ={
        id:id
      }
      const res = await delEnquiry(data);
      console.log('删除结果',res)
      if(res){
        this.getList()
      }
    },
    del(id){
      this.$confirm('确定要删除该询价单？', '删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.delEnquiry(id)
        })
        .catch(action => {
          
        });
    },
    cancel(){
      this.dialogCreate=false
      this.addForm = {
        applyRemark:'',
        productModel:'',
        inCustomer:'',
      }
      this.resetForm('addForm')
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
      watchTime(data){
        console.log(data)
        this.form.effectBeginTime = data.startTime
        this.form.effectEndTime = data.endTime
        this.resetData = false
      },
      async commit(){
        const data ={
           productModel:this.addForm.productModel,
           inCustomer:this.addForm.inCustomer,
           applyRemark:this.addForm.applyRemark,
        } 
        const res = await addEnquiry(data);
        console.log('提交结果',res);
        if(res){
          this.cancel()
          this.getList()
        }
      },
      async getList(){
        const data ={
           pageIndex:this.currentPage,
           pageSize:this.pageSize,
           approvalStatus:this.form.approvalStatus,
           productModel:this.form.productModel,
           inCustomer:this.form.inCustomer,
        } 
        const res = await getList(data);
        console.log('询价列表',res);
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      add(){
        this.$print(this.$refs.print)
      },
      create(){
        this.dialogCreate = true
      },
      reset(){
        this.currentPage=1
        this.pageSize=10
        this.form = {
          approvalStatus:'',
          productModel:'',
          inCustomer:'',
        }
        this.resetData = true
        this.getList()
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
.price-enquiry{
  position: relative;
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
