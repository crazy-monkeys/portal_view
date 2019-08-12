<template>
  <div class="delearRelation">
    <div class="sellBox">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item to='/home/account/settings'>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理商关联配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box clear">
        <div class="btns">
          <el-button type='primary' size='small' @click="add">新建</el-button>
        </div>
        <div class="tab">
          <el-table :data="roles" border highlight-current-row ref='tab' height="100%">
            <el-table-column prop='id' label="ID" v-if="false" width="80">
            </el-table-column>
            <el-table-column prop="" label="模块" width="200">
            </el-table-column>
            <el-table-column prop="" label="代理商" width="200">
            </el-table-column>
            <el-table-column prop="" label="客户" width="200">
            </el-table-column>
            <el-table-column prop="" label="关联营销运作部" width="">
            </el-table-column>
            <el-table-column prop="" label="关联代理商经营部" width="">
            </el-table-column>
            <el-table-column label="操作" width="80" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="mod">
                  修改
                </el-button>
              </template>
            </el-table-column>
            <div slot="empty">

              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 100]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
        
    </div>
    
    <el-dialog title="配置"  :visible.sync="dialogVisible1" width="400px" :before-close="close"
      :close-on-click-modal="false">
      <el-form label-position="top" label-width="auto" :model="form" :rules='rules' size="small" ref='form' class="form">
        <el-form-item label="模块" prop=''>
          <el-select v-model="form.modal"   filterable>
            <el-option label="模块1" value="1"></el-option>
            <el-option label="模块2" value="2"></el-option>
            <el-option label="模块3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop=''>
          <el-select v-model="form.part"   filterable>
            <el-option label="部门1" value="1"></el-option>
            <el-option label="部门2" value="2"></el-option>
            <el-option label="部门3" value="3"></el-option>
          </el-select>
        </el-form-item>
       <el-form-item label="操作员" prop=''>
          <el-select v-model="form.people"   filterable>
            <el-option label="操作员1" value="1"></el-option>
            <el-option label="操作员2" value="2"></el-option>
            <el-option label="操作员3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户类型" prop=''>
          <el-select v-model="form.customerType"   filterable>
            <el-option label="代理商" value="1"></el-option>
            <el-option label="客户" value="2"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="客户" prop=''>
          <el-select v-model="form.customer" multiple  filterable>
            <el-option label="客户1" value="1"></el-option>
            <el-option label="客户2" value="2"></el-option>
            <el-option label="客户3" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">取消</el-button>
        <el-button type="primary" @click='close' size="small">提交</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";

export default {
  name: "delearRelation",
  data() {
    return {
      form: {
        customer: "",
        customerType: "",
        people: "",
        part: "",
        modal: "",
      },
      dialogVisible: false,
      dialogVisible1: false,
      rules: {
        // name: [
        //   { required: true, trigger: "change", validator: formTest.roleName }
        // ]
      },
      //角色列表
      roles: [
        {}
      ],
      pageSize:10,
      currentPage:1,
      total:0,
    };
  },
  created(){
  },
  computed:{
   
  },
  methods: {
    mod(){
      this.dialogVisible1 = true
    },
    add(){
      this.dialogVisible1 = true;
    },
     //修改表单提交
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      if (this.$refs[formName]) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        } else {
          this.$nextTick(() => {
            this.$refs[formName].resetFields();
          });
        }
      }
    },
    close(){
      this.dialogVisible1 = false;
      this.resetForm('form')
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.delearRelation{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;

  .el-dialog{
    .el-select{
      width: 100%;
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
    // .form {
    //     .el-form-item__label {
    //       height: 30px;
    //     }
    //     .el-form-item {
    //       width: 100%;
    //       margin-bottom: 0;
    //       .el-select{
    //         width: 100%;
    //       }
    //     }
    //     .date {
    //       width: 414px;
    //       .el-date-editor {
    //         width: 414px;
    //       }
    //     }
    // }
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