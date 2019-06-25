<template>
        <!-- 查看空间 -->
    <div class="couponRep" >
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>客户权益</el-breadcrumb-item>
          <el-breadcrumb-item>优惠券规则</el-breadcrumb-item>
          <el-breadcrumb-item>优惠券详情</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>
          <i class="el-icon-back" @click="back"></i>
          <span>优惠券详情</span>
        </h1>
      </div>

      <div class="box">
        <div class="baseMsg">
          <h2>基本信息</h2>
          <div>
            <span>优惠券规则名称</span>
            {{form.couponName}}
          </div>
          <div>
            <span>规则生效时间</span>
            {{form.validTime}} - {{form.invalidTime}} 
          </div>
          <div>
            <span>关联优惠券活动</span>
            {{form.unexActivityName}}
          </div>
        </div>
        <div class="kz">
          <h2>规则条件</h2>

          <div>
            <span>优惠券类型</span>
            {{form.couponType == "POINTER_COUPON" ? '积分优惠券' :form.couponType == "BIRTHDAY_COUPON" ? '生日优惠券' : '等级优惠券'}}
          </div>
          
          <div>
            <span>等级</span>
            {{levelMsg}}
          </div>

          <div v-if='form.couponType == "POINT_COUPON" '>
            <span>积分数量</span>
            {{form.couponPoint}}
          </div>
          
          <div v-if='form.couponType == "LEVEL_UP_COUPON"'>
            <span>优惠券生效时间</span>
            升级后第 {{form.levelUpAfter}} 天
          </div>
          <!-- <div  v-if='form.couponType == "POINT_COUPON" '>
            <span>优惠券生效时间</span>
            客户获取后 {{form.exchangeAfter}} 天
          </div> -->
          <div  v-if='form.couponType == "POINT_COUPON" '>
            <span>是否退货返还</span>
             {{form.isReturn ? '是' :'否'}} 
          </div>
          
          <div v-if='form.couponType == "BIRTHDAY_COUPON" && form.openType == 2 '>
            <span>优惠券生效时间</span>
            生日当月 {{form.birthdayMonthDay}} 日
          </div>
          <div v-if='form.couponType == "BIRTHDAY_COUPON" && form.openType == 1 '>
            <span>优惠券生效时间</span>
            距离生日 {{form.birthdayBefor}} 天
          </div>

          <div v-if='form.couponType == "BIRTHDAY_COUPON"'>
            <span>是否补发</span>
            {{form.reissue==1? '是' :'否'}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name:'CouponRep',
    data(){
        return {
            form:{},
            levelList:[],
            levelMsg:'',
            actMsg:'',
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
    methods:{
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
                    this.levelList = res.data.data.filter((val)=>{if(val.levelSwitch==1){return val.levelSwitch}})
                    console.log("启用的等级列表", this.levelList);
                    var arr =[];
                    this.form.validLevel.split(',').forEach(item => {
                        this.levelList.forEach(val=>{
                            if(item== val.apiCustomerLevelConfId){
                                arr.push(val.customerLevelName)
                            }
                        })
                    });
                    console.log(arr)
                    if(arr.length == 0){
                        this.levelMsg = '无'
                    }else{
                      // if(arr.length == this.levelList.length){
                      //     this.levelMsg = '不限'
                      // }else{
                          this.levelMsg = arr.join('、')
                      // }
                    }
                    
                }
            })
            .catch(error => {
            console.log(error);
            alert("登入失败");
            });
        },
        //返回
        back(){
            this.$router.push({
                name:'Coupon'
            })
        },
        //获取详细信息
        getMore(id){
            this.$http
                .get(
                "" + process.env.API_ROOT + "/coupon/config/info?couponConfigId="+id,
                )
                .then(res => {
                console.log("查看结果", res);
                if (res.data.code == 1) {
                    this.form = res.data.data
                    this.getLevelList(this.$route.params.apiMerchantId)
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
        }
    }
}
</script>

<style lang="scss" >
    .couponRep {
    .head {
      height: 72px;
      border-bottom: 1px solid #ccc;
      font-size: 16px;
      padding: 0 30px;
      color: #333333;
      letter-spacing: 0.5px;
      line-height: 72px;
      h1 {
        opacity: 0.87;
        font-size: 18px;
        color: #000;
        letter-spacing: 0;
        line-height: 36px;
        height: 42px;
        font-weight: bold;
        padding: 0;
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
        margin-left: 0px;
        margin-right: 20px;
      }
    }
    .box {
      padding-bottom: 30px;
      h2 {
        font-size: 14px;
        color: #333333;
        font-size: 14px;
        height: 50px;
        line-height: 50px;
      }
      background: #ffffff;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);

      .baseMsg {
        border-bottom: 1px solid #ccc;
        margin: 0 30px;
        color: #333333;
        padding-bottom: 20px;
        letter-spacing: 0.5px;
        div {
          height: 30px;
          line-height: 30px;
          span {
            font-size: 12px;
            color: #999999;
            line-height: 12px;
            margin-right: 20px;
          }
        }
      }
      .kz {
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
        margin: 0 30px;
        color: #333333;
        letter-spacing: 0.5px;
        div {
          height: 30px;
          line-height: 30px;
          span {
            font-size: 12px;
            color: #999999;
            line-height: 12px;
            margin-right: 20px;
          }
        }
      }
      .mb {
        border-bottom: 1px solid #ccc;
        margin: 0 30px;
        padding-bottom: 20px;
        color: #333333;
        letter-spacing: 0.5px;
        div {
          height: 30px;
          line-height: 30px;
          span {
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

