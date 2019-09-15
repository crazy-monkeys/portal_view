<template>
  <div class="upload">
    <div class="sellBox">
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>销售管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售预测上传</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="查询" name="first">
          <div class="sels clear">
            <div class="lineBox">
              <i class="el-icon-arrow-down" v-if='!dialogVisible' @click='change'> 展开</i>
              <i class="el-icon-arrow-up" v-if='dialogVisible' @click='change'> 收起</i>
            </div>
            <el-form ref="form" :model="form" size="small" class="form" label-width="auto" label-position='top' :inline='true' v-show='dialogVisible'>
              <el-form-item label="客户简称">
                <el-input  placeholder="请输入" v-model="form.customerAbbreviation"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="form.status" clearable>
                  <el-option value='1' label="已提交"></el-option>
                  <el-option value='2' label="已验证"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="销售">
                <el-input  placeholder="请输入" v-model="form.salePeople"></el-input>
              </el-form-item>
              <el-form-item label="上传日期" class="date">
                <Daterange @data='watchTime' :resetDataReg='resetData' />
              </el-form-item>
              <el-form-item label=" ">
                <el-button  type='primary' plain @click="search">查询</el-button>
                <el-button   type='primary' plain @click="reset">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="box">
            <div class="btns clear">
              <el-button   size='small' type='primary' @click="deleteRows" :disabled="multipleSelection.length==0">批量删除</el-button>
              <!-- <el-button   size='small' type='primary'>批量修改</el-button> -->
            </div>
            <div class="tab">
              <el-table :data="list" border style="width: 100%" height="100%" @row-click='rowClick' @selection-change="handleSelectionChange">
                <el-table-column type="selection"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="errorMsg" width='100' label="错误信息" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTimeStr" width='100' label="上传日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="operationYearMonth" width='80' label="年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="company" width='80' label="出货公司" show-overflow-tooltip></el-table-column>
                <el-table-column prop="channel" width='80' label="渠道" show-overflow-tooltip></el-table-column>
                <el-table-column prop="agencyAbbreviation" width='80' label="代理简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerAbbreviation" width='100'  label="客户简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerType" width='100'  label="客户类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="forecastType" width='180'  label="预测类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="ambLeader" width='180'  label="阿米巴队长" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salePeople" width='80'  label="销售" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdPeople" width='80'  label="首代" show-overflow-tooltip></el-table-column>
                <el-table-column prop="representative" width='80'  label="代表处" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bu" width='80'  label="BU" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pdt" width='80'  label="PDT" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productType" width='150'  label="Product Type" show-overflow-tooltip></el-table-column>
                <el-table-column prop="platform" width='100'  label="Platform" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productModel" width='100'  label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="closeDate" width='100'  label="截止日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="delayStock" width='180'  label="未完成专货库存" show-overflow-tooltip></el-table-column>

                <el-table-column prop="line.forecastMonthOne" width="80" label="月份一" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteOne"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteOne" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapOne" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkOne" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="line.forecastMonthTwo" width="80" label="月份二" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteTwo"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteTwo" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapTwo" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkTwo" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthThree" width="80" label="月份三" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteThree"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteThree" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapThree" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkThree" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthFour" width="80" label="月份四" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteFour"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteFour" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapFour" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkFour" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthFive" width="80" label="月份五" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteFive"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteFive" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapFive" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkFive" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthSix" width="80" label="月份六" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteSix"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteSix" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapSix" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkSix" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='100' fixed='right'   label="操作" >
                  <template slot-scope="scope">
                    <el-button size="small" type="text" @click="mod">修改</el-button>
                  </template>
                </el-table-column>

                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
              <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 20,50]" :page-size="pageSize" layout="sizes,total, jumper, prev, pager, next" :total="total">
              </el-pagination>
            </div>
            </div>
            
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传" name="second">
          <div class="box">
            <div class="btns clear">
              <el-button class="add" @click='download' size='small' type='primary' > 下载模版</el-button>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url"
                :data='da'
                :headers='headers'
                name="excel"
                accept=".xlsx,.xls"
                :auto-upload="true"
                :show-file-list="false"
                :on-success="suc"
                >
                <el-button size="small"  type="primary">上传</el-button>
              </el-upload>
              <el-button class="add"  size='small' type='primary'  @click="downloadError" :disabled="isError1">下载错误数据</el-button>
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url1"
                :data='da1'
                :headers='headers'
                name="excel"
                accept=".xlsx,.xls"
                :auto-upload="true"
                :show-file-list="false"
                :on-success="suc1"
                :disabled="isError1"
                :before-upload="beforeUpload"
                >
                <el-button size="small"  type="primary" :disabled="isError1">上传错误数据</el-button>
              </el-upload>
              <el-button class="add" @click='sub' size='small' type='primary' :disabled="isError2">提交</el-button>

            </div>
            <div class="tab">
              <el-table :data="tableData" border style="width: 100%" height="100%">
                <el-table-column prop="errorMsg" width='100' label="错误信息" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTimeStr" width='100' label="上传日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="operationYearMonth" width='80' label="年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="company" width='80' label="出货公司" show-overflow-tooltip></el-table-column>
                <el-table-column prop="channel" width='80' label="渠道" show-overflow-tooltip></el-table-column>
                <el-table-column prop="agencyAbbreviation" width='80' label="代理简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerAbbreviation" width='100'  label="客户简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerType" width='100'  label="客户类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="forecastType" width='180'  label="预测类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="ambLeader" width='180'  label="阿米巴队长" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salePeople" width='80'  label="销售" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdPeople" width='80'  label="首代" show-overflow-tooltip></el-table-column>
                <el-table-column prop="representative" width='80'  label="代表处" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bu" width='80'  label="BU" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pdt" width='80'  label="PDT" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productType" width='150'  label="Product Type" show-overflow-tooltip></el-table-column>
                <el-table-column prop="platform" width='100'  label="Platform" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productModel" width='100'  label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="closeDate" width='100'  label="截止日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="delayStock" width='180'  label="未完成专货库存" show-overflow-tooltip></el-table-column>

                <el-table-column prop="line.forecastMonthOne" width="80" label="月份一" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteOne"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteOne" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapOne" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkOne" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="line.forecastMonthTwo" width="80" label="月份二" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteTwo"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteTwo" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapTwo" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkTwo" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthThree" width="80" label="月份三" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteThree"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteThree" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapThree" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkThree" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthFour" width="80" label="月份四" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteFour"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteFour" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapFour" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkFour" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthFive" width="80" label="月份五" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteFive"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteFive" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapFive" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkFive" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthSix" width="80" label="月份六" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteSix"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteSix" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapSix" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkSix" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
            </div>
            
          </div>
        </el-tab-pane>
        <el-tab-pane label="驳回记录" name="third">
          <div class="box">
            <div class="tab">
              <el-table :data="rejects" border style="width: 100%" height="100%">
                <el-table-column prop="operationRemark" width='100' label="审批信息" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTimeStr" width='100' label="上传日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="operationYearMonth" width='80' label="年月" show-overflow-tooltip></el-table-column>
                <el-table-column prop="company" width='80' label="出货公司" show-overflow-tooltip></el-table-column>
                <el-table-column prop="channel" width='80' label="渠道" show-overflow-tooltip></el-table-column>
                <el-table-column prop="agencyAbbreviation" width='80' label="代理简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerAbbreviation" width='100'  label="客户简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerType" width='100'  label="客户类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="forecastType" width='180'  label="预测类别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="ambLeader" width='180'  label="阿米巴队长" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salePeople" width='80'  label="销售" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sdPeople" width='80'  label="首代" show-overflow-tooltip></el-table-column>
                <el-table-column prop="representative" width='80'  label="代表处" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bu" width='80'  label="BU" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pdt" width='80'  label="PDT" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productType" width='150'  label="Product Type" show-overflow-tooltip></el-table-column>
                <el-table-column prop="platform" width='100'  label="Platform" show-overflow-tooltip></el-table-column>
                <el-table-column prop="productModel" width='100'  label="产品型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="closeDate" width='100'  label="截止日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="delayStock" width='180'  label="未完成专货库存" show-overflow-tooltip></el-table-column>

                <el-table-column prop="line.forecastMonthOne" width="80" label="月份一" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteOne"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteOne" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapOne" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkOne" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                
                <el-table-column prop="line.forecastMonthTwo" width="80" label="月份二" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteTwo"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteTwo" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapTwo" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkTwo" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthThree" width="80" label="月份三" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteThree"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteThree" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapThree" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkThree" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthFour" width="80" label="月份四" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteFour"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteFour" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapFour" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkFour" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthFive" width="80" label="月份五" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteFive"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteFive" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapFive" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkFive" width='100'  label="备注" show-overflow-tooltip></el-table-column>


                <el-table-column prop="line.forecastMonthSix" width="80" label="月份六" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.lastWriteSix"  width='100'  label="上次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.currentWriteSix" width='100'  label="本次填写" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.gapSix" width='100'  label="GAP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="line.remarkSix" width='100'  label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" width='100' fixed='right'   label="操作" >
                  <template slot-scope="scope">
                    <el-button size="small" type="text" @click="downloadReject(scope.row.id)">下载</el-button>
                  </template>
                </el-table-column>
                <div slot="empty">
                  <p>无数据</p>
                </div>
              </el-table>
              <div class="block">
              <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1"
                :page-sizes="[10, 20,50]" :page-size="pageSize1" layout="sizes,total, jumper, prev, pager, next" :total="total1">
              </el-pagination>
            </div>
            </div>
            
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

