<template>
  <!-- 添加新增控件 -->
  <div class="idradd">
    <div class="head clear">
      <el-page-header @back="back" content="新建">
    </el-page-header>
    </div>
    <div class="content">
      <div class="selBox">
        <el-form ref="form" :model="form" label-position="top" class="form" :inline="true">
          
          <el-form-item label="类别"  class="all">
            <el-radio-group v-model="form.type">
              <el-radio :label='1' >保价</el-radio>
              <el-radio :label='2'>差价补偿</el-radio>
              <el-radio :label='3'>退换货</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发货方编码">
            <el-select filterable v-model="form.shipperCode" size="small"  placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.groupCode"
                :label="item.groupCode"
                :value="item.groupCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司">
            <el-input size="small" v-model="form.company" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请时间" class="date">
            <el-date-picker size="small" v-model="form.applyTime" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="币种">
            <el-select  filterable v-model="form.currency" size="small" filterable placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="CR金额" v-if="form.type!='2'">
            <el-input size="small" v-model="form.crAmount" ></el-input>
          </el-form-item>
          
          <el-form-item label="内部客户名称">
            <el-input size="small" v-model="form.inCustomerName"  disabled></el-input>
          </el-form-item>
          <el-form-item label="外部客户名称">
            <el-select filterable size="small" v-model="form.outCustomerName"  placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.id"
                :label="item.corporateName"
                :value="item.corporateName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原因" class="txt">
            <el-input type="textarea" v-model="form.reson" :rows="2" placeholder resize="none"></el-input>
          </el-form-item>
          <el-form-item label="备注" class="txt">
            <el-input type="textarea" v-model="form.remark" :rows="2" placeholder resize="none"></el-input>
          </el-form-item>
          <el-form-item label="附件" class="txt">
            <el-upload style='display:inline-block' class="upload-demo" :before-upload="beforeUpload1" ref='upload' name='file'  :on-success='uploadSuccess' :action='serverUrl+"/business/idr/upload"' :file-list="fileList" :on-remove='remove'>
            <el-button size="small" type="primary" >上传文件</el-button>
          </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="tab">
        <div class="btns">
          <el-button type="primary" size="small" @click="download">下载模版</el-button>
          <el-upload style='display:inline-block' class="upload-demo" :before-upload="beforeUpload" ref='upload' name='file'    :on-success='uploadSuccess' :action='serverUrl+"/business/idr/upload"' >
            <el-button size="small" type="primary" >上传文件</el-button>
          </el-upload>
        </div>
        <div class="tabBox">
          <el-table v-if='form.type==1' :data="form.iList" border="" style="width: 100%" height="500">
            <el-table-column prop="customerName" label="客户" show-overflow-tooltip width="200" >
            </el-table-column>
            <el-table-column prop="adjustDate"   show-overflow-tooltip label="调价时间" width="200">
            </el-table-column>
            <el-table-column prop="receiveGoodsDate"   show-overflow-tooltip label="收货时间" width="200">
            </el-table-column>
            <el-table-column prop="bu"   label="BU" show-overflow-tooltip width="200">
            </el-table-column>
            <el-table-column prop="pdt"  label="PDT" show-overflow-tooltip width="200">
            </el-table-column>
            <el-table-column prop="productType"   label="产品类型" show-overflow-tooltip width="200">
            </el-table-column>
            <el-table-column prop="platform"  show-overflow-tooltip label="平台" width="200">
            </el-table-column>
            <el-table-column prop="productModel"  show-overflow-tooltip label="产品型号" width="200">
            </el-table-column>
            <el-table-column prop="num"   show-overflow-tooltip label="库存数量" width="200">
            </el-table-column>
            <el-table-column prop="price"  show-overflow-tooltip label="库存价格" width="200">
            </el-table-column>
            <el-table-column prop="currency"   show-overflow-tooltip label="币种" width="200">
            </el-table-column>
            <el-table-column prop="newPrice"   show-overflow-tooltip label="新价格" width="200">
            </el-table-column>
            <el-table-column prop="insuranceAmount"  show-overflow-tooltip label="保价金额" width="200">
            </el-table-column>
            <el-table-column prop="modifyDate"   show-overflow-tooltip label="调整时间" width="200">
            </el-table-column>
            <el-table-column prop="remark"  show-overflow-tooltip label="备注" width="200">
            </el-table-column>
            <div slot="empty">
              无数据
            </div>
          </el-table>
          <el-table v-if='form.type==2' :data="form.dList" border="" style="width: 100%" height="500">
            <el-table-column prop="customerName" label="客户" show-overflow-tooltip width="200" >
            </el-table-column>
            <el-table-column prop="bu"   label="BU" show-overflow-tooltip width="200">
            </el-table-column>
            <el-table-column prop="pdt"  label="PDT" show-overflow-tooltip width="200">
            </el-table-column>
            <el-table-column prop="productType"   label="产品类型" show-overflow-tooltip width="200">
            </el-table-column>
            <el-table-column prop="platfom"  show-overflow-tooltip label="平台" width="200">
            </el-table-column>
            <el-table-column prop="productModel"  show-overflow-tooltip label="产品型号" width="200">
            </el-table-column>
            <el-table-column prop="shipmentDate"   show-overflow-tooltip label="出货时间" width="200">
            </el-table-column>
            <el-table-column prop="num"  show-overflow-tooltip label="数量" width="200">
            </el-table-column>
            <el-table-column prop="customerPrice"  show-overflow-tooltip label="客户提货单价" width="200">
            </el-table-column>
            <el-table-column prop="agentPrice"  show-overflow-tooltip label="代理提货单价" width="200">
            </el-table-column>
            <el-table-column prop="differenceAmount"  show-overflow-tooltip label="差价金额" width="200">
            </el-table-column>
            <el-table-column prop="remark"  show-overflow-tooltip label="备注" width="200">
            </el-table-column>
            <div slot="empty">
              无数据
            </div>
          </el-table>
          <el-table v-if='form.type==3' :data="form.rList" border="" style="width: 100%" height="500">
            <el-table-column prop="shipmentCompany"  show-overflow-tooltip label="发货公司" width="200">
            </el-table-column>
            <el-table-column prop="agencyName"  show-overflow-tooltip label="代理商" width="200">
            </el-table-column>
            <el-table-column prop="takeGoodsDate"  show-overflow-tooltip label="提货日期" width="200">
            </el-table-column>
            <el-table-column prop="returnProductLine"  show-overflow-tooltip label="退货产品线" width="200">
            </el-table-column>
            <el-table-column prop="returnBu"  show-overflow-tooltip label="退货BU" width="200">
            </el-table-column>
            <el-table-column prop="returnPdt"  show-overflow-tooltip label="退货PDT" width="200">
            </el-table-column>
            <el-table-column prop="returnPlatform"  show-overflow-tooltip label="退货平台" width="200">
            </el-table-column>
            <el-table-column prop="returnProductModel"  show-overflow-tooltip label="退货产品型号" width="200">
            </el-table-column>
            <el-table-column prop="returnNum"  show-overflow-tooltip label="退货数量" width="200">
            </el-table-column>
            <el-table-column prop="returnCurrency"  show-overflow-tooltip label="退货币种" width="200">
            </el-table-column>
            <el-table-column prop="returnPrice"  show-overflow-tooltip label="退货价格" width="200">
            </el-table-column>
            <el-table-column prop="returnCustomerAttribute"  show-overflow-tooltip label="客户属性" width="200">
            </el-table-column>
            <el-table-column prop="returnAgencyRate"  show-overflow-tooltip label="代理费率" width="200">
            </el-table-column>
            <el-table-column prop="returnAmount"  show-overflow-tooltip label="退货金额" width="200">
            </el-table-column>
            
            <el-table-column prop="exchangeProductLine"  show-overflow-tooltip label="换货产品线" width="200">
            </el-table-column>
            <el-table-column prop="exchangeBu"  show-overflow-tooltip label="换货BU" width="200">
            </el-table-column>
            <el-table-column prop="exchangePdt"  show-overflow-tooltip label="换货PDT" width="200">
            </el-table-column>
            <el-table-column prop="exchangePlatform"  show-overflow-tooltip label="换货平台" width="200">
            </el-table-column>
            <el-table-column prop="exchangeProductModel"  show-overflow-tooltip label="换货产品型号" width="200">
            </el-table-column>
            <el-table-column prop="exchangeNum"  show-overflow-tooltip label="换货数量" width="200">
            </el-table-column>
            <el-table-column prop="exchangeCurrency"  show-overflow-tooltip label="换货币种" width="200">
            </el-table-column>
            <el-table-column prop="exchangePrice"  show-overflow-tooltip label="换货价格" width="200">
            </el-table-column>
            <el-table-column prop="exchangeAmount"  show-overflow-tooltip label="换货金额" width="200">
            </el-table-column>
            <el-table-column prop="exchangeDate"  show-overflow-tooltip label="换货日期" width="200">
            </el-table-column>
            <el-table-column prop="remark"  show-overflow-tooltip label="备注" width="200">
            </el-table-column>
            <div slot="empty">
              无数据
            </div>
          </el-table>
        </div>
      </div>
      <div class="sub">
        <el-button size="small" type="primary" @click="submit">提交</el-button>
        <el-button size="small" type="primary" @click="back" plain>取消</el-button>
      </div>
    </div>
    
  </div>
