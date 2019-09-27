<template>
  <div class="forcastApprove">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>销售管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售预测审批</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="客户简称">
            <el-input size='small' placeholder="请输入" v-model="form.customerAbbreviation"></el-input>
          </el-form-item>
           <el-form-item label="代理商简称">
            <el-input size='small' placeholder="请输入" v-model="form.agencyAbbreviation"></el-input>
          </el-form-item>
           <el-form-item label="销售">
            <el-input size='small' placeholder="请输入" v-model="form.salePeople"></el-input>
          </el-form-item>
          <!-- <el-form-item label="类型">
            <el-select  v-model="form.customerAbbreviation" size="small">
              <el-option value='1' label="延期提交"></el-option>
              <el-option value='2' label="删除"></el-option>
              <el-option value='3' label="修改"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="渠道" >
            <el-input size='small' placeholder="请输入" v-model="form.channel"></el-input>
          </el-form-item>
          <el-form-item label="上传日期" class="date">
            <Daterange @data='watchTime' :resetDataReg='resetData' />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.isUpdate" clearable size="small">
              <el-option label="已调整" value="1"> </el-option>
              <el-option label="未调整" value="0"> </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="阿米巴队长">
            <el-input size='small' placeholder="请输入"  v-model="form.ambPeople"></el-input>
          </el-form-item>
          <el-form-item label="首代">
            <el-input size='small' placeholder="请输入"  v-model="form.sdPeople"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' @click="search" plain>查询</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns">
          <el-button size="small" type="primary" @click="add1(1)" :disabled="multipleSelection.length==0">通过</el-button>
          <el-button size="small" type="primary" @click="add1(2)" :disabled="multipleSelection.length==0">驳回</el-button>
          <el-button class="add"  size='small' type='primary' :disabled="multipleSelection.length==0" @click="download">下载</el-button>
          <!-- <el-upload class='add' style="display:inline-block"  :before-upload="beforeUpload" ref='upload' name='excel'    :on-success='uploadSuccess' action='' > -->
              <el-button  size="small" type="primary" @click="beforeUpload">上传</el-button>
              
            <!-- </el-upload> -->
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" @selection-change="handleSelectionChange">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table size='small' :data="props.row.list" border style="width: 100%" height="100%" @row-click='rowClick'>
                  <el-table-column label="月份" prop='forecastMonth' show-overflow-tooltip> 
                  </el-table-column>
                  <el-table-column label="上次填写" prop='lastWrite' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="本次填写" prop='currentWrite' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="GAP" prop='gap' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="备注" prop='remark' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="阿米巴队长调整" prop='ambAdjustment' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="阿米巴队长备注" prop='ambRemark' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="首代调整" prop='sdAdjustment' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="首代备注" prop='sdRemark' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column  label="操作" width="100"  fixed="left" >
                    <template slot-scope="scope">
                      <el-button size="small" type="text" @click="adjust">预测调整</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
                <el-table-column prop="" width='100' label="审批状态" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span v-if="scope.row.status==-1">已驳回</span>
                    <span v-if="scope.row.status==2">已通过</span>
                    <span v-if="scope.row.status==1">待审批</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createTimeStr" width='100' label="上传日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="operationYearMonth" width='80' label="年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="company" width='80' label="出货公司" show-overflow-tooltip></el-table-column>
                <el-table-column prop="channel" width='80' label="渠道" show-overflow-tooltip></el-table-column>
                <el-table-column prop="agencyAbbreviation" width='80' label="代理简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerAbbreviation" width='100'  label="客户简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerType" width='100'  label="客户类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="forecastType" width='180'  label="预测类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="ambLeader" width='180'  label="阿米巴队长" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salePeople" width='80'  label="销售" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdPeople" width='80'  label="首代" show-overflow-tooltip></el-table-column>
                <el-table-column prop="representative" width='80'  label="代表处" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bu" width='80'  label="BU" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pdt" width='80'  label="PDT" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productType" width='150'  label="Product Type" show-overflow-tooltip></el-table-column>
                <el-table-column prop="platform" width='100'  label="Platform" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productModel" width='100'  label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="closeDate" width='100'  label="截止日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="delayStock" width='180'  label="未完成专货库存" show-overflow-tooltip></el-table-column>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 100]" :page-size="10" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
        
      </div>
    </div>
    <el-dialog
        title="预测调整"
        :visible.sync="dialogVisible1"
        width="400px"
        >
          <el-form ref="form2" :model="form2" class="form" label-width="auto" label-position='top' >
          <el-form-item label="上次填写">
            <el-input disabled size='small' placeholder="请输入" v-model="form2.lastWrite"></el-input>
          </el-form-item>
          <el-form-item label="本次填写">
            <el-input size='small' placeholder="请输入" v-model="form2.ambAdjustment"></el-input>
          </el-form-item>
          <el-form-item label="阿米巴队长">
            <el-input size='small' placeholder="请输入" v-model="form2.ambRemark"></el-input>
          </el-form-item>
          <!-- <el-form-item label="首代">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item> -->
        </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button @click="close" size="small">取 消</el-button>
          <el-button type="primary" @click="submitForm1('form2')" size="small">提 交</el-button>
        </span>
    </el-dialog>


    <el-dialog
        :title="title"
        :visible.sync="dialogVisible2"
        width="400px"
        top="10vh"
        >
        <el-form ref="form1" :model="form1" size="small" class="form" label-width="auto" label-position='top'  >
          <el-form-item :label="label">
            <el-input size='small' rows='4' resize="none" type="textarea" placeholder="请输入" v-model="form1.msg "></el-input>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel" size="small" type="primary" plain>取 消</el-button>
            <el-button type="primary" @click="submitForm('form1',title)" size="small">确 定</el-button>
          </span>
    </el-dialog>
    <el-dialog
        :title="downloadTitle"
        :visible.sync="dialogVisible3"
        width="400px"
        top="10vh"
        >
        <el-form ref="form3" :model="form3" size="small" class="form" label-width="auto" label-position='top'  >
          <el-form-item :label="downloadLabel">
            <el-select v-model="form3.type" clearable size="small">
              <el-option label="阿米巴队长" value="阿米巴队长"> </el-option>
              <el-option label="首代Buffer" value="首代Buffer"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  v-if="downloadLabel=='上传类型'" label="选择文件">
             <el-upload    ref='upload' :auto-upload="false" name='excel' :headers="headers"  :on-success='uploadSuccess'   :action='(form3.type=="阿米巴队长")?urlAmb:urlSd' >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="quit" size="small" type="primary" plain>取 消</el-button>
            <el-button type="primary" @click="submitForm2('form3',form3.type,downloadLabel=='下载类型'?1:2)" size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  import Daterange from "../com/date";
  import {getList,reject,pass,mod} from '@/api/forcast/approve.js'
  // import {serverUrl} from '@/axios/request.js'
  import {serverUrl} from '../../axios/request'

  export default {
    name: 'forcastApprove',
    components:{
      Daterange
    },
    data() {
      return {
        form3:{
          type:''
        },
        downloadLabel:'',
        downloadTitle:'',
        resetData:false,
        rowData:{},
        form2:{
          ambAdjustment:'',
          ambRemark:'',
          lastWrite:''
        },
        form1:{
          msg:''
        },
        headers:{Authorization:sessionStorage.getItem('data')},
        multipleSelection:[],
        title:'',
        label:'',
        s:1,
        dialogVisible3:false,
        form: {
          customerAbbreviation:'',  
          status:'',  
          isUpdate:'',
          salePeople:'',
          uploadStartTime:'',  
          uploadEndTime:'',
          ambPeople:'',  
          sdPeople :'',  
          agencyAbbreviation :'',
          channel:''
        },
        total: 0,
        value: '',
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible1: false,
        tableData: [
        ],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        urlAmb:serverUrl+'/forecast/amb/data/upload',
        urlSd:serverUrl+'/forecast/sd/data/upload',
        auth:sessionStorage.getItem('data')
      }
    },
    computed: {
    
    },
    created() {
      this.getList()
      // console.log(this.serverUrl)
    },
    watch: {
    },
    methods: {
    beforeUpload(file){
      this.dialogVisible3 = true
      this.downloadTitle = '上传类型选择'
      this.downloadLabel = '上传类型'
    },
    uploadSuccess(val){
      // console.log(val)
      if(val.code==1){
        this.$message.success('上传成功');
        this.quit()
      }else{
        this.$message.error(val.msg);
      }
    },
      quit(){
        this.form3={
          type:'',
        }
        this.dialogVisible3= false
        this.$formTest.resetForm(this.$refs['form3'])
      },
      search(){
        this.currentPage = 1;
        this.getList()
      },
      reset(){
        this.form ={
          customerAbbreviation:'',  
          status:'',  
          isUpdate:'',

          salePeople:'',
          uploadStartTime:'',  
          uploadEndTime:'',
          ambPeople:'',  
          sdPeople :'',  
          agencyAbbreviation :'',
          channel:''
        }
        this.resetData = true;
        this.search()
      },
      watchTime(data){
        // console.log(data)
        this.form.uploadStartTime = data.startTime
        this.form.uploadEndTime = data.endTime
        this.resetData = false
      },
      close(){
        this.form2={
          ambAdjustment:'',
          ambRemark:'',
          lastWrite:''        
        }
        this.dialogVisible1= false
        this.$formTest.resetForm(this.$refs['form2'])
      },
      rowClick(row){
        // console.log(row)
        this.rowData = row
        this.form2.lastWrite = this.rowData.lastWrite
      },
      download(id){
        this.dialogVisible3 = true
        this.downloadTitle = '下载类型选择'
        this.downloadLabel = '下载类型'
      },
      cancel(){
        this.dialogVisible2=false
        this.form1= {
          msg:''
        }
        this.$formTest.resetForm(this.$refs['form1'])
      },
      submitForm(formName,title){
        this.$formTest.submitForm(this.$refs[formName],title=='审批' ? this.pass:this.reject)
      },
      submitForm1(formName){
        this.$formTest.submitForm(this.$refs[formName],this.mod)
      },
      submitForm2(formName,type,a){
        if(a==1){
          if(!type){
            this.$message.error('请选择下载类型')
          }else{
            if(type=='阿米巴队长'){
              this.$formTest.submitForm(this.$refs[formName],this.downloadAmb)
            }else{
              this.$formTest.submitForm(this.$refs[formName],this.downloadSd)
            }
          }
        }else{
          if(!type){
            this.$message.error('请选择上传类型')
          }else{
            this.$refs['upload'].submit()
          }
        }
      },
      downloadAmb(){
        this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/forecast/amb/data/download?forecastIds="+this.multipleSelection.map(item=>{
              return item.id
            }).join(','),
            responseType: "arraybuffer",
            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          })
            .then(res => {
              // console.log(res.data);
              const blob = new Blob([res.data], {
                type: "application/vnd.ms-excel"
              });
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.download = "阿米巴队长数据.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
            })
            .catch(err => {
              // console.log(err);
              alert("网络异常");
            });
      },
      downloadSd(){
        this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/forecast/sd/data/download?forecastIds="+this.multipleSelection.map(item=>{
              return item.id
            }).join(','),
            responseType: "arraybuffer",
            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          })
            .then(res => {
              // console.log(res.data);
              const blob = new Blob([res.data], {
                type: "application/vnd.ms-excel"
              });
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.download = "首代数据.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
            })
            .catch(err => {
              // console.log(err);
              alert("网络异常");
            });
      },
      async mod(){
        const data = {
          "updateLine":{
            "lineId":this.rowData.lineId,
            "ambAdjustment":this.form2.ambAdjustment,
            "ambRemark":this.form2.ambRemark
          },
          "sortNum":this.rowData.index
          }
        const res = await mod(data);
        // console.log('调整结果',res);
        if(res){
          this.$message.success('预测调整成功')
          this.close()
          this.getList()
        }
      },
      async pass(){
        const data ={
          forecastIds:this.multipleSelection.map(item=>{
            return item.id
          }).join(','),
          passMsg:this.form1.msg
        }
        const res = await pass(data);
        // console.log('通过结果',res);
        if(res){
          this.$message.success('审批成功')
          this.cancel()
          this.getList()
        }
      },
      async reject(){
        const data ={
          forecastIds:this.multipleSelection.map(item=>{
            return item.id
          }).join(','),
          rejectMsg:this.form1.msg
        }
        const res = await reject(data);
        // console.log('驳回结果',res);
        if(res){
          this.$message.success('驳回成功')
          this.cancel()
          this.getList()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      async getList(){
        const data ={
          pageSize:this.pageSize,
          pageNum:this.currentPage,
          customerAbbreviation:this.form.customerAbbreviation,  
          isUpdate:this.form.isUpdate,  
          channel:this.form.channel,
          salePeople:this.form.salePeople,
          uploadStartTime:this.form.uploadStartTime,  
          uploadEndTime:this.form.uploadEndTime,
          ambPeople:this.form.ambPeople,  
          sdPeople :this.form.sdPeople,  
          agencyAbbreviation :this.form.agencyAbbreviation
        }
        const res = await getList(data);
        // console.log('审批列表',res);
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
          this.tableData.map((item,index)=>{
            this.tableData[index].list = [
              {
                index:1,
                lineId:item.line.lineId,
                currentWrite:item.line.currentWriteOne,
                ambRemark:item.line.ambRemarkOne,
                ambAdjustment:item.line.ambAdjustmentOne,
                forecastMonth:item.line.forecastMonthOne,
                gap:item.line.gapOne,
                lastWrite:item.line.lastWriteOne,
                remark:item.line.remarkOne,
                sdAdjustment:item.line.sdAdjustmentOne,
                sdRemark:item.line.sdRemarkOne,
              },
              {
                index:2,
                lineId:item.line.lineId,
                currentWrite:item.line.currentWriteTwo,
                ambRemark:item.line.ambRemarkTwo,
                ambAdjustment:item.line.ambAdjustmentTwo,
                forecastMonth:item.line.forecastMonthTwo,
                gap:item.line.gapOne,
                lastWrite:item.line.lastWriteTwo,
                remark:item.line.remarkOne,
                sdAdjustment:item.line.sdAdjustmentTwo,
                sdRemark:item.line.sdRemarkTwo,
              },
              {
                index:3,
                lineId:item.line.lineId,
                currentWrite:item.line.currentWriteThree,
                ambRemark:item.line.ambRemarkThree,
                ambAdjustment:item.line.ambAdjustmentThree,
                forecastMonth:item.line.forecastMonthThree,
                gap:item.line.gapThree,
                lastWrite:item.line.lastWriteThree,
                remark:item.line.remarkThree,
                sdAdjustment:item.line.sdAdjustmentThree,
                sdRemark:item.line.sdRemarkThree,
              },
              {
                index:4,
                lineId:item.line.lineId,
                currentWrite:item.line.currentWriteFour,
                ambRemark:item.line.ambRemarkFour,
                ambAdjustment:item.line.ambAdjustmentFour,
                forecastMonth:item.line.forecastMonthFour,
                gap:item.line.gapFour,
                lastWrite:item.line.lastWriteFour,
                remark:item.line.remarkFour,
                sdAdjustment:item.line.sdAdjustmentFour,
                sdRemark:item.line.sdRemarkFour,
              },
              {
                index:5,
                lineId:item.line.lineId,
                currentWrite:item.line.currentWriteFive,
                ambRemark:item.line.ambRemarkFive,
                ambAdjustment:item.line.ambAdjustmentFive,
                forecastMonth:item.line.forecastMonthFive,
                gap:item.line.gapFive,
                lastWrite:item.line.lastWriteFive,
                remark:item.line.remarkFive,
                sdAdjustment:item.line.sdAdjustmentFive,
                sdRemark:item.line.sdRemarkFive,
              },
              {
                index:6,
                lineId:item.line.lineId,
                currentWrite:item.line.currentWriteSix,
                ambRemark:item.line.ambRemarkSix,
                ambAdjustment:item.line.ambAdjustmentSix,
                forecastMonth:item.line.forecastMonthSix,
                gap:item.line.gapOne,
                lastWrite:item.line.lastWriteSix,
                remark:item.line.remarkSix,
                sdAdjustment:item.line.sdAdjustmentSix,
                sdRemark:item.line.sdRemarkSix,
              }
            ]
          })
          // console.log(this.tableData)
        }

      },
      add1(type) {
        this.dialogVisible2 = true
        if(type==1){
          this.title = '审批'
          this.label = '审批信息'
        }else{
          this.title = '驳回'
          this.label = '驳回信息'
        }
      },
      adjust() {
        this.dialogVisible1 = true
        // this.form2.lastWrite = this.rowData.lastWrite
      },
      change(){
        this.dialogVisible = !this.dialogVisible

      },
      // 分页
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
.forcastApprove{
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