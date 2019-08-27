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
              <el-form-item label="注册日期">
                <el-input type="text" size="small" v-model="form.registTime"></el-input>
              </el-form-item>
              <el-form-item label="公司人数">
                <el-input type="text" size="small" v-model="form.staffNumber"></el-input>
              </el-form-item>
              <el-form-item label="注册地址" class="txt">
                <el-input type="text" size="small" v-model="form.registAdress"></el-input>
              </el-form-item>
              <el-form-item label="办公地址" class="txt">
                <el-input type="text" size="small" v-model="form.workAdress"></el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template slot="title">
                <h3 style="padding:10px 0;color:purple" >开户行信息</h3>
              </template>
              <el-form-item label="银行名称">
                <el-input type="text" size="small" v-model="form.custBankInfo.bankName"></el-input>
              </el-form-item>
              <el-form-item label="银行地址">
                <el-input type="text" size="small" v-model="form.custBankInfo.bankDetailInfo"></el-input>
              </el-form-item>
              <el-form-item label="账号">
                <el-input type="text" size="small" v-model="form.custBankInfo.bankAccount"></el-input>
              </el-form-item>
              <el-form-item label="银行识别码">
                <el-input type="text" size="small" v-model="form.custBankInfo.bankBic"></el-input>
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
          <el-tab-pane label="资产信息" name="first">
            <div class="tabBox">
               <el-table :data="form.assetsInformations" style="width: 100%" height="300">
                <el-table-column  prop="assetsYear" label="年份" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.assetsYear"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="季度" show-overflow-tooltip>
                   <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.assetsSeason"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="总资产" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.assetsTotal"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="净资产" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.assetsNet"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="营业额" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.revenue"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="总人数" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.totalStaff"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="" width="100">
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
                <el-table-column prop="" label="年份" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.businessYear"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="产品线" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.productLine"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份一" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.revenuePlOne"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份二" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.revenuePlTwo"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="月份三" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.revenuePlThree"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="" width="100">
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
                <el-table-column prop="" label="名称" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.corporateName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="关系类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.corporateType"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="" width="100">
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
                <el-table-column prop="" label="姓名" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.contactName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="电话" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.mobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="邮箱" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.email"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="部门" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.department"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="二级部门" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.subDepartment"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="职位" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.position"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="股权占比" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.equityRatio"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="" width="100">
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
                <el-table-column prop="" label="购货单位" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.purchasingUnit"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="交货地址" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.shippingAddress"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="手机号" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.shippingMobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="纳税人登记号" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.taxpayerRegistrationNumber"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="币种" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.currency"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="" width="100">
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
              <el-table :data="form.files" style="width: 100%" height="300">
                <el-table-column prop="" label="标题" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.title"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.type"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="上传时间" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.uploadTime"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="" width="100">
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
          <el-tab-pane label="销售数据" name="seven">
            <div class="tabBox">
              <el-table :data="form.sales" style="width: 100%" height="300">
                <el-table-column prop="" label="公司代码" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.salesOrganize"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="分销渠道" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.distributionChannel"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="交货工厂" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.deliveryPlant"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="" width="100">
                  <template slot="header">
                    <el-button type="primary" size="small" @click="add(7)">新增</el-button>
                  </template>
                  <template slot-scope='scope'>
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
        <el-button type="primary" size="small"  @click="commit" plain>提交</el-button>
        <el-button type="primary" size="small" plain @click="goBack">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {getDealerInfo,updateDealerInfo} from '@/api/banner/banner.js'
  export default {
    name: "updateUserInfo",
    data() {
      return {
        activeName1:['1','2','3','4','5'],
        form: {
          custBankInfo:{}
        },
        activeName: 'first',
      }
    },
    created(){
      this.getDealerInfo()
    },
    methods: {
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
              title:'',
              type:'',
              uploadTime:'',
            })
            break;
          case 7:
            this.form.sales.unshift({
              salesOrganize:'',
              distributionChannel:'',
              deliveryPlant:'',
            })
            break;
          default:
            break;
        }
      },
      //监听col展开
      handleChange(val){
        console.log(val)
      },
      //返回按钮
      goBack(){
        window.history.go(-1)
      },
      //切换tab
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // 表单验证
      submitForm(formName) { },
      resetForm(formName) { },
      //提交
      async commit() {
        const res = await updateDealerInfo(this.form)
        console.log('修改结果',res);
        if(res){
          this.$message.success('新增成功')
          this.goBack()
        }
      },
      async getDealerInfo(){
        const res = await getDealerInfo();
        console.log('代理商信息',res)
        if(res){
          this.form = res.data.data 
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
          .txt{
            width: 100%;
          }

        }
      }

      .tab {
        background: #fff;
        padding: 20px;

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