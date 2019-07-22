<template>
  <div class="banner">
    <div class="zd" @click="zd" v-if="!statu">
      <i class="el-icon-s-fold"></i>
    </div>
    <div class="zk" v-if="statu" @click="zk">
      <i class="el-icon-s-unfold"></i>
    </div>
    <el-dropdown class="drop" trigger="click" @command="a">
      <span class="el-dropdown-link">
        <p>{{loginName}}</p>
        <p>{{userType}}</p>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="1">基本信息</el-dropdown-item>
        <el-dropdown-item :command="5">修改基本信息</el-dropdown-item>
        <el-dropdown-item :command="4">子账号管理</el-dropdown-item>
        <el-dropdown-item :command="2">修改密码</el-dropdown-item>
        <el-dropdown-item :command="3">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="ts" @click="ts">
      <el-tooltip class="item" effect="light" content="公告" placement="top-start">
        <i class="el-icon-message"></i>
      </el-tooltip>
    </div>
    <div class="help" @click="help">
      <el-tooltip class="item" effect="light" content="帮助" placement="top-start">
        <i class="el-icon-question"></i>
      </el-tooltip>
    </div>

    <el-dialog title="切换店铺" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-select v-model="value" placeholder="请选择" @change="chooseShop">
        <el-option
          v-for="item in shopList"
          :key="item.shop_info_id"
          :label="item.shop_name"
          :value="item.shop_info_id"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="changeSuc">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="新增子账号" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-position="top"
        >
            <el-form-item label="用户名">
              <el-input size="small" ></el-input>
            </el-form-item>
            <el-form-item label="登录名">
              <el-input size="small"></el-input>
            </el-form-item>
            <el-form-item label="角色">
              <el-input size="small"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input size="small"></el-input>
            </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false" size="small">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      title="子账号管理"
      :visible.sync="dialogVisible1"
      width="60%"
      :close-on-click-modal="false"
      :show-close="false"
      >
      <!-- <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-position="top"
        class="form"
        :inline="true"
      > -->
        <!-- <el-tabs type="border-card"> -->
          <!-- <el-tab-pane label="基本信息">
            <el-form-item label="名称">
              <el-input type="text" size="small"></el-input>
            </el-form-item>
            <el-form-item label="简称">
              <el-input type="text" size="small"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input type="text" size="small"></el-input>
            </el-form-item>
            <el-form-item label="E-mail">
              <el-input type="text" size="small"></el-input>
            </el-form-item>
            <el-form-item label="网站">
              <el-input type="text" size="small"></el-input>
            </el-form-item>
            
          </el-tab-pane> -->
          <!-- <el-tab-pane label="联系人信息">
            <el-form-item label="业务联系人">
              <el-input size="small"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input size="small"></el-input>
            </el-form-item>
            <el-form-item label="传真">
              <el-input size="small"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input size="small"></el-input>
            </el-form-item>
            <el-form-item label="swift code">
              <el-input size="small"></el-input>
            </el-form-item>
            <div>
              <el-form-item label="地址">
                <el-select v-model="value4" size="small" filterable placeholder="省">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label=" ">
                <el-select v-model="value5" size="small" filterable placeholder="市">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label=" ">
                <el-select v-model="value6" size="small" filterable placeholder="区">
                  <el-option
                    v-for="item in options6"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label=" ">
                <el-input type="text" size="small" placeholder="详细地址"></el-input>
              </el-form-item>
            </div>
          </el-tab-pane> -->
          <!-- <el-tab-pane label="子账号信息"> -->
            <div class="tab">
              <el-table :data="tableData" style="width: 100%" height="300">
                <el-table-column prop="1" show-overflow-tooltip label="用户名"></el-table-column>
                <el-table-column prop="2" label="登录名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="3" label="角色" show-overflow-tooltip></el-table-column>
                <el-table-column prop="4" show-overflow-tooltip label="邮箱"></el-table-column>
                <el-table-column prop="5" label="开通时间" show-overflow-tooltip></el-table-column>

                <el-table-column show-overflow-tooltip prop label fixed="right">
                  <template slot="header" slot-scope="scope">
                    <el-button size="small" type="primary" @click="addChild">新增</el-button>
                  </template>
                  <!-- <template scope-slot='scope'>
                <el-button type='primary' size='mini' >维护</el-button>
                  </template>-->
                </el-table-column>
                <div slot="empty">
                  <p>未查询到子账户信息</p>
                </div>
              </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
              <!-- <el-button @click="dialogVisible1 = false" size="small">取 消</el-button> -->
              <el-button type="primary" @click="dialogVisible1 = false" size="small">确 定</el-button>
            </span>
          <!-- </el-tab-pane> -->
        <!-- </el-tabs> -->
        <!-- <el-form-item class="sub">
          <el-button @click="close" size="small">取消</el-button>
          <el-button type="primary" size="small" @click="submitForm('form')">提交</el-button>
        </el-form-item> -->
      <!-- </el-form> -->
    </el-dialog>
  </div>
