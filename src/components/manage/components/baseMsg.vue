<template>
  <div class="base">
    <el-form-item label="性别：" prop=''  label-position="left" v-if="changeValue.value1">
      <el-radio-group v-model="form.sex">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="0">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="生日：" prop=''  label-position="left" v-if="changeValue.value2">
      <el-select v-model="form.birthCondition" class placeholder="请选则筛选条件">
        <el-option
          v-for="item in birthConditions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-date-picker
        v-if="form.birthCondition==1||form.birthCondition==3"
        v-model="form.date"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="请选择日期"
      ></el-date-picker>
      <el-date-picker
        v-if="form.birthCondition==2"
        v-model="form.daterange"
        type="daterange"
        value-format="yyyy-MM-dd"

        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="手机号：" prop=''  label-position="left" v-if="changeValue.value3">
      <el-select
        v-model="form.mobile"
        placeholder="请选择手机号码前缀"
        class
        multiple
        :collapse-tags="true"
        @change="changeStaff"
      >
        <el-option v-for="item in mobiles" :key="item.id" :label="item.name" :value="item.id">
          <!-- <el-checkbox  v-model="item.checked">{{ item.name }}</el-checkbox> -->
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="积分：" prop label-position="left" v-if="changeValue.value4">
      <el-select v-model="form.pointType" class placeholder="请选则筛选条件">
        <el-option v-for="item in pointTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>

      <el-select v-model="form.pointCondition" class v-if="form.pointType" placeholder="请选则筛选条件">
        <el-option
          v-for="item in pointConditions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <p
        style="display:inline-block;width:20%"
        v-if="form.pointType &&( form.pointCondition==3|| form.pointCondition==1)"
      >
        <el-input v-model="form.point" placeholder="请输入积分数量"></el-input>
      </p>

      <p style="display:inline-block;width:40%" v-if="form.pointType && form.pointCondition==2">
        <el-input style="width:40%" v-model="form.minPoint" placeholder="请输入积分数量最小值"></el-input>-
        <el-input placeholder="请输入积分数量最大值" style="width:40%" v-model="form.maxPoint"></el-input>
      </p>
    </el-form-item>
    <el-form-item label="等级：" prop label-position="left" v-if="changeValue.value5">
      

      <el-select
        v-model="form.store"
        placeholder="请选择商户"
        filterable
        class="level"
        @change="changeStore"
      >
        <el-option
          v-for="item in stores"
          :key="item.api_merchant_id"
          :label="item.api_merchant_name"
          :value="item.api_merchant_id"
        ></el-option>
      </el-select>


        
      <el-select v-model="form.levelType" v-if="form.store"  class placeholder="请选则筛选条件">
        <el-option v-for="item in levelTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>

      <el-select
        v-if="form.levelType"
        v-model="form.level"
        multiple
        placeholder="请选择会员等级"
        filterable
        class="level"
        collapse-tags
      >
        <el-option
          v-for="item in levelList.filter((val)=>{if(val.levelSwitch==1){return val.levelSwitch}})"
          :key="item.apiCustomerLevelConfId"
          :label="item.customerLevelName"
          :value="item.apiCustomerLevelConfId"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="地区：" prop label-position="left" v-if="changeValue.value6">
      <el-select v-model="form.pro" class @change="changePro" placeholder="请选择省份">
        <el-option v-for="item in pros" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>

      <el-select
        v-if="form.pro"
        v-model="form.city"
        placeholder="请选择城市"
        filterable
        class="level"
        @change="changeCity"
      >
        <el-option v-for="item in citys" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="入会时间：" prop label-position="left " v-if="changeValue.value7">
      <el-select v-model="form.entryTimeCondition" class placeholder="请选择筛选条件">
        <el-option
          v-for="item in birthConditions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-date-picker
        v-if="form.entryTimeCondition==1||form.entryTimeCondition==3"
        v-model="form.entryTime"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="请选择日期"
      ></el-date-picker>

      <el-date-picker
        v-if="form.entryTimeCondition==2"
        v-model="form.entryTimerange"
        type="daterange"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="邮箱：" prop label-position="left" v-if="changeValue.value8">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="form.checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <el-checkbox-group
        v-model="form.checkedCities"
        @change="handleCheckedCitiesChange"
        style="display:inline-block"
      >
        <el-checkbox label="@qq.com"></el-checkbox>
        <el-checkbox label="@163.com"></el-checkbox>
        <el-checkbox label="@sina.com"></el-checkbox>
        <el-checkbox label="其他"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="客户来源：" prop label-position="left" v-if="changeValue.value9">
      <el-select v-model="form.sourceCondition" class placeholder="请选则筛选条件">
        <el-option v-for="item in levelTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select v-model="form.source" class placeholder="请选则客户来源" v-if="form.sourceCondition">
        <el-option v-for="item in sources" :key="item.marketingPlaceCode" :label="item.marketingPlaceName" :value="item.marketingPlaceCode"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
  import Bus from '../../../module/bus.js'

