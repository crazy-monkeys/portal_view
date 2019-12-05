<template>
  <div class="proList">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/order/list'>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>提货单查询</el-breadcrumb-item>
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
                <el-input size='small' v-model="form.salesOrderId" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="提货单号">
                <el-input size='small' v-model="form.deliveryOrderNo" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="申请人">
                <el-select v-model="form.createUserId" size="small" filterable placeholder="请选择">
                  <el-option v-for="item in list" :key="item.id" :label="item.custName" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="提货时间" class="date">
                <Daterange @data='watchTime' :resetDataReg='resetData' />
              </el-form-item>
              <el-form-item label="实际发货日期" class="date">
                <Daterange @data='watchTime1' :resetDataReg='resetData1' />
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
          <el-table :data="tableData" style="width: 100%" height="700">
            <el-table-column prop="sapOrderNo" label="订单号" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="sapDeliverOrderNo" label="提货单号" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="soldTo" label="售达方" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                {{to(scope.row.soldTo)}}
              </template>
            </el-table-column>
            <el-table-column prop="sendTo" label="送达方" show-overflow-tooltip  width="150" >
              <template slot-scope="scope">
                {{to(scope.row.sendTo)}}
              </template>
            </el-table-column>
            <el-table-column prop="deliverDate" label="提货日期" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="actualDeliveryDate" label="实际发货日期" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column prop="shippingPoint" label="下单公司" show-overflow-tooltip  width="150" >
            </el-table-column>
            <el-table-column width="200" label="操作" fixed='right'>
              <template slot-scope='scope'>
                <el-button type='text' size='small' @click='getDetail(scope.row.deliverOrderId)'>明细</el-button>
                <el-button type='text' size='small' @click='getProduct(scope.row)' >收货</el-button>
                <el-button type='text' size='small' @click='mod(scope.row)'>修改</el-button>
                <el-button type='text' size='small' @click='getCancel(scope.row)'>取消</el-button>
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
    <el-dialog title="订单行信息" :visible.sync="lineDia" width="600px" v-if="lineDia" v-dialogDrag >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="发货信息" name="first">
          <div class="tab">
            <div class="tabBox">
              <el-table :data="proForm.deliverOrderLineList" style="width: 100%" border height="300">
                <el-table-column prop="sapSalesOrderLineNo" width="150" label="订单行号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="sapDeliverOrderLineNo" width="150" label="提货单行号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="productId" width="150" label="物料号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="product" width="150"  label="产品型号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="bu" label="BU" width="150"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="pdt" width="150" label="PDT" show-overflow-tooltip>
            </el-table-column>
                <el-table-column prop="deliveryQuantity" width="150" label="提货数量" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="active" width="150" label="状态" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{scope.row.active==1 ? '生效' :scope.row.active==2 ? '取消中' :scope.row.active==0 ? '已取消':''}}
                  </template>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="发票信息" name="second">
          <div class="tab">
            <div class="tabBox">
              <el-table :data="proForm.orderInvoiceList" style="width: 100%" border height="300">
                <el-table-column prop="sapInvoiceId" width="150" label="发票号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="slodTo" width="150" label="付款方" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{to(scope.row.slodTo)}}
                  </template>
                </el-table-column>
                <el-table-column prop="sendTo" width="150"  label="售达方" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{to(scope.row.sendTo)}}
                  </template>
                </el-table-column>
                <el-table-column prop="accDoc" width="150" label="会计凭证号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="accYear" width="150" label="会计年度" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="reInvoiceId" width="150" label="已取消发票号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="netAmount" width="150" label="发票净额" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="taxAmount" width="150" label="发票税额" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="currency" width="150" label="货币" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createdOn" width="150" label="发票创建日期" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="changedOn" width="150" label="发票更改日期" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="sapOrderId" width="150" label="订单号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="sapDeliveryId" width="150" label="交货单号" show-overflow-tooltip>
                </el-table-column>
                <div slot="empty">
                  无数据
                </div>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog title="修改" top="5vh" :visible.sync="proDia" width="600px" v-dialogDrag>
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
            <el-form-item label="下单公司" prop="shippingPoint">
              <el-input size='small'  v-model="proForm.shippingPoint" ></el-input>
            </el-form-item>
            <el-form-item label="提货日期" prop="shippingPoint">
              <el-date-picker
                v-model="proForm.deliverDate"
                type="date"
                style="width:100%"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-table :data="proForm.deliverOrderLineList" style="width: 100%" border height="400">
              <el-table-column  width="150" label="提货数量" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-form-item :prop="'deliverOrderLineList.'+scope.$index +'.deliveryQuantity'" :rules="rules.deliveryQuantity">
                    <el-input type="age" size="small" v-model.number="scope.row.deliveryQuantity"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="sapSalesOrderLineNo" width="150" label="订单行号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="sapDeliverOrderLineNo" width="150" label="提货单行号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="productId" width="150" label="物料号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="product" width="150"  label="产品型号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="bu" label="BU" width="150"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="pdt" width="150" label="PDT" show-overflow-tooltip>
            </el-table-column>
              <el-table-column prop="active" width="150" label="状态" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{scope.row.active==1 ? '生效' :scope.row.active==2 ? '取消中' :scope.row.active==0 ? '已取消':''}}
                  </template>
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
    <el-dialog title="取消" top="5vh" :visible.sync="calDia" width="600px" v-dialogDrag>
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
            <el-table :data="proForm.deliverOrderLineList" style="width: 100%" border height="400" @selection-change="handleSelectionChange">
              <el-table-column width="60" type="selection">
              </el-table-column>
              <el-table-column prop="deliveryQuantity"  width="150" label="提货数量" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="sapSalesOrderLineNo" width="150" label="订单行号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="sapDeliverOrderLineNo" width="150" label="提货单行号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="productId" width="150" label="物料号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="product" width="150"  label="产品型号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="bu" label="BU" width="150"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="pdt" width="150" label="PDT" show-overflow-tooltip>
            </el-table-column>
              <el-table-column prop="active" width="150" label="状态" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{scope.row.active==1 ? '生效' :scope.row.active==2 ? '取消中' :scope.row.active==0 ? '已取消':''}}
                  </template>
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
        <el-button size="small" type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="收货" top="5vh" :visible.sync="recevieDia" width="600px" v-dialogDrag>
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
            <el-table :data="proForm.deliverOrderLineList" style="width: 100%" border height="400" @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column  width="150" label="收货数量" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-form-item :prop="'deliverOrderLineList.'+scope.$index +'.num'" >
                    <el-input type="number" size="small" v-model.number="scope.row.num"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="deliveryQuantity" width="150" label="提货数量" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="receiveQuantity" width="150" label="已收货数量" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="sapSalesOrderLineNo" width="150" label="订单行号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="sapDeliverOrderLineNo" width="150" label="提货单行号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="productId" width="150" label="物料号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="product" width="150"  label="产品型号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="bu" label="BU" width="150"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="pdt" width="150" label="PDT" show-overflow-tooltip>
            </el-table-column>
              <el-table-column prop="active" width="150" label="状态" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{scope.row.active==1 ? '生效' :scope.row.active==2 ? '取消中' :scope.row.active==0 ? '已取消':''}}
                  </template>
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
        <el-button size="small" type="primary" @click="submitForm('proForm',1)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getCredit,getProList,getProDetail,modPro,calPro,delPro,recevie} from '@/api/order/list.js'
