<template>
  <div class="merchant">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>客户权益</el-breadcrumb-item>
        <el-breadcrumb-item>商户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>商户管理</h1>
      
    </div>
    <div class="box">
      <div class="btns">
        <el-button @click="add">新增商户</el-button>
        <el-button class="sec" @click="search">搜索</el-button>
        <el-input v-model="selShopName" class="sel"  placeholder="请输入商户名称"></el-input>
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
      :index='q'
        width="80">
      </el-table-column>
      <el-table-column
      width="150"
        prop="apiMerchantName"
        label="商户名称"
        show-overflow-tooltip
       >
      </el-table-column>
       <el-table-column
        prop=""
        show-overflow-tooltip
        label="关联店铺"
        >
        <template slot-scope="scope">
          <span v-for='(item,index) in tableData[scope.$index].shopList' :key="index">  {{item.shop_name}}  </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        show-overflow-tooltip
      width="200"
        label="创建时间"
        >
      </el-table-column>
      <el-table-column
      label="操作"
      width="150"
      >
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="edit(scope.$index, tableData)"
          type="text"
          >
          编辑
        </el-button>
        <el-button
          @click.native.prevent="repair(scope.$index, tableData)"
          type="text"
          >
          接口用户维护
        </el-button>
      </template>
    </el-table-column>
    <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt="" width="140" height="140" />
            </div>
            <p :style="{'marginTop': '23px'}">无商户信息</p>
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

    <!-- 添加店铺控件 -->
    <el-dialog
      :title="shopForm.apiMerchantId ? '编辑商户':'新增商户'"
      top='8vh'
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" label-width="80px" :model="shopForm"  ref="shopForm" :rules='rules'>
          <!-- <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  商户名称不能重复</p> -->
        <el-form-item label="商户名称" prop='apiMerchantName'>
          <el-input v-model="shopForm.apiMerchantName"></el-input>
        </el-form-item>
        <el-form-item label="关联店铺" prop='shop' >
          <el-select v-model="shopForm.shop" multiple  filterable  placeholder='请选择关联店铺'  :collapse-tags='true'>
              <el-option
                v-for="item in shop"
                :key="item.shop_info_id"
                :label="item.shop_name"
                :value="item.shop_info_id"
              >
              </el-option>
            </el-select>
          
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

