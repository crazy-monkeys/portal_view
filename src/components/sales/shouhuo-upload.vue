<template>
  <div class="shouhuoUpload">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>销售管理</el-breadcrumb-item>
          <el-breadcrumb-item>收货数据上传</el-breadcrumb-item>
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
              <el-form-item label="上传时间"  class="date">
                <Daterange />
              </el-form-item>
              <el-form-item label="提货日期"  class="date">
                <Daterange />
              </el-form-item>
              <el-form-item label="产品型号">
                <el-input size='small' placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="发货公司">
                <el-input size='small' placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="仓储地">
                <el-input size='small' placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item :label="' '">
                <el-button size='small' type='primary' plain>查询</el-button>
                <el-button @click='dialogVisible = true' size='small' type='primary' plain>重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="box">
            <div class="btns clear">
              <el-button class="add" @click='open' size='small' type='primary'>批量删除</el-button>
              <el-button class="add" @click='upload' size='small' type='primary'>批量修改</el-button>
            </div>
            <div class="tab">
              <el-table :data="tableData" border style="width: 100%" height="100%">
                <el-table-column type="selection"  show-overflow-tooltip></el-table-column>

                <el-table-column prop="0" width='150' label="上传时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="0" width='150' label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="0" width='150' label="库存类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="0" width='150' label="库存单价" show-overflow-tooltip></el-table-column>
                <el-table-column prop="0" width='150' label="仓储地" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='150' label="提货时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='150' label="提货发票号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='150' label="提货数量" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='150' label="发货公司" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='150' label="采购单号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='150' label="备注" show-overflow-tooltip></el-table-column>
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
        </el-tab-pane>
        <el-tab-pane label="上传" name="second">
          <div class="box">
            <div class="btns clear">
              <el-button class="add" @click='open' size='small' type='primary'>下载模版</el-button>
              <el-button class="add" @click='upload' size='small' type='primary'>上传</el-button>
              <el-button class="add" @click='open' size='small' type='primary'>下载错误数据</el-button>

              <!-- <el-button class="add" @click='changeType' size='small' type='primary'>验证</el-button> -->
              <!-- <el-button class="add" @click='open' size='small' type='primary'>保存</el-button> -->
              <el-button class="add" @click='remove' size='small' type='primary'>提交</el-button>
            </div>
            <div class="tab">
              <el-table :data="tableData" border style="width: 100%" height="100%">
                <el-table-column prop="0" width='150' label="上传时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="0" width='150' label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="0" width='150' label="库存类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="0" width='150' label="库存单价" show-overflow-tooltip></el-table-column>
                <el-table-column prop="0" width='150' label="仓储地" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='150' label="提货时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='150' label="提货发票号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='150' label="提货数量" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='150' label="发货公司" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='150' label="采购单号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='150' label="备注" show-overflow-tooltip></el-table-column>
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
        </el-tab-pane>
        <el-tab-pane label="驳回记录" name="third">
          <div class="box">
            <div class="tab">
              <el-table :data="tableData" border style="width: 100%" height="100%">
                <el-table-column prop="" width='' label="驳回原因" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='' label="上传日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='' label="驳回日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='80' fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" >下载</el-button>
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
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
        title="上传结果"
        :visible.sync="dialogVisible1"
        width="600px"
        >
        数据上传成功，请确认是否提交
        <span slot="footer" class="dialog-footer">
          <el-button @click="quit" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="dialogVisible1 = false ">提 交</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  import Daterange from '../com/date'
  export default {
    name: 'shouhuoUpload',
    components:{
      Daterange
    },
    data() {
      return {
        activeName:'first',
        form: {},
        total: 0,
        d1: [],
        dialogVisible1:false,
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
          {},
          {},
          {},
          {},
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
      quit(){
        this.$confirm('取消将会丢失已上传的数据，确定取消吗？', '取消', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(() => { 
          this.dialogVisible1 = false
        })
        .catch(action => {
          
        });
      },
      upload(){
        this.dialogVisible1 = true
      },
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

.shouhuoUpload{
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