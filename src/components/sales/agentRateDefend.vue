<template>
  <div class="agentRateDefend">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>代理商费率管理</el-breadcrumb-item>
          <el-breadcrumb-item>代理商费率查询</el-breadcrumb-item>
          <el-breadcrumb-item>维护</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      
      <div class="box">
        <div class="btns">
          <el-button size="small" type="primary" @click="defend">下载模版</el-button>
          <el-button size="small" type="primary" @click="defend">上传</el-button>
          <el-button size="small" type="primary" @click="defend">发布</el-button>
          <!-- <el-button size="small" type="primary" @click="add1(2)">驳回</el-button> -->
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%">
            <el-table-column prop="0" width='' label="客户分类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="0" width='' label="客户名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="0" width='' label="产品层次一" show-overflow-tooltip></el-table-column>
            <el-table-column prop="1" width="" label="产品层次二" show-overflow-tooltip></el-table-column>
            <el-table-column prop="1" width="" label="产品层次三" show-overflow-tooltip></el-table-column>
            <el-table-column prop="1" width="" label="Product Type" show-overflow-tooltip></el-table-column>
            <el-table-column prop="1" width="" label="基准代理费率(%)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="1" width="" label="浮动代理费率(%)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="1" width="" label="有效开始日期" show-overflow-tooltip></el-table-column>
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
        title="审批"
        :visible.sync="dialogVisible1"
        width="400px"
        top="10vh"
        >
        <el-form ref="form" :model="form" size="small" class="form" label-width="auto" label-position='top'  >
          <el-form-item label="审批意见">
            <el-input size='small' rows='4' resize="none" type="textarea" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1= false" size="small" type="primary" plain>驳 回</el-button>
            <el-button type="primary" @click="dialogVisible1 = false" size="small">通 过</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import Daterange from "../com/date";
  export default {
    name: 'agentRateDefend',
    components:{
      Daterange
    },
    data() {
      return {
        form: {},
        dialogVisible1:false,
        value: '',
        dialogVisible: false,
        tableData: [
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
      shopId() {
        return this.$store.state.shopId.shopId
      }
    },
    created() {
    },
    watch: {
    },
    methods: {
      approve(type) {
        this.dialogVisible1 = true
      },
      defend(){
        this.$router.push({
          name:'agentRateDefend'
        })
      },
      change() {
        this.dialogVisible = !this.dialogVisible
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
.agentRateDefend{
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