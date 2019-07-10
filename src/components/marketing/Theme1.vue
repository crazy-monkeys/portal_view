<template>
  <div class="theme">
    <div class="sellBox"> 
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>客户管理</el-breadcrumb-item>
          <el-breadcrumb-item to='/home/theme'>报备查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="客户名称">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="英文名称">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户号">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="销售">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-select v-model="value" size="small" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批状态">
            <el-select v-model="value1" size="small" filterable placeholder="请选择">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报备日期" class="date">
            <el-date-picker size='small' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="checkedCities.length==0 ?'' : ' '">
            <el-button size='small' type='primary' plain>搜索</el-button>
            <el-button @click='dialogVisible = true' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns">
          <el-button type='primary' class="add" size='mini' @click="report">报备</el-button>
          <el-button type='primary' class="add" size='mini' @click="upload">拜访记录上传</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="100%">
            <el-table-column prop="" width='30' show-overflow-tooltip label="">
            </el-table-column>
            <el-table-column type="index" width='100' label="编号" :index='q'>
            </el-table-column>
            <el-table-column prop="1" show-overflow-tooltip label="审批状态">
            </el-table-column>
            <el-table-column prop="2" label="客户中文名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="3" label="客户英文名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="4" label="客户号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="5" label="客户类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" width='300' label="操作" fixed='right'>
              <template scope-slot='scope'>
                <el-button type='primary' size='mini' @click='add'>明细</el-button>
                <el-button type='primary' size='mini' @click='report'>重新报备</el-button>
                <el-button type='primary' size='mini' @click='del'>删除</el-button>
              </template>
            </el-table-column>
            <div slot="empty">
              <p>未查询到客户信息</p>
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
    <el-dialog
        title="拜访记录上传"
        :visible.sync="dialogVisible1"
        width="80%"
        >
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' >
          <el-form-item label="客户名称">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户所在地">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="项目状态">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="项目所属展锐事业部">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          
        </el-form>
        <!-- 客户名称  客户所在地   项目名称  项目状态   项目所属展锐事业部 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1= false" size="small" type="primary" plain>取 消</el-button>
            <el-button type="primary" @click="dialogVisible1 = false" size="small">上 传</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
export default {
  name: "SellIndex",
  data() {
    return {
      form:{},
      total:0,
      dialogVisible1:false,
      options: [
        {
          value: "1",
          label: "Mass Market"
        },
        {
          value: "2",
          label: "Account Market"
        }
      ],
      value: "",
      options1: [
        {
          value: "1",
          label: "审批通过"
        },
        {
          value: "2",
          label: "审批驳回"
        },
        {
          value: "3",
          label: "审批中"
        },
        {
          value: "4",
          label: "草稿"
        }
      ],
      value1: "",
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
        },
        {
          label: "客户号",
          value: 3
        },
        {
          label: "代理商",
          value: 4
        },
        {
          label: "客户类别",
          value: 5
        },
        {
          label: "报备日期",
          value: 6
        }
      ],
      isIndeterminate: false,
      dialogVisible: false,
      tableData: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {
          1: "审批通过",
          2: "Test CustomerB",
          3: "001",
          4: "代理商A",
          5: "Mass Market"
        },
        {
          1: "审批中",
          2: "Test CustomerB",
          3: "002",
          4: "",
          5: "Account Market"
        }
      ],
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
    del(){
      this.$confirm('是否删除该条报备信息', '删除', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(() => { 
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(action => {
          this.$message({
            type: 'fail',
            message: '已取消操作'
          })
        });
    },
    upload(){
      this.dialogVisible1 = true
    },
    report(){
      this.$router.push({
        name:'black'
      })
    },

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
  margin-left: 20px;
    height: 100%;
  .sellBox{
    // margin: 0 20px;
    height: 100%;
    width: 100%;
    // background: pink;
    position: relative;
  }
  .dialog-footer{
    display: flex;
    justify-content: center;
  }
  .head {
    .el-breadcrumb {
      line-height: 30px;
      margin-left: 40px;
      margin-right: 20px;
      font-size: 14px;
    }
  }
  .sels {
    width: 100%;
    background: #fff;
    padding: 10px 40px;
    margin-bottom: 10px;
    // margin: 0 20px 10px 20px;
    .lineBox{
      color: #b161bf;
    }
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
  .box {
    // position: absolute;
    // top: 77px;
    // bottom:0;
    width: 100%;
    height: 100%;
    background: orange;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    .btns {
      height: 56px;
      display: flex;
      align-items: center;
      padding: 0 40px;
    }
    .tab {
      position: relative;
      height: 100%;
      // top: 56px;
      // bottom:0;
      width: 100%;
      overflow: hidden;
      .el-table {
        // background: red;
        position: absolute;
        td {
          height:10%;
          // line-height: 1;
          .cell {
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
          }
        }
      }
     
    }
    
  }
  
}
</style>