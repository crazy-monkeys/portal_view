<template>
  <div class="addGroup">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户分组</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>
        <i class="el-icon-back" @click="back"></i>
        <span >新建用户分组</span>
      </h1>
    </div>
    <div class="addBox clear">
      <el-form
          :model="form"
          ref="form"
          label-width="auto"
          class="form"
        >
        <div class="choose">
          <h2>人群筛选</h2>
          <el-form-item label="分组名称：" prop='name' :rules='rules.name' label-position="top">
              <el-input v-model="form.name" class="name" maxlength='10' ></el-input>
              <el-button class="insertGroup" type='primary' @click="add"> 引入已有分组</el-button>

          </el-form-item>
          <el-form-item label="分组目录：" prop='catalog' :rules='rules.catalog' label-position="top">
            <el-select v-model="form.catalog" placeholder="请选择分组目录"  class="catalog" >
              <el-option
                v-for="item in catalogList"
                :key="item.catalog_id"
                :label="item.catalog_name"
                :value="item.catalog_id">
              </el-option>
            </el-select>
            <el-button class="addCatalog" @click="addCatalog">新建分组目录</el-button>

          </el-form-item>
        </div>
        <div class="tag">
          <h2>已选标签</h2>
          <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  标签之间的关系为 「并且」, 标签值之间的关系为「或者」</p>
          <div class="empty" v-if="toggle">
            <div>
              <img src="../../assets/img/none.png" alt width="140" height="140">
            </div>
            <p :style="{'marginTop': '23px'}">暂无已选条件</p>
            <p :style="{'marginTop': '23px'}" class="last">点击右侧添加筛选维度，精准定位目标客户</p>
          </div>

          <BaseMsg v-on:data='receiveBaseMsg' :changeValue='change'  :rules='rules'  />
          <Pro v-on:data='receivePro' :proValue='pro'  />
          <RfM v-on:data='receiveRfm' :rfmValue='rfm' />
          <Deal v-on:data='receiveDeal' :dealValue='deal' />
          <Marketing v-on:data='receiveMarketing' :marketingValue='marketing' />
        </div>
        <div class="cal" v-if="!toggle">
          <el-button type="primary" @click="cal">计算</el-button> <span class="num"> （当前选择 {{num}} 个客户） </span> 
        </div>
      </el-form>
      <div class="condition">
        <el-collapse accordion>
          <el-collapse-item title="基本信息">
            <span @click="change1" :class="change.value1?'active':''">性别</span>
            <span @click="change2" :class="change.value2?'active':''">生日</span>
            <span @click="change3" :class="change.value3?'active':''">手机号</span>
            <span @click="change4" :class="change.value4?'active':''">积分</span>
            <span @click="change5" :class="change.value5?'active':''">等级</span>
            <span @click="change6" :class="change.value6?'active':''">地区</span>
            <span @click="change7" :class="change.value7?'active':''">入会时间</span>
            <span @click="change8" :class="change.value8?'active':''">邮箱</span>
            <span @click="change9" :class="change.value9?'active':''">客户来源</span>
          </el-collapse-item>
          <el-collapse-item title="自定义属性">
            <span v-for="(item,index) in  proList" :key='item.customPropertyId' @click="proChange(index)" :class="pro[index].value?'active':'aaa'">{{item.customPropertyName}}</span>
            <p v-if="proList.length==0" style="text-align:center">
              该店铺下无自定义属性
            </p>
          </el-collapse-item>
          <el-collapse-item title="RFM属性">
            <span @click="rfm1" :class="rfm.value1?'active':''">首次付款时间</span>
            <span @click="rfm2" :class="rfm.value2?'active':''">最近一次付款时间</span>
            <span @click="rfm3" :class="rfm.value3?'active':''">首次下单时间</span>
            <span @click="rfm4" :class="rfm.value4?'active':''">最近一次成功时间</span>
            <span @click="rfm5" :class="rfm.value5?'active':''">交易成功次数</span>
            <span @click="rfm6" :class="rfm.value6?'active':''">下单次数</span>
            <span @click="rfm7" :class="rfm.value7?'active':''">下单总额</span>
            <span @click="rfm8" :class="rfm.value8?'active':''">付款次数</span>
            <span @click="rfm9" :class="rfm.value9?'active':''">成功金额</span>
            <span @click="rfm10" :class="rfm.value10?'active':''">付款金额</span>
            <span @click="rfm11" :class="rfm.value11?'active':''">退款次数</span>
            <span @click="rfm12" :class="rfm.value12?'active':''">退款金额</span>
            <span @click="rfm13" :class="rfm.value13?'active':''">客单价</span>
            <span @click="rfm14" :class="rfm.value14?'active':''">客单件</span>
          </el-collapse-item>
          <el-collapse-item title="交易属性">
            <span @click="deal1" :class="deal.value1?'active':''">商品筛选</span>
            <span @click="deal2" :class="deal.value2?'active':''">订单金额</span>
            <span @click="deal3" :class="deal.value3?'active':''">订单状态</span>
            <span @click="deal4" :class="deal.value4?'active':''">订单来源</span>

          </el-collapse-item>
          <el-collapse-item title="营销属性">
            <span @click="marketing1" :class="marketing.value1?'active':''">最近一次短信营销时间</span>
            <span @click="marketing2" :class="marketing.value2?'active':''">最近一次邮件营销时间</span>
            <span @click="marketing3" :class="marketing.value3?'active':''">营销短信黑名单</span>
            <span @click="marketing4" :class="marketing.value4?'active':''">营销邮箱黑名单</span>
            <span @click="marketing5" :class="marketing.value5?'active':''">短信营销次数</span>
            <span @click="marketing6" :class="marketing.value6?'active':''">邮件营销次数 </span>
          </el-collapse-item>
          <!-- <el-collapse-item title="互动属性">
           
          </el-collapse-item> -->
        </el-collapse>
      </div>
    </div>
    <div class="sub" >
        
      <el-button size='medium'  @click="clearTag">清空标签</el-button>
      <el-button size='medium' type='primary' @click="save">保存分组</el-button>

    </div>



    <!-- 创建目录管理控件 -->
    <el-dialog
      title="新建目录"
      :visible.sync="dialogVisible"
      width="20%"
      :before-close="qx"
      :close-on-click-modal="false"
    >
      <el-form label-position="top" label-width="80px" :model="catalogForm" ref="catalogForm" >
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  同一店铺下目录名称不能重复</p>
        <!-- <p class="danger" v-if="catalogForm.catalogId"> 原目录名称：{{catalogForm.name}}</p> -->
        <el-form-item label="目录名称" prop='catalogName'  :rules='rules.catalogName'>
          <el-input v-model="catalogForm.catalogName" class="proName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx" :plain='true'>取消</el-button>
        <el-button type="primary" @click="submitForm('catalogForm')">提交</el-button>
      </span>
    </el-dialog>


    <!-- 引入已有分组 -->
    <el-dialog
      title="引入已有分组"
      :visible.sync="insert"
      width="60%"
      :before-close="qx"
      :close-on-click-modal="false"
    >
      <div class="box">
      <div class="btns">
        <el-input
          v-model="selStr"
          class="sel"
          placeholder="在当前位置搜索分组名称"
          @keyup.enter.native="search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
        </el-input>
        <el-select v-model="select" placeholder="请选择" size='small' class="select" @change='changeCatalog'>
          <el-option
            v-for="item in catalogList"
            :key="item.catalog_id"
            :label="item.catalog_name"
            :value="item.catalog_id">
          </el-option>
        </el-select>
      </div>
      <div class="tab">
        <el-table :data="tableData" style="width: 100%" height="500" @row-click='rowClick'>
          <!-- <el-table-column type="selection" label width="80" ></el-table-column> -->
          <el-table-column type="index" label="编号"   width='80'>
            <!-- <el-radio v-model="radio" label="1">1</el-radio> -->
            <template slot-scope="scope">
              <!--&nbsp; 为空，不加这个radio的label会显示index数字，注意从0开始的；radio会全选的问题是label相同导致的-->
              <el-radio class="radio" v-model="radio"  :label="q(scope.$index)"  @change.native="getCurrentRow(q(scope.$index))" ></el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="customer_group_id" label="ID" v-if="false"></el-table-column>
          <el-table-column prop="customer_group_name" label="分组名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="catalog_name" label="分组目录" show-overflow-tooltip></el-table-column>
          <el-table-column prop="create_time_str" label="创建时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="" label="更新时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="tableData[scope.$index].update_time_str">{{tableData[scope.$index].update_time_str}}</span>
              <span v-if="!tableData[scope.$index].update_time_str">{{tableData[scope.$index].create_time_str}}</span>
            </template>
          </el-table-column>
          <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt width="140" height="140">
            </div>
            <p :style="{'marginTop': '23px'}">未查询到分组列表</p>
          </div>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 100]"
            :page-size="10"
            layout="sizes,total, jumper, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
        <span slot="footer" class="insertSub">
          <el-button @click="qx">取消</el-button>
          <el-button type="primary" @click="sub">确定</el-button>
        </span>
      </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  import BaseMsg from './components/baseMsg'
  import RfM from './components/rfm'
  import Deal from './components/deal'
  import Marketing from './components/marketing'
  import Pro from './components/pro'
  import Bus from '../../module/bus.js'

