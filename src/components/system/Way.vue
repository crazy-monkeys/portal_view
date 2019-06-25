<template>
  <div class="way">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>渠道管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>渠道管理</h1>
      
    </div>
    <div class="box">
      <div class="btns">
        <el-button @click="add" class="add"  type='primary' size='small'><i class="el-icon-plus"></i> 新增渠道</el-button>
        <el-button class="sec" @click="search">搜索</el-button>
          <!-- 下拉列表 选择活动  -->
          <div class="drop">
            <el-dropdown trigger="click" @command="a">
              <span class="el-dropdown-link">
                {{select}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='{name:"渠道名称",value:1}'>渠道名称</el-dropdown-item>
                <el-dropdown-item :command='{name:"渠道ID",value:2}'>渠道ID</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input v-model="selStr" class="sel"  ></el-input>
             <!-- 日期选择 -->
          
          </div>
          <el-date-picker
          size='small'
            v-model="time"
            prefix-icon="el-icon-fire"
            @change="selTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
      </div>
      <div class="tab">
        <el-table
      :data="tableData"
      style="width: 100%"
      height="700"
      @row-click='rowClick'
      >
      <el-table-column
        type="index"
        label="编号"
        :index='q'
        width="80">
      </el-table-column>
      <el-table-column
        prop="marketingPlaceId"
        label="marketingPlaceId"
        v-if="false"
        >
      </el-table-column>
      
      <el-table-column
        prop="marketingPlaceName"
        label="渠道名称"
        show-overflow-tooltip
       >
      </el-table-column>
      <el-table-column
        prop="marketingPlaceCode"
        label="渠道ID"
        >
      </el-table-column>
     
      <el-table-column
        prop="marketingPlaceNumber"
        show-overflow-tooltip
        label="店铺数量"
        >
      </el-table-column>
        <el-table-column
        prop="createTime"
        show-overflow-tooltip
        label="创建时间"
        >
      </el-table-column>
      <el-table-column
      label="操作"
      width="auto"
      >
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="look(scope.$index, tableData)"
          type="text"
          :disabled="!tableData[scope.$index].marketingPlaceNumber ? true : false"
          :class='!tableData[scope.$index].marketingPlaceNumber ? "dis" : ""'
          >
          查看店铺列表
        </el-button>
        <el-button
          @click.native.prevent="rename(scope.$index, tableData)"
          type="text"
        
          >
          重命名
        </el-button>
        <el-button
          @click.native.prevent="del(scope.$index, tableData)"
          type="text"
          :disabled="tableData[scope.$index].marketingPlaceNumber ? true : false"
          :class='tableData[scope.$index].marketingPlaceNumber ? "dis" : ""'
          >
          删除
        </el-button>
       
      </template>
    </el-table-column>
    <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt="" width="140" height="140" />
            </div>
            <p :style="{'marginTop': '23px'}">无渠道信息</p>
          </div>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 100]"
        :page-size="10"
        layout="sizes,total, jumper, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
      </div>
      

    </div>
    <div class="bottom">按住 [shift] 键，可横向滚动表格哦♥</div>
    
    <!-- 添加渠道控件 -->
    <el-dialog
      title="新增渠道"
      top='15vh'
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form" :rules='rules'>
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  同一店铺下的渠道名称以及渠道ID不能重复</p>
        <el-form-item label="渠道名称"  prop='name'>
          <el-input v-model="form.name" maxlength='10'></el-input>
        </el-form-item>
        <el-form-item label="渠道ID"  prop='id'>
          <el-input v-model="form.id" maxlength='10'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </span>
    </el-dialog>
