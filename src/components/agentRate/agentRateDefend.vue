<template>
  <div class="agentRateDefend">
    <div class="sellBox">
      <div class="head clear">
            <el-page-header @back="back" content="代理商费率维护"></el-page-header>
      </div>

      
      <div class="box">
        <div class="btns">
          <el-button size="small" type="primary" @click="download">下载模版</el-button>
          <el-upload
          style="display:inline-block"
                class="upload-demo"
                ref="upload"
                :action="url"
                :headers='headers'
                name="files"
                accept=".xlsx,.xls"
                :auto-upload="true"
                :show-file-list="false"
                :on-success="suc"
                >
                <el-button size="small"  type="primary">上传</el-button>
              </el-upload>
          <el-button size="small" type="primary" :disabled="isEmpty" @click="approve">发布</el-button>
          <!-- <el-button size="small" type="primary" @click="add1(2)">驳回</el-button> -->
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column prop="customerType" width='150' label="客户分类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="insideCustomer" width='150' label="客户名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productLevelOne" width='150' label="BU" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productLevelTwo" width="150" label="PDT" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productLevelThree" width="150" label="Platform" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productType" width="150" label="Product Type" show-overflow-tooltip></el-table-column>
            <el-table-column prop="basicAgencyRate" width="150" label="基准代理费率(%)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="floatAgencyRate" width="150" label="浮动代理费率(%)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="validStartDate" width="150" label="有效开始日期" show-overflow-tooltip></el-table-column>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
         
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
  import {serverUrl} from '../../axios/request'
  import {approve} from '@/api/agentrate/query.js'
  
  export default {
    name: 'agentRateDefend',
    data() {
      return {
        isEmpty:true,
        url:serverUrl + '/agencyRate/upload',
        headers:{
                  "Authorization": sessionStorage.getItem("data"),
                },
       
        dialogVisible: false,
        tableData: [
        ],
      }
    },
    computed: {
    },
    created() {
    },
    watch: {
    },
    methods: {
       download() {
          this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/agencyRate/download",
            responseType: ["arraybuffer",'application/json;charset=UTF-8'],
            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          })
            .then(res => {
              if(res.data.msg){
                this.$message.error(res.data.msg)
              }else{
                 const blob = new Blob([res.data], {
                type: "application/vnd.ms-excel"
              });
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.download = "代理商费率模版.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
              }
              // console.log(res.data);
             
            })
            .catch(err => {
              // console.log(err);
              alert("网络异常");
            });
      },
      suc(val){
        // console.log(val)
        if(val.code==1){
          this.$message.success('上传成功')
          this.isEmpty = false
          this.tableData = val.data
        }else{
          this.$message.error(val.msg)
        }
      },
      async sure(){
        const data={
          ids:this.tableData.map((item)=>{
            return item.id
          }).join(',')
        }
        // console.log(data)
        const res = await approve(data);
        if(res){
          this.$message.success('发布成功')
          this.$router.push({
            name:'agentRate'
          })
        }
      },
      approve() {
        if(this.tableData.length){
          this.$confirm('确定要发布吗？', '发布', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
                this.sure()
            })
            .catch(action => {
              
            });
        }else{
          this.$message.error('请先上传数据')
        }
      },
      change() {
        this.dialogVisible = !this.dialogVisible
      },
      back(){
        window.history.back()
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
.agentRateDefend{
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
        // padding-bottom: 52px;
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