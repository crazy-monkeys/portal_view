<template>

    <!-- 查看控件 -->
    <div class="look" >    
      <div class="head clear">   
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
          <el-breadcrumb-item>客户关怀</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.params.type==8">预付款提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==10">退货提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==7">商品回购提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==6">好评关怀</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==2">付款关怀</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==3">发货提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==1">订单催付</el-breadcrumb-item>   
           <el-breadcrumb-item v-if="$route.params.type==8">新建预付款提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==10">新建退货提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==7">新建商品回购提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==6">新建好评关怀</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==2">新建付款关怀</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==3">新建发货提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==1">新建订单催付</el-breadcrumb-item> 
        </el-breadcrumb>
          <h1 v-if="$route.params.type==8"> <i class="el-icon-back" @click="back($route.params.type)"></i> <span >预付款提醒详情</span> </h1>  
          <h1 v-if="$route.params.type==10"> <i class="el-icon-back" @click="back($route.params.type)"></i><span >退货提醒详情</span></h1>  
          <h1 v-if="$route.params.type==7"> <i class="el-icon-back" @click="back($route.params.type)"></i><span >商品回购提醒详情</span></h1>  
          <h1 v-if="$route.params.type==6"> <i class="el-icon-back" @click="back($route.params.type)"></i><span >好评关怀详情</span></h1>  
          <h1 v-if="$route.params.type==2"> <i class="el-icon-back" @click="back($route.params.type)"></i><span >付款关怀详情</span></h1>  
          <h1 v-if="$route.params.type==3"> <i class="el-icon-back" @click="back($route.params.type)"></i><span >发货提醒详情</span></h1>  
          <h1 v-if="$route.params.type==1"> <i class="el-icon-back" @click="back($route.params.type)"></i><span >订单催付详情</span></h1> 
      </div>
       
      <div class="box">
        <div class="head" v-if="$route.params.type==8">预付款提醒</div>
        <div class="head" v-if="$route.params.type==10">退货提醒</div>
        <div class="head" v-if="$route.params.type==7">商品回购提醒</div>
        <div class="head" v-if="$route.params.type==6">好评关怀</div>
        <div class="head" v-if="$route.params.type==2">付款关怀</div>
        <div class="head" v-if="$route.params.type==3">发货提醒</div>
        <div class="head" v-if="$route.params.type==1">订单催付</div>
        <div class="baseMsg">
          <h2>基本信息</h2>  
          <div><span>活动名称</span>{{ruleForm.actName}}</div>
          <div><span>规则执行时间</span>{{ruleForm.time1[0]}}至{{ruleForm.time1[1]}}</div>
          <div><span>发送时间</span>每天{{ruleForm.time2[0]}}-{{ruleForm.time2[1]}}</div>
        </div>  
        <div class="condition">
          <h2>执行条件</h2>  
          <div v-if='$route.params.type==1'><span>下单后催付提醒间隔时间</span> {{ruleForm.hours}}小时{{ruleForm.minutes}}分</div>
          
          <div v-if='$route.params.type==7'><span>付款后回购提醒间隔时间</span> {{ruleForm.day}}天{{ruleForm.hours}}小时</div>

          <div v-if='$route.params.type==8'><span>下单时间</span> {{ruleForm.time3[0]}} 至 {{ruleForm.time3[1]}}</div>
          <div v-if='!ruleForm.maxPrice && !ruleForm.minPrice'><span>{{$route.params.type==10?'退款金额':'订单金额'}}</span> 任意</div>
          <div v-if='!ruleForm.maxPrice && ruleForm.minPrice'><span>{{$route.params.type==10?'退款金额':'订单金额'}}</span> 大于 {{ruleForm.minPrice}} 元</div>
          <div v-if='ruleForm.maxPrice && !ruleForm.minPrice'><span>{{$route.params.type==10?'退款金额':'订单金额'}}</span> 小于 {{ruleForm.maxPrice}} 元</div>
          <div v-if='ruleForm.maxPrice && ruleForm.minPrice'><span>{{$route.params.type==10?'退款金额':'订单金额'}}</span> {{ruleForm.minPrice}} 元 至 {{ruleForm.maxPrice}} 元 </div>
          <div>
            <div v-if='ruleForm.radio4==0'><span>订单来源</span>任意</div>
            <div v-if='ruleForm.radio4==1'><span>订单来源</span>WAP</div>
            <div v-if='ruleForm.radio4==2'><span>订单来源</span>PC</div>
            <div v-if='ruleForm.radio4==3'><span>订单来源</span>JHS</div>
          </div>
          <div>
            <span>收货地址</span>
            {{cityStr ? cityStr :'任意'}}
          </div>
          <div v-if='!ruleForm.excludeFileName && !ruleForm.specifyFileName'><span>订单商品范围</span> 任意 </div>
          <div v-if='ruleForm.specifyFileName &&!ruleForm.excludeFileName'><span>订单商品范围</span> 包含“{{ruleForm.specifyFileName}}” </div>
          <div v-if='ruleForm.excludeFileName && !ruleForm.specifyFileName'><span>订单商品范围</span> 排除“{{ruleForm.excludeFileName}}” </div>
          <div v-if='ruleForm.excludeFileName && ruleForm.specifyFileName'><span>订单商品范围</span>  包含“{{ruleForm.specifyFileName}}”  ,  排除“{{ruleForm.excludeFileName}}” </div>
        </div>
        <div class="mb">
          <h2>短信模板  </h2>  
          <div><span>短信签名</span>{{ruleForm.signName}}</div>
          <div><span>短信内容</span>{{ruleForm.textarea}} {{ruleForm.unsubscribe}}</div>

        </div>
      </div> 
    </div>
