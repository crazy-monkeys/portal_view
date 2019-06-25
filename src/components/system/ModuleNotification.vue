<template>
  <div class="moduleNotification">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>模块通知配置</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>模块通知配置</h1>
      
    </div>
    <div class="box">
      <div class="btns">
        <el-button @click="add" size='small' type='primary' class="add"><i class="el-icon-plus"></i>新增配置</el-button>
        <el-button class="sec" type='primary' size='small' plain  @click="search">搜索</el-button>
        <p> 
          模块key：<el-input size='small' v-model="key"></el-input>
          关联值：<el-input size='small' v-model="relationValue"></el-input>
          <!-- 真实姓名：<el-input size='small' v-model="realName"></el-input> -->
        </p>
      </div>
      <!-- active: 1
createId: 1
createTime: 1555060279000
id: 9
noticeModule: "ANF_MOBILE_CODE"
noticeValue: "1903282821"
type: "MODULE"
updateId: 1
updateTime: 1555060284000 -->
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
        v-if="false"
        width="80">
      </el-table-column>
      <el-table-column
        label=""
        width="30">
      </el-table-column>
      <el-table-column
        prop="noticeModule"
        show-overflow-tooltip
        label="模块key"
        >
      </el-table-column>
      <el-table-column
        prop="type"
        label="关联类型"
        show-overflow-tooltip
       >
       <template slot-scope="scope">
            <span >
              {{tableData[scope.$index].type=='MODULE' ?'模块':tableData[scope.$index].type=='SHOP' ? '店铺' :'商户'}}
            </span>
          </template>
      </el-table-column>
      <el-table-column
        prop="noticeValue"
        show-overflow-tooltip
        label="关联值"
        >
      </el-table-column>
      <el-table-column
          prop="createTime"
          show-overflow-tooltip
          label="创建时间"
          >
          <template slot-scope="scope">
            <span >
              {{format(tableData[scope.$index].createTime)}}
            </span>
          </template>
          
        </el-table-column>
      <el-table-column
        prop="active"
        width='80'
        show-overflow-tooltip
        label="状态"
        >
        <template slot-scope="scope">
          <span v-if="tableData[scope.$index].active==1">
            生效
          </span>
          <span v-if="tableData[scope.$index].active==0">
            禁用
          </span>
        </template>
      </el-table-column>
      <el-table-column
      label="操作"
      width="150"
      fixed='right'
      >
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="changeStatus(scope.$index, tableData)"
          type="text"
          >
          {{tableData[scope.$index].active==1 ?  "禁用" :"启用"}}
        </el-button>
        <el-button
          @click.native.prevent="mod(scope.$index, tableData)"
          type="text"
          >
          配置服务
        </el-button>
        
        
      </template>
    </el-table-column>
    <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt="" width="140" height="140" />
            </div>
            <p :style="{'marginTop': '23px'}">无模块通知配置信息</p>
          </div>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,40]"
        :page-size="10"
        layout="sizes,total, jumper, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
      </div>
    </div>
    <div class="bottom">按住 [shift] 键，可横向滚动表格哦♥</div>
    
    <!-- 修改 -->
    <el-dialog
      :title="edit ?'配置服务': '新增配置'"
      top='8vh'
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="close"
      :close-on-click-modal="false">
            <el-form label-position="top" label-width="80px" :model="form" :rules='rules' ref='form' class="form">
              <el-form-item prop='phone' label='短信通知服务' v-if="edit">
                <el-select v-model="form.phone" placeholder="请选择">
                  <el-option
                    v-for="item in smsList"
                    :key="item.noticeRegisterId"
                    :label="item.signature"
                    :value="item.noticeRegisterId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop='email' label='邮件通知服务' v-if="edit">
                <el-select v-model="form.email" placeholder="请选择">
                  <el-option
                    v-for="item in edmList"
                    :key="item.noticeRegisterId"
                    :label="item.signature"
                    :value="item.noticeRegisterId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop='key' label='模板key' v-if="!edit">
                <el-input v-model="form.key"  placeholder="请选择"></el-input>
              </el-form-item>
              <el-form-item prop='type' label='关联类型' v-if="!edit">
                <el-radio-group v-model="form.type">
                  <el-radio label="MODULE">模块</el-radio>
                  <el-radio label="SHOP">店铺</el-radio>
                  <el-radio label="MERCHANT">商户</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop='value' label='关联值' v-if="!edit">
                <el-select v-model="form.value" placeholder="请选择" filterable>
                  <el-option
                    v-for="item in  form.type=='MERCHANT' ? merchantList :shopList"
                    :key="form.type=='MERCHANT' ? item.apiMerchantId :item.shop_info_id "
                    :label="form.type=='MERCHANT' ? item.apiMerchantName :item.shop_name "
                    :value="form.type=='MERCHANT' ? item.apiMerchantId :item.shop_info_id ">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
