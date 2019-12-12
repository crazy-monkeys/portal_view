<template>
  <!-- 添加新增控件 -->
  <div class="customerAdd">
    <div class="head clear">
      <el-page-header @back="back" content="明细"></el-page-header>
    </div>
    <div class="content">
      <div class="selBox">
        <el-form ref="form" :model="form" disabled label-position="top" class="form">
          <el-row :gutter="22">
            <el-col :span="6">
              <el-form-item label="客户名称">
                <el-input size="small" v-model="form.custName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户英文名">
                <el-input size="small" v-model="form.custEnName"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="6">
              <el-form-item label="客户简称">
                <el-input size="small" v-model="form.custAbbreviation"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户类型">
                <el-select v-model="form.businessType" size="small" filterable placeholder="请选择">
                  <el-option
                    v-for="item in businessTypes"
                    :key="item.pValue"
                    :label="item.zhName"
                    :value="item.pValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否License客户">
                <el-select v-model="form.isLicense" size="small" placeholder="请选择">
                  <el-option label="是" :value="1"></el-option>
                  <el-option label="否" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="角色">
                <el-select v-model="form.custRole" size="small" placeholder="请选择">
                   <el-option label="中国客户" value="Z001"></el-option>
                  <el-option label="亚太客户" value="Z002"></el-option>
                  <!-- <el-option label="北美客户" value="Z003"></el-option> -->
                  <el-option label="内部客户" value="Z010"></el-option>
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
                <el-input size="small" v-model="form.custEmail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公司网站">
                <el-input size="small" v-model="form.custWeb"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话">
                <el-input size="small" v-model="form.custMobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册时间" size="small" class="date">
                <el-input v-model="form.registTime"></el-input>
                <!-- <el-date-picker v-model="form.registerTime" type="date" placeholder="选择日期"></el-date-picker> -->
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="注册地址">
                <el-row :gutter="22">
                  <el-col :span="12">
                    <el-cascader
                      v-model="reg"
                      :options="province"
                      separator="-"
                      size="small"
                      :props="prop"
                      placeholder="请选择省市区"
                    ></el-cascader>
                  </el-col>
                  <el-col :span="12">
                    <el-input size="small" v-model="regAddress" placeholder="详细地址"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="办公地址">
                <el-row :gutter="22">
                  <el-col :span="12">
                    <el-cascader
                      v-model="work"
                      :options="province"
                      size="small"
                      separator="-"
                      :props="prop"
                      placeholder="请选择省市区"
                    ></el-cascader>
                  </el-col>
                  <el-col :span="12">
                    <el-input size="small" v-model="workAddress" placeholder="详细地址"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col> -->
          </el-row>

          <el-form-item label="业务介绍" class="txt">
            <el-input
              type="textarea"
              v-model="form.businessIntroduction"
              :rows="2"
              placeholder
              resize="none"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane label="地址" name="eighth">
            <div class="tabBox">
               <el-table :data="form.addresses" style="width: 100%" height="300">
                <el-table-column prop="" width="300" label="地址类型" >
                  <template slot-scope="scope">
                    <el-select disabled size="small" v-model="scope.row.addressType" >
                      <el-option  label="注册地址" value="A01"></el-option>
                      <el-option  label="办公地址" value="A02"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="300" label="地址" >
                  <template slot-scope="scope">
                    <el-cascader
                      disabled
                      v-model="scope.row.country"
                      :options="province"
                      size="small"
                      separator='-'
                      :props="prop"
                      placeholder="请选择省市区">
                      </el-cascader>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="200" label="城市" >
                  <template slot-scope="scope">
                    <el-input disabled size="small" v-model="scope.row.city"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="200" label="详细地址" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.district"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="200" label="手机号" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.mobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="200" label="邮箱" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.eamil"></el-input>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="开票信息" name="first">
            <div class="tabBox">
               <el-table :data="form.invoiceInfos" style="width: 100%" height="300">
                <el-table-column prop="" width="150" label="购货单位" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.purchasingUnit"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="交货地址" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.shippingAddress"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="手机号" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.shippingMobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="纳税人登记号" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.taxpayerRegistrationNumber"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="币种" >
                  <template slot-scope="scope">
                    <el-select size="small" disabled v-model="scope.row.currency" >
                      <el-option v-for="item in currences" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
                    </el-select>
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
                    <el-select size="small" disabled v-model="scope.row.type" >
                      <el-option v-for="item in contactTypes" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop=""  width="150" label="姓名" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.contactName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop=""  width="150" label="电话" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.mobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150"  label="邮箱" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.email"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150"  label="部门" >
                  <template slot-scope="scope">
                    <el-select size="small" disabled v-model="scope.row.department" >
                      <el-option v-for="item in departments" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150"  label="二级部门" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.subDepartment"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150"  label="职位" >
                  <template slot-scope="scope">
                    <el-select size="small" disabled v-model="scope.row.position" >
                      <el-option v-for="item in positions" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop=""  width="150"  label="股权占比" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.equityRatio"></el-input>
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
                    <el-input size="small" disabled v-model="scope.row.strOne"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="股东名称" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.strName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="股东占比（%）" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.strValue"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="股东性质" >
                  <template slot-scope="scope">
                    <el-select size="small"  disabled v-model="scope.row.strTwo">
                      <el-option value="A1" label="公司"></el-option>
                      <el-option value="A2" label="自然人"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="公司性质" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.strThree"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="是否公司管理层" >
                  <template slot-scope="scope">
                    <el-select size="small"  disabled v-model="scope.row.strFour">
                      <el-option value="Y" label="Y"></el-option>
                      <el-option value="N" label="N"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="职务" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.strFive"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="部门" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.strSix"></el-input>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="销售团队" name="fourth">
            <div class="tabBox">
              <el-table :data="form.accountTeams" style="width: 100%" height="300">
                <el-table-column  label="角色类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                     <el-select size="small"  disabled v-model="scope.row.roleType">
                      <el-option value="001" label="PM"></el-option>
                      <el-option value="002" label="Sales"></el-option>
                      <el-option value="003" label="FAE"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="名称" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.accountName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="手机号" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.accountMobile"></el-input>
                  </template>
                </el-table-column>
                
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane> -->
          <el-tab-pane label="展锐销售团队" name="eight">
            <div class="tabBox">
              <el-table :data="form.zrAccountTeams" style="width: 100%" height="300">
                <el-table-column  label="角色类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-select size="small"  disabled v-model="scope.row.roleType">
                      <el-option value="142" label="负责销售"></el-option>
                      <el-option value="46" label="销售人员"></el-option>
                      <el-option value="211" label="客户团队成员"></el-option>
                      <el-option value="213" label="合作伙伴联系人"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="销售" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-select size="small"  disabled v-model="scope.row.employeeId">
                      <el-option v-for="item in employeeIds" :key="item.userNo" :label="item.userName" :value="item.userNo"></el-option>
                    </el-select>
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
                    <el-select disabled v-model="scope.row.corporateName" size="small" clearable filterable> 
                      <el-option v-for="item in executors" :key='item.inCode' :value="item.inCode" :label="item.custName"> </el-option> 
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="关系类型" >
                  <template slot-scope="scope">
                    <el-select size="small" disabled v-model="scope.row.corporateType" >
                      <el-option v-for="item in corporateTypes" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
                    </el-select>
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
                    <el-input size="small" disabled v-model="scope.row.product"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份一" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.pNumberOne"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份二" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.pNumberTwo"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份三" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.pNumberThree"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份四" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.pNumberFour"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份五" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.pNumberFive"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份六" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.pNumberSix"></el-input>
                  </template>
                </el-table-column>
               
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="销售营业额" name="nine">
            <div class="tabBox">
              <el-table :data="form.quotas" style="width: 100%" height="300">
                <el-table-column prop="" label="填报年份" >
                  <template slot-scope="scope">
                    <el-input size="small" disabled v-model="scope.row.salesYear"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="币种" >
                  <template slot-scope="scope">
                    <el-select size="small" disabled v-model="scope.row.currency" >
                      <el-option  label="USD" value="USD"></el-option>
                      <el-option  label="RMB" value="RMB"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="单位" >
                  <template slot-scope="scope">
                    <el-select size="small" disabled v-model="scope.row.unit" >
                      <el-option  label="K/千" value="001"></el-option>
                      <el-option  label="10K/万 " value="002"></el-option>
                      <el-option  label="M/百万" value="003"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="销售额" >
                  <template slot-scope="scope">
                    <el-input size="small"  disabled v-model="scope.row.salesNumber"></el-input>
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
              <el-table :data="form.files" style="width: 100%" height="300" >
                <el-table-column type="index"  label="" v-if='false' show-overflow-tooltip>
                </el-table-column>
                <el-table-column  label="附件类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-select size="small" disabled  v-model="scope.row.type" >
                      <el-option v-for="item in types" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column  label="附件" show-overflow-tooltip>
                  <template slot-scope="scope">
                      <a  :download="scope.row.filePath" :href="scope.row.filePath">{{scope.row.fileName}}</a>
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
    </div>
  </div>
