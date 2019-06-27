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
              path: 'addSell',
              name: 'AddSell',
              component: resolve => require(['@/components/marketing/AddSell'], resolve),
              // meta: {keepAlive: true}
            },
          ]
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
          path: 'group/manage',
          name: 'group',
          component: resolve => require(['@/components/manage/Group'], resolve),
          // meta: {keepAlive: true}
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
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/components/Login1'], resolve),
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
