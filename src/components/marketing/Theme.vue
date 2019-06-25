<template>
  <div class="theme">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home/sell">客户管理</el-breadcrumb-item>
        <el-breadcrumb-item >报备查询</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>报备查询</h1>
    </div>
    <div class="box">
      <div class="btns">
        <el-button @click="add" type='primary' size='small'>新建</el-button>
      </div>
      <div class="tab">
        <el-table
        :data="tableData"
        style="width: 100%"
        height="700"
        >
      <el-table-column
        type="index"
        label="编号"
        :index='q'

        width="150">
      </el-table-column>
      <el-table-column
        prop="themeId"
        label="ID"
        v-if="false"
        >
      </el-table-column>
      <el-table-column
        prop="themeName"
        label="主题名称"
        show-overflow-tooltip
       >
      </el-table-column>
      <!-- <el-table-column
        prop="shop"
        show-overflow-tooltip
        label="所属店铺"
        >
      </el-table-column> -->
       <el-table-column
        prop="createTimeStr"
        show-overflow-tooltip
        label="创建时间"
        >
      </el-table-column>
      <el-table-column
      label="操作"
      width="100"
      >
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          >
          删除
        </el-button>
      </template>
    </el-table-column>
    <div slot="empty">
      <div>
        <img src="../../assets/img/none.png" alt="" width="140" height="140" />
      </div>
      <p >未查询到报备信息</p>
    </div>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 100]"
        :page-size="pageSize"
        layout="sizes,total, jumper, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
      </div>
    </div>
    <!-- 添加主题控件 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" ref='themeForm' label-width="80px" :rules='rules1' :model="themeForm">
          <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  同一店铺下的主题名称不能重复</p>
        <el-form-item label="店铺" prop='shop'>
          <el-select v-model="themeForm.shop" :disabled="true">
            <el-option v-for='item in shopList' :key='item.shop_info_id'  :label="item.shop_name" :value="item.shop_info_id"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="主题名称" prop='theme'>
          <el-input v-model="themeForm.theme"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm1('themeForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'

export default {
  name: 'Theme',
  data () {
    return {
      rules1: {
        theme: [
          { required: true, message: '请选择主题', trigger: 'change' },
          { min: 1, max: 20, message: '主题名称不可超过20个字符', trigger: 'change'  }
        ],
        shop: [
          { required: true, message: '请选择店铺', trigger: 'change' }
        ]
      },
      currentPage4: 4,
      themeForm: {
          date:'2016-05-02',
          shop: '',
          theme: '',
        },
      labelPosition: 'top',
      dialogVisible: false,
      tableData: [],
      currentPage : 1,
      pageSize : 10,
      shopList:[
        {
          shop_info_id:'',
        }
      ],
      total:0,
    }
  },
 
  methods:{
    resetForm(formName) {
     
    },
    submitForm1(formName) {
       
    },
    //获取用户店铺列表
    getShopList(){
     
    },
    q(index){
     return this.pageSize * (this.currentPage-1) + index +1
    },
    //获取主题列表
    getTheme(pageIndex,pageSize,shopid) {
      
    },
    //显示新建框
    add(){
      this.dialogVisible = true;
    },
    close(){
      this.dialogVisible = false;
    },
    deleteRow(index, rows) {
    },
    commit(){
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;
.theme{
  // overflow-y: auto;
  // height: 100%;
  .head{
    h1{
        opacity: 0.87;
        font-size: 18px;
        color: #000;
        letter-spacing: 0;
        line-height: 42px;
        height: 42px;
        font-weight: bold;
        padding: 0 50px;
        // float: left;
      }
    .el-breadcrumb{
      // float: right;
      margin-left: 50px;
      line-height: 30px;
      margin-right: 20px
    }
  }
  .box{
    position: relative;
    margin: 0 20px 20px 20px;
    background: #FFFFFF;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
    border-radius: 2px;
    .btns{
      .el-button{
        margin: 12px 0 12px 20px;
      }
    }
    .tab{
      .el-table{
          td {
            height: 64px;
            line-height: 64px;
            .cell{
                
                  font-size: 12px;
                  color: #333333;
                  letter-spacing: 0;
                  line-height: 18px;

            }
            .el-button{
              font-size: 12px;
              color: #3366FF;
              letter-spacing: 0;
              line-height: 12px;

            }
          }
      }
    }

      .block {
      // position: absolute;
      bottom: 26px;
      padding: 10px;
      .el-pagination{
        width: 100%;
        text-align: center
      }
      
    }
 
  }
   .bottom{
      text-align: center;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
      line-height: 16px;
    }
  .danger{
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }
}
</style>
