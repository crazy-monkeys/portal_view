<template>
  <div class="menu">
      <div class="logo" :key='1'>
        <img class="lglogo" src="../assets/img/logostr.png" alt="" v-if="!isCollapse">
        <img class="smalllogo" src="../assets/img/logo.png" alt="" v-if="isCollapse">
      </div>
        <el-menu :key='2' text-color='#B161BF' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          :collapse="isCollapse" :unique-opened="true" :router='true' :default-active='$route.path'>

          <template v-for="item1 in list">
            <template v-if="item1.children.length !=0">
              <el-submenu :index="item1.resourceUrl" :key="item1.resourceId">
                <template slot="title"><i :class="item1.iconClass"></i><span>{{item1.resourceName}}</span></template>

                <template v-for="item2 in item1.children">

                  <template v-if="item2.children.length !=0">
                    <el-submenu :index="item2.resourceUrl" :key="item2.resourceId">
                      <template slot="title"><i :class="item1.iconClass"></i><span>{{item2.resourceName}}</span></template>
                      <template v-for="item3 in item2.children">

                        <template v-if="item3.children.length !=0">
                          <el-submenu :index="item3.resourceUrl" :key="item3.resourceId">
                            <template slot="title"><i :class="item3.iconClass"></i><span>{{item3.resourceName}}</span></template>
                          </el-submenu>
                        </template>
                        <template v-else>
                          <el-menu-item :index="item3.resourceUrl" :key="item3.resourceId">
                            <i :class="item3.iconClass"></i><span>{{item3.resourceName}}</span>
                          </el-menu-item>
                        </template>

                      </template>
                    </el-submenu>
                  </template>
                  <template v-else>
                    <el-menu-item :index="item2.resourceUrl" :key="item2.resourceId">
                      <i :class="item2.iconClass"></i>
                      {{ item2.resourceName}}
                    </el-menu-item>
                  </template>

                </template>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item1.resourceUrl" :key="item1.resourceId">
                <i :class="item1.iconClass" style="margin-right:0"></i> <span>{{ item1.resourceName}}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
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
          iconClass: "el-icon-s-custom",
          children: [
            {
              resourceId: "11",
              resourceName: "客户查询",
              resourceUrl: "/home/sell",
              iconClass: "el-icon-123",
              children: []
            },
            {
              resourceId: "12",
              resourceName: "客户报备",
              resourceUrl: "/home/theme",
              iconClass: "el-icon-123",
              children: []
            },
            {
              resourceId: "14",
              resourceName: "报备审批",
              resourceUrl: "/home/custom/manage/property",
              iconClass: "el-icon-123",
              children: []
            },
            {
              resourceId: "13",
              resourceName: "拜访记录上传",
              resourceUrl: "/home/user/visiteRecord",
              iconClass: "el-icon-123",
              children: []
            },
            
          ]
        },
        {
              resourceId: "2",
              resourceName: "预测管理",
              resourceUrl: "#2",
              iconClass: "el-icon-s-shop",
              children: [
                {
              resourceId: "21",
              resourceName: "销售预测查询",
              resourceUrl: "/home/sales/forcast-index",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "22",
              resourceName: "销售预测上传",
              resourceUrl: "/home/sales/forcast-upload",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "23",
              resourceName: "销售预测审批",
              resourceUrl: "/home/sales/approve",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "24",
              resourceName: "销售预测调整",
              resourceUrl: "/home/sales/reset",
              iconClass: "el-icon-s-123",
              children: []
            },
          ]
        },
        {
          resourceId: "3",
          resourceName: "价格管理",
          resourceUrl: "#3",
          iconClass: "el-icon-s-data",
          children: [
            {
              resourceId: "31",
              resourceName: "目录价格查询",
              resourceUrl: "/home/price/list",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "32",
              resourceName: "实际价格查询",
              resourceUrl: "/home/price/actual",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "33",
              resourceName: "询价",
              resourceUrl: "/home/price/inquiry",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "34",
              resourceName: "询价审批",
              resourceUrl: "/home/price/inquiry/approval",
              iconClass: "el-icon-s-123",
              children: []
            },
          ]
        },
        {
          resourceId: "8",
          resourceName: "产品管理",
          resourceUrl: "#8",
          iconClass: "el-icon-s-data",
          children: [
            {
              resourceId: "81",
              resourceName: "产品查询",
              resourceUrl: "/home/product/query",
              iconClass: "el-icon-s-123",
              children: []
            }
          ]
        },
        {
          resourceId: "4",
          resourceName: "订单管理",
          resourceUrl: "#4",
          iconClass: "el-icon-s-order",
          children: [
            {
              resourceId: "41",
              resourceName: "订单申请",
              resourceUrl: "/home/order/add",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "42",
              resourceName: "订单查询",
              resourceUrl: "/home/order/list",
              iconClass: "el-icon-s-123",
              children: []
            }
          ]
        },
        {
          resourceId: "5",
          resourceName: "交付管理",
          resourceUrl: "#5",
          iconClass: "el-icon-s-shop",
          children: [
            
            {
              resourceId: "51",
              resourceName: "提货申请",
              resourceUrl: "/home/sales/sales-index",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "52",
              resourceName: "提货查询",
              resourceUrl: "/home/sales/sales-index",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "53",
              resourceName: "收货数据查询",
              resourceUrl: "/home/sales/shouhuo/index",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "54",
              resourceName: "收货数据上传",
              resourceUrl: "/home/sales/shouhuo/upload",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "55",
              resourceName: "出货数据查询",
              resourceUrl: "/home/sales/shipment-index",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "56",
              resourceName: "出货数据上传",
              resourceUrl: "/home/sales/shipment-upload",
              iconClass: "el-icon-s-123",
              children: []
            }
          ]
        },
        {
          resourceId: "6",
          resourceName: "商务管理",
          resourceUrl: "#6",
          iconClass: "el-icon-s-shop",
          children: [
            {
              resourceId: "61",
              resourceName: "差价、保价、退换货申请",
              resourceUrl: "/home/cbt",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "62",
              resourceName: "客户Rebate",
              resourceUrl: "/home/sales/sales-index",
              iconClass: "el-icon-s-123",
              children: []
            },
          ]
        },
        {
          resourceId: "7",
          resourceName: "系统管理",
          resourceUrl: "#7",
          iconClass: "el-icon-setting",
          children: [
            {
              resourceId: "71",
              resourceName: "用户管理",
              resourceUrl: "/home/system/users",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "72",
              resourceName: "权限管理",
              resourceUrl: "/home/system/permissions",
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "73",
              resourceName: '公告管理',
              resourceUrl: '/home/system/announcement',
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "74",
              resourceName: '文档管理',
              resourceUrl: '/home/system/document',
              iconClass: "el-icon-s-123",
              children: []
            },
            {
              resourceId: "75",
              resourceName: '系统参数管理',
              resourceUrl: '/home/system/document',
              iconClass: "el-icon-s-123",
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
  created() {
    console.log(this.list)
  },
  computed: {
    // list(){
    //   return this.$store.state.menu.list
    // }
  },
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
.el-submenu__title{
  color: #B161BF;
}
.menu {
  height: 100%;
  padding-top: 56px;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }
  .el-menu {
    height: 100%;
    overflow: hidden;
    border: none;
    overflow-y: auto;
    i {
      color: #B161BF;
    }
  }

  .logo {
    display: flex;
    height: 56px;
    position: absolute;
    top: 0;
    justify-content: center;
    align-items: center;
    text-align: center;
    .smalllogo {
      width: 44px;
      margin-top: 20px;
    }
    .lglogo {
      width: 180px;
    }
  }
}
</style>
