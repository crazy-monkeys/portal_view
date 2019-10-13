<template>
  <div class="releation">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>关系维护</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="box">
        <div class="sels clear">
          <div class="lineBox">
            <i class="el-icon-arrow-down" v-if='!dialogVisible1' @click='change'> 展开</i>
            <i class="el-icon-arrow-up" v-if='dialogVisible1' @click='change'> 收起</i>
          </div>
          <el-form ref="selForm" :model="selForm" class="selForm" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible1'>
            <el-row :gutter="20">
              <el-col :span='6'>
                <el-form-item label="模块">
              <el-select size='small' v-model="selForm.mappingModel" filterable clearable placeholder="请输入">
                <el-option 
                v-for="item in models" 
                :key='item.value'
                :label='item.label'
                :value='item.value'
                ></el-option>
              </el-select>
            </el-form-item>
              </el-col>
              <el-col :span='6'>
                <el-form-item label="营销运作部">
              <el-select size='small' v-model="selForm.cdUserId" filterable clearable placeholder="请输入">
                <el-option 
                v-for="item in cdUsers" 
                :key='item.inUserId'
                :label='item.userName'
                :value='item.inUserId'
                ></el-option>
              </el-select>
            </el-form-item>
              </el-col>
              <el-col :span='6'>
                <el-form-item label="代理商经营部">
              <el-select size='small' v-model="selForm.dealerUserId" filterable clearable placeholder="请输入">
                <el-option 
                v-for="item in dealerUsers" 
                :key='item.inUserId'
                :label='item.userName'
                :value='item.inUserId'
                ></el-option>
              </el-select>
            </el-form-item>
              </el-col>
              <el-col :span='6'>
                <el-form-item label="代理商">
              <el-select size='small' v-model="selForm.custId" clearable placeholder="请输入">
                <el-option 
                v-for="item in custs" 
                :key='item.id'
                :label='item.custAbbreviation'
                :value='item.id'
                ></el-option>
              </el-select>
            </el-form-item>
              </el-col>
              <el-col :span="6">
                 <el-form-item :label="' '">
              <el-button size='small' type='primary' @click="search" plain>搜索</el-button>
              <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
            </el-form-item>
              </el-col>
            </el-row>

           
          </el-form>
        </div>
        <div class="tab">
          <div class="btns clear">
            <el-button class="add" @click='add' size='small' type='primary'>新建</el-button>
          </div>
          <el-table :data="list" border style="width: 100%" height="700" @row-click='rowClick' >
            <el-table-column type="index" label="编号" v-if="false" width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="mappingId" prop="mappingId" width="30" v-if="false">
            </el-table-column>
            <el-table-column prop="mappingModel" width="200" label="模块" show-overflow-tooltip>
              
            </el-table-column>
            <el-table-column prop="cdUserId" width="200" label="营销运作部"  show-overflow-tooltip>
              <template slot-scope="scope">
                {{model(scope.row.cdUserId,1)}}
              </template>
            </el-table-column>
            <el-table-column prop="dealerUserId" width="200" show-overflow-tooltip label="代理商经营部 ">
              <template slot-scope="scope">
                {{model(scope.row.dealerUserId,2)}}
              </template>
            </el-table-column>
            <el-table-column prop="custId"  show-overflow-tooltip label="负责的客户id">
              <template slot-scope="scope">
                {{model(scope.row.custId,3)}}
              </template>
            </el-table-column>
            <el-table-column prop="" show-overflow-tooltip label="操作" fixed="right" width="80">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="mod(scope.row)">修改</el-button>
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
      
      <el-dialog :title="this.form.mappingId ? '修改关系' :'新建关系'" :visible.sync="dialogVisible" width="50%" :center="true">
        <el-form ref="form" label-position="top" :rules="rules" :model="form" class="form" :inline='true'>
            <el-form-item label="模块" prop="mappingModel">
              <el-select size='small' v-model="form.mappingModel" filterable clearable placeholder="请输入">
                <el-option 
                v-for="item in models" 
                :key='item.value'
                :label='item.label'
                :value='item.value'
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营销运作部">
              <el-select size='small' v-model="form.cdUserId" filterable clearable placeholder="请输入">
                <el-option 
                v-for="item in cdUsers" 
                :key='item.inUserId'
                :label='item.userName'
                :value='item.inUserId'
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="代理商经营部">
              <el-select size='small' v-model="form.dealerUserId" filterable clearable placeholder="请输入">
                <el-option 
                v-for="item in dealerUsers" 
                :key='item.inUserId'
                :label='item.userName'
                :value='item.inUserId'
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="代理商" prop="custId">
              <el-select size='small' v-model="form.custId"  multiple clearable placeholder="请输入">
                <el-option 
                v-for="item in custs" 
                :key='item.id'
                :label='item.custAbbreviation'
                :value='item.id'
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('form')" size="small">确定</el-button>
            <el-button type="primary" @click="quit" size="small">取消</el-button>
          </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  import {getList,dealerList,dsList,csList,addReleation} from "@/api/system/releation.js";
  
  export default {
    name: 'releation',
    data() {
      return {
        dealerUsers:[],
        cdUsers:[],
        custs:[],
        models:[
          {
            label:'forecast',
            value:'forecast',
          },
          {
            label:'保价、差价、退换货',
            value:'保价、差价、退换货',
          },
          {
            label:'客户',
            value:'客户',
          },
          {
            label:'rebate',
            value:'rebate',
          },
          {
            label:'订单',
            value:'订单',
          }
        ],
        rules: {
          custId: [
            { required: true, trigger: ['blur','change'],message:'代理商不能为空'}
          ],
          mappingModel: [
            { required: true, trigger: ['blur','change'],message:'模块不能为空'}
          ],
        },
        form:{
          mappingModel:'',
          custId:[],
          dealerUserId:'',
          cdUserId:'',
          mappingId:''
        },
        selForm:{
          mappingModel:'',
          custId:'',
          dealerUserId:'',
          cdUserId:'',
        },
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
      this.dealerList()
      this.dsList()
      this.csList()
    },
    methods: {
      model(id,type){
        if(type==1){
          return  this.cdUsers.filter(item=>{return item.inUserId == id})[0] ? this.cdUsers.filter(item=>{return item.inUserId == id})[0].userName  :''
        }else if(type==2){
          return  this.dealerUsers.filter(item=>{return item.inUserId == id})[0] ? this.dealerUsers.filter(item=>{return item.inUserId == id})[0].userName  :''
        }else{
          var nameArr = []
          var arr = id.split(',')
          arr.forEach(item => {
            this.custs.forEach(cust=>{
              if(item==cust.id){
                nameArr.push(cust.custAbbreviation)
              }
            })
          });
          return nameArr.join('、')
        }

      },
      async dsList(){
        const res = await dsList();
        if(res){
          this.dealerUsers = res.data.data
        }
      },
      async csList(){
        const res = await csList();
        if(res){
          this.cdUsers = res.data.data
        }
      },
      async dealerList(){
        const res = await dealerList();
        console.log('角色列表',res)
        if(res){
          this.custs = res.data.data
        }
      },
      mod(row){
        this.dialogVisible = true
        this.form = row
        this.form.custId = row.custId.split(',').map(item=>{return item*1})
      },
      search(){
        this.currentPage =1
        this.getList()
      },
      reset(){
        this.clearForm()
        this.getList()
      },
      async addReleation(){
        this.form.custId = this.form.custId.join(',')
        const res = await addReleation(this.form)
        
        if(res){
          this.resetForm('form')
          this.clear()
          this.getList()
          this.dialogVisible = false
        }
      },
      quit(){
        this.resetForm('form')
        this.clearForm()
        this.dialogVisible = false
      },
      clear(){
        this.form ={
          mappingModel:'',
          custId:[],
          dealerUserId:'',
          cdUserId:'',
          mappingId:''
        }
      },
      clearForm(){
        this.selForm ={
          mappingModel:'',
          custId:'',
          dealerUserId:'',
          cdUserId:'',
        }
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
          mappingModel:this.selForm.mappingModel,
          custId:this.selForm.custId,
          dealerUserId:this.selForm.dealerUserId,
          cdUserId:this.selForm.cdUserId,
        }
        const res = await getList(data)
        if(res){
          this.list = res.data.data.list
          this.total = res.data.data.total
        }
      },
      //修改表单提交
      submitForm(formName) {
        this.$formTest.submitForm(this.$refs[formName],this.addReleation)  
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
.releation{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;

  .el-dialog{
    .form {
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          width: 100%;
          // margin-bottom: 0;
          .el-select{
            width: 100%;
          }
        }
        .date {
          width: 414px;
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
          width: 100%;
          margin-bottom: 0;
          .el-select{
            width: 100%;
          }
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