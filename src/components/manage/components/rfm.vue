<template>
  <div class="rfm">
    <el-form-item label="首次付款时间：" prop label-position="left" v-if="rfmValue.value1">
      <el-select v-model="form.payTimeType"  placeholder="请选则筛选条件">
        <el-option
          v-for="item in payTimeTypes"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-date-picker
        v-if="form.payTimeType==1"
        v-model="form.payTime"
        type="daterange"
        value-format="yyyy-MM-dd"
        placeholder="请选择日期"
      ></el-date-picker>

      <p
        style="display:inline-block;width:50%"
        v-if="form.payTimeType==2"
      >
        <el-input v-model="form.payTimeMinDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> - 
        <el-input v-model="form.payTimeMaxDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> 天
      </p>
    </el-form-item>

    <el-form-item label="最近一次付款时间：" prop label-position="left" v-if="rfmValue.value2">
      <el-select v-model="form.lastPayType"  placeholder="请选则筛选条件">
        <el-option
          v-for="item in payTimeTypes"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-date-picker
        v-if="form.lastPayType==1"
        v-model="form.lastPayTime"
        value-format="yyyy-MM-dd"
        type="daterange"
        placeholder="请选择日期"
      ></el-date-picker>

      <p
        style="display:inline-block;width:50%"
        v-if="form.lastPayType==2"
      >
        <el-input v-model="form.lastPayTimeMinDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> - 
        <el-input v-model="form.lastPayTimeMaxDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> 天
      </p>
    </el-form-item>

    <el-form-item label="首次下单时间：" prop label-position="left" v-if="rfmValue.value3">
      <el-select v-model="form.firstOrderType"  placeholder="请选则筛选条件">
        <el-option
          v-for="item in payTimeTypes"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-date-picker
        v-if="form.firstOrderType==1"
        v-model="form.firstOrderTime"
        value-format="yyyy-MM-dd"
        type="daterange"
        placeholder="请选择日期"
      ></el-date-picker>

      <p
        style="display:inline-block;width:50%"
        v-if="form.firstOrderType==2"
      >
        <el-input v-model="form.firstOrderTimeMinDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> - 
        <el-input v-model="form.firstOrderTimeMaxDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> 天
      </p>
    </el-form-item>

    <el-form-item label="最近一次成功时间：" prop label-position="left" v-if="rfmValue.value4">
      <el-select v-model="form.lastSucType"  placeholder="请选则筛选条件">
        <el-option
          v-for="item in payTimeTypes"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-date-picker
        v-if="form.lastSucType==1"
        v-model="form.lastSucTime"
        value-format="yyyy-MM-dd"
        type="daterange"
        placeholder="请选择日期"
      ></el-date-picker>

      <p
        style="display:inline-block;width:50%"
        v-if="form.lastSucType==2"
      >
        <el-input v-model="form.lastSucTimeMinDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> - 
        <el-input v-model="form.lastSucTimeMaxDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> 天
      </p>
    </el-form-item>

    <el-form-item label="下单次数：" prop label-position="left" v-if="rfmValue.value6">
      <el-select v-model="form.orderCondition" class placeholder="请选则筛选条件">
        <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <p  v-if="form.orderCondition==1||form.orderCondition==3" style="display:inline-block;width:50%">
        <el-input v-model="form.orderTimes" style="display:inline-block;width:40%"></el-input> 次
      </p>
      <p v-if="form.orderCondition==2" style="display:inline-block;width:50%">
        <el-input v-model="form.orderMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.orderMaxTimes" style="display:inline-block;width:40%"></el-input> 次  
      </p> 
    </el-form-item>

    <el-form-item label="交易成功次数：" prop label-position="left" v-if="rfmValue.value5">
      <el-select v-model="form.condition" class placeholder="请选则筛选条件">
        <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <p  v-if="form.condition==1||form.condition==3" style="display:inline-block;width:50%">
        <el-input v-model="form.times" style="display:inline-block;width:40%"></el-input> 次
      </p>
      <p v-if="form.condition==2" style="display:inline-block;width:50%">
        <el-input v-model="form.minTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.maxTimes" style="display:inline-block;width:40%"></el-input> 次  
      </p> 
      
    </el-form-item>
    
    <el-form-item label="下单金额：" prop label-position="left" v-if="rfmValue.value7">
      <el-select v-model="form.orderMoneyCondition" class placeholder="请选则筛选条件">
        <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <p  v-if="form.orderMoneyCondition==1||form.orderMoneyCondition==3" style="display:inline-block;width:50%">
        <el-input v-model="form.orderMoneyTimes" style="display:inline-block;width:40%"></el-input> 元
      </p>
      <p v-if="form.orderMoneyCondition==2" style="display:inline-block;width:50%">
        <el-input v-model="form.orderMoneyMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.orderMoneyMaxTimes" style="display:inline-block;width:40%"></el-input> 元  
      </p> 
    </el-form-item>

    <el-form-item label="成功金额：" prop label-position="left" v-if="rfmValue.value9">
      <el-select v-model="form.sucCondition" class placeholder="请选则筛选条件">
        <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <p  v-if="form.sucCondition==1||form.sucCondition==3" style="display:inline-block;width:50%">
        <el-input v-model="form.sucTimes" style="display:inline-block;width:40%"></el-input> 元
      </p>
      <p v-if="form.sucCondition==2" style="display:inline-block;width:50%">
        <el-input v-model="form.sucMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.sucMaxTimes" style="display:inline-block;width:40%"></el-input> 元  
      </p> 
    </el-form-item>

    <el-form-item label="付款次数：" prop label-position="left" v-if="rfmValue.value8">
      <el-select v-model="form.payCondition" class placeholder="请选则筛选条件">
        <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <p  v-if="form.payCondition==1||form.payCondition==3" style="display:inline-block;width:50%">
        <el-input v-model="form.payTimes" style="display:inline-block;width:40%"></el-input> 次
      </p>
      <p v-if="form.payCondition==2" style="display:inline-block;width:50%">
        <el-input v-model="form.payMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.payMaxTimes" style="display:inline-block;width:40%"></el-input> 次  
      </p> 
    </el-form-item>
    
    <el-form-item label="付款金额：" prop label-position="left" v-if="rfmValue.value10">
      <el-select v-model="form.payMoneyCondition" class placeholder="请选则筛选条件">
        <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <p  v-if="form.payMoneyCondition==1||form.payMoneyCondition==3" style="display:inline-block;width:50%">
        <el-input v-model="form.payMoneyTimes" style="display:inline-block;width:40%"></el-input> 元
      </p>
      <p v-if="form.payMoneyCondition==2" style="display:inline-block;width:50%">
        <el-input v-model="form.payMoneyMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.payMoneyMaxTimes" style="display:inline-block;width:40%"></el-input> 元  
      </p> 
    </el-form-item>
    
    <el-form-item label="退款次数：" prop label-position="left" v-if="rfmValue.value11">
      <el-select v-model="form.returnCondition" class placeholder="请选则筛选条件">
        <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <p  v-if="form.returnCondition==1||form.returnCondition==3" style="display:inline-block;width:50%">
        <el-input v-model="form.returnTimes" style="display:inline-block;width:40%"></el-input> 次
      </p>
      <p v-if="form.returnCondition==2" style="display:inline-block;width:50%">
        <el-input v-model="form.returnMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.returnMaxTimes" style="display:inline-block;width:40%"></el-input> 次  
      </p> 
    </el-form-item>

    <el-form-item label="退款金额：" prop label-position="left" v-if="rfmValue.value12">
      <el-select v-model="form.returnMoneyCondition" class placeholder="请选则筛选条件">
        <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <p  v-if="form.returnMoneyCondition==1||form.returnMoneyCondition==3" style="display:inline-block;width:50%">
        <el-input v-model="form.returnMoneyTimes" style="display:inline-block;width:40%"></el-input> 元
      </p>
      <p v-if="form.returnMoneyCondition==2" style="display:inline-block;width:50%">
        <el-input v-model="form.returnMoneyMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.returnMoneyMaxTimes" style="display:inline-block;width:40%"></el-input> 元  
      </p> 
    </el-form-item>

    <el-form-item label="客单件：" prop label-position="left" v-if="rfmValue.value14">
      <el-select v-model="form.oneCondition" class placeholder="请选则筛选条件">
        <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <p  v-if="form.oneCondition==1||form.oneCondition==3" style="display:inline-block;width:50%">
        <el-input v-model="form.oneTimes" style="display:inline-block;width:40%"></el-input> 件
      </p>
      <p v-if="form.oneCondition==2" style="display:inline-block;width:50%">
        <el-input v-model="form.oneMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.oneMaxTimes" style="display:inline-block;width:40%"></el-input> 件
      </p> 
    </el-form-item>

    <el-form-item label="客单价：" prop label-position="left" v-if="rfmValue.value13">
      <el-select v-model="form.oneMoneyCondition" class placeholder="请选则筛选条件">
        <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <p  v-if="form.oneMoneyCondition==1||form.oneMoneyCondition==3" style="display:inline-block;width:50%">
        <el-input v-model="form.oneMoneyTimes" style="display:inline-block;width:40%"></el-input> 元
      </p>
      <p v-if="form.oneMoneyCondition==2" style="display:inline-block;width:50%">
        <el-input v-model="form.oneMoneyMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.oneMoneyMaxTimes" style="display:inline-block;width:40%"></el-input> 元  
      </p> 
    </el-form-item>
    

    
    
  </div>
