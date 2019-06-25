<template>
  <div class="member">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>客户洞察</el-breadcrumb-item>
        <el-breadcrumb-item>会员数据</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>会员数据</h1>
    </div>
    <el-tabs type=""  v-model="active">
      <el-tab-pane label="会员列表">
          <div class="box">
            <div class="boxContent">
              <div class="btnBox clear">
                <div class="left">
                  <el-button
                    type
                    size="small"
                    @click="time(1)"
                    :class="autoFocus1 ? 'is-active' :'no'"
                    plain
                  >近1天</el-button>
                  <el-button
                    type
                    size="small"
                    @click="time(2)"
                    :class="autoFocus2 ? 'is-active' :'no'"
                    plain
                  >近7天</el-button>
                  <el-button
                    type
                    size="small"
                    @click="time(3)"
                    :class="autoFocus3 ? 'is-active' :'no'"
                    plain
                  >近30天</el-button>
                  <el-button type="text" size class="btn" @click="exportSelect">
                    <i class="el-icon-upload2"></i> 导出
                  </el-button>
                  <el-button type="text" size class="btn" @click="exportAll">
                    <i class="el-icon-upload2"></i> 全部导出
                  </el-button>
                </div>
                <div class="right">
                  <el-button type="text" class="btn" size @click="a">
                    <i class="iconfont iconshaixuan"></i> 筛选
                    <i class="el-icon-arrow-down" v-if="!expload"></i>
                    <i class="el-icon-arrow-up" v-if="expload"></i>
                  </el-button>
                </div>
              </div>
              <el-form
                v-if="expload"
                label-position="top"
                label-width="auto"
                :model="form"
                ref="form"
                class="form"
                :inline="true"
                :rules="rules"
                 >
                <el-form-item
                  label="会员信息"
                  :prop='form.memberType==1? "memberMobile" : form.memberType==2 ? "memberVipCode" :form.memberType==3 ? "memberName" :form.memberType==4 ? "taobaoId" : form.memberType==5 ?"memberEmail" : ""'
                        >
                  <div class="memberMsg">
                    <el-select v-model="form.memberType">
                      <el-option
                        v-for="item in memberMsg"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <el-input v-if="form.memberType==1" v-model="form.memberMobile"></el-input>
                    <el-input v-if="form.memberType==2" v-model="form.memberVipCode"></el-input>
                    <el-input v-if="form.memberType==3" v-model="form.memberName"></el-input>
                    <el-input v-if="form.memberType==4" v-model="form.taobaoId"></el-input>
                    <el-input v-if="form.memberType==5" v-model="form.memberEmail"></el-input>
                  </div>
                </el-form-item>

                <el-form-item label="入会渠道" prop="orderType">
                  <el-select v-model="form.orderType" filterable placeholder="请选择">
                    <el-option
                      v-for="item in types"
                      :key="item.marketingPlaceCode"
                      :label="item.marketingPlaceName"
                      :value="item.marketingPlaceCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="入会店铺" filterable prop="shopInfoIds">
                  <el-select v-model="form.shopInfoIds" placeholder="请选择" @change="shopIdsChange">
                    <el-option
                      v-for="item in sources"
                      :key="item.shop_info_id"
                      :label="item.shop_name"
                      :value="item.shop_info_id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="等级" filterable prop='levelId'>
                  <el-select v-model="form.levelId" placeholder="请选择">
                    <el-option
                      v-for="item in levelList"
                      :key="item.apiCustomerLevelConfId"
                      :label="item.customerLevelName"
                      :value="item.apiCustomerLevelConfId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="入会时间" prop="orderCreateTime">
                  <el-date-picker
                    v-model="form.orderCreateTime"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd"
                    prefix-icon="icon"
                    start-placeholder="不限"
                    end-placeholder="不限"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="生日" prop="paymentTime">
                  <el-date-picker
                    v-model="form.paymentTime"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    prefix-icon="icon"
                    start-placeholder="不限"
                    end-placeholder="不限"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="积分" :prop='form.goodsType==1?"goodsName" :form.goodsType==3?"skuCode":"range"'>
                  <div class="memberMsg">
                    <el-select v-model="form.goodsType">
                      <el-option
                        v-for="item in goodsTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <div  class='pointBox1' style="display:'inline-block'" v-if="form.goodsType==2">
                      <el-input v-model="form.goodsName"></el-input> - <el-input v-model="form.skuCode"></el-input>
                    </div>
                    <div  class='pointBox' style="display:'inline-block'" v-if="form.goodsType==1">
                      <el-input v-model="form.skuCode"></el-input>
                    </div>
                    <div  class='pointBox' style="display:'inline-block'" v-if="form.goodsType==3">
                      <el-input v-model="form.goodsName"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <div class="btns">
                  <div>
                    <el-button size="small" @click="reset">重置</el-button>
                    <el-button type="primary" @click="submitForm('form')" size="small">搜索</el-button>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="tab">
              <el-table
                :data="tableData"
                ref="tab"
                style="width: 100%"
                height="700"
                @select="select"
                @select-all="selectAll"
                @select-change="selectChange"
                @row-click="rowclick"
                :row-key='b'
                >
                <el-table-column label prop width="30" show-overflow-tooltip></el-table-column>
                <el-table-column type="selection" prop label width="30" :reserve-selection='true'></el-table-column>
                <el-table-column label="会员ID" v-if="false" prop="memberId" show-overflow-tooltip></el-table-column>

                <el-table-column label="会员名称" prop="memberRealName" show-overflow-tooltip></el-table-column>
                <el-table-column label="手机号码" prop="memberMobile" show-overflow-tooltip></el-table-column>
                <el-table-column label="入会时间"  prop="memberCreateTime" show-overflow-tooltip></el-table-column>
                <el-table-column label="入会渠道" prop="memberSource" show-overflow-tooltip></el-table-column>
                <el-table-column label="入会店铺" prop="shopName" show-overflow-tooltip></el-table-column>
                <el-table-column label="等级" prop="customerLevelName" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column label="消费金额" prop="point" show-overflow-tooltip></el-table-column> -->
                <el-table-column label="积分" prop="point" show-overflow-tooltip></el-table-column>
                <el-table-column label="优惠券" prop="" show-overflow-tooltip>
                  <template slot-scope="scope">
                   {{tableData[scope.$index].couponTotal}}张
                  </template>
                </el-table-column>

                <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="look(tableData[scope.$index].memberId)"
                      type="text"
                    >查看</el-button>
                    <el-button
                      @click.native.prevent="edit(tableData[scope.$index].memberId)"
                      type="text"
                    >修改</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  <div>
                    <img src="../../assets/img/none.png" alt width="140" height="140">
                  </div>
                  <p :style="{'marginTop': '23px'}">无会员列表信息</p>
                </div>
              </el-table>
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[50, 100,200]"
                  :page-size="pageSize"
                  layout="sizes,total, jumper, prev, pager, next"
                  :total="total"
                ></el-pagination>
              </div>
            </div>
          </div>
          <div class="bottom">按住 [shift] 键，可横向滚动表格哦</div>

      </el-tab-pane>
      <el-tab-pane label="会员监控">
        <div class="timerange">
          统计时间：
          <el-date-picker
              :clearable =' false'
              :picker-options="pickerOptions0"
              v-model="timeRange"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              prefix-icon="icon"
              start-placeholder="不限"
              end-placeholder="不限"
              class='chartDate'
          ></el-date-picker>
        </div>
        <div class="clear chartBox">
          <div class="orderChart">
            <h3>各渠道入会人数占比</h3>
              <ve-pie :data="chartData1" :data-empty="dataEmpty1" height="400px" :extend='chartExtend1' ref='c1' :legend-position='position' :colors='colors' ></ve-pie>
          </div>
          <div class="levelChart">
            <h3>各渠道销售情况</h3>
              <ve-pie :data="chartData2" :data-empty="dataEmpty2" height="400px" :extend='chartExtend2' ref='c2' :legend-position='position' :colors='colors'></ve-pie>
          </div>
        </div>
        <div class="goodChart">
            <h3>会员地区排行</h3>
            <ve-bar :data="chartData3" :data-empty="dataEmpty3" height="300px" :grid='grid'  :extend='chartExtend3' :settings='chartSettings3' ref='c3' :legend-position='position' :colors='colors2' :legend-visible ='false'> </ve-bar>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 查看标签控件 -->
    <el-dialog
      title="会员详情"
      :visible.sync="tagDialogVisible"
      width="680px"
      :before-close="close"
      :close-on-click-modal="false"
        >
      <!-- 订单编号、会员姓名、淘宝ID、邮箱、以及商品详情”商品详情区包含【商品名称】【商品id】【商品购买件数】 -->
      <el-tabs type="card">
        <el-tab-pane label="会员信息">
          <div class="baseMsg clear">
            <h3>基本信息</h3>
            <div class="l">
              <div>
                <span>姓名</span> {{moreMsg.memberName   ? moreMsg.memberName : '未知'}}
              </div>
              <div>
                <span>淘宝ID</span> {{moreMsg.nickName   ? moreMsg.nickName : '未知'}}
              </div>
              <div>
                <span>会员等级</span> {{moreMsg.levelName}}
              </div>
                <el-tooltip class="item" effect="dark" :content="(moreMsg.province != null ? moreMsg.province : '未知')+'-' +(moreMsg.city  != null ? moreMsg.city : '未知')+'-' +(moreMsg.district  != null ? moreMsg.district : '未知')" placement="top-start">

              <div>

                <span>来自</span>  {{moreMsg.province != null ? moreMsg.province : '未知'}}-{{moreMsg.city  != null ? moreMsg.city : '未知'}}-{{moreMsg.district  != null ? moreMsg.district : '未知'}}
              </div>
              </el-tooltip>
            </div>
            <div class="r">
              <div>
                <span>手机号码</span>   {{moreMsg.memberMobile   ? moreMsg.memberMobile : '未知'}}
              </div>
              <div>
                <span>性别</span> {{moreMsg.memberGender === '0' ? '女' : moreMsg.memberGender === '1' ? '男' : '未知' }}
              </div>
              <el-tooltip class="item" effect="dark" :content="(moreMsg.memberEmail != null ? moreMsg.memberEmail  :'无')" placement="top-start">
              <div>

                <span>电子邮箱</span> {{moreMsg.memberEmail   ? moreMsg.memberEmail : '未知'}}

              </div>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" :content="(moreMsg.birthday != null ? moreMsg.birthday  :'无')" placement="top-start">
              <div>

                <span>生日</span> {{moreMsg.birthday   ? moreMsg.birthday : '未知'}}

              </div>
              </el-tooltip>
            </div>
          </div>
          <div class="dealMsg clear">
            <h3>交易信息</h3>
            <div class="l">
              <div>
                <span>客户类型</span> {{moreMsg.customerType ==1 ? '老客户' : '新客户'}}
              </div>
            </div>
            <div class="r">
              <div>
                <span>累计消费</span> {{moreMsg.totalPrice != null  ?moreMsg.totalPrice  : '0'}}元 (共{{moreMsg.totalCnt != null  ?moreMsg.totalCnt  : '0'}}笔订单)
              </div>
            </div>
          </div>
          <div class="property clear">
            <h3>自定义属性</h3>
            <!-- <p v-if="!(moreMsg.customerProperties.length)">无自定义属性</p> -->
            <ul v-for="(item,index) in uniqObjInArray(properties)" :key="index">
              <h4 style="">{{item.name}}</h4>
              <li  v-for="(item,index) in item.value" :key="index" style="display:inline-block;padding:0px 20px"> {{item}}</li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="积分流水">
          <el-table :data="pointFlow" style="width: 100%" height="400" class="boxTable">
            <el-table-column label="日期" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="积分变更" prop="" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="pointFlow[scope.$index].pointValue > 0"> {{'+' + pointFlow[scope.$index].pointValue}}</span>
                <span v-if="pointFlow[scope.$index].pointValue <= 0"> {{pointFlow[scope.$index].pointValue}}</span>
              </template>
            </el-table-column>
            <el-table-column label="积分状态" prop="" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="pointFlow[scope.$index].pointStatus == 0"> 冻结</span>
                <span v-if="pointFlow[scope.$index].pointStatus == 1"> 生效</span>
                <span v-if="pointFlow[scope.$index].pointStatus == 2"> 失效</span>
              </template>
            </el-table-column>
            <el-table-column label="积分类型" prop="" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="pointFlow[scope.$index].pointType == 1"> 交易入账</span>
                <span v-if="pointFlow[scope.$index].pointType == 2"> 登录送积分</span>
                <span v-if="pointFlow[scope.$index].pointType == 3"> 签到送积分</span>
                <span v-if="pointFlow[scope.$index].pointType == 4"> 活动送积分</span>
                <span v-if="pointFlow[scope.$index].pointType == 100"> 退货出账</span>
                <span v-if="pointFlow[scope.$index].pointType == 101"> 积分消费</span>
                <span v-if="pointFlow[scope.$index].pointType == 102"> 手动优惠新增</span>
                <span v-if="pointFlow[scope.$index].pointType == 1001"> 积分兑券</span>
              </template>
            </el-table-column>
            <div slot="empty">
              <div>
                <img src="../../assets/img/none.png" alt width="70" height="70">
              </div>
              <p :style="{'marginTop': '23px'}">无积分流水信息</p>
            </div>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="等级变更">
          <el-table :data="levelFlow" style="width: 100%" height="400" class="boxTable">
            <el-table-column label="日期" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="等级变更" prop="changeType" show-overflow-tooltip></el-table-column>
            <el-table-column label="当前等级" prop="currentLevelName" show-overflow-tooltip></el-table-column>
            <div slot="empty">
              <div>
                <img src="../../assets/img/none.png" alt width="70" height="70">
              </div>
              <p :style="{'marginTop': '23px'}">无等级变更信息</p>
            </div>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="优惠券详情">
          <el-table :data="couponMsg" style="width: 100%" height="400" class="boxTable">
            <el-table-column label="日期" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="优惠券类型" prop="couponName" show-overflow-tooltip></el-table-column>
            <el-table-column label="优惠券金额" prop="" show-overflow-tooltip>
              <template slot-scope="scope">
                <span > {{'￥'+couponMsg[scope.$index].couponPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column label="优惠券生效期" prop="validDate" show-overflow-tooltip></el-table-column>
            <el-table-column label="优惠券失效期" prop="invalidDate" show-overflow-tooltip></el-table-column>
            <div slot="empty">
              <div>
                <img src="../../assets/img/none.png" alt width="70" height="70">
              </div>
              <p :style="{'marginTop': '23px'}">无优惠券详情信息</p>
            </div>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="" plain @click="close">取消</el-button>
        <el-button type="primary" @click="close">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formTest from "../../assets/js/formTest";
import formatDate from "../../assets/js/formatDate";
import 'v-charts/lib/style.css'

export default {
  name: "member",
  data() {
    var self = this
    this.chartSettings3= {
        labelMap: {
          memberTotal: '会员人数',
        },
        dataOrder: {
          label: 'memberTotal',
          order: 'desc'
        }
      }
    this.chartExtend1 = {
      tooltip: {
        trigger: 'item',
        formatter:function(datas){
          console.log(datas)
          var res = datas.marker + ' ' +   datas.name  + ' : '+ datas.percent +'%' +  '<br/>' +'&nbsp;&nbsp;&nbsp;人数：'+  datas.value   +  '<br/>',index,shop,num;
              for(var i = 0, length = self.chartData1.rows[datas.dataIndex].shops.length; i < length; i++) {
                    index = i+1 ;
                    shop = (self.chartData1.rows[datas.dataIndex].shops[i].shopName) ;
                    num = (self.chartData1.rows[datas.dataIndex].shops[i].memberTotal) ;
                    res += index + '. ' + shop  + ' '+num +  '<br/>';
                }
                return res;
        }
      }
    }
    this.chartExtend2 = {
      tooltip: {
        trigger: 'item',
        formatter:function(datas){
          // console.log(datas)
          var res = datas.marker + ' ' +   datas.name  + ' : ' + datas.percent +'%'+'<br/>' +'&nbsp;&nbsp;&nbsp;' +'￥ '+  datas.value   +  '<br/>',index,shop,num,percent;
              for(var i = 0, length = self.chartData2.rows[datas.dataIndex].shops.length; i < length; i++) {
                    index = i+1 ;
                    shop = (self.chartData2.rows[datas.dataIndex].shops[i].shopName) ;
                    num = (self.chartData2.rows[datas.dataIndex].shops[i].salesTotal) ;
                    percent = (self.chartData2.rows[datas.dataIndex].shops[i].salesTotal/(datas.value ? datas.value : 1) *100).toFixed(2) +'%'
                    res += index + '. ' + shop   + ' : ' +percent +  '<br/>' +'&nbsp;&nbsp;&nbsp;'+ '￥ '+num+  '<br/>';
                }
                return res;
        }
      }
    }
    this.grid = {
        // show: true,
        width: '90%',
    }
    this.chartExtend3 = {
      series: {
        type:'bar',
        label: { show: true, position: "right" },
        barWidth:'20px',
      },
      xAxis:{
        show:false,
        splitLine:{
          show:false
        },
        axisLine:{
          show:false
        }
      }
    }
    return {

      colors:['#3366FF','#F13869','#36A7EA','#66C947','#8D44F0','#F68106'],
      colors2:['#3366FF'],
      position:'bottom',
      active:'0',
      chartData2: {
          columns: [],
          rows: []
      },
      chartData1: {
          columns: [],
          rows: []
      },
      chartData3:{
          columns: [],
          rows: []
      },
      chartData: {
          columns: [],
          rows: []
      },
      timeRange:[formatDate.formatDateTom('yyyy-MM-dd'),formatDate.formatDateTom('yyyy-MM-dd')],
      properties:[],
      autoFocus1: true,
      autoFocus2: false,
      autoFocus3: false,
      rules: {
        memberMobile: [
          { required: false, trigger: "change", validator: formTest.phone1Test }
        ],
        memberVipCode: [
          {
            required: false,
            trigger: "change",
            validator: formTest.memberVipCode
          }
        ],
        memberName: [
          { required: false, trigger: "change", validator: formTest.memberName }
        ],
        taobaoId: [
          { required: false, trigger: "change", validator: formTest.taobaoId }
        ],
        memberEmail: [
          { required: false, trigger: "change", validator: formTest.email1Test }
        ],

        shopInfoIds: [
          { required: false, message: "请选择入会店铺", trigger: "change" }
        ],
        orderType: [
          { required: false, message: "请选择入会渠道", trigger: "change" }
        ],
        paymentTime: [
          { required: false, message: "请选择付款时间", trigger: "change" }
        ],
        orderCreateTime: [
          { required: false, message: "请选择下单时间", trigger: "change" }
        ],
        goodsName: [
          { required: false, trigger: "change",validator: formTest.num1Test }
        ],
        skuCode: [
          { required: false,  trigger: "change", validator: formTest.num1Test}
        ],
        range: [
          { required: false, trigger: "change", validator: (rule, value, callback) => {
            var reg=/^(0|[1-9][0-9]*)$/
            if (this.form.goodsName && this.form.skuCode) {
              if(reg.test(this.form.goodsName) && reg.test(this.form.skuCode) ){
                if(this.form.goodsName*1<=this.form.skuCode*1){
                  callback()
                }else{
                  callback(new Error('请输入正确的积分区间'))
                }
              }else{
                  callback(new Error('请输入正确的积分数量'))
              }
            } else if(!this.form.goodsName && !this.form.skuCode) {
                callback()
            }else{
                callback(new Error('请输入正确的积分区间'))

            }
          }
          }
        ],
        levelId: [
          { required: false, message: "请选择等级", trigger: "change" }
        ]
      },
      pickerOptions0:{
        disabledDate(time) {
          return time.getTime() > Date.now() -8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      exportArr: [],
      expload: false,
      levelList: [],
      store: "",
      tagDialogVisible: false,
      tableData: [],
      currentPage: 1,
      pageSize: 50,
      total: 0,
      //商品选项
      goodsTypes: [
        {
          label: "小于",
          value: 1
        },
        {
          label: "介于",
          value: 2
        },
        {
          label: "大于",
          value: 3
        }
      ],
      //   订单状态选项
      status: [
        {
          label: "不限",
          value: 0
        },
        {
          label: "没有创建支付宝交易",
          value: "TRADE_NO_CREATE_PAY"
        },
        {
          label: "等待买家付款",
          value: "WAIT_BUYER_PAY"
        },
        {
          label: "等待卖家发货",
          value: "WAIT_SELLER_SEND_GOODS"
        },
        {
          label: "等待买家确认收货",
          value: "WAIT_BUYER_CONFIRM_GOODS"
        },
        {
          label: "买家已签收",
          value: "TRADE_BUYER_SIGNED"
        },
        {
          label: "交易成功",
          value: "TRADE_FINISHED"
        },
        {
          label: "付款以后用户退款成功",
          value: "TRADE_CLOSED"
        },
        {
          label: "付款以前，卖家或买家主动关闭交易",
          value: "TRADE_CLOSED_BY_TAOBAO"
        },
        {
          label: "国际信用卡支付付款确认中",
          value: "PAY_PENDING"
        }
      ],
      //订单类型选项
      types: [
      ],
      //订单来源选项   选择店铺
      sources: [],
      //会员信息选项
      memberMsg: [
        {
          label: "会员手机号",
          value: 1
        },
        {
          label: "会员ID",
          value: 2
        },
        {
          label: "会员姓名",
          value: 3
        },
        {
          label: "淘宝ID",
          value: 4
        },
        {
          label: "邮箱",
          value: 5
        }
      ],
      rowData: {},
      //积分流水
      pointFlow:[],
      // 等级流水
      levelFlow:[],
      // /优惠券详情
      couponMsg:[],
      //详情的数据
      moreMsg: {},
      dataEmpty1:true,
      dataEmpty2:true,
      dataEmpty3:true,
      //搜索条件表单
      form: {
        merchantId:'',
        goodsType: 1,
        memberType: 1,
        shopInfoIds: 0,
        memberMobile: "",
        memberVipCode: "",
        memberName: "",
        taobaoId: "",
        memberEmail: "",
        orderType: 0,
        orderCreateTime: [
          formatDate.formatDateLastDay("yyyy-MM-dd",1),
          formatDate.formatDate("yyyy-MM-dd")
        ],
        orderCreateTimeStart: "",
        orderCreateTimeEnd: "",
        paymentTime: [],
        paymentTimeStart: "",
        paymentTimeEnd: "",
        goodsName: "",
        skuCode: "",
        levelId: 0,
      }
    };
  },
  computed: {
    shopId() {
      return this.$store.state.shopId.shopId;
    }
  },
  created() {
    console.log(this.shopId);
    this.getStore(this.shopId);
    this.getSource()

  },
  watch: {
    timeRange:{
      handler: function(n, o) {
        this.getPerson()
        this.getSell()
        this.getMemberPro()

      } ,
      deep:true
    },
    active:{
        handler:function(n,o){
          if(n==1){
            this.getPerson()
            this.getSell()
            this.getMemberPro()
            this.$nextTick(() => {
                this.$refs['c1'].echarts.resize()
                this.$refs['c2'].echarts.resize()
                this.$refs['c3'].echarts.resize()
            })
          }
        }
    },
    shopId:{
      handler:function(n,o){
        this.getStore(n)

      }
    },
    "form.orderCreateTime": {
      handler: function(n, o) {
            console.log(n)

        if (n) {
          if (n.length != 0) {
            console.log(formatDate.formatDate('yyyy-MM-dd'))
                if (
                  n[1] == formatDate.formatDateNow('yyyy-MM-dd') &&
                    new Date(n[1]).getTime() - new Date(n[0]).getTime() ==
                    1 * 24 * 60 * 60 * 1000
                ) {
                    this.autoFocus1 = true;
                    this.autoFocus2 = false;
                    this.autoFocus3 = false;
                }else if (
                  n[1] == formatDate.formatDateNow('yyyy-MM-dd') &&
                    new Date(n[1]).getTime() - new Date(n[0]).getTime() ==
                    7 * 24 * 60 * 60 * 1000
                ) {
                    this.autoFocus1 = false;
                    this.autoFocus2 = true;
                    this.autoFocus3 = false;
                }else if(n[1] == formatDate.formatDateNow('yyyy-MM-dd') &&
                    new Date(n[1]).getTime() - new Date(n[0]).getTime() ==
                    30 * 24 * 60 * 60 * 1000){
                    this.autoFocus1 = false;
                    this.autoFocus2 = false;
                    this.autoFocus3 = true;
                }else{
                    this.autoFocus1 = false;
                    this.autoFocus2 = false;
                    this.autoFocus3 = false;
                }
            }else{
              this.autoFocus1 = false;
                    this.autoFocus2 = false;
                    this.autoFocus3 = false;
            }
        } else {
          console.log('数组为空')
          this.autoFocus1 = false;
          this.autoFocus2 = false;
          this.autoFocus3 = false;
        }
      }
    },
    "form.goodsType": {
      handler: function(n, o) {
          this.form.goodsName = ''
          this.form.skuCode = ''
      }
    },
    "form.memberType": {
      handler: function(n, o) {
          this.form.memberMobile = ''
          this.form.memberVipCode = ''
          this.form.memberName = ''
          this.form.taobaoId = ''
          this.form.memberEmail = ''
      }
    },
  },
  methods: {
    getPersonShop(code,index){
        var data ={
            startTime:this.timeRange[0],
            endTime:this.timeRange[1],
            merchantId:this.form.merchantId,
            marketingCode:code
        }
        this.$http
        .get("" + process.env.API_ROOT + "/member/monitor/shop/summary?" + this.toQueryString(data) )
        .then(res => {
            console.log('入会人数渠道列表',res)
          if (res.data.code == 1) {
            this.chartData1.rows[index].shops = res.data.data

          } else {
            this.chartData1.rows[index].shops=[]
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    getPerson(){
        var data ={
            startTime:this.timeRange[0],
            endTime:this.timeRange[1],
            merchantId:this.form.merchantId
        }
        this.$http
        .get("" + process.env.API_ROOT + "/member/monitor/marketing/summary?" + this.toQueryString(data) )
        .then(res => {
            console.log('入会人数',res)
          if (res.data.code == 1) {
            this.chartData1.columns = ['marketingName','memberTotal','marketingCode','shops']
            this.chartData1.rows = res.data.data

            if(this.chartData1.rows.length == 0){
              this.dataEmpty1 = true
            }else{
              this.dataEmpty1 = false
            }
          } else {
            this.chartData1 = {
              columns :[],
              rows:[]
            }

          }
          console.log(this.chartData1.rows)
          if(this.chartData1.rows.length!=0){
            this.chartData1.rows.forEach((item,index)=>{
              if(item.marketingCode){
                this.getPersonShop(item.marketingCode,index)
              }else{
                this.chartData1.rows[index].shops=[]
              }
            })
          }else{
            console.log(111111)
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    getSell(){
        var data ={
            startTime:this.timeRange[0],
            endTime:this.timeRange[1],
            merchantId:this.form.merchantId
        }
        this.$http
        .get("" + process.env.API_ROOT + "/member/monitor/sales/marketing/summary?" + this.toQueryString(data) )
        .then(res => {
            console.log('销售总额',res)
          if (res.data.code == 1) {
            this.chartData2.columns = ['marketingName','salesTotal','marketingCode','shops']
            this.chartData2.rows = res.data.data
            // this.chartData2.rows = [
            //   {
            //     marketingCode: "Esprit_CRM",
            //     marketingName: "Esprit_CRM",
            //     salesTotal: 600,
            //     shops:[
            //       {
            //         shopName:'店铺1',
            //         salesTotal:'100'
            //       },
            //       {
            //         shopName:'店铺2',
            //         salesTotal:'200'
            //       },
            //       {
            //         shopName:'店铺3',
            //         salesTotal:'300'
            //       }
            //     ]
            //   },
            //   {
            //     salesTotal: 600,
            //     shops:[
            //       {
            //         shopName:'店铺1',
            //         salesTotal:'100'
            //       },
            //       {
            //         shopName:'店铺2',
            //         salesTotal:'200'
            //       },
            //       {
            //         shopName:'店铺3',
            //         salesTotal:'300'
            //       }
            //     ]
            //   }
            // ]

            if(this.chartData2.rows.length == 0){
              this.dataEmpty2 = true
            }else{
              this.dataEmpty2 = false
            }
          } else {
            this.chartData2 = {
              columns :[],
              rows:[]
            }

          }
          console.log(this.chartData2.rows)
          if(this.chartData2.rows.length!=0){
            this.chartData2.rows.forEach((item,index)=>{
              if(item.marketingCode){
                this.getSellShop(item.marketingCode,index)
              }else{
                this.chartData2.rows[index].shops=[]
              }
            })
          }else{
            console.log(111111)
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    getSellShop(code,index){
        var data ={
            startTime:this.timeRange[0],
            endTime:this.timeRange[1],
            merchantId:this.form.merchantId,
            marketingCode:code
        }
        this.$http
        .get("" + process.env.API_ROOT + "/member/monitor/sales/shop/summary?" + this.toQueryString(data) )
        .then(res => {
            console.log('销售总额渠道列表',res)
          if (res.data.code == 1) {
            console.log(index)
            this.chartData2.rows[index].shops = res.data.data
            // this.chartData2.rows[1].shops = {
            //   salesTotal: 0,
            //   shopInfoId: 1904087290,
            //   shopName: "linefriends",
            // }
            console.log(this.chartData2.rows[index].shops)

          } else {
            this.chartData2.rows[index].shops=[]
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    getMemberPro(){
        var data ={
            startTime:this.timeRange[0],
            endTime:this.timeRange[1],
            merchantId:this.form.merchantId
        }
        this.$http
        .get("" + process.env.API_ROOT + "/member/monitor/province/summary?" + this.toQueryString(data) )
        .then(res => {
            console.log('各省份入会人数',res)
          if (res.data.code == 1) {
            this.chartData3.columns = ['province','memberTotal']
            this.chartData3.rows = res.data.data
            // this.chartData3.rows = [

            //   {
            //     province: "深圳",
            //     memberTotal: 40000,
            //   },
            //   {
            //     province: "北京",
            //     memberTotal: 50000,
            //   },
            //   {
            //     province: "杭州",
            //     memberTotal: 30000,
            //   },
            //   {
            //     province: "上海",
            //     memberTotal: 70421,
            //   },
            // ]

            if(this.chartData3.rows.length == 0){
              this.dataEmpty3 = true
            }else{
              this.dataEmpty3 = false
            }
          } else {
            this.chartData3 = {
              columns :[],
              rows:[]
            }

          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
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
    },
    b(row){
        return row.memberId
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
    //获取渠道
    getSource(){
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/place/list"
      })
      .then(res => {
        console.log("渠道list", res);
        if(res.data.code==1){
          this.types = res.data.data;

        }else{

        }
        this.types.unshift({
          marketingPlaceCode:0,
          marketingPlaceName:'不限'
        })
      })
      .catch(error => {
        console.log(error);
        alert("系统异常");
      });
    },
    time(num) {
      this.form.orderCreateTime=[]
      if (num == 1) {
        this.form.orderCreateTime.push(
          formatDate.formatDateLastDay("yyyy-MM-dd",1)
        );
        this.form.orderCreateTime.push(
          formatDate.formatDate("yyyy-MM-dd")
        );
      } else if (num == 2) {
        this.form.orderCreateTime.push(
          formatDate.formatDateLastDay("yyyy-MM-dd",7)
        );
        this.form.orderCreateTime.push(
          formatDate.formatDate("yyyy-MM-dd")
        );
      } else {
        this.form.orderCreateTime.push(
          formatDate.formatDateLastDay("yyyy-MM-dd",30)
        );
        this.form.orderCreateTime.push(
          formatDate.formatDate("yyyy-MM-dd")
        );
      }
      this.getStore(this.shopId)
      // this.getTableData();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.search();
          this.$refs[formName].clearValidate();
          // this.resetForm('addForm')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      if (this.$refs[formName]) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        } else {
          this.$nextTick(() => {
            this.$refs[formName].resetFields();
          });
        }
      }
    },
    //tab 行点击事件
    rowclick(row) {
      console.log(row);
      this.rowData = row;
    },
    //搜索条件开关
    a() {
      this.expload = !this.expload;
    },
    //改变订单来源事件
    shopIdsChange(val) {
      console.log(val);
    },
    //获取等级
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
            this.levelList = res.data.data;
            this.levelList.unshift({
              apiCustomerLevelConfId: 0,
              customerLevelName: "不限"
            });
          }else{
            this.levelList=[]
            this.levelList.unshift({
              apiCustomerLevelConfId: 0,
              customerLevelName: "不限"
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //获取商户
    getStore(shopid) {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/merchantInfo?shopId=" + shopid
      })
        .then(res => {
          console.log("商户列表", res);
          if (res.data.code == 1) {
            this.store = res.data.data;
            if (res.data.data.length != 0) {
              this.form.merchantId = this.store[0].apiMerchantId
              this.getShopList(this.store[0].apiMerchantId);
              this.getLevelList(this.store[0].apiMerchantId);
              this.getTableData(this.store[0].apiMerchantId);
              if(this.active==1){
                this.getPerson()
                this.getSell()
                this.getMemberPro()
              }

            } else {
              this.form.merchantId=''
              this.getShopList('');
              this.getLevelList("");
              this.getTableData("");

            }
          } else {
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    edit(id){
      var arr =[]
      this.sources.forEach(item=>{
        if(item.shop_info_id){
          arr.push(item.shop_info_id)
        }
      })
      this.$router.push(
        {
          name:'editMember',
          params:{
            merchantId:this.form.merchantId,
            shopId:arr.join(','),
            id:id
          }
        }
      )
    },
    //查看按钮
    look(id) {
      this.tagDialogVisible = true;
      this.getBase(id)
      this.getPoint(id,this.form.merchantId)
      this.getLevel(id)
      this.getCoupon(id,this.form.merchantId)

    },
    //查询基本信息
    getBase(id){
      var arr =[]
      this.sources.forEach(item=>{
        if(item.shop_info_id){
          arr.push(item.shop_info_id)
        }
      })
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/member/list/detail/info?memberId=" +
          id+'&shopInfoIds='+arr.join(',')
      })
        .then(res => {
          console.log("基本信息", res);
          this.properties = []
          if (res.data.code == 1) {
            this.moreMsg = res.data.data;
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
            console.log(this.properties)
            // console.log(this.uniqObjInArray(this.properties))
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //查询积分流水
    getPoint(id,apiMerchantId){
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/member/list/integral/flow?memberId=" +
          id +'&apiMerchantId=' +apiMerchantId
      })
        .then(res => {
          console.log("积分流水", res);
          if (res.data.code == 1) {
            this.pointFlow = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //查询等级流水
    getLevel(id){
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/member/list/grade/flow?memberId=" +
          id
      })
        .then(res => {
          console.log("等级流水", res);
          if (res.data.code == 1) {
            this.levelFlow = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    getCoupon(id,apiMerchantId){
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/member/list/coupon/info?memberId=" +
          id+'&apiMerchantId='+apiMerchantId
      })
        .then(res => {
          console.log("优惠券详情", res);
          if (res.data.code == 1) {
            this.couponMsg = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //查看详情开关
    close() {
      this.tagDialogVisible = false;
    },
    //选择改变事件
    selectChange(sel) {
      console.log(sel);
      this.exportArr = sel;
    },
    // 选择按钮
    select(sel, row) {
      console.log(sel);
      this.exportArr = sel;
    },
    //全选按钮
    selectAll(sel) {
      console.log(sel);
      this.exportArr = sel;
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getStore(this.shopId)
      // this.getTableData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getStore(this.shopId)
      // this.getTableData();
    },

    //导出选中
    exportSelect() {
      if (this.exportArr.length == 0) {
        this.$message({
          type: "error",
          message: "请选择至少一条数据"
        });
      } else {
        this.$http({
          method: "post",
          url: "" + process.env.API_ROOT + "/member/list/export",
          responseType: "arraybuffer",
          data: this.exportArr
        })
          .then(res => {
            console.log(res.data);
            const blob = new Blob([res.data], {
              type: "application/vnd.ms-excel"
            });
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = "none";
            a.download = "会员列表.xlsx";
            a.href = blobUrl;
            a.click();
            document.body.removeChild(a);
          })
          .catch(err => {
            console.log(err);

            alert("网络异常");
          });
      }
    },
    //导出全量
    exportAll() {
        var data = {};
        //商户ID
        if (this.form.merchantId) {
          data.merchantId = this.form.merchantId;
        }
        //入会店铺
        if (this.form.shopInfoIds) {
          data.shopInfoId = this.form.shopInfoIds;
        } else {
        }
        //入会渠道
        if (this.form.orderType) {
          data.memberSource = this.form.orderType;
        }

        //等级
        if (this.form.levelId !== 0) {
          data.levelId = this.form.levelId;
        } else {
        }
        // 会员手机号
        if (this.form.memberMobile) {
          data.memberMobile = this.form.memberMobile;
        }
        //会员ID
        if (this.form.memberVipCode) {
          data.memberVipCode = this.form.memberVipCode;
        }
        //会员名字
        if (this.form.memberName) {
          data.memberName = this.form.memberName;
        }
        //淘宝ID
        if (this.form.taobaoId) {
          data.taobaoId = this.form.taobaoId;
        }
        //邮箱
        if (this.form.memberEmail) {
          data.memberEmail = this.form.memberEmail;
        }
        //入会时间
        if (this.form.orderCreateTime) {
          data.memberCreateTimeStart = this.form.orderCreateTime[0];
          data.memberCreateTimeEnd = this.form.orderCreateTime[1];
        }
        //生日
        if (this.form.paymentTime) {
          data.birthdayStart = this.form.paymentTime[0];
          data.birthdayEnd = this.form.paymentTime[1];
        }
        //积分
        if (this.form.goodsName) {
          data.minPoint = this.form.goodsName;
        }
        if (this.form.skuCode) {
          data.maxPoint = this.form.skuCode;
        }
      this.$http({
        method: "post",
        url: "" + process.env.API_ROOT + "/member/list/export/all",
        responseType: "arraybuffer",
        data: data
      })
        .then(res => {
          console.log(res.data);
          const blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          a.download = "所有会员列表.xlsx";
          a.href = blobUrl;
          a.click();
          document.body.removeChild(a);
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
    },
    //获取用户店铺列表
    getShopList(apiMerchantId) {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/shopIds?apiMerchantId="+apiMerchantId
      })
        .then(res => {
          console.log("商户下店铺列表", res);
          if (res.data.code == 1) {
            this.sources = res.data.data;
            this.sources.unshift({
              shop_info_id: 0,
              shop_name: "不限"
            });
          }else{
            this.sources = [];
            this.sources.unshift({
              shop_info_id: 0,
              shop_name: "不限"
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //重置搜索条件
    reset() {
      this.form = {
        merchantId:'',
        goodsType: 1,
        memberType: 1,
        shopInfoIds: 0,
        memberMobile: "",
        memberVipCode: "",
        memberName: "",
        taobaoId: "",
        memberEmail: "",
        orderType: 0,
        orderCreateTime: [],
        orderCreateTimeStart: "",
        orderCreateTimeEnd: "",
        paymentTime: [],
        paymentTimeStart: "",
        paymentTimeEnd: "",
        goodsName: "",
        skuCode: "",
        levelId: 0,
      };
      this.getStore(this.shopId)
      // this.getTableData();
    },
    //搜索
    search() {
      this.currentPage = 1;
      this.getStore(this.shopId)
      // this.getTableData();
    },
    //获取列表信息
    getTableData(apiMerchantId) {
      if(apiMerchantId){

        var data = {};
        //商户ID
        if (this.form.merchantId) {
          data.merchantId = this.form.merchantId;
        }
        //入会店铺
        if (this.form.shopInfoIds) {
          data.shopInfoId = this.form.shopInfoIds;
        } else {
        }
        //入会渠道
        if (this.form.orderType) {
          data.memberSource = this.form.orderType;
        }

        //等级
        if (this.form.levelId !== 0) {
          data.levelId = this.form.levelId;
        } else {
        }
        // 会员手机号
        if (this.form.memberMobile) {
          data.memberMobile = this.form.memberMobile;
        }
        //会员ID
        if (this.form.memberVipCode) {
          data.memberVipCode = this.form.memberVipCode;
        }
        //会员名字
        if (this.form.memberName) {
          data.memberName = this.form.memberName;
        }
        //淘宝ID
        if (this.form.taobaoId) {
          data.taobaoId = this.form.taobaoId;
        }
        //邮箱
        if (this.form.memberEmail) {
          data.memberEmail = this.form.memberEmail;
        }
        //入会时间
        if (this.form.orderCreateTime) {
          data.memberCreateTimeStart = this.form.orderCreateTime[0];
          data.memberCreateTimeEnd = this.form.orderCreateTime[1];
        }
        //生日
        if (this.form.paymentTime) {
          data.birthdayStart = this.form.paymentTime[0];
          data.birthdayEnd = this.form.paymentTime[1];
        }
        //积分
        if (this.form.goodsName) {
          data.minPoint = this.form.goodsName;
        }
        if (this.form.skuCode) {
          data.maxPoint = this.form.skuCode;
        }
        //分页
        data.pageNum = this.currentPage
        data.pageSize = this.pageSize
        this.$http
        .post("" + process.env.API_ROOT + "/member/list", data)
        .then(res => {
          if (res.data.code == 1) {
            console.log("会员列表", res);
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            this.tableData = []
            this.total = 0
            // this.$message({
            //   type: "error",
            //   message: res.data.msg
            // });
          }
        })
        .catch(err => {
          console.log(err);

          alert("网络异常");
        });
      }else{
        this.tableData=[]
        this.total = 0
      }




    }
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      console.log(vm); //当前组件的实例
    });
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.member {
 .el-button.is-active,.no{
    width: 120px;
  }
  .boxTable .cell{
      padding: 10px;
    }
  .caret-wrapper{
    height: 22px;
  }
  .ascending{
    top: 0;
  }
  .descending{
    bottom: 0;
  }
  .timerange{
    background: #fff;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
    padding:0 25px;
  }
  .chartDate{
        margin:10px 0  ;

    }
    .orderChart{
        width: 50%;
        float: left;
        background: #fff;
        padding:  25px;
        box-sizing: border-box;
      border-bottom:  1px solid #F0F1F4;


    }
    .levelChart{
        width: 50%;
        float: right;
         background: #fff;
        padding:  25px;
        box-sizing: border-box;
      border-bottom:  1px solid #F0F1F4;

    }
    .goodChart{
      background: #fff;
        // box-shadow: 0 0px 8px 0px rgba(0,0,0,0.05);
        padding:  25px;
        box-sizing: border-box;
      border-bottom:  1px solid #F0F1F4;
    }
    .goodChart,.levelChart,.orderChart{
      h3{
        font-family: 'zt3';
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
      }
    }
  .property{
    h4{
      padding: 10px 0;
    }
  }
  .el-dialog{

    .el-tabs--card > .el-tabs__header .el-tabs__item{
      width: 140px;
      text-align: center;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active{
      border: #3366ff 1px solid
    }
    .el-tabs__nav-scroll{
      padding: 0;
      display: flex;
      justify-content: center;
      .el-tabs__nav{
        margin: 0 auto;
      }
    }
        .l{
          float: left;

          width: 200px;
          font-family: 'zt1';
          font-size: 14px;
          color: #333333;
          line-height: 22px;
          padding: 5px;
          box-sizing: border-box;
          div{
            padding: 5px;
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span{
              display: inline-block;
              width: 60px;
              color: #999999;
            }
          }
      }

        .r{
          float: right;
          width: 200px;
          font-family: 'zt1';
          font-size: 14px;
          color: #333333;
          line-height: 22px;
          padding: 5px;
          box-sizing: border-box;
          div{
            padding: 5px;
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            span{
              display: inline-block;
              width: 60px;
              color: #999999;
            }
          }

        }
  }
  .el-tabs__nav-scroll{
      padding: 0 45px;
  }
  .el-tabs__content{
    padding: 0 20px;
    margin-bottom: 20px;

  }
  .moreMsg {
    li {
      padding: 5px;
      span {
        display: inline-block;
        width: 100px;
      }
    }
  }
  .el-tag--small:first-child {
    width: 100px;
    display: flex;
    align-items: center;
    .el-select__tags-text {
      display: inline-block;
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    i {
      display: inline-block;
    }
  }

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
      font-family: 'zt2';
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
    // margin: 0 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    height: 90%;
    .boxContent {
      width: 100%;
      background: #fff;
      .btnBox {
        // padding: 20px 30px;

        .left {
          width: calc(100% - 100px);
          height: 60px;
          line-height: 60px;
          float: left;
          border-bottom: #ccc 1px solid;
          border-right: #ccc 1px solid;
          box-sizing: border-box;
          padding-left: 30px;
          .btn {
            height: 60px;
            float: right;
            margin-right: 20px;
            span {
              font-family: "zt1";
              font-size: 14px;
              color: #666666;
              text-align: right;
              line-height: 14px;
            }
          }
        }
        .right {
          height: 60px;
          line-height: 60px;
          box-sizing: border-box;
          text-align: center;
          width: 100px;
          float: right;
          .el-button {
            span {
              font-family: "zt1";
              font-size: 14px;
              color: #666666;
              text-align: right;
              line-height: 14px;
            }
          }
        }
      }
      .form {
        padding: 0 30px;
        .el-form-item{
          width: 24%;
          box-sizing: border-box;
          .el-select{
            width: 100%;
          }
          .el-date-editor{
            width: 100%;
          }
        }
        .btns {
          text-align: right;
          position: relative;
          padding-bottom: 20px;
          height: 90px;
          display: inline-block;
          width: 24%;
          div {
            width: 100%;
            position: absolute;
            bottom: 20px;
          }
        }
        .memberMsg {
          height: 40px;
          display: flex;
          border: 1px solid #d9d9d9;
          .el-input {
          height: 38px;
            line-height: 38px;
            width: 50%;
            .el-input__inner {
              height: 36px;
              border: none;
              border-radius: 0;
            }
          }
          .pointBox1{
            height: 38px;
                line-height: 38px;
            width: 100%;
            .el-input {
              height: 38px;
            line-height: 38px;
              width: 40%;
              .el-input__inner {
                height: 38px;
            line-height: 38px;
                border: none;
                border-radius: 0;
              }
            }

          }
          .pointBox{
            height: 38px;
                line-height: 38px;
            width: 100%;
            .el-input {
              height: 38px;
              width: 40%;
              line-height: 38px;
              .el-input__inner {
                height: 38px;
                line-height: 38px;
                border: none;
                border-radius: 0;
              }
            }

          }
          .el-select {
              height: 38px;
              width: 50%;
            line-height: 38px;
            .el-input {
              height: 38px;
            line-height: 38px;

              width: 100%;
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
            font-family: 'zt1';
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
          }
          .el-button {
            font-family: 'zt1';
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
      .el-pagination {
        width: 100%;
        text-align: center;
        .el-pagination__sizes{
          float: left;
        }
      }
    }
  }
  .bottom {
    text-align: center;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    line-height: 30px;
    height: 30px;
  }
  .danger {
    font-family: 'zt1';
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 20px;
    height: 32px;
    margin-bottom: 20px;
  }
}
</style>
