<template>
  <div class="price-list">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/price/list'>价格管理</el-breadcrumb-item>
          <el-breadcrumb-item>目录价格查询</el-breadcrumb-item>
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
          <el-form-item label="BU">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="PDT">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产品类型">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="平台">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产品状态">
            <el-select v-model="value" size="small" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品归属">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="限制客户">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="生效时间" class="date">
            <Daterange />
          </el-form-item>
          <el-form-item :label="checkedCities.length==0 ?'' : ' '">
            <el-button size='small' type='primary' plain>搜索</el-button>
            <el-button @click='dialogVisible = true' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
        <!-- </transition-group> -->

      </div>

      <!-- </transition-group> -->
      <div class="box">
        <!-- <div class="btns clear">
          <el-button class="add" @click='create' size='small' type='primary'>生成报价单</el-button>
        </div> -->
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column type="index" width='100' label="序号" :index='q'>
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
  import Daterange from "../com/date";
  import formTest from '../../assets/js/formTest'
  export default {
    name: 'PriceQuery',
    components:{
      Daterange
    },
    data() {
      return {
        form: {},
        total: 0,
        d1: [],
        options: [
          {
            value: '1',
            label: '新产品'
          },
          {
            value: '1',
            label: '主流在售'
          },
          {
            value: '1',
            label: '衰退期'
          },
          {
            value: '1',
            label: '以退市'
          },
        ],
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
            {
              t1:'Connectivity Device',
              t2:'WCN',
              t3:'WIFI',
              t4:'',
              t5:'新产品',
              t6:'BU',
              t7:'BL0908',
              t8:'',
              t9:'',
              t10:'0.0908',
              t11:'0.7800',
              t12:'0.5750',
              t13:'0.4569',
              t14:'',
              t15:'',
              t16:'2019/5/1',
              t17:'2019/5/1',
              t18:'2020/5/1',
              t1:''
            }
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
            name: 'Addprice-query'
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
.price-list{
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