import formatDate from "../../assets/js/formatDate";

export default {
  name: 'moduleNotification',
  data () {
    return {
      //邮件列表
      edmList:[],
      //短信列表
      smsList:[],
      //商户列表
      merchantList:[],
      //店铺列表
      shopList:[],
      //是否为新增
      edit:false,
      rowData:{},
      //列表搜索条件
      relationValue:'',
      key:'',
      //验证规则
      rules: {
        phone: [
          { required: true, trigger: "change" , message:'短信签名不能为空'}
        ],
        email: [
          { required: true, trigger: "change",  message:'邮件签名不能为空' }
        ],
        key: [
          { required: true, trigger: "change" , message:'模板key不能为空'}
        ],
        type: [
          { required: true, trigger: "change" , message:'关联类型不能为空'}
        ],
        value: [
          { required: true, trigger: "change" , message:'关联值不能为空'}
        ],
      },
      //配置服务表单数据初始化
      form:{
        //短信签名
        phone:'',
        //邮件签名
        email:'',
        //模板值
        key:'',
        //关联类型
        type:'MODULE',
        //关联值
        value:''
      },
      //dialog显示否
      dialogVisible: false,
      //表格数据
      tableData: [],
      //分页数据
      currentPage : 1,
      pageSize : 10,
      total:0,
    }
  },
  created(){
    this.getList()
  },
  watch:{
    'form.type':{
      handler:function(n,o){
        console.log(n,o)
        if(n!=o){
          this.form.value = ''
        }
      }
    }
  },
  methods:{
    signCommit(){
      var data = {
        id:this.rowData.id,
        smsNoticeRegisterId:this.form.phone,
        edmNoticeRegisterId:this.form.email,
      }
      this.$http.post(''+process.env.API_ROOT+'/system/notice/bindModuleReg',data).then((res)=>{
            console.log('修改配置结果',res)
            if(res.data.code ==1){
              this.dialogVisible = false;
              this.resetForm('form')
              this.clearForm()
              this.getList()
            }else{
            }
        }).catch((err)=>{
          console.log(err);
          alert('网络异常')
        })
    },
    getSelectSmsAndEdm(id){
      this.$http.get(''+process.env.API_ROOT+'/system/notice/queryBindInfo?id=' +id
      )
      .then((res)=>{
            console.log('已经绑定的邮件和短信签名',res)
            if(res.data.code ==1){
              this.form.phone = res.data.data.sms
              this.form.email = res.data.data.edm
            }else{
              this.form.phone = ''
              this.form.email = ''
            }
        }).catch((err)=>{
          console.log(err);
          alert('网络异常')
        })
    },
    getEdmListByShop(noticeValue){
      this.$http.get(''+process.env.API_ROOT+'/system/notice/queryShopEdmChannels?noticeValue=' +noticeValue
      )
      .then((res)=>{
            console.log('店铺对应的邮件列表',res)
            if(res.data.code ==1){
              this.edmList = res.data.data
              console.log(this.smsList)
            }else{
              this.edmList = []
            }
        }).catch((err)=>{
          console.log(err);
          alert('网络异常')
        })
    },
    getEdmListByMerchant(noticeValue){
      this.$http.get(''+process.env.API_ROOT+'/system/notice/queryShopEdmChannels?noticeValue='+noticeValue
      )
      .then((res)=>{
            console.log('商户对应的邮件列表',res)
            if(res.data.code ==1){
              this.edmList = res.data.data
            }else{
              this.edmList = []
            }
        }).catch((err)=>{
          console.log(err);
          alert('网络异常')
        })
    },
    getSmsListByShop(noticeValue){
      this.$http.get(''+process.env.API_ROOT+'/system/notice/queryShopSmsChannels?noticeValue=' +noticeValue
      )
      .then((res)=>{
            console.log('店铺对应的短信列表',res)
            if(res.data.code ==1){
              this.smsList = res.data.data
              console.log(this.smsList)
            }else{
              this.smsList = []
            }
        }).catch((err)=>{
          console.log(err);
          alert('网络异常')
        })
    },
    getSmsListByMerchant(noticeValue){
      this.$http.get(''+process.env.API_ROOT+'/system/notice/queryShopSmsChannels?noticeValue='+noticeValue
      )
      .then((res)=>{
            console.log('商户对应的短信列表',res)
            if(res.data.code ==1){
              this.smsList = res.data.data
            }else{
              this.smsList = []
            }
        }).catch((err)=>{
          console.log(err);
          alert('网络异常')
        })
    },
    commit(){
      var data = {
        noticeModule:this.form.key,
        noticeValue:this.form.value,
        type:this.form.type,
      }
      this.$http.post(''+process.env.API_ROOT+'/system/notice/save',data).then((res)=>{
            console.log('新增配置结果',res)
            if(res.data.code ==1){
              this.dialogVisible = false;
              this.resetForm('form')
              this.clearForm()
              this.getList()
            }else{
            }
        }).catch((err)=>{
          console.log(err);
          alert('网络异常')
        })
    },
    getMerchantList(){
      this.$http.get(''+process.env.API_ROOT+'/system/notice/queryAllMerchants'
      )
      .then((res)=>{
            console.log('商户列表',res)
            if(res.data.code ==1){
              this.merchantList = res.data.data
            }else{
              this.merchantList = []
            }
        }).catch((err)=>{
          console.log(err);
          alert('网络异常')
        })
    },

    getShopList(){
      this.$http.get(''+process.env.API_ROOT+'/system/notice/queryAllShops'
      )
      .then((res)=>{
            console.log('店铺列表',res)
            if(res.data.code ==1){
              this.shopList = res.data.data
            }else{
              this.shopList = []
            }
        }).catch((err)=>{
          console.log(err);
          alert('网络异常')
        })
    },
    getList(){
      // /system/notice/moduleSetting
      var data ={
        pageIndex:this.currentPage,
        pageSize:this.pageSize,
        noticeModule:this.key,
        noticeValue:this.relationValue,
      }
      this.$http.get(''+process.env.API_ROOT+'/system/notice/moduleSetting?' + this.toQueryString(data)
      )
      .then((res)=>{
            console.log('配置列表',res)
            if(res.data.code ==1){
              this.tableData = res.data.data.list
              this.total= res.data.data.total
            }else{
            }
        }).catch((err)=>{
          console.log(err);
          alert('网络异常')
        })
    },
    rowClick(row){
      console.log(row)
      this.rowData = row
    },
    add0(m){return m<10?'0'+m:m },
    format(shijianchuo){
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
    },
    //启用禁用
    changeStatus(index,rows,type){
      var data = {
        id:rows[index].id,
        active:rows[index].active ? 0 : 1
      }
      
        console.log(data)
       this.$confirm('确定要' +(rows[index].active ==0 ?'启用' :'禁用' ) + '该配置吗？', (rows[index].active ==0 ?'启用' :'禁用' ), {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$http.post(''+process.env.API_ROOT+'/system/notice/updateActive',data
              ).then((res)=>{
                  console.log('改变状态结果',res)
                  if(res.data.code ==1){
                    this.getList()
                  }else{

                  }
              }).catch((err)=>{
                console.log(err);
                alert('网络异常')
              })
          })
          .catch(action => {
           
          });
    },
    //修改表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.edit){
            this.signCommit()
          }else{
            this.commit()
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
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
    //搜索功能
    search(){
      this.currentPage =1 
      this.getList()
    },
    //清空表单数据
    clearForm(){
      //短信签名
      this.form.phone=''
      //邮件签名
      this.form.email=''
      //模板key
      this.form.key=''
      //关联类型
      this.form.type='MODULE'
      //关联值
      this.form.value=''
    },
    //点击新建按钮事件
    add(){
      this.edit = false
      this.dialogVisible = true
      this.getShopList()
      this.getMerchantList()
    },
    //点击配置服务按钮事件
    mod(index,rows){
      var type = rows[index].type
      var id = rows[index].id
      var noticeValue = rows[index].noticeValue
      this.getSelectSmsAndEdm(id)
      if(type =='MERCHANT'){
        this.getSmsListByMerchant(noticeValue)
        this.getEdmListByMerchant(noticeValue)
      }else{
        this.getSmsListByShop(noticeValue)
        this.getEdmListByShop(noticeValue)
      }
      this.edit = true
      this.dialogVisible = true
    },
    //把对象转成query值
    cleanArray(actual) {
      var newArray = [];
        for (let i = 0; i < actual.length; i++) {
          if (actual[i]) {
            newArray.push(actual[i]);
          }
        }
      return newArray;
    },
    toQueryString(obj) {
      if (!obj) return "";
        return this.cleanArray(
        Object.keys(obj).map(key => {
          if (obj[key] === undefined) return "";
            return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
          })
        ).join("&");
    },
    close(){
      this.dialogVisible = false;
      this.resetForm('form')
      this.clearForm()
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;
.moduleNotification{
  .dis{
    span{
      color: #ccc
    }
  }
  .el-dialog{
    .el-form-item{
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
      p{
        float: right;
      }
      .el-input{
        width: 150px;
        margin: 12px 20px 12px 0;
      }
      .add {
        font-family: 'zt2';
        margin: 12px 0 12px 20px;
      }
      .sec {
        font-family: 'zt2';
        margin: 12px 0 12px 20px;
        float: right;
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

}
</style>
