<template>
  <div class="orderList">
    <div class="sellBox">
      
      <div class="head clear" >
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/order/list'>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售单查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="sels clear">
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!selDia' @click='change'> 展开</i>
          <i class="el-icon-arrow-up" v-if='selDia' @click='change'> 收起</i>
        </div>
        <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='selDia'>
          <el-row :gutter="20">
              <el-form-item label="订单号">
                <el-input size='small' v-model="form.rSapOrderId" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="下单人">
                <el-select v-model="form.dealerId" size="small" filterable placeholder="请选择">
                  <el-option v-for="item in list" :key="item.id" :label="item.custName" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="下单日期" class="date">
                <Daterange @data='watchTime' :resetDataReg='resetData' />
              </el-form-item>
              <el-form-item label="下单类型">
                <el-select v-model="form.underOrderType" size="small" filterable placeholder="请选择">
                  <el-option value="ZFD" label="交货免费"></el-option>
                    <el-option value="ZOR" label="标准订单"></el-option>
                    <el-option value="ZORT" label="标准订单（ZORT）"></el-option>
                    <el-option value="ZRET" label="退货"></el-option>
                    <el-option value="nKB" label="客户库存补货"></el-option>
                    <el-option value="KE" label="客户库存出货"></el-option>
                    <el-option value="ZKE" label="标准客户库存出货"></el-option>
                    <el-option value="ZKB" label="标准客户库存补货"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单类型">
                <el-select v-model="form.orderType" size="small" filterable placeholder="请选择">
                    <el-option value="A01" label="客户专货订单"></el-option>
                    <el-option value="A02" label="Buffer订单"></el-option>
                    <el-option value="A03" label="新产品订单"></el-option>
                    <el-option value="A04" label="样品订单"></el-option>
                    <el-option value="A05" label="Last Buy订单"></el-option>
                    <el-option value="A06" label="分销商专货订单"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="售达方">
                <el-select v-model="form.soldTo" size="small" filterable placeholder="">
                  <el-option v-for="item in list" :key="item.id" :label="item.custName" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="送达方">
                <el-select v-model="form.sendTo" size="small" filterable placeholder="">
                  <el-option v-for="item in list" :key="item.id" :label="item.custName" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="采购订单编号">
                <el-input size='small' v-model="form.purchaseNo" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label=" ">
                <el-button size='small' type='primary' plain @click="search">查询</el-button>
                <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
              </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div class="box">
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" border height="700" @row-click='rowClick'>
            <el-table-column prop="rSapOrderId" label="sap订单号" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="purchaseNo" label="采购订单编号" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop=" underOrderType" label=" 下单类型" show-overflow-tooltip  width="150" >
              <template slot-scope='scope'>
                <span v-if="scope.row.underOrderType=='ZFD'" >交货免费</span>
                <span v-if="scope.row.underOrderType=='ZOR'" >标准订单</span>
                <span v-if="scope.row.underOrderType=='ZORT'" >标准订单（ZORT）</span>
                <span v-if="scope.row.underOrderType=='ZRET'" >退货</span>
                <span v-if="scope.row.underOrderType=='nKB'" >客户库存补货</span>
                <span v-if="scope.row.underOrderType=='KE'" >客户库存出货</span>
                <span v-if="scope.row.underOrderType=='ZKE'" >标准客户库存出货</span>
                <span v-if="scope.row.underOrderType=='ZKB'" >标准客户库存补货</span>
              </template>
            </el-table-column>
            <el-table-column prop="orderType" label="订单类型" show-overflow-tooltip  width="150" >
              <template slot-scope='scope'>
                <span v-if="scope.row.orderType=='A01'" >客户专货订单</span>
                <span v-if="scope.row.orderType=='A02'" >Buffer订单</span>
                <span v-if="scope.row.orderType=='A03'" >新产品订单</span>
                <span v-if="scope.row.orderType=='A04'" >样品订单</span>
                <span v-if="scope.row.orderType=='A05'" >Last Buy订单</span>
                <span v-if="scope.row.orderType=='A06'" >分销商专货订单</span>
              </template>
            </el-table-column>
            <el-table-column prop="rGrossValue" label="含税总金额" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="rNetValue" label="不含税总金额" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="salesOrg" label="销售组织" show-overflow-tooltip  width="200" >
              <template slot-scope="scope">
                {{sale(scope.row.salesOrg)}}
              </template>
            </el-table-column>
            <el-table-column prop="soldTo" label="售达方" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                {{to(scope.row.soldTo)}}
              </template>
            </el-table-column>
            <el-table-column prop="sendTo" label="送达方" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                {{to(scope.row.soldTo)}}
              </template>
            </el-table-column>
            <el-table-column prop="purchaseDate" label="采购订单下达日期" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="paymentTerms" label="付款条件" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="incoterms1" label="国际贸易条款1" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="incoterms2" label="国际贸易条款2" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="customerAttr" label="客户属性" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                <span v-if="scope.row.customerAttr=='B1'">Account Market</span>
                <span v-if="scope.row.customerAttr=='B2'">Mass Market</span>
              </template>
            </el-table-column>
            <el-table-column prop="isAgreed" label="是否同意条款" show-overflow-tooltip  width="150" >
              <template slot-scope='scope'>
                <span v-if="scope.row.isAgreed==0" >否</span>
                <span v-if="scope.row.isAgreed==1" >是</span>
              </template>
            </el-table-column>
            <el-table-column prop="refSapOrderId" label="原单号" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="orderReason" label="退货原因" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column width="250" label="操作" fixed='right'>
              <template slot-scope='scope'>
                <el-button type='text' size='small' @click='getDetail(scope.row.id)'>明细</el-button>
                <el-button type='text' size='small' @click='getProduct(scope.row.dealerId,scope.row.id)'>提货</el-button>
                <el-button type='text' size='small' @click='mod(scope.row)' :disabled="scope.row.approvalStatus!=0 ? false:true">修改</el-button>
                <el-button type='text' size='small' @click='cal(scope.row)'  >取消</el-button>
                <el-button type='text' size='small' @click='modDate(scope.row.dealerId,scope.row.id)'  >变更交期</el-button>
              </template>
            </el-table-column>
            <div slot="empty">

              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[50, 100,150]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
        
      </div>
    </div>
    <el-dialog title="订单行信息" :visible.sync="lineDia" width="600px">
      <div class="tab">
        <div class="tabBox">
          <el-table :data="lines" style="width: 100%" border height="100%">
            <el-table-column prop="rItemNo" width="150" label="订单行号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="product" width="150" label="物料号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="productId" width="150" label="虚拟物料号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="platform" width="150"  label="平台" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="expectedDeliveryDate" width="150" label="需求交货日期" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="rPrice" width="150" label="含税价格" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="rNetPrice" width="150" label="不含税价格" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="num" width="150" label="订单数量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remainingNum" width="150" label="剩余数量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="actice" width="150" label="状态" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.actice ==1 ? '生效' :'失效'}}
              </template>
            </el-table-column>
            <div slot="empty">
              无数据
            </div>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="提货" top="5vh" :visible.sync="proDia" width="600px">
      <div class="tab">
        <div class="tabBox">
          <el-form ref="proForm" :model="proForm" :rules="rules" class="form" label-width="auto" label-position='top' >
            <el-form-item label="授信额度初始值">
              <el-input size='small' disabled v-model="credit.credit" ></el-input>
            </el-form-item>
            <el-form-item label="授信额度占用值">
              <el-input size='small' disabled v-model="credit.creditUSE" ></el-input>
            </el-form-item>
            <el-form-item label="授信额度剩余值">
              <el-input size='small' disabled v-model="credit.creditUnUSE" ></el-input>
            </el-form-item>
            <el-form-item label="装运点" prop="shippingPoint">
              <el-input size='small'  v-model="proForm.shippingPoint" ></el-input>
            </el-form-item>
            <el-form-item label="提货日期" prop="deliverDate">
              <el-date-picker
                v-model="proForm.deliverDate"
                type="date"
                style="width:100%"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-table :data="proForm.lines" style="width: 100%" border height="400">
              <el-table-column prop="" width="150" label="提货数量" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-form-item :prop="'lines.'+scope.$index +'.deliveryQuantity'" :rules="rules.deliveryQuantity" >
                    <el-input type="number"  size="small" v-model.number="scope.row.deliveryQuantity"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="rItemNo" width="150" label="订单行号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="productId" width="150" label="物料号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="num" width="150" label="订单数量" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="remainingNum" width="150" label="剩余数量" show-overflow-tooltip>
              </el-table-column>
              <div slot="empty">
                无数据
              </div>
            </el-table>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm('proForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="变更交期" top="5vh" :visible.sync="modDateDia" width="600px">
      <div class="tab">
        <div class="tabBox">
          <el-form ref="modDateForm" :model="modDateForm" :rules="rules" class="form" label-width="auto" label-position='top' >
            <el-form-item label="授信额度初始值">
              <el-input size='small' disabled v-model="credit.credit" ></el-input>
            </el-form-item>
            <el-form-item label="授信额度占用值">
              <el-input size='small' disabled v-model="credit.creditUSE" ></el-input>
            </el-form-item>
            <el-form-item label="授信额度剩余值">
              <el-input size='small' disabled v-model="credit.creditUnUSE" ></el-input>
            </el-form-item>
            <el-table :data="modDateForm.lines" style="width: 100%" border height="400">
              <el-table-column prop="" width="200" label="期望交货日期" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-form-item :prop="'lines.'+scope.$index +'.expectedDeliveryDate'" :rules="rules.expectedDeliveryDate" >
                    <el-date-picker
                      v-model="scope.row.expectedDeliveryDate"
                      type="date"
                      style="width:100%"
                      size="small"
                      value-format="yyyyMMdd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="rItemNo" width="150" label="订单行号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="productId" width="150" label="物料号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="num" width="150" label="订单数量" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="remainingNum" width="150" label="剩余数量" show-overflow-tooltip>
              </el-table-column>
              <div slot="empty">
                无数据
              </div>
            </el-table>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm('modDateForm',true)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="取消" top="5vh" :visible.sync="calDia" width="600px">
      <div class="tab">
        <div class="tabBox">
            <el-table :data="lines" style="width: 100%" border height="400" @selection-change="handleSelectionChange">
               <el-table-column type="selection" width="60" >
            </el-table-column>
              <el-table-column prop="rItemNo" width="150" label="订单行号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="actice" width="150" label="状态" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.actice ==1 ? '生效' :'失效'}}
              </template>
            </el-table-column>
            <el-table-column prop="productId" width="150" label="物料号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="platform" width="150"  label="平台" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="expectedDeliveryDate" width="150" label="需求交货日期" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="rPrice" width="150" label="含税价格" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="rNetPrice" width="150" label="不含税价格" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="num" width="150" label="订单数量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remainingNum" width="150" label="剩余数量" show-overflow-tooltip>
            </el-table-column>
            <div slot="empty">
              无数据
            </div>
            </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {queryList,detail,getCredit,submitPro,cancelOrder,submitFormModDate} from '@/api/order/list.js'
import {getShip,getDealerList} from '@/api/system/param.js'
import {getCode} from '@/api/business/idr.js'
import Daterange from "../com/date";
export default {
  name: "orderList",
  components:{
    Daterange
  },
  data() {
    return {
      
      rowData:{},
      salesOrgIds:[],
      rules:{
        shippingPoint:[
          {required:true,triggle:'blur',message:'请输入装运点'}
        ],
        deliverDate:[
          {required:true,triggle:'change',message:'请选择提货日期'}
        ],
        deliveryQuantity:[
          { required:false,triggle:'blur',message:'请输入提货数量',type:'number'},
        ],
        expectedDeliveryDate:[
          {required:true,triggle:'blur',message:'请输入期望提货日期'},
        ]
      },
      // 授信额度
      credit:{},
      //订单行信息
      lines:[],
      //售达方  送达方列表
      tos:[],
      //下单人列表
      list:[],
      //重置时间控件
      resetData:true,
      //提货表单
      proForm:{},
      modDateForm:{},
      //筛选表单
      form: {
        rSapOrderId:'',
        custName:'',
        createBeginTime:'',
        createEndTime:'',
        orderType:'',
        underOrderType:'',
        soldTo:'',
        sendTo:'',
        purchaseNo:'',
        dealerId:''
      },
      calDia:false,
      modDateDia:false,
      //筛选条件显示否
      selDia: false,
      //明细显示否
      lineDia: false,
      //提货显示否
      proDia:false,
      //首页list数据
      tableData: [],
      //分页
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 50,
      total: 0,
      multipleSelection:[]
    };
  },
  
  created() {
    this.getCode()
    this.getDealerList()
    this.getList()
  },
  watch: {},
  methods: {
    back(){
      window.history.go(-1)
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    cal(row){
      this.detail(row.id)
      this.calDia = true
    },
    async cancelOrder(){
      const data ={
        orderId : this.rowData.id
      }
      const param ={
        itemIds:this.multipleSelection.map(item=>{return item.id}).join(',')
      }
      const res = await cancelOrder(data,param);
      if(res){
        this.$message.success('取消成功')
        this.getList()
        this.cancel()
      }
    },
    sure(){
      if(this.multipleSelection.length==0){
        this.$message.error('请选择需要取消的数据行')
      }else{
        //console.log(this.multipleSelection.map((item)=>{return item.actice}))
        if(this.multipleSelection.map((item)=>{return item.actice}).indexOf(0)!=-1){
        this.$message.error('无法操作状态为失效的数据行')
        }else{
          this.cancelOrder()

        }
      }
    },
    
    rowClick(row){
      this.rowData= row
    },
    sale(id){
        return  this.salesOrgIds.filter(item=>{return item.groupCode == id})[0] ? this.salesOrgIds.filter(item=>{return item.groupCode == id})[0].groupName  :''
    },
    async getCode(){
      const res = await getCode();
      // //console.log('发货方编码',res)
      if(res){
        this.salesOrgIds = res.data.data
      }
    },
    to(id){
        return  this.list.filter(item=>{return item.id == id})[0] ? this.list.filter(item=>{return item.id == id})[0].custName  :''
    },
    //表单验证
    submitForm(formName,type){
      this.$formTest.submitForm(this.$refs[formName],type? this.submitFormModDate : this.submitPro)
    },
    //提货确定按钮
    async submitFormModDate(){
      const data ={
        orderId:this.modDateForm.orderId,
      }
      const param=this.modDateForm.lines.map(item=>{return {itemId:item.id,expectedDeliveryDate:item.expectedDeliveryDate}})
      const res = await submitFormModDate(data,param);
      // //console.log('提货结果',res);
      if(res){
        this.$message.success('操作成功')
        this.cancel()
      }
    },
    async submitPro(){
      const data ={
        orderId:this.proForm.orderId,
        shippingPoint:this.proForm.shippingPoint, 
        deliverDate:this.proForm.deliverDate, 
        orderLine:this.proForm.lines
      }
      const res = await submitPro(data);
      // //console.log('提货结果',res);
      if(res){
        this.$message.success('操作成功')
        this.cancel()
      }
    },
    //提货取消按钮
    cancel(){
      this.multipleSelection = []
      this.credit = {}
      this.lines = []
      this.proForm ={
        shippingPoint:"", 
        deliverDate:"",
        lines:[]
      }
      this.modDateForm ={
        lines:[]
      }
      this.proDia  = false
      this.modDateDia  = false
      this.calDia = false
      this.$formTest.resetForm(this.$refs['proForm'])
      this.$formTest.resetForm(this.$refs['modDateForm'])
    },
    //获取提货详细信息
    getProduct(dealerId,id){
      this.proDia = true
      this.detail(id)
      this.getCredit( dealerId)
    },
    modDate(dealerId,id){
      this.modDateDia = true
      this.detail(id)
      this.getCredit( dealerId)
    },
    //修改按钮
    mod(row){
      this.$router.push(
        {
          name:'orderAdd',
          query:{
            id:row.id,
            type:row.approvalStatus
          }
        }
      )
    },
    //搜索重置
    search(){
      this.currentPage =1
      this.getList()
    },
    reset(){
      this.form = {
        rSapOrderId:'',
        custName:'',
        createBeginTime:'',
        createEndTime:'',
        orderType:'',
        underOrderType:'',
        soldTo:'',
        sendTo:'',
        purchaseNo:'',
        dealerId:''
      }
      this.resetData = true
      this.getList()
    },
    //监听时间选择控件
    watchTime(data){
      // //console.log(data)
      this.form.createBeginTime = data.startTime
      this.form.createEndTime = data.endTime
      this.resetData = false
    },
    //获取授信额度
    async getCredit(id){
      const data ={
         id:id
      }
      const res = await getCredit(data);
      // //console.log('授信额度',res)
      if(res){
        this.credit = res.data.data
      }
    },
    //获取售达方 送达方列表
    async getShip(){
      const res = await getShip();
      // //console.log('tos',res)
      if(res){
        this.tos = res.data.data
      }
    },
    //获取下单人列表
    async getDealerList(){
      const res = await getDealerList();
      // //console.log('list',res)
      if(res){
        this.list = res.data.data
      }
    },
    //获取订单行明细
    async detail(id){
      const data ={
        id:id
      }
      const res = await detail(data);
      // //console.log('detail',res)
      if(res){
        this.lines = res.data.data.lines
        this.proForm.lines = res.data.data.lines.map(item=>{return {...item,deliveryQuantity:''}})
        this.proForm.orderId = res.data.data.id
        this.modDateForm.lines = res.data.data.lines
        this.modDateForm.orderId = res.data.data.id
      }
    },
    //获取主列表数据
    async getList(){
      const data ={
        pageSize:this.pageSize,
        pageIndex:this.currentPage,
        rSapOrderId:this.form.rSapOrderId,
        custName:this.form.custName,
        createBeginTime:this.form.createBeginTime,
        createEndTime:this.form.createEndTime,
        orderType:this.form.orderType,
        underOrderType:this.form.underOrderType,
        soldTo:this.form.soldTo,
        sendTo:this.form.sendTo,
        purchaseNo:this.form.purchaseNo,
      }
      const res = await queryList(data);
      if(res){
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      }
    },
    //筛选区域展开否
    change() {
      this.selDia = !this.selDia;
    },
    //点击明细按钮事件
    getDetail(id) {
      // //console.log(id)
      this.detail(id)
      this.lineDia = true;
    },
    // 分页
    handleSizeChange(val) {
      // //console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // //console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.orderList{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;

  .el-dialog{
    .form {
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          .el-select{
            width: 100%;
          }
        }
    }
  }
  .sellBox{
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 34px;
    box-sizing: border-box;
    .head{
      padding: 10px 20px;
      position: absolute;
      top: 0;
      // background: red;
    }
    // .el-tabs{
    //   height: 100%;
    //   position: relative;
    //   box-sizing: border-box;
    //   padding-top: 50px;
    //   .el-tabs__header{
    //     position: absolute;
    //     top: 0;
    //     width: 100%;
    //     .el-tabs__nav-wrap {
    //       padding:0 20px;
    //     }
    //   }
    //   .el-tabs__content{
    //     height: 100%;
    //     .el-tab-pane{
    //       height: 100%;
    //       display: flex;
    //       flex-direction: column;
    //     }
        .sels{
          // margin: 20px 0;
          padding:10px 20px;
          background: #fff;
          margin-bottom: 10px;
          .lineBox{
            color: #b161bf;
          }
        }
        .form {
            .el-form-item__label {
              height: 30px;
            }
            .el-form-item {
              width: 200px;
              margin-bottom: 0;
              .el-select{
                width: 100%;
              }
            }
            .date {
              width: 414px;
            }
        }
        .box{
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          background: #fff;
          .btns{
            padding: 10px 20px;
            // background: pink;
            .upload-demo{
              display: inline-block;
            }
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
  //   }
  // }
}
</style>