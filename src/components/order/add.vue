<template>
  <!-- 添加新增控件 -->
  <div class="orderAdd">
    <div class="head clear" v-if="queryId">
        <el-page-header @back="back" content="订单申请修改"></el-page-header>
      </div>
      <div class="head clear" v-if="!queryId">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单申请</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <div class="selBox">
          <el-form ref="form" :model="form"  :rules="rules" class="form" label-position='top' :inline='true'>
            <el-row :gutter="22">
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="下单类型" prop="underOrderType">
                  <el-select v-model="form.underOrderType" size="small"  placeholder="请选择">
                    <el-option value="ZFD" label="交货免费"></el-option>
                    <el-option value="ZOR" label="标准订单"></el-option>
                    <el-option value="ZORT" label="标准订单（ZORT）"></el-option>
                    <el-option value="ZRET" label="退货"></el-option>
                    <el-option value="nKB" label="客户库存补货"></el-option>
                    <el-option value="KE" label="客户库存出货"></el-option>
                    <el-option value="ZKE" label="标准客户库存出货"></el-option>
                    <el-option value="ZKB" label="标准客户库存补货"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="销售组织" prop="salesOrg">
                  <el-select v-model="form.salesOrg" size="small" filterable placeholder="请选择">
                    <el-option v-for="item in salesOrgIds" :key="item.groupCode" :value='item.groupCode' :label="item.groupCode
                    + '-'+item.groupName"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="售达方" prop="soldTo">
                  <el-select v-model="form.soldTo" size="small" filterable placeholder="">
                    <el-option v-for="item in tos" :key='item.id' :label='item.custName' :value="item.id+''"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="送达方" prop="sendTo">
                  <el-select v-model="form.sendTo" size="small" filterable placeholder="" >
                    <el-option v-for="item in tos" :key='item.id' :label='item.custName' :value="item.id+''"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="采购订单编号"  prop="purchaseNo">
                  <el-input size='small' placeholder=""  v-model='form.purchaseNo'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="采购订单下达日期" prop="purchaseDate">
                  <el-date-picker
                    v-model="form.purchaseDate"
                    type="date"
                    size="small"
                    value-format="yyyyMMdd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="国际贸易条款一" prop="incoterms1">
                  <el-input v-model="form.incoterms1" size="small"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="国际贸易条款二"  prop="incoterms2">
                  <el-input v-model="form.incoterms2" :disabled="form.incoterms1=='CIP'" size="small" filterable placeholder="">
                  </el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="币种" prop="currency">
                  <el-select v-model="form.currency" size="small"  filterable placeholder="">
                    <el-option value="CNY" label="CNY"></el-option>
                    <el-option value="HKB" label="HKB"></el-option>
                    <el-option value="USD" label="USD"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="订单类型" prop="orderType">
                  <el-select v-model="form.orderType" size="small" filterable placeholder="">
                    <el-option value="A01" label="客户专货订单"></el-option>
                    <el-option value="A02" label="Buffer订单"></el-option>
                    <el-option value="A03" label="新产品订单"></el-option>
                    <el-option value="A04" label="样品订单"></el-option>
                    <el-option value="A05" label="Last Buy订单"></el-option>
                    <el-option value="A06" label="分销商专货订单"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="客户属性" prop="customerAttr">
                  <el-select v-model="form.customerAttr" size="small" filterable placeholder="">
                    <el-option value="B1" label="Account Market"></el-option>
                    <el-option value="B2" label="Mass Market"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="交货日期" prop="priceDate">
                  <el-date-picker
                    v-model="form.priceDate"
                    type="month"
                    size="small"
                    value-format="yyyy-MM"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col> -->
            </el-row>

        <div class="btns">
          <el-button type='primary' class="add" size='small'><a class="a" :href="download()">下载模版</a></el-button>
          <el-upload
            class="upload-demo"
            :action="serverUrl+'/order/apply/upload'"
            :auto-upload="true"
            :headers="{'Authorization':auth}"
            name='lineFile'
            :data='form'
            :on-success="uploadSuccess"
            :limit="1"
            :show-file-list="false"
            :file-list="fileList"
            >
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
        </div>
        <div class="tab">
          <el-table :data="tableData" border  style="width: 100%" height="300">
            <el-table-column prop="productId" label="物料号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="platform" width="150" label="平台" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="num" width="150" label="数量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="rPrice" width="150" label="含税价格" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="rNetPrice" width="150" label="不含税价格" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="expectedDeliveryMonth" width="150" label="期望交货月份" show-overflow-tooltip>
            </el-table-column>
            <div slot="empty">
              无数据
            </div>
          </el-table>
          <el-row >
            <el-col :span="12" style="line-height:32px">
              含税总金额：{{order.grossValue}}
            </el-col>
            <el-col :span="12" style="line-height:32px">
              不含税总金额：{{order.netValue}}
            </el-col>
          </el-row>
          <div></div>
        </div>
        <div class="lines">
          <div>
            <p>一、包装与标识要求：</p>
            <p class="two">1、乙方必须提供适合产品运输和存储要求的有效包装。</p>
            <p class="two">2、以乙方的标准包装为准，除非甲方有特殊要求。</p>
          </div>
          <div>
            <p>二、包装费用和运费由乙方承担。</p>
          </div>
          <div>
            <p class="one">三、乙方按订单金额提供：
              <el-form-item prop="invoiceType">
                <el-radio-group v-model="form.invoiceType" size="mini" @change="changeaaa">
                  <el-radio label="1" >出口发票</el-radio>
                  <el-radio label="2" >增值税普通发票</el-radio>
                  <el-radio label="3" >增值税专业发票（13%）</el-radio>
                </el-radio-group>
              </el-form-item >
            </p>
            <p class="two">发票传递：
              <el-form-item prop="invoiceDeliveryType">
                <el-radio-group v-model="form.invoiceDeliveryType">
                  <el-radio label="1" value='1'>随货</el-radio>
                  <el-radio label="2" value='2'>甲方办公地或<el-input v-model="form.invoiceDeliveryAddress" size="small" style="border:none;border-bottom:1px solid #000"></el-input></el-radio>
                </el-radio-group>
              </el-form-item>
               </p>
          </div>
          <div>
            <p>四、任何情况下，乙方因本订单产生的赔偿责任不应超过本订单项下甲方支付给乙方的总货款数。</p>
          </div>
          <div>
            <p>五、<span>不可抗力：在履行本订单时，如果任何一方由于不可抗力的原因，包括但不限于战争行为、火灾、风暴、水灾、台风及其他恶劣的天气状况、地震、政府或类似干预，以及其他不可预见、不可避免并不可克服的任何原因导致其不能履行本订单项下的义务，该方就由此造成的任何履行延误或履行不能对另一方不负任何责任。</span></p>
          </div>
          <div>
            <p>六、本订单项下的货物买卖不应被解释为授予甲方任何的相关知识产权。</p>
          </div>
          <div>
            <p>七、因本订单引起的任何争议应提交上海国际经济贸易仲裁委员会仲裁解决。</p>
          </div>
          <div>
            <p>八、本订单为不可撤销订单。本订单传真件有效。</p>
          </div>
          <div>
              <el-form-item prop="isAgreed">
                <el-checkbox  @change="changeccc" v-model="form.isAgreed" label="是否同意以上条款" ></el-checkbox>
              </el-form-item>
          </div>
        </div>
        </el-form>
        </div>
        <div class="sub">
          <el-button type="primary" size="small"  @click="sub">提交</el-button>
          <el-button type="primary" size="small" plain @click="cancel">取消</el-button>
        </div>
      </div>
  </div>
