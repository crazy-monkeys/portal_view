<template>
  <div class="price-catalog">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >价格管理</el-breadcrumb-item>
          <el-breadcrumb-item>目录价格查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <!-- BU，PDT，产品型号，客户限制，代理商或客户名称，生效时间，平台，产品状态 -->
          <el-form-item label="BU">
            <el-input size='small' v-model='form.bu' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="PDT">
            <el-input size='small' v-model='form.pdt' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户限制">
            <el-input size='small' v-model='form.inCustomer' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="平台">
            <el-input size='small' v-model='form.platform' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input size='small' v-model='form.productModel' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产品状态">
            <el-select  size="small"  v-model="form.status" clearable>
              <el-option label='生效' value="True"></el-option>
              <el-option label='失效' value="False"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Price Type">
            <el-select size="small" v-model="form.priceType" clearable>
              <el-option label='客户' value="客户"></el-option>
              <el-option label='代理' value="代理"></el-option>
              <el-option label='直供' value="直供"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生效时间" class="date">
            <Daterange @data='watchTime' :resetDataReg='resetData' />
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' @click='search' plain>搜索</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns" v-if="userType=='内部客户'">
          <el-button class="add" size='small' type='primary' @click='add' :disabled="multipleSelection.length==0 ? true: false" >生成报价单</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%"  @selection-change="handleSelectionChange">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table :data="props.row.boms" border style="width: 90%">
                  <el-table-column prop="bomName"  show-overflow-tooltip label="实体料号">
                  </el-table-column>
                  <el-table-column prop="inCustomer"  show-overflow-tooltip label="客户限制">
                  </el-table-column>
                  <el-table-column prop="qty" show-overflow-tooltip label="数量">
                  </el-table-column>
                  <el-table-column prop="price"  show-overflow-tooltip label="目录价格">
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column type="selection" width='60' >
            </el-table-column>
            <el-table-column type="index" width='100' label="序号" :index='q'>
            </el-table-column>
            <el-table-column prop="" width='80' show-overflow-tooltip label="状态">
              <template slot-scope="scope">
                {{scope.row.status=='True' ?'生效':'失效'}}
              </template>
            </el-table-column>
            <el-table-column prop="bu" width='200' show-overflow-tooltip label="BU">
            </el-table-column>
            <el-table-column prop="pdt" width='80' label="PDT" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="productType" width='150' label="Product Type" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="priceType" width='150' label="Price Type" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="platform" width='100' show-overflow-tooltip label="平台">
            </el-table-column>
            <el-table-column show-overflow-tooltip width='240' prop="productModel" label="产品型号">
            </el-table-column>
            <el-table-column show-overflow-tooltip width='150' prop="catalogPrice" label="目录价格">
            </el-table-column>
            <el-table-column show-overflow-tooltip width='150' prop="inCustomer" label="客户限制">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="effectTime" width='200' label="生效时间">
            </el-table-column>
            <!-- <el-table-column show-overflow-tooltip prop="deadTime" width='150' label="失效时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="modifyTime" width='150' label="更新时间">
            </el-table-column> -->
            <el-table-column show-overflow-tooltip prop="remark" width='150' label="备注">
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
      title="请选择询价方"
      :visible.sync="dialogVisible1"
      width="400px"
      :before-close="cancel">
      <el-form ref="form1" :model="form1" :rules="rules" class="form" label-width="auto" label-position='top' >
          <el-form-item label="询价方" prop="inquirer">
            <el-select  size='small' v-model='form1.inquirer' placeholder="请选择询价方">
              <el-option v-for="item in options" :key="item.name" :label="item.name" :value='item.name+","+item.type'></el-option>
            </el-select>
          </el-form-item>
          
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" plain @click="cancel">取 消</el-button>
        <el-button size="small"  type="primary" @click="submitForm('form1')">确 定</el-button>
      </span>
    </el-dialog>
    <Tem ref='print' :table='multipleSelection' :queryPrice='queryPrice' :type='type'></Tem>

  </div>
</template>

