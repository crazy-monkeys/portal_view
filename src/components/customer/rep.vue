<template>
  <!-- 添加新增控件 -->
  <div class="rep">
    <div class="head clear">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item >客户管理</el-breadcrumb-item>
          <el-breadcrumb-item >客户报备</el-breadcrumb-item>
          <el-breadcrumb-item >报备</el-breadcrumb-item>
        </el-breadcrumb>
    </el-page-header>
    </div>
    <div class="content">
      <div class="selBox">
        <el-form ref="form" :model="form"   label-position="top" class="form" >
          <el-row :gutter="22">
            <el-col :span="6">
              <el-form-item label="客户名称">
            <el-input size="small" v-model="form.custName"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户类型">
            <el-select v-model="form.custType" size="small" filterable placeholder="请选择">
              <el-option
                v-for="item in businessTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否License客户">
            <el-select v-model="form.isLicense" size="small"  placeholder="请选择">
              <el-option  label="是" :value="1"></el-option>
              <el-option  label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="角色">
            <el-select v-model="form.custRole" size="small"  placeholder="请选择">
              <el-option  label="中国客户" :value="1"></el-option>
              <el-option  label="亚太客户" :value="2"></el-option>
              <el-option  label="北美客户" :value="3"></el-option>
            </el-select>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公司资产">
            <el-input size="small" v-model="form.corporateAssets"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="员工人数">
            <el-input size="small" v-model="form.corporateNumber"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="传真">
            <el-input size="small" v-model="form.custFax"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="邮箱">
            <el-input size="small" v-model='form.custEmail'></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公司网站">
            <el-input size="small" v-model='form.custWeb'></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="母公司">
            <el-input size="small" v-model='form.corporateParents'></el-input>
          </el-form-item>
            </el-col>
            
            <el-col :span="6">
              <el-form-item label="公司总机">
            <el-input size="small" v-model='form.custPhoneNo'></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册时间" size="small" class="date">
            <!-- <el-input v-model="form.registerTimeStr"></el-input> -->
            <el-date-picker v-model="form.registerTimeStr" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册地址" >
                <el-row :gutter="22">
                  <el-col :span="12">
                <el-cascader
                  v-model="regAddress"
                  :options="province"
                  separator='-'
                  size="small"
                  :props="prop"
                  placeholder="请选择省市区">
                  </el-cascader>
                  </el-col>
                <el-col :span="12">
                <el-input size="small"  v-model="regDetailAddress"  placeholder="详细地址"></el-input>


                </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="办公地址" >
                <el-row :gutter="22">
            <el-col :span="12">
   <el-cascader
              v-model="workAddress"
              :options="province"
              size="small"
              separator='-'
              :props="prop"
              placeholder="请选择省市区">
              </el-cascader>


            </el-col>
            <el-col :span="12">
            <el-input size="small" v-model="workDetailAddress" placeholder="详细地址"></el-input>

            </el-col>


                </el-row>
         
          </el-form-item>



            </el-col>
          </el-row>
          
          
          <el-form-item label="业务介绍" class="txt">
            <el-input type="textarea" v-model="form.businessIntroduction" :rows="2" placeholder resize="none"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane label="开票信息" name='first'>
            <div class="tabBox">
              <el-table :data="form.basicInvoice" style="width: 100%" height="300">

                <el-table-column  label="购货单位" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.purchasingUnit"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="收货地址" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.shippingAddress"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="收货手机号" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.shippingMobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" show-overflow-tooltip label="纳税人登记号">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.taxpayerRegistrationNumber"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="currency" show-overflow-tooltip label="币种">
                  <template slot-scope="scope">
                    <el-select size="small" v-model="scope.row.currency">
                      <el-option value="RMB" label="RMB"></el-option>
                      <el-option value="USD" label="USD"></el-option>
                      <el-option value="HDK" label="HDK"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="" show-overflow-tooltip>
                  <template slot="header">
                    <el-button type="primary" size="small" @click="addRow(1)">新增</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="delRow(1,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="联系人" name='aa'>
            <div class="tabBox">
              <el-table :data="form.basicContact" style="width: 100%" height="300">
                <el-table-column prop="contactType" label="联系人类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-select size="small" v-model="scope.row.contactType">
                      <el-option value="C01" label="出货数据确认人"></el-option>
                      <el-option value="C02" label="Rebate确认人"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="姓名" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.contactName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="部门" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.contactDepartment"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" show-overflow-tooltip label="职位">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.contactPosition"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" show-overflow-tooltip label="联系方式">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.contactMobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" show-overflow-tooltip label="邮箱">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.contactEmail"></el-input>
                  </template>
                </el-table-column>
                <el-table-column  show-overflow-tooltip label="是否关键决策人">
                  <template slot-scope="scope">
                    <el-select size="small" v-model="scope.row.isDecisionMaker">
                      <el-option :value="1" label="是"></el-option>
                      <el-option :value="0" label="否"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column  show-overflow-tooltip label="股东占比">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.equityRatio"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="t4" label="" show-overflow-tooltip>
                  <template slot="header">
                    <el-button type="primary" size="small" @click="addRow(2)">新增</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="delRow(2,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="客户层次结构" name="aaa">
            <div class="tabBox">
              <el-table :data="form.basicStructure" style="width: 100%" height="300">
                <el-table-column prop="" label="名称" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.corporateStructureName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="地址" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.corporateStructureAddress"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="主要联系人" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.isDefaultContact"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="" show-overflow-tooltip>
                  <template slot="header">
                    <el-button type="primary" size="small" @click="addRow(3)">新增</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="delRow(3,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="展锐销售团队" name="third">
            <div class="tabBox">
              <el-table :data="form.salesTeam" style="width: 100%" height="300">
                <el-table-column  label="角色类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                     <el-select size="small" v-model="scope.row.roleId">
                      <el-option :value="1" label="类型1"></el-option>
                      <el-option :value="2" label="类型2"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="名称" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.name"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="手机号" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.mobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="t4" label="" show-overflow-tooltip>
                  <template slot="header">
                    <el-button type="primary" size="small" @click="addRow(4)">新增</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="delRow(4,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关系" name="zzz">
            <div class="tabBox">
              <el-table :data="form.basicShip" style="width: 100%" height="300">
                <el-table-column prop="corporateName" label="名称" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.corporateName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="corporateType" label="关系类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                     <el-select size="small" v-model="scope.row.corporateType">
                      <el-option :value="1" label="类型1"></el-option>
                      <el-option :value="2" label="类型2"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="t4" label="" show-overflow-tooltip>
                  <template slot="header">
                    <el-button type="primary" size="small" @click='addRow(5)'>新增</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="delRow(5,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="销售数据" name="a">
            <div class="tabBox">
              <el-table :data="form.sales" style="width: 100%" height="300">
                <el-table-column prop="" label="销售组织" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.salesOrganize"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="分销渠道" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.distributionChannel"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="产品组" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.productGroup"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="货币" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.currency"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="装运条件" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.shippingConditions"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="交货工厂" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.deliveryPlant"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="最大部分交货" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.maxPartialDelivery"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="内部客户" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.internalCustomers"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="账户分配组" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.accountGroup"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="客户组" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.custGroup"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="税分类" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.taxClassification"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="t4" label="" show-overflow-tooltip fixed="right" width="100">
                  <template slot="header">
                    <el-button type="primary" size="small" @click='addRow(6)'>新增</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="delRow(6,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
           <el-tab-pane label="附件" name="fourth">
            <div class="tabBox">
              <el-table :data="form.basicFile" style="width: 100%" height="300" @row-click='rowClick'>
                <el-table-column type="index"  label="" v-if='false' show-overflow-tooltip>
                </el-table-column>
                <el-table-column  label="附件类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-select size="small" v-model="scope.row.fileType">
                      <el-option :value="1" label='营业执照'></el-option>
                      <el-option :value="2" label='银行开户证明'></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column  label="附件" show-overflow-tooltip>
                  <template slot-scope="scope">
                      <el-upload
                        class="upload-demo"
                        action=" "
                        :auto-upload="true"
                        :on-change='changeFile'
                        :limit="1"
                        :http-request="httpReq1"

                        >
                        <el-button size="small" type="primary">选择文件</el-button>
                      </el-upload>
                  </template>
                  
                </el-table-column>
                <el-table-column prop="t4" label="" show-overflow-tooltip>
                  <template slot="header">
                    <el-button type="primary" size="small" @click='addRow(7)'>新增</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="delRow(7,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                
                <div slot="empty">
                  无数据
                </div>
              </el-table>
          
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="sub">
        <el-button type="primary" size="small" plain @click="save">保存</el-button>
        <el-button type="primary" size="small" plain @click="sub">提交</el-button>
        <el-button type="primary" size="small" plain @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {detail,add,checkCust} from "@/api/customer/query.js";
