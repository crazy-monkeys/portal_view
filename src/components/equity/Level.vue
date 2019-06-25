<template>
  <div class="level">
    <div class="head clear">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>客户权益</el-breadcrumb-item>
            <el-breadcrumb-item>等级规则</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>等级规则</h1>
      
    </div>
    <div class="box">
      <div class="btns">
        <el-button @click="add" size='small'>新增等级</el-button>
        <el-select v-model="levelForm.way" multiple  filterable   :collapse-tags='true'  placeholder='请选择支付方式' class="choose" size='small' @change='selChange' :remove-tag='removeTag' > 
            <el-option
                v-for="item in ways"
                :key="item.value"
                :label="item.key"
                :value="item.value"
            ></el-option>
        </el-select>
      </div>
      <div class="content clear">
        <div class="empty" v-if='list.length==0' >
            <img src="../../assets/img/none1.png" alt="" width="150" height="150" />
            <p :style="{'marginTop': '23px'}">您还没有添加等级</p>
            <p :style="{'marginTop': '23px'}">点击上方新增等级，开始设置会员等级吧！</p>
        </div>
        
        <div class="card" v-for="item in list" :key="item.apiCustomerLevelConfId" :class="item.levelSwitch ==2? 'del' : ''">
            <div class="cardHead" >
                <div class="left" >
                    <p :class="item.levelSwitch ==2 ? 'name1' : 'name'" >
                        {{item.customerLevelName}}：
                        <span :class="item.levelSwitch ==2 ? 'grade1' :'grade'" >lv.{{item.customerLevel}}</span> 
                        {{item.levelSwitch ==1 ? '已启用' :item.levelSwitch ==2 ? '待删除' : '已禁用' }}
                    <el-switch
                        v-if='item.levelSwitch ==2 ? false:true'
                        class="switch"
                        v-model="item.levelSwitch"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="0"
                        @change='changeStatus(item)'>
                    </el-switch></p>
                    <p :class="item.levelSwitch ==2 ? 'discount1' : 'discount'" >会员折扣：{{item.memberDiscount? item.memberDiscount : 10}} 折</p>
                </div>
                <div class="right">
                    <el-button @click="del(item.apiCustomerLevelConfId,levelForm.store)" size='small' v-if="item.levelSwitch ==2 ? false :true">删除</el-button>
                    <el-button type='primary' v-if="item.levelSwitch ==2 ?false :true " size='small' @click="edit(item.apiCustomerLevelConfId,levelForm.store)">编辑</el-button>
                </div>
            </div>
            <div class="condition">
                <p>自动升级条件：累计交易金额：{{item.totalTradeFee}} 元</p>
                <p>统计范围：{{item.statisticalOrderDate }}</p>
            </div>
            <div class="date">
                <p v-if="item.levelValidType == 0 && item.levelRollValid.indexOf('-')!=-1">等级有效期：{{'自生效日起' + item.levelRollValid.split('-')[0]+'年后的'+item.levelRollValid.split('-')[1]+'个月后的固定'+item.levelRollValid.split('-')[2]+'日内有效'}}</p>
                <p v-if="item.levelValidType == 0 && item.levelRollValid.indexOf('-')==-1">等级有效期：{{'自生效日起'+item.levelRollValid+'天有效'}}</p>
                <p v-if="item.levelValidType == 1 ">等级有效期：{{'自生效日起'+ item.levelSameValid.split('-')[0]+'年后的'+item.levelSameValid.split('-')[1]+'月'+item.levelSameValid.split('-')[2]+'日内有效'}}</p>
            </div>
        </div>




      </div>
    </div>


    <!-- 新增等级控件 -->
    <el-dialog
        top='4vh'
        :title="levelForm.apiCustomerLevelConfId ? '编辑等级':'新增等级'"
        :visible.sync="dialogVisible"
        width="700px"
        :before-close="close"
        :close-on-click-modal="false">
      <el-form label-width="120px" label-position='left' ref='levelForm' :model="levelForm" :rules='rules'> 
          <div class="baseMsg">
                <h2>等级基本信息</h2>
                <el-form-item label="等级名称" prop='name' >
                    <el-input v-model="levelForm.name" maxlength='30'></el-input>
                </el-form-item>
                <el-form-item label="会员折扣" prop='discount'>
                    <el-input v-model="levelForm.discount"></el-input> 折
                </el-form-item>
                <el-form-item label="等级权重" prop='radio1'>
                    <el-tooltip class="item" effect="dark" content="等级权重数字越大等级越高，不可重复" placement="top-start" style="position:relative;left:-30px">
                        <i class="iconfont iconwenhao"></i>
                    </el-tooltip>
                    <el-radio-group v-model="levelForm.radio1">
                        <el-radio :label="1" :disabled="level1">1</el-radio>
                        <el-radio :label="2" :disabled="level2">2</el-radio>
                        <el-radio :label="3" :disabled="level3">3</el-radio>
                        <el-radio :label="4" :disabled="level4">4</el-radio>
                        <el-radio :label="5" :disabled="level5">5</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否启用？" prop='radio2' >
                    <el-radio-group v-model="levelForm.radio2">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
          </div>
          <div class="condition">
            <h2>自动升级条件</h2>
            <el-form-item label="统计开始时间"  prop='time'>

                          <el-date-picker
                            v-model="levelForm.time"
                            prefix-icon="el-icon-time"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择开始时间"
                        ></el-date-picker>
            </el-form-item>
            <el-form-item label="累计交易金额"  prop='money'>
               <!-- <p v-if="list.length==0||levelForm.radio1==1">0 - <el-input v-model="levelForm.money"></el-input> 元</p>  -->
               <!-- <p v-if="list.length!=0 && levelForm.radio1!=1"><el-input v-model="levelForm.money"></el-input> 元</p>  -->
               <p ><el-input v-model="levelForm.money"></el-input> 元</p> 
            </el-form-item>
          </div>
          <div class="date">
            <h2>等级有效期</h2>
            <el-form-item label="滚动有效期" prop='radio3' :show-message='levelForm.radio3!=2'>
                <el-radio-group v-model="levelForm.radio3" >
                    <el-radio :label="0" style="margin-bottom:20px">
                        自生效日起
                        <el-input v-model="levelForm.day" :disabled='levelForm.radio3!=0'></el-input>
                        天内有效
                    </el-radio>
                    <el-radio :label="1">
                        自生效日起
                        <el-input v-model="levelForm.scrollYear" :disabled='levelForm.radio3!=1'></el-input>
                        年后的
                        <el-input v-model="levelForm.scrollMonth" :disabled='levelForm.radio3!=1'></el-input>
                        个月后的固定
                        <el-input v-model="levelForm.scrollDay" :disabled='levelForm.radio3!=1'></el-input>
                        日失效
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="统一有效期" prop='radio3' :show-message='levelForm.radio3==2'>
                <el-radio v-model="levelForm.radio3" :label="2" >
                    自生效日起
                    <el-input v-model="levelForm.uniteYear" :disabled='levelForm.radio3!=2'></el-input>
                    年后的 
                    <el-input v-model="levelForm.uniteMonth" :disabled='levelForm.radio3!=2'></el-input>
                    月
                    <el-input v-model="levelForm.uniteDay" :disabled='levelForm.radio3!=2'></el-input>
                    日失效
                </el-radio>
            </el-form-item>
          </div>               

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm('levelForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'

export default {
  name: 'Theme',
  data () {
    return {
        unite:false,
        rules:{
            name: [
                { required: true,  trigger: 'change' ,validator:formTest.name5Test}
            ],
            discount:[
                { required: false,  trigger: 'blur' ,validator:formTest.discountTest}
            ],
            money:[
                { required: true,  trigger: 'blur' ,validator:formTest.moneyTest}
            ],
            radio1:[
                { required: true,  trigger: 'change' ,message:'请选择等级权重'}
            ],
            radio2:[
                { required: true,  trigger: 'change' ,message:'请选择是否启用'}
            ],
            time:[
                { required: true,  trigger: 'blur' ,message:'请选择统计开始时间'}
            ],
            radio3:[
                { required: true,  trigger: 'blur' ,validator: (rule, value, callback) => {
                    var reg=/^([1-9][0-9]*)$/
                    if(value ==0){
                        if(this.levelForm.day.length ==0){
                            callback(new Error('有必填项为空'))
                        }else{
                            if(!reg.test(this.levelForm.day)){
                                callback(new Error('请输入正确天数'))
                            }else{
                                callback()
                            }
                        }
                    }else{
                        if(value ==1){
                            if(this.levelForm.scrollYear.length ==0 ||this.levelForm.scrollMonth.length ==0||this.levelForm.scrollDay.length ==0){
                                callback(new Error('有必填项为空'))
                            }else{
                                console.log(this.levelForm.scrollYear,reg.test(this.levelForm.scrollYear))
                                console.log(this.levelForm.scrollMonth,reg.test(this.levelForm.scrollMonth))
                                console.log(this.levelForm.scrollDay,reg.test(this.levelForm.scrollDay))
                                console.log(reg)
                                if(reg.test(this.levelForm.scrollYear) &&reg.test(this.levelForm.scrollMonth) &&reg.test(this.levelForm.scrollDay)){
                                    callback()
                                }else{
                                    callback(new Error('请输入正确的年月日'))
                                }
                            }
                        } else{
                            if(value ==2){
                                if(this.levelForm.uniteYear.length ==0 ||this.levelForm.uniteMonth.length ==0||this.levelForm.uniteDay.length ==0){
                                    callback(new Error('有必填项为空'))
                                }else{
                                    console.log(this.levelForm.uniteYear,reg.test(this.levelForm.uniteYear))
                                console.log(this.levelForm.uniteMonth,reg.test(this.levelForm.uniteMonth))
                                console.log(this.levelForm.uniteDay,reg.test(this.levelForm.uniteDay))
                                    if(reg.test(this.levelForm.uniteYear)&&reg.test(this.levelForm.uniteMonth)&&reg.test(this.levelForm.uniteDay)){
                                        callback()
                                    }else{
                                        callback(new Error('请输入正确的年月日'))
                                    }
                                }
                            }
                        }
                    }
                    
                    
                },}
            ]
        },
        levelSwitch:'',
        date:'',
        dialogVisible:false,
        store:[],
        ways:[],
        levelForm:{
            way:[],
            store:'',
            time:'',
            name:'',
            discount:'',
            radio1:'',
            radio2:1,
            radio3:0,
            day:'',
            scrollYear:'',
            scrollMonth:'',
            scrollDay:'',
            uniteYear:'',
            uniteMonth:'',
            uniteDay:'',
            money:'',
            apiCustomerLevelConfId:''
        },
        list:[],
        actLevel:[]
    }
  },
  created(){
    this.getShopList()
  },
    computed: {
        shopId(){
        return this.$store.state.shopId.shopId
        },
        level1(){
            if(this.list.length==0){
                return false
            }else{
            var arr = []
            var str = ''
            // console.log(this.list.filter((val)=>{if(val.levelSwitch==1||val.levelSwitch==0){return val.customerLevel}}))
            this.list.filter((val)=>{if(val.levelSwitch==1||val.levelSwitch==0){return val.customerLevel}}).forEach(item=>{
            arr.push  (item.customerLevel)
            })
            str = arr.join(',')
            // console.log(str)
            if(str.indexOf(1)!=-1){
                return true
            }
            }
        },
        level2(){
            if(this.list.length==0){
                return true
            }else{
            var arr = []
            var str = ''
            this.list.filter((val)=>{if(val.levelSwitch==1||val.levelSwitch==0){return val.customerLevel}}).forEach(item=>{
            arr.push  (item.customerLevel)
            })
            str = arr.join(',')
            // console.log(str)
            if(str.indexOf(2)!=-1){
                return true
            }
            }
        },
        level3(){
            if(this.list.length==0){
                return true
            }else{
            var arr = []
            var str = ''
            this.list.filter((val)=>{if(val.levelSwitch==1||val.levelSwitch==0){return val.customerLevel}}).forEach(item=>{
            arr.push  (item.customerLevel)
            })
            str = arr.join(',')
            // console.log(str)
            if(str.indexOf(3)!=-1){
                return true
            }
            }
        },
        level4(){
            if(this.list.length==0){
                return true
            }else{
            var arr = []
            var str = ''
            this.list.filter((val)=>{if(val.levelSwitch==1||val.levelSwitch==0){return val.customerLevel}}).forEach(item=>{
            arr.push  (item.customerLevel)
            })
            str = arr.join(',')
            // console.log(str)
            if(str.indexOf(4)!=-1){
                return true
            }
            }
        },
        level5(){
            if(this.list.length==0){
                return true
            }else{
            var arr = []
            var str = ''
            this.list.filter((val)=>{if(val.levelSwitch==1||val.levelSwitch==0){return val.customerLevel}}).forEach(item=>{
            arr.push  (item.customerLevel)
            })
            str = arr.join(',')
            // console.log(str)
            if(str.indexOf(5)!=-1){
                return true
            }
            }
    },

  },
  watch:{
        shopId:{
            handler:function(n,o){
                if(n!=o){
                    this.getStore(this.shopId)
                }
            }
        },
        "levelForm.apiCustomerLevelConfId":{
            handler:function(n,o){
                console.log(n)
            }
        },
        "levelForm.radio3":{
            handler:function(n,o){
                console.log(n)
                if(n==0){
                    console.log(333333)

                    this.levelForm.scrollYear==''
                    this.levelForm.scrollMonth==''
                    this.levelForm.scrollDay==''
                    this.levelForm.uniteYear==''
                    this.levelForm.uniteMonth==''
                    this.levelForm.uniteDay==''
                    console.log(this.levelForm.uniteYear)
                    console.log(this.levelForm.uniteMonth)
                    console.log(this.levelForm.uniteDay)
                    console.log(this.levelForm.scrollYear)
                    console.log(this.levelForm.scrollMonth)
                    console.log(this.levelForm.scrollDay)
                    console.log(this.levelForm.day)
                }else if(n==1){
                    console.log(this.levelForm.uniteYear)
                    console.log(this.levelForm.uniteMonth)
                    console.log(this.levelForm.uniteDay)
                    console.log(this.levelForm.scrollYear)
                    console.log(this.levelForm.scrollMonth)
                    console.log(this.levelForm.scrollDay)
                    console.log(this.levelForm.day)
                    this.levelForm.uniteYear==''
                    this.levelForm.day==''
                    this.levelForm.uniteMonth==''
                    this.levelForm.uniteDay==''
                }else{
                    console.log(2222222222)

                    this.levelForm.day==''
                    this.levelForm.scrollYear==''
                    this.levelForm.scrollMonth==''
                    this.levelForm.scrollDay==''
                    console.log(this.levelForm.uniteYear)
                    console.log(this.levelForm.uniteMonth)
                    console.log(this.levelForm.uniteDay)
                    console.log(this.levelForm.scrollYear)
                    console.log(this.levelForm.scrollMonth)
                    console.log(this.levelForm.scrollDay)
                    console.log(this.levelForm.day)
                }
            }
        },
        "levelForm.time":{
            handler:function(n,o){
                console.log(n)
            }
        },
        list:{
            handler:function(n,o){
                // if(n!=o){
                //     this.actLevel = this.list.filter((val)=>{
                //         if(val.levelSwitch==1){
                //             return val.levelSwitch
                //         }})
                //         console.log(this.actLevel)
                // }
                n.forEach(ele => {
                    if(ele.levelValidType == 0){
                        console.log(ele.levelRollValid)
                        if(ele.levelRollValid.indexOf('-') !=-1){
                                console.log('滚动年月日',this.date)

                            var arr = ele.levelRollValid.split('-');
                            this.date = '自生效日起'+arr[0]+'年后的'+arr[1]+'个月后的固定'+arr[2]+'日内有效'
                        }else{
                                console.log('滚动天',this.date)
                            this.date = '自生效日起'+ele.levelRollValid+'天有效'
                        }
                    }else{
                        console.log('统一',this.date)
                            var arr = ele.levelSameValid.split('-');
                            this.date = '自生效日起'+arr[0]+'年后的'+arr[1]+'月'+arr[2]+'日内有效'
                    }
                });
            },
            deep:true
        },
  },
  methods:{
    updateWays() {
        var data ={
            apiMerchantId:this.levelForm.store,
            modes:this.levelForm.way
        }
      this.$http({
        method: "post",
        url: "" + process.env.API_ROOT + "/level/paymentMode/update",
        data:data
      })
        .then(res => {
          console.log("更新结果", res);
          if (res.data.code == 1) {
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    getWays(apiMerchantId) {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/level/paymentMode/list?apiMerchantId="+apiMerchantId
      })
        .then(res => {
          console.log("等级支付方式列表", res);
          if (res.data.code == 1) {
            this.ways = res.data.data;
            this.ways.forEach(item=>{
                if(item.selected){
                    this.levelForm.way.push(item.value)
                }
            })
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.commit()
          } else {
            console.log("error submit!!");
            return false;
          }
        });
    },
    resetForm(formName) {   
      if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
      }else{
        this.$nextTick(()=>{
          this.$refs[formName].resetFields();
        })
      }
    },
    removeTag(tag){
        console.log(tag)
    },
    selChange(val){
        console.log('选中项',val)
        this.updateWays()
    },
    getStore(shopid){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/merchantInfo?shopId=' + shopid
      }
      ).then(res => {
          console.log("商户列表", res);
          if(res.data.code==1){
            this.store = res.data.data;
            if(res.data.data.length!=0){
                this.levelForm.store = this.store[0].apiMerchantId;
                this.getLevelList(this.store[0].apiMerchantId)
                this.getWays(this.store[0].apiMerchantId)
            }else{
                this.levelForm.store='';
                this.getLevelList('')
                this.getWays()
            }
            
          }else{

          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    changeStatus(item){
        this.$http.post(process.env.API_ROOT+'/level/config',
        {
            'apiCustomerLevelConfId' : item.apiCustomerLevelConfId,
            'apiMerchantId' :this.levelForm.store,
            'customerLevel' : item.customerLevel,
            'customerLevelName':item.customerLevelName,
            'levelRollValid' : item.levelRollValid,
            'totalTradeFee' :item.totalTradeFee,
            'levelSwitch' :item.levelSwitch,
            'memberDiscount': item.memberDiscount,
            'statisticalOrderDate' : item.statisticalOrderDate,
            'levelValidType' : item.levelValidType,
            'levelSameValid' :item.levelSameValid,
        }).then((res)=>{
            console.log(res)
            if(res.data.code ==1){
                // console.log('修改状态成功')
                this.getLevelList(this.levelForm.store)
                this.dialogVisible = false
                this.close()
                this.$message({
                    type:'success',
                    message : res.data.msg
                })
            }else{
                this.$message({
                    type:'error',
                    message : res.data.msg
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    },

    clearForm(){
        this.resetForm('levelForm')

        this.levelForm.name = '';
        this.levelForm.apiCustomerLevelConfId = '';
        this.levelForm.discount = '';
        this.levelForm.radio1 = '';
        this.levelForm.radio2 = 1;
        this.levelForm.radio3 = 0;
        this.levelForm.day = '';
        this.levelForm.scrollYear = '';
        this.levelForm.scrollMonth = '';
        this.levelForm.scrollDay = '';
        this.levelForm.uniteYear = '';
        this.levelForm.uniteMonth = '';
        this.levelForm.uniteDay = '';
        this.levelForm.money = '';
        this.levelForm.time = '';

        // this.levelForm.range = '';
    },
    getmore(id,apiMerchantId){
        this.$http({
            method:'get',
            url:''+process.env.API_ROOT+'/level/configInfo?apiCustomerLevelConfId='+id +'&apiMerchantId='+apiMerchantId,
            }).then(res => {
                console.log("等级详情", res);
                if(res.data.code==1){
                    //名字
                    this.levelForm.name = res.data.data.customerLevelName
                    //折扣
                    this.levelForm.discount = res.data.data.memberDiscount
                    //统计范围
                    this.levelForm.time = res.data.data.statisticalOrderDate
                    //交易金额
                    this.levelForm.money = res.data.data.totalTradeFee
                    //等级权重
                    this.levelForm.radio1 = res.data.data.customerLevel
                    //是否启用
                    this.levelForm.radio2 = res.data.data.levelSwitch
                    //等级有效期
                    if(res.data.data.levelRollValid){
                        if(res.data.data.levelRollValid.indexOf('-')==-1){
                            this.levelForm.day = res.data.data.levelRollValid
                            this.levelForm.radio3 = 0
                        }else{
                            var arr = res.data.data.levelRollValid.split('-')
                            this.levelForm.scrollYear = arr[0]
                            this.levelForm.scrollMonth = arr[1]
                            this.levelForm.scrollDay = arr[2]
                            this.levelForm.radio3 = 1
                        }
                    }else{
                        var arr = res.data.data.levelSameValid.split('-')
                            this.levelForm.uniteYear = arr[0]
                            this.levelForm.uniteMonth = arr[1]
                            this.levelForm.uniteDay = arr[2]
                            this.levelForm.radio3 = 2   
                    }
                }
            })
            .catch(error => {
                console.log(error);
                alert("登入失败");
            });
    },
    edit(id,apiMerchantId){
        this.levelForm.apiCustomerLevelConfId = id;
        this.getmore(id,apiMerchantId)
        this.dialogVisible = true;
        // this.clearForm()
    },
    commit(){
        var reg=/[^\d]/g
        // if(reg.test(this.levelForm.day) ||(reg.test(this.levelForm.scrollYear)&&reg.test(this.levelForm.scrollMonth)&&reg.test(this.levelForm.scrollDay)) || (reg.test(this.levelForm.uniteYear)&&reg.test(this.levelForm.uniteMonth)&&reg.test(this.levelForm.uniteDay)) ){
               this.$http.post(process.env.API_ROOT+'/level/config',
        {
            //主键ID
            'apiCustomerLevelConfId' : this.levelForm.apiCustomerLevelConfId ? this.levelForm.apiCustomerLevelConfId :'',
            //商铺ID
            'apiMerchantId' :this.levelForm.store,
            //等级权重
            'customerLevel' : this.levelForm.radio1,
            //规则名称
            'customerLevelName':this.levelForm.name,
            //滚动有效期
            'levelRollValid' : this.levelForm.radio3 == 0? this.levelForm.day : this.levelForm.radio3 == 1 ? this.levelForm.scrollYear +'-'+this.levelForm.scrollMonth + '-'+this.levelForm.scrollDay :'' ,
            //累计交易金额
            'totalTradeFee' : this.levelForm.money,
            //规则状态
            'levelSwitch' :this.levelForm.radio2,
            //折扣
            'memberDiscount': this.levelForm.discount,
            //统计开始时间
            'statisticalOrderDate' : this.levelForm.time,
            //有效期类型
            'levelValidType' : this.levelForm.radio3 == 2 ? 1 :0,
            //统一有效期
            'levelSameValid' :this.levelForm.radio3 == 2?  this.levelForm.uniteYear +'-'+this.levelForm.uniteMonth + '-'+this.levelForm.uniteDay : '',
        }).then((res)=>{
            console.log(res)
            if(res.data.code ==1){
                console.log('新增成功')
                if(!this.levelForm.apiCustomerLevelConfId){
                    this.$message({
                        type:'success',
                        message : '新增等级成功'
                    })
                }else{
                    this.$message({
                        type:'success',
                        message : '编辑等级成功，改动后规则次日生效'
                    })
                }
                this.getLevelList(this.levelForm.store)
                this.dialogVisible = false
                this.clearForm()
                
                
            }else{
                this.$message({
                    type:'error',
                    message : res.data.msg
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
        // }else{
        //     this.$message({
        //         type:'error',
        //         message:'请填写有效期'
        //     })
        // }
     
    },
    del(id,apiMerchantId) {
       this.$confirm('请确认是否删除该等级，会影响到该等级会员的权益，删除后次日生效！', '删除所选等级', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
        })
          .then(() => {
            this.$http.post(process.env.API_ROOT+'/level/config/del',{
                'apiCustomerLevelConfId':id,
                'apiMerchantId':apiMerchantId
            }).then((res=>{
                if(res.data.code==1){
                    console.log('删除等级成功'),
                    this.getLevelList(apiMerchantId)
                }
            })).catch((err)=>{
                console.log(err)
            })
          })
          .catch(action => {
            this.$message({
              type: 'fail',
              message: '已取消操作'
            })
          });
    },
    add(){
        if(this.levelForm.store){
            this.dialogVisible = true;
            this.levelForm.apiCustomerLevelConfId = ''
        }else{
            this.$message({
                type:'error',
                message:'该店铺没有绑定商户'
            })
        }

    },
    close(){
        this.dialogVisible = false;
        this.clearForm()
    },
    getLevelList(apiMerchantId){
        this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/level/configs?apiMerchantId='+apiMerchantId,
        }).then(res => {
            console.log("等级列表", res);
            if(res.data.code==1){
                this.list = res.data.data
            }else{
                this.list=[]
            }
        })
            .catch(error => {
            console.log(error);
            alert("登入失败");
        });
    },
    //获取用户店铺列表
    getShopList(){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/getCurentUserShopList',
      }).then(res => {
          console.log("店铺列表", res);
          if(res.data.code==1){
            this.shopList = res.data.data;
            this.getStore(this.shopId)
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;
.level{
    .head{
        h1{
            opacity: 0.87;
            font-size: 18px;
            color: #000;
            letter-spacing: 0;
            line-height: 42px;
            height: 42px;
            font-weight: bold;
            padding: 0 50px;
            float: left;
        }
        .el-breadcrumb{
        line-height: 30px;
        margin-right: 20px;
        margin-left: 50px;
        
        }
    }
    .box{
        margin: 0 20px 20px 20px;
        background: #FFFFFF;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
        border-radius: 2px;
        .btns{
            border-bottom: 1px solid #E8E8E8;
            height: 56px;
            .el-button{
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0;
                background: #3366FF;
                border-radius: 2px;
                border: none;
                margin: 12px 0 0 20px;
            }
            .choose{
                margin: 12px 0 32px 30px ;
                      .el-input__inner {
          border-radius: 0;
        }
            }
        }
        .content{
            position: relative;
            width: 100%;
            background: #FFFFFF;
            box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
            min-height:800px; 
            height:auto !important; 
            height:800px; 
            .empty{
                text-align: center;
                width: 50%;
                height: 50%;
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                margin: auto;
                p{
                    font-size: 14px;
                    color: #999999;
                    letter-spacing: 0.44px;
                    text-align: center;
                    line-height: 14px;
                }
            }
            .card{
                float: left;
                width: 40%;
                border: 1px solid #D8D8D8;
                border-radius: 2px;
                background: #FFFFFF;
                margin: 20px 5%;
                box-sizing: border-box;
                padding: 20px;
                .cardHead{
                    border-bottom: 1px solid #ccc;
                    height: 50px;
                    padding-bottom: 20px;
                    
                    .left{
                        float: left;
                        width: 50%;
                        height:50px ;
                        .name{
                            font-size: 14px;color: #333;line-height: 16px;
                        }
                        .name1{
                            font-size: 14px;color: #ccc;line-height: 16px;
                        }
                        .discount{
                            margin-top:10px;
                        }
                        .discount1{
                            margin-top:10px;
                        }
                        .grade{
                            font-size: 14px;color: #3366FF;line-height: 16px;margin-right:30px
                        }
                        .grade1{
                            font-size: 14px;color: #ccc;line-height: 16px;margin-right:30px
                        }
                    }
                    .right{
                        width: 50%;
                        float: left;
                        height:50px ;
                        .el-button{
                            float: right;
                            margin: 5px 10px;
                        }
                    }
                }
                .condition{
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 10px;
                    p{
                        margin-top: 10px;
                    }
                }
                .date{
                    p{
                        margin-top: 10px;
                    }
                }
            }
            .del{
                // background: rgba(0,0,0,0.05);
                color: #ccc;
            }
        }
    }
    .el-dialog{
        margin-top: 5vh;
        h2{
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            line-height: 40px;
        }
        .baseMsg{
            border-bottom: 1px solid #ccc;
        }
        .condition{
            border-bottom: 1px solid #ccc;
        }
        .date{
            // border-bottom: 1px solid #ccc;
            .el-input{
                width: 15%
            }
            .el-radio+.el-radio{
                margin-left: 0
            }
        }
        .el-dialog__body{
            padding: 20px 30px;
        }
        .el-input{
            width: 50%;
        }
        .el-select{
            width:50%
        }
        .el-form-item__label{
            font-size: 14px;
            color: #666666;
            letter-spacing: 0;
            line-height: 40px;
        }
    }
}
</style>