</template>

<script>
export default {
  name: 'Sell',
  data () {
    return {
      sendCount:0,
      suc:true,
      selCityStr:'',
      cityStr:'',
      chooses:{
        active1 : false,
        active2 : true,
        active3 : false,
      },
      themeForm:{
        content:''
      },
      trueCity:true,
      secCity:'',
      list:[],
      checkAll:[],
      checkOne:[],
      pro:[],
      sc1:true,
      sc2:true,
      // ruleForm.checkList:['任意'],
      num1:0,
      num2:0,
      tags:[],
      msgContent:'',
      group:[],
      checkboxGroup:[],
      id:'',
      toggle:0,
      //子流程
      children:[],
      // 测试短信内容
      content:'',
      contentType:false,
      photo:'',
      sign:'',
      sendCost:'',
      payMoney:'',
      roi:'',
      reoprtTableData:[],
      report:{
        actName:'',
        roiTime:[],
        id:'',
        // createTime:''
      },
      rep:false,
      //短信内容
      sms:'',
      //指定只能选择当前时间之后的时间
      pickerOptions0:{ 
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的 
        }
      },
      pickerOptions1:{ 
        // disabledDate:(time)=> {
        //   return time.getTime() < new Date(this.report.createTime).getTime()- 8.64e7
        // },
        shortcuts: [{
            text: '过去1天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
              console.log(picker)
            }
          }, {
            text: '过去7天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 70);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '过去30天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
      },
      date:'',
      //搜索框需要参数
      actName:'',
      // photo:'',
      // 短信字数
      num:0,
      //数据的个数
      total:0,
      //列表页搜索框数据
      value3:'',
      //表单数据
      money2:false,
      ruleForm: {
        signName:'',
        checkList:['任意'],
        str:'',
        citys:[],
        pros:[],
        minPrice:'',
        maxPrice:'',
        radio1:0,
        radio2:0,
        radio3:0,
        radio4:0,
        select:'大于',
        money1:'',
        money2:'',
        startTime:'',
        endTime:'',
        mb:'',
        actName:'',
        sign:'',
        textarea:'',
        time1:[],
        time2:['08:40','21:00'],
        roiTime:[],
        time3:[],
        marketingPlanId:'',
        innerHTML:'',
        specifySkuCodes:'',
        excludeSkuCodes:'',
        specifyFileName:'',
        excludeFileName:'',
        unsubscribe:''
      },
      look:false,
      //新建控件显示否
      none:'true',
      //下拉菜单选择
      select:'活动名称',
      //列表页的时间选择
      value4:'',

      //在上边提示
      labelPosition: 'top',

      //测试短信框 显示否
      csdialogVisible: false,
      //短信内容 显示否
      smsdialogVisible:false,
      //选择省市按钮禁用  否
      cityDis:true,
      //选择省市开关
      cityToggle:false,
      //营销活动列表数据
      tableData: [],
      //第几页
      currentPage : 1,
      //每页的容量
      pageSize : 10,
      //店铺列表
      shopList:[],
      //主题列表
      themeList:[],
      //签名列表
      signList:[],
      //禁用
      fileList1: [],
      fileList2: [],
      file1:{},
      file2:{},
      excelData:[],
    }
  },
  created(){
    this.getMore(this.$route.params.id)
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    }
  },
  mounted(){
  },
  watch:{
    shopId:{
      handler:function(n,o){
        if(n!=o){
        }
      }
    }
  },
  methods:{    


    //查询短信营销详情  事件
    getMore(marketingPlanId){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/customer/care/config/detail?marketingPlanId=' + marketingPlanId,
      }).then(res => {
          console.log("详情", res);
          if(res.data.code ==1){
            this.ruleForm.unsubscribe = res.data.data.unsubscribe

            this.ruleForm.hours = res.data.data.wait_hour

            this.ruleForm.minutes = res.data.data.wait_minute

            this.ruleForm.day = res.data.data.wait_day

            this.ruleForm.hours = res.data.data.wait_hour
            
            this.ruleForm.time3.push(res.data.data.order_create_start_time_str)
            this.ruleForm.time3.push(res.data.data.order_create_end_time_str)
            //id
            this.ruleForm.marketingPlanId = res.data.data.marketing_plan_id
             if(res.data.data.delivery_cities){
              
              this.ruleForm.radio1 = 1
              this.checkOne = res.data.data.delivery_cities.split(',');
              this.ruleForm.pros = JSON.parse(res.data.data.delivery_cities_json)
              console.log('获取的城市列表',this.ruleForm.pros)
              // console.log(this.checkOne)  
              this.getCityStr()      

            }else{
              this.ruleForm.radio1 = 0
              this.checkOne=[];
            }

            this.ruleForm.marketingPlanId = res.data.data.marketing_plan_id
            


            if(res.data.data.specify_sku_codes && res.data.data.exclude_sku_codes){
              this.ruleForm.checkList=['1','2']
              this.sc1 = false
              this.sc2 = false
              this.fileList1=[{name:res.data.data.specify_file_name}]
              this.fileList2=[{name:res.data.data.exclude_file_name}]
            }
            if(res.data.data.specify_sku_codes  && !res.data.data.exclude_sku_codes){
              this.ruleForm.checkList=['1']
              this.sc1 = false
              this.fileList1=[{name:res.data.data.specify_file_name}]
            }
            if(!res.data.data.specify_sku_codes  && res.data.data.exclude_sku_codes){
              this.ruleForm.checkList=['2']
              this.sc2 = false
              this.fileList2=[{name:res.data.data.exclude_file_name}]
            }
            if(!res.data.data.specify_sku_codes  && !res.data.data.exclude_sku_codes){
              this.ruleForm.checkList=['任意']
              this.sc1 = true
              this.sc2 = true
              this.fileList1=[]
              this.fileList1=[]

            }
            this.ruleForm.specifyFileName =   res.data.data.specify_file_name
            this.ruleForm.excludeFileName =  res.data.data.exclude_file_name 
            this.ruleForm.specifySkuCodes =   res.data.data.specify_sku_codes
            this.ruleForm.excludeSkuCodes =  res.data.data.exclude_sku_codes
            //包含商品
            // this.fileList1 = [res.data.data.specify_file_name] 
            // //排除商品
            // this.fileList2 = [res.data.data.exclude_file_name] 
            //活动
            this.ruleForm.actName = res.data.data.marketing_plan_name

            //短信
            this.ruleForm.textarea = res.data.data.sms_content
            //签名
            this.ruleForm.sign = res.data.data.notice_register_id
            this.ruleForm.signName = res.data.data.signature
            console.log(this.ruleForm.sign)
            //是否定时
            this.ruleForm.radio2 = res.data.data.end_time_str == '2099-01-01 00:00:00'? 0 : 1
            //定时的时间
            
            this.ruleForm.time1[0]=(res.data.data.start_time_str)
            this.ruleForm.time1[1]=(res.data.data.end_time_str)
            this.ruleForm.time2 = [];
            this.ruleForm.time2.push(res.data.data.day_start_time)
            this.ruleForm.time2.push(res.data.data.day_end_time)
            // console.log(this.ruleForm.time2)

            //退款金额
            this.ruleForm.maxPrice = res.data.data.max_price
            this.ruleForm.minPrice = res.data.data.min_price
            if(!res.data.data.min_price && !res.data.data.max_price){
              this.ruleForm.radio3 = 0;
            }
            if(res.data.data.min_price || res.data.data.max_price){
              this.ruleForm.radio3 = 1;
              if(res.data.data.min_price && !res.data.data.max_price){
                this.ruleForm.select = '大于'
                this.ruleForm.money1 = res.data.data.min_price
              }
              if(!res.data.data.min_price && res.data.data.max_price){
                this.ruleForm.select = '小于'
                this.ruleForm.money1 = res.data.data.max_price
              }
              if(res.data.data.min_price && res.data.data.max_price){
                this.ruleForm.select = '介于'
                this.ruleForm.money1 = res.data.data.min_price
                this.ruleForm.money2 = res.data.data.max_price
              }
            }
            //退款来源
            switch(res.data.data.order_source){
              case '' : this.ruleForm.radio4 = 0;break;
              case 'WAP' : this.ruleForm.radio4 = 1;break;
              case 'PC' : this.ruleForm.radio4 = 2;break;
              case 'JHS' : this.ruleForm.radio4 = 3;
            }

            }
      }
      )
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    // 点击返回按钮
    back(type){
      console.log(type)
      switch (type*1){
        case 10 :
          this.$router.push({
            name:'returnGoodsReminder'
          })
          break;
        case 8 :
        this.$router.push({
            name:'advabceReminder'
          })
          break;
        case 7 :
        this.$router.push({
            name:'productRepurchaseReminder'
          })
          break;
        case 6 :
        this.$router.push({
            name:'signReminder'
          })
          break;
        case 2 :
        this.$router.push({
            name:'paymentThank'
          })
          break;
        case 1 :
        this.$router.push({
            name:'orderUrge'
          })
          break;
        case 3 :
        this.$router.push({
            name:'deliveryReminder'
          })
          break;
      }
     
      
    },
    
    getCityStr(){
      this.cityStr=''
      this.ruleForm.pros.forEach(pro=>{
        if(pro.sign){
          if(pro.isIndeterminate){
            this.cityStr+=(pro.name+'部分城市(')
            pro.children.forEach(city=>{
              if(city.ischecked){
                this.cityStr+=(city.name+'、')
              }
            })
              this.cityStr +=')、'

          }else{
            this.cityStr +=(pro.name+'、')
          }
        }else{

        }
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;


  .look{
    margin: 0 20px;
    .head{
        height: 72px;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        padding: 0 30px;
        color: #333333;
        letter-spacing: 0.5px;
        line-height: 72px;
           
    h1{
        opacity: 0.87;
        font-size: 18px;
        color: #000;
        letter-spacing: 0;
        line-height: 42px;
        height: 42px;
        font-weight: bold;
        padding: 0 ;
        span{
          border-left: 1px solid #ccc;
          padding: 0 20px
        }
        i{
          font-weight: bold;
          margin-right: 20px;
          cursor: pointer;
        }
      }
      
    .el-breadcrumb{
      line-height: 30px;
      margin-left: 0px;
      margin-right: 20px
    }
      }

    .box{
      padding-bottom: 30px;

      h2{
          font-size: 14px;
          color: #333333;
          font-size: 14px;
          height: 50px;
          line-height: 50px;
        }
      background: #FFFFFF;
      box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
      .head{
        height: 60px;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        padding: 0 30px;
        color: #333333;
        letter-spacing: 0.5px;
        line-height: 60px;
      }
      .baseMsg{
        border-bottom: 1px solid #ccc;
        margin: 0 30px ;
        color: #333333;
        padding-bottom: 20px;
        letter-spacing: 0.5px;
        div{
          height: 30px;
          line-height: 30px;
          span{
            font-size: 12px;
            color: #999999;
            line-height: 12px;
            margin-right: 20px;
          }
        }
      }
      .condition{
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
        margin: 0 30px ;
        color: #333333;
        letter-spacing: 0.5px;
        div{
          height: 30px;
          line-height: 30px;
          span{
            font-size: 12px;
            color: #999999;
            line-height: 12px;
            margin-right: 20px;
          }
        }
      }
      .mb{
        border-bottom: 1px solid #ccc;
        margin: 0 30px ;
        padding-bottom: 20px;
        color: #333333;
        letter-spacing: 0.5px;
        div{
          // height: 30px;
          line-height: 30px;
          span{
            font-size: 12px;
            color: #999999;
            line-height: 12px;
            margin-right: 20px;
          }
        }
      }
    }
  }

</style>
