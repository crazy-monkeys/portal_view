<template>
  <div class="catalog">
      <!-- <el-button @click="aaa"></el-button> -->
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>目录管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>  目录管理</h1>
    </div>
    <div class="box">
      <div class="btns">
        <el-button @click="add" size="small" type='primary' > <i class="el-icon-plus" style="margin-right:10px;font-weight:bold"></i>新建</el-button>
        
        <el-input
          v-model="selStr"
          class="sel"
          placeholder="在当前位置搜索目录名称"
          @keyup.enter.native="search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
        </el-input>
        <div class="selTime">
          <span></span> 
          <el-date-picker
            @change='changeSelTime'
            prefix-icon='el-icon-date'
            v-model="selTime"
            type="datetimerange"
            format='yyyy-MM-dd HH:mm:ss'
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator='-'
            start-placeholder="创建开始时间"
            end-placeholder="创建结束时间"
            >
          </el-date-picker>
        </div>
        
      </div>
      <div class="tab">
        <el-table :data="tableData" style="width: 100%" height="700">
          <el-table-column type="index" label="编号" :index="q" width="100"></el-table-column>
          <el-table-column prop="catalog_id" label="ID" v-if="false"></el-table-column>
          <el-table-column prop="shop_info_id" label="shopid" v-if="false"></el-table-column>
          <el-table-column prop="type" label='类型' v-if="false"></el-table-column>
          <el-table-column prop="catalog_name" label="目录名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="group_num" label="分组数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="create_time_str" label="创建时间" show-overflow-tooltip>
            <!-- <template slot-scope="scope">
            <span>{{tableData[scope.$index].marketingChannel=='s,w' ? '全部' :tableData[scope.$index].marketingChannel=='s' ? 'SMS' :'EDM'}}</span>
            </template>-->
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button @click.native.prevent="check(scope.$index, tableData,0)" :class="(tableData[scope.$index].group_num ==0 )?'dis':''" type="text" :disabled="tableData[scope.$index].group_num ==0 ">查看分组列表</el-button>
              <el-button @click.native.prevent="edit(scope.$index, tableData)" type="text" :disabled="tableData[scope.$index].type ==0 " :class="tableData[scope.$index].type ==0?'dis':''">重命名</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" :disabled="tableData[scope.$index].type ==0 ||tableData[scope.$index].group_num !=0  " :class="(tableData[scope.$index].type ==0 ||tableData[scope.$index].group_num !=0)  ?'dis':''">删除</el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt width="140" height="140">
            </div>
            <p :style="{'marginTop': '23px'}">未查询到目录管理列表</p>
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
    <!-- 创建目录管理控件 -->
    <el-dialog
      :title='catalogForm.catalogId ? "重命名" :"新建目录"'
      :visible.sync="dialogVisible"
      width="20%"
      :before-close="qx"
      :close-on-click-modal="false"
    >
      <el-form :label-position="labelPosition" label-width="80px" :model="catalogForm" ref="catalogForm" :rules='rules'>
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  同一店铺下目录名称不能重复</p>
        <!-- <p class="danger" v-if="catalogForm.catalogId"> 原目录名称：{{catalogForm.name}}</p> -->
        <el-form-item label="目录名称" prop='name' v-if="!catalogForm.catalogId">
          <el-input v-model="catalogForm.name" class="proName"></el-input>
        </el-form-item>
        <el-form-item label="目录名称" prop='name' v-if="catalogForm.catalogId">
          <el-input v-model="catalogForm.name" class="proName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx" :plain='true'>取消</el-button>
        <el-button type="primary" @click="submitForm('catalogForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  import Bus from '../../module/bus.js'
