<template>
  <div class="index">
    <div>
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>销售管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售预测上传</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- </transition-group> -->
      <div class="box">
        <div class="btns clear">
          <el-button class="add" @click='open' size='small' type='primary'>下载模版</el-button>
          <el-button class="add" @click='remove' size='small' type='primary'>上传</el-button>
          <el-button class="add" @click='changeType' size='small' type='primary'>验证</el-button>
          <el-button class="add" @click='open' size='small' type='primary'>保存</el-button>
          <el-button class="add" @click='remove' size='small' type='primary'>提交</el-button>
          <el-button class="add" @click='changeType' size='small' type='primary'>删除</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="700">
            <el-table-column prop="" type="selection" width='30' show-overflow-tooltip label="">
            </el-table-column>
            <el-table-column prop="0" width='100' label="错误信息" :index='q'></el-table-column>
            <el-table-column prop="1" label="上传日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="2" label="年月" show-overflow-tooltip></el-table-column>
            <el-table-column prop="3" label="客户名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="4" label="客户类别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="5" label="阿米巴队长" show-overflow-tooltip></el-table-column>
            <el-table-column prop="6" label="销售" show-overflow-tooltip></el-table-column>
            <el-table-column prop="7" label="类别一（类型）" show-overflow-tooltip></el-table-column>
            <el-table-column prop="8" label="Product Type" show-overflow-tooltip></el-table-column>
            <el-table-column prop="9" label="Platform" show-overflow-tooltip></el-table-column>
            <el-table-column prop="10" label="产品型号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="11" label="截止日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="未完成专货库存" show-overflow-tooltip></el-table-column>

            <el-table-column prop="12" label="月份一" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="上次填写" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="本次填写" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="GAP" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="阿米巴队长调整" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="阿米巴队长备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="首代调整" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="首代备注" show-overflow-tooltip></el-table-column>

            <el-table-column prop="12" label="月份二" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="上次填写" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="本次填写" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="GAP" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="阿米巴队长调整" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="阿米巴队长备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="首代调整" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="首代备注" show-overflow-tooltip></el-table-column>

            <el-table-column prop="12" label="月份三" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="上次填写" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="本次填写" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="GAP" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="阿米巴队长调整" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="阿米巴队长备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="首代调整" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="首代备注" show-overflow-tooltip></el-table-column>

            <el-table-column prop="12" label="月份四" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="上次填写" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="本次填写" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="GAP" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="阿米巴队长调整" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="阿米巴队长备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="首代调整" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="首代备注" show-overflow-tooltip></el-table-column>

            <el-table-column prop="12" label="月份五" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="上次填写" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="本次填写" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="GAP" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="阿米巴队长调整" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="阿米巴队长备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="首代调整" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="首代备注" show-overflow-tooltip></el-table-column>

            <el-table-column prop="12" label="月份六" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="上次填写" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="本次填写" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="GAP" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="阿米巴队长调整" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="阿米巴队长备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="首代调整" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="首代备注" show-overflow-tooltip></el-table-column>
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
    <!-- <el-dialog
        title="筛选条件选取"
        :visible.sync="dialogVisible"
        width="600px"
        >
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="con in conditions" :label="con.value" :key="con.value">{{con.label}}</el-checkbox>
        </el-checkbox-group>
    </el-dialog> -->
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  export default {
    name: 'index',
    data() {
      return {
        form: {},
        total: 0,
        d1: [],
        options: [{
          value: '选项1',
          label: 'Mass Market'
        }, {
          value: '选项2',
          label: 'Account Market'
        }],
        value: '',
        checkAll: false,
        checkedCities: [
          1, 2
        ],
        conditions: [
          {
            label: '客户名称',
            value: 1
          },
          {
            label: '英文名称',
            value: 2
          }
        ],
        isIndeterminate: false,
        dialogVisible: false,
        tableData: [
        
        ],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
      }
    },
    computed: {
      shopId() {
        return this.$store.state.shopId.shopId
      }
    },
    created() {
    },
    watch: {
    },
    methods: {
      change() {
        this.dialogVisible = !this.dialogVisible
      },
      handleCheckAllChange(val) {
        console.log(val)
        this.checkedCities = val ? [1, 2, 3, 4, 5, 6] : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.conditions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.conditions.length;
      },
      sure() {
        this.dialogVisible = false
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => { });
      },
      q(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1
      },
      add() {
        this.$router.push(
          {
            name: 'AddSell'
          }
        )
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;

  .index {
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

        .date {
          width: 414px;

          .el-date-editor {
            width: 414px;
          }
        }

      }
    }

    .box {
      margin: 0 20px 20px 20px;
      background: #FFFFFF;
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