<script>
  import Daterange from "../com/date";
  import {getList} from "@/api/price/priceCatalog.js";
  import Tem from "./com/tem";

  export default {
    name: 'priceCatalog',
    components:{
      Daterange,Tem
    },
    data() {
      return {
        rules:{
          inquirer:[
            {required:true,triggle:'change',message:'请选择询价方'}
          ]
        },
        options:[
          {
            name:'代理商1',
            type:'agent',
          },
          {
            name:'代理商2',
            type:'agent',
          },
          {
            name:'客户',
            type:'customer',
          }
        ],
        form1:{
          inquirer:''
        },
        type:'',
        queryPrice:'',
        multipleSelection:[],
        resetData:false,
        form: {
          bu:'',
          pdt:'',
          platform:'',
          productModel:'',
          effectBeginTime:'',
          effectEndTime:'',
          inCustomer:'',
          priceType:'',
          status:''
        },
        dialogVisible: false,
        dialogVisible1: false,
        tableData: [],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        total: 0,

      }
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
    },
    methods: {
      
      cancel(){
        this.dialogVisible1 = false
        this.form1 = {
          inquirer:''
        }
        this.resetForm('form1');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      search(){
        this.currentPage = 1
        this.getList()
      },
      watchTime(data){
        // console.log(data)
        this.form.effectBeginTime = data.startTime
        this.form.effectEndTime = data.endTime
        this.resetData = false
      },
      async getList(){
        const data ={
           pageIndex:this.currentPage,
           pageSize:this.pageSize,
           bu:this.form.bu,
           pdt:this.form.pdt,
           inCustomer:this.form.inCustomer,
           platform:this.form.platform,
           productModel:this.form.productModel,
           effectBeginTime:this.form.effectBeginTime,
           effectEndTime:this.form.effectEndTime,
           priceType:this.form.priceType,
           status:this.form.status,
        } 
        const res = await getList(data);
        // console.log('目录价格查询列表',res);
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      reset(){
        this.currentPage=1
        this.pageSize=10
        this.form = {
          bu:'',
          pdt:'',
          platform:'',
          productModel:'',
          effectBeginTime:'',
          effectEndTime:'',
          inCustomer:'',
          priceType:'',
          status:''
        }
        this.resetData = true
        this.getList()
      },
      change() {
        this.dialogVisible = !this.dialogVisible
      },
      q(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1
      },
      submitForm(formName){
        this.$formTest.submitForm(this.$refs[formName],this.sub)
      },
      resetForm(formName){
        this.$formTest.resetForm(this.$refs[formName])
      },
      sub(){
        var arr = this.multipleSelection.map(item=>{return item.inCustomer});
        // console.log('内部客户组成的数组',arr)
        var noEmpty =  arr.filter(item=>{
          if(item){
            if(item.length!=0){
              return item
            }
          }
        })
        var empty =  arr.filter(item=>{
          if(item===null){
            return true
          }else{
            if(item.length==0){
              return item
            }
          }
        })
        // console.log(empty)
        // console.log(this.form1.inquirer.split(',')[1]=='agent')
        if(this.form1.inquirer.split(',')[1]=='agent'){
          //询价方为代理商
        // console.log(empty.length)
        // console.log(arr.length)
          if(noEmpty.length==arr.length || empty.length==arr.length){
            //客户内部名称全不为空
            if(noEmpty.length==arr.length){
            this.type = 'noEmpty'
              
            }
            //客户内部名称为空
            if(empty.length==arr.length){
            this.type = 'empty'

            }
            this.queryPrice = this.form1.inquirer.split(',')[0]
            this.dialogVisible1 = false
            this.$nextTick(()=>{
              this.$print(this.$refs.print)
            })
          }else{
            this.$message.error('错误')
          }
        }else{
          //询价方为客户
            this.type = 'all'
            this.queryPrice = this.form1.inquirer.split(',')[0]
            // console.log(this.form1.inquirer.split(',')[0])
            this.$nextTick(()=>{
              this.$print(this.$refs.print)
            })
        }
        
      },
      add(){
        this.dialogVisible1 = true;
        
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

<style lang='scss'>
  $sc:12;
.price-catalog{
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
