<template>
  <div class="index">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>销售管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售预测查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="sels clear">
        <!-- <el-button @click='change'  size='small' type='primary' plain>{{!dialogVisible ? '展开筛选条件' :'收起筛选条件'}}
          </el-button> -->
        <div class="lineBox">
          <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>

          <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>

          <!-- <div class="line"></div> -->
        </div>
        <!-- <transition-group enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"> -->
        <el-form ref="form" size="small" :model="form" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
           <el-form-item label="查询方式" >
            <el-select v-model="way">
              <el-option :value='1' label='按年'></el-option>
              <el-option :value='2' label='按月'></el-option>
              <el-option :value='3' label='按首代Buffer'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户简称" v-if="way!=3">
            <el-input size='small' placeholder="请输入" v-model="form.customerAbbreviation"></el-input>
          </el-form-item>
           <el-form-item label="代理商简称" v-if="way!=3">
            <el-input size='small' placeholder="请输入" v-model="form.agencyAbbreviation"></el-input>
          </el-form-item>
           <el-form-item label="销售" v-if="way!=3">
            <el-input size='small' placeholder="请输入" v-model="form.salePeople" ></el-input>
          </el-form-item>
         
          <el-form-item label="上传日期" class="date" v-if="way!=3"> 
            <Daterange @data='watchTime' :resetDataReg='resetData' />
          </el-form-item>
          <el-form-item label="渠道" v-if="way!=3">
            <el-input size='small' placeholder="请输入" v-model="form.channel"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button size='small' type='primary' plain @click='search'>查询</el-button>
            <el-button @click='reset' size='small' type='primary' plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <div class="btns clear">
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%" height="100%" v-show="way==2">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table size='small' :data="props.row.list" border style="width: 100%" height="100%" >
                  <el-table-column label="月份" prop='forecastMonth' show-overflow-tooltip> 
                  </el-table-column>
                  <el-table-column label="上次填写" prop='lastWrite' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="本次填写" prop='currentWrite' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="GAP" prop='gap' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="备注" prop='remark' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="阿米巴队长调整" prop='ambAdjustment' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="阿米巴队长备注" prop='ambRemark' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="首代调整" prop='sdAdjustment' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="首代备注" prop='sdRemark' show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="" width='180' label="本次代理填写值销售" show-overflow-tooltip>
                    <template slot-scope="scope">
                      {{scope.row.currentWrite*props.row.poPrice}}
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
                <el-table-column prop="createTimeStr" width='100' label="上传日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="operationYearMonth" width='80' label="年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="company" width='80' label="出货公司" show-overflow-tooltip></el-table-column>
                <el-table-column prop="channel" width='80' label="渠道" show-overflow-tooltip></el-table-column>
                <el-table-column prop="agencyAbbreviation" width='80' label="代理简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerAbbreviation" width='100'  label="客户简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerType" width='100'  label="客户类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="forecastType" width='180'  label="预测类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="ambLeader" width='180'  label="阿米巴队长" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salePeople" width='80'  label="销售" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdPeople" width='80'  label="首代" show-overflow-tooltip></el-table-column>
                <el-table-column prop="representative" width='80'  label="代表处" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bu" width='80'  label="BU" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pdt" width='80'  label="PDT" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productType" width='150'  label="Product Type" show-overflow-tooltip></el-table-column>
                <el-table-column prop="platform" width='100'  label="Platform" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productModel" width='100'  label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="closeDate" width='100'  label="截止日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="delayStock" width='180'  label="未完成专货库存" show-overflow-tooltip></el-table-column>
                <el-table-column prop="poPrice" width='180' label="PO价格" show-overflow-tooltip></el-table-column>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
          <el-table :data="tableData" border style="width: 100%" height="100%" v-show="way==1">
                <el-table-column prop="createTimeStr" width='100' label="上传日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="operationYearMonth" width='80' label="年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="company" width='80' label="出货公司" show-overflow-tooltip></el-table-column>
                <el-table-column prop="channel" width='80' label="渠道" show-overflow-tooltip></el-table-column>
                <el-table-column prop="agencyAbbreviation" width='80' label="代理简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerAbbreviation" width='100'  label="客户简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerType" width='100'  label="客户类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="forecastType" width='180'  label="预测类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="ambLeader" width='180'  label="阿米巴队长" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salePeople" width='80'  label="销售" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdPeople" width='80'  label="首代" show-overflow-tooltip></el-table-column>
                <el-table-column prop="representative" width='80'  label="代表处" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bu" width='80'  label="BU" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pdt" width='80'  label="PDT" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productType" width='150'  label="Product Type" show-overflow-tooltip></el-table-column>
                <el-table-column prop="platform" width='100'  label="Platform" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productModel" width='100'  label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="closeDate" width='100'  label="截止日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="delayStock" width='180'  label="未完成专货库存" show-overflow-tooltip></el-table-column>

                <el-table-column prop="line.forecastMonthOne" width="80" label="月份一" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteOne"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteOne" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapOne" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkOne" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="line.forecastMonthTwo" width="80" label="月份二" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteTwo"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteTwo" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapTwo" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkTwo" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthThree" width="80" label="月份三" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteThree"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteThree" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapThree" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkThree" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthFour" width="80" label="月份四" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteFour"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteFour" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapFour" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkFour" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthFive" width="80" label="月份五" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteFive"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteFive" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapFive" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkFive" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthSix" width="80" label="月份六" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteSix"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteSix" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapSix" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkSix" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="poPrice" width='180' label="PO价格" show-overflow-tooltip></el-table-column>

                <el-table-column prop="" width='180' label="本次代理填写值1销售" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{scope.row.line.currentWriteOne*scope.row.poPrice}}
                  </template>
                </el-table-column>

                <el-table-column prop="" width='180' label="本次代理填写值2销售" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{scope.row.line.currentWriteTwo*scope.row.poPrice}}
                  </template>
                </el-table-column>

                <el-table-column prop="" width='180' label="本次代理填写值3销售" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{scope.row.line.currentWriteThree*scope.row.poPrice}}
                  </template>
                </el-table-column>

                <el-table-column prop="" width='180' label="本次代理填写值4销售" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{scope.row.line.currentWriteFour*scope.row.poPrice}}
                  </template>
                </el-table-column>

                <el-table-column prop="" width='180' label="本次代理填写值5销售" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{scope.row.line.currentWriteFive*scope.row.poPrice}}
                  </template>
                </el-table-column>

                <el-table-column prop="" width='180' label="本次代理填写值6销售" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{scope.row.line.currentWriteSix*scope.row.poPrice}}
                  </template>
                </el-table-column>

            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
          <el-table :data="sdTableData" border style="width: 100%" height="100%" v-show="way==3">
                <el-table-column prop="operationYearMonth" width='80' label="年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="company" width='80' label="出货公司" show-overflow-tooltip></el-table-column>
                <el-table-column prop="vmNumber" width='80'  label="物料号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bu" width='80'  label="BU" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pdt" width='80'  label="PDT" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productType" width='150'  label="Product Type" show-overflow-tooltip></el-table-column>
                <el-table-column prop="platform" width='100'  label="Platform" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productModel" width='100'  label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdAdjustmentOne" width='100'  label="首代调整一" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdRemarkOne" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdAdjustmentTwo" width='100'  label="首代调整二" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdRemarkTwo" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdAdjustmentThree" width='100'  label="首代调整三" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdRemarkThree" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdAdjustmentFour" width='100'  label="首代调整四" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdRemarkFour" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdAdjustmentFive" width='100'  label="首代调整五" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdRemarkFive" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdAdjustmentSix" width='100'  label="首代调整六" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdRemarkSix" width='100'  label="备注" show-overflow-tooltip></el-table-column>
            <div slot="empty">
              <p>无数据</p>
            </div>
          </el-table>
          <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 20,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        </div>
        
      </div>
    </div>
    <el-dialog
        title="预测调整"
        :visible.sync="dialogVisible1"
        width="80%"
        >
        <el-table :data="tableData1" style="width: 100%" >
            <el-table-column  label="月份" show-overflow-tooltip></el-table-column>
            <el-table-column  label="原预测值" show-overflow-tooltip></el-table-column>
            <el-table-column  label="调整值" show-overflow-tooltip>
                <el-input size="small"></el-input>
            </el-table-column>
            <el-table-column  label="备注"   show-overflow-tooltip>
              <template>
                <el-input  size="small" :rows="1" type="textarea"></el-input>
              </template>
            </el-table-column>
            
          </el-table>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false" size="small">提 交</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import Daterange from "../com/date";
  import formTest from '../../assets/js/formTest'
  import {getList,getSdList} from '@/api/forcast/query.js'
  export default {
    components:{
      Daterange
    },
    name: 'forcastIndex',
    data() {
      return {
        resetData:true,
        source:'',
        way:1,
        form: {
          customerAbbreviation:'',  
          channel:'',
          salePeople:'',
          uploadStartTime:'',  
          uploadEndTime:'',
          agencyAbbreviation :''
        },
        dialogVisible: false,
        dialogVisible1: false,
        tableData: [
        ],
        sdTableData:[],
        tableData1: [
        ],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        total: 0,

      }
    },
    computed: {
    },
    created() {
      this.getList()
      // this.getSdList()
    },
    watch: {
      way: {
        handler: function(n, o) {
          // console.log(n);
          if(n==3){
            this.getSdList()
          }
        }
      }
    },
    methods: {
      search(){
        this.currentPage = 1;
        this.getList()
      },
      reset(){
        this.form ={
          customerAbbreviation:'',  
          salePeople:'',
          uploadStartTime:'',  
          uploadEndTime:'',
          agencyAbbreviation :'',
          channel:''
        }
        this.resetData = true;
        this.search()
      },
      watchTime(data){
        // console.log(data)
        this.form.uploadStartTime = data.startTime
        this.form.uploadEndTime = data.endTime
        this.resetData = false
      },
      async getList(){
        const data ={
          pageSize:this.pageSize,
          pageNum:this.currentPage,
          customerAbbreviation:this.form.customerAbbreviation,  
          channel:this.form.channel,
          salePeople:this.form.salePeople,
          uploadStartTime:this.form.uploadStartTime,  
          uploadEndTime:this.form.uploadEndTime,
          agencyAbbreviation :this.form.agencyAbbreviation
        }
        const res = await getList(data);
        // console.log('查询列表',res);
        if(res){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
          this.tableData.map((item,index)=>{
            this.tableData[index].list = [
              {
                index:1,
                lineId:item.line.lineId,
                currentWrite:item.line.currentWriteOne,
                ambRemark:item.line.ambRemarkOne,
                ambAdjustment:item.line.ambAdjustmentOne,
                forecastMonth:item.line.forecastMonthOne,
                gap:item.line.gapOne,
                lastWrite:item.line.lastWriteOne,
                remark:item.line.remarkOne,
                sdAdjustment:item.line.sdAdjustmentOne,
                sdRemark:item.line.sdRemarkOne,
              },
              {
                index:2,
                lineId:item.line.lineId,
                currentWrite:item.line.currentWriteTwo,
                ambRemark:item.line.ambRemarkTwo,
                ambAdjustment:item.line.ambAdjustmentTwo,
                forecastMonth:item.line.forecastMonthTwo,
                gap:item.line.gapOne,
                lastWrite:item.line.lastWriteTwo,
                remark:item.line.remarkOne,
                sdAdjustment:item.line.sdAdjustmentTwo,
                sdRemark:item.line.sdRemarkTwo,
              },
              {
                index:3,
                lineId:item.line.lineId,
                currentWrite:item.line.currentWriteThree,
                ambRemark:item.line.ambRemarkThree,
                ambAdjustment:item.line.ambAdjustmentThree,
                forecastMonth:item.line.forecastMonthThree,
                gap:item.line.gapThree,
                lastWrite:item.line.lastWriteThree,
                remark:item.line.remarkThree,
                sdAdjustment:item.line.sdAdjustmentThree,
                sdRemark:item.line.sdRemarkThree,
              },
              {
                index:4,
                lineId:item.line.lineId,
                currentWrite:item.line.currentWriteFour,
                ambRemark:item.line.ambRemarkFour,
                ambAdjustment:item.line.ambAdjustmentFour,
                forecastMonth:item.line.forecastMonthFour,
                gap:item.line.gapFour,
                lastWrite:item.line.lastWriteFour,
                remark:item.line.remarkFour,
                sdAdjustment:item.line.sdAdjustmentFour,
                sdRemark:item.line.sdRemarkFour,
              },
              {
                index:5,
                lineId:item.line.lineId,
                currentWrite:item.line.currentWriteFive,
                ambRemark:item.line.ambRemarkFive,
                ambAdjustment:item.line.ambAdjustmentFive,
                forecastMonth:item.line.forecastMonthFive,
                gap:item.line.gapFive,
                lastWrite:item.line.lastWriteFive,
                remark:item.line.remarkFive,
                sdAdjustment:item.line.sdAdjustmentFive,
                sdRemark:item.line.sdRemarkFive,
              },
              {
                index:6,
                lineId:item.line.lineId,
                currentWrite:item.line.currentWriteSix,
                ambRemark:item.line.ambRemarkSix,
                ambAdjustment:item.line.ambAdjustmentSix,
                forecastMonth:item.line.forecastMonthSix,
                gap:item.line.gapOne,
                lastWrite:item.line.lastWriteSix,
                remark:item.line.remarkSix,
                sdAdjustment:item.line.sdAdjustmentSix,
                sdRemark:item.line.sdRemarkSix,
              }
            ]
          })
        }
      },
      async getSdList(){
        const data ={
          pageSize:this.pageSize,
          pageNum:this.currentPage,
        }
        const res = await getSdList(data);
        // console.log('sd查询列表',res);
        if(res){
          this.sdTableData = res.data.data.list
          this.total = res.data.data.total
          // this.tableData.map((item,index)=>{
          //   this.tableData[index].list = [
          //     {
          //       index:1,
          //       lineId:item.line.lineId,
          //       currentWrite:item.line.currentWriteOne,
          //       ambRemark:item.line.ambRemarkOne,
          //       ambAdjustment:item.line.ambAdjustmentOne,
          //       forecastMonth:item.line.forecastMonthOne,
          //       gap:item.line.gapOne,
          //       lastWrite:item.line.lastWriteOne,
          //       remark:item.line.remarkOne,
          //       sdAdjustment:item.line.sdAdjustmentOne,
          //       sdRemark:item.line.sdRemarkOne,
          //     },
          //     {
          //       index:2,
          //       lineId:item.line.lineId,
          //       currentWrite:item.line.currentWriteTwo,
          //       ambRemark:item.line.ambRemarkTwo,
          //       ambAdjustment:item.line.ambAdjustmentTwo,
          //       forecastMonth:item.line.forecastMonthTwo,
          //       gap:item.line.gapOne,
          //       lastWrite:item.line.lastWriteTwo,
          //       remark:item.line.remarkOne,
          //       sdAdjustment:item.line.sdAdjustmentTwo,
          //       sdRemark:item.line.sdRemarkTwo,
          //     },
          //     {
          //       index:3,
          //       lineId:item.line.lineId,
          //       currentWrite:item.line.currentWriteThree,
          //       ambRemark:item.line.ambRemarkThree,
          //       ambAdjustment:item.line.ambAdjustmentThree,
          //       forecastMonth:item.line.forecastMonthThree,
          //       gap:item.line.gapThree,
          //       lastWrite:item.line.lastWriteThree,
          //       remark:item.line.remarkThree,
          //       sdAdjustment:item.line.sdAdjustmentThree,
          //       sdRemark:item.line.sdRemarkThree,
          //     },
          //     {
          //       index:4,
          //       lineId:item.line.lineId,
          //       currentWrite:item.line.currentWriteFour,
          //       ambRemark:item.line.ambRemarkFour,
          //       ambAdjustment:item.line.ambAdjustmentFour,
          //       forecastMonth:item.line.forecastMonthFour,
          //       gap:item.line.gapFour,
          //       lastWrite:item.line.lastWriteFour,
          //       remark:item.line.remarkFour,
          //       sdAdjustment:item.line.sdAdjustmentFour,
          //       sdRemark:item.line.sdRemarkFour,
          //     },
          //     {
          //       index:5,
          //       lineId:item.line.lineId,
          //       currentWrite:item.line.currentWriteFive,
          //       ambRemark:item.line.ambRemarkFive,
          //       ambAdjustment:item.line.ambAdjustmentFive,
          //       forecastMonth:item.line.forecastMonthFive,
          //       gap:item.line.gapFive,
          //       lastWrite:item.line.lastWriteFive,
          //       remark:item.line.remarkFive,
          //       sdAdjustment:item.line.sdAdjustmentFive,
          //       sdRemark:item.line.sdRemarkFive,
          //     },
          //     {
          //       index:6,
          //       lineId:item.line.lineId,
          //       currentWrite:item.line.currentWriteSix,
          //       ambRemark:item.line.ambRemarkSix,
          //       ambAdjustment:item.line.ambAdjustmentSix,
          //       forecastMonth:item.line.forecastMonthSix,
          //       gap:item.line.gapOne,
          //       lastWrite:item.line.lastWriteSix,
          //       remark:item.line.remarkSix,
          //       sdAdjustment:item.line.sdAdjustmentSix,
          //       sdRemark:item.line.sdRemarkSix,
          //     }
          //   ]
          // })
        }
      },
      change(){
        this.dialogVisible = !this.dialogVisible

      },
      // 分页
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList()
      },
    }
  }
</script>

<style lang='scss'>
  $sc:12;
.index{
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
    .head{
      padding: 10px 20px;
      // background: red;
    }
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
}
</style>