</template>

<script>
import { detail } from "@/api/customer/query.js";
import {getType} from '@/api/system/param.js'
import {getEmployeeIds} from '@/api/customer/query.js'
  import {getAll} from '@/api/business/rebate.js'

export default {
  name: "customerAdd",
  data() {
    return {
      executors:[],
      employeeIds:[],
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
      prop: {
        label: "name",
        value: "code",
        children: "list"
      },
      form: {
        advantageIntroduction: "",
        advantageValue: "",
        addresses: [],
        basicBank: {},
        basicContact: [],
        basicFile: [],
        basicInvoice: [],
        basicLables: "",
        basicShip: [],
        basicStructure: [],
        businessIntroduction: "",
        businessType: "",
        corporateAssets: "",
        corporateNumber: "",
        corporateParents: "",
        creditEngagedValue: "",
        creditInitalValue: "",
        creditSurplus: "",
        custAbbreviation: "",
        custEmail: "",
        custEnName: "",
        custFax: "",
        custInCode: "",
        custMobile: "",
        custOutCode: "",
        custPhoneNo: "",
        custRole: "",
        custType: "",
        custWeb: "",
        custZhName: "",
        customerStatus: "",
        dealerStatus: "",
        id: "",
        isLicense: "",
        isWhiteList: "",
        registerTime: "",
        registerTimeStr: "",
        sales: [],
        salesTeam: []
      },
      businessTypes: [
      
      ],
      province: [],
      reg: "",
      work: "",
      regAddress: "",
      workAddress: "",
      activeName: "eighth",
      currentPage: 1,
      pageSize: 50,
      total: 0
    };
  },
  created() {
    this.getData()
    this.getCity();
    this.getAll();
    this.getDetail();
  },
  watch: {
    workAddress: {
      handler: function(n, o) {
        // //console.log(n);
      }
    }
  },
  computed: {
    queryId() {
      return this.$route.query.id;
    }
  },
  methods: {
    async getAll(){
        const res = await getAll();
        // //console.log('所有执行方',res);
        if(res){
          this.executors = res.data.data;
        }
      },
    getData(){
        this.getType(2,11)
        this.getType(2,1)
        this.getType(2,6)
        this.getType(2,5)
        this.getType(2,7)
        this.getType(2,9)
        this.getEmployeeIds()
    },
    async getEmployeeIds(){
      const res = await getEmployeeIds();
      // //console.log('销售列表',res)
      if(res){
       this.employeeIds = res.data.data
      }
    },
    async getType(model,func){
      const data ={
        model:model,
        func:func,
      }
      const res = await getType(data);
      // //console.log('关系类型',res)
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
        if(func==1){
          this.businessTypes = res.data.data
        }
      }
    },
    getCity() {
      this.$http({
        method: "get",
        url: "static/cityL3.json"
      })
        .then(res => {
          // //console.log("城市list", res);
          this.province = res.data;
        })
        .catch(error => {
          // //console.log(error);
          alert("系统异常");
        });
    },
    async getDetail() {
      var data = {
        id: this.queryId
      };
      const res = await detail(data);
      // //console.log("详情", res);
      if (res) {
        this.form = res.data.data;
        res.data.data.addresses.forEach((item,index)=>{
              this.form.addresses[index].country = item.country.split(',')
          })
      }
    },
    handleClick(tab, event) {
      // //console.log(tab, event);
    },
    back() {
      window.history.back();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;

.customerAdd {
  height: 100%;
  overflow-y: auto;
  padding: 0 20px;
  .head {
    padding: 10px 20px;
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
          .el-cascader {
            width: 100%;
          }
          .el-select {
            width: 100%;
            .el-input {
              width: 100%;
            }
          }
          .el-input {
            width: 100%;
          }
          .el-form-item__label {
            height: 30px;
          }
        }
        .txt {
          width: 100%;
        }
        .date {
          .el-form-item__content {
            line-height: 40px;
          }
          width: 100%;
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
      
      .el-cascader{
        width: 100%
      }
      .el-select{
        width: 100%
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