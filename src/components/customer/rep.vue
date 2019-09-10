<template>
  <!-- 添加新增控件 -->
  <div class="rep">
    <div class="head clear">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item >客户管理</el-breadcrumb-item>
          <el-breadcrumb-item >客户报备</el-breadcrumb-item>
          <el-breadcrumb-item >报备</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="content">
      <div class="selBox">
        <el-form ref="form" :model="form"   label-position="top" class="form" >
          <el-row :gutter="22">
            <el-col :span="6">
              <el-form-item label="客户名称">
            <el-input size="small" v-model="form.custName" disabled></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户英文名">
            <el-input size="small" v-model="form.custEnName" ></el-input>
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
            <el-input size="small" v-model="form.corportaeAssets"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="员工人数">
            <el-input size="small" v-model="form.staffNumber"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="研发人数">
            <el-input size="small" v-model="form.developersNumber"></el-input>
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
              <el-form-item label="电话">
            <el-input size="small" v-model='form.custMobile'></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册时间" size="small" class="date">
            <el-date-picker v-model="form.registTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册地址" >
                <el-row :gutter="22">
                  <el-col :span="12">
                <el-cascader
                  v-model="reg"
                  :options="province"
                  separator='-'
                  size="small"
                  :props="prop"
                  placeholder="请选择省市区">
                  </el-cascader>
                  </el-col>
                <el-col :span="12">
                <el-input size="small"  v-model="regAddress"  placeholder="详细地址"></el-input>


                </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="办公地址" >
                <el-row :gutter="22">
            <el-col :span="12">
   <el-cascader
              v-model="work"
              :options="province"
              size="small"
              separator='-'
              :props="prop"
              placeholder="请选择省市区">
              </el-cascader>


            </el-col>
            <el-col :span="12">
            <el-input size="small" v-model="workAddress" placeholder="详细地址"></el-input>

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
          <el-tab-pane label="开票信息" name="first">
            <div class="tabBox">
               <el-table :data="form.invoiceInfos" style="width: 100%" height="300">
                <el-table-column prop="" width="150" label="购货单位" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.purchasingUnit"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="交货地址" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.shippingAddress"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="手机号" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.shippingMobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="纳税人登记号" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.taxpayerRegistrationNumber"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="币种" >
                  <template slot-scope="scope">
                    <el-select size="small" v-model="scope.row.currency" >
                      <el-option v-for="item in currences" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="" fixed="right" width="100">
                  <template slot="header">
                    <el-button type="primary" size="small" @click="addRow(1)">新增</el-button>
                  </template>
                  <template slot-scope='scope'>
                    <el-button type="text" size="small" @click="del(1,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="联系人" name="second">
            <div class="tabBox">
              <el-table :data="form.customerContacts" style="width: 100%" height="300">
                <el-table-column prop=""  width="150" label="联系人类型" >
                  <template slot-scope="scope">
                    <el-select size="small"  v-model="scope.row.type" >
                      <el-option v-for="item in contactTypes" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="姓名" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.contactName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop=""  width="150" label="电话" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.mobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150"  label="邮箱" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.email"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150"  label="部门" >
                  <template slot-scope="scope">
                    <el-select size="small" v-model="scope.row.department" >
                      <el-option v-for="item in departments" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150"  label="二级部门" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.subDepartment"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150"  label="职位" >
                  <template slot-scope="scope">
                    <el-select size="small" v-model="scope.row.position" >
                      <el-option v-for="item in positions" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150"  label="股权占比" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.equityRatio"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" fixed="right" label="" width="100">
                  <template slot="header">
                    <el-button type="primary" size="small" @click="addRow(2)">新增</el-button>
                  </template>
                  <template slot-scope='scope'>
                    <el-button type="text" size="small" @click="del(2,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="股权结构" name="third">
            <div class="tabBox">
              <el-table :data="form.custStructure" style="width: 100%" height="300">
                <el-table-column prop="" label="上级公司" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.strOne"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="股东名称" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.strName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="股东占比" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.strValue"></el-input></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="股东性质" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.strTwo"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="公司性质" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.strThree"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="是否公司管理层" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.strFour"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="职务" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.strFive"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="部门" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.strSix"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="" show-overflow-tooltip>
                  <template slot="header">
                    <el-button type="primary" size="small" @click="addRow(3)">新增</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="del(3,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="销售团队" name="fourth">
            <div class="tabBox">
              <el-table :data="form.accountTeams" style="width: 100%" height="300">
                <el-table-column  label="角色类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                     <el-select size="small" v-model="scope.row.roleType">
                      <el-option :value="1" label="类型1"></el-option>
                      <el-option :value="2" label="类型2"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="名称" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.accountName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="手机号" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.accountMobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="t4" label="" show-overflow-tooltip>
                  <template slot="header">
                    <el-button type="primary" size="small" @click="addRow(4)">新增</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="del(4,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关系" name="fifth">
            <div class="tabBox">
              <el-table :data="form.relationships" style="width: 100%" height="300">
                <el-table-column prop=""  label="名称" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.corporateName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="关系类型" >
                  <template slot-scope="scope">
                    <el-select size="small" v-model="scope.row.corporateType" >
                      <el-option v-for="item in corporateTypes" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" fixed="right" label="" width="100">
                  <template slot="header">
                    <el-button type="primary" size="small" @click="addRow(5)">新增</el-button>
                  </template>
                  <template slot-scope='scope'>
                    <el-button type="text" size="small" @click="del(5,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="展锐产品型号" name="sixth">
            <div class="tabBox">
              <el-table :data="form.customerProducts" style="width: 100%" height="300">
                <el-table-column prop="" label="物料" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.product"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份一" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.pNumberOne"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份二" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.pNumberTwo"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份三" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.pNumberThree"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份四" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.pNumberFour"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份五" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.pNumberFive"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份六" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.pNumberSix"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="t4" label=""  fixed="right" width="100">
                  <template slot="header">
                    <el-button type="primary" size="small" @click='addRow(6)'>新增</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="del(6,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="附件" name="seventh">
            <div class="tabBox">
              <el-table :data="form.files" style="width: 100%" height="300" @row-click='rowClick'>
                <el-table-column  label="附件类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-select size="small"  v-model="scope.row.fileType" >
                      <el-option v-for="item in types" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
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
                    <el-button type="text" size="small" @click="del(7,scope.$index)">删除</el-button>
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
        <el-button type="primary" size="small" plain @click="sub">提交</el-button>
        <el-button type="primary" size="small" plain @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {detail,add,checkCust} from "@/api/customer/query.js";
