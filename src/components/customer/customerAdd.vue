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
              <el-form-item label="客户类型">
                <el-select v-model="form.businessType" size="small" filterable placeholder="请选择">
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
                <el-select v-model="form.isLicense" size="small" placeholder="请选择">
                  <el-option label="是" :value="1"></el-option>
                  <el-option label="否" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="角色">
                <el-select v-model="form.custRole" size="small" placeholder="请选择">
                  <el-option label="中国客户" :value="1"></el-option>
                  <el-option label="亚太客户" :value="2"></el-option>
                  <el-option label="北美客户" :value="3"></el-option>
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
            <el-col :span="12">
              <el-form-item label="注册地址">
                <el-row :gutter="22">
                  <el-col :span="12">
                    <el-cascader
                      v-model="regAddress"
                      :options="province"
                      separator="-"
                      size="small"
                      :props="prop"
                      placeholder="请选择省市区"
                    ></el-cascader>
                  </el-col>
                  <el-col :span="12">
                    <el-input size="small" v-model="regDetailAddress" placeholder="详细地址"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="办公地址">
                <el-row :gutter="22">
                  <el-col :span="12">
                    <el-cascader
                      v-model="workAddress"
                      :options="province"
                      size="small"
                      separator="-"
                      :props="prop"
                      placeholder="请选择省市区"
                    ></el-cascader>
                  </el-col>
                  <el-col :span="12">
                    <el-input size="small" v-model="workDetailAddress" placeholder="详细地址"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
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
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="开票信息" name='first'>
            <div class="tabBox">
              <el-table :data="form.invoiceInfos" style="width: 100%" height="300">
                <el-table-column  prop="purchasingUnit" label="购货单位" >
                </el-table-column>
                <el-table-column prop="shippingAddress" label="收货地址" >
                </el-table-column>
                <el-table-column prop="shippingMobile" label="收货手机号" >
                </el-table-column>
                <el-table-column prop="taxpayerRegistrationNumber"  label="纳税人登记号">
                </el-table-column>
                <el-table-column prop="currency"  label="币种">
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="联系人" name='aa'>
            <div class="tabBox">
              <el-table :data="form.customerContacts" style="width: 100%" height="300">
                <el-table-column prop="contactType" label="联系人类型" >
                  <template slot-scope="scope">
                    {{scope.row.type =='C01'?'出货数据确认人' :'Rebate确认人'}}
                  </template>
                </el-table-column>
                <el-table-column prop="contactName" label="姓名" >
                </el-table-column>
                <el-table-column prop="department" label="部门" >
                 
                </el-table-column>
                <el-table-column prop="contactPosition"  label="职位">
                 
                </el-table-column>
                <el-table-column prop="contactMobile"  label="联系方式">
               
                </el-table-column>
                <el-table-column prop="contactEmail"  label="邮箱">
               
                </el-table-column>
                <el-table-column  label="是否关键决策人">
                  <template slot-scope="scope">
                    {{scope.row.isDecisionMaker ==1?'是' :'否'}}
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="股权结构" name="aaa">
            <div class="tabBox">
              <el-table :data="form.custStructure" style="width: 100%" height="300">
                <el-table-column prop="1" label="股东名称" >
                </el-table-column>
                <el-table-column prop="1" label="股东占比(%)" show-overflow-tooltip>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="展锐销售团队" name="third">
            <div class="tabBox">
              <el-table :data="form.accountTeams" style="width: 100%" height="300">
                <el-table-column  label="角色类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-select size="small" disabled v-model="scope.row.roleId" >
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
              <el-table :data="form.relationships" style="width: 100%" height="300">
                <el-table-column prop="corporateName" label="名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="" label="关系类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                     <el-select size="small" disabled v-model="scope.row.corporateType">
                      <el-option :value="1" label="类型1"></el-option>
                      <el-option :value="2" label="类型2"></el-option>
                    </el-select>
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
                <el-table-column prop="salesOrganize" label="公司代码" >
                </el-table-column>
                <el-table-column prop="distributionChannel" label="分销渠道" >
                </el-table-column>
                <el-table-column prop="deliveryPlant" label="交货工厂">
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="展锐产品型号" name="a1111">
            <div class="tabBox">
              <el-table :data="form.sales" style="width: 100%" height="300">
                <el-table-column prop="salesOrganize" label="物料" >
                 
                </el-table-column>
                <el-table-column prop="distributionChannel" label="月份一" >
                 
                </el-table-column>
                <el-table-column prop="distributionChannel" label="月份二" >
                 
                </el-table-column>
                <el-table-column prop="distributionChannel" label="月份三" >
                 
                </el-table-column>
                <el-table-column prop="distributionChannel" label="月份四" >
                 
                </el-table-column>
                <el-table-column prop="distributionChannel" label="月份五" >
                 
                </el-table-column>
                <el-table-column prop="distributionChannel" label="月份六" >
                  
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </el-tab-pane>
           <el-tab-pane label="附件" name="fourth">
            <div class="tabBox">
              <el-table :data="form.files" style="width: 100%" height="300" @row-click='rowClick'>
                <el-table-column type="index"  label="" v-if='false' show-overflow-tooltip>
                </el-table-column>
                <el-table-column  label="附件类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-select size="small" disabled v-model="scope.row.fileType">
                      <el-option :value="1" label='营业执照'></el-option>
                      <el-option :value="2" label='银行开户证明'></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column  label="附件" prop='fileName' show-overflow-tooltip>
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

export default {
  name: "customerAdd",
  data() {
    return {
      prop: {
        label: "name",
        value: "name",
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
        {
          value: 1,
          label: "Mass Market"
        },
        {
          value: 2,
          label: "Account Market"
        }
      ],
      province: [],
      regDetailAddress: "",
      workDetailAddress: "",
      regAddress: "",
      workAddress: "",
      activeName: "first",
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getCity();
    this.getDetail();
  },
  watch: {
    workAddress: {
      handler: function(n, o) {
        console.log(n);
      }
    }
  },
  computed: {
    queryId() {
      return this.$route.query.id;
    }
  },
  methods: {
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
    async getDetail() {
      var data = {
        id: this.queryId
      };
      const res = await detail(data);
      console.log("详情", res);
      if (res) {
        this.form = res.data.data;
        this.form.addresses.forEach(item => {
          if (item.addressType == "办公地址") {
            this.workDetailAddress = item.addressDetail;
            this.workAddress = [];
            this.workAddress.push(item.province);
            this.workAddress.push(item.city);
            this.workAddress.push(item.district);
          } else {
            this.regDetailAddress = item.addressDetail;
            this.regAddress = [];
            this.regAddress.push(item.province);
            this.regAddress.push(item.city);
            this.regAddress.push(item.district);
            console.log(this.regAddress);
          }
        });
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
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