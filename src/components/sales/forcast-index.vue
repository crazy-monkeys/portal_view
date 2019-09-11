<template>
  <div class="index">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>销售管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售预测查询</el-breadcrumb-item>
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
        <el-form ref="form" size="small" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="客户名称">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="代理商">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="销售">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="月份">
            <el-input size='small' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="上传日期" class="date">
            <Daterange />
          </el-form-item>
          <el-form-item label="渠道" >
            <el-select v-model="source" size="small">
              <el-option :value='1' label='职工客户'></el-option>
              <el-option :value='2' label='代理客户'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="查询方式" >
            <el-select v-model="way">
              <el-option :value='1' label='按年'></el-option>
              <el-option :value='2' label='按月'></el-option>
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
        <div class="btns clear">
          
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" v-show="way==2">
            <el-table-column type="expand" v-if="way==2">
              <template slot-scope="props" v-if="way==2">
                <el-table size='small'  v-if="way==2" :data="props.row.children" border style="width: 100%" height="100%">
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
            <el-table-column prop="0" width='100' label="代理商" >
            </el-table-column>
            <el-table-column prop="1" label="上传日期" width="100" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="2" label="年月" width="80" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="3" label="客户名称" width="100" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="客户类别" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="渠道" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="阿米巴队长" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="销售" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="类别一（类型）" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="Product Type" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="Platform" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="产品型号" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="截止日期" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="未完成专货库存" width="180" show-overflow-tooltip></el-table-column>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>

          <el-table :data="tableData" border style="width: 100%" height="100%" v-show="way==1">
            <el-table-column prop="" width='100' label="代理商" show-overflow-tooltip>
            </el-table-column>
            
            <el-table-column prop="" label="上传日期" width="100" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="年月" width="80" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="客户名称" width="100" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="客户类别" width="100" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="渠道" width="100" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="阿米巴队长" width="120" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="销售" width="80" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="类别一（类型）" width="150" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="Product Type" width="150" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="Platform" width="100" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="产品型号" width="100" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="截止日期" width="100" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="未完成专货库存" width="180" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="" label="月份" width="80" show-overflow-tooltip >
            </el-table-column>
            <el-table-column prop="" label="本次填写" width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" label="上次填写" width="100" show-overflow-tooltip >
            </el-table-column>
            <el-table-column label="GAP" prop='' show-overflow-tooltip  width="100">
            </el-table-column>
            <el-table-column label="备注" prop='' show-overflow-tooltip  width="100">
            </el-table-column>
            <el-table-column label="阿米巴队长调整" prop='' show-overflow-tooltip  width="150">
            </el-table-column>
            <el-table-column label="阿米巴队长备注" prop='' show-overflow-tooltip  width="150">
            </el-table-column>
            <el-table-column label="首代调整" prop='' show-overflow-tooltip width="100" >
            </el-table-column>
            <el-table-column label="首代备注" prop='' show-overflow-tooltip width="100" >
            </el-table-column>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 20,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
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
  import {getList} from '@/api/forcast/query.js'
  export default {
    components:{
      Daterange
    },
    name: 'index',
    data() {
      return {
        source:'',
        way:1,
        form: {},
        dialogVisible: false,
        dialogVisible1: false,
        tableData: [
        ],
        tableData1: [
          {}
        ],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        total: 0,

      }
    },
    computed: {
    },
    created() {
      this.getList()
    },
    watch: {
    },
    methods: {
      async getList(){
        const data ={
          pageSize:this.pageSize,
          pageNum:this.currentPage,
        }
        const res = await getList(data);
        console.log('查询列表',res);
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      change(){
        this.dialogVisible = !this.dialogVisible

      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList()
      },
    }
  }
</script>

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