export default {
  name: 'merchant',
  data () {
    return {
      ways:[],
      oldOptions:[],
      rules: {
        apiMerchantName: [
          { required: true, trigger: "blur", validator:(rule, value, callback) => {
              var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?]{1,10}$/;
                if(!value){
                      callback(new Error('商户名称不能为空'))
                }else{
                  if(value.length>10){
                    callback(new Error('商户名称最长不能超过10个字'))
                  }else{
                    if(!reg.test(value)){
                      callback(new Error('商户名称不能包含特殊字符'))
                    }else{
                      callback()
                    }
                  }
                }
            },  
          }
        ],
        shop:[
          {
            required: true, trigger: "change", validator:(rule, value, callback) => {
              console.log(value)
                if(value.length==0){
                    callback(new Error('关联店铺不能为空'))
                }else{
                    callback()
                }
            },  
          }
        ]
      },
      selShopName:"",
      shop:[],
      currentPage4: 4,
      shopForm: {
          createTime:'',
          apiMerchantName:'',
          apiMerchantId:'',
          shop:[],
          apiMerchantId:"",
          shopList:[]
      },
      labelPosition: 'top',
      dialogVisible: false,
      tableData: [],
      currentPage : 1,
      pageSize : 10,
      shopList:[
        {
          shop_info_id:'',
        }
      ],
      total:0,
    }
  },
  created(){
    this.getList(this.selShopName)
  },
  watch:{
    'shopForm.shop':{
      handler:function(n,o){
        this.shopForm.shopList=[];
        n.forEach(item => {
          this.shop.forEach(ele=>{
            if(ele.shop_info_id == item){
              this.shopForm.shopList.push({
                'SHOP_ID':ele.shop_info_id,
                'SHOP_NAME':ele.shop_name,
              })
            }
          })
        });
      }
    }
  },
  methods:{
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      } else {
        this.$nextTick(() => {
          this.$refs[formName].resetFields();
        });
      }
    },
    submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
              this.commit()
          } else {
            console.log("error submit!!");
            return false;
          }
        });
    },
    search(){
      this.currentPage = 1
      this.getList(this.selShopName)
    },
    //获取用户店铺列表
    getShopList(apiMerchantId) {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/getNotRelationShopList?apiMerchantId="+apiMerchantId
      })
        .then(res => {
          console.log("店铺列表", res.data.data);
          if (res.data.code == 1) {
            this.shop = res.data.data;
            if(!apiMerchantId){
              this.shopForm.shop=[];
              this.shopForm.apiMerchantName = '';
              this.dialogVisible = true;
              this.shopForm.apiMerchantId=''
            }else{
            
            }
            
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
   
    clearForm(){
      this.resetForm('shopForm')
      this.shopForm.shopList=[]
      this.shopForm.shop=[]
      this.shopForm.apiMerchantName=''
      this.shopForm.createTime=''
      console.log(this.shopForm.shop)
    },
    repair(index,rows){
      console.log(rows[index])
      this.$router.push(
        {
          name:'users',
          params:{id:rows[index].apiMerchantId}
         }
       )
    },
    edit(index,rows){
      this.getShopList(rows[index].apiMerchantId)
      this.dialogVisible = true
      this.shopForm.apiMerchantName = rows[index].apiMerchantName
      this.shopForm.apiMerchantId = rows[index].apiMerchantId
      console.log(rows[index].shopList)
      this.shopForm.shop = []
      rows[index].shopList.forEach(item=>{
        this.shopForm.shop.push(item.shop_info_id)
      })
      console.log(this.shopForm.shop)
      console.log(rows[index].shopList)
    },
    //获取商户列表
    getList(merchantName,pageIndex,pageSize) {
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/merchants?apiMerchantName=' + merchantName +'&pageIndex='+this.currentPage + '&pageSize='+ this.pageSize
      }
      ).then(res => {
          console.log("商户列表", res.data.data.list);
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
    //显示创建商户框
    add(){
      this.getShopList('')
    },
    close(){
      this.dialogVisible = false;
      this.clearForm()
    },
    q(index){
     return this.pageSize * (this.currentPage-1) + index +1
    },
    code(code) {
      switch (code) {
        case 40101:
          this.$message({
            type: "error",
            message: "店铺Id不能为空"
          });
          break;
        case 40102:
          this.$message({
            type: "error",
            message: "店铺不存在"
          });
          break;
        case 40103:
          this.$message({
            type: "error",
            message: "必填字段不能为空"
          });
          break;
        case 40104:
          this.$message({
            type: "error",
            message: "店铺关联门店Id不能为空"
          });
          break;
        case 40105:
          this.$message({
            type: "error",
            message: "店铺关联门店不存在"
          });
          break;
        case 40106:
          this.$message({
            type: "error",
            message: "同一个店铺下不能有多个相同门店ID存在"
          });
          break;
        case 40107:
          this.$message({
            type: "error",
            message: "同一个店铺下不能有多个相同门店存在"
          });
          break;
        case 40401:
          this.$message({
            type: "error",
            message: "商铺不存在"
          });
          break;
        case 40402:
          this.$message({
            type: "error",
            message: "商铺主键不能为空"
          });
          break;
        case 40403:
          this.$message({
            type: "error",
            message: "店铺名称已存在"
          });
          break;
        case 40404:
          this.$message({
            type: "error",
            message: "店铺ID不能与已经存在的店铺相同"
          });
          break;
        case 40301:
          this.$message({
            type: "error",
            message: "商户不存在"
          });
          break;
        case 40302:
          this.$message({
            type: "error",
            message: "商户Id不能为空"
          });
          break;
          case 40303:
          this.$message({
            type: "error",
            message: "店铺不存在"
          });
          break;
          case 40304:
          this.$message({
            type: "error",
            message: "商户名称不能为空"
          });
          break;
          case 40305:
          this.$message({
            type: "error",
            message: "商户名称不能与已经存在的商户相同"
          });
          break;
      }
    },
    commit(){
      this.$http.post(''+process.env.API_ROOT+'/merchant',{
          "apiMerchantId":this.shopForm.apiMerchantId,
          "apiMerchantName":this.shopForm.apiMerchantName,
          "shopList":this.shopForm.shopList,
      }).then((res)=>{
          console.log(res)
          if(res.data.code ==1){
            this.$message({
              type:'success',
              message: this.shopForm.apiMerchantId ? '编辑商户成功':'新增商户成功'
            })
          this.getList(this.selShopName)
          this.clearForm()
          }else{
            this.code(res.data.code)
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
        this.getList(this.selShopName)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList(this.selShopName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;
.merchant{
  .el-dialog{
    .el-form-item{
      margin-bottom: 20px;
      .el-select{
        width: 100%;
      }
    }
    .el-form--label-top .el-form-item__label{
      padding-bottom: 0
    }
  }
  .head{
    h1{
        opacity: 0.87;
        font-size: 18px;
        color: #000;
        letter-spacing: 0;
        line-height: 42px;
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
      .sel {
        width: 180px;
        float: right;
        margin-top: 13px;
        .el-input__inner {
          // border: none;
          height: 32px;
        }
      }
      .sec {
        font-family: PingFangSC-Medium;
        background: #fff;
        font-size: 14px;
        letter-spacing: 0;
        border: 1px solid #3366ff;
        border-radius: 2px;
        height: 32px;
        line-height: 8px;
        margin: 12px 0 12px 20px;
        float: right;
        color: #3366ff;
        margin-right: 50px;
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
