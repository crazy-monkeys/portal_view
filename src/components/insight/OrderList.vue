<template>
<div class="order">
        <div class="head clear">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>客户洞察</el-breadcrumb-item>
            <el-breadcrumb-item>订单数据</el-breadcrumb-item>
          </el-breadcrumb>
          <h1>订单数据</h1>
        </div>
        <el-tabs type="" :before-leave='changeTag' v-model="active">
            <el-tab-pane label="订单列表" >
                <div class="box">
                <div class="boxContent">
                    <div class="btnBox clear">
                    <div class="left">
                        <el-button
                        class=""
                        type
                        size="small"
                        @click="time(1)"
                        :class="autoFocus1 ? 'is-active' :'no'"
                        plain
                        >近1个月订单</el-button>
                        <el-button
                        type
                        size="small"
                        @click="time(2)"
                        :class="autoFocus2 ? 'is-active' :'no'"
                        plain
                        >近半年订单</el-button>
                        <el-button
                        type
                        size="small"
                        @click="time(3)"
                        :class="autoFocus3 ? 'is-active' :'no'"
                        plain
                        >半年以前订单</el-button>
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
                    <el-form-item label="订单编号" prop="orderCode">
                        <el-input v-model="form.orderCode"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="会员信息"
                        :prop='form.memberType==1? "memberMobile" : form.memberType==2 ? "memberVipCode" :form.memberType==3 ? "memberName" :form.memberType==4 ? "taobaoId" : form.memberType==5 ?"memberEmail" : ""'
                                >
                        <div class="memberMsg">
                        <el-select v-model="form.memberType">
                            <el-option
                            v-for="item in memberMsg"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-input v-if="form.memberType==1" v-model="form.memberMobile"></el-input>
                        <el-input v-if="form.memberType==2" v-model="form.memberVipCode"></el-input>
                        <el-input v-if="form.memberType==3" v-model="form.memberName"></el-input>
                        <el-input v-if="form.memberType==4" v-model="form.taobaoId"></el-input>
                        <el-input v-if="form.memberType==5" v-model="form.memberEmail"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="订单来源" prop="shopInfoIds">
                        <el-select v-model="form.shopInfoIds" placeholder="请选择" @change="shopIdsChange">
                        <el-option
                            v-for="item in sources"
                            :key="item.shop_info_id"
                            :label="item.shop_name"
                            :value="item.shop_info_id"
                        ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单类型" prop="orderType">
                        <el-select v-model="form.orderType" placeholder="请选择">
                        <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="下单时间" prop="orderCreateTime">
                        <el-date-picker
                        v-model="form.orderCreateTime"
                        type="datetimerange"
                        range-separator="至"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        prefix-icon="icon"
                        start-placeholder="不限"
                        end-placeholder="不限"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="付款时间" prop="paymentTime">
                        <el-date-picker
                        v-model="form.paymentTime"
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        prefix-icon="icon"
                        start-placeholder="不限"
                        end-placeholder="不限"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="商品信息" :prop='form.goodsType==1?"goodsName" :"skuCode" '>
                        <div class="memberMsg">
                        <el-select v-model="form.goodsType">
                            <el-option
                            v-for="item in goodsTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-input v-if="form.goodsType==1" v-model="form.goodsName"></el-input>
                        <el-input v-if="form.goodsType==2" v-model="form.skuCode"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="会员等级" prop>
                        <el-select v-model="form.levelIds" placeholder="请选择">
                        <el-option
                            v-for="item in levelList"
                            :key="item.apiCustomerLevelConfId"
                            :label="item.customerLevelName"
                            :value="item.apiCustomerLevelConfId"
                        ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单状态" prop>
                        <el-select v-model="form.orderStatus" placeholder="请选择">
                        <el-option
                            v-for="item in status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
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
                    >
                    <el-table-column label prop width="30" show-overflow-tooltip></el-table-column>
                    <el-table-column type="selection" prop label width="30" :reserve-selection='true'></el-table-column>
                    <el-table-column label="订单编号" prop="orderCode" show-overflow-tooltip></el-table-column>
                    <el-table-column label="会员ID" prop="vipCode" show-overflow-tooltip></el-table-column>
                    <el-table-column label="会员手机号码" prop="memberMobile" show-overflow-tooltip></el-table-column>
                    <el-table-column label="会员等级" prop="memberLevel" show-overflow-tooltip></el-table-column>
                    <el-table-column label="订单金额" prop="totalActual" show-overflow-tooltip></el-table-column>
                    
                    <el-table-column label="下单时间" prop="createTime" show-overflow-tooltip></el-table-column>
                    <el-table-column label="付款时间" prop="paymentTime" show-overflow-tooltip></el-table-column>
                    <el-table-column label="订单来源" prop="orderSource" show-overflow-tooltip></el-table-column>
                    <el-table-column label="订单状态" prop="orderStatus" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="look(tableData[scope.$index].orderCode,tableData[scope.$index].memberName,tableData[scope.$index].memberEmail,tableData[scope.$index].tabao_id)"
                            type="text"
                        >查看详情</el-button>
                        </template>
                    </el-table-column>
                    <div slot="empty">
                        <div>
                        <img src="../../assets/img/none.png" alt width="140" height="140">
                        </div>
                        <p :style="{'marginTop': '23px'}">无订单列表信息</p>
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
            <el-tab-pane label="订单监控"  >
              <div class="timerange">
                统计时间：
                <el-date-picker
              :picker-options="pickerOptions0"

                    :clearable =' false'
                    v-model="timeRange"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd"
                    prefix-icon="icon"
                    start-placeholder="不限"
                    end-placeholder="不限"
                    class='chartDate'
                ></el-date-picker>
              </div>
                <div class="clear chartBox">
                <div class="orderChart">
                  <h3>订单来源占比</h3>
                    <ve-pie :data="chartData1" :data-empty="dataEmpty1" height="400px" ref='c1' :legend-position='position' :colors='colors' ></ve-pie>
                </div>
                <div class="levelChart">
                  <h3>会员等级占比</h3>
                    <ve-pie :data="chartData4" :data-empty="dataEmpty4" height="400px" ref='c2' :legend-position='position' :colors='colors'></ve-pie>
                </div>
                </div>
                <div class="timeChart">
                  <h3>24小时付款实况</h3>
                  <ve-histogram :data="chartData3" :extend="extend" :data-empty="dataEmpty3" :settings="chartSettings"  height="400px" ref='c4' :legend-position='position' :colors='colors1' :opacity='1'></ve-histogram>
                </div>
                <div class="goodChart">
                  <h3>热销TOP5</h3>
                  <ve-bar :data="chartData2" :data-empty="dataEmpty2" height="300px" ref='c3' :settings="chartSettings2" :grid='grid' :extend="extend1" :legend-position='position' :colors='colors2' :legend-visible ='false'> </ve-bar>
                </div>


            </el-tab-pane>
        </el-tabs>
        

        <!-- 查看标签控件 -->
        <el-dialog
          title="订单详情"
          :visible.sync="tagDialogVisible"
          width="500px"
          :before-close="close"
          :close-on-click-modal="false"
            >
          <!-- 订单编号、会员姓名、淘宝ID、邮箱、以及商品详情”商品详情区包含【商品名称】【商品id】【商品购买件数】 -->
          <ul class="moreMsg">
            <li>
              <span>订单编号:</span>
              {{rowData.orderCode}}
            </li>
            <li>
              <span>会员姓名:</span>
              {{rowData.memberName}}
            </li>
            <li>
              <span>淘宝ID:</span>
              {{rowData.taobaoId}}
            </li>
            <li>
              <span>邮箱:</span>
              {{rowData.memberEmail}}
            </li>
            <li>
              <span>商品详情:</span>
            </li>
          </ul>
          <el-table :data="moreMsg" style="width: 100%" height="200">
            <el-table-column label="商品" prop="sku_name" show-overflow-tooltip></el-table-column>
            <el-table-column label="ID" prop="sku_code" show-overflow-tooltip></el-table-column>
            <el-table-column label="数量" prop="purchase_qty" show-overflow-tooltip></el-table-column>

            <div slot="empty">
              <div>
                <img src="../../assets/img/none.png" alt width="70" height="70">
              </div>
              <p :style="{'marginTop': '23px'}">无商品详情信息</p>
            </div>
          </el-table>
          <span slot="footer" class="dialog-footer">
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
  name: "order",
  data() {
    this.grid ={
          width:'90%',
        },
    this.chartSettings2 = {
        label:{
          show:false
        },
        labelMap: {
          skuCnt: '商品销售总量',
        },
        dataOrder: {
          label: 'skuCnt',
          order: 'desc'
        }
      }
      this.extend = {
        series: {
          type:'bar',
          barWidth:20
        }
      }
      this.extend1 = { 
        series: {
          type:'bar',
          barWidth:20
        },
        // xAxis:{
        //   axisLabel:{
        //     formatter: function (value) {
        //         return '{value|' + value + '}';
        //     },
        //     rich: {
        //         value: {
        //             align: 'left',
        //             width:'5',
        //         },
        //     }
        //   }
        // },
        // 'xAxis.0.axisLabel.rotate': 0,
        // 'xAxis.0.axisLabel.align': 'right',
       }
      this.chartSettings = {
        // xAxisType: 'value',
        labelMap: {
          order_paid: '下单且已付',
          unpaid: '下单未付',
          current_paid: '当时付款',
        },
        stack: { '付款情况': ['order_paid', 'unpaid','current_paid'] },
        opacity:1
      }
    return {
        pickerOptions0:{ 
          disabledDate(time) {
            return time.getTime() > Date.now()  -8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的 
          }
        },
        dataEmpty1:true,
        dataEmpty2:true,
        dataEmpty3:true,
        dataEmpty4:true,
        colors:['#3366FF','#F13869','#36A7EA','#66C947','#8D44F0','#F68106'],
        colors1:['blue','red','orange'],
        colors2:['#3366FF'],
        position:'bottom',
        active:'0',
        //默认时间 （过去1天）
        timeRange:[formatDate.formatDateTom('yyyy-MM-dd'),formatDate.formatDateTom('yyyy-MM-dd')],
        chartData3: {
            columns: [],
            rows: []
        },
        chartData2: {
            columns: [],
            rows: []
        },
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
        //筛选按钮状态
      autoFocus1: true,
      autoFocus2: false,
      autoFocus3: false,
      rules: {
        orderCode: [
          {
            required: false,
            trigger: "change",
            validator: (rule, value, callback) => {
              let re = /^[A-Za-z0-9]+$/;
              if (!value) {
                callback();
              } else {
                if (re.test(value)) {
                  callback();
                } else {
                  callback(new Error("只能输入数字和字母"));
                }
              }
            }
          }
        ],
        memberMobile: [
          { required: false, trigger: "change", validator: formTest.phone1Test }
        ],
        memberVipCode: [
          {
            required: false,
            trigger: "change",
            validator: formTest.memberVipCode
          }
        ],
        memberName: [
          { required: false, trigger: "change", validator: formTest.memberName }
        ],
        taobaoId: [
          { required: false, trigger: "change", validator: formTest.taobaoId }
        ],
        memberEmail: [
          { required: false, trigger: "change", validator: formTest.email1Test }
        ],
        shopInfoIds: [
          { required: false, message: "请选择订单来源", trigger: "change" }
        ],
        orderType: [
          { required: false, message: "请选择订单类型", trigger: "change" }
        ],
        paymentTime: [
          { required: false, message: "请选择付款时间", trigger: "change" }
        ],
        orderCreateTime: [
          { required: false, message: "请选择下单时间", trigger: "change" }
        ],
        goodsName: [
          { required: false, message: "请输入商品名称", trigger: "change" }
        ],
        skuCode: [
          { required: false, message: "请选择商品ID", trigger: "change" }
        ],
        orderStatus: [
          { required: false, message: "请选择订单状态", trigger: "change" }
        ],
        levelIds: [
          { required: false, message: "请选择等级", trigger: "change" }
        ]
      },
      exportArr: [],
      expload: false,
      levelList: [],
      store: "",
      tagDialogVisible: false,
      tableData: [],
      currentPage: 1,
      pageSize: 50,
      total: 0,
      //商品选项
      goodsTypes: [
        {
          label: "商品名称",
          value: 1
        },
        {
          label: "商品ID",
          value: 2
        }
      ],
      //   订单状态选项
      status: [
        {
          label: "不限",
          value: 0
        },
        {
          label: "没有创建支付宝交易",
          value: "TRADE_NO_CREATE_PAY"
        },
        {
          label: "等待买家付款",
          value: "WAIT_BUYER_PAY"
        },
        {
          label: "等待卖家发货",
          value: "WAIT_SELLER_SEND_GOODS"
        },
        {
          label: "等待买家确认收货",
          value: "WAIT_BUYER_CONFIRM_GOODS"
        },
        {
          label: "买家已签收",
          value: "TRADE_BUYER_SIGNED"
        },
        {
          label: "交易成功",
          value: "TRADE_FINISHED"
        },
        {
          label: "付款以后用户退款成功",
          value: "TRADE_CLOSED"
        },
        {
          label: "付款以前，卖家或买家主动关闭交易",
          value: "TRADE_CLOSED_BY_TAOBAO"
        },
        {
          label: "国际信用卡支付付款确认中",
          value: "PAY_PENDING"
        }
      ],
      //订单类型选项
      types: [
        {
          label: "不限",
          value: 0
        },
        {
          label: "会员",
          value: 1
        },
        {
          label: "非会员",
          value: 2
        }
      ],
      //订单来源选项   选择店铺
      sources: [],
      //会员信息选项
      memberMsg: [
        {
          label: "会员手机号",
          value: 1
        },
        {
          label: "会员ID",
          value: 2
        },
        {
          label: "会员姓名",
          value: 3
        },
        {
          label: "淘宝ID",
          value: 4
        },
        {
          label: "邮箱",
          value: 5
        }
      ],
      rowData: {},
      //详情的数据
      moreMsg: {},
      //搜索条件表单
      form: {
        goodsType: 1,
        memberType: 1,
        shopInfoIds: 0,
        orderCode: "",
        memberMobile: "",
        memberVipCode: "",
        memberName: "",
        taobaoId: "",
        memberEmail: "",
        orderType: 0,
        orderCreateTime: [
          formatDate.formatDateLastMonth("yyyy-MM-dd hh:mm:ss"),
          formatDate.formatDate("yyyy-MM-dd hh:mm:ss")
        ],
        orderCreateTimeStart: "",
        orderCreateTimeEnd: "",
        paymentTime: [],
        paymentTimeStart: "",
        paymentTimeEnd: "",
        goodsName: "",
        skuCode: "",
        levelIds: 0,
        orderStatusType: "",
        orderStatus: 0
      }
    };
  },
  computed: {
    shopId() {
      return this.$store.state.shopId.shopId;
    }
  },
  created() {
    this.getStore(this.shopId);
  },
  watch: {
    active:{
        handler:function(n,o){
            if(n==1){
              this.getOrder()
              this.getLive()
              this.getTopFive()
              this.getLevel()
                  this.$nextTick(() => {
                      console.log(this.$refs['c1'])
                      this.$refs['c1'].echarts.resize()
                      this.$refs['c2'].echarts.resize()
                      this.$refs['c3'].echarts.resize()
                      this.$refs['c4'].echarts.resize()
                  })
            }
            
        }
    },
    shopId:{
        handler:function(n,o){
            this.getStore(n)
        }
    },
    'form.memberType':{
        handler:function(n,o){
            if(n==1){
                this.form.memberVipCode = ''
                this.form.memberName = ''
                this.form.taobaoId = ''
                this.form.memberEmail = ''
            }
            if(n==2){
                this.form.memberMobile = ''
                this.form.memberName = ''
                this.form.taobaoId = ''
                this.form.memberEmail = ''
            }
            if(n==3){
                this.form.memberMobile = ''
                this.form.memberVipCode = ''
                this.form.taobaoId = ''
                this.form.memberEmail = ''
            }
            if(n==4){
                this.form.memberMobile = ''
                this.form.memberVipCode = ''
                this.form.memberName = ''
                this.form.memberEmail = ''
            }
            if(n==5){
                this.form.memberMobile = ''
                this.form.memberVipCode = ''
                this.form.memberName = ''
                this.form.taobaoId = ''
            }
        }
    },
    'form.goodsType':{
        handler:function(n,o){
            if(n==1){
                this.form.skuCode = ''
            }else{
                this.form.goodsName = ''
            }
        }
    },
    timeRange:{
       handler: function(n, o) {
           this.getOrder()
           this.getLive()
           this.getTopFive()
           this.getLevel()
       } ,
       deep:true
    },
    "form.orderCreateTime": {
      handler: function(n, o) {
        if (n) {
            console.log(new Date(n[1]).getTime() - new Date(n[0]).getTime()==
              30 * 24 * 60 * 60 * 1000)
          if (n.length != 0) {
            if (n[0] == "1970-01-01 00:00:00" ) {
              this.autoFocus1 = false;
              this.autoFocus2 = false;
              this.autoFocus3 = true;
            }else{
                if (
                    new Date(n[1]).getTime() - new Date(n[0]).getTime() ==
                    30 * 24 * 60 * 60 * 1000
                ) {
                    this.autoFocus1 = true;
                    this.autoFocus2 = false;
                    this.autoFocus3 = false;
                }else if (
                    new Date(n[1]).getTime() - new Date(n[0]).getTime() ==
                    180 * 24 * 60 * 60 * 1000
                ) {
                    this.autoFocus1 = false;
                    this.autoFocus2 = true;
                    this.autoFocus3 = false;
                }else{
                    this.autoFocus1 = false;
                    this.autoFocus2 = false;
                    this.autoFocus3 = false;
                }
            }
            
            
          } else {
            this.autoFocus1 = false;
            this.autoFocus2 = false;
            this.autoFocus3 = false;
          }
        } else {
          this.autoFocus1 = false;
          this.autoFocus2 = false;
          this.autoFocus3 = false;
        }
      }
    }
  },
  methods: {
    b(row){
        return row.orderCode
    },
    changeTag(newName,oldName){
        console.log(newName,oldName)
        if(newName ==1 ){
            // console.log(this.$refs['c1'])
            this.$refs['c1'].resize()
        }
    },
    //获取24小时付款实况
    getLive(){
        
        var arr = []
        this.sources.forEach(item=>{
            if(item.shop_info_id){
                arr.push(item.shop_info_id)
            }
        })
        var data ={
            startTime:this.timeRange ? this.timeRange[0] :'',
            endTime:this.timeRange? this.timeRange[1] :'',
            shopInfoIds:arr
        }
        this.$http
        .post("" + process.env.API_ROOT + "/order/monitor/payment/status/summary", data)
        .then(res => {
            console.log('实况数据',res)
          if (res.data.code == 1) {
            this.chartData3.columns = ['时间','unpaid','current_paid','order_paid']
            this.chartData3.rows = [
                { '时间': 0 },
                { '时间': 1},
                { '时间': 2 },
                { '时间': 3 },
                { '时间': 4 },
                { '时间': 5 },
                { '时间': 6 },
                { '时间': 7 },
                { '时间': 8},
                { '时间': 9 },
                { '时间': 10 },
                { '时间': 12 },
                { '时间': 11 },
                { '时间': 13 },
                { '时间': 14 },
                { '时间': 15 },
                { '时间': 16 },
                { '时间': 17 },
                { '时间': 18 },
                { '时间': 19 },
                { '时间': 20 },
                { '时间': 21 },
                { '时间': 22 },
                { '时间': 23 },
              ]
            res.data.data.summaryData.forEach(item=>{
              for(var i =0;i<24;i++){
                if(item.orderHour ==i ){
                  if(item.hourStatus == "order_paid"){
                    this.chartData3.rows[i].order_paid = item.orderCnt
                  }
                  if(item.hourStatus == "unpaid"){
                    this.chartData3.rows[i].unpaid = item.orderCnt
                  }
                  if(item.hourStatus == "current_paid"){
                    this.chartData3.rows[i].current_paid = item.orderCnt
                  }
                }
              }
              
            })

            console.log(this.chartData3)
            if(this.chartData3.rows.length == 0){
              this.dataEmpty3 = true
            }else{
              this.dataEmpty3 = false
            }
          } else {
           
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    //   获取等级数据
    getLevel(){
        var arr = []
        this.sources.forEach(item=>{
            if(item.shop_info_id){
                arr.push(item.shop_info_id)
            }
        })
        var data ={
            startTime:this.timeRange? this.timeRange[0] :'',
            endTime:this.timeRange? this.timeRange[1] :'',
            shopInfoIds:arr
        }
        this.$http
        .post("" + process.env.API_ROOT + "/order/monitor/member/level/summary", data)
        .then(res => {
            console.log('等级数据',res)
          if (res.data.code == 1) {
            this.chartData4.columns = ['levelName','orderCnt','orderPrice']
            this.chartData4.rows = res.data.data.summaryData
            // this.chartData4.rows=[
            //     {
            //         levelCnt: 212,
            //         levelPrice: 567475,
            //         levelName: "vip1",
            //     },
            //     {
            //         levelCnt: 421,
            //         levelPrice: 567475,
            //         levelName: "vip2",
            //     },
            //     {
            //         levelCnt: 124,
            //         levelPrice: 567475,
            //         levelName: "vip3",
            //     },
            //     {
            //         levelCnt: 12,
            //         levelPrice: 567475,
            //         levelName: "vip4",
            //     },
            //     {
            //         levelCnt: 421,
            //         levelPrice: 567475,
            //         levelName: "vip5",
            //     },
            //     {
            //         levelCnt: 51,
            //         levelPrice: 567475,
            //         levelName: "vip6",
            //     },
            // ]
            if(this.chartData4.rows.length == 0){
              this.dataEmpty4 = true
            }else{
              this.dataEmpty4 = false
            }
          } else {
           
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    //获取top5
    getTopFive(){
        var arr = []
        this.sources.forEach(item=>{
            if(item.shop_info_id){
                arr.push(item.shop_info_id)
            }
        })
        var data ={
            startTime:this.timeRange? this.timeRange[0] :'',
            endTime:this.timeRange? this.timeRange[1] :'',
            shopInfoIds:arr
        }
        this.$http
        .post("" + process.env.API_ROOT + "/order/monitor/sku/top/summary", data)
        .then(res => {
            console.log('top5数据',res)
          if (res.data.code == 1) {
            this.chartData2.columns = ['skuName','skuCnt']
            this.chartData2.rows = res.data.data.summaryData
            // this.chartData2.rows=[
            //     {
            //         'skuCnt': 1000,
            //         platformCode: "TMALL",
            //         skuName: "商品1",
            //     },
            //     {
            //         'skuCnt': 2000,
            //         platformCode: "GW",
            //         skuName: "商品2",
            //     },
            //     {
            //         'skuCnt': 3000,
            //         platformCode: "XX",
            //         skuName: "商品3",
            //     },
            //     {
            //         'skuCnt': 2140,
            //         platformCode: "XXX",
            //         skuName: "商品4",
            //     },
            //     {
            //         'skuCnt': 5000,
            //         platformCode: "XXXX",
            //         skuName: "商品5",
            //     },
            // ]

            if(this.chartData2.rows.length == 0){
              this.dataEmpty2 = true
            }else{
              this.dataEmpty2 = false
            }
          } else {
           
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    //   获取订单来源数据
    getOrder(){
        var arr = []
        this.sources.forEach(item=>{
            if(item.shop_info_id){
                arr.push(item.shop_info_id)
            }
        })
        var data ={
            startTime:this.timeRange? this.timeRange[0] :'',
            endTime:this.timeRange? this.timeRange[1] :'',
            shopInfoIds:arr
        }
        this.$http
        .post("" + process.env.API_ROOT + "/order/monitor/platform/summary", data)
        .then(res => {
            console.log('订单来源数据',res)
          if (res.data.code == 1) {
            this.chartData1.columns = ['platformName','orderCnt','orderPrice','platformCode']
            this.chartData1.rows = res.data.data.summaryData
            if(this.chartData1.rows.length == 0){
              this.dataEmpty1 = true
            }else{
              this.dataEmpty1 = false
            }
          } else {
           
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    time(num) {
        this.form.orderCreateTime=[]
      if (num == 1) {
        this.form.orderCreateTime.push(
          formatDate.formatDateLastMonth("yyyy-MM-dd hh:mm:ss")
        );
        this.form.orderCreateTime.push(
          formatDate.formatDate("yyyy-MM-dd hh:mm:ss")
        );
      } else if (num == 2) {
        this.form.orderCreateTime.push(
          formatDate.formatDateLastHalfYear("yyyy-MM-dd hh:mm:ss")
        );
        this.form.orderCreateTime.push(
          formatDate.formatDate("yyyy-MM-dd hh:mm:ss")
        );
      } else {
        this.form.orderCreateTime.push("1970-01-01 00:00:00");
        this.form.orderCreateTime.push(
          formatDate.formatDateLastHalfYear("yyyy-MM-dd hh:mm:ss")
        );
      }
      this.getStore(this.shopId);
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
    //tab 行点击事件
    rowclick(row) {
      console.log(row);
      this.rowData = row;
    },
    //搜索条件开关
    a() {
      this.expload = !this.expload;
    },
    //改变订单来源事件
    shopIdsChange(val) {
      console.log(val);
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
            this.levelList = [];
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
              this.getShopList(this.store[0].apiMerchantId);
              this.getLevelList(this.store[0].apiMerchantId);
            } else {
              this.getShopList('');
              this.getLevelList("");
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
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/orderList/queryOrderDetail?orderCode=" +
          id
      })
        .then(res => {
          console.log("订单详情", res);
          if (res.data.code == 1) {
            this.moreMsg = res.data.data;
            this.tagDialogVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //查看详情开关
    close() {
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
      this.getStore(this.shopId);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getStore(this.shopId);
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
          url: "" + process.env.API_ROOT + "/orderList/exportData",
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
            a.download = "订单列表.xlsx";
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
      var data = {};
      if (this.form.shopInfoIds) {
        data.shopInfoIds = [this.form.shopInfoIds];
      } else {
          var arr =[] 
          this.sources.forEach(item=>{
            console.log(item.shop_info_id)
            if(item.shop_info_id){
                arr.push(item.shop_info_id)
            }
        })
          data.shopInfoIds = arr
      }
      if (this.form.orderCode) {
        data.orderCode = this.form.orderCode;
      }
      if (this.form.memberMobile) {
        data.memberMobile = this.form.memberMobile;
      }
      if (this.form.memberVipCode) {
        data.memberVipCode = this.form.memberVipCode;
      }
      if (this.form.memberName) {
        data.memberName = this.form.memberName;
      }
      if (this.form.taobaoId) {
        data.taobaoId = this.form.taobaoId;
      }
      if (this.form.memberEmail) {
        data.memberEmail = this.form.memberEmail;
      }
      if (this.form.orderCreateTime) {
        data.orderCreateTimeStart = this.form.orderCreateTime[0];
        data.orderCreateTimeEnd = this.form.orderCreateTime[1];
      }
      if (this.form.paymentTime) {
        data.paymentTimeStart = this.form.paymentTime[0];
        data.paymentTimeEnd = this.form.paymentTime[1];
      }
      if (this.form.goodsName) {
        data.goodsName = this.form.goodsName;
      }
      if (this.form.skuCode) {
        data.skuCode = this.form.skuCode;
      }
      if (this.form.levelIds !== 0) {
        data.levelIds = [this.form.levelIds];
      } else {
      }
      if (this.form.orderStatus !== 0) {
        data.orderStatus = [this.form.orderStatus];
      } else {
      }

      if (this.form.orderType) {
        data.orderType = this.form.orderType;
      }
      (data.pageNum = 0), (data.pageSize = 0);

      this.$http({
        method: "post",
        url: "" + process.env.API_ROOT + "/orderList/exportAllData",
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
          a.download = "所有订单列表.xlsx";
          a.href = blobUrl;
          a.click();
          document.body.removeChild(a);
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    //获取用户店铺列表
    getShopList(apiMerchantId) {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/shopIds?apiMerchantId="+apiMerchantId
      })
        .then(res => {
          console.log("商户下店铺列表", res);
          if (res.data.code == 1) {
            this.sources = res.data.data;
            this.sources.unshift({
              shop_info_id: 0,
              shop_name: "不限"
            });
            this.getOrder()
            this.getLevel()
            this.getLive()
            this.getTopFive()
            this.getTableData(apiMerchantId);

          }else{
            this.sources = [];
            this.sources.unshift({
              shop_info_id: 0,
              shop_name: "不限"
            });
        this.getTableData(apiMerchantId);

          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //重置搜索条件
    reset() {
      this.form = {
        goodsType: 1,
        memberType: 1,
        shopInfoIds: 0,
        orderCode: "",
        memberMobile: "",
        memberVipCode: "",
        memberName: "",
        taobaoId: "",
        memberEmail: "",
        orderType: 0,
        orderCreateTime: [],
        orderCreateTimeStart: "",
        orderCreateTimeEnd: "",
        paymentTime: [],
        paymentTimeStart: "",
        paymentTimeEnd: "",
        goodsName: "",
        skuCode: "",
        levelIds: 0,
        orderStatusType: "",
        orderStatus: 0
      };
      this.getStore(this.shopId);
    },
    //搜索
    search() {
      this.currentPage = 1;
      this.getStore(this.shopId);
    },
    //获取列表信息
    getTableData(apiMerchantId) {
        if(!apiMerchantId){
            this.tableData = [];
            this.total =0
        }else{

      var data = {};
      if (this.form.shopInfoIds) {
        data.shopInfoIds = [this.form.shopInfoIds];
      } else {
          var arr =[] 
          this.sources.forEach(item=>{
            if(item.shop_info_id){
                arr.push(item.shop_info_id)
            }
        })

          data.shopInfoIds = arr
      }
      if (this.form.orderCode) {
        data.orderCode = this.form.orderCode;
      }
      if (this.form.memberMobile) {
        data.memberMobile = this.form.memberMobile;
      }
      if (this.form.memberVipCode) {
        data.memberVipCode = this.form.memberVipCode;
      }
      if (this.form.memberName) {
        data.memberName = this.form.memberName;
      }
      if (this.form.taobaoId) {
        data.taobaoId = this.form.taobaoId;
      }
      if (this.form.memberEmail) {
        data.memberEmail = this.form.memberEmail;
      }
      if (this.form.orderCreateTime) {
        data.orderCreateTimeStart = this.form.orderCreateTime[0];
        data.orderCreateTimeEnd = this.form.orderCreateTime[1];
      }
      if (this.form.paymentTime) {
        data.paymentTimeStart = this.form.paymentTime[0];
        data.paymentTimeEnd = this.form.paymentTime[1];
      }
      if (this.form.goodsName) {
        data.goodsName = this.form.goodsName;
      }
      if (this.form.skuCode) {
        data.skuCode = this.form.skuCode;
      }
      if (this.form.levelIds !== 0) {
        data.levelIds = [this.form.levelIds];
      } else {
      }
      if (this.form.orderStatus !== 0) {
        data.orderStatus = [this.form.orderStatus];
      } else {
      }

      if (this.form.orderType) {
        data.orderType = this.form.orderType;
      }
      (data.pageNum = this.currentPage), (data.pageSize = this.pageSize);

      //             shopInfoIds复制
      // [array]	是	店铺id	展开
      // orderCode
      // [string]		订单号
      // memberMobile
      // [string]		手机号
      // memberVipCode
      // [string]		会员id
      // memberName
      // [string]		会员姓名
      // taobaoId
      // [string]		淘宝id
      // memberEmail
      // [string]		邮箱
      // orderType
      // [short]		订单类型：1：会员，2：非会员
      // orderCreateTimeStart
      // [string]		订单创建开始时间
      // orderCreateTimeEnd
      // [string]		订单创建结束时间
      // paymentTimeStart
      // [string]		订单支付开始时间
      // paymentTimeEnd
      // [string]		订单支付结束时间
      // goodsName
      // [string]		商品名称
      // skuCode
      // [string]		商品sku
      // levelIds
      // [array]		等级id	展开
      // orderStatusType
      // [short]		订单状态类型：1:包含，2：排除
      // orderStatus
      // [array]		订单状态（TRADE_NO_CREATE_PAY(没有创建支付宝交易) WAIT_BUYER_PAY(等待买家付款) WAIT_SELLER_SEND_GOODS(等待卖家发货,即:买家已付款) WAIT_BUYER_CONFIRM_GOODS(等待买家确认收货,即:卖家已发货) TRADE_BUYER_SIGNED(买家已签收,货到付款专用) TRADE_FINISHED(交易成功) TRADE_CLOSED(付款以后用户退款成功，交易自动关闭) TRADE_CLOSED_BY_TAOBAO(付款以前，卖家或买家主动关闭交易) PAY_PENDING(国际信用卡支付付款确认中)）
      // pageNum
      // [int]		第几页
      // pageSize
      // [int]		每页数量
      this.$http
        .post("" + process.env.API_ROOT + "/orderList/queryOrderList", data)
        .then(res => {
          if (res.data.code == 1) {
            console.log("tableData", res);
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            this.num = 0;
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
        }
    }

  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      console.log(vm); //当前组件的实例
    });
  },
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.order {
  .el-button.is-active,.no{
    width: 120px;
  }
  .timerange{
    background: #fff;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
    padding:0 25px;
  }
  .el-tabs__content{
    padding: 0 20px;
    margin-bottom: 20px;
  }
    .chartDate{
        // display: block;
        margin:10px 0  ;
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
          // display: inline-block;
          width: 200px;
          float: right;
          div {
            width: 100%;
            position: absolute;
            bottom: 20px;
          }
        }
        .memberMsg {
          height: 40px;
          display: flex;
          border: 1px solid #d9d9d9;
          .el-select {
            height: 38px;
            line-height: 38px;
            width: 120px;
            .el-input {
              width: 120px;
              display: inline-block;
              .el-input__inner {
                border-right: 1px solid #d9d9d9;
                border-radius: 0;
                height: 38px;
                line-height: 38px;
              }
            }
          }
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
