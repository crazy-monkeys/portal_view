<template>
  <div class="price-inquiry">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/price/inquiry'>价格管理</el-breadcrumb-item>
          <el-breadcrumb-item>询价</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <h1>客户查询</h1> -->
      </div>

      <div class="sels clear">
        <!-- <el-button @click='change'  size='small' type='primary' plain>{{!dialogVisible ? '展开筛选条件' :'收起筛选条件'}}
          </el-button> -->
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>

          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>

          <!-- <div class="line"></div> -->
        </div>
        <!-- <transition-group enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"> -->
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="留下产品型号">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="审批状态">
            <el-select v-model="value" size="small" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain>查询</el-button>
            <el-button @click='dialogVisible = true' size='small' type='primary' plain>重置</el-button>
            
          </el-form-item>
        </el-form>
        <!-- </transition-group> -->

      </div>

      <!-- </transition-group> -->
      <div class="box">
        <div class="btns">
          <el-button class="add" size='small' type='primary' @click='create' >新建</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column type="index" width='100' label="序号" :index='q'>
            </el-table-column>
            <el-table-column prop="1"  width='100' show-overflow-tooltip label="申请时间">
            </el-table-column>
            <el-table-column prop="2"  width='100' label="审批状态" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="3"  width='100' label="审批意见" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t1" width='80' show-overflow-tooltip label="状态">
            </el-table-column>
            <el-table-column prop="t1" width='80' show-overflow-tooltip label="BU">
            </el-table-column>
            <el-table-column prop="t2" width='80' label="PDT" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t3" width='150' label="Product Type" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t4" width='100' show-overflow-tooltip label="平台">
            </el-table-column>
            <el-table-column prop="t5" width='150' label="产品型号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column show-overflow-tooltip width='150' prop="t7" label="目录价格">
            </el-table-column>
             <el-table-column show-overflow-tooltip width='150' prop="t8" label="内部客户">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="t9" width='150' label="生效时间">
            </el-table-column>


            <el-table-column show-overflow-tooltip prop="t10" width='150' label="失效时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="t11" width='150' label="更新时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="t12" width='150' label="备注">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="操作" fixed='right'>
              <template scope-slot='scope'>
                <el-button type='text' size='small' @click='create'>生成报价单</el-button>
              </template>
            </el-table-column>
            <div slot="empty">

              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 100]" :page-size="10" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
        
      </div>
    </div>
<el-dialog title="新建询价单" :visible.sync="dialogCreate" width="50%">
      <div class="sels clear">
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true'>
          <el-form-item label="产品型号" class="inp">
            <el-input size="small" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="申请说明" class="last">
             <el-input type='textarea' v-model='form.txt' :rows="2" placeholder="" resize='none'></el-input>
          </el-form-item>
          <el-form-item label=" " class="sub">
            <el-button class="add" size='small' type='primary' @click='dialogCreate = false'>提交</el-button>
            <el-button class="add" size='small' type='primary' plain @click='dialogCreate = false'>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getList} from "@/api/price/priceInquiry.js";

  export default {
    name: 'priceInquiry',
  data() {
    return {
      form: {},
      total: 0,
      d1: [],
      options: [
        {
          value: "pending",
          label: "待审批"
        },
        {
          value: "pass",
          label: "通过"
        },
        {
          value: "reject",
          label: "驳回"
        },
      ],
      value: "",
      isIndeterminate: false,
      dialogVisible: false,
      dialogCreate: false,
      tableData: [],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 10
    };
  },
  computed: {
    shopId() {
      return this.$store.state.shopId.shopId;
    }
  },
  created() {},
  watch: {},
  methods: {
    change() {
      this.dialogVisible = !this.dialogVisible;
    },
   
    sure() {
      this.dialogVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    create() {
      this.dialogCreate = true;
    },
    add() {
      this.$router.push({
        name: "Addprice-query"
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.price-inquiry{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;
  .el-dialog{
    .form {
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          .el-select{
            width: 100%;
          }
        }
        .inp{
          width: 100%;
        }
        .last{
          width: 100%;
        }
        .sub{
          width: 100%;
          display: flex;
          justify-content: center;
        }
    }
  }
  .sellBox{
    height: 100%;
    display: flex;
    flex-direction: column;
    .head{
      padding: 10px 20px;
      // background: red;
    }
    .sels{
      // margin: 20px 0;
      padding:10px 20px;
      background: #fff;
      margin-bottom: 10px;
      .lineBox{
        color: #b161bf;
      }
    }
    .form {
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          width: 200px;
          margin-bottom: 0;
          .el-select{
            width: 100%;
          }
        }
        .date {
          width: 414px;
          
        }
    }
    .box{
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      background: #fff;
      .btns{
        padding: 10px 20px;
        // background: pink;
      }
      .tab{
        padding-bottom: 52px;
        box-sizing: border-box;
        height: 100%;
        // background: orange;
        display: flex;
        flex-direction: column;
        position: relative;
        .el-table{
          height: 100%;
          position: relative;
        }
        .block{
          position: absolute;
          bottom:0;
          padding:  10px 0 ;
          width: 100%;
          .el-pagination {
            width: 100%;
            padding: 0;
            text-align: center;
          }
        }
      }
    }
  }
}

</style>