</template>

<script>
import {detail} from '@/api/order/list.js'

import formTest from "../../assets/js/formTest";
import {getCode} from '@/api/business/idr.js'
import {apply,mod} from '@/api/order/add.js'
import {getShip} from '@/api/system/param.js'

import {serverUrl} from '@/axios/request.js'

export default {
  name: "orderAdd",
  data() {
    return {
      tos:[],
      rules:{
        orderType:[{required:true,triggle:'blur',message:'订单类型不能为空'}],
        salesOrg:[{required:true,triggle:'blur',validator: (rule, value, callback) => {
          if (!value) {
            callback(new Error('销售组织不能为空'))
          }else{
            callback()
          }
        },}],
        underOrderType:[{required:true,triggle:'blur',message:'下单类型不能为空'}],
        soldTo:[{required:true,triggle:'blur',message:'售达方不能为空'}],
        sendTo:[{required:true,triggle:'blur',message:'送达方不能为空'}],
        purchaseNo:[{required:true,triggle:'blur',message:'采购订单编号不能为空'}],
        purchaseDate:[{required:true,triggle:'blur',message:'采购订单下达日期不能为空'}],
        customerAttr:[{required:true,triggle:'blur',message:'客户属性不能为空'}],
        priceDate:[{required:true,triggle:'blur',message:'交货日期不能为空'}],
        incoterms1:[{required:true,triggle:'blur',message:'国际条款一不能为空'}],
        incoterms2:[{required:true,triggle:'blur',message:'国际条款二不能为空'}],
        currency:[{required:true,triggle:'blur',message:'币种不能为空'}],
        invoiceDeliveryAddress :[{required:true,triggle:'blur',message:'请填写发票传递地址'}],
        invoiceDeliveryType   :[{required:true,triggle:'blur',message:'请选择发票传递类型'}],
        invoiceType  :[{required:true,triggle:['blur','change'],message:'请选择发票类型'}],
        isAgreed:[{required:true,triggle:'change', validator: (rule, value, callback) => {
          if (!value) {
            callback(new Error('请勾选同意以上条款'))
          }else{
            callback()
          }
        },}]
      },
      order:{},
      fileList:[],
      auth:sessionStorage.getItem('data'),
      serverUrl:serverUrl,
      //销售组织
      salesOrgIds:[],
      lines:[
        {
          index:'一、',
          txt:'包装与标识要求：',
          list:[
            {
              index:'1、',
              txt:'乙方必须提供适合产品运输和存储要求的有效包装。'
            },
            {
              index:'2、',
              txt:'以乙方的标准包装为准，除非甲方有特殊要求。'
            }
          ]
        },
        {
          index:'二、',
          txt:'包装费用和运费由乙方承担。',
          list:[]
        },
        {
          index:'三、',
          txt:'乙方按订单金额提供：',
          list:[
          ]
        },
        {
          index:'四、',
          txt:'任何情况下，乙方因本订单产生的赔偿责任不应超过本订单项下甲方支付给乙方的总货款数。',
          list:[
          ]
        },
        {
          index:'五、',
          txt:'不可抗力：在履行本订单时，如果任何一方由于不可抗力的原因，包括但不限于战争行为、火灾、风暴、水灾、台风及其他恶劣的天气状况、地震、政府或类似干预，以及其他不可预见、不可避免并不可克服的任何原因导致其不能履行本订单项下的义务，该方就由此造成的任何履行延误或履行不能对另一方不负任何责任。',
          list:[
          ]
        },
        {
          index:'六、',
          txt:'本订单项下的货物买卖不应被解释为授予甲方任何的相关知识产权。',
          list:[
          ]
        },
        {
          index:'七、',
          txt:'因本订单引起的任何争议应提交上海国际经济贸易仲裁委员会仲裁解决。',
          list:[
          ]
        },
        {
          index:'八、',
          txt:'本订单为不可撤销订单。本订单传真件有效。',
          list:[
          ]
        },
      ],
      value: "",
      radio: "1",
      form: {
        orderType:'',
        salesOrg:'',
        underOrderType:'',
        soldTo:'',
        sendTo:'',
        purchaseNo:'',
        purchaseDate:'',
        customerAttr:'',
        priceDate:'',
        incoterms1:'CIP',
        incoterms2:'HK',
        currency:"",
        invoiceDeliveryAddress :'',
        invoiceDeliveryType   :'',
        invoiceType :'',
        isAgreed:'',
        grossValue:'',
        netValue:''
      },
      tableData: [
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  created(){
    this.getCode()
    this.getShip()
    if(this.queryId){
      this.detail(this.queryId)
    }
  },
  computed: {
    queryId(){
      return this.$route.query.id
    }
  },
  watch:{
    'form.currency':{
      handler:function(n,o){
        // console.log(n)
        if(n=='CNY'){
          if(this.form.salesOrg==3000){
            this.form.incoterms1 = 'DDU'
            // console.log(this.form.icon1)
          }
        }else{
            this.form.incoterms1 = 'CIP'
            this.form.incoterms2 = 'HK'
          }
      }
    },
    'form.salesOrg':{
      handler:function(n,o){
        // console.log(n)
        if(n==3000){
          // console.log(11111111)
          if(this.form.currency=='CNY'){
            this.form.incoterms1 = 'DDU'
            // console.log(this.form.icon1)
          }
        }else{
            this.form.incoterms1 = 'CIP'
            this.form.incoterms2 = 'HK'
          }
      }
    }
  },
  methods: {
    async detail(id){
      const data ={
        id:id
      }
      const res = await detail(data);
      console.log('detail',res)
      if(res){
        this.form = res.data.data
        this.form.invoiceType += ''
        this.form.invoiceDeliveryType += ''
        this.form.isAgreed = false
        this.tableData = res.data.data.lines
        this.order.grossValue = res.data.data.rGrossValue ? res.data.data.rGrossValue :0
        this.order.netValue = res.data.data.rNetValue ? res.data.data.rNetValue:0
        // this.lines = res.data.data.lines
        // this.proForm.lines = res.data.data.lines.map(item=>{return {...item,deliveryQuantity:''}})
        // this.proForm.orderId = res.data.data.id
      }
    },
    async getShip(){
      const res = await getShip();
      // console.log('tos',res)
      if(res){
        this.tos = res.data.data
      }
    },
    changeccc(val){
      // console.log(val)
    },
    changeaaa(val){
      // console.log(val)
    },
    uploadSuccess(val){
      // console.log(val)
      if(val.code==1){
        this.$message.success('上传成功')
        this.tableData = val.data.lines
        this.order = {
           grossValue:val.data.grossValue,
           netValue:val.data.netValue,
        }
        this.form.grossValue = val.data.grossValue;
        this.form.netValue = val.data.netValue;
      }else{
        this.$message.error(val.msg)
      }
      this.fileList = []
    },
    download(){
      let strURL = "" + process.env.API_ROOT + '/file/portal_file/template/order/order_line_template.xlsx';
      return strURL;
    },
    async getCode(){
      const res = await getCode();
      // console.log('发货方编码',res)
      if(res){
        this.salesOrgIds = res.data.data
      }
    },
    async apply(){
      this.form.orderLines = this.tableData
      if(this.form.orderLines.length==0){
        this.$message.error('请先上传订单行文件')
      }else{
        var form =this.form
        form.isAgreed = form.isAgreed? 1:0
        const res = await apply(form);
        // console.log('申请结果',res)
        if(res){
          this.$message.success('订单申请成功')
          this.$router.push({name:'saleList'})
        }
          this.form.orderLines = ''
      }
    },
    async mod(){
      this.form.orderLines = this.tableData
      if(this.form.orderLines.length==0){
        this.$message.error('请先上传订单行文件')
      }else{
        var form =this.form
        var data ={
          orderId : this.queryId
        }
        form.isAgreed = form.isAgreed? 1:0
        const res = await mod(data,form);
        // console.log('申请结果',res)
        if(res){
          this.$message.success('订单申请修改成功')
          this.$router.push({name:'saleList'})
        }
          this.form.orderLines = ''
      }
    },
    sub(){
      this.$formTest.submitForm(this.$refs['form'],this.queryId? this.mod :  this.apply)
    },
    cancel(){
      window.history.go(-1)
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    changeCon() {},
    changeSign(val) {},
    // 表单验证
    submitForm(formName) {},
    submitForm1(formName) {},
    resetForm(formName) {},
    resetForm1(formName) {},
    qx() {},
    //发送测试短信
    send(shopInfoId, mobiles, content, noticeRegisterId) {},
    // 清空表单
    clear() {},
    //获取主题列表
    getTheme(shopid) {},
    //新增营销活动
    submit() {},
    change() {},
    //roi时间选择事件
    selRuleFormTime() {},
    //获取短信签名列表
    getSignatures(shopInfoId) {},
    getSnapshots(id) {},

    //获取用户店铺列表
    getShopList() {},

    // 点击弹出测试短信框
    cs() {
      this.csdialogVisible = true;
    },
    handleSelect(item) {
      // console.log(item);
    },
    //创建主题按钮
    create() {
      this.dialogVisible = true;
    },
    // 点击返回按钮
    back() {
      window.history.back();
    },
    back1() {
      this.dialogVisible = false;
    },

    // 创建主题和测试短信关闭
    close() {
      this.dialogVisible = false;
      this.csdialogVisible = false;
    },
    // 添加主题 的提交
    commit() {
      this.dialogVisible = false;
      this.csdialogVisible = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;

.orderAdd {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0 20px 20px 20px ;
  .head {
      padding:10px 20px;

  }

  .content {
    // height: 100%;
    // background: pink;
    // padding: 0 30px 20px;
    .btns{
      padding: 20px 10px;
      // background: pink;
      background: #fff;
      .upload-demo{
        display: inline-block;
      }
      .a{
        color: #fff
      }
    }
    .selBox {
      padding: 0 20px 10px 20px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      background: #fff;
      .form {
        width: 100%;
        // min-width: 900px;
        // max-width: 1300px;
        .el-col{
        .el-form-item {
          // width: 200px;
          width: 100%;
          // margin-bottom: 0;
          .el-select {
            width: 100%;
            .el-input{
              width: 100%;
            }

          }
          .el-input{
            width: 100%;
          }
          .el-form-item__label {
            height: 30px;
          }

        }
        }
        .txt{
          width: 100%;
        }
        .date {
          .el-form-item__content {
            line-height: 40px;
          }
          width:100%;
          // width: 200px;
          .el-date-editor {
            width: 100%;
            // width: 200px;
          }
        }
      }
    }

    .tab {
      background: #fff;
      .block {
        background: #fff;
        padding: 10px;
        .el-pagination {
          width: 100%;
          text-align: center;
        }
      }
    }
    .lines{
      background: #fff;
      margin-top: 10px;
      padding: 10px 0;
      .el-radio-group{
        display: inline-block;
        .el-checkbox__label{
          font-size: 12px;
        }
      }
      .el-input__inner{
        border:none;
        border-radius: 0;
        box-sizing: border-box;
      }
      &>div{
        .two{
          line-height: 40px;
          text-indent: 24px;
          margin-left: 0px;
        }
        .one{
          line-height: 40px;
          text-indent: 0px;
          margin-left: 0px;
        }
        &>p{
          line-height: 32px;
          text-indent: -24px;
          margin-left: 24px;
        }
      }
    }
    .sub {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
    }
  }
}
</style>
