<template>
  <div class="goods">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>客户洞察</el-breadcrumb-item>
        <el-breadcrumb-item>商品数据</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>商品数据</h1>
    </div>
    <el-tabs type="">
      <el-tab-pane label="商品列表">
          <div class="box">
            <div class="boxContent">
              <div class="btnBox clear">
                <div class="left">
                  <el-button
                    type
                    size="small"
                    @click="time(1)"
                    :class="autoFocus1 ? 'is-active' :'no'"
                    plain
                  >近1天</el-button>
                  <el-button
                    type
                    size="small"
                    @click="time(2)"
                    :class="autoFocus2 ? 'is-active' :'no'"
                    plain
                  >近7天</el-button>
                  <el-button
                    type
                    size="small"
                    @click="time(3)"
                    :class="autoFocus3 ? 'is-active' :'no'"
                    plain
                  >近30天</el-button>
                  <el-button type="text" size class="btn" @click="exportSelect">
                    <i class="el-icon-upload2"></i> 导出
                  </el-button>
                  <el-button type="text" size class="btn" @click="exportAll">
                    <i class="el-icon-upload2"></i> 全部导出
                  </el-button>
                </div>
                <div class="right">
                  <el-button type="text" class="btn" size @click="a">
                    <i class="iconfont iconshaixuan"></i> 筛选
                    <i class="el-icon-arrow-down" v-if="!expload"></i>
                    <i class="el-icon-arrow-up" v-if="expload"></i>
                  </el-button>
                </div>
              </div>
              <el-form
                v-if="expload"
                label-position="top"
                label-width="auto"
                :model="form"
                ref="form"
                class="form"
                :inline="true"
                :rules="rules"
                 >
                <el-form-item label="商品名称" prop='goodsName'>
                  <el-input v-model="form.goodsName" placeholder="请输入"></el-input> 
                </el-form-item>
                <el-form-item label="商品ID" prop='skuCode'>
                  <el-input v-model="form.skuCode" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="付款时间" prop="orderCreateTime">
                  <el-date-picker
                    v-model="form.orderCreateTime"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd"
                    prefix-icon="icon"
                    start-placeholder="不限"
                    end-placeholder="不限"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="销售渠道" prop="orderType">
                  <el-select v-model="form.orderType" filterable placeholder="请选择">
                    <el-option
                      v-for="item in types"
                      :key="item.marketingPlaceId"
                      :label="item.marketingPlaceName"
                      :value="item.marketingPlaceId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="销售店铺"  prop="shopInfoIds">
                  <el-select v-model="form.shopInfoIds" filterable placeholder="请选择" >
                    <el-option
                      v-for="item in sources"
                      :key="item.shopInfoId"
                      :label="item.shopName"
                      :value="item.shopInfoId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                
                
                <el-form-item label="客户类型" prop="orderType">
                  <el-select v-model="form.memberType" filterable placeholder="请选择">
                    <el-option
                      v-for="item in memberTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="会员类型" filterable prop='levelId'>
                  <el-select v-model="form.levelId" placeholder="请选择">
                    <el-option
                      v-for="item in levelList"
                      :key="item.apiCustomerLevelConfId"
                      :label="item.customerLevelName"
                      :value="item.apiCustomerLevelConfId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <div class="btns">
                  <div>
                    <el-button size="small" @click="reset">重置</el-button>
                    <el-button type="primary" @click="submitForm('form')" size="small">搜索</el-button>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="tab">
              <el-table
                :data="tableData"
                ref="tab"
                style="width: 100%"
                height="700"
                @select="select"
                @select-all="selectAll"
                @select-change="selectChange"
                @row-click="rowclick"
                :row-key='b'
                @cell-click='cellclick'
                >
              <!-- 、、、、、 -->
                <el-table-column label prop width="30" show-overflow-tooltip></el-table-column>
                <el-table-column type="selection" prop label width="30" :reserve-selection='true'></el-table-column>
                <el-table-column label="商品ID" v-if="false" prop="memberId" show-overflow-tooltip></el-table-column>
                
                <el-table-column label="商品名称" prop="skuName" show-overflow-tooltip></el-table-column>
                <el-table-column label="商品ID" prop="skuCode" show-overflow-tooltip></el-table-column>
                <el-table-column label="销售总量" prop="qty" show-overflow-tooltip :render-header='renderHeader'></el-table-column>
                <el-table-column label="销售总额" prop="totalActual" show-overflow-tooltip :render-header='renderHeader'>
                  
                  <template slot-scope="scope">
                    {{comdify((tableData[scope.$index].totalActual*1).toFixed(1))}}
                  
                  </template>
                </el-table-column>
                <el-table-column label="订单总数" prop="orderNum" show-overflow-tooltip :render-header='renderHeader'></el-table-column>
                <el-table-column label="购买总人数" prop="buyerNum" show-overflow-tooltip :render-header='renderHeader'></el-table-column>
                <!-- <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="look(tableData[scope.$index].memberId)"
                      type="text"
                    >查看</el-button>
                  </template>
                </el-table-column> -->
                <div slot="empty">
                  <div>
                    <img src="../../assets/img/none.png" alt width="140" height="140">
                  </div>
                  <p :style="{'marginTop': '23px'}">无商品列表信息</p>
                </div>
              </el-table>
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[50, 100,200]"
                  :page-size="50"
                  layout="sizes,total, jumper, prev, pager, next"
                  :total="total"
                ></el-pagination>
              </div>
            </div>
          </div>
          <div class="bottom">按住 [shift] 键，可横向滚动表格哦</div>

      </el-tab-pane>
      <el-tab-pane label="商品监控">
        <div class="selBox">
          <div class="timerange">
           统计时间：
            <el-date-picker
              :clearable =' false'
              :picker-options="pickerOptions0"
              v-model="timeRange"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              prefix-icon="icon"
              start-placeholder="不限"
              end-placeholder="不限"
              class='chartDate'
              size='small'
            ></el-date-picker>
          </div>   
          <div class="sousuo">
            <el-button type='' size='small' plain  :class="autoFocus4 ? 'is-active' :'no'" @click="change4"> 商品名称</el-button>
            <el-button type='' size='small' plain  :class="autoFocus5 ? 'is-active' :'no'" @click="change5"> 商品ID</el-button>
            <el-input size='small' class="put" v-model="form.selStr"></el-input>
            <el-button type='' class="sec" size='small' plain @click="getList"> 搜索</el-button>
          </div>
        </div>
        <div class="goodsMsg clear">
          <h3>商品信息</h3>
          <div class="msgContent">
            <el-tooltip  :content="goodsMsg.skuName" placement="bottom" effect="dark">
            <div class="goodsBox"> 
               {{goodsMsg.skuName}}
            </div>
            </el-tooltip>
            <div class="goodsBox"> 
              <div class="top">付款金额</div>
              <div class="bot">￥{{comdify((goodsMsg.payPrice*1).toFixed(1))}} </div>
            </div>
            <div class="goodsBox"> 
              <div class="top">付款件数</div>
              <div class="bot">{{goodsMsg.payQty}} 件</div>
            </div>
            <div class="goodsBox"> 
              <div class="top">付款客户数</div>
              <div class="bot">{{goodsMsg.payCusNum}} 人</div>
            </div>
            <div class="goodsBox"> 
              <div class="top">件均价</div>
              <div class="bot">￥{{goodsMsg.avgPiecesPrice*1}}</div>
            </div>
          </div>
        </div>
        <div class="pie clear">
          <div class="orderChart">
            <h3>各渠道付款客户数量占比</h3>
              <ve-pie :data="chartData1" height="400px" :data-empty="dataEmpty1" ref='c1' :extend='chartExtend1' :legend-position='position' :colors='colors' ></ve-pie>
          </div>
          <div class="levelChart">
            <h3>新老客户占比</h3>
              <ve-pie :data="chartData4" height="400px" :data-empty="dataEmpty2" ref='c4' :extend='chartExtend4' :legend-position='position' :colors='colors'></ve-pie>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>


     <el-dialog
      :title="title"
      :visible.sync="tagDialogVisible"
      width="700px"
      :before-close="close"
      :close-on-click-modal="false"
        >
        <ve-pie :data="chartData" height="400px"  :extend='chartExtend'></ve-pie>
        
      <span slot="footer" class="dialog-footer">

        <el-button type="" plain @click="close">关闭</el-button>
        <!-- <el-button type="primary" @click="choose">确定</el-button> -->

      </span>
    </el-dialog>

    <el-dialog
      title="商品列表"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="close"
      :close-on-click-modal="false"
        >
        <div class="tab">
              <el-table
                :data="list"
                ref="tab"
                style="width: 100%"
                height="400"
                :row-key='b'
                 @row-click='rowClick1'
                >
                <el-table-column type="index" label="编号"   width='80'>
                  <!-- <el-radio v-model="radio" label="1">1</el-radio> -->
                  <template slot-scope="scope">
                    <!--&nbsp; 为空，不加这个radio的label会显示index数字，注意从0开始的；radio会全选的问题是label相同导致的-->
                    <el-radio class="radio" v-model="radio" :label="q(scope.$index)"  @change.native="getCurrentRow(q(scope.$index))" ></el-radio>
                  </template>
                </el-table-column>
                <el-table-column label="商品ID" v-if="false" prop="memberId" show-overflow-tooltip></el-table-column>
                <el-table-column label="商品名称" prop="skuName" show-overflow-tooltip></el-table-column>
                <el-table-column label="商品ID" prop="skuCode" show-overflow-tooltip></el-table-column>
                <el-table-column label="销售总量" prop="qty" show-overflow-tooltip></el-table-column>
                <el-table-column label="销售总额" prop="totalActual" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{comdify((list[scope.$index].totalActual*1).toFixed(1))}}
                  </template>
                </el-table-column>
                <el-table-column label="订单总数" prop="orderNum" show-overflow-tooltip></el-table-column>
                <el-table-column label="购买总人数" prop="buyerNum" show-overflow-tooltip></el-table-column>
                <div slot="empty">
                  <div>
                    <img src="../../assets/img/none.png" alt width="140" height="140">
                  </div>
                  <p :style="{'marginTop': '23px'}">无商品列表信息</p>
                </div>
              </el-table>
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChangeList"
                  @current-change="handleCurrentChangeList"
                  :current-page="currentPageList"
                  :page-sizes="[50, 100,200]"
                  :page-size="50"
                  layout="sizes,total, jumper, prev, pager, next"
                  :total="totalList"
                ></el-pagination>
              </div>
            </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="choose">确定</el-button>

        <el-button type="primary" @click="close">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
