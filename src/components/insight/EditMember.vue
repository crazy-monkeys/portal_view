<template>
  <div class="editMember">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>客户洞察</el-breadcrumb-item>
        <el-breadcrumb-item>会员数据</el-breadcrumb-item>
        <el-breadcrumb-item>会员列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑客户信息</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>
          <i class="el-icon-back" @click="back"></i>
          <span >编辑客户信息</span>
          <!-- <span v-if="form.merchantPointConfigId">编辑优惠券规则</span> -->
        </h1>
    </div>
    <el-form
      label-position="top"
      label-width="auto"
      :model="editForm"
      ref="editForm"
      class="editForm"
      :rules='rules'
      >
      <div class="baseMsg">
        <h4>基本信息</h4>
        <div>
          <span>姓名：</span> {{moreMsg.memberName}}
        </div>
        <div>
          <span>手机号码：</span> {{moreMsg.memberMobile}}
        </div>
        <div>
          <span>会员等级：</span> {{moreMsg.levelName}}
        </div>
      </div>
      <div class="editMsg">
        <h4>编辑信息</h4>

        <el-form-item label="性别" prop='sex'>
          <el-radio-group v-model="editForm.sex">
            <el-radio label="2">未知</el-radio>
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="电子邮箱" prop="email">
            <el-input type='email' v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="地区"  prop="province">
          
          <el-select v-model="editForm.province" @change='changePro'>
            <el-option
              v-for="item in province"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
          <el-select v-model="editForm.city" @change='changeCity'>
            <el-option
              v-for="item in city"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
          <el-select v-model="editForm.district">
            <el-option
              v-for="item in district"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="自定义属性"  prop=''>
          <ul v-for="(item,index) in uniqObjInArray(properties)" :key="index">
              <h4 style="">{{item.name}}</h4>
              <li  v-for="(item,index) in item.value" :key="index" style="display:inline-block;padding:0px 20px"> {{item}}</li>
            </ul>
        </el-form-item>
        <el-form-item label="积分操作" prop="point">
          <div class="memberMsg">
            <el-select v-model="editForm.pointType">
              <el-option
                v-for="item in pointType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input  v-model="editForm.point" maxlength='6'></el-input>
          </div>
        </el-form-item>
        <div class="date">
          <h3>积分有效期</h3>
          <el-form-item label="滚动有效期" :prop='editForm.point.length ==0 ? "radio3" :"time"' :show-message='editForm.radio3!=2'>
              <el-radio-group v-model="editForm.radio3" >
                  <el-radio :label="0" style="margin-bottom:20px">
                      自生效日起
                      <el-input v-model="editForm.day" :disabled='editForm.radio3!=0'></el-input>
                      天内有效
                  </el-radio>
                  <el-radio :label="1">
                      自生效日起
                      <el-input v-model="editForm.scrollYear" :disabled='editForm.radio3!=1'></el-input>
                      年后的
                      <el-input v-model="editForm.scrollMonth" :disabled='editForm.radio3!=1'></el-input>
                      个月后的固定
                      <el-input v-model="editForm.scrollDay" :disabled='editForm.radio3!=1'></el-input>
                      日失效
                  </el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="统一有效期" :prop='editForm.point.length ==0 ? "radio3" :"time"'  :show-message='editForm.radio3==2'>
              <el-radio v-model="editForm.radio3" :label="2" >
                  自生效日起
                  <el-input v-model="editForm.uniteYear" :disabled='editForm.radio3!=2'></el-input>
                  年后的 
                  <el-input v-model="editForm.uniteMonth" :disabled='editForm.radio3!=2'></el-input>
                  月
                  <el-input v-model="editForm.uniteDay" :disabled='editForm.radio3!=2'></el-input>
                  日失效
              </el-radio>
          </el-form-item>
        </div>  
      </div>
      <div class="btns">
        <div>
          <el-button size="small" @click="close">取消</el-button>
          <el-button type="primary"  size="small" @click="submitForm('editForm')">提交</el-button>
        </div>
      </div>
    </el-form>
  </div>  
</template>

<script>
import formTest from "../../assets/js/formTest";
import formatDate from "../../assets/js/formatDate";