import {stringify} from "qs";

export default {
  name: "rep",
  data() {
    return {
      rowData:{},
      prop:{
        label:'name',
        value:'name',
        children:'list',
      },
      form:{
        
        advantageIntroduction: "",
        advantageValue: "",
        basicAddress: [],
        basicBank: {},
        basicContact: [],
        basicFile: [],
        basicInvoice: [],
        // basicLables: '',
        basicShip: [],
        basicStructure: [],
        businessIntroduction: "",
        businessType: '',
        corporateAssets: '',
        corporateNumber: '',
        corporateParents: "",
        creditEngagedValue: '',
        creditInitalValue: '',
        creditSurplus: '',
        custAbbreviation: "",
        custEmail: "",
        custEnName: "",
        custFax: "",
        custInCode: "",
        custMobile: "",
        custOutCode: "",
        custPhoneNo: "",
        custRole: '',
        custType: '',
        custWeb: "",
        custZhName: "",
        customerStatus: '',
        dealerStatus: '',
        id: '',
        isLicense: '',
        isWhiteList: '',
        registerTime: '',
        registerTimeStr: "",
        sales: [],
        salesTeam: [],
      },
      businessTypes: [
        {
          value: 1,
          label: "Mass Market"
        },
        {
          value: 2,
          label: "Account Market"
        }
      ],
      province: [
      ],
      regDetailAddress:'',
      workDetailAddress:'',
      regAddress:'',
      workAddress:'',
      activeName: "first",
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  created(){
    this.getCity()
    // if(this.queryId){
    //   this.getDetail()
    // }
    this.checkCust()
  },
  watch:{
    workAddress:{
      handler:function(n,o){
        console.log(n)
      }
    },
    'form.basicFile':{
      handler:function(n,o){
        console.log(n)
      },
      deep:true
    },
  },
  computed:{
    name(){
      return this.$route.query.name
    },
    queryId(){
      return this.$route.query.id
    },
  },
  methods: {
    async checkCust(){
      const data ={
        name:this.name
      }
       const res = await checkCust(data);
       if(res){
         this.form = res.data.data
       }else{
         this.$router.push({name:'customerRep'})
       }

    },
    httpReq1(val){
      console.log(val)
      // console.log(this.form.basicFile.length - this.rowData.index-1)
      this.form.basicFile[this.rowData.index].file = val.file
      // this.form.basicFile[this.form.basicFile.length - this.rowData.index-1].fileList.push(val.file)
      console.log(val.file)
          // this.form.basicFile[this.form.basicFile.length - this.rowData.index-1].fileList = fileList
    },
    rowClick(row){
      // console.log(row)
      this.rowData = row
    },
    changeFile(file,fileList){
      console.log(this.rowData.index)
      console.log(this.form.basicFile.length -this.rowData.index)
      // this.form.basicFile.forEach(item=>{
        // if(item.index == this.rowData.index){
          // this.form.basicFile[this.form.basicFile.length - this.rowData.index-1].file = file
          // this.form.basicFile[this.form.basicFile.length - this.rowData.index-1].fileList = fileList
        // }
      // })
    },
    delRow(type,index){
      console.log(index)
      switch (type) {
        case 1:
          this.form.basicInvoice.splice(index,1)
          break;
        case 2:
          this.form.basicContact.splice(index,1)
          break;
          case 3:
          this.form.basicStructure.splice(index,1)
          break;
          case 4:
          this.form.salesTeam.splice(index,1)
          break;
          case 5:
          this.form.basicShip.splice(index,1)
          break;
          case 6:
          this.form.sales.splice(index,1)
          break;
          case 7:
          this.form.basicFile.splice(index,1)
          break;
        default:
          break;
      }
    },
    addRow(type){
      switch (type) {
        case 1:
          this.form.basicInvoice.unshift({
            "purchasingUnit":'',
            "shippingAddress" :'',
            "shippingMobile"  :'',
            "taxpayerRegistrationNumber"  :'',
            "currency"  :'',
          })
          break;
        case 2:
          this.form.basicContact.unshift({
            "contactType":'',
            "contactName":'',
            "contactDepartment":'',
            "contactPosition":'',
            "contactMobile" :'',
            "contactEmail"  :'',
            "isDecisionMaker"  :'',
            "equityRatio"  :'',
          })
          break;
        case 3:
          this.form.basicStructure.unshift({
            "corporateStructureName":'',
            "corporateStructureAddress":'',
            "isDefaultContact":'',
          })
          break;
        case 4:
          this.form.salesTeam.unshift({
            "roleId":'',
            "name":'',
            "mobile":'',
          })
          break;
          case 5:
          this.form.basicShip.unshift({
            "corporateName":'',
            "corporateType":'',
          })
          break;
          case 6:
          this.form.sales.unshift({
            "salesOrganize":'',
            "distributionChannel":'',
            "productGroup":'',
            "currency":'',
            "shippingConditions":'',
            "deliveryPlant":'',
            "maxPartialDelivery":'',
            "internalCustomers":'',
            "accountGroup":'',
            "custGroup":'',
            "taxClassification":'',
          })
          break;
          case 7:
            
          this.form.basicFile.push({
            'index':this.form.basicFile.length,
            "fileType":'',
            "fileName":'',
            'file':'',
            // 'fileList':[],
            'id'	:'',
            'custId':''	,
            'filePath':'',	
            'create_time'	:'',
            "create_user_name":''	
          })
          // console.log(this.form.basicFile)
          break;
        default:
          break;
      }
      
    },
    async sub(){
      var data =this.form
      data.customerStatus =2
      data.basicAddress = [{addressType: "注册地址",
        city: this.regAddress[1],
        country: "",
        custId: '',
        detailInfo: this.regDetailAddress,
        district: this.regAddress[2],
        id: '',
        isDefault: 1,
        province: this.regAddress[0]},
        {addressType: "办公地址",
        city: this.workAddress[1],
        country: "",
        custId: '',
        detailInfo: this.workDetailAddress,
        district: this.workAddress[2],
        id: '',
        isDefault: 1,
        province: this.workAddress[0]}]
      var params = new FormData()
      for (let i in data) {
        // console.log(i,data[i])
        if(typeof(data[i]) == 'object'){
          for(let j in data[i]){
            console.log(data[i][j])
            if(typeof(data[i][j]) == 'object'){
              for(let x in data[i][j]){
                console.log(data[i][j][x])
                if(data[i][j][x] ){
                  params.append(i+'['+j+']'+'.'+x,data[i][j][x])
                }
              }
            }else{
                if(data[i][j] ){

              params.append(data[i]+j,data[i][j])
                }
            }
          }
        }else{
          if(data[i]){
          params.append(i,data[i])

          }
        }
      }
        console.log(params)
      const res = await add(params)
      console.log('新增结果',res)
      if(res){
        this.$message.success('保存成功')
        this.cancel()
      }
    },
    async save(){
      var data =this.form
      data.customerStatus =1
      data.basicAddress = [{addressType: "注册地址",
        city: this.regAddress[1],
        country: "",
        custId: '',
        detailInfo: this.regDetailAddress,
        district: this.regAddress[2],
        id: '',
        isDefault: 1,
        province: this.regAddress[0]},
        {addressType: "办公地址",
        city: this.workAddress[1],
        country: "",
        custId: '',
        detailInfo: this.workDetailAddress,
        district: this.workAddress[2],
        id: '',
        isDefault: 1,
        province: this.workAddress[0]}]
      var params = new FormData()
      for (let i in data) {
        // console.log(i,data[i])
        if(typeof(data[i]) == 'object'){
          for(let j in data[i]){
            console.log(data[i][j])
            if(typeof(data[i][j]) == 'object'){
              for(let x in data[i][j]){
                console.log(data[i][j][x])
                if(data[i][j][x] ){
                  params.append(i+'['+j+']'+'.'+x,data[i][j][x])
                }
              }
            }else{
                if(data[i][j] ){

              params.append(data[i]+j,data[i][j])
                }
            }
          }
        }else{
          if(data[i]){
          params.append(i,data[i])

          }
        }
      }
        console.log(params)
      const res = await add(params)
      console.log('新增结果',res)
      if(res){
        this.$message.success('保存成功')
        this.cancel()
      }
    },
    cancel(){
      window.history.go(-1)
    },
    getCity() {
      this.$http({
        method: "get",
        url: "static/cityL3.json"
      })
        .then(res => {
          console.log("城市list", res);
          this.province = res.data;
            
        })
        .catch(error => {
          console.log(error);
          alert("系统异常");
        });
    },
    async getDetail(){
      var data ={
        id:this.queryId
      }
      const res = await detail(data);
      console.log('详情',res);
      if(res){
        this.form = res.data.data;
        this.form.basicAddress.forEach(item=>{
          if(item.addressType=='办公地址'){
            this.workDetailAddress = item.detailInfo
            this.workAddress = []
            this.workAddress.push(item.province)
            this.workAddress.push(item.city)
            this.workAddress.push(item.district)
          }else{
            this.regDetailAddress = item.detailInfo
            this.regAddress = []
            this.regAddress.push(item.province)
            this.regAddress.push(item.city)
            this.regAddress.push(item.district)
            console.log(this.regAddress)
          }
        })
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
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

.rep {
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
        // min-width: 900px;
        // max-width: 1300px;
        
        .el-form-item {
          margin-bottom: 0;
          .el-cascader{
            width: 100%;
          }
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

    .sub {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
    }
  }
}
</style>