<template>
  <div class="approve">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>销售管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售预测审批</el-breadcrumb-item>
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
          <el-form-item label="客户名称">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户编号">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="代理商">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="销售">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="订单月份">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="上传日期" class="date">
            <Daterange />
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
          <el-button size="small" type="primary" @click="add1(1)">通过</el-button>
          <el-button size="small" type="primary" @click="add1(2)">驳回</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table size='small' :data="props.row.children" border style="width: 100%" height="100%">
                  <el-table-column label="月份" prop='0' show-overflow-tooltip> 
                  </el-table-column>
                  <el-table-column label="上次填写" prop='1' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="本次填写" prop='2' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="GAP" prop='3' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="备注" prop='4' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="阿米巴队长调整" prop='5' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="阿米巴队长备注" prop='6' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="首代调整" prop='7' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="首代备注" prop='8' show-overflow-tooltip>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column prop="0" width='100' label="代理商" >
            </el-table-column>
            <el-table-column prop="1" label="上传日期" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="2" label="年月" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="3" label="客户名称" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="4" label="客户类别" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="5" label="阿米巴队长" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="6" label="销售" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="7" label="类别一（类型）" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="8" label="Product Type" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="9" label="Platform" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="10" label="产品型号" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="11" label="截止日期" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="12" label="未完成专货库存" width="180" show-overflow-tooltip></el-table-column>
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


    <el-dialog
        :title="title"
        :visible.sync="dialogVisible2"
        width="400px"
        top="10vh"
        >
        <el-form ref="form" :model="form" size="small" class="form" label-width="auto" label-position='top'  >
          <el-form-item :label="label">
            <el-input size='small' rows='4' resize="none" type="textarea" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2= false" size="small" type="primary" plain>取 消</el-button>
            <el-button type="primary" @click="dialogVisible2= false" size="small">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  import Daterange from "../com/date";

  export default {
    name: 'approve',
    components:{
      Daterange
    },
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
        dialogVisible2: false,
        dialogVisible1: false,
        tableData: [
          {
            0:'CEAC',
            1:'201904',
            2:'冠捷',
            3:'',
            4:'',
            5:'',
            6:'',
            7:'TV',
            8:'Tuner',
            9:'RDA5160',
            10:'RDA5160',
            11:'',
            12:'',
            children:[
              {
                0:'201905',
                1:'',
                2:'9.9',
                3:'0',
                4:'',
                5:'',
                6:'',
                7:'',
                8:'',
              },
              {
                0:'201906',
                1:'',
                2:'9.9',
                3:'0',
                4:'',
                5:'',
                6:'',
                7:'',
                8:'',
              },
              {
                0:'201907',
                1:'',
                2:'9.9',
                3:'0',
                4:'',
                5:'',
                6:'',
                7:'',
                8:'',
              },
              {
                0:'201908',
                1:'',
                2:'9.9',
                3:'0',
                4:'',
                5:'',
                6:'',
                7:'',
                8:'',
              },
              {
                0:'201909',
                1:'',
                2:'9.9',
                3:'0',
                4:'',
                5:'',
                6:'',
                7:'',
                8:'',
              },
              {
                0:'201910',
                1:'',
                2:'9.9',
                3:'0',
                4:'',
                5:'',
                6:'',
                7:'',
                8:'',
              }
            ]
          },
          {
            0:'CEAC',
            1:'201904',
            2:'冠捷',
            3:'',
            4:'',
            5:'',
            6:'',
            7:'TV',
            8:'Tuner',
            9:'RDA5160',
            10:'RDA5160',
            11:'',
            12:'',
            children:[
              {
                0:'201905',
                1:'',
                2:'9.9',
                3:'0',
                4:'',
                5:'',
                6:'',
                7:'',
                8:'',
              },
              {
                0:'201906',
                1:'',
                2:'9.9',
                3:'0',
                4:'',
                5:'',
                6:'',
                7:'',
                8:'',
              },
              {
                0:'201907',
                1:'',
                2:'9.9',
                3:'0',
                4:'',
                5:'',
                6:'',
                7:'',
                8:'',
              },
              {
                0:'201908',
                1:'',
                2:'9.9',
                3:'0',
                4:'',
                5:'',
                6:'',
                7:'',
                8:'',
              },
              {
                0:'201909',
                1:'',
                2:'9.9',
                3:'0',
                4:'',
                5:'',
                6:'',
                7:'',
                8:'',
              },
              {
                0:'201910',
                1:'',
                2:'9.9',
                3:'0',
                4:'',
                5:'',
                6:'',
                7:'',
                8:'',
              }
            ]
          },
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
      add1(type) {
        this.dialogVisible2 = true
        if(type==1){
          this.title = '审批'
          this.label = '审批信息'
        }else{
          this.title = '驳回'
          this.label = '驳回信息'
        }
      },
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
.approve{
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