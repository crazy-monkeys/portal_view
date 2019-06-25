<template>
  <div class="couponCampaign">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>客户权益</el-breadcrumb-item>
          <el-breadcrumb-item>优惠券活动</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>优惠券活动</h1>
      </div>
      <div class="box">
        <div class="btns clear">
          <!-- <span>请选择商户：</span>   -->
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
            >
          <!-- 日期选择 -->
              <el-form-item label="执行时间" prop="">
                <el-date-picker
                  v-model="form.selTime"
                  prefix-icon="el-icon-date"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size='small'
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="已关联优惠券规则状态" prop="">
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
              <el-form-item label="活动名称" prop="" size='small'>
                <el-input v-model="form.name"> </el-input>
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

            <el-table-column show-overflow-tooltip prop="couponCampainId" v-if="false"  label="ID"></el-table-column>

            <el-table-column show-overflow-tooltip prop="couponCampainName" label="活动名称"></el-table-column>

            <el-table-column label="活动详情" prop="activityDesc" show-overflow-tooltip>
           
            </el-table-column>

            

            <el-table-column label="开始时间" show-overflow-tooltip prop="validTime" ></el-table-column>
            <el-table-column label="结束时间" show-overflow-tooltip prop="invalidTime" ></el-table-column>
            <el-table-column label="活动状态" show-overflow-tooltip prop="">
              <template slot-scope="scope">
                <span v-if="tableData[scope.$index].activityState=='04'">已生效</span>
              </template>
            </el-table-column>
            <el-table-column
              label="已关联优惠券规则"
              show-overflow-tooltip
              prop=""
            >
              <template slot-scope="scope">
                <span v-for="(item,index) in tableData[scope.$index].configDOList" :key='index'>{{item.couponName}} <time v-if="index!=tableData[scope.$index].configDOList.length-1">、</time></span>
              </template>
            </el-table-column>



            <el-table-column label="操作" fixed="right" width="130">
              <template slot-scope="scope">
                <el-button
                  @click="check(tableData[scope.$index].couponCampainId,tableData[scope.$index].configDOList)"
                  type='text'
                >优惠券规则管理</el-button>
              </template>
            </el-table-column>
            <div slot="empty" class="empty">
              <div>
                <img src="../../assets/img/none1.png" alt width="140" height="140">
              </div>
              <p :style="{'marginTop': '23px'}">无优惠券活动信息</p>
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


      <!-- 查看规则 -->
      <el-dialog
        title="优惠券规则管理"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">
        <!-- <span>这是一段信息</span> -->
          <el-transfer
            @change='change'
            :titles="['未关联优惠券规则', '已关联优惠券规则']"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入优惠券规则"
            v-model="ruleValue"
            :data="ruleData"
            >
          </el-transfer>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CouponCampaign",
  data() {
    return {
      ruleData: [],
      ruleValue: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      dialogVisible:false,
      //表单数据
      form:{
        store:'',
        //搜索时间
        selTime:[],
        // 执行状态
        status:-1,
        // 优惠券规则名称
        name:'',
      },
      tableData:[],
      store:[],
      status:[
        {name:'不限',id:-1},
        {name:'是',id:1},
        {name:'否',id:0},
      ],
      pageSize:10,
      currentPage:1,
      total:0,
    }
  },
  created() {
    this.getStore(this.shopId)
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
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
    change(val,a,b){
      console.log(val)
      console.log(a)
      console.log(b)
      console.log(this.ruleData)
      console.log(this.ruleValue)
    },
    handleClose(){
      this.dialogVisible = false
    },
    //查看
    check(id,list){
      console.log(id,list)
      if(list.length!=0){
        this.ruleValue= []
        list.forEach(item=>{
          this.ruleValue.push(item.couponConfigId)
        })
        // .split(',').map(item=>{
        //   return item*1
        // })
      }else{
        this.ruleValue= []
      }
      
      this.dialogVisible = true;
      console.log(this.ruleValue)
        // this.ruleData.forEach(data => {
        //   this.ruleValue.forEach(value=>{
        //     if(data.key==value.key){
        //     }
        //   })
        // });
    },
    sure(){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/couponCampaign/updateRule?&couponCampainId=' + this.id +'&rule='+this.ruleValue.join(',')+'&apiMerchantId='+this.form.store
      }).then(res => {
          console.log("修改规则结果", res);
          if(res.data.code==1){
            this.dialogVisible = false
            this.getList()
            this.$message({
              type:'success',
              message:'修改关联优惠券规则成功'
            })
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
    },
    // 搜索功能
    search(){
      this.currentPage = 1
      this.getList()
    },
    reset(){
      this.clearForm()
      this.currentPage = 1
      this.getList()
    },
    clearForm(){
      this.form.selTime = [];
      this.form.name = '';
      this.form.status = -1;

    },
    //改变商户
    changeStore(val){
      console.log(val)
      // this.form.store = val;
      this.getList()
      this.getRuleList()
    },
    //获取规则列表
    getRuleList(){
      // /couponCampaign/list
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/couponCampaign/ruleList?&apiMerchantId=' + this.form.store
      }).then(res => {
          console.log("所有规则列表", res);
          if(res.data.code==1){
            this.rule=res.data.data
            this.ruleData=[]
            this.rule.forEach(item=>{
              this.ruleData.push(
                {
                  label:item.couponName,
                  key:item.couponConfigId
                }
              )
            })
          }else{
            this.ruleData=[]

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
    
    //获取列表
    getList(){
      // 
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/couponCampaign/list?pageIndex=' + this.currentPage+'&pageSize=' + this.pageSize+'&apiMerchantId=' + this.form.store+'&couponCampainName=' + this.form.name+'&validTime=' +(this.form.selTime? this.form.selTime.length!=0 ? this.form.selTime[0] :'' :'')+'&invalidTime=' +( this.form.selTime?this.form.selTime.length!=0  ? this.form.selTime[1] :'' :'')+'&rule=' + this.form.status
      }).then(res => {
          console.log("优惠券活动列表", res);
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
 
    rowClick(row){
      console.log(row)
      this.id = row.couponCampainId
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
                this.form.store = this.store[0].apiMerchantId;
                this.getList()
                this.getRuleList()
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.couponCampaign {
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
      // padding-left: 30px;
      // border-bottom: 1px solid #ccc;
      span{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        letter-spacing: 0;
        text-align: center;
        line-height: 14px;
      }
      .level {
        width: 10%;
        margin: 12px 0 ;
        .el-input__inner {
          border-radius: 0;
        }
      }

    }
    .selBox{
      border-bottom: 1px solid #ccc;
      
      padding: 10px 0 10px 20px;
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
  .el-transfer{
    margin: 0 auto;
    width: 500px;
  }
  .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label span{
    display: none
  }
}
</style>
