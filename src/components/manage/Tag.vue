<template>
  <div class="tag">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>外部客户导入</el-breadcrumb-item>
        <el-breadcrumb-item>添加标签</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>
        <i class="el-icon-back" @click="back"></i>
        <span>{{outName}}</span>
      </h1>
    </div>
    <div class="box">
      <div class="boxContent">
        <el-form
          label-position='left'
          :model="tagForm"
          ref="tagForm"
          class="form"
          :inline='true'
        >
          <div class="btnBox clear">
            <div class="left">
              标签添加方式：
              <el-radio-group v-model="tagForm.radio">
                <el-radio :label="0">归类添加</el-radio>
                <el-radio :label="1">单一添加</el-radio>
              </el-radio-group>
            </div>
            <div class="right">
              <el-button type="primary" @click="submitForm('tagForm',1)" size='small'>提交</el-button>
            </div>
          </div>

          <div v-for="(item,index) in tagForm.valueArr" :key="index" class="modelBox">

              <el-form-item label='模板列选项:'   label-width='100px' :prop="'valueArr.'+index+'.select1'" :rules='rules.select1'>
                  <el-select v-model="item.select1" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in valueForm.arr"
                      :key="index"
                      :label="item.name"
                      :value="item.prop"
                    ></el-option>
                  </el-select>
              </el-form-item>


              <el-form-item label v-if="tagForm.radio==0" :prop="'valueArr.'+index+'.select2'"  :rules='rules.select2'>

                  <el-select v-model="item.select2" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in condition"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
              </el-form-item>


              <el-form-item 
              v-if="tagForm.radio==0"  
              :label='item.select2?"模板值：":""' 
              label-width='80px' 
              :prop="item.select2=='contain' ? 'valueArr.'+index+'.value4' :item.select2=='gt_et'|| item.select2=='lt_et'?'valueArr.'+index+'.value3':item.select2=='between'?'valueArr.'+index+'.value1':item.select2=='date_between'?'valueArr.'+index+'.timeRange':'valueArr.'+index+'.time'" 
              :rules="item.select2=='contain' ? rules.value4 : item.select2=='gt_et'|| item.select2=='lt_et'? rules.value3:item.select2=='between'?rules.value1 :item.select2=='date_between'?rules.timeRange:rules.time ">
                  <!--  包含 -->
                  
                  <p v-if="item.select2=='contain'">
                    <el-input v-model="item.value4"   class="proName" placeholder></el-input>
                  </p>
                  <!-- 大于等于 小于等于  -->
                  <p v-if=" item.select2=='gt_et'|| item.select2=='lt_et'">
                    <el-input v-model="item.value3"  onkeypress="return event.keyCode>=48&&event.keyCode<=57"  class="proName" placeholder></el-input>
                  </p>
                  <!-- 介于 -->
                  <p v-if="item.select2=='between'">
                    <el-input v-model="item.value1" onkeypress="return event.keyCode>=48&&event.keyCode<=57"  class="proName"   placeholder></el-input>
                    <el-input v-model="item.value2" onkeypress="return event.keyCode>=48&&event.keyCode<=57"  class="proName"  placeholder></el-input>
                  </p>
                  <!-- 早于，晚于 -->
                  <el-date-picker
                    v-if="item.select2=='date_before'||item.select2=='date_after'"
                    prefix-icon="el-icon-date"
                    v-model="item.time"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="-"
                    placeholder="请选择"
                  ></el-date-picker>
                  <!-- 时间区间 -->
                  <el-date-picker
                    v-if="item.select2=='date_between' "
                    prefix-icon="el-icon-date"
                    v-model="item.timeRange"
                    type="datetimerange"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                  ></el-date-picker>
              </el-form-item>




            <el-form-item label='归类为 自定义属性名称:' :prop="'valueArr.'+index+'.select3'" :rules='rules.select3'>


              <el-select v-model="item.select3" placeholder="请选择">
                <el-option
                  v-for="(item,index) in propertyList"
                  :key="index"
                  :label="item.custom_property_name"
                  :value="item.custom_property_id"
                ></el-option>
              </el-select>
            </el-form-item>


            <el-form-item :label='item.onoff?"属性值:":!item.onoff && tagForm.radio==1?"属性值为模板:":""' :prop="'valueArr.'+index+'.select4'" :rules='!item.onoff   ? rules.empty : rules.select4'>

              <el-select v-model="item.select4" placeholder="请选择" v-if="item.onoff">
                <el-option
                  v-for="(item,index) in item.select4Arr"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>


            <el-form-item label :prop="'valueArr.'+index+'.type'" :rules='rules.type' v-if="!item.onoff && tagForm.radio==1">
              
              <el-select v-model="item.type"   >
                <el-option
                  v-for="(item,index) in valueForm.arr"
                  :key="index"
                  :label="item.name"
                  :value="item.prop"
                ></el-option>
              </el-select>
            </el-form-item>


            <i class="el-icon-plus plus" @click="addVal"></i>
            <i class="el-icon-delete plus" v-if="index!=0" @click="delVal(index)"></i>
          </div>
        </el-form>
          
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="valueForm"
          ref="valueForm"
          class="form"
        >
          <div class="detail">
            <div class="inputBox" v-for="(item,index) in valueForm.arr" :key="index">
              <el-form-item v-if='item.name.length!=0' :label='item.name' :prop="'arr.'+index+'.value'" :rules='item.name=="手机号码" ? rules.mobile : item.name=="邮箱" ? rules.email: item.name=="淘宝ID" ? rules.id: rules.value'>
                <el-input v-model="item.value" ></el-input>
              </el-form-item>
            </div>
            <div class="btns">
              <el-button type="primary" @click="submitForm('valueForm',0)" size='small'>搜索</el-button>
              <el-button @click="reset" size='small'>重置</el-button>
              
            </div>
            <el-radio-group v-model="tagForm.radio1" v-if="tagForm.radio==1">
                <el-radio :label="1">全部选中</el-radio>
                <el-radio :label="2">取消选中</el-radio>
            </el-radio-group>
          </div>
        </el-form>
      </div>
      <div class="tab">
        <el-table :data="tableData" ref="tab" style="width: 100%" height="500" @select='select'  @select-all='selectAll' @select-change='selectChange'>
          <el-table-column label prop width="30" show-overflow-tooltip></el-table-column>
          <el-table-column type="selection" label width="80" v-if="tagForm.radio==1"></el-table-column>
            
          <div v-for="(item,index) in valueForm.arr" :key="index">
            <el-table-column
              :label="item.name"
              :property="item.prop"
              show-overflow-tooltip
              v-if="item.name.length!=0"
            ></el-table-column>
          </div>
          
          <el-table-column fixed="right" label="创建时间" prop="createTimeStr" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作"  fixed="right">
            <template slot-scope="scope">
                <el-button
                  @click.native.prevent="look(tableData[scope.$index].detailId)"
                  type="text"
                  >
                  查看标签
                </el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt width="140" height="140">
            </div>
            <p :style="{'marginTop': '23px'}">无模板信息</p>
          </div>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[50, 100,200]"
            :page-size="50"
            layout="sizes,total, jumper, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="bottom">按住 [shift] 键，可横向滚动表格哦</div>



    <!-- 查看标签控件 -->
    <el-dialog
      title='标签列表'
      :visible.sync="tagDialogVisible"
      width="20%"
      :before-close="close"
      :close-on-click-modal="false"
    >
    <ul>
      <li v-for="(item,index) in tagList" :key="index">
        <p>自定义属性：{{item.propertyName}}</p> 
        <p>属性值：{{item.propertyValue}}</p> 
      </li>
    </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'