export default {
  name: "catalog",
  data() {
    return {
      rules:{
        name: [
          { required: true,  trigger: 'blur' ,validator:formTest.name1Test}
        ]
      },
      selTime:'',
      valueStr: "",
      valueArr: [
        {
          value: ""
        }
      ],
      //屏蔽类型列表
      arr: [
        { name: "单选框", id: 1 },
        { name: "复选框", id: 2 },
        { name: "下拉框", id: 3 },
        { name: "列表框", id: 4 },
        { name: "文本框", id: 5 },
        { name: "日期", id: 6 }
      ],
      labelPosition: "top",
      catalogForm: {
        value: "",
        name: "",
        arr: "",
        checked: true,
        catalogId: "",
        catalogId:''
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
      //用户店铺列表
      shopList: [
        {
          shop_info_id: ""
        }
      ]
    };
  },
  created() {
    this.getShopList();
  },
  computed:{
    shopId(){
      return this.$store.state.shopId.shopId
    }
  },
  watch: {
    shopId:{
      handler:function(n,o){
        if(n!=o){
          console.log(1111111111111)
            this.getBlack(this.currentPage,this.pageSize,this.shopId);
        }
      }
    },
    valueArr: {
      handler: function(n, o) {
        // if(n!=o){
        var arr = [];
        n.forEach(ele => {
          if (ele.value) {
            arr.push(ele.value);
          }
        });
        this.valueStr = arr.join(",");
        // console.log(this.valueStr);

        // }
      },
      deep: true
    },
    "catalogForm.arr": {
      handler: function(n, o) {
        console.log(n, o);
        if (n !== o) {
          if (n == 6) {
            this.valueDialogVisible = false;
            console.log(this.valueDialogVisible)
          }
        }
      }
    },
    "catalogForm.name": {
      handler: function(n, o) {
        console.log(n, o);
      }
    }
  },
  methods: {
    // aaa(){
    //   this.$http
    //     .get(
          
    //      ' http://10.45.208.150:8702/shopcat/external/customer/excel/template'
    //     )
    //     .then(res => {
    //      if(res.data.code){
    //        this.$message({
    //          type:'error',
    //          message:res.data.msg
    //        })
    //      }else{
    //        location.href='http://10.45.208.150:8702/shopcat/external/customer/excel/template' 
    //      }
         
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       alert("网络异常");
    //     });
    // },
    changeSelTime(val){
      console.log(val)
    },
    resetForm(formName) {
      if(this.$refs[formName]){
      if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
      }else{
        this.$nextTick(()=>{
          this.$refs[formName].resetFields();
        })
      }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.commit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加属性值
    addValue() {
      if (this.valueArr.length < 5) {
        let obj = {
          value: ""
        };
        this.valueArr.push(obj);
      } else {
        this.$message({
          type: "error",
          message: "属性值最多可以添加至5个"
        });
      }
    },
    //删除属性值
    delValue(index) {
      this.valueArr.splice(index, 1);
    },
    search() {
      this.getBlack(
        1,
        this.pageSize,
        this.shopId
      );
      this.currentPage=1
    },
    qx() {
      this.resetForm('catalogForm')
      this.valueArr = [
        {
          value: ""
        }
      ];
      this.dialogVisible = false;
      this.clear();
    },
    clear() {
      this.catalogForm.value = "";
      this.catalogForm.name = "";
      this.catalogForm.arr = "";
      this.catalogForm.checked = true
    },
    //获取用户店铺列表
    getShopList() {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/getCurentUserShopList"
      })
        .then(res => {
          console.log("res", res);
          if (res.data.code == 1) {
            this.shopList = res.data.data;
            this.getBlack(
              this.currentPage,
              this.pageSize,
              this.shopId
            );
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    //获取目录管理列表
    getBlack(pageIndex, pageSize, shopid) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/catalog/query?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize +
          "&shopInfoId=" +
          shopid +
          "&catalogName=" +
          this.selStr + 
          '&startTime=' + (this.selTime? this.selTime[0] :'') +
          '&endTime=' +( this.selTime? this.selTime[1] :'') 
      })
        .then(res => {
          console.log("目录管理列表", res);
          if (res.data.code == 1) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          }else{
            this.tableData = [];
            this.total = 0;
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },

    //显示创建自定义框
    add() {
      this.dialogVisible = true;
      this.catalogForm.catalogId = "";
    },
    //查看分组
    check(index,rows){
      Bus.$emit('id', rows[index].catalog_id)
      this.$router.push(
        {
          name:'group',
         }
       )

    },
    //禁用启用
    edit(index,rows){
      this.dialogVisible=true
      this.catalogForm.catalogId = rows[index].catalog_id
      this.catalogForm.name = rows[index].catalog_name
      this.catalogForm.shopId = rows[index].shop_info_id
    },


    rename(id, name,shopId) {
      this.$http
        .post(
          "" + process.env.API_ROOT + "/customer/manage/catalog/edit",
          {
            catalogName: name,
            shopInfoId:shopId,
            catalogId:id
          }
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message:"重命名成功" 
            });
            this.getBlack(
              this.currentPage,
              this.pageSize,
              this.shopId
            );
            this.qx()
          } else {
            if (res.data.code == -1) {
              this.$message({
                type: "error",
                message: "系统异常"
              });
            }
            if (res.data.code == 31001) {
              this.$message({
                type: "error",
                  message: '时间格式不正确'
              });
            }
            if (res.data.code == 31002) {
              this.$message({
                type: "error",
                message: "目录名称含有特殊字符"
              });
            }
            if (res.data.code == 31004) {
              this.$message({
                type: "error",
                message: "目录名称超出10个长度"
              });
            }
            if (res.data.code == 31005) {
              this.$message({
                type: "error",
                message: "目录名称已存在"
              });
            }
            if (res.data.code == 31006) {
              this.$message({
                type: "error",
                message: "目录不存在"
              });
            }
            if (res.data.code == 31007) {
              this.$message({
                type: "error",
                message: "目录下存在客户分组，不允许删除"
              });
            }
            if (res.data.code == 31008) {
              this.$message({
                type: "error",
                message: "目录已删除请勿重复操作"
              });
            }
            if (res.data.code == 31009) {
              this.$message({
                type: "error",
                message: "默认目录不可编辑"
              });
            }
            if (res.data.code == 31010) {
              this.$message({
                type: "error",
                message: "默认目录不可删除"
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
          alert("网络异常");
        });
    },
    //删除
    deleteRow(index, rows) {
      this.$confirm("确定要删除该目录管理吗?", "删除", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$http
            .post(
              "" + process.env.API_ROOT + "/customer/manage/catalog/delete",
              {
                catalogId: rows[index].catalog_id
              }
            )
            .then(res => {
              console.log(res);
              if (res.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "删除目录成功"
                });
                this.getBlack(
                  this.currentPage,
                  this.pageSize,
                  this.shopId
                );
              } else {
                            if (res.data.code == -1) {
              this.$message({
                type: "error",
                message: "系统异常"
              });
            }
            if (res.data.code == 31001) {
              this.$message({
                type: "error",
                  message: '时间格式不正确'
              });
            }
            if (res.data.code == 31002) {
              this.$message({
                type: "error",
                message: "目录名称含有特殊字符"
              });
            }
            if (res.data.code == 31004) {
              this.$message({
                type: "error",
                message: "目录名称超出10个长度"
              });
            }
            if (res.data.code == 31005) {
              this.$message({
                type: "error",
                message: "目录名称已存在"
              });
            }
            if (res.data.code == 31006) {
              this.$message({
                type: "error",
                message: "目录不存在"
              });
            }
            if (res.data.code == 31007) {
              this.$message({
                type: "error",
                message: "目录下存在客户分组，不允许删除"
              });
            }
            if (res.data.code == 31008) {
              this.$message({
                type: "error",
                message: "目录已删除请勿重复操作"
              });
            }
            if (res.data.code == 31009) {
              this.$message({
                type: "error",
                message: "默认目录不可编辑"
              });
            }
            if (res.data.code == 31010) {
              this.$message({
                type: "error",
                message: "默认目录不可删除"
              });
            }
              }
            })
            .catch(err => {
              console.log(err);
              alert("网络异常");
            });
        })
        .catch(action => {
          this.$message({
            type: "fail",
            message: "已取消操作"
          });
        });
    },

    commit() {
      if (this.catalogForm.catalogId) {
        this.rename(this.catalogForm.catalogId,this.catalogForm.name,this.catalogForm.shopId)
      } else {
        this.$http
          .post("" + process.env.API_ROOT + "/customer/manage/catalog/add", {
            catalogName: this.catalogForm.name ,
            shopInfoId: this.shopId,
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: "新增目录管理成功"
              });
              this.getBlack(
                this.currentPage,
                this.pageSize,
                this.shopId
              );
              this.qx();
            } else {
                         if (res.data.code == -1) {
              this.$message({
                type: "error",
                message: "系统异常"
              });
            }
            if (res.data.code == 31001) {
              this.$message({
                type: "error",
                  message: '时间格式不正确'
              });
            }
            if (res.data.code == 31002) {
              this.$message({
                type: "error",
                message: "目录名称含有特殊字符"
              });
            }
            if (res.data.code == 31004) {
              this.$message({
                type: "error",
                message: "目录名称超出10个长度"
              });
            }
            if (res.data.code == 31005) {
              this.$message({
                type: "error",
                message: "目录名称已存在"
              });
            }
            if (res.data.code == 31006) {
              this.$message({
                type: "error",
                message: "目录不存在"
              });
            }
            if (res.data.code == 31007) {
              this.$message({
                type: "error",
                message: "目录下存在客户分组，不允许删除"
              });
            }
            if (res.data.code == 31008) {
              this.$message({
                type: "error",
                message: "目录已删除请勿重复操作"
              });
            }
            if (res.data.code == 31009) {
              this.$message({
                type: "error",
                message: "默认目录不可编辑"
              });
            }
            if (res.data.code == 31010) {
              this.$message({
                type: "error",
                message: "默认目录不可删除"
              });
            }
            }
            this.qx();
          })
          .catch(err => {
            console.log(err);

            alert("网络异常");
          });
      }
      this.dialogVisible = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getBlack(
        this.currentPage,
        this.pageSize,
        this.shopId
      );
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getBlack(
        this.currentPage,
        this.pageSize,
        this.shopId
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.catalog {

  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #000
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background: #3366ff;
    border-color:#3366ff
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
      font-family: PingFangSC-Medium;
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
      .selTime {
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
          display: inline-block;
          height: 32px;
        }
        .el-date-editor .el-range-separator{
          line-height: 20px;
        }
      }
      
      // .el-button {
      //   font-family: PingFangSC-Medium;
      //   font-size: 14px;
      //   color: #ffffff;
      //   letter-spacing: 0;
      //   background: #3366ff;
      //   border-radius: 0px;
      //   height: 32px;
      //   border: none;
      //   margin: 12px 0 12px 20px;
      //   span{
      //     display: block;
      //     height: 14px;
      //     line-height: 14px;
      //     padding: 0;
      //     margin-top: -2px;
      //   }
      // }
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
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
          }
          .el-button {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #3366ff;
            letter-spacing: 0;
            line-height: 12px;
          }
          .dis{
opacity: 0.35;
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
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }
}
</style>
