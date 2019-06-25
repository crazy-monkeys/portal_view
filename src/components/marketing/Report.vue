<template>
  <!-- 报告控件 -->
  <div class="rep">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>客户营销</el-breadcrumb-item>
        <el-breadcrumb-item>短信营销</el-breadcrumb-item>
        <el-breadcrumb-item>详细报告</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>
        <i class="el-icon-back" @click="back"></i>
        <span>详细报告</span>
      </h1>
    </div>
    <div class="btns">
      <span>主题名称：{{report.theme}}</span>
      <span>活动名称：{{report.actName}}</span>
      <el-button type="text" @click="getTime" v-if="roiStatus!=-1">重新计算</el-button>
      <el-button type="text" @click="getTime" v-if="roiStatus==-1" :disabled="roiStatus==-1">计算中...</el-button>
      

      <el-date-picker
        :picker-options="pickerOptions1"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        v-model="report.roiTime"
        prefix-icon="el-icon-date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>
    <div class="tab">
      <el-table :data="reoprtTableData" style="width: 100%">
        <el-table-column prop="marketingCount" label="营销订单数"></el-table-column>

        <el-table-column prop="payCount" show-overflow-tooltip label="付款订单数"></el-table-column>
        <el-table-column prop="payCountScale" show-overflow-tooltip label="付款订单占比"></el-table-column>
        <el-table-column prop="marketingMoney" label="营销订单总金额" show-overflow-tooltip></el-table-column>
        <el-table-column prop="payMoney" label="付款订单总金额" show-overflow-tooltip></el-table-column>

        <el-table-column prop="payMoneyScale" show-overflow-tooltip label="付款订单金额占比"></el-table-column>
        <el-table-column
          prop="sendCustomerCount"
          label="发送人数"
          show-overflow-tooltip
          :render-header="renderHeader2"
        ></el-table-column>
        <el-table-column show-overflow-tooltip prop="sendSplitCount" label="发送总量"></el-table-column>
        <el-table-column show-overflow-tooltip prop="sendSucSplitCount" label="成功总量"></el-table-column>
        <el-table-column show-overflow-tooltip prop="sendSucScale" label="短信送达率"></el-table-column>
        <el-table-column show-overflow-tooltip prop="sendCost" label="短信成本"></el-table-column>
        <!-- <el-table-column
            show-overflow-tooltip
            prop="payMoney"
            label="活动销售额"
            >
        </el-table-column>-->
        <el-table-column show-overflow-tooltip prop="roi" label="投入产出比"></el-table-column>
        <!-- <div slot="empty">
          <div>
            <img src="../assets/img/none.png" alt="" width="140" height="140" />
          </div>
          <p :style="{'marginTop': '23px'}">未查询到您的交易记录</p>
        </div>-->
      </el-table>
    </div>
    <div class="roi">
      <div>
        <span>roi</span>
        {{roi}}
      </div>
      <div>
        <span>活动销售额</span>
        <!-- <el-progress :stroke-width='20' :percentage="roi.split(':')[1]*1 ==0 ? 0 :100" color="#3366FF " :show-text='false'></el-progress> -->
        <b></b>
        {{payMoney}}
      </div>
      <div>
        <span>营销成本</span>
        <b></b>
        <!-- <el-progress :stroke-width='20' :percentage="roi.split(':')[0]*1 ==0 ? 0 : sendCost/payCount *100 "  color="#3366FF " :show-text='false'></el-progress> -->
        {{sendCost}}
      </div>
    </div>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
