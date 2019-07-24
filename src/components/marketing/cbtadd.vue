<template>
  <!-- 添加新增控件 -->
  <div class="cbtadd">
    <div class="head clear">
      <el-page-header @back="back" content="新建">
    </el-page-header>
    </div>
    <div class="content">
      <div class="selBox">
        <el-form ref="form" :model="form" label-position="top" class="form" :inline="true">
          
          <el-form-item label="类别"  class="all">
            <el-radio-group v-model="radio">
              <el-radio label='1' >保价</el-radio>
              <el-radio label='2'>差价补偿</el-radio>
              <el-radio label='3'>换货</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发货方编码">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="公司">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="申请时候" class="date">
            <el-date-picker size="small" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="计划入账日期" class="date">
            <el-date-picker v-model="value1" size="small" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="币种">
            <el-select v-model="value1" size="small" filterable placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="CR金额">
            <el-input size="small"></el-input>
          </el-form-item>
          
          <el-form-item label="内部客户名称">
            <el-select  size="small" v-model="value1" placeholder="请选择">
              <el-option  label="是" value="1"></el-option>
              <el-option  label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外部客户名称">
            <el-select size="small" v-model="value1" placeholder="请选择">
              <el-option  label="中国客户" value="1"></el-option>
              <el-option  label="亚太客户" value="2"></el-option>
              <el-option  label="北美客户" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原因" class="txt">
            <el-input type="textarea" v-model="form.txt" :rows="2" placeholder resize="none"></el-input>
          </el-form-item>
          <el-form-item label="备注" class="txt">
            <el-input type="textarea" v-model="form.txt" :rows="2" placeholder resize="none"></el-input>
          </el-form-item>
          <el-form-item label="附件" class="txt">
            <el-upload
              class="upload-demo"
              action=""
              multiple
              :limit="3"
              :file-list="fileList"
              >
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="tab">
        <div class="btns">
          <el-button type="primary" size="small">下载模版</el-button>
          <el-button type="primary" size="small">上传</el-button>
        </div>
        <div class="tabBox">
          <el-table :data="tableData3" border="" style="width: 100%" height="500">
            <el-table-column prop="t31" v-if="radio==1" label="类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t31" label="发货公司" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t31" v-if="radio==1" label="产品线" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t31"  label="BU" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t32" label="PDT" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t33"  show-overflow-tooltip label="平台">
            </el-table-column>
            <el-table-column prop="t33" show-overflow-tooltip label="产品型号">
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==1" show-overflow-tooltip label="数量">
            </el-table-column>
            <el-table-column prop="t33" show-overflow-tooltip label="币种">
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==1" show-overflow-tooltip label="价格">
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==1" show-overflow-tooltip label="客户属性">
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==1" show-overflow-tooltip label="金额">
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==1" show-overflow-tooltip label="产品">
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==3" show-overflow-tooltip label="换货日期">
            </el-table-column>
            <el-table-column prop="t33" show-overflow-tooltip label="备注" >
            </el-table-column>

            <el-table-column prop="t33" v-if="radio==2"   show-overflow-tooltip label="库存数量" >
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==2"  show-overflow-tooltip label="收货时间" >
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==2"  show-overflow-tooltip label="库存价格" >
            </el-table-column>
            <el-table-column prop="t33"  v-if="radio==2" show-overflow-tooltip label="新价格" >
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==2" show-overflow-tooltip label="保价金额" >
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==2"  show-overflow-tooltip label="调价时间" >
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==2" show-overflow-tooltip label="调价金额" >
            </el-table-column>
            

            <el-table-column prop="t33" v-if="radio==3" show-overflow-tooltip label="数量" >
            </el-table-column>
            <el-table-column prop="t33"  v-if="radio==3" show-overflow-tooltip label="客户提货单位" >
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==3" show-overflow-tooltip label="代理商提货单位" >
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==3" show-overflow-tooltip label="差价金额" >
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==3" show-overflow-tooltip label="出货时间" >
            </el-table-column>
            <el-table-column prop="t33" v-if="radio==3" show-overflow-tooltip label="发货公司" >
            </el-table-column>
            <el-table-column prop="" show-overflow-tooltip label="操作" fixed="right" width="80">
              <template>
                <el-button type="text" size="small"> 删除 </el-button>
              </template>
            </el-table-column>
            <div slot="empty">
              无数据
            </div>
          </el-table>
        </div>
      </div>
      <div class="sub">
        <el-button size="small" type="primary">提交</el-button>
        <el-button size="small" type="primary" plain>取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
export default {
  name: "cbtadd",
  data() {
    return {
      radio:'',
      fileList:[],
      tableData5:[
      ],
      tableData2:[
      ],
      tableData3:[
      ],
      options1: [
        {
          value: "选项1",
          label: "Mass Market"
        },
        {
          value: "选项2",
          label: "Account Market"
        }
      ],
      value1: "",

      options2: [
        {
          value: "选项1",
          label: "销售A"
        },
        {
          value: "选项2",
          label: "销售B"
        }
      ],
      value2: "",

      options3: [
        {
          value: "选项1",
          label: "阿米巴A"
        },
        {
          value: "选项2",
          label: "阿米巴B"
        }
      ],
      value3: "",

      options4: [
        {
          value: "选项1",
          label: "上海"
        },
        {
          value: "选项2",
          label: "北京"
        }
      ],
      value4: "",
      options5: [
        {
          value: "选项1",
          label: "上海"
        },
        {
          value: "选项2",
          label: "北京"
        }
      ],
      value5: "",
      options6: [
        {
          value: "选项1",
          label: "静安"
        },
        {
          value: "选项2",
          label: "王府井"
        }
      ],
      value6: "",

      form: {},
      activeName: "first",
      tableData: [],
      tableData1: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  watch:{
    radio:{
      handler:function(n,o){
        console.log(n)
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
      console.log(item);
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

.cbtadd {
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