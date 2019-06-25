<template>
<keep-alive>
  <div class="coupon">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>客户权益</el-breadcrumb-item>
          <el-breadcrumb-item>优惠券规则</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>优惠券规则</h1>
      </div>

      <div class="box">
        <div class="btns clear">
          <!-- 新建按钮 -->
          <el-button  class="add" @click="add" size='small'>新建优惠券规则</el-button>
          <!-- <el-select
            size='small'
            v-model="form.store"
            filterable
            placeholder="请选择商户"
            class="level"
            @change='changeStore'
          >
            <el-option
              v-for="item in store"
              :key="item.api_merchant_id"
              :label="item.api_merchant_name"
              :value="item.api_merchant_id"
            ></el-option>
          </el-select> -->
        </div>
        
          <div class="selBox clear">
            <div class="form">
              <el-form
                :model="form"
                ref="form"
                label-width="100px"
                class="form"
                label-position="top"
                :inline='true'
                :rules='rules'
              >
            <!-- 日期选择 -->
                <el-form-item label="规则时间" prop="">
                  <el-date-picker
                    v-model="form.selTime"
                    prefix-icon="el-icon-fire"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    size='small'
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="执行状态" prop="">
                  <!-- 下拉列表 选择执行状态  -->
                  <el-select
                    size='small'
                    v-model="form.status"
                    filterable
                    placeholder=""
                    class="level"
                  >
                    <el-option
                      v-for="item in status"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                  <!-- 下拉列表 选择优惠券种类 -->
                <el-form-item label="优惠券种类" prop="">
                  <el-select
                  size='small'
                  v-model="form.status"
                  filterable
                  placeholder=""
                  class="level"
                >
                  <el-option
                    v-for="item in status"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
                <!-- 下拉列表 选择优惠券种类 -->
              <el-form-item label="优惠券种类" prop="">
                <el-select
                size='small'
                  v-model="form.type"
                  filterable
                  placeholder=""
                  class="type"
                >
                  <el-option
                    v-for="item in types"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item> 
                  
              <el-form-item label="规则名称" prop="name"  size='small'>
                <el-input v-model="form.name" maxlength='10'> </el-input>
              </el-form-item>

                <el-form-item  >
                  <el-button size='small' @click='reset'>重置</el-button>
                  <el-button type="primary" size='small' @click='search'>搜索</el-button>
                </el-form-item>
              </el-form>
            </div>

            
            
          </div>

        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="700" @row-click="rowClick">
            <!-- <el-table-column type="index" :index="q" label="编号" width="100"></el-table-column> -->
            <el-table-column   label="" width="30"></el-table-column>

            <el-table-column show-overflow-tooltip prop="couponConfigId" v-if="false"  label="ID"></el-table-column>

            <el-table-column show-overflow-tooltip prop="couponName" label="规则名称"></el-table-column>

            <el-table-column label="优惠券种类" prop="" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="tableData[scope.$index].couponType=='BIRTHDAY_COUPON'">生日优惠券</span>
                <span v-if="tableData[scope.$index].couponType=='POINT_COUPON'">积分优惠券</span>
                <span v-if="tableData[scope.$index].couponType=='LEVEL_UP_COUPON'">等级优惠券</span>
              </template>
            </el-table-column>

            <el-table-column
              label="发放规则"
              prop="grantRule"
              show-overflow-tooltip
            >
            
            </el-table-column>

            <el-table-column
              label="已关联活动"
              show-overflow-tooltip
              prop="unexActivityName"
            ></el-table-column>

            <el-table-column label="开始时间" show-overflow-tooltip prop="validTime" ></el-table-column>
            <el-table-column label="结束时间" show-overflow-tooltip prop="invalidTime"></el-table-column>

            <el-table-column label="执行状态" show-overflow-tooltip prop="">
              <template slot-scope="scope">
                <span v-if="tableData[scope.$index].state==1">未开始</span>
                <span v-if="tableData[scope.$index].state==2">执行中</span>
                <span v-if="tableData[scope.$index].state==3">已结束</span>
                <span v-if="tableData[scope.$index].state==4">禁用</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="300">
              <template slot-scope="scope">
                <el-button
                  @click="edit(tableData[scope.$index].couponConfigId,form.store)"
                  v-if="tableData[scope.$index].state==1||tableData[scope.$index].state==4"
                  type='text'
                >编辑</el-button>
                <el-button
                  @click="check(tableData[scope.$index].couponConfigId,form.store)"
                  type='text'
                  v-if="tableData[scope.$index].state==2||tableData[scope.$index].state==3"
                 
                >查看</el-button>
                <el-button
                  @click="stop(tableData[scope.$index].couponConfigId,tableData[scope.$index].state,tableData[scope.$index].couponName)"
                  type='text'
                  v-if="tableData[scope.$index].state==1||tableData[scope.$index].state==2||tableData[scope.$index].state==3"
                  :disabled='tableData[scope.$index].state==3'
                  :class="tableData[scope.$index].state==3?'dis':''"
                >禁用</el-button>
                <el-button
                  @click="start(tableData[scope.$index].couponConfigId,tableData[scope.$index].state)"
                  type='text'
                  v-if="tableData[scope.$index].state==4"
                >启用</el-button>
                <el-button
                  @click="del(tableData[scope.$index].couponConfigId)"
                  type='text'
                  :disabled='tableData[scope.$index].state==2'
                  :class="tableData[scope.$index].state==2?'dis':''"
                >删除</el-button>
              </template>
            </el-table-column>
            <div slot="empty" class="empty">
              <div>
                <img src="../../assets/img/none1.png" alt width="140" height="140">
              </div>
              <p :style="{'marginTop': '23px'}">您还没有添加优惠券规则</p>
              <p :style="{'marginTop': '23px'}">点击上方新增优惠券规则，开始设置优惠券规则吧！</p>
            </div>
          </el-table>
        </div>
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

      <div class="bottom">按住 [shift] 键，可横向滚动表格哦</div>
  </div>
