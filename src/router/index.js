import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      redirect: { name: 'tb' },
      component: resolve => require(['@/components/Home'], resolve),
      children: [
        {
          path: '/home/member/data',
          name: 'member',
          component: resolve => require(['@/components/insight/MemberList'], resolve)
        },
        {
          path: '/home/member/data/edit/:merchantId/:shopId/:id',
          name: 'editMember',
          component: resolve => require(['@/components/insight/EditMember'], resolve)
        },
        {
          path: '/home/order/analysis',
          name: 'order',
          component: resolve => require(['@/components/insight/OrderList'], resolve)
        },
        {
          path: '/home/goods/data',
          name: 'goods',
          component: resolve => require(['@/components/insight/GoodsList'], resolve)
        },
        //首页
        {
          path: 'tb',
          name: 'tb',
          component: resolve => require(['@/components/Tb'], resolve)
        },
        //帮助页
        {
          path: 'help',
          name: 'help',
          component: resolve => require(['@/components/Help'], resolve)
        },
        //提示页
        {
          path: 'ts',
          name: 'ts',
          component: resolve => require(['@/components/Ts'], resolve)
        },

        //////////////客户营销
        //定制短信
        {
          path: 'shortmsg',
          name: 'shortmsg',
          component: resolve => require(['@/components/marketing/Shortmsg'], resolve),
          // meta: {keepAlive: true}
        },
        //主题管理
        {
          path: 'theme',
          name: 'theme',
          component: resolve => require(['@/components/marketing/Theme'], resolve),
          // meta: {keepAlive: true},
        },
        //短信营销
        {
          path: 'sell',
          name: 'Sell',
          component: resolve => require(['@/components/marketing/Sell'], resolve),
          // meta: {keepAlive: true},
          redirect: {
            name: 'SellIndex'
          },

          children: [
            {
              path: 'sellIndex',
              name: 'SellIndex',
              component: resolve => require(['@/components/marketing/SellIndex'], resolve),
              // meta: {keepAlive: true}
            },
            {
              path: 'addSell/:id',
              name: 'AddSell',
              component: resolve => require(['@/components/marketing/AddSell'], resolve),
            },
            {
              path: 'report/:id',
              name: 'Report',
              component: resolve => require(['@/components/marketing/Report'], resolve),
            },
            {
              path: 'details/:id',
              name: 'Details',
              component: resolve => require(['@/components/marketing/Details'], resolve),
            },
            {
              path: 'editSell/:id',
              name: 'EditSell',
              component: resolve => require(['@/components/marketing/EditSell'], resolve),
            },
          ]
        },
        //定制短信的增删改查
        {
          path: 'shortmsgDetails/:id',
          name: 'ShortmsgDetails',
          component: resolve => require(['@/components/marketing/shortmsgDetails'], resolve),
        },
        {
          path: 'shortmsgReport/:id',
          name: 'ShortmsgReport',
          component: resolve => require(['@/components/marketing/shortmsgReport'], resolve),
        },
        {
          path: 'shortmsgEdit/:id',
          name: 'ShortmsgEdit',
          component: resolve => require(['@/components/marketing/shortmsgEdit'], resolve),
        },
        {
          path: 'shortmsgAdd',
          name: 'ShortmsgAdd',
          component: resolve => require(['@/components/marketing/shortmsgAdd'], resolve),
        },

        /////////客户关怀
        //客户关怀的增删改查
        {
          path: 'carelessDetails/:id/:type',
          name: 'CarelessDetails',
          component: resolve => require(['@/components/careless/carelessDetails'], resolve),
        },
        {
          path: 'carelessAdd/:type',
          name: 'CarelessAdd',
          component: resolve => require(['@/components/careless/carelessAdd'], resolve),
        },
        {
          path: 'carelessEdit/:type/:id',
          name: 'CarelessEdit',
          component: resolve => require(['@/components/careless/carelessEdit'], resolve),
        },
        {
          path: 'carelessReport/:id/:type',
          name: 'CarelessReport',
          component: resolve => require(['@/components/careless/carelessReport'], resolve),
        },
        //
        {
          path: 'care/orderUrge',
          name: 'orderUrge',
          component: resolve => require(['@/components/careless/OrderUrge'], resolve),
        },
        {
          path: 'care/returnGoodsReminder',
          name: 'returnGoodsReminder',
          component: resolve => require(['@/components/careless/ReturnGoods'], resolve),
        },
        {
          path: 'care/productRepurchaseReminder',
          name: 'productRepurchaseReminder',
          component: resolve => require(['@/components/careless/ProductRepurchaseReminder'], resolve),
        },
        {
          path: 'care/paymentThank',
          name: 'paymentThank',
          component: resolve => require(['@/components/careless/PaymentThank'], resolve),
        },
        {
          path: 'care/deliveryReminder',
          name: 'deliveryReminder',
          component: resolve => require(['@/components/careless/DeliveryReminder'], resolve),
        },
        {
          path: 'care/advabceReminder',
          name: 'advabceReminder',
          component: resolve => require(['@/components/careless/AdvabceReminder'], resolve),
        },
        {
          path: 'care/signReminder',
          name: 'signReminder',
          component: resolve => require(['@/components/careless/SignReminder'], resolve),
        },
        {
          path: 'level',
          name: 'level',
          component: resolve => require(['@/components/equity/Level'], resolve),
          // meta: {keepAlive: true}
        },
        {
          path: 'point',
          name: 'point',
          component: resolve => require(['@/components/equity/Bound'], resolve),
          // meta: {keepAlive: true}

        },
        {
          path: 'coupon/exchange',
          name: 'Coupon',
          component: resolve => require(['@/components/equity/Coupon'], resolve),
          // meta: {keepAlive: true}
        },
        {
          path: 'addCoupon/:id',
          component: resolve => require(['@/components/equity/AddCoupon'], resolve),
          name: 'AddCoupon',
        },
        {
          path: 'couponRep/:id/:apiMerchantId',
          name: 'CouponRep',
          component: resolve => require(['@/components/equity/CouponRep'], resolve),
        },
        {
          path: 'couponCampaign/list',
          name: 'CouponCampaign',
          component: resolve => require(['@/components/equity/CouponCampaign'], resolve),
          // meta: {keepAlive: true}
        },
        {
          path: 'editCoupon/:id/:apiMerchantId',
          name: 'EditCoupon',
          component: resolve => require(['@/components/equity/EditCoupon'], resolve),
        },
        {
          path: '/home/shop',
          name: 'shop',
          component: resolve => require(['@/components/system/Shop'], resolve),
        },
        //资源设置
        {
          path: '/home/source',
          name: 'way',
          component: resolve => require(['@/components/system/Way'], resolve),
        },
        {
          path: '/home/sourceShop',
          name: 'wayShop',
          component: resolve => require(['@/components/system/WayShop'], resolve),
        },
        {
          path: '/resource/management',
          name: 'resource',
          component: resolve => require(['@/components/system/Resource'], resolve),
        },
        {
          path: 'merchant',
          name: 'merchant',
          component: resolve => require(['@/components/equity/Merchant'], resolve),
          // meta: {keepAlive: true}

        },
        {
          path: 'users/:id',
          name: 'users',
          component: resolve => require(['@/components/equity/Users'], resolve),
        },
        {
          path: 'manage/black',
          name: 'black',
          component: resolve => require(['@/components/manage/Black'], resolve),
          // meta: {keepAlive: true}

        },
        {
          path: 'custom/manage/property',
          name: 'property',
          component: resolve => require(['@/components/manage/Property'], resolve),
          // meta: {keepAlive: true}

        },
        {
          path: 'catalog/black',
          name: 'catalog',
          component: resolve => require(['@/components/manage/Catalog'], resolve),
          // meta: {keepAlive: true}

        },
        {
          path: 'group/manage',
          name: 'group',
          component: resolve => require(['@/components/manage/Group'], resolve),
          // meta: {keepAlive: true}

        },
        {
          path: 'addGroup',
          name: 'AddGroup',
          component: resolve => require(['@/components/manage/AddGroup'], resolve),
        },
        {
          path: 'editGroup/:id',
          name: 'EditGroup',
          component: resolve => require(['@/components/manage/EditGroup'], resolve),
        },
        {
          path: 'snapshot',
          name: 'photo',
          component: resolve => require(['@/components/manage/Photo'], resolve),
          // meta: {keepAlive: true}

        },
        {
          path: 'photoCondition/:id/:type',
          name: 'photoCondition',
          component: resolve => require(['@/components/manage/PhotoCondition'], resolve),
        },
        {
          path: 'external/customer',
          name: 'outCustom',
          component: resolve => require(['@/components/manage/OutCustom'], resolve),
          // meta: {keepAlive: true}

        },
        {
          path: 'eg',
          name: 'eg',
          component: resolve => require(['@/components/equity/eg1'], resolve),
        },
        {
          path: 'eg2',
          name: 'eg2',
          component: resolve => require(['@/components/equity/eg2'], resolve),
        },
        {
          path: 'tag/:id/:templateId/:name',
          name: 'tag',
          component: resolve => require(['@/components/manage/Tag'], resolve),
        },
        {
          path: 'account/settings',
          name: 'account',
          component: resolve => require(['@/components/system/Account'], resolve),
        },
        {
          path: '/home/module/notification',
          name: 'moduleNotification',
          component: resolve => require(['@/components/system/ModuleNotification'], resolve),
        },
        {
          path: '/home/system/organization',
          name: 'organization',
          component: resolve => require(['@/components/system/Organization'], resolve),
        },

        {
          path: 'account/add',
          name: 'accountAdd',
          component: resolve => require(['@/components/system/AccountAdd'], resolve),
        },
        {
          path: '/home/permission/settings',
          name: 'permission',
          component: resolve => require(['@/components/system/Permission'], resolve),
        },
        {
          path: 'customer',
          name: 'customerIndex',
          component: resolve => require(['@/components/customer/Index'], resolve),
          meta: { keepAlive: true },
          redirect: {
            name: 'customerRetained'
          },
          children: [
            {
              path: 'retained',
              name: 'customerRetained',
              component: resolve => require(['@/components/customer/Retained'], resolve),
            },
            {
              path: 'repurchase',
              name: 'customerRepurchase',
              component: resolve => require(['@/components/customer/Repurchase'], resolve),
            }
          ]
        },
        {
          path: 'product-analysis/relation',
          name: 'productRelation',
          component: resolve => require(['@/components/productAnalysis/Relation'], resolve)
        },
        {
          path: 'coupon/list',
          name: 'couponList',
          component: resolve => require(['@/components/coupon/List'], resolve)
        },
        {
          path: 'coupon/create-tmall',
          name: 'createTmallCoupon',
          component: resolve => require(['@/components/coupon/TmallCreate'], resolve)
        },
        {
          path: 'coupon/edit-tamll/:id',
          name: 'editTmallCoupon',
          component: resolve => require(['@/components/coupon/TmallCreate'], resolve)
        },
        {
          path: 'coupon/create-offline',
          name: 'createOfflineCoupon',
          component: resolve => require(['@/components/coupon/OfflineCreate'], resolve)
        },
        {
          path: 'coupon/edit-offline/:id',
          name: 'editOfflineCoupon',
          component: resolve => require(['@/components/coupon/OfflineCreate'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/components/Login'], resolve),
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/pwd',
      name: 'Pwd',
      component: resolve => require(['@/components/Pwd'], resolve),
    }
  ]
})