export default {
  name: "editMember",
  data() {
    return {
      properties:[],
      rules:{
        radio3:[
            { required: false,  trigger: 'blur' ,validator: (rule, value, callback) => {
                var reg=/^([1-9][0-9]*)$/
                if(value ==0){
                    if(this.editForm.day.length ==0){
                        callback()
                    }else{
                        if(!reg.test(this.editForm.day)){
                            callback(new Error('请输入正确天数'))
                        }else{
                            callback()
                        }
                    }
                }else{
                    if(value ==1){
                        if(this.editForm.scrollYear.length ==0 ||this.editForm.scrollMonth.length ==0||this.editForm.scrollDay.length ==0){
                            if(this.editForm.scrollYear.length ==0 &&this.editForm.scrollMonth.length ==0&&this.editForm.scrollDay.length ==0){
                            callback()
                            }else{
                              callback(new Error('有必填项为空'))
                            }
                        }else{
                            console.log(this.editForm.scrollYear,reg.test(this.editForm.scrollYear))
                            console.log(this.editForm.scrollMonth,reg.test(this.editForm.scrollMonth))
                            console.log(this.editForm.scrollDay,reg.test(this.editForm.scrollDay))
                            console.log(reg)
                            if(reg.test(this.editForm.scrollYear) &&reg.test(this.editForm.scrollMonth) &&reg.test(this.editForm.scrollDay)){
                                callback()
                            }else{
                                callback(new Error('请输入正确的年月日'))
                            }
                        }
                    } else{
                        if(value ==2){
                            if(this.editForm.uniteYear.length ==0 ||this.editForm.uniteMonth.length ==0||this.editForm.uniteDay.length ==0){
                                if(this.editForm.uniteYear.length ==0 &&this.editForm.uniteMonth.length ==0&&this.editForm.uniteDay.length ==0){
                                  callback()
                                }else{
                                  callback(new Error('有必填项为空'))
                                }
                            }else{
                                console.log(this.editForm.uniteYear,reg.test(this.editForm.uniteYear))
                            console.log(this.editForm.uniteMonth,reg.test(this.editForm.uniteMonth))
                            console.log(this.editForm.uniteDay,reg.test(this.editForm.uniteDay))
                                if(reg.test(this.editForm.uniteYear)&&reg.test(this.editForm.uniteMonth)&&reg.test(this.editForm.uniteDay)){
                                    callback()
                                }else{
                                    callback(new Error('请输入正确的年月日'))
                                }
                            }
                        }
                    }
                }
                
                
            },}
        ],
        time:[
            { required: false,  trigger: 'blur' ,validator: (rule, value, callback) => {
                var reg=/^([1-9][0-9]*)$/
                if(this.editForm.radio3 ==0){
                    if(this.editForm.day.length ==0){
                        callback(new Error('有必填项为空'))
                    }else{
                        if(!reg.test(this.editForm.day)){
                            callback(new Error('请输入正确天数'))
                        }else{
                            callback()
                        }
                    }
                }else{
                    if(this.editForm.radio3 ==1){
                        if(this.editForm.scrollYear.length ==0 ||this.editForm.scrollMonth.length ==0||this.editForm.scrollDay.length ==0){
                            
                              callback(new Error('有必填项为空'))
                        }else{
                            console.log(this.editForm.scrollYear,reg.test(this.editForm.scrollYear))
                            console.log(this.editForm.scrollMonth,reg.test(this.editForm.scrollMonth))
                            console.log(this.editForm.scrollDay,reg.test(this.editForm.scrollDay))
                            console.log(reg)
                            if(reg.test(this.editForm.scrollYear) &&reg.test(this.editForm.scrollMonth) &&reg.test(this.editForm.scrollDay)){
                                callback()
                            }else{
                                callback(new Error('请输入正确的年月日'))
                            }
                        }
                    } else{
                        if(this.editForm.radio3 ==2){
                            if(this.editForm.uniteYear.length ==0 ||this.editForm.uniteMonth.length ==0||this.editForm.uniteDay.length ==0){
                                
                                  callback(new Error('有必填项为空'))
                            }else{
                                console.log(this.editForm.uniteYear,reg.test(this.editForm.uniteYear))
                            console.log(this.editForm.uniteMonth,reg.test(this.editForm.uniteMonth))
                            console.log(this.editForm.uniteDay,reg.test(this.editForm.uniteDay))
                                if(reg.test(this.editForm.uniteYear)&&reg.test(this.editForm.uniteMonth)&&reg.test(this.editForm.uniteDay)){
                                    callback()
                                }else{
                                    callback(new Error('请输入正确的年月日'))
                                }
                            }
                        }
                    }
                }
                
                
            },}
        ],
        sex:[
          { required: false,  trigger: 'change' ,message:'请选择性别'}
        ],
        email:[
          { required: false,  trigger: 'change' ,validator:formTest.emailTest}
        ],
        province:[
          { required: false,  trigger: 'change' ,validator:(rule, value, callback) => {
              
              if(value && this.editForm.city && this.editForm.district){
                callback()
              }else{
                callback(new Error('请确认所填地区是否正确'))
              }
            }
          }
        ],
        point:[
          { required: false,  trigger: 'change' ,validator:formTest.pointTest}
        ],
      },
      district:[],
      province:[],
      city:[],
      moreMsg:{},
      editForm:{
        province:'',
        city:'',
        district:'',
        radio3:0,
        sex:'',
        email:'',
        pointType:'add',
        point:'',
        day:'',
        scrollYear:'',
        scrollMonth:'',
        scrollDay:'',
        uniteYear:'',
        uniteMonth:'',
        uniteDay:'',
      },
      pointType:[
        {
          label:'增加',
          value:'add'
        },
        {
          label:'扣除',
          value:'minus'
        }
      ]
    }
  },
  computed: {
    shopId() {
      return this.$store.state.shopId.shopId;
    }
  },
  created() {
    this.getCity()
    this.getBase(this.$route.params.id,this.$route.params.shopId)
  },
  watch: {
    'editForm.province':{
      handler:function(n,o){
        console.log(n)
        this.province.forEach(item=>{
          if(item.name == n){
            this.city = item.cityList
            console.log(1)

          }
        })
        console.log(this.city)

      }
    },
    'editForm.city':{
      handler:function(n,o){
        console.log(n)

        this.city.forEach(item=>{
          if(item.name == n){
            console.log(2)
            this.district = item.areaList
          }
        })
        console.log(this.district)

      }
    }
  },
  methods: {
    //提交
    commit(){
      var data ={
        apiMerchantId :this.$route.params.merchantId,
        shopInfoIds : this.$route.params.shopId.split(','),
        memberId : this.$route.params.id,
        memberInfo : {
          memberGender : this.editForm.sex,
          province : this.editForm.province,
          city : this.editForm.city,
          district : this.editForm.district,
          memberEmail : this.editForm.email,
        },
        customerProperties : this.moreMsg.customerProperties,
        // integralChange : {
        //   validType : this.editForm.radio3,
        //   changeType : this.editForm.pointType,
        //   pointValue : this.editForm.point,
        //   year :this.editForm.radio3 == 0 ? '' : this.editForm.radio3 == 1 ? this.editForm.scrollYear : this.editForm.radio3 == 2 ? this.editForm.uniteYear : '' ,
        //   month : this.editForm.radio3 == 0 ? '' : this.editForm.radio3 == 1 ? this.editForm.scrollMonth: this.editForm.radio3 == 2 ? this.editForm.uniteMonth : '' ,
        //   day : this.editForm.radio3 == 0 ? this.editForm.day : this.editForm.radio3 == 1 ? this.editForm.scrollDay: this.editForm.radio3 == 2 ? this.editForm.uniteDay : '' 
        // }
      }
      if(this.editForm.point.length!=0){
        data.integralChange = {
          validType : this.editForm.radio3,
          changeType : this.editForm.pointType,
          pointValue : this.editForm.point,
          year :this.editForm.radio3 == 0 ? '' : this.editForm.radio3 == 1 ? this.editForm.scrollYear : this.editForm.radio3 == 2 ? this.editForm.uniteYear : '' ,
          month : this.editForm.radio3 == 0 ? '' : this.editForm.radio3 == 1 ? this.editForm.scrollMonth: this.editForm.radio3 == 2 ? this.editForm.uniteMonth : '' ,
          day : this.editForm.radio3 == 0 ? this.editForm.day : this.editForm.radio3 == 1 ? this.editForm.scrollDay: this.editForm.radio3 == 2 ? this.editForm.uniteDay : '' 
        }
      }
      this.$http
        .post(process.env.API_ROOT + "/member/list/modify", data)
        .then(res => {
          console.log('提交结果',res);
          if (res.data.code == 1) {
            this.close()
          } else {
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    close(){
      window.history.go(-1)
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
    changePro(val){
      this.editForm.city = ''
      this.editForm.district = ''
      console.log(val)
      this.province.forEach(item=>{
        if(item.name == val){
          this.city = item.cityList
        }
      })
    },
    changeCity(val){
      this.editForm.district = ''

      console.log(val)
      this.city.forEach(item=>{
        if(item.name == val){
          this.district = item.areaList
        }
      })
    },
        //获取城市列表
    getCity() {
      this.$http({
        method: "get",
        url: "static/cityL3.json"
      })
        .then(res => {
          console.log("城市list", res);
          this.province = res.data;
          if(this.editForm.province){
            this.province.forEach(item=>{
              if(item.name == this.editForm.province ){
                this.city = item.cityList
              }
            })
            this.city.forEach(item=>{
              if(item.name == this.editForm.city ){
                this.district = item.areaList
              }
            })
          }
        })
        .catch(error => {
          console.log(error);
          alert("系统异常");
        });
    },
    uniqObjInArray(objarray){
        let len = objarray.length;
        let tempJson = {
            
        };
        let res = [];
        for(let i = 0;i < len;i++){
            //取出每一个对象
            tempJson[JSON.stringify(objarray[i])] = true;
        }
        console.log("tempJson is ",tempJson);
        let keyItems= Object.keys(tempJson);
        for(let j = 0;j < keyItems.length;j++){
            res.push(JSON.parse(keyItems[j]));
        }
        return res;
    },
       //查询基本信息
    getBase(id,shopId){
      
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/member/list/detail/info?memberId=" +
          id+'&shopInfoIds='+shopId
      })
        .then(res => {
          console.log("基本信息", res);
          // this.properties = []
          if (res.data.code == 1) {
            this.moreMsg = res.data.data;
            this.editForm.sex = this.moreMsg.memberGender === null ? 2:this.moreMsg.memberGender
            this.editForm.email = this.moreMsg.memberEmail
            this.editForm.sex = this.moreMsg.memberGender
            this.editForm.province = this.moreMsg.province
            this.editForm.city = this.moreMsg.city
            this.editForm.district = this.moreMsg.district
            this.moreMsg.customerProperties.forEach(item=>{
              var obj={}
              obj.name = item.propertyName
              obj.value = []
              let id = item.propertyNameId
              this.moreMsg.customerProperties.forEach(val=>{
                if(val.propertyNameId == id){
                  obj.value.push(val.propertyValue)
                }
                this.properties.push(obj)
              })
            })
            // console.log(this.properties)
            // console.log(this.uniqObjInArray(this.properties))
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    back(){
      this.$router.push({
        name:'member'
      })
    }
  },
  mounted() {}
};
</script>
<style lang='scss' >
$sc: 12;
.editMember{
  .head{
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
      font-family: 'zt2';
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
    .el-breadcrumb{
      // float: right;
      margin-left: 50px;
      line-height: 30px;
      margin-right: 20px
    }
  }
  h4{
    font-family: 'zt2';
    padding-bottom: 20px;
font-size: 16px;
color: #333333;
letter-spacing: 0;
line-height: 16px;
  }
  .btns{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
  }
  .baseMsg{
    background: #FFFFFF;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
    margin: 40px;
    margin-top: 0;
    padding: 40px;
    div{
      font-family: 'zt1';
      font-size: 14px;
      color: #666666;
      letter-spacing: 0;
      line-height: 30px;
    }
  }
  .editMsg{
    background: #FFFFFF;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
    margin: 40px;
    padding: 40px;
  }
  .el-form-item{
    .el-input{
      width: 300px;
    }
  }
  .memberMsg {
          height: 38px;
          display: flex;
          width: 300px;
          border: 1px solid #d9d9d9;
          .el-input {
          height: 38px;
            line-height: 38px;
            width: 180px;
            .el-input__inner {
              height: 36px;
              border: none;
              border-radius: 0;
            }
          }
          .el-select {
              height: 38px;
            line-height: 38px;
            .el-input {
              height: 38px;
            line-height: 38px;

              width: 120px;
              .el-input__inner {
                border: none;
                border-right: 1px solid #d9d9d9;
                border-radius: 0;
                height: 38px;
            line-height: 38px;
              }
            }
          }
          
        }
    .date{
        // border-bottom: 1px solid #ccc;
        .el-input{
            width: 100px
        }
        .el-radio+.el-radio{
            margin-left: 0;
            display: block;
        }
    }
}
</style>
