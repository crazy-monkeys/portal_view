<template>
  <div class="returnGoods" >
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>客户关怀</el-breadcrumb-item>
          <el-breadcrumb-item>退货提醒</el-breadcrumb-item>      
        </el-breadcrumb>
        <h1>退货提醒</h1>
      </div>
      <div class="box">
        <div class="btns clear">
          <el-button @click="add" class="add" >新建退货提醒</el-button>
        </div>
        <div class="tab">
          <el-table
            :data="tableData"
            style="width: 100%"
            height="700"
            @row-click='rowClick'
           >
            <el-table-column
              type="index"
            :index='q'

              label="编号"
              width='80'
             >
            </el-table-column>
            <el-table-column
              prop="marketing_plan_name"
              label="活动名称"
              show-overflow-tooltip
              width='120'

              >
            </el-table-column>
            <el-table-column
              prop="sms_content"
              label="短信内容"
              show-overflow-tooltip
              
              >
            </el-table-column>
         
            <el-table-column
              prop=""
              show-overflow-tooltip
              label="发送时间"
              width='120'

              >
              <template slot-scope="scope">
                <span >{{tableData[scope.$index].day_start_time}}-{{tableData[scope.$index].day_end_time}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="start_time"
              show-overflow-tooltip
              label="活动开始时间"
              width="150"

              >
            </el-table-column>
            <el-table-column
              prop="end_time"
              show-overflow-tooltip
              label="活动结束时间"
              width="150"

              >
            </el-table-column>
              <el-table-column
              show-overflow-tooltip
              prop="active"
              label="活动状态"
              width="80"
              >
              <!-- <template slot-scope="scope">
                <span v-if='tableData[scope.$index].executeStatus==-1'>禁用</span>
                <span v-if='tableData[scope.$index].executeStatus==0'>未开始</span>
                <span v-if='tableData[scope.$index].executeStatus==1'>执行中</span>
                <span v-if='tableData[scope.$index].executeStatus==2'>执行完成</span>
              </template> -->
            </el-table-column>
            <el-table-column
            label="操作"
            fixed='right'
              width='100'

            >
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="startAndStop(tableData[scope.$index].marketing_plan_id,1)"
                  type="text"
                  v-if='  tableData[scope.$index].active == "禁用"'
                  >
                  启用
                </el-button>
                <el-button
                  @click.native.prevent="startAndStop(tableData[scope.$index].marketing_plan_id,0,tableData[scope.$index].active)"
                  type="text"
                  v-if='tableData[scope.$index].active == "执行中" ||  tableData[scope.$index].active == "未开始"' 
                  >
                  禁用
                </el-button>
                <el-dropdown trigger="click" @command='b'>
                  <span class="el-dropdown-link">
                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" >
                  
                    <el-dropdown-item :command="{name:'编辑',index:scope.$index,data:tableData}" v-if='tableData[scope.$index].active == "禁用"||tableData[scope.$index].active == "未开始"'>编辑</el-dropdown-item>

                    <el-dropdown-item  v-if='tableData[scope.$index].active == "执行中" || tableData[scope.$index].active == "已结束"' :command="{name:'查看',index:scope.$index,data:tableData}">查看</el-dropdown-item>

                    <el-dropdown-item  :command="{name:'详细报告',id:tableData[scope.$index].marketing_plan_id,startTime:tableData[scope.$index].start_time,endTime:tableData[scope.$index].end_time,actName:tableData[scope.$index].marketing_plan_name}">详细报告</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column> 
            <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt="" width="140" height="140" />
            </div>
            <p :style="{'marginTop': '23px'}">未查询到您的退货提醒</p>
          </div>
          </el-table>
        </div>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 100]"
            :page-size="10"
            layout="sizes,total, jumper, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="bottom">按住 [shift] 键，可横向滚动表格哦</div>
  </div>
</template>

