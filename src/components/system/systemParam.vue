<template>
  <div class="systemParam">
    <div class="sellBox">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item >系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统参数设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible1' @click='change'> 展开</i>

          <i class="el-icon-arrow-up" v-if='dialogVisible1' @click='change'> 收起</i>
        </div>
        <el-form ref="selForm" :model="selForm" class="selForm" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible1'>
          <el-form-item label="模块">
            <el-select  size="small" v-model="selForm.model" filterable>
              <el-option
                v-for="item in models"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功能">
            <el-select  size="small" v-model="selForm.func" filterable>
              <el-option
                v-for="item in funcs"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select size='small' v-model="selForm.active" placeholder="请输入">
              <el-option 
              v-for="item in types" 
              :key='item.value'
              :label='item.label'
              :value='item.value'
              ></el-option>
            </el-select>
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
          <el-table-column type="index" label="编号" v-if="false" width="80">
          </el-table-column>
          <el-table-column label="id" prop="id" width="30" v-if="false">
          </el-table-column>
          <el-table-column prop="" label="模块" >
            <template slot-scope="scope">
              <span v-if="list[scope.$index].pModel==1">公告管理</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="功能"  show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="list[scope.$index].pFunction==1">公告类型</span>
            </template>
          </el-table-column>
          <el-table-column prop="zhName" show-overflow-tooltip label="中文名">
          </el-table-column>
          <el-table-column prop="enName" show-overflow-tooltip label="英文名">
          </el-table-column>
          <el-table-column prop="pValue" show-overflow-tooltip label="Code">
          </el-table-column>
          <el-table-column prop="" show-overflow-tooltip label="状态">
            <template slot-scope="scope">
              <span >{{list[scope.$index].active ? '生效':'失效'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" show-overflow-tooltip label="操作" fixed="right" width="80">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit(list[scope.$index])">修改</el-button>
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
    
    <el-dialog title="新建" :inline='true' :visible.sync="dialogVisible" width="50%" >

      <el-form ref="form" size="small" label-position="top" :rules="rules" :model="form" class="form clear" :inline='true'>
          <el-form-item label="模块" prop='model'>
            <el-select  size="small" v-model="form.model" filterable >
              <el-option
                v-for="item in models"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功能" prop='func'>
            <el-select  size="small" v-model="form.func" filterable>
              <el-option
                v-for="item in funcs"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="中文名" prop='zhName' >
            <el-input v-model="form.zhName"></el-input>
          </el-form-item>
          <el-form-item label="英文名" prop='enName'>
            <el-input v-model="form.enName"></el-input>
          </el-form-item>
          <el-form-item label="Code" prop='code'>
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop='active' >
            <el-select  size="small" v-model="form.active" filterable >
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('form')" size="small">确 定</el-button>
          <el-button type="primary" @click="quit" size="small">取 消</el-button>
        </span>
      
    </el-dialog>
  </div>
    </div>

</template>

<script>
  import {getList ,addAndEdit} from "@/api/system/param.js";
  import {serverUrl} from "@/axios/request.js";
  import Daterange from "../com/date";
  
  export default {
    name: 'systemParam',
    components:{
      Daterange
    },
    data() {
      return {
        models:[
          {
            label:'公告管理',
            value:1,
            children:[
              {
                label:'公告类型',
                value:1,
              }
            ]
          }
        ],
        funcs:[],
        data:sessionStorage.getItem('data'),
        rules: {
          zhName: [
            { required: true, trigger: 'blur',message:'中文名不能为空'}
          ],
          enName: [
            { required: false, trigger: 'blur',message:''}
          ],
          active: [
            { required: true, trigger: 'blur',message:'状态不能为空'}
          ],
          model: [
            { required: true, trigger: 'blur',message:'模块不能为空'}
          ],
          func: [
            { required: true, trigger: 'blur',message:'功能不能为空'}
          ],
          code: [
            { required: true, trigger: 'blur',message:'Code不能为空'}
          ],
        },
        editToggle:false,
        serverUrl: serverUrl,
        form:{
          zhName:'',
          enName:'',
          model:'',
          func:'',
          active:'',
          code:''
        },
        time:'',
        types:[
          {
            label:'生效',
            value:1
          },
          {
            label:'失效',
            value:0
          }
        ],
        selForm:{
          model:'',
          func:'',
          active:'',
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
    },
    watch:{
      'selForm.model':{
        handler:function(n,o){
          if(n!=o){
            this.selForm.func = ''
            this.models.forEach(item=>{
              if(item.value==n){
                this.funcs = item.children
              }
            })
          }
          
        }
      },
      'form.model':{
        handler:function(n,o){
          if(n!=o){
            this.selForm.func = ''
            this.models.forEach(item=>{
              if(item.value==n){
                this.funcs = item.children
              }
            })
          }
        }
      }
    },
    methods: {
      async addAndEdit(){
        var data ={
          pFunction:this.form.func,
          pModel:this.form.model,
          pValue:this.form.code,
          active:this.form.active,
          zhName:this.form.zhName,
          enName:this.form.enName,
          id:''
        }
        if(this.editToggle){
          data.id = this.rowData.id
        }
        const res = await addAndEdit(data)
        console.log('新增或者编辑结果',res)
        if(res){
          this.dialogVisible = false;
          this.resetForm('form')
          this.clearForm()
          this.getList()
        }
      },
      search(){
        this.currentPage =1
        this.getList()
      },
      reset(){
        this.selForm.model = ''
        this.selForm.func = ''
        this.selForm.active = ''
        this.getList()
      },
      quit(){
        this.resetForm('form')
        this.clearForm()
        this.dialogVisible = false
      },
      clearForm(){
        this.form ={
          active:'',
          func:'',
          model:'',
          zhName:'',
          enName:'',
          code:''
        }
      },
      //展开搜索框
      change() {
        this.dialogVisible1 = !this.dialogVisible1;
      },
      rowClick(row) {
        console.log(row)
        this.rowData = row
        console.log(row.id)
      },
      //获取角色列表
      async getList() {
        var data = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          pModel: this.selForm.model,
          pFunction: this.selForm.func,
          active: this.selForm.active,
        }
        const res = await getList(data)
        console.log('系统参数列表',res)
        if(res){
          this.list = res.data.data.list
          this.total = res.data.data.total
        }
      },
      //修改表单提交
      submitForm(formName) {
        this.$formTest.submitForm(this.$refs[formName], this.addAndEdit)  
      },
      //重置表单
      resetForm(formName) {
        this.$formTest.resetForm(this.$refs[formName])  
      },
      //新建框
      add() {
        this.editToggle = false
        this.dialogVisible = true;
      },
      edit(row) {
        this.form.active = row.active
        this.form.func = row.pFunction
        this.form.model = row.pModel
        this.form.code = row.pValue
        this.form.zhName = row.zhName
        this.form.enName = row.enName
        this.editToggle = true
        this.dialogVisible = true;
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
  }
</script>

<style lang='scss'>
  $sc:12;
.systemParam{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;

  .el-dialog{
    box-sizing: border-box;
    .form {
        box-sizing: border-box;
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          width: 50%;
          padding: 0 5px;
          float: left;
          box-sizing: border-box;
          margin-right: 0;
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