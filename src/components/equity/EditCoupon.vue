<template>
    <!-- 添加新增控件 -->
    <div class="addCoupon" >
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>客户权益</el-breadcrumb-item>
          <el-breadcrumb-item>优惠券规则</el-breadcrumb-item>
          <el-breadcrumb-item >编辑优惠券规则</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>
          <i class="el-icon-back" @click="back"></i>
          <span >编辑优惠券规则</span>
          <!-- <span v-if="form.merchantPointConfigId">编辑优惠券规则</span> -->
        </h1>
      </div>
      <div class="form">
        <el-form
          :model="form"
          ref="form"
          label-width="100px"
          class="demo-form"
          label-position="top"
          :rules='rules'
        >
          <div class="baseMsg">
            <h2>基本信息</h2>
            <el-form-item label="规则名称" prop="name">
              <el-input v-model="form.name" class="name" :disabled="true" maxlength='10'></el-input>
            </el-form-item>
            <el-form-item label="规则生效时间" prop="time">
              <el-date-picker
                prefix-icon="el-icon-date"
                v-model="form.time"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="关联优惠券活动" prop="acts">
              <el-select
                v-model="form.acts"
                placeholder="请选择优惠券活动"
                filterable
                class="level"
                @change='changeAct'
              >
                <el-option
                  v-for="item in acts"
                  :key="item.activityId"
                  :label="item.activityName"
                  :value="item.activityId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="等级" prop="level">
              <el-select
                @change="changeStaff()"
                v-model="form.level"
                multiple
                placeholder="请选择等级"
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
          </div>
          <div class="mb">
            <h2>发放规则</h2>
            <el-form-item label="优惠券类型" prop='type'>
              <el-radio-group v-model="form.type" >
                <el-radio label="POINT_COUPON">积分优惠券</el-radio>
                <el-radio label="BIRTHDAY_COUPON">生日优惠券</el-radio>
                <el-radio label="LEVEL_UP_COUPON">等级优惠券</el-radio>
              </el-radio-group>
            </el-form-item>
            

            <!-- 积分优惠券 -->
            <el-form-item label="所需积分值" prop="num" class="num" v-if="form.type=='POINT_COUPON'">
             <p> <el-input v-model="form.num" maxlength='6'></el-input> 分</p>
            </el-form-item >
            <!-- <el-form-item label='优惠券生效时间' prop="date" v-if="form.type=='POINT_COUPON'">
              <el-tooltip class="item" effect="dark" content="若兑换当天生效填写0"  style="position:relative;left:120px;top:-50px">
                  <i class="iconfont iconwenhao"></i>
              </el-tooltip>
              <p style="position:absolute;left:0;top:0;width:100%">客户获取后第 <el-input v-model="form.date" class="date" maxlength='6'></el-input> 天生效</p> 
            </el-form-item > -->
            <el-form-item label="是否退货返还" prop='type'>
              <el-radio-group v-model="form.ret" >
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- 生日优惠券 -->
            <!-- 优惠券发放选项 -->
            <el-form-item label="优惠券发放"  class="" v-if="form.type=='BIRTHDAY_COUPON'" :prop="!form.radio1 ? 'radio1' : form.radio1==2?'day1':'day2'">
              <el-radio-group v-model="form.radio1" >
                <el-radio :label="2" :disabled="dis2">
                  生日当月 <el-input v-model="form.day1" class="day" maxlength='2' :disabled="dis2"></el-input> 日 
                </el-radio>
                <el-radio :label="1" :disabled="dis1">
                  距离生日 <el-input v-model="form.day2" class="day" maxlength='2' :disabled="dis1"></el-input> 天 
                </el-radio>
              </el-radio-group>
            </el-form-item >
            <!-- 是否补发 -->
            <el-form-item label="是否补发" prop="radio2" class="" v-if="form.type=='BIRTHDAY_COUPON'" >
              <el-tooltip class="item" effect="dark" content="生日前不满足等级规则要求，生日当天及以后满足优先补发符合的规则，并且只补发生日距离规则执行30天以内的客户"  style="position:relative;left:80px;top:-50px">
                  <i class="iconfont iconwenhao"></i>
              </el-tooltip>
              <el-radio-group v-model="form.radio2" style="position:absolute;left:0;top:0;width:100%;">
                <el-radio :label="1">
                  是
                </el-radio>
                <el-radio :label="-1">
                  否
                </el-radio>
              </el-radio-group>
            </el-form-item >

            <!-- 等级优惠券 -->
            <el-form-item label="优惠券发放" prop="day3" class="" v-if="form.type=='LEVEL_UP_COUPON'" >
                  升级后第 <el-input v-model="form.day3" maxlength='6' class="date"></el-input> 天 
            </el-form-item >

          </div>
          <el-form-item class="sub">
            <el-button @click="back">取消</el-button>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  name: "EditCoupon",
  data() {
    return {
      acts:[],
      rules:{
        name: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?]{1,10}$/;
              if (value.length == 0) {
                callback(new Error("优惠券规则名称不能为空"));
              } else {
                if (!reg.test(value)) {
                  callback(new Error("优惠券规则名称不能包含特殊字符"));
                }else{
                  callback();
                }
              }
            }
          }
        ],
        time:[
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              console.log(value)
              if (value.length == 0) {
                callback(new Error("规则时间不能为空"));
              } else {
                if (new Date(value[0]).getTime()>=new Date(value[1]).getTime()) {
                  callback(new Error("开始时间应早于结束时间"));
                }else{
                  callback();
                }
              }
            }
          }
        ],
        acts:[
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              console.log(value)
              if (!value) {
                callback(new Error("请选择关联活动"));
              } else {
                callback();
              }
            }
          }
        ],
        type:[
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              console.log(value)
              if (!value) {
                callback(new Error("请选择优惠券类型"));
              } else {
                callback();
              }
            }
          }
        ],
        level:[
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              console.log(value)
              if (value.length==0) {
                callback(new Error("请选择等级"));
              } else {
                callback();
              }
            }
          }
        ],
        num:[
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              console.log(value)
              var reg =/^(([0-9])|([1-9][0-9]{0,5}))$/
              if (!value) {
                callback(new Error("请输入所需积分值"));
              } else {
                console.log(reg.test(value))
                if(reg.test(value)){
                    callback();
                }else{
                  callback(new Error("请输入正确的积分值(整数1-999999)"));
                }
              }
            }
          }
        ],
        date:[
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              console.log(value)
              var reg =/^(([0-9])|([1-9][0-9]{0,5}))$/

              // var reg = /^(0|[1-9][0-9]{0,5}$)/
              if (!value) {
                callback(new Error("请输入天数"));
              } else {
                if(reg.test(value)){
                  // if(value.indexOf('.')!=-1){
                  //   callback(new Error("请输入正确的天数(整数0-999999)"));
                  // }else{
                    callback();
                  // }
                }else{
                  callback(new Error("请输入正确的天数(整数0-999999)"));
                }
              }
            }
          }
        ],
        day1:[
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              var reg =/^(([1-9])|((1|2)[0-9])|30|31)$/
              console.log(value)
              if (!this.form.day1) {
                callback(new Error("请输入具体日期"));
              } else {
                  if(reg.test(this.form.day1)){
                  callback();
                  }else{
                    callback(new Error("请输入正确的日期(整数1-31)"));
                  }
                }
            }
          }
        ],
        day2:[
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              console.log(value)
              var reg =/^(([0-9])|((1|2)[0-9])|30)$/
              if (!this.form.day2) {
                callback(new Error("请输入天数"));
              } else {
                  if(reg.test(this.form.day2)){
                    callback();
                  }else{
                    callback(new Error("请输入正确的日期(整数0-30)"));
                  }
                }
            }
          }
        ],
        day3:[
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              console.log(value)
              var reg =/^(([0-9])|([1-9][0-9]{0,5}))$/
              if (!value) {
                callback(new Error("请输入天数"));
              } else {
                  if(reg.test(value)){
                  callback();
                  }else{
                    callback(new Error("请输入正确的天数(整数0-999999)"));
                  }
                }
              }
          }
        ],
        radio1:[
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              console.log(value)
              if (!value) {
                callback(new Error("请选择发放形式"));
              } 
                callback();
              }
            }
        ],
      },
      dis1:false,
      dis2:false,
      //表单数据
      form:{
        unexActivityCode:'',
        unexActivityName:'',
        unexActivityId:'',
        day1:'',
        day2:'',
        day3:'',
        //优惠券发放选项
        radio1:'',
        radio2:1,
        // 优惠券规则名称
        name:'',
        //规则生效时间
        time:[],
        //关联活动
        acts:[],
        //优惠券类型
        type:'POINT_COUPON',
        // 等级
        level:[],
        //积分数量
        num:'',
        // 优惠券生效时间  多少天
        ret:1,

        date:'',
        levelStr:''
      },
      //等级列表
      levelList:[],
      levelAll:[],
      isContainAll:false
    }
  },
  created() {
    this.getLevelList(this.$route.params.apiMerchantId)
    this.getActList(this.$route.params.apiMerchantId)
    this.getMore(this.$route.params.id)
    this.getList()
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    }
  },
  watch:{
    'form.type':{
      handler:function(n,o){
        if(n!=o){
          if(this.$refs["form"]){
            this.$refs["form"].clearValidate();
          }
        }
      }
    }
  },
  methods:{
        //改变活动
    changeAct(val){
      console.log(val)
      this.acts.forEach(item=>{
        if(item.activityId==val){
          this.form.unexActivityCode = item.activityCode
          this.form.unexActivityName= item.activityName
          this.form.unexActivityId = item.activityId
        }
      })
    },
    //获取生日优惠券列表
    getList(){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/coupon/configs?pageIndex=1&pageSize=10&apiMerchantId=' + this.$route.params.apiMerchantId+'&couponType=BIRTHDAY_COUPON'
      }).then(res => {
          console.log("生日优惠券列表", res);
          if(res.data.code==1){
          var arr =   res.data.data.list.filter(item=>{if(item.state==1 || item.state==2){ return item}});
          console.log('未开始和执行中的生日优惠券列表',arr)
          if(arr.length ==0 ){
            // this.dis = false;
              this.dis1 = false
              this.dis2 = false

            // this.form.radio1=''
          }else{
            // this.dis == arr[0]
            this.form.radio1 = arr[0].openType
            if(arr[0].openType==1){
              this.form.day1 == ''

              this.dis2 = true
              this.dis1 = false
            }else{
              this.form.day2 == ''

              this.dis1 = true
              this.dis2 = false
            }
            console.log(this.form.radio1)
          }
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
    //获取详情
    getMore(id){
      this.$http
          .get(
          "" + process.env.API_ROOT + "/coupon/config/info?couponConfigId="+id,
          )
          .then(res => {
          console.log("查看结果", res);
          if (res.data.code == 1) {
              this.getLevelList(this.$route.params.apiMerchantId)
              this.form.name = res.data.data.couponName
              this.form.time.push(res.data.data.validTime) 
              this.form.time.push(res.data.data.invalidTime) 
              this.form.type = res.data.data.couponType
              this.form.acts = res.data.data.unexActivityId
              
              this.form.levelStr = res.data.data.validLevel

              if(this.form.type=='POINT_COUPON'){
                this.form.ret = res.data.data.isReturn
                this.form.num = res.data.data.couponPoint
              }else{
                this.form.ret = 1
                this.form.num = ''
              }
              if(this.form.type=='BIRTHDAY_COUPON'){
                this.form.radio1 = res.data.data.openType
                if(this.form.radio1==2){
                  this.form.day1 = res.data.data.birthdayMonthDay
                  this.form.day2 = ''
                }else{
                  this.form.day2 = res.data.data.birthdayBefor
                  this.form.day1 = ''
                }
                this.form.radio2 = res.data.data.reissue
              }else{
                this.form.day1 = ''
                this.form.day2 = ''
                this.form.radio2 = 1
                this.form.radio1 = ''
              }
              if(this.form.type=='LEVEL_UP_COUPON'){
                this.form.day3 = res.data.data.levelUpAfter
              }else{
                this.form.day3 = ''
              }
              //opentype
              this.form.radio1 = res.data.data.openType
              //是否补发
          } else {
              this.$message({
              type:'error',
              msg:res.data.msg
              })
          }
          })
          .catch(error => {
          console.log(error);
          alert("系统异常");
      });
    },
    //验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sub();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      if(this.$refs[formName]){
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      } else {
        this.$nextTick(() => {
          this.$refs[formName].resetFields();
        });
      }
      }
    },
    //获取活动列表
    getActList(apiMerchantId) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/coupon/unix/activityList?apiMerchantId=" +
          apiMerchantId
      })
        .then(res => {
          console.log("活动列表", res);
          if (res.data.code == 1) {
            this.acts = res.data.data
            this.acts.forEach(item=>{
                if(item.activityId==this.form.acts){
                  this.form.unexActivityCode = item.activityCode
                  this.form.unexActivityName= item.activityName
                  this.form.unexActivityId = item.activityId
                }
              })
          }
        })
        .catch(error => {
          console.log(error);
          alert("网络异常");
        });
    },
    //新增提交
    sub() {
      var data ={}
      if(this.form.type=='POINT_COUPON'){
        data = {
          //优惠券ID
          'couponConfigId':this.$route.params.id,
          //商户ID
          'apiMerchantId':this.$route.params.apiMerchantId,
          //活动
          'unexActivityId':this.form.unexActivityId,
          'unexActivityCode':this.form.unexActivityCode,
          'unexActivityName':this.form.unexActivityName,
          //积分类型
          'couponType':this.form.type,
          'couponName':this.form.name,
          //积分数量
          'couponPoint':this.form.num,
          'couponPrice':'',
          'validLevel':this.form.level[0] ==-1 ? this.levelAll.join(',') :this.form.level.join(','),
          //生效时间
          'validTime':this.form.time[0],
          'invalidTime':this.form.time[1],
          // 'openType':this.form.radio1,
          // 'birthdayBefor':this.form.day2,
          // 'birthdayMonthDay':this.form.day1,
          // 'levelUpAfter':this.form.day3,
          'isReturn':this.form.ret,
          //是否补发
          // 'reissue':this.form.radio2,
        }
      }else if(this.form.type=='BIRTHDAY_COUPON'){
        data = {
          //优惠券ID
          'couponConfigId':this.$route.params.id,
          //商户ID
          'apiMerchantId':this.$route.params.apiMerchantId,
          //活动
          'unexActivityId':this.form.unexActivityId,
          'unexActivityCode':this.form.unexActivityCode,
          'unexActivityName':this.form.unexActivityName,
          //积分类型
          'couponType':this.form.type,
          'couponName':this.form.name,
          //积分数量
          // 'couponPoint':this.form.num,
          'couponPrice':'',
          'validLevel':this.form.level[0] ==-1 ? this.levelAll.join(',') :this.form.level.join(','),
          //生效时间
          'validTime':this.form.time[0],
          'invalidTime':this.form.time[1],
          'openType':this.form.radio1,
          'birthdayBefor':this.form.day2,
          'birthdayMonthDay':this.form.day1,
          // 'levelUpAfter':this.form.day3,
          // 'exchangeAfter':this.form.date,
          //是否补发
          'reissue':this.form.radio2,
        }
      }else{
        data = {
          //优惠券ID
          'couponConfigId':this.$route.params.id,
          //商户ID
          'apiMerchantId':this.$route.params.apiMerchantId,
          //活动
          'unexActivityId':this.form.unexActivityId,
          'unexActivityCode':this.form.unexActivityCode,
          'unexActivityName':this.form.unexActivityName,
          //积分类型
          'couponType':this.form.type,
          'couponName':this.form.name,
          //等级
          'validLevel':this.form.level[0] ==-1 ? this.levelAll.join(',') :this.form.level.join(','),
          //生效时间
          'validTime':this.form.time[0],
          'invalidTime':this.form.time[1],
          //天数
          'levelUpAfter':this.form.day3,
        }
      }
      
      this.$http
        .post(
          "" + process.env.API_ROOT + "/coupon/config/addOrUpdate",
          data
        )
        .then(res => {
          console.log("新增结果", res);
          if (res.data.code == 1) {
            this.back()
          } else {
            this.$message({
              type: "error",
              message:res.data.msg
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert("系统异常");
        });
    },
    rowClick(){},
    changeStaff(){
      //等级
        console.log(this.levelAll.length)
        //如果所有可用的等级为一个
        if(this.levelAll.length==1){
          // 定义一个变量，用来存储当前下拉框是否选中了全部
          this.isContainAll=!this.isContainAll
            console.log(this.isContainAll)

          if (this.isContainAll) {
            this.form.level = [-1]
          }else{
            this.isContainAll = false
                  // 则删除第一个全部
            this.form.level.splice(0, 1)
          }
        }else{
          if (this.isContainAll) {
            // 只有下拉框的值发生了变化才会进入此方法
            // 如果之前选中了全部，则变化后肯定不包含全部了


                  this.isContainAll = false
                  // 则删除第一个全部
                  this.form.level.splice(0, 1)

          } else {
            // 如果之前没有选中全部
            // 判断此次是否选中了全部
            this.isContainAll = this.form.level.some(value => value === -1)
            // 如果此次选中了全部
            if (this.isContainAll) {
              // 则去除其他，只保留全部，默认value=-1 是全部
              this.form.level = [-1]
            } else {
              // 如果当前不包含全部，则判断是否其他的等级全选了
              if (this.form.level.length === this.levelList.filter((val)=>{if(val.levelSwitch==1){return val.levelSwitch}}).length - 1) {
                // 如果其他员工全选了，则也将当前置为全部
                this.form.level = [-1]
                this.isContainAll = true
              }
            }
          }
        }
       
  
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
          console.log("等级列表", res);
          if (res.data.code == 1) {
            this.levelAll=[]
            this.levelList = res.data.data;
            var arr = res.data.data.filter((val)=>{if(val.levelSwitch==1){return val.levelSwitch}})
            console.log('启用的等级',arr)
            //所有等级为 所有启用的等级
            arr.forEach(item=>{
              this.levelAll.push(item.apiCustomerLevelConfId)
            })
            //如果启用的等级长度小于等于 获取到的等级长度
            if(arr.length <= this.form.levelStr.split(',').length ){
              //等级为不限
              this.form.level = [-1]
              
            }else{
              //如果启用的等级长度大于 获取到的等级长度
              this.form.level=[];
              arr.forEach(item=>{
                this.form.levelStr.split(',').forEach(val=>{
                  if(item.apiCustomerLevelConfId == val){
                    this.form.level.push(item.apiCustomerLevelConfId)
                  }
                })
              })
            }
            if(this.levelAll.length!=0){
              this.levelList.unshift({
                  'levelSwitch':1,
                  "customerLevelName" :'不限',
                  "apiCustomerLevelConfId" : -1
              })
            }
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    back(){
      this.$router.push({
        name:'Coupon'
      })
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.addCoupon {
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
    .form {
    h2 {
      font-size: 16px;
      color: #333333;
      letter-spacing: 0.5px;
      line-height: 16px;
      font-weight: bold;
      padding: 20px 0;
    }
    .baseMsg {
      margin: 0 20px;
      background: #fff;
      padding: 0 30px 5px;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
      .name {
        width: 20%;
      }
      .level {
        width: 20%;
      }
    }
    .mb {
      color: #606266;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
      margin: 10px 20px;
      background: #fff;
      padding: 0 30px 2px;
      .item{
        width: 100px;
      }
      .num {
        width: 15%;
        .el-input{
          width: 50%;
        }
      }
      .date {
        width: 10%;
      }
      .day {
        width: 20%;
      }
    }
    .sub {
      .el-form-item__content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