export default {
  props:[
    'changeValue','rules'
  ],
  data() {
    return {
      // rules:{
      //   sex: [
      //     { required: true,  trigger: 'change' ,message:'请选择性别'}
      //   ],
      //   date: [
      //     { required: true,  trigger: 'change' ,message:'请选择生日日期'}
      //   ],
      //   daterange:[
      //     { required: true,  trigger: 'change' ,message:'请选择生日区间'}
      //   ]
      // },
    //   value1: false,
      //是否全选 （邮箱）
      //选中的邮箱
      isIndeterminate: false,
      pros: [],
      citys: [],
      stores: [],
      levelList: [],
      isContainAll: false,
      sources: [
        {
          name: "source1",
          id: 1
        },
        {
          name: "source2",
          id: 2
        }
      ],
      levelTypes: [
        {
          name: "包含",
          id: 1
        },
        {
          name: "不包含",
          id: 2
        }
      ],
      pointTypes: [
        // ”、、“ 筛选条件 “介于、大于、小于”
        // （互动积分:INTERACTION,交易积分:TRADE,全部积分:ALL）
        {
          name: "全部积分",
          id: 'ALL'
        },
        {
          name: "互动积分",
          id: 'INTERACTION'
        },
        {
          name: "交易积分",
          id: 'TRADE'
        }
        
      ],
      pointConditions: [
        {
          name: "大于",
          id: 1
        },
        {
          name: "介于",
          id: 2
        },
        {
          name: "小于",
          id: 3
        }
      ],
      mobiles: [
        {name: "全部",id: '-1'},
        {name: "130",id: '130'},
        {name: "131",id: '131'},
        {name: "132",id: '132'},
        {name: "133",id: '133'},
        {name: "134",id: '134'},
        {name: "135",id: '135'},
        {name: "136",id: '136'},
        {name: "137",id: '137'},
        {name: "138",id: '138'},
        {name: "139",id: '139'},
        {name: "145",id: '145'},
        {name: "146",id: '146'},
        {name: "147",id: '147'},
        {name: "148",id: '148'},
        {name: "149",id: '149'},
        {name: "150",id: '150'},
        {name: "151",id: '151'},
        {name: "152",id: '152'},
        {name: "153",id: '153'},
        {name: "155",id: '155'},
        {name: "156",id: '156'},
        {name: "157",id: '157'},
        {name: "158",id: '158'},
        {name: "159",id: '159'},
        {name: "165",id: '165'},
        {name: "166",id: '166'},
        {name: "170",id: '170'},
        {name: "171",id: '171'},
        {name: "172",id: '172'},
        {name: "173",id: '173'},
        {name: "174",id: '174'},
        {name: "175",id: '175'},
        {name: "176",id: '176'},
        {name: "177",id: '177'},
        {name: "178",id: '178'},
        {name: "180",id: '180'},
        {name: "181",id: '181'},
        {name: "182",id: '182'},
        {name: "183",id: '183'},
        {name: "184",id: '184'},
        {name: "185",id: '185'},
        {name: "186",id: '186'},
        {name: "187",id: '187'},
        {name: "188",id: '188'},
        {name: "189",id: '189'},
        {name: "191",id: '191'},
        {name: "198",id: '198'},
        {name: "199",id: '199'},
        {name: "其他",id: '0'},

      ],
      //生日条件
      birthConditions: [
        {
          name: "早于",
          id: 1
        },
        {
          name: "介于",
          id: 2
        },
        {
          name: "晚于",
          id: 3
        }
      ],
      form: {
        checkAll: false,
        checkedCities: [],
        //分组名称
        name: "",
        //分组目录
        catalog: "",
        // 性别
        sex: "",
        //生日条件
        birthCondition: "",
        //生日日期范围
        daterange: [],
        //大于 小于 时的时候的生日日期
        date: "",
        //手机号包含否
        mobileType:'',
        //手机号
        mobile: [],
        // 积分类型
        pointType: "",
        // 积分条件
        pointCondition: "",
        // 介于时的  积分范围
        minPoint: "",
        maxPoint: "",
        // 大于小于时的积分 数量
        point: "",
        //等级类型
        levelType: "",
        //等级里面的商户
        store: "",
        //多选的等级
        level: [],
        //省份
        pro: "",
        //城市
        city: "",
        //入会时间条件
        entryTimeCondition: "",
        //介于时 入会时间的范围
        entryTimerange: [],
        //大于小于时 的入会时间
        entryTime: "",
        //客户来源的条件
        sourceCondition: "",
        //客户来源
        source: ""
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
    'form.mobile':{
      handler:function(n,o){
        for(var i=0;i<n.length;i++){
          if(n[i]==0){
            this.form.mobileType =0
            break;
          }else{
            this.form.mobileType =1
            continue;
          }
        }
        // console.log(this.form.mobileType)
      },
      deep:true
    },
    
    'form.store':{
      handler:function(n,o){
        this.getLevelList(n)
      },
      deep:true
    },
    'form.checkedCities':{
      handler:function(n,o){
        if(n.length){
          if(n.length == 4){
            this.isIndeterminate = false;
            this.form.checkAll = true
          }else{
            this.isIndeterminate = true;
            this.form.checkAll = false
          }
        }else{
          this.isIndeterminate = false;
          this.form.checkAll = false
        }
        // console.log(n.length )
        
      },
      deep:true
    },
    changeValue:{
      handler:function(n,o){
        if(!n.value1){
          this.form.sex = ''
        }
        if(!n.value2){
          this.form.birthCondition = ''
          this.form.date = ''
          this.form.daterange = []
        }
        if(!n.value3){
          this.form.mobile =[]
        }
        if(!n.value4){
          this.form.pointType = ''
          this.form.point = ''
          this.form.pointCondition = ''
          this.form.minPoint = ''
          this.form.maxPoint = ''
        }
        if(!n.value5){
          this.form.store = ''
          this.form.levelType = ''
          this.form.level = []
        }
        if(!n.value6){
          this.form.pro = ''
          this.form.city = ''
        }
        if(!n.value7){
          this.form.entryTimeCondition = ''
          this.form.entryTime = ''
          this.form.entryTimerange = []
        }
        if(!n.value8){
          this.form.checkedCities = []
          this.form.isIndeterminate = false
          this.form.checkAll = false
        }
        if(!n.value9){
          this.form.sourceCondition = ''
          this.form.source = ''
        }
      },
      deep:true
    },
  },
  created() {
    // console.log(this.data) 
    // console.log(this.changeValue)
    console.log(this.rules)
    this.getCity();
    this.getStore(this.shopId);
    this.getSource()
  },
  methods: {
    handleCheckAllChange(val) {
      this.form.checkedCities = val
        ? ["@qq.com", "@163.com", "@sina.com", "其他"]
        : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.form.checkAll = checkedCount === 4;
      this.isIndeterminate = checkedCount > 0 && checkedCount < 4;
    },
    //改变省份
    changePro(val) {
      // console.log(val);
      this.pros.forEach(item => {
        if (val == item.name) {
          this.citys = item.children;
          // console.log(this.citys);
          this.form.city = "";
        }
      });
    },
    //获取渠道
    getSource(){
    
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/place/list" 
      })
      .then(res => {
        // console.log("渠道list", res);
        if(res.data.code==1){
          this.sources = res.data.data;

        }
      })
      .catch(error => {
        console.log(error);
        alert("系统异常");
      });
    },
    //获取城市列表
    getCity() {
      this.$http({
        method: "get",
        url: "static/city.json"
      })
        .then(res => {
          // console.log("城市list", res);
          this.pros = res.data;
        })
        .catch(error => {
          console.log(error);
          alert("系统异常");
        });
    },
    //改变商户
    changeStore(val) {
      this.getLevelList(val);
    },
    changeCity(){},
    //获取商户
    getStore(shopid) {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/merchantIds?shopId=" + shopid
      })
        .then(res => {
          // console.log("商户列表", res);
          if (res.data.code == 1) {
            this.stores = res.data.data;
            // if(res.data.data.length!=0){
            //     this.store = this.store[0].api_merchant_id;
            //     this.getLevelList(this.store[0].api_merchant_id)
            // }else{

            // }
          } else {
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    //获取等级列表
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
          // console.log("等级列表", res); 
          if (res.data.code == 1) {
            this.levelList = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    changeStaff() {
      //等级
      if (this.isContainAll) {
        // 只有下拉框的值发生了变化才会进入此方法
        // 如果之前选中了全部，则变化后肯定不包含全部了
        this.isContainAll = false;
        // 则删除第一个全部
        this.form.mobile.splice(0, 1);
      } else {
        // 如果之前没有选中全部
        // 判断此次是否选中了全部
        this.isContainAll = this.form.mobile.some(value => value === '-1');
        // 如果此次选中了全部
        if (this.isContainAll) {
          // 则去除其他，只保留全部，默认value=-1 是全部
          this.form.mobile = ['-1'];
        } else {
          // 如果当前不包含全部，则判断是否其他的等级全选了
          if (this.form.mobile.length === this.mobiles.length - 1) {
            // 如果其他员工全选了，则也将当前置为全部
            this.form.mobile = ['-1'];
            this.isContainAll = true;
          }
        }
      }
    }
  },
  mounted(){
    Bus.$on('tagData',(data)=>{
      // console.log(data)
      if(data[0]){
        // 性别
        this.form.sex = data[0].basicSex;
        // 生日
        if(data[0].basicBirthdayEnd && data[0].basicBirthdayStart){
          this.form.birthCondition =2
          this.form.date = ''
          this.form.daterange = [ data[0].basicBirthdayStart,data[0].basicBirthdayEnd ]
        }else if(data[0].basicBirthdayEnd && !data[0].basicBirthdayStart){
          this.form.birthCondition =3
          this.form.date = data[0].basicBirthdayEnd
          this.form.daterange = []

        }else if(!data[0].basicBirthdayEnd && data[0].basicBirthdayStart){
          this.form.birthCondition =1
          this.form.date = data[0].basicBirthdayStart
          this.form.daterange = []

        }else{
          this.form.birthCondition =''
          this.form.date = ''
          this.form.daterange = []
        }
        //手机号码
        if(data[0].basicMobileType ==1 ){
          this.form.mobile = data[0].basicMobile.split(',')
            // console.log(this.form.mobile)

        }else{
          if(data[0].basicMobile){
            if(data[0].basicMobile == "130,131,132,133,134,135,136,137,138,139,145,146,147,148,149,150,151,152,153,155,156,157,158,159,165,166,170,171,172,173,174,175,176,177,178,180,181,182,183,184,185,186,187,188,189,191,198,199"){
              this.form.mobile = ['-1']
              console.log('全选')
            }else{
              console.log('非全选')

              this.form.mobile = data[0].basicMobile.split(',')
              this.form.mobile.push('0')
              console.log(this.form.mobile)
            }
          }else{
            this.form.mobile = []
          }
        }
        //积分

        this.form.pointType = data[0].basicPointType
        if(data[0].basicMinPoint && data[0].basicMaxPoint){
          this.form.pointCondition = 2

          this.form.maxPoint = data[0].basicMaxPoint
          this.form.minPoint = data[0].basicMinPoint
        }else if(!data[0].basicMinPoint && data[0].basicMaxPoint){
          this.form.pointCondition = 1

          this.form.maxPoint = data[0].basicMaxPoint
          this.form.minPoint = ''
        }else if(data[0].basicMinPoint && !data[0].basicMaxPoint){
          this.form.pointCondition = 3

          this.form.minPoint = data[0].basicMinPoint
          this.form.maxPoint = ''
        }else{
          this.form.pointCondition = ''
          this.form.point = ''
          this.form.maxPoint = ''
          this.form.minPoint = ''
        }

        //商户
        this.form.store = data[0].basicStore

        this.form.levelType = data[0].basicGradeType
        var arr =[]
        data[0].basicGrade.split(',').forEach(item=>{
          arr.push(item*1)
        })
        this.form.level =arr 


        //地区 
        this.form.pro = data[0].basicProvince
        this.changePro(this.form.pro)
        this.form.city = data[0].basicCity


        //入会时间
        // basicMemberStartTime
        if(data[0].basicMemberStartTime && data[0].basicMemberEndTime){
          this.form.entryTimeCondition = 2
          this.form.entryTimerange = [data[0].basicMemberStartTime,data[0].basicMemberEndTime]
          this.form.entryTime = ''
        }else if(!data[0].basicMemberStartTime && data[0].basicMemberEndTime){
          this.form.entryTimeCondition = 3
          this.form.entryTimerange = []
          this.form.entryTime = data[0].basicMemberEndTime
        }else if(data[0].basicMemberStartTime && !data[0].basicMemberEndTime){
          this.form.entryTimeCondition = 1
          this.form.entryTimerange = []
          this.form.entryTime = data[0].basicMemberStartTime
        }else{
          this.form.entryTimeCondition = ''
          this.form.entryTimerange = []
          this.form.entryTime = ''
        }

        //邮件
        if(data[0].basicEmailType===0){
          if(data[0].basicEmail == '@sina.com' ){
            this.form.checkedCities = ['@qq.com','@163.com','其他']
            this.checkAll = false

          }
          if(data[0].basicEmail == '@qq.com' ){
            this.form.checkedCities = ['@sina.com','@163.com','其他']
            this.checkAll = false

          }
          if(data[0].basicEmail == '@163.com' ){
            this.form.checkedCities = ['@qq.com','@sina.com','其他']
            this.checkAll = false

          }
          

          if(data[0].basicEmail.indexOf( '@sina.com')!=-1 && data[0].basicEmail.indexOf( '@163.com')!=-1 && data[0].basicEmail.indexOf( '@qq.com')!=-1){
            this.form.checkedCities = ['其他']
            this.checkAll = false

          }
          if(data[0].basicEmail.indexOf( '@sina.com')==-1 && data[0].basicEmail.indexOf( '@163.com')!=-1 && data[0].basicEmail.indexOf( '@qq.com')!=-1){
            this.form.checkedCities = ['@sina.com','其他']
            this.checkAll = false

          }
          if(data[0].basicEmail.indexOf( '@sina.com')!=-1 && data[0].basicEmail.indexOf( '@163.com')==-1 && data[0].basicEmail.indexOf( '@qq.com')!=-1){
            this.form.checkedCities = ['@163.com','其他']
            this.checkAll = false

          }
          if(data[0].basicEmail.indexOf( '@sina.com')!=-1 && data[0].basicEmail.indexOf( '@163.com')!=-1 && data[0].basicEmail.indexOf( '@qq.com')==-1){
            this.form.checkedCities = ['@qq.com','其他']
            this.checkAll = false
          }
        }
        if(data[0].basicEmailType==1){
          if(data[0].basicEmail == '' ){
            this.form.checkedCities = ['@163.com','@qq.com','@sina.com','其他']
            this.checkAll = true
          }else{
            this.form.checkedCities =data[0].basicEmail.split(',')
          }
        }
         

        //客户来源
        
        this.form.sourceCondition = data[0].basicMemberSourceType 
        // basicMemberSourceType  basicMemberSource
        this.form.source = data[0].basicMemberSource

      }
    })
  }
}
</script>