<!-- 重命名渠道 -->
    <el-dialog
      title="重命名渠道"
      top='15vh'
      :visible.sync="renameVis"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" label-width="80px" :model="renameForm" ref="renameForm" :rules='rules'>
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  同一店铺下的渠道名称以及渠道ID不能重复</p>
        <p class="danger"> 原渠道名称：{{rowData.marketingPlaceName}}</p>
        <p class="danger"> 原渠道ID：{{rowData.marketingPlaceCode}}</p>

        <el-form-item label="新渠道名称" prop='newName'>
          <el-input v-model="renameForm.newName" maxlength='10'></el-input>
        </el-form-item>
        <el-form-item label="新渠道ID" prop='newId'>
          <el-input v-model="renameForm.newId" maxlength='10'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm('renameForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";

export default {
  name: 'way',
  data () {
    return {
      rules: {
        name: [
          { required: true, trigger: "change", validator: formTest.sourceNameTest  }
        ],
        id: [
          { required: true, trigger: "change", validator: formTest.sourceId}
        ],
        newName: [
          { required: true, trigger: "change" , validator: formTest.sourceNameTest}
        ],
        newId: [
          { required: true, trigger: "change",  validator: formTest.sourceId }
        ]
      },
      rowData:'',
      sources:[],
      renameVis:false,
      select:"渠道名称",
      selStr:'',
      time:[],
      form: {
          name:'',
          id:'',
          
      },
      renameForm:{
          newName:'',
          newId:''
      },
      labelPosition: 'top',
      dialogVisible: false,
      tableData: [],
      currentPage : 1,
      pageSize : 10,
      total:0,
    }
  },
  created(){
    this.getList()
  },
  methods:{
        q(index){
      return this.pageSize * (this.currentPage-1) + index +1
    },
    rowClick(row){
      console.log(row)
      this.rowData  = row
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.commit(formName)
          // this.$refs[formName].clearValidate();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      if (this.$refs[formName]) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        } else {
          this.$nextTick(() => {
            this.$refs[formName].resetFields();
          });
        }
      }
    },
    getList(){
      this.$http.get(''+process.env.API_ROOT+'/place/index?pageIndex=' + this.currentPage +'&pageSize='+this.pageSize+'&marketingPlaceName='+( this.select == '渠道名称' ?  this.selStr :'') +'&marketingPlaceCode=' +  ( this.select == '渠道ID' ?  this.selStr :'' ) +'&creatTime='+(this.time ===null   ? '' : this.time.length!=0 ? this.time[0] :'')  +'&endTime='+(this.time ===null   ? '' :this.time.length!=0  ?  this.time[1] :'')).then((res)=>{
          console.log('渠道列表',res)
          if(res.data.code ==1){
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          }else{
            this.tableData = []
            this.total = 0
          }
      }).catch((err)=>{
        console.log(err);

        alert('网络异常')
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList()
    },
    selTime(val){
      console.log(val)

    },
    search(){
      if(this.time!==null){
        if(this.time.length!=0){
          if(new Date(this.time[0]).getTime() >= new Date(this.time[1]).getTime()){
            this.$message({
              type:'error',
              message:'结束时间需晚于开始时间'
            })
          }else{
      this.getList()
          }
        }else{
      this.getList()
        }
      }else{
      this.getList()

      }
    },

    //新增提交
    commit(formName){
      // 
      if(formName =='form'){
        var data ={
          marketingPlaceCode:this.form.id,
          marketingPlaceName:this.form.name
        }
        this.$http.post(''+process.env.API_ROOT+'/place/addPlace',data).then((res)=>{
            console.log('新增结果',res)
            if(res.data.code ==1){
              this.$message({
                type:'success',
                message:'新增渠道成功'
              })
              
              this.resetForm('form')
              this.dialogVisible = false
              this.getList()
            }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }

        }).catch((err)=>{
          console.log(err);

          alert('网络异常')
        })
      }
      if(formName =='renameForm'){
        var data ={
          marketingPlaceCode:this.renameForm.newId,
          marketingPlaceName:this.renameForm.newName,
          marketingPlaceId:this.rowData.marketingPlaceId
        }
        this.$http.post(''+process.env.API_ROOT+'/place/updatePlace',data).then((res)=>{
            console.log('重命名结果',res)
            if(res.data.code ==1){
              this.$message({
                type:'success',
                message:'重命名成功'
              })
              this.resetForm('shopForm')
              this.renameVis = false
              this.getList()
            }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }

        }).catch((err)=>{
          console.log(err);

          alert('网络异常')
        })
      }
    },
    //关闭弹窗
    close(){
      this.resetForm('form')
      this.resetForm('renameForm')
      this.renameVis = false;
      this.dialogVisible = false;
    },
    //新增
    add(){
      this.dialogVisible = true;
      
    },
    //删除
    del(index, rows){
      // this.$confirm('删除该店铺后，当前店铺的所有规则、配置均会失效，请在此确认是否删除?', '删除', {
      //     distinguishCancelAndClose: true,
      //     confirmButtonText: '是',
      //     cancelButtonText: '否'
      //   })
      //     .then(() => {
        var data ={
          marketingPlaceId:rows[index].marketingPlaceId
        }
            this.$http.post(''+process.env.API_ROOT+'/place/deletePlace',data
              ).then((res)=>{
                  console.log('删除结果',res)
                  if(res.data.code ==1){
                    this.$message({
                      type:'success',
                      message: '删除成功'
                    })
                    this.getList()
                  }else{
                     this.$message({
                      type:'fail',
                      message: '删除失败'
                    })
                  }

              }).catch((err)=>{
                console.log(err);
                alert('网络异常')
              })
          // })
          // .catch(action => {
          //   // this.$message({
          //   //   type: 'fail',
          //   //   message: '已取消操作'
          //   // })
          // });
    },
    //重命名
    rename(){
      this.renameVis = true;
    },
    //查看店铺列表
    look(index,rows){
      this.$router.push(
        {
          name:'wayShop',
          query:{
            name:rows[index].marketingPlaceName,
            id:rows[index].marketingPlaceId
          }
        }
      )
    },
    //切换搜索条件
    a(command) {
      this.select = command.name;
      console.log(this.select);
      if (this.select == "渠道名称") {
        this.currentPage=1
      }
      if (this.select == "渠道ID") {
        this.currentPage=1
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;
.way{
  .dis{
    span{
    color: #aaa

    }
  }
  .selSource{
    width: 100%;
  }
  .el-dialog{
    .el-form-item{
      margin-bottom: 20px;
    }
    .el-form--label-top .el-form-item__label{
      padding-bottom: 0
    }
  }
  .head{
    h1{
        opacity: 0.87;
        font-family: 'zt2';
        font-size: 18px;
        color: #000;
        letter-spacing: 0;
        line-height: 36px;
        height: 42px;
        font-weight: bold;
        padding: 0 50px;
        // float: left;
      }
    .el-breadcrumb{
      // float: right;
      margin-left: 50px;
      line-height: 30px;
      margin-right: 20px
    }
  }
  .box{
    position: relative;
    margin: 0 20px 20px 20px;
    background: #FFFFFF;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
    border-radius: 2px;
    .btns {
      .level {
        width: 10%;
        margin: 12px 0 0 32px;

        .el-input__inner {
          border-radius: 0;
        }
      }
      .add {
        font-family: 'zt2';
        // font-size: 14px;
        // color: #ffffff;
        // letter-spacing: 0;
        // background: #3366ff;
        // border-radius: 2px;
        // height: 32px;
        // line-height: 10px;
        // border: none;
        margin: 12px 0 12px 20px;
        // float: left;
      }
      .drop {
        float: right;
        width: 286px;
        height: 32px;
        line-height: 30px;
        margin: 12px 0 12px 20px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        .el-dropdown-link {
          display: inline-block;
          height: 30px;
          border-right: 1px solid #ccc;
          width: 100px;
          padding: 0 10px;
          line-height: 30px;
          i{
            display: block;
            height: 30px;
            line-height: 30px;
            float: right;
          }
        }
        .sel {
          width: 180px;
          .el-input__inner {
            border: none;
            height: 28px;
          }
        }
        .el-dropdown {
          float: left;

          .el-dropdown-menu__item {
            width: 100px;
          }
        }
      }
      .el-date-editor {
        float: right;
        margin: 12px 0 12px 20px;
        // height: 32px;
        // line-height: 32px;
        // border-radius: 0;
        // .el-range-separator {
        //   line-height: 32px;
        //   height: 32px;
        // }
      }
      .sec {
        font-family: 'zt2';
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        border: 1px solid #3366ff;
        border-radius: 2px;
        height: 32px;
        line-height: 8px;
        margin: 12px 0 12px 20px;
        float: right;
        color: #3366ff;
        margin-right: 20px;
      }
    }
    .tab{
      .el-table{
           td {
          height: 64px;
          line-height: 64px;
          .cell{
              // overflow: hidden;
              // text-overflow:ellipsis;
              // display: -webkit-box;
              // -webkit-line-clamp: 2;
              // -webkit-box-orient: vertical;
              // width:200px;
                font-family: 'zt1';
                font-size: 12px;
                color: #333333;
                letter-spacing: 0;
                line-height: 18px;

          }
          .el-button{
            font-family: 'zt1';
            font-size: 12px;
            color: #3366FF;
            letter-spacing: 0;
            line-height: 12px;

          }
        }
      }
    }

 .block {
      // position: absolute;
      bottom: 26px;
      padding: 10px;
      .el-pagination {
        width: 100%;
        text-align: center;
      }
    }

  }
   .bottom{
      text-align: center;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
      line-height: 16px;
    }
  .danger{
    font-family: 'zt1';
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }
}
</style>
