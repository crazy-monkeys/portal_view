<template>
  <div class="deal">
    <el-form-item label="商品筛选：" prop label-position="left" v-if="dealValue.value1">
      <el-button type='primary' @click="goodDialogVisible=true">选择商品</el-button>
      <span v-if="form.selectGoods.length">已选择 {{form.selectGoods.length}} 件商品</span>
      <span v-if="!form.selectGoods.length" style="color:red">请选择商品</span>
    </el-form-item>

    <el-form-item label="订单金额：" prop label-position="left" v-if="dealValue.value2">
      <el-select v-model="form.moneyType" class placeholder="请选则筛选条件">
        <el-option v-for="item in moneyTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <p  v-if="form.moneyType==1||form.moneyType==3" style="display:inline-block;width:50%">
        <el-input v-model="form.money" style="display:inline-block;width:40%"></el-input> 元
      </p>
      <p v-if="form.moneyType==2" style="display:inline-block;width:50%">
        <el-input v-model="form.minMoney" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.maxMoney" style="display:inline-block;width:40%"></el-input> 元  
      </p> 
    </el-form-item>

    <el-form-item label="订单状态：" prop label-position="left" v-if="dealValue.value3" >
      <el-select v-model="form.statu" class='status' placeholder="请选择订单状态" filterable collapse-tags multiple>
        <el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="订单来源：" prop label-position="left" v-if="dealValue.value4">
      <el-select v-model="form.source" class placeholder="请选择订单状态" filterable collapse-tags multiple>
        <el-option v-for="item in source" :key="item.id" :label="item.name" :value="item.id" ></el-option>
      </el-select>
    </el-form-item>
    
    <el-dialog
      title="商品筛选"
      :visible.sync="goodDialogVisible"
      width="60%"
      :before-close="close"
      :close-on-click-modal="false"
    >
      <div class="box">
      <div class="btns">
        <el-button type='primary' style="float:right;margin-left:20px" size='small' @click="searchGoods">搜索</el-button>

        <el-input
          v-model="goodsName"
          class="sel"
          placeholder="在当前位置搜索商品名称"
          @keyup.enter.native="searchGoods"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" @click="searchGoods"></i>
        </el-input>
        <el-input
          v-model="goodsId"
          class="sel"
          placeholder="在当前位置搜索商品ID"
          @keyup.enter.native="searchGoods"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" @click="searchGoods"></i>
        </el-input>

      </div>
      <div class="tab">
        <el-table :data="goods" style="width: 100%" height="500"  @selection-change="handleSelectionChange"  ref="multipleTable" :row-key='q'>
          <el-table-column prop="" type='selection' center label="" show-overflow-tooltip :reserve-selection='true'></el-table-column>

          <el-table-column prop="sku_name" center label="商品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sku_code" label="商品ID" show-overflow-tooltip></el-table-column>
          
          <div slot="empty">
            <div>
              <img src="../../../assets/img/none.png" alt width="140" height="140">
            </div>
            <p :style="{'marginTop': '23px'}">未查询到商品列表</p>
          </div>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="changeSize"
            @current-change="changePage"
            :current-page="goodsCurrentPage"
            :page-sizes="[10, 100]"
            :page-size="10"
            layout="sizes,total, jumper, prev, pager, next"
            :total="goodsTotal"
          ></el-pagination>
        </div>
        <!-- <span slot="footer" class="insertSub">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" >确定</el-button>
        </span> -->
      </div>
    </div>
    </el-dialog>

    
  </div>
</template>
<script>
  import Bus from '../../../module/bus.js'

