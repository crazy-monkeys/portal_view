<template>
  <div class="upload">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>销售管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售预测上传</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="查询" name="first">
          <div class="sels clear">
            <div class="lineBox">
              <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
              <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
            </div>
            <el-form ref="form" :model="form" size="small" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
              <el-form-item label="客户名称">
                <el-input  placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="客户编号">
                <el-input  placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="status">
                  <el-option value='1' label="已保存"></el-option>
                  <el-option value='2' label="已验证"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="销售">
                <el-input  placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="订单月份">
                <el-input  placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="上传日期" class="date">
                <Daterange />
              </el-form-item>
              <el-form-item label=" ">
                <el-button  type='primary' plain >查询</el-button>
                <el-button   type='primary' plain>重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="box">
            <div class="btns clear">
              <el-button   size='small' type='primary'>批量删除</el-button>
              <el-button   size='small' type='primary'>批量修改</el-button>
            </div>
            <div class="tab">
              <el-table :data="list" border style="width: 100%" height="100%">
                <el-table-column type="selection"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="errorMsg" width='100' label="错误信息" ></el-table-column>
                <el-table-column prop="updateTime" width='100' label="上传日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="2" width='80' label="年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="3" width='100'  label="客户名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="4" width='100'  label="客户类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="5" width='180'  label="阿米巴队长" show-overflow-tooltip></el-table-column>
                <el-table-column prop="6" width='80'  label="销售" show-overflow-tooltip></el-table-column>
                <el-table-column prop="7" width='180'  label="类别一（类型）" show-overflow-tooltip></el-table-column>
                <el-table-column prop="8" width='150'  label="Product Type" show-overflow-tooltip></el-table-column>
                <el-table-column prop="9" width='100'  label="Platform" show-overflow-tooltip></el-table-column>
                <el-table-column prop="10" width='100'  label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="11" width='100'  label="截止日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="12" width='180'  label="未完成专货库存" show-overflow-tooltip></el-table-column>
                <el-table-column prop="13" width="80" label="月份一" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="13" width="80" label="月份二" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="13" width="80" label="月份三" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="13" width="80" label="月份四" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="13" width="80" label="月份五" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="13" width="80" label="月份六" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>
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
        </el-tab-pane>
        <el-tab-pane label="上传" name="second">
          <div class="box">
            <div class="btns clear">
              <el-button class="add" @click='download' size='small' type='primary' > 下载模版</el-button>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url"
                :data='da'
                :headers='headers'
                name="excel"
                accept=".xlsx,.xls"
                :auto-upload="true"
                :show-file-list="false"
                :on-success="suc"
                >
                <el-button size="small"  type="primary">上传</el-button>
              </el-upload>
              <el-button class="add"  size='small' type='primary'  @click="downloadError" :disabled="isError1">下载错误数据</el-button>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url1"
                :data='da1'
                :headers='headers'
                name="excel"
                accept=".xlsx,.xls"
                :auto-upload="true"
                :show-file-list="false"
                :on-success="suc1"
                :disabled="isError1"
                :before-upload="beforeUpload"
                >
                <el-button size="small"  type="primary" :disabled="isError1">上传错误数据</el-button>
              </el-upload>
              <el-button class="add" @click='sub' size='small' type='primary' :disabled="isError2">提交</el-button>

            </div>
            <div class="tab">
              <el-table :data="tableData" border style="width: 100%" height="100%">
                <el-table-column prop="errorMsg" width='100' label="错误信息" ></el-table-column>
                <!-- <el-table-column prop="1" width='100' label="上传日期" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="yearMonth" width='80' label="年月" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="customerAbbreviation" width='100'  label="客户名称" show-overflow-tooltip></el-table-column> -->
                <!-- <el-table-column prop="4" width='100'  label="客户类别" show-overflow-tooltip></el-table-column> -->
                <!-- <el-table-column prop="5" width='180'  label="阿米巴队长" show-overflow-tooltip></el-table-column> -->
                <!-- <el-table-column prop="6" width='80'  label="销售" show-overflow-tooltip></el-table-column> -->
                <!-- <el-table-column prop="7" width='180'  label="类别一（类型）" show-overflow-tooltip></el-table-column> -->
                <!-- <el-table-column prop="8" width='150'  label="Product Type" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="platform" width='100'  label="Platform" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productModel" width='100'  label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="closeDate" width='100'  label="截止日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="delayStock" width='180'  label="未完成专货库存" show-overflow-tooltip></el-table-column>

                <el-table-column prop="forecastMonthOne" width="80" label="月份一" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="currentWriteOne" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="remarkOne" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="forecastMonthTwo" width="80" label="月份二" show-overflow-tooltip></el-table-column>
                <el-table-column prop="currentWriteTwo" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remarkTwo" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="forecastMonthThree" width="80" label="月份三" show-overflow-tooltip></el-table-column>
                <el-table-column prop="currentWriteThree" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remarkThree" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="forecastMonthFour" width="80" label="月份四" show-overflow-tooltip></el-table-column>
                <el-table-column prop="currentWriteFour" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remarkFour" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="forecastMonthFive" width="80" label="月份五" show-overflow-tooltip></el-table-column>
                <el-table-column prop="currentWriteFive" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remarkFive" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="forecastMonthSix" width="80" label="月份六" show-overflow-tooltip></el-table-column>
                <el-table-column prop="currentWriteSix" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remarkSix" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
              
                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
            </div>
            
          </div>
        </el-tab-pane>
        <el-tab-pane label="驳回记录" name="third">
          <div class="box">
            <div class="tab">
              <el-table :data="rejects" border style="width: 100%" height="100%">
                <el-table-column prop="0" width='100' label="错误信息" ></el-table-column>
                <el-table-column prop="1" width='100' label="上传日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="2" width='80' label="年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="3" width='100'  label="客户名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="4" width='100'  label="客户类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="5" width='180'  label="阿米巴队长" show-overflow-tooltip></el-table-column>
                <el-table-column prop="6" width='80'  label="销售" show-overflow-tooltip></el-table-column>
                <el-table-column prop="7" width='180'  label="类别一（类型）" show-overflow-tooltip></el-table-column>
                <el-table-column prop="8" width='150'  label="Product Type" show-overflow-tooltip></el-table-column>
                <el-table-column prop="9" width='100'  label="Platform" show-overflow-tooltip></el-table-column>
                <el-table-column prop="10" width='100'  label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="11" width='100'  label="截止日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="12" width='180'  label="未完成专货库存" show-overflow-tooltip></el-table-column>
                <el-table-column prop="13" width="80" label="月份一" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="13" width="80" label="月份二" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="13" width="80" label="月份三" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="13" width="80" label="月份四" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="13" width="80" label="月份五" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="13" width="80" label="月份六" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
              <div class="block">
              <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1"
                :page-sizes="[10, 20,50]" :page-size="pageSize1" layout="sizes,total, jumper, prev, pager, next" :total="total1">
              </el-pagination>
            </div>
            </div>
            
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Daterange from "../com/date";
  import {serverUrl} from '../../axios/request'
  import{submit,queryList,rejectList} from '@/api/forcast/upload.js'
  export default {
    name: 'upload',
    components:{
      Daterange
    },
    data() {
      return {
        isError1:true,
        isError2:true,
        url:serverUrl + '/forecast/agency/template/upload',
        url1:serverUrl+'/forecast/agency/error/upload',
        headers:{
          "Authorization": sessionStorage.getItem("data"),
        },
        da1:{
        },
        da:{},
        
        activeName:'first',
        status:'',
        dialogVisible:false,
        form:{},
        batchNo:'',
        //表格数据
        tableData: [],
        list:[],
        rejects:[],
        //第几页
        currentPage: 1,
        currentPage1: 1,
        //每页的容量
        pageSize: 10,
        pageSize1: 10,
        //总量
        total: 0,
        total1: 0,
      }
    },
    computed: {
      auth(){
        return sessionStorage.getItem('data')
      }
    },
    created() {
      this.queryList()
    },
    watch: {
    },
    methods: {
      sub(){
        this.submit()
      },
      beforeUpload(file){
      let data = new FormData()
      data.append('excel',file)
      data.append('batchNo',this.batchNo)
      this.$http({
        method: 'post',
        url: this.url1,
        headers:{'Authorization': this.auth},
        timeout: 20000,
        data: data
      }).then(res=>{
        console.log(res)
        if(res.data.code==1){
          if(res.data.data.success){
            this.$message.success('上传成功')
            this.tableData= res.data.data.data
            this.isError2 = false
          }else{
            this.$message.error('请下载错误数据')
          }
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
      return false
    },
      async queryList(){
        const data ={
          pageSize:this.pageSize,
          pageNum:this.currentPage,
        }
        console.log(data)
        const res = await queryList(data);
        console.log('上传部分查询列表',res);
        if(res){
          this.list = res.data.data.list
          this.total = res.data.data.total
        }
      },
      async rejectList(){
        const data ={
          pageSize:this.pageSize1,
          pageNum:this.currentPage1,
        }
        console.log(data)
        const res = await rejectList(data);
        console.log('上传部分驳回列表',res);
        if(res){
          this.rejects = res.data.data.list
          this.total1 = res.data.data.total
        }
      },
      async submit(){
        const data ={
          batchNo : this.batchNo
        }
        console.log(data)
        const res = await submit(data);
        console.log('提交结果',res);
        if(res){
          this.$message.success('提交成功')
        }
      },
      downloadError(){
        this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/forecast/agency/error/download?batchNo=" +this.batchNo,
            responseType: "arraybuffer",
            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          })
            .then(res => {
              console.log(res.data);
              const blob = new Blob([res.data], {
                type: "application/vnd.ms-excel"
              });
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.download = "errorData.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
            })
            .catch(err => {
              console.log(err);
              alert("网络异常");
            });
      },
      suc(val){
        console.log(val)
        if(val.code!=1){
          this.$message.error(val.msg)
        }else{
          if(!val.data.success){
            this.isError1 = false
            this.isError2 = true
            this.$message({
              type:'error',
              message:'请下载错误数据'
            })
          }else{
            this.$message.success('上传成功')
            this.da1={
              batchNo :val.data.batchNo
            }
            this.isError1 = true
            this.isError2 = false
          }
          this.batchNo = val.data.batchNo
          this.tableData = val.data.data
          console.log(this.tableData)
          console.log(this.batchNo)
        }
      },
      suc1(val){
        console.log(val)
        if(val.code!=1){
          this.$message.error(val.msg)
        }else{
          if(!val.data.success){
            this.$message.error(val.data.msg)
          }else{
            this.isError2 = false
            this.$message.success('上传成功')
          }
          this.tableData =val.data.data
        }
      },
      download() {
          this.$prompt('请输入年月：如201908', '模版下载', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputValidator:this.check,
        }).then(({ value }) => {
          this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/forecast/agency/template/download?yearMonth="+value,
            responseType: "arraybuffer",
            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          }).then(res => {
              console.log(res.data);
              const blob = new Blob([res.data], {
                type: "application/vnd.ms-excel"
              });
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.download = "销售预测上传模版.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
          })
          .catch(err => {
            console.log(err);
          });
        }).catch(() => {
            
        });
          
      },
      handleClick(tab){
        if(tab.name=='first'){
          this.queryList()
        }
        if(tab.name=='second'){
        }
        if(tab.name=='third'){
          this.rejectList()
        }
      },
      change(){
        this.dialogVisible = !this.dialogVisible
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      handleSizeChange1(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize1 = val;
      },
      handleCurrentChange1(val) {
        console.log(`当前页: ${val}`);
        this.currentPage1 = val;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;

.upload{
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
    position: relative;
    padding-top: 34px;
    box-sizing: border-box;
    .head{
      padding: 10px 20px;
      position: absolute;
      top: 0;
      // background: red;
    }
    .el-tabs{
      height: 100%;
      position: relative;
      box-sizing: border-box;
      padding-top: 50px;
      .el-tabs__header{
        position: absolute;
        top: 0;
        width: 100%;
        .el-tabs__nav-wrap {
          padding:0 20px;
        }
      }
      .el-tabs__content{
        height: 100%;
        .el-tab-pane{
          height: 100%;
          display: flex;
          flex-direction: column;
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
            .upload-demo{
              display: inline-block;
            }
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
  }
}
</style>