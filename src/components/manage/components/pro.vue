<template>
  <div class="pro" >
    <div v-for='(item,index) in proList' :key='index' >
      <el-form-item v-if="proValue.length != 0 ? proValue[index].value : false"  :label="item.customPropertyName+'：'"  prop label-position="left">
        <!-- 下拉框 -->
        <el-select v-if="item.customPropertyType==3" v-model="form[index].select"  placeholder="请选择属性值">
          <el-option v-for="val in item.customPropertyValue.split(',')" :key="val" :label="val" :value="val"></el-option>
        </el-select>
        <!-- 文本框 -->
        <el-input v-if="item.customPropertyType==5" v-model="form[index].value" style="display:inline-block;width:40%"></el-input>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.customPropertyType==6"
          v-model="form[index].daterange"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <!-- 单选框 -->
        <el-radio-group v-model="form[index].radio"  v-if="item.customPropertyType==1">
          <el-radio v-for="val in item.customPropertyValue.split(',')" :key='val' :label="val">{{val}}</el-radio>
        </el-radio-group>
        <!-- 复选框 -->
        <div v-if="item.customPropertyType==2">
          <el-checkbox :indeterminate="form[index].isIndeterminate" v-model="form[index].checkAll" @change="handleCheckAllChange(form[index].checkAll,index)">全选</el-checkbox>
          <el-checkbox-group style="display:inline-block" v-model="form[index].checkedValue" @change="handleCheckedCitiesChange(form[index].checkedValue,index)">
            <el-checkbox v-for="val in item.customPropertyValue.split(',')" :label="val" :key="val">{{val}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
    </div>
  </div>
</template>
<script>
  import Bus from '../../../module/bus.js'

export default {
  props:['proValue','list'],
  data() {
    return {
      proList:[],
      form:[],
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
          this.getProList(n)
        }
      }
    },
    form:{
        handler:function(n,o){
            // console.log(1)
          this.$emit('data',n)
          n.forEach((item,index)=>{
            console.log(item)
            console.log(this.proList[index])

            if(item.type==2){
              if(item.checkedValue.length==0){
                item.checkAll = false
                item.isIndeterminate = false
              }else{
                if(this.proList[index].customPropertyValue.split(',').length ==item.checkedValue.length){
                  item.checkAll = true
                  item.isIndeterminate = false
                }else{
                  item.checkAll = false
                  item.isIndeterminate = true
                }
              }
            }
          })
        },
        deep:true
    },
    proValue:{
      handler:function(n,o){
          // console.log(this.form)
        for (var i in n){
          // console.log(i)
          // console.log(this.proList[i])
          // console.log(n[i].value)
          // console.log(this.form[i])

          if(!n[i].value){
            if(this.form[i]){
              this.form[i].type=this.proList[i].customPropertyType
              this.form[i].name=this.proList[i].customPropertyName
              this.form[i].checkAll= false
              this.form[i].checkedValue= []
              this.form[i].isIndeterminate= false
              this.form[i].select =''
              this.form[i].value=''
              this.form[i].daterange=[]
              this.form[i].radio=''
            }
          }
        }
      },
      deep:true
    }
  },
  created() {
    this.getProList(this.shopId)
  },
  methods: {
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
            this.form = [];
            
              for(var i=0;i<this.proList.length;i++){ 
                this.form.push(
                  {
                    type:this.proList[i].customPropertyType,
                    name:this.proList[i].customPropertyName,
                    checkAll: false,
                    checkedValue: [],
                    isIndeterminate: false,
                    select :'',
                    value:'',
                    daterange:[],
                    radio:''
                  }
                )
              }

            Bus.$on('tagData',(data)=>{
      // console.log(data)

      if(data[4]){
          var obj = data[4]

        if(obj.custom.length == 0){
        }else{
          obj.custom.forEach((item,index) => {
            // console.log(index)
            //   console.log(this.form[index])
            // 单选
            if(item.customLabelType == 1){
              this.form[index].radio = item.customLabelValue
            }
            //复选
            if(item.customLabelType == 2){
              
              this.form[index].checkedValue = item.customLabelValue.split(',')

            }
            //下拉
            if(item.customLabelType == 3){
              this.form[index].select = item.customLabelValue
            }
            //时间
            if(item.customLabelType == 6){
              this.form[index].daterange = item.customLabelValue.split(',')
            }
            //文本
            if(item.customLabelType == 5){
              this.form[index].value = item.customLabelValue
            }
          });
        }
      }
    })


            // console.log('自定义数组',this.proList)
            // console.log('数据',this.form[1])
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    handleCheckAllChange(val,index) {
         
        this.form[index].checkedValue = val ? this.proList[index].customPropertyValue.split(',') : [];
        this.form[index].isIndeterminate = false;
    },
    handleCheckedCitiesChange(value,index) {
      let checkedCount = value.length;
      this.form[index].checkAll = checkedCount === this.proList[index].customPropertyValue.split(',').length;
      this.form[index].isIndeterminate = checkedCount > 0 && checkedCount < this.proList[index].customPropertyValue.split(',').length;
    }
  },
  mounted(){
    
  }
};
</script>
