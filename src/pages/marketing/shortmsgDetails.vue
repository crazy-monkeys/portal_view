<template>
    <!-- 查看控件 -->
    <div class="look">
      <div class="head clear">
                <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
          <el-breadcrumb-item>客户营销</el-breadcrumb-item>
          <el-breadcrumb-item>定制短信</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>
          <i class="el-icon-back" @click="back"></i>
          
          <span>营销活动详情</span>
        </h1>

      </div>

      <div class="box">
        <div class="baseMsg">
          <h2>基本信息</h2>
          <div>
            <span>店铺名称</span>
            {{ruleForm.shop}}
          </div>
          <div>
            <span>主题名称</span>
            {{ruleForm.themeName}}
          </div>
          <div>
            <span>活动名称</span>
            {{ruleForm.actName}}
          </div>
        </div>
        <div class="mb">
          <h2>短信模板</h2>
          <div>
            <span>执行时间</span>
            {{ruleForm.time1}}
          </div>
          <div>
            <span>ROI统计时间段</span>
            {{ruleForm.roiTime[0]}} - {{ruleForm.roiTime[1]}}
          </div>
          <div>
            <span>短信签名</span>
            {{ruleForm.signName}}
          </div>
          <div>
            <span>短信内容</span>
            {{ruleForm.textarea}} 退订回TD
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "ShortmsgDetails",
  data() {
    return {
      id: "",
      //表单数据
      ruleForm: {
        shop: "",
        theme: "",
        actName: "",
        sign: "",
        mb: "",
        radio2: 0,
        textarea: "",
        roiTime: [],
        time1: "",
        time2: [],
        marketingActivityId: "",
        themeName:'',
        signName:''
      },
    };
  },
  created() {
    console.log(this.$route.params)
    this.getMore(this.$route.params.id)
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    }
  },
  watch: {
    shopId:{
      handler:function(n,o){
        if(n!=o){
        }
      }
    },
  },
  methods: {

    clear() {
      // this.ruleForm.shop='',
      (this.ruleForm.theme = ""),
        (this.ruleForm.actName = ""),
        (this.ruleForm.sign = ""),
        (this.ruleForm.mb = ""),
        (this.ruleForm.radio2 = 0),
        (this.ruleForm.textarea = ""),
        (this.ruleForm.roiTime = []),
        (this.ruleForm.time1 = ""),
        (this.ruleForm.time2 = []);
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
          console.log("详情", res);
          if (res.data.code == 1) {
            //id
            this.ruleForm.marketingActivityId = res.data.data[0].marketing_activity_id;
            //店铺
            this.ruleForm.shop = res.data.data[0].shop_name;
            //主题
            this.ruleForm.theme = res.data.data[0].theme_id;
            this.ruleForm.themeName = res.data.data[0].theme_name;

            //活动
            this.ruleForm.actName = res.data.data[0].activity_name;
            //短信
            this.ruleForm.textarea = res.data.data[0].marketing_content;
            //签名
            this.ruleForm.sign = res.data.data[0].notice_register_id;
            this.ruleForm.signName = res.data.data[0].channel_desc;
            //是否定时
            this.ruleForm.radio2 = res.data.data[0].executor_type;
            //定时的时间
            this.ruleForm.time1 = res.data.data[0].executor_time;
            //roi时间
            this.ruleForm.roiTime.push(res.data.data[0].roi_begin_time);
            this.ruleForm.roiTime.push(res.data.data[0].roi_end_time);
            this.num = this.ruleForm.textarea.length;
            // this.secTheme();
            // this.secSign();
            this.uploadFile = JSON.parse(res.data.data[0].upload_file)

            console.log(this.uploadFile)
            this.group = this.uploadFile.dynamicLabel;
            this.relationId = this.uploadFile.uploadFileInfo.relationId;
            this.fileList = [{name:this.uploadFile.uploadFileInfo.uploadFileName}]
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },

    //返回
    back() {
      this.clear();
      this.$router.push({
        name:'shortmsg',

      })
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
  .look {
     
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
        line-height: 36px;
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
      .condition {
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