import formatDate from "../../assets/js/formatDate";
 import 'v-charts/lib/style.css'

export default {
  name: "goods",
  data() {
          // this.title = "商品销售总额"
        
          // this.title = "商品订单总数"
          // this.title = "商品购买总人数"
      var self = this
      this.chartExtend = {
          tooltip: {
            trigger: 'item',
            formatter:function(datas){
              console.log(datas)
              var res = datas.marker + ' ' +   datas.name  + ' : ' +   datas.value + (self.title == "商品销售总额" ?  ' 元 ' :self.title == "商品销售总量" ? ' 件 ' :self.title == "商品订单总数" ?  ' 单 ' : self.title == "商品购买总人数" ? ' 人 ':'') + datas.percent +'%'   +  '<br/>',index,shop,totalActual,qty,orderNum,buyerNum,value;
                  for(var i = 0, length = self.chartData.rows[datas.dataIndex].shops.length; i < length; i++) {
                        index = i+1 ;
                        shop = (self.chartData.rows[datas.dataIndex].shops[i].shopName) ;
                        totalActual = (self.chartData.rows[datas.dataIndex].shops[i].totalActual) ;
                        qty = (self.chartData.rows[datas.dataIndex].shops[i].qty) ;
                        orderNum = (self.chartData.rows[datas.dataIndex].shops[i].orderNum) ;
                        buyerNum = (self.chartData.rows[datas.dataIndex].shops[i].buyerNum) ;
                        value  = totalActual? totalActual:qty?qty:orderNum? orderNum:buyerNum? buyerNum:''

                        res += index + '. ' + shop  +' '+ value +'<br/>'+'占比：'+(value/datas.value)*100+'%';
                    }
                    return res;
            }
          }
        }
        this.chartExtend1= {
          tooltip: {
            trigger: 'item',
            formatter:function(datas){
              console.log(datas)
              var res = datas.marker + ' ' +   datas.name  + ' : ' +  datas.value +' (' + datas.percent +'%)' +'</br >'  +'付款金额：' + self.comdify((self.chartData1.rows[datas.dataIndex].payPrice*1).toFixed(1)) +
              '</br >'+'付款件数：'+ self.chartData1.rows[datas.dataIndex].payQty +  '</br >'+'付款客户数：'+self.chartData1.rows[datas.dataIndex].payCusNum+ '</br >'+'件均价：'+ self.chartData1.rows[datas.dataIndex].avgPiecesPrice 
                //  'customerType','payCusNum','payQty','payPrice','avgPiecesPrice'
              return res;
            }
            
          },
          label:{
              // formatter:function(datas){
              //   console.log(datas)
              //   var res = (datas.name==-1 ? '未知' :datas.name==1 ? "老客户" :datas.name==0 ? "新客户" :'')  
              //   return res;
              // }
          },
          legend:{
              // formatter: function (name) {
              //     return  name==-1 ? '未知' :name==1 ? "老客户" :name==0 ? "新客户" :''   
              // }
          },
        }
       this.chartExtend4 = {
          tooltip: {
            trigger: 'item',
            formatter:function(datas){
              console.log(datas)
                console.log(self.chartData4.rows[datas.dataIndex].payPrice)
              var res = datas.marker + ' ' +   datas.data.name + ' : ' +  datas.value +' (' + datas.percent +'%)' +'</br >'  +'付款金额：' + self.comdify((self.chartData4.rows[datas.dataIndex].payPrice*1).toFixed(1)) +
              '</br >'+'付款件数：'+ self.chartData4.rows[datas.dataIndex].payQty +  '</br >'+'付款客户数：'+self.chartData4.rows[datas.dataIndex].payCusNum+ '</br >'+'件均价：'+ self.chartData4.rows[datas.dataIndex].avgPiecesPrice 
                //  'customerType','payCusNum','payQty','payPrice','avgPiecesPrice'
              return res;
            }
            
          },
          label:{
              // formatter:function(datas){
              //   console.log(datas)
              //   var res = datas.data.name
              //   return res;
              // }
          },
          legend:{
              // formatter: function (name) {
              //     console.log(name)
              //     return  name 
              // }
          },
        }
    return {
      pickerOptions0:{ 
          disabledDate(time) {
            return time.getTime() > Date.now() -8.64e7 ;//如果没有后面的-8.64e7就是不可以选择今天的 
          }
        },
      dataEmpty1:true,
      dataEmpty2:true,
      radio:'',
      title:'',
      colors:['#3366FF','#F13869','#36A7EA','#66C947','#8D44F0','#F68106'],
      colors1:['blue','red','orange'],
      colors2:['#3366FF'],
      position:'bottom',
      active:'0',
        chartData1: {
            columns: [],
            rows: []
        },
        chartData4:{
            columns: [],
            rows: []
        },
        chartData: {
            columns: [],
            rows: []
        },
      timeRange:[formatDate.formatDateTom('yyyy-MM-dd'),formatDate.formatDateTom('yyyy-MM-dd')],
      properties:[],
      autoFocus1: true,
      autoFocus2: false,
      autoFocus3: false,
      autoFocus4: true,
      autoFocus5: false,
      rules: {
        memberType: [
          { required: true, trigger: "change",trigger: "change" }
        ],
        shopInfoIds: [
          { required: false, message: "请选择入会店铺", trigger: "change" }
        ],
        orderType: [
          { required: false, message: "请选择入会渠道", trigger: "change" }
        ],
        orderCreateTime: [
          { required: false, message: "请选择下单时间", trigger: "change" }
        ],
        goodsName: [
          { required: false, trigger: "change",message: "请输入商品名称" }
        ],
        skuCode: [
          { required: false,  trigger: "change", message: "请输入商品ID" }
        ],
        levelId: [
          { required: false, message: "请选择等级", trigger: "change" }
        ]
      },
      exportArr: [],
      expload: false,
      levelList: [],
      store: "",
      dialogVisible:false,      
      tagDialogVisible: false,
      tableData: [],
      list:[],
      currentPageList: 1,
      currentPage: 1,
      pageSizeList: 50,
      pageSize: 50,
      totalList: 0,
      total: 0,
      sourceData:[],
      //客户类型
      memberTypes:[
        {
          label: "新客户",
          value: 0
        },
        {
          label: "老客户",
          value: 1
        },
        {
          label: "不限",
          value: 2
        },
      ],
      //销售渠道选项
      types: [],
      //销售店铺选项   
      sources: [],
      rowData: {},
      rowDataList:{},
      //详情的数据
      moreMsg: {},
      //搜索条件表单
      goodsMsg:{
        skuName:'暂无商品名称信息',
        payPrice:'0',
        payQty:'0',
        payCusNum:'0',
        avgPiecesPrice:'0',
      },
      shopStr:'',
      form: {
        selStr:'',
        memberType: 2,
        shopInfoIds: 0,
        orderType: 0,
        orderCreateTime: [
          formatDate.formatDateLastDay("yyyy-MM-dd",1),
          formatDate.formatDate("yyyy-MM-dd")
        ],
        goodsName: "",
        skuCode: "",
        levelId: 0,
      }
    };
  },
  computed: {
    shopId() {
      return this.$store.state.shopId.shopId;
    }
  },
  created() {
    console.log(this.shopId);
    this.getStore(this.shopId);
    this.getUserShopList()
  },
  watch: {
    shopId:{
      handler:function(n,o){
        this.getStore(n)
        this.getTableData();
      }
    },
    "form.orderCreateTime": {
      handler: function(n, o) {
            console.log(n)

        if (n) {
          if (n.length != 0) {
            console.log(formatDate.formatDate('yyyy-MM-dd'))
                if (
                  n[1] == formatDate.formatDateNow('yyyy-MM-dd') &&
                    new Date(n[1]).getTime() - new Date(n[0]).getTime() ==
                    1 * 24 * 60 * 60 * 1000
                ) {
                    this.autoFocus1 = true;
                    this.autoFocus2 = false;
                    this.autoFocus3 = false;
                }else if (
                  n[1] == formatDate.formatDateNow('yyyy-MM-dd') &&
                    new Date(n[1]).getTime() - new Date(n[0]).getTime() ==
                    7 * 24 * 60 * 60 * 1000
                ) {
                    this.autoFocus1 = false;
                    this.autoFocus2 = true;
                    this.autoFocus3 = false;
                }else if(n[1] == formatDate.formatDateNow('yyyy-MM-dd') &&
                    new Date(n[1]).getTime() - new Date(n[0]).getTime() ==
                    30 * 24 * 60 * 60 * 1000){
                    this.autoFocus1 = false;
                    this.autoFocus2 = false;
                    this.autoFocus3 = true;
                }else{
                    this.autoFocus1 = false;
                    this.autoFocus2 = false;
                    this.autoFocus3 = false;
                }
            }else{
              this.autoFocus1 = false;
                    this.autoFocus2 = false;
                    this.autoFocus3 = false;
            }
        } else {
          console.log('数组为空')
          this.autoFocus1 = false;
          this.autoFocus2 = false;
          this.autoFocus3 = false;
        }
      }
    },
    chartData1:{
      handler:function(n,o){
        this.$nextTick(() => {
            this.$refs['c1'].echarts.resize()
        })
      },
      deep:true
    },
    chartData4:{
      handler:function(n,o){
        this.$nextTick(() => {
            this.$refs['c4'].echarts.resize()
        })
      },
      deep:true
    },
    "form.orderType": {
      handler: function(n, o) {
        console.log(n)
          this.form.shopInfoIds = 0
        if(n!=0){
          //渠道不为不限
          this.types.forEach((item)=>{
            if(item.marketingPlaceId==n){
              this.sources = item.shopDOS.filter(item=>{
                return item.shopInfoId !=0
              })
            }
          })
        }else{
        this.sources = []
          //渠道等于不限时
          this.types.forEach((item)=>{
            if(item.marketingPlaceId!=0){

              item.shopDOS.forEach(shop=>{
                if(shop.shopInfoId!=0){
                  if(this.sources.indexOf(shop.shopInfoId)==-1){
                    this.sources.push({shopInfoId:shop.shopInfoId,shopName:shop.shopName})
                  }
                }
              })
            }
          })
        }
              console.log(this.sources)
              this.sources.unshift({shopInfoId:0,shopName:'不限'})

      }
    },
  },
  methods: {
    comdify(n){
  　　var re=/\d{1,3}(?=(\d{3})+$)/g;
  　　var n1=n.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
  　　return n1;
    },
    renderHeader(h, { column, $index }){
      console.log(h,column,$index)
      return h(
        'el-tooltip',
        {
          props: {
            content: (function() {
              let label = column.label
              switch (label) {
                case '销售总量':
                  return '该商品在统计时间段所销售的总量 以付款为准 不计较最终状态'
                  break
                case '销售总额':
                  return '该商品在统计时间段内所产生的付款总额，不计较最终状态'
                  break
                case '订单总数':
                  return '该商品在统计时间段所产生的付款订单总数'
                  break
                case '购买总人数':
                  return '该商品在统计时间段所产生的总付款人数（排重）'
                  break
              }
            })(),
            placement: 'top',
            effect:"light"
          },
          domProps: {
            innerHTML: column.label + '<i  class="el-icon-question" style="color:#ccc;margin-left:5px;font-size:16px"></i>'
          }
        },
        [h('span')]
      )
    },
    getUserShopList(){
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/getCurentUserShopList" 
      })
      .then(res => {
        console.log("用户拥有的店铺列表", res);
        if(res.data.code==1){
          this.shopStr = res.data.data.map((item)=>{
            return item.shop_info_id
          }).join(',')
        }else{
          this.shopStr = ''
        }
        this.getSource(this.shopStr)
      })
      .catch(error => {
        console.log(error);
        alert("系统异常");
      });
    },
    choose(){
      this.getGoodsMsg()
      this.getPlatform()
      this.getMemberType()
    },
    q(index) {
      return this.pageSizeList * (this.currentPageList - 1) + index + 1;
    },
    //获取监控搜索列表信息
    getList() {
      this.dialogVisible = true
        var data = {};
        if (this.form.selStr) {
          if(this.autoFocus4){
            data.goodsName = this.form.selStr;
          } else{
            data.skuCode = this.form.selStr;
          }
        }
        //付款时间
        if (this.timeRange) {
          data.paymentTimeStart = this.timeRange[0];
          data.paymentTimeEnd = this.timeRange[1];
        }
        //销售店铺
       
          var arr =[] 
          console.log(this.sources)
          this.sources.forEach(item=>{
            if(item.shopInfoId){
                arr.push(item.shopInfoId)
            }
          })
          data.shopInfoIds = arr
        //分页
        data.pageNum = this.currentPage
        data.pageSize = this.pageSize
        this.$http.post("" + process.env.API_ROOT + "/goods/list/query", data)
        .then(res => {
            console.log("监控搜索的商品列表", res);

          if (res.data.code == 1) {
            this.list = res.data.data.list
            this.totalList = res.data.data.total
          } else {
            this.list = []
            this.totalList = 0
            // this.$message({
            //   type: "error",
            //   message: res.data.msg
            // });
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    // 
    getMemberType(){
      if(this.radio){
        var arr=[]
      this.sources.forEach(item=>{
        if(item.shopInfoId){
            arr.push(item.shopInfoId)
        }
      })
      var data = {
        startTime:this.timeRange[0],
        endTime:this.timeRange[1],
        skuCode:this.rowDataList.skuCode,
        skuName:this.rowDataList.skuName
      }
      data.shopInfoIds = arr
      console.log(data)
      this.$http.post("" + process.env.API_ROOT + "/goods/monitor/customer/type/summary", data)
        .then(res => {
            console.log("客户类型汇总", res);

          if (res.data.code == 1) {
            this.chartData4.columns = ['customerType','payCusNum','payQty','payPrice','avgPiecesPrice']
            this.chartData4.rows = res.data.data
            this.chartData4.rows.forEach(item => {
              if(item.customerType==0){
                item.customerType = '新客户'
              }else if(item.customerType==1){
                item.customerType = '老客户'
              }else{
                item.customerType = '未知'
              }
            });
            if(this.chartData4.rows.length == 0){
              this.dataEmpty2 = true
            }else{
              this.dataEmpty2 = false
            }
          } else {
            this.chartData4 = {
              columns:[],
              rows:[]
            }
          }
          this.dialogVisible = false
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
      }else{
        this.$message({
          type:'error',
          message:'请选择一件商品'
        })
      }
    },
    getPlatform(){
      if(this.radio){
        var arr=[]
      this.sources.forEach(item=>{
        if(item.shopInfoId){
            arr.push(item.shopInfoId)
        }
      })
      var data = {
        startTime:this.timeRange[0],
        endTime:this.timeRange[1],
        skuCode:this.rowDataList.skuCode,
        skuName:this.rowDataList.skuName
      }
      data.shopInfoIds = arr
      console.log(data)
      this.$http.post("" + process.env.API_ROOT + "/goods/monitor/platform/summary", data)
        .then(res => {
            console.log("渠道汇总", res);

          if (res.data.code == 1) {
            this.chartData1.columns = ['platformName','payCusNum','payQty','payPrice','avgPiecesPrice']
            this.chartData1.rows = res.data.data
          } else {
            this.chartData1 = {
              columns:[],
              rows:[]
            }
          }
          if(this.chartData1.rows.length == 0){
              this.dataEmpty1 = true
            }else{
              this.dataEmpty1 = false
            }
          this.dialogVisible = false
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
      }else{
        this.$message({
          type:'error',
          message:'请选择一件商品'
        })
      }
    },
    getGoodsMsg(){
      if(this.radio){
        var arr=[]
      this.sources.forEach(item=>{
        if(item.shopInfoId){
            arr.push(item.shopInfoId)
        }
      })
      var data = {
        startTime:this.timeRange[0],
        endTime:this.timeRange[1],
        skuCode:this.rowDataList.skuCode,
        skuName:this.rowDataList.skuName
      }
      data.shopInfoIds = arr
      console.log(data)
      this.$http.post("" + process.env.API_ROOT + "/goods/monitor/summary", data)
        .then(res => {
            console.log("单件商品信息", res);

          if (res.data.code == 1) {
            this.goodsMsg = res.data.data
          } else {
            this.goodsMsg = {}
          }
          this.dialogVisible = false
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
      }else{
        this.$message({
          type:'error',
          message:'请选择一件商品'
        })
      }
      
    },
    change4(){
      this.autoFocus4=true;
      this.autoFocus5=false;
    },
    change5(){
      this.autoFocus5=true;
      this.autoFocus4=false;
    },
    b(row){
        return row.skuCode+ row.skuName
    },
    uniqObjInArray(objarray){
        let len = objarray.length;
        let tempJson = {
            
        };
        let res = [];
        for(let i = 0;i < len;i++){
            //取出每一个对象
            tempJson[JSON.stringify(objarray[i])] = true;
        }
        console.log("tempJson is ",tempJson);
        let keyItems= Object.keys(tempJson);
        for(let j = 0;j < keyItems.length;j++){
            res.push(JSON.parse(keyItems[j]));
        }
        return res;
    },
    //获取渠道
    getSource(shopStr){
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/place/getMarketingPlaceShops?shopId="+shopStr 
      })
      .then(res => {
        console.log("渠道list", res);
        if(res.data.code==1){
          this.types = res.data.data;
          res.data.data.forEach(item=>{
            item.shopDOS.forEach(shop=>{
              if(this.sources.indexOf(shop.shopInfoId)==-1){
                this.sources.push({shopInfoId:shop.shopInfoId,shopName:shop.shopName})
              }
            })
          })
          this.sources.unshift({shopInfoId:0,shopName:'不限'})
          console.log('渠道下的店铺列表',this.sources)
          this.getTableData()
        }else{
          this.types = []
        }
        this.types.unshift({
            marketingPlaceId:0,
            marketingPlaceName:'不限'
          })


      })
      .catch(error => {
        console.log(error);
        alert("系统异常");
      });
    },
    time(num) {
      this.form.orderCreateTime=[]
      if (num == 1) {
        this.form.orderCreateTime.push(
          formatDate.formatDateLastDay("yyyy-MM-dd",1)
        );
        this.form.orderCreateTime.push(
          formatDate.formatDate("yyyy-MM-dd")
        );
      } else if (num == 2) {
        this.form.orderCreateTime.push(
          formatDate.formatDateLastDay("yyyy-MM-dd",7)
        );
        this.form.orderCreateTime.push(
          formatDate.formatDate("yyyy-MM-dd")
        );
      } else {
        this.form.orderCreateTime.push(
          formatDate.formatDateLastDay("yyyy-MM-dd",30)
        );
        this.form.orderCreateTime.push(
          formatDate.formatDate("yyyy-MM-dd")
        );
      }
      this.getTableData();

    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.search();
          this.$refs[formName].clearValidate();
          // this.resetForm('addForm')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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
    rowClick1(row){
      // this.pageSize * (this.currentPage - 1) + index + 1;
      this.radio = this.list.indexOf(row) +1 +this.pageSizeList * (this.currentPageList - 1);
      // this.id =row.customer_group_id
      this.rowDataList = row
      console.log(row)
    },
    //tab 行点击事件
    rowclick(row) {
      console.log(row);
      this.rowData = row;
    },
    cellclick(row, column, cell, event){
      if(column.property == 'qty' || column.property == 'totalActual' || column.property == 'orderNum' || column.property == 'buyerNum' ){
        this.getSourceData(row,column)
        // this.getTopFive(,column.property)
          this.tagDialogVisible = true
          
        if(column.property == 'qty'){
          this.title = "商品销售总量"
          this.chartData.columns = ['marketingPlaceName','qty','shops']
        }
        if(column.property == 'totalActual'){
          this.title = "商品销售总额"
          this.chartData.columns = ['marketingPlaceName','totalActual','shops']
        }
        if(column.property == 'orderNum'){
          this.title = "商品订单总数"
          this.chartData.columns = ['marketingPlaceName','orderNum','shops']
        }
        if(column.property == 'buyerNum'){
          this.title = "商品购买总人数"
          this.chartData.columns = ['marketingPlaceName','buyerNum','shops']

        }
      }
    },
    //搜索条件开关
    a() {
      this.expload = !this.expload;
    },

    //获取等级
    getLevelList(apiMerchantId) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/level/configs?apiMerchantId=" +
          apiMerchantId
      })
        .then(res => {
          console.log("等级列表", res);
          if (res.data.code == 1) {
            this.levelList = res.data.data;
            this.levelList.unshift({
              apiCustomerLevelConfId: 0,
              customerLevelName: "不限"
            });
          }else{
            this.levelList=[]
            this.levelList.unshift({
              apiCustomerLevelConfId: 0,
              customerLevelName: "不限"
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //获取商户
    getStore(shopid) {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/merchantInfo?shopId=" + shopid
      })
        .then(res => {
          console.log("商户列表", res);
          if (res.data.code == 1) {
            this.store = res.data.data;
            if (res.data.data.length != 0) {
              // this.getShopList(this.store[0].apiMerchantId);
              this.getLevelList(this.store[0].apiMerchantId);
              this.getTableData()

            } else {
              // this.getShopList('');
              this.getLevelList("");
              this.getTableData()
              
            }
          } else {
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },

    //查看按钮
    look(id) {
      this.tagDialogVisible = true;
    },
    //查看详情开关
    close() {
      this.radio = ''
      this.rowDataList = {}
      this.dialogVisible = false
      this.tagDialogVisible = false;
    },
    //选择改变事件
    selectChange(sel) {
      console.log(sel);
      this.exportArr = sel;
    },
    // 选择按钮
    select(sel, row) {
      console.log(sel);
      this.exportArr = sel;
    },
    //全选按钮
    selectAll(sel) {
      console.log(sel);
      this.exportArr = sel;
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData()
    },
    handleSizeChangeList(val) {
      this.pageSizeList = val;
      this.getList()
    },
    handleCurrentChangeList(val) {
      this.currentPageList = val;
      this.getList()
    },
    

    //导出选中
    exportSelect() {
      if (this.exportArr.length == 0) {
        this.$message({
          type: "error",
          message: "请选择至少一条数据"
        });
      } else {
        this.$http({
          method: "post",
          url: "" + process.env.API_ROOT + "/goods/list/export",
          responseType: "arraybuffer",
          data: this.exportArr
        })
          .then(res => {
            console.log(res.data);
            const blob = new Blob([res.data], {
              type: "application/vnd.ms-excel"
            });
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = "none";
            a.download = "商品列表.xlsx";
            a.href = blobUrl;
            a.click();
            document.body.removeChild(a);
          })
          .catch(err => {
            console.log(err);

            alert("网络异常");
          });
      }
    },
    //导出全量
    exportAll() {
      var data ={}
         if (this.form.skuCode) {
          data.skuCode = this.form.skuCode;
        }
        // 商品名称
        if (this.form.goodsName) {
          data.goodsName = this.form.goodsName;
        }
        //付款时间
        if (this.form.orderCreateTime) {
          data.paymentTimeStart = this.form.orderCreateTime[0];
          data.paymentTimeEnd = this.form.orderCreateTime[1];
        }
        //销售店铺
        if (this.form.shopInfoIds) {
          data.shopInfoIds = [this.form.shopInfoIds];
        } else {
          var arr =[] 
          console.log(this.sources)
          this.sources.forEach(item=>{
            if(item.shopInfoId){
                arr.push(item.shopInfoId)
            }
          })
          data.shopInfoIds = arr
        }
        //销售渠道
        if (this.form.orderType) {
          data.marketingPlaceIds = [this.form.orderType];
        }
        if (this.form.memberType!=2) {
          data.customerType = this.form.memberType;
        }
        //等级
        if (this.form.levelId !== 0) {
          data.levelId = this.form.levelId;
        } else {
        }
      this.$http({
        method: "post",
        url: "" + process.env.API_ROOT + "/goods/list/export/all",
        responseType: "arraybuffer",
        data: data
      })
        .then(res => {
          console.log(res.data);
          const blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          a.download = "所有商品列表.xlsx";
          a.href = blobUrl;
          a.click();
          document.body.removeChild(a);
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    //获取商户下面店铺列表
    // getShopList(apiMerchantId) {
    //   this.$http({
    //     method: "get",
    //     url: "" + process.env.API_ROOT + "/shopIds?apiMerchantId="+apiMerchantId
    //   })
    //     .then(res => {
    //       console.log("商户下店铺列表", res);
    //       if (res.data.code == 1) {
    //         this.sources = res.data.data;
    //         this.sources.unshift({
    //           shop_info_id: 0,
    //           shop_name: "不限"
    //         });
    //         this.getTableData()
    //       }else{
    //         this.sources = [];
    //         this.sources.unshift({
    //           shop_info_id: 0,
    //           shop_name: "不限"
    //         });
    //         this.getTableData()

    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       alert("登入失败");
    //     });
    // },
    //重置搜索条件
    reset() {
      this.form = {
        memberType: 2,
        shopInfoIds: 0,
        memberMobile: "",
        memberVipCode: "",
        memberName: "",
        taobaoId: "",
        memberEmail: "",
        orderType: 0,
        orderCreateTime: [],
        goodsName: "",
        skuCode: "",
        levelId: 0,
      };
      this.getTableData()

    },
    //搜索
    search() {
      this.currentPage = 1;
      this.getTableData()
    },


    getTopFive(row,placeId,queryType,index){
          var data = {};
          topNum:5,
          //查询类型
          data.queryType = queryType=='qty' ? 'qty':queryType=='totalActual' ? 'total':queryType=='orderNum' ? 'order':queryType=='buyerNum' ? 'buyer':''
          //单个渠道ID
          data.placeId = placeId
        //商品ID
          data.skuCode = row.skuCode;
        // 商品名称
        if (this.form.goodsName) {
          data.goodsName = this.form.goodsName;
        }
        //付款时间
        if (this.form.orderCreateTime) {
          data.paymentTimeStart = this.form.orderCreateTime[0];
          data.paymentTimeEnd = this.form.orderCreateTime[1];
        }
        //销售店铺
        if (this.form.shopInfoIds) {
          data.shopInfoIds = [this.form.shopInfoIds];
        } else {
          var arr =[] 
          // console.log(this.sources)
          this.sources.forEach(item=>{
            if(item.shopInfoId){
                arr.push(item.shopInfoId)
            }
          })
          data.shopInfoIds = arr
        }
        //销售渠道
        if (this.form.orderType) {
          data.marketingPlaceIds = [this.form.orderType];
        }
        if (this.form.memberType!=2) {
          data.customerType = this.form.memberType;
        }
        //等级
        if (this.form.levelId !== 0) {
          data.levelId = this.form.levelId;
        } else {
        }
        // console.log(data)
        this.$http.post("" + process.env.API_ROOT + "/goods/list/byShop", data)
        .then(res => {
            console.log("top5", res);

          if (res.data.code == 1) {
            this.chartData.rows[index].shops = res.data.data
            this.chartData.rows[index].type = queryType 
          } else {
            this.chartData.rows[index].shops = []
            this.chartData.rows[index].type = queryType 
          }
          console.log(this.chartData.rows)
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    getSourceData(row,column){
        var data = {};
        //商品ID
          data.skuCode = row.skuCode;
        // 商品名称
        if (this.form.goodsName) {
          data.goodsName = this.form.goodsName;
        }
        //付款时间
        if (this.form.orderCreateTime) {
          data.paymentTimeStart = this.form.orderCreateTime[0];
          data.paymentTimeEnd = this.form.orderCreateTime[1];
        }
        //销售店铺
        if (this.form.shopInfoIds) {
          data.shopInfoIds = [this.form.shopInfoIds];
        } else {
          var arr =[] 
          this.sources.forEach(item=>{
            if(item.shopInfoId){
                arr.push(item.shopInfoId)
            }
          })
          data.shopInfoIds = arr
        }
        //销售渠道
        if (this.form.orderType) {
          data.marketingPlaceIds = [this.form.orderType];
        }
        if (this.form.memberType!=2) {
          data.customerType = this.form.memberType;
        }
        //等级
        if (this.form.levelId !== 0) {
          data.levelId = this.form.levelId;
        } else {
        }
        //分页
        data.pageNum = this.currentPage
        data.pageSize = this.pageSize
        this.$http.post("" + process.env.API_ROOT + "/goods/list/byChannel", data)
        .then(res => {
            console.log("渠道汇总", res);

          if (res.data.code == 1) {
            this.sourceData = res.data.data;
          } else {
            this.sourceData = []
          }
          this.chartData.rows = res.data.data
          console.log(this.chartData.rows)
          this.chartData.rows.forEach((item,index)=>{
            if(item.marketingPlaceId){
              this.getTopFive(row,item.marketingPlaceId,column.property,index)
            }else{
              this.chartData.rows[index].shops=[]
            }
          })
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    //获取列表信息
    getTableData() {
      console.log(11111111111)
        var data = {};
        //商品ID
        if (this.form.skuCode) {
          data.skuCode = this.form.skuCode;
        }
        // 商品名称
        if (this.form.goodsName) {
          data.goodsName = this.form.goodsName;
        }
        //付款时间
        if (this.form.orderCreateTime) {
          data.paymentTimeStart = this.form.orderCreateTime[0];
          data.paymentTimeEnd = this.form.orderCreateTime[1];
        }
        //销售店铺
        if (this.form.shopInfoIds) {
          data.shopInfoIds = [this.form.shopInfoIds];
        } else {
          var arr =[] 
          console.log(this.sources)
          this.sources.forEach(item=>{
            if(item.shopInfoId){
                arr.push(item.shopInfoId)
            }
          })
          data.shopInfoIds = arr
        }
        //销售渠道
        if (this.form.orderType) {
          data.marketingPlaceIds = [this.form.orderType];
        }
        if (this.form.memberType!=2) {
          data.customerType = this.form.memberType;
        }
        //等级
        if (this.form.levelId !== 0) {
          data.levelId = this.form.levelId;
        } else {
        }
        //分页
        data.pageNum = this.currentPage
        data.pageSize = this.pageSize
        // console.log(data)
        this.$http.post("" + process.env.API_ROOT + "/goods/list/query", data)
        .then(res => {
            console.log("商品列表", res);

          if (res.data.code == 1) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            this.tableData = []
            this.total = 0
            // this.$message({
            //   type: "error",
            //   message: res.data.msg
            // });
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    }
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      console.log(vm); //当前组件的实例
    });
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.goods {
  .el-button.is-active,.no{
    width: 120px;
  }
  .goodsMsg{
    background: #fff;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
    padding:  25px ;
    border-bottom:  1px solid #F0F1F4;
    h3{
      font-family: 'zt2';
      font-size: 16px;
      color: #333333;
      letter-spacing: 0;
      line-height: 16px;
    }
    .msgContent{
      display: flex;
      align-items: center;
      .goodsBox:first-child{
        width: 160px;
        font-family: 'zt1';
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        line-height: 20px;
        margin-right: 200px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
     
      .goodsBox{
        // width: 120px;
        height: 40px;
        // margin: 0 10px;
        margin: 10px 0;
        padding : 0 10px;
        .top{
          font-family: 'zt1';
          font-size: 12px;
          color: #666666;
          letter-spacing: 0;
        }
        .bot{
          font-family: HelveticaNeue-Medium;
          font-size: 18px;
          color: #151515;
          letter-spacing: 0;
          text-align: justify;
          line-height: 25px;
        }
      }
    }
  }
  .selBox{
    padding: 0 25px;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
    margin-bottom: 10px;
    justify-content: space-between;

    .put{
      width: 200px;
    }
    .sec {
        font-family: 'zt2';
        font-size: 14px;
        letter-spacing: 0;
        border: 1px solid #3366ff;
        border-radius: 2px;
        height: 32px;
        line-height: 8px;
        margin: 12px 0 12px 20px;
        color: #3366ff;
        margin-right: 20px;
      }
  }
  
  .el-tabs__content{
    padding: 0 20px;
  }

   .orderChart{
        width: 50%;
        float: left;
        background: #fff;
        padding:  25px;
        box-sizing: border-box;
      border-bottom:  1px solid #F0F1F4;


    }
    .levelChart{
        width: 50%;
        float: right;
         background: #fff;
        padding:  25px;
        box-sizing: border-box;
      border-bottom:  1px solid #F0F1F4;

    }
    .timeChart,.goodChart{
      background: #fff;
        // box-shadow: 0 0px 8px 0px rgba(0,0,0,0.05);
        padding:  25px;
        box-sizing: border-box;
      border-bottom:  1px solid #F0F1F4;
    }
    .goodChart,.timeChart,.levelChart,.orderChart{
      h3{
        font-family: 'zt3';
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
      }
    }
  .property{
    h4{
      padding: 10px 0;
    }
  }
  .el-dialog{
    .el-tabs__nav-scroll{
      padding: 0;
      text-align: center;
      .el-tabs__nav{
        margin: 0 auto;
      }
      
    }
        .l{
          float: left;

          width: 240px;
          font-family: 'zt1';
          font-size: 14px;
          color: #333333;
          line-height: 22px;
          padding: 5px;
          box-sizing: border-box;
          div{
            padding: 5px;
            width: 240px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span{
              display: inline-block;
              width: 100px;
              color: #999999;
            }
          }
      }
          
        .r{
          float: right;
          width: 240px;
          font-family: 'zt1';
          font-size: 14px;
          color: #333333;
          line-height: 22px;
          padding: 5px;
          box-sizing: border-box;
          div{
            padding: 5px;
            width: 240px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            
            span{
              display: inline-block;
              width: 100px;
              color: #999999;
            }
          }
          
        }
  }
  .el-tabs__nav-scroll{
      padding: 0 45px;
  }
  .moreMsg {
    li {
      padding: 5px;
      span {
        display: inline-block;
        width: 100px;
      }
    }
  }
  .el-tag--small:first-child {
    width: 100px;
    display: flex;
    align-items: center;
    .el-select__tags-text {
      display: inline-block;
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    i {
      display: inline-block;
    }
  }

  .plus {
    font-size: 20px;
    margin-left: 20px;
    padding: 20px 0;
  }
  .el-dialog {
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form--label-top .el-form-item__label {
      padding-bottom: 0;
    }
  }
  .head {
    h1 {
      opacity: 0.87;
      font-family: 'zt2';
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 36px;
      height: 42px;
      font-weight: bold;
      padding: 0 50px;
      // float: left;
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
      // float: right;
      margin-left: 50px;
      line-height: 30px;
      margin-right: 20px;
    }
  }
  .box {
    overflow: hidden;
    position: relative;
    // margin: 0 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    height: 90%;
    .boxContent {
      width: 100%;
      background: #fff;
      .btnBox {
        // padding: 20px 30px;

        .left {
          width: calc(100% - 100px);
          height: 60px;
          line-height: 60px;
          float: left;
          border-bottom: #ccc 1px solid;
          border-right: #ccc 1px solid;
          box-sizing: border-box;
          padding-left: 30px;
          .btn {
            height: 60px;
            float: right;
            margin-right: 20px;
            span {
              font-family: "zt1";
              font-size: 14px;
              color: #666666;
              text-align: right;
              line-height: 14px;
            }
          }
        }
        .right {
          height: 60px;
          line-height: 60px;
          box-sizing: border-box;
          text-align: center;
          width: 100px;
          float: right;
          .el-button {
            span {
              font-family: "zt1";
              font-size: 14px;
              color: #666666;
              text-align: right;
              line-height: 14px;
            }
          }
        }
      }
      .form {
        padding: 0 30px;
        .el-form-item{
          width: 24%;
          box-sizing: border-box;
          .el-select{
            width: 100%;
          }
          .el-date-editor{
            width: 100%;
          }
        }
        .btns {
          position: relative;
          padding-bottom: 20px;
          height: 90px;
          display: inline-block;
          width: 24%;
          text-align: right;
          div {
            width: 100%;
            position: absolute;
            bottom: 20px;
          }
        }
        .memberMsg {
          height: 38px;
          display: flex;
          width: 300px;
          border: 1px solid #d9d9d9;
          .el-input {
          height: 38px;
            line-height: 38px;
            width:50%;
            .el-input__inner {
              height: 36px;
              border: none;
              border-radius: 0;
            }
          }
          .pointBox1{
            height: 38px;
                line-height: 38px;
            width: 100%;
            .el-input {
              height: 38px;
            line-height: 38px;
              width: 40%;
              .el-input__inner {
                height: 38px;
            line-height: 38px;
                border: none;
                border-radius: 0;
              }
            }
            
          }
          .pointBox{
            height: 38px;
                line-height: 38px;
            width: 100%;
            .el-input {
              height: 38px;
              line-height: 38px;
              .el-input__inner {
                height: 38px;
                line-height: 38px;
                border: none;
                border-radius: 0;
              }
            }
            
          }
          .el-select {
              height: 38px;
            line-height: 38px;
            .el-input {
              height: 38px;
            line-height: 38px;

              width: 120px;
              .el-input__inner {
                border: none;
                border-right: 1px solid #d9d9d9;
                border-radius: 0;
                height: 38px;
            line-height: 38px;
              }
            }
          }
          
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
            font-family: 'zt1';
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
          }
          .el-button {
            font-family: 'zt1';
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
      .el-pagination {
        width: 100%;
        text-align: center;
        .el-pagination__sizes{
          float: left;
        }
      }
    }
  .bottom {
    text-align: center;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    line-height: 30px;
    height: 30px;
  }
  .danger {
    font-family: 'zt1';
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 20px;
    height: 32px;
    margin-bottom: 20px;
  }
}
</style>