</keep-alive>
</template>

<script>
import formTest from "../../assets/js/formTest";

export default {
  name: "Coupon",
  data() {
    return {
     rules:{
       name: [
          { required: false, trigger: "change" , validator:formTest.coupon}
        ],
     },
      //表单数据
      form:{
        store:'',
        //搜索时间
        selTime:[],
        //优惠券类型
        type:-1,
        // 执行状态
        status:-1,
        // 优惠券规则名称
        name:'',
      },
      tableData:[],
      store:[],
      status:[
        {name:'不限',id:-1},
        {name:'未开始',id:1},
        {name:'执行中',id:2},
        {name:'已结束',id:3},
        {name:'禁用',id:4},
      ],
      types:[
        {name:'不限',id:-1},
        {name:'生日优惠券',id:'BIRTHDAY_COUPON'},
        {name:'积分优惠券',id:'POINTER_COUPON'},
        {name:'等级优惠券',id:'LEVEL_UP_COUPON'}
      ],
      pageSize:10,
      currentPage:1,
      total:0,
    }
  },
  created() {
    console.log(this.merchant)
    this.getStore(this.shopId)
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    },
    merchant(){
      return this.$store.state.merchant.merchant
    }
  },
  watch:{
    shopId:{
      handler:function(n,o){
        if(n!=o){
          this.getStore(n)
        }
      }
    }
  },
  methods:{
    //编辑
    edit(id,apiMerchantId){
      this.$router.push({
        name:'EditCoupon',
        params:{
          id:id,
          apiMerchantId:apiMerchantId
        }
      })
    },
    //查看
    check(id,apiMerchantId){
      this.$router.push({
        name:'CouponRep',
        params:{
          id:id,
          apiMerchantId:apiMerchantId
        }
      })
    },
    //禁用
    stop(id,state,name){
      this.$confirm("禁用后规则将不继续执行！", "禁用", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(() => {
      this.$http
        .post(
          "" + process.env.API_ROOT + "/coupon/config/UpdateState",
          {
            couponConfigId:id,
            state:state
          }
        )
        .then(res => {
          console.log("禁用结果", res);
          if (res.data.code == 1) {
            this.getList()
            // this.$message({
            //   type:'success',
            //   message:res.data.msg
            // })
          } else {
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error);
          alert("系统异常");
        });
      })
      .catch(action => {
      
      });
    },
    //启用
    start(id,state){
      
      this.$confirm("启用后规则继续执行！", "启用", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(() => {
      this.$http
        .post(
          "" + process.env.API_ROOT + "/coupon/config/UpdateState",
          {
            couponConfigId:id,
            state:state
          }
        )
        .then(res => {
          console.log("启用结果", res);
          if (res.data.code == 1) {
            this.getList()
          } else {
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error);
          alert("系统异常");
        });
      })
      .catch(action => {
      
      });
    },
    //删除功能
    del(id){
      this.$confirm("请确认是否删除该优惠券", "删除", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(() => {
      this.$http({
        method:'delete',
        url:''+process.env.API_ROOT+'/coupon/config/del?couponConfigId='+ id +'&apiMerchantId='+ this.form.store,
      }).then(res => {
          console.log("删除结果", res);
          if(res.data.code==1){
            this.getList()
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
        })
      .catch(action => {
        
      });
    },
    // 搜索功能
    search(){
    var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\\ ?]{0,10}$/;

      if(!reg.test(this.form.name)){
        this.$message(
          {
            type:'error',
            message:'规则名称不能包含特殊字符'
          }
        )
      }else{
        this.currentPage = 1
        this.getList()
      }
    },
    reset(){
      this.clearForm()
      this.currentPage = 1
      this.getList()
    },
    clearForm(){
      this.form.selTime = [];
      this.form.name = '';
      this.form.type = -1;
      this.form.status = -1;

    },
    //改变商户
    changeStore(val){
      console.log(val)
      // this.form.store = val;
      this.$store.commit('getMerchant',val);
      this.getList()
    },
    //获取列表
    getList(){
      
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/coupon/configs?pageIndex=' + this.currentPage+'&pageSize=' + this.pageSize+'&apiMerchantId=' + this.form.store+'&couponName=' + this.form.name+'&couponType=' + (this.form.type==-1? "": this.form.type) +'&validTime=' +( this.form.selTime? this.form.selTime.length!=0 ? this.form.selTime[0] :'':'')+'&invalidTime=' +(this.form.selTime? this.form.selTime.length!=0  ? this.form.selTime[1] :'':'')+'&state=' + (this.form.status==-1? "": this.form.status)
      }).then(res => {
          console.log("优惠券规则列表", res);
          if(res.data.code==1){
            this.tableData = res.data.data.list;
            this.total=res.data.data.total
          }else{
            this.tableData = [];
            this.total=0
            // this.$message({
            //   type:'error',
            //   message:res.data.msg
            // })
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    //新增
    add(){
      if(this.form.store){
        this.$router.push({
          name:'AddCoupon',
          params:{
            id:this.form.store
          }
        })
      }else{
        this.$message({
          type:'error',
          message:'该店铺没有绑定商户'
        })
      }
      
    },
    rowClick(row){
      console.log(row)
    },
    //获取商户列表
    getStore(shopid){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/merchantInfo?shopId=' + shopid
      }
      ).then(res => {
          console.log("商户列表", res);
          if(res.data.code==1){
            this.store = res.data.data;
            if(res.data.data.length!=0){
              if(this.merchant){
                this.form.store = this.merchant
              }else{
                this.form.store = this.store[0].apiMerchantId;
              }
                this.getList()
            }else{
                this.form.store='';
                this.getList()
            }
            
          }else{

          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList()
    },
  },
  beforeRouteLeave(to,from,next){
    console.log(to,from,next)
    if( to.name !='CouponRep'&& to.name !='AddCoupon' &&to.name !='EditCoupon'){
      this.$store.commit('getMerchant','');
      
    }else{
    }
    console.log(this.$store.state.merchant.merchant)
    next();
  },
  activated:function(){
    // this.getList()
      this.getStore(this.shopId)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.coupon {
  .head {
    h1 {
      opacity: 0.87;
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 42px;
      height: 42px;
      font-weight: bold;
      padding: 0 50px;
      float: left;
      span {
        border-left: 1px solid #ccc;
        padding: 0 20px;
      }
      i {
        font-weight: bold;
        margin-right: 20px;
        cursor: pointer;
      }
    }

    .el-breadcrumb {
      line-height: 30px;
      margin-right: 20px;
      margin-left: 50px;
    }
  }
  .box {
    margin: 0 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    position: relative;

    .btns {
      border-bottom: 1px solid #ccc;
      .level {
        width: 10%;
        margin: 12px 0 0 32px;
        .el-input__inner {
          border-radius: 0;
        }
      }
      .add {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        background: #3366ff;
        border-radius: 2px;
        height: 32px;
        line-height: 10px;
        border: none;
        margin: 12px 0 12px 20px;
        float: left;
      }
      .drop {
        float: right;
        width: 286px;
        height: 32px;
        line-height: 30px;
        margin: 12px 0 12px 20px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        .el-dropdown-link {
          display: inline-block;
          height: 30px;
          border-right: 1px solid #ccc;

          padding: 0 10px;
          line-height: 30px;
        }
        .sel {
          width: 180px;
          .el-input__inner {
            border: none;
            height: 28px;
          }
        }
        .el-dropdown {
          float: left;

          .el-dropdown-menu__item {
            width: 100px;
          }
        }
      }
      .el-date-editor {
        float: right;
        margin: 12px 0 12px 20px;
        height: 32px;
        line-height: 32px;
        border-radius: 0;
        .el-range-separator {
          line-height: 32px;
          height: 32px;
        }
      }
      .sec {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        border: 1px solid #3366ff;
        border-radius: 2px;
        height: 32px;
        line-height: 8px;
        margin: 12px 0 12px 20px;
        float: right;
        color: #3366ff;
        margin-right: 20px;
      }
    }
    .selBox{
      border-bottom: 1px solid #ccc;
      
      padding: 10px;
      .form{
        .el-form-item{
          padding: 10px;  
          .el-form-item__label{
            line-height: 30px;
          }
          .el-input{
            height: 40px;
            line-height: 40px;
          }
        }
        .el-form-item:last-child{
            padding-top: 50px;
        }

      }
    }
    .tab {
    .empty{
        text-align: center;
        width: 50%;
        height: 50%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        p{
            font-size: 14px;
            color: #999999;
            letter-spacing: 0.44px;
            text-align: center;
            line-height: 14px;
        }
    }  
      .el-table {
        td {
          height: 64px;
          line-height: 64px;
          .cell {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
            .el-dropdown {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #3366ff;
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
  .bottom {
    text-align: center;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    line-height: 16px;
  }
  .dis{
    span{
    color: #ccc

    }
  }
}
</style>
