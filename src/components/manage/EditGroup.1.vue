<template>
  <div class="addGroup">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户分组</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>
        <i class="el-icon-back" @click="back"></i>
        <span >编辑用户分组</span>
      </h1>
    </div>
    <div class="addBox clear">
      <el-form
          :model="form"
          ref="form"
          label-width="auto"
          class="form"
        >
        <div class="choose">
          <h2>人群筛选</h2>
          <el-form-item label="分组名称：" prop='name' :rules='rules.name' label-position="top">
              <el-input v-model="form.name" class="name" maxlength='10' ></el-input>
              <el-button class="insertGroup" type='primary' @click="add"> 引入已有分组</el-button>

          </el-form-item>
          <el-form-item label="分组目录：" prop='catalog' :rules='rules.catalog' label-position="top">
            <el-select v-model="form.catalog" placeholder="请选择分组目录"  class="catalog" >
              <el-option
                v-for="item in catalogList"
                :key="item.catalog_id"
                :label="item.catalog_name"
                :value="item.catalog_id">
              </el-option>
            </el-select>
            <el-button class="addCatalog" @click="addCatalog">新建分组目录</el-button>

          </el-form-item>
        </div>
        <div class="tag">
          <h2>已选标签</h2>
          <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  标签之间的关系为 「并且」, 标签值之间的关系为「或者」</p>
          <div class="empty" v-if="toggle">
            <div>
              <img src="../../assets/img/none.png" alt width="140" height="140">
            </div>
            <p :style="{'marginTop': '23px'}">暂无已选条件</p>
            <p :style="{'marginTop': '23px'}" class="last">点击右侧添加筛选维度，精准定位目标客户</p>
          </div>

          <!-- <BaseMsg v-on:data='receiveBaseMsg' :changeValue='change'  :rules='rules'  />
          <Pro v-on:data='receivePro' :proValue='pro'  />
          <RfM v-on:data='receiveRfm' :rfm='rfm' />
          <Deal v-on:data='receiveDeal' :deal='deal' />
          <Marketing v-on:data='receiveMarketing' :marketing='marketing' /> -->

          <div class="base">
            <el-form-item label="性别：" prop='sex' :rules='rules.sex' label-position="left" v-if="change.value1">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日：" :prop='form.birthCondition==1 || form.birthCondition==3 ? "date" :"daterange"' :rules='form.birthCondition==1 || form.birthCondition==3 ? rules.date :rules.daterange' label-position="left" v-if="change.value2">
              <el-select v-model="form.birthCondition" class placeholder="请选则筛选条件">
                <el-option
                  v-for="item in birthConditions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="form.birthCondition==1||form.birthCondition==3"
                v-model="form.date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
              ></el-date-picker>
              <el-date-picker
                v-if="form.birthCondition==2"
                v-model="form.daterange"
                type="daterange"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="手机号：" prop='mobile' :rules='rules.mobile' label-position="left" v-if="change.value3">
              <el-select
                v-model="form.mobile"
                placeholder="请选择手机号码前缀"
                class
                multiple
                :collapse-tags="true"
                @change="changeStaff"
              >
                <el-option v-for="item in mobiles" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="积分：" :prop='form.pointCondition==3|| form.pointCondition==1 ? "point" : "minPoint" ' :rules='form.pointCondition==3|| form.pointCondition==1 ?rules.point : rules.minPoint' label-position="left" v-if="change.value4">
              <el-select v-model="form.pointType" class placeholder="请选则筛选条件">
                <el-option v-for="item in pointTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>

              <el-select v-model="form.pointCondition" class v-if="form.pointType" placeholder="请选则筛选条件">
                <el-option
                  v-for="item in pointConditions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <p
                style="display:inline-block;width:20%"
                v-if="form.pointType &&( form.pointCondition==3|| form.pointCondition==1)"
              >
                <el-input v-model="form.point" placeholder="请输入积分数量"></el-input>
              </p>

              <p style="display:inline-block;width:40%" v-if="form.pointType && form.pointCondition==2">
                <el-input style="width:40%" v-model="form.minPoint" placeholder="请输入积分数量最小值"></el-input>-
                <el-input placeholder="请输入积分数量最大值" style="width:40%" v-model="form.maxPoint"></el-input>
              </p>
            </el-form-item>
            <el-form-item label="等级：" prop='level' :rules='rules.level' label-position="left" v-if="change.value5" >
              

              <el-select
                v-model="form.store"
                placeholder="请选择商户"
                filterable
                class="level"
                @change="changeStore"
              >
                <el-option
                  v-for="item in stores"
                  :key="item.api_merchant_id"
                  :label="item.api_merchant_name"
                  :value="item.api_merchant_id"
                ></el-option>
              </el-select>


                
              <el-select v-model="form.levelType" v-if="form.store"  class placeholder="请选则筛选条件">
                <el-option v-for="item in levelTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>

              <el-select
                v-if="form.levelType"
                v-model="form.level"
                multiple
                placeholder="请选择会员等级"
                filterable
                class="level"
                collapse-tags
              >
                <el-option
                  v-for="item in levelList.filter((val)=>{if(val.levelSwitch==1){return val.levelSwitch}})"
                  :key="item.apiCustomerLevelConfId"
                  :label="item.customerLevelName"
                  :value="item.apiCustomerLevelConfId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地区：" prop='city' label-position="left" v-if="change.value6" :rules='rules.city'>
              <el-select v-model="form.pro" class @change="changePro" placeholder="请选择省份">
                <el-option v-for="item in pros" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>

              <el-select
                v-if="form.pro"
                v-model="form.city"
                placeholder="请选择城市"
                filterable
                class="level"
                @change="changeCity"
              >
                <el-option v-for="item in citys" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入会时间："  label-position="left " v-if="change.value7" :prop='form.entryTimeCondition==2? "entryTimerange":"entryTime"' :rules='form.entryTimeCondition==2 ? rules.entryTimerange:rules.entryTime'>
              <el-select v-model="form.entryTimeCondition" class placeholder="请选择筛选条件">
                <el-option
                  v-for="item in birthConditions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="form.entryTimeCondition==1||form.entryTimeCondition==3"
                v-model="form.entryTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
              ></el-date-picker>

              <el-date-picker
                v-if="form.entryTimeCondition==2"
                v-model="form.entryTimerange"
                type="daterange"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="邮箱：" prop='checkedCities' label-position="left" v-if="change.value8" :rules='rules.checkedCities'>
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="form.checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <el-checkbox-group
                v-model="form.checkedCities"
                @change="handleCheckedCitiesChange"
                style="display:inline-block"
              >
                <el-checkbox label="@qq.com"></el-checkbox>
                <el-checkbox label="@163.com"></el-checkbox>
                <el-checkbox label="@sina.com"></el-checkbox>
                <el-checkbox label="其他"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="客户来源：" prop='source' label-position="left" v-if="change.value9" :rules='rules.source'>
              <el-select v-model="form.sourceCondition" class placeholder="请选则筛选条件">
                <el-option v-for="item in levelTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="form.source" class placeholder="请选则客户来源" v-if="form.sourceCondition">
                <el-option v-for="item in sources" :key="item.marketingPlaceCode" :label="item.marketingPlaceName" :value="item.marketingPlaceCode"></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="rfm">
            <el-form-item label="首次付款时间：" :prop='form.payTimeType==1 ? "payTime":"payTimeMinDay" ' :rules='form.payTimeType==1 ? rules.payTime:rules.payTimeMinDay'  label-position="left" v-if="rfm.value1">
              <el-select v-model="form.payTimeType"  placeholder="请选则筛选条件">
                <el-option
                  v-for="item in payTimeTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="form.payTimeType==1"
                v-model="form.payTime"
                type="daterange"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
              ></el-date-picker>

              <p
                style="display:inline-block;width:50%"
                v-if="form.payTimeType==2"
              >
                <el-input v-model="form.payTimeMinDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> - 
                <el-input v-model="form.payTimeMaxDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> 天
              </p>
            </el-form-item>

            <el-form-item label="最近一次付款时间：" :prop='form.lastPayType==1 ? "lastPayTime":"lastPayTimeMinDay" ' :rules='form.lastPayType==1 ? rules.lastPayTime:rules.lastPayTimeMinDay' label-position="left" v-if="rfm.value2">
              <el-select v-model="form.lastPayType"  placeholder="请选则筛选条件">
                <el-option
                  v-for="item in payTimeTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="form.lastPayType==1"
                v-model="form.lastPayTime"
                value-format="yyyy-MM-dd"
                type="daterange"
                placeholder="请选择日期"
              ></el-date-picker>

              <p
                style="display:inline-block;width:50%"
                v-if="form.lastPayType==2"
              >
                <el-input v-model="form.lastPayTimeMinDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> - 
                <el-input v-model="form.lastPayTimeMaxDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> 天
              </p>
            </el-form-item>

            <el-form-item label="首次下单时间：" :prop='form.firstOrderType==1 ? "firstOrderTime":"firstOrderTimeMinDay" ' :rules='form.firstOrderType==1 ? rules.firstOrderTime:rules.firstOrderTimeMinDay' label-position="left" v-if="rfm.value3">
              <el-select v-model="form.firstOrderType"  placeholder="请选则筛选条件">
                <el-option
                  v-for="item in payTimeTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="form.firstOrderType==1"
                v-model="form.firstOrderTime"
                value-format="yyyy-MM-dd"
                type="daterange"
                placeholder="请选择日期"
              ></el-date-picker>

              <p
                style="display:inline-block;width:50%"
                v-if="form.firstOrderType==2"
              >
                <el-input v-model="form.firstOrderTimeMinDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> - 
                <el-input v-model="form.firstOrderTimeMaxDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> 天
              </p>
            </el-form-item>

            <el-form-item label="最近一次成功时间：" :prop='form.lastSucType==1 ? "lastSucTime":"lastSucTimeMinDay" ' :rules='form.lastSucType==1 ? rules.lastSucTime:rules.lastSucTimeMinDay' label-position="left" v-if="rfm.value4">
              <el-select v-model="form.lastSucType"  placeholder="请选则筛选条件">
                <el-option
                  v-for="item in payTimeTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="form.lastSucType==1"
                v-model="form.lastSucTime"
                value-format="yyyy-MM-dd"
                type="daterange"
                placeholder="请选择日期"
              ></el-date-picker>

              <p
                style="display:inline-block;width:50%"
                v-if="form.lastSucType==2"
              >
                <el-input v-model="form.lastSucTimeMinDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> - 
                <el-input v-model="form.lastSucTimeMaxDay" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> 天
              </p>
            </el-form-item>

            <el-form-item label="下单次数：" :prop='form.orderCondition==2 ? "orderMinTimes":"orderTimes" ' :rules='form.orderCondition==2 ? rules.orderMinTimes:rules.orderTimes' label-position="left" v-if="rfm.value6">
              <el-select v-model="form.orderCondition" class placeholder="请选则筛选条件">
                <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <p  v-if="form.orderCondition==1||form.orderCondition==3" style="display:inline-block;width:50%">
                <el-input v-model="form.orderTimes" style="display:inline-block;width:40%"></el-input> 次
              </p>
              <p v-if="form.orderCondition==2" style="display:inline-block;width:50%">
                <el-input v-model="form.orderMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.orderMaxTimes" style="display:inline-block;width:40%"></el-input> 次  
              </p> 
            </el-form-item>

            <el-form-item label="交易成功次数：" :prop='form.condition==2 ? "minTimes":"times" ' :rules='form.condition==2 ? rules.minTimes:rules.times' label-position="left" v-if="rfm.value5">
              <el-select v-model="form.condition" class placeholder="请选则筛选条件">
                <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <p  v-if="form.condition==1||form.condition==3" style="display:inline-block;width:50%">
                <el-input v-model="form.times" style="display:inline-block;width:40%"></el-input> 次
              </p>
              <p v-if="form.condition==2" style="display:inline-block;width:50%">
                <el-input v-model="form.minTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.maxTimes" style="display:inline-block;width:40%"></el-input> 次  
              </p> 
              
            </el-form-item>
            
            <el-form-item label="下单金额：" :prop='form.orderMoneyCondition==2 ? "orderMoneyMinTimes":"orderMoneyTimes" ' :rules='form.orderMoneyCondition==2 ? rules.orderMoneyMinTimes:rules.orderMoneyTimes'  label-position="left" v-if="rfm.value7">
              <el-select v-model="form.orderMoneyCondition" class placeholder="请选则筛选条件">
                <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <p  v-if="form.orderMoneyCondition==1||form.orderMoneyCondition==3" style="display:inline-block;width:50%">
                <el-input v-model="form.orderMoneyTimes" style="display:inline-block;width:40%"></el-input> 元
              </p>
              <p v-if="form.orderMoneyCondition==2" style="display:inline-block;width:50%">
                <el-input v-model="form.orderMoneyMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.orderMoneyMaxTimes" style="display:inline-block;width:40%"></el-input> 元  
              </p> 
            </el-form-item>

            <el-form-item label="成功金额：" :prop='form.sucCondition==2 ? "sucMinTimes":"sucTimes" ' :rules='form.sucCondition==2 ? rules.sucMinTimes:rules.sucTimes' label-position="left" v-if="rfm.value9">
              <el-select v-model="form.sucCondition" class placeholder="请选则筛选条件">
                <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <p  v-if="form.sucCondition==1||form.sucCondition==3" style="display:inline-block;width:50%">
                <el-input v-model="form.sucTimes" style="display:inline-block;width:40%"></el-input> 元
              </p>
              <p v-if="form.sucCondition==2" style="display:inline-block;width:50%">
                <el-input v-model="form.sucMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.sucMaxTimes" style="display:inline-block;width:40%"></el-input> 元  
              </p> 
            </el-form-item>

            <el-form-item label="付款次数：" :prop='form.payCondition==2 ? "payMinTimes":"payTimes" ' :rules='form.payCondition==2 ? rules.payMinTimes:rules.payTimes' label-position="left" v-if="rfm.value8">
              <el-select v-model="form.payCondition" class placeholder="请选则筛选条件">
                <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <p  v-if="form.payCondition==1||form.payCondition==3" style="display:inline-block;width:50%">
                <el-input v-model="form.payTimes" style="display:inline-block;width:40%"></el-input> 次
              </p>
              <p v-if="form.payCondition==2" style="display:inline-block;width:50%">
                <el-input v-model="form.payMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.payMaxTimes" style="display:inline-block;width:40%"></el-input> 次  
              </p> 
            </el-form-item>
            
            <el-form-item label="付款金额：" :prop='form.payMoneyCondition==2 ? "payMoneyMinTimes":"payMoneyTimes" ' :rules='form.payMoneyCondition==2 ? rules.payMoneyMinTimes:rules.payMoneyTimes'  label-position="left" v-if="rfm.value10">
              <el-select v-model="form.payMoneyCondition" class placeholder="请选则筛选条件">
                <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <p  v-if="form.payMoneyCondition==1||form.payMoneyCondition==3" style="display:inline-block;width:50%">
                <el-input v-model="form.payMoneyTimes" style="display:inline-block;width:40%"></el-input> 元
              </p>
              <p v-if="form.payMoneyCondition==2" style="display:inline-block;width:50%">
                <el-input v-model="form.payMoneyMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.payMoneyMaxTimes" style="display:inline-block;width:40%"></el-input> 元  
              </p> 
            </el-form-item>
            
            <el-form-item label="退款次数：" :prop='form.returnCondition==2 ? "returnMinTimes":"returnTimes" ' :rules='form.returnCondition==2 ? rules.returnMinTimes:rules.returnTimes' label-position="left" v-if="rfm.value11">
              <el-select v-model="form.returnCondition" class placeholder="请选则筛选条件">
                <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <p  v-if="form.returnCondition==1||form.returnCondition==3" style="display:inline-block;width:50%">
                <el-input v-model="form.returnTimes" style="display:inline-block;width:40%"></el-input> 次
              </p>
              <p v-if="form.returnCondition==2" style="display:inline-block;width:50%">
                <el-input v-model="form.returnMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.returnMaxTimes" style="display:inline-block;width:40%"></el-input> 次  
              </p> 
            </el-form-item>

            <el-form-item label="退款金额：" :prop='form.returnMoneyCondition==2 ? "returnMoneyMinTimes":"returnMoneyTimes" ' :rules='form.returnMoneyCondition==2 ? rules.returnMoneyMinTimes:rules.returnMoneyTimes' label-position="left" v-if="rfm.value12">
              <el-select v-model="form.returnMoneyCondition" class placeholder="请选则筛选条件">
                <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <p  v-if="form.returnMoneyCondition==1||form.returnMoneyCondition==3" style="display:inline-block;width:50%">
                <el-input v-model="form.returnMoneyTimes" style="display:inline-block;width:40%"></el-input> 元
              </p>
              <p v-if="form.returnMoneyCondition==2" style="display:inline-block;width:50%">
                <el-input v-model="form.returnMoneyMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.returnMoneyMaxTimes" style="display:inline-block;width:40%"></el-input> 元  
              </p> 
            </el-form-item>

            <el-form-item label="客单件：" :prop='form.oneCondition==2 ? "oneMinTimes":"oneTimes" ' :rules='form.oneCondition==2 ? rules.oneMinTimes:rules.oneTimes' label-position="left" v-if="rfm.value14">
              <el-select v-model="form.oneCondition" class placeholder="请选则筛选条件">
                <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <p  v-if="form.oneCondition==1||form.oneCondition==3" style="display:inline-block;width:50%">
                <el-input v-model="form.oneTimes" style="display:inline-block;width:40%"></el-input> 件
              </p>
              <p v-if="form.oneCondition==2" style="display:inline-block;width:50%">
                <el-input v-model="form.oneMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.oneMaxTimes" style="display:inline-block;width:40%"></el-input> 件
              </p> 
            </el-form-item>

            <el-form-item label="客单价：" :prop='form.oneMoneyCondition==2 ? "oneMoneyMinTimes":"oneMoneyTimes" ' :rules='form.oneMoneyCondition==2 ? rules.oneMoneyMinTimes:rules.oneMoneyTimes' label-position="left" v-if="rfm.value13">
              <el-select v-model="form.oneMoneyCondition" class placeholder="请选则筛选条件">
                <el-option v-for="item in conditions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <p  v-if="form.oneMoneyCondition==1||form.oneMoneyCondition==3" style="display:inline-block;width:50%">
                <el-input v-model="form.oneMoneyTimes" style="display:inline-block;width:40%"></el-input> 元
              </p>
              <p v-if="form.oneMoneyCondition==2" style="display:inline-block;width:50%">
                <el-input v-model="form.oneMoneyMinTimes" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.oneMoneyMaxTimes" style="display:inline-block;width:40%"></el-input> 元  
              </p> 
            </el-form-item>
          </div>

          <div class="marketing">
            <el-form-item label="最近一次短信营销时间：" :prop='form.lastSmsType==2 ? "lastSmsTimeMin":"lastSmsTime" ' :rules='form.lastSmsType==2 ? rules.lastSmsTimeMin:rules.lastSmsTime' label-position="left" v-if="marketing.value1">
              <el-select v-model="form.lastSmsType"  placeholder="请选则筛选条件">
                <el-option
                  v-for="item in types"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="form.lastSmsType==1"
                v-model="form.lastSmsTime"
                type="daterange"
                value-format="yyyy-MM-dd"

                placeholder="请选择日期"
              ></el-date-picker>

              <p
                style="display:inline-block;width:50%"
                v-if="form.lastSmsType==2"
              >
                <el-input v-model="form.lastSmsTimeMin" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> - 
                <el-input v-model="form.lastSmsTimeMax" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> 天
              </p>
            </el-form-item>

            <el-form-item label="最近一次邮件营销时间：" :prop='form.lastEmailType==2 ? "lastEmailTimeMin":"lastEmailTime" ' :rules='form.lastEmailType==2 ? rules.lastEmailTimeMin:rules.lastEmailTime' label-position="left" v-if="marketing.value2">
              <el-select v-model="form.lastEmailType"  placeholder="请选则筛选条件">
                <el-option
                  v-for="item in types"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="form.lastEmailType==1"
                v-model="form.lastEmailTime"
                value-format="yyyy-MM-dd"

                type="daterange"
                placeholder="请选择日期"
              ></el-date-picker>

              <p
                style="display:inline-block;width:50%"
                v-if="form.lastEmailType==2"
              >
                <el-input v-model="form.lastEmailTimeMin" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> - 
                <el-input v-model="form.lastEmailTimeMax" style="display:inline-block;width:40%" placeholder="请输入天数"></el-input> 天
              </p>
            </el-form-item>

            <el-form-item label="营销短信黑名单：" prop label-position="left" v-if="marketing.value3">
            <span style="padding:5px;border:1px solid #ccc">黑名单</span> 
            </el-form-item>

            <el-form-item label="营销邮箱黑名单：" prop label-position="left" v-if="marketing.value4">
            <span style="padding:5px;border:1px solid #ccc">黑名单</span> 
            </el-form-item>
            
            <el-form-item label="短信营销次数：" prop='smsTimes' :rules='rules.smsTimes' label-position="left" v-if="marketing.value5">
              <el-input v-model="form.smsTimes"  style="display:inline-block;width:20%"  placeholder="请输入短信营销次数"></el-input> 次
            </el-form-item>
            <el-form-item label="邮件营销次数：" prop='emailTimes' :rules='rules.emailTimes' label-position="left" v-if="marketing.value6">
              <el-input v-model="form.emailTimes"  style="display:inline-block;width:20%" placeholder="请输入邮件营销次数"></el-input> 次
            </el-form-item>
          </div>

          <div class="deal">
            <el-form-item label="商品筛选：" prop='selectGoods' label-position="left" v-if="deal.value1">
              <el-button type='primary' @click="goodDialogVisible=true">选择商品</el-button>
              <span v-if="form.selectGoods.length">已选择 {{form.selectGoods.length}} 件商品</span>
              <span v-if="!form.selectGoods.length" style="color:red">请选择商品</span>
            </el-form-item>

            <el-form-item label="订单金额：" :prop='form.moneyType==2 ? "minMoney":"money" ' :rules='form.moneyType==2 ? rules.minMoney:rules.money' label-position="left" v-if="deal.value2">
              <el-select v-model="form.moneyType" class placeholder="请选则筛选条件">
                <el-option v-for="item in moneyTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <p  v-if="form.moneyType==1||form.moneyType==3" style="display:inline-block;width:50%">
                <el-input v-model="form.money" style="display:inline-block;width:40%"></el-input> 元
              </p>
              <p v-if="form.moneyType==2" style="display:inline-block;width:50%">
                <el-input v-model="form.minMoney" style="display:inline-block;width:40%"></el-input> - <el-input v-model="form.maxMoney" style="display:inline-block;width:40%"></el-input> 元  
              </p> 
            </el-form-item>

            <el-form-item label="订单状态：" prop='statu' :rules='rules.statu' label-position="left" v-if="deal.value3" >
              <el-select v-model="form.statu" class='status' placeholder="请选择订单状态" filterable collapse-tags multiple>
                <el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="订单来源：" prop='sources' :rules='rules.sources' label-position="left" v-if="deal.value4">
              <el-select v-model="form.sources" class placeholder="请选择订单来源" filterable collapse-tags multiple>
                <el-option v-for="item in source" :key="item.id" :label="item.name" :value="item.id" ></el-option>
              </el-select>
            </el-form-item>
            
            

            
          </div>



          <div class="pro" >
            <div v-for='(item,index) in form.proValue' :key='index' >
              <el-form-item label-position="left" v-if="pro.length != 0 && pro[index].value ? true : false"  :label="item.name+'：'"  
              :prop="item.type == 1 ?'proValue.'+index+'.radio' : item.type == 2 ?'proValue.'+index+'.checkedValue'  :item.type == 3 ?'proValue.'+index+'.select' :item.type == 5 ?'proValue.'+index+'.value' : item.type == 6 ?'proValue.'+index+'.daterange' : ''" 
              :rules="item.type == 1 ?rules.radio : item.type == 2 ?rules.checkedValue  :item.type == 3 ?rules.select :item.type == 5 ?rules.value : item.type == 6 ?rules.daterange : ''" 
              >
                <!-- 下拉框 -->
                <el-select v-if="item.type==3" v-model="form.proValue[index].select"  placeholder="请选择属性值">
                  <el-option v-for="val in proList[index].customPropertyValue.split(',')" :key="val" :label="val" :value="val"></el-option>
                </el-select>
                <!-- 文本框 -->
                <el-input v-if="item.type==5" v-model="form.proValue[index].value" style="display:inline-block;width:40%"></el-input>
                <!-- 日期 -->
                <el-date-picker
                  v-if="item.type==6"
                  v-model="form.proValue[index].daterange"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <!-- 单选框 -->
                <el-radio-group v-model="form.proValue[index].radio"  v-if="item.type==1">
                  <el-radio v-for="val in proList[index].customPropertyValue.split(',')" :key='val' :label="val">{{val}}</el-radio>
                </el-radio-group>
                <!-- 复选框 -->
                <div v-if="item.type==2">
                  <el-checkbox :indeterminate="form.proValue[index].isIndeterminate" v-model="form.proValue[index].checkAll" @change="handleCheckAll(form.proValue[index].checkAll,index)">全选</el-checkbox>
                  <el-checkbox-group style="display:inline-block" v-model="form.proValue[index].checkedValue" @change="handleCheckedData(form.proValue[index].checkedValue,index)">
                    <el-checkbox v-for="val in proList[index].customPropertyValue.split(',')" :label="val" :key="val">{{val}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="cal" v-if="!toggle">
          <el-button type="primary" @click="submitForm('form')">计算</el-button> <span class="num"> （当前选择 {{num}} 个客户） </span> 
        </div>
      </el-form>
      <div class="condition">
        <el-collapse accordion>
          <el-collapse-item title="基本信息">
            <span @click="change1" :class="change.value1?'active':''">性别</span>
            <span @click="change2" :class="change.value2?'active':''">生日</span>
            <span @click="change3" :class="change.value3?'active':''">手机号</span>
            <span @click="change4" :class="change.value4?'active':''">积分</span>
            <span @click="change5" :class="change.value5?'active':''">等级</span>
            <span @click="change6" :class="change.value6?'active':''">地区</span>
            <span @click="change7" :class="change.value7?'active':''">入会时间</span>
            <span @click="change8" :class="change.value8?'active':''">邮箱</span>
            <span @click="change9" :class="change.value9?'active':''">客户来源</span>
          </el-collapse-item>
          <el-collapse-item title="自定义属性">
            <span v-for="(item,index) in  proList" :key='item.customPropertyId' @click="proChange(index)" :class="pro[index].value?'active':'aaa'">{{item.customPropertyName}}</span>
            <p v-if="proList.length==0" style="text-align:center">
              该店铺下无自定义属性
            </p>
          </el-collapse-item>
          <el-collapse-item title="RFM属性">
            <span @click="rfm1" :class="rfm.value1?'active':''">首次付款时间</span>
            <span @click="rfm2" :class="rfm.value2?'active':''">最近一次付款时间</span>
            <span @click="rfm3" :class="rfm.value3?'active':''">首次下单时间</span>
            <span @click="rfm4" :class="rfm.value4?'active':''">最近一次成功时间</span>
            <span @click="rfm5" :class="rfm.value5?'active':''">交易成功次数</span>
            <span @click="rfm6" :class="rfm.value6?'active':''">下单次数</span>
            <span @click="rfm7" :class="rfm.value7?'active':''">下单总额</span>
            <span @click="rfm8" :class="rfm.value8?'active':''">付款次数</span>
            <span @click="rfm9" :class="rfm.value9?'active':''">成功金额</span>
            <span @click="rfm10" :class="rfm.value10?'active':''">付款金额</span>
            <span @click="rfm11" :class="rfm.value11?'active':''">退款次数</span>
            <span @click="rfm12" :class="rfm.value12?'active':''">退款金额</span>
            <span @click="rfm13" :class="rfm.value13?'active':''">客单价</span>
            <span @click="rfm14" :class="rfm.value14?'active':''">客单件</span>
          </el-collapse-item>
          <el-collapse-item title="交易属性">
            <span @click="deal1" :class="deal.value1?'active':''">商品筛选</span>
            <span @click="deal2" :class="deal.value2?'active':''">订单金额</span>
            <span @click="deal3" :class="deal.value3?'active':''">订单状态</span>
            <span @click="deal4" :class="deal.value4?'active':''">订单来源</span>

          </el-collapse-item>
          <el-collapse-item title="营销属性">
            <span @click="marketing1" :class="marketing.value1?'active':''">最近一次短信营销时间</span>
            <span @click="marketing2" :class="marketing.value2?'active':''">最近一次邮件营销时间</span>
            <span @click="marketing3" :class="marketing.value3?'active':''">营销短信黑名单</span>
            <span @click="marketing4" :class="marketing.value4?'active':''">营销邮箱黑名单</span>
            <span @click="marketing5" :class="marketing.value5?'active':''">短信营销次数</span>
            <span @click="marketing6" :class="marketing.value6?'active':''">邮件营销次数 </span>
          </el-collapse-item>
          <!-- <el-collapse-item title="互动属性">
           
          </el-collapse-item> -->
        </el-collapse>
      </div>
    </div>
    <div class="sub" >
        
      <el-button size='medium'  @click="clearTag">清空标签</el-button>
      <el-button size='medium' type='primary' @click="submitForm('form')">保存分组</el-button>

    </div>




            <el-dialog
              title="商品筛选"
              :visible.sync="goodDialogVisible"
              width="60%"
              :before-close="close"
              :close-on-click-modal="false"
            >
              <div class="box">
              <div class="btns">
                <el-button type='primary' style="float:right;margin-left:20px" size='small' @click="searchGoods">搜索</el-button>

                <el-input
                  v-model="goodsName"
                  class="sel"
                  placeholder="在当前位置搜索商品名称"
                  @keyup.enter.native="searchGoods"
                >
                  <i slot="prefix" class="el-input__icon el-icon-search" @click="searchGoods"></i>
                </el-input>
                <el-input
                  v-model="goodsId"
                  class="sel"
                  placeholder="在当前位置搜索商品ID"
                  @keyup.enter.native="searchGoods"
                >
                  <i slot="prefix" class="el-input__icon el-icon-search" @click="searchGoods"></i>
                </el-input>

              </div>
              <div class="tab">
                <el-table :data="goods" style="width: 100%" height="500"  @selection-change="handleSelectionChange"  ref="multipleTable" :row-key='a'>
                  <el-table-column prop="" type='selection' center label="" show-overflow-tooltip :reserve-selection='true'></el-table-column>

                  <el-table-column prop="sku_name" center label="商品名称" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="sku_code" label="商品ID" show-overflow-tooltip></el-table-column>
                  
                  <div slot="empty">
                    <div>
                      <img src="../../assets/img/none.png" alt width="140" height="140">
                    </div>
                    <p :style="{'marginTop': '23px'}">未查询到商品列表</p>
                  </div>
                </el-table>
                <div class="block">
                  <el-pagination
                    @size-change="changeSize"
                    @current-change="changePage"
                    :current-page="goodsCurrentPage"
                    layout=""
                    :total="goodsTotal"
                  ></el-pagination>
                </div>
                <!-- <span slot="footer" class="insertSub">
                  <el-button @click="close">取消</el-button>
                  <el-button type="primary" >确定</el-button>
                </span> -->
              </div>
            </div>
            </el-dialog>

    <!-- 创建目录管理控件 -->
    <el-dialog
      title="新建目录"
      :visible.sync="dialogVisible"
      width="20%"
      :before-close="qx"
      :close-on-click-modal="false"
    >
      <el-form label-position="top" label-width="80px" :model="catalogForm" ref="catalogForm" >
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i>  同一店铺下目录名称不能重复</p>
        <!-- <p class="danger" v-if="catalogForm.catalogId"> 原目录名称：{{catalogForm.name}}</p> -->
        <el-form-item label="目录名称" prop='catalogName'  :rules='rules.catalogName'>
          <el-input v-model="catalogForm.catalogName" class="proName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx" :plain='true'>取消</el-button>
        <el-button type="primary" @click="submitForm('catalogForm')">提交</el-button>
      </span>
    </el-dialog>


    <!-- 引入已有分组 -->
    <el-dialog
      title="引入已有分组"
      :visible.sync="insert"
      width="60%"
      :before-close="qx"
      :close-on-click-modal="false"
    >
      <div class="box">
      <div class="btns">
        <el-input
          v-model="selStr"
          class="sel"
          placeholder="在当前位置搜索分组名称"
          @keyup.enter.native="search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
        </el-input>
        <el-select v-model="select" placeholder="请选择" size='small' class="select" @change='changeCatalog'>
          <el-option
            v-for="item in catalogList"
            :key="item.catalog_id"
            :label="item.catalog_name"
            :value="item.catalog_id">
          </el-option>
        </el-select>
      </div>
      <div class="tab">
        <el-table :data="tableData" style="width: 100%" height="500" @row-click='rowClick'>
          <!-- <el-table-column type="selection" label width="80" ></el-table-column> -->
          <el-table-column type="index" label="编号"   width='80'>
            <!-- <el-radio v-model="radio" label="1">1</el-radio> -->
            <template slot-scope="scope">
              <!--&nbsp; 为空，不加这个radio的label会显示index数字，注意从0开始的；radio会全选的问题是label相同导致的-->
              <el-radio class="radio" v-model="radio"  :label="q(scope.$index)"  @change.native="getCurrentRow(q(scope.$index))" ></el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="customer_group_id" label="ID" v-if="false"></el-table-column>
          <el-table-column prop="customer_group_name" label="分组名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="catalog_name" label="分组目录" show-overflow-tooltip></el-table-column>
          <el-table-column prop="create_time_str" label="创建时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="" label="更新时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="tableData[scope.$index].update_time_str">{{tableData[scope.$index].update_time_str}}</span>
              <span v-if="!tableData[scope.$index].update_time_str">{{tableData[scope.$index].create_time_str}}</span>
            </template>
          </el-table-column>
          <div slot="empty">
            <div>
              <img src="../../assets/img/none.png" alt width="140" height="140">
            </div>
            <p :style="{'marginTop': '23px'}">未查询到分组列表</p>
          </div>
        </el-table>
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
        <span slot="footer" class="insertSub">
          <el-button @click="qx">取消</el-button>
          <el-button type="primary" @click="sub">确定</el-button>
        </span>
      </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  import BaseMsg from './components/baseMsg'
  import RfM from './components/rfm'
  import Deal from './components/deal'
  import Marketing from './components/marketing'
  import Pro from './components/pro'
  import Bus from '../../module/bus.js'

export default {
  name: "AddGroup",
  components:{
    BaseMsg,RfM,Deal,Marketing,Pro
  },
  data() {
    return {
      //选择已有分组的ID
      id:'',
      //自定义属性值
      proData:[],
      //交易属性值
      // form:{
      //   selectGoods:[],
      //   statu:[],
      //   source:[],
      //   moneyType:'',
      //   money:'',
      //   maxMoney:'',
      //   minMoney:'',
      // },
      // //营销属性值
      // form:{
      //   lastEmailTime:[],
      //   lastSmsTime:[],
      // },
      //rfm属性值
      // form:{
      //   payTime:[],
      //   lastPayTime:[],
      //   firstOrderTime:[],
      //   lastSucTime:[],

      // },
      //基本属性值
      // baseData:{
      //   checkAll: false,
      //   checkedCities: [],
      //   //分组名称
      //   name: "",
      //   //分组目录
      //   catalog: "",
      //   // 性别
      //   sex: "",
      //   //生日条件
      //   birthCondition: "",
      //   //生日日期范围
      //   daterange: [],
      //   //大于 小于 时的时候的生日日期
      //   date: "",
      //   //手机号
      //   mobile: [],
      //   // 积分类型
      //   pointTypes: "",
      //   // 积分条件
      //   pointCondition: "",
      //   // 介于时的  积分范围
      //   minPoint: "",
      //   maxPoint: "",
      //   // 大于小于时的积分 数量
      //   point: "",
      //   //等级类型
      //   levelType: "",
      //   //等级里面的商户
      //   store: "",
      //   //多选的等级
      //   level: [],
      //   //省份
      //   pro: "",
      //   //城市
      //   city: "",
      //   //入会时间条件
      //   entryTimeCondition: "",
      //   //介于时 入会时间的范围
      //   entryTimerange: [],
      //   //大于小于时 的入会时间
      //   entryTime: "",
      //   //客户来源的条件
      //   sourceCondition: "",
      //   //客户来源
      //   source: ""
      // },
      content:[],
      //自定义属性显示
      pro:[],
      //自定义属性列表
      proList:[],
      //选择引入已有分组
      radio:'',
      //搜索条件
      select:"",
      selStr:'',
      //分页
      currentPage:1,
      pageSize:10,
      total:0,
      //分则列表数据
      tableData:[],
      //计算的客户数量
      num:0,
      //验证规则
      rules:{
        name: [
          { required: true,  trigger: 'blur' ,message:'请输入分组名称'}
        ],
        catalog: [
          { required: true,  trigger: 'change' ,message:'请选择目录'}
        ],
        //新建目录名称
        catalogName: [
          { required: true,  trigger: 'blur' ,validator:formTest.name1Test}
        ],
        //性别
        sex: [
          { required: true,  trigger: 'change' ,message:'请选择性别'}
        ],
        //早于晚于的生日
        date: [
          { required: true,  trigger: 'change' ,message:'请选择日期'}
        ],
        // 介于的生日区间
        daterange:[
          { required: true,  trigger: 'change' ,message:'请选择时间区间'}
        ],
        //手机号码数组
        mobile:[
          { required: true,  trigger: 'change' ,message:'请选择手机号前缀'}
        ],
        //大于小于的积分数量
        point:[
          { required: true,  trigger: 'change' ,message:'请输入积分'}
        ],
        //介于的最小积分
        minPoint:[
          { required: true,  trigger: 'change' ,message:'请输入积分'}
        ],
        //等级的数组
        level:[
          { required: true,  trigger: 'change' ,message:'请选择等级'}
        ],
        //城市
        city:[
          { required: true,  trigger: 'change' ,message:'请选择地区'}
        ],
        //介于时 入会时间区间
        entryTimerange:[
          { required: true,  trigger: 'change' ,message:'请选择入会时间'}
        ],
        //大于小于时 入会时间
        entryTime:[
          { required: true,  trigger: 'change' ,message:'请选择入会时间'}
        ],
        //邮箱 数组
        checkedCities:[
          { required: true,  trigger: 'change' ,message:'请选择邮箱'}
        ],
        //客户来源数组
        source:[
          { required: true,  trigger: 'change' ,message:'请选择客户来源'}
        ],
        //首次付款时间
        payTimeMinDay:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.payTimeMaxDay) {
              if(reg.test(value) && reg.test(this.form.payTimeMaxDay)){
                if(value*1>this.form.payTimeMaxDay*1){
                  callback(new Error('首次付款时间区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请选择首次付款时间'))
              }
            }
          }
        ],
        payTime:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            if(value.length==0){
              callback(new Error('请选择首次付款时间'))
            }else{
                callback()
              }
            }
          }
        ],
        //最近一次付款时间
        lastPayTimeMinDay:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.lastPayTimeMaxDay) {
              if(reg.test(value) && reg.test(this.form.lastPayTimeMaxDay)){
                if(value*1>this.form.lastPayTimeMaxDay*1){
                  callback(new Error('最近一次付款时间区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请选择最近一次付款时间'))
              }
            }
          }
        ],
        lastPayTime:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            if(value.length==0){
              callback(new Error('请选择最近一次付款时间'))
            }else{
                callback()
              }
            }
          }
        ],
        //首次下单时间
        firstOrderTimeMinDay:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.firstOrderTimeMaxDay) {
              if(reg.test(value) && reg.test(this.form.firstOrderTimeMaxDay)){
                if(value*1>this.form.firstOrderTimeMaxDay*1){
                  callback(new Error('首次下单时间区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请选择首次下单时间'))
              }
            }
          }
        ],
        firstOrderTime:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            if(value.length==0){
              callback(new Error('请选择首次下单时间'))
            }else{
                callback()
              }
            }
          }
        ],
        //最近一次成功时间
        lastSucTimeMinDay:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.lastSucTimeMaxDay) {
              if(reg.test(value) && reg.test(this.form.lastSucTimeMaxDay)){
                if(value*1>this.form.lastSucTimeMaxDay*1){
                  callback(new Error('最近一次成功时间区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请选择最近一次成功时间'))
              }
            }
          }
        ],
        lastSucTime:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            if(value.length==0){
              callback(new Error('请选择最近一次成功时间'))
            }else{
                callback()
              }
            }
          }
        ],
        //交易成功次数
        minTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.maxTimes) {
              if(reg.test(value) && reg.test(this.form.maxTimes)){
                if(value*1>this.form.maxTimes*1){
                  callback(new Error('交易成功次数区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入交易成功次数'))
              }
            }
          }
        ],
        times:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
              if(!value){
                callback(new Error('请输入交易成功次数'))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        //下单次数
        orderMinTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.orderMaxTimes) {
              if(reg.test(value) && reg.test(this.form.orderMaxTimes)){
                if(value*1>this.form.orderMaxTimes*1){
                  callback(new Error('下单次数区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入下单成功次数'))
              }
            }
          }
        ],
        orderTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
              if(!value){
                callback(new Error('请输入下单成功次数'))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        //下单总额
        orderMoneyMinTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.orderMoneyMaxTimes) {
              if(reg.test(value) && reg.test(this.form.orderMoneyMaxTimes)){
                if(value*1>this.form.orderMoneyMaxTimes*1){
                  callback(new Error('下单总额区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入下单总额'))
              }
            }
          }
        ],
        orderMoneyTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
              if(!value){
                callback(new Error('请输入下单总额'))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        //付款次数
        payMinTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.payMaxTimes) {
              if(reg.test(value) && reg.test(this.form.payMaxTimes)){
                if(value*1>this.form.payMaxTimes*1){
                  callback(new Error('付款次数区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入付款次数'))
              }
            }
          }
        ],
        payTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
              if(!value){
                callback(new Error('请输入付款次数'))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        //付款金额
        payMoneyMinTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.payMoneyMaxTimes) {
              if(reg.test(value) && reg.test(this.form.payMoneyMaxTimes)){
                if(value*1>this.form.payMoneyMaxTimes*1){
                  callback(new Error('付款金额区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入付款金额'))
              }
            }
          }
        ],
        payMoneyTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
              if(!value){
                callback(new Error('请输入付款金额'))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        //退款次数
        returnMinTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.returnMaxTimes) {
              if(reg.test(value) && reg.test(this.form.returnMaxTimes)){
                if(value*1>this.form.returnMaxTimes*1){
                  callback(new Error('退款次数区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入退款次数'))
              }
            }
          }
        ],
        returnTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
              if(!value){
                callback(new Error('请输入退款次数'))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        //退款金额
        returnMoneyMinTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.returnMoneyMaxTimes) {
              if(reg.test(value) && reg.test(this.form.returnMoneyMaxTimes)){
                if(value*1>this.form.returnMoneyMaxTimes*1){
                  callback(new Error('退款金额区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入退款金额'))
              }
            }
          }
        ],
        returnMoneyTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
              if(!value){
                callback(new Error('请输入退款金额'))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        //客单价
        oneMoneyMinTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.oneMoneyMaxTimes) {
              if(reg.test(value) && reg.test(this.form.oneMoneyMaxTimes)){
                if(value*1>this.form.oneMoneyMaxTimes*1){
                  callback(new Error('客单价区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入客单价'))
              }
            }
          }
        ],
        oneMoneyTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
              if(!value){
                callback(new Error('请输入客单价'))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        //可单间
        oneMinTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.oneMaxTimes) {
              if(reg.test(value) && reg.test(this.form.oneMaxTimes)){
                if(value*1>this.form.oneMaxTimes*1){
                  callback(new Error('客单件区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入客单件'))
              }
            }
          }
        ],
        oneTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
              if(!value){
                callback(new Error('请输入客单件'))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        //成功金额
        sucMinTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.sucMaxTimes) {
              if(reg.test(value) && reg.test(this.form.sucMaxTimes)){
                if(value*1>this.form.sucMaxTimes*1){
                  callback(new Error('成功金额区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入成功金额'))
              }
            }
          }
        ],
        sucTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
              if(!value){
                callback(new Error('请输入成功金额'))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        //最近一次短信营销时间
        lastSmsTimeMin:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.lastSmsTimeMax) {
              if(reg.test(value) && reg.test(this.form.lastSmsTimeMax)){
                if(value*1>this.form.lastSmsTimeMax*1){
                  callback(new Error('最近一次短信营销区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入最近一次短信营销时间'))
              }
            }
          }
        ],
        lastSmsTime:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            if(value.length==0){
              callback(new Error('请输入最近一次短信营销时间'))
            }else{
                callback()
              }
            }
          }
        ],
        //最近一次邮件营销时间
        lastEmailTimeMin:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.lastEmailTimeMax) {
              if(reg.test(value) && reg.test(this.form.lastEmailTimeMax)){
                if(value*1>this.form.lastEmailTimeMax*1){
                  callback(new Error('最近一次邮件营销区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入最近一次邮件营销时间'))
              }
            }
          }
        ],
        lastEmailTime:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            if(value.length==0){
              callback(new Error('请输入最近一次邮件营销时间'))
            }else{
                callback()
              }
            }
          }
        ],
        //短信营销次数
        smsTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if(!value){
                callback(new Error('请输入最近一次邮件营销时间'))
              
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        //邮件营销次数
        emailTimes:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
              if(!value){
                callback(new Error('请输入最近一次邮件营销时间'))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                    callback()
                }
              }
            }
          }
        ],

        //订单金额
        minMoney:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
            if (value && this.form.maxMoney) {
              if(reg.test(value) && reg.test(this.form.maxMoney)){
                if(value*1>this.form.maxMoney*1){
                  callback(new Error('订单金额区间不正确'))
                }else{
                  callback()
                }
              }else{
                callback(new Error('请输入正确的格式'))
              }
            } else {
              callback(new Error('请输入订单金额'))
              }
            }
          }
        ],
        money:[
          { required: true,  trigger: 'change' ,validator: (rule, value, callback) => {
            var reg = /(^0|[1-9][0-9]*)$/
              if(!value){
                callback(new Error('请输入订单金额'))
              }else{
                if(!reg.test(value)){
                  callback(new Error('请输入正确的格式'))
                }else{
                  callback()
                }
              }
            }
          }
        ],
        //订单状态
        statu:[
          { required: true,  trigger: 'change' ,message:'请选择订单状态'}
        ],
        //订单来源
        sources:[
          { required: true,  trigger: 'change' ,message:'请选择订单状来源'}
        ],
        //商品筛选
        selectGoods:[
          { required: true,  trigger: 'change',validator: (rule, value, callback) => {
            console.log(value)
            if(!value){
                callback(new Error('请选择商品'))
              }else{
                  callback()
                }
              }
            }
        ],

        radio:[
          { required: true,  trigger: 'change' ,message:'请选择属性值'}
        ],
        value:[
          { required: true,  trigger: 'change' ,message:'请输入'}
        ],
        select:[
          { required: true,  trigger: 'change' ,message:'请选择属性值'}
        ],
        checkedValue:[
          { required: true,  trigger: 'change' ,message:'请选择属性值'}
        ],
      },
      //引入已有分组显示
      insert:false,
      //新建目录显示
      dialogVisible:false,
      //新建目录的数据
      catalogForm:{
        catalogName:''
      },
      //空标签时和计算按钮的显示
      toggle:true,
      //基本属性的显示
      change:{
        value1:false,
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
        value7:false,
        value8:false,
        value9:false,
        value10:false,
      },
      //交易属性的显示
      deal:{
        value1:false,
        value2:false,
        value3:false,
        value4:false,
      },
      //营销属性的显示
      marketing:{
        value1:false,
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
      },
      //rfm属性的显示
      rfm:{
        value1:false,
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
        value7:false,
        value8:false,
        value9:false,
        value10:false,
        value11:false,
        value12:false,
        value13:false,
        value14:false,
      },
      //表单数据
      form:{
        //分组名称
        name:'',
        //分组目录
        catalog:'',

        //这里是自定义
        proValue:[],
        // 这里是base
        checkAll: false,
        checkedCities: [],
        // 性别
        sex: "",
        //生日条件
        birthCondition: "",
        //生日日期范围
        daterange: [],
        //大于 小于 时的时候的生日日期
        date: "",
        //手机号
        mobile: [],
        // 积分类型
        pointTypes: "",
        // 积分条件
        pointCondition: "",
        // 介于时的  积分范围
        minPoint: "",
        maxPoint: "",
        // 大于小于时的积分 数量
        point: "",
        //等级类型
        levelType: "",
        //等级里面的商户
        store: "",
        //多选的等级
        level: [],
        //省份
        pro: "",
        //城市
        city: "",
        //入会时间条件
        entryTimeCondition: "",
        //介于时 入会时间的范围
        entryTimerange: [],
        //大于小于时 的入会时间
        entryTime: "",
        //客户来源的条件
        sourceCondition: "",
        //客户来源
        source: "",



        //这里是RFM
        //客单价
        oneMoneyMinTimes:'',
        oneMoneyMaxTimes:'',
        oneMoneyTimes:'',
        oneMoneyCondition:'',
        //退款金额
        returnMoneyMinTimes:'',
        returnMoneyMaxTimes:'',
        returnMoneyTimes:'',
        returnMoneyCondition:'',
        //付款金额
        
        payMoneyMinTimes:'',
        payMoneyMaxTimes:'',
        payMoneyTimes:'',
        payMoneyCondition:'',
        //成功金额
        sucMinTimes:'',
        sucMaxTimes:'',
        sucTimes:'',
        sucCondition:'',
        //下单金额
        
        orderMoneyMinTimes:'',
        orderMoneyMaxTimes:'',
        orderMoneyTimes:'',
        orderMoneyCondition:'',
        //客单件
        oneMinTimes:'',
        oneMaxTimes:'',
        oneTimes:'',
        oneCondition:'',
        //退款次数
        returnMinTimes:'',
        returnMaxTimes:'',
        returnTimes:'',
        returnCondition:'',
        //付款次数
        payMinTimes:'',
        payMaxTimes:'',
        payTimes:'',
        payCondition:'',
        //下单次数
        
        orderMinTimes:'',
        orderMaxTimes:'',
        orderTimes:'',
        orderCondition:'',
        //交易成功次数
        minTimes:'',
        maxTimes:'',
        times:'',
        condition:'',
        //首次付款
        payTimeMinDay:'',
        payTimeMaxDay:'',
        payTimeType:'',
        payTime:[],
        //最后一次付款 
        lastPayTimeMinDay:'',
        lastPayTimeMaxDay:'',
        lastPayType:'',
        lastPayTime:[],
        //首次下单
        firstOrderTimeMinDay:'',
        firstOrderTimeMaxDay:'',
        firstOrderType:'',
        firstOrderTime:[],
        //最近一次成功时间
        lastSucTimeMinDay:'',
        lastSucTimeMaxDay:'',
        lastSucType:'',
        lastSucTime:[],


        //这里是营销
        lastSmsType:'',
        lastSmsTime:[],
        lastSmsTimeMax:'',
        lastSmsTimeMin:'',
        smsTimes:'',
        emailTimes:'',
        lastEmailType:'',
        lastEmailTime:[],
        lastEmailTimeMax:'',
        lastEmailTimeMin:'',


        //这里是交易
        selectGoods:[],
        statu:[],
        sources:[],
        moneyType:'',
        money:'',
        maxMoney:'',
        minMoney:'',
      },
      //目录列表
      catalogList:[],

      //这里是交易
      goodDialogVisible:false,
      goodsTotal:0,
      goodsCurrentPage:1,
      goodsPageSize:1,
      goods:[],
      goodsId:'',
      goodsName:'',
      moneyTypes:[
        {
          name:'大于',
          id:1
        },
        {
          name:'介于',
          id:2
        },
        {
          name:'小于',
          id:3
        },
      ],
      status:[
        {
          name:'没有创建支付宝交易',
          id:'TRADE_NO_CREATE_PAY'
        },
        {
          name:'等待买家付款',
          id:'WAIT_BUYER_PAY'
        },
        {
          name:'买家已付款',
          id:'WAIT_SELLER_SEND_GOODS'
        },
        {
          name:'卖家已发货',
          id:'WAIT_BUYER_CONFIRM_GOODS'
        },
        {
          name:'买家已签收',
          id:'TRADE_BUYER_SIGNED'
        },
        {
          name:'交易成功',
          id:'TRADE_FINISHED'
        },
        {
          name:'付款以后用户退款成功，交易自动关闭',
          id:'TRADE_CLOSED'
        },
        {
          name:'付款以前，卖家或买家主动关闭交易',
          id:'TRADE_CLOSED_BY_TAOBAO'
        },
        {
          name:'国际信用卡支付付款确认中',
          id:'PAY_PENDING'
        }
      ],
      source:[
        {
          name:'PC端',
          id:'PC'
        },
        {
          name:'手机端',
          id:'WAP'
        },
        {
          name:'聚划算',
          id:'JHS'
        },
      ],

      //这里是  basemsg
      isIndeterminate: false,
      pros: [],
      citys: [],
      stores: [],
      levelList: [],
      isContainAll: false,
      sources: [
        
      ],
      levelTypes: [
        {
          name: "包含",
          id: 1
        },
        {
          name: "不包含",
          id: 2
        }
      ],
      pointTypes: [
        // ”、、“ 筛选条件 “介于、大于、小于”
        // （互动积分:INTERACTION,交易积分:TRADE,全部积分:ALL）
        {
          name: "全部积分",
          id: 'ALL'
        },
        {
          name: "互动积分",
          id: 'INTERACTION'
        },
        {
          name: "交易积分",
          id: 'TRADE'
        }
        
      ],
      pointConditions: [
        {
          name: "大于",
          id: 1
        },
        {
          name: "介于",
          id: 2
        },
        {
          name: "小于",
          id: 3
        }
      ],
      mobiles: [
        {name: "全部",id: '-1'},
        {name: "130",id: '130'},
        {name: "131",id: '131'},
        {name: "132",id: '132'},
        {name: "133",id: '133'},
        {name: "134",id: '134'},
        {name: "135",id: '135'},
        {name: "136",id: '136'},
        {name: "137",id: '137'},
        {name: "138",id: '138'},
        {name: "139",id: '139'},
        {name: "145",id: '145'},
        {name: "146",id: '146'},
        {name: "147",id: '147'},
        {name: "148",id: '148'},
        {name: "149",id: '149'},
        {name: "150",id: '150'},
        {name: "151",id: '151'},
        {name: "152",id: '152'},
        {name: "153",id: '153'},
        {name: "155",id: '155'},
        {name: "156",id: '156'},
        {name: "157",id: '157'},
        {name: "158",id: '158'},
        {name: "159",id: '159'},
        {name: "165",id: '165'},
        {name: "166",id: '166'},
        {name: "170",id: '170'},
        {name: "171",id: '171'},
        {name: "172",id: '172'},
        {name: "173",id: '173'},
        {name: "174",id: '174'},
        {name: "175",id: '175'},
        {name: "176",id: '176'},
        {name: "177",id: '177'},
        {name: "178",id: '178'},
        {name: "180",id: '180'},
        {name: "181",id: '181'},
        {name: "182",id: '182'},
        {name: "183",id: '183'},
        {name: "184",id: '184'},
        {name: "185",id: '185'},
        {name: "186",id: '186'},
        {name: "187",id: '187'},
        {name: "188",id: '188'},
        {name: "189",id: '189'},
        {name: "191",id: '191'},
        {name: "198",id: '198'},
        {name: "199",id: '199'},
        {name: "其他",id: '0'},

      ],
      //生日条件
      birthConditions: [
        {
          name: "早于",
          id: 1
        },
        {
          name: "介于",
          id: 2
        },
        {
          name: "晚于",
          id: 3
        }
      ],


      //这里是rfm
      conditions:[
        {
          name:'大于',
          id:1
        },
        {
          name:'介于',
          id:2
        },
        {
          name:'小于',
          id:3
        },
      ],
      payTimeTypes:[
        {
          name:'绝对',
          id:1
        },
        {
          name:'距离当前',
          id:2
        }
      ],

      //这里是营销
      types:[
        {
          name:'绝对',
          id:1
        },
        {
          name:'距离当前',
          id:2
        },
      ],
      //这里是自定义
      checkedValue: [],
      proIsIndeterminate: false
    };
  },
  created() {
    this.getCatalogList(this.shopId)
    this.getProList(this.shopId)
    this.getStore(this.shopId);
    this.getCity();
    this.getSource()

  },
  computed:{
    shopId(){
      return this.$store.state.shopId.shopId
    },
    // toggle(){
    //   var onoff = true
    //   for ( var i in this.change ){
    //       // console.log(i,n[i])
    //     if(this.change[i]){
    //       onoff = false
    //       break;
    //     }else{
    //       onoff = true
    //       continue
    //     }
    //   }

    //   for ( var i in this.rfm ){
    //       // console.log(i,n[i])
    //     if(this.rfm[i]){
    //       onoff = false
    //       break;
    //     }else{
    //       onoff = true
    //       continue
    //     }
    //   }
    //   for ( var i in this.marketing ){
    //       // console.log(i,n[i])
    //     if(this.marketing[i]){
    //       onoff = false
    //       break;
    //     }else{
    //       onoff = true
    //       continue
    //     }
    //   }
    //   for ( var i in this.deal ){
    //       // console.log(i,n[i])
    //     if(this.deal[i]){
    //       onoff = false
    //       break;
    //     }else{
    //       onoff = true
    //       continue
    //     }
    //   }
    //   for ( var i =0;i<this.pro.length;i++ ){
    //         // console.log(i,n[i])
    //     if(this.pro[i].value){
    //       onoff = false
    //       break;
    //     }else{
    //       onoff = true
    //       continue
    //     }
    //   }
    //   return onoff
    // }
  },
  watch: {
    toggle(n,o){
      console.log(n,o)
    },
    shopId:{
      handler:function(n,o){
        if(n!=o){
          this.getCatalogList(n)
          this.getProList(n)
          this.clearTag()
        }
      }
    },
    change:{
      handler:function(n,o){
        for ( var i in n ){
            // console.log(i,n[i])
          if(n[i]){
            this.toggle = false
            break;
          }else{
            this.toggle = true
            continue
          }
        }
        if(!n.value1){
          this.form.sex = ''
        }
        if(!n.value2){
          this.form.birthCondition = ''
          this.form.date = ''
          this.form.daterange = []
        }
        if(!n.value3){
          this.form.mobile =[]
        }
        if(!n.value4){
          this.form.pointType = ''
          this.form.point = ''
          this.form.pointCondition = ''
          this.form.minPoint = ''
          this.form.maxPoint = ''
        }
        if(!n.value5){
          this.form.store = ''
          this.form.levelType = ''
          this.form.level = []
        }
        if(!n.value6){
          this.form.pro = ''
          this.form.city = ''
        }
        if(!n.value7){
          this.form.entryTimeCondition = ''
          this.form.entryTime = ''
          this.form.entryTimerange = []
        }
        if(!n.value8){
          this.form.checkedCities = []
          this.form.isIndeterminate = false
          this.form.checkAll = false
        }
        if(!n.value9){
          this.form.sourceCondition = ''
          this.form.source = ''
        }
      },
      deep:true
    },
    rfm:{
      handler:function(n,o){
        for ( var i in n ){
            // console.log(i,n[i])
          if(n[i]){
            this.toggle = false
            break;
          }else{
            this.toggle = true
            continue
          }
        }
        if(!n.value1){
          this.form.payTimeMinDay=''
          this.form.payTimeMaxDay=''
          this.form.payTimeType=''
          this.form.payTime=[]
        }
        if(!n.value2){
          this.form.lastPayTimeMinDay=''
          this.form.lastPayTimeMaxDay=''
          this.form.lastPayType=''
          this.form.lastPayTime=[]
        }
        if(!n.value3){
          this.form.firstOrderTimeMinDay=''
          this.form.firstOrderTimeMaxDay=''
          this.form.firstOrderType=''
          this.form.firstOrderTime=[]
        }
        if(!n.value4){
          this.form.lastSucTimeMinDay=''
          this.form.lastSucTimeMaxDay=''
          this.form.lastSucType=''
          this.form.lastSucTime=[]
        }
        if(!n.value5){
          this.form.condition=''
          this.form.times=''
          this.form.maxTimes=''
          this.form.minTimes=''
        }
        if(!n.value6){
          this.form.orderMinTimes=''
          this.form.orderMaxTimes=''
          this.form.orderTimes=''
          this.form.orderCondition=''
        }
        if(!n.value7){
          this.form.orderMoneyCondition=''
          this.form.orderMoneyTimes=''
          this.form.orderMoneyMaxTimes=''
          this.form.orderMoneyMinTimes=''
        }
        if(!n.value8){
          this.form.payCondition=''
          this.form.payTimes=''
          this.form.payMaxTimes=''
          this.form.payMinTimes=''
        }
        if(!n.value9){
          this.form.sucCondition=''
          this.form.sucTimes=''
          this.form.sucMaxTimes=''
          this.form.sucMinTimes=''
        }
        if(!n.value10){
          this.form.payMoneyMinTimes=''
          this.form.payMoneyMaxTimes=''
          this.form.payMoneyTimes=''
          this.form.payMoneyCondition=''
        }
        if(!n.value11){
          this.form.returnMinTimes=''
          this.form.returnMaxTimes=''
          this.form.returnTimes=''
          this.form.returnCondition=''
        }
        if(!n.value12){
          this.form.returnMoneyMinTimes=''
          this.form.returnMoneyMaxTimes=''
          this.form.returnMoneyCondition=''
          this.form.returnMoneyTimes=''
        }
        if(!n.value13){
          this.form.oneMoneyCondition=''
          this.form.oneMoneyTimes=''
          this.form.oneMoneyMaxTimes=''
          this.form.oneMoneyMinTimes=''
        }
        if(!n.value14){
          this.form.oneCondition=''
          this.form.oneTimes=''
          this.form.oneMaxTimes=''
          this.form.oneMinTimes=''
        }
      },
      deep:true
    },
    marketing:{
      handler:function(n,o){
        for ( var i in n ){
            // console.log(i,n[i])
          if(n[i]){
            this.toggle = false
            break;
          }else{
            this.toggle = true
            continue
          }
        }
        if(!n.value1){
            this.form.lastSmsType=''
            this.form.lastSmsTime=[]
            this.form.lastSmsTimeMax=''
            this.form.lastSmsTimeMin=''
          }
          if(!n.value2){
            this.form.lastEmailType=''
            this.form.lastEmailTime=[]
            this.form.lastEmailTimeMax=''
            this.form.lastEmailTimeMin=''
            
          }
          if(!n.value5){
            this.form.smsTimes=''
          }
          if(!n.value6){
            this.form.emailTimes=''
          }
      },
      deep:true
    },
    pro:{
      handler:function(n,o){
        for ( var i =0;i<n.length;i++ ){
            // console.log(i,n[i])
          if(n[i].value){
            this.toggle = false
            break;
          }else{
            this.toggle = true
            continue
          }

          if(!n[i].value){
            if(this.form[i]){
              this.form[i].type=this.proList[i].customPropertyType
              this.form[i].name=this.proList[i].customPropertyName
              this.form[i].checkAll= false
              this.form[i].checkedValue= []
              this.form[i].isIndeterminate= false
              this.form[i].select =''
              this.form[i].value=''
              this.form[i].daterange=[]
              this.form[i].radio=''
            }
          }
        }
      },
      deep:true
    },
    deal:{
      handler:function(n,o){
        for ( var i in n ){
            // console.log(i,n[i])
          if(n[i]){
            this.toggle = false
            break;
          }else{
            this.toggle = true
            continue
          }
        }
        if(!n.value1){
          this.form.selectGoods = []
          this.goodsName = ''
          this.goodsId = ''
          this.goods=[]
          this.toggleSelection()
        }
        if(!n.value2){

          this.form.minMoney = ''
          this.form.maxMoney = ''
          this.form.money = ''
          this.form.moneyType = ''

        }
        if(!n.value3){
          this.form.statu=[]
        }
        if(!n.value4){
          this.form.source=[]
        }
      },
      deep:true
    },
    'form.mobile':{
      handler:function(n,o){
        for(var i=0;i<n.length;i++){
          if(n[i]==0){
            this.form.mobileType =0
            break;
          }else{
            this.form.mobileType =1
            continue;
          }
        }
        // console.log(this.form.mobileType)
      },
      deep:true
    },
    
    'form.store':{
      handler:function(n,o){
        this.getLevelList(n)
      },
      deep:true
    },
    'form.checkedCities':{
      handler:function(n,o){
        if(n.length){
          if(n.length == 4){
            this.isIndeterminate = false;
            this.form.checkAll = true
          }else{
            this.isIndeterminate = true;
            this.form.checkAll = false
          }
        }else{
          this.isIndeterminate = false;
          this.form.checkAll = false
        }
        // console.log(n.length )
        
      },
      deep:true
    },
  },
  methods: {
    a(row) {
      // console.log(row)
      return row.sku_code
    },
    toggleSelection(rows,selected) {
      console.log(rows)
      if (rows) {
      console.log(1)

        rows.forEach(row => {
          console.log(row)
          if(this.$refs.multipleTable){
            this.$refs.multipleTable.toggleRowSelection(row);
          }
        });
      } else {
      console.log(2)
        if(this.$refs.multipleTable){
          this.$refs.multipleTable.clearSelection();
        }
      }
    },
    getGoods(shopid,name,code){
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/customerGroup/queryGoods?shopInfoId=" +
          shopid +'&skuName=' + this.goodsName +'&skuCode='+this.goodsId 
      })
        .then(res => {
          console.log("商品列表", res);
          if (res.data.code == 1) {
            this.goods = res.data.data
            this.goodsTotal = res.data.data.total
          }else{
          }
        })
        .catch(error => {
          console.log(error);
          alert("网络异常");
        });
    },
    close(){
      this.goodDialogVisible = false;
      // this.goodsName = '';
      // this.goodsId = '';
      // this.goods = []
    },
    changeSize(val){
      console.log(`每页 ${val} 条`);
      this.goodsPageSize = val;
    },
    changePage(val){
      console.log(`每页 ${val} 条`);
      this.goodsCurrentPage = val;
    },
    searchGoods(){
      this.getGoods(this.shopId,this.goodsName,this.goodsId)
    },
    handleSelectionChange(val) {
      console.log(val)
      this.form.selectGoods=val;
    },




    handleCheckAllChange(val) {
      this.form.checkedCities = val
        ? ["@qq.com", "@163.com", "@sina.com", "其他"]
        : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.form.checkAll = checkedCount === 4;
      this.isIndeterminate = checkedCount > 0 && checkedCount < 4;
    },
    handleCheckedData(value,index) {
      let checkedCount = value.length;
      this.form.proValue[index].checkAll = checkedCount === this.proList[index].customPropertyValue.split(',').length;
      this.form.proValue[index].isIndeterminate = checkedCount > 0 && checkedCount < this.proList[index].customPropertyValue.split(',').length;
    },
    handleCheckAll(val,index){
      this.form.proValue[index].checkedValue = val ? this.proList[index].customPropertyValue.split(',') : [];
      this.form.proValue[index].isIndeterminate = false;
    },
    //改变省份
    changePro(val) {
      // console.log(val);
      this.pros.forEach(item => {
        if (val == item.name) {
          this.citys = item.children;
          // console.log(this.citys);
          this.form.city = "";
        }
      });
    },
    //获取渠道
    getSource(){
    
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/place/list" 
      })
      .then(res => {
        // console.log("渠道list", res);
        if(res.data.code==1){
          this.sources = res.data.data;

        }
      })
      .catch(error => {
        console.log(error);
        alert("系统异常");
      });
    },
    //获取城市列表
    getCity() {
      this.$http({
        method: "get",
        url: "static/city.json"
      })
        .then(res => {
          // console.log("城市list", res);
          this.pros = res.data;
        })
        .catch(error => {
          console.log(error);
          alert("系统异常");
        });
    },
    //改变商户
    changeStore(val) {
      this.getLevelList(val);
    },
    changeCity(){},
    //获取商户
    getStore(shopid) {
      this.$http({
        method: "get",
        url: "" + process.env.API_ROOT + "/merchantIds?shopId=" + shopid
      })
        .then(res => {
          // console.log("商户列表", res);
          if (res.data.code == 1) {
            this.stores = res.data.data;
            // if(res.data.data.length!=0){
            //     this.store = this.store[0].api_merchant_id;
            //     this.getLevelList(this.store[0].api_merchant_id)
            // }else{

            // }
          } else {
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
          // console.log("等级列表", res); 
          if (res.data.code == 1) {
            this.levelList = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
          alert("登入失败");
        });
    },
    changeStaff() {
      //等级
      if (this.isContainAll) {
        // 只有下拉框的值发生了变化才会进入此方法
        // 如果之前选中了全部，则变化后肯定不包含全部了
        this.isContainAll = false;
        // 则删除第一个全部
        this.form.mobile.splice(0, 1);
      } else {
        // 如果之前没有选中全部
        // 判断此次是否选中了全部
        this.isContainAll = this.form.mobile.some(value => value === '-1');
        // 如果此次选中了全部
        if (this.isContainAll) {
          // 则去除其他，只保留全部，默认value=-1 是全部
          this.form.mobile = ['-1'];
        } else {
          // 如果当前不包含全部，则判断是否其他的等级全选了
          if (this.form.mobile.length === this.mobiles.length - 1) {
            // 如果其他员工全选了，则也将当前置为全部
            this.form.mobile = ['-1'];
            this.isContainAll = true;
          }
        }
      }
    },


    // 计算人数
    cal(){
      var type = ''
      var email = ''
      // 全选情况下
      if(this.form.checkAll){
        type=1
        email = ''
      }else{ 
        //非全选
        //如果 有其他 为排除
        if(this.form.checkedCities.join(',').indexOf('其他')!=-1){
          type=0
          //一个没有 2个有
          //无163
          if(this.form.checkedCities.join(',').indexOf('@qq.com')!=-1  && this.form.checkedCities.join(',').indexOf('@sina.com')!=-1 && this.form.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@163.com'
          }
          //无sina
          if(this.form.checkedCities.join(',').indexOf('@qq.com')!=-1 && this.form.checkedCities.join(',').indexOf('@sina.com')==-1 && this.form.checkedCities.join(',').indexOf('@163.com')!=-1){
            email = '@sina.com'
          }
          //无qq
          if(this.form.checkedCities.join(',').indexOf('@qq.com')==-1 && this.form.checkedCities.join(',').indexOf('@sina.com')!=-1 && this.form.checkedCities.join(',').indexOf('@163.com')!=-1){
            email = '@qq.com'
          }
          
          //有一个有  2个没有
          //有sina
          if(this.form.checkedCities.join(',').indexOf('@qq.com')==-1 && this.form.checkedCities.join(',').indexOf('@sina.com')!=-1 && this.form.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@qq.com,@163.com'
          }
          //有qq
          if(this.form.checkedCities.join(',').indexOf('@qq.com')!=-1 && this.form.checkedCities.join(',').indexOf('@sina.com')==-1 && this.form.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@163.com,@sina.com'
          }
          //有163
          if(this.form.checkedCities.join(',').indexOf('@qq.com')==-1 && this.form.checkedCities.join(',').indexOf('@sina.com')==-1 && this.form.checkedCities.join(',').indexOf('@163.com')!=-1){
            email = '@163.com,@qq.com'
          }
          //3这都没有
          if(this.form.checkedCities.join(',').indexOf('@qq.com')==-1 && this.form.checkedCities.join(',').indexOf('@sina.com')==-1 && this.form.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@qq.com,@sina.com,@163.com'
          }
        }else{
          //如果没有其他
          if(this.form.checkedCities.join(',').indexOf('@qq.com')==-1 && this.form.checkedCities.join(',').indexOf('@sina.com')==-1 && this.form.checkedCities.join(',').indexOf('@163.com')==-1){
            type = ''
            email=''
          }else{
            type = 1
            email = this.form.checkedCities.join(',')
          }
        }
      }

      var mobile = ''
      if(this.form.mobile.join(',').indexOf('-1')!=-1){
        mobile = ''
      }else{
        //非全部 有其他
        if(this.form.mobile.join(',').indexOf(',0')!=-1){
          console.log('非全部 有其他')
          console.log(this.form.mobile.join(','))
          mobile = this.form.mobile.join(',').replace(',0','')
          console.log(mobile)
        }else{
          //无其他
          console.log('非全部 无其他')
          mobile = this.form.mobile.join(',')
        }
      }

      var goods = []
      this.form.selectGoods.forEach(item=>{
        goods.push(item.sku_code)
      })
      

      var valueArr = []
      var newArr =[]
      this.form.proValue.forEach((item,index)=>{
        // console.log(item)
          valueArr.push(
            {
              "customLabelName":item.name,//自定义属性名称
              "customLabelValue":item.type==1 ? item.radio : item.type==2 ? item.checkedValue.join(',') :item.type==3 ? item.select :item.type==5 ?item.value :item.type==6 ? item.daterange.join(',') :'',//自定义属性值
              "customLabelType":item.type//属性类型:单选 1 复选2 下拉3 列表4 文本5 日期6
            },
          )
      })
      valueArr.forEach(item => {
        // console.log(11111)
        if(item.customLabelValue){
          newArr.push(item)
        }
      });


      this.content = [
        //基本属性
        {
            "basicSex":this.form.sex,//性别（0：女，1：男）
            "basicBirthdayStart":this.form.birthCondition ==2 ?  this.form.daterange[0] :this.form.birthCondition ==3 ?  this.form.date : '',//生日开始时间（介于：两个都有值，早于：结束时间有值，开始时间为空，晚于：开始时间有值，结束时间为空）

            "basicBirthdayEnd":this.form.birthCondition ==2 ?  this.form.daterange[1] :this.form.birthCondition ==1 ?  this.form.date :'',//生日结束时间
            "basicMobile": mobile,//手机号英文逗号分隔
            "basicMobileType":this.form.mobileType,//是否包含（1：包含，0：排除），选中其他表示排除列表其他号码前缀
            "basicPointType":this.form.pointType,//积分类型（互动积分:INTERACTION,交易积分:TRADE,全部积分:ALL）
            "basicMinPoint":this.form.pointCondition ==2 ?  this.form.minPoint :this.form.pointCondition ==3 ?  this.form.point : '',//积分最小值（介于：两个都有值，小于：积分最大值有值，积分最小值为空，大于：积分最小值有值，积分最大值为空）
            "basicMaxPoint":this.form.pointCondition ==2 ?  this.form.maxPoint :this.form.pointCondition ==1 ?  this.form.point : '',//积分最大值
            "basicGradeType":this.form.levelType,//等级类型：1：包含，0：不包含
            "basicGrade":this.form.level.join(','),//等级id
            "basicProvince":this.form.pro,//省份
            "basicCity":this.form.city,//城市
            "basicMemberStartTime":this.form.entryTimeCondition ==2 ?  this.form.entryTimerange[0] :this.form.entryTimeCondition ==3 ?  this.form.entryTime : '',//入会开始时间（介于：两个都有值，早于：结束时间有值，开始时间为空，晚于：开始时间有值，结束时间为空）
            "basicMemberEndTime":this.form.entryTimeCondition ==2 ?  this.form.entryTimerange[1] :this.form.entryTimeCondition ==1 ?  this.form.entryTime : '',//入会结束时间
            "basicEmailType":type,//邮箱类型（1：包含，0：不包含）:全部：为包含，basicEmail传空，其他为不包含，basicEmail传未选中的
            "basicEmail":email,//邮箱英文逗号分隔
            "basicMemberSourceType":this.form.sourceCondition,//客户来源类型（1：包含，0：不包含）
            "basicMemberSource":this.form.source,//客户来源英文逗号分隔
            "type":"BASIC"//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
        },
        //RFM属性
        {
          "type":"RFM",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
          //第一次付款时间
          "rfmFirstPayTimeType":this.form.payTimeType,//首次付款时间类型（1：绝对，2：距离当前）
          "rfmFirstPayTimeStart":this.form.payTimeType ==2 ? this.form.payTimeMinDay :  this.form.payTime[0],//首次付款开始时间（绝对：具体时间，距离当前：天数） payTimeMinDay
          "rfmFirstPayTimeEnd":this.form.payTimeType ==2 ? this.form.payTimeMaxDay :  this.form.payTime[1],//首次付款结束时间（绝对：具体时间，距离当前：天数） payTimeMaxDay
          //最近一次付款时间
          "rfmLastPayTimeType":this.form.lastPayType,//最近一次付款时间类型（1：绝对，2：距离当前）
          "rfmLastPayTimeStart":this.form.lastPayType ==2 ? this.form.lastPayTimeMinDay :  this.form.lastPayTime[0],//最近一次付款开始时间（绝对：具体时间，距离当前：天数）
          "rfmLastPayTimeEnd":this.form.lastPayType ==2 ? this.form.lastPayTimeMaxDay :  this.form.lastPayTime[1],//最近一次付款结束时间（绝对：具体时间，距离当前：天数）
          //首次下单时间
          "rfmFirstOrderTimeType":this.form.firstOrderType,//首次下单时间类型（1：绝对，2：距离当前）
          "rfmFirstOrderTimeStart":this.form.firstOrderType ==2 ? this.form.firstOrderTimeMinDay :  this.form.firstOrderTime[0],//首次下单开始时间（绝对：具体时间，距离当前：天数）
          "rfmFirstOrderTimeEnd":this.form.firstOrderType ==2 ? this.form.firstOrderTimeMaxDay :  this.form.firstOrderTime[1],//首次下单结束时间（绝对：具体时间，距离当前：天数）
          //最近一次成功时间
          "rfmLastSuccessTimeType":this.form.lastSucType,//最近一次成功时间类型（1：绝对，2：距离当前）
          "rfmLastSuccessTimeStart":this.form.lastSucType ==2 ? this.form.lastSucTimeMinDay :  this.form.lastSucTime[0],//最近一次成功开始时间（绝对：具体时间，距离当前：天数）
          "rfmLastSuccessTimeEnd":this.form.lastSucType ==2 ? this.form.lastSucTimeMaxDay :  this.form.lastSucTime[1],//最近一次成功结束时间（绝对：具体时间，距离当前：天数）
          //交易成功次数
          "rfmTradeSuccessMinTimes":this.form.condition ==2 ?  this.form.minTimes :this.form.condition ==1 ?  this.form.times : '',//交易成功最小次数
          "rfmTradeSuccessMaxTimes":this.form.condition ==2 ?  this.form.maxTimes :this.form.condition ==3 ?  this.form.times : '',//交易成功最大次数
          //下单次数
          "rfmOrderMinTimes":this.form.orderCondition ==2 ?  this.form.orderMinTimes :this.form.orderCondition ==1 ?  this.form.orderTimes : '',//下单最小次数
          "rfmOrderMaxTimes":this.form.orderCondition ==2 ?  this.form.orderMaxTimes :this.form.orderCondition ==3 ?  this.form.orderTimes : '',//下单最大次数
          //下单金额
          "rfmOrderMinTotal":this.form.orderMoneyCondition ==2 ?  this.form.orderMoneyMinTimes :this.form.orderMoneyCondition ==1 ?  this.form.orderMoneyTimes : '',//下单最小总额
          "rfmOrderMaxTotal":this.form.orderMoneyCondition ==2 ?  this.form.orderMoneyMaxTimes :this.form.orderMoneyCondition ==3 ?  this.form.orderMoneyTimes : '',//下单最大总额
          //付款次数
          "rfmPayMinTimes":this.form.payCondition ==2 ?  this.form.payMinTimes :this.form.payCondition ==1 ?  this.form.payTimes : '',//付款最小次数
          "rfmPayMaxTimes":this.form.payCondition ==2 ?  this.form.payMaxTimes :this.form.payCondition ==3 ?  this.form.payTimes : '',//付款最大次数
          //成功金额
          "rfmSuccessMinTotal":this.form.sucCondition ==2 ?  this.form.sucMinTimes :this.form.sucCondition ==1 ?  this.form.sucTimes : '',//成功最小金额
          "rfmSuccessMaxTotal":this.form.sucCondition ==2 ?  this.form.sucMaxTimes :this.form.sucCondition ==3 ?  this.form.sucTimes : '',//成功最大金额
             //付款金额
          "rfmPayMinTotal":this.form.payMoneyCondition ==2 ?  this.form.payMoneyMinTimes :this.form.payMoneyCondition ==1 ?  this.form.payMoneyTimes : '',//付款最小金额
          "rfmPayMaxTotal":this.form.payMoneyCondition ==2 ?  this.form.payMoneyMaxTimes :this.form.payMoneyCondition ==3 ?  this.form.payMoneyTimes : '',//付款最大金额
          //退款次数
          "rfmRefundMinTimes":this.form.returnCondition ==2 ?  this.form.returnMinTimes :this.form.returnCondition ==1 ?  this.form.returnTimes : '',//退款最小次数
          "rfmRefundMaxTimes":this.form.returnCondition ==2 ?  this.form.returnMaxTimes :this.form.returnCondition ==3 ?  this.form.returnTimes : '',//退款最大次数
          //退款金额
          "rfmRefundMinTotal":this.form.returnMoneyCondition ==2 ?  this.form.returnMoneyMinTimes :this.form.returnMoneyCondition ==1 ?  this.form.returnMoneyTimes : '',//退款最小金额
          "rfmRefundMaxTotal":this.form.returnMoneyCondition ==2 ?  this.form.returnMoneyMaxTimes :this.form.returnMoneyCondition ==3 ?  
          this.form.returnMoneyTimes : '',//退款最大金额
            //客单价
          "rfmAtvMin":this.form.oneMoneyCondition ==2 ?  this.form.oneMoneyMinTimes :this.form.oneMoneyCondition ==1 ?  this.form.oneMoneyTimes : '',//客单价最小值
          "rfmAtvMax":this.form.oneMoneyCondition ==2 ?  this.form.oneMoneyMaxTimes :this.form.oneMoneyCondition ==3 ?  this.form.oneMoneyTimes : '',//客单价最大值
          //客单件
          "rfmUptMin":this.form.oneCondition ==2 ?  this.form.oneMinTimes :this.form.oneCondition ==1 ?  this.form.oneTimes : '',//客单件最小值
          "rfmUptMax":this.form.oneCondition ==2 ?  this.form.oneMaxTimes :this.form.oneCondition ==3 ?  this.form.oneTimes : ''//客单件最大值
        },
        //营销属性
        {
          "type":"MARKETING",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
          "marketingLastSmsTimeType":this.form.lastSmsType,//最近一次短信营销时间类型（1：绝对，2：距离当前）
          "marketingLastSmsTimeStart":this.form.lastSmsType==2? this.form.lastSmsTimeMin : this.form.lastSmsTime[0],//最近一次短信营销开始时间（绝对：具体时间，距离当前：天数）
          "marketingLastSmsTimeEnd":this.form.lastSmsType==2? this.form.lastSmsTimeMax : this.form.lastSmsTime[1],//最近一次短信营销结束时间（绝对：具体时间，距离当前：天数）
          "marketingLastEdmTimeType":this.form.lastEmailType,//最近一次邮件营销时间类型（1：绝对，2：距离当前）
          "marketingLastEdmTimeStart":this.form.lastEmailType==2? this.form.lastEmailTimeMin : this.form.lastEmailTime[0],//最近一次邮件营销开始时间（绝对：具体时间，距离当前：天数）
          "marketingLastEdmTimeEnd":this.form.lastEmailType==2? this.form.lastEmailTimeMax : this.form.lastEmailTime[1],//最近一次短邮件销结束时间（绝对：具体时间，距离当前：天数）
          "marketingSmsBacklist":this.marketing.value3 ? 1 : '',//营销短信黑名单（1：排除，传空为不排除）
          "marketingEdmBacklist":this.marketing.value4 ? 1 : '',//营销邮件黑名单（1：排除，传空为不排除）
          "marketingSmsTimesMin":this.form.smsTimes,//短信营销次数最小值
          "marketingSmsTimesMax":this.form.smsTimes,//短信营销次数最大值
          "marketingEdmTimesMin":this.form.emailTimes,//邮件营销次数最小值
          "marketingEdmTimesMax":this.form.emailTimes//邮件营销次数最大值
        },
        //交易属性
        {
            "type":"TRADE",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
            "tradeSkuCode":goods.join(','),//商品id英文逗号分隔
            "tradeStatus":this.form.statu.join(','),//订单状态英文逗号分隔,可选状态如下：//TRADE_NO_CREATE_PAY(没有创建支付宝交易) //WAIT_BUYER_PAY(等待买家付款) //WAIT_SELLER_SEND_GOODS(等待卖家发货,即:买家已付款) //WAIT_BUYER_CONFIRM_GOODS(等待买家确认收货,即:卖家已发货) //TRADE_BUYER_SIGNED(买家已签收,货到付款专用) //TRADE_FINISHED(交易成功) //TRADE_CLOSED(付款以后用户退款成功，交易自动关闭) //TRADE_CLOSED_BY_TAOBAO(付款以前，卖家或买家主动关闭交易)//PAY_PENDING(国际信用卡支付付款确认中)
            "tradeTotalMin":this.form.moneyType ==2 ? this.form.minMoney : this.form.moneyType ==1 ? this.form.money :'',//订单金额最小值
            "tradeTotalMax":this.form.moneyType ==2 ? this.form.maxMoney : this.form.moneyType ==3 ? this.form.money :'',//订单金额最大值
            "tradeSource":this.form.sources.join(',')//订单来源：PC:PC端，WAP:手机端，JHS：聚划算
        },
        //自定义属性
        // {
        //     "type":"LABEL",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
        //     "custom":newArr
        // },
      ]
      var data = {
        'shopInfoId':this.shopId,
        'content' : this.content
      }
      
      this.$http.post("" + process.env.API_ROOT + "/customer/manage/customerGroup/calcPeopleOnTime", data)
      .then(res => {
        // console.log('人数',res);
        if (res.data.code == 1) {
          this.num = res.data.data.edm + res.data.data.sms +res.data.data.tb
          // console.log(this.num)
        } else {
          this.num = 0
  
        }
      })
      .catch(err => {
        console.log(err);

        alert("网络异常");
      });
    },

    // handleSelectionChange(val) {
    //   // console.log(val)
    //   this.selectGoods = val;
    // },
    // 清空标签
    clearTag(){
      this.num =0
      this.change={
        value1:false,
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
        value7:false,
        value8:false,
        value9:false,
        value10:false,
      }
      this.deal={
        value1:false,
        value2:false,
        value3:false,
        value4:false,
      }
      this.marketing={
        value1:false,
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
      },
      this.rfm={
        value1:false,
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
        value7:false,
        value8:false,
        value9:false,
        value10:false,
        value11:false,
        value12:false,
        value13:false,
        value14:false,
      }
      this.pro.forEach(item => {
        item.value = false
      });
    },
    sub(){
      console.log(this.radio)
      if(this.radio){
        this.getMore(this.id)
      }else{
        if(this.radio !==0){
          
          this.$message({
            type:'error',
            message:'请选择一条分组'
          })
        } 
      }
    },
    //保存分组
    save(){
      var type = ''
      var email = ''
      // 全选情况下
      if(this.form.checkAll){
        type=1
        email = ''
      }else{ 
        //非全选
        //如果 有其他 为排除
        if(this.form.checkedCities.join(',').indexOf('其他')!=-1){
          type=0
          //一个没有 2个有
          //无163
          if(this.form.checkedCities.join(',').indexOf('@qq.com')!=-1  && this.form.checkedCities.join(',').indexOf('@sina.com')!=-1 && this.form.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@163.com'
          }
          //无sina
          if(this.form.checkedCities.join(',').indexOf('@qq.com')!=-1 && this.form.checkedCities.join(',').indexOf('@sina.com')==-1 && this.form.checkedCities.join(',').indexOf('@163.com')!=-1){
            email = '@sina.com'
          }
          //无qq
          if(this.form.checkedCities.join(',').indexOf('@qq.com')==-1 && this.form.checkedCities.join(',').indexOf('@sina.com')!=-1 && this.form.checkedCities.join(',').indexOf('@163.com')!=-1){
            email = '@qq.com'
          }
          
          //有一个有  2个没有
          //有sina
          if(this.form.checkedCities.join(',').indexOf('@qq.com')==-1 && this.form.checkedCities.join(',').indexOf('@sina.com')!=-1 && this.form.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@qq.com,@163.com'
          }
          //有qq
          if(this.form.checkedCities.join(',').indexOf('@qq.com')!=-1 && this.form.checkedCities.join(',').indexOf('@sina.com')==-1 && this.form.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@163.com,@sina.com'
          }
          //有163
          if(this.form.checkedCities.join(',').indexOf('@qq.com')==-1 && this.form.checkedCities.join(',').indexOf('@sina.com')==-1 && this.form.checkedCities.join(',').indexOf('@163.com')!=-1){
            email = '@163.com,@qq.com'
          }
          //3这都没有
          if(this.form.checkedCities.join(',').indexOf('@qq.com')==-1 && this.form.checkedCities.join(',').indexOf('@sina.com')==-1 && this.form.checkedCities.join(',').indexOf('@163.com')==-1){
            email = '@qq.com,@sina.com,@163.com'
          }
        }else{
          //如果没有其他
          if(this.form.checkedCities.join(',').indexOf('@qq.com')==-1 && this.form.checkedCities.join(',').indexOf('@sina.com')==-1 && this.form.checkedCities.join(',').indexOf('@163.com')==-1){
            type = ''
            email=''
          }else{
            type = 1
            email = this.form.checkedCities.join(',')
          }
        }
      }
      var mobile = ''
      if(this.form.mobile.join(',').indexOf('-1')!=-1){
        mobile = "130,131,132,133,134,135,136,137,138,139,145,146,147,148,149,150,151,152,153,155,156,157,158,159,165,166,170,171,172,173,174,175,176,177,178,180,181,182,183,184,185,186,187,188,189,191,198,199"
      }else{
        //非全部 有其他
        if(this.form.mobile.join(',').indexOf(',0')!=-1){
          console.log('非全部 有其他')
          console.log(this.form.mobile.join(','))
          mobile = this.form.mobile.join(',').replace(',0','')
          console.log(mobile)
        }else{
          //无其他
          console.log('非全部 无其他')
          mobile = this.form.mobile.join(',')
        }
      }
      var goods = []
      this.form.selectGoods.forEach(item=>{
        goods.push(item.sku_code)
      })
      var valueArr = []
      this.form.proValue.forEach((item,index)=>{
        // console.log(item)
          valueArr.push(
            {
              "customLabelName":item.name,//自定义属性名称
              "customLabelValue":item.type==1 ? item.radio : item.type==2 ? item.checkedValue.join(',') :item.type==3 ? item.select :item.type==5 ?item.value :item.type==6 ? item.daterange.join(',') :'',//自定义属性值
              "customLabelType":item.type//属性类型:单选 1 复选2 下拉3 列表4 文本5 日期6
            },
          )
      })
      this.content = [
        // 基本属性
        {
            'basicStore' :this.form.store,
            "basicSex":this.form.sex,//性别（0：女，1：男）
            "basicBirthdayStart":this.form.birthCondition ==2 ?  this.form.daterange[0] :this.form.birthCondition ==3 ?  this.form.date : '',//生日开始时间（介于：两个都有值，早于：结束时间有值，开始时间为空，晚于：开始时间有值，结束时间为空）

            "basicBirthdayEnd":this.form.birthCondition ==2 ?  this.form.daterange[1] :this.form.birthCondition ==1 ?  this.form.date :'',//生日结束时间
            "basicMobile": mobile,//手机号英文逗号分隔
            "basicMobileType":this.form.mobileType,//是否包含（1：包含，0：排除），选中其他表示排除列表其他号码前缀
            "basicPointType":this.form.pointType,//积分类型（互动积分:INTERACTION,交易积分:TRADE,全部积分:ALL）
            "basicMinPoint":this.form.pointCondition ==2 ?  this.form.minPoint :this.form.pointCondition ==3 ?  this.form.point : '',//积分最小值（介于：两个都有值，小于：积分最大值有值，积分最小值为空，大于：积分最小值有值，积分最大值为空）
            "basicMaxPoint":this.form.pointCondition ==2 ?  this.form.maxPoint :this.form.pointCondition ==1 ?  this.form.point : '',//积分最大值
            "basicGradeType":this.form.levelType,//等级类型：1：包含，0：不包含
            "basicGrade":this.form.level.join(','),//等级id
            "basicProvince":this.form.pro,//省份
            "basicCity":this.form.city,//城市
            "basicMemberStartTime":this.form.entryTimeCondition ==2 ?  this.form.entryTimerange[0] :this.form.entryTimeCondition ==3 ?  this.form.entryTime : '',//入会开始时间（介于：两个都有值，早于：结束时间有值，开始时间为空，晚于：开始时间有值，结束时间为空）
            "basicMemberEndTime":this.form.entryTimeCondition ==2 ?  this.form.entryTimerange[1] :this.form.entryTimeCondition ==1 ?  this.form.entryTime : '',//入会结束时间
            "basicEmailType":type,//邮箱类型（1：包含，0：不包含）:全部：为包含，basicEmail传空，其他为不包含，basicEmail传未选中的
            "basicEmail":email,//邮箱英文逗号分隔
            "basicMemberSourceType":this.form.sourceCondition,//客户来源类型（1：包含，0：不包含）
            "basicMemberSource":this.form.source,//客户来源英文逗号分隔
            "type":"BASIC"//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
        },
        //RFM属性
        {
          "type":"RFM",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段



          //第一次付款时间
          "rfmFirstPayTimeType":this.form.payTimeType,//首次付款时间类型（1：绝对，2：距离当前）
          "rfmFirstPayTimeStart":this.form.payTimeType ==2 ? this.form.payTimeMinDay :  this.form.payTime[0],//首次付款开始时间（绝对：具体时间，距离当前：天数） payTimeMinDay
          "rfmFirstPayTimeEnd":this.form.payTimeType ==2 ? this.form.payTimeMaxDay :  this.form.payTime[1],//首次付款结束时间（绝对：具体时间，距离当前：天数） payTimeMaxDay


          //最近一次付款时间
          "rfmLastPayTimeType":this.form.lastPayType,//最近一次付款时间类型（1：绝对，2：距离当前）
          "rfmLastPayTimeStart":this.form.lastPayType ==2 ? this.form.lastPayTimeMinDay :  this.form.lastPayTime[0],//最近一次付款开始时间（绝对：具体时间，距离当前：天数）
          "rfmLastPayTimeEnd":this.form.lastPayType ==2 ? this.form.lastPayTimeMaxDay :  this.form.lastPayTime[1],//最近一次付款结束时间（绝对：具体时间，距离当前：天数）


          //首次下单时间
          "rfmFirstOrderTimeType":this.form.firstOrderType,//首次下单时间类型（1：绝对，2：距离当前）
          "rfmFirstOrderTimeStart":this.form.firstOrderType ==2 ? this.form.firstOrderTimeMinDay :  this.form.firstOrderTime[0],//首次下单开始时间（绝对：具体时间，距离当前：天数）
          "rfmFirstOrderTimeEnd":this.form.firstOrderType ==2 ? this.form.firstOrderTimeMaxDay :  this.form.firstOrderTime[1],//首次下单结束时间（绝对：具体时间，距离当前：天数）


          //最近一次成功时间
          "rfmLastSuccessTimeType":this.form.lastSucType,//最近一次成功时间类型（1：绝对，2：距离当前）
          "rfmLastSuccessTimeStart":this.form.lastSucType ==2 ? this.form.lastSucTimeMinDay :  this.form.lastSucTime[0],//最近一次成功开始时间（绝对：具体时间，距离当前：天数）
          "rfmLastSuccessTimeEnd":this.form.lastSucType ==2 ? this.form.lastSucTimeMaxDay :  this.form.lastSucTime[1],//最近一次成功结束时间（绝对：具体时间，距离当前：天数）


          //交易成功次数
          "rfmTradeSuccessMinTimes":this.form.condition ==2 ?  this.form.minTimes :this.form.condition ==1 ?  this.form.times : '',//交易成功最小次数
          "rfmTradeSuccessMaxTimes":this.form.condition ==2 ?  this.form.maxTimes :this.form.condition ==3 ?  this.form.times : '',//交易成功最大次数
       
          //下单次数
          "rfmOrderMinTimes":this.form.orderCondition ==2 ?  this.form.orderMinTimes :this.form.orderCondition ==1 ?  this.form.orderTimes : '',//下单最小次数
          "rfmOrderMaxTimes":this.form.orderCondition ==2 ?  this.form.orderMaxTimes :this.form.orderCondition ==3 ?  this.form.orderTimes : '',//下单最大次数


          //下单金额
          
          "rfmOrderMinTotal":this.form.orderMoneyCondition ==2 ?  this.form.orderMoneyMinTimes :this.form.orderMoneyCondition ==1 ?  this.form.orderMoneyTimes : '',//下单最小总额
          "rfmOrderMaxTotal":this.form.orderMoneyCondition ==2 ?  this.form.orderMoneyMaxTimes :this.form.orderMoneyCondition ==3 ?  this.form.orderMoneyTimes : '',//下单最大总额

          //付款次数

          "rfmPayMinTimes":this.form.payCondition ==2 ?  this.form.payMinTimes :this.form.payCondition ==1 ?  this.form.payTimes : '',//付款最小次数
          "rfmPayMaxTimes":this.form.payCondition ==2 ?  this.form.payMaxTimes :this.form.payCondition ==3 ?  this.form.payTimes : '',//付款最大次数


          //成功金额
          "rfmSuccessMinTotal":this.form.sucCondition ==2 ?  this.form.sucMinTimes :this.form.sucCondition ==1 ?  this.form.sucTimes : '',//成功最小金额
          "rfmSuccessMaxTotal":this.form.sucCondition ==2 ?  this.form.sucMaxTimes :this.form.sucCondition ==3 ?  this.form.sucTimes : '',//成功最大金额


             //付款金额
          "rfmPayMinTotal":this.form.payMoneyCondition ==2 ?  this.form.payMoneyMinTimes :this.form.payMoneyCondition ==1 ?  this.form.payMoneyTimes : '',//付款最小金额
          "rfmPayMaxTotal":this.form.payMoneyCondition ==2 ?  this.form.payMoneyMaxTimes :this.form.payMoneyCondition ==3 ?  this.form.payMoneyTimes : '',//付款最大金额


          //退款次数
          "rfmRefundMinTimes":this.form.returnCondition ==2 ?  this.form.returnMinTimes :this.form.returnCondition ==1 ?  this.form.returnTimes : '',//退款最小次数
          "rfmRefundMaxTimes":this.form.returnCondition ==2 ?  this.form.returnMaxTimes :this.form.returnCondition ==3 ?  this.form.returnTimes : '',//退款最大次数

          //退款金额
          "rfmRefundMinTotal":this.form.returnMoneyCondition ==2 ?  this.form.returnMoneyMinTimes :this.form.returnMoneyCondition ==1 ?  this.form.returnMoneyTimes : '',//退款最小金额
          "rfmRefundMaxTotal":this.form.returnMoneyCondition ==2 ?  this.form.returnMoneyMaxTimes :this.form.returnMoneyCondition ==3 ?  
          this.form.returnMoneyTimes : '',//退款最大金额


            //客单价
          "rfmAtvMin":this.form.oneMoneyCondition ==2 ?  this.form.oneMoneyMinTimes :this.form.oneMoneyCondition ==1 ?  this.form.oneMoneyTimes : '',//客单价最小值
          "rfmAtvMax":this.form.oneMoneyCondition ==2 ?  this.form.oneMoneyMaxTimes :this.form.oneMoneyCondition ==3 ?  this.form.oneMoneyTimes : '',//客单价最大值


          //客单件
          "rfmUptMin":this.form.oneCondition ==2 ?  this.form.oneMinTimes :this.form.oneCondition ==1 ?  this.form.oneTimes : '',//客单件最小值
          "rfmUptMax":this.form.oneCondition ==2 ?  this.form.oneMaxTimes :this.form.oneCondition ==3 ?  this.form.oneTimes : ''//客单件最大值
        },
        //营销属性
        {
          "type":"MARKETING",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段


          "marketingLastSmsTimeType":this.form.lastSmsType,//最近一次短信营销时间类型（1：绝对，2：距离当前）
          "marketingLastSmsTimeStart":this.form.lastSmsType==2? this.form.lastSmsTimeMin : this.form.lastSmsTime[0],//最近一次短信营销开始时间（绝对：具体时间，距离当前：天数）
          "marketingLastSmsTimeEnd":this.form.lastSmsType==2? this.form.lastSmsTimeMax : this.form.lastSmsTime[1],//最近一次短信营销结束时间（绝对：具体时间，距离当前：天数）


          "marketingLastEdmTimeType":this.form.lastEmailType,//最近一次邮件营销时间类型（1：绝对，2：距离当前）
          "marketingLastEdmTimeStart":this.form.lastEmailType==2? this.form.lastEmailTimeMin : this.form.lastEmailTime[0],//最近一次邮件营销开始时间（绝对：具体时间，距离当前：天数）
          "marketingLastEdmTimeEnd":this.form.lastEmailType==2? this.form.lastEmailTimeMax : this.form.lastEmailTime[1],//最近一次短邮件销结束时间（绝对：具体时间，距离当前：天数）



          "marketingSmsBacklist":this.marketing.value3 ? 1 : '',//营销短信黑名单（1：排除，传空为不排除）
          "marketingEdmBacklist":this.marketing.value4 ? 1 : '',//营销邮件黑名单（1：排除，传空为不排除）



          "marketingSmsTimesMin":this.form.smsTimes,//短信营销次数最小值
          "marketingSmsTimesMax":this.form.smsTimes,//短信营销次数最大值
          "marketingEdmTimesMin":this.form.emailTimes,//邮件营销次数最小值
          "marketingEdmTimesMax":this.form.emailTimes//邮件营销次数最大值
        },
        //交易属性
        {
            "type":"TRADE",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
            "tradeSkuCode":goods.join(','),//商品id英文逗号分隔
            "tradeStatus":this.form.statu.join(','),//订单状态英文逗号分隔,可选状态如下：//TRADE_NO_CREATE_PAY(没有创建支付宝交易) //WAIT_BUYER_PAY(等待买家付款) //WAIT_SELLER_SEND_GOODS(等待卖家发货,即:买家已付款) //WAIT_BUYER_CONFIRM_GOODS(等待买家确认收货,即:卖家已发货) //TRADE_BUYER_SIGNED(买家已签收,货到付款专用) //TRADE_FINISHED(交易成功) //TRADE_CLOSED(付款以后用户退款成功，交易自动关闭) //TRADE_CLOSED_BY_TAOBAO(付款以前，卖家或买家主动关闭交易)//PAY_PENDING(国际信用卡支付付款确认中)
            "tradeTotalMin":this.form.moneyType ==2 ? this.form.minMoney : this.form.moneyType ==1 ? this.form.money :'',//订单金额最小值
            "tradeTotalMax":this.form.moneyType ==2 ? this.form.maxMoney : this.form.moneyType ==3 ? this.form.money :'',//订单金额最大值
            "tradeSource":this.form.sources.join(','),//订单来源：PC:PC端，WAP:手机端，JHS：聚划算
        },
        //自定义属性
        {
            "type":"LABEL",//子条件类型:(BASIC:基础属性,LABEL:自定义属性,RFM:RFM属性,TRADE:交易属性,MARKETING:营销属性)，子条件不为空时为必传字段
            "custom":valueArr
        },
      ]



      var data ={
        "customerGroupName":this.form.name,//分组名称
        "catalogId":this.form.catalog,//目录id
        "shopInfoId":this.shopId,//店铺id
        'content':this.content
      }

      // console.log(data)

      


        







      // /customer/manage/customerGroup/add
      this.$http
          .post("" + process.env.API_ROOT + "/customer/manage/customerGroup/add", data)
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
             this.$message({
               type:'success',
               message:'保存成功'
             })
              this.back()
            } else {
      
            }
          })
          .catch(err => {
            console.log(err);

            alert("网络异常");
          });
    },
    //获取自定义属性
    //获取自定义属性列表
    getProList(shopid) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/property/getEnabledProperties?shopInfoId=" +
          shopid 
      })
        .then(res => {
          // console.log("自定义属性列表", res);
          if (res.data.code == 1) {
            this.proList = res.data.data;
            this.pro=[];
            for(var i =0;i<this.proList.length;i++){
              this.pro.push({
                value:false
              })
              this.form.proValue.push(
                {
                  type:this.proList[i].customPropertyType,
                  name:this.proList[i].customPropertyName,
                  checkAll: false,
                  checkedValue: [],
                  isIndeterminate: false,
                  select :'',
                  value:'',
                  daterange:[],
                  radio:''
                }
              )
            } 
            console.log(this.pro)
            console.log(this.proList)
            console.log(this.form.proValue)
          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    rowClick(row){
      // this.pageSize * (this.currentPage - 1) + index + 1;
      this.radio = this.tableData.indexOf(row) +1 +this.pageSize * (this.currentPage - 1);
      this.id =row.customer_group_id
      console.log(row)
    },
    getMore(id) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/customerGroup/queryOne?customerGroupId=" +
          id 
      })
        .then(res => {
          console.log("分组详情", res);
          if (res.data.code == 1) {
            console.log(JSON.parse(res.data.data.customerGroupContent))
            var data = JSON.parse(res.data.data.customerGroupContent)
            Bus.$emit('tagData',data);
            // this.radio = '';
            // this.id='';
              if(data[0]){
                //性别显示否
                if(data[0].basicSex==1 ||data[0].basicSex===0){
                  this.change.value1 = true
                }
                //生日显示否
                if(data[0].basicBirthdayStart || data[0].basicBirthdayEnd){
                  this.change.value2 = true
                }
                //手机显示否
                if(data[0].basicMobile){
                  this.change.value3= true
                }
                //积分显示否
                if(data[0].basicPointType){
                  this.change.value4= true
                }
                //等级显示否
                if(data[0].basicGrade){
                  this.change.value5= true
                }
                //地区显示否
                if(data[0].basicProvince){
                  this.change.value6= true
                }
                //入会时间显示否
                if(data[0].basicMemberStartTime || data[0].basicMemberEndTime){
                  this.change.value7= true
                }
                //邮箱显示否
                if(data[0].basicEmailType ===0 || data[0].basicEmailType ==1){
                  this.change.value8= true
                }
                //客户来源显示否
                if(data[0].basicMemberSource){
                  this.change.value9= true
                }
              }else{
                
              }
              //rfm属性显示否 
              if(data[1]){
                //首次付款时间显示否
                if(data[1].rfmFirstPayTimeType){
                  this.rfm.value1 = true
                }
                //最近一次付款时间显示否
                if(data[1].rfmLastPayTimeType){
                  this.rfm.value2 = true
                }
                //首次下单时间显示否
                if(data[1].rfmFirstOrderTimeType){
                  this.rfm.value3= true
                }
                //最近一次成功时间显示否
                if(data[1].rfmLastSuccessTimeType){
                  this.rfm.value4= true
                }
                //交易成功次数
                if(data[1].rfmTradeSuccessMinTimes || data[1].rfmTradeSuccessMaxTimes){
                  this.rfm.value5= true
                }
                //下单次数
                if(data[1].rfmOrderMinTimes ||data[1].rfmOrderMaxTimes ){
                  this.rfm.value6= true
                }
                //下单总额
                if(data[1].rfmOrderMinTotal || data[1].rfmOrderMaxTotal ){
                  this.rfm.value7= true
                }
                //付款次数
                if(data[1].rfmPayMinTimes || data[1].rfmPayMaxTimes ){
                  this.rfm.value8= true
                }
                //成功金额
                if(data[1].rfmSuccessMinTotal || data[1].rfmSuccessMaxTotal){
                  this.rfm.value9= true
                }
                //付款金额
                if(data[1].rfmPayMinTotal || data[1].rfmPayMaxTotal){
                  this.rfm.value10= true
                }
                //退款次数
                if(data[1].rfmRefundMinTimes || data[1].rfmRefundMaxTimes){
                  this.rfm.value11= true
                }
                //退款金额
                if(data[1].rfmRefundMinTotal || data[1].rfmRefundMaxTotal){
                  this.rfm.value12= true
                }
                //客单价
                if(data[1].rfmAtvMin || data[1].rfmAtvMax){
                  this.rfm.value13= true
                }
                //客单件
                if(data[1].rfmUptMin || data[1].rfmUptMax){
                  this.rfm.value14= true
                }
              }else{
                
              }

              // 交易属性  显示否
              if(data[3]){
                if(data[3].tradeSkuCode){
                  this.deal.value1 = true 
                }
                if(data[3].tradeTotalMin || data[3].tradeTotalMax){
                  this.deal.value2 = true 
                }
                if(data[3].tradeStatus){
                  this.deal.value3 = true 
                }
                if(data[3].tradeSource){
                  this.deal.value4 = true 
                }
              }else{

              }


              if(data[2]){

                if(data[2].marketingLastSmsTimeStart && data[2].marketingLastSmsTimeEnd){
                  this.marketing.value1 = true 
                }
                if(data[2].marketingLastEdmTimeStart && data[2].marketingLastEdmTimeEnd){
                  this.marketing.value2 = true 
                }
                if(data[2].marketingSmsBacklist){
                  this.marketing.value3 = true 
                }
                if(data[2].marketingEdmBacklist){
                  this.marketing.value4 = true 
                }
                if(data[2].marketingSmsTimesMin){
                  this.marketing.value5 = true 
                }
                if(data[2].marketingEdmTimesMin){
                  this.marketing.value6 = true 
                }
              }else{

              }

              if(data[4]){
                if(data[4].custom.length == 0){
                  console.log('长度为0')
                }else{
                  console.log('长度不为0')
                    this.pro=[];

                  for(var i=0;i<=data[4].custom.length;i++){
                    this.pro.push({
                      value:true
                    })
                  }
                }
              }else{

              }



            } 
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
    q(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    //改变目录
    changeCatalog(val){
      console.log(val)
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
    },
    // 获取分组列表
    getGroupList(pageIndex, pageSize, shopid) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/customerGroup/queryList?shopInfoId=" +
          shopid +'&customerGroupName=' + this.selStr +'&catalogId='+this.select +'&pageIndex='+pageIndex +'&pageSize='+pageSize
      })
        .then(res => {
          console.log("分组列表", res);
          if (res.data.code == 1) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          }else{
          }
        })
        .catch(error => {
          console.log(error);
          alert("网络异常");
        });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
    },
    search(){
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)
    },
    qx(){
      this.dialogVisible = false
      this.insert = false
      
      this.resetForm('catalogForm')
    },
  
    commit() {
      
        this.$http
          .post("" + process.env.API_ROOT + "/customer/manage/catalog/add", {
            catalogName: this.catalogForm.catalogName ,
            shopInfoId: this.shopId,
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: "新增目录管理成功"
              });
              this.getCatalogList(this.shopId)
              this.qx();
              
            } else {
            if (res.data.code == -1) {
              this.$message({
                type: "error",
                message: "系统异常"
              });
            }
            if (res.data.code == 31001) {
              this.$message({
                type: "error",
                  message: '时间格式不正确'
              });
            }
            if (res.data.code == 31002) {
              this.$message({
                type: "error",
                message: "目录名称含有特殊字符"
              });
            }
            if (res.data.code == 31004) {
              this.$message({
                type: "error",
                message: "目录名称超出10个长度"
              });
            }
            if (res.data.code == 31005) {
              this.$message({
                type: "error",
                message: "目录名称已存在"
              });
            }
            if (res.data.code == 31006) {
              this.$message({
                type: "error",
                message: "目录不存在"
              });
            }
            if (res.data.code == 31007) {
              this.$message({
                type: "error",
                message: "目录下存在客户分组，不允许删除"
              });
            }
            if (res.data.code == 31008) {
              this.$message({
                type: "error",
                message: "目录已删除请勿重复操作"
              });
            }
            if (res.data.code == 31009) {
              this.$message({
                type: "error",
                message: "默认目录不可编辑"
              });
            }
            if (res.data.code == 31010) {
              this.$message({
                type: "error",
                message: "默认目录不可删除"
              });
            }
            }
          })
          .catch(err => {
            console.log(err);

            alert("网络异常");
          });
    },
    //引入已有分组
    add(){
      this.clearTag()
      this.insert = true
      this.getGroupList(this.currentPage,this.pageSize,this.shopId)

    },
    //新建目录
    addCatalog(){
      this.dialogVisible = true
    },
    //表单验证
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
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.commit();
          this.save()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取目录列表
    getCatalogList(shopid) {
      this.$http({
        method: "get",
        url:
          "" +
          process.env.API_ROOT +
          "/customer/manage/catalog/query?shopInfoId=" +
          shopid 
      })
        .then(res => {
          // console.log("目录管理列表", res);
          if (res.data.code == 1) {
            if(res.data.data.list.length!=0){
              this.form.catalog = res.data.data.list[0].catalog_id
            }else{
              this.form.catalog=''
            }
            this.catalogList = res.data.data.list
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error);
          alert("网络异常");
        });
    },
    // receiveBaseMsg(data){
    //   // console.log(data)
    //   this.baseData = data 
    // },
    // receiveRfm(data){
    //   // console.log(data)
    //   this.form = data
    // },
    // receiveDeal(data){
    //   console.log(data)
    //   this.form = data
    // },
    // receivePro(data){
    //   // console.log(data)
    //   this.proData = data
    // },
    // receiveMarketing(data){
    //   // console.log(data)
    //   this.form = data
    // },
    change1(){
      this.change.value1 = !this.change.value1
    },
    change2(){
      this.change.value2 = !this.change.value2
    },
    change3(){
      this.change.value3 = !this.change.value3
    },
    change4(){
      this.change.value4 = !this.change.value4
    },
    change5(){
      this.change.value5 = !this.change.value5
    },
    change6(){
      this.change.value6 = !this.change.value6
    },
    change7(){
      this.change.value7 = !this.change.value7
    },
    change8(){
      this.change.value8 = !this.change.value8
    },
    change9(){
      this.change.value9 = !this.change.value9
    },
    rfm1(){
      this.rfm.value1 = !this.rfm.value1
    },
    rfm2(){
      this.rfm.value2 = !this.rfm.value2
    },
    rfm3(){
      this.rfm.value3 = !this.rfm.value3
    },
    rfm4(){
      this.rfm.value4 = !this.rfm.value4
    },
    rfm5(){
      this.rfm.value5 = !this.rfm.value5
    },
    rfm6(){
      this.rfm.value6 = !this.rfm.value6
    },
    rfm7(){
      this.rfm.value7 = !this.rfm.value7
    },
    rfm8(){
      this.rfm.value8 = !this.rfm.value8
    },
    rfm9(){
      this.rfm.value9 = !this.rfm.value9
    },
    rfm10(){
      this.rfm.value10 = !this.rfm.value10
    },
    rfm11(){
      this.rfm.value11 = !this.rfm.value11
    },
    rfm12(){
      this.rfm.value12 = !this.rfm.value12
    },
    rfm13(){
      this.rfm.value13 = !this.rfm.value13
    },
    rfm14(){
      this.rfm.value14 = !this.rfm.value14
    },
    deal1(){
      this.deal.value1 = !this.deal.value1
    },
    deal2(){
      this.deal.value2 = !this.deal.value2
    },
    deal3(){
      this.deal.value3 = !this.deal.value3
    },
    deal4(){
      this.deal.value4 = !this.deal.value4
    },
    marketing1(){
      this.marketing.value1 = !this.marketing.value1
    },
    marketing2(){
      this.marketing.value2 = !this.marketing.value2
    },
    marketing3(){
      this.marketing.value3 = !this.marketing.value3
    },
    marketing4(){
      this.marketing.value4 = !this.marketing.value4
    },
    marketing5(){
      this.marketing.value5 = !this.marketing.value5
    },
    marketing6(){
      this.marketing.value6 = !this.marketing.value6
    },
    proChange(a){
      // console.log('序号',a)
      // console.log('值',this.pro[a])
      this.pro[a].value=!this.pro[a].value
      console.log('数组',this.pro)
      console.log('数据',this.form.proValue)

    },
    //返回
    back(){
      this.$router.push(
        {
          name:'group'
        }
      )
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc: 12;
  // .el-select-dropdown{
  //   .el-scrollbar{
  //     .el-select-dropdown__wrap{
  //       ul{
  //         li{
  //           z-index: 100;
  //           .el-checkbox{
  //             width: 100%;
  //             // background: red
  //           }
  //         }
  //       }
  //     }
  //   }
    
  // }
.addGroup {
  .deal{
    .status{
      width: 30%;
    }
  }
  
      // .el-tag-info{
      //   width: 50%;
      //   text-overflow: ellipsis;
      //   overflow: hidden;
      //   white-space: nowrap
      // }
    .box {
    position: relative;
    margin: 0 20px 20px 20px;
    background: #ffffff;
    // box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    .btns {
      .select{
        float: right;
        margin-bottom: 12px ;
        .el-input__inner{
          border-radius: 0;
          // border:1px solid #ccc;
        }
      }
      .sel {
        width: 200px;
        float: right;
        line-height: 32px;
        height: 32px;
        margin: 0 0 12px 20px;
        .el-input__inner {
          border-radius: 0;
          height: 32px;
          line-height: 32px;
        }
        .el-input__icon {
          line-height: 32px;
        }
      }
    }
    .tab {

      .el-table {
        border: 1px solid #ccc;

        td {
          height: 50px;
          line-height: 50px;
          .cell {
            // overflow: hidden;
            // text-overflow:ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // -webkit-box-orient: vertical;
            // width:200px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            line-height: 18px;
          }
              .el-dropdown-link{
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  color: #3366FF;
                  letter-spacing: 0;
                  line-height: 12px;
                  margin-right: 10px;
                  margin-left: 10px;
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
      .insertSub{
        float: right;
      }
    }

    .block {
      // position: absolute;
      // bottom: 26px;
      padding: 10px;
      .el-pagination__total {
        margin-left: 20%;
      }
      .btn-prev {
        margin-left: 20px;
      }
    }
  }
  .danger {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    height: 32px;
  }

  // height: 100%;
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
  .addBox{
    padding: 0 30px;
    // background: pink;
    .form{
      padding: 0 30px  30px 0;
      box-sizing: border-box;
      // background: orange;
      width: 70%;
      float: left;
      h2{
          font-size: 16px;
          color: #333333;
          letter-spacing: 0.5px;
          line-height: 16px;
          font-weight: bold;
          padding-bottom: 20px ;
      }
      .el-form-item{
        border-bottom:  1px solid #ccc;
        margin-bottom: 0;
        padding: 20px 0 ;
        .el-form-item__label{
          text-align: left
        }
      }
      // .el-form-item:last-child{
      //   border-bottom: none;

      // }
      .choose{
        background: #fff;
        padding: 20px ;
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
        margin-bottom: 20px;
        .catalog,.name{
          width: 60%;
          .el-input__inner{
            border-radius: 0;
          }
        }
        // .insertGroup{

        // }
        .addCatalog{
          border: 1px solid #3366FF;
          span{
            color: #3366FF
          }
        }
        .addCatalog:hover,.addCatalog:focus{
          background: #fff
        }
      }
      .cal{
          padding: 10px 0 10px 20px ;
          background: #FAFAFA;
          .num{
            color: #3366FF
          }
      }
      .tag{
        background: #fff;
        padding: 20px ;
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
        background: #fff;
        
        .empty{
          width: 100%;
          text-align: center;
          padding: 50px 0;
          p{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999999;
            letter-spacing: 0.44px;
            text-align: center;
            line-height: 14px;
          }
          .last{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #999999;
            letter-spacing: 0.38px;
            text-align: center;
            line-height: 14px;
          }
         
        }
      }
    }
    .condition{
      box-sizing: border-box;
      // background: red;
      height: 500px;
      width: 30%;
      float: left;
      .el-collapse{
        background: #fff;
        padding: 10px;
        .el-collapse-item{
          .el-collapse-item__header{
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            line-height: 16px;
            font-weight: bold;
            padding: 10px 0;
          }
          .el-collapse-item__wrap{
            border-bottom: 1px solid #EBEEF5;
            .el-collapse-item__content{
              // display: flex;
              span{
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #666666;
                letter-spacing: 0;
                text-align: center;
                // line-height: 12px;
                margin: 5px  ;
                display: inline-block;
                padding: 5px 10px;
                border: 1px solid #ccc;
                -webkit-user-select:none;

                -moz-user-select:none;

                -ms-user-select:none;

                user-select:none;

              }
              .active{
                border: 1px solid #3366FF;
                color: #3366FF
              }
            }
          }
        }
        .el-collapse-item:last-child{
          .el-collapse-item__header{
            border: 0
          }
          .el-collapse-item__wrap{
            border: 0
          }
        }
      }
    }
  }
  .sub{
    display: flex;
    justify-content: center;
    padding-bottom: 20px 
  }
}
</style>
