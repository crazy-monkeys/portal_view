import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/home',
            name: 'Home',
            redirect: {
                name: 'tb'
            },
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

                //客户管理
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
                {
                    path: 'agent/index',
                    name: 'agentIndex',
                    component: resolve => require(['@/components/agent/index'], resolve),
                    // meta: {keepAlive: true}
                },
                {
                    path: 'agent/updateUserInfo',
                    name: 'agentIndex',
                    component: resolve => require(['@/components/agent/updateUserInfo'], resolve),
                    // meta: {keepAlive: true}
                },

                {
                    path: 'agent/add',
                    name: 'agentAdd',
                    component: resolve => require(['@/components/agent/add'], resolve),
                    // meta: {keepAlive: true}
                },
                {
                    path: 'order/add',
                    name: 'orderAdd',
                    component: resolve => require(['@/components/order/add'], resolve),
                    // meta: {keepAlive: true}
                },
                {
                    path: 'order/approve',
                    name: 'approve',
                    component: resolve => require(['@/components/order/approve'], resolve),
                    // meta: {keepAlive: true}
                },
                {
                    path: 'product/query',
                    name: 'productQuery',
                    component: resolve => require(['@/components/product/query'], resolve),
                    // meta: {keepAlive: true}
                },

                {
                    path: 'order/list',
                    name: 'orderList',
                    component: resolve => require(['@/components/order/list'], resolve),
                    // meta: {keepAlive: true}
                },
                //公告管理
                {
                    path: 'system/announcement',
                    name: 'announcementList',
                    component: resolve => require(['@/components/system/announcement'], resolve),
                    // meta: {keepAlive: true}
                },
                //文档管理
                {
                    path: 'system/document',
                    name: 'documentList',
                    component: resolve => require(['@/components/system/document'], resolve),
                    // meta: {keepAlive: true}
                },
                //授信额度
                {
                    path: 'credit/list',
                    name: 'CreditList',
                    component: resolve => require(['@/components/credit/credit-list'], resolve),
                },

                //价格管理
                {
                    path: 'price/list',
                    name: 'PriceList',
                    component: resolve => require(['@/components/price/price-list'], resolve),
                },
                {
                    path: 'price/actual',
                    name: 'PriceActual',
                    component: resolve => require(['@/components/price/price-actual'], resolve),
                },
                {
                    path: 'price/price-sales-actual',
                    name: 'PriceActual',
                    component: resolve => require(['@/components/price/price-sales-actual'], resolve),
                },
                {
                    path: 'price/inquiry',
                    name: 'PriceInquiry',
                    component: resolve => require(['@/components/price/price-inquiry'], resolve),
                },
                {
                    path: 'price/inquiry/approval',
                    name: 'PriceInquiryApproval',
                    component: resolve => require(['@/components/price/price-inquiry-approval'], resolve),
                },
                {
                    path: 'sample/list',
                    name: 'SampleList',
                    component: resolve => require(['@/components/sample/sample-list'], resolve),
                },
                {
                    path: 'sample/apply',
                    name: 'SampleApply',
                    component: resolve => require(['@/components/sample/sample-apply'], resolve),
                },
                //销售管理
                {
                    path: 'sales/forcast-index',
                    name: 'SalesList',
                    component: resolve => require(['@/components/sales/forcast-index'], resolve),
                },
                {
                    path: 'sales/forcast-upload',
                    name: 'SalesList',
                    component: resolve => require(['@/components/sales/forcast-upload'], resolve),
                },
                {
                    path: 'user/visiteRecord',
                    name: 'visiteRecord',
                    component: resolve => require(['@/components/marketing/visiteRecord'], resolve),
                },

                {
                    path: 'sales/sales-index',
                    name: 'SalesList',
                    component: resolve => require(['@/components/sales/sales-index'], resolve),
                },
                {
                    path: 'sales/approve',
                    name: 'SalesList',
                    component: resolve => require(['@/components/sales/approve'], resolve),
                },
                {
                    path: 'sales/reset',
                    name: 'SalesList',
                    component: resolve => require(['@/components/sales/reset'], resolve),
                },
                {
                    path: 'sales/sales-upload',
                    name: 'SalesList',
                    component: resolve => require(['@/components/sales/sales-upload'], resolve),
                },
                {
                    path: 'sales/shipment-index',
                    name: 'SalesList',
                    component: resolve => require(['@/components/sales/shipment-index'], resolve),
                },
                {
                    path: 'sales/shipment-upload',
                    name: 'SalesList',
                    component: resolve => require(['@/components/sales/shipment-upload'], resolve),
                },
                {
                    path: 'cbt',
                    name: 'cbt',
                    component: resolve => require(['@/components/marketing/cbt'], resolve),
                },
                {
                    path: 'cbtadd',
                    name: 'cbtadd',
                    component: resolve => require(['@/components/marketing/cbtadd'], resolve),
                },
                {
                    path: 'cbtmx',
                    name: 'cbtmx',
                    component: resolve => require(['@/components/marketing/cbtmx'], resolve),
                },
                //样本管理
                //短信营销
                {
                    path: 'sell',
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
                //资源设置
                {
                    path: 'manage/black',
                    name: 'black',
                    component: resolve => require(['@/components/manage/Black'], resolve),
                    // meta: {keepAlive: true}

                },
                {
                    path: 'customerUpdate',
                    name: 'customerUpdate',
                    component: resolve => require(['@/components/manage/customerUpdate'], resolve),
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
                    path: 'system/users',
                    name: 'account',
                    component: resolve => require(['@/components/system/Account'], resolve),
                },
                {
                    path: 'account/add',
                    name: 'accountAdd',
                    component: resolve => require(['@/components/system/AccountAdd'], resolve),
                },
                {
                    path: 'system/permissions',
                    name: 'permission',
                    component: resolve => require(['@/components/system/Permission'], resolve),
                },
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
        },

    ]
})