<el-dialog
  title="修改"
  :visible.sync="dialogVisible1"
  top='5vh'
  width="400px"
  :before-close="cancel">
  <el-form ref="form1" :model="form1" :rules='rules' size="small" class="form" label-width="auto" label-position='top' >
              <el-form-item label="本次填写（月份一）" prop='one'>
                <el-input  placeholder="请输入" v-model="form1.one"></el-input>
              </el-form-item>
              <el-form-item label="本次填写（月份二）" prop='two'>
                <el-input  placeholder="请输入" v-model="form1.two"></el-input>
              </el-form-item>
              <el-form-item label="本次填写（月份三）" prop='three'>
                <el-input  placeholder="请输入" v-model="form1.three"></el-input>
              </el-form-item>
              <el-form-item label="本次填写（月份四）" prop='four'>
                <el-input  placeholder="请输入" v-model="form1.four"></el-input>
              </el-form-item>
              <el-form-item label="本次填写（月份五）" prop='five'>
                <el-input  placeholder="请输入" v-model="form1.five"></el-input>
              </el-form-item>
              <el-form-item label="本次填写（月份六）" prop='six'>
                <el-input  placeholder="请输入" v-model="form1.six"></el-input>
              </el-form-item>
            </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="cancel">取 消</el-button>
    <el-button size="small" type="primary" @click="submitForm('form1')">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
  import Daterange from "../com/date";
  import {serverUrl} from '../../axios/request'
  import{submit,queryList,rejectList,update,del} from '@/api/forcast/upload.js'
  export default {
    name: 'forcastUpload',
    components:{
      Daterange
    },
    data() {
      return {
        multipleSelection:[],
        rowData:{},
        rules:{
          one:[{required:true,triggle:'blur',message:'请输入本次填写'}],
          two:[{required:true,triggle:'blur',message:'请输入本次填写'}],
          three:[{required:true,triggle:'blur',message:'请输入本次填写'}],
          four:[{required:true,triggle:'blur',message:'请输入本次填写'}],
          five:[{required:true,triggle:'blur',message:'请输入本次填写'}],
          six:[{required:true,triggle:'blur',message:'请输入本次填写'}],
        },
        form1:{
          one:'',
          two:'',
          three:'',
          four:'',
          five:'',
          six:'',
        },
        dialogVisible1:false,
        resetData:false,
        isError1:true,
        isError2:true,
        url:serverUrl + '/forecast/agency/template/upload',
        url1:serverUrl+'/forecast/agency/error/upload',
        headers:{
          "Authorization": sessionStorage.getItem("data"),
        },
        da1:{
        },
        da:{},
        
        activeName:'first',
        status:'',
        dialogVisible:false,
        form:{
          customerAbbreviation:'',
          status:'',
          uploadStartTime:'',
          uploadEndTime:'',
          salePeople:'',
        },
        batchNo:'',
        //表格数据
        tableData: [],
        list:[],
        rejects:[],
        //第几页
        currentPage: 1,
        currentPage1: 1,
        //每页的容量
        pageSize: 10,
        pageSize1: 10,
        //总量
        total: 0,
        total1: 0,
      }
    },
    computed: {
      auth(){
        return sessionStorage.getItem('data')
      }
    },
    created() {
      this.queryList()
    },
    watch: {
    },
    methods: {
      async del(){
        const data ={
          forecastIds:this.multipleSelection.map(item=>{
            return item.id
          }).join(',')
        }
        const res = await del(data);
        console.log('删除结果',res)
        if(res){
          this.$message.success('删除成功')
          this.queryList()
        }
      },
      deleteRows(){
       this.$confirm('确定要删除吗', '删除', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
                this.del()
            })
            .catch(action => {
              
            });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      rowClick(row){
        console.log(row)
        this.rowData = row
        console.log(this.rowData)
        this.form1.one = this.rowData.line.currentWriteOne
        this.form1.two = this.rowData.line.currentWriteTwo
        this.form1.three = this.rowData.line.currentWriteThree
        this.form1.four = this.rowData.line.currentWriteFour
        this.form1.five = this.rowData.line.currentWriteFive
        this.form1.six = this.rowData.line.currentWriteSix
      },
      async update(){
        const data =
        [{
          "forecastId":this.rowData.id,
          "line":{
          "lineId":this.rowData.line.lineId,
          "currentWriteOne":this.form1.one,
          "currentWriteTwo":this.form1.two,
          "currentWriteThree":this.form1.three,
          "currentWriteFour":this.form1.four,
          "currentWriteFive":this.form1.five,
          "currentWriteSix":this.form1.six,
          }
        }]  
        const res = await update(data);
        console.log('修改结果',res)
        if(res){
          this.$message.success('修改成功')
          this.queryList()
          this.cancel()
        }
      },
      cancel(){
        this.dialogVisible1=false
        this.form1= {
          one:'',
          two:'',
          three:'',
          four:'',
          five:'',
          six:'',
        }
        this.$formTest.resetForm(this.$refs['form1'])
      },
      submitForm(formName){
        this.$formTest.submitForm(this.$refs[formName],this.update)
      },
      mod(){
        this.dialogVisible1=true;
      
      },

      search(){
        this.currentPage =1 
        this.queryList()
      },
      reset(){
        this.resetData= true
        this.form={
          customerAbbreviation:'',
          status:'',
          salePeople:'',
          uploadStartTime:'',
          uploadEndTime:''
        }
        this.search()
      },
      watchTime(data){
        this.form.uploadStartTime = data.startTime
        this.form.uploadEndTime = data.EndTime
        this.resetData = false
      },
      sub(){
        this.submit()
      },
      beforeUpload(file){
      let data = new FormData()
      data.append('excel',file)
      data.append('batchNo',this.batchNo)
      this.$http({
        method: 'post',
        url: this.url1,
        headers:{'Authorization': this.auth},
        timeout: 20000,
        data: data
      }).then(res=>{
        console.log(res)
        if(res.data.code==1){
          if(res.data.data.success){
            this.$message.success('上传成功')
            this.tableData= res.data.data.data
            this.isError2 = false
          }else{
            this.$message.error('请下载错误数据')
          }
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
      return false
    },
      async queryList(){
        const data ={
          pageSize:this.pageSize,
          pageNum:this.currentPage,
          customerAbbreviation :this.form.customerAbbreviation,  
          status :this.form.status,  
          salePeople :this.form.salePeople,
          uploadStartTime:this.form.uploadStartTime, 
          uploadEndTime:this.form.uploadEndTime
        }
        console.log(data)
        const res = await queryList(data);
        console.log('上传部分查询列表',res);
        if(res){
          this.list = res.data.data.list
          this.total = res.data.data.total
        }
      },
      async rejectList(){
        const data ={
          pageSize:this.pageSize1,
          pageNum:this.currentPage1,
        }
        console.log(data)
        const res = await rejectList(data);
        console.log('上传部分驳回列表',res);
        if(res){
          this.rejects = res.data.data.list
          this.total1 = res.data.data.total
        }
      },
      async submit(){
        const data ={
          batchNo : this.batchNo
        }
        console.log(data)
        const res = await submit(data);
        console.log('提交结果',res);
        if(res){
          this.$message.success('提交成功')
          this.tableData = []
          this.isError2 = true
          this.isError1 = true
          this.activeName = 'first'
          this.queryList()
        }
      },
      downloadReject(id){

        this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/forecast/agency/reject/download?forecastIds="+id,
            responseType: "arraybuffer",
            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
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
              a.download = "rejectData.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
            })
            .catch(err => {
              console.log(err);
              alert("网络异常");
            });
      },
      downloadError(){
        this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/forecast/agency/error/download?batchNo=" +this.batchNo,
            responseType: "arraybuffer",
            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
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
              a.download = "errorData.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
            })
            .catch(err => {
              console.log(err);
              alert("网络异常");
            });
      },
      suc(val){
        console.log(val)
        if(val.code!=1){
          this.$message.error(val.msg)
        }else{
          if(!val.data.success){
            this.isError1 = false
            this.isError2 = true
            this.$message({
              type:'error',
              message:'请下载错误数据'
            })
          }else{
            this.$message.success('上传成功')
            this.da1={
              batchNo :val.data.batchNo
            }
            this.isError1 = true
            this.isError2 = false
          }
          this.batchNo = val.data.batchNo
          this.tableData = val.data.data
          console.log(this.tableData)
          console.log(this.batchNo)
        }
      },
      suc1(val){
        console.log(val)
        if(val.code!=1){
          this.$message.error(val.msg)
        }else{
          if(!val.data.success){
            this.$message.error(val.data.msg)
          }else{
            this.isError2 = false
            this.$message.success('上传成功')
          }
          this.tableData =val.data.data
        }
      },
      download() {
          this.$prompt('请输入年月：如201908', '模版下载', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputValidator:this.check,
        }).then(({ value }) => {
          this.$http({
            method: "get",
            url: "" + process.env.API_ROOT + "/forecast/agency/template/download?yearMonth="+value,
            responseType: "arraybuffer",
            headers:{
              'Authorization': sessionStorage.getItem('data'),
            }
          }).then(res => {
              console.log(res.data);
              const blob = new Blob([res.data], {
                type: "application/vnd.ms-excel"
              });
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.download = "销售预测上传模版.xlsx";
              a.href = blobUrl;
              a.click();
              document.body.removeChild(a);
          })
          .catch(err => {
            console.log(err);
          });
        }).catch(() => {
            
        });
          
      },
      handleClick(tab){
        if(tab.name=='first'){
          this.queryList()
        }
        if(tab.name=='second'){
        }
        if(tab.name=='third'){
          this.rejectList()
        }
      },
      change(){
        this.dialogVisible = !this.dialogVisible
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      handleSizeChange1(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize1 = val;
      },
      handleCurrentChange1(val) {
        console.log(`当前页: ${val}`);
        this.currentPage1 = val;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;

.upload{
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px;

  .el-dialog{
    .form {
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          .el-select{
            width: 100%;
          }
        }
    }
  }
  .sellBox{
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 34px;
    box-sizing: border-box;
    .head{
      padding: 10px 20px;
      position: absolute;
      top: 0;
      // background: red;
    }
    .el-tabs{
      height: 100%;
      position: relative;
      box-sizing: border-box;
      padding-top: 50px;
      .el-tabs__header{
        position: absolute;
        top: 0;
        width: 100%;
        .el-tabs__nav-wrap {
          padding:0 20px;
        }
      }
      .el-tabs__content{
        height: 100%;
        .el-tab-pane{
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .sels{
          // margin: 20px 0;
          padding:10px 20px;
          background: #fff;
          margin-bottom: 10px;
          .lineBox{
            color: #b161bf;
          }
        }
        .form {
            .el-form-item__label {
              height: 30px;
            }
            .el-form-item {
              width: 200px;
              margin-bottom: 0;
              .el-select{
                width: 100%;
              }
            }
            .date {
              width: 414px;
            }
        }
        .box{
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          background: #fff;
          .btns{
            padding: 10px 20px;
            .upload-demo{
              display: inline-block;
            }
          }
          .tab{
            padding-bottom: 52px;
            box-sizing: border-box;
            height: 100%;
            // background: orange;
            display: flex;
            flex-direction: column;
            position: relative;
            .el-table{
              height: 100%;
              position: relative;
            }
            .block{
              position: absolute;
              bottom:0;
              padding:  10px 0 ;
              width: 100%;
              .el-pagination {
                width: 100%;
                padding: 0;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>