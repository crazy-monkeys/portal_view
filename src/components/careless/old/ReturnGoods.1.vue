<template>
  <div class="returnGoods" >
    <div v-if='none'>
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
                  @click.native.prevent="startAndStop(tableData[scope.$index].marketing_plan_id,0)"
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
          <el-breadcrumb-item>客户关怀</el-breadcrumb-item>
          <el-breadcrumb-item>退货提醒</el-breadcrumb-item>  
          <el-breadcrumb-item v-if='!ruleForm.marketingPlanId'>新建退货提醒</el-breadcrumb-item>      
          <el-breadcrumb-item v-if='ruleForm.marketingPlanId'>编辑退货提醒</el-breadcrumb-item>      
        </el-breadcrumb>
        <h1 v-if='!ruleForm.marketingPlanId'> <i class="el-icon-back" @click="back(0)"></i>  <span >新建退货提醒</span></h1>
        <h1 v-if='ruleForm.marketingPlanId'> <i class="el-icon-back" @click="back(1)"></i>  <span >编辑退货提醒</span></h1>
        
      </div>
      <div class="form">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">
          <div class="baseMsg">
            <h2>基本信息</h2>
            <el-form-item label="活动名称" prop="actName">
              <el-input v-model="ruleForm.actName" class="actName" ></el-input>
            </el-form-item>
            <el-form-item label="执行时间" :prop="ruleForm.radio2 ==1 ?'time1' : 'radio2'" >
              <el-radio-group v-model="ruleForm.radio2" @change="radioChange">
                <el-radio :label="0">即刻执行</el-radio>
                <el-radio :label="1">定时执行</el-radio>
              </el-radio-group>
              <el-date-picker
                @change='changeTime1'
                prefix-icon='el-icon-date'
                v-model="ruleForm.time1"
                type="datetimerange"
                format='yyyy-MM-dd HH:mm:ss'
                value-format="yyyy-MM-dd HH:mm:ss"
                v-if='ruleForm.radio2 != 0'
                range-separator='至'
                :picker-options="pickerOptions0"
                placeholder="选择日期时间"
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发送时间" prop="time2" >
              <el-time-picker
              @change="changeTime2"
                is-range
                arrow-control
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                prefix-icon='el-icon-time'
                v-model="ruleForm.time2"
                format='HH:mm'
                value-format="HH:mm"
                >
              </el-time-picker>
            </el-form-item>
          </div>
          <div class="condition">
            <h2>执行条件</h2>
            <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  当订单状态变更为“买家已退货”触发退货提醒！短信将发送至收货人手机</p>
            <el-form-item label="退款金额" :prop="ruleForm.radio3 ==1 ?'money1' : 'radio3'" >
              <el-radio-group v-model="ruleForm.radio3" >
                <el-radio :label="0">任意</el-radio>
                <el-radio :label="1">
                  <div class="drop">

                    <el-dropdown trigger="click" @command='a'>
                    <span class="el-dropdown-link" >
                      {{ruleForm.select}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command='{name:"大于",value:"1"}'>大于</el-dropdown-item>
                      <el-dropdown-item :command='{name:"小于",value:"2"}'>小于</el-dropdown-item>
                      <el-dropdown-item :command='{name:"介于",value:"3"}'>介于</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-input v-model="ruleForm.money1" class="sel" v-if="ruleForm.radio3 == 1"></el-input>
                    <span v-if="money2 && ruleForm.radio3 == 1">-</span>
                    <el-input v-model="ruleForm.money2"  class="sel" v-if="money2 &&ruleForm.radio3 == 1"></el-input>

                  </div>
                </el-radio>
              </el-radio-group>
            </el-form-item>
   
            <el-form-item label="订单来源" prop="radio4">
              <el-radio-group v-model="ruleForm.radio4" >
                <el-radio :label="0">任意</el-radio>
                <el-radio :label="1">手机端</el-radio>
                <el-radio :label="2">PC端</el-radio>
                <el-radio :label="3">聚划算</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="收货地址" prop="radio1">
              <el-radio-group v-model="ruleForm.radio1" >
                <el-radio :label="0">任意</el-radio>
                <el-radio :label="1"> <el-button type='text' :disabled="cityDis" @click="cityToggle = true">{{!cityStr ? '请选择省市' :'编辑'}}</el-button><span style="color:#000;margin-left:20px">{{cityStr}}</span></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="订单商品范围" prop="checkList" :show-message="suc">
               
              <p>请按照模版录入信息 <a href="static/goods.xlsx" download='' style="color:#3366FF;margin:0 20px">下载模板</a>
              <!-- <el-button type='text' @click="outExe(0)" >下载模板</el-button> -->
              </p>
              <el-checkbox-group v-model="ruleForm.checkList" @change='upload'>
                  <el-checkbox label="任意" @change="change3"></el-checkbox>
                  <el-checkbox label="1" >
                    <el-upload
                      :disabled='sc1'
                      :multiple="false"
                      class="upload-demo1"
                      ref="upload1"
                      :action="''"
                      :http-request="httpReq1"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove1"
                      :on-exceed='handleOver'
                      :file-list="fileList1"
                      :on-change="changeFile1"
                      :on-success='uploadOk'
                      :limit="1"
                      name='myfiles'
                      :auto-upload="true"
                      :with-credentials='true'
                      >
                      <el-button slot="trigger" size="small" type="primary" :disabled='sc1'>包含商品</el-button>
                    </el-upload>
                    <el-button type="text" v-if='ruleForm.specifySkuCodes' @click="outExe(1)">下载该列表</el-button>
                    <!-- <a href="../../static/custom.xlsx" outExe='' style="color:#3366FF;margin:0 20px">下载模板</a> -->
                    </el-checkbox>
                  <el-checkbox label="2" >
                    <el-upload
                      :disabled='sc2'
                      :multiple="false"
                      class="upload-demo2"
                      ref="upload2"
                      :http-request="httpReq2"
                      :action="''"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove2"
                      :on-exceed='handleOver'
                      :file-list="fileList2"
                      :on-change="changeFile2"
                      :on-success='uploadOk'
                      :limit="1"
                      name='myfiles'
                      :with-credentials='true'
                      :auto-upload="true"
                      >
                      <el-button slot="trigger" size="small" type="primary" :disabled='sc2'>排除商品</el-button>
                    </el-upload>
                    <el-button type="text" v-if="ruleForm.excludeSkuCodes" @click="outExe(2)">下载该列表</el-button>

                  </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </div>
          <div class="mb">
            <h2>短信模板</h2>
            <el-form-item label="短信签名" prop="sign">
              <el-select v-model="ruleForm.sign"  >
                <el-option v-for='item in signList' :key='item.noticeRegisterId'  :label="item.channelDesc" :value="item.noticeRegisterId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="插入动态信息" prop="">
              <el-checkbox-group v-model="checkboxGroup" size="small"  @change='itemChange'  >
                <el-checkbox v-for="(item,index) in group" :key='index' :label="item"   border @change="checkChange"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  请勿随意修改动态标签内容, 否则可能会造成短信数据有误!</p>
            <el-form-item label="短信内容" prop="textarea" >
              <div style="float:left;position:relative">
                <p>
                  <el-input
                    id='text'
                    ref="text"
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
                 
                <p>当前发送{{sendCount}}条短信<span>{{num}}/300</span></p>
                <p><el-button @click="cs" >测试</el-button></p>
              </div>
              <div style="float:left;margin-left:20px">
                <img src="../../assets/img/phone.png" style="width:225px" alt="">
                      <div class="msgBox" > 
                  <div class='msg'  >

                    <span  :contenteditable="false">
                    【{{shopList[0].shop_name}}】
                  </span>  
                     {{ruleForm.textarea}}
                
                  </div>
                      
                  
                </div>
              </div>
            </el-form-item>      
          </div>
          <el-form-item class="sub">
            <!-- <el-button @click="addRule(10,0)" >保存</el-button> -->
            <!-- <el-button type="primary" @click="addRule(10,1)" >保存并启用</el-button> -->
            <el-button @click="submitForm('ruleForm',10,0)" >保存</el-button>
            <el-button type="primary" @click="submitForm('ruleForm',10,1)" >保存并启用</el-button>
             
          </el-form-item>
        </el-form>
      </div>

    </div>
     <!-- 查看报告报告控件 -->
    <div class="report" v-if="rep">    
      <div class="head clear">   
        <h1> <i class="el-icon-back" @click="back(2)"></i>  <span>活动效果报告</span>    </h1>
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
          <el-breadcrumb-item>客户关怀</el-breadcrumb-item>
          <el-breadcrumb-item>退货提醒</el-breadcrumb-item>  
          <el-breadcrumb-item>活动效果报告</el-breadcrumb-item>      
        </el-breadcrumb>
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
            format='yyyy-MM-dd'
            value-format="yyyy-MM-dd"
            v-model="report.roiTime"
            prefix-icon='el-icon-date'
            type="daterange"
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
            prop="remindCount"
            label="发送订单数"
            >
          </el-table-column>
        
          <el-table-column
            prop="sendCount"
            show-overflow-tooltip
            label="发送总量"
            >
          </el-table-column>
          <el-table-column
            prop="successCount"
            show-overflow-tooltip
            label="成功总量"
            >
          </el-table-column>
          <el-table-column
            prop="sendScale"
            label="短信成功率"
            show-overflow-tooltip
            >
          </el-table-column>
          <el-table-column
            prop="sendCost"
            label="成本"
            show-overflow-tooltip
            >
          </el-table-column>
          <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt="" width="140" height="140" />
            </div>
            <p :style="{'marginTop': '23px'}">未查询到您的交易记录</p>
          </div>
        </el-table>
      </div>
    </div>
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
            maxlength="300" 
            placeholder='请输入手机号码，若需要发送多个号码，则使用“，”隔开'
            >  
          </el-input>

        </el-form-item>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx">取消</el-button>
        <el-button type="primary" @click="send(shopList[0].shop_info_id,content,ruleForm.textarea,ruleForm.sign,contentType)">发送</el-button>
      </span>
    </el-dialog>
    <!-- 查看控件 -->
    <div class="look" v-if="look">    
      <div class="head clear">   
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
          <el-breadcrumb-item>客户关怀</el-breadcrumb-item>
          <el-breadcrumb-item>退货提醒</el-breadcrumb-item>  
          <el-breadcrumb-item>退货提醒详情</el-breadcrumb-item>      
        </el-breadcrumb>
        <h1> <i class="el-icon-back" @click="back(3)"></i>  <span>退货提醒详情</span>    </h1>
        
      </div>
       
      <div class="box">
        <div class="head">退货提醒</div>
        <div class="baseMsg">
          <h2>基本信息</h2>  
          <div><span>活动名称</span>{{ruleForm.actName}}</div>
          <div><span>规则执行时间</span>{{ruleForm.time1[0]}}至{{ruleForm.time1[1]}}</div>
          <div><span>发送时间</span>每天{{ruleForm.time2[0]}}-{{ruleForm.time2[1]}}</div>
        </div>  
        <div class="condition">
          <h2>执行条件</h2>  
          <div v-if='!ruleForm.maxPrice && !ruleForm.minPrice'><span>退款金额</span> 任意</div>
          <div v-if='!ruleForm.maxPrice && ruleForm.minPrice'><span>退款金额</span> 大于 {{ruleForm.minPrice}} 元</div>
          <div v-if='ruleForm.maxPrice && !ruleForm.minPrice'><span>退款金额</span> 小于 {{ruleForm.maxPrice}} 元</div>
          <div v-if='ruleForm.maxPrice && ruleForm.minPrice'><span>退款金额</span> {{ruleForm.minPrice}} 元 至 {{ruleForm.maxPrice}} 元 </div>
          <div>
            <div v-if='ruleForm.radio4==0'><span>订单来源</span>任意</div>
            <div v-if='ruleForm.radio4==1'><span>订单来源</span>WAP</div>
            <div v-if='ruleForm.radio4==2'><span>订单来源</span>PC</div>
            <div v-if='ruleForm.radio4==3'><span>订单来源</span>JHS</div>
          </div>
          <div>
            <span>收货地址</span>
            {{cityStr ? cityStr :'任意'}}
          </div>
          <div v-if='!ruleForm.excludeFileName && !ruleForm.specifyFileName'><span>订单商品范围</span> 任意 </div>
          <div v-if='ruleForm.specifyFileName &&!ruleForm.excludeFileName'><span>订单商品范围</span> 包含“{{ruleForm.specifyFileName}}” </div>
          <div v-if='ruleForm.excludeFileName && !ruleForm.specifyFileName'><span>订单商品范围</span> 排除“{{ruleForm.excludeFileName}}” </div>
          <div v-if='ruleForm.excludeFileName && ruleForm.specifyFileName'><span>订单商品范围</span>  包含“{{ruleForm.specifyFileName}}”  ,  排除“{{ruleForm.excludeFileName}}” </div>
        </div>
        <div class="mb">
          <h2>短信模板  </h2>  
          <div><span>短信签名</span>{{ruleForm.signName}}</div>
          <div><span>短信内容</span>{{ruleForm.textarea}}</div>

        </div>
      </div> 
    </div>
        <!-- 选择省市控件 -->
    <el-dialog
      title="选择省市"
      :visible.sync="cityToggle"
      width="30%"
      :before-close="close"
      :close-on-click-modal="false">
        
        <!-- <city></city>   -->
        <div class="city">
            <div class="cityBox clear">
                <div style="border-right:0;"> 
                    <el-input class="inline-input" placeholder='省份名称' prefix-icon='el-icon-search' v-model="selCityStr" @keyup.native="inputChange"></el-input>
                    <el-checkbox-group v-model='checkAll' @change="handleCheckAllChangeAll" class="checkGroup" style="border-right:0" >
                        <template v-for='item in ruleForm.pros' >   
                            <el-checkbox :key="item.code" :class="item.sign? 'is-checked' :'' " ref="check" :indeterminate="item.isIndeterminate" :label='item.name'>{{item.name}}<i class="el-icon-arrow-right" ></i></el-checkbox>
                        </template>
                    </el-checkbox-group>
                </div>
                <div style="margin-top:60px;border-left:1px solid #ccc" class="checkGroup">
                    <el-checkbox-group class="checkGroup" v-model='checkOne' @change="handleCheckAllChangeOne"  >
                        <el-checkbox v-for='item in list' :key="item.code"  :label='item.name'>{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="sure">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  import city from '../../components/careless/city'
  import XLSX from 'xlsx'
export default {
  name: 'Sell',
  components:{
    city
  },
  data () {
    return {
      sendCount:0,
      suc:true,
      selCityStr:'',
      cityStr:'',
      chooses:{
        active1 : false,
        active2 : true,
        active3 : false,
      },
      themeForm:{
        content:''
      },
      trueCity:true,
      secCity:'',
      list:[],
      checkAll:[],
      checkOne:[],
      pro:[],
      sc1:true,
      sc2:true,
      // ruleForm.checkList:['任意'],
      num1:0,
      num2:0,
      tags:[],
      msgContent:'',
      group:[],
      checkboxGroup:[],
      id:'',
      toggle:0,
      //子流程
      children:[],
      // 测试短信内容
      content:'',
      contentType:false,
      photo:'',
      sign:'',
      sendCost:'',
      payMoney:'',
      roi:'',
      reoprtTableData:[],
      report:{
        actName:'',
        roiTime:[],
        id:'',
        // createTime:''
      },
      rep:false,
      //短信内容
      sms:'',
      //指定只能选择当前时间之后的时间
      pickerOptions0:{ 
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的 
        }
      },
      pickerOptions1:{ 
        // disabledDate:(time)=> {
        //   return time.getTime() < new Date(this.report.createTime).getTime()- 8.64e7
        // },
        shortcuts: [{
            text: '过去1天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
              console.log(picker)
            }
          }, {
            text: '过去7天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 70);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '过去30天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
      },
      date:'',
      //搜索框需要参数
      actName:'',
      // photo:'',
      // 短信字数
      num:0,
      //数据的个数
      total:0,
      //列表页搜索框数据
      value3:'',
      //表单数据
      money2:false,
      ruleForm: {
        signName:'',
        checkList:['任意'],
        str:'',
        citys:[],
        pros:[],
        minPrice:'',
        maxPrice:'',
        radio1:0,
        radio2:0,
        radio3:0,
        radio4:0,
        select:'大于',
        money1:'',
        money2:'',
        startTime:'',
        endTime:'',
        mb:'',
        actName:'',
        sign:'',
        textarea:'',
        time1:[],
        time2:['08:40','21:00'],
        roiTime:[],
        marketingPlanId:'',
        innerHTML:'',
        specifySkuCodes:'',
        excludeSkuCodes:'',
        specifyFileName:'',
        excludeFileName:'',
      },
      //表单验证
      rules: {
        money1: [
          { required: true, message: "", trigger: "change" ,validator:(rule, value, callback) => {
            let passWordReg = /^[0-9]+$/;

            if(this.ruleForm.select == '介于'){
            
              if (this.ruleForm.money1.length ==0 || this.ruleForm.money2.length ==0) {
                callback(new Error('内容不能为空!!'))
              }
              setTimeout(() => {
                if (!passWordReg.test(this.ruleForm.money1) || !passWordReg.test(this.ruleForm.money2) ) {
                  callback(new Error('请输入正确的格式'))
                } else {
                  callback()
                }
              }, 500)

              if(this.ruleForm.money1.length !=0 && this.ruleForm.money2.length !=0){
                if (passWordReg.test(this.ruleForm.money1) && passWordReg.test(this.ruleForm.money2)){
                  if((this.ruleForm.money1*1)<(this.ruleForm.money2*1)){
                    callback()
                  }else{
                    callback(new Error('金额区间不正确'))
                  }
                }
              }

            }else{
              if (this.ruleForm.money1.length ==0) {
                callback(new Error('内容不能为空!!'))
              }

              setTimeout(() => {
                if (!passWordReg.test(this.ruleForm.money1)  ) {
                  callback(new Error('请输入正确的格式'))
                } else {
                  callback()
                }
              }, 500)
            }
            
          }, }
        ],
        radio3: [
          { required: true, message: "请选择退款金额", trigger: "change" }
        ],
        radio4:[
          {required: true, message: "请选择订单来源", trigger: "change"}
        ],
        radio1:[
          {required: true, message: "请选择收获地址", trigger: "change"}
        ],
        textarea: [
          { required: true, message: "请填写短信内容", trigger: "change" }
        ],
        time1: [
          { required: true, message: "", trigger: "change",validator:formTest.time1Test }
        ],
        time2: [
          { required: true, message: "请选择发送时间段", trigger: "blur" }
        ],
        radio2: [{required: true, message: "请选择执行时间段", trigger: "change" }],
        sign: [
          { required: true, message: "请选择短信签名", trigger: "change" }
        ],
        actName: [
          {type: "string",required: true,message: "请填写活动名称",trigger: "blur"},{min: 1,max: 20,message: "活动名称不可超过20个字符",trigger: "blur"}
        ],
        checkList: [
          {required: true, message: "请至少选择一个模板", trigger: "change" }
        ],
      },
      look:false,
      //新建控件显示否
      none:'true',
      //下拉菜单选择
      select:'活动名称',
      //列表页的时间选择
      value4:'',

      //在上边提示
      labelPosition: 'top',

      //测试短信框 显示否
      csdialogVisible: false,
      //短信内容 显示否
      smsdialogVisible:false,
      //选择省市按钮禁用  否
      cityDis:true,
      //选择省市开关
      cityToggle:false,
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
      //禁用
      fileList1: [],
      fileList2: [],
      file1:{},
      file2:{},
      excelData:[],
    }
  },
  created(){
    this.getShopList();
    this.getCity()
    
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    }
  },
  mounted(){
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
    content:{
      handler:function(n,o){
        if(n!=o){
          var re  = /^1[34578]\d{9}$/;
          n.split(',').forEach(ele => {
            if(re.test(ele)){
              this.contentType = true
            }
          });
        }
      }
    },
    'ruleForm.radio3':{
      handler:function(n,o){
        if(n==0){
          this.ruleForm.money1=''
          this.ruleForm.money2=''
        }
      }
    },
    'ruleForm.select':{
       handler:function(n,o){
         if(n=='介于'){
           this.money2 = true
         }else{
           this.money2 = false

         }
       }
    },
    'ruleForm.pros':{
       handler:function(n,o){
         console.log('pros',n)
       },
       deep:true
    },
    checkAll:{
        handler:function(n,o){
            console.log('新省',n)
            console.log('旧省',o)
            if(n.length > o.length){
                console.log('添加省')
                n.forEach(item => {
                    if(o.indexOf(item) ==-1){
                        this.ruleForm.pros.forEach(val=>{
                            if(val.name == item){
                                this.list = val.children
                                this.list.forEach(ele=>{
                                  //改变所有市的状态
                                  ele.ischecked = true
                                  this.$set(ele,'ischecked',true);
                                  //加入checkone
                                    if(this.checkOne.indexOf(ele.name)==-1){
                                        this.checkOne.push(ele.name)
                                    }
                                    // 改变省得状态
                                        val.isIndeterminate = false;
                                        this.$set(val,'isIndeterminate',false);
                                        val.sign = true;
                                        this.$set(val,'sign',true);
                                })
                            }
                        })
                    }
                });
            }else if(o.length>n.length){
                console.log('移除省')
                o.forEach(item => {
                    if(n.indexOf(item) ==-1){
                        this.ruleForm.pros.forEach(val=>{
                            if(val.name == item){
                                this.list = val.children
                                this.list.forEach(ele=>{
                                        ele.ischecked = false
                                        this.$set(ele,'ischecked',false);
                                    if(this.checkOne.indexOf(ele.name)!=-1){
                                        this.checkOne.splice(this.checkOne.indexOf(ele.name),1)
                                    }
                                        val.isIndeterminate = false;
                                        this.$set(val,'isIndeterminate',false);
                                        val.sign = false;
                                        this.$set(val,'sign',false);
                                })
                            }
                        })
                    }
                });
            }else{
              console.log('未作改变')
            }
        }
    },
    checkOne:{
        handler:function(n,o){
            console.log('新市',n)
            console.log('旧市',o)
            //如果是增加市
            if(n.length > o.length){
                console.log('添加市')
                //新的数组遍历
                n.forEach(item => {
                    //如果旧的数组中没找到 
                    if(o.indexOf(item) ==-1){
                      var num1 = 0
                        //遍历  省
                        this.ruleForm.pros.forEach(val=>{
                            //遍历  市
                            val.children.forEach(ele=>{
                                //如果市的名字于旧数组中没找到的元素相同
                                if(ele.name == item){//找到对应的省
                                    //记录这个省所有的市  的  数目
                                    this.len = val.children.length

                                    val.children.forEach(a=>{
                                        n.forEach(b=>{
                                            if(b==a.name){
                                            //num1++
                                                num1++
                                                // console.log(num1,this.len)
                                                a.ischecked = true;
                                                this.$set(a,'ischecked',true)
                                       
                                                }
                                            })
                                        })
                                        if(this.len == num1){
                                                  console.log('市添加满')
                                        if(this.checkAll.indexOf(val.name)==-1){
                                                this.checkAll.push(val.name)
                                            }
                                            val.isIndeterminate = false;
                                            this.$set(val,'isIndeterminate',false);
                                            val.sign = true;
                                            this.$set(val,'sign',true);
                                        }
                                        
                                        if(num1 > 0 && num1<this.len){
                                          console.log('未添加满')
                                          if(this.checkAll.indexOf(val.name)==-1){
                                                this.checkAll.push(val.name)
                                            }
                                            val.isIndeterminate = true;
                                            this.$set(val,'isIndeterminate',true);
                                            val.sign = true;
                                            this.$set(val,'sign',true);
                                        }
                                }
                            })
                        })
                    }
                });
            }else if(o.length > n.length){
                console.log('移除市')
                //遍历旧的  数组
                o.forEach(item => {
                  //如果有没有找到的 城市
                    if(n.indexOf(item) ==-1){
                      console.log(item)
                      //item  即为 删掉的城市
                      var num1 = 0
                      //在省里找
                        this.ruleForm.pros.forEach(val=>{
                          //在省的  市里找
                            val.children.forEach(ele=>{
                              //如果市的名字 等于 没有找到的  没有找到的城市
                                if(ele.name == item){
                                  this.l = val.children.length
                                       

                                  //在此城市的省里  遍历   
                                    val.children.forEach(a=>{
                                      //遍历旧 的城市数组
                                        n.forEach(b=>{
                                          
                                          // 如果 新的城市数组中有等于
                                            if(b==a.name){
                                                num1++
                                                // console.log(num1,this.l)
                                                // console.log(b,a.name)
                                                console.log('a',a.name)
                                                a.ischecked = true;
                                                this.$set(a,'ischecked',true)
                                                ele.ischecked = false;
                                                this.$set(ele,'ischecked',false)

                                            }
                                        })
                                    })
                                              if(num1 == 0 ){
                                                  console.log('市全删完')
                                                  this.checkAll.splice(this.checkAll.indexOf(val.name),1)
                                                  val.isIndeterminate = false;
                                                  this.$set(val,'isIndeterminate',false);
                                                  val.sign = false;
                                                  this.$set(val,'sign',false);
                                              }
                                              if(num1 > 0 && num1<this.l){
                                                  val.isIndeterminate = true;
                                                  this.$set(val,'isIndeterminate',true);
                                                  val.sign = true;
                                                  this.$set(val,'sign',true);
                                              }
                                }
                            })
                        })
                    }
                });
            }else{
              console.log('位改变')
            }
        }
    },
    "ruleForm.textarea": {
      handler: function(n, o) {
        // console.log(n)
        if(n!=o){
          //计算字数
          this.num = this.ruleForm.textarea.length;
          if(this.num>300){
            this.ruleForm.textarea = this.ruleForm.textarea.substring(0,300)
          }
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
          //所有的标签集合便利
          this.group.forEach((item,index)=>{
            // 如果 找到 就添加
            if(this.ruleForm.textarea.indexOf('<'+item+'>') !=-1){
              if(this.checkboxGroup.indexOf(item)==-1){
                this.checkboxGroup.push(item)
              }
              console.log(1)
              console.log(this.checkboxGroup)
            }
            else{ //如果没找到
               if(this.checkboxGroup.indexOf(item)!=-1){
                this.checkboxGroup.splice(this.checkboxGroup.indexOf(item),1)
              }
            }
          })
        }
      }
    },
    'ruleForm.checkList': {
      handler: function(n,o) {
        if(n.indexOf('1')!=-1 || n.indexOf('2')!=-1){
          if(this.ruleForm.checkList.indexOf('任意')!=-1){
            this.ruleForm.checkList.splice(this.ruleForm.checkList.indexOf('任意'),1)
          }
        }
        if(n.indexOf('1')==-1){
          this.sc1 = true;
          this.ruleForm.specifySkuCodes=''
          this.ruleForm.specifyFileName=''
          this.fileList1 = []
        }else{
          this.sc1 = false
        }
        if(n.indexOf('2')==-1){
          this.sc2 = true
          this.ruleForm.excludeSkuCodes=''
          this.ruleForm.excludeFileName=''
          this.fileList2 = []
        }else{
          this.sc2 = false
        }
      },
      deep:true
    },
    'ruleForm.radio1': {
      handler: function(n,o) {
        if(n==1){
          this.cityDis = false;
        }else{
          this.cityDis = true;
          this.cityStr = ''
        }
      },
    }
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next()
  },
  methods:{    
    q(index){
     return this.pageSize * (this.currentPage-1) + index +1
    },
    submitForm(formName,a,b) {
      // if (!this.suc) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.addRule(a,b);
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      // } else {
      //   this.$message({
      //     type: "error",
      //     message: "你还没有上传模板"
      //   });
      // }
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
      this.report.roiTime.push(this.formatDate1(new Date()))
      this.getTime()
      console.log(this.report.roiTime)
    },
      //包含商品
    httpReq1(val){
      console.log(val.file)
      var _file = val.file
      console.log(JSON.stringify(val.file))
      var formData = new FormData();
      formData.append("myfiles", _file);
      this.$http.post(''+process.env.API_ROOT+'/customer/care/config/uploadSkuExcel',formData).then(res => {
        console.log("_RequestUploads_", res);
        if(res.data.code==1){
          this.fileList1 = [val.file]
          this.ruleForm.specifyFileName = _file.name
          this.ruleForm.specifySkuCodes = res.data.data

          this.$message({
            type:'success',
            message:'上传成功'
          })
        }else{
          this.ruleForm.specifyFileName = ''
          this.ruleForm.specifySkuCodes = ''
          this.fileList1=[]
          this.$message({
            type:'error',
            message:'上传失败，请检查文件是否正确'
          })
        }
      }).catch(error=>{
       console.log(error);
        this.ruleForm.excludeSkuCodes = ''
          this.ruleForm.excludeFileName = ''
          this.fileList2=[]
          alert("系统异常");
      })
    },
    //排除商品
    httpReq2(val){
      console.log(val.file)
      var _file = val.file
      
      var formData = new FormData();
      formData.append("myfiles", _file);
      this.$http.post(''+process.env.API_ROOT+'/customer/care/config/uploadSkuExcel',formData).then(res => {
        console.log("_RequestUploads_", res);
        if(res.data.code==1){
          this.fileList2 = [val.file]
          this.ruleForm.excludeFileName = _file.name
          this.ruleForm.excludeSkuCodes = res.data.data
          this.$message({
            type:'success',
            message:'上传成功'
          })
        }else if(res.data.code ==-1){
          this.ruleForm.excludeSkuCodes = ''
          this.ruleForm.excludeFileName = ''
          this.fileList2=[]
          this.$message({
            type:'error',
            message:'上传失败，请检查文件是否正确'
          })
        }else{
          this.ruleForm.excludeSkuCodes = ''
          this.ruleForm.excludeFileName = ''
          this.fileList2=[]
          this.$message({
            type:'error',
            message:res.data.msg
          })
        }
      }).catch(error=>{
        console.log(error);
        this.ruleForm.excludeSkuCodes = ''
          this.ruleForm.excludeFileName = ''
          this.fileList2=[]
          alert("系统异常");
      })
    },
    //省 的模糊搜索
    inputChange(val){
      console.log(this.$refs)

      console.log(this.$refs.check)
      if(this.selCityStr){
        this.$refs.check.forEach(item=>{
      console.log(this.selCityStr,item.label)
        if(item.label.indexOf(this.selCityStr)==-1){
            item.$el.style.cssText = 'display:none';
          }else{
            item.$el.style.cssText = 'display:inline-block';
          }
        }) 
      }else{
        this.$refs.check.forEach(item=>{
            item.$el.style.cssText = 'display:inline-block';
        })
      }
    },
    handleCheckAllChangeAll(val){
        // console.log('省',val)
    },
    handleCheckAllChangeOne(val){
        // console.log('市',val)
    },
    //时间转换
    formatDate(now) {
        var year = now.getFullYear();
        console.log(year)
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    },
    formatDate1(now) {
        var year = now.getFullYear();
        console.log(year)
        var month = now.getMonth() + 1;
        var date = now.getDate();
        
        return year + "-" + month + "-" + date 
    },
    //定时执行时间
    radioChange(val){
      console.log(val)
      if(val){
        this.ruleForm.time1 = []
      }else{
       this.ruleForm.time1 =[ this.formatDate(new Date()),'2099-01-01 00:00:00']
      }
    },
    //添加和编辑规则
    addRule(status,active){
      this.$http.post(''+ process.env.API_ROOT + (this.ruleForm.marketingPlanId ? '/customer/care/config/edit' : '/customer/care/config/add'),
          {
            "marketingPlanName": this.ruleForm.actName,
            "startTime":this.ruleForm.radio2 ==1 ? this.ruleForm.time1[0] : this.formatDate(new Date()) ,
            "endTime": this.ruleForm.radio2 ==1 ? this.ruleForm.time1[1] : '2099-01-01 00:00:00',
            "dayStartTime":this.ruleForm.time2[0],
            'dayEndTime':this.ruleForm.time2[1],
            'minPrice':this.ruleForm.radio3==0 ?'' : this.ruleForm.select=='大于' ? this.ruleForm.money1 :this.ruleForm.select=='介于' ? this.ruleForm.money1 :'',
            'maxPrice':this.ruleForm.radio3==0?'' : this.ruleForm.select=='小于' ? this.ruleForm.money1 :this.ruleForm.select=='介于' ? this.ruleForm.money2 :'',
            'orderSource':this.ruleForm.radio4==0 ? '' : this.ruleForm.radio4==1 ? 'WAP': this.ruleForm.radio4==2 ? 'PC': this.ruleForm.radio4==3 ? 'JHS' : '',
            'deliveryCities':this.ruleForm.radio1 ==0 ? '' : this.checkOne.join(','),
            'noticeRegisterId':this.ruleForm.sign,
            'active':active,
            'status':status,
            'shopInfoId':this.shopId,
            'specifySkuCodes':this.ruleForm.specifySkuCodes,
            'excludeSkuCodes':this.ruleForm.excludeSkuCodes,
            'specifyFileName':this.ruleForm.specifyFileName,
            'excludeFileName':this.ruleForm.excludeFileName,
            'filterBlackList':'',
            'deliveryCitiesJson':JSON.stringify(this.ruleForm.pros),
            'smsContent':this.ruleForm.textarea,
            'smsInnerHTML':this.ruleForm.innerHTML,
            'marketingPlanId':this.ruleForm.marketingPlanId ? this.ruleForm.marketingPlanId:''
          }
        ).then(res => {
            // console.log("新增退货提醒", res);
                this.$message({
                  type:res.data.msg =='操作成功'?'success':'error',
                  message:res.data.msg
              })
              if(res.data.msg =='操作成功'){
                this.getList(this.currentPage,this.pageSize,this.shopId);
                this.back(this.ruleForm.marketingPlanId ? 1 :0)
              }
            
           
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
      
    },
    //获取标签列表
    getTagList(type){
      this.$http({
            method:'get',
            url:''+process.env.API_ROOT+'/customer/care/config/queryLabel?type='+type
          }).then(res => {
              // console.log("动态标签list", res);
              if(res.data.code ==1){
                this.group = res.data.data.split(',')
              }
          })
          .catch(error => {
            console.log(error);
            alert("系统异常");
          });
      
    },
    change3(val){
      console.log(val)
      if(val){
        this.ruleForm.checkList=['任意']
      }
    },
    upload(val){
      console.log(val)
    },
    insertAtCursor(myField, myValue) {
        //  console.log(myField)
      //IE 浏览器
      if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
      // FireFox、Chrome等
      }else {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        this.ruleForm.textarea =this.ruleForm.textarea.substring(0, startPos) + myValue + this.ruleForm.textarea.substring(endPos, this.ruleForm.textarea.length);
        // myField.focus();
        setTimeout(() => {
          myField.selectionStart = startPos + myValue.length;
          myField.selectionEnd = startPos + myValue.length;
        },0)
      }
    },
    //多选框change事件
    checkChange(onoff,e){
      var text = document.getElementById('text')
      console.log(onoff);
      if (onoff) {
        var text = document.getElementById('text')
        text.focus()
        this.insertAtCursor(text,'<'+e.target.defaultValue +'>');
      } else {
        console.log(e.target.defaultValue)
        this.ruleForm.textarea = this.ruleForm.textarea.replace('<'+e.target.defaultValue+'>','')
      }
    },
    itemChange(val){
      this.checkboxGroup = val
      console.log(this.checkboxGroup)
    },
    changeFile1(file,fileList){
      console.log(file)
      this.fileList1 = fileList
      this.file1 =file
      this.ruleForm.specifyFileName = file.name
      // console.log(this.file)
    },
    changeFile2(file,fileList){
      // console.log(file)
      this.fileList2 = fileList
      this.file2 =file
      this.ruleForm.excludeFileName = file.name
      // console.log(this.file)
    },
    outExe(type) {
          if(type==1){
            // this.excelData = this.dataList //你要导出的数据list。
            var arr = []
             this.ruleForm.specifySkuCodes.split(',').forEach(item=>{
               if(typeof item !=='array'){
                 arr.push([item])
               }else{
                 arr.push(item)
               }
             })
            this.excelData =arr
            console.log(this.excelData)
          }else{
            var arr = []
             this.ruleForm.excludeSkuCodes.split(',').forEach(item=>{
               if(typeof item !=='array'){
                 arr.push([item])
               }else{
                 arr.push(item)
               }
             })
            this.excelData =arr
          }
          this.export2Excel(type)
    },
    export2Excel(type) {
        var that = this;
        console.log(this)
        require.ensure([], () => {
            const { export_json_to_excel } = require('../../vendor/Export2Excel'); //这里必须使用绝对路径
            const tHeader = ['sku_code']; // 导出的表头名
            const filterVal = ['sku_code']; // 导出的表头字段名
            const list = this.excelData;
          console.log(this.ruleForm.specifyFileName.split('.')[0])
            var specifyFileName = this.ruleForm.specifyFileName.split('.')[0];
            var excludeFileName = this.ruleForm.excludeFileName.split('.')[0];
            export_json_to_excel(tHeader, list, type==1 ? specifyFileName : excludeFileName)// 导出的表格名称，根据需要自己命名
        })
    },
    //模板
    uploadOk(response, file, fileList){
      console.log(response)
      if(response.code==1){
        this.$message({
          type :'success',
          message:response.msg
        })
      }else{
        this.$message({
          type :'error',
          message:response.msg
        })
        this.fileList = [];
      }
    },

    handleOver(file, fileList){
      console.log(file, fileList);
     this.$message({
        type:'error',
        message :'只能选择一个模板'
      })
    },
    //移除文件
    handleRemove1(file, fileList) {
      // console.log(file, fileList);
      this.ruleForm.specifyFileName=''
      
      this.ruleForm.specifySkuCodes=''
    },
    handleRemove2(file, fileList) {
      // console.log(file, fileList);
      this.ruleForm.excludeSkuCodes=''
      
      this.ruleForm.excludeFileName=''
    },
    handlePreview(file) {
      // console.log(file);
    },
    //发送测试短信
    //发送测试短信
    send(shopInfoId,mobiles,content,noticeRegisterId,contentType){
      if(contentType){
        if(noticeRegisterId){
          if(content){
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
              this.contentType = false
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
          }else{
          this.$message({
            type:'error',
            message:'请填写短信内容'
          })
        }
        }else{
          this.$message({
            type:'error',
            message:'请选择短信签名'
          })
        }
      }else{
        this.$message({
          type:'error',
          message:'手机号码格式不正确'
        })
      }

    },
    //编辑按钮
    edit(index,rows){
      this.none = false;
      this.checkAll = [];
      this.checkOne = [];
      //获取城市列表
      this.getCity()
      //获取详情
      this.getMore(rows[index].marketing_plan_id)
      //获取动态标签列表
      this.getTagList(10)
    },
    //查看按钮
    check(index,rows){
      this.look = true;
      this.none = false;
      this.getMore(rows[index].marketing_plan_id)
    },
    rowClick(row,event,column){
      console.log(row)
      this.id = row.marketing_plan_id
      console.log(this.ruleForm.innerHTML)
    },
    // 清空表单
    clear(){
      //活动名称
        this.ruleForm.actName='',
        //短信签名
        this.ruleForm.sign='',
        this.ruleForm.radio1=0,
        this.ruleForm.radio2=0,
        this.ruleForm.radio3=0,
        this.ruleForm.radio4=0,
        //短信内容
        this.ruleForm.textarea='',
        //执行时间
        this.ruleForm.time1=[],
        //发送时间
        this.ruleForm.time2=['08:40','21:00'],
        this.ruleForm.marketingPlanId='',
        this.ruleForm.maxPrice='',
        this.ruleForm.minPrice='',
        this.ruleForm.select='大于',
        this.ruleForm.money1='',
        this.ruleForm.money2='',
        // this.ruleForm.textarea='',
        // this.ruleForm.innerHTML='',
        // this.ruleForm.specifySkuCodes='',
        // this.ruleForm.excludeSkuCodes='',
        this.ruleForm.specifyFileName='',
        this.ruleForm.excludeFileName=''
    },
    // 启用和禁用按钮按钮
    startAndStop(marketingPlanId,active){
      if(!active){
          this.$confirm('确定要将该活动更为禁用吗？','禁用' , {
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
                  this.$message({
                    type: 'success',
                    message: '禁用成功'
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
          this.$confirm('确定要将该活动更为启用吗？','启用' , {
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
      }
      
    },
    secSign(){
      this.signList.forEach(item => {
        if(item.channelDesc == this.ruleForm.sign ){
          this.sign = item.noticeRegisterId
        }
      });
      console.log(this.signList)
      console.log(this.sign)
    },
    changeTime1(val){
      console.log(val)
      console.log(this.ruleForm.time2)
    },
    changeTime2(val){
      console.log(val)
      console.log(this.ruleForm.time1)
    },
    //roi时间选择事件
    selRuleFormTime(){
      console.log(this.ruleForm.roiTime)
    },
    //报告获取
    getReport(marketingPlanId,startTime,endTime){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/customer/care/config/queryConfigReport' + '?marketingPlanId=' + marketingPlanId+'&startTime='+startTime+'&endTime='+endTime,
      }).then(res => {
          console.log("报告", res);
          if(res.data.code==1){
                                   this.reoprtTableData=[]
            this.reoprtTableData.push(res.data.data)
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
        url:''+process.env.API_ROOT+'/customer/care/config/queryConfigReport' + '?marketingPlanId=' + this.report.id +'&startTime=' +this.report.roiTime[0]+'&endTime=' +this.report.roiTime[1],
      }).then(res => {
          console.log("报告", res);
          if(res.data.code ==1 ){
                                   this.reoprtTableData=[]
            this.reoprtTableData.push(res.data.data)
     
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
    //查询短信营销详情  事件
    getMore(marketingPlanId){
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/customer/care/config/detail' + '?marketingPlanId=' + marketingPlanId,
      }).then(res => {
          // console.log("详情", res);
          if(res.data.code ==1){
            // 转json
            //如果有值   切成 数组
            if(res.data.data.delivery_cities){
              
              this.ruleForm.radio1 = 1
              this.checkOne = res.data.data.delivery_cities.split(',');
              this.ruleForm.pros = JSON.parse(res.data.data.delivery_cities_json)
              console.log('获取的城市列表',this.ruleForm.pros)
              // console.log(this.checkOne)  
              this.getCityStr()      

            }else{
              this.ruleForm.radio1 = 0
              this.checkOne=[];
            }

            this.ruleForm.marketingPlanId = res.data.data.marketing_plan_id
            


            if(res.data.data.specify_sku_codes && res.data.data.exclude_sku_codes){
              this.ruleForm.checkList=['1','2']
              this.sc1 = false
              this.sc2 = false
              this.fileList1=[{name:res.data.data.specify_file_name}]
              this.fileList2=[{name:res.data.data.exclude_file_name}]
            }
            if(res.data.data.specify_sku_codes  && !res.data.data.exclude_sku_codes){
              this.ruleForm.checkList=['1']
              this.sc1 = false
              this.fileList1=[{name:res.data.data.specify_file_name}]
            }
            if(!res.data.data.specify_sku_codes  && res.data.data.exclude_sku_codes){
              this.ruleForm.checkList=['2']
              this.sc2 = false
              this.fileList2=[{name:res.data.data.exclude_file_name}]
            }
            if(!res.data.data.specify_sku_codes  && !res.data.data.exclude_sku_codes){
              this.ruleForm.checkList=['任意']
              this.sc1 = true
              this.sc2 = true
              this.fileList1=[]
              this.fileList1=[]

            }
            this.ruleForm.specifyFileName =   res.data.data.specify_file_name
            this.ruleForm.excludeFileName =  res.data.data.exclude_file_name 
            this.ruleForm.specifySkuCodes =   res.data.data.specify_sku_codes
            this.ruleForm.excludeSkuCodes =  res.data.data.exclude_sku_codes
            //包含商品
            // this.fileList1 = [res.data.data.specify_file_name] 
            // //排除商品
            // this.fileList2 = [res.data.data.exclude_file_name] 
            //活动
            this.ruleForm.actName = res.data.data.marketing_plan_name

            //短信
            this.ruleForm.textarea = res.data.data.sms_content
            //签名
            this.ruleForm.sign = res.data.data.notice_register_id
            this.ruleForm.signName = res.data.data.signature
            console.log(this.ruleForm.sign)
            //是否定时
            this.ruleForm.radio2 = res.data.data.end_time_str == '2099-01-01 00:00:00'? 0 : 1
            //定时的时间
            
            this.ruleForm.time1[0]=(res.data.data.start_time_str)
            this.ruleForm.time1[1]=(res.data.data.end_time_str)
            this.ruleForm.time2 = [];
            this.ruleForm.time2.push(res.data.data.day_start_time)
            this.ruleForm.time2.push(res.data.data.day_end_time)
            // console.log(this.ruleForm.time2)

            //退款金额
            this.ruleForm.maxPrice = res.data.data.max_price
            this.ruleForm.minPrice = res.data.data.min_price
            if(!res.data.data.min_price && !res.data.data.max_price){
              this.ruleForm.radio3 = 0;
            }
            if(res.data.data.min_price || res.data.data.max_price){
              this.ruleForm.radio3 = 1;
              if(res.data.data.min_price && !res.data.data.max_price){
                this.ruleForm.select = '大于'
                this.ruleForm.money1 = res.data.data.min_price
              }
              if(!res.data.data.min_price && res.data.data.max_price){
                this.ruleForm.select = '小于'
                this.ruleForm.money1 = res.data.data.max_price
              }
              if(res.data.data.min_price && res.data.data.max_price){
                this.ruleForm.select = '介于'
                this.ruleForm.money1 = res.data.data.min_price
                this.ruleForm.money2 = res.data.data.max_price
              }
            }
            //退款来源
            switch(res.data.data.order_source){
              case '' : this.ruleForm.radio4 = 0;break;
              case 'WAP' : this.ruleForm.radio4 = 1;break;
              case 'PC' : this.ruleForm.radio4 = 2;break;
              case 'JHS' : this.ruleForm.radio4 = 3;
            }

            }
      }
      )
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
    qx(){
              this.contentType = false
      this.csdialogVisible = false;
      this.content = ''
    },
    // 点击弹出测试短信框
    cs(){
      this.csdialogVisible=true
    },
    // 点击返回按钮
    back(type){
      if(type ==0){
        
        this.ruleForm.checkList = ['任意']
      }
      this.checkboxGroup=[],
      this.fileList1 =[];
      this.fileList2=[];
      this.clear()
      //列表显示
      this.none = true
      //报告关闭
      this.rep = false
      //查看关闭
      this.look = false
      //清空报告
      this.reoprtTableData = [];
      this.report.roiTime=[];
      this.sign = ''
    },
    //点击新增营销活动
    add(){
      this.none = false;
      this.getTagList(10)
      //动态标签  全部撤销选中
      this.checkboxGroup=[],
      this.checkAll = [];
      this.checkOne= []
      //包含商品 为空
      this.fileList1 =[];
      //排除商品为空
      this.fileList2=[];
      //
      this.ruleForm.checkList = ['任意']
      //长度为0
      this.num = 0
      //获取城市列表
      this.getCity()
    },
    getCityStr(){
      this.cityStr=''
      this.ruleForm.pros.forEach(pro=>{
        if(pro.sign){
          if(pro.isIndeterminate){
            this.cityStr+=(pro.name+'部分城市(')
            pro.children.forEach(city=>{
              if(city.ischecked){
                this.cityStr+=(city.name+'、')
              }
            })
              this.cityStr +=')、'

          }else{
            this.cityStr +=(pro.name+'、')
          }
        }else{

        }
      })
    },
    sure(){
      this.cityToggle = false;
      console.log('sure',this.ruleForm.pros)
      this.getCityStr()
    },
    // 创建主题和测试短信关闭
    close(){
      this.csdialogVisible =false;
      this.smsdialogVisible =false;
      this.cityToggle =false;
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
      this.ruleForm.select = command.name
      console.log( this.ruleForm.select)
      if(this.ruleForm.select == '介于'){
        this.money2 = true;
        
      }else{
        this.money2 = false;
      }
      this.ruleForm.money1 = ''
      this.ruleForm.money2 = ''
    },
    //搜索的输入框输入事件
    c(){
      if(this.select=='活动名称'){
        this.actName = this.value3;
      }
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
          // this.getReport(command.id,command.startTime,command.endTime)
          this.none = false;
          this.rep = true;
          this.report.actName = command.actName;
          this.report.id = command.id
          // this.report.roiTime[1]= this.formatDate1(new Date())
          // this.report.roiTime[0]= this.formatDate1(new Date((new Date().getTime() - 3600 * 1000 * 24 * 7)))
          this.changeSelectTime(7)
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
.city{
  .cityBox{
          border: 1px solid #ccc;

    div{
      display:flex;
      flex-direction:column;
      float: left;
      width:50%;
      box-sizing: border-box;
      .inline-input{
        margin:10px;
      width: 90%;
      margin-left: 5%;
      height: 40px;
    }
      .checkGroup{
          height: 300px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          width: 100%;
          box-sizing: border-box;
          border-top:1px solid #ccc;
          li:hover{
            background: #ccc
          }
          .el-checkbox{
            margin-left: 0px;
              padding: 5px 10px;
              .el-checkbox__label{
                  width: 88%;
                  display: inline-block;
                  i{
                      float: right;
                      margin-right: 10px
                  }
              }
              
          }
          
      }
    }
  }
}
.returnGoods{
  .left{
    background: red;
    width: 50%;
    display: flex;
    flex-direction:column
  }
  .right{
    height: 100%;
    float: right;
    background: blue;
    width: 50%;
    display: flex;
    flex-direction:column
  }
  .shop{
      position: absolute;
      top:0px;
      left: 10px;
    }
    .td{
       position: absolute;
      bottom:80px;
      right: 10px;
    }
  #text{
    position: relative;
    text-indent: 130px;
    line-height: 28px;
    font-family: zt2;
    color: #333
  }
  #msg{
    background:#ccc;
    width:180px;
    font-size: 10px;
    color: #666666;
    line-height:20px;
    min-height: 20px;
    position:absolute;
    top:20px;
    left:10px;
    border-radius:  5px  5px  5px 0;
    padding:5px 5px 5px 5px;
    word-break:break-all;
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
  .el-tag{
    text-indent: 0;
  }
  .el-textarea__inner{
    width: 450px;
    height: 400px;
    background: transparent;
    // text-indent:190px;  
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
    .condition{
      box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
      margin: 10px 20px ;
      background: #fff;
      padding: 0 30px 2px;
      .el-checkbox{
        position: relative;
        .el-checkbox__input{
          position: absolute;
          top: 12px;
          left: -10px;
        }
      }
      .el-select{
        width: 50%;
      }
      .el-input{
        width:15%;
        display: inline-block
      }
      .el-form-item__content{
        .el-radio-group{
          display: flex;
          .el-radio{
            display: flex;
            align-items: center;
            .drop{
              .el-dropdown{
                padding: 10px ;
                border: 1px solid #ccc;
              }
              .sel{
                width: 60%
              }
            }
          }
          
        }
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
      .head{
        height: 60px;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        padding: 0 30px;
        color: #333333;
        letter-spacing: 0.5px;
        line-height: 60px;
      }
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
      .condition{
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
          // height: 30px;
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