import {stringify} from "qs";
import {getType} from '@/api/system/param.js'
export default {
  name: "rep",
  data() {
    return {
      contactTypes:[],
      types:[],
        corporateTypes:[],
        departments:[],
        positions:[],
      currences:[
        {
          pValue:'RMB',
          zhName:'RMB'
        },
        {
          pValue:'USD',
          zhName:'USD'
        },
        {
          pValue:'HKD',
          zhName:'HKD'
        }
      ],
      rowData:{},
      prop:{
        label:'name',
        value:'name',
        children:'list',
      },
      form:{
        custName:'',
        advantageIntroduction: "",
        advantageValue: "",
        addresses: [],
        custBank: {},
        customerContacts: [],
        files: [],
        invoiceInfos: [],
        // custLables: '',
        relationships: [],
        customerProducts:[],
        custStructure: [],
        businessIntroduction: "",
        businessType: '',
        corportaeAssets: '',
        staffNumber: '',
        developersNumber:'',
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
        custRole: '',
        custType: '',
        custWeb: "",
        custZhName: "",
        customerStatus: '',
        dealerStatus: '',
        id: '',
        isLicense: '',
        isWhiteList: '',
        registTime: '',
        sales: [],
        accountTeams: [],
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
      reg:'',
      work:'',
      regAddress:'',
      workAddress:'',
      activeName: "first",
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  created(){
    this.getData()
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
    'form.files':{
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
    getData(){
        this.getType(2,11)
        this.getType(2,6)
        this.getType(2,5)
        this.getType(2,7)
        this.getType(2,9)
      },
      async getType(model,func){
        const data ={
          model:model,
          func:func,
        }
        const res = await getType(data);
        console.log('关系类型',res)
        if(res){
          if(func==11){
            this.corporateTypes = res.data.data

          }
          if(func==7){
            this.departments = res.data.data
          }
          if(func==9){
            this.positions = res.data.data
          }
          if(func==5){
            this.types = res.data.data
          }
          if(func==6){
            this.contactTypes = res.data.data
          }
        }
      },
    async checkCust(){
      const data ={
        name:this.name
      }
       const res = await checkCust(data);
       console.log('检查客户',res)
       if(res){
         this.form.custName = res.data.data.custName
         
       }else{
         this.$router.push({name:'customerRep'})
       }

    },
    httpReq1(val){
      console.log(val)
      // console.log(this.form.custFile.length - this.rowData.index-1)
      this.form.files[this.rowData.index].file = val.file
      // this.form.custFile[this.form.custFile.length - this.rowData.index-1].fileList.push(val.file)
      console.log(val.file)
          // this.form.custFile[this.form.custFile.length - this.rowData.index-1].fileList = fileList
    },
    rowClick(row){
      // console.log(row)
      this.rowData = row
    },
    changeFile(file,fileList){
      console.log(this.rowData.index)
      console.log(this.form.files.length -this.rowData.index)
      // this.form.custFile.forEach(item=>{
        // if(item.index == this.rowData.index){
          // this.form.custFile[this.form.custFile.length - this.rowData.index-1].file = file
          // this.form.custFile[this.form.custFile.length - this.rowData.index-1].fileList = fileList
        // }
      // })
    },
    del(type,index){
      console.log(index)
      switch (type) {
        case 1:
          this.form.invoiceInfos.splice(index,1)
          break;
        case 2:
          this.form.customerContacts.splice(index,1)
          break;
          case 3:
          this.form.custStructure.splice(index,1)
          break;
          case 4:
          this.form.accountTeams.splice(index,1)
          break;
          case 5:
          this.form.relationships.splice(index,1)
          break;
          case 6:
          this.form.customerProducts.splice(index,1)
          break;
          case 7:
          this.form.files.splice(index,1)
          break;
        default:
          break;
      }
    },
    addRow(type){
      switch (type) {
        case 1:
          this.form.invoiceInfos.unshift({
            "purchasingUnit":'',
            "shippingAddress" :'',
            "shippingMobile"  :'',
            "taxpayerRegistrationNumber"  :'',
            "currency"  :'',
          })
          break;
        case 2:
          this.form.customerContacts.unshift({
            "contactType":'',
            "contactName":'',
            "contactDepartment":'',
            "contactPosition":'',
            "contactMobile" :'',
            "contactEmail"  :'',
            "isDecisionMaker"  :'',
            "equityRatio"  :'',
            "type"  :'',
          })
          break;
        case 3:
          this.form.custStructure.unshift({
            "corporateStructureName":'',
            "corporateStructureAddress":'',
            "isDefaultContact":'',
            'strOne':'',
            'strTwo':'',
            'strThree':'',
            'strFour':'',
            'strFive':'',
            'strSix':'',
          })
          break;
        case 4:
          this.form.accountTeams.unshift({
            "roleId":'',
            "name":'',
            "mobile":'',
          })
          break;
          case 5:
          this.form.relationships.unshift({
            "corporateName":'',
            "corporateType":'',
          })
          break;
          case 6:
          this.form.customerProducts.unshift({
            'product':'',
            'pNumbeOne':'',
            'pNumbeTwo':'',
            'pNumbeThree':'',
            'pNumbeFour':'',
            'pNumbeFive':'',
            'pNumbeSix':'',
          })
          break;
          case 7:
          this.form.files.push({
            'index':this.form.files.length,
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
          // console.log(this.form.custFile)
          break;
        default:
          break;
      }
      
    },
    async sub(){
      // this.form.addresses=[
      //     {country:this.form.work,addressDetail:this.form.workAddress,addressType:'A02'},
      //     {country:this.form.reg,addressDetail:this.form.registAddress,addressType:'A01'}
      //   ]
      var data =this.form
      data.customerStatus =2
      data.addresses = [{addressType: "A01",
        // city: this.regAddress[1],
        country: this.reg,
        // custId: '',
        addressDetail: this.regAddress,
        // district: this.regAddress[2],
        id: '',
        // isDefault: 1,
        // province: this.regAddress[0]
        },
        {addressType: "A02",
        // city: this.workAddress[1],
        country: this.work,
        // custId: '',
        addressDetail: this.workAddress,
        // district: this.workAddress[2],
        id: '',
        // isDefault: 1,
        // province: this.workAddress[0]
        }
      ]
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
        this.form.addresses.forEach(item=>{
          if(item.addressType=='办公地址'){
            this.workDetailAddress = item.addressDetail
            this.workAddress = []
            this.workAddress.push(item.province)
            this.workAddress.push(item.city)
            this.workAddress.push(item.district)
          }else{
            this.regDetailAddress = item.addressDetail
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