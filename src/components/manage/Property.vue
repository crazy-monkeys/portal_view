<template>
  <div class="theme">
    <div>
      <div class="head clear">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to='/home/sell'>客户管理</el-breadcrumb-item>
          <el-breadcrumb-item>客户维护</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>客户维护</h1>
      </div>
      <div class="sels clear">
          <el-form ref="form" :model="form" class="form" label-position='top' :inline='true'>
            <el-form-item label="客户号">
              <el-input size='small'  placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="公司名称">
              <el-input size='small' placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="英文名">
              <el-input size='small' placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="客户类型">
              <el-input size='small' placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="销售">
              <el-input size='small' placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="阿米巴">
              <el-input size='small' placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="公司资产">
              <el-input size='small' placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="员工人数">
              <el-input size='small' placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="注册日期">
              <el-input size='small' placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="公司总机">
              <el-input size='small' placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="办公地址">
              <el-input size='small' placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="注册地址">
              <el-input size='small' placeholder="" ></el-input>
            </el-form-item>
            <el-form-item label="业务介绍" >
              <el-input type='textarea' v-model='form.txt' :rows="2" placeholder="" resize='none' ></el-input>
            </el-form-item>
          </el-form>
      </div>
      <div class="box">
        <div class="btns clear">
          <el-button  class="add" @click='open' size='small' type='primary'>释放</el-button>
          <el-button  class="add" @click='remove' size='small' type='primary'>转移</el-button>
          <el-button  class="add" @click='changeType' size='small' type='primary'>类型变更</el-button>
        </div>
        <div class="tab">
          <el-table :data="tableData" style="width: 100%" height="700" >
            <el-table-column prop="" type="selection" width='30' show-overflow-tooltip label="">
            </el-table-column>
            <el-table-column type="index" width='100' label="编号" :index='q'>
            </el-table-column>
            <el-table-column prop="" show-overflow-tooltip label="客户中文名">
            </el-table-column>
            <el-table-column prop="" label="活动名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" label="人群名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" show-overflow-tooltip label="发送时间">
            </el-table-column>
            <el-table-column prop="" label="发送人数" show-overflow-tooltip>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="发送总量">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="成功发送总量">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="发送状态" width="80">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="操作" width="80">
              <template scope-slot='scope'>
                <el-button type='text' size='small'>修改</el-button>
              </template>
            </el-table-column>
            <div slot="empty">
              <div>
                <img src="../../assets/img/none.png" alt="" width="140" height="140" />
              </div>
              <p>未查询到客户信息</p>
            </div>
          </el-table>
        </div>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 100]" :page-size="10" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>



    <el-dialog
      title="转移"
      :visible.sync="dialogVisible"
      width="60%"
      >
        <div class="sels clear">
            <el-form ref="form" :model="form" class="form" label-width="auto" label-position='top' :inline='true'>
                <el-form-item label="活动名称">
                    <el-select v-model="value" size='small' filterable placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="活动名称">
                    <el-select v-model="value" size='small' filterable placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button  class="add" size='small' type='primary' @click='dialogVisible = false'>提交</el-button>
                </el-form-item>
              </el-form>
              
            </el-form>
        </div>
        <div class="tab">
          <el-table :data="tableData1" style="width: 100%" >
            <el-table-column type="index" width='100' label="编号" :index='q'>
            </el-table-column>
            <el-table-column prop="" show-overflow-tooltip label="客户中文名">
            </el-table-column>
            <el-table-column prop="" label="活动名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" label="人群名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" show-overflow-tooltip label="发送时间">
            </el-table-column>
            <div slot="empty">
              <div>
                <img src="../../assets/img/none.png" alt="" width="140" height="140" />
              </div>
              <p>未查询到客户信息</p>
            </div>
          </el-table>
        </div>
    </el-dialog>
    <el-dialog
      title="类型变更"
      :visible.sync="dialogVisible1"
      width="30%"
      >
          <el-select v-model="value" size='small' filterable placeholder="请选择" class="changeType">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false" size='small'>取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false" size='small' >确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import formTest from '../../assets/js/formTest'
  export default {
    name: 'Theme',
    data() {
      return {
        txt:'',
        form:{},
        options: [],
        value: '',
        dialogVisible:false,
        dialogVisible1:false,
        tableData: [
          {}
        ],
        tableData1: [
          {}
        ],
        //第几页
        currentPage: 1,
        //每页的容量
        pageSize: 10,
        total:0,
      }
    },
    methods: {
      changeType(){
        this.dialogVisible1 = true
      },
      open(){
        this.$confirm('确定要释放吗?', '释放', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$message({
              type: 'success',
              message: '释放成功'
            })
        }).catch(action => {
            this.$message({
              type: 'fail',
              message: '已取消操作'
            })
          });
      },
      remove(){
        this.dialogVisible = true
      },
      q(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1
      },
      //点击新增营销活动
      add() {
        this.$router.push(
          {
            name: 'AddSell'
          }
        )
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  $sc:12;
  .theme {
    .empty {
      p {
        margin-top: 23px;
      }
    }
    .el-dialog {
      margin: 0 auto;
      .sels{
        padding: 0;
        margin:0 0 20px 0
      }
      .changeType{
        width: 100%;
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

        span {
          border-left: 1px solid #ccc;
          padding: 0 20px
        }

        i {
          font-weight: bold;
          margin-right: 20px;
          cursor: pointer;
        }
      }

      .el-breadcrumb {
        line-height: 30px;
        margin-left: 50px;
        margin-right: 20px;
        font-size: 14px;
      }
    }
    .sels {
      background: #fff;
      padding: 10px 30px;
      margin: 0 20px 10px 20px;

      .form {
        max-width: 1300px;
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item {
          margin-bottom: 0;
        }
        .el-form-item:last-child{
          width:100%;
          .el-textarea__inner{
            width: 414px;
            margin-top:2px;
          }
        }
      }

      .drop {
        width: 286px;
        height: 32px;
        line-height: 30px;
        margin: 12px 0 12px 20px;
        border: 1px solid #ccc;
        box-sizing: border-box;

        .sel {
          width: 180px;

          .el-input__inner {
            border: none;
            height: 28px;
            ;
          }
        }

        .el-dropdown {

          border-right: 1px solid #ccc;
          padding: 0 10px;

          span {
            font-size: 14px
          }

          .el-dropdown-menu__item {
            width: 100px
          }
        }

      }

      .el-date-editor {
        margin: 12px 0 12px 20px;
        height: 32px;
        line-height: 32px;
        border-radius: 0;

        .el-range-separator {
          line-height: 32px;
          height: 32px;
        }

      }


    }
    .box {
      margin: 0 20px 20px 20px;
      background: #FFFFFF;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
      border-radius: 2px;
      position: relative;



      .btns {

        .add {
          margin: 12px 0 12px 30px;
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
              // width:100px;
              font-size: 12px;
              color: #333333;
              letter-spacing: 0;
              line-height: 18px;

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
  }
</style>