export default {
  name: "AddGroup",
  components:{
    BaseMsg,RfM,Deal,Marketing,Pro
  },
  data() {
    return {
      //选择已有分组的ID
      id:'',
      //自定义属性值
      proData:[],
      //交易属性值
      dealData:{
        selectGoods:[],
        statu:[],
        source:[],
        moneyType:'',
        money:'',
        maxMoney:'',
        minMoney:'',
      },
      //营销属性值
      marketingData:{
        lastEmailTime:[],
        lastSmsTime:[],
      },
      //rfm属性值
      rfmData:{
        payTime:[],
        lastPayTime:[],
        firstOrderTime:[],
        lastSucTime:[],

      },
      //基本属性值
      baseData:{
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
        //手机号
        mobile: [],
        // 积分类型
        pointTypes: "",
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
      },
      content:[],
      //自定义属性显示
      pro:[],
      //自定义属性列表
      proList:[],
      //选择引入已有分组
      radio:'',
      //搜索条件
      select:"",
      selStr:'',
      //分页
      currentPage:1,
      pageSize:10,
      total:0,
      //分则列表数据
      tableData:[],
      //计算的客户数量
      num:0,
      //验证规则
      rules:{
        name: [
          { required: true,  trigger: 'blur' ,message:'请输入分组名称'}
        ],
        catalog: [
          { required: true,  trigger: 'change' ,message:'请选择目录'}
        ],
        catalogName: [
          { required: true,  trigger: 'blur' ,validator:formTest.name1Test}
        ],
        sex: [
          { required: true,  trigger: 'change' ,message:'请选择性别'}
        ],
        date: [
          { required: true,  trigger: 'change' ,message:'请选择生日日期'}
        ],
        daterange:[
          { required: true,  trigger: 'change' ,message:'请选择生日区间'}
        ],
        mobile:[
          { required: false,  trigger: 'change' ,message:'请选择手机号前缀'}
        ],
      },
      //引入已有分组显示
      insert:false,
      //新建目录显示
      dialogVisible:false,
      //新建目录的数据
      catalogForm:{
        catalogName:''
      },
      //空标签时和计算按钮的显示
      toggle:true,
      //基本属性的显示
      change:{
        value1:false,
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
        value7:false,
        value8:false,
        value9:false,
        value10:false,
      },
      //交易属性的显示
      deal:{
        value1:false,
        value2:false,
        value3:false,
        value4:false,
      },
      //营销属性的显示
      marketing:{
        value1:false,
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
      },
      //rfm属性的显示
      rfm:{
        value1:false,
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
        value7:false,
        value8:false,
        value9:false,
        value10:false,
        value11:false,
        value12:false,
        value13:false,
        value14:false,
      },
      //表单数据
      form:{
        //分组名称
        name:'',
        //分组目录
        catalog:'',
      },
      //目录列表
      catalogList:[],
    };
  },
  created() {
    this.getCatalogList(this.shopId)
    this.getProList(this.shopId)
  },
  computed:{
    shopId(){
      return this.$store.state.shopId.shopId
    },
  },
  watch: {
    shopId:{
      handler:function(n,o){
        if(n!=o){
          this.getCatalogList(n)
          this.getProList(n)
          this.clearTag()
        }
      }
    },
    change:{
      handler:function(n,o){
        for ( var i in n ){
            // console.log(i,n[i])
          if(n[i]){
            this.toggle = false
            break;
          }else{
            this.toggle = true
            continue
          }
        }
      },
      deep:true
    },
    rfm:{
      handler:function(n,o){
        for ( var i in n ){
            // console.log(i,n[i])
          if(n[i]){
            this.toggle = false
            break;
          }else{
            this.toggle = true
            continue
          }
        }
      },
      deep:true
    },
    marketing:{
      handler:function(n,o){
        for ( var i in n ){
            // console.log(i,n[i])
          if(n[i]){
            this.toggle = false
            break;
          }else{
            this.toggle = true
            continue
          }
        }
      },
      deep:true
    },
    pro:{
      handler:function(n,o){
        for ( var i =0;i<n.length;i++ ){
            // console.log(i,n[i])
          if(n[i].value){
            this.toggle = false
            break;
          }else{
            this.toggle = true
            continue
          }
        }
      },
      deep:true
    },
    deal:{
      handler:function(n,o){
        for ( var i in n ){
            // console.log(i,n[i])
          if(n[i]){
            this.toggle = false
            break;
          }else{
            this.toggle = true
            continue
          }
        }
      },
      deep:true
    },
  },
  methods: {
    // 计算人数
    cal(){
      var type = ''
      var email = ''
      // 全选情况下
      if(this.baseData.checkAll){
        type=1
        email = ''
      }else{ 
        //非全选
        //如果 有其他 为排除
        if(this.baseData.checkedCities.join(',').indexOf('其他')!=-1){
          type=0
          //一个没有 2个有
          //无163
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')!=-1  && this.baseData.checkedCities.join(',').indexOf('@sina.com')!=-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@163.com'
          }
          //无sina
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')!=-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')!=-1){
            email = '@sina.com'
          }
          //无qq
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')!=-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')!=-1){
            email = '@qq.com'
          }
          
          //有一个有  2个没有
          //有sina
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')!=-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@qq.com,@163.com'
          }
          //有qq
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')!=-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@163.com,@sina.com'
          }
          //有163
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')!=-1){
            email = '@163.com,@qq.com'
          }
          //3这都没有
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@qq.com,@sina.com,@163.com'
          }
        }else{
          //如果没有其他
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')==-1){
            type = ''
            email=''
          }else{
            type = 1
            email = this.baseData.checkedCities.join(',')
          }
        }
      }

      var mobile = ''
      if(this.baseData.mobile.join(',').indexOf('-1')!=-1){
        mobile = ''
      }else{
        //非全部 有其他
        if(this.baseData.mobile.join(',').indexOf(',0')!=-1){
          console.log('非全部 有其他')
          console.log(this.baseData.mobile.join(','))
          mobile = this.baseData.mobile.join(',').replace(',0','')
          console.log(mobile)
        }else{
          //无其他
          console.log('非全部 无其他')
          mobile = this.baseData.mobile.join(',')
        }
      }

      var goods = []
      this.dealData.selectGoods.forEach(item=>{
        goods.push(item.sku_code)
      })
      

      var valueArr = []
      var newArr =[]
      this.proData.forEach((item,index)=>{
        // console.log(item)
          valueArr.push(
            {
              "customLabelName":item.name,//自定义属性名称
              "customLabelValue":item.type==1 ? item.radio : item.type==2 ? item.checkedValue.join(',') :item.type==3 ? item.select :item.type==5 ?item.value :item.type==6 ? item.daterange.join(',') :'',//自定义属性值
              "customLabelType":item.type//属性类型:单选 1 复选2 下拉3 列表4 文本5 日期6
            },
          )
      })
      valueArr.forEach(item => {
        // console.log(11111)
        if(item.customLabelValue){
          newArr.push(item)
        }
      });


      this.content = [
        //基本属性
        {
            "basicSex":this.baseData.sex,//性别（0：女，1：男）
            "basicBirthdayStart":this.baseData.birthCondition ==2 ?  this.baseData.daterange[0] :this.baseData.birthCondition ==3 ?  this.baseData.date : '',//生日开始时间（介于：两个都有值，早于：结束时间有值，开始时间为空，晚于：开始时间有值，结束时间为空）

            "basicBirthdayEnd":this.baseData.birthCondition ==2 ?  this.baseData.daterange[1] :this.baseData.birthCondition ==1 ?  this.baseData.date :'',//生日结束时间
            "basicMobile": mobile,//手机号英文逗号分隔
            "basicMobileType":this.baseData.mobileType,//是否包含（1：包含，0：排除），选中其他表示排除列表其他号码前缀
            "basicPointType":this.baseData.pointType,//积分类型（互动积分:INTERACTION,交易积分:TRADE,全部积分:ALL）
            "basicMinPoint":this.baseData.pointCondition ==2 ?  this.baseData.minPoint :this.baseData.pointCondition ==3 ?  this.baseData.point : '',//积分最小值（介于：两个都有值，小于：积分最大值有值，积分最小值为空，大于：积分最小值有值，积分最大值为空）
            "basicMaxPoint":this.baseData.pointCondition ==2 ?  this.baseData.maxPoint :this.baseData.pointCondition ==1 ?  this.baseData.point : '',//积分最大值
            "basicGradeType":this.baseData.levelType,//等级类型：1：包含，0：不包含
            "basicGrade":this.baseData.level.join(','),//等级id
            "basicProvince":this.baseData.pro,//省份
            "basicCity":this.baseData.city,//城市
            "basicMemberStartTime":this.baseData.entryTimeCondition ==2 ?  this.baseData.entryTimerange[0] :this.baseData.entryTimeCondition ==3 ?  this.baseData.entryTime : '',//入会开始时间（介于：两个都有值，早于：结束时间有值，开始时间为空，晚于：开始时间有值，结束时间为空）
            "basicMemberEndTime":this.baseData.entryTimeCondition ==2 ?  this.baseData.entryTimerange[1] :this.baseData.entryTimeCondition ==1 ?  this.baseData.entryTime : '',//入会结束时间
            "basicEmailType":type,//邮箱类型（1：包含，0：不包含）:全部：为包含，basicEmail传空，其他为不包含，basicEmail传未选中的
            "basicEmail":email,//邮箱英文逗号分隔
            "basicMemberSourceType":this.baseData.sourceCondition,//客户来源类型（1：包含，0：不包含）
            "basicMemberSource":this.baseData.source,//客户来源英文逗号分隔
            "type":"BASIC"//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
        },
        // {
        //     "basicSex":this.baseData.sex===0?0:this.baseData.sex==1?1:null,//性别（0：女，1：男）
        //     "basicBirthdayStart":this.baseData.birthCondition ==2 ?  this.baseData.daterange[0] :this.baseData.birthCondition ==3 ?  this.baseData.date : null,//生日开始时间（介于：两个都有值，早于：结束时间有值，开始时间为空，晚于：开始时间有值，结束时间为空）

        //     "basicBirthdayEnd":this.baseData.birthCondition ==2 ?  this.baseData.daterange[1] :this.baseData.birthCondition ==1 ?  this.baseData.date :null,//生日结束时间
        //     "basicMobile": mobile.length==0?null : mobile,//手机号英文逗号分隔
        //     "basicMobileType":this.baseData.mobileType===0? 0:this.baseData.mobileType==1?1:null ,//是否包含（1：包含，0：排除），选中其他表示排除列表其他号码前缀
        //     "basicPointType":this.baseData.pointType?this.baseData.pointType :null,//积分类型（互动积分:INTERACTION,交易积分:TRADE,全部积分:ALL）
        //     "basicMinPoint":this.baseData.pointCondition ==2 ?  this.baseData.minPoint :this.baseData.pointCondition ==3 ?  this.baseData.point : null,//积分最小值（介于：两个都有值，小于：积分最大值有值，积分最小值为空，大于：积分最小值有值，积分最大值为空）
        //     "basicMaxPoint":this.baseData.pointCondition ==2 ?  this.baseData.maxPoint :this.baseData.pointCondition ==1 ?  this.baseData.point : null,//积分最大值
        //     "basicGradeType":this.baseData.levelType===0? 0:this.baseData.levelType==1?1:null,//等级类型：1：包含，0：不包含
        //     "basicGrade":this.baseData.level.join(',').length!=0?this.baseData.level.join(','):null,//等级id
        //     "basicProvince":this.baseData.pro?this.baseData.pro:null,//省份
        //     "basicCity":this.baseData.city?this.baseData.city:null,//城市
        //     "basicMemberStartTime":this.baseData.entryTimeCondition ==2 ?  this.baseData.entryTimerange[0] :this.baseData.entryTimeCondition ==3 ?  this.baseData.entryTime : null,//入会开始时间（介于：两个都有值，早于：结束时间有值，开始时间为空，晚于：开始时间有值，结束时间为空）
        //     "basicMemberEndTime":this.baseData.entryTimeCondition ==2 ?  this.baseData.entryTimerange[1] :this.baseData.entryTimeCondition ==1 ?  this.baseData.entryTime : null,//入会结束时间
        //     "basicEmailType":type===0?0:type==1?1:null,//邮箱类型（1：包含，0：不包含）:全部：为包含，basicEmail传空，其他为不包含，basicEmail传未选中的
        //     "basicEmail":email.length!=0?email:null,//邮箱英文逗号分隔
        //     "basicMemberSourceType":this.baseData.sourceCondition===0?0:this.baseData.sourceCondition==1?1:null,//客户来源类型（1：包含，0：不包含）
        //     "basicMemberSource":this.baseData.source.length!=0?this.baseData.source:null,//客户来源英文逗号分隔
        //     "type":"BASIC"//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
        // },
        //RFM属性
        {
          "type":"RFM",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段



          //第一次付款时间
          "rfmFirstPayTimeType":this.rfmData.payTimeType,//首次付款时间类型（1：绝对，2：距离当前）
          "rfmFirstPayTimeStart":this.rfmData.payTimeType ==2 ? this.rfmData.payTimeMinDay :  this.rfmData.payTime[0],//首次付款开始时间（绝对：具体时间，距离当前：天数） payTimeMinDay
          "rfmFirstPayTimeEnd":this.rfmData.payTimeType ==2 ? this.rfmData.payTimeMaxDay :  this.rfmData.payTime[1],//首次付款结束时间（绝对：具体时间，距离当前：天数） payTimeMaxDay


          //最近一次付款时间
          "rfmLastPayTimeType":this.rfmData.lastPayType,//最近一次付款时间类型（1：绝对，2：距离当前）
          "rfmLastPayTimeStart":this.rfmData.lastPayType ==2 ? this.rfmData.lastPayTimeMinDay :  this.rfmData.lastPayTime[0],//最近一次付款开始时间（绝对：具体时间，距离当前：天数）
          "rfmLastPayTimeEnd":this.rfmData.lastPayType ==2 ? this.rfmData.lastPayTimeMaxDay :  this.rfmData.lastPayTime[1],//最近一次付款结束时间（绝对：具体时间，距离当前：天数）


          //首次下单时间
          "rfmFirstOrderTimeType":this.rfmData.firstOrderType,//首次下单时间类型（1：绝对，2：距离当前）
          "rfmFirstOrderTimeStart":this.rfmData.firstOrderType ==2 ? this.rfmData.firstOrderTimeMinDay :  this.rfmData.firstOrderTime[0],//首次下单开始时间（绝对：具体时间，距离当前：天数）
          "rfmFirstOrderTimeEnd":this.rfmData.firstOrderType ==2 ? this.rfmData.firstOrderTimeMaxDay :  this.rfmData.firstOrderTime[1],//首次下单结束时间（绝对：具体时间，距离当前：天数）


          //最近一次成功时间
          "rfmLastSuccessTimeType":this.rfmData.lastSucType,//最近一次成功时间类型（1：绝对，2：距离当前）
          "rfmLastSuccessTimeStart":this.rfmData.lastSucType ==2 ? this.rfmData.lastSucTimeMinDay :  this.rfmData.lastSucTime[0],//最近一次成功开始时间（绝对：具体时间，距离当前：天数）
          "rfmLastSuccessTimeEnd":this.rfmData.lastSucType ==2 ? this.rfmData.lastSucTimeMaxDay :  this.rfmData.lastSucTime[1],//最近一次成功结束时间（绝对：具体时间，距离当前：天数）


          //交易成功次数
          "rfmTradeSuccessMinTimes":this.rfmData.condition ==2 ?  this.rfmData.minTimes :this.rfmData.condition ==1 ?  this.rfmData.times : '',//交易成功最小次数
          "rfmTradeSuccessMaxTimes":this.rfmData.condition ==2 ?  this.rfmData.maxTimes :this.rfmData.condition ==3 ?  this.rfmData.times : '',//交易成功最大次数
       
          //下单次数
          "rfmOrderMinTimes":this.rfmData.orderCondition ==2 ?  this.rfmData.orderMinTimes :this.rfmData.orderCondition ==1 ?  this.rfmData.orderTimes : '',//下单最小次数
          "rfmOrderMaxTimes":this.rfmData.orderCondition ==2 ?  this.rfmData.orderMaxTimes :this.rfmData.orderCondition ==3 ?  this.rfmData.orderTimes : '',//下单最大次数


          //下单金额
          
          "rfmOrderMinTotal":this.rfmData.orderMoneyCondition ==2 ?  this.rfmData.orderMoneyMinTimes :this.rfmData.orderMoneyCondition ==1 ?  this.rfmData.orderMoneyTimes : '',//下单最小总额
          "rfmOrderMaxTotal":this.rfmData.orderMoneyCondition ==2 ?  this.rfmData.orderMoneyMaxTimes :this.rfmData.orderMoneyCondition ==3 ?  this.rfmData.orderMoneyTimes : '',//下单最大总额

          //付款次数

          "rfmPayMinTimes":this.rfmData.payCondition ==2 ?  this.rfmData.payMinTimes :this.rfmData.payCondition ==1 ?  this.rfmData.payTimes : '',//付款最小次数
          "rfmPayMaxTimes":this.rfmData.payCondition ==2 ?  this.rfmData.payMaxTimes :this.rfmData.payCondition ==3 ?  this.rfmData.payTimes : '',//付款最大次数


          //成功金额
          "rfmSuccessMinTotal":this.rfmData.sucCondition ==2 ?  this.rfmData.sucMinTimes :this.rfmData.sucCondition ==1 ?  this.rfmData.sucTimes : '',//成功最小金额
          "rfmSuccessMaxTotal":this.rfmData.sucCondition ==2 ?  this.rfmData.sucMaxTimes :this.rfmData.sucCondition ==3 ?  this.rfmData.sucTimes : '',//成功最大金额


             //付款金额
          "rfmPayMinTotal":this.rfmData.payMoneyCondition ==2 ?  this.rfmData.payMoneyMinTimes :this.rfmData.payMoneyCondition ==1 ?  this.rfmData.payMoneyTimes : '',//付款最小金额
          "rfmPayMaxTotal":this.rfmData.payMoneyCondition ==2 ?  this.rfmData.payMoneyMaxTimes :this.rfmData.payMoneyCondition ==3 ?  this.rfmData.payMoneyTimes : '',//付款最大金额


          //退款次数
          "rfmRefundMinTimes":this.rfmData.returnCondition ==2 ?  this.rfmData.returnMinTimes :this.rfmData.returnCondition ==1 ?  this.rfmData.returnTimes : '',//退款最小次数
          "rfmRefundMaxTimes":this.rfmData.returnCondition ==2 ?  this.rfmData.returnMaxTimes :this.rfmData.returnCondition ==3 ?  this.rfmData.returnTimes : '',//退款最大次数

          //退款金额
          "rfmRefundMinTotal":this.rfmData.returnMoneyCondition ==2 ?  this.rfmData.returnMoneyMinTimes :this.rfmData.returnMoneyCondition ==1 ?  this.rfmData.returnMoneyTimes : '',//退款最小金额
          "rfmRefundMaxTotal":this.rfmData.returnMoneyCondition ==2 ?  this.rfmData.returnMoneyMaxTimes :this.rfmData.returnMoneyCondition ==3 ?  
          this.rfmData.returnMoneyTimes : '',//退款最大金额


            //客单价
          "rfmAtvMin":this.rfmData.oneMoneyCondition ==2 ?  this.rfmData.oneMoneyMinTimes :this.rfmData.oneMoneyCondition ==1 ?  this.rfmData.oneMoneyTimes : '',//客单价最小值
          "rfmAtvMax":this.rfmData.oneMoneyCondition ==2 ?  this.rfmData.oneMoneyMaxTimes :this.rfmData.oneMoneyCondition ==3 ?  this.rfmData.oneMoneyTimes : '',//客单价最大值


          //客单件
          "rfmUptMin":this.rfmData.oneCondition ==2 ?  this.rfmData.oneMinTimes :this.rfmData.oneCondition ==1 ?  this.rfmData.oneTimes : '',//客单件最小值
          "rfmUptMax":this.rfmData.oneCondition ==2 ?  this.rfmData.oneMaxTimes :this.rfmData.oneCondition ==3 ?  this.rfmData.oneTimes : ''//客单件最大值
        },
        //营销属性
        {
          "type":"MARKETING",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段


          "marketingLastSmsTimeType":this.marketingData.lastSmsType,//最近一次短信营销时间类型（1：绝对，2：距离当前）
          "marketingLastSmsTimeStart":this.marketingData.lastSmsType==2? this.marketingData.lastSmsTimeMin : this.marketingData.lastSmsTime[0],//最近一次短信营销开始时间（绝对：具体时间，距离当前：天数）
          "marketingLastSmsTimeEnd":this.marketingData.lastSmsType==2? this.marketingData.lastSmsTimeMax : this.marketingData.lastSmsTime[1],//最近一次短信营销结束时间（绝对：具体时间，距离当前：天数）


          "marketingLastEdmTimeType":this.marketingData.lastEmailType,//最近一次邮件营销时间类型（1：绝对，2：距离当前）
          "marketingLastEdmTimeStart":this.marketingData.lastEmailType==2? this.marketingData.lastEmailTimeMin : this.marketingData.lastEmailTime[0],//最近一次邮件营销开始时间（绝对：具体时间，距离当前：天数）
          "marketingLastEdmTimeEnd":this.marketingData.lastEmailType==2? this.marketingData.lastEmailTimeMax : this.marketingData.lastEmailTime[1],//最近一次短邮件销结束时间（绝对：具体时间，距离当前：天数）



          "marketingSmsBacklist":this.marketing.value3 ? 1 : '',//营销短信黑名单（1：排除，传空为不排除）
          "marketingEdmBacklist":this.marketing.value4 ? 1 : '',//营销邮件黑名单（1：排除，传空为不排除）



          "marketingSmsTimesMin":this.marketingData.smsTimes,//短信营销次数最小值
          "marketingSmsTimesMax":this.marketingData.smsTimes,//短信营销次数最大值
          "marketingEdmTimesMin":this.marketingData.emailTimes,//邮件营销次数最小值
          "marketingEdmTimesMax":this.marketingData.emailTimes//邮件营销次数最大值
        },
        //交易属性
        {
            "type":"TRADE",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
            "tradeSkuCode":goods.join(','),//商品id英文逗号分隔
            "tradeStatus":this.dealData.statu.join(','),//订单状态英文逗号分隔,可选状态如下：//TRADE_NO_CREATE_PAY(没有创建支付宝交易) //WAIT_BUYER_PAY(等待买家付款) //WAIT_SELLER_SEND_GOODS(等待卖家发货,即:买家已付款) //WAIT_BUYER_CONFIRM_GOODS(等待买家确认收货,即:卖家已发货) //TRADE_BUYER_SIGNED(买家已签收,货到付款专用) //TRADE_FINISHED(交易成功) //TRADE_CLOSED(付款以后用户退款成功，交易自动关闭) //TRADE_CLOSED_BY_TAOBAO(付款以前，卖家或买家主动关闭交易)//PAY_PENDING(国际信用卡支付付款确认中)
            "tradeTotalMin":this.dealData.moneyType ==2 ? this.dealData.minMoney : this.dealData.moneyType ==1 ? this.dealData.money :'',//订单金额最小值
            "tradeTotalMax":this.dealData.moneyType ==2 ? this.dealData.maxMoney : this.dealData.moneyType ==3 ? this.dealData.money :'',//订单金额最大值
            "tradeSource":this.dealData.source.join(',')//订单来源：PC:PC端，WAP:手机端，JHS：聚划算
        },
        //自定义属性
        {
            "type":"LABEL",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
            "custom":newArr
        },
      ]
      var data = {
        'shopInfoId':this.shopId,
        'content' : this.content
      }
      
      this.$http.post("" + process.env.API_ROOT + "/customer/manage/customerGroup/calcPeopleOnTime", data)
      .then(res => {
        // console.log('人数',res);
        if (res.data.code == 1) {
          this.num = res.data.data.edm + res.data.data.sms +res.data.data.tb
          // console.log(this.num)
        } else {
          this.num = 0
  
        }
      })
      .catch(err => {
        console.log(err);

        alert("网络异常");
      });
    },

    handleSelectionChange(val) {
      // console.log(val)
      this.selectGoods = val;
    },
    // 清空标签
    clearTag(){
      this.num =0
      this.change={
        value1:false,
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
        value7:false,
        value8:false,
        value9:false,
        value10:false,
      }
      this.deal={
        value1:false,
        value2:false,
        value3:false,
        value4:false,
      }
      this.marketing={
        value1:false,
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
      },
      this.rfm={
        value1:false,
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
        value7:false,
        value8:false,
        value9:false,
        value10:false,
        value11:false,
        value12:false,
        value13:false,
        value14:false,
      }
      this.pro.forEach(item => {
        item.value = false
      });
    },
    sub(){
      console.log(this.radio)
      if(this.radio){
        this.getMore(this.id)
      }else{
        if(this.radio !==0){
          
          this.$message({
            type:'error',
            message:'请选择一条分组'
          })
        } 
      }
    },
    //保存分组
    save(){
      var type = ''
      var email = ''
      // 全选情况下
      if(this.baseData.checkAll){
        type=1
        email = ''
      }else{ 
        //非全选
        //如果 有其他 为排除
        if(this.baseData.checkedCities.join(',').indexOf('其他')!=-1){
          type=0
          //一个没有 2个有
          //无163
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')!=-1  && this.baseData.checkedCities.join(',').indexOf('@sina.com')!=-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@163.com'
          }
          //无sina
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')!=-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')!=-1){
            email = '@sina.com'
          }
          //无qq
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')!=-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')!=-1){
            email = '@qq.com'
          }
          
          //有一个有  2个没有
          //有sina
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')!=-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@qq.com,@163.com'
          }
          //有qq
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')!=-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@163.com,@sina.com'
          }
          //有163
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')!=-1){
            email = '@163.com,@qq.com'
          }
          //3这都没有
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@qq.com,@sina.com,@163.com'
          }
        }else{
          //如果没有其他
          if(this.baseData.checkedCities.join(',').indexOf('@qq.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@sina.com')==-1 && this.baseData.checkedCities.join(',').indexOf('@163.com')==-1){
            type = ''
            email=''
          }else{
            type = 1
            email = this.baseData.checkedCities.join(',')
          }
        }
      }
      var mobile = ''
      if(this.baseData.mobile.join(',').indexOf('-1')!=-1){
        mobile = "130,131,132,133,134,135,136,137,138,139,145,146,147,148,149,150,151,152,153,155,156,157,158,159,165,166,170,171,172,173,174,175,176,177,178,180,181,182,183,184,185,186,187,188,189,191,198,199"
      }else{
        //非全部 有其他
        if(this.baseData.mobile.join(',').indexOf(',0')!=-1){
          console.log('非全部 有其他')
          console.log(this.baseData.mobile.join(','))
          mobile = this.baseData.mobile.join(',').replace(',0','')
          console.log(mobile)
        }else{
          //无其他
          console.log('非全部 无其他')
          mobile = this.baseData.mobile.join(',')
        }
      }
      var goods = []
      this.dealData.selectGoods.forEach(item=>{
        goods.push(item.sku_code)
      })
      var valueArr = []
      this.proData.forEach((item,index)=>{
        // console.log(item)
          valueArr.push(
            {
              "customLabelName":item.name,//自定义属性名称
              "customLabelValue":item.type==1 ? item.radio : item.type==2 ? item.checkedValue.join(',') :item.type==3 ? item.select :item.type==5 ?item.value :item.type==6 ? item.daterange.join(',') :'',//自定义属性值
              "customLabelType":item.type//属性类型:单选 1 复选2 下拉3 列表4 文本5 日期6
            },
          )
      })
      this.content = [
        // 基本属性
        {
            'basicStore' :this.baseData.store,
            "basicSex":this.baseData.sex,//性别（0：女，1：男）
            "basicBirthdayStart":this.baseData.birthCondition ==2 ?  this.baseData.daterange[0] :this.baseData.birthCondition ==3 ?  this.baseData.date : '',//生日开始时间（介于：两个都有值，早于：结束时间有值，开始时间为空，晚于：开始时间有值，结束时间为空）

            "basicBirthdayEnd":this.baseData.birthCondition ==2 ?  this.baseData.daterange[1] :this.baseData.birthCondition ==1 ?  this.baseData.date :'',//生日结束时间
            "basicMobile": mobile,//手机号英文逗号分隔
            "basicMobileType":this.baseData.mobileType,//是否包含（1：包含，0：排除），选中其他表示排除列表其他号码前缀
            "basicPointType":this.baseData.pointType,//积分类型（互动积分:INTERACTION,交易积分:TRADE,全部积分:ALL）
            "basicMinPoint":this.baseData.pointCondition ==2 ?  this.baseData.minPoint :this.baseData.pointCondition ==3 ?  this.baseData.point : '',//积分最小值（介于：两个都有值，小于：积分最大值有值，积分最小值为空，大于：积分最小值有值，积分最大值为空）
            "basicMaxPoint":this.baseData.pointCondition ==2 ?  this.baseData.maxPoint :this.baseData.pointCondition ==1 ?  this.baseData.point : '',//积分最大值
            "basicGradeType":this.baseData.levelType,//等级类型：1：包含，0：不包含
            "basicGrade":this.baseData.level.join(','),//等级id
            "basicProvince":this.baseData.pro,//省份
            "basicCity":this.baseData.city,//城市
            "basicMemberStartTime":this.baseData.entryTimeCondition ==2 ?  this.baseData.entryTimerange[0] :this.baseData.entryTimeCondition ==3 ?  this.baseData.entryTime : '',//入会开始时间（介于：两个都有值，早于：结束时间有值，开始时间为空，晚于：开始时间有值，结束时间为空）
            "basicMemberEndTime":this.baseData.entryTimeCondition ==2 ?  this.baseData.entryTimerange[1] :this.baseData.entryTimeCondition ==1 ?  this.baseData.entryTime : '',//入会结束时间
            "basicEmailType":type,//邮箱类型（1：包含，0：不包含）:全部：为包含，basicEmail传空，其他为不包含，basicEmail传未选中的
            "basicEmail":email,//邮箱英文逗号分隔
            "basicMemberSourceType":this.baseData.sourceCondition,//客户来源类型（1：包含，0：不包含）
            "basicMemberSource":this.baseData.source,//客户来源英文逗号分隔
            "type":"BASIC"//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
        },
        //RFM属性
        {
          "type":"RFM",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段



          //第一次付款时间
          "rfmFirstPayTimeType":this.rfmData.payTimeType,//首次付款时间类型（1：绝对，2：距离当前）
          "rfmFirstPayTimeStart":this.rfmData.payTimeType ==2 ? this.rfmData.payTimeMinDay :  this.rfmData.payTime[0],//首次付款开始时间（绝对：具体时间，距离当前：天数） payTimeMinDay
          "rfmFirstPayTimeEnd":this.rfmData.payTimeType ==2 ? this.rfmData.payTimeMaxDay :  this.rfmData.payTime[1],//首次付款结束时间（绝对：具体时间，距离当前：天数） payTimeMaxDay


          //最近一次付款时间
          "rfmLastPayTimeType":this.rfmData.lastPayType,//最近一次付款时间类型（1：绝对，2：距离当前）
          "rfmLastPayTimeStart":this.rfmData.lastPayType ==2 ? this.rfmData.lastPayTimeMinDay :  this.rfmData.lastPayTime[0],//最近一次付款开始时间（绝对：具体时间，距离当前：天数）
          "rfmLastPayTimeEnd":this.rfmData.lastPayType ==2 ? this.rfmData.lastPayTimeMaxDay :  this.rfmData.lastPayTime[1],//最近一次付款结束时间（绝对：具体时间，距离当前：天数）


          //首次下单时间
          "rfmFirstOrderTimeType":this.rfmData.firstOrderType,//首次下单时间类型（1：绝对，2：距离当前）
          "rfmFirstOrderTimeStart":this.rfmData.firstOrderType ==2 ? this.rfmData.firstOrderTimeMinDay :  this.rfmData.firstOrderTime[0],//首次下单开始时间（绝对：具体时间，距离当前：天数）
          "rfmFirstOrderTimeEnd":this.rfmData.firstOrderType ==2 ? this.rfmData.firstOrderTimeMaxDay :  this.rfmData.firstOrderTime[1],//首次下单结束时间（绝对：具体时间，距离当前：天数）


          //最近一次成功时间
          "rfmLastSuccessTimeType":this.rfmData.lastSucType,//最近一次成功时间类型（1：绝对，2：距离当前）
          "rfmLastSuccessTimeStart":this.rfmData.lastSucType ==2 ? this.rfmData.lastSucTimeMinDay :  this.rfmData.lastSucTime[0],//最近一次成功开始时间（绝对：具体时间，距离当前：天数）
          "rfmLastSuccessTimeEnd":this.rfmData.lastSucType ==2 ? this.rfmData.lastSucTimeMaxDay :  this.rfmData.lastSucTime[1],//最近一次成功结束时间（绝对：具体时间，距离当前：天数）


          //交易成功次数
          "rfmTradeSuccessMinTimes":this.rfmData.condition ==2 ?  this.rfmData.minTimes :this.rfmData.condition ==1 ?  this.rfmData.times : '',//交易成功最小次数
          "rfmTradeSuccessMaxTimes":this.rfmData.condition ==2 ?  this.rfmData.maxTimes :this.rfmData.condition ==3 ?  this.rfmData.times : '',//交易成功最大次数
       
          //下单次数
          "rfmOrderMinTimes":this.rfmData.orderCondition ==2 ?  this.rfmData.orderMinTimes :this.rfmData.orderCondition ==1 ?  this.rfmData.orderTimes : '',//下单最小次数
          "rfmOrderMaxTimes":this.rfmData.orderCondition ==2 ?  this.rfmData.orderMaxTimes :this.rfmData.orderCondition ==3 ?  this.rfmData.orderTimes : '',//下单最大次数


          //下单金额
          
          "rfmOrderMinTotal":this.rfmData.orderMoneyCondition ==2 ?  this.rfmData.orderMoneyMinTimes :this.rfmData.orderMoneyCondition ==1 ?  this.rfmData.orderMoneyTimes : '',//下单最小总额
          "rfmOrderMaxTotal":this.rfmData.orderMoneyCondition ==2 ?  this.rfmData.orderMoneyMaxTimes :this.rfmData.orderMoneyCondition ==3 ?  this.rfmData.orderMoneyTimes : '',//下单最大总额

          //付款次数

          "rfmPayMinTimes":this.rfmData.payCondition ==2 ?  this.rfmData.payMinTimes :this.rfmData.payCondition ==1 ?  this.rfmData.payTimes : '',//付款最小次数
          "rfmPayMaxTimes":this.rfmData.payCondition ==2 ?  this.rfmData.payMaxTimes :this.rfmData.payCondition ==3 ?  this.rfmData.payTimes : '',//付款最大次数


          //成功金额
          "rfmSuccessMinTotal":this.rfmData.sucCondition ==2 ?  this.rfmData.sucMinTimes :this.rfmData.sucCondition ==1 ?  this.rfmData.sucTimes : '',//成功最小金额
          "rfmSuccessMaxTotal":this.rfmData.sucCondition ==2 ?  this.rfmData.sucMaxTimes :this.rfmData.sucCondition ==3 ?  this.rfmData.sucTimes : '',//成功最大金额


             //付款金额
          "rfmPayMinTotal":this.rfmData.payMoneyCondition ==2 ?  this.rfmData.payMoneyMinTimes :this.rfmData.payMoneyCondition ==1 ?  this.rfmData.payMoneyTimes : '',//付款最小金额
          "rfmPayMaxTotal":this.rfmData.payMoneyCondition ==2 ?  this.rfmData.payMoneyMaxTimes :this.rfmData.payMoneyCondition ==3 ?  this.rfmData.payMoneyTimes : '',//付款最大金额


          //退款次数
          "rfmRefundMinTimes":this.rfmData.returnCondition ==2 ?  this.rfmData.returnMinTimes :this.rfmData.returnCondition ==1 ?  this.rfmData.returnTimes : '',//退款最小次数
          "rfmRefundMaxTimes":this.rfmData.returnCondition ==2 ?  this.rfmData.returnMaxTimes :this.rfmData.returnCondition ==3 ?  this.rfmData.returnTimes : '',//退款最大次数

          //退款金额
          "rfmRefundMinTotal":this.rfmData.returnMoneyCondition ==2 ?  this.rfmData.returnMoneyMinTimes :this.rfmData.returnMoneyCondition ==1 ?  this.rfmData.returnMoneyTimes : '',//退款最小金额
          "rfmRefundMaxTotal":this.rfmData.returnMoneyCondition ==2 ?  this.rfmData.returnMoneyMaxTimes :this.rfmData.returnMoneyCondition ==3 ?  
          this.rfmData.returnMoneyTimes : '',//退款最大金额


            //客单价
          "rfmAtvMin":this.rfmData.oneMoneyCondition ==2 ?  this.rfmData.oneMoneyMinTimes :this.rfmData.oneMoneyCondition ==1 ?  this.rfmData.oneMoneyTimes : '',//客单价最小值
          "rfmAtvMax":this.rfmData.oneMoneyCondition ==2 ?  this.rfmData.oneMoneyMaxTimes :this.rfmData.oneMoneyCondition ==3 ?  this.rfmData.oneMoneyTimes : '',//客单价最大值


          //客单件
          "rfmUptMin":this.rfmData.oneCondition ==2 ?  this.rfmData.oneMinTimes :this.rfmData.oneCondition ==1 ?  this.rfmData.oneTimes : '',//客单件最小值
          "rfmUptMax":this.rfmData.oneCondition ==2 ?  this.rfmData.oneMaxTimes :this.rfmData.oneCondition ==3 ?  this.rfmData.oneTimes : ''//客单件最大值
        },
        //营销属性
        {
          "type":"MARKETING",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段


          "marketingLastSmsTimeType":this.marketingData.lastSmsType,//最近一次短信营销时间类型（1：绝对，2：距离当前）
          "marketingLastSmsTimeStart":this.marketingData.lastSmsType==2? this.marketingData.lastSmsTimeMin : this.marketingData.lastSmsTime[0],//最近一次短信营销开始时间（绝对：具体时间，距离当前：天数）
          "marketingLastSmsTimeEnd":this.marketingData.lastSmsType==2? this.marketingData.lastSmsTimeMax : this.marketingData.lastSmsTime[1],//最近一次短信营销结束时间（绝对：具体时间，距离当前：天数）


          "marketingLastEdmTimeType":this.marketingData.lastEmailType,//最近一次邮件营销时间类型（1：绝对，2：距离当前）
          "marketingLastEdmTimeStart":this.marketingData.lastEmailType==2? this.marketingData.lastEmailTimeMin : this.marketingData.lastEmailTime[0],//最近一次邮件营销开始时间（绝对：具体时间，距离当前：天数）
          "marketingLastEdmTimeEnd":this.marketingData.lastEmailType==2? this.marketingData.lastEmailTimeMax : this.marketingData.lastEmailTime[1],//最近一次短邮件销结束时间（绝对：具体时间，距离当前：天数）



          "marketingSmsBacklist":this.marketing.value3 ? 1 : '',//营销短信黑名单（1：排除，传空为不排除）
          "marketingEdmBacklist":this.marketing.value4 ? 1 : '',//营销邮件黑名单（1：排除，传空为不排除）



          "marketingSmsTimesMin":this.marketingData.smsTimes,//短信营销次数最小值
          "marketingSmsTimesMax":this.marketingData.smsTimes,//短信营销次数最大值
          "marketingEdmTimesMin":this.marketingData.emailTimes,//邮件营销次数最小值
          "marketingEdmTimesMax":this.marketingData.emailTimes//邮件营销次数最大值
        },
        //交易属性
        {
            "type":"TRADE",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
            "tradeSkuCode":goods.join(','),//商品id英文逗号分隔
            "tradeStatus":this.dealData.statu.join(','),//订单状态英文逗号分隔,可选状态如下：//TRADE_NO_CREATE_PAY(没有创建支付宝交易) //WAIT_BUYER_PAY(等待买家付款) //WAIT_SELLER_SEND_GOODS(等待卖家发货,即:买家已付款) //WAIT_BUYER_CONFIRM_GOODS(等待买家确认收货,即:卖家已发货) //TRADE_BUYER_SIGNED(买家已签收,货到付款专用) //TRADE_FINISHED(交易成功) //TRADE_CLOSED(付款以后用户退款成功，交易自动关闭) //TRADE_CLOSED_BY_TAOBAO(付款以前，卖家或买家主动关闭交易)//PAY_PENDING(国际信用卡支付付款确认中)
            "tradeTotalMin":this.dealData.moneyType ==2 ? this.dealData.minMoney : this.dealData.moneyType ==1 ? this.dealData.money :'',//订单金额最小值
            "tradeTotalMax":this.dealData.moneyType ==2 ? this.dealData.maxMoney : this.dealData.moneyType ==3 ? this.dealData.money :'',//订单金额最大值
            "tradeSource":this.dealData.source.join(','),//订单来源：PC:PC端，WAP:手机端，JHS：聚划算
        },
        //自定义属性
        {
            "type":"LABEL",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
            "custom":valueArr
        },
      ]



      var data ={
        "customerGroupName":this.form.name,//分组名称
        "catalogId":this.form.catalog,//目录id
        "shopInfoId":this.shopId,//店铺id
        'content':this.content
      }

      // console.log(data)

      


        







      // /customer/manage/customerGroup/add
      this.$http
          .post("" + process.env.API_ROOT + "/customer/manage/customerGroup/add", data)
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
             this.$message({
               type:'success',
               message:'保存成功'
             })
              this.back()
            } else {
      
            }
          })
          .catch(err => {
            console.log(err);

            alert("网络异常");
          });
    },
    //获取自定义属性
    //获取自定义属性列表
    getProList(shopid) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/property/getEnabledProperties?shopInfoId=" +
          shopid 
      })
        .then(res => {
          // console.log("自定义属性列表", res);
          if (res.data.code == 1) {
            this.proList = res.data.data;
            this.pro=[];
            for(var i =0;i<this.proList.length;i++){
              this.pro.push({
                value:false
              })
            } 
            // console.log(this.pro)
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    rowClick(row){
      // this.pageSize * (this.currentPage - 1) + index + 1;
      this.radio = this.tableData.indexOf(row) +1 +this.pageSize * (this.currentPage - 1);
      this.id =row.customer_group_id
      console.log(row)
    },
    getMore(id) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/customerGroup/queryOne?customerGroupId=" +
          id 
      })
        .then(res => {
          console.log("分组详情", res);
          if (res.data.code == 1) {
            console.log(JSON.parse(res.data.data.customerGroupContent))
            var data = JSON.parse(res.data.data.customerGroupContent)
            Bus.$emit('tagData',data);
            // this.radio = '';
            // this.id='';
              if(data[0]){
                //性别显示否
                if(data[0].basicSex==1 ||data[0].basicSex===0){
                  this.change.value1 = true
                }
                //生日显示否
                if(data[0].basicBirthdayStart || data[0].basicBirthdayEnd){
                  this.change.value2 = true
                }
                //手机显示否
                if(data[0].basicMobile){
                  this.change.value3= true
                }
                //积分显示否
                if(data[0].basicPointType){
                  this.change.value4= true
                }
                //等级显示否
                if(data[0].basicGrade){
                  this.change.value5= true
                }
                //地区显示否
                if(data[0].basicProvince){
                  this.change.value6= true
                }
                //入会时间显示否
                if(data[0].basicMemberStartTime || data[0].basicMemberEndTime){
                  this.change.value7= true
                }
                //邮箱显示否
                if(data[0].basicEmailType ===0 || data[0].basicEmailType ==1){
                  this.change.value8= true
                }
                //客户来源显示否
                if(data[0].basicMemberSource){
                  this.change.value9= true
                }
              }else{
                
              }
//               rfmFirstPayTimeEnd: "2019-05-07"
// rfmFirstPayTimeStart: "2019-04-11"
// rfmFirstPayTimeType: 1


// rfmLastPayTimeEnd: "2019-05-18"
// rfmLastPayTimeStart: "2019-04-11"
// rfmLastPayTimeType: 1


// rfmFirstOrderTimeEnd: "2019-05-23"
// rfmFirstOrderTimeStart: "2019-04-24"
// rfmFirstOrderTimeType: 1

// rfmLastSuccessTimeEnd: "2019-05-14"
// rfmLastSuccessTimeStart: "2019-04-23"
// rfmLastSuccessTimeType: 1

              //rfm属性显示否 
              if(data[1]){
                //首次付款时间显示否
                if(data[1].rfmFirstPayTimeType){
                  this.rfm.value1 = true
                }
                //最近一次付款时间显示否
                if(data[1].rfmLastPayTimeType){
                  this.rfm.value2 = true
                }
                //首次下单时间显示否
                if(data[1].rfmFirstOrderTimeType){
                  this.rfm.value3= true
                }
                //最近一次成功时间显示否
                if(data[1].rfmLastSuccessTimeType){
                  this.rfm.value4= true
                }
                //交易成功次数
                if(data[1].rfmTradeSuccessMinTimes || data[1].rfmTradeSuccessMaxTimes){
                  this.rfm.value5= true
                }
                //下单次数
                if(data[1].rfmOrderMinTimes ||data[1].rfmOrderMaxTimes ){
                  this.rfm.value6= true
                }
                //下单总额
                if(data[1].rfmOrderMinTotal || data[1].rfmOrderMaxTotal ){
                  this.rfm.value7= true
                }
                //付款次数
                if(data[1].rfmPayMinTimes || data[1].rfmPayMaxTimes ){
                  this.rfm.value8= true
                }
                //成功金额
                if(data[1].rfmSuccessMinTotal || data[1].rfmSuccessMaxTotal){
                  this.rfm.value9= true
                }
                //付款金额
                if(data[1].rfmPayMinTotal || data[1].rfmPayMaxTotal){
                  this.rfm.value10= true
                }
                //退款次数
                if(data[1].rfmRefundMinTimes || data[1].rfmRefundMaxTimes){
                  this.rfm.value11= true
                }
                //退款金额
                if(data[1].rfmRefundMinTotal || data[1].rfmRefundMaxTotal){
                  this.rfm.value12= true
                }
                //客单价
                if(data[1].rfmAtvMin || data[1].rfmAtvMax){
                  this.rfm.value13= true
                }
                //客单件
                if(data[1].rfmUptMin || data[1].rfmUptMax){
                  this.rfm.value14= true
                }
              }else{
                
              }

              // 交易属性  显示否
              if(data[3]){
                if(data[3].tradeSkuCode){
                  this.deal.value1 = true 
                }
                if(data[3].tradeTotalMin || data[3].tradeTotalMax){
                  this.deal.value2 = true 
                }
                if(data[3].tradeStatus){
                  this.deal.value3 = true 
                }
                if(data[3].tradeSource){
                  this.deal.value4 = true 
                }
              }else{

              }


              if(data[2]){

                if(data[2].marketingLastSmsTimeStart && data[2].marketingLastSmsTimeEnd){
                  this.marketing.value1 = true 
                }
                if(data[2].marketingLastEdmTimeStart && data[2].marketingLastEdmTimeEnd){
                  this.marketing.value2 = true 
                }
                if(data[2].marketingSmsBacklist){
                  this.marketing.value3 = true 
                }
                if(data[2].marketingEdmBacklist){
                  this.marketing.value4 = true 
                }
                if(data[2].marketingSmsTimesMin){
                  this.marketing.value5 = true 
                }
                if(data[2].marketingEdmTimesMin){
                  this.marketing.value6 = true 
                }
              }else{

              }

              if(data[4]){
                if(data[4].custom.length == 0){
                  console.log('长度为0')
                }else{
                  console.log('长度不为0')
                    this.pro=[];

                  for(var i=0;i<=data[4].custom.length;i++){
                    this.pro.push({
                      value:true
                    })
                  }
                }
              }else{

              }



            } 
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    //改变目录
    changeCatalog(val){
      console.log(val)
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
    },
    // 获取分组列表
    getGroupList(pageIndex, pageSize, shopid) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/customerGroup/queryList?shopInfoId=" +
          shopid +'&customerGroupName=' + this.selStr +'&catalogId='+this.select +'&pageIndex='+pageIndex +'&pageSize='+pageSize
      })
        .then(res => {
          console.log("分组列表", res);
          if (res.data.code == 1) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          }else{
          }
        })
        .catch(error => {
          console.log(error);
          alert("网络异常");
        });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
    },
    // changeSize(val){
    //   console.log(`每页 ${val} 条`);
    //   this.goodsPageSize = val;
    // },
    // changePage(val){
    //   console.log(`每页 ${val} 条`);
    //   this.goodsCurrentPage = val;
    // },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
    },
    search(){
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
    },
    // searchGoods(){
    //   this.getGoods(this.shopId,this.goodsName,this.goodsId)
    // },

    qx(){
      this.dialogVisible = false
      this.insert = false
      
      this.resetForm('catalogForm')
    },
  
    commit() {
      
        this.$http
          .post("" + process.env.API_ROOT + "/customer/manage/catalog/add", {
            catalogName: this.catalogForm.catalogName ,
            shopInfoId: this.shopId,
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: "新增目录管理成功"
              });
              this.getCatalogList(this.shopId)
              this.qx();
              
            } else {
            if (res.data.code == -1) {
              this.$message({
                type: "error",
                message: "系统异常"
              });
            }
            if (res.data.code == 31001) {
              this.$message({
                type: "error",
                  message: '时间格式不正确'
              });
            }
            if (res.data.code == 31002) {
              this.$message({
                type: "error",
                message: "目录名称含有特殊字符"
              });
            }
            if (res.data.code == 31004) {
              this.$message({
                type: "error",
                message: "目录名称超出10个长度"
              });
            }
            if (res.data.code == 31005) {
              this.$message({
                type: "error",
                message: "目录名称已存在"
              });
            }
            if (res.data.code == 31006) {
              this.$message({
                type: "error",
                message: "目录不存在"
              });
            }
            if (res.data.code == 31007) {
              this.$message({
                type: "error",
                message: "目录下存在客户分组，不允许删除"
              });
            }
            if (res.data.code == 31008) {
              this.$message({
                type: "error",
                message: "目录已删除请勿重复操作"
              });
            }
            if (res.data.code == 31009) {
              this.$message({
                type: "error",
                message: "默认目录不可编辑"
              });
            }
            if (res.data.code == 31010) {
              this.$message({
                type: "error",
                message: "默认目录不可删除"
              });
            }
            }
          })
          .catch(err => {
            console.log(err);

            alert("网络异常");
          });
    },
    //引入已有分组
    add(){
      this.clearTag()
      this.insert = true
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)

    },
    //新建目录
    addCatalog(){
      this.dialogVisible = true
    },
    //表单验证
    resetForm(formName) {
      if(this.$refs[formName]){
      if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
      }else{
        this.$nextTick(()=>{
          this.$refs[formName].resetFields();
        })
      }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.commit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取目录列表
    getCatalogList(shopid) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/catalog/query?shopInfoId=" +
          shopid 
      })
        .then(res => {
          // console.log("目录管理列表", res);
          if (res.data.code == 1) {
            if(res.data.data.list.length!=0){
              this.form.catalog = res.data.data.list[0].catalog_id
            }else{
              this.form.catalog=''
            }
            this.catalogList = res.data.data.list
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error);
          alert("网络异常");
        });
    },
    receiveBaseMsg(data){
      // console.log(data)
      this.baseData = data 
    },
    receiveRfm(data){
      // console.log(data)
      this.rfmData = data
    },
    receiveDeal(data){
      console.log(data)
      this.dealData = data
    },
    receivePro(data){
      // console.log(data)
      this.proData = data
    },
    receiveMarketing(data){
      // console.log(data)
      this.marketingData = data

    },
    change1(){
      this.change.value1 = !this.change.value1
    },
    change2(){
      this.change.value2 = !this.change.value2
    },
    change3(){
      this.change.value3 = !this.change.value3
    },
    change4(){
      this.change.value4 = !this.change.value4
    },
    change5(){
      this.change.value5 = !this.change.value5
    },
    change6(){
      this.change.value6 = !this.change.value6
    },
    change7(){
      this.change.value7 = !this.change.value7
    },
    change8(){
      this.change.value8 = !this.change.value8
    },
    change9(){
      this.change.value9 = !this.change.value9
    },
    rfm1(){
      this.rfm.value1 = !this.rfm.value1
    },
    rfm2(){
      this.rfm.value2 = !this.rfm.value2
    },
    rfm3(){
      this.rfm.value3 = !this.rfm.value3
    },
    rfm4(){
      this.rfm.value4 = !this.rfm.value4
    },
    rfm5(){
      this.rfm.value5 = !this.rfm.value5
    },
    rfm6(){
      this.rfm.value6 = !this.rfm.value6
    },
    rfm7(){
      this.rfm.value7 = !this.rfm.value7
    },
    rfm8(){
      this.rfm.value8 = !this.rfm.value8
    },
    rfm9(){
      this.rfm.value9 = !this.rfm.value9
    },
    rfm10(){
      this.rfm.value10 = !this.rfm.value10
    },
    rfm11(){
      this.rfm.value11 = !this.rfm.value11
    },
    rfm12(){
      this.rfm.value12 = !this.rfm.value12
    },
    rfm13(){
      this.rfm.value13 = !this.rfm.value13
    },
    rfm14(){
      this.rfm.value14 = !this.rfm.value14
    },
    deal1(){
      this.deal.value1 = !this.deal.value1
    },
    deal2(){
      this.deal.value2 = !this.deal.value2
    },
    deal3(){
      this.deal.value3 = !this.deal.value3
    },
    deal4(){
      this.deal.value4 = !this.deal.value4
    },
    marketing1(){
      this.marketing.value1 = !this.marketing.value1
    },
    marketing2(){
      this.marketing.value2 = !this.marketing.value2
    },
    marketing3(){
      this.marketing.value3 = !this.marketing.value3
    },
    marketing4(){
      this.marketing.value4 = !this.marketing.value4
    },
    marketing5(){
      this.marketing.value5 = !this.marketing.value5
    },
    marketing6(){
      this.marketing.value6 = !this.marketing.value6
    },
    proChange(a){
      // console.log('序号',a)
      // console.log('值',this.pro[a])
      this.pro[a].value=!this.pro[a].value
      // console.log('数组',this.pro)
    },
    //返回
    back(){
      this.$router.push(
        {
          name:'group'
        }
      )
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
  // .el-select-dropdown{
  //   .el-scrollbar{
  //     .el-select-dropdown__wrap{
  //       ul{
  //         li{
  //           z-index: 100;
  //           .el-checkbox{
  //             width: 100%;
  //             // background: red
  //           }
  //         }
  //       }
  //     }
  //   }
    
  // }
.addGroup {
  .deal{
    .status{
      width: 30%;
    }
  }
  
      // .el-tag-info{
      //   width: 50%;
      //   text-overflow: ellipsis;
      //   overflow: hidden;
      //   white-space: nowrap
      // }
    .box {
    position: relative;
    margin: 0 20px 20px 20px;
    background: #ffffff;
    // box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    .btns {
      .select{
        float: right;
        margin-bottom: 12px ;
        .el-input__inner{
          border-radius: 0;
          // border:1px solid #ccc;
        }
      }
      .sel {
        width: 200px;
        float: right;
        line-height: 32px;
        height: 32px;
        margin: 0 0 12px 20px;
        .el-input__inner {
          border-radius: 0;
          height: 32px;
          line-height: 32px;
        }
        .el-input__icon {
          line-height: 32px;
        }
      }
    }
    .tab {

      .el-table {
        border: 1px solid #ccc;

        td {
          height: 50px;
          line-height: 50px;
          .cell {
            // overflow: hidden;
            // text-overflow:ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // -webkit-box-orient: vertical;
            // width:200px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
          }
              .el-dropdown-link{
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  color: #3366FF;
                  letter-spacing: 0;
                  line-height: 12px;
                  margin-right: 10px;
                  margin-left: 10px;
              }
          .el-button {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #3366ff;
            letter-spacing: 0;
            line-height: 12px;
          }
        }
      }
      .insertSub{
        float: right;
      }
    }

    .block {
      // position: absolute;
      // bottom: 26px;
      padding: 10px;
      .el-pagination__total {
        margin-left: 20%;
      }
      .btn-prev {
        margin-left: 20px;
      }
    }
  }
  .danger {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }

  // height: 100%;
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
  .addBox{
    padding: 0 30px;
    // background: pink;
    .form{
      padding: 0 30px  30px 0;
      box-sizing: border-box;
      // background: orange;
      width: 70%;
      float: left;
      h2{
          font-size: 16px;
          color: #333333;
          letter-spacing: 0.5px;
          line-height: 16px;
          font-weight: bold;
          padding-bottom: 20px ;
      }
      .el-form-item{
        border-bottom:  1px solid #ccc;
        margin-bottom: 0;
        padding: 20px 0 ;
        .el-form-item__label{
          text-align: left
        }
      }
      // .el-form-item:last-child{
      //   border-bottom: none;

      // }
      .choose{
        background: #fff;
        padding: 20px ;
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
        margin-bottom: 20px;
        .catalog,.name{
          width: 60%;
          .el-input__inner{
            border-radius: 0;
          }
        }
        // .insertGroup{

        // }
        .addCatalog{
          border: 1px solid #3366FF;
          span{
            color: #3366FF
          }
        }
        .addCatalog:hover,.addCatalog:focus{
          background: #fff
        }
      }
      .cal{
          padding: 10px 0 10px 20px ;
          background: #FAFAFA;
          .num{
            color: #3366FF
          }
      }
      .tag{
        background: #fff;
        padding: 20px ;
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
        background: #fff;
        
        .empty{
          width: 100%;
          text-align: center;
          padding: 50px 0;
          p{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999999;
            letter-spacing: 0.44px;
            text-align: center;
            line-height: 14px;
          }
          .last{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #999999;
            letter-spacing: 0.38px;
            text-align: center;
            line-height: 14px;
          }
         
        }
      }
    }
    .condition{
      box-sizing: border-box;
      // background: red;
      height: 500px;
      width: 30%;
      float: left;
      .el-collapse{
        background: #fff;
        padding: 10px;
        .el-collapse-item{
          .el-collapse-item__header{
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            line-height: 16px;
            font-weight: bold;
            padding: 10px 0;
          }
          .el-collapse-item__wrap{
            border-bottom: 1px solid #EBEEF5;
            .el-collapse-item__content{
              // display: flex;
              span{
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #666666;
                letter-spacing: 0;
                text-align: center;
                // line-height: 12px;
                margin: 5px  ;
                display: inline-block;
                padding: 5px 10px;
                border: 1px solid #ccc;
                -webkit-user-select:none;

                -moz-user-select:none;

                -ms-user-select:none;

                user-select:none;

              }
              .active{
                border: 1px solid #3366FF;
                color: #3366FF
              }
            }
          }
        }
        .el-collapse-item:last-child{
          .el-collapse-item__header{
            border: 0
          }
          .el-collapse-item__wrap{
            border: 0
          }
        }
      }
    }
  }
  .sub{
    display: flex;
    justify-content: center;
    padding-bottom: 20px 
  }
}
</style>
