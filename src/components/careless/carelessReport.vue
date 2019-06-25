<template>
     <!-- 查看报告报告控件 -->
    <div class="rep" >    
      <div class="head clear">   
        
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
          <el-breadcrumb-item>客户关怀</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.params.type==8">预付款提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==10">退货提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==7">商品回购提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==6">好评关怀</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==2">付款关怀</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==3">发货提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="$route.params.type==1">订单催付</el-breadcrumb-item>  
          <el-breadcrumb-item>活动效果报告</el-breadcrumb-item>      
        </el-breadcrumb>
        <h1> <i class="el-icon-back" @click="back($route.params.type)"></i>  <span>活动效果报告</span>    </h1>
      </div>
      <div class="btns">
        <span>活动名称：{{report.actName}}</span>
        <div class="chooses">
          <el-button type='text' @click="changeSelectTime(1)" :class="chooses.active1 ? 'blue' : ''">过去1天</el-button>

          <el-button type='text' @click="changeSelectTime(7)" :class="chooses.active2 ? 'blue' : ''">过去7天</el-button>
          <el-button type='text' @click="changeSelectTime(30)" :class="chooses.active3 ? 'blue' : ''">过去30天</el-button>

        </div>
        <el-button type='text' @click="getTime" class="recaculate">重新计算</el-button>
          <el-date-picker
            :clearable='false'
            format='yyyy-MM-dd'
            value-format="yyyy-MM-dd"
            v-model="report.roiTime"
            prefix-icon='el-icon-date'
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            
            >
          </el-date-picker>
        
      </div>
      <div class="tab">
        <el-table
          :data="reoprtTableData"
          style="width: 100%"
          >
          <el-table-column
            prop=""
            label=""
            width='30'
            >
          </el-table-column>
          

          <!-- 商品回购 -->
          <el-table-column
          v-if="$route.params.type==7"
            prop="remindCount"
            show-overflow-tooltip
            label="回购订单数"
            min-width='100'
            >
          </el-table-column>
          <el-table-column
          v-if="$route.params.type==7"
            prop="payCount"
            show-overflow-tooltip
            min-width='160'
            label="回购付款订单数"
            >
          </el-table-column>
          <!-- <el-table-column
            prop="payCountScale"
            show-overflow-tooltip
            label="付款订单数占比"
            >
          </el-table-column> -->
          <el-table-column
          v-if="$route.params.type==7"
            prop="remindMoney"
            label="回购订单总金额"
            min-width='160'
            show-overflow-tooltip
            >
          </el-table-column>
          <el-table-column
          v-if="$route.params.type==7"
            prop="payMoney"
            label="回购付款订单总金额"
            min-width='160'
            show-overflow-tooltip
            >
          </el-table-column>
          <el-table-column
          v-if="$route.params.type==7"
            prop="payMoneyScale"
            label="付款订单金额占比"
            min-width='160'
            show-overflow-tooltip
            >
          </el-table-column>
       

        <!-- 催付 -->
        <el-table-column
        v-if='$route.params.type==1'
            prop="remindCount"
            show-overflow-tooltip
            min-width='120'
            label="催付订单数"
            >
          </el-table-column>
          <el-table-column
        v-if='$route.params.type==1'
            prop="payCount"
            min-width='150'
            show-overflow-tooltip
            label="催付成功订单数"
            >
          </el-table-column>
          <el-table-column
        v-if='$route.params.type==1'
            prop="payCountScale"
            min-width='150'
            show-overflow-tooltip
            label="付款订单数占比"
            >
          </el-table-column>
          <el-table-column
        v-if='$route.params.type==1'
            prop="remindMoney"
            min-width='150'
            label="催付订单总金额"
            show-overflow-tooltip
            >
          </el-table-column>
          <el-table-column
        v-if='$route.params.type==1'
            prop="payMoney"
            min-width='180'
            label="催付付款订单总金额"
            show-overflow-tooltip
            >
          </el-table-column>
          <el-table-column
        v-if='$route.params.type==1'
            prop="payMoneyScale"
            min-width='180'
            label="付款订单金额占比"
            show-overflow-tooltip
            >
          </el-table-column>


          <el-table-column
          v-if="$route.params.type==7||$route.params.type==1"
            prop="sendCount"
            label="短信发送总量"
            show-overflow-tooltip
            min-width='120'
            >
          </el-table-column>


          <el-table-column
          v-if="$route.params.type==10 || $route.params.type==8|| $route.params.type==6|| $route.params.type==2|| $route.params.type==3"
            prop="remindCount"
            show-overflow-tooltip
            label="发送订单数"
            min-width='100'
            >
          </el-table-column>
          <el-table-column
          v-if="$route.params.type==10 || $route.params.type==8|| $route.params.type==6|| $route.params.type==2|| $route.params.type==3"
            prop="sendCount"
            show-overflow-tooltip
            min-width='100'
            label="发送总量"
            >
          </el-table-column>
          <el-table-column
          v-if="$route.params.type==10 || $route.params.type==8|| $route.params.type==6|| $route.params.type==2|| $route.params.type==3" 
            prop="successCount"
            show-overflow-tooltip
            min-width='100'
            label="成功总量"
            >
          </el-table-column>
          <el-table-column
          v-if="$route.params.type==10 || $route.params.type==8|| $route.params.type==6|| $route.params.type==2|| $route.params.type==3"
            prop="sendScale"
            min-width='100'
            label="短信成功率"
            show-overflow-tooltip
            >
          </el-table-column>
          <el-table-column
          v-if=" $route.params.type==8"
            prop="remindMoney"
            label="活动销售金额"
            min-width='120'
            show-overflow-tooltip
            >
          </el-table-column>



          <el-table-column

            prop="sendCost"
            label="成本"
            fixed='right'
            show-overflow-tooltip
            min-width='100'
            >
          </el-table-column>
          <el-table-column
          v-if="$route.params.type==7|| $route.params.type==8||$route.params.type==1"
            prop="roi"
            label="ROI"
            show-overflow-tooltip
            min-width='100'
            fixed='right'
            >
          </el-table-column>

        <!--退货提醒  -->
          

     
         



          <!-- <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt="" width="140" height="140" />
            </div>
            <p :style="{'marginTop': '23px'}">未查询到您的交易记录</p>
          </div> -->
        </el-table>
      </div>
      <div class="roi" v-if="$route.params.type==8||$route.params.type==7||$route.params.type==1">
        <div><span>roi</span>{{roi}}</div>
        <div>
          <span>活动销售额</span>
          <!-- <el-progress :stroke-width='20' :percentage="roi.split(':')[1]*1 ==0 ? 0 :100" color="#3366FF " :show-text='false'></el-progress> -->
          <b ></b>
          {{payMoney}}
        </div>
        <div>
          <span>营销成本</span>
          <b ></b>
          <!-- <el-progress :stroke-width='20' :percentage="roi.split(':')[0]*1 ==0 ? 0 : sendCost/payCount *100 "  color="#3366FF " :show-text='false'></el-progress> -->
          {{sendCost}}
        </div>
        
      </div>
    </div>
