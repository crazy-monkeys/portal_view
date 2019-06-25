<template>
  <div class="shopManage">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>店铺管理</h1>
      
    </div>
    <div class="box">
      <div class="btns">
        <el-button @click="add">新增店铺</el-button>
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

        width="80">
      </el-table-column>
      <el-table-column
        prop="shopStoreRelationId"
        label="shopStoreRelationId"
        v-if="false"
        >
      </el-table-column>
      <el-table-column
        prop="shopId"
        label="shopId"
        v-if="false"
        >
      </el-table-column>
      
      <el-table-column
        prop="storeName"
        label="店铺名称"
        show-overflow-tooltip
       >
      </el-table-column>
      <el-table-column
        prop="storeId"
        label="店铺Id"
        >
      </el-table-column>
     
      <el-table-column
        prop="storePerson"
        show-overflow-tooltip
        label="联系人姓名"
        >
      </el-table-column>
        <el-table-column
        prop="storeMobile"
        show-overflow-tooltip
        label="联系人手机号码"
        >
      </el-table-column>
      <el-table-column
        prop="storeMobile"
        show-overflow-tooltip
        label="创建时间"
        >
      </el-table-column>
      <!-- <el-table-column
        prop="storeType"
        show-overflow-tooltip
        label="店铺状态"
        >
        <template slot-scope="scope">
          {{tableData[scope.$index].storeType ==1 ? '正常' :tableData[scope.$index].storeType ==0 ? '关闭' :'整顿'}}
      </template>
      </el-table-column> -->
      <!-- <el-table-column
        prop="storeAddress"
        show-overflow-tooltip
        label="店铺地址"
        >
      </el-table-column> -->
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
        <el-button
          @click.native.prevent="edit(scope.$index, tableData)"
          type="text"
          >
          编辑
        </el-button>
      </template>
    </el-table-column>
    <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt="" width="140" height="140" />
            </div>
            <p :style="{'marginTop': '23px'}">无店铺信息</p>
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
        :total="total">
      </el-pagination>
    </div>
      </div>
      

    </div>
    <div class="bottom">按住 [shift] 键，可横向滚动表格哦</div>
    
    <!-- 添加店铺控件 -->
    <el-dialog
      :title="shopForm.shopStoreRelationId ? '编辑店铺':'新增店铺'"
      top='8vh'
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" label-width="80px" :model="shopForm">
          <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  店铺名称不能重复</p>
        <!-- <el-form-item label="店铺" >
          <el-select v-model="shopForm.shop" disabled>
            <el-option v-for='item in shopList' :key='item.shop_info_id'  :label="item.shop_name" :value="item.shop_info_id"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="店铺名称">
          <el-input v-model="shopForm.storeName"></el-input>
        </el-form-item>
        <el-form-item label="店铺id">
          <el-input v-model="shopForm.storeId"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model="shopForm.storePerson"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号码">
          <el-input v-model="shopForm.storeMobile"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="commit">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'ShopManage',
  data () {
    return {
      currentPage4: 4,
      shopForm: {
          radio1:1,
          storeAddress:'',
          storeMobile:'',
          storePerson:'',
          storeName:'',
          shopStoreRelationId:'',
          shopId:'',
          storeId:''
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
  created(){
    this.getShopList()

  },
  methods:{
    clearForm(){
      this.shopForm.radio1=1,
      this.shopForm.storeAddress='',
      this.shopForm.storeMobile='',
      this.shopForm.storePerson='',
      this.shopForm.storeName='',
      // this.shopForm.shopStoreRelationId='',
      this.shopForm.shopId='',
      this.shopForm.storeId=''
    },
    edit(index,rows){
      this.dialogVisible = true
      this.getMore(index,rows)
    },
    getMore(index,rows){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/shop/storeInfo?shopStoreRelationId='+rows[index].shopStoreRelationId +'&shopId=' + this.shopList[0].shop_info_id,
      }).then(res => {
          console.log("店铺详情", res);
          if(res.data.code==1){
            this.shopForm.radio1=res.data.data.storeType
            this.shopForm.storeAddress=res.data.data.storeAddress
            this.shopForm.storeMobile=res.data.data.storeMobile
            this.shopForm.storePerson=res.data.data.storePerson
            this.shopForm.storeName=res.data.data.storeName
            this.shopForm.shopStoreRelationId=res.data.data.shopStoreRelationId,
            this.shopForm.shopId=res.data.data.shopId
            this.shopForm.storeId=res.data.data.storeId
          }
          console.log(this.shopForm.shopStoreRelationId)
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //获取用户店铺列表
    getShopList(){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/getCurentUserShopList',
      }).then(res => {
          console.log("res", res);
          if(res.data.code==1){
            this.shopList = res.data.data;
            this.getTheme(this.shopList[0].shop_info_id)
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //获取店铺列表
    getTheme(shopid) {
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/shop/stores?shopId=' + shopid
      }
      ).then(res => {
          console.log("店铺列表",res.data.data);
          if(res.data.code==1){
            this.tableData = res.data.data;
            this.total =  res.data.data.total
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    //显示创建店铺框
    add(){
      this.dialogVisible = true;
      this.shopForm.shopStoreRelationId=''

    },
    close(){
      this.dialogVisible = false;
      this.clearForm()
    },
    deleteRow(index, rows) {
       this.$confirm('删除该店铺后，当前店铺的所有规则、配置均会失效，请在此确认是否删除?', '删除', {
          distinguishCancelAndClose: true,
          confirmButtonText: '是',
          cancelButtonText: '否'
        })
          .then(() => {
            this.$http.post(''+process.env.API_ROOT+'/shop/store/del',[{
                "shopId":this.shopList[0].shop_info_id,
                'shopStoreRelationId':rows[index].shopStoreRelationId
              }]).then((res)=>{
                  console.log(res)
                  if(res.data.code ==1){
                    this.$message({
                      type:'success',
                      message: '删除店铺成功'
                    })
                    this.getTheme(this.shopList[0].shop_info_id)
                  }else{
                     this.$message({
                      type:'fail',
                      message: '删除店铺失败'
                    })
                  }

              }).catch((err)=>{
                console.log(err);
                alert('网络异常')
              })
          })
          .catch(action => {
            this.$message({
              type: 'fail',
              message: '已取消操作'
            })
          });
    


    },
    commit(){
      this.$http.post(''+process.env.API_ROOT+'/shop/stores',[{
          "shopStoreRelationId":this.shopForm.shopStoreRelationId,
          "shopId":this.shopList[0].shop_info_id,
          "storeId":this.shopForm.storeId,
          "storeName":this.shopForm.storeName,
          "storeType":this.shopForm.radio1,
          "storePerson":this.shopForm.storePerson,
          "storeMobile":this.shopForm.storeMobile,
          "storeAddress":this.shopForm.storeAddress
      }]).then((res)=>{
          console.log(res)
          if(res.data.code ==1){
            this.$message({
              type:'success',
              message: this.shopForm.shopStoreRelationId ? '编辑店铺成功':'新增店铺成功'
            })
          this.getTheme(this.shopList[0].shop_info_id)
          this.clearForm()
          }else{
            this.$message({
              type:'fail',
              message: '新增店铺失败'
            })
          }

      }).catch((err)=>{
        console.log(err);

        alert('网络异常')
      })

      this.clearForm()
      this.dialogVisible = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTheme(this.currentPage,this.pageSize,this.shopList[0].shop_info_id)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getTheme(this.currentPage,this.pageSize,this.shopList[0].shop_info_id)

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;
.shopManage{
  .el-dialog{
    .el-form-item{
      margin-bottom: 0
    }
    .el-form--label-top .el-form-item__label{
      padding-bottom: 0
    }
  }
  .head{
    h1{
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
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        background: #3366FF;
        border-radius: 2px;
        height: 32px;
        line-height: 10px;
        border: none;
        margin: 12px 0 12px 20px;
      }
    }
    .tab{
      .el-table{
           td {
          height: 64px;
          line-height: 64px;
          .cell{
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
          .el-button{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #3366FF;
            letter-spacing: 0;
            line-height: 12px;

          }
        }
      }
    }

    .block{
      // position: absolute;
      bottom: 26px;
      padding: 10px;
     .el-pagination__total{
       margin-left: 500px
     }
     .btn-prev{
       margin-left: 20px
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
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }
}
</style>