<script>
export default {
  name: 'returnGoodsReminder',

  data () {
    return {
      id:'',
      //数据的个数
      total:0,
      //列表页搜索框数据
      //列表页的时间选择
      value4:'',
      //在上边提示
      labelPosition: 'top',
      //短信内容 显示否
      tableData: [],
      //第几页
      currentPage : 1,
      //每页的容量
      pageSize : 10,
      ruleForm:{
        pros:[]
      }
    }
  },
  created(){
    this.getList(this.currentPage,this.pageSize,this.shopId)
    this.getSignatures(this.shopId)
    this.getCity()

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
            this.getList(this.currentPage,this.pageSize,this.shopId)
            this.getSignatures(this.shopId)
        }
      }
    },
  },
  methods:{  
    getCity(){
      this.$http({
            method:'get',
            url:'static/city.json'
          }).then(res => {
              console.log("城市list", res);
              this.ruleForm.pros = res.data
          })
          .catch(error => {
            console.log(error);
            alert("系统异常");
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
    q(index){
     return this.pageSize * (this.currentPage-1) + index +1
    },
    //点击新增营销活动
    add(){
      this.$router.push(
        {
          name:'CarelessAdd',
          params:{
            type:10,
            id:''
          }
        }
      )
    },
    //编辑按钮
    edit(index,rows){
      this.$router.push(
        {
          name:'CarelessEdit',
          params:{
            type:10,
            id:rows[index].marketing_plan_id,
          }
        }
      )
    },
    //查看按钮
    check(index,rows){
      this.$router.push(
        {
          name:'CarelessDetails',
          params:{
            id:rows[index].marketing_plan_id,
            type:10
          }
        }
      )
    },
    rowClick(row,event,column){
      console.log(row)
      this.id = row.marketing_plan_id
    },

    // 启用和禁用按钮按钮
    startAndStop(marketingPlanId,active,type){
      if(!active){
          this.$confirm(type =='执行中'? '该活动正在执行中，确定要将该活动变更为禁用吗？' : '确定要将该活动变更为禁用吗？','禁用' , {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          })
          .then(() => { 
            this.$http.post(
          
          ''+process.env.API_ROOT+'/customer/care/config/updateConfigActive',
          {
            "marketingPlanId": marketingPlanId,
            "active":active,
          }).then(res => {
                console.log("禁用", res);
                if(res.data.code ==1){
               
                  this.getList(this.currentPage,this.pageSize,this.shopId);
                }
            })
            .catch(error => {
              console.log(error);
              alert("登入失败");
            });
          })
          .catch(action => {
         
          });
      }else{
          // this.$confirm('确定要将该活动更为启用吗？','启用' , {
          //   distinguishCancelAndClose: true,
          //   confirmButtonText: '确认',
          //   cancelButtonText: '取消'
          // })
          // .then(() => { 
            this.$http.post(
          ''+process.env.API_ROOT+'/customer/care/config/updateConfigActive',
          {
            "marketingPlanId": marketingPlanId,
            "active":active,
          }).then(res => {
                console.log("启用", res);
                if(res.data.code ==1){
                  this.getList(this.currentPage,this.pageSize,this.shopId);
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
          // })
          // .catch(action => {
         
          // });
      }
      
    },
    //获取营销活动列表
    getList(currentPage,pageSize,shopid){
          var data = {
              "pageIndex":currentPage,
              "pageSize":pageSize,
              'status':10,
              'shopInfoId':shopid,
          };
      this.$http.get(''+process.env.API_ROOT+'/customer/care/config/query?'+this.toQueryString(data)).then((res)=>{
              console.log('退货提醒列表',res)
              if(res.data.code==1){
                this.tableData = res.data.data.list
                this.total = res.data.data.total
              }

          }).catch((err)=>{
            console.log(err);

            alert('网络异常')
          })
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


    // 更多的选项
    b(command){
      if(command.name == '编辑'){
        this.edit(command.index,command.data)
      }    
      if(command.name == '查看'){
        this.check(command.index,command.data)
      }    
      if(command.name == '详细报告'){
                  this.$router.push(
        {
          name:'CarelessReport',
          params:{
            id:command.id,
            type:10
          }
        }
      )
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
.returnGoods{
  .head{
    h1{
        opacity: 0.87;
        font-size: 18px;
        color: #000;
        letter-spacing: 0;
        line-height: 42px;
        height: 42px;
        font-weight: bold;
        padding: 0 50px;
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
      margin-left: 50px;
      margin-right: 20px
    }
  }
  .box{
    margin: 0 20px 20px 20px;
    background: #FFFFFF;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
    border-radius: 2px;
    position: relative;

    .btns{
       
        .add{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 0;
          background: #3366FF;
          border-radius: 2px;
          height: 32px;
          line-height: 10px;
          border: none;
          margin: 12px 0 12px 20px;
          float: left;
        }
        .drop{
          float: right;
          width: 286px;
          height: 32px;
          line-height: 30px;
          margin: 12px 0 12px 20px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          .el-dropdown-link{
            display: inline-block;
            height: 30px;;

            line-height: 30px;
          }
          .sel{
            width:180px;
            .el-input__inner{
            border: none;
              height: 28px;;
            }
          }
          .el-dropdown{
            float: left;

            .el-dropdown-menu__item{
              width:100px
            }
          }
         
        }
        .el-date-editor{
          float: right;
          margin: 12px 0 12px 20px;
          height: 32px;
          line-height: 32px;
          border-radius: 0;
          .el-range-separator{
            line-height: 32px;
            height: 32px;
          }

        }
        .sec{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 0;
          border:1px solid  #3366FF;
          border-radius: 2px;
          height: 32px;
          line-height: 8px;
          margin: 12px 0 12px 20px;
          float: right;
          color: #3366FF;
          margin-right: 20px
          }
        }
    .tab{
      
    .el-table{ 
        
            td {
          height: 64px;
          line-height: 64px;
            .cell{
              // overflow: hidden;
              // text-overflow:ellipsis;
              // display: -webkit-box;
              // -webkit-line-clamp: 2;
              // -webkit-box-orient: vertical;
              // width:100px;
               font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #333333;
                letter-spacing: 0;
                line-height: 18px;
              .el-dropdown{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #3366FF;
                letter-spacing: 0;
                line-height: 18px;
              }
              .el-button{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #3366FF;
                letter-spacing: 0;
                line-height: 12px;
              }
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
  .bottom{
      text-align: center;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
      line-height: 16px;
  }
}
</style>