export default {
  name: "Theme",
  data() {
    return {
      outName:'',
      rules:{
        select1: [{ required: true, trigger: "change" ,message:' '}],
        select2: [{ required: true, trigger: "change",message:'  ' }],
        select3: [{ required: true, trigger: "change",message:' '  }],
        select4: [{ required: true, trigger: "change",message:' '  }],
        value4: [{ required: true, trigger: "blur" ,validator: (rule, value, callback) => {
              let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]*$/;
              if(value){
                if (!reg.test(value)) {
                  callback(new Error('请输入正确的格式'))
                } else {
                    callback()
                }
              }else{
                callback(new Error(' '))
              }
            }
          }
        ],
        value3: [{ required: true, trigger: "blur" ,validator: (rule, value, callback) => {
          var reg = /^(0|[1-9][0-9]*)$/g
              if(!value){
                callback(new Error(' '))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        type: [{ required: true, trigger: "change",message:' ' }],
        time: [{ required: true, trigger: "blur" ,message:' '}],
        timeRange: [{ required: true, trigger: "blur" ,message:' '}],
        value1: [{ required: true, trigger: "blur", validator: (rule, value, callback) => {
        console.log(rule)
          var reg = /^(0|[1-9][0-9]*)$/
          var index = rule.fullField.split('.')[1]
          console.log(index)
              if (value &&this.tagForm.valueArr[index].value2) {
                  console.log(value,reg.test(value),this.tagForm.valueArr[index].value2,reg.test(this.tagForm.valueArr[index].value2) )

                if(reg.test(value) && reg.test(this.tagForm.valueArr[index].value2) ){
                  console.log(value*1,this.tagForm.valueArr[index].value2*1 )

                  if(value*1 > this.tagForm.valueArr[index].value2*1){
                    
                    callback(new Error('请输入正确的区间'))
                  }else{
                    callback()
                  }
                }else{
                    callback(new Error('请输入正确的格式'))
                }
              } else {
                callback(new Error(' '))
              }
            }
          }
        ],
        value2: [{ required: true, trigger: "blur" }],
        value: [{ required: false, trigger: "blur" }],
        id: [{ required: false, validator:formTest.idTest ,trigger: "blur" }],
        email: [{ required: false, validator:formTest.email1Test ,trigger: "blur"}],
        mobile: [{ required: false, validator:formTest.phone1Test ,trigger: "blur"}],
        empty:[{required: false ,trigger: "blur"}]
      },
      tagList:[],
      condition: [
        {
          name: "包含",
          value: 'contain'
        },
        {
          name: "大于等于",
          value: 'gt_et'
        },
        {
          name: "小于等于",
          value: 'lt_et'
        },
        {
          name: "介于",
          value: 'between'
        },
        {
          name: "早于",
          value: 'date_before'
        },
        {
          name: "晚于",
          value: 'date_after'
        },
        {
          name: "时间区间",
          value: 'date_between'
        }
      ],
      tagForm: {
        valueArr: [
          {
            time:'',
            timeRange:[],
            value4:'',
            value3: "",
            select1: "",
            select2: "",
            select3: "",
            select4: "",
            type:'',
            value1:'',
            value2:'',
            select4Arr: [],
            onoff: true,
          }
        ],
        radio: 0,
        radio1:0,
      },
      details:[],
      index:'',
      labelPosition: "top",
      dialogVisible: false,
      tagDialogVisible:false,
      tableData: [],
      tableHead: {},
      valueForm:{
        arr: [],
      },
      currentPage: 1,
      pageSize: 50,
      total: 0,
      propertyList: [],
      shopList: [
        {
          shop_info_id: ""
        }
      ]
    };
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    },
    id() {
      return this.$route.params.id;
    },
    templateId() {
      return this.$route.params.templateId;
    },
    select1(){
      var arr=[];
      this.tagForm.valueArr.forEach(item=>{
        arr.push(item.select1)
      })
      var arrStr = arr.join(',')
      return arrStr
    },
    select3(){
      var arr=[];
      this.tagForm.valueArr.forEach(item=>{
        arr.push(item.select3)
      })
      var arrStr = arr.join(',')
      return arrStr
    }
  },

  created() {
    this.getModelList(this.templateId);
    this.getModelDataList(this.id,this.valueForm.arr);
    this.getShopList();
    this.outName = this.$route.params.name
    console.log(this.$route.params);
  },
  watch: {
    'tagForm.valueArr':{
      handler:function(n,o){
        console.log(n)
      },
      deep:true
    },
    "tagForm.radio": {
      handler: function(n, o) {
        this.tagForm.valueArr= [
          {
            time:'',
            timeRange:[],
            value3: "",
            select1: "",
            select2: "",
            select3: "",
            select4: "",
            type:'',
            value1:'',
            value2:'',
            select4Arr: [],
            onoff: true,
          }
        ]
      }
    },
    "tagForm.radio1": {
      handler: function(n, o) {
        console.log(n)
        if (n == 1) {
          this.details = []
          this.tableData.forEach(item=>{
            this.details.push(item.detailId)
            
          })
          this.toggleSelection(this.tableData)
        }else if(n== 2){
          this.details = []
          this.toggleSelection()
        }
      }
    },
    select1:{
      handler:function(n,o){
        console.log('新',n)
        console.log('旧',o)
        if(n!=o){
          let nArr = n.split(',')
          let oArr = o.split(',')
          console.log(nArr)
          console.log(oArr)
          nArr.forEach((item,index)=>{
            console.log(item)
            console.log(oArr[index])
              if(item != oArr[index]){
                this.index = index
                console.log(index)
              }
          })
        }
      }
    },
    select3:{
      handler:function(n,o){
        console.log('新',n)
        console.log('旧',o)
        if(n!=o){
          let nArr = n.split(',')
          let oArr = o.split(',')
          console.log(nArr)
          console.log(oArr)
          nArr.forEach((item,index)=>{
            console.log(item)
            console.log(oArr[index])
              if(item != oArr[index]){
                this.index = index
                console.log(index)
                console.log(this.tagForm.valueArr[index])
                this.tagForm.valueArr[index].select4 = ''
                this.propertyList.forEach(item=>{
                  if(item.custom_property_id == this.tagForm.valueArr[index].select3){
                    if(item.custom_property_value !='-'){
                      this.tagForm.valueArr[index].select4Arr = item.custom_property_value.split(',')
                      console.log(this.tagForm.valueArr[index].select4Arr)
                      this.tagForm.valueArr[index].onoff = true
                    }else{
                      this.tagForm.valueArr[index].select5 = this.tagForm.valueArr[index].select1
                      this.tagForm.valueArr[index].select4Arr =[] 
                      this.tagForm.valueArr[index].onoff = false
                    }
                  }else{

                  }
                })
              }
          })
        }
      }
    }
  },
  methods: {
    submitForm(formName,type) {
      this.$refs[formName].validate(valid => {
        
        if (valid) {
          if(type==0){
          this.sel();

          }else{
            this.mod(this.tagForm.valueArr,this.tagForm.radio);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置搜索条件
    reset(){
      var arr = []
      this.valueForm.arr.forEach(item=>{
        item.value =''
        arr.push(item.value)
      })
      this.getModelDataList(this.id,arr)
    },
    //搜索按钮
    sel(){
      var arr = []
      this.valueForm.arr.forEach(item=>{
        arr.push(item.value)
      })
      console.log(arr)
      this.getModelDataList(this.id,arr)
    },
    close(){
      this.tagDialogVisible = false
    },
    look(id){
      this.tagDialogVisible = true;
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/external/customer/properties?detailId="+id
      })
        .then(res => {
          console.log("标签列表", res);
          this.tagList = res.data.data
          if (res.data.code == 1) {
          }
        })
        .catch(error => {
          console.log(error);
          alert("系统问题");
        });
    },
    toggleSelection(rows) {
      console.log(rows)
      if (rows) {
        rows.forEach(row => {
          this.$refs.tab.toggleRowSelection(row,'selected');
        });
      } else {
        this.$refs.tab.clearSelection();
      }
    },
    selectChange(sel){
      this.details =[];
       sel.forEach(item=>{
         this.details.push(item.detailId)
      })
      // console.log(sel)
      console.log(this.details)
      if(this.details.length==this.tableData.length){
        this.tagForm.radio1 = 1
      }else{
        this.tagForm.radio1 = 0
      }
    },
    select(sel,row){
      this.details =[];
       sel.forEach(item=>{
         this.details.push(item.detailId)
      })
      // console.log(sel,row)
      console.log(this.details)
      if(this.details.length==this.tableData.length){
        this.tagForm.radio1 = 1
      }else{
        this.tagForm.radio1 = 0
      }
    },
    selectAll(sel){
      this.details =[];
       sel.forEach(item=>{
         this.details.push(item.detailId)
      })
      // console.log(sel)
      console.log(this.details)
      if(this.details.length!=0){
        this.tagForm.radio1 = 1
      }else{
        this.tagForm.radio1 = 0
      }
    },
    //修改上传的数组参数
    mod(arr,type){
      var a = [];
      console.log(arr)
      if(type==0){
        for(var i=0;i<=arr.length-1;i++){
          a.push({
            extendColumn	: arr[i].select1,
            operation	:arr[i].select2,
            extendValue	:arr[i].select2 =="date_before" ||arr[i].select2 =="date_after" ?arr[i].time:  arr[i].value3,
            type:arr[i].select4 ? 'pro' : 'cell',
            extendMaxValue	: arr[i].select2 =='date_between'? arr[i].timeRange[0] : arr[i].value1 ,
            extendMinValue	:arr[i].select2 =='date_between'? arr[i].timeRange[1] : arr[i].value2,
            propertyNameId	:arr[i].select3,
            propertyValue   :    arr[i].select4
          })
        }
      }
      if(type==1){
        for(var i=0;i<=arr.length-1;i++){
          a.push({
            extendColumn	: arr[i].type,
            type:arr[i].type ? 'cell' : 'pro',
            propertyNameId	:arr[i].select3,
            propertyValue:arr[i].select4
          })
        }
      }
      console.log(a)
      this.sub(a,type)
    },
    sub(arr,type){
      var data = {}
      if(type == 0){
        data = {
        'type':this.tagForm.radio == 0 ? 'classification' :'single',
        'cInfoList':arr,
        'recordId':this.id
        }
      }else{
        data = {
        'type':this.tagForm.radio == 0 ? 'classification' :'single',
        'sInfo':{
          'cInfoList':arr,
          'isAll':this.tagForm.radio1 ==1 ? 1 : 0,
          'details':this.details
        },
        'recordId':this.id,
        }
      }
      if(type!=0){
        if(this.details.length==0){
          this.$message({
            type:'error',
            message:'请选择列表数据'
          })
        }else{
          this.$http.post(''+process.env.API_ROOT+'/external/customer/properties',data).then(res => {
            console.log('提交结果', res);
            if(res.data.code==1){
              this.$message({
                type:'success',
                message:'添加标签成功'
              })
              this.tagForm.valueArr =  [
              {
                time:'',
                timeRange:[],
                value4:'',
                value3: "",
                select1: "",
                select2: "",
                select3: "",
                select4: "",
                type:'',
                value1:'',
                value2:'',
                select4Arr: [],
                onoff: true,
              }
            ]
            this.resetForm('tagForm')

              // this.$refs["tagForm"].clearValidate();
            }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
              
            }
          }).catch(error=>{
            console.log(error);
            alert("系统异常");
          })
        }
      }else{
          this.$http.post(''+process.env.API_ROOT+'/external/customer/properties',data).then(res => {
            console.log('提交结果', res);
            if(res.data.code==1){
              this.$message({
                type:'success',
                message:'添加标签成功'
              })
              this.tagForm.valueArr =  [
              {
                time:'',
                timeRange:[],
                value4:'',

                value3: "",
                select1: "",
                select2: "",
                select3: "",
                select4: "",
                type:'',
                value1:'',
                value2:'',
                select4Arr: [],
                onoff: true,
              }
            ]
            this.resetForm('tagForm')
              // this.$refs["tagForm"].clearValidate();
            }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
              
            }
          }).catch(error=>{
            console.log(error);
            alert("系统异常");
          })
        }
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
    addVal() {
      let obj = {
                value4:'',

        value3: "",
        value1: "",
        value2: "",
        time:'',
        timeRange:[],
        select1: "",
        select2: "",
        select3: "",
        select4: "",
        type:'',
        select4Arr:[],
        onoff:true
      };
      if(this.tagForm.valueArr.length>=5){
        this.$message({
          type:'error',
          message:'最多只能添加5个标签'
        })
      }else{
        this.tagForm.valueArr.push(obj);
      }
    },
    delVal(index) {
      this.tagForm.valueArr.splice(index, 1);
    },
    //获取用户店铺列表
    getShopList() {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/getCurentUserShopList"
      })
        .then(res => {
          console.log("用户店铺列表", res);
          if (res.data.code == 1) {
            this.shopList = res.data.data;
            this.getProperty(this.shopId);
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //获取启用的自定义属性列表
    getProperty(shopid) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/property/query?shopInfoId=" +
          shopid
      })
        .then(res => {
          console.log("自定义属性列表", res);
          if (res.data.code == 1) {
            this.propertyList = res.data.data.list;
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    //获取模板数据
    getModelDataList(recordId,arr) {
      console.log(arr)
      this.$http
        .get(
          "" +
            process.env.API_ROOT +
            "/external/customer/excel/detail?recordId=" +
            recordId +
            "&pageIndex=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize + 
            "&mobile=" +
            (arr[0] ? arr[0]:'') +
            "&email=" +
            (arr[1] ? arr[1]:'') +
            "&aliwant=" +
            (arr[2] ? arr[2]:'') +
            "&extendOne=" +
            (arr[3] ? arr[3]:'') +
            "&extendTwo=" +
            (arr[4] ? arr[4]:'') +
            "&extendThree=" +
            (arr[5] ? arr[5]:'') 
        )
        .then(res => {
          console.log("模板数据", res);
          if (res.data.code == 1) {
            // this.$message({
            //   type: "success",
            //   message: res.data.msg
            // });
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else {
          }
        })
        .catch(err => {
          console.log(err);
          alert("网络异常");
        });
    },
    //获取模板表头
    getModelList(templateId) {
      this.$http
        .get(
          "" +
            process.env.API_ROOT +
            "/external/customer/excel/template/detail?templateId=" +
            templateId
        )
        .then(res => {
          console.log("模板表头", res);
          if (res.data.code == 1) {
            // this.$message({
            //   type: "success",
            //   message: res.data.msg
            // });
            this.tableHead = res.data.data;
            for (let key in this.tableHead) {
              // console.log(key, this.tableHead[key]);
              if(this.tableHead[key]){
                this.valueForm.arr.push({
                  name: this.tableHead[key],
                  prop: key ,
                  value: ""
                });
              }
              
            }
            console.log(this.valueForm.arr);
          } else {
          }
        })
        .catch(err => {
          console.log(err);
          alert("网络异常");
        });
    },
    //返回按钮
    back() {
      this.$router.push({ name: "outCustom" });
    },
    //列表编号
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      var arr = []
      this.valueForm.arr.forEach(item=>{
        arr.push(item.value)
      })
      console.log(arr)
      this.getModelDataList(this.id,arr)

    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      var arr = []
      this.valueForm.arr.forEach(item=>{
        arr.push(item.value)
      })
      console.log(arr)
      this.getModelDataList(this.id,arr)

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.tag {
  height: 90%;
  .plus {
    font-size: 20px;
    margin-left: 20px;
    padding: 20px 0;
  }
  .el-dialog {
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form--label-top .el-form-item__label {
      padding-bottom: 0;
    }
  }
  .head {
    h1 {
      opacity: 0.87;
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 36px;
      height: 42px;
      font-weight: bold;
      padding: 0 50px;
      // float: left;
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
      // float: right;
      margin-left: 50px;
      line-height: 30px;
      margin-right: 20px;
    }
  }
  .box {
    overflow: hidden;
    position: relative;
    margin: 0 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    height: 90%;
    .boxContent {
      width: 100%;
      background: #fff;
      height: 300px;
      overflow: auto;
      .form {
        .el-input {
          width: 100px;
        }
        .btnBox {
          padding: 20px 30px;
          border-bottom: #ccc 1px solid;
          .left {
            height: 40px;
            line-height: 40px;
            float: left;
          }
          .right {
            float: right;
          }
        }
        .modelBox {
          padding: 20px 30px;
          border-bottom: #ccc 1px solid;
        
          .el-form-item {
            margin-bottom: 0;
            padding: 10px 0;
            // display: inline-block;
      
          }
          // .el-date-editor {
          //   height: 32px;
          //   border-radius: 0;
          //   line-height: 32px;
          //   box-sizing: border-box;
          //   // span,
          //   // i {
          //   //   display: inline-block;
          //   //   line-height: 32px;
          //   //   height: 32px;
          //   // }
          // }
          .el-input {
            width: 200px;

            .el-input__inner {
              // height: 32px;
              // line-height: 32px;
              border-radius: 0;
            }
          }
        }

      }
        .detail {
          padding: 20px 30px;
          .inputBox {
            display: inline-block;
            width: 200px;
            .el-form-item__label{
              padding:0
            }
            .el-input {
              width: 100%;
              .el-input__inner {
                border-radius: 0;
                width: 90%;
                height: 32px;
                line-height: 32px;
              }
            }
          }
          .btns {
            // width: 200px;
            display: inline-block;
            justify-content: center;
            align-items: center;
            // float: right;
            padding: 10px;
            .el-radio-group{
              margin-left: 30px;
            }
          }
        }
    }

    .tab {
      .el-table {
        td {
          height: 64px;
          line-height: 64px;
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
          .el-button {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #3366ff;
            letter-spacing: 0;
            line-height: 12px;
          }
        }
      }
    }

       .block {
      // position: absolute;
      bottom: 26px;
      padding: 10px;
      .el-pagination{
        width: 100%;
        text-align: center
      }
      
    }
  }
  .bottom {
    text-align: center;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    line-height: 16px;
  }
  .danger {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 20px;
    height: 32px;
    margin-bottom: 20px;
  }
}
</style>
