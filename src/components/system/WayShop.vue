<template>
  <div class="wayShop">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>渠道管理</el-breadcrumb-item>
        <el-breadcrumb-item>店铺列表</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>
          <i class="el-icon-back" @click="back"></i>
          <span >{{$route.query.name}}</span>
          <!-- <span v-if="form.merchantPointConfigId">编辑优惠券规则</span> -->
        </h1>
      
    </div>
    <div class="box">
      <div class="btns">
        <el-button class="sec" @click="search">搜索</el-button>
          <!-- 下拉列表 选择活动  -->
          <div class="drop">
            <el-dropdown trigger="click" @command="a">
              <span class="el-dropdown-link">
                {{select}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='{name:"不限",value:0}'>不限</el-dropdown-item>
                <el-dropdown-item :command='{name:"店铺名称",value:1}'>店铺名称</el-dropdown-item>
                <el-dropdown-item :command='{name:"店铺ID",value:2}'>店铺ID</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input v-model="selStr" class="sel"  ></el-input>
          </div>
          <!-- 日期选择 -->
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
        >
      <el-table-column
        type="index"
        label="编号"

        width="80">
      </el-table-column>
      <el-table-column
        prop="shopCode"
        label="shopCode"
        v-if="false"
        >
      </el-table-column>
      
      <el-table-column
        prop="shopName"
        label="店铺名称"
        show-overflow-tooltip
       >
      </el-table-column>
      <el-table-column
        prop="shopCode"
        label="店铺Id"
        >
      </el-table-column>
     
      <el-table-column
        prop="shopManager"
        show-overflow-tooltip
        label="联系人姓名"
        >
      </el-table-column>
        <el-table-column
        prop="contactMobile"
        show-overflow-tooltip
        label="联系人手机号码"
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
      width="100"
      >
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          >
          删除
        </el-button>
        <el-button
          @click.native.prevent="edit(scope.$index, tableData)"
          type="text"
          >
          编辑
        </el-button>
      </template>
    </el-table-column>
    <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt="" width="140" height="140" />
            </div>
            <p :style="{'marginTop': '23px'}">无店铺信息</p>
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
    
    <!-- 添加店铺控件 -->
    <el-dialog
      :title="!editToggle ? '新增店铺' : '编辑店铺'"
      top='8vh'
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" label-width="80px" :model="shopForm" :rules='rules' ref='shopForm' class="shopForm">
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  店铺名称不能重复</p>
        <el-form-item label="店铺名称" prop='storeName'>
          <el-input v-model="shopForm.storeName" maxlength='15'></el-input>
        </el-form-item>
        <el-form-item label="店铺id" prop='storeId'>
          <el-input v-model="shopForm.storeId"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop='storePerson' maxlength='15'>
          <el-input v-model="shopForm.storePerson"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号码" prop='storeMobile'>
          <el-input v-model="shopForm.storeMobile"></el-input>
        </el-form-item>
        <el-form-item label="门店所属渠道" v-if="sources.length!=0" prop='source'> 
          <el-select v-model="shopForm.source" placeholder="请选择" class="selSource">
            <el-option
              v-for="item in sources"
              :key="item.marketingPlaceId"
              :label="item.marketingPlaceName"
              :value="item.marketingPlaceId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店所属渠道" v-if="sources.length==0" prop='source'> 
         需先配置渠道点击 <el-button type='text'  @click="go"> 去配置</el-button> 
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm('shopForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";

export default {
  name: 'wayShop',
  data () {
    return {
      rules: {
        storeName: [
          { required: true, trigger: "change", validator: formTest.shopNameTest  }
        ],
        storeMobile: [
          { required: true, trigger: "change", validator: formTest.phoneTest}
        ],
        storePerson: [
          { required: true, trigger: "change" , validator: formTest.personName}
        ],
        storeId: [
          { required: true, trigger: "change",  validator: formTest.shopId }
        ],
        source: [
          { required: true, trigger: "change",  message:'渠道不能为空' }
        ],
      },
      editToggle:false,
      sources:[],
      select:"不限",
      selStr:'',
      time:[],
      shopForm: {
          storeMobile:'',
          storePerson:'',
          storeName:'',
          storeId:'',
          source:'',
          shopInfoId:''
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
    this.getShopList()
    this.getSource()
  },
  methods:{
    back(){
      this.$router.push(
        {
          name:'way'
        }
      )
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.commit()
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
    go(){
      this.$router.push(
        {
          name:'source'
        }
      )
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
            this.getShopList();
          }
        }else{
          this.getShopList();
        }

      }else{
        this.getShopList();
      }
    },
    a(command) {
      this.select = command.name;
      console.log(this.select);
      if (this.select == "店铺名称") {
        this.currentPage=1
      }
      if (this.select == "店铺ID") {
        this.currentPage=1
      }
    },
    selTime(val){
      console.log(val)
    },
    clearForm(){
      this.shopForm.source='',
      this.shopForm.storeMobile='',
      this.shopForm.storePerson='',
      this.shopForm.storeName='',
      this.shopForm.storeId=''
      this.shopForm.shopInfoId=''
    },
    edit(index,rows){
      this.dialogVisible = true
      this.getMore(index,rows)
    },
    getMore(index,rows){
        
        this.$http.get(''+process.env.API_ROOT+'/shop/info?id='+rows[index].shopInfoId
              ).then((res)=>{
                  console.log('店铺详情',res)
                  if(res.data.code ==1){
                    this.editToggle = true
                    this.shopForm.storeName = res.data.data.shopName
                    this.shopForm.storeMobile = res.data.data.contactMobile
                    this.shopForm.storeId = res.data.data.shopCode? res.data.data.shopCode : ''
                    this.shopForm.shopInfoId = res.data.data.shopInfoId
                    this.shopForm.storePerson = res.data.data.shopManager
                    this.shopForm.source = res.data.data.marketingPlaceId
                  }else{

                  }
              }).catch((err)=>{
                console.log(err);
                alert('网络异常')
              })
    },
    //获取用户店铺列表
    getShopList(){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/shop/list?shopName='+(( this.select == '店铺名称') ?  this.selStr :'') +'&shopCode='+(( this.select == '店铺ID') ?  this.selStr :'')  +'&creatTime='+(this.time ===null   ? '' : this.time.length!=0 ? this.time[0] :'')  +'&endTime='+(this.time ===null   ? '' :this.time.length!=0  ?  this.time[1] :'')  +'&pageIndex='+this.currentPage +'&pageSize=' + this.pageSize +'&marketingPlaceId=' + this.$route.query.id,
      }).then(res => {
          console.log("店铺列表", res);
          if(res.data.code==1){
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          }else{
            this.tableData = []
            this.total = 0
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    getSource(){
      this.$http.get(''+process.env.API_ROOT+'/place/list').then((res)=>{
          console.log(res)
          if(res.data.code ==1){
            this.sources = res.data.data
          }else{
            this.sources = []
            
          }

      }).catch((err)=>{
        console.log(err);

        alert('网络异常')
      })
    },
    //显示创建店铺框
    add(){
      this.editToggle = false
      this.dialogVisible = true;
    },
    close(){
      this.dialogVisible = false;
            this.resetForm('shopForm')

      this.clearForm()
    },
    deleteRow(index, rows) {
       this.$confirm('删除该店铺后，当前店铺的所有规则、配置均会失效，请在此确认是否删除?', '删除', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$http.get(''+process.env.API_ROOT+'/shop/del?id='+rows[index].shopInfoId
              ).then((res)=>{
                  console.log(res)
                  if(res.data.code ==1){
                    this.$message({
                      type:'success',
                      message: '删除店铺成功'
                    })
                    this.getShopList()
                  }else{
                     this.$message({
                      type:'fail',
                      message: '删除店铺失败'
                    })
                  }

              }).catch((err)=>{
                console.log(err);
                alert('网络异常')
              })
          })
          .catch(action => {
            // this.$message({
            //   type: 'fail',
            //   message: '已取消操作'
            // })
          });
    },
    commit(){
// shopName	
// [string]	是	店铺名称	展开
// shopCode	
// [string]	是	店铺id	展开
// shopManager	
// [string]	是	店铺负责人	展开
// contactMobile	
// [string]	是	负责人电话	展开
// marketingPlaceId复制
// [long]	是	渠道id
      var data = {
          "shopName":this.shopForm.storeName,
          "shopCode":this.shopForm.storeId,
          "shopManager":this.shopForm.storePerson,
          "contactMobile":this.shopForm.storeMobile,
          "marketingPlaceId":this.shopForm.source,
        }
        if(this.editToggle){
          data.shopInfoId = this.shopForm.shopInfoId
        }
      this.$http.post(''+process.env.API_ROOT+ (!this.editToggle ? '/shop/info' : '/shop/update'),data).then((res)=>{
          console.log(res)
          if(res.data.code ==1){
            if(this.editToggle){
              this.$message({
                type:'success',
                message: '编辑店铺成功'
              })
            }else{
              this.$message({
                type:'success',
                message: '新增店铺成功'
              })
            }
            this.resetForm('shopForm')
          this.getShopList()
          }else{
            if(this.editToggle){
              this.$message({
                type:'fail',
                message: '编辑店铺失败'
              })
            }else{
              this.$message({
                type:'fail',
                message: '新增店铺失败'
              })
            }
            
          }

      }).catch((err)=>{
        console.log(err);

        alert('网络异常')
      })

      this.clearForm()
      this.dialogVisible = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getShopList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getShopList()

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;
.wayShop{
  .shopForm{
    .el-form-item{
      margin-bottom: 20px;
    }
  }
  .selSource{
    width: 100%;
  }
  .el-dialog{
    .el-form-item{
      margin-bottom: 20px
    }
    .el-form--label-top .el-form-item__label{
      padding-bottom: 0
    }
  }
  .head{
    h1 {
      opacity: 0.87;
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 42px;
      height: 42px;
      font-weight: bold;
      padding: 0 50px;
      float: left;
        font-family: 'zt2';

      span {
        border-left: 1px solid #ccc;
        padding: 0 20px;
      }
      i {
        font-weight: bold;
        margin-right: 20px;
        cursor: pointer;
      }
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
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        background: #3366ff;
        border-radius: 2px;
        height: 32px;
        line-height: 10px;
        border: none;
        margin: 12px 0 12px 20px;
        float: left;
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
