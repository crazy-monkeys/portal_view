<template>
  <div class="menu">
    <transition-group enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
      <div class="logo" :key='1'>
        <img class="lglogo" src="../../static/logostr.png" alt="" v-if="!isCollapse">
        <img class="smalllogo" src="../../static/logo.png" alt="" v-if="isCollapse">
        <!-- <div class="msg" v-if="!isCollapse">紫光展锐</div> -->
      </div>
    </transition-group>
    <transition-group enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
      <el-menu :key='2' text-color='#800080' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" :unique-opened="true" :router='true' :default-active='$route.path'>
        <template v-for="item1 in list">
          <template v-if="item1.children.length !=0">
            <el-submenu :index="item1.resourceUrl" :key="item1.resourceId">
              <template slot="title"><i :class="item1.resourceIconClass"></i><span>{{item1.resourceName}}</span></template>

              <template v-for="item2 in item1.children">

                <template v-if="item2.children.length !=0">
                  <el-submenu :index="item2.resourceUrl" :key="item2.resourceId">
                    <template slot="title"><span>{{item2.resourceName}}</span></template>
                    <template v-for="item3 in item2.children">

                      <template v-if="item3.children.length !=0">
                        <el-submenu :index="item3.resourceUrl" :key="item3.resourceId">
                          <template slot="title"><span>{{item3.resourceName}}</span></template>
                        </el-submenu>
                      </template>
                      <template v-else>
                        <el-menu-item :index="item3.resourceUrl" :key="item3.resourceId">
                          <span>{{item3.resourceName}}</span>
                        </el-menu-item>
                      </template>

                    </template>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :index="item2.resourceUrl" :key="item2.resourceId">
                    {{ item2.resourceName}}
                  </el-menu-item>
                </template>

              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item1.resourceUrl" :key="item1.resourceId">
              <i :class="item1.resourceIconClass" style="margin-right:0"></i> <span>{{ item1.resourceName}}</span>
            </el-menu-item>
          </template>

        </template>
      </el-menu>
    </transition-group>
    <!-- <router-view></router-view> -->
  </div>


</template>

<script>
import Bus from "../module/bus.js";