</template>

<script>
import Bus from "../module/bus.js";
export default {
  name: "Banner",
  data() {
    return {
      dialogVisible2:false,
      tableData: [
        {},
        {},
        {},
        {},
      ],
      userId: "",
      shopId: "",
      form: {
        count: "",
        email: "",
        phone: "",
        oldPwd: "",
        newPwd: "",
        rePwd: ""
      },
      rules: {
        count: [{ required: false, trigger: "blur" }],
        email: [{ required: false, trigger: "blur" }],
        phone: [{ required: false, trigger: "blur" }],
        // 密码正则
        // ^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$
        oldPwd: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              var reg = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$/;
              if (!value) {
                callback(new Error("旧密码不能为空"));
              } else {
                if (!reg.test(value)) {
                  callback(
                    new Error("密码必须包含大小写字母、数字以及特殊字符")
                  );
                } else {
                  callback();
                }
              }
            }
          }
        ],
        newPwd: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              var reg = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$/;
              if (!value) {
                callback(new Error("新密码不能为空"));
              } else {
                if (!reg.test(value)) {
                  callback(
                    new Error("密码必须包含大小写字母、数字以及特殊字符")
                  );
                } else {
                  callback();
                }
              }
            }
          }
        ],
        rePwd: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              var reg = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$/;
              if (!value) {
                callback(new Error("确认密码不能为空"));
              } else {
                // if(!reg.test(value)){
                //   callback(new Error('请输入正确的密码格式'))
                // }else{
                if (value != this.form.newPwd) {
                  callback(new Error("请重新输入与修改密码保持一致"));
                } else {
                  callback();
                }
                // }
              }
            }
          }
        ]
      },
      value: "",
      value4: "",
      value5: "",
      value6: "",
      options4: [],
      options5: [],
      options6: [],
      dialogVisible: false,
      dialogVisible1: false,
      isCollapse: true,
      statu: false,
      toggle: false,
      shopList: [
        {
          shop_name: ""
        }
      ]
    };
  },
  computed: {
    loginName() {
      // return this.$store.state.loginUser.loginInfo.loginName;
      return 'admin';
    },
    userType() {
      // return this.$store.state.loginUser.loginInfo.userType;
      return '管理员';
    }
  },
  created() {},
  methods: {
    addChild(){
      this.dialogVisible2 = true
    },
    a(command) {
      console.log(command);
      if (command == 3) {
        this.quit();
      }
      if (command == 4) {
        this.dialogVisible1 = true
      }
      if (command == 1) {
        this.$router.push('/home/agent/add');
      }
      if (command == 5) {
        this.$router.push('/home/agent/updateUserInfo');
      }
    },

    handlePaste() {},
    submitForm() {},
    resetForm() {},
    close() {
      this.dialogVisible1 = false;
    },
    sub() {},
    handleClose() {
      this.dialogVisible = false;
      this.dialogVisible1 = false;
    },
    chooseShop(val) {},
    changeSuc() {
      this.dialogVisible = false;
    },
    changePwd() {
      this.dialogVisible1 = true;
    },

    modPwd() {},
    zd() {
      this.statu = !this.statu;
      Bus.$emit("data", this.statu);
    },
    zk() {
      this.statu = !this.statu;
      Bus.$emit("data", this.statu);
    },
    fnToggle(e) {
      this.toggle = !this.toggle;
      // console.log(e);
    },
    quit() {
      this.$http({
        method: "post",
        url: process.env.API_ROOT + "/logout",
        headers: {
          authorization: sessionStorage.getItem("data")
        }
      })
        .then(res => {
          console.log("退出登陆", res);
          sessionStorage.removeItem("data");
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(error);
          alert("系统异常");
        });
    },
    tb() {
      this.$router.push("/home/tb");
    },
    ts() {
      this.$router.push("/home/ts");
    },
    help() {
      this.$router.push("/home/help");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;

.banner {
  position: absolute;
  top: 0;
  width: 100%;
  // z-index: 111111;
  min-width: 500px;
  color: #fff;
  height: 56px;
  background: #b161bf;
  .el-dialog {
    .form {
      .el-form-item {
        width: 200px;
        .el-form-item__label {
          height: 30px;
        }
      }
      .address {
        width: 100%;
        .el-select {
          width: 100px;
        }
        .el-input {
          width: 200px;
          margin-right: 20px;
        }
      }
      .sub {
        margin: 10px 0 0 0;
        width: 100%;
        text-align: center;
      }
    }
  }
  .danger {
    margin-bottom: 20px;
  }

  .zd {
    height: 100%;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url("../assets/img/zd.png") center no-repeat; */
    cursor: pointer;
    float: left;

    i {
      font-size: 22px;
    }
  }

  .zk {
    height: 100%;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url("../assets/img/zk.png") center no-repeat; */
    cursor: pointer;
    float: left;

    i {
      font-size: 22px;
    }
  }

  .tbbtn {
    height: 100%;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url("../assets/img/tb.png") center no-repeat; */
    cursor: pointer;
    border-right: 1px solid #e8e8e8;
    float: left;
  }

  .help {
    height: 100%;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url("../assets/img/help.png") center no-repeat; */
    cursor: pointer;
    float: right;

    i {
      font-size: 22px;
    }
  }

  .ts {
    height: 100%;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url("../assets/img/ts.png") center no-repeat; */
    cursor: pointer;
    float: right;
    border-right: 1px solid #e8e8e8;
    position: relative;

    i {
      font-size: 22px;
    }

    div {
      height: 18px;
      width: 18px;
      background: #b161bf;
      border-radius: 9px;
      position: absolute;
      top: 8px;
      left: 34px;
      text-align: center;
      line-height: 18px;
      color: #fff;
    }
  }
  .drop {
    text-align: center;
    height: 100%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    float: right;
    p {
      width: 100px;
    }
  }
  .shopName {
    position: relative;
    width: 120px;
    height: 40px;
    font-size: 14px;
    color: #fff;
    letter-spacing: 0;
    float: right;
    padding: 12px;
    cursor: pointer;

    .more {
      position: absolute;
      width: 200px;
      top: 56px;
      left: 0;
      background: #ffffff;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
      z-index: 300;

      .quit {
        border-top: 1px solid #e8e8e8;
      }

      div {
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        opacity: 0.87;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;

        span {
          width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          float: left;
        }

        i {
          margin-left: 10px;
          font-style: normal;
          border: 1px solid #3366ff;
          display: inline-block;
          font-size: 12px;
          color: #3366ff;
          letter-spacing: 0;
          line-height: 18px;
          padding: 0 5px;
        }
      }
    }

    .top {
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 20px;
    }

    .down {
      text-align: center;
      font-size: 12px;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .proName {
    border-left: 1px solid #fff;
    height: 100%;
    width: 56px;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0;
    float: right;
    background: #b161bf;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>