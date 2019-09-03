<template>
  <div class="cbt">
    <div class="sellBox"> 
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item >商务管理</el-breadcrumb-item>
          <el-breadcrumb-item >差价、保价、退换货申请</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="类别">
            <el-select v-model="form.type" size="small" filterable placeholder="请选择">
              <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发货方编号">
            <el-input size='small' v-model="form.shipperCode"  placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="公司">
            <el-input size='small' v-model="form.company" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="CR金额">
            <el-input size='small' v-model="form.crAmount" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="内部客户">
            <el-input size='small' v-model="form.inCustomerName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="外部客户">
            <el-input size='small' v-model="form.outCustomerName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="币种">
            <el-select v-model="form.currency" size="small" filterable placeholder="请选择">
              <el-option v-for="item in currences" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间" class="date">
            <Daterange @data='watchTime' :resetDataReg='resetData' />
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain @click="search">搜索</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns">
          <el-button type='primary' class="add" size='mini' @click="add">新建</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" @row-click='rowClick'>
            <el-table-column type="index" width='100' label="编号" :index='q'>
            </el-table-column>
            <el-table-column prop="type" show-overflow-tooltip label="类别" width="150">
              <template slot-scope='scope'>
                <span v-if="scope.row.type==1">保价</span>
                <span v-if="scope.row.type==2">差价补偿</span>
                <span v-if="scope.row.type==3">退换货</span>
              </template>
            </el-table-column>
            
            <el-table-column prop="shipperCode" label="发货方编号" show-overflow-tooltip width="150">
            </el-table-column>

            <el-table-column prop="company" label="公司" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="applyTime" label="申请时间" show-overflow-tooltip sortable="" width="150">
            </el-table-column>
            <el-table-column prop="currency" label="币种" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="crAmount" label="CR金额" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="inCustomerName" label="内部客户" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="outCustomerName" label="外部客户" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="currentReviewer" label="当前审批人" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="reviewedPeople" label="下一位审批人" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column width='150' label="操作" fixed='right'>
              <template slot-scope='scope'>
                <el-button type='text'  @click='mx(scope.row)'>明细</el-button>
                <el-button type='text' :disabled="scope.row.status!=2"  @click='report(scope.row)'>上传</el-button>
                <!-- <el-button type='text'  @click='del'>删除</el-button> -->
              </template>
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
        title="搜索"
        :visible.sync="dialogVisible2"
        width="400px"
        top="10vh"
        >
        当前客户不存在，是否进行报备
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2= false" size="small" type="primary" plain>取 消</el-button>
            <el-button type="primary" @click="sure1"  size="small">确 定</el-button>
          </span>
    </el-dialog>
    <el-dialog
        title="上传"
        :visible.sync="dialogVisible3"
        width="400px"
        top="10vh"
        :before-close="cancel"
        >
          <el-form ref="form1" :model="form1" class="form1" label-width="auto" label-position='top' :inline='true' >
          <el-form-item label="CR金额" v-if="rowData.type==3">
            <el-input size='small' v-model="form1.cr" placeholder="请输入" > </el-input>
          </el-form-item>
          <el-form-item label="附件">
            <el-upload class="upload-demo" :before-upload="beforeUpload" ref='upload' name='file' :auto-upload="false" :data="data"  :on-success='uploadSuccess' :action='serverUrl+"/business/idr/upload"' :file-list="fileList">
              <el-button size="mini" type="" >上传文件</el-button>
              
            </el-upload>
          </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel" size="small" type="primary" plain>取 消</el-button>
            <el-button type="primary" @click="submitForm('form1')"  size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
import Daterange from "../com/date";
import {getList} from "@/api/business/idr.js";
  import {serverUrl} from "@/axios/request.js";

export default {
  components:{
    Daterange
  },
  name: "theme",
  data() {
    return {
      auth:sessionStorage.getItem('data'),
      serverUrl: serverUrl,
      data:{},
      resetData:true,
      fileList:[],
      dialogVisible2:false,
      dialogVisible3:false,
      form:{
        // 类别
        type:'',
        // 发货方编号
        shipperCode	:'',
        // 公司
        company	:'',
        // cr金额
        crAmount	:'',
        //申请时间 开始时间
        applyStartTime	:'',
        //申请结束时间
        applyEndTime	:'',
        //币种
        currency	:'',
        //内部客户名
        inCustomerName	:'',
        //w外部客户名
        outCustomerName:''
      },
      form1:{
        cr:''
      },
      types:[
        {
          value: 1,
          label: "保价"
        },
        {
          value: 2,
          label: "差价补偿"
        },
        {
          value: 3,
          label: "退换货"
        }
      ],
      currences: [
        {
          value: 'CNY',
          label: "CNY"
        },
        {
          value: "USD",
          label: "USD"
        }
      ],
      value: "",
      dialogVisible: false,
      tableData: [],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 10,
      total:0,
      rowData:{}
    };
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
  watch: {},
  methods: {
    cancel(){
      this.resetForm('form1') 
      this.form1.cr= ''
      this.fileList = []
      this.dialogVisible3= false
    },
    resetForm(formName){
      this.$formTest.resetForm(this.$refs[formName])
    },
    submitForm(formName){
      this.$formTest.submitForm(this.$refs[formName],this.sure3)
    },
    beforeUpload(file){
      let data = new FormData()
      data.append('file',file)
      data.append('id',this.rowData.id)
      data.append('idrType',this.rowData.type)
      data.append('crAmount',this.form1.cr)
      data.append('fileType',3)
      this.$http({
        method: 'post',
        url: this.serverUrl+"/business/idr/upload",
        headers:{'Authorization': this.auth},
        timeout: 20000,
        data: data
      }).then(res=>{
        console.log(res)
        if(res.data.code==1){
          this.$message.success('上传成功')
          this.fileList =[res.data.data]
          this.cancel('form1')
          this.getList()
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
      return false
    },
    uploadSuccess(res, file, fileList){
    },
    watchTime(data){
      console.log(data)
      this.form.applyStartTime = data.startTime
      this.form.applyEndTime = data.endTime
      this.resetData = false
    },
    search(){
      this.getList()
    },
    reset(){
      this.form = {
         // 类别
        type:'',
        // 发货方编号
        shipperCode	:'',
        // 公司
        company	:'',
        // cr金额
        crAmount	:'',
        //申请时间 开始时间
        applyStartTime	:'',
        //申请结束时间
        applyEndTime	:'',
        //币种
        currency	:'',
        //内部客户名
        inCustomerName	:'',
        //w外部客户名
        outCustomerName:''
      }
      this.resetData = true
      this.getList()
    },
    async getList(){
      const res = await getList(this.form);
      console.log('差价、保价、退换货列表',res)
      if(res){
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      }
    },
    rowClick(row){
      console.log(row)
      this.rowData=row
    },
    
    sure1(){
      this.dialogVisible2 = false;
      this.$router.push({
        name:'black'
      })
    },
    sure3(){
      this.$refs.upload.submit(this.data);
    },
    del(){
      this.$confirm('是否删除该条报备信息', '删除', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(() => { 
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(action => {
          this.$message({
            type: 'fail',
            message: '已取消操作'
          })
        });
    },
    report(){
      this.dialogVisible3 = true
    },
    change() {
      this.dialogVisible = !this.dialogVisible;
    },
   
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    add() {
      this.$router.push({
        name: "idradd"
      });
    },
    mx(row) {
      this.$router.push({
        name: "idrmx",
        query:{
          id:row.id,
          type:row.type
        }
      });
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
.cbt{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;
  .el-dialog{
    .form1 {
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          width: 100%;
          .el-input{
            width: 100%;
          }
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