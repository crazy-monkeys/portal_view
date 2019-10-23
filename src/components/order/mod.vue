<template>
  <div class="orderMod">
      <div class="head clear" >
        <el-page-header @back="back" content="订单申请修改"></el-page-header>
      </div>
      <div class="content">
        <div class="selBox">
          <el-form ref="form" :model="form" class="form" label-position='top' :inline='true'>
            <el-row :gutter="22">
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="订单类型">
                  <el-select v-model="form.orderType" size="small"  placeholder="请选择">
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
                <el-form-item label="销售组织">
                  <el-select v-model="form.salesOrgId" size="small" filterable placeholder="请选择">
                    <el-option v-for="item in salesOrgIds" :key="item.groupCode" :value='item.groupCode' :label="item.groupCode 
                    + '-'+item.groupName"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="售达方">
                  <el-select v-model="form.soldParty" size="small" filterable placeholder="">
                    <el-option value='1' label="售达方1"></el-option>
                    <el-option value='2' label="售达方2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="送达方">
                  <el-select v-model="form.shipParty" size="small" filterable placeholder="">
                    <el-option value='1' label="送达方1"></el-option>
                    <el-option value='2' label="送达方2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="采购订单编号">
                  <el-input size='small' placeholder=""  v-model='form.purchaseOrderNo'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="采购订单下达日期">
                  <el-date-picker
                    v-model="form.purchaseOrderDate"
                    type="date"
                    size="small"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="国际贸易条款一">
                  <el-input v-model="form.inco1" size="small"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="国际贸易条款二">
                  <el-input v-model="form.inco2" :disabled="form.inco1=='CIP'" size="small" filterable placeholder="">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="币种">
                  <el-select v-model="form.currency" size="small"  filterable placeholder="">
                    <el-option value="CNY" label="CNY"></el-option>
                    <el-option value="HKB" label="HKB"></el-option>
                    <el-option value="USD" label="USD"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>
                <el-form-item label="下单类型">
                  <el-select v-model="form.underOrderType" size="small" filterable placeholder="">
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
                <el-form-item label="客户组二">
                  <el-select v-model="form.customerAttribute" size="small" filterable placeholder="">
                    <el-option value="B1" label="Account Market"></el-option>
                    <el-option value="B2" label="Mass Market"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :lg='6' :md='8' :sm='8' :xs='24'>

                <el-form-item label="交货日期">
                  <el-date-picker
                    v-model="form.deliveryDate"
                    type="month"
                    size="small"
                    value-format="yyyy-MM"
                    placeholder="选择日期">
                  </el-date-picker>
                  <!-- <el-input size='small' placeholder=""  v-model='form.deliveryDate'></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="btns">
          <el-button type='primary' class="add" size='small' @click="download">下载模版</el-button>
          <el-upload
            class="upload-demo"
            :action="serverUrl+'/order/apply/upload'"
            :auto-upload="true"
            :headers="{'Authorization':auth}"
            name='file'
            :on-success="uploadSuccess"
            :limit="1"
            :show-file-list="false"
            >
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
        </div>
        <div class="tab">
          <el-table :data="tableData" show-summary style="width: 100%" height="300">
            <el-table-column prop="materialNumber" label="物料号" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.materialNumber" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="" label="数量" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.num" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="" label="期望交货月份" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.expectedDeliveryMonth" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="" label="退货原因" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select v-model="" size="small">
                  <el-option label="" value=""></el-option>
                </el-select>
                <el-input v-model="scope.row.materialNumber" size="small"></el-input>
              </template>
            </el-table-column>
            <div slot="empty">
              无数据
            </div>
          </el-table>
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
              <!-- <el-form-item > -->
                <el-radio-group v-model="checkList" size="mini">
                  <el-radio label="出口发票"></el-radio>
                  <el-radio label="增值税普通发票"></el-radio>
                  <el-radio label="增值税专业发票（13%）"></el-radio>
                </el-radio-group>
              <!-- </el-form-item> -->
            </p>
            <p class="two">发票传递： 
              <!-- <el-form-item > -->
                <el-radio-group v-model="checkList">
                  <el-radio label="随货"></el-radio>
                  <el-radio label="甲方办公地或">甲方办公地或<el-input v-model="value1" size="small" style="border:none;border-bottom:1px solid #000"></el-input></el-radio>
                </el-radio-group>
              <!-- </el-form-item>   -->
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
        </div>
        <div class="sub">
          <el-button type="primary" size="small"  @click="sub">提交</el-button>
          <el-button type="primary" size="small" plain @click="cancel">取消</el-button>
        </div>
      </div>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