</template>

<script>
export default {
  name: 'CarelessReport',

  data () {
    return {
      chooses:{
        active1 : false,
        active2 : true,
        active3 : false,
      },
      
      sendCost:'',
      payMoney:'',
      roi:'',
      reoprtTableData:[],
      report:{
        actName:'',
        roiTime:[],
        id:'',
        createTime:''
      },
    }
  },
  created(){
    console.log(this.$route.params.id)
    this.report.id = this.$route.params.id;
    this.changeSelectTime(7)
    this.getMore(this.$route.params.id)
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    }
  },
  watch:{
    shopId:{
      handler:function(n,o){
        if(n!=o){
        }
      }
    },
  },
  methods:{
    getMore(marketingPlanId){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/customer/care/config/detail' + '?marketingPlanId=' + marketingPlanId,
      }).then(res => {
          console.log("详情", res);
          if(res.data.code ==1){
            this.report.actName = res.data.data.marketing_plan_name
          }
      }
      )
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //报告获取
    getReport(marketingPlanId,startTime,endTime){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+(this.$route.params.type ==7 ? '/customer/care/config/queryConfigReportByBackRemind' : '/customer/care/config/queryConfigReport') + '?marketingPlanId=' + marketingPlanId+'&startTime='+startTime+'&endTime='+endTime,
      }).then(res => {
          console.log("报告", res);
          if(res.data.code==1){
            this.reoprtTableData=[]
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
    //重新计算
    getTime(){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+(this.$route.params.type ==7 ? '/customer/care/config/queryConfigReportByBackRemind' :'/customer/care/config/queryConfigReport') + '?marketingPlanId=' + this.report.id +'&startTime=' +(!this.report.roiTime ? '' : this.report.roiTime[0])+'&endTime=' +(!this.report.roiTime ? '' : this.report.roiTime[1]),
      }).then(res => {
          console.log("报告", res);
          if(res.data.code ==1 ){
            this.reoprtTableData=[]
            this.reoprtTableData.push(res.data.data)
            
            if(this.$route.params.type == 8 ||this.$route.params.type == 7 ||this.$route.params.type == 1 ){
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
          }
          if(res.data.code ==20001 ){
              this.$message({
              type:'error',
              message : res.data.msg
            })
          }
          if(res.data.code ==20106 ){
              this.$message({
              type:'error',
              message : res.data.msg
            })
          }
          if(res.data.code ==20109 ){
              this.$message({
              type:'error',
              message : res.data.msg
            })
          }
          if(res.data.code ==20108 ){
              this.$message({
              type:'error',
              message : res.data.msg
            })
          }
          if(res.data.code ==20107 ){
              this.$message({
              type:'error',
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

    // 点击返回按钮
    back(type){
      console.log(type)
      switch (type*1){
        case 10 :
          this.$router.push({
            name:'returnGoodsReminder'
          })
          break;
        case 8 :
        this.$router.push({
            name:'advabceReminder'
          })
          break;
        case 7 :
        this.$router.push({
            name:'productRepurchaseReminder'
          })
          break;
        case 6 :
        this.$router.push({
            name:'signReminder'
          })
          break;
        case 2 :
        this.$router.push({
            name:'paymentThank'
          })
          break;
        case 3 :
        this.$router.push({
            name:'deliveryReminder'
          })
          break;
        case 1 :
        this.$router.push({
            name:'orderUrge'
          })
          break;
      }
     
      
    },
    formatDate1(now) {
        var year = now.getFullYear();
        console.log(year)
        var month = now.getMonth() + 1;
        var date = now.getDate();
        
        return year + "-" + month + "-" + date 
    },
    changeSelectTime(day){
      if(day==1){
        this.chooses.active1 = true
        this.chooses.active2 = false
        this.chooses.active3 = false
      }
      if(day==7){
        this.chooses.active1 = false
        this.chooses.active2 = true
        this.chooses.active3 = false
      }
      if(day==30){
        this.chooses.active1 = false
        this.chooses.active2 = false
        this.chooses.active3 = true
      }
      this.report.roiTime=[];
      this.report.roiTime.push(this.formatDate1(new Date((new Date().getTime() - 3600 * 1000 * 24 * day))))
      this.report.roiTime.push(this.formatDate1(new Date((new Date().getTime() - 3600 * 1000 * 24 ))))
      console.log(this.report.roiTime)
      this.getTime()
    },
 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;
  .rep{
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
    .btns{
      padding: 0 20px;
      height: 48px;
      margin: 0 20px;
      line-height: 48px;
      background: #fff;
      padding: 0 20px;
      .chooses{
        height: 48px;
        display: inline-block;
        .blue{
          span{
            color: #3366FF
          }
        }
      }
      span{
        float: left;
        margin: 0 20px;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
      }
      .el-date-editor{
        float: right;
        margin-top: 4px;
        margin-right: 20px;
      }
      .recaculate{
        float:right;
        span{
          color: #3366FF
        }
      }
      .el-button{
        margin-top: 4px;
      }
    }
    .tab{
       margin: 0 20px 20px 20px;
      background: #FFFFFF;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
      border-radius: 2px;
        
      position: relative;
   
    }
    .roi{
      height: 152px;
      background: #fff;
      margin: 0 20px 20px 20px;
      padding: 0 20px;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
      div{
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #3366FF;
          letter-spacing: 0;
          line-height: 50px;
          .el-progress{
            display: inline-block;
            width: 50%;
            margin-right: 20px;
            line-height: 50px;
            .el-progress-bar__outer{
              border-radius: 0;
              background: none;
            }
            .el-progress-bar__inner{
              border-radius: 0;
            }
          }
        span{
          width:100px;
          display: inline-block;
          font-size: 12px;
          color: #666666;
          line-height: 40px;
        }
        b{
          display: inline-block;
          height: 20px;
          background:#3366FF;
          // width: 50%;
          margin-right: 20px;
        }
      }
      div:first-child{
        font-size: 14px;
        color: #333333;
        line-height: 50px;
        span{
          font-size: 16px;
          color: #333333;
          letter-spacing: 0.5px;
          // line-height: 16px;
        }
      }
    }
  }
</style>
