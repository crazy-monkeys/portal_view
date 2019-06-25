<template>
  <div class="merchant">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>客户权益</el-breadcrumb-item>
        <el-breadcrumb-item>商户管理</el-breadcrumb-item>
        <el-breadcrumb-item>接口用户维护</el-breadcrumb-item>
      </el-breadcrumb>
      
      <h1>
        <i class="el-icon-back" @click="back"></i>
        <span>接口用户维护</span>  </h1>
      
    </div>
    <div class="box">
      <div class="btns">
        <el-button @click="add">新增接口用户</el-button>
        <el-button class="sec" @click="search">搜索</el-button>
        <el-input v-model="selUserName" class="sel"  placeholder="请输入接口用户名称"></el-input>
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
        prop="api_merchant_name"
        label="商户名称"
        show-overflow-tooltip
       >
      </el-table-column>
      <el-table-column
        prop="api_users_name"
        label="用户名称"
        show-overflow-tooltip
       >
      </el-table-column>
      <el-table-column
        prop="shopId"
        show-overflow-tooltip
        label="关联店铺"
        >
        <template slot-scope="scope">
          <span v-for='(item,index) in tableData[scope.$index].shopList' :key="index">  {{item.shopName}}  </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="verify_code_encrypt"
        label="验证位加密方式"
        show-overflow-tooltip
       >
      </el-table-column>
      <el-table-column
        prop="api_user_valid_date"
        label="接口用户到期时间"
        show-overflow-tooltip
       >
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="更新时间"
        show-overflow-tooltip
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
          @click.native.prevent="del(scope.$index, tableData)"
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
            <p :style="{'marginTop': '23px'}">无接口用户信息</p>
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
      :title="userForm.apiUsersId ? '编辑接口用户':'新增接口用户'"
      top='8vh'
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" label-width="80px" :model="userForm" ref='userForm' :rules='rules'>
          <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  提交后自动生成：验证位加密方式、接口密钥、传输加密方式、传输加密公钥、传输加密私钥、接口用户到期时间</p>
        <el-form-item label="用户名称" prop='apiUsersName'>
          <el-input v-model="userForm.apiUsersName"></el-input>
        </el-form-item>
        <el-form-item label="关联店铺" prop='shop'>
          <el-select v-model="userForm.shop" multiple filterable  placeholder='请选择关联店铺' >
              <el-option
                v-for="item in shop"
                :key="item.shop_info_id"
                :label="item.shop_name"
                :value="item.shop_info_id"
              ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="接口用户到期时间" prop='apiUserValidDate'>
          <div class="block">
            <el-date-picker
            
            prefix-icon='el-icon-date'
            v-model="userForm.apiUserValidDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
          </div>
          <!-- <el-input v-model="userForm.apiUserValidDate"></el-input> -->
        </el-form-item>
        <div v-if="userForm.apiUsersId">
          <p>验证位加密方式：{{userForm.verifyCodeEncrypt}}</p>
          <p>接口密钥：{{userForm.apiSecret}}</p>
          <!-- <p>传输加密方式：{{userForm.transferEncryptType}}</p>
          <p>传输加密公钥：{{userForm.transferPublicKey}}</p>
          <p>传输加密私钥：{{userForm.transferSecretKey}}</p> -->
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Theme',
  data () {
    return {
      rules: {
        apiUsersName: [
          { required: true, trigger: "blur", validator:(rule, value, callback) => {
              var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?]{1,10}$/;
                if(!value){
                      callback(new Error('用户名称不能为空'))
                }else{
                  if(value.length>10){
                    callback(new Error('用户名称最长不能超过10个字'))
                  }else{
                    if(!reg.test(value)){
                      callback(new Error('用户名称不能包含特殊字符'))
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
        ],
        apiUserValidDate:[
          {
            required: true, trigger: "change", validator:(rule, value, callback) => {
              console.log(value)
                if(value.length==0){
                    callback(new Error('接口用户到期时间不能为空'))
                }else{
                    callback()
                }
            },  
          }
        ],
      },
      selUserName:"",
      shop:[],
      currentPage4: 4,
      userForm: {
        //传输加密方式
        transferEncryptType:'',
        //传输加密公匙
        transferPublicKey:'',
        //传输加密私匙
        transferSecretKey:'',
        //用户ID
        apiUsersId:'',
        //用户名
        apiUsersName:'',
        //验证位加密方式
        verifyCodeEncrypt:'SHA1',
        // 接口密钥
        apiSecret:'',
        //	接口用户到期时间
        apiUserValidDate:'',
        //商户ID
        apiMerchantId:'',
        //关联店铺ID集合
        shop:[],
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
  computed: {
    id(){
      return this.$route.params.id
    }
  },
  
  created(){
    this.getList(this.selUserName,this.id)
    this.getShopList()
    console.log(this.$route.params)
  },
  watch:{
    'userForm.shop':{
      handler:function(n,o){
        console.log('选择的店铺列表',n)
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
              this.getSecret()
          } else {
            console.log("error submit!!");
            return false;
          }
        });
    },
    back(){
      this.$router.push({name:'merchant'})
    },
    search(){
      this.currentPage = 1
      this.getList(this.selUserName,this.id)
    },
    
    getMore(index,rows){
       this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/merchant/userInfo?apiMerchantId="+ rows[index].api_merchant_id + '&apiUsersId='+rows[index].api_users_id
      })
      .then(res => {
        console.log("用户详情", res.data.data);
        if (res.data.code == 1) {
          this.userForm.apiSecret = res.data.data;
          this.userForm.verifyCodeEncrypt = res.data.data.verifyCodeEncrypt
          this.userForm.apiSecret = res.data.data.apiSecret
          this.userForm.transferEncryptType = res.data.data.transferEncryptType
          this.userForm.transferPublicKey = res.data.data.transferPublicKey
          this.userForm.transferSecretKey = res.data.data.transferSecretKey
        }
      })
      .catch(error => {
        console.log(error);
        alert("登入失败");
      });
    },
    getSecret(){
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/merchant/user/secret"
      })
      .then(res => {
        console.log("商户接口密钥", res.data.data);
        if (res.data.code == 1) {
          this.userForm.apiSecret = res.data.data;
          this.commit()
        }
      })
      .catch(error => {
        console.log(error);
        alert("登入失败");
      });
    },
//获取用户店铺列表
    getShopList() {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/getCurentUserShopList"
      })
        .then(res => {
          console.log("店铺列表", res.data.data);
          if (res.data.code == 1) {
            this.shop = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    clearForm(){
      this.resetForm('userForm')
      this.userForm.verifyCodeEncrypt = 'SHA1'
      this.userForm.apiSecret = ''
      this.userForm.apiUserValidDate = ''
      this.userForm.apiMerchantId = ''
      this.userForm.shop=[]
      this.userForm.apiMerchantName=''
      this.userForm.apiUsersName=''
      this.userForm.createTime=''
      this.userForm.transferEncryptType=''
      //传输加密公匙
      this.userForm.transferPublicKey=''
      //传输加密私匙
      this.userForm.transferSecretKey=''
    },
        q(index){
     return this.pageSize * (this.currentPage-1) + index +1
    },
    del(index,rows){
      console.log(rows[index])
      this.$confirm('确认删除该接口用户吗？删除后会影响到第三方用户的使用', '删除接口用户', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        })
          .then(() => {
            this.$http.post(process.env.API_ROOT+'/merchant/user/del',{
                'apiUsersId':rows[index].api_users_id,
                'apiMerchantId':rows[index].api_merchant_id
            }).then((res=>{
                if(res.data.code==1){
                    console.log('删除接口用户成功'),
                    this.getList(this.selUserName,this.id)
                }
            })).catch((err)=>{
                console.log(err)
            })
          })
          .catch(action => {
            this.$message({
              type: 'fail',
              message: '已取消操作'
            })
          });
    },
    edit(index,rows){
      this.dialogVisible = true
      rows[index].shop_id.split(',').forEach(ele => {
          this.userForm.shop.push(ele*1)  
      });
      this.getMore(index,rows)
      this.userForm.apiUsersId = rows[index].api_users_id
      this.userForm.verifyCodeEncrypt  = rows[index].verify_code_encrypt
      this.userForm.apiSecret  = rows[index].api_secret
      this.userForm.apiUserValidDate  = rows[index].api_user_valid_date
      this.userForm.apiUsersName  = rows[index].api_users_name
    },
    //获取接口用户列表
    getList(userName,id) {
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/merchant/users?pageIndex='+this.currentPage + '&pageSize='+ this.pageSize +'&apiMerchantId='+id +'&userName='+userName
      }
      ).then(res => {
          console.log("接口用户列表", res.data.data.list);
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
    //显示创建接口用户框
    add(){
      this.dialogVisible = true;
      this.userForm.apiUsersId = ''
    },
    close(){
      this.dialogVisible = false;
      this.clearForm()
    },

    commit(){
      this.$http.post(''+process.env.API_ROOT+'/merchant/user',{
        //	商户id
          "apiMerchantId":this.id,
          //	关联店铺id集合
          "shopId":this.userForm.shop.join(','),
          //	用户id
          "apiUsersId":this.userForm.apiUsersId ? this.userForm.apiUsersId :'',
          //	用户名称
          "apiUsersName":this.userForm.apiUsersName,
          //验证位加密方式
          "verifyCodeEncrypt":this.userForm.verifyCodeEncrypt,
          //	接口密钥
          "apiSecret":this.userForm.apiSecret,
          //	接口用户到期时间
          "apiUserValidDate":this.userForm.apiUserValidDate,
      }).then((res)=>{
          console.log(res)
          if(res.data.code ==1){
            this.$message({
              type:'success',
              message: this.userForm.apiUsersId ? '编辑接口用户成功':'新增接口用户成功'
            })
          this.getList(this.selUserName,this.id)
          this.clearForm()
      this.dialogVisible = false;

          }else{
            this.$message({
              type:'error',
              message: res.data.msg
            })
          }

      }).catch((err)=>{
        console.log(err);
        alert('网络异常')
      })

    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
          this.getList(this.selUserName,this.id)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
          this.getList(this.selUserName,this.id)
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
      margin-bottom: 20px
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
        line-height: 36px;
        height: 42px;
        font-weight: bold;
        padding: 0 50px;
        // float: left;
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

    .block{
      // position: absolute;
      bottom: 26px;
      padding: 10px;
     .el-pagination__total{
       margin-left: 500px
     }
     .btn-prev{
       margin-left: 20px
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
    line-height: 20px;
    height: 32px;
    margin-bottom: 20px;
  }
}
</style>
