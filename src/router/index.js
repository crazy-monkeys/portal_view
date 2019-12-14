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
                //单独上传页面
                {
                    path: 'uploadIndex',
                    name: 'uploadIndex',
                    component: resolve => require(['@/components/customer/uploadIndex'], resolve)
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
                //公告页面
                {
                    path: 'ts',
                    name: 'announcelist',
                    component: resolve => require(['@/components/Ts'], resolve)
                },
                //客户管理
                //客户报备列表
                {
                    path: 'customer/rep',
                    name: 'customerRep',
                    component: resolve => require(['@/components/customer/customerRep'], resolve),
                },
                //拜访记录上传
                {
                    path: 'customer/visiteRecord',
                    name: 'visiteRecord',
                    component: resolve => require(['@/components/customer/visiteRecord'], resolve),
                },
                //客户查询
                {
                    path: 'customer/query',
                    name: 'customerQuery',
                    component: resolve => require(['@/components/customer/customerQuery'], resolve),
                },
                //客户明细
                {
                    path: 'customer/add',
                    name: 'customerAdd',
                    component: resolve => require(['@/components/customer/customerAdd'], resolve),
                },
                //客户报备添加
                {
                    path: 'customer/report',
                    name: 'rep',
                    component: resolve => require(['@/components/customer/rep'], resolve),
                },
                //报备审批
                {
                    path: 'customer/approve',
                    name: 'customerApprove',
                    component: resolve => require(['@/components/customer/approve'], resolve),
                },
                //报备修改
                {
                    path: 'customer/update',
                    name: 'customerUpdate',
                    component: resolve => require(['@/components/customer/customerUpdate'], resolve),
                    // meta: {keepAlive: true}

                },


                //系统管理
                //关系维护
                {
                    path: 'system/releation',
                    name: 'releation',
                    component: resolve => require(['@/components/system/releation'], resolve),
                },
                {
                    path: 'system/document',
                    name: 'document',
                    component: resolve => require(['@/components/system/document'], resolve),
                },
                //系统参数设置
                {
                    path: 'system/param',
                    name: 'systemParam',
                    component: resolve => require(['@/components/system/systemParam'], resolve),
                },
                //公告管理
                {
                    path: 'system/announcement',
                    name: 'announcementList',
                    component: resolve => require(['@/components/system/announcement'], resolve),
                },
                //资源管理
                {
                    path: 'system/resource',
                    name: 'resource',
                    component: resolve => require(['@/components/system/Resource'], resolve),
                },
                //文档管理
                {
                    path: 'system/document',
                    name: 'documentList',
                    component: resolve => require(['@/components/system/document'], resolve),
                },
                //子账号管理
                {
                    path: 'account/children',
                    name: 'children',
                    component: resolve => require(['@/components/system/children'], resolve),
                },
                //用户管理
                {
                    path: 'system/users',
                    name: 'account',
                    component: resolve => require(['@/components/system/Account'], resolve),
                },
                //新增账号
                {
                    path: 'account/add',
                    name: 'accountAdd',
                    component: resolve => require(['@/components/system/AccountAdd'], resolve),
                },
                //权限管理
                {
                    path: 'system/permissions',
                    name: 'permission',
                    component: resolve => require(['@/components/system/Permission'], resolve),
                },

                //代理商管理
                //代理商信息修改
                {
                    path: 'agent/updateUserInfo',
                    name: 'agentIndex',
                    component: resolve => require(['@/components/agent/updateUserInfo'], resolve),
                },
                //代理商信息查看
                {
                    path: 'agent/add',
                    name: 'agentAdd',
                    component: resolve => require(['@/components/agent/add'], resolve),
                },


                //产品管理
                // 产品列表
                {
                    path: 'product/query',
                    name: 'productQuery',
                    component: resolve => require(['@/components/product/query'], resolve),
                },


                //订单管理
                {
                    path: 'order/approve/list',
                    name: 'approveList',
                    component: resolve => require(['@/components/order/approveList'], resolve),
                },
                {
                    path: 'order/sale/list',
                    name: 'saleList',
                    component: resolve => require(['@/components/order/saleList'], resolve),
                },
                {
                    path: 'order/add',
                    name: 'orderAdd',
                    component: resolve => require(['@/components/order/add'], resolve),
                },
                {
                    path: 'order/list',
                    name: 'orderList',
                    component: resolve => require(['@/components/order/list'], resolve),
                },
                {
                    path: 'order/approve',
                    name: 'orderApprove',
                    component: resolve => require(['@/components/order/approve'], resolve),
                },
                {
                    path: 'order/proApprove',
                    name: 'proApprove',
                    component: resolve => require(['@/components/order/proApprove'], resolve),
                },
                {
                    path: 'order/proList',
                    name: 'proList',
                    component: resolve => require(['@/components/order/proList'], resolve),
                },

                //价格管理
                //目录价格
                {
                    path: 'price/catalog',
                    name: 'priceCatalog',
                    component: resolve => require(['@/components/price/price-catalog'], resolve),
                },
                //价格策略
                {
                    path: 'price/strategy',
                    name: 'priceStrategy',
                    component: resolve => require(['@/components/price/price-strategy'], resolve),
                },
                //实际价格
                {
                    path: 'price/actual',
                    name: 'priceActual',
                    component: resolve => require(['@/components/price/price-actual'], resolve),
                },
                //询价
                {
                    path: 'price/enquiry',
                    name: 'priceEnquiry',
                    component: resolve => require(['@/components/price/price-enquiry'], resolve),
                },
                //询价审批
                {
                    path: 'price/enquiry/approval',
                    name: 'priceEnquiryApproval',
                    component: resolve => require(['@/components/price/price-enquiry-approval'], resolve),
                },

                //销售预测管理
                //销售预测查询
                {
                    path: 'forcast/index',
                    name: 'forcastIndex',
                    component: resolve => require(['@/components/forcast/forcast-index'], resolve),
                },
                //销售预测上传
                {
                    path: 'forcast/upload',
                    name: 'forcastUpload',
                    component: resolve => require(['@/components/forcast/forcast-upload'], resolve),
                },
                //销售预测审批
                {
                    path: 'forcast/approval',
                    name: 'forcastApprove',
                    component: resolve => require(['@/components/forcast/forcast-approve'], resolve),
                },

                //代理商费率管理
                //查询
                {
                    path: 'agent/rate/query',
                    name: 'agentRate',
                    component: resolve => require(['@/components/agentRate/agentRate'], resolve),
                },
                //维护
                {
                    path: 'agent/rate/defend',
                    name: 'agentRateDefend',
                    component: resolve => require(['@/components/agentRate/agentRateDefend'], resolve),
                },



                //交付管理
                //出收货  详情
                {
                    path: 'handOver/shipment/detail',
                    name: 'shipmentDetail',
                    component: resolve => require(['@/components/handOver/shipmentDetail'], resolve),
                },
                //出收货  列表
                {
                    path: 'handover/query',
                    name: 'shipmentQuery',
                    component: resolve => require(['@/components/handOver/shipment-index'], resolve),
                },
                //收货  上传
                {
                    path: 'handover/receive/upload',
                    name: 'receiveUpload',
                    component: resolve => require(['@/components/handOver/receive-upload'], resolve),
                },
                //出货  上传
                {
                    path: 'handover/deliver/upload',
                    name: 'shipmentUpload',
                    component: resolve => require(['@/components/handOver/shipment-upload'], resolve),
                },

                // 销售权限
                // 收货
                {
                    path: 'handover/sale/receive',
                    name: 'saleReceive',
                    component: resolve => require(['@/components/handOver/receive'], resolve),
                },
                // 出货
                {
                    path: 'handover/sale/shipment',
                    name: 'saleShipment',
                    component: resolve => require(['@/components/handOver/shipment'], resolve),
                },

                //商务管理
                //rebate列表
                {
                    path: 'business/rebate/list',
                    name: 'customerRebate',
                    component: resolve => require(['@/components/business/customerRebate'], resolve),
                },
                //详情
                {
                    path: 'business/rebateDetail',
                    name: 'rebateDetail',
                    component: resolve => require(['@/components/business/rebateDetail'], resolve),
                },
                //rebate 查询
                {
                    path: 'business/rebate/query',
                    name: 'rebateQuery',
                    component: resolve => require(['@/components/business/rebateQuery'], resolve),
                },
                //保差价 查询
                {
                    path: 'business/idr/list',
                    name: 'idr',
                    component: resolve => require(['@/components/business/idr'], resolve),
                },
                //保差价 新增
                {
                    path: 'business/idr/add',
                    name: 'idradd',
                    component: resolve => require(['@/components/business/idradd'], resolve),
                },
                //保差价 详情
                {
                    path: 'business/idr/detail',
                    name: 'idrmx',
                    component: resolve => require(['@/components/business/idrmx'], resolve),
                },



                //库存管理
                //查询1
                {
                    path: 'stock/query/one',
                    name: 'stockQueryOne',
                    component: resolve => require(['@/components/stock/queryOne'], resolve),
                },
                {
                    path: 'stock/query/two',
                    name: 'stockQueryTwo',
                    component: resolve => require(['@/components/stock/queryTwo'], resolve),
                },
                {
                    path: 'stock/query/three',
                    name: 'stockQueryThree',
                    component: resolve => require(['@/components/stock/queryThree'], resolve),
                },
                {
                    path: '/home/stock/record/query',
                    name: 'queryRecord',
                    component: resolve => require(['@/components/stock/queryRecord'], resolve),
                },
                {
                    path: 'stock/record/approve',
                    name: 'approveRecord',
                    component: resolve => require(['@/components/stock/approveRecord'], resolve),
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
        {
            path: '/deliver/confirm',
            name: 'deliverConfirm',
            component: resolve => require(['@/components/deliverConfirm'], resolve)
        }
    ]
})