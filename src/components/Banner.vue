<template>
  <div class="banner">
    <div class="zd" @click="zd" v-if="!statu">
      <i class="el-icon-s-fold"></i>
    </div>
    <div class="zk" v-if="statu" @click="zk">
      <i class="el-icon-s-unfold"></i>
    </div>
    <!-- <div class="proName">Portal</div> -->
    <div class="shopName" @click="fnToggle">
      <div class="top">{{loginName}}</div>
      <div class="down">{{shopName}}</div>
      <div class="more" v-if="toggle">
        <div class="count" @click='changePwd'>账号管理</div>
        <div class="quit" @click="quit">退出登录</div>
      </div>
    </div>
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
        <el-option v-for="item in shopList" :key="item.shop_info_id" :label="item.shop_name" :value="item.shop_info_id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="changeSuc">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="账号管理" :visible.sync="dialogVisible1" width="30%" :close-on-click-modal="false" :show-close='false'>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form" label-position="left">
        <p class="danger"> <i class="el-icon-warning" style="color: #3366FF"></i> 密码需包含大小写字母、数字以及特殊字符且长度大于8</p>
        <el-form-item label="账号：" prop="count">
          <!-- {{form.count}} -->
          <el-input v-model="form.count" class="" type='text' :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <!-- {{form.phone}} -->
          <el-input v-model="form.phone" class="" type='text' :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <!-- {{form.email}} -->
          <el-input v-model="form.email" class="" type='text' :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="旧密码：" prop="oldPwd">
          <el-input v-model="form.oldPwd" class="" type='password' :show-password='true' @paste.native.capture.prevent="handlePaste"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPwd">
          <el-input v-model="form.newPwd" class="" type='password' :show-password='true' @paste.native.capture.prevent="handlePaste"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="rePwd">
          <el-input v-model="form.rePwd" type='password' class="" :show-password='true' @paste.native.capture.prevent="handlePaste"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submitForm('form')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Bus from "../module/bus.js";
  export default {
    name: "Banner",
    data() {
      return {
        loginName: "admin",
        userId: '',
        shopId: '',
        shopName: '管理员',
        form: {
          count: '',
          email: '',
          phone: '',
          oldPwd: '',
          newPwd: '',
          rePwd: '',
        },
        rules: {
          count: [
            { required: false, trigger: 'blur', }
          ],
          email: [
            { required: false, trigger: 'blur', }
          ],
          phone: [
            { required: false, trigger: 'blur', }
          ],
          // 密码正则
          // ^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$
          oldPwd: [
            {
              required: true, trigger: 'blur', validator: (rule, value, callback) => {
                var reg = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$/
                if (!value) {
                  callback(new Error('旧密码不能为空'))
                } else {
                  if (!reg.test(value)) {
                    callback(new Error('密码必须包含大小写字母、数字以及特殊字符'))
                  } else {
                    callback()
                  }
                }
              }
            },
          ],
          newPwd: [
            {
              required: true, trigger: 'blur', validator: (rule, value, callback) => {
                var reg = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$/
                if (!value) {
                  callback(new Error('新密码不能为空'))
                } else {
                  if (!reg.test(value)) {
                    callback(new Error('密码必须包含大小写字母、数字以及特殊字符'))
                  } else {
                    callback()
                  }
                }
              }
            },
          ],
          rePwd: [
            {
              required: true, trigger: 'blur', validator: (rule, value, callback) => {
                var reg = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$/
                if (!value) {
                  callback(new Error('确认密码不能为空'))
                } else {
                  // if(!reg.test(value)){
                  //   callback(new Error('请输入正确的密码格式'))
                  // }else{
                  if (value != this.form.newPwd) {
                    callback(new Error('请重新输入与修改密码保持一致'))
                  } else {
                    callback()
                  }
                  // }
                }
              }
            },
          ],
        },
        value: '',
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

    },
    created() {

    },
    methods: {

      handlePaste() { },
      submitForm() {

      },
      resetForm() {

      },
      close() {
        this.dialogVisible1 = false;
      },
      sub() {

      },
      handleClose() {
        this.dialogVisible = false
        this.dialogVisible1 = false
      },
      chooseShop(val) {
      },
      changeSuc() {
        this.dialogVisible = false
      },
      changePwd() {
        this.dialogVisible1 = true
      },

      modPwd() {
      },
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
        this.$router.push("/login");
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
    min-width: 500px;
    color: #fff;
    height: 64px;
    background: #800080;

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
        background: purple;
        border-radius: 9px;
        position: absolute;
        top: 8px;
        left: 34px;
        text-align: center;
        line-height: 18px;
        color: #fff;
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
        top: 64px;
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
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 20px;
      }

      .down {
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
      background: #800080;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>