export default {
  name: "Menu",
  data() {
    return {
      form: {},
      isCollapse: false,
      list: [
        {
          resourceId: "1",
          resourceName: "客户管理",
          resourceUrl: "#1",
          resourceIconClass: "el-icon-s-custom",
          children: [
            {
              resourceId: "11",
              resourceName: "客户查询",
              resourceUrl: "/home/sell/sellIndex",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "12",
              resourceName: "报备查询",
              resourceUrl: "/home/theme",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "13",
              resourceName: "拜访记录上传",
              resourceUrl: "/home/shortmsg",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "14",
              resourceName: "客户维护",
              resourceUrl: "/home/custom/manage/property",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "15",
              resourceName: "客户报备",
              resourceUrl: "/home/manage/black",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            }
          ]
        },
        {
          resourceId: "2",
          resourceName: "授信额度",
          resourceUrl: "#2",
          resourceIconClass: "el-icon-collection-tag",
          children: [
            {
              resourceId: "21",
              resourceName: "授信额度申请列表",
              resourceUrl: "/home/credit/list",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            }
          ]
        },
        {
          resourceId: "3",
          resourceName: "价格管理",
          resourceUrl: "#3",
          resourceIconClass: "el-icon-s-data",
          children: [
            {
              resourceId: "31",
              resourceName: "价格查询",
              resourceUrl: "/home/price/list",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "32",
              resourceName: "客户实际价格查询",
              resourceUrl: "/home/price/actual",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "33",
              resourceName: "询价申请",
              resourceUrl: "/home/price/inquiry",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "34",
              resourceName: "询价申请审批",
              resourceUrl: "/home/price/inquiry/approval",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            }
          ]
        },
        {
          resourceId: "4",
          resourceName: "样品管理",
          resourceUrl: "#4",
          resourceIconClass: "el-icon-s-promotion",
          children: [
            {
              resourceId: "41",
              resourceName: "样品查询",
              resourceUrl: "/home/sample/list",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "42",
              resourceName: "样品申请",
              resourceUrl: "/home/sample/apply",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            }
          ]
        },
        {
          resourceId: "5",
          resourceName: "订单管理",
          resourceUrl: "#5",
          resourceIconClass: "el-icon-s-order",
          children: [
            {
              resourceId: "51",
              resourceName: "订单填报",
              resourceUrl: "/home/order/add",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "52",
              resourceName: "订单查询",
              resourceUrl: "/home/order/list",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            }
          ]
        },
        {
          resourceId: "6",
          resourceName: "代理商管理",
          resourceUrl: "#6",
          resourceIconClass: "el-icon-bicycle",
          children: [
            {
              resourceId: "61",
              resourceName: "代理商引入",
              resourceUrl: "/home/agent/add",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "62",
              resourceName: "代理商查询",
              resourceUrl: "/home/agent/index",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            }
          ]
        },
        {
          resourceId: "7",
          resourceName: "销售管理",
          resourceUrl: "#7",
          resourceIconClass: "el-icon-s-shop",
          children: [
            {
              resourceId: "71",
              resourceName: "销售预测查询",
              resourceUrl: "/home/sales/forcast-index",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "72",
              resourceName: "销售预测上传",
              resourceUrl: "/home/sales/forcast-upload",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "73",
              resourceName: "销售数据查询",
              resourceUrl: "/home/sales/sales-index",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "74",
              resourceName: "销售数据上传",
              resourceUrl: "/home/sales/sales-upload",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "75",
              resourceName: "出货数据查询",
              resourceUrl: "/home/sales/shipment-index",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "76",
              resourceName: "出货数据上传",
              resourceUrl: "/home/sales/shipment-upload",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            }
          ]
        },
        {
          resourceId: "8",
          resourceName: "系统管理",
          resourceUrl: "#8",
          resourceIconClass: "el-icon-setting",
          children: [
            {
              resourceId: "81",
              resourceName: "用户管理",
              resourceUrl: "/home/account/settings",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "82",
              resourceName: "权限管理",
              resourceUrl: "/home/permission/settings",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "83",
              resourceName: "公告",
              resourceUrl: "",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            },
            {
              resourceId: "84",
              resourceName: "文档",
              resourceUrl: "",
              resourceIconClass: "el-icon-s-promotion",
              children: []
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {},
  computed: {},
  mounted() {
    Bus.$on("data", res => {
      console.log(res);
      this.isCollapse = res;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
$sc: 12;

// .el-submenu .el-menu-item, .el-submenu .el-submenu__title{
//     font-size: 14px;
//     color: rgba(255,255,255,0.6);
//     letter-spacing: 0;
//     height: 48px;
//     line-height: 48px;
// }
// .el-menu-item{
//     font-size: 14px;
//     color: rgba(255,255,255,0.6);
//     letter-spacing: 0;
//     height: 48px;
//     line-height: 48px;
// }
// .el-menu-item i{
//     color: rgba(255,255,255,0.5);
// }
// /* hover,focus样式 */
//    .el-submenu__title:hover,.el-submenu__title:focus{
//     background: rgba(0,0,0,0.25);

//    }
// /* 收起宽度 */
//    .el-menu--collapse{
//        width: 56px
//    }
//    .el-menu--collapse .el-submenu .el-submenu__title{
//        display: flex;
//        justify-content: center;
//        align-items: center
//    }
//    .el-submenu .el-menu-item:hover,.el-submenu .el-menu-item.is-active,.el-submenu .el-menu-item:focus{
//     background: rgba(0,0,0,0.25);
//     color: #FFFFFF;
//     opacity: 1;
//    }

//    .el-menu-item:hover,.el-menu-item.is-active,.el-menu-item:focus{
//     background: rgba(0,0,0,0.25);
//     color: rgba(255,255,255,0.6);
//     opacity: 1;

//    }
//  /* 收起的hover focus 样式 */
//    .el-menu--vertical .el-menu-item:hover,.el-menu--vertical .el-menu-item:focus,.el-menu--vertical .el-submenu__title:hover,.el-menu--vertical .el-submenu__title:focus,.el-menu--vertical .el-menu-item.is-active{
//     background: #000;
//     color: #FFFFFF;
//     opacity: 1;
//    }
//    .el-menu--vertical .el-menu-item,.el-menu--vertical .el-submenu__title{
//     background: #262A39;
//     color: rgba(255,255,255,0.6);
//    }
.menu {
  height: 100%;
  // background: purple;
  // background: rgba(167,97,214,0.5);
  overflow-y: auto;

  .el-menu {
    height: 84%;
    border: none;

    // background: rgba(167,97,214,0.5);
    // background: purple;
    i {
      color: #800080;
    }
  }

  .logo {
    height: 80px;
    text-align: center;

    .smalllogo {
      width: 44px;
      margin-top: 20px;
    }

    .lglogo {
      margin-top: 10px;
      width: 200px;
      /* height: 44px; */
    }

    .msg {
      width: 240px;
      font-size: 24px;
      color: #800080;
      letter-spacing: 1px;
      font-style: italic;
      font-weight: bold;
    }
  }
}
</style>
