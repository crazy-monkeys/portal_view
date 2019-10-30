<template>
  <!-- 添加新增控件 -->
  <div class="uploadIndex">
    <div class="content">
      <div class="tab">
        <el-table :data="form.files" style="width: 100%" height="100%" @row-click="rowClick" >
          <el-table-column  label="附件类型" >
            <template slot-scope="scope">
              <el-select size="small"  v-model="scope.row.type" >
                <el-option v-for="item in types" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column  label="附件" >
            <template slot-scope="scope">
                <a   v-if="scope.row.fileId" :download="scope.row.filePath" :href="scope.row.filePath">{{scope.row.fileName}}</a>
                <el-upload
                  v-if="!scope.row.fileId"
                  class="upload-demo"
                  action=" "
                  :auto-upload="true"
                  :on-change='changeFile'
                  :limit="1"
                  :http-request="httpReq1"
                  >
                  <el-button size="small" type="primary">选择文件</el-button>
                </el-upload>
            </template>
            
          </el-table-column>
          <el-table-column prop="t4" label="" show-overflow-tooltip>
            <template slot="header">
              <el-button type="primary" size="small" @click='addRow'>新增</el-button>
            </template>
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="del(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
          
          <div slot="empty">
            无数据
          </div>
        </el-table>
      </div>
      <div class="sub">
        <el-button type="primary" size="small" plain @click="sub">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {getType} from '@/api/system/param.js'
import {getUpload,getUploadData} from "@/api/customer/query.js";
export default {
  name: "uploadIndex",
  data() {
    return {
      types:[],
      form: {
        files:[],
        outCode:''
      },
      rowData:{}
    };
  },
  created() {
    // //console.log(1111)
    this.getData()
    this.getUploadData()
  },
  computed:{
    outCode(){
      return this.$route.query.outCode
    }
  },
  methods: {
    async sub(){
      this.form.outCode = this.outCode
      var data =this.form
      var params = new FormData()
      for (let i in data) {
        // // //console.log(i,data[i])
        if(typeof(data[i]) == 'object'){
          for(let j in data[i]){
            // //console.log(data[i][j])
            if(typeof(data[i][j]) == 'object'){
              for(let x in data[i][j]){
                // //console.log(data[i][j][x])
                if(data[i][j][x] || data[i][j][x]===0){
                  params.append(i+'['+j+']'+'.'+x,data[i][j][x])
                }
              }
            }else{
              if(data[i][j] || data[i][j]===0){
                params.append(data[i]+j,data[i][j])
              }
            }
          }
        }else{
          if(data[i] || data[i]===0){
            params.append(i,data[i])
          }
        }
      }
        // //console.log(params)
      const res = await getUpload(params)
      // //console.log('新增结果',res)
      if(res){
        this.getUploadData()
        this.$message.success('保存成功')
      }
    },
    changeFile(val){},
    rowClick(row){
      // // //console.log(row)
      this.rowData = row
    },
    httpReq1(val){
      // //console.log(val)
      // //console.log(val.file)
      this.form.files[this.rowData.index].file = val.file
    },
    del(type,index){
      // //console.log(index)
      this.form.files.splice(index,1)
    },
    addRow(){
        this.form.files.push({
          'index':this.form.files.length,
          "type":'',
          "fileName":'',
          'file':'',
          'id'	:'',
          'custId':''	,
          'filePath':'',	
          'create_time'	:'',
          "create_user_name":''	
        })
        //console.log(this.rowData)
        //console.log(this.form.files)
    },
    getData(){
      this.getType(2,5)
    },
    async getType(model,func){
      const data ={
        model:model,
        func:func,
      }
      const res = await getType(data);
      // //console.log('关系类型',res)
      if(res){
        this.types = res.data.data
      }
    },
    async getUploadData(model,func){
      const data ={
        outCode:this.outCode
      }
      const res = await getUploadData(data);
      // //console.log('关系类型',res)
      if(res){
        this.form.files = res.data.data
      }
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;

.uploadIndex {
  height: 100%;
  overflow-y: auto;
  padding: 0 20px;
  .content {
    height: 100%;
    .tab {
      height: 100%;
      background: #fff;
      padding: 20px;
        box-sizing: border-box;
      .el-table{
      }
      .el-select{
        width: 100%
      }
    }
    .sub {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
    }
  }
}
</style>