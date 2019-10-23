<template>
  <div class="announcelist">
   
    <el-tabs tab-position="left" v-model="aciveName" style="height: 100%;"   @tab-click="handleClick">
      <el-tab-pane :label="type.zhName" :name='type.pValue+""' v-for="type in types" :key="type.pValue" >
        <div class="tab">
          <div class="filter">
            <el-input
                v-model="search"
                size="small"
                width='200px'
                placeholder="输入关键字搜索" />
          </div>
        <el-table :data="list" :show-header="false" style="width: 100%" height="100%" @row-click='rowClick'>
          <el-table-column  prop="title" >
            <template slot-scope="scope">
              <!-- <a :href="scope.row.fileStoragePath" :download="scope.row.fileStoragePath">{{list[scope.$index].thirdFileName}}</a> -->
              <el-button type="text"  @click="download(list[scope.$index].id,scope.row.thirdFileName)"> {{list[scope.$index].thirdFileName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="releaseTimeStr" align="right" show-overflow-tooltip >
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
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
  import {getList,view ,downloadFiles} from "@/api/system/document.js";
  import {serverUrl } from "../axios/request.js";
  import {getType} from "@/api/system/param.js";

  export default {
    name: 'announcelist',
    data() {
      return {
        aciveName:'0',
        types:[],
        search:'',
        value:'',
        rowData: {},
        list:[],
        currentPage: 1,
        pageSize: 10,
        total: 0,
      }
    },
    created() {
      this.getList()
      this.getType()
    },
    watch:{
      search:{
        handler:function(n,o){
          if(n){
            this.list = this.tableData.filter(item=>{
              return item.thirdFileName.includes(n) 
            })
          }else{
            this.list = this.tableData

          }
          
        }
      }
    },
    methods: {
      
      async getType(){
        var data ={
          model:1,
          func:2,
        }
        const res = await getType(data);
        // console.log('公告类型',res)
        if(res){
          this.types = res.data.data
          this.types.unshift({
            pValue: 0,
            zhName: "所有文档"
          })
        }
      },
      async view(id){
        var data ={
          id:id
        }
        const res = await view(data);
        // console.log('url',res)
        if(res){
          let url = 'portal-api/file/'+ res.data.data
          window.open('/static/pdf/web/viewer.html?file=' + encodeURIComponent(url))
        }
      },
      
      download(id,name){
        this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/archive/file/download?id="+id,
            responseType: "arraybuffer",
            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          })
            .then(res => {
              // console.log(res.data);
              const blob = new Blob([res.data], {
                // type: "application/vnd.ms-excel"
              });
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.download = name;
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
            })
            .catch(err => {
              // console.log(err);
              //alert("网络异常");
            });
      },
      // 将返回的流数据转换为url
      getObjectURL(file) {
          let url = null;
          
          if (window.createObjectURL != undefined) { // basic
              url = window.createObjectURL(file);
          } else if (window.webkitURL != undefined) { // webkit or chrome
              url = window.webkitURL.createObjectURL(file);
          } else if (window.URL != undefined) { // mozilla(firefox)
              url = window.URL.createObjectURL(file);
          }
          return url;
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
      async getList() {
        var data = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          isRole:1
        }
        if(this.aciveName!=0){
          data.typeId = this.aciveName
        }
        const res = await getList(data)
        // console.log('公告列表',res)
        if(res){
          this.tableData = res.data.data.list
          this.list = this.tableData
          this.total = res.data.data.total
        }
      },
      rowClick(row) {
        // console.log(row)
        this.rowData = row
      },
      //切换tab
      handleClick(tab, event) {
        // console.log(tab, event);
        // console.log(this.aciveName)
        this.getList()
      },
    }
  }
</script>

<!-- Add "scoped"100% attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
  
  .announcelist {
    height: 100%;
    .el-tabs{
      border-left: 1px solid #6611bb;
      background: #fff;
      .el-tabs__header{
        height: 100%;
        .el-tabs__item{
          // color: #333;

          font-size: 14px;
          font-weight: 400
        }
      }
      .el-tabs__content{
        height: 100%;
        .el-tab-pane{
          height: 100%;
          .tab{
            padding: 50px 0;
            box-sizing: border-box;
            height: 100%;
            position: relative;
            .filter{
              position: absolute;
              top:0;
              padding:  10px 0 ;
              width: 100%;
              .el-input{
                float: right;
                width: 200px;
                margin-right: 10px;
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
            .el-table{
              tr{
                td{
                  height: 40px;
                  line-height: 40px;

                border-bottom: 1px dashed #ccc;

                }
              }
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
          .el-table{
            tr{
              td{
                height: 40px;
                line-height: 40px;

              border-bottom: 1px dashed #ccc;

              }
            }
          }
        }
        
      }
    }
    .dis {
      span {
        color: #ccc
      }
    }

    .el-dialog {
      .el-form-item {
        margin-bottom: 20px
      }

      .el-form--label-top .el-form-item__label {
        padding-bottom: 0
      }
    }
   
  }
</style>