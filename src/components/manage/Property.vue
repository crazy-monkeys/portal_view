<template>
  <div class="propety">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home/sell">客户管理</el-breadcrumb-item>
        <el-breadcrumb-item >Open客户</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>Open客户</h1>
    </div>
    <div class="box">
      <div class="btns">
        <el-button @click="add" size="small" type='primary' >新建</el-button>
        <!-- <el-input
          v-model="selStr"
          class="sel"
          placeholder="在当前位置搜索属性名称"
          @keyup.enter.native="search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
        </el-input> -->
      </div>
      <div class="tab">
        <el-table :data="tableData" style="width: 100%" height="700">
          <el-table-column type="index" label="编号" :index="q" width="100"></el-table-column>
          <el-table-column prop="custom_property_id" label="ID" v-if="false"></el-table-column>
          <el-table-column prop="custom_property_name" label="属性名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="" label="属性类别" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="tableData[scope.$index].custom_property_type==1">单选框</span>
              <span v-if="tableData[scope.$index].custom_property_type==2">复选框</span>
              <span v-if="tableData[scope.$index].custom_property_type==3">下拉框</span>
              <span v-if="tableData[scope.$index].custom_property_type==4">列表框</span>
              <span v-if="tableData[scope.$index].custom_property_type==5">文本框</span>
              <span v-if="tableData[scope.$index].custom_property_type==6">日期</span>
            </template>
          </el-table-column>
          <el-table-column prop="custom_property_value" label="属性值" show-overflow-tooltip>
            
          </el-table-column>
          <el-table-column prop label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{tableData[scope.$index].status==1 ? '启用中' :'禁用中'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button @click.native.prevent="getMore(scope.$index, tableData)" type="text">编辑</el-button>
              <el-button
                @click.native.prevent="stopAndStart(scope.$index, tableData,0)"
                type="text"
                v-if="tableData[scope.$index].status==1"
              >禁用</el-button>
              <el-button
                @click.native.prevent="stopAndStart(scope.$index, tableData,1)"
                type="text"
                v-if="tableData[scope.$index].status==0"
              >启用</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text">删除</el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt width="140" height="140">
            </div>
            <p :style="{'marginTop': '23px'}">无自定义属性</p>
          </div>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 100]"
            :page-size="10"
            layout="sizes,total, jumper, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 创建自定义属性控件 -->
    <el-dialog
      :title='blackForm.customPropertyId ? "编辑自定义属性" :"新建自定义属性"'
      :visible.sync="dialogVisible"
      width="20%"
      :before-close="qx"
      :close-on-click-modal="false"
    >
      <el-form :label-position="labelPosition" label-width="80px"  :model="blackForm" ref="blackForm" >

        <el-form-item label="属性名称" prop='name' :rules='rules.name'>
          <el-input v-model="blackForm.name" class="proName" maxlength='5'></el-input>
          <el-checkbox v-model="blackForm.checked" >直接启用</el-checkbox>
        </el-form-item>

        <el-form-item label="属性类别" prop='arr' :rules='rules.arr' >
          <el-select v-model="blackForm.arr">
            <el-option v-for="item in arr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <div v-for="(item,index) in blackForm.valueArr"  :key="index">
          <el-form-item :label="index ==0 ?'属性值': ''"  :prop="'valueArr.'+index+'.value'" v-if='blackForm.arr!=6 &&blackForm.arr!=5' :rules="rules.value"  >
            <div  class='valueBox' >
              <el-input v-model="item.value" class="proName" maxlength='5' ></el-input>
              <i class="el-icon-plus plus" @click="addValue" ></i>
              <i class="el-icon-delete plus" @click="delValue(index)" v-if="index!=0" ></i>
            </div>  
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx" :plain='true'>取消</el-button>
        <el-button type="primary" @click="submitForm('blackForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'

export default {
  name: "propety",
  data() {
    return {
      rules:{
        arr: [
          { required: true, message: '请选择属性类别', trigger: 'change' },
        ],
        name: [
          { required: true,  trigger: 'blur' ,validator:formTest.name1Test}
        ],
        value: [
          { required: true, trigger: 'blur',validator:formTest.name3Test}
        ]
      },
      valueStr: "",
      //屏蔽类型列表
      arr: [
        { name: "单选框", id: 1 },
        { name: "复选框", id: 2 },
        { name: "下拉框", id: 3 },
        { name: "文本框", id: 5 },
        { name: "日期", id: 6 }
      ],
      labelPosition: "top",
      blackForm: {
        valueArr: [
        {
          value: ""
        }
      ],
        name: "",
        arr: "",
        checked: true,
        customPropertyId: ""
      },
      //搜索条件
      selStr: "",
      dialogVisible: false,
      valueDialogVisible: true,
      tableData: [],
      //默认页
      currentPage: 1,
      //默认数量
      pageSize: 10,
      //默认总页数
      total: 0,
    };
  },
  methods: {
    resetForm(formName) {
    
    },
    submitForm(formName) {
      
    },
    //添加属性值
    addValue() {
      if (this.blackForm.valueArr.length < 5) {
        let obj = {
          value: ""
        };
        this.blackForm.valueArr.push(obj);
      } else {
        this.$message({
          type: "error",
          message: "属性值最多可以添加至5个"
        });
      }
    },
    //删除属性值
    delValue(index) {
      this.blackForm.valueArr.splice(index, 1);
    },
    search() {
     
    },
    qx() {
      this.dialogVisible = false;
    },
    clear() {
    },
    //获取用户店铺列表
    getShopList() {
      
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    //获取自定义属性列表
    getBlack(pageIndex, pageSize, shopid) {
      
    },

    //显示创建自定义框
    add() {
      this.dialogVisible = true;
    },
    //禁用启用
    stopAndStart(index, rows, type) {
      
    },
    //删除
    deleteRow(index, rows) {
    },
    //详情
    getMore(index, rows) {
    
    },
    commit() {
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.propety {
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #000
  }
  .el-dialog__body{
    padding: 30px 20px 0 20px
  }
  .valueBox{
    margin-bottom: 20px;
  }
  .proName {
    width: 60%;
  }
  .plus {
    font-size: 20px;
    margin-left: 20px;
  }
  .head {
    h1 {
      opacity: 0.87;
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 36px;
      height: 42px;
      font-weight: bold;
      padding: 0 50px;
      // float: left;
    }
    .el-breadcrumb {
      // float: right;
      margin-left: 50px;
      line-height: 30px;
      margin-right: 20px;
    }
  }
  .box {
    position: relative;
    margin: 0 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    .btns {
      .sel {
        width: 200px;
        float: right;
        line-height: 32px;
        height: 32px;
        margin: 12px 40px 0 0;
        .el-input__inner {
          border-radius: 0;
          height: 32px;
          line-height: 32px;
        }
        .el-input__icon {
          line-height: 32px;
        }
      }
      .el-button {
        margin: 12px 0 12px 20px;
      }
    }
    .tab {
      .el-table {
        td {
          height: 64px;
          line-height: 64px;
          .cell {
            // overflow: hidden;
            // text-overflow:ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // -webkit-box-orient: vertical;
            // width:200px;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
          }
          .el-button {
            font-size: 12px;
            color: #3366ff;
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
  .danger {
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }
}
</style>
