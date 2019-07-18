<template>
  <div class="index">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>产品查询</el-breadcrumb-item>
        </el-breadcrumb>
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
          <el-form-item label="产品型号">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="BU">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="PDT">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="类别一(类型)">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="类别二(子类型)">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="类别三(平台)">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="BU Head" >
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="副产总" >
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="SAP 物料号" >
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <!-- <el-form-item label="BU Head" class="date">
            <Daterange />
          </el-form-item> -->
          <el-form-item :label="checkedCities.length==0 ?'' : ' '">
            <el-button size='small' type='primary' plain>查询</el-button>
            <el-button @click='dialogVisible = true' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
        <!-- </transition-group> -->

      </div>

      <!-- </transition-group> -->
      <div class="box">
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table size='small' :data="props.row.children" border style="width: 100%" height="100%">
                  <el-table-column label="子料号" prop='0' show-overflow-tooltip> 
                  </el-table-column>
                  <el-table-column label="数量" prop='1' show-overflow-tooltip>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="产品型号" prop='0' show-overflow-tooltip> 
            </el-table-column>
            <el-table-column label="BU" prop='1' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="PDT" prop='2' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="类别一(类型)" prop='3' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="类别二(子类型)" prop='4' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="类别三(平台)" prop='5' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="BU Head" prop='6' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="副产总" prop='7' show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="SAP 物料号" prop='8' show-overflow-tooltip>
            </el-table-column>
            <!-- <el-table-column  label="操作" width="100"  v-if="s==1" fixed="right" >
              <template>
                <el-button size="small" type="text" @click="adjust">预测调整</el-button>
              </template>
            </el-table-column> -->
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
    <el-dialog
        title="预测调整"
        :visible.sync="dialogVisible1"
        width="80%"
        >
        <el-table :data="tableData1" style="width: 100%" >
            <el-table-column  label="月份" show-overflow-tooltip></el-table-column>
            <el-table-column  label="原预测值" show-overflow-tooltip></el-table-column>
            <el-table-column  label="调整值" show-overflow-tooltip>
                <el-input size="small"></el-input>
            </el-table-column>
            <el-table-column  label="备注"   show-overflow-tooltip>
              <template>
                <el-input  size="small" :rows="1" type="textarea"></el-input>
              </template>
            </el-table-column>
            
          </el-table>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false" size="small">提 交</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import Daterange from "../com/date";
  import formTest from '../../assets/js/formTest'
  export default {
    components:{
      Daterange
    },
    name: 'index',
    data() {
      return {
        s:1,
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
        dialogVisible1: false,
        tableData: [
                  
// S2T305-XBN Intelligence Device BU TV TV TV SOC S2T305-XBN 吴迪 (David Wu) 王骞 (Benjamin Wang) 11030001439
          {
            0:'RDA8501-XBN',
            1:'Intelligence Device BU',
            2:'TV',
            3:'TV',
            4:'TV SOC',
            5:'RDA8501-XBN',
            6:'吴迪 (David Wu)',
            7:'王骞 (Benjamin Wang)',
            8:'11030001438',
            children:[
              {
                0:'xxxx',
                1:'100',
              }
            ]
          }
        ],
        tableData1: [
          {}
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
      adjust() {
        this.dialogVisible1 = true
      },
      change(){
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
.index{
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