<template>
     <!-- 查看控件 -->
    <div class="look" >    
      <div class="head clear">   
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
          <el-breadcrumb-item>客户营销</el-breadcrumb-item>
          <el-breadcrumb-item>短信营销</el-breadcrumb-item>  
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>      
        </el-breadcrumb>
        <h1> <i class="el-icon-back" @click="back"></i>  <span>营销活动详情</span>    </h1>
        
      </div>
       
      <div class="box">
        <div class="baseMsg">
          <h2>基本信息</h2>  
          <div><span>店铺名称</span>{{ruleForm.shop}}</div>
          <div><span>主题名称</span>{{ruleForm.themeName}}</div>
          <div><span>活动名称</span>{{ruleForm.actName}}</div>
        </div>  
        <div class="kz">
          <h2>快照选择</h2>  

          <div><span>快照名称</span>{{ruleForm.photo}}</div>
        </div>
        <div class="mb">
          <h2>短信模板</h2>  
          <div><span>执行时间</span>{{ruleForm.time1}}</div>
          <div><span>ROI统计时间段</span>{{ruleForm.roiTime[0]}} - {{ruleForm.roiTime[1]}}</div>
          <div><span>短信签名</span>{{ruleForm.signName}}</div>
          <div><span>短信内容</span>{{ruleForm.textarea}}</div>
        </div>
      </div> 
    </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
