<template>
  <div class="updateUserInfo">
    <div class="head clear">
     <el-page-header @back="goBack" content="个人信息修改">
    </el-page-header>
    </div>
    <div class="content">
      <div class="selBox">
        <el-form ref="form"  :model="form" class="form" label-position='top' :inline='true'>
          <el-collapse v-model="activeName1" @change="handleChange">
            <el-collapse-item name="1" >
              <template slot="title">
                <h3 style="padding:10px 0;color:purple">基本信息</h3>
              </template>
              <el-form-item label="编码">
              <el-input type="text" :disabled="true" size="small" v-model="form.outCode"></el-input>
              </el-form-item>
              <el-form-item label="名称">
              <el-input type="text" size="small" v-model="form.custName"></el-input>
              </el-form-item>
              <el-form-item label="简称">
                <el-input type="text" :disabled="true" size="small" v-model="form.custAbbreviation"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input type="text" size="small" v-model="form.custMobile"></el-input>
              </el-form-item>
              <el-form-item label="E-mail">
                <el-input type="text" size="small" v-model="form.custEmail"></el-input>
              </el-form-item>
              <el-form-item label="网站">
                <el-input type="text" size="small" v-model="form.custWeb"></el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item name='2'>
              <template slot="title">
                <h3 style="padding:10px 0;color:purple">背景信息</h3>
              </template>
              <el-form-item label="公司资产" >
                <el-input type="text" size="small" v-model="form.corportaeAssets"> </el-input>
              </el-form-item>
              <el-form-item label="注册日期" class="date">
                <el-date-picker size="small" v-model="form.registTime" type="date" value-format='yyyy-MM-dd'    placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template slot="title">
                <h3 style="padding:10px 0;color:purple" >开户行信息</h3>
              </template>
              <el-form-item label="银行名称">
                <el-input type="text" size="small" v-model="form.custBankInfo.bankName"></el-input>
              </el-form-item>
              <el-form-item label="账号">
                <el-input type="text" size="small" v-model="form.custBankInfo.bankAccount"></el-input>
              </el-form-item>
              <el-form-item label="银行识别码">
                <el-input type="text" size="small" v-model="form.custBankInfo.bankBic"></el-input>
              </el-form-item>
              <el-form-item label="银行地址" class="txt">
                <el-cascader
                  style="width:200"
                  v-model="form.custBankInfo.bankCountry"
                  :options="province"
                  separator='-'
                  size="small"
                  :props="prop"
                  placeholder="请选择省市区">
                </el-cascader>
                <el-input type="text" size="small" class="address" v-model="form.custBankInfo.bankDetailInfo"></el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item name="4">
              <template slot="title">
                <h3 style="padding:10px 0;color:purple">授信额度信息</h3>
              </template>
               <el-form-item label="授信额度初始值">
              <el-input type="text" :disabled="true" size="small" v-model="form.credit"></el-input>
            </el-form-item>
            <el-form-item label="授信额度占用值">
              <el-input type="text" :disabled="true" size="small" v-model="form.creditUSE"></el-input>
            </el-form-item>
            <el-form-item label="授信额度剩余值">
              <el-input type="text" :disabled="true" size="small" v-model="form.creditUnUSE"></el-input>
            </el-form-item>
            </el-collapse-item>
            <el-collapse-item name="5">
              <template slot="title">
                <h3 style="padding:10px 0;color:purple">介绍</h3>
              </template>
               <el-form-item class="txt" label="优势价值">
              <el-input type="textarea" size="small"   rows='4' v-model="form.advantagesIntroduction"> </el-input>
            </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="地址" name="eighth">
            <div class="tabBox">
               <el-table :data="form.addresses" style="width: 100%" height="300">
                <el-table-column prop="" width="300" label="地址类型" >
                  <template slot-scope="scope">
                    <el-select size="small" v-model="scope.row.addressType" >
                      <el-option  label="注册地址" value="A01"></el-option>
                      <el-option  label="办公地址" value="A02"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="300" label="地址" >
                  <template slot-scope="scope">
                    <el-cascader
                      v-model="scope.row.country"
                      :options="province"
                      size="small"
                      separator='-'
                      :props="prop"
                      placeholder="请选择省市区">
                      </el-cascader>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="200" label="详细地址" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.district"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="200" label="手机号" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.mobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="200" label="邮箱" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.eamil"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="" fixed="right" width="100">
                  <template slot="header">
                    <el-button type="primary" size="small" @click="add(10)">新增</el-button>
                  </template>
                  <template slot-scope='scope'>
                    <el-button type="text" size="small" @click="del(10,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="资产信息" name="first">
            <div class="tabBox">
               <el-table :data="form.assetsInformations" style="width: 100%" height="300">
                <el-table-column  prop="assetsYear" width="150" label="年份" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.assetsYear"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="季度" >
                   <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.assetsSeason"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="总资产" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.assetsTotal"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="净资产" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.assetsNet"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="营业额" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.revenue"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="总人数" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.totalStaff"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" fixed="right"  label="" width="100">
                  <template slot="header">
                    <el-button type="primary" size="small" @click="add(1)">新增</el-button>
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
          <el-tab-pane label="业务介绍" name="six">
            <div class="tabBox">
               <el-table :data="form.businessInformations" style="width: 100%" height="300">
                <el-table-column prop="" width="150" label="年份" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.businessYear"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="产品线一" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.productLine"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="产品线一销售额" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.revenuePlOne"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="产品线二销售额" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.revenuePlTwo"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="150" label="产品线三销售额" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.revenuePlThree"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" fixed="right" label="" width="100">
                  <template slot="header">
                    <el-button type="primary" size="small" @click="add(2)">新增</el-button>
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
                    <el-button type="primary" size="small" @click="add(3)">新增</el-button>
                  </template>
                  <template slot-scope='scope'>
                    <el-button type="text" size="small" @click="del(3,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="联系人" name="third">
            <div class="tabBox">
              <el-table :data="form.customerContacts" style="width: 100%" height="300">
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
                <!-- <el-table-column prop="" width="150"  label="股权占比" >
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.equityRatio"></el-input>
                  </template>
                </el-table-column> -->
                <el-table-column prop="" fixed="right" label="" width="100">
                  <template slot="header">
                    <el-button type="primary" size="small" @click="add(4)">新增</el-button>
                  </template>
                  <template slot-scope='scope'>
                    <el-button type="text" size="small" @click="del(4,scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="开票信息" name="second">
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
                    <el-button type="primary" size="small" @click="add(5)">新增</el-button>
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
          <el-tab-pane label="附件" name="fourth">
            <div class="tabBox">
              <el-table :data="form.files" style="width: 100%" height="300" class="file">
                <el-table-column prop="" label="类型"  width="200">
                  <template slot-scope="scope">
                    <el-select size="small"  v-model="scope.row.type" >
                      <el-option v-for="item in types" :key="item.id" :label="item.zhName" :value="item.pValue"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="400" label="文件" >
                  <!-- <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.title"></el-input>
                  </template> -->
                  <template slot-scope="scope">
                      <el-upload
                        v-if="!scope.row.custId"
                        class="upload-demo"
                        :action="serverUrl+'/customer/file'"
                        :auto-upload="true"
                        :on-change='changeFile'
                        :headers="{'Authorization':auth}"
                        name='file'
                        :data='{index:scope.$index}'
                        :on-success="uploadSuccess"
                        :limit="1"
                        :file-list="scope.row.fileList"
                        >
                        <el-button size="small" type="primary">选择文件</el-button>
                      </el-upload>
                      <a v-if="scope.row.custId" :download="scope.row.filePath" :href="scope.row.filePath">{{scope.row.fileName}}</a>
                  </template>
                </el-table-column>
                
                <el-table-column prop="" label="" fixed="right" width="100">
                  <template slot="header">
                    <el-button type="primary" size="small" @click="add(6)">新增</el-button>
                  </template>
                  <template slot-scope='scope'>
                    <el-button type="text" size="small" @click="del(6,scope.$index)">删除</el-button>
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
        <el-button type="primary" size="small"  @click="commit" plain>提交</el-button>
        <el-button type="primary" size="small" plain @click="goBack">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {getDealerInfo,updateDealerInfo} from '@/api/banner/banner.js'
  import {getType} from '@/api/system/param.js'
  import {serverUrl} from '@/axios/request.js'
  export default {
    name: "updateUserInfo",
    data() {
      return {
        data:{

        },
        auth:sessionStorage.getItem('data'),
        serverUrl:serverUrl,
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
        prop:{
          label:'name',
          value:'code',
          children:'list',
        },
        address:[],
        activeName1:['1','2','3','4','5'],
        form: {
          custBankInfo:{}
        },
        types:[],
        province:[],
        corporateTypes:[],
        departments:[],
        positions:[],
        activeName: 'eighth',
      }
    },
    created(){
      this.getData()
      this.getCity()
      this.getDealerInfo()
    },
    methods: {
      getCity() {
      this.$http({
        method: "get",
        url: "static/cityL3.json"
      })
        .then(res => {
          // console.log("城市list", res);
          this.province = res.data;
        })
        .catch(error => {
          // console.log(error);
          alert("系统异常");
        });
    },
      uploadSuccess(res,file,fileList){
        // console.log(res,file,fileList)
        // console.log(res.data.fileId)
        if(res.code ==1){
          this.form.files[res.data.index].fileId = res.data.fileId
        }
      },
      changeFile(file,fileList){
        
      },
      getData(){
        this.getType(2,11)
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
        // console.log('关系类型',res)
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
          
        }
      },
      
      handleChange(value) {
        // console.log(value);
      },
      //删除行数据
      del(type,index){
        switch (type) {
          case 1:
            this.form.assetsInformations.splice(index,1)
            break;
          case 2:
            this.form.businessInformations.splice(index,1)
            break;
            case 3:
            this.form.relationships.splice(index,1)
            break;
            case 4:
            this.form.customerContacts.splice(index,1)
            break;
            case 5:
            this.form.invoiceInfos.splice(index,1)
            break;
            case 6:
            this.form.files.splice(index,1)
            break;
            case 7:
            this.form.sales.splice(index,1)
            break;
            case 10:
            this.form.addresses.splice(index,1)
            break;
          default:
            break;
        }
      },
      //新增行数据
      add(type){
        switch (type) {
          case 1:
            this.form.assetsInformations.unshift({
              assetsYear:'',
              assetsSeason:'',
              assetsTotal:'',
              assetsNet:'',
              revenue:'',
              totalStaff:'',
            })
            break;
          case 2:
            this.form.businessInformations.unshift({
              businessYear:'',
              productLine:'',
              revenuePlOne:'',
              revenuePlTwo:'',
              revenuePlThree:'',
            })
            break;
          case 3:
            this.form.relationships.unshift({
              corporateName:'',
              corporateType:'',
            })
            break;
          case 4:
            this.form.customerContacts.unshift({
              contactName:'',
              mobile:'',
              email:'',
              department:'',
              subDepartment:'',
              position:'',
            })
            break;
          case 5:
            this.form.invoiceInfos.unshift({
              purchasingUnit:'',
              shippingAddress:'',
              shippingMobile:'',
              taxpayerRegistrationNumber:'',
              currency:'',
            })
            break;
          case 6:
            this.form.files.unshift({
              fileId:'',
              fileType: '',
              fileList:[]
            })
            break;
          case 7:
            this.form.sales.unshift({
              salesOrganize:'',
              distributionChannel:'',
              deliveryPlant:'',
            })
            break;
          case 10:
            this.form.addresses.unshift({
              'addressType':'',
            'country':'',
            'district':'',
            'mobile':'',
            'eamil':'',
            })
            break;
          default:
            break;
        }
      },
      //监听col展开
      handleChange(val){
        // console.log(val)
      },
      //返回按钮
      goBack(){
        window.history.go(-1)
      },
      //切换tab
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      // 表单验证
      submitForm(formName) { },
      resetForm(formName) { },
      //提交
      async commit() {
        // this.form.addresses=[
        //   {country:this.form.work,addressDetail:this.form.workAddress,addressType:'A02'},
        //   {country:this.form.reg,addressDetail:this.form.registAddress,addressType:'A01'}
        // ]
        if(typeof(this.form.custBankInfo.bankCountry)!='string'){
          this.form.custBankInfo.bankCountry =  this.form.custBankInfo.bankCountry.join(',')
        }
        this.form.addresses.forEach((item)=>{
          if(typeof(item.country)!='string'){
            item.country = item.country.join(',')
          }
          })
        const res = await updateDealerInfo(this.form)
        // console.log('修改结果',res);
        if(res){
          this.$message.success('修改成功')
          this.goBack()
        }
      },
      async getDealerInfo(){
        const res = await getDealerInfo();
        // console.log('代理商信息',res)
        if(res){
          this.form = res.data.data 
          this.form.custBankInfo.bankCountry = res.data.data.custBankInfo.bankCountry.split(',')
          res.data.data.addresses.forEach((item,index)=>{
              this.form.addresses[index].country = item.country.split(',')
          })
        }
      },
    }
  };
</script>
<style lang='scss'>
  $sc: 12;
  .updateUserInfo {
    overflow-y: auto;
    height: 100%;
    
    .upload-demo{
      display: flex;
      align-items: center;
      ul{
      }
    }
    .file{
      td{
        padding: 10px;
      }
    }
    .head {
      padding:10px 40px;
    }
    .content {
      height: 100%;
      // background: pink;
      padding: 0 30px 20px;

      .selBox {
        padding: 0 20px 10px 20px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        background: #fff;

        .form {
          max-width: 1300px;
          width: 100%;
          
          .el-form-item {
            margin-bottom: 0;
            width: 200px;

            .el-form-item__label {
              height: 30px;
            }
          }
          .el-date-editor{
            width: 200px;
          }
          .txt{
            width: 100%;
            .el-cascader{
              width: 200px;
              margin-right: 10px;
            }
            .address{
              width: 414px;
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
          bottom: 26px;
          padding: 10px;

          .el-pagination {
            width: 100%;
            text-align: center
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