<template>
  <div class="theme">
    <div class="sellBox"> 
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>客户管理</el-breadcrumb-item>
          <el-breadcrumb-item to='/home/theme'>客户报备</el-breadcrumb-item>
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
          <el-form-item label="客户编号">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户简称">
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
            <Daterange />
          </el-form-item>
          <el-form-item :label="checkedCities.length==0 ?'' : ' '">
            <el-button size='small' type='primary' plain @click="search">搜索</el-button>
            <el-button @click='dialogVisible = true' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns">
          <el-button type='primary' class="add" size='mini' @click="report">报备</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column type="index" width='100' label="编号" :index='q'>
            </el-table-column>
            <el-table-column prop="1" show-overflow-tooltip label="审批状态">
            </el-table-column>
            <el-table-column prop="2" label="客户名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="3" label="客户编号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="4" label="客户简称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="5" label="客户类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="5" label="代理商" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="5" label="销售" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="5" label="报备时间" show-overflow-tooltip sortable="">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" width='180' label="操作" fixed='right'>
              <template scope-slot='scope'>
                <el-button type='text'  @click='add'>明细</el-button>
                <el-button type='text'  @click='report'>重新报备</el-button>
                <el-button type='text'  @click='del'>删除</el-button>
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
        title="搜索"
        :visible.sync="dialogVisible2"
        width="300px"
        top="10vh"
        >
        当前客户不存在，是否进行报备
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2= false" size="small" type="primary" plain>取 消</el-button>
            <el-button type="primary" @click="sure1"  size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
import Daterange from "../com/date";

export default {
  components:{
    Daterange
  },
  name: "theme",
  data() {
    return {
      dialogVisible2:false,
      form:{},
      total:0,
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
    search(){
      this.dialogVisible2 = true ;
    },
    sure1(){
      this.dialogVisible2 = false;
      this.$router.push({
        name:'black'
      })
    },
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
.theme{
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