</template>

<script>
  import {serverUrl} from "@/axios/request.js";
import { getIn,getCode,commit} from '@/api/business/idr.js'
export default {
  name: "idradd",
  data() {
    return {
      fileList:[],
      serverUrl:serverUrl,
      auth:sessionStorage.getItem('data'),
      tableData:[
      ],
      options1: [
        {
          value: "USD",
          label: "USD"
        },
        {
          value: "RMB",
          label: "RMB"
        }
      ],
      options2: [],
      options3:[],
      form: {
        shipperCode	:'',
        applyTime	:'',
        currency	:'',
        crAmount	:'',
        company	:'',
        inCustomerName	:'',
        reson	:'',
        remark	:'',
        type:1,
        iList:[],
        dList:[],
        rList:[],
        files:[]
      },
      activeName: "first",
    };
  },
  watch:{
    'form.shipperCode':{
      handler:function(n,o){
        if(n){
        this.form.company = this.options2.filter(item=>{if(item.groupCode==n){return item}})[0].groupName

        }else{
          this.form.company=''
        }
      }
    },
    'form.files':{
      handler:function(n,o){
        this.fileList = n.map(item=>{return {name:item.fileName,path:item.filePath,fileType:item.fileType}})
      },
      deep:true
    },
    'form.type':{
      handler:function(n,o){
        if(n!=o){
          this.form.shipperCode = ''
          this.form.applyTime = ''
          this.form.currency = ''
          this.form.crAmount = ''
          this.form.company = ''
          this.form.inCustomerName = ''
          this.form.outCustomerName = ''
          this.form.reson = ''
          this.form.remark = ''
          this.form.iList = []
          this.form.dList = []
          this.form.rList = []
          this.form.files = []
        }
      }
    },
  },
  created(){
    this.getData()
  },
  methods: {
    remove(file,fileList){
      // console.log(file,fileList)
      this.form.files=fileList.map(item=>{return {fileName:item.name,filePath:item.path,fileType:item.fileType}})
    },
    beforeUpload1(file){
      let data = new FormData()
      data.append('file',file)
      data.append('id','')
      data.append('crAmount','')
      data.append('idrType',this.form.type)
      data.append('fileType',1)
      this.$http({
        method: 'post',
        url: this.serverUrl+"/business/idr/upload",
        headers:{'Authorization': this.auth},
        timeout: 20000,
        data: data
      }).then(res=>{
        // console.log(res)
        if(res.data.code==1){
          this.$message.success('上传成功')
          this.form.files.push(res.data.data)
          // console.log(this.form.file)
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch(err=>{
        // console.log(err)
      })
      return false
    },
    beforeUpload(file){
      let data = new FormData()
      data.append('file',file)
      data.append('id','')
      data.append('crAmount','')
      data.append('idrType',this.form.type)
      data.append('fileType',2)
      this.$http({
        method: 'post',
        url: this.serverUrl+"/business/idr/upload",
        headers:{'Authorization': this.auth},
        timeout: 20000,
        data: data
      }).then(res=>{
        // console.log(res)
        if(res.data.code==1){
          this.$message.success('上传成功')
          if(this.form.type==1){
            this.form.iList = res.data.data.idrList
          }
          if(this.form.type==2){
            this.form.dList = res.data.data.idrList
          }
          if(this.form.type==3){
            this.form.rList = res.data.data.idrList
          }
          this.form.files = this.form.files.filter((item)=>{return item.fileType==1})
          this.form.files.push(res.data.data)
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch(err=>{
        // console.log(err)
      })
      return false
    },
    uploadSuccess(res, file, fileList){
    },
    download() {
          this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/business/idr/templateDownload?type=" + this.form.type,
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
              if(this.form.type ==1){
                a.download = "保价.xlsx";
              }
              if(this.form.type ==2){
                a.download = "差价补偿.xlsx";
              }
              if(this.form.type ==3){
                a.download = "退换货.xlsx";
              }
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
            })
            .catch(err => {
              // console.log(err);
              alert("网络异常");
            });
      },
    getData(){
      this.getIn()
      this.getCode()
    },
    async getIn(){
      const res = await getIn();
      // console.log('内部客户',res)
      if(res){
        this.options3 = res.data.data.outShips
        this.form.inCustomerName = res.data.data.inShip ? res.data.data.inShip.corporateName :''
      }
    },
    async getCode(){
      const res = await getCode();
      // console.log('发货方编码',res)
      if(res){
        this.options2 = res.data.data
      }
    },
    // 表单验证
    submitForm(formName) {},
    resetForm(formName) {},
    clear() {},
    cancel() {},
    async submit() {
      const res = await commit(this.form);
      // console.log('提交结果',res)
      if(res){
        this.back()
      }
    },
    back() {
      window.history.back();
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;

.idradd {
  height: 100%;
  overflow-y: auto;
  padding: 0 20px ;
  .head {
      padding:10px 20px;

  }

  .content {
    height: 100%;
    // background: pink;
    // padding: 0 30px 20px;

    .selBox {
      padding: 0 20px 10px 20px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      background: #fff;
      .form {
        width: 100%;
        min-width: 900px;
        max-width: 1300px;
        
        .el-form-item {
          margin-bottom: 0;
          width: 200px;
          .el-select {
            width: 200px;
          }
          .el-form-item__label {
            height: 30px;
          }
        }
        .all{
          width: 100%;
        }
        .txt{
          width: 100%;
        }
        // .el-form-item:last-child {
        //   /* width:100%; */
        //   .el-textarea__inner {
        //     width: 414px;
        //     margin-top: 2px;
        //   }
        // }
        .date {
          width: 200px;
          .el-date-editor {
            width: 200px;
          }
        }
      }
    }

    .tab {
      background: #fff;
      padding: 20px;
      .btns{
        padding: 10px 0;
      }
      .block {
        background: #fff;
        padding: 10px;

        .el-pagination {
          width: 100%;
          text-align: center;
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