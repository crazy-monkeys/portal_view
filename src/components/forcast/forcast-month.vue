<template>
  <div class="forcast-month">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>销售预测管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售预测月结</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
           <el-form-item label="代理商名称">
            <el-input size='small' placeholder="请输入" v-model="form.dealerName"></el-input>
          </el-form-item>
          <el-form-item label="修改状态" >
            <el-select  v-model="form.updateS" size="small" clearable>
              <el-option v-for="item in options" :key="item.value" :value='item.value' :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传状态">
            <el-select  v-model="form.insertS" size="small" clearable>
              <el-option v-for="item in options" :key="item.value" :value='item.value' :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain @click='search'>查询</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns">
          <el-button size="small" type="primary" @click="add" >添加代理商</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" >
            <el-table-column prop="dealerName" label="代理名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateM" label="修改年月" show-overflow-tooltip></el-table-column>
            <el-table-column prop="insertM" label="上传年月" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateS" label="修改状态" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- {{scope.row.updateS ==1 ? '恢复' :'冻结'}} -->
                <el-button type="text" v-if="scope.row.updateS == 1" @click="freeze(1,scope.row.mkId,0)">冻结</el-button>  
                <el-button type="text" v-if="scope.row.updateS != 1" @click="recover(1,scope.row.mkId,1)">恢复</el-button>  
              </template>
            </el-table-column>
            <el-table-column prop="insertS" label="上传状态" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- {{scope.row.insertS ==1 ? '恢复' :'冻结'}} -->
                <el-button type="text" v-if="scope.row.insertS == 1" @click="freeze(2,scope.row.mkId,0)">冻结</el-button>  
                <el-button type="text" v-if="scope.row.insertS != 1" @click="recover(2,scope.row.mkId,1)">恢复</el-button>  
              </template>
            </el-table-column>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
              :page-sizes="[50, 100,150]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
        title="添加代理商"
        :visible.sync="addDia"
        width="400px"
        :before-close='close'
        >
        <el-form ref="addForm" :model="addForm" class="form" label-width="auto" label-position='top' :rules='rules' >
          <el-form-item label="选择代理商" prop='dealer'>
            <el-select  v-model="addForm.dealer" size="small" clearable>
              <el-option v-for="item in dealerList" :key="item.id" :value='item.id+","+item.custName' :label="item.custName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button @click="close" size="small">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm')" size="small">提 交</el-button>
        </span>
    </el-dialog>
    <el-dialog
        :title="title"
        :visible.sync="dia"
        width="400px"
        :before-close='close'
        >
        <el-form ref="modForm" :model="modForm" class="form" label-width="auto" label-position='top' :rules='rules' >
          <el-form-item label="输入年月" prop='date'>
            <el-input  v-model="modForm.date" size="small" placeholder="YYYYMM"></el-input>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button @click="close" size="small">取 消</el-button>
          <el-button type="primary" @click="submitForm('modForm',1)" size="small">提 交</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getList,add,getDealerList,mod} from '@/api/forcast/month.js'
  export default {
    name: 'forcast-month',
    data() {
      return {
        dia:false,
        title:'',
        modForm:{
          date:''
        },
        rules: {
          dealer: [{ required: true, trigger: "change",message:'请选择代理商' }],
          date: [{ required: true, trigger: "blur",message:'请输入年月' }],
        },
        options:[
          {
            value:0,
            label:'已冻结',
          },
          {
            value:1,
            label:'非冻结',
          }
        ],
        dealerList:[],
        form: {
          updateS:'',
          insertS:'',
          dealerName:"",
        },
        addForm:{
          dealer:''
        },
        dialogVisible: false,
        addDia: false,
        tableData: [],
        currentPage: 1,
        pageSize: 50,
        total: 0,
        id:'',
        type:'',
        val:''
      }
    },
    computed: {
    
    },
    created() {
      this.getList()
      this.getDealerList()
    },
    watch: {
    },
    methods: {
      freeze(type,id,val){
        this.id = id
        this.type = type
        this.val = val
        this.dia = true
        this.title = '冻结'
      },
      recover(type,id,val){
        this.id = id
        this.type = type
        this.val = val
        this.dia = true
        this.title = '恢复'
      },
      sub(){
        if(this.type==1){
          //修改状态
          var data ={
            "mkId":this.id,
            "updateS":this.val,
            "updateM":""
          }
        }else{
          var data ={
            "mkId":this.id,
            "insertS":this.val,
            "insertM":""
          }
        }
        mod(data).then(res=>{
          if(res.data.code==1){
            this.dia = false
            this.resetForm('modForm')
            this.modForm = {
              date:''
            }
            this.$message({
              type:'success',
              message:'操作成功'
            })
            this.search()
          }
        })
      },
      submitForm(formName,type){
        this.$formTest.submitForm(this.$refs[formName],type ? this.sub : this.save)
      },
      resetForm(formName){
        this.$formTest.resetForm(this.$refs[formName])
      },
      save(){
        var data = {
          dealerId:this.addForm.dealer.split(',')[0],
          dealerName:this.addForm.dealer.split(',')[1]
        }
        add(data).then((res)=>{
          if(res.data.code==1){
            this.addDia = false
            this.addForm = {
              dealer:''
            }
            this.resetForm('addForm')
            this.$message({
              type:'success',
              message:'添加成功'
            })
          }
        })
      },
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList()
      },
      search(){
        this.currentPage = 1;
        this.getList()
      },
      reset(){
        this.form ={
          updateS:'',
          dealerName:"",
          insertS:'',
        }
        this.getList()
      },
      close(){
        this.addDia = false
        this.addForm = {
          dealer:''
        }
        this.dia = false
        this.modForm = {
          date:''
        }
        this.resetForm('addForm')
        this.resetForm('modForm')
      },
      async getDealerList(){
        const res = await getDealerList();
        console.log('代理商列表数据',res)
        if(res){
          this.dealerList = res.data.data
        }
      },
      async getList(){
        const data ={
          pageIndex:this.currentPage,
          pageSize:this.pageSize,
          dealerId:1150,
          insertS:this.form.insertS,
          updateS:this.form.updateS,
        }
        const res = await getList(data);
        console.log('列表数据',res)
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      add() {
        this.addDia = true
      },
      change(){
        this.dialogVisible = !this.dialogVisible
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
.forcast-month{
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