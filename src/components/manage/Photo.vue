<template>
  <div class="photo">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>快照管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>
        快照管理</h1>
      
    </div>
    <div class="box">
      <div class="btns">
        <el-input v-model="selStr"   class="sel" placeholder="在当前位置搜索快照名称" @keyup.enter.native="search">
          <i slot="prefix" class="el-input__icon el-icon-search" @click="search" ></i>
        </el-input>
                  <!-- 下拉列表 选择活动  -->
          <div class="drop">
            <el-dropdown trigger="click" @command='a'>
              <span class="el-dropdown-link">
                {{select}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='{name:"全部类型",value:1}'>全部类型</el-dropdown-item>
                <el-dropdown-item :command='{name:"SMS",value:2}'>SMS</el-dropdown-item>
                <el-dropdown-item :command='{name:"EDM",value:3}'>EDM</el-dropdown-item>
                <el-dropdown-item :command='{name:"TB",value:4}'>TB</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
      </div>
      <div class="tab">
        <el-table :data="tableData" style="width: 100%" height="700">
          <el-table-column
            type="index"
            label="编号"
            :index='q'

            width="100">
          </el-table-column>
          <el-table-column
            prop="snapshotId"
            label="ID"
            v-if="false"
            >
          </el-table-column>
          <el-table-column
            prop="snapshotName"
            label="快照名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="snapshotType"
            label="快照类型"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="快照来源"
            show-overflow-tooltip
          >
          <template slot-scope="scope">
            <span v-if="tableData[scope.$index].snapshotSource==0">外客</span>
            <span v-if="tableData[scope.$index].snapshotSource==1">客户分组</span>
            <span v-if="tableData[scope.$index].snapshotSource==2">快照且或非</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="createTimeStr"
            label="快照创建日期"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="customerNum"
            label="客户数"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="rename(scope.$index, tableData)"
                type="text"
                >
                重命名
              </el-button>
              <el-button
              :class="tableData[scope.$index].customerNum==0|| tableData[scope.$index].snapshotType!='SMS'  ? 'dis' :''"
              :disabled="tableData[scope.$index].customerNum==0 || tableData[scope.$index].snapshotType!='SMS'"
                @click.native.prevent="market(scope.$index, tableData)"
                type="text"
                >
                营销
              </el-button>
              <el-button
                @click.native.prevent="toggle(scope.$index, tableData)"
                type="text"
                >
                快照且或非
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                >
                删除
              </el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt="" width="140" height="140" />
            </div>
            <p :style="{'marginTop': '23px'}">未查询到快照列表</p>
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
    <div class="bottom">按住 [shift] 键，可横向滚动表格哦</div>
    <!-- 创建目录管理控件 -->
    <el-dialog
      title="重命名" 
      :visible.sync="dialogVisible"
      width="20%"
      :before-close="qx"
      :close-on-click-modal="false"
    >
      <el-form :label-position="labelPosition" label-width="80px" :model="photoForm" ref="photoForm" :rules='rules'>
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  同一店铺下快照名称不能重复</p>
        <el-form-item label="快照名称" prop='name' >
          <el-input v-model="photoForm.name" class="proName"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx" :plain='true'>取消</el-button>
        <el-button type="primary" @click="submitForm('photoForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'

export default {
  name: 'photo',
  data () {
    return {
      photoForm:{
        name:'',
        id:''
      },
      dialogVisible:false,
      rules: {
        name: [
          { required: true, message: '请输入快照名称', trigger: 'change' },
        ]
      },
      labelPosition:'top',
      blackForm:{
      },
      //搜索条件
      way:{
        // 全部类型、SMS、EDM、TB”
      },
      select:"全部类型",
      selStr:"",
      tableData: [],
      //默认页
      currentPage : 1,
      //默认数量
      pageSize : 10,
      //默认总页数
      total:0,
      //用户店铺列表
      shopList:[
        {
          shop_info_id:'',
        }
      ],
    }
  },
  created(){
    this.getShopList()
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    }
  },
  watch:{
    shopId:{
      handler:function(n,o){
        if(n!=o){
          console.log(1111111111111)
            this.getBlack(this.currentPage,this.pageSize,this.shopId);
        }
      }
    },
  },
  methods:{
  // 选择全部，活动或者快照名称
    a(command){
      this.select = command.name
      this.currentPage=1;
      this.getBlack(this.currentPage,this.pageSize,this.shopId);
      console.log(this.select)
    },
    //表单验证
    submitForm(formName,) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.commit(this.photoForm.id,this.photoForm.name);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //清空表单
    resetForm(formName) {
      if(this.$refs[formName]){
      if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
      }else{
        this.$nextTick(()=>{
          this.$refs[formName].resetFields();
        })
      }
      }
    },
    // 提交
    commit(id,name) {
      this.$http.get(''+process.env.API_ROOT+'/snapshot/rename?snapshotId='+
          id +'&snapshotName=' +    name
        ).then((res)=>{
            console.log(res)
            if(res.data.code ==1){
              this.$message({
                type:'success',
                message: '重命名成功'
              })
              this.getBlack(this.currentPage,this.pageSize,this.shopId)
              this.qx()
            }else{
                this.$message({
                type:'fail',
                message: '重命名成功失败'
              })
            }

        }).catch((err)=>{
          console.log(err);
          alert('网络异常')
        })
    },
    //搜索
    search(){
      this.currentPage=1
      this.getBlack(this.currentPage,this.pageSize,this.shopId)
    },

    qx(){
      this.resetForm('photoForm')
      this.dialogVisible  =false
      this.clear()
    },
    clear(){
      this.photoForm.name=''
    },
    //获取用户店铺列表
    getShopList(){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/getCurentUserShopList',
      }).then(res => {
          console.log("res", res);
          if(res.data.code==1){
            this.shopList = res.data.data;
            this.getBlack(this.currentPage,this.pageSize,this.shopId)
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //编号连续
    q(index){
     return this.pageSize * (this.currentPage-1) + index +1
    },
    //获取快照列表
    getBlack(pageIndex,pageSize,shopid) {
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/snapshot?pageIndex='+pageIndex+'&pageSize='+pageSize+'&shopInfoId=' + shopid +'&snapshotName='+(this.selStr? this.selStr : '') +'&snapshotType='+ (this.select == '全部类型' ? 'ALL' : this.select) +'&isPage='+1
      }).then(res => {
          console.log("快照列表", res);
          if(res.data.code==1){
            this.tableData = res.data.data.list;
            this.total =  res.data.data.total
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    
    toggle(index, rows){
      this.$router.push(
        {
          name:'photoCondition',
          params:{
            id:rows[index].snapshotId,
            type:rows[index].snapshotType
          }
        }
      )
    },
    market(index, rows){
      this.$router.push(
        {
          name:'AddSell',
          params:{
            id:rows[index].snapshotId
          }
        }
      )
      
    },
    rename(index, rows){
      this.dialogVisible = true;
      this.photoForm.name = rows[index].snapshotName
      this.photoForm.id =  rows[index].snapshotId
      
    },
    // 删除
    deleteRow(index, rows) {
       this.$confirm('确定要删除该快照吗?', '删除', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$http.get(''+process.env.API_ROOT+'/snapshot/del?snapshotId='+
                rows[index].snapshotId
              ).then((res)=>{
                  console.log(res)
                  if(res.data.code ==1){
                    this.$message({
                      type:'success',
                      message: '删除快照成功'
                    })
                    this.getBlack(this.currentPage,this.pageSize,this.shopId)
                  }else{
                     this.$message({
                      type:'fail',
                      message: '该快照已应用与营销活动不可删除'
                    })
                  }

              }).catch((err)=>{
                console.log(err);
                alert('网络异常')
              })
          })
          .catch(action => {
            this.$message({
              type: 'fail',
              message: '已取消操作'
            })
          });
    },
    //分页
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getBlack(this.currentPage,this.pageSize,this.shopId)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getBlack(this.currentPage,this.pageSize,this.shopId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;
.photo{
  .dis{
    span{
    color: #ccc;

    }
  }
  .head{
    h1{
        opacity: 0.87;
        font-family: PingFangSC-Medium;
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
    .btns{
      height: 56px;
      .drop{
        border:  1px solid #ccc;
        // width: 100px;
        height: 32px;
        line-height: 32px;
        padding: 0 10px 0 10px;
        margin: 12px 20px 0 0;
        float: right;
        box-sizing: border-box;
      
      }
      .el-icon-plus,.el-icon-upload2{
        margin-right: 10px;font-weight: bold;
      }
      .sel{
        width: 200px;
        float: right;
line-height: 32px;
        height: 32px;
        margin: 12px 40px 0 0;
        .el-input__inner{
          border-radius: 0;
        height: 32px;
line-height: 32px;
        }
        .el-input__icon{
line-height: 32px;

        }
      }
      .el-button{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        background: #3366FF;
        border-radius: 2px;
        height: 32px;
        line-height: 10px;
        border: none;
        margin: 12px 0 12px 20px;
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
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #333333;
                letter-spacing: 0;
                line-height: 18px;

          }
          .el-button{
            font-family: PingFangSC-Regular;
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
      .el-pagination{
        width: 100%;
        text-align: center
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
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }
}
</style>