export default {
  name: "Report",
  data() {
    return {
      roiStatus:'',
      roi:'',
      payMoney:'',
      sendCost:'',
      reoprtTableData: [],
      report: {
        roiTime: [],
        actName: "",
        theme: "",
        id: "",
        createTime: ""
      },
      //短信内容
      pickerOptions1: {
        disabledDate: time => {
          return (
            time.getTime() < new Date(this.report.createTime).getTime() - 8.64e7
          );
        }
      },
      //表单验证
      rules: {
        photo: [{ required: true, message: "请选择快照", trigger: "change" }],
        theme: [{ required: true, message: "请选择主题", trigger: "blur" }],
        actName: [
          {
            type: "string",
            required: true,
            message: "请填写活动名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "活动名称不可超过20个字符",
            trigger: "blur"
          }
        ],
        sign: [
          { required: true, message: "请选择短信签名", trigger: "change" }
        ],
        mb: [{ message: "请至少选择一个模板", trigger: "blur" }],
        textarea: [
          { required: true, message: "请填写短信内容", trigger: "change" }
        ],
        roiTime: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value) {
                // console.log('time1',new Date(value[0]).getTime(),new Date(value[1]).getTime())
                if (value.length == 0) {
                  callback(new Error("请选择roi时间段!"));
                } else {
                  if (this.ruleForm.time1) {
                    if (
                      new Date(value[0]).getTime() <
                      new Date(this.ruleForm.time1).getTime()
                    ) {
                      callback(new Error("roi开始时间要晚于定时执行时间"));
                    } else {
                      if (
                        new Date(value[0]).getTime() ==
                        new Date(value[1]).getTime()
                      ) {
                        callback(new Error("roi结束时间要晚于roi开始时间"));
                      } else {
                        callback();
                      }
                    }
                  } else {
                    if (new Date(value[0]).getTime() < new Date().getTime()) {
                      callback(new Error("roi开始时间要晚于当前时间"));
                    } else {
                      if (
                        new Date(value[0]).getTime() ==
                        new Date(value[1]).getTime()
                      ) {
                        callback(new Error("roi结束时间要晚于roi开始时间"));
                      } else {
                        callback();
                      }
                    }
                  }
                }
              } else {
                callback(new Error("请选择roi时间段!"));
              }
            }
          }
        ],
        time1: [
          { required: true, trigger: "blur", validator: formTest.time11Test }
        ],
        time2: [
          { required: true, message: "请选择排除已购时间段", trigger: "blur" }
        ],
        time: [{ message: "", trigger: "blur" }]
      },
      //店铺列表
      shopList: [],
    };
  },
  computed: {
    shopId() {
      return this.$store.state.shopId.shopId;
    }
  },
  created() {
    console.log(this.$route.params)
    console.log(this.shopId);
    this.getReport(this.$route.params.id);
    this.getMore(this.$route.params.id)
    this.getShopList();
    console.log(this.$refs);
  },
  watch: {
    shopId: {
      handler: function(n, o) {
        if (n != o) {
        }
      }
    },
  },
  methods: {
    //短信营销结果报告获取
    getReport(activityId) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/marketing/notice/report" +
          "?activityId=" +
          activityId
      })
        .then(res => {
          console.log("报告", res);
          if (res.data.code == 1) {
            this.roiStatus = res.data.data.roiStatus 
            this.reoprtTableData=[]
            this.reoprtTableData.push(res.data.data);
            this.sendCost = res.data.data.sendCost;
            this.payMoney = res.data.data.payMoney;
            this.roi = res.data.data.roi;
            var b1 = document.documentElement.getElementsByTagName("b")[0];
            var b2 = document.documentElement.getElementsByTagName("b")[1];
            if (this.payMoney != 0) {
              b1.style.width = "500px";
              b2.style.width = 500 / this.sendCost / this.payMoney + "px";
            } else {
              b1.style.width = "0px";
              if (this.sendCost != 0) {
                b2.style.width = "20px";
              } else {
                b2.style.width = "0px";
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //ROI时间修改&重新计算
    getTime() {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/marketing/notice/report/recalculation" +
          "?activityId=" +
          this.report.id +
          "&startTimeStr=" +
         (this.report.roiTime ? this.report.roiTime[0] :'')+
          "&endTimeStr=" +
          (this.report.roiTime ? this.report.roiTime[1] :'')
      })
        .then(res => {
          console.log("roi时间", res);
          if (res.data.code == 1) {
            this.getReport(this.$route.params.id);
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
          if (res.data.code == 20001) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
          if (res.data.code == 20106) {
            this.$message({
              type: "success",
              message: 'roi开始时间需晚于等于活动开始时间'
            });
          }
          if (res.data.code == 20109) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
          if (res.data.code == 20108) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
          if (res.data.code == 20107) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
          if (res.data.code == -1) {
            this.$message({
              type: "fail",
              message: res.data.msg
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //查询短信营销详情  事件
    getMore(marketingActivityId) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/marketing/selectMarketingDetail" +
          "?marketingActivityId=" +
          marketingActivityId
      })
        .then(res => {
          console.log("详情", res.data.data[0]);
          if (res.data.code == 1) {
            this.report.id = res.data.data[0].marketing_activity_id
            this.report.actName = res.data.data[0].activity_name
            this.report.theme = res.data.data[0].theme_name
            this.report.roiTime.push(res.data.data[0].roi_begin_time)
            this.report.roiTime.push(res.data.data[0].roi_end_time)
            console.log(this.report.roiTime)
            this.report.createTime = res.data.data[0].executor_time
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //获取用户店铺列表
    getShopList() {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/getCurentUserShopList"
      })
        .then(res => {
          console.log("店铺列表", res);
          if (res.data.code == 1) {
            this.shopList = res.data.data;
            //获取主题
            // this.ruleForm.theme=''
            //获取快照
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    // 提示2
    renderHeader2(h, { column }) {
      // h即为cerateElement的简写，具体可看vue官方文档
      return h("span", {}, [h("span", column.label), h("eg2")]);
    },
    // 点击返回按钮
    back() {
      this.$router.push({
        name: "Sell"
      });
      this.reoprtTableData = [];
      this.report.roiTime = [];
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;

.rep {
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
      line-height: 42px;
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
  .btns {
    padding: 0 20px;
    height: 48px;
    margin: 0 20px;
    line-height: 48px;
    background: #fff;
    padding: 0 20px;
    span {
      margin: 0 20px;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
    }
    .el-date-editor {
      float: right;
      margin-top: 4px;
      margin-right: 20px;
    }
    .el-button {
      float: right;
      margin-top: 4px;
 
    }
  }
  .tab {
    margin: 0 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;

    position: relative;
  }
  .roi {
    height: 152px;
    background: #fff;
    margin: 0 20px 20px 20px;
    padding: 0 20px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    div {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #3366ff;
      letter-spacing: 0;
      line-height: 50px;
      .el-progress {
        display: inline-block;
        width: 50%;
        margin-right: 20px;
        line-height: 50px;
        .el-progress-bar__outer {
          border-radius: 0;
          background: none;
        }
        .el-progress-bar__inner {
          border-radius: 0;
        }
      }
      span {
        width: 100px;
        display: inline-block;
        font-size: 12px;
        color: #666666;
        line-height: 40px;
      }
      b {
        display: inline-block;
        height: 20px;
        background: #3366ff;
        // width: 50%;
        margin-right: 20px;
      }
    }
    div:first-child {
      font-size: 14px;
      color: #333333;
      line-height: 50px;
      span {
        font-size: 16px;
        color: #333333;
        letter-spacing: 0.5px;
        line-height: 16px;
      }
    }
  }
}
</style>
