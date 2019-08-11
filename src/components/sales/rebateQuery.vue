<template>
  <div class="rebateQuery">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>商务管理</el-breadcrumb-item>
          <el-breadcrumb-item>Rebate查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
          <el-form-item label="代理商">
            <el-input size='small' v-model="form.value1" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="客户">
            <el-input size='small' v-model="form.value2" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.value3" size="small"> 
              <el-option label="审核中" value='1'></el-option> 
              <el-option label="CS确认" value='2'></el-option> 
              <el-option label="客户确认" value='2'></el-option> 
              <el-option label="执行完成" value='2'></el-option> 
            </el-select>
          </el-form-item>
          <el-form-item :label="checkedCities.length==0 ?'' : ' '">
            <el-button size='small' type='primary' plain>查询</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="700">
            <el-table-column prop="" width='30' show-overflow-tooltip label=""></el-table-column>
            <el-table-column prop="6" label="代理商" show-overflow-tooltip></el-table-column>
            <el-table-column prop="7" label="客户" show-overflow-tooltip></el-table-column>
            <el-table-column prop="8" label="Rebate金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="8" label="执行方式" show-overflow-tooltip></el-table-column>
            <el-table-column prop="8" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="9" label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="10" label="操作" fixed="right" width="100" >
              <template >
                <el-button type='text' @click="send" >上传</el-button>
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
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible1"
  width="400px"
  >
  <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' >
          
          <el-form-item label="执行方">
            <el-select v-model="form.value3" size="small"> 
              <el-option label="执行方1" value='1'></el-option> 
              <el-option label="执行方2" value='2'></el-option> 
            </el-select>
          </el-form-item>
          <el-form-item label="释放金额">
            <el-input size='small' v-model="form.value1" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="执行方式">
            <el-select v-model="form.value3" size="small"> 
              <el-option label="执行方式1" value='1'></el-option> 
              <el-option label="执行方式2" value='2'></el-option> 
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" size='small' v-model="form.value1" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false" size="small">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  export default {
    name: 'rebateQuery',
    data() {
      return {
        form: {
          value1:'',
          value2:'',
          value3:'',
        },
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
      send(){
        this.dialogVisible1 = true
      },
      mx(){
        this.$router.push({
          name:'rebateDetail'
        })
      },
      reset(){
        this.form={
          value1:'',
          value2:'',
          value3:'',
        }
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

 .rebateQuery{
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