<template>
  <div class="sell" >
    <div v-if='none'>
      <div class="head clear">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
          <el-breadcrumb-item>客户营销</el-breadcrumb-item>
          <el-breadcrumb-item>短信营销</el-breadcrumb-item>      
        </el-breadcrumb>
        <h1>短信营销</h1>
        
      </div>
      <div class="box">
        <div class="btns clear">
          <!-- 新建按钮 -->
          <el-button @click="add" class="add">新建营销活动</el-button>

          <el-button class="sec" @click="search">搜索</el-button>
         
          <!-- 下拉列表 选择活动  -->
          <div class="drop">

            <el-dropdown trigger="click" @command='a'>
              <span class="el-dropdown-link">
                {{select}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='{name:"全部名称",value:"1"}'>全部名称</el-dropdown-item>
                <el-dropdown-item :command='{name:"活动名称",value:"2"}'>活动名称</el-dropdown-item>
                <el-dropdown-item :command='{name:"人群名称",value:"3"}'>人群名称</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          <el-input v-model="value3" class="sel" @change="c"></el-input>
          </div>
           <!-- 日期选择 -->
          <el-date-picker
            v-model="value4"
            prefix-icon='el-icon-fire'
            @change='selTime'
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
              width='100'
              label="编号"
              :index='q'
             >
            </el-table-column>
          
        
            <el-table-column
              prop="themeName"
              show-overflow-tooltip
              label="主题名称"
              >
            </el-table-column>
            <el-table-column
              prop="activityName"
              label="活动名称"
              show-overflow-tooltip
              >
            </el-table-column>
            <el-table-column
              prop="snapshotName"
              label="人群名称"
              show-overflow-tooltip
              :render-header="renderHeader1"
              >
            </el-table-column>
         
            <el-table-column
              prop="createTime"
              show-overflow-tooltip
              label="发送时间"
              >
            </el-table-column>
            <el-table-column
              prop="requestNum"
              label="发送人数"
              show-overflow-tooltip
              :render-header="renderHeader2"
              >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="sendPartitionNum"
              label="发送总量"
              >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="successPartitionNum"
              label="成功发送总量"
              >
            </el-table-column>
              <el-table-column
              show-overflow-tooltip
              prop="executeStatus"
              label="发送状态"
              width="80"
              >
              <template slot-scope="scope">
                <span v-if='tableData[scope.$index].executeStatus==-1'>禁用</span>
                <span v-if='tableData[scope.$index].executeStatus==0'>未开始</span>
                <span v-if='tableData[scope.$index].executeStatus==1'>执行中</span>
                <span v-if='tableData[scope.$index].executeStatus==2'>执行完成</span>

              </template>
            </el-table-column>
              <el-table-column
              prop="roi"
              show-overflow-tooltip
              label="ROI"
              >
            </el-table-column>
            <el-table-column
            label="操作"
            fixed='right'
            >
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="edit(scope.$index, tableData)"
                  type="text"
                  v-if='tableData[scope.$index].executeStatus == 0 || tableData[scope.$index].executeStatus == -1'
                  >
                  编辑
                </el-button>
                <el-button
                  @click.native.prevent="check(scope.$index, tableData)"
                  type="text"
                  v-if='tableData[scope.$index].executeStatus != 0 && tableData[scope.$index].executeStatus != -1' 

                  >
                  查看
                </el-button>
                <el-dropdown trigger="click" @command='b'>
                  <span class="el-dropdown-link">
                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" >
                  
                    <el-dropdown-item :command="{name:'启用',id:tableData[scope.$index].marketingActivityId,time:tableData[scope.$index].createTime}" v-if='tableData[scope.$index].executeStatus == -1'>启用</el-dropdown-item>
                    <el-dropdown-item  v-if='tableData[scope.$index].executeStatus == 0' :command="{name:'禁用',id:tableData[scope.$index].marketingActivityId}">禁用</el-dropdown-item>
                    <el-dropdown-item :command="{name:'查看流程',id:tableData[scope.$index].marketingActivityId}">查看流程</el-dropdown-item>
                    <el-dropdown-item :command="{name:'短信内容',id:tableData[scope.$index].marketingActivityId,sms:tableData[scope.$index].marketingContent}">短信内容</el-dropdown-item>
                    <el-dropdown-item v-if='tableData[scope.$index].executeStatus == 2' :command="{name:'详细报告',id:tableData[scope.$index].marketingActivityId,theme:tableData[scope.$index].themeName,actName:tableData[scope.$index].activityName,roiBeginTime:tableData[scope.$index].roiBeginTime,roiEndTime:tableData[scope.$index].roiEndTime,createTime:tableData[scope.$index].createTime}">详细报告</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column> 
            <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt="" width="140" height="140" />
            </div>
            <p :style="{'marginTop': '23px'}">未查询到您的交易记录</p>
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
    <!-- 添加新增控件 -->
    <div class="addAct" v-if="!none && !rep && !look">    
       <div class="head clear">   
         <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
          <el-breadcrumb-item>客户营销</el-breadcrumb-item>
          <el-breadcrumb-item>短信营销</el-breadcrumb-item>  
          <el-breadcrumb-item v-if="!id">新建营销活动</el-breadcrumb-item>      
          <el-breadcrumb-item v-if="id">编辑营销活动</el-breadcrumb-item>      
        </el-breadcrumb>
        <h1> <i class="el-icon-back" @click="back"></i>  
        <span v-if="!id">新建营销活动</span>
        <span v-if="id">编辑营销活动</span>    
        </h1>
        
      </div>
      <div class="form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">

          <div class="baseMsg">
            <h2>基本信息</h2>
            <el-form-item label="店铺名称" prop="shop" >
              <el-input v-model="ruleForm.shop" :disabled="true" class="name">
              </el-input>
            </el-form-item>
            <el-form-item label="主题名称" prop="theme" >
              <el-select v-model="ruleForm.theme"  @change="selTheme" :disabled="bj">
                <el-option v-for='item in themeList' :key='item.themeId'  :label="item.themeName" :value="item.themeId"></el-option>
              </el-select>
              <el-button class="creatTheme" @click="create" >创建主题</el-button>
            </el-form-item>
            <el-form-item label="活动名称" prop="actName" >
              <el-input v-model="ruleForm.actName" class="actName" :disabled="bj"></el-input>
            </el-form-item>
          </div>
          <div class="kz">
            <h2>选择快照</h2>
            <el-form-item label="人群名称" prop="photo" >
              <el-select v-model="ruleForm.photo"  @change="selPhoto" :disabled="bj">
                <el-option v-for='item in photoList' :key='item.snapshoot_id'  :label="item.snapshoot_name" :value="item.snapshoot_id"></el-option>       
              </el-select>
            </el-form-item>
          </div>
          <div class="mb">
            <h2>短信模板</h2>
            <el-form-item label="执行时间" :prop="ruleForm.radio2 == 1 ?'time1' : 'time'">
              <el-radio-group v-model="ruleForm.radio2" >
                <el-radio :label="0">即刻执行</el-radio>
                <el-radio :label="1">定时执行</el-radio>
              </el-radio-group>
              <el-date-picker

                @change='change'
                prefix-icon='el-icon-date'
                v-model="ruleForm.time1"
                type="datetime"
                format='yyyy-MM-dd HH:mm:ss'
                value-format="yyyy-MM-dd HH:mm:ss"
                v-if='ruleForm.radio2 != 0'
                :picker-options="pickerOptions0"
                placeholder="选择日期时间"
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="ROI统计时间段" prop="roiTime">
              <el-date-picker
                :picker-options="pickerOptions0"
                format='yyyy-MM-dd HH:mm:ss'
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="selRuleFormTime"
                v-model="ruleForm.roiTime"
                prefix-icon='el-icon-date'
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="排除已购人群" :prop="ruleForm.radio3==1 ?'time2' :'time'">
              <el-radio-group v-model="ruleForm.radio3" >
                <el-radio :label="0">不排除</el-radio>
                <el-radio :label="1">排除, 设置排除已购时间</el-radio>
              </el-radio-group>
             <el-date-picker
                format='yyyy-MM-dd HH:mm:ss'
                value-format="yyyy-MM-dd HH:mm:ss"
                @change='change'
                v-model="ruleForm.time2"
                prefix-icon='el-icon-date'
                type="datetimerange"
                range-separator="至"
                v-if='ruleForm.radio3 != 0'
                placeholder="选择日期时间"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="排除黑名单" prop="hmd">
              <el-radio-group v-model="ruleForm.radio4" >
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="短信签名" prop="sign">
              <el-select v-model="ruleForm.sign"  >
              <el-option v-for='item in signList' :key='item.noticeRegisterId'  :label="item.channelDesc" :value="item.noticeRegisterId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="短信内容" prop="textarea">
              <div style="float:left">
                <p>
                  <!-- <label style="margin-right:-200px;line-height: 56px;height:12px;display: block;">【CRM官方测试店】退订回TD</label> -->
                  <el-input
                    class="textarea"
                    type="textarea"
                    rows="10"
                    v-model="ruleForm.textarea"
                    maxlength="300" 
                    >  
                  </el-input>
                </p>
                <span class="shop">
                    【{{shopList[0].shop_name}}】
                  </span>
                  <span class="td">
                    退订回TD
                  </span>
                <p>当前发送{{sendCount}}条短信<span>{{num}}/300</span></p>
                <p><el-button @click="cs" >测试</el-button></p>
              </div>
              <div style="float:left;margin-left:20px">
                <img src="../../assets/img/phone.png" style="width:225px;position:relative;" alt="">
                <div class="msgBox"> 
                  <div class='msg' >

                    <span  :contenteditable="false">
                    【{{shopList[0].shop_name}}】
                  </span>  
                     {{ruleForm.textarea}}
                     <span  :contenteditable="false">
                    退订回TD
                  </span> 
                  </div>
                  
                </div>
              </div>
            </el-form-item>

          
          
          </div>
          <el-form-item class="sub">
            <el-button @click="back" >取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" >完成</el-button>

          </el-form-item>
        </el-form>

      </div>
    </div>
     <!-- 报告控件 -->
    <div class="report" v-if="rep">    
      <div class="head clear">   
        <h1> <i class="el-icon-back" @click="back"></i>  <span>详细报告</span>    </h1>
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
          <el-breadcrumb-item>客户营销</el-breadcrumb-item>
          <el-breadcrumb-item>短信营销</el-breadcrumb-item>  
          <el-breadcrumb-item>详细报告</el-breadcrumb-item>      
        </el-breadcrumb>
      </div>
      <div class="btns">
        <span>主题名称：{{report.theme}}</span>
        <span>活动名称：{{report.actName}}</span>
        <el-button type='text' @click="getTime">重新计算</el-button>

        <el-date-picker
          :picker-options="pickerOptions1"
          format='yyyy-MM-dd HH:mm:ss'
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="report.roiTime"
          prefix-icon='el-icon-date'
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="tab">
        <el-table
          :data="reoprtTableData"
          style="width: 100%"
          >
          <el-table-column
            prop="marketingCount"
            label="营销订单数"
            >
          </el-table-column>
        
          <el-table-column
            prop="payCount"
            show-overflow-tooltip
            label="付款订单数"
            >
          </el-table-column>
          <el-table-column
            prop="payCountScale"
            show-overflow-tooltip
            label="付款订单占比"
            >
          </el-table-column>
          <el-table-column
            prop="marketingMoney"
            label="营销订单总金额"
            show-overflow-tooltip
            >
          </el-table-column>
          <el-table-column
            prop="payMoney"
            label="付款订单总金额"
            show-overflow-tooltip
            >
          </el-table-column>
        
          <el-table-column
            prop="payMoneyScale"
            show-overflow-tooltip
            label="付款订单金额占比"
            >
          </el-table-column>
          <el-table-column
            prop="sendCustomerCount"
            label="发送人数"
            show-overflow-tooltip
            :render-header="renderHeader2"
            >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sendSplitCount"
            label="发送总量"
            >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sendSucSplitCount"
            label="成功总量"
            >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sendSucScale"
            label="短信送达率"
            >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sendCost"
            label="短信成本"
            >
          </el-table-column>
          <!-- <el-table-column
            show-overflow-tooltip
            prop="payMoney"
            label="活动销售额"
            >
          </el-table-column> -->
          <el-table-column
            show-overflow-tooltip
            prop="roi"
            label="投入产出比"
            >
          </el-table-column>
          <!-- <div slot="empty">
          <div>
            <img src="../assets/img/none.png" alt="" width="140" height="140" />
          </div>
          <p :style="{'marginTop': '23px'}">未查询到您的交易记录</p>
        </div> -->
        </el-table>
      </div>
      <div class="roi">
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
    <!-- 添加主题控件 -->
    <el-dialog
      title="添加主题"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" :rules='rules1' ref='themeForm' label-width="80px" :model="themeForm">
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  同一店铺下的主题名称不能重复</p>

        <el-form-item label="店铺" prop='shop'>
           <el-select v-model="themeForm.shop" >
             
            <el-option v-for='item in shopList' :key='item.shop_info_id'  :label="item.shop_name" :value="item.shop_info_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主题名称" prop='theme'>
          <el-input v-model="themeForm.theme"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="back1">取消</el-button>
        <el-button type="primary" @click="submitForm1('themeForm')">提交</el-button>
      </span>
    </el-dialog>
    <!-- 测试短信控件 -->
    <el-dialog
      title="测试短信"
      :visible.sync="csdialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <el-form :label-position="labelPosition" label-width="80px" :model="themeForm">
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  短信发出后，偶尔会有出现延时的情况，请稍等10分钟，如10分钟仍未收到，请联系系统管理员！</p>
        <el-form-item label="" prop="hand">
          <el-input
            type="textarea"
            rows="10"
            v-model="content"
            style="vertical-align:top"
            maxlength="200" 
            placeholder='请输入手机号码，若需要发送多个号码，则使用“,”隔开'
            >  
          </el-input>
        </el-form-item>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx">取消</el-button>
        <el-button type="primary" @click="send(shopList[0].shop_info_id,content,ruleForm.textarea,ruleForm.sign)">发送</el-button>
      </span>
    </el-dialog>
    <!-- 短信内容控件 -->
    <el-dialog
      title="短信内容"
      :visible.sync="smsdialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <p class="sms">{{sms}}</p>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="smsdialogVisible = false">取消</el-button> -->
        <el-button type="primary" @click="smsdialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 查看流程控件 -->
    <el-dialog
      title="查看流程"
      :visible.sync="childdialogVisible"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
      <p class="line" v-for="item in children" :key='item.programsExecutionId'>{{item.executionName}} 
        <template v-if="item.executionStatus==0">
            <span class="beg">初始化</span>
        </template>  
        <template v-if="item.executionStatus==1">
            <span class="suc">成功</span>
        </template> 
        <template v-if="item.executionStatus==2 && toggle == 0">
            <span class="fail">失败</span>
        </template> 
        <template v-if="item.executionStatus==2&& toggle == 1">
            <span class="act">执行中</span>

        </template> 
      </p>

      <span slot="footer" class="dialog-footer" v-if='childrenBtn'>
        <el-button @click="retry(id)" :disabled="fob" >重试</el-button>

        <el-button type="primary" @click="ignore(id)">忽略并发送</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-if='!childrenBtn'>
        <el-button @click="childdialogVisible=false" :disabled="fob" >确定</el-button>
      </span>
    </el-dialog>
     <!-- 查看控件 -->
    <div class="look" v-if="look">    
      <div class="head clear">   
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
          <el-breadcrumb-item>客户营销</el-breadcrumb-item>
          <el-breadcrumb-item>定制短信</el-breadcrumb-item>  
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
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
export default {
  name: 'Sell',
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
    console.log(this.shopId)
    this.getShopList()
    this.getSnapshots(1)
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
          this.ruleForm.photo = res.data.data[0].snapshoot_name
          this.photo = res.data.data[0].snapshoot_id
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
    //获取快照信息列表
    getSnapshots(activityChannel){
      this.$http({
        method:'get',
        url:''+ process.env.API_ROOT +'/marketing/snapshots' + '?activityChannel=' + activityChannel,
      }).then(res => {
          console.log("快照列表", res);
          this.photoList = res.data.data
          console.log(this.photoList)
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
.sell{
  .el-textarea__inner{
    color: #000;
    font-family: 'zt2'
  }
  .textarea{
  
    .el-textarea__inner{
   text-indent: 130px;
    height:400px;
    width:450px;
    top:0;
    font-family: zt2;
    left:0;
    line-height: 30px;
    padding:0 10px;
    color: #333;
    box-sizing:border-box;
    }
  }
  .shop{
      position: absolute;
      top:-4px;
      left: 10px;
    }
    .td{
      position: absolute;
      bottom:80px;
      left: 360px;
    }
    .msgBox{
      height:350px;
      background:#fff;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
      position:relative;
      width:225px;
      margin-top: -15px;
      overflow-y:auto;
      .msg{
    background:#ccc;
    width:180px;
    margin: 0  10px 10px 10px;
    font-size: 10px;
    color: #666666;
    line-height:20px;
    min-height: 20px;
    position:absolute;
    overflow-y: auto;
    top:20px;
    left:10px;
    border-radius:  5px  5px  5px 0;
    padding:5px 5px 5px 5px;
    word-break:break-all;
  }
    }
  
  .el-textarea__inner{
    width: 450px;
    height: 400px;
    padding: 8px;
    background: transparent;
    text-indent:130px;  
  }
  .el-dialog{
     .el-textarea__inner{
      width: 100%;
      height: 100%;
      background: transparent;
      text-indent:0;  
    }
    .line{
        height: 40px;
        line-height: 40px;
        span{
          float: right;
        }
        .fail{
          color: red
        }
        .suc{
          color: green
        }
        .beg{
          color: #3366FF
        }
        .act{
          color: #ccc
        }
      }
  }
  .danger{
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }
  .sms{
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    line-height: 22px;
  }
  .report{
    
    .btns{
      padding: 0 20px;
      height: 48px;
      margin: 0 20px;
      line-height: 48px;
      background: #fff;
      padding: 0 20px;
      span{
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
      .el-button{
        float:right;
        margin-top: 4px;
        span{
          color: #3366FF
        }
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
          line-height: 16px;
        }
      }
    }
  }
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
  .form{
    h2{
        font-size: 16px;
        color: #333333;
        letter-spacing: 0.5px;
        line-height: 16px;
        font-weight: bold;
        padding: 20px 0;
      }
    .baseMsg{
      margin: 0 20px;
      background: #fff;
      padding: 0 30px 5px;
      box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
      .el-select{
        width: 50%;
      }
      .name{
        width: 50%;
      }
      .actName{
        width: 50%
      }
      .creatTheme{
        border: 1px solid #3366FF;
        border-radius: 2px;
        color: #3366FF
      }
    }
    .kz{
      box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
      margin: 10px 20px ;
      background: #fff;
      padding: 0 30px 2px;
      .el-select{
        width: 50%;
      }
    }
    .mb{
      box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
      margin: 10px 20px ;
      background: #fff;
      padding: 0 30px 2px;
      .el-select{
        width: 50%;
      }
    }
  .sub{
    .el-form-item__content{
      display: flex;
      justify-content: center;
      align-items: center
    }
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
          .sel{
            width:180px;
            .el-input__inner{
            border: none;
              height: 28px;;
            }
          }
          .el-dropdown{
            float: left;

            border-right: 1px solid #ccc;
            padding: 0  10px;
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
     .block{
          // position: absolute;
          bottom: 26px;
          padding: 10px;
          .el-pagination__total{
            margin-left: 500px
          }
          .btn-prev{
            margin-left: 20px
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
  
}
</style>