export default {
  props:['dealValue'],
  data() {
    return {
      goodDialogVisible:false,
      goodsTotal:0,
      goodsCurrentPage:1,
      goodsPageSize:1,
      goods:[],
      goodsId:'',
      goodsName:'',
      moneyTypes:[
        {
          name:'大于',
          id:1
        },
        {
          name:'介于',
          id:2
        },
        {
          name:'小于',
          id:3
        },
      ],
      conditions:[
        {
          name:'商品名称',
          id:1
        },
        {
          name:'商品id',
          id:2
        }
      ],
      status:[
        {
          name:'没有创建支付宝交易',
          id:'TRADE_NO_CREATE_PAY'
        },
        {
          name:'等待买家付款',
          id:'WAIT_BUYER_PAY'
        },
        {
          name:'买家已付款',
          id:'WAIT_SELLER_SEND_GOODS'
        },
        {
          name:'卖家已发货',
          id:'WAIT_BUYER_CONFIRM_GOODS'
        },
        {
          name:'买家已签收',
          id:'TRADE_BUYER_SIGNED'
        },
        {
          name:'交易成功',
          id:'TRADE_FINISHED'
        },
        {
          name:'付款以后用户退款成功，交易自动关闭',
          id:'TRADE_CLOSED'
        },
        {
          name:'付款以前，卖家或买家主动关闭交易',
          id:'TRADE_CLOSED_BY_TAOBAO'
        },
        {
          name:'国际信用卡支付付款确认中',
          id:'PAY_PENDING'
        }
      ],
      source:[
        {
          name:'PC端',
          id:'PC'
        },
        {
          name:'手机端',
          id:'WAP'
        },
        {
          name:'聚划算',
          id:'JHS'
        },
      ],
      form: {
        selectGoods:[],
        statu:[],
        source:[],
        moneyType:'',
        money:'',
        maxMoney:'',
        minMoney:'',
      }
    };
  },
  computed: {
    shopId() {
      return this.$store.state.shopId.shopId;
    }
  },
  watch: {
    shopId: {
      handler: function(n, o) {
        if (n != o) {
        }
      }
    },
    form:{
        handler:function(n,o){
            // console.log(1)
            this.$emit('data',n)
        },
        deep:true
    },
    dealValue:{
      handler:function(n,o){
        if(!n.value1){
          this.form.selectGoods = []
          this.goodsName = ''
          this.goodsId = ''
          this.goods=[]
          this.toggleSelection()
        }
        if(!n.value2){

          this.form.minMoney = ''
          this.form.maxMoney = ''
          this.form.money = ''
          this.form.moneyType = ''

        }
        if(!n.value3){
          this.form.statu=[]
        }
        if(!n.value4){
          this.form.source=[]
        }
      },
      deep:true
    }
  },
  created() {
  },
  methods: {
    q(row) {
      // console.log(row)
      return row.sku_code
    },
    toggleSelection(rows,selected) {
      console.log(rows)
      if (rows) {
      console.log(1)

        rows.forEach(row => {
          console.log(row)
          if(this.$refs.multipleTable){
            this.$refs.multipleTable.toggleRowSelection(row);
          }
        });
      } else {
      console.log(2)
        if(this.$refs.multipleTable){
          this.$refs.multipleTable.clearSelection();
        }
      }
    },
    getGoods(shopid,name,code){
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/customerGroup/queryGoods?shopInfoId=" +
          shopid +'&skuName=' + this.goodsName +'&skuCode='+this.goodsId 
      })
        .then(res => {
          console.log("商品列表", res);
          if (res.data.code == 1) {
            this.goods = res.data.data
            // this.total = res.data.data.total
          }else{
          }
        })
        .catch(error => {
          console.log(error);
          alert("网络异常");
        });
    },
    close(){
      this.goodDialogVisible = false;
      // this.goodsName = '';
      // this.goodsId = '';
      // this.goods = []
    },
    changeSize(val){
      console.log(`每页 ${val} 条`);
      this.goodsPageSize = val;
    },
    changePage(val){
      console.log(`每页 ${val} 条`);
      this.goodsCurrentPage = val;
    },
    searchGoods(){
      this.getGoods(this.shopId,this.goodsName,this.goodsId)
    },
    handleSelectionChange(val) {
      console.log(val)
      this.form.selectGoods=val;
    },
  },
  mounted(){
    Bus.$on('tagData',(data)=>{
      // console.log(data)
      if(data[3]){
        if(data[3].tradeTotalMin && data[3].tradeTotalMax){
          this.form.minMoney = data[3].tradeTotalMin
          this.form.maxMoney = data[3].tradeTotalMax
          this.form.money = ''
          this.form.moneyType = 2
        }
        if(data[3].tradeTotalMin && !data[3].tradeTotalMax){
          this.form.minMoney = ''
          this.form.maxMoney = ''
          this.form.money = data[3].tradeTotalMin
          this.form.moneyType = 1
        }
        if(!data[3].tradeTotalMin && data[3].tradeTotalMax){
          this.form.minMoney = ''
          this.form.maxMoney = ''
          this.form.money =  data[3].tradeTotalMax
          this.form.moneyType = 3
        }
        if(data[3].tradeStatus){
          this.form.statu = data[3].tradeStatus.split(',')
        }else{
          this.form.statu=[]
        }
        if(data[3].tradeSource){
          this.form.source = data[3].tradeSource.split(',')
        }else{
          this.form.source=[]
        }
        if(data[3].tradeSkuCode){
          this.form.selectGoods = data[3].tradeSkuCode.split(',')
        }else{
          this.form.selectGoods=[]
        }
      }
  })
  }
};
</script>
