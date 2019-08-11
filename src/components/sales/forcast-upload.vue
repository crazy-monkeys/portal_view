<template>
  <div class="upload">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>销售管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售预测上传</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="查询" name="first">
          <div class="sels clear">
            <div class="lineBox">
              <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
              <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
            </div>
            <el-form ref="form" :model="form" size="small" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
              <el-form-item label="客户名称">
                <el-input  placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="客户编号">
                <el-input  placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="status">
                  <el-option value='1' label="已保存"></el-option>
                  <el-option value='2' label="已验证"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="销售">
                <el-input  placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="订单月份">
                <el-input  placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="上传日期" class="date">
                <Daterange />
              </el-form-item>
              <el-form-item label=" ">
                <el-button  type='primary' plain>查询</el-button>
                <el-button   type='primary' plain>重置</el-button>
              </el-form-item>
            </el-form>
            <!-- </transition-group> -->

          </div>
          <div class="box">
            <div class="btns clear">
              <el-button   size='small' type='primary'>批量删除</el-button>
              <el-button   size='small' type='primary'>批量修改</el-button>
            </div>
            <div class="tab">
              <el-table :data="tableData" border style="width: 100%" height="100%">
                <el-table-column type="selection"  show-overflow-tooltip></el-table-column>
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
        </el-tab-pane>
        <el-tab-pane label="上传" name="second">
          <div class="box">
            <div class="btns clear">
              <el-button class="add" @click='open' size='small' type='primary'>下载模版</el-button>
              <el-button class="add" @click='remove' size='small' type='primary'>上传</el-button>
              <el-button class="add" @click='open' size='small' type='primary'>下载错误数据</el-button>

              <!-- <el-button class="add" @click='changeType' size='small' type='primary'>验证</el-button> -->
              <!-- <el-button class="add" @click='open' size='small' type='primary'>保存</el-button> -->
              <el-button class="add" @click='remove' size='small' type='primary'>提交</el-button>
            </div>
            <div class="tab">
              <el-table :data="tableData" border style="width: 100%" height="100%">
                <el-table-column prop="0" width='100' label="错误信息" ></el-table-column>
                <el-table-column prop="1" width='100' label="上传日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="2" width='80' label="年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="3" width='100'  label="客户名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="4" width='100'  label="客户类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="5" width='180'  label="阿米巴队长" show-overflow-tooltip></el-table-column>
                <el-table-column prop="6" width='80'  label="销售" show-overflow-tooltip></el-table-column>
                <el-table-column prop="7" width='180'  label="类别一（类型）" show-overflow-tooltip></el-table-column>
                <el-table-column prop="8" width='150'  label="Product Type" show-overflow-tooltip></el-table-column>
                <el-table-column prop="9" width='100'  label="Platform" show-overflow-tooltip></el-table-column>
                <el-table-column prop="10" width='100'  label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="11" width='100'  label="截止日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="12" width='180'  label="未完成专货库存" show-overflow-tooltip></el-table-column>
                <el-table-column prop="13" width="80" label="月份一" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="13" width="80" label="月份二" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="13" width="80" label="月份三" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="13" width="80" label="月份四" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="13" width="80" label="月份五" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="13" width="80" label="月份六" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>
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
        </el-tab-pane>
        <el-tab-pane label="驳回记录" name="third">
          <div class="box">
            <div class="tab">
              <el-table :data="tableData" border style="width: 100%" height="100%">
                <el-table-column prop="0" width='100' label="错误信息" ></el-table-column>
                <el-table-column prop="1" width='100' label="上传日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="2" width='80' label="年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="3" width='100'  label="客户名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="4" width='100'  label="客户类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="5" width='180'  label="阿米巴队长" show-overflow-tooltip></el-table-column>
                <el-table-column prop="6" width='80'  label="销售" show-overflow-tooltip></el-table-column>
                <el-table-column prop="7" width='180'  label="类别一（类型）" show-overflow-tooltip></el-table-column>
                <el-table-column prop="8" width='150'  label="Product Type" show-overflow-tooltip></el-table-column>
                <el-table-column prop="9" width='100'  label="Platform" show-overflow-tooltip></el-table-column>
                <el-table-column prop="10" width='100'  label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="11" width='100'  label="截止日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="12" width='180'  label="未完成专货库存" show-overflow-tooltip></el-table-column>
                <el-table-column prop="13" width="80" label="月份一" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="13" width="80" label="月份二" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="13" width="80" label="月份三" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="13" width="80" label="月份四" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="13" width="80" label="月份五" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>

                <el-table-column prop="13" width="80" label="月份六" show-overflow-tooltip></el-table-column>
                <el-table-column prop="14"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="15" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="16" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="17" width='100'  label="备注" show-overflow-tooltip></el-table-column>
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
import Daterange from "../com/date";

  export default {
    name: 'upload',
    components:{
      Daterange
    },
    data() {
      return {
        activeName:'first',
        status:'',
        dialogVisible:false,
        form:{},
        cities:['上海','北京','杭州'],
        checkAll: false,
        checkedCities: [
        ],
        conditions: [
        ],
        isIndeterminate: false,
        //表格数据
        tableData: [
          {
            0:'',
            1:'201904',
            2:'',
            3:'',
            4:'',
            5:'',
            6:'',
            7:'',
            8:'',
            9:'',
            10:'',
            11:'',
            12:'',
          },
          {
            0:'',
            1:'201904',
            2:'',
            3:'',
            4:'',
            5:'',
            6:'',
            7:'',
            8:'',
            9:'',
            10:'',
            11:'',
            12:'',
          },
        ],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        //总量
        total: 0,
      }
    },
    computed: {
     
    },
    created() {
    },
    watch: {
    },
    methods: {
      handleClick(){},
      change(){
        this.dialogVisible = !this.dialogVisible
      },
      handleCheckAllChange(val) {
        console.log(val)
        this.checkedCities = val ? this.cities : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log(value)
        console.log(this.checkedCities)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      q(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1
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

.upload{
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
    position: relative;
    padding-top: 34px;
    box-sizing: border-box;
    .head{
      padding: 10px 20px;
      position: absolute;
      top: 0;
      // background: red;
    }
    .el-tabs{
      height: 100%;
      position: relative;
      box-sizing: border-box;
      padding-top: 50px;
      .el-tabs__header{
        position: absolute;
        top: 0;
        width: 100%;
        .el-tabs__nav-wrap {
          padding:0 20px;
        }
      }
      .el-tabs__content{
        height: 100%;
        .el-tab-pane{
          height: 100%;
          display: flex;
          flex-direction: column;
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
  }
}
</style>