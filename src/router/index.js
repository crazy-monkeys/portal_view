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
                    name: 'announcelist',
                    component: resolve => require(['@/components/Ts'], resolve)
                },

                //客户管理
                {
                    path: 'shortmsg',
                    name: 'shortmsg',
                    component: resolve => require(['@/components/customer/Shortmsg'], resolve),
                    // meta: {keepAlive: true}
                },
                //主题管理
                {
                    path: 'customer/rep',
                    name: 'customerRep',
                    component: resolve => require(['@/components/customer/customerRep'], resolve),
                    // meta: {keepAlive: true},
                },
                {
                    path: 'system/param',
                    name: 'systemParam',
                    component: resolve => require(['@/components/system/systemParam'], resolve),
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
                {
                    path: 'system/resource',
                    name: 'resource',
                    component: resolve => require(['@/components/system/Resource'], resolve),
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
                    path: 'price/catalog',
                    name: 'priceCatalog',
                    component: resolve => require(['@/components/price/price-catalog'], resolve),
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
                    path: 'sales/kucun-index',
                    name: 'kcquery',
                    component: resolve => require(['@/components/sales/kucun-index'], resolve),
                },
                {
                    path: 'sales/kucun-remove',
                    name: 'kcremove',
                    component: resolve => require(['@/components/sales/kucun-upload'], resolve),
                },
                {
                    path: 'sales/forcast-upload',
                    name: 'SalesList',
                    component: resolve => require(['@/components/sales/forcast-upload'], resolve),
                },
                {
                    path: 'customer/visiteRecord',
                    name: 'visiteRecord',
                    component: resolve => require(['@/components/customer/visiteRecord'], resolve),
                },
                {
                    path: 'agent/rate/query',
                    name: 'agentRate',
                    component: resolve => require(['@/components/sales/agentRate'], resolve),
                },
                {
                    path: 'agent/rate/defend',
                    name: 'agentRateDefend',
                    component: resolve => require(['@/components/sales/agentRateDefend'], resolve),
                },
                {
                    path: 'sales/sales-index',
                    name: 'SalesList',
                    component: resolve => require(['@/components/sales/sales-index'], resolve),
                },
                {
                    path: 'sales/rebateDetail',
                    name: 'rebateDetail',
                    component: resolve => require(['@/components/sales/rebateDetail'], resolve),
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
                    path: 'sales/shipment/detail',
                    name: 'shipmentDetail',
                    component: resolve => require(['@/components/sales/shipmentDetail'], resolve),
                },







                // 收货
                {
                    path: 'sales/shouhuo/detail',
                    name: 'shouhuoDetail',
                    component: resolve => require(['@/components/sales/shouhuoDetail'], resolve),
                },
                {
                    path: 'handover/query',
                    name: 'shipmentQuery',
                    component: resolve => require(['@/components/sales/shipment-index'], resolve),
                },
                {
                    path: 'sales/shouhuo/upload',
                    name: 'shouhuoUpload',
                    component: resolve => require(['@/components/sales/shouhuo-upload'], resolve),
                },
                {
                    path: 'handover/upload',
                    name: 'shipmentUpload',
                    component: resolve => require(['@/components/sales/shipment-upload'], resolve),
                },
                {
                    path: 'business/idr/list',
                    name: 'cbt',
                    component: resolve => require(['@/components/customer/cbt'], resolve),
                },
                {
                    path: 'cbtadd',
                    name: 'cbtadd',
                    component: resolve => require(['@/components/customer/cbtadd'], resolve),
                },
                {
                    path: 'cbtmx',
                    name: 'cbtmx',
                    component: resolve => require(['@/components/customer/cbtmx'], resolve),
                },
                //样本管理
                //短信营销
                {
                    path: 'customer/query',
                    name: 'customerQuery',
                    component: resolve => require(['@/components/customer/customerQuery'], resolve),
                    // meta: {keepAlive: true}
                },
                {
                    path: 'customer/add',
                    name: 'customerAdd',
                    component: resolve => require(['@/components/customer/customerAdd'], resolve),
                    // meta: {keepAlive: true}
                },
                //资源设置
                {
                    path: 'customer/report',
                    name: 'rep',
                    component: resolve => require(['@/components/customer/rep'], resolve),
                    // meta: {keepAlive: true}

                },
                {
                    path: 'account/children',
                    name: 'children',
                    component: resolve => require(['@/components/system/children'], resolve),
                    // meta: {keepAlive: true}

                },
                {
                    path: 'customerUpdate',
                    name: 'customerUpdate',
                    component: resolve => require(['@/components/manage/customerUpdate'], resolve),
                    // meta: {keepAlive: true}

                },
                {
                    path: 'customer/approve',
                    name: 'customerApprove',
                    component: resolve => require(['@/components/customer/approve'], resolve),
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