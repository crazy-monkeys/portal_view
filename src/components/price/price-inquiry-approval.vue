<template>
  <div class="price-inquiry-approval">
    <div>
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/price/inquiry-approval'>价格管理</el-breadcrumb-item>
          <el-breadcrumb-item>询价单审批</el-breadcrumb-item>
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
          <el-form-item label="申请人">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="审批状态">
            <el-select v-model="value" size="small" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生效时间" class="date">
            <el-date-picker size='small' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              v-model="d1">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="checkedCities.length==0 ?'' : ' '">
            <el-button size='small' type='primary' plain>查询</el-button>
            <el-button @click='dialogVisible = true' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
        <!-- </transition-group> -->

      </div>

      <!-- </transition-group> -->
      <div class="box">
        <div class="btns">
              <el-button class="add" size='small' type='primary' @click='create' >审批</el-button>

        </div>
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="700">
            <el-table-column prop="" width='30' show-overflow-tooltip label="">
            </el-table-column>
            <el-table-column type="index" width='100' label="编号" :index='q'>
            </el-table-column>
            <el-table-column prop="1" show-overflow-tooltip label="申请人">
            </el-table-column>
            <el-table-column prop="2" label="申请说明" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="3" label="产品型号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="4" show-overflow-tooltip label="BU">
            </el-table-column>
            <el-table-column prop="5" label="PDT" show-overflow-tooltip>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="7" label="Product Type">
            </el-table-column>
             <el-table-column show-overflow-tooltip prop="8" label="平台">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="9" label="产品状态">
            </el-table-column>


            <el-table-column show-overflow-tooltip prop="6" label="产品归属">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="6" label="产品型号">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="6" label="数量上限">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="6" label="数量下限">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="6" label="标准价">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="6" label="生效时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="6" label="失效时间">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="操作" fixed='right'>
              <template scope-slot='scope'>
                <el-button type='text' size='small' @click='add'>审批</el-button>
              </template>
            </el-table-column>
            <div slot="empty">
              <p>未查询到客户信息</p>
            </div>
          </el-table>
        </div>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 100]" :page-size="10" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
   <el-dialog title="审批" :visible.sync="dialogCreate" width="50%">
      <div class="sels clear">
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true'>
          <el-form-item label="审批意见" class="last">
             <el-input type='textarea' v-model='form.txt' :rows="2" placeholder="" resize='none'></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button class="add" size='small' type='primary' @click='dialogCreate = false'>提交</el-button>
            <el-button class="add" size='small' type='primary' plain @click='dialogCreate = false'>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
export default {
  name: "PriceQuery",
  data() {
    return {
      form: {},
      total: 0,
      d1: [],
      options: [
        {
          value: "1",
          label: "---"
        }
      ],
      value: "",
      checkAll: false,
      checkedCities: [1, 2],
      conditions: [
        {
          label: "客户名称",
          value: 1
        },
        {
          label: "英文名称",
          value: 2
        }
      ],
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
    handleCheckAllChange(val) {
      console.log(val);
      this.checkedCities = val ? [1, 2, 3, 4, 5, 6] : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.conditions.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.conditions.length;
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

.price-inquiry-approval {
  .head {
    h1 {
      opacity: 0.87;
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 42px;
      height: 42px;
      /* font-weight: bold; */
      padding: 0 50px;
    }

    .el-breadcrumb {
      line-height: 30px;
      margin-left: 50px;
      margin-right: 20px;
      font-size: 14px;
    }
  }

  .sels {
    background: #fff;
    padding: 10px 30px;
    margin: 0 20px 10px 20px;

    .lineBox {
      i {
        color: #800080;
        font-weight: bold;
      }
    }

    .line {
      height: 12px;
      background: #800080;
      margin-left: 20px;
    }

    .form {
      /* max-width: 1000px; */
      .el-form-item__label {
        height: 30px;
      }

      .el-form-item {
        width: 200px;
        margin-bottom: 0;
      }
      .btns {
        width: 100%;
      }
      .date {
        width: 414px;

        .el-date-editor {
          width: 414px;
        }
      }
      .btns,
      .last {
        width: 100%;
      }
    }
  }

  .box {
    margin: 0 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    position: relative;

    .btns {
      .add {
        margin: 12px 0 12px 30px;
      }
    }

    .tab {
      .el-table {
        td {
          height: 64px;
          line-height: 64px;

          .cell {
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
          }
        }
      }
    }

    .block {
      padding: 10px;

      .el-pagination {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