import {getShip,getDealerList} from '@/api/system/param.js'
import Daterange from "../com/date";
export default {
  name: "proList",
  components:{
    Daterange
  },
  data() {
    return {
      rules:{
        shippingPoint:[
          {required:true,triggle:'blur',message:'请输入下单公司'}
        ],
        deliverDate:[
          {required:true,triggle:'change',message:'请选择提货日期'}
        ],
        deliveryQuantity:[
          {required:true,triggle:'blur',message:'请输入提货数量',type:'number'},
        ],
        num:[
          {required:true,triggle:'blur',message:'请输入提货数量',type:'number'},
        ]
      },
      multipleSelection:[],
      activeName:'first',
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
      resetData1:true,
      //提货表单
      proForm:{
        deliverOrderLineList:[],
        orderInvoiceList:[],
        shippingPoint:'',
        deliverDate:"",
        orderId:''
      },
      //筛选表单
      form: {
        salesOrderId:"",
        deliveryOrderNo :"",
        createUserId:"",
        actualDeliveryStartDate:"",
        actualDeliveryEndDate:"",
        deliveryStartDate:"",
        deliveryEndDate:"",
      },
      recevieDia:false,
      calDia:false,
      //筛选条件显示否
      selDia: false,
      //明细显示否
      lineDia: false,
      //提货显示否
      proDia:false,
      //首页list数据
      tableData: [],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 50,
      total: 0,

    };
  },
  computed: {
    
  },
  created() {
    // this.getShip()
    this.getDealerList()
    this.getProList()
  },
  watch: {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    del(id){
      this.$confirm('确定要删除吗？', '发布', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
                this.delPro(id)
            })
            .catch(action => {
              
            });
    },
    async delPro(id){
      const data ={
          id:id
      }
      const res = await delPro(data);
      if(res){
        this.$message.success('删除成功')
        this.getProList()
      }
    },
    sure(){
      if(this.multipleSelection.length==0){
        this.$message.error('请选择需要取消的数据行')
      }else{
        this.calPro()
      }
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    handleClick(){

    },
    async calPro(){
      const data ={
          deliveryOrderId:this.proForm.orderId,
          deliveryOrderLineIds:this.multipleSelection.map(item=>{
            return item.deliverOrderLineId
          })
      }
      const res = await calPro(data);
      if(res){
        this.$message.success('取消成功')
        this.getProList()
        this.cancel()
      }
    },
    to(id){
        return  this.list.filter(item=>{return item.id == id})[0] ? this.list.filter(item=>{return item.id == id})[0].custName  :''
    },
    //表单验证
    submitForm(formName,type){
      this.$formTest.submitForm(this.$refs[formName],type?this.recevie:this.modPro)
    },
    //提货确定按钮
    async modPro(){
      const data ={
        deliverOrderId:this.proForm.orderId,
        shippingPoint:this.proForm.shippingPoint, 
        deliverDate:this.proForm.deliverDate, 
        deliverOrderLineList:this.proForm.deliverOrderLineList
      }
      const res = await modPro(data);
      // //console.log('提货结果',res);
      if(res){
        this.$message.success('操作成功')
        this.cancel()
        this.getProList()
      }
    },
    async recevie(){
      if(this.multipleSelection.length==0){
        this.$message.error('请选择至少一条订单行数据')
      }else{
        const data ={
          deliverOrderId:this.proForm.orderId,
          shippingPoint:this.proForm.shippingPoint, 
          deliverDate:this.proForm.deliverDate, 
          // orderLine:this.proForm.deliverOrderLineList
          orderLine:this.multipleSelection.map(item=>{
            return{ id:item.deliverOrderLineId,deliveryQuantity:item.num}
          })
        }
        const res = await recevie(data);
        // //console.log('提货结果',res);
        if(res){
          this.$message.success('操作成功')
          this.cancel()
          this.getProList()
        }
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
        deliverOrderLineList:[],
        orderId:''
      }
      this.proDia  = false
      this.recevieDia  = false
      this.calDia  = false
      this.$formTest.resetForm(this.$refs['proForm'])
    },
    //获取提货详细信息
    getProduct(row){
      this.recevieDia = true
      this.getProDetail(row.deliverOrderId)
      this.getCredit(row.createUserId)
    },
    //修改按钮
    mod(row){
      this.proDia = true
      this.getProDetail(row.deliverOrderId)
      this.getCredit(row.createUserId)
    },
    getCancel(row){
      this.calDia = true
      this.getProDetail(row.deliverOrderId)
      this.getCredit(row.createUserId)
    },
    //搜索重置
    search(){
      this.currentPage =1
      this.getProList()
    },
    reset(){
      this.form = {
        salesOrderId:"",
        deliveryOrderNo :"",
        createUserId:"",
        actualDeliveryStartDate:"",
        actualDeliveryEndDate:"",
        deliveryStartDate:"",
        deliveryEndDate:"",
      }
      this.resetData = true
      this.resetData1 = true
      this.getProList()
    },
    //监听时间选择控件
    watchTime(data){
      // //console.log(data)
      this.form.deliveryStartDate = data.startTime
      this.form.deliveryEndDate = data.endTime
      this.resetData = false
    },
    watchTime1(data){
      // //console.log(data)
      this.form.actualDeliveryStartDate = data.startTime
      this.form.actualDeliveryEndDate = data.endTime
      this.resetData1 = false
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
    async getProDetail(id){
      const data ={
        id:id
      }
      const res = await getProDetail(data);
      // //console.log('getProDetail',res)
      if(res){
        this.proForm.orderInvoiceList = res.data.data.orderInvoiceList
        this.proForm.deliverOrderLineList = res.data.data.deliverOrderLineList.map(item=>{
          return {...item,num:''}
        })
        this.proForm.shippingPoint = res.data.data.shippingPoint
        this.proForm.deliverDate = res.data.data.deliverDate
        this.proForm.orderId = res.data.data.deliverOrderId
      }
    },
    //获取主列表数据
    async getProList(){
      const data ={
        pageSize:this.pageSize,
        pageIndex:this.currentPage,
        salesOrderId:this.form.salesOrderId,
        deliveryOrderNo:this.form.deliveryOrderNo,
        createUserId:this.form.createUserId,
        actualDeliveryStartDate:this.form.actualDeliveryStartDate,
        actualDeliveryEndDate:this.form.actualDeliveryEndDate,
        deliveryStartDate:this.form.deliveryStartDate,
        deliveryEndDate:this.form.deliveryEndDate,
      }
      const res = await getProList(data);
      // //console.log('提货单列表',res)
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
      this.getProDetail(id)
      this.lineDia = true;
    },
    // 分页
    handleSizeChange(val) {
      // //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getProList()
    },
    handleCurrentChange(val) {
      // //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getProList()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;
.proList{
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