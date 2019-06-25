<template>
  <div class="point">
    <div v-if="none">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>客户权益</el-breadcrumb-item>
          <el-breadcrumb-item>积分规则</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>积分规则</h1>
      </div>
      <div class="box">
        <div class="btns clear">
          <!-- 新建按钮 -->
          <el-button @click="add" class="add">新建积分规则</el-button>
          <el-button class="sec" @click="search">搜索</el-button>
          <!-- 下拉列表 选择活动  -->
          <div class="drop">
            <el-dropdown trigger="click" @command="a">
              <span class="el-dropdown-link">
                {{select}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='{name:"交易积分",value:1}'>交易积分</el-dropdown-item>
                <el-dropdown-item :command='{name:"活动积分",value:2}'>活动积分</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input v-model="selPointStr" class="sel"  placeholder="积分规则名称"></el-input>
          </div>
          <!-- 日期选择 -->
          <el-date-picker
            v-model="selPointTime"
            prefix-icon="el-icon-fire"
            @change="selTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="700" @row-click="rowClick">
            <!-- <el-table-column type="index" :index="q" label="编号" width="100"></el-table-column> -->
            <el-table-column   label="" width="30"></el-table-column>

            <el-table-column show-overflow-tooltip prop="pointName" label="积分规则名称"></el-table-column>

            <el-table-column label="积分类型" prop="pointType" show-overflow-tooltip>
              <template
                slot-scope="scope"
              >{{tableData[scope.$index].shopCampainPointId ? "活动积分" :'交易积分' }}</template>
            </el-table-column>

            <el-table-column
              label="入账类型"
              v-if="type == 1"
              prop="entryAccountType"
              show-overflow-tooltip
            >
              <template
                slot-scope="scope"
              >{{tableData[scope.$index].entryAccountType == 1 ? "整元入账" :'整分入账' }}</template>
            </el-table-column>

            <el-table-column
              v-if="type == 1"
              label="入账倍数"
              show-overflow-tooltip
              prop="entryAccountMult"
            ></el-table-column>

            <el-table-column label="开始日期" prop="configValidDate" show-overflow-tooltip></el-table-column>

            <el-table-column label="结束日期" show-overflow-tooltip prop="configInvalidDate"></el-table-column>

            <el-table-column label="状态" show-overflow-tooltip prop="configStatus">
              <template
                slot-scope="scope"
              >{{tableData[scope.$index].configStatus == 0 ? "未开始" : tableData[scope.$index].configStatus == 1 ? '执行中' :tableData[scope.$index].configStatus == 2 ? '已结束' : '禁用'}}</template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="300">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="edit(scope.$index, tableData)"
                  type="text"
                  v-if="tableData[scope.$index].configStatus==0||tableData[scope.$index].configStatus==3"
                >编辑</el-button>
                <el-button
                  @click.native.prevent="check(scope.$index, tableData)"
                  type="text"
                  v-if="tableData[scope.$index].configStatus==1||tableData[scope.$index].configStatus==2"
                >查看</el-button>
                <el-button
                  @click.native.prevent="stop(scope.$index, tableData)"
                  type="text"
                  v-if='tableData[scope.$index].configStatus!=3'
                  :disabled='tableData[scope.$index].configStatus==2||tableData[scope.$index].configStatus==3'
                  :class='tableData[scope.$index].configStatus==2||tableData[scope.$index].configStatus==3? "dis":""'
                >禁用</el-button>
                <el-button
                  @click.native.prevent="start(scope.$index, tableData)"
                  type="text"
                  v-if="tableData[scope.$index].configStatus==3"
                >启用</el-button>
                <el-button
                  @click.native.prevent="del(scope.$index, tableData)"
                  type="text"
                  :disabled="tableData[scope.$index].configStatus==1"
                  :class='tableData[scope.$index].configStatus==1? "dis":""'
                >删除</el-button>
              </template>
            </el-table-column>
            <div slot="empty" class="empty">
              <div>
                <img src="../../assets/img/none1.png" alt width="140" height="140">
              </div>
              <p :style="{'marginTop': '23px'}">您还没有添加积分规则</p>
              <p :style="{'marginTop': '23px'}">点击上方新增积分，开始设置积分吧！</p>
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
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <div class="bottom">按住 [shift] 键，可横向滚动表格哦</div>
    </div>
    <!-- 添加新增控件 -->
    <div class="addAct" v-if="!none  && !look">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>客户权益</el-breadcrumb-item>
          <el-breadcrumb-item>积分规则</el-breadcrumb-item>
          <!-- <el-breadcrumb-item>积分设置</el-breadcrumb-item> -->
          <el-breadcrumb-item v-if="!pointForm.merchantPointConfigId">新建积分规则</el-breadcrumb-item>
          <el-breadcrumb-item v-if="pointForm.merchantPointConfigId">编辑积分规则</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>
          <i class="el-icon-back" @click="back"></i>
          <span v-if="!pointForm.merchantPointConfigId">新建积分规则</span>
          <span v-if="pointForm.merchantPointConfigId">编辑积分规则</span>
          <!-- <span>积分设置</span> -->
        </h1>
      </div>
      <div class="form">
        <el-form
          :model="pointForm"
          ref="pointForm"
          label-width="100px"
          class="demo-pointForm"
          label-position="top"
          :rules="rules"
        >
          <div class="baseMsg">
            <h2>基本信息</h2>
            <el-form-item label="积分规则名称" prop="point">
              <el-input v-model="pointForm.point" class="name" :disabled='pointForm.merchantPointConfigId!=""'></el-input>
            </el-form-item>
            <el-form-item label="规则生效时间" prop="time">
              <el-date-picker
                prefix-icon="el-icon-date"
                v-model="pointForm.time"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="会员等级" prop="level">
              <el-select
                v-model="pointForm.level"
                multiple
                placeholder="请选择会员等级"
                filterable
                class="level"
                @change="changeStaff(1)"
                collapse-tags
              >
                <el-option
                  v-for="item in level.filter((val)=>{if(val.levelSwitch==1){return val.levelSwitch}})"
                  :key="item.apiCustomerLevelConfId"
                  :label="item.customerLevelName"
                  :value="item.apiCustomerLevelConfId"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="mb">
            <h2>{{pointForm.radio4==1?'交易积分':'活动积分'}}</h2>
            <el-form-item label="积分类型" prop='radio4'>
              <el-radio-group v-model="pointForm.radio4" @change="radio4Change" >
                <el-radio :label="1">交易积分</el-radio>
                <el-radio :label="2">活动积分</el-radio>
              </el-radio-group>
              <el-dropdown v-if="pointForm.radio4==2" @command="c" trigger="click">
                <span class="el-dropdown-link1" >
                  {{choose}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command='{name:"完善资料",value:1}'>完善资料</el-dropdown-item>
                  <el-dropdown-item :command='{name:"邀请好友",value:2}'>邀请好友</el-dropdown-item>
                  <el-dropdown-item :command='{name:"其他",value:3}'>其他</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <div v-if="pointForm.radio4==1">
              <el-form-item label="订单状态" prop="radio5" >
                <p>选中后将根据选择的订单状态开始计算积分</p>
                <el-radio-group v-model="pointForm.radio5">
                  <el-radio :label="0">已付款</el-radio>
                  <el-radio :label="1">已发货</el-radio>
                  <el-radio :label="2">确认收货</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="商品范围" prop="radio6" class="range">
                <p>
                  请按照模版录入信息
                  <a href="static/goods.xlsx" download style="color:#3366FF;margin:0 20px">下载模板</a>
                </p>
                <el-radio-group v-model="pointForm.radio6">
                  <el-radio :label="1">任意</el-radio>
                  <el-radio :label="2">
                    <el-upload
                      :disabled="sc1"
                      :multiple="false"
                      class="upload-demo1"
                      ref="upload1"
                      :action="''"
                      :http-request="httpReq1"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove1"
                      :on-exceed="handleOver"
                      :file-list="fileList1"
                      :on-change="changeFile1"
                      :on-success="uploadOk"
                      :limit="1"
                      name="myfiles"
                      :auto-upload="true"
                      :with-credentials="true"
                    >
                      <el-button slot="trigger" size="small" type="primary" :disabled="sc1">包含商品</el-button>
                    </el-upload>
                    <el-button
                      type="text"
                      v-if="pointForm.specifySkuCodes"
                      @click="download(1)"
                    >下载该列表</el-button>
                  </el-radio>
                  <el-radio :label="3">
                    <el-upload
                      :disabled="sc2"
                      :multiple="false"
                      class="upload-demo2"
                      ref="upload2"
                      :http-request="httpReq2"
                      :action="''"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove2"
                      :on-exceed="handleOver"
                      :file-list="fileList2"
                      :on-change="changeFile2"
                      :on-success="uploadOk"
                      :limit="1"
                      name="myfiles"
                      :with-credentials="true"
                      :auto-upload="true"
                    >
                      <el-button slot="trigger" size="small" type="primary" :disabled="sc2">排除商品</el-button>
                    </el-upload>
                    <el-button
                      type="text"
                      v-if="pointForm.excludeSkuCodes"
                      @click="download(2)"
                    >下载该列表</el-button>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="订单金额" :prop='pointForm.radio4==1 ? "money":""'>
                <el-input v-model="pointForm.money" class="money"></el-input>元及以上
              </el-form-item>
              <el-form-item label="入账类型" prop="radio2">
                <el-radio-group v-model="pointForm.radio2">
                  <el-radio :label="1">整元入账</el-radio>
                  <el-radio :label="2">整分入账</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="入账倍数" :prop='pointForm.radio4==1 ? "times":""'>
                <el-input v-model="pointForm.times" class="times"></el-input>倍
              </el-form-item>
              <el-form-item label="积分比例" :prop='pointForm.radio4==1 ? "scale":""'>
                <el-input v-model="pointForm.scale" class="scale"></el-input>元 1 积分
                <el-checkbox v-model="pointForm.checked" @change="checkChange" class="more">多余金额作废</el-checkbox>
              </el-form-item>
              <el-form-item label="积分生效时间" :prop='pointForm.radio4==1 ? "date":""'>
                客户获取后第
                <el-input v-model="pointForm.date" class="date"></el-input>天生效
              </el-form-item>

              <el-form-item
                label="滚动有效期"
                :prop='pointForm.radio4==1 ? "radio3":""'
                :show-message="pointForm.radio3!=2 &&pointForm.radio4==1"
                >
                <el-radio-group v-model="pointForm.radio3">
                  <el-radio :label="0" style="margin-bottom:20px">
                    自生效日起
                    <el-input v-model="pointForm.day" class="day" :disabled="pointForm.radio3!=0"></el-input>天内有效
                  </el-radio>
                  <el-radio :label="1" class="two">
                    自生效日起
                    <el-input
                      v-model="pointForm.scrollYear"
                      class="day"
                      :disabled="pointForm.radio3!=1"
                    ></el-input>年后的
                    <el-input
                      v-model="pointForm.scrollMonth"
                      class="day"
                      :disabled="pointForm.radio3!=1"
                    ></el-input>个月后的固定
                    <el-input
                      v-model="pointForm.scrollDay"
                      class="day"
                      :disabled="pointForm.radio3!=1"
                    ></el-input>日失效
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="统一有效期"
                :prop='pointForm.radio4==1 ? "radio3":""'
                :show-message="pointForm.radio3==2 &&pointForm.radio4==1"
                >
                <el-radio v-model="pointForm.radio3" :label="2">
                  自生效日起
                  <el-input
                    v-model="pointForm.uniteYear"
                    class="day"
                    :disabled="pointForm.radio3!=2"
                  ></el-input>年后的
                  <el-input
                    v-model="pointForm.uniteMonth"
                    class="day"
                    :disabled="pointForm.radio3!=2"
                  ></el-input>月
                  <el-input
                    v-model="pointForm.uniteDay"
                    class="day"
                    :disabled="pointForm.radio3!=2"
                  ></el-input>日失效
                </el-radio>
              </el-form-item>

              <el-form-item label="规则执行优先级" prop="radio1">
                <el-tooltip
                  effect="dark"
                  content="数字越小优先级越高，优先执行"
                  placement="top-start"
                  style="position:relative;left:120px;top:-50px"
                >
                  <i class="iconfont iconwenhao"></i>
                </el-tooltip>
                <el-radio-group v-model="pointForm.radio1">
                  <el-radio :label="1">1</el-radio>
                  <el-radio :label="2">2</el-radio>
                  <el-radio :label="3">3</el-radio>
                  <el-radio :label="4">4</el-radio>
                  <el-radio :label="5">5</el-radio>
                  <el-radio :label="6">6</el-radio>
                  <el-radio :label="7">7</el-radio>
                  <el-radio :label="8">8</el-radio>
                  <el-radio :label="9">9</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="支付方式" prop="payWay">
                <el-select
                  @change="changeStaff(3)"
                  collapse-tags
                  v-model="pointForm.payWay"
                  multiple
                  placeholder="请选择支付方式"
                  filterable
                  class=""
                >
                  <el-option
                    v-for="item in payWays"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关联店铺" :prop='pointForm.radio4==1 ? "shopId":""' >
                <el-select
                  @change="changeStaff(2)"
                  collapse-tags
                  v-model="pointForm.shopId"
                  multiple
                  placeholder="请选择关联店铺"
                  filterable
                  class="shopId"
                >
                  <el-option
                    v-for="item in shop"
                    :key="item.shop_info_id"
                    :label="item.shop_name"
                    :value="item.shop_info_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div v-if="pointForm.radio4==2" >
              <el-form-item label="积分数量" prop="num" v-if="choose=='其他'" >
                <el-input v-model="pointForm.num" class="num"></el-input>分
              </el-form-item>
              <el-form-item label="获取条件" prop="jsonData" v-if="choose=='完善资料'">
                <el-checkbox-group v-model="checkArr" @change='changezl'>
                  
                  <div >
                    <el-checkbox label="姓名"></el-checkbox> <el-input :disabled="checkArr.indexOf('姓名') ==-1" v-model="pointForm.jsonData[0].value" size='small' style="width:100px" maxlength='6'></el-input> 分
                  </div>

                  <div>
                    <el-checkbox label="邮箱"></el-checkbox> <el-input :disabled="checkArr.indexOf('邮箱') ==-1" v-model="pointForm.jsonData[1].value" size='small' style="width:100px" maxlength='6'></el-input> 分
                  </div>

                  <div>
                    <el-checkbox label="性别"></el-checkbox> <el-input :disabled="checkArr.indexOf('性别') ==-1" v-model="pointForm.jsonData[2].value" size='small' style="width:100px" maxlength='6'></el-input> 分
                  </div>

                  <div>
                    <el-checkbox label="生日" ></el-checkbox> <el-input :disabled="checkArr.indexOf('生日') ==-1" v-model="pointForm.jsonData[3].value" size='small' style="width:100px" maxlength='6'></el-input> 分
                  </div>

                  <div>
                    <el-checkbox label="城市" ></el-checkbox> <el-input :disabled="checkArr.indexOf('城市') ==-1" v-model="pointForm.jsonData[4].value" size='small' style="width:100px" maxlength='6'></el-input> 分
                  </div>

                  <div>
                    <el-checkbox label="身高" ></el-checkbox> <el-input :disabled="checkArr.indexOf('身高') ==-1" v-model="pointForm.jsonData[5].value" size='small' style="width:100px" maxlength='6'></el-input> 分
                  </div>

                  <div>
                    <el-checkbox label="体重" ></el-checkbox> <el-input :disabled="checkArr.indexOf('体重') ==-1" v-model="pointForm.jsonData[6].value" size='small' style="width:100px" maxlength='6'></el-input> 分
                  </div>

                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="获取条件" prop="valueArr" v-if="choose=='邀请好友'">
                <div v-for="(item,index) in pointForm.valueArr" :key="index" class='valueBox' >
                 邀请 <el-input v-model="item.field"  size='small' style="width:100px"></el-input> 人获得 <el-input  v-model="item.value" maxlength='6' size='small' style="width:100px"></el-input> 分
                  <i class="el-icon-plus plus" @click="addValue"></i>
                  <i class="el-icon-delete plus" @click="delValue(index)"  v-if="index!=0"></i>
                </div>  
              </el-form-item>
              <el-form-item label="积分生效时间" prop="date1">
                客户获取后第
                <el-input v-model="pointForm.date1" class="date"></el-input>天生效
              </el-form-item>

              <el-form-item label="滚动有效期" prop="radio7" :show-message="pointForm.radio7!=2">
                <el-radio-group v-model="pointForm.radio7">
                  <el-radio :label="0" style="margin-bottom:20px">
                    自生效日起
                    <el-input v-model="pointForm.day1" class="day" :disabled="pointForm.radio7!=0"></el-input>天内有效
                  </el-radio>
                  <el-radio :label="1" class="two">
                    自生效日起
                    <el-input
                      v-model="pointForm.scrollYear1"
                      class="day"
                      :disabled="pointForm.radio7!=1"
                    ></el-input>年后的
                    <el-input
                      v-model="pointForm.scrollMonth1"
                      class="day"
                      :disabled="pointForm.radio7!=1"
                    ></el-input>个月后的固定
                    <el-input
                      v-model="pointForm.scrollDay1"
                      class="day"
                      :disabled="pointForm.radio7!=1"
                    ></el-input>日失效
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="统一有效期" prop="radio7" :show-message="pointForm.radio7==2">
                <el-radio v-model="pointForm.radio7" :label="2">
                  自生效日起
                  <el-input
                    v-model="pointForm.uniteYear1"
                    class="day"
                    :disabled="pointForm.radio7!=2"
                  ></el-input>年后的
                  <el-input
                    v-model="pointForm.uniteMonth1"
                    class="day"
                    :disabled="pointForm.radio7!=2"
                  ></el-input>月
                  <el-input
                    v-model="pointForm.uniteDay1"
                    class="day"
                    :disabled="pointForm.radio7!=2"
                  ></el-input>日失效
                </el-radio>
              </el-form-item>
            </div>
          </div>
          <el-form-item class="sub">
            <el-button @click="back">取消</el-button>
            <el-button type="primary" @click="submitForm('pointForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 查看空间 -->
    <div class="look" v-if="look">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
          <el-breadcrumb-item>客户权益</el-breadcrumb-item>
          <el-breadcrumb-item>积分规则</el-breadcrumb-item>
          <el-breadcrumb-item>积分详情</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>
          <i class="el-icon-back" @click="back"></i>
          <span>积分详情</span>
        </h1>
      </div>

      <div class="box">
        <div class="baseMsg">
          <h2>基本信息</h2>
          <div>
            <span>积分规则名称</span>
            {{this.pointForm.point}}
          </div>
          <div>
            <span>规则生效时间</span>
            {{this.pointForm.time[0]}}-{{this.pointForm.time[1]}}
          </div>
          <div>
            <span>会员等级</span>
            {{this.pointForm.levelMsg}}
          </div>
        </div>
        <div class="kz">
          <h2>积分条件</h2>

          <div>
            <span>积分类型</span>
            {{this.pointForm.radio4 ==1 ? '交易积分' :'活动积分'}}
          </div>

          <div v-if="this.pointForm.radio4 ==1">
            <span>订单状态</span>
            {{this.pointForm.radio5 ==1 ? '已付款' : this.pointForm.radio5 ==1 ? '已发货' : '确认收货'}}
          </div>
          <div v-if="this.pointForm.radio4 ==1">
            <span>商品范围</span>
            {{this.pointForm.radio6 ==1 ? '任意' : this.pointForm.radio6 ==2 ? ('包含 ' + this.pointForm.flieName) : ('排除 ' +this.pointForm.flieName) }}
          </div>
          <div v-if="this.pointForm.radio4 ==1">
            <span>订单金额</span>
            {{this.pointForm.money}}元
          </div>
          <div v-if="this.pointForm.radio4 ==1">
            <span>入账类型</span>
            {{this.pointForm.radio2 ==1 ? '整元入账' :'整分入账'}}
          </div>
          <div v-if="this.pointForm.radio4 ==1">
            <span>入账倍数</span>
            {{this.pointForm.times}}
          </div>
          <div v-if="this.pointForm.radio4 ==1">
            <span>积分比例</span>
            {{this.pointForm.scale}}
          </div>
          <div v-if="this.pointForm.radio4 !=1">
            <span>积分数量</span>
            {{this.pointForm.num}}
          </div>

          <div>
            <span>积分生效时间</span>
            客户获取后第 {{this.pointForm.radio4 ==1 ?this.pointForm.date :this.pointForm.date1}} 天
          </div>
          <div v-if="this.pointForm.radio3 ==0 && this.type==1">
            <span>滚动有效期</span>
            自生效日起 {{ this.pointForm.day }} 天内有效
          </div>
          <div v-if="this.pointForm.radio3 ==1">
            <span>滚动有效期</span>
            自生效日起 {{  pointForm.scrollYear}} 年后的 {{ pointForm.scrollMonth}} 个月后的固定 {{ pointForm.scrollDay}} 日失效
          </div>
          <div v-if="this.pointForm.radio3 ==2">
            <span>统一有效期</span>
            自生效日起 {{  pointForm.uniteYear}} 年后的 {{  pointForm.uniteMonth}} 个月后的 {{  pointForm.uniteDay}} 日失效
          </div>

          <div v-if="this.pointForm.radio7 ==0 && this.type==2">
            <span>滚动有效期</span>
            自生效日起 {{ this.pointForm.day1 }} 天内有效
          </div>
          <div v-if="this.pointForm.radio7 ==1">
            <span>滚动有效期</span>
            自生效日起 {{  pointForm.scrollYear1}} 年后的 {{ pointForm.scrollMonth1}} 个月后的固定 {{ pointForm.scrollDay1}} 日失效
          </div>
          <div v-if="this.pointForm.radio7 ==2">
            <span>统一有效期</span>
            自生效日起 {{  pointForm.uniteYear1}} 年后的 {{  pointForm.uniteMonth1}} 个月后的 {{  pointForm.uniteDay1}} 日失效
          </div>

          <div v-if="this.pointForm.radio4 ==1">
            <span>规则执行优先级</span>
            {{this.pointForm.radio1}}
          </div>
          <div v-if="this.pointForm.radio4 ==1">
            <span>关联店铺</span>
            {{this.pointForm.shopMsg}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sell",
  data() {
    return {
      choose:'完善资料',
      shopAll:[],
      levelAll:[],
      rules: {
        jsonData:[
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              // console.log(value)
              var a = false
              var reg = /^\d*\.{0,1}\d{0,1}$/;
              this.checkArr.forEach(item => {
                value.forEach(val=>{
                  if(item == val.describe){
                    if(val.value){
                      if(!reg.test(val.value)){
                        a = false

                        callback(new Error("积分数量格式不正确"))
                      }else{
                        a = true
                      }
                    }else{
                      callback(new Error("有必填项为空")) ;
                        a = false

                    }
                  }
                })
              });
              if(a){
                callback()
              }else{

              }
            }
          }
        ],
        valueArr:[
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              var reg = /^\d*\.{0,1}\d{0,1}$/;
              var reg1 = /^\d*$/;
              var a= false
              value.forEach(item=>{
                if(item.field&&item.value){
                  if(!reg1.test(item.field)){
                    callback(new Error('请输入正确的人数'))
                    a= false
                  }else{
                    if(!reg.test(item.value)){
                      a= false
                      callback(new Error('请输入正确的积分格式'))
                    }else{
                      a= true
                    }
                  }
                }else{
                      a= false

                  callback(new Error('有必填项为空'))
                }
              })
               value.forEach((item,index)=>{
                 value.forEach((item1,index1)=>{
                 if(index< index1){
                   if(item.field*1<item1.field*1){
                      a= true
                   }else{
                      a= false

                      callback(new Error('邀请人数需一级多余一级'))
                   }
                 }
               })
               })
              if(a){
                callback()
              }else{
                
              }
            }
          }
        ],
        point: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\ ?]{1,20}$/;

              if (!value) {
                callback(new Error("积分规则名称不能为空"));
              } else {
                if (value.length > 20) {
                  callback(new Error("积分规则名称最长不能超过20个字"));
                } else {
                  if (!reg.test(value)) {
                    callback(new Error("积分规则名称不能包含特殊字符"));
                  } else {
                    callback();
                  }
                }
              }
            }
          }
        ],
        time: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              // console.log(value)
              if (!value) {
                callback(new Error("规则生效时间不能为空"));
              } else {
                if (value.length == 0) {
                  callback(new Error("规则生效时间不能为空"));
                } else {
                  if (
                    new Date(value[0]).getTime() == new Date(value[1]).getTime()
                  ) {
                    callback(new Error("结束时间需晚于开始时间"));
                  } else {
                    callback();
                  }
                }
              }
            }
          }
        ],
        level: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              // console.log(value)
              if (value.length == 0) {
                callback(new Error("会员等级不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        radio4: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              console.log(value);
              if (!value) {
                callback(new Error("积分类型不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        radio1: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              // console.log(value)
              if (!value) {
                callback(new Error("规则执行优先级不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        shopId: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              if (value.length == 0) {
                callback(new Error("关联店铺不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        payWay: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              console.log(value);
              if (value.length == 0) {
                callback(new Error("支付方式不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        radio5: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              // console.log(value)
              if (value == 3) {
                callback(new Error("订单状态不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        radio6: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              // console.log(value)
              if (!value) {
                callback(new Error("适用范围不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        //入账类型
        radio2: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              // console.log(value)
              if (!value) {
                callback(new Error("入账类型不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        money: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              var reg = /^\d*\.{0,1}\d+$/;

              if (!value) {
                callback(new Error("订单金额不能为空"));
              } else {
                if (!reg.test(value)) {
                  callback(new Error("请输入正确的订单金额"));
                } else {
                  callback();
                }
              }
            }
          }
        ],
        times: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              var reg = /^\d*\.{0,1}\d{0,1}$/;

              if (!value) {
                callback(new Error("入账倍数不能为空"));
              } else {
                if (!reg.test(value)) {
                  callback(new Error("请输入正确的入账倍数"));
                } else {
                  callback();
                }
              }
            }
          }
        ],
        scale: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              var reg = /^\d*\.{0,1}\d{0,1}$/;

              if (!value) {
                callback(new Error("积分比例不能为空"));
              } else {
                if (!reg.test(value)) {
                  callback(new Error("请输入正确的积分比例"));
                } else {
                  callback();
                }
              }
            }
          }
        ],
        num: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              var reg = /^\d*\.{0,1}\d{0,1}$/;

              if (!value) {
                callback(new Error("积分数量不能为空"));
              } else {
                if (!reg.test(value)) {
                  callback(new Error("请输入正确的积分数量"));
                } else {
                  callback();
                }
              }
            }
          }
        ],
        date: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              var reg = /^(0|[1-9][0-9]*)$/;
              if (value.length==0) {
                callback(new Error("积分生效时间不能为空"));
              } else {
                if (!reg.test(value)) {
                  console.log(11111111111);
                  callback(new Error("请输入正确的积分生效时间"));
                } else {
                  callback();
                }
              }
            }
          }
        ],
        date1: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              var reg = /^(0|[1-9][0-9]*)$/;
              if (value.length==0) {
                callback(new Error("积分生效时间不能为空"));
              } else {
                if (!reg.test(value)) {
                  console.log(11111111111);
                  callback(new Error("请输入正确的积分生效时间"));
                } else {
                  callback();
                }
              }
            }
          }
        ],
        radio3: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              var reg=/^([1-9][0-9]*)$/
              if (value == 0) {
                if (this.pointForm.day.length == 0) {
                  callback(new Error("有必填项为空"));
                } else {
                  if (!reg.test(this.pointForm.day)) {
                    callback(new Error("请输入正确天数"));
                  } else {
                    callback();
                  }
                }
              } else {
                if (value == 1) {
                  if (
                    this.pointForm.scrollYear.length == 0 ||
                    this.pointForm.scrollMonth.length == 0 ||
                    this.pointForm.scrollDay.length == 0
                  ) {
                    callback(new Error("有必填项为空"));
                  } else {
                    if (
                      reg.test(this.pointForm.scrollYear) &&
                      reg.test(this.pointForm.scrollMonth) &&
                      reg.test(this.pointForm.scrollDay)
                    ) {
                      callback();
                    } else {
                      callback(new Error("请输入正确的年月日"));
                    }
                  }
                } else {
                  if (value == 2) {
                    if (
                      this.pointForm.uniteYear.length == 0 ||
                      this.pointForm.uniteMonth.length == 0 ||
                      this.pointForm.uniteDay.length == 0
                    ) {
                      callback(new Error("有必填项为空"));
                    } else {
                      if (
                        reg.test(this.pointForm.uniteYear) &&
                        reg.test(this.pointForm.uniteMonth) &&
                        reg.test(this.pointForm.uniteDay)
                      ) {
                        callback();
                      } else {
                        callback(new Error("请输入正确的年月日"));
                      }
                    }
                  }
                }
              }
            }
          }
        ],
        radio7: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              var reg = /^([1-9][0-9]*)$/;
              if (value == 0) {
                console.log(this.pointForm.day1);
                if (this.pointForm.day1.length == 0) {
                  callback(new Error("有必填项为空"));
                } else {
                  if (!reg.test(this.pointForm.day1)) {
                    callback(new Error("请输入正确天数"));
                  } else {
                    callback();
                  }
                }
              } else {
                if (value == 1) {
                  if (
                    this.pointForm.scrollYear1.length == 0 ||
                    this.pointForm.scrollMonth1.length == 0 ||
                    this.pointForm.scrollDay1.length == 0
                  ) {
                    callback(new Error("有必填项为空"));
                  } else {
                    if (
                      reg.test(this.pointForm.scrollYear1) &&
                      reg.test(this.pointForm.scrollMonth1) &&
                      reg.test(this.pointForm.scrollDay1)
                    ) {
                      callback();
                    } else {
                      callback(new Error("请输入正确的年月日"));
                    }
                  }
                } else {
                  if (value == 2) {
                    if (
                      this.pointForm.uniteYear1.length == 0 ||
                      this.pointForm.uniteMonth1.length == 0 ||
                      this.pointForm.uniteDay1.length == 0
                    ) {
                      callback(new Error("有必填项为空"));
                    } else {
                      if (
                        reg.test(this.pointForm.uniteYear1) &&
                        reg.test(this.pointForm.uniteMonth1) &&
                        reg.test(this.pointForm.uniteDay1)
                      ) {
                        callback();
                      } else {
                        callback(new Error("请输入正确的年月日"));
                      }
                    }
                  }
                }
              }
            }
          }
        ]
      },
      fileList1: [],
      fileList2: [],
      file1: {},
      file2: {},
      sc1: true,
      sc2: true,
      checkList: ["任意"],
      checkArr: ["姓名"],
      type: 1,
      //指定只能选择当前时间之后的时间
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      level: [],
      shop: [],
      total: 1,
      selPointStr: "",
      selPointTime: "",
      store: [],
      payWays:[
        {
          label:'所有支付方式',
          value:0
        },
        {
          label:'现金',
          value:'CASH'
        },
        {
          label:'礼品卡',
          value:'GIFT_CARD'
        },
        {
          label:'代金券',
          value:'CASH_COUPON'
        },
        {
          label:'银联',
          value:'UNION_PAY'
        },
        {
          label:'支付宝',
          value:'ALIPAY'
        },
        {
          label:'微信',
          value:'WECHAT'
        },
        {
          label:'信用卡',
          value:'CREDIT_CARD'
        },
        {
          label:'applePay',
          value:'APPLE_PAY'
        },
      ],
      pointForm: {
        valueArr:[
          {
            "field":"",
            "value":"",
            "describe":""
          }
        ],
        jsonData:[
          {
            "field":"REAL_NAME",
            "value":"",
            "describe":"姓名"
          },
          {
            "field":"EMALL",
            "value":"",
            "describe":"邮箱"
          },
          {
            "field":"GENDER",
            "value":"",
            "describe":"性别"
          },
          {
            "field":"BIRTHDAY",
            "value":"",
            "describe":"生日"
          },
          {
            "field":"CITY",
            "value":"",
            "describe":"城市"
          },
          {
            "field":"HEIGHT",
            "value":"",
            "describe":"身高"
          },
          {
            "field":"WEIGHT",
            "value":"",
            "describe":"体重"
          }
        ],
        payWay:[0],
        shopMsg: "",
        levelMsg: "",
        store: "",
        shopId: [],
        flieName: "",
        uploadSkuFileName: "",
        uploadSkuFileContent: "",
        merchantPointConfigId: "",
        way: [],
        num:'',
        day: "",
        day1: "",
        scrollYear: "",
        scrollMonth: "",
        scrollDay: "",
        uniteYear: "",
        uniteMonth: "",
        uniteDay: "",
        date1: "",
        scrollYear1: "",
        scrollMonth1: "",
        scrollDay1: "",
        uniteYear1: "",
        uniteMonth1: "",
        uniteDay1: "",
        scale: "",
        times: "",
        money: "",
        point: "",
        time: [],
        level: [],
        radio1: 1,
        radio2: 1,
        radio3: 0,
        radio7: 0,
        radio5: 0,
        radio6: 1,
        checked: false,
        date: "",
        radio4: 1,
      },
      look: false,
      //新建控件显示否
      none: true,
      //下拉菜单选择
      select: "交易积分",
      //列表页的时间选择
      value4: "",
      //在上边提示
      labelPosition: "top",
      //营销活动列表数据
      tableData: [],
      //第几页
      currentPage: 1,
      //每页的容量
      pageSize: 10,
      //店铺列表
      shopList: [],
      isContainAll:false,
      isAll:false,
      all:true,
    };
  },
  created() {
    this.getShopList();
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    }
  },
  watch: {
    choose:{
      handler:function(n,o){
        this.$refs['pointForm'].clearValidate('num');
        this.$refs['pointForm'].clearValidate('valueArr');
        this.$refs['pointForm'].clearValidate('jsonData');
      }
    },
    shopId:{
        handler:function(n,o){
            if(n!=o){
                this.getStore(this.shopId)
            }
        }
    },
    'pointForm.radio4': {
      handler: function(n, o) {
        console.log(n);
        if (n != o) {
          if(this.$refs["pointForm"]){
            console.log(1111111111)
            this.$refs["pointForm"].clearValidate();
          }
        }
      }
    },
    'pointForm.payWay': {
      handler: function(n, o) {
        console.log(n)
        console.log(n.length)
        console.log(this.payWays.length)

        if(n.length ==this.payWays.length-1){
          this.pointForm.payWay = [0]
          this.all = true
        }
      },
      deep:true
    },
    checkArr: {
      handler: function(n, o) {
        console.log(n)
        if(n.indexOf('姓名')==-1){
          this.pointForm.jsonData[0].value = ''
        }
        if(n.indexOf('邮箱')==-1){
          this.pointForm.jsonData[1].value = ''
        }
        if(n.indexOf('性别')==-1){
          this.pointForm.jsonData[2].value = ''
        }
        if(n.indexOf('生日')==-1){
          this.pointForm.jsonData[3].value = ''
        }
        if(n.indexOf('城市')==-1){
          this.pointForm.jsonData[4].value = ''
        }
        if(n.indexOf('身高')==-1){
          this.pointForm.jsonData[5].value = ''
        }
        if(n.indexOf('体重')==-1){
          this.pointForm.jsonData[6].value = ''
        }
      },
      deep:true
    },
    "pointForm.radio6": {
      handler: function(n, o) {
        if (n != o) {
          console.log(n);
          if (n == 1) {
            this.sc1 = true;
            this.sc2 = true;
            this.fileList1 = [];
            this.fileList2 = [];
          } else if (n == 2) {
            this.sc1 = false;
            this.fileList2 = [];
            this.sc2 = true;
          } else {
            this.fileList1 = [];
            this.sc1 = true;
            this.sc2 = false;
          }
          this.pointForm.uploadSkuFileName = "";
          this.pointForm.uploadSkuFileContent = "";
        }
      }
    },
    "pointForm.level": {
      handler: function(n, o) {
        // console.log('等级选择',n)
      }
    },
    "pointForm.store": {
      handler: function(n, o) {
        if (n != o) {
          this.getShop(this.pointForm.store);
        }
      }
    }
  },
  methods: {
    delValue(index) {
      this.pointForm.valueArr.splice(index, 1);
    },
    addValue() {
      if (this.pointForm.valueArr.length < 5) {
        let obj = {
            "field":"",
            "value":"",
            "describe":""
          }
        this.pointForm.valueArr.push(obj);
      } else {
        this.$message({
          type: "error",
          message: "条件最多可以添加至5个"
        });
      }
    },
    changezl(val){
      console.log(val)
    },
    changeStaff(type){
      //等级
      console.log(type)
      if(type==1){
        console.log(this.levelAll.length)
        //如果所有可用的等级为一个
        if(this.levelAll.length==1){
          // 定义一个变量，用来存储当前下拉框是否选中了全部
          this.isContainAll=!this.isContainAll
            console.log(this.isContainAll)

          if (this.isContainAll) {
            this.pointForm.level = [-1]
          }else{
            this.isContainAll = false
                  // 则删除第一个全部
            this.pointForm.level.splice(0, 1)
          }
        }else{
          if (this.isContainAll) {
            // 只有下拉框的值发生了变化才会进入此方法
            // 如果之前选中了全部，则变化后肯定不包含全部了
                  this.isContainAll = false
                  // 则删除第一个全部
                  this.pointForm.level.splice(0, 1)

          } else {
            // 如果之前没有选中全部
            // 判断此次是否选中了全部
            this.isContainAll = this.pointForm.level.some(value => value === -1)
            // 如果此次选中了全部
            if (this.isContainAll) {
              // 则去除其他，只保留全部，默认value=-1 是全部
              this.pointForm.level = [-1]
            } else {
              // 如果当前不包含全部，则判断是否其他的等级全选了
              if (this.pointForm.level.length === this.level.filter((val)=>{if(val.levelSwitch==1){return val.levelSwitch}}).length - 1) {
                // 如果其他员工全选了，则也将当前置为全部
                this.pointForm.level = [-1]
                this.isContainAll = true
              }
            }
          }
        }
       
      }else if(type==2){
        //关联店铺
        if (this.isAll) {
          // 只有下拉框的值发生了变化才会进入此方法
          // 如果之前选中了全部，则变化后肯定不包含全部了
          this.isAll = false
          // 则删除第一个全部
          this.pointForm.shopId.splice(0, 1)
        } else {
          // 如果之前没有选中全部
          // 判断此次是否选中了全部
          this.isAll = this.pointForm.shopId.some(value => value === -1)
          // 如果此次选中了全部
          if (this.isAll) {
            // 则去除其他，只保留全部，默认value=-1 是全部
            this.pointForm.shopId = [-1]
          } else {
            // 如果当前不包含全部，则判断是否其他的七个日期全选了
            if (this.pointForm.shopId.length === this.shop.length - 1) {
              // 如果其他员工全选了，则也将当前置为全部
              this.pointForm.shopId = [-1]
              this.isAll = true
            }
          }
        }
      }else{
        //支付方式
        if (this.all) {
          // 只有下拉框的值发生了变化才会进入此方法
          // 如果之前选中了全部，则变化后肯定不包含全部了
          this.all = false
          // 则删除第一个全部
          this.pointForm.payWay.splice(0, 1)
        } else {
          // 如果之前没有选中全部
          // 判断此次是否选中了全部
          this.all = this.pointForm.payWay.some(value => value === 0)
          // 如果此次选中了全部
          if (this.all) {
            // 则去除其他，只保留全部，默认value=-1 是全部
            this.pointForm.payWay = [0]
          } else {
            // 如果当前不包含全部，则判断是否其他的七个日期全选了
            if (this.pointForm.payWay.length === this.payWays.length - 1) {
              // 如果其他员工全选了，则也将当前置为全部
              this.pointForm.payWay = [0]
              this.all = true
            }
          }
        }
      }
    },
    radio4Change(val) {
      console.log(val)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit(this.pointForm);
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
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    selChange(val) {
      console.log(val);
      // this.getList(this.currentPage, this.pageSize, val);
      // this.getLevelList(val);
    },
    checkChange(val) {
      console.log(val);
    },
    change3(val) {
      console.log(val);
      if (val) {
        this.checkList = ["任意"];
      }
    },
    //包含商品
    httpReq1(val) {
      console.log(val.file);
      this.fileList1 = [val.file];
      var _file = val.file;
      console.log(JSON.stringify(val.file));
      var formData = new FormData();
      formData.append("myfiles", _file);
      this.$http
        .post(
          "" + process.env.API_ROOT + "/customer/care/config/uploadSkuExcel",
          formData
        )
        .then(res => {
          console.log("_RequestUploads_", res);
          if (res.data.code == 1) {
            this.pointForm.uploadSkuFileName = _file.name;
            this.pointForm.uploadSkuFileContent = res.data.data;
            this.$message({
              type: "success",
              message: "上传成功"
            });
          } else {
            this.pointForm.uploadSkuFileName = "";
            this.pointForm.uploadSkuFileContent = "";
            this.fileList1 = [];
            this.$message({
              type: "error",
              message: "上传失败，请检查文件是否正确"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.pointForm.uploadSkuFileName = "";
          this.pointForm.uploadSkuFileContent = "";
          this.fileList2 = [];
          alert("系统异常");
        });
    },
    //排除商品
    httpReq2(val) {
      console.log(val.file);
      this.fileList2 = [val.file];
      var _file = val.file;

      var formData = new FormData();
      formData.append("myfiles", _file);
      this.$http
        .post(
          "" + process.env.API_ROOT + "/customer/care/config/uploadSkuExcel",
          formData
        )
        .then(res => {
          console.log("_RequestUploads_", res);
          if (res.data.code == 1) {
            this.pointForm.uploadSkuFileName = _file.name;
            this.pointForm.uploadSkuFileContent = res.data.data;
            this.$message({
              type: "success",
              message: "上传成功"
            });
          } else if (res.data.code == -1) {
            this.pointForm.uploadSkuFileName = "";
            this.pointForm.uploadSkuFileContent = "";
            this.fileList2 = [];

            this.$message({
              type: "error",
              message: "上传失败，请检查文件是否正确"
            });
          } else {
            this.pointForm.uploadSkuFileName = "";
            this.pointForm.uploadSkuFileContent = "";
            this.fileList2 = [];
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.ruleForm.excludeSkuCodes = "";
          this.ruleForm.excludeFileName = "";
          this.fileList2 = [];
          alert("系统异常");
        });
    },
    changeFile1(file, fileList) {
      console.log(file);
      this.fileList1 = fileList;
      this.file1 = file;
      // this.ruleForm.specifyFileName = file.name
      // console.log(this.file)
    },
    changeFile2(file, fileList) {
      // console.log(file)
      this.fileList2 = fileList;
      this.file2 = file;
      // this.ruleForm.excludeFileName = file.name
      // console.log(this.file)
    },
    //模板
    download(type) {
      if (type == 0) {
        var data = [["sku_code"]];
        var blob = new Blob([data.join("\r\n")], {
          type: "application/vnd.ms-excel;charset=UTF-8;"
        });
        let aTag = document.createElement("a");
        // let blob = new Blob(['手机号'],['姓名'],['地址'],{type:'text/plain'});　　// 这个content是下载的文件内容，自己修改
        aTag.download = "商品列表.xlsx"; // 下载的文件名
        aTag.href = URL.createObjectURL(blob);
        aTag.click();
        URL.revokeObjectURL(blob);
      } else if (type == 1) {
        var arr = this.ruleForm.specifySkuCodes.split(",");
        var data = [["sku_code"]];

        arr.forEach(item => {
          var newArr = [];
          newArr.push(item);
          data.push(newArr);
        });
        var blob = new Blob([data.join("\r\n")], {
          type: "application/vnd.ms-excel;charset=UTF-8;"
        });
        let aTag = document.createElement("a");
        // let blob = new Blob(['手机号'],['姓名'],['地址'],{type:'text/plain'});　　// 这个content是下载的文件内容，自己修改
        aTag.download = this.ruleForm.specifyFileName; // 下载的文件名
        aTag.href = URL.createObjectURL(blob);
        aTag.click();
        URL.revokeObjectURL(blob);
      } else {
        var arr = this.ruleForm.excludeSkuCodes.split(",");
        var data = [["sku_code"]];

        arr.forEach(item => {
          var newArr = [];
          newArr.push(item);
          data.push(newArr);
        });
        var blob = new Blob([data.join("\r\n")], {
          type: "application/vnd.ms-excel;charset=UTF-8;"
        });
        let aTag = document.createElement("a");
        // let blob = new Blob(['手机号'],['姓名'],['地址'],{type:'text/plain'});　　// 这个content是下载的文件内容，自己修改
        aTag.download = this.ruleForm.excludeFileName; // 下载的文件名
        aTag.href = URL.createObjectURL(blob);
        aTag.click();
        URL.revokeObjectURL(blob);
      }
    },
    uploadOk(response, file, fileList) {
      console.log(response);
      if (response.code == 1) {
        this.$message({
          type: "success",
          message: response.msg
        });
      } else {
        this.$message({
          type: "error",
          message: response.msg
        });
        this.fileList = [];
      }
    },

    handleOver(file, fileList) {
      console.log(file, fileList);
      this.$message({
        type: "error",
        message: "只能选择一个模板"
      });
    },
    //移除文件
    handleRemove1(file, fileList) {
      // console.log(file, fileList);
      // this.ruleForm.specifyFileName=''
      // this.ruleForm.specifySkuCodes=''
    },
    handleRemove2(file, fileList) {
      // console.log(file, fileList);
      // this.ruleForm.excludeSkuCodes=''
      // this.ruleForm.excludeFileName=''
    },
    handlePreview(file) {
      // console.log(file);
    },

    // 获取商户列表
    getStore(shopid) {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/merchantInfo?shopId=" + shopid
      })
        .then(res => {
          console.log("商户列表", res);
          if (res.data.code == 1) {
            this.store = res.data.data;
            if(res.data.data.length!=0){
              console.log(0)
            this.pointForm.store = this.store[0].apiMerchantId;
            this.getList(this.currentPage, this.pageSize, this.pointForm.store);
            this.getLevelList(this.pointForm.store);
            }else{
              console.log(1)

              this.pointForm.store='';
              this.getLevelList('')
              this.getList(this.currentPage, this.pageSize, this.pointForm.store);

            }
          }else{


          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    //获取关联店铺 列表
    getShop(apiMerchantId) {
      this.$http({
        method: "get",
        url:
          "" + process.env.API_ROOT + "/shopIds?apiMerchantId=" + apiMerchantId
      })
        .then(res => {
          console.log("商户下店铺列表", res);
          if (res.data.code == 1) {
            this.shop = res.data.data;
            res.data.data.forEach(item=>{
              this.shopAll.push(item.shop_info_id)
            })
            console.log(this.shopAll)
            if(res.data.data.length!=0){
              this.shop.unshift({
                "shop_name" :'全部店铺',
                "shop_info_id" : -1
              })
            }

          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },

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
            this.levelAll=[]
            this.level = res.data.data;
            console.log(res.data.data.filter((val)=>{if(val.levelSwitch==1){return val.levelSwitch}}))
            res.data.data.filter((val)=>{if(val.levelSwitch==1){return val.levelSwitch}}).forEach(item=>{
              console.log(item)
              this.levelAll.push(item.apiCustomerLevelConfId)
            })
            console.log(this.levelAll)
            if(this.levelAll.length!=0){
              this.level.unshift({
                  'levelSwitch':1,
                  "customerLevelName" :'全部等级',
                  "apiCustomerLevelConfId" : -1
              })
            }
            
            console.log(this.level)
            console.log(this.arr)
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //新增和编辑积分
    submit(form) {
      var arr1 = [],str = '';

      this.payWays.forEach(item=>{
        if(item.value){
          arr1.push(item.value)
        }
      })
      str = arr1.join(',')
      if(this.pointForm.merchantPointConfigId){
        console.log('编辑')
      if (this.pointForm.radio4 == 1) {
        console.log(form.level[0])
        var data = {
          supportPaymentMethod:form.payWay.join(',').indexOf('0')!= -1 ? str : form.payWay.join(','),
          //	积分规则主键id
          merchantPointConfigId: form.merchantPointConfigId,
          //	规则名称
          pointName: form.point,
          //	规则生效日期
          configValidDate: form.time[0],
          //	规则失效日期
          configInvalidDate: form.time[1],
          // 	等级集合
          levelId: form.level[0] ==-1 ? this.levelAll: form.level,
          // 	订单金额
          orderAmountAstrict: form.money,
          //	入账类型：1、整元入账 2、整分入账
          entryAccountType: form.radio2,
          //	积分比例 如1表示1元算1积分，2表示2元算一积分
          pointScale: form.scale,
          // 	是否余数作废(0:否；1:是)
          isModInvalid: form.checked ? 1 : 0,
          // 	入账倍数
          entryAccountMult: form.times,
          // 	积分生效时间
          pointFreezeDay: this.pointForm.radio4 == 1 ? form.date : form.date1,
          // 	序号:数值越小优先级越高
          orderNumber: form.radio1,
          // 	商品包含关系(INCLUDE:包含；EXCLUDE:排除;ALL:全场)
          skuIncludeRelation:
            form.radio6 == 1
              ? "ALL"
              : form.radio6 == 2
              ? "INCLUDE"
              : "包含；EXCLUDE",
          // 	积分有效时间类型（0：滚动有效期，1：统一有效期）
          pointValidType: form.radio3,
          // 	滚动有效期，数据表现形式有两种 如（a：365，b：1-2-18）（用英文横杠分隔）
          pointRollValid:
            this.pointForm.radio3 == 0
              ? this.pointForm.day
              : this.pointForm.radio3 == 1
              ? this.pointForm.scrollYear +
                "-" +
                this.pointForm.scrollMonth +
                "-" +
                this.pointForm.scrollDay
              : "",
          //统一有效期
          pointSameValid:
            this.pointForm.radio3 == 2
              ? this.pointForm.uniteYear +
                "-" +
                this.pointForm.uniteMonth +
                "-" +
                this.pointForm.uniteDay
              : "",
          // 	积分规则类型(1：交易积分，2：活动积分)
          pointType: this.pointForm.radio4,
          // 	上传文件名
          uploadSkuFileName: form.uploadSkuFileName,
          // 	上传文件内容
          uploadSkuFileContent: form.uploadSkuFileContent,
          // 	店铺集合
          shopId:  form.shopId[0] ==-1 ? this.shopAll: form.shopId,
          apiMerchantId: form.store,
          entryType: form.radio5,
          campainPoint: form.num
        };
      } else {
        var data = {
          //	积分规则主键id
          merchantPointConfigId: form.merchantPointConfigId,
          //	规则名称
          pointName: form.point,
          //	规则生效日期
          configValidDate: form.time[0],
          //	规则失效日期
          configInvalidDate: form.time[1],
          // 	等级集合
          levelId: form.level[0] ==-1 ? this.levelAll: form.level,
          // 	积分生效时间
          pointFreezeDay: this.pointForm.radio4 == 1 ? form.date : form.date1,
          // 	积分有效时间类型（0：滚动有效期，1：统一有效期）
          pointValidType: form.radio3,
          // 	滚动有效期，数据表现形式有两种 如（a：365，b：1-2-18）（用英文横杠分隔）
          pointRollValid:
            this.pointForm.radio7 == 0
              ? this.pointForm.day1
              : this.pointForm.radio7 == 1
              ? this.pointForm.scrollYear1 +
                "-" +
                this.pointForm.scrollMonth1 +
                "-" +
                this.pointForm.scrollDay1
              : "",
          //统一有效期
          pointSameValid:
            this.pointForm.radio7 == 2
              ? this.pointForm.uniteYear1 +
                "-" +
                this.pointForm.uniteMonth1 +
                "-" +
                this.pointForm.uniteDay1
              : "",
          // 	积分规则类型(1：交易积分，2：活动积分)
          pointType: this.pointForm.radio4,
          apiMerchantId: form.store,
          entryType: '',
           //活动类型
          campainType:this.choose=='邀请好友' ? 'INVITE_FRIENDS':this.choose=='完善资料' ? 'PERFECT_INFO' :'OTHER',
          //活动规则 json字符串
          campainRules:this.choose=='邀请好友' ? JSON.stringify(this.pointForm.valueArr):this.choose=='完善资料' ?JSON.stringify(this.pointForm.jsonData) :'',
          //积分数量
          campainPoint:this.choose=='其他' ? form.num :''
        };
      }
      }else{
        console.log('新增')

      if (this.pointForm.radio4 == 1) {
          console.log(form.level[0])
          var data = {
            supportPaymentMethod:form.payWay.join(',').indexOf('0')!= -1 ? str : form.payWay.join(','),
            //	积分规则主键id
            merchantPointConfigId: form.merchantPointConfigId,
            //	规则名称
            pointName: form.point,
            //	规则生效日期
            configValidDate: form.time[0],
            //	规则失效日期
            configInvalidDate: form.time[1],
            // 	等级集合
            levelId: form.level[0] ==-1 ? this.levelAll: form.level,
            // 	订单金额
            orderAmountAstrict: form.money,
            //	入账类型：1、整元入账 2、整分入账
            entryAccountType: form.radio2,
            //	积分比例 如1表示1元算1积分，2表示2元算一积分
            pointScale: form.scale,
            // 	是否余数作废(0:否；1:是)
            isModInvalid: form.checked ? 1 : 0,
            // 	入账倍数
            entryAccountMult: form.times,
            // 	积分生效时间
            pointFreezeDay: this.pointForm.radio4 == 1 ? form.date : form.date1,
            // 	序号:数值越小优先级越高
            orderNumber: form.radio1,
            // 	商品包含关系(INCLUDE:包含；EXCLUDE:排除;ALL:全场)
            skuIncludeRelation:
              form.radio6 == 1
                ? "ALL"
                : form.radio6 == 2
                ? "INCLUDE"
                : "包含；EXCLUDE",
            // 	积分有效时间类型（0：滚动有效期，1：统一有效期）
            pointValidType: form.radio3,
            // 	滚动有效期，数据表现形式有两种 如（a：365，b：1-2-18）（用英文横杠分隔）
            pointRollValid:
              this.pointForm.radio3 == 0
                ? this.pointForm.day
                : this.pointForm.radio3 == 1
                ? this.pointForm.scrollYear +
                  "-" +
                  this.pointForm.scrollMonth +
                  "-" +
                  this.pointForm.scrollDay
                : "",
            //统一有效期
            pointSameValid:
              this.pointForm.radio3 == 2
                ? this.pointForm.uniteYear +
                  "-" +
                  this.pointForm.uniteMonth +
                  "-" +
                  this.pointForm.uniteDay
                : "",
            // 	积分规则类型(1：交易积分，2：活动积分)
            pointType: this.pointForm.radio4,
            // 	上传文件名
            uploadSkuFileName: form.uploadSkuFileName,
            // 	上传文件内容
            uploadSkuFileContent: form.uploadSkuFileContent,
            // 	店铺集合
            shopId:  form.shopId[0] ==-1 ? this.shopAll: form.shopId,
            apiMerchantId: form.store,
            entryType: form.radio5,
            campainPoint: form.num
          };
      } else {
        var data = {
          //	积分规则主键id
          merchantPointConfigId: form.merchantPointConfigId,
          //	规则名称
          pointName: form.point,
          //	规则生效日期
          configValidDate: form.time[0],
          //	规则失效日期
          configInvalidDate: form.time[1],
          // 	等级集合
          levelId: form.level[0] ==-1 ? this.levelAll: form.level,
          // 	积分生效时间
          pointFreezeDay: this.pointForm.radio4 == 1 ? form.date : form.date1,
          // 	积分有效时间类型（0：滚动有效期，1：统一有效期）
          pointValidType: form.radio3,
          // 	滚动有效期，数据表现形式有两种 如（a：365，b：1-2-18）（用英文横杠分隔）
          pointRollValid:
            this.pointForm.radio7 == 0
              ? this.pointForm.day1
              : this.pointForm.radio7 == 1
              ? this.pointForm.scrollYear1 +
                "-" +
                this.pointForm.scrollMonth1 +
                "-" +
                this.pointForm.scrollDay1
              : "",
          //统一有效期
          pointSameValid:
            this.pointForm.radio7 == 2
              ? this.pointForm.uniteYear1 +
                "-" +
                this.pointForm.uniteMonth1 +
                "-" +
                this.pointForm.uniteDay1
              : "",
          // 	积分规则类型(1：交易积分，2：活动积分)
          pointType: this.pointForm.radio4,
          apiMerchantId: form.store,
          entryType: form.radio5,
           //活动类型
          campainType:this.choose=='邀请好友' ? 'INVITE_FRIENDS':this.choose=='完善资料' ? 'PERFECT_INFO' :'OTHER',
          //活动规则 json字符串
          campainRules:this.choose=='邀请好友' ? JSON.stringify(this.pointForm.valueArr):this.choose=='完善资料' ?JSON.stringify(this.pointForm.jsonData) :'',
          //积分数量
          campainPoint:this.choose=='其他' ? form.num :''
        };
      }
      }

      this.$http
        .post(process.env.API_ROOT + "/point/config", data)
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.none = true;
            this.$message({
              type: "success",
              message: res.data.msg
            });

            this.getList(this.currentPage, this.pageSize, this.pointForm.store);

            this.clear();
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除按钮
    del(index, rows) {
      this.$confirm("确认删除该积分规则？", "删除", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$http
            .post(process.env.API_ROOT + "/point/config/del", {
              pointType: this.type,
              merchantPointConfigId:
                this.type == 1
                  ? rows[index].merchantPointConfigId
                  : rows[index].shopCampainPointId
            })
            .then(res => {
              if (res.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "删除积分成功"
                });
                this.getList(
                  this.currentPage,
                  this.pageSize,
                  this.pointForm.store
                );
              }
            })
            .catch(error => {
              console.log(error);
              alert("登入失败");
            });
        })
        .catch(action => {
          this.$message({
            type: "fail",
            message: "已取消操作"
          });
        });
    },
    //查看按钮
    check(index, rows) {
      this.look = true;
      this.none = false;
      this.getMore(index, rows);
    },
    //编辑按钮
    edit(index, rows) {
      this.none = false;
      this.getMore(index, rows);
    },
    rowClick(row, event, column) {
      console.log(row);
    },
    // 清空表单
    clear() {
      this.resetForm("pointForm");

      this.pointForm.uploadSkuFileName = "";
      this.pointForm.uploadSkuFileContent = "";
      this.pointForm.payWay =[0];
      // this.pointForm.merchantPointConfigId=''
      this.pointForm.day = "";
      this.pointForm.day1 = "";
      this.pointForm.scrollYear = "";
      this.pointForm.scrollMonth = "";
      this.pointForm.scrollDay = "";
      this.pointForm.uniteYear = "";
      this.pointForm.uniteMonth = "";
      this.pointForm.uniteDay = "";
      this.pointForm.scrollYear1 = "";
      this.pointForm.scrollMonth1 = "";
      this.pointForm.scrollDay1 = "";
      this.pointForm.uniteYear1 = "";
      this.pointForm.uniteMonth1 = "";
      this.pointForm.uniteDay1 = "";
      this.pointForm.num = "";
      this.pointForm.scale = "";
      this.pointForm.times = "";
      this.pointForm.money = "";
      this.pointForm.point = "";
      this.pointForm.time = [];
      this.pointForm.level = [];
      this.pointForm.radio1 = 1;
      this.pointForm.radio2 = 1;
      this.pointForm.radio3 = 0;
      this.pointForm.radio7 = 0;
      this.pointForm.radio4= 1;
      this.pointForm.radio5 = 0;
      this.pointForm.radio6 = 1;
      this.pointForm.checked = false;
      this.pointForm.date = "";
      this.pointForm.date1 = "";
      this.pointForm.shopId = [];
      this.pointForm.valueArr=[{"field":"","value":"","describe":""}];
      this.pointForm.jsonData=[
        {
          "field":"REAL_NAME",
          "value":"",
          "describe":"姓名"
        },
        {
          "field":"EMALL",
          "value":"",
          "describe":"邮箱"
        },
        {
          "field":"GENDER",
          "value":"",
          "describe":"性别"
        },
        {
          "field":"BIRTHDAY",
          "value":"",
          "describe":"生日"
        },
        {
          "field":"CITY",
          "value":"",
          "describe":"城市"
        },
        {
          "field":"HEIGHT",
          "value":"",
          "describe":"身高"
        },
        {
          "field":"WEIGHT",
          "value":"",
          "describe":"体重"
        }
      ]
    },
    // 启用按钮
    start(index, rows) {
      if (
        new Date(rows[index].configInvalidDate).getTime() > new Date().getTime()
      ) {
        this.$confirm("请确定是否启用此积分规则", "启用", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        })
          .then(() => {
            this.$http
              .post(process.env.API_ROOT + "/point/config/prohibit", {
                pointType: this.type,
                merchantPointConfigId:
                  this.type == 1
                    ? rows[index].merchantPointConfigId
                    : rows[index].shopCampainPointId,
                configStatus:
                  new Date().getTime() >
                  new Date(rows[index].configInvalidDate).getTime()
                    ? 0
                    : 1
              })
              .then(res => {
                if (res.data.code == 1) {
                  console.log(res);
                  this.getList(
                    this.currentPage,
                    this.pageSize,
                    this.pointForm.store
                  );
                  this.$message({
                    type: "success",
                    message: "启用积分成功"
                  });
                }
              })
              .catch(error => {
                console.log(error);
                alert("登入失败");
              });
          })
          .catch(action => {
            this.$message({
              type: "fail",
              message: "已取消操作"
            });
          });
      } else {
        this.$message({
          type: "error",
          message: "积分规则已失效"
        });
      }
    },
    //禁用按钮
    stop(index, rows) {
      this.$confirm("请确定是否禁用此积分规则", "禁用", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$http
            .post(process.env.API_ROOT + "/point/config/prohibit", {
              pointType: this.type,
              merchantPointConfigId:
                this.type == 1
                  ? rows[index].merchantPointConfigId
                  : rows[index].shopCampainPointId,
              configStatus: 3
            })
            .then(res => {
              if (res.data.code == 1) {
                console.log(res);
                this.getList(
                  this.currentPage,
                  this.pageSize,
                  this.pointForm.store
                );
                this.$message({
                  type: "success",
                  message: "禁用积分成功"
                });
              }
            })
            .catch(error => {
              console.log(error);
              alert("登入失败");
            });
        })
        .catch(action => {
          this.$message({
            type: "fail",
            message: "已取消操作"
          });
        });
    },
    //搜索事件
    search() {
      this.currentPage=1
      this.getList(this.currentPage, this.pageSize, this.pointForm.store);
    },
    //时间选择 事件
    selTime() {
      this.selPointTime = this.selPointTime ? this.selPointTime : [];
      console.log(this.selPointTime);
    },
    //查询短信营销详情  事件
    getMore(index, rows) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/point/configInfo?merchantPointConfigId=" +
          (rows[index].shopCampainPointId
            ? rows[index].shopCampainPointId
            : rows[index].merchantPointConfigId) +
          "&pointType=" +
          this.type
      })
        .then(res => {
          console.log("积分详情", res);
          if (res.data.code == 1) {
            //id
            this.pointForm.merchantPointConfigId =this.type == 1? res.data.data.merchantPointConfigId: rows[index].shopCampainPointId;
            //积分名称
            this.pointForm.point = res.data.data.pointName;
            //规则生效时间
            this.pointForm.time.push(res.data.data.configValidDate);
            this.pointForm.time.push(res.data.data.configInvalidDate);
            //详情里面需要的等级信息
            if(res.data.data.levelId.length==this.levelAll.length&&this.levelAll.length!=0){
              this.pointForm.level=[-1]
            }else{
              this.pointForm.level = res.data.data.levelId;
            }
            var arr = [];
            res.data.data.levelId.forEach(item => {
              this.level.forEach(val => {
                if (item == val.apiCustomerLevelConfId) {
                  arr.push(val.customerLevelName);
                }
              });
            });
            this.pointForm.levelMsg = arr.join(",");
            //积分类型
            this.pointForm.radio4 = this.type;
            //交易积分
            if (this.type == 1) {
              //入账类型
              this.pointForm.radio5 = res.data.data.entryType;
              
              if (res.data.data.skuIncludeRelation == "INCLUDE") {
                this.pointForm.radio6 = 2;
                this.fileList1 = [{ name: res.data.data.uploadSkuFileName }];
              } else if (res.data.data.skuIncludeRelation == "ALL") {
                this.pointForm.radio6 = 1;
              } else {
                this.pointForm.radio6 = 3;
                this.fileList2 = [{ name: res.data.data.uploadSkuFileName }];
              }
              this.pointForm.money = res.data.data.orderAmountAstrict;

              this.pointForm.radio2 = res.data.data.entryAccountType;

              this.pointForm.scale = res.data.data.pointScale;

              this.pointForm.times = res.data.data.entryAccountMult;


              this.pointForm.radio1 = res.data.data.orderNumber;

              this.pointForm.uploadSkuFileContent =
                res.data.data.uploadSkuFileContent;

              // console.log("文件名", this.pointForm.uploadSkuFileName);

              // console.log("ID", this.pointForm.merchantPointConfigId);

              //多余金额作废
              this.pointForm.checked =res.data.data.isModInvalid == 0 ? false : true;
              //上传文件
              this.pointForm.uploadSkuFileName =res.data.data.uploadSkuFileName;
              this.pointForm.flieName = res.data.data.uploadSkuFileName;
              //详情里面的关联店铺信息
              if(res.data.data.shopId.length==this.shopAll.length){
                this.pointForm.shopId=[-1]
              }else{
                this.pointForm.shopId = res.data.data.shopId;
              }
              console.log(res.data.data.shopId)
              var arr1 = [];
              res.data.data.shopId.forEach(item => {
                this.shop.forEach(val => {
                  if (item == val.shop_info_id) {
                    arr1.push(val.shop_name);
                  }
                });
              });
              this.pointForm.shopMsg = arr1.join(",");
              //积分生效时间
              this.pointForm.date = res.data.data.pointFreezeDay;
              //滚动有效期
              if (res.data.data.pointRollValid) {
                if (res.data.data.pointRollValid.indexOf("-") == -1) {
                  this.pointForm.day = res.data.data.pointRollValid;
                  this.pointForm.radio3 = 0;
                } else {
                  var arr = res.data.data.pointRollValid.split("-");
                  this.pointForm.scrollYear = arr[0];
                  this.pointForm.scrollMonth = arr[1];
                  this.pointForm.scrollDay = arr[2];
                  this.pointForm.radio3 = 1;
                }
              } else {
                var arr = res.data.data.pointSameValid.split("-");
                this.pointForm.uniteYear = arr[0];
                this.pointForm.uniteMonth = arr[1];
                this.pointForm.uniteDay = arr[2];
                this.pointForm.radio3 = 2;
              }
              if(res.data.data.supportPaymentMethod){
                this.pointForm.payWay = res.data.data.supportPaymentMethod.split(',')

              }else{
                this.pointForm.payWay =[]
              }
              //活动积分
            } else {
              //积分数量
              this.pointForm.num =this.type == 2 ? res.data.data.campainPoint : "";
              //积分生效时间
              this.pointForm.date1 = res.data.data.pointFreezeDay;
              //campainType
              // this.choose=='邀请好友' ? 'INVITE_FRIENDS':this.choose=='完善资料' ? 'PERFECT_INFO' :'OTHER',
              if(res.data.data.campainType =='INVITE_FRIENDS'){
                this.choose='邀请好友'
                this.pointForm.valueArr =JSON.parse (res.data.data.campainRules)
              }
              if(res.data.data.campainType =='PERFECT_INFO'){
                this.checkArr = []
                this.choose='完善资料'
                this.pointForm.jsonData = JSON.parse (res.data.data.campainRules)
                this.pointForm.jsonData.forEach(item=>{
                  if(item.value){
                    if(this.checkArr.indexOf(item.describe)==-1){
                    this.checkArr.push(item.describe)
                  }
                  }
                })
                console.log(this.checkArr)
              }
              if(res.data.data.campainType =='OTHER'){
                this.choose='其他'
              }
              
              //滚动有效期
              if (res.data.data.pointRollValid) {
                if (res.data.data.pointRollValid.indexOf("-") == -1) {
                  this.pointForm.day1 = res.data.data.pointRollValid;
                  this.pointForm.radio7 = 0;
                } else {
                  var arr = res.data.data.pointRollValid.split("-");
                  this.pointForm.scrollYear1 = arr[0];
                  this.pointForm.scrollMonth1 = arr[1];
                  this.pointForm.scrollDay1 = arr[2];
                  this.pointForm.radio7 = 1;
                }
              } else {
                var arr = res.data.data.pointSameValid.split("-");
                this.pointForm.uniteYear1 = arr[0];
                this.pointForm.uniteMonth1 = arr[1];
                this.pointForm.uniteDay1 = arr[2];
                this.pointForm.radio7 = 2;
              }
            }
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
            this.getStore(this.shopId);
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    //获取积分列表
    getList(currentPage, pageSize, apiMerchantId) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/point/configs?pageIndex=" +
          currentPage +
          "&pageSize=" +
          pageSize +
          "&apiMerchantId=" +
          apiMerchantId +
          "&pointType=" +
          this.type +
          "&startTime=" +
          (this.selPointTime ? this.selPointTime[0] : "") +
          "&endTime=" +
          (this.selPointTime ? this.selPointTime[1] : "") +
          "&pointName=" +
          (this.selPointStr ? this.selPointStr : "")
      })
        .then(res => {
          console.log("积分列表", res);
          if (res.data.code == 1) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          }else{
            this.tableData = [];
            this.total = 0;
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    // 点击返回按钮
    back() {
      this.fileList = [];
      this.clear();
      this.look = false;
      this.none = true;
    },
    //点击新增积分
    add() {
      if (this.pointForm.store) {
        this.none = false;
        this.pointForm.merchantPointConfigId = "";
      } else {
        this.$message({
          type: "error",
          message: "该店铺没有绑定商户"
        });
      }
    },
    close() {},
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList(this.currentPage, this.pageSize, this.pointForm.store);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList(this.currentPage, this.pageSize, this.pointForm.store);

    },
    // 选择全部，活动或者快照名称
    a(command) {
      this.select = command.name;
      console.log(this.select);
      if (this.select == "交易积分") {
        this.type = 1;
        this.currentPage=1
        this.getList(this.currentPage, this.pageSize, this.pointForm.store);
      }
      if (this.select == "活动积分") {
        this.type = 2;
        this.currentPage=1
        this.getList(this.currentPage, this.pageSize, this.pointForm.store);
      }
    },
    c(command) {
      this.choose = command.name;
      console.log(this.choose);
      if (this.choose == "完善资料") {
        this.checkArr=['姓名']
      }
      if (this.choose == "邀请好友") {
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
.point {
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
  .report {
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
        span {
          color: #3366ff;
        }
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
  .head {
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
      margin-right: 20px;
      margin-left: 50px;
    }
  }
  .form {
    h2 {
      font-size: 16px;
      color: #333333;
      letter-spacing: 0.5px;
      line-height: 16px;
      font-weight: bold;
      padding: 20px 0;
    }
    .baseMsg {
      margin: 0 20px;
      background: #fff;
      padding: 0 30px 5px;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
      .name {
        width: 20%;
      }
      .level {
        width: 20%;
      }
    }
    .mb {
      color: #606266;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
      margin: 10px 20px;
      background: #fff;
      padding: 0 30px 2px;
      .el-dropdown{
        color: #3366ff;
        .el-dropdown-link1{
          color: #3366ff
        }
      } 
      .range {
        .el-radio {
          height: 50px;
          line-height: 50px;
          .el-radio__input {
            float: left;
            margin-top: 18px;
          }
          .el-radio__label {
            float: left;
          }
        }
      }
      .more {
        margin-left: 20px;
      }
      .money {
        width: 10%;
      }
      .times {
        width: 10%;
      }
      .scale {
        width: 10%;
      }
      .day {
        width: 100px;
      }
      .way {
        width: 20%;
      }
      .num {
        width: 10%;
      }
      .date {
        width: 10%;
      }
      .two {
        .el-radio__label {
          padding-left: 15px;
        }
        display: block;
        margin-left: 0;
      }
    }
    .sub {
      .el-form-item__content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .box {
    margin: 0 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    position: relative;

    .btns {
      .level {
        width: 10%;
        margin: 12px 0 0 32px;

        .el-input__inner {
          border-radius: 0;
        }
      }
      .add {
        font-family: 'zt2';
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        background: #3366ff;
        border-radius: 2px;
        height: 32px;
        line-height: 10px;
        border: none;
        margin: 12px 0 12px 20px;
        float: left;
      }
      .drop {
        float: right;
        width: 286px;
        height: 32px;
        line-height: 30px;
        margin: 12px 0 12px 20px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        .el-dropdown-link {
          display: inline-block;
          height: 30px;
          border-right: 1px solid #ccc;
          padding: 0 10px;
          line-height: 30px;
        }
        .sel {
          width: 180px;
          .el-input__inner {
            border: none;
            height: 28px;
          }
        }
        .el-dropdown {
          float: left;

          .el-dropdown-menu__item {
            width: 100px;
          }
        }
      }
      .el-date-editor {
        float: right;
        margin: 12px 0 12px 20px;
        height: 32px;
        line-height: 32px;
        border-radius: 0;
        .el-range-separator {
          line-height: 32px;
          height: 32px;
        }
      }
      .sec {
        font-family: 'zt2';
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        border: 1px solid #3366ff;
        border-radius: 2px;
        height: 32px;
        line-height: 8px;
        margin: 12px 0 12px 20px;
        float: right;
        color: #3366ff;
        margin-right: 20px;
      }
    }
    .tab {
    .empty{
        text-align: center;
        width: 50%;
        height: 50%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        p{
            font-size: 14px;
            color: #999999;
            letter-spacing: 0.44px;
            text-align: center;
            line-height: 14px;
        }
    }  
      .el-table {
        td {
          height: 64px;
          line-height: 64px;
          .cell {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
            .el-dropdown {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #3366ff;
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
  .look {
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
  .dis{
    span{
    color: #ccc

    }
  }
  .el-checkbox-group{
    div {
      color: #333;
      font-size: 14px;
    }
  }
}
</style>
