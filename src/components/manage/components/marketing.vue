<template>
  <div class="marketing">
    <el-form-item label="最近一次短信营销时间：" prop label-position="left" v-if="marketingValue.value1">
      <el-select v-model="form.lastSmsType"  placeholder="请选则筛选条件">
        <el-option
          v-for="item in types"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-date-picker
        v-if="form.lastSmsType==1"
        v-model="form.lastSmsTime"
        type="daterange"
        value-format="yyyy-MM-dd"

        placeholder="请选择日期"
      ></el-date-picker>

      <p
        style="display:inline-block;width:50%"
        v-if="form.lastSmsType==2"
      >
        <el-input v-model="form.lastSmsTimeMin" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> - 
        <el-input v-model="form.lastSmsTimeMax" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> 天
      </p>
    </el-form-item>

    <el-form-item label="最近一次邮件营销时间：" prop label-position="left" v-if="marketingValue.value2">
      <el-select v-model="form.lastEmailType"  placeholder="请选则筛选条件">
        <el-option
          v-for="item in types"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-date-picker
        v-if="form.lastEmailType==1"
        v-model="form.lastEmailTime"
        value-format="yyyy-MM-dd"

        type="daterange"
        placeholder="请选择日期"
      ></el-date-picker>

      <p
        style="display:inline-block;width:50%"
        v-if="form.lastEmailType==2"
      >
        <el-input v-model="form.lastEmailTimeMin" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> - 
        <el-input v-model="form.lastEmailTimeMax" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> 天
      </p>
    </el-form-item>

    <el-form-item label="营销短信黑名单：" prop label-position="left" v-if="marketingValue.value3">
     <span style="padding:5px;border:1px solid #ccc">黑名单</span> 
    </el-form-item>

    <el-form-item label="营销邮箱黑名单：" prop label-position="left" v-if="marketingValue.value4">
     <span style="padding:5px;border:1px solid #ccc">黑名单</span> 
    </el-form-item>
    
    <el-form-item label="短信营销次数：" prop label-position="left" v-if="marketingValue.value5">
      <el-input v-model="form.smsTimes"  style="display:inline-block;width:20%"  placeholder="请输入短信营销次数"></el-input> 次
    </el-form-item>
    <el-form-item label="邮件营销次数：" prop label-position="left" v-if="marketingValue.value6">
      <el-input v-model="form.emailTimes"  style="display:inline-block;width:20%" placeholder="请输入邮件营销次数"></el-input> 次
    </el-form-item>
  </div>
</template>
<script>
  import Bus from '../../../module/bus.js'

export default {
  props:['marketingValue'],
  data() {
    return {
      types:[
        {
          name:'绝对',
          id:1
        },
        {
          name:'距离当前',
          id:2
        },
      ],
      form: {
        lastSmsType:'',
        lastSmsTime:[],
        lastSmsTimeMax:'',
        lastSmsTimeMin:'',
        smsTimes:'',
        emailTimes:'',
        lastEmailType:'',
        lastEmailTime:[],
        lastEmailTimeMax:'',
        lastEmailTimeMin:'',
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
          this.$emit('data',n)
      },
      deep:true
    },
    marketingValue:{
      handler:function(n,o){
          if(!n.value1){
            this.form.lastSmsType=''
            this.form.lastSmsTime=[]
            this.form.lastSmsTimeMax=''
            this.form.lastSmsTimeMin=''
          }
          if(!n.value2){
            this.form.lastEmailType=''
            this.form.lastEmailTime=[]
            this.form.lastEmailTimeMax=''
            this.form.lastEmailTimeMin=''
            
          }
          if(!n.value5){
            this.form.smsTimes=''
          }
          if(!n.value6){
            this.form.emailTimes=''
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
      if(data[2]){
        this.form.lastSmsType = data[2].marketingLastSmsTimeType
        this.form.lastEmailType = data[2].marketingLastEdmTimeType

        if(this.form.lastSmsType==1){
          this.form.lastSmsTime = [data[2].marketingLastSmsTimeStart,data[2].marketingLastSmsTimeEnd] 
        }else if(this.form.lastSmsType==2){
          this.form.lastSmsTimeMin = data[2].marketingLastSmsTimeStart
          this.form.lastSmsTimeMax = data[2].marketingLastSmsTimeEnd
        }else{
          this.form.lastSmsTime=[]
          this.form.lastSmsTimeMax=''
          this.form.lastSmsTimeMin=''
        }

        if(this.form.lastEmailType==1){
          this.form.lastEmailTime = [data[2].marketingLastEdmTimeStart,data[2].marketingLastEdmTimeEnd] 
        }else if(this.form.lastEmailType==2){
          this.form.lastEmailTimeMin = data[2].marketingLastEdmTimeStart
          this.form.lastEmailTimeMax = data[2].marketingLastEdmTimeEnd
        }else{
          this.form.lastEmailTime=[]
          this.form.lastEmailTimeMax=''
          this.form.lastEmailTimeMin=''
        }

        if(data[2].marketingSmsTimesMax){
          this.form.smsTimes = data[2].marketingSmsTimesMax
        }else{
          this.form.smsTimes = ''
        }

        if(data[2].marketingEdmTimesMax){
          this.form.emailTimes = data[2].marketingEdmTimesMax
        }else{
          this.form.emailTimes = ''
        }
        
      }else{

      }
    })
    
  }
};
</script>
