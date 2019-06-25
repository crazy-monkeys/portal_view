<template>
  <div class="group">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户分组</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>用户分组</h1>
    </div>
    <div class="box">
      <div class="btns">
        <el-button @click="add" > <i class="el-icon-plus" style="margin-right:10px;font-weight:bold"></i>新建用户分组</el-button>
        
        <el-input
          v-model="selStr"
          class="sel"
          placeholder="在当前位置搜索分组名称"
          @keyup.enter.native="search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
        </el-input>
        <el-select v-model="select" placeholder="请选择" size='small' class="select" @change='changeCatalog'>
          <el-option
            v-for="item in catalogList"
            :key="item.catalog_id"
            :label="item.catalog_name"
            :value="item.catalog_id">
          </el-option>
        </el-select>
      </div>
      <div class="tab">
        <el-table :data="tableData" style="width: 100%" height="700">
          <el-table-column type="index" label="编号" :index="q" width="100"></el-table-column>
          <el-table-column prop="customer_group_id" label="ID" v-if="false"></el-table-column>
          <el-table-column prop="customer_group_name" label="分组名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="catalog_name" label="分组目录" show-overflow-tooltip></el-table-column>
          <el-table-column prop="create_time_str" label="创建时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="" label="更新时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="tableData[scope.$index].update_time_str">{{tableData[scope.$index].update_time_str}}</span>
              <span v-if="!tableData[scope.$index].update_time_str">{{tableData[scope.$index].create_time_str}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click.native.prevent="edit(scope.$index, tableData)" type="text">编辑</el-button>
              <el-dropdown trigger="click" @command='a'>
                <span class="el-dropdown-link">
                  生成快照<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command='{name:"生成手机快照",value:"SMS",id:tableData[scope.$index].customer_group_id}' >生成手机快照</el-dropdown-item>
                  <el-dropdown-item :command='{name:"生成邮箱快照",value:"EDM",id:tableData[scope.$index].customer_group_id}' disabled>生成邮箱快照</el-dropdown-item>
                  <el-dropdown-item :command='{name:"生成淘宝ID快照",value:"TB",id:tableData[scope.$index].customer_group_id}' disabled>生成淘宝ID快照</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
    <div class="bottom">按住 [shift] 键，可横向滚动表格哦</div>
    
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  import Bus from '../../module/bus.js'

export default {
  name: "group",
  data() {
    return {
      //目录列表
      catalogList:[],
      //搜索条件
      selStr: "",
      select:'',
      tableData: [],
      //默认页
      currentPage: 1,
      //默认数量
      pageSize: 10,
      //默认总页数
      total: 0,
    };
  },
  created() {
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
      this.getCatalogList('','',this.shopId)
      Bus.$on('id', (data) => {
        console.log(data)
        this.select = data
        this.getGroupList(this.currentPage,this.pageSize,this.shopId)
      })
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
            this.getCatalogList('','',this.shopId)
            this.getGroupList(this.currentPage,this.pageSize,this.shopId)
        }
      }
    },
  },
  methods: {
    a(command){
      this.product(command.id,command.value)
    },
    //改变目录
    changeCatalog(val){
      console.log(val)
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
    },
    // 获取分组列表
    getGroupList(pageIndex, pageSize, shopid) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/customerGroup/queryList?shopInfoId=" +
          shopid +'&customerGroupName=' + this.selStr +'&catalogId='+this.select +'&pageIndex='+pageIndex +'&pageSize='+pageSize
      })
        .then(res => {
          console.log("分组列表", res);
          if (res.data.code == 1) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          }else{
          }
        })
        .catch(error => {
          console.log(error);
          alert("网络异常");
        });
    },
    // 
    //获取目录管理列表
    getCatalogList(pageIndex, pageSize, shopid) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/catalog/query?shopInfoId=" +
          shopid 
      })
        .then(res => {
          console.log("目录管理列表", res);
          if (res.data.code == 1) {
            this.catalogList = res.data.data.list
            this.catalogList.unshift(
              {
                catalog_id:"",
                catalog_name:'全部分组目录'
              }
            )
          }else{

          }
        })
        .catch(error => {
          console.log(error);
          alert("网络异常");
        });
    },
    search() {
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
    },
    clear() {
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    //显示创建自定义框
    add() {
      this.$router.push(
        {
          name:'AddGroup'
        }
      )
    },

    product(id,type){
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/customerGroup/saveSnapshot?customerGroupId=" +
          id +'&snapshotType='+type
      })
        .then(res => {
          console.log("生成快照结果", res);
          if (res.data.code == 1) {

          }else{

          }
        })
        .catch(error => {
          console.log(error);
          alert("网络异常");
        });
    },
    //详情
    edit(index, rows) {
      this.$router.push(
        {
          name:'EditGroup',
          params:{
            id:rows[index].customer_group_id
          }
        }
      )
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.group {
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
      .select{
        float: right;
        margin: 12px ;
        .el-input__inner{
          border-radius: 0;
          // border:1px solid #ccc;
        }
      }
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
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        background: #3366ff;
        border-radius: 0px;
        height: 32px;
        border: none;
        margin: 12px 0 12px 20px;
        span{
          display: block;
          height: 14px;
          line-height: 14px;
          padding: 0;
          margin-top: -2px;
        }
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
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
          }
              .el-dropdown-link{
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  color: #3366FF;
                  letter-spacing: 0;
                  line-height: 12px;
                  margin-right: 10px;
                  margin-left: 10px;
              }
          .el-button {
            font-family: PingFangSC-Regular;
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
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }
}
</style>