export default {
  name: 'Details',
  data () {
    
    return {
      ok:0,
      childrenBtn:true,
      look:false,
      id:'',
      toggle:0,
      //子流程
      children:[],
      // 测试短信内容
      content:'',
      photo:'',
      sign:'',
      theme:'',
      sendCost:'',
      payMoney:'',
      roi:'',
      reoprtTableData:[
      ],
      report:{
        roiTime:[],
        actName:'',
        theme:'',
        roiTime:[],
        id:'',
        createTime:''
      },
      rep:false,
      //短信内容
      sms:'',
      //指定只能选择当前时间之后的时间
      pickerOptions0:{ 
        disabledDate(time) {
          return time.getTime() <  (new Date()).getTime() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的 
        },
      },
      pickerOptions1:{ 
        disabledDate:(time)=> {
          return time.getTime() < new Date(this.report.createTime).getTime()- 8.64e7
        }
      },
      date:'',
      //搜索框需要参数
      actName:'',
      photo:'',
      // 短信字数
      num:0,
      //数据的个数
      total:0,
      //列表页搜索框数据
      value3:'',
      //表单数据
      ruleForm: {
        shop:'',
        theme:'',
        actName:'',
        sign:'',
        photo:'',
        mb:'',
        radio2:0,
        radio3:0,
        radio4:1,
        textarea:'',
        roiTime:[],
        time1:'',
        time2:[],
        marketingActivityId:''
      },
      rules1: {
        theme: [
          { required: true, message: '请选择主题', trigger: 'change' },
          { min: 1, max: 20, message: '主题名称不可超过20个字符', trigger: 'change'  }
        ],
        shop: [
          { required: true, message: '请选择店铺', trigger: 'change' }
        ]
      },
      //表单验证
      rules: {
        photo:[
          { required: true, message: '请选择快照', trigger: 'change' }
        ],
        theme: [
          { required: true, message: '请选择主题', trigger: 'blur' },
        ],
        actName: [
          { type: 'string', required: true, message: '请填写活动名称', trigger: 'blur' },
          { min: 1, max: 20, message: '活动名称不可超过20个字符', trigger: 'blur' }
        ],
        sign: [
          {  required: true, message: '请选择短信签名', trigger: 'change' }
        ],
        mb: [
          {  message: '请至少选择一个模板', trigger: 'blur' }
        ],
        textarea: [
          { required: true, message: '请填写短信内容', trigger: 'change' }
        ],
        roiTime: [
          { required: true, trigger: 'blur',validator:(rule, value, callback) => {
            if(value){
              // console.log('time1',new Date(value[0]).getTime(),new Date(value[1]).getTime())
              if (value.length==0 ) {
                callback(new Error('请选择roi时间段!'))
              }else{

                if(this.ruleForm.time1){
                  if(new Date(value[0]).getTime() < new Date(this.ruleForm.time1).getTime() ){
                  callback(new Error('roi开始时间要晚于定时执行时间'))
                  }else{
                    if(new Date(value[0]).getTime() == new Date(value[1]).getTime()){
                      callback(new Error('roi结束时间要晚于roi开始时间'))
                    }else{
                      callback()
                    }
                  }
                }else{
                  if(new Date(value[0]).getTime() < new Date().getTime() ){
                  callback(new Error('roi开始时间要晚于当前时间'))
                  }else{
                    if(new Date(value[0]).getTime() == new Date(value[1]).getTime()){
                      callback(new Error('roi结束时间要晚于roi开始时间'))
                    }else{
                      callback()
                    }
                  }
                }
              }}else{
                callback(new Error('请选择roi时间段!'))
              }
            }
          } 
        ],
        time1: [
           { required:true  ,trigger: 'blur' ,validator:formTest.time11Test} 
        ],
        time2: [
           { required:true , message: '请选择排除已购时间段', trigger: 'blur' } 
        ],
        time: [
           { message: '', trigger: 'blur' } 
        ]
      },
      //新建控件显示否
      none:'true',
      //下拉菜单选择
      select:'全部名称',
      //列表页的时间选择
      value4:'',
      themeForm: {
        shop: '',
        theme: '',
      },
      //在上边提示
      labelPosition: 'top',
      // 查看流程 显示否
      childdialogVisible:false,
      //添加主题狂 显示否
      dialogVisible: false,
      //测试短信框 显示否
      csdialogVisible: false,
      //短信内容 显示否
      smsdialogVisible:false,
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
      //快照列表
      photoList: [],
      //编辑禁用
      bj:false,
      //查看禁用
      // ck:false,
      fob:false,
      sendCount:0,
    }
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    }
  },
  created(){
    this.getMore(this.$route.params.id)
    console.log(this.shopId)
    this.getShopList()
    console.log(this.$refs)
  },
  watch:{
    shopId:{
      handler: function(n, o) {
        if(n!=o){
        this.getList(this.currentPage,this.pageSize,this.shopId)
        }
      }
    },
    "ruleForm.textarea": {
      handler: function(n, o) {
        
        console.log(n.length)
        if(n!=o){
          //计算字数
          this.num = this.ruleForm.textarea.length;
          console.log(this.num)
          if(this.num>300){
            this.ruleForm.textarea = this.ruleForm.textarea.substring(0,300)
          }
          if(this.num==0){
            this.sendCount = 0
          }
          if(this.num>0 && this.num<68){
            this.sendCount = 1
          }
          if(this.num>67 && this.num<135){
            this.sendCount = 2
          }
          if(this.num>134 && this.num<202){
            this.sendCount = 3
          }
          if(this.num>201 && this.num<269){
            this.sendCount = 4
          }
          if(this.num>268){
            this.sendCount = 5
          }
        }
      }
    },
    ok:{
      handler:function(n,o){
        console.log(n,o)
      }
    },
    'ruleForm.radio2':{
      handler:function(n,o){
        if(n!=o){
          if(n==0){
            this.ruleForm.time1 = ''
            if(this.ruleForm.roiTime){
              if(new Date().getTime() > new Date(this.ruleForm.roiTime[0]).getTime()){
                this.$message({
                  type:'error',
                  message:'roi开始时间早于活动开始时间'
                })
                console.log('radio2')
                this.ok = 0
              }else{
                this.ok = 1
              }
            }
              
          }
        }
      }
    },
    'ruleForm.radio3':{
      handler:function(n,o){
        if(n!=o){
          if(n==0){
            this.ruleForm.time2 = []
          }
        }
      }
    },
    'ruleForm.time1':{
      handler:function(n,o){
        if(n!=o){
          if(this.ruleForm.roiTime){
            if(new Date(this.ruleForm.time1).getTime() > new Date(this.ruleForm.roiTime[0]).getTime()){
              console.log('time1')
              this.ok = 0
              console.log(this.ok)
              this.$message({
                type:'error',
                message:'roi开始时间早于活动开始时间'
              })
            }else{
              this.ok = 1
            }
            
          if((new Date(this.ruleForm.roiTime[0]).getTime()) == (new Date(this.ruleForm.roiTime[1]).getTime())){
              this.ok = 3
              this.$message({
                type:'error',
                message:'roi开始时间须晚于roi结束时间'
              })
          }else{
              this.ok = 1

          }
          }


          if(this.ruleForm.radio2==1){
            if(new Date(n).getTime() < new Date().getTime()){
                this.$message({
                type:'error',
                message:'定时执行时间要晚于当前时间'
              })
              this.ok = 2
            }
          }
        }
      }
    },
    'ruleForm.roiTime':{
      handler:function(n,o){

        if(n!=o){
        
           


          if(this.ruleForm.time1){
            if(new Date(this.ruleForm.time1).getTime() > new Date(this.ruleForm.roiTime[0]).getTime()){
              this.$message({
                type:'error',
                message:'roi开始时间早于活动开始时间'
              })
              console.log("roi")
              this.ok = 0
            }else{
              this.ok = 1
            }

            if(this.ruleForm.roiTime){
          if((new Date(this.ruleForm.roiTime[0]).getTime()) == (new Date(this.ruleForm.roiTime[1]).getTime())){
              this.ok = 3
              this.$message({
                type:'error',
                message:'roi开始时间须晚于roi结束时间'
              })
          }else{
              this.ok = 1

          }
        }

          }else{
            if(new Date().getTime() > new Date(this.ruleForm.roiTime[0]).getTime()){
              this.$message({
                type:'error',
                message:'roi开始时间早于活动开始时间'
              })
              this.ok = 0
            }else{
              this.ok = 1
            }
            if(this.ruleForm.roiTime){
          if((new Date(this.ruleForm.roiTime[0]).getTime()) == (new Date(this.ruleForm.roiTime[1]).getTime())){
              this.ok = 3
              this.$message({
                type:'error',
                message:'roi开始时间须晚于roi结束时间'
              })
          }else{
              this.ok = 1
          }
        }
          }


              console.log(this.ok)

        }
      },
      deep:true
    },
    children:{
      handler:function(n,o){
        var num =0
        n.forEach(item=>{
          if(item.executionStatus !=1){
            num++ 
          }
        })
        if(num !=0){
          this.childrenBtn = true
        }else{
          this.childrenBtn = false
        }
      },
      deep:true
      
    },
  },
  methods:{
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid  && this.ok ==1) {
          this.submit();
        } else {
          console.log('error submit!!');
          if(this.ok ==0){
            this.$message({
              type:'error',
              message:'roi开始时间早于活动开始时间'
            })
          }
          if(this.ok ==2){
            this.$message({
              type:'error',
              message:'定时执行时间要晚于当前时间'
            })
          }
          if(this.ok ==3){
            this.$message({
              type:'error',
              message:'roi结束时间必须晚于roi开始时间'
            })
          }
          return false;
        }
      });  
    },    
    q(index){
     return this.pageSize * (this.currentPage-1) + index +1
    },
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.commit();
        } else {
          console.log('error submit!!');
          return false;
        }
      });  
    },
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
      this.none = true
    },
    resetForm1(formName) {
      if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
      }else{
        this.$nextTick(()=>{
          this.$refs[formName].resetFields();
        })
      }
    },
    // 忽略并发送
    ignore(activityId){
      this.$http.post(''+process.env.API_ROOT+'/marketing/sendAgain',{
        "activityId":activityId
      }
      ).then(res => {
          console.log("忽略并发送", res);
          if(res.data.code ==1 ){
              this.childdialogVisible=false
            
            this.$message({
              type:'success',
              message : '发送成功'
            })
          }
          
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    qx(){
      this.csdialogVisible = false;
      this.content = ''
    },
    // 重试
    retry(activityId){
      this.toggle = 1;
      this.fob = true;
      this.$http.post( 
          ''+process.env.API_ROOT+'/marketing/reTry',
          {
            "activityId": activityId,
         
          }
        ).then(res => {
            console.log("重试", res);
            if(res.data.code ==1){
              this.csdialogVisible = false
              this.getChildren(activityId)
              this.content = ''
              this.toggle = 0;

              this.$message({
                type:'success',
                message:'重新获取成功'
              })
            }else{
              this.toggle = 0;
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //发送测试短信
    send(shopInfoId,mobiles,content,noticeRegisterId){
        this.$http.post(
          
          ''+process.env.API_ROOT+'/notice/sms/send/test',
          {
            "shopInfoId": shopInfoId,
            "mobiles":mobiles,
            "content": content,
            "noticeRegisterId":noticeRegisterId
          }
        ).then(res => {
            console.log("测试短信", res);
            if(res.data.code ==1){
              this.csdialogVisible = false
              this.content = ''
              this.$message({
                type:'success',
                message:'发送成功'
              })
            }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //查看按钮
    check(index,rows){
      this.look = true;

      this.none = false;
      // this.ck = true;
      this.getMore(rows[index].marketingActivityId)
    },
    //编辑按钮
    edit(index,rows){
      this.none = false;
      this.bj = true;
      this.getMore(rows[index].marketingActivityId)
      this.photo =''

    },
    rowClick(row,event,column){
      console.log(row)
      this.id = row.marketingActivityId
    },
    // 清空表单
    clear(){
        // this.ruleForm.shop='',
        this.ruleForm.theme='',
        this.ruleForm.actName='',
        this.ruleForm.sign='',
        this.ruleForm.photo='',
        this.ruleForm.mb='',
        this.ruleForm.radio2=0,
        this.ruleForm.radio3=0,
        this.ruleForm.radio4=1,
        this.ruleForm.textarea='',
        this.ruleForm.roiTime=[],
        this.ruleForm.time1='',
        this.ruleForm.time2=[]
    },
    // 启用按钮
    start(activityId,time){
      if(new Date(time).getTime() > new Date().getTime()){
      this.$confirm('请确认该活动是否要进行短信发送', '启用', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(() => { 
         this.$http({
            method:'get',
            url:''+process.env.API_ROOT+'/marketing/activity/recovery' + '?activityId=' + activityId,
          }).then(res => {
              console.log("启用", res);
              if(res.data.code ==1){
                this.$message({
                  type: 'success',
                  message: '启用成功'
                })
                this.getList(this.currentPage,this.pageSize,this.shopId);
              }
          })
          .catch(error => {
            console.log(error);
            alert("登入失败");
          });
        })
        .catch(action => {
          this.$message({
            type: 'fail',
            message: '已取消操作'
          })
        });
      }else{
        this.$message({
          type:'error',
          message:'该活动执行时间已超出当前时间！'
        })
      }

    },
    //禁用按钮
    stop(activityId){
      this.$confirm('请确认活动是否取消短信发送', '禁用', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(() => { 
         this.$http({
            method:'get',
            url:''+process.env.API_ROOT+'/marketing/activity/cancel' + '?activityId=' + activityId,
          }).then(res => {
              console.log("禁用", res);
              if(res.data.code===1){
                this.getList(this.currentPage,this.pageSize,this.shopId);
                this.$message({
                  type : 'success',
                  message : '禁用成功'
                })
              }
          })
          .catch(error => {
            console.log(error);
            alert("登入失败");
          });
        })
        .catch(action => {
          this.$message({
            type: 'fail',
            message: '已取消操作'
          })
        });
    },

    //选择快照
    selPhoto(){
      console.log(this.ruleForm.photo)

    },
    // 选择主题
    selTheme(){
      console.log(this.ruleForm.theme)
    },
    //选择店铺
    selShop(){
      console.log(this.ruleForm.shop)
    

    },
    //获取主题列表
    getTheme(shopid) {
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/marketing/themes?shopInfoId=' + shopid
      }

      ).then(res => {
          console.log("主题列表", res);
          if(res.data.code==1){
            this.themeList = res.data.data.list;
            
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    secTheme(){
      console.log(this.themeList)
      this.themeList.forEach(item => {
        if(item.themeName == this.ruleForm.theme ){
          this.theme = item.themeId
        }
      });
    },
    secPhoto(){
      this.photoList.forEach(item => {
        if(item.snapshoot_name == this.ruleForm.photo ){
          this.photo = item.snapshoot_id
        }
      });
      console.log(this.photoList)
      console.log(this.photo)
    },
    secSign(){
      this.signList.forEach(item => {
        if(item.channelDesc == this.ruleForm.sign ){
          this.sign = item.noticeRegisterId
        }
      });
    },
    //新增营销活动
    submit(){
      if((this.ruleForm.radio2 ==1 &&  new Date(this.ruleForm.time1).getTime() > new Date().getTime()) || this.ruleForm.radio2 ==0){


      this.$http.post(''+process.env.API_ROOT+'/marketing/addMarketingActivity',{
          "marketingActivityId":this.id ? this.id :'',
          "shopInfoId":this.shopId,
          "themeId":this.theme? this.theme : this.ruleForm.theme,
          "snapshotId":this.photo ? this.photo : this.ruleForm.photo,
          "noticeRegisterId":this.ruleForm.sign,
          "activityName":this.ruleForm.actName,
          "activityDesc":'',
          "executorType":this.ruleForm.radio2,
          "executorTime":this.ruleForm.radio2 ==1 ? this.ruleForm.time1 :'' ,
          "roiBeginTime":this.ruleForm.roiTime[0],
          "roiEndTime":this.ruleForm.roiTime[1],
          "purchaseType":this.ruleForm.radio3,
          "purchaseStartTime":this.ruleForm.radio3 ==1 ?this.ruleForm.time2[0] : '',
          "purchaseEndTime":this.ruleForm.radio3 ==1 ?this.ruleForm.time2[1] : '' ,
          "marketingContent":this.ruleForm.textarea,
          "blackListType":this.ruleForm.radio4
        }).then(res => {
          console.log("新增营销活动", res);
          if(res.data.code==1){
            
            this.back()
          
            this.getList(this.currentPage,this.pageSize,this.shopId)
            if(this.id){
              this.$message({
                type:'success',
                message :'编辑成功'
              })
            }else{
              this.$message({
                type:'success',
                message :'新增成功'
              })
            }
          }else{
            this.$message({
              type:'error',
              message :res.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
              }else{
                this.$message({
                  type:'error',
                  message:'定时执行时间早于当前时间，请修改定时执行时间'
                })
              }
    },
    //搜索事件
    search(){
      this.getList(this.currentPage,this.pageSize,this.shopId)
    },
    //时间选择 事件
    selTime(){
      this.value4 = this.value4 ? this.value4 :  []
      console.log(this.value4)
    },
    change(){
      console.log(this.ruleForm.time2)
      console.log(this.ruleForm.time1)
    },
    //roi时间选择事件
    selRuleFormTime(){
      console.log(this.ruleForm.roiTime)
    },
    //短信营销结果报告获取
    getReport(activityId){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/marketing/notice/report' + '?activityId=' + activityId,
      }).then(res => {
          console.log("报告", res);
          if(res.data.code==1){
            this.reoprtTableData.push(res.data.data)
            this.sendCost = res.data.data.sendCost;
            this.payMoney = res.data.data.payMoney;
            this.roi = res.data.data.roi
            var b1 = document.documentElement.getElementsByTagName('b')[0];
            var b2 = document.documentElement.getElementsByTagName('b')[1];
            if(this.payMoney !=0){
              b1.style.width = '500px';
              b2.style.width = 500/this.sendCost/this.payMoney+'px';
            }else{
              b1.style.width = '0px';
              if(this.sendCost !=0){
              b2.style.width = '20px';

              }else{
              b2.style.width = '0px';

              }
            }
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //获取子流程
    getChildren(activityId){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/marketing/activity/childrenBusiness' + '?activityId=' + activityId
      }).then(res => {
          console.log("子流程", res);
          if(res.data.code ==1 ){
            this.children = res.data.data
            this.fob=false;
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //ROI时间修改&重新计算
    getTime(){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/marketing/notice/report/recalculation' + '?activityId=' + this.report.id +'&startTimeStr=' +this.report.roiTime[0]+'&endTimeStr=' +this.report.roiTime[1],
      }).then(res => {
          console.log("roi时间", res);
          if(res.data.code ==1 ){
            this.$message({
              type:'success',
              message : res.data.msg
            })
          }
          if(res.data.code ==20001 ){
              this.$message({
              type:'success',
              message : res.data.msg
            })
          }
          if(res.data.code ==20106 ){
              this.$message({
              type:'success',
              message : res.data.msg
            })
          }
          if(res.data.code ==20109 ){
              this.$message({
              type:'success',
              message : res.data.msg
            })
          }
          if(res.data.code ==20108 ){
              this.$message({
              type:'success',
              message : res.data.msg
            })
          }
          if(res.data.code ==20107 ){
              this.$message({
              type:'success',
              message : res.data.msg
            })
          }
          if(res.data.code ==-1 ){
              this.$message({
              type:'fail',
              message : res.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //查询短信营销详情  事件
    getMore(marketingActivityId){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/marketing/selectMarketingDetail' + '?marketingActivityId=' + marketingActivityId,
      }).then(res => {
          console.log("详情", res.data.data[0]);
          if(res.data.code ==1){
          this.id = res.data.data[0].marketing_activity_id
          this.ruleForm.shop = res.data.data[0].shop_name
          //主题
          this.ruleForm.theme = res.data.data[0].theme_id
          this.ruleForm.themeName = res.data.data[0].theme_name
          //活动
          this.ruleForm.actName = res.data.data[0].activity_name
          //快照
          this.ruleForm.photo = res.data.data[0].snapshot_name
          this.photo = res.data.data[0].snapshot_id
          //短信
          this.ruleForm.textarea = res.data.data[0].marketing_content
          //签名
          this.ruleForm.sign = res.data.data[0].notice_register_id
          this.ruleForm.signName = res.data.data[0].channel_desc
          //是否定时
          this.ruleForm.radio2 = res.data.data[0].executor_type
          //定时的时间
          this.ruleForm.time1 = res.data.data[0].executor_type  ? res.data.data[0].executor_time :  '即刻执行'
          //是否排除黑名单
          this.ruleForm.radio4 = res.data.data[0].black_list_type  ? 1 : 0
          //是否排除已购
          this.ruleForm.radio3 = res.data.data[0].purchase_type  ? 1 : 0
          //已购时间
          this.ruleForm.time2[0] = res.data.data[0].purchase_start_time 
          this.ruleForm.time2[1] = res.data.data[0].purchase_end_time 

          //roi时间
          this.ruleForm.roiTime.push(res.data.data[0].roi_begin_time)
          this.ruleForm.roiTime.push(res.data.data[0].roi_end_time)
          this.num = this.ruleForm.textarea.length


          // this.secTheme();
          // this.secSign()
          // this.secPhoto()


          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    
    //获取短信签名列表
    getSignatures(shopInfoId){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/marketing/sms/signatures?' + 'shopInfoId=' + shopInfoId,
      }).then(res => {
          console.log("签名列表", res);
          this.signList = res.data.data
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
            this.ruleForm.shop = res.data.data[0].shop_name
            this.getList(this.currentPage,this.pageSize,this.shopId)
            //获取主题
            this.getTheme(this.shopId)
            // this.ruleForm.theme=''
            //获取快照
            this.getSignatures(this.shopId)

          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //获取营销活动列表
    
    getList(currentPage,pageSize,shopid){
          var data = {
              "pageIndex":currentPage,
              "pageSize":pageSize,
              "startTime" : this.value4 ? this.value4[0] : '' ,
              "endTime":this.value4 ? this.value4[1] : '',
              "activityName":this.actName,
              "shopName":'',
              "snapshotName":this.photo,
              'shopInfoId':shopid
          };


      this.$http.get(''+process.env.API_ROOT+'/marketing/batch/activities?'+this.toQueryString(data)).then((res)=>{
              console.log('营销活动列表',res)
              if(res.data.code==1){
                this.tableData = res.data.data.list
                this.total = res.data.data.total
              }

          }).catch((err)=>{
            console.log(err);

            alert('网络异常')
          })
    },
    // 点击弹出测试短信框
    cs(){
      this.csdialogVisible=true
    },
    handleSelect(item) {
      console.log(item);
    },
    //提示1
    renderHeader1 (h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
      return h(
        'span',{
        },
        [
          h('span', column.label),
          h('eg1')
        ]
      );
    },
    // 提示2
    renderHeader2 (h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
      return h(
        'span',{
        },
        [
          h('span', column.label),
          h('eg2')
        ]
      );
    },
    //计算字数

    //创建主题按钮
    create(){
      this.dialogVisible =true;
      this.themeForm.shop=''
      this.themeForm.theme = ''
    },
    // 点击返回按钮
    back(){
      this.$router.push({
        name:'Sell'
      })
      this.ok = 0;
      this.suc = true;
      this.fileList = []
      this.tags = []
      this.group = []
      this.relationId = ''
      this.resetForm('ruleForm')
      this.clear()
      this.look = false;
      this.none = true
      this.rep = false
      this.reoprtTableData = [];
      this.bj = false
      // this.ck = false
      this.report.roiTime=[];
      this.theme = '',
      this.photo = '',
      this.sign = ''
    },
    back1(){
      this.resetForm1('themeForm')
      this.dialogVisible = false
    },
    //点击新增营销活动
    add(){
      this.$router.push({
        name:'addSell'
      })
      this.none = false
      this.id = ''
      this.photo = ''
    },
    // 创建主题和测试短信关闭
    close(){
      this.dialogVisible =false;
      this.csdialogVisible =false;
      this.smsdialogVisible =false;
      this.childdialogVisible =false;

      
    },
    // 添加主题 的提交
    commit(){
     this.$http.post(''+process.env.API_ROOT+'/marketing/themes',{
        "shopInfoId":this.themeForm.shop,
           "themeName":this.themeForm.theme
      }).then((res)=>{
          console.log(res)
          if(res.data.code ==1){
            this.$message({
              type:'success',
              message: '新增主题成功'
            })
      this.getTheme(this.shopId)

          }else{
            this.$message({
              type:'fail',
              message: '新增主题失败'
            })
          }

      }).catch((err)=>{
        console.log(err);

        alert('网络异常')
      })
      this.back1()
      this.dialogVisible = false;
      this.csdialogVisible = false;

    },
    // 分页
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getList(this.currentPage,this.pageSize,this.shopId)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList(this.currentPage,this.pageSize,this.shopId)
    },
    // 选择全部，活动或者快照名称
    a(command){
      this.select = command.name
      console.log(this.select)
      if(this.select=='全部名称'){
        this.photo = this.value3 ;
        this.actName = this.value3 ;
      }
      if(this.select=='人群名称'){
        this.photo = this.value3;
        this.actName = '';
      }
      if(this.select=='活动名称'){
        console.log(3)
        this.actName = this.value3;
        this.photo = '';
      }
    },
    //搜索的输入框输入事件
    c(){
      if(this.select=='全部名称'){
        this.photo = this.value3;
        this.actName = this.value3 ;
      }
      if(this.select=='人群名称'){
        this.photo = this.value3;
        this.actName = '';
      }
      if(this.select=='活动名称'){
        console.log(3)
        this.actName = this.value3;
        this.photo = '';
      }
    },
    // 更多的选项
    b(command){
      if(command.name == '禁用'){
        this.stop(command.id)
      }    
      if(command.name == '启用'){
        this.start(command.id,command.time)
      }    
      if(command.name == '详细报告'){
          this.getReport(command.id)
          this.none = false;
          this.rep = true;
          this.report.theme = command.theme;
          this.report.actName = command.actName;
          this.report.roiTime[0]=command.roiBeginTime
          this.report.roiTime[1]=command.roiEndTime
          this.report.id = command.id
          this.report.createTime = command.createTime
          this.date = command.createTime
          console.log(this.report.createTime)
          console.log(new Date(this.report.createTime).getTime())
          // console.log(Date.now())
      }    
      if(command.name == '短信内容'){
        this.smsdialogVisible = true;
        this.sms=command.sms
        console.log(command.sms)
      }   
      if(command.name == '查看流程'){
        this.getChildren(command.id)
        this.childdialogVisible = true;
      }  
    },

    //把对象转成query值
    cleanArray(actual) {
      var newArray = [];
        for (let i = 0; i < actual.length; i++) {
          if (actual[i]) {
            newArray.push(actual[i]);
          }
        }
      return newArray;
    },
    toQueryString(obj) {
      if (!obj) return "";
        return this.cleanArray(
        Object.keys(obj).map(key => {
          if (obj[key] === undefined) return "";
            return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
          })
        ).join("&");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;

.look{
    
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
        .kz{
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
      }
    }
  
</style>