</template>
<script>
  import Bus from '../../../module/bus.js'

export default {
  props:['rfmValue'],
  data() {
    return {
      conditions:[
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
      payTimeTypes:[
        {
          name:'绝对',
          id:1
        },
        {
          name:'距离当前',
          id:2
        }
      ],
      form: {
        //客单价
        oneMoneyMinTimes:'',
        oneMoneyMaxTimes:'',
        oneMoneyTimes:'',
        oneMoneyCondition:'',
        //退款金额
        returnMoneyMinTimes:'',
        returnMoneyMaxTimes:'',
        returnMoneyTimes:'',
        returnMoneyCondition:'',
        //付款金额
        
        payMoneyMinTimes:'',
        payMoneyMaxTimes:'',
        payMoneyTimes:'',
        payMoneyCondition:'',
        //成功金额
        sucMinTimes:'',
        sucMaxTimes:'',
        sucTimes:'',
        sucCondition:'',
        //下单金额
        
        orderMoneyMinTimes:'',
        orderMoneyMaxTimes:'',
        orderMoneyTimes:'',
        orderMoneyCondition:'',
        //客单件
        oneMinTimes:'',
        oneMaxTimes:'',
        oneTimes:'',
        oneCondition:'',
        //退款次数
        returnMinTimes:'',
        returnMaxTimes:'',
        returnTimes:'',
        returnCondition:'',
        //付款次数
        payMinTimes:'',
        payMaxTimes:'',
        payTimes:'',
        payCondition:'',
        //下单次数
        
        orderMinTimes:'',
        orderMaxTimes:'',
        orderTimes:'',
        orderCondition:'',
        //交易成功次数
        minTimes:'',
        maxTimes:'',
        times:'',
        condition:'',
        //首次付款
        payTimeMinDay:'',
        payTimeMaxDay:'',
        payTimeType:'',
        payTime:[],
        //最后一次付款 
        lastPayTimeMinDay:'',
        lastPayTimeMaxDay:'',
        lastPayType:'',
        lastPayTime:[],
        //首次下单
        firstOrderTimeMinDay:'',
        firstOrderTimeMaxDay:'',
        firstOrderType:'',
        firstOrderTime:[],
        //最近一次成功时间
        lastSucTimeMinDay:'',
        lastSucTimeMaxDay:'',
        lastSucType:'',
        lastSucTime:[],
     
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
    rfmValue:{
      handler:function(n,o){
        if(!n.value1){
          this.form.payTimeMinDay=''
          this.form.payTimeMaxDay=''
          this.form.payTimeType=''
          this.form.payTime=[]
        }
        if(!n.value2){
          this.form.lastPayTimeMinDay=''
          this.form.lastPayTimeMaxDay=''
          this.form.lastPayType=''
          this.form.lastPayTime=[]
        }
        if(!n.value3){
          this.form.firstOrderTimeMinDay=''
          this.form.firstOrderTimeMaxDay=''
          this.form.firstOrderType=''
          this.form.firstOrderTime=[]
        }
        if(!n.value4){
          this.form.lastSucTimeMinDay=''
          this.form.lastSucTimeMaxDay=''
          this.form.lastSucType=''
          this.form.lastSucTime=[]
        }
        if(!n.value5){
          this.form.condition=''
          this.form.times=''
          this.form.maxTimes=''
          this.form.minTimes=''
        }
        if(!n.value6){
          this.form.orderMinTimes=''
          this.form.orderMaxTimes=''
          this.form.orderTimes=''
          this.form.orderCondition=''
        }
        if(!n.value7){
          this.form.orderMoneyCondition=''
          this.form.orderMoneyTimes=''
          this.form.orderMoneyMaxTimes=''
          this.form.orderMoneyMinTimes=''
        }
        if(!n.value8){
          this.form.payCondition=''
          this.form.payTimes=''
          this.form.payMaxTimes=''
          this.form.payMinTimes=''
        }
        if(!n.value9){
          this.form.sucCondition=''
          this.form.sucTimes=''
          this.form.sucMaxTimes=''
          this.form.sucMinTimes=''
        }
        if(!n.value10){
          this.form.payMoneyMinTimes=''
          this.form.payMoneyMaxTimes=''
          this.form.payMoneyTimes=''
          this.form.payMoneyCondition=''
        }
        if(!n.value11){
          this.form.returnMinTimes=''
          this.form.returnMaxTimes=''
          this.form.returnTimes=''
          this.form.returnCondition=''
        }
        if(!n.value12){
          this.form.returnMoneyMinTimes=''
          this.form.returnMoneyMaxTimes=''
          this.form.returnMoneyCondition=''
          this.form.returnMoneyTimes=''
        }
        if(!n.value13){
          this.form.oneMoneyCondition=''
          this.form.oneMoneyTimes=''
          this.form.oneMoneyMaxTimes=''
          this.form.oneMoneyMinTimes=''
        }
        if(!n.value14){
          this.form.oneCondition=''
          this.form.oneTimes=''
          this.form.oneMaxTimes=''
          this.form.oneMinTimes=''
        }
      },
      deep:true
    }
  },
  created() {
  },
  methods: {
  },
  mounted(){
    Bus.$on('tagData',(data)=>{
      if(data[1]){
        this.form.payTimeType= data[1].rfmFirstPayTimeType
        if(data[1].rfmFirstPayTimeType ==1){
          this.form.payTimeMinDay=''
          this.form.payTimeMaxDay=''
          // console.log(data[1].rfmFirstPayTimeStart)
          this.form.payTime=[data[1].rfmFirstPayTimeStart,data[1].rfmFirstPayTimeEnd]
        }else if(data[1].rfmFirstPayTimeType ==2){
          this.form.payTimeMinDay=data[1].rfmFirstPayTimeStart
          this.form.payTimeMaxDay=data[1].rfmFirstPayTimeEnd
          this.form.payTime=[]
        }

        // 最近一次付款时间显示否
        this.form.lastPayType= data[1].rfmLastPayTimeType

        if(data[1].rfmLastPayTimeType ==1){
          this.form.lastPayTimeMinDay=''
          this.form.lastPayTimeMaxDay=''
          this.form.lastPayTime=[data[1].rfmLastPayTimeStart,data[1].rfmLastPayTimeEnd]
        }else if(data[1].rfmLastPayTimeType ==2){
          this.form.lastPayTimeMinDay=data[1].rfmLastPayTimeStart
          this.form.lastPayTimeMaxDay=data[1].rfmLastPayTimeEnd
          this.form.lastPayTime=[]
        }

        //首次下单时间显示否
        this.form.firstOrderType = data[1].rfmFirstOrderTimeType
        if(data[1].rfmFirstOrderTimeType ==1){
          this.form.firstOrderTimeMinDay=''
          this.form.firstOrderTimeMaxDay=''
          this.form.firstOrderTime=[data[1].rfmFirstOrderTimeStart,data[1].rfmFirstOrderTimeEnd]
        }else if(data[1].rfmFirstOrderTimeType ==2){
          this.form.firstOrderTimeMinDay=data[1].rfmFirstOrderTimeStart
          this.form.firstOrderTimeMaxDay=data[1].rfmFirstOrderTimeEnd
          this.form.firstOrderTime=[]
        }

        //最近一次成功时间显示否
        this.form.lastSucType = data[1].rfmLastSuccessTimeType
        if(data[1].rfmLastSuccessTimeType ==1){

          this.form.lastSucTimeMinDay=''
          this.form.lastSucTimeMaxDay=''
          this.form.lastSucTime=[data[1].rfmLastSuccessTimeStart,data[1].rfmLastSuccessTimeEnd]
        }else if(data[1].rfmLastSuccessTimeType ==2){
          this.form.lastSucTimeMinDay=data[1].rfmLastSuccessTimeStart
          this.form.lastSucTimeMaxDay=data[1].rfmLastSuccessTimeEnd
          this.form.lastSucTime=[]
        }
        //交易成功次数
        if(data[1].rfmTradeSuccessMinTimes && data[1].rfmTradeSuccessMaxTimes){
            this.form.condition=2
            this.form.times=''
            this.form.maxTimes=data[1].rfmTradeSuccessMaxTimes
            this.form.minTimes=data[1].rfmTradeSuccessMinTimes
        }
        if(!data[1].rfmTradeSuccessMinTimes && data[1].rfmTradeSuccessMaxTimes){
            this.form.condition=3
            this.form.times=data[1].rfmTradeSuccessMaxTimes
            this.form.maxTimes=''
            this.form.minTimes=''
        }
        if(data[1].rfmTradeSuccessMinTimes && !data[1].rfmTradeSuccessMaxTimes){
            this.form.condition=1
            this.form.times=data[1].rfmTradeSuccessMinTimes
            this.form.maxTimes=''
            this.form.minTimes=''
        }

        //下单次数
        if(data[1].rfmOrderMinTimes && data[1].rfmOrderMaxTimes){
            this.form.orderCondition=2
            this.form.orderTimes=''
            this.form.orderMaxTimes=data[1].rfmOrderMaxTimes
            this.form.orderMinTimes=data[1].rfmOrderMinTimes
        }
        if(!data[1].rfmTradeSuccessMinTimes && data[1].rfmTradeSuccessMaxTimes){
            this.form.orderCondition=3
            this.form.orderTimes=data[1].rfmOrderMaxTimes
            this.form.orderMaxTimes=''
            this.form.orderMinTimes=''
        }
        if(data[1].rfmTradeSuccessMinTimes && !data[1].rfmTradeSuccessMaxTimes){
            this.form.orderCondition=1
            this.form.orderTimes=data[1].rfmOrderMinTimes
            this.form.orderMaxTimes=''
            this.form.orderMinTimes=''
        }

        //下单金额

      if(data[1].rfmOrderMinTotal && data[1].rfmOrderMaxTotal){
            this.form.orderMoneyCondition=2
            this.form.orderMoneyTimes=''
            this.form.orderMoneyMinTimes=data[1].rfmOrderMinTotal
            this.form.orderMoneyMaxTimes=data[1].rfmOrderMaxTotal
        }
        if(!data[1].rfmOrderMinTotal && data[1].rfmOrderMaxTotal){
            this.form.orderMoneyCondition=3
            this.form.orderMoneyTimes=data[1].rfmOrderMaxTotal
            this.form.orderMoneyMinTimes=''
            this.form.orderMoneyMaxTimes=''
        }
        if(data[1].rfmOrderMinTotal && !data[1].rfmOrderMaxTotal){
            this.form.orderMoneyCondition=1
            this.form.orderMoneyTimes=data[1].rfmOrderMinTotal
            this.form.orderMoneyMinTimes=''
            this.form.orderMoneyMaxTimes=''
        }



        //付款次数
        if(data[1].rfmPayMinTimes && data[1].rfmPayMaxTimes){
            this.form.payCondition=2
            this.form.payTimes=''
            this.form.payMinTimes=data[1].rfmPayMinTimes
            this.form.payMaxTimes=data[1].rfmPayMaxTimes
        }
        if(!data[1].rfmPayMinTimes && data[1].rfmPayMaxTimes){
            this.form.payCondition=3
            this.form.payTimes=data[1].rfmPayMaxTimes
            this.form.payMinTimes=''
            this.form.payMaxTimes=''
        }
        if(data[1].rfmPayMinTimes && !data[1].rfmPayMaxTimes){
            this.form.payCondition=1
            this.form.payTimes=data[1].rfmPayMinTimes
            this.form.payMinTimes=''
            this.form.payMaxTimes=''
        }

        //成功金额


        if(data[1].rfmSuccessMinTotal && data[1].rfmSuccessMaxTotal){
            this.form.sucCondition=2
            this.form.sucTimes=''
            this.form.sucMinTimes=data[1].rfmSuccessMinTotal
            this.form.sucMaxTimes=data[1].rfmSuccessMaxTotal
        }
        if(!data[1].rfmSuccessMinTotal && data[1].rfmSuccessMaxTotal){
            this.form.sucCondition=3
            this.form.sucTimes=data[1].rfmSuccessMaxTotal
            this.form.sucMinTimes=''
            this.form.sucMaxTimes=''
        }
        if(data[1].rfmSuccessMinTotal && !data[1].rfmSuccessMaxTotal){
            this.form.sucCondition=1
            this.form.sucTimes=data[1].rfmSuccessMinTotal
            this.form.sucMinTimes=''
            this.form.sucMaxTimes=''
        }
        //付款金额

        if(data[1].rfmPayMinTotal && data[1].rfmPayMaxTotal){
            this.form.payMoneyCondition=2
            this.form.payMoneyTimes=''
            this.form.payMoneyMinTimes=data[1].rfmPayMinTotal
            this.form.payMoneyMaxTimes=data[1].rfmPayMaxTotal
        }
        if(!data[1].rfmPayMinTotal && data[1].rfmPayMaxTotal){
            this.form.payMoneyCondition=3
            this.form.payMoneyTimes=data[1].rfmPayMaxTotal
            this.form.payMoneyMinTimes=''
            this.form.payMoneyMaxTimes=''
        }
        if(data[1].rfmPayMinTotal && !data[1].rfmPayMaxTotal){
            this.form.payMoneyCondition=1
            this.form.payMoneyTimes=data[1].rfmPayMinTotal
            this.form.payMoneyMinTimes=''
            this.form.payMoneyMaxTimes=''
        }
        //退款次数

        if(data[1].rfmRefundMinTimes && data[1].rfmRefundMaxTimes){
            this.form.returnCondition=2
            this.form.returnTimes=''
            this.form.returnMinTimes=data[1].rfmRefundMinTimes
            this.form.returnMaxTimes=data[1].rfmRefundMaxTimes
        }
        if(!data[1].rfmRefundMinTimes && data[1].rfmRefundMaxTimes){
            this.form.returnCondition=3
            this.form.returnTimes=data[1].rfmRefundMaxTimes
            this.form.returnMinTimes=''
            this.form.returnMaxTimes=''
        }
        if(data[1].rfmRefundMinTimes && !data[1].rfmRefundMaxTimes){
            this.form.returnCondition=1
            this.form.returnTimes=data[1].rfmRefundMinTimes
            this.form.returnMinTimes=''
            this.form.returnMaxTimes=''
        }
        //退款金额
        if(data[1].rfmRefundMinTotal && data[1].rfmRefundMaxTotal){
            this.form.returnMoneyCondition=2
            this.form.returnMoneyTimes=''
            this.form.returnMoneyMinTimes=data[1].rfmRefundMinTotal
            this.form.returnMoneyMaxTimes=data[1].rfmRefundMaxTotal
        }
        if(!data[1].rfmRefundMinTotal && data[1].rfmRefundMaxTotal){
            this.form.returnMoneyCondition=3
            this.form.returnMoneyTimes=data[1].rfmRefundMaxTotal
            this.form.returnMoneyMinTimes=''
            this.form.returnMoneyMaxTimes=''
        }
        if(data[1].rfmRefundMinTotal && !data[1].rfmRefundMaxTotal){
            this.form.returnMoneyCondition=1
            this.form.returnMoneyTimes=data[1].rfmRefundMinTotal
            this.form.returnMoneyMinTimes=''
            this.form.returnMoneyMaxTimes=''
        }
        //客单价

        if(data[1].rfmAtvMin && data[1].rfmAtvMax){
            this.form.oneMoneyCondition=2
            this.form.oneMoneyTimes=''
            this.form.oneMoneyMinTimes=data[1].rfmAtvMin
            this.form.oneMoneyMaxTimes=data[1].rfmAtvMax
        }
        if(!data[1].rfmAtvMin && data[1].rfmAtvMax){
            this.form.oneMoneyCondition=3
            this.form.oneMoneyTimes=data[1].rfmAtvMax
            this.form.oneMoneyMinTimes=''
            this.form.oneMoneyMaxTimes=''
        }
        if(data[1].rfmAtvMin && !data[1].rfmAtvMax){
            this.form.oneMoneyCondition=1
            this.form.oneMoneyTimes=data[1].rfmAtvMin
            this.form.oneMoneyMinTimes=''
            this.form.oneMoneyMaxTimes=''
        }
//         //客单件
//         if(data[1].rfmUptMin || data[1].rfmUptMax){
//           this.rfm.value14= true
//         }
        if(data[1].rfmUptMin && data[1].rfmUptMax){
            this.form.oneCondition=2
            this.form.oneTimes=''
            this.form.oneMinTimes=data[1].rfmUptMin
            this.form.oneMaxTimes=data[1].rfmUptMax
        }
        if(!data[1].rfmUptMin && data[1].rfmUptMax){
            this.form.oneCondition=3
            this.form.oneTimes=data[1].rfmUptMax
            this.form.oneMinTimes=''
            this.form.oneMaxTimes=''
        }
        if(data[1].rfmUptMin && !data[1].rfmUptMax){
            this.form.oneCondition=1
            this.form.oneTimes=data[1].rfmUptMin
            this.form.oneMinTimes=''
            this.form.oneMaxTimes=''
        }
      }
    })
  }
};
</script>