import {getCode} from '@/api/business/idr.js'
import {apply} from '@/api/order/add.js'
import {serverUrl} from '@/axios/request.js'

export default {
  name: "orderMod",
  data() {
    return {
      auth:sessionStorage.getItem('data'),
      serverUrl:serverUrl,
      //销售组织
      salesOrgIds:[],
      checkList:'',
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
      options: [
        {
          value: "选项1",
          label: "转货订单"
        },
        {
          value: "选项2",
          label: "Buffer 订单"
        }
      ],
      value: "", 
      value1:"",

      radio: "1",
      form: {
        orderType:'',
        salesOrgId:'',
        underOrderType:'',
        soldParty:'',
        shipParty:'',
        purchaseOrderNo:'',
        purchaseOrderDate:'',
        customerAttribute:'',
        deliveryDate:'',
        inco1:'CIP',
        inco2:'HK',
        currency:"",
        // pricingDate:'',
        // payCondition:'',
        // orderStatus:'',
      },
      activeName: "first",
      tableData: [
        {
          t1: "中国建设银行",
          t3: "AF",
          t4: "AF-001",
          t5: "87",
          t6: "100",
          t7: "2019-06-23"
        }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  created(){
    this.getCode()
  },
  watch:{
    'form.currency':{
      handler:function(n,o){
        // console.log(n)
        if(n=='CNY'){
          if(this.form.salesOrgId==3000){
            this.form.inco1 = 'DDU'
            // console.log(this.form.icon1)
          }
        }else{
            this.form.inco1 = 'CIP'
            this.form.inco2 = 'HK'
          }
      }
    },
    'form.salesOrgId':{
      handler:function(n,o){
        // console.log(n)
        if(n==3000){
          // console.log(11111111)
          if(this.form.currency=='CNY'){
            this.form.inco1 = 'DDU'
            // console.log(this.form.icon1)
          }
        }else{
            this.form.inco1 = 'CIP'
            this.form.inco2 = 'HK'
          }
      }
    }
  },
  computed:{
    queryId(){
      return this.$route.query.id
    },
    queryType(){
      return this.$route.query.type
    }
  },
  methods: {
    uploadSuccess(val){
      // console.log(val)
      if(val.code==1){
        this.$message.success('上传成功')
        this.tableData = val.data
      }else{
        this.$message.error(val.msg)
      }
    },
    download(){
      this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/order/apply/lineTmpl",
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
              a.download = "订单行模版.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
            })
            .catch(err => {

              // console.log(err);
              //alert("网络异常");
            });
    },
    async getCode(){
      const res = await getCode();
      // console.log('发货方编码',res)
      if(res){
        this.salesOrgIds = res.data.data
      }
    },
    async apply(){
      this.form.lines = this.tableData
      if(this.form.lines.length==0){
        this.$message.error('请先上传订单行文件')
      }else{
        const res = await apply(this.form);
        // console.log('申请结果',res)
        if(res){
          this.$message.success('订单申请成功')
        }
      }
    },
    sub(){
      this.apply()
    },
    cancel(){},
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

.orderMod {
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
      padding: 10px 20px;
      // background: pink;
      background: #fff;
      margin-bottom: 10px;
      .upload-demo{
        display: inline-block;
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
          margin-bottom: 0;
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
      padding: 20px;
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
      padding: 20px;
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
          text-indent: 24px;
          margin-left: 0px;
        }
        .one{
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