<template>
  <div class="theme">
    <div>
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>客户管理</el-breadcrumb-item>
          <el-breadcrumb-item>客户维护</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>

          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>

          <!-- <div class="line"></div> -->
        </div>
        <!-- <transition-group enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"> -->
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible3'>
          <el-form-item label="客户名称">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="英文名称">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户号">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="代理商">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-select v-model="value" size="small" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报备日期" class="date">
            <el-date-picker size='small' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain>搜索</el-button>
            <el-button @click='dialogVisible3 = true' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
        <!-- </transition-group> -->

      </div>
      <div class="box">
        <div class="btns clear">
          <el-button class="add" @click='open' size='small' type='primary'>释放</el-button>
          <el-button class="add" @click='remove' size='small' type='primary'>转移</el-button>
          <el-button class="add" @click='changeType' size='small' type='primary'>类型变更</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="700">
            <el-table-column prop="" type="selection" width='30' show-overflow-tooltip label="">
            </el-table-column>
            <el-table-column type="index" width='100' label="编号" :index='q'>
            </el-table-column>
            <el-table-column prop="t1" show-overflow-tooltip label="客户中文名">
            </el-table-column>
            <el-table-column prop="t2" label="客户英文名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t3" label="客户号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="t4" show-overflow-tooltip label="代理商">
            </el-table-column>
            <el-table-column prop="t5" label="客户类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="t6" label="客户状态">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="操作" width="80">
              <template scope-slot='scope'>
                <el-button type='primary' size='mini' >修改</el-button>
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



    <el-dialog title="转移" :visible.sync="dialogVisible" width="60%">
      <div class="sels clear">
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true'>
          <el-form-item label="代理商">
            <el-select v-model="value1" size='small' filterable placeholder="请选择">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售">
            <el-select v-model="value2" size='small' filterable placeholder="请选择">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button class="add" size='small' type='primary' @click='dialogVisible = false'>提交</el-button>
          </el-form-item>
        </el-form>

        </el-form>
      </div>
      <div class="tab">
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column type="index" width='100' label="编号" :index='q'>
          </el-table-column>
          <el-table-column prop="t11" show-overflow-tooltip label="客户中文名">
          </el-table-column>
          <el-table-column prop="t12" label="活动名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="t13" label="人群名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="t14" show-overflow-tooltip label="发送时间">
          </el-table-column>
          <div slot="empty">

            <p>未查询到客户信息</p>
          </div>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog title="类型变更" :visible.sync="dialogVisible1" width="30%">
      <el-select v-model="value" size='small' filterable placeholder="请选择" class="changeType">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false" size='small'>取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false" size='small'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
export default {
  name: "Theme",
  data() {
    return {
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

      options1: [
        {
          value: "选项1",
          label: "代理商A"
        },
        {
          value: "选项2",
          label: "代理商B"
        }
      ],
      value1: "",

      txt: "",
      form: {},
      options: [],
      value: "",
      dialogVisible: false,
      dialogVisible3: false,
      dialogVisible1: false,
      tableData: [
        {
          t1: "测试客户A",
          t2: "Test CustomerB",
          t3: "001",
          t4: "代理商A",
          t5: "Mass Market"
        },
        {
          t1: "审批中",
          t2: "Test CustomerB",
          t3: "002",
          t4: "",
          t5: "Account Market"
        }
      ],
      tableData1: [{}],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    change() {
      this.dialogVisible3 = !this.dialogVisible3;
    },
    changeType() {
      this.dialogVisible1 = true;
    },
    open() {
      this.$confirm("确定要释放吗?", "释放", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "释放成功"
          });
        })
        .catch(action => {
          this.$message({
            type: "fail",
            message: "已取消操作"
          });
        });
    },
    remove() {
      this.dialogVisible = true;
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    //点击新增营销活动
    add() {
      this.$router.push({
        name: "AddSell"
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

.theme {
  .empty {
    p {
      margin-top: 23px;
    }
  }

  .el-dialog {
    margin: 0 auto;

    .sels {
      padding: 0;
      margin: 0 0 20px 0;
    }

    .changeType {
      width: 100%;
    }
  }

  .head {
    h1 {
      opacity: 0.87;
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 42px;
      height: 42px;
      font-weight: bold;
      padding: 0 50px;

      span {
        border-left: 1px solid #ccc;
        padding: 0 20px;
      }
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
      max-width: 1300px;

      .el-form-item__label {
        height: 30px;
      }

      .el-form-item {
        width: 200px;
        margin-bottom: 0;

        .el-select {
          width: 200px;
        }
      }

      .date {
        width: 414px;

        .el-date-editor {
          width: 414px;
        }
      }
    }

    .drop {
      width: 286px;
      height: 32px;
      line-height: 30px;
      margin: 12px 0 12px 20px;
      border: 1px solid #ccc;
      box-sizing: border-box;

      .sel {
        width: 180px;

        .el-input__inner {
          border: none;
          height: 28px;
        }
      }

      .el-dropdown {
        border-right: 1px solid #ccc;
        padding: 0 10px;

        span {
          font-size: 14px;
        }

        .el-dropdown-menu__item {
          width: 100px;
        }
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
            // overflow: hidden;
            // text-overflow:ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // -webkit-box-orient: vertical;
            // width:100px;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
          }
        }
      }
    }

    .block {
      // position: absolute;
      bottom: 26px;
      padding: 10px;

      .el-pagination {
        width: 100%;
        text-align: center;
      }
    }
  }

  .bottom {
    text-align: center;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    line-height: 16px;
  